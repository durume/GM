/**
 * Vector Store Service
 * SQLite 기반 문서 임베딩 저장 및 검색
 */

import * as fs from "fs";
import * as path from "path";
import initSqlJs, { Database } from "sql.js";
import { RAGConfig } from "../config/rag.config.js";
import { cosineSimilarity } from "./embeddingService.js";
import type {
  ParsedDocument,
  DocumentInfo,
  DocumentSearchResult,
} from "../data/documentTypes.js";

let db: Database | null = null;

// Initialize database
async function getDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  const dbPath = RAGConfig.vectorStore.dbPath;
  const dbDir = path.dirname(dbPath);

  // Create directory if needed
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Load existing database or create new
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    initializeTables(db);
  }

  return db;
}

// Initialize database tables
function initializeTables(database: Database): void {
  database.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      filepath TEXT UNIQUE NOT NULL,
      file_type TEXT NOT NULL,
      content TEXT,
      chunk_count INTEGER DEFAULT 0,
      indexed_at TEXT NOT NULL
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS chunks (
      id TEXT PRIMARY KEY,
      document_id TEXT NOT NULL,
      content TEXT NOT NULL,
      chunk_index INTEGER NOT NULL,
      embedding BLOB,
      FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
    )
  `);

  database.run(`
    CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON chunks(document_id)
  `);
}

// Save database to file
async function saveDatabase(): Promise<void> {
  if (!db) return;

  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(RAGConfig.vectorStore.dbPath, buffer);
}

// Add document to store
export async function addDocument(
  doc: ParsedDocument,
  embeddings: number[][]
): Promise<void> {
  const database = await getDatabase();

  // Delete existing document if any
  await deleteDocument(doc.filepath);

  // Insert document
  database.run(
    `INSERT INTO documents (id, filename, filepath, file_type, content, chunk_count, indexed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      doc.id,
      doc.filename,
      doc.filepath,
      doc.fileType,
      doc.content.substring(0, 10000), // Store first 10k chars for preview
      doc.chunks.length,
      new Date().toISOString(),
    ]
  );

  // Insert chunks with embeddings
  for (let i = 0; i < doc.chunks.length; i++) {
    const chunk = doc.chunks[i];
    const embedding = embeddings[i];

    // Convert embedding to binary
    const embeddingBuffer = Buffer.from(new Float32Array(embedding).buffer);

    database.run(
      `INSERT INTO chunks (id, document_id, content, chunk_index, embedding)
       VALUES (?, ?, ?, ?, ?)`,
      [chunk.id, doc.id, chunk.content, chunk.chunkIndex, embeddingBuffer]
    );
  }

  await saveDatabase();
}

// Delete document from store
export async function deleteDocument(filepath: string): Promise<boolean> {
  const database = await getDatabase();

  // Find document
  const result = database.exec(
    `SELECT id FROM documents WHERE filepath = ?`,
    [filepath]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return false;
  }

  const docId = result[0].values[0][0] as string;

  // Delete chunks first
  database.run(`DELETE FROM chunks WHERE document_id = ?`, [docId]);

  // Delete document
  database.run(`DELETE FROM documents WHERE id = ?`, [docId]);

  await saveDatabase();
  return true;
}

// Search documents by embedding similarity
export async function search(
  queryEmbedding: number[],
  limit: number = RAGConfig.search.defaultLimit,
  fileType?: string
): Promise<DocumentSearchResult[]> {
  const database = await getDatabase();

  // Get all chunks with embeddings
  let query = `
    SELECT c.id, c.document_id, c.content, c.chunk_index, c.embedding,
           d.filename, d.filepath, d.file_type
    FROM chunks c
    JOIN documents d ON c.document_id = d.id
  `;

  if (fileType) {
    query += ` WHERE d.file_type = '${fileType}'`;
  }

  const result = database.exec(query);

  if (result.length === 0) {
    return [];
  }

  // Calculate similarities
  const results: DocumentSearchResult[] = [];

  for (const row of result[0].values) {
    const embeddingBuffer = row[4] as Uint8Array;
    if (!embeddingBuffer) continue;

    // Convert binary back to number array
    const embedding = Array.from(new Float32Array(embeddingBuffer.buffer));

    const similarity = cosineSimilarity(queryEmbedding, embedding);

    if (similarity >= RAGConfig.search.minSimilarity) {
      results.push({
        documentId: row[1] as string,
        filename: row[5] as string,
        filepath: row[6] as string,
        fileType: row[7] as string,
        chunkContent: row[2] as string,
        chunkIndex: row[3] as number,
        similarity,
      });
    }
  }

  // Sort by similarity and limit
  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, Math.min(limit, RAGConfig.search.maxLimit));
}

// List all indexed documents
export async function listDocuments(fileType?: string): Promise<DocumentInfo[]> {
  const database = await getDatabase();

  let query = `SELECT id, filename, filepath, file_type, chunk_count, indexed_at FROM documents`;

  if (fileType) {
    query += ` WHERE file_type = '${fileType}'`;
  }

  query += ` ORDER BY indexed_at DESC`;

  const result = database.exec(query);

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row: unknown[]) => ({
    id: row[0] as string,
    filename: row[1] as string,
    filepath: row[2] as string,
    fileType: row[3] as string,
    chunkCount: row[4] as number,
    indexedAt: new Date(row[5] as string),
  }));
}

// Check if document is indexed
export async function isDocumentIndexed(filepath: string): Promise<boolean> {
  const database = await getDatabase();

  const result = database.exec(
    `SELECT id FROM documents WHERE filepath = ?`,
    [filepath]
  );

  return result.length > 0 && result[0].values.length > 0;
}

// Get document by filepath
export async function getDocument(filepath: string): Promise<DocumentInfo | null> {
  const database = await getDatabase();

  const result = database.exec(
    `SELECT id, filename, filepath, file_type, chunk_count, indexed_at
     FROM documents WHERE filepath = ?`,
    [filepath]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0].values[0];
  return {
    id: row[0] as string,
    filename: row[1] as string,
    filepath: row[2] as string,
    fileType: row[3] as string,
    chunkCount: row[4] as number,
    indexedAt: new Date(row[5] as string),
  };
}

// Get total document count
export async function getDocumentCount(): Promise<number> {
  const database = await getDatabase();

  const result = database.exec(`SELECT COUNT(*) FROM documents`);

  if (result.length === 0) {
    return 0;
  }

  return result[0].values[0][0] as number;
}

// Get total chunk count
export async function getChunkCount(): Promise<number> {
  const database = await getDatabase();

  const result = database.exec(`SELECT COUNT(*) FROM chunks`);

  if (result.length === 0) {
    return 0;
  }

  return result[0].values[0][0] as number;
}

// Clear all data
export async function clearAll(): Promise<void> {
  const database = await getDatabase();

  database.run(`DELETE FROM chunks`);
  database.run(`DELETE FROM documents`);

  await saveDatabase();
}

// Close database connection
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
