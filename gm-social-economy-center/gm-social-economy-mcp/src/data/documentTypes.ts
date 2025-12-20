/**
 * Document Types for RAG System
 * 문서 기반 검색을 위한 타입 정의
 */

// Document metadata
export interface DocumentMetadata {
  filename: string;
  filepath: string;
  fileType: "pdf" | "word" | "excel";
  fileSize: number;
  createdAt?: Date;
  modifiedAt?: Date;
  pageCount?: number;
  sheetCount?: number;
}

// Document chunk (for embedding)
export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  chunkIndex: number;
  startChar: number;
  endChar: number;
}

// Parsed document
export interface ParsedDocument {
  id: string;
  filename: string;
  filepath: string;
  fileType: "pdf" | "word" | "excel";
  content: string;
  chunks: DocumentChunk[];
  metadata: DocumentMetadata;
  parsedAt: Date;
}

// Document info (for listing)
export interface DocumentInfo {
  id: string;
  filename: string;
  filepath: string;
  fileType: string;
  chunkCount: number;
  indexedAt: Date;
}

// Search result
export interface DocumentSearchResult {
  documentId: string;
  filename: string;
  filepath: string;
  fileType: string;
  chunkContent: string;
  chunkIndex: number;
  similarity: number;
}

// Embedding result
export interface EmbeddingResult {
  text: string;
  embedding: number[];
}

// Index result
export interface IndexResult {
  success: boolean;
  documentsIndexed: number;
  documentsSkipped: number;
  errors: string[];
  totalChunks: number;
}

// Tool result type (consistent with existing tools)
export interface RAGToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

// Index documents args
export interface IndexDocumentsArgs {
  folderPath?: string;
  recursive?: boolean;
}

// Search documents args
export interface SearchDocumentsArgs {
  query: string;
  limit?: number;
  fileType?: string;
}

// Ask documents args
export interface AskDocumentsArgs {
  question: string;
  contextLimit?: number;
}

// List documents args
export interface ListDocumentsArgs {
  fileType?: string;
}
