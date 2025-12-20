/**
 * Ask Documents Tool
 * 문서 기반 Q&A (NotebookLM 스타일)
 */

import { embed, healthCheck } from "../services/embeddingService.js";
import * as vectorStore from "../services/vectorStore.js";
import type { AskDocumentsArgs, RAGToolResult } from "../data/documentTypes.js";

// Tool schema
export const askDocumentsSchema = {
  type: "object" as const,
  properties: {
    question: {
      type: "string",
      description: "문서에 대해 질문할 내용",
    },
    contextLimit: {
      type: "number",
      description: "참조할 문서 청크 수 (기본값: 5)",
      default: 5,
    },
  },
  required: ["question"],
};

// Tool definition
export const askDocumentsTool = {
  name: "ask_documents",
  description: "인덱싱된 문서 내용을 기반으로 질문에 답변합니다. NotebookLM처럼 문서에서 관련 정보를 찾아 제공합니다.",
  inputSchema: askDocumentsSchema,
};

// Tool implementation
export async function askDocuments(args: AskDocumentsArgs): Promise<RAGToolResult> {
  if (!args.question || args.question.trim().length === 0) {
    return {
      content: [{
        type: "text",
        text: "질문을 입력해주세요.",
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

  const contextLimit = args.contextLimit || 5;

  try {
    // Check if there are any indexed documents
    const docCount = await vectorStore.getDocumentCount();
    if (docCount === 0) {
      return {
        content: [{
          type: "text",
          text: "📭 인덱싱된 문서가 없습니다.\n\n" +
                "`index_documents` 도구를 사용하여 먼저 문서를 인덱싱하세요.",
        }],
      };
    }

    // Generate question embedding
    const questionEmbedding = await embed(args.question);

    // Search for relevant chunks
    const results = await vectorStore.search(questionEmbedding, contextLimit);

    if (results.length === 0) {
      return {
        content: [{
          type: "text",
          text: `📭 **"${args.question}"**\n\n` +
                "관련 문서를 찾을 수 없습니다.\n\n" +
                "**가능한 원인:**\n" +
                "- 인덱싱된 문서에 관련 내용이 없음\n" +
                "- 질문을 다르게 표현해 보세요\n\n" +
                "**팁:** `list_documents`로 인덱싱된 문서 목록을 확인하세요.",
        }],
      };
    }

    // Build context and response
    const lines: string[] = [
      `# ❓ 문서 기반 Q&A`,
      "",
      `**질문:** ${args.question}`,
      "",
      "---",
      "",
      "## 📚 관련 문서에서 찾은 내용",
      "",
    ];

    // Collect unique sources
    const sources = new Map<string, { filename: string; filepath: string; fileType: string }>();

    // Build context from chunks
    const contextParts: string[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const similarity = (result.similarity * 100).toFixed(1);

      // Track source
      if (!sources.has(result.documentId)) {
        sources.set(result.documentId, {
          filename: result.filename,
          filepath: result.filepath,
          fileType: result.fileType,
        });
      }

      const typeIcon = result.fileType === "pdf" ? "📄" :
                       result.fileType === "word" ? "📝" : "📊";

      lines.push(`### ${i + 1}. ${typeIcon} ${result.filename} (관련도: ${similarity}%)`);
      lines.push("");
      lines.push(`> ${result.chunkContent}`);
      lines.push("");

      contextParts.push(result.chunkContent);
    }

    // Add combined context for Claude to use
    lines.push("---");
    lines.push("");
    lines.push("## 💡 컨텍스트 요약");
    lines.push("");
    lines.push("위 문서 내용을 바탕으로 질문에 답변해 드리겠습니다.");
    lines.push("");
    lines.push("**참고 문서:**");

    for (const [, source] of sources) {
      const typeIcon = source.fileType === "pdf" ? "📄" :
                       source.fileType === "word" ? "📝" : "📊";
      lines.push(`- ${typeIcon} ${source.filename}`);
    }

    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push("**📝 답변을 위한 컨텍스트가 준비되었습니다.**");
    lines.push("");
    lines.push("위 내용을 바탕으로 질문에 답변해 주세요. 문서에 명시되지 않은 내용은 추측하지 마세요.");

    // Add raw context for Claude to process
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push("<document_context>");
    lines.push(contextParts.join("\n\n---\n\n"));
    lines.push("</document_context>");

    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{
        type: "text",
        text: `❌ Q&A 처리 중 오류 발생: ${errorMessage}`,
      }],
      isError: true,
    };
  }
}
