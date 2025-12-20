/**
 * Embedding Service
 * Ollama를 사용한 텍스트 임베딩 생성
 */

import { Ollama } from "ollama";
import { RAGConfig } from "../config/rag.config.js";
import type { EmbeddingResult } from "../data/documentTypes.js";

// Ollama client instance
let ollamaClient: Ollama | null = null;

// Get or create Ollama client
function getOllamaClient(): Ollama {
  if (!ollamaClient) {
    ollamaClient = new Ollama({
      host: RAGConfig.ollama.baseUrl,
    });
  }
  return ollamaClient;
}

// Check if Ollama is available
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    const client = getOllamaClient();
    await client.list();
    return true;
  } catch {
    return false;
  }
}

// Check if embedding model is available
export async function isModelAvailable(): Promise<boolean> {
  try {
    const client = getOllamaClient();
    const models = await client.list();
    return models.models.some(
      (m) => m.name === RAGConfig.ollama.embeddingModel ||
             m.name.startsWith(RAGConfig.ollama.embeddingModel + ":")
    );
  } catch {
    return false;
  }
}

// Generate embedding for single text
export async function embed(text: string): Promise<number[]> {
  const client = getOllamaClient();

  try {
    const response = await client.embeddings({
      model: RAGConfig.ollama.embeddingModel,
      prompt: text,
    });

    return response.embedding;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        throw new Error(
          "Ollama 서버에 연결할 수 없습니다. Ollama가 실행 중인지 확인하세요.\n" +
          "설치: https://ollama.ai/download\n" +
          "모델 설치: ollama pull nomic-embed-text"
        );
      }
      if (error.message.includes("model")) {
        throw new Error(
          `임베딩 모델 '${RAGConfig.ollama.embeddingModel}'을(를) 찾을 수 없습니다.\n` +
          `다음 명령으로 모델을 설치하세요: ollama pull ${RAGConfig.ollama.embeddingModel}`
        );
      }
    }
    throw error;
  }
}

// Generate embeddings for multiple texts (batch)
export async function embedBatch(texts: string[]): Promise<EmbeddingResult[]> {
  const results: EmbeddingResult[] = [];

  for (const text of texts) {
    try {
      const embedding = await embed(text);
      results.push({ text, embedding });
    } catch (error) {
      console.error(`Failed to embed text: ${text.substring(0, 50)}...`);
      throw error;
    }
  }

  return results;
}

// Cosine similarity between two vectors
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

// Get embedding dimensions for current model
export function getEmbeddingDimensions(): number {
  // nomic-embed-text uses 768 dimensions
  // Other models may vary
  return RAGConfig.vectorStore.embeddingDimensions;
}

// Health check for embedding service
export async function healthCheck(): Promise<{
  ollamaAvailable: boolean;
  modelAvailable: boolean;
  message: string;
}> {
  const ollamaAvailable = await isOllamaAvailable();

  if (!ollamaAvailable) {
    return {
      ollamaAvailable: false,
      modelAvailable: false,
      message: "Ollama 서버가 실행되고 있지 않습니다. 'ollama serve' 명령으로 시작하세요.",
    };
  }

  const modelAvailable = await isModelAvailable();

  if (!modelAvailable) {
    return {
      ollamaAvailable: true,
      modelAvailable: false,
      message: `모델 '${RAGConfig.ollama.embeddingModel}'이(가) 설치되어 있지 않습니다. 'ollama pull ${RAGConfig.ollama.embeddingModel}' 명령으로 설치하세요.`,
    };
  }

  return {
    ollamaAvailable: true,
    modelAvailable: true,
    message: "임베딩 서비스가 정상 작동 중입니다.",
  };
}
