/**
 * Document Parser Service
 * PDF, Word, Excel 파일 파싱 및 청킹
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { RAGConfig } from "../config/rag.config.js";
import type { ParsedDocument, DocumentChunk, DocumentMetadata } from "../data/documentTypes.js";

// Generate unique document ID
function generateDocumentId(filepath: string): string {
  return crypto.createHash("md5").update(filepath).digest("hex").substring(0, 16);
}

// Generate chunk ID
function generateChunkId(documentId: string, chunkIndex: number): string {
  return `${documentId}_chunk_${chunkIndex}`;
}

// Split text into chunks with overlap
function chunkText(text: string, chunkSize: number, overlap: number): string[] {
  const chunks: string[] = [];
  const cleanText = text.replace(/\s+/g, " ").trim();

  if (cleanText.length <= chunkSize) {
    return [cleanText];
  }

  let start = 0;
  while (start < cleanText.length) {
    let end = start + chunkSize;

    // Try to break at sentence or word boundary
    if (end < cleanText.length) {
      const lastPeriod = cleanText.lastIndexOf(".", end);
      const lastSpace = cleanText.lastIndexOf(" ", end);

      if (lastPeriod > start + chunkSize * 0.5) {
        end = lastPeriod + 1;
      } else if (lastSpace > start + chunkSize * 0.5) {
        end = lastSpace;
      }
    }

    const chunk = cleanText.substring(start, end).trim();
    if (chunk.length >= RAGConfig.chunking.minChunkSize) {
      chunks.push(chunk);
    }

    start = end - overlap;
    if (start >= cleanText.length - overlap) break;
  }

  return chunks;
}

// Parse PDF file
async function parsePDF(filepath: string): Promise<{ content: string; pageCount: number }> {
  const dataBuffer = fs.readFileSync(filepath);
  const data = await pdf(dataBuffer);
  return {
    content: data.text,
    pageCount: data.numpages,
  };
}

// Parse Word file (.docx)
async function parseWord(filepath: string): Promise<{ content: string }> {
  const result = await mammoth.extractRawText({ path: filepath });
  return {
    content: result.value,
  };
}

// Parse Excel file
function parseExcel(filepath: string): { content: string; sheetCount: number } {
  const workbook = XLSX.readFile(filepath);
  const sheets: string[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const text = XLSX.utils.sheet_to_txt(sheet);
    sheets.push(`[Sheet: ${sheetName}]\n${text}`);
  }

  return {
    content: sheets.join("\n\n"),
    sheetCount: workbook.SheetNames.length,
  };
}

// Get file metadata
function getFileMetadata(filepath: string, fileType: "pdf" | "word" | "excel"): DocumentMetadata {
  const stats = fs.statSync(filepath);
  const filename = path.basename(filepath);

  return {
    filename,
    filepath,
    fileType,
    fileSize: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
  };
}

// Main parse function
export async function parseDocument(filepath: string): Promise<ParsedDocument> {
  const ext = path.extname(filepath).toLowerCase();
  let content: string;
  let fileType: "pdf" | "word" | "excel";
  let pageCount: number | undefined;
  let sheetCount: number | undefined;

  switch (ext) {
    case ".pdf":
      fileType = "pdf";
      const pdfResult = await parsePDF(filepath);
      content = pdfResult.content;
      pageCount = pdfResult.pageCount;
      break;

    case ".docx":
    case ".doc":
      fileType = "word";
      const wordResult = await parseWord(filepath);
      content = wordResult.content;
      break;

    case ".xlsx":
    case ".xls":
      fileType = "excel";
      const excelResult = parseExcel(filepath);
      content = excelResult.content;
      sheetCount = excelResult.sheetCount;
      break;

    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }

  const documentId = generateDocumentId(filepath);
  const metadata = getFileMetadata(filepath, fileType);

  if (pageCount) metadata.pageCount = pageCount;
  if (sheetCount) metadata.sheetCount = sheetCount;

  // Create chunks
  const textChunks = chunkText(
    content,
    RAGConfig.chunking.chunkSize,
    RAGConfig.chunking.chunkOverlap
  );

  const chunks: DocumentChunk[] = textChunks.map((chunkContent, index) => ({
    id: generateChunkId(documentId, index),
    documentId,
    content: chunkContent,
    chunkIndex: index,
    startChar: 0, // Simplified - actual tracking would need more logic
    endChar: chunkContent.length,
  }));

  return {
    id: documentId,
    filename: metadata.filename,
    filepath,
    fileType,
    content,
    chunks,
    metadata,
    parsedAt: new Date(),
  };
}

// Scan folder for documents
export function scanFolder(folderPath: string, recursive: boolean = true): string[] {
  const files: string[] = [];

  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder not found: ${folderPath}`);
  }

  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);

    if (entry.isDirectory() && recursive) {
      files.push(...scanFolder(fullPath, recursive));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (RAGConfig.supportedExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}
