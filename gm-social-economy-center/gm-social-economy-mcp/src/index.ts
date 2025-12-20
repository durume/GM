#!/usr/bin/env node

/**
 * GM Social Economy MCP Server
 * 
 * 광명시 사회적경제 업무 지원을 위한 MCP 서버입니다.
 * 
 * 📚 이 파일의 역할:
 * - MCP 서버를 시작하고 Claude와 연결합니다.
 * - 사용 가능한 도구(Tools)를 등록합니다.
 * - Claude로부터 받은 요청을 처리합니다.
 * 
 * 🚀 실행 방법:
 * $ npm run build
 * $ node dist/index.js
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 기존 도구 임포트
import { searchEnterprises, searchEnterprisesTool } from "./tools/searchEnterprises.js";
import { getStatistics, getStatisticsTool } from "./tools/getStatistics.js";
import { generateReport, generateReportTool } from "./tools/generateReport.js";

// RAG 도구 임포트
import { indexDocuments, indexDocumentsTool } from "./tools/indexDocuments.js";
import { searchDocuments, searchDocumentsTool } from "./tools/searchDocuments.js";
import { askDocuments, askDocumentsTool } from "./tools/askDocuments.js";
import { listDocuments, listDocumentsTool } from "./tools/listDocuments.js";

// 데이터 임포트
import { loadMetadata, validateData } from "./data/loader.js";

// ============================================================
// 서버 초기화
// ============================================================

/**
 * MCP 서버 인스턴스 생성
 */
const server = new Server(
  {
    name: "gm-social-economy-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},       // 도구(Tools) 기능 활성화
      resources: {},   // 리소스(Resources) 기능 활성화
    },
  }
);

// ============================================================
// 도구(Tools) 핸들러
// ============================================================

/**
 * 사용 가능한 도구 목록 반환
 * 
 * Claude가 "어떤 도구를 사용할 수 있나요?"라고 물으면 이 핸들러가 호출됩니다.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // 기존 사회적경제 기업 도구
      searchEnterprisesTool,
      getStatisticsTool,
      generateReportTool,
      // RAG 문서 검색 도구
      indexDocumentsTool,
      searchDocumentsTool,
      askDocumentsTool,
      listDocumentsTool,
    ],
  };
});

/**
 * 도구 실행 핸들러
 *
 * Claude가 특정 도구를 사용하려고 하면 이 핸들러가 호출됩니다.
 */
server.setRequestHandler(CallToolRequestSchema, async (request): Promise<{
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}> => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // 기존 사회적경제 기업 도구
      case "search_enterprises":
        return await searchEnterprises(args as any);

      case "get_statistics":
        return await getStatistics(args as any);

      case "generate_report":
        return await generateReport(args as any);

      // RAG 문서 검색 도구
      case "index_documents":
        return await indexDocuments(args as any);

      case "search_documents":
        return await searchDocuments(args as any);

      case "ask_documents":
        return await askDocuments(args as any);

      case "list_documents":
        return await listDocuments(args as any);

      default:
        return {
          content: [{
            type: "text" as const,
            text: `❌ 알 수 없는 도구입니다: ${name}`,
          }],
          isError: true,
        };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      content: [{
        type: "text" as const,
        text: `❌ 도구 실행 중 오류가 발생했습니다: ${errorMessage}`,
      }],
      isError: true,
    };
  }
});

// ============================================================
// 리소스(Resources) 핸들러
// ============================================================

/**
 * 사용 가능한 리소스 목록 반환
 * 
 * 리소스는 Claude가 직접 읽을 수 있는 데이터를 의미합니다.
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "gm-social-economy://metadata",
        name: "광명시 사회적경제 데이터 정보",
        description: "데이터 출처, 업데이트 일자, 센터 연락처 등의 메타 정보",
        mimeType: "application/json",
      },
      {
        uri: "gm-social-economy://summary",
        name: "광명시 사회적경제 현황 요약",
        description: "전체 기업 수, 유형별/지역별 분포 요약",
        mimeType: "text/plain",
      },
    ],
  };
});

/**
 * 리소스 읽기 핸들러
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  
  try {
    switch (uri) {
      case "gm-social-economy://metadata": {
        const metadata = await loadMetadata();
        return {
          contents: [{
            uri,
            mimeType: "application/json",
            text: JSON.stringify(metadata, null, 2),
          }],
        };
      }
      
      case "gm-social-economy://summary": {
        const result = await getStatistics({ statisticsType: "overview" });
        return {
          contents: [{
            uri,
            mimeType: "text/plain",
            text: result.content[0].text,
          }],
        };
      }
      
      default:
        throw new Error(`알 수 없는 리소스: ${uri}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`리소스 읽기 실패: ${errorMessage}`);
  }
});

// ============================================================
// 서버 시작
// ============================================================

/**
 * 서버를 시작합니다.
 */
async function main(): Promise<void> {
  // 데이터 유효성 검사
  const validation = await validateData();
  if (!validation.valid) {
    console.error(`❌ 데이터 검증 실패: ${validation.message}`);
    process.exit(1);
  }
  
  // 표준 입출력(stdio)을 통한 통신 설정
  // Claude Desktop은 이 방식으로 MCP 서버와 통신합니다.
  const transport = new StdioServerTransport();
  
  // 서버 연결
  await server.connect(transport);
  
  // 시작 로그 (stderr로 출력하여 stdout 통신에 영향 없도록)
  console.error("🚀 GM Social Economy MCP Server started");
  console.error(`📊 ${validation.message}`);
  console.error("📚 RAG 문서 검색 기능이 활성화되었습니다.");
}

// 서버 실행
main().catch((error) => {
  console.error("서버 시작 실패:", error);
  process.exit(1);
});
