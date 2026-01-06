/**
 * Index Documents Tool
 * 폴더 내 문서 스캔 및 인덱싱
 */

import { RAGConfig } from "../config/rag.config.js";
import { parseDocument, scanFolder } from "../services/documentParser.js";
import { embed, healthCheck } from "../services/embeddingService.js";
import * as vectorStore from "../services/vectorStore.js";
import type { IndexDocumentsArgs, RAGToolResult, IndexResult } from "../data/documentTypes.js";

// Tool schema
export const indexDocumentsSchema = {
  type: "object" as const,
  properties: {
    folderPath: {
      type: "string",
      description: "인덱싱할 폴더 경로 (기본값: Google Drive 폴더)",
    },
    recursive: {
      type: "boolean",
      description: "하위 폴더 포함 여부 (기본값: true)",
      default: true,
    },
  },
};

// Tool definition
export const indexDocumentsTool = {
  name: "index_documents",
  description: "Google Drive 또는 지정된 폴더에서 PDF, Word, Excel 문서를 스캔하고 검색 인덱스를 업데이트합니다.",
  inputSchema: indexDocumentsSchema,
};

// Tool implementation
export async function indexDocuments(args: IndexDocumentsArgs): Promise<RAGToolResult> {
  const folderPath = args.folderPath || RAGConfig.driveFolderPath;
  const recursive = args.recursive !== false;

  // Check Ollama availability
  const health = await healthCheck();
  if (!health.ollamaAvailable || !health.modelAvailable) {
    return {
      content: [{
        type: "text",
        text: `⚠️ 임베딩 서비스 오류\n\n${health.message}\n\n` +
              "**Ollama 설치 방법:**\n" +
              "1. https://ollama.ai/download 에서 다운로드\n" +
              "2. 설치 후 터미널에서: `ollama pull nomic-embed-text`\n" +
              "3. Ollama가 실행 중인지 확인",
      }],
      isError: true,
    };
  }

  const result: IndexResult = {
    success: true,
    documentsIndexed: 0,
    documentsSkipped: 0,
    errors: [],
    totalChunks: 0,
  };

  try {
    // Scan folder for documents
    const files = scanFolder(folderPath, recursive);

    if (files.length === 0) {
      return {
        content: [{
          type: "text",
          text: `📂 **${folderPath}**\n\n` +
                "지원되는 문서 파일을 찾을 수 없습니다.\n\n" +
                `**지원 형식:** ${RAGConfig.supportedExtensions.join(", ")}`,
        }],
      };
    }

    const progressLines: string[] = [
      `# 📁 문서 인덱싱`,
      "",
      `**폴더:** ${folderPath}`,
      `**발견된 파일:** ${files.length}개`,
      "",
      "---",
      "",
    ];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const filepath = files[i];
      const filename = filepath.split(/[/\\]/).pop() || filepath;

      try {
        // Check if already indexed
        const existingDoc = await vectorStore.getDocument(filepath);
        if (existingDoc) {
          result.documentsSkipped++;
          continue;
        }

        // Parse document
        const doc = await parseDocument(filepath);

        // Generate embeddings for each chunk
        const embeddings: number[][] = [];
        for (const chunk of doc.chunks) {
          const embedding = await embed(chunk.content);
          embeddings.push(embedding);
        }

        // Store in vector store
        await vectorStore.addDocument(doc, embeddings);

        result.documentsIndexed++;
        result.totalChunks += doc.chunks.length;

        progressLines.push(`✅ ${filename} (${doc.chunks.length} 청크)`);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        result.errors.push(`${filename}: ${errorMessage}`);
        progressLines.push(`❌ ${filename}: ${errorMessage}`);
      }
    }

    // Build result summary
    progressLines.push("");
    progressLines.push("---");
    progressLines.push("");
    progressLines.push("## 📊 결과 요약");
    progressLines.push("");
    progressLines.push(`| 항목 | 수량 |`);
    progressLines.push(`|------|------|`);
    progressLines.push(`| 인덱싱된 문서 | ${result.documentsIndexed}개 |`);
    progressLines.push(`| 건너뛴 문서 (이미 인덱싱됨) | ${result.documentsSkipped}개 |`);
    progressLines.push(`| 실패한 문서 | ${result.errors.length}개 |`);
    progressLines.push(`| 총 청크 수 | ${result.totalChunks}개 |`);

    if (result.errors.length > 0) {
      progressLines.push("");
      progressLines.push("### ⚠️ 오류 목록");
      result.errors.forEach(err => {
        progressLines.push(`- ${err}`);
      });
    }

    progressLines.push("");
    progressLines.push("---");
    progressLines.push("");
    progressLines.push("💡 **다음 단계:**");
    progressLines.push("- `search_documents` - 문서 검색");
    progressLines.push("- `ask_documents` - 문서 기반 Q&A");
    progressLines.push("- `list_documents` - 인덱싱된 문서 목록");

    return {
      content: [{ type: "text", text: progressLines.join("\n") }],
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{
        type: "text",
        text: `❌ 인덱싱 중 오류 발생\n\n**오류:** ${errorMessage}\n\n` +
              `**폴더:** ${folderPath}`,
      }],
      isError: true,
    };
  }
}
