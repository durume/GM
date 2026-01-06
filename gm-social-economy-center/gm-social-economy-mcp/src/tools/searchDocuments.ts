/**
 * Search Documents Tool
 * 인덱싱된 문서에서 의미 기반 검색
 */

import { RAGConfig } from "../config/rag.config.js";
import { embed, healthCheck } from "../services/embeddingService.js";
import * as vectorStore from "../services/vectorStore.js";
import type { SearchDocumentsArgs, RAGToolResult } from "../data/documentTypes.js";

// Tool schema
export const searchDocumentsSchema = {
  type: "object" as const,
  properties: {
    query: {
      type: "string",
      description: "검색할 내용 (자연어로 입력)",
    },
    limit: {
      type: "number",
      description: "최대 검색 결과 수 (기본값: 5)",
      default: 5,
    },
    fileType: {
      type: "string",
      description: "파일 유형으로 필터링 (pdf, word, excel)",
      enum: ["pdf", "word", "excel"],
    },
  },
  required: ["query"],
};

// Tool definition
export const searchDocumentsTool = {
  name: "search_documents",
  description: "인덱싱된 문서에서 의미 기반 검색을 수행합니다. 자연어로 질문하면 관련 문서를 찾아줍니다.",
  inputSchema: searchDocumentsSchema,
};

// Truncate text to specified length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

// Format similarity as percentage
function formatSimilarity(similarity: number): string {
  return `${(similarity * 100).toFixed(1)}%`;
}

// Tool implementation
export async function searchDocuments(args: SearchDocumentsArgs): Promise<RAGToolResult> {
  if (!args.query || args.query.trim().length === 0) {
    return {
      content: [{
        type: "text",
        text: "검색어를 입력해주세요.",
      }],
      isError: true,
    };
  }

  // Check Ollama availability
  const health = await healthCheck();
  if (!health.ollamaAvailable || !health.modelAvailable) {
    return {
      content: [{
        type: "text",
        text: `⚠️ 임베딩 서비스 오류\n\n${health.message}`,
      }],
      isError: true,
    };
  }

  const limit = args.limit || RAGConfig.search.defaultLimit;

  try {
    // Check if there are any indexed documents
    const docCount = await vectorStore.getDocumentCount();
    if (docCount === 0) {
      return {
        content: [{
          type: "text",
          text: "📭 인덱싱된 문서가 없습니다.\n\n" +
                "`index_documents` 도구를 사용하여 먼저 문서를 인덱싱하세요.\n\n" +
                "예: \"G:/내 드라이브/문서 폴더 인덱싱해줘\"",
        }],
      };
    }

    // Generate query embedding
    const queryEmbedding = await embed(args.query);

    // Search in vector store
    const results = await vectorStore.search(queryEmbedding, limit, args.fileType);

    if (results.length === 0) {
      let message = `🔍 **"${args.query}"** 검색 결과가 없습니다.`;
      if (args.fileType) {
        message += `\n\n필터: ${args.fileType.toUpperCase()} 파일`;
      }
      message += "\n\n**팁:** 다른 키워드로 검색하거나 파일 유형 필터를 제거해 보세요.";

      return {
        content: [{ type: "text", text: message }],
      };
    }

    // Build result
    const lines: string[] = [
      `# 🔍 문서 검색 결과`,
      "",
      `**검색어:** "${args.query}"`,
    ];

    if (args.fileType) {
      lines.push(`**필터:** ${args.fileType.toUpperCase()} 파일`);
    }

    lines.push(`**결과:** ${results.length}개 찾음`);
    lines.push("");
    lines.push("---");
    lines.push("");

    // Group results by document
    const documentResults = new Map<string, typeof results>();
    for (const result of results) {
      const existing = documentResults.get(result.documentId) || [];
      existing.push(result);
      documentResults.set(result.documentId, existing);
    }

    let docIndex = 1;
    for (const [, chunks] of documentResults) {
      const firstChunk = chunks[0];
      const typeIcon = firstChunk.fileType === "pdf" ? "📄" :
                       firstChunk.fileType === "word" ? "📝" : "📊";

      lines.push(`### ${docIndex}. ${typeIcon} ${firstChunk.filename}`);
      lines.push("");
      lines.push(`**경로:** \`${firstChunk.filepath}\``);
      lines.push(`**관련도:** ${formatSimilarity(firstChunk.similarity)}`);
      lines.push("");
      lines.push("**관련 내용:**");
      lines.push("");

      // Show top chunks from this document
      const topChunks = chunks.slice(0, 2);
      for (const chunk of topChunks) {
        lines.push(`> ${truncateText(chunk.chunkContent, 300)}`);
        lines.push("");
      }

      lines.push("---");
      lines.push("");
      docIndex++;
    }

    // Tips
    lines.push("💡 **팁:**");
    lines.push("- `ask_documents` 도구로 문서 내용에 대해 질문할 수 있습니다.");
    lines.push("- 검색 결과가 부족하면 더 구체적인 키워드를 사용해 보세요.");

    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{
        type: "text",
        text: `❌ 검색 중 오류 발생: ${errorMessage}`,
      }],
      isError: true,
    };
  }
}
