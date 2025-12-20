/**
 * List Documents Tool
 * 인덱싱된 문서 목록 조회
 */

import * as vectorStore from "../services/vectorStore.js";
import type { ListDocumentsArgs, RAGToolResult } from "../data/documentTypes.js";

// Tool schema
export const listDocumentsSchema = {
  type: "object" as const,
  properties: {
    fileType: {
      type: "string",
      description: "파일 유형으로 필터링 (pdf, word, excel)",
      enum: ["pdf", "word", "excel"],
    },
  },
};

// Tool definition
export const listDocumentsTool = {
  name: "list_documents",
  description: "인덱싱된 모든 문서 목록을 표시합니다. 파일 유형별로 필터링할 수 있습니다.",
  inputSchema: listDocumentsSchema,
};

// Format date
function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Tool implementation
export async function listDocuments(args: ListDocumentsArgs): Promise<RAGToolResult> {
  try {
    const documents = await vectorStore.listDocuments(args.fileType);

    if (documents.length === 0) {
      let message = "인덱싱된 문서가 없습니다.";
      if (args.fileType) {
        message = `'${args.fileType}' 유형의 인덱싱된 문서가 없습니다.`;
      }
      message += "\n\n`index_documents` 도구를 사용하여 문서를 인덱싱하세요.";

      return {
        content: [{ type: "text", text: message }],
      };
    }

    // Build result table
    const lines: string[] = [
      "# 📚 인덱싱된 문서 목록",
      "",
    ];

    if (args.fileType) {
      lines.push(`**필터:** ${args.fileType.toUpperCase()} 파일`);
      lines.push("");
    }

    lines.push(`**총 ${documents.length}개 문서**`);
    lines.push("");
    lines.push("| # | 파일명 | 유형 | 청크 수 | 인덱싱 일시 |");
    lines.push("|---|--------|------|---------|------------|");

    documents.forEach((doc, index) => {
      const typeIcon = doc.fileType === "pdf" ? "📄" :
                       doc.fileType === "word" ? "📝" : "📊";
      lines.push(
        `| ${index + 1} | ${typeIcon} ${doc.filename} | ${doc.fileType.toUpperCase()} | ${doc.chunkCount} | ${formatDate(doc.indexedAt)} |`
      );
    });

    // Summary
    const totalChunks = documents.reduce((sum, doc) => sum + doc.chunkCount, 0);
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push("### 📊 요약");
    lines.push(`- 총 문서: ${documents.length}개`);
    lines.push(`- 총 청크: ${totalChunks}개`);

    // Type breakdown
    const typeCounts = documents.reduce((acc, doc) => {
      acc[doc.fileType] = (acc[doc.fileType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    lines.push("- 유형별: " + Object.entries(typeCounts)
      .map(([type, count]) => `${type.toUpperCase()} ${count}개`)
      .join(", "));

    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `문서 목록 조회 중 오류 발생: ${errorMessage}` }],
      isError: true,
    };
  }
}
