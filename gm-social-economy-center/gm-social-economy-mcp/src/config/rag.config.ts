/**
 * RAG (Retrieval Augmented Generation) Configuration
 * 문서 기반 검색 및 Q&A 기능 설정
 */

export const RAGConfig = {
  // Google Drive sync folder path (로컬 동기화 폴더 경로)
  driveFolderPath: process.env.DRIVE_FOLDER_PATH || "G:/내 드라이브",

  // Ollama settings
  ollama: {
    baseUrl: process.env.OLLAMA_URL || "http://localhost:11434",
    embeddingModel: process.env.OLLAMA_MODEL || "nomic-embed-text",
    timeout: 30000, // 30 seconds
  },

  // Document chunking settings (문서 청킹 설정)
  chunking: {
    chunkSize: 500,      // Characters per chunk
    chunkOverlap: 50,    // Overlap between chunks
    minChunkSize: 100,   // Minimum chunk size
  },

  // Vector store settings
  vectorStore: {
    dbPath: process.env.VECTOR_DB_PATH || "./data/vectors.db",
    embeddingDimensions: 768,  // nomic-embed-text dimensions
  },

  // Supported file types
  supportedExtensions: [".pdf", ".docx", ".doc", ".xlsx", ".xls"],

  // Search settings
  search: {
    defaultLimit: 5,
    maxLimit: 20,
    minSimilarity: 0.3,  // Minimum cosine similarity threshold
  },
};

// File type mapping
export const FileTypeMap: Record<string, string> = {
  ".pdf": "pdf",
  ".docx": "word",
  ".doc": "word",
  ".xlsx": "excel",
  ".xls": "excel",
};

// Get file type from extension
export function getFileType(filepath: string): string | null {
  const ext = filepath.toLowerCase().match(/\.[^.]+$/)?.[0];
  return ext ? FileTypeMap[ext] || null : null;
}

// Check if file is supported
export function isSupportedFile(filepath: string): boolean {
  const ext = filepath.toLowerCase().match(/\.[^.]+$/)?.[0];
  return ext ? RAGConfig.supportedExtensions.includes(ext) : false;
}
