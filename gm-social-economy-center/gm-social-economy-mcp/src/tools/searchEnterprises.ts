/**
 * 기업 검색 도구 (search_enterprises)
 * 
 * 광명시 사회적경제 기업을 다양한 조건으로 검색합니다.
 * 
 * 📚 사용 예시:
 * - "소하동에 있는 기업 찾아줘"
 * - "사회적협동조합 목록 보여줘"
 * - "카페 운영하는 곳 있어?"
 */

import { loadEnterprises } from "../data/loader.js";
import type { EnterpriseType, Region, SearchParams, SearchResult, ToolResult } from "../data/types.js";
import { filterEnterprises, extractRegion, extractType } from "../utils/filters.js";
import { formatSearchResult } from "../utils/formatters.js";

/**
 * 도구 입력 파라미터 스키마
 * 
 * MCP 클라이언트(Claude)에게 이 도구가 어떤 입력을 받는지 알려줍니다.
 */
export const searchEnterprisesSchema = {
  type: "object" as const,
  properties: {
    region: {
      type: "string",
      description: "검색할 지역 (예: 소하동, 철산동, 하안동 등)",
      enum: ["소하동", "일직동", "광명동", "철산동", "하안동", "노온사동", "가학동", "옥길동"],
    },
    type: {
      type: "string",
      description: "검색할 기업 유형",
      enum: ["사회적기업", "(예비)사회적기업", "협동조합", "사회적협동조합", "마을기업"],
    },
    keyword: {
      type: "string",
      description: "검색 키워드 (기업명, 사업내용, 주소에서 검색)",
    },
    query: {
      type: "string",
      description: "자연어 검색어 (예: '소하동에 있는 카페 사회적기업'). region, type, keyword가 지정되지 않은 경우 이 값에서 자동 추출합니다.",
    },
    limit: {
      type: "number",
      description: "최대 결과 수 (기본값: 전체)",
    },
  },
  required: [],
};

/**
 * 검색 파라미터 인터페이스
 */
interface SearchEnterprisesArgs {
  region?: string;
  type?: string;
  keyword?: string;
  query?: string;
  limit?: number;
}

/**
 * 자연어 쿼리에서 검색 파라미터를 추출합니다.
 */
function parseNaturalQuery(query: string): Partial<SearchParams> {
  const params: Partial<SearchParams> = {};
  
  // 지역 추출
  const region = extractRegion(query);
  if (region) {
    params.region = region;
  }
  
  // 유형 추출
  const type = extractType(query);
  if (type) {
    params.type = type;
  }
  
  // 남은 키워드 추출 (지역명과 유형명 제거 후)
  let remainingQuery = query;
  if (region) {
    remainingQuery = remainingQuery.replace(region, "");
  }
  if (type) {
    remainingQuery = remainingQuery.replace(type, "");
  }
  
  // 일반적인 접속사/조사 제거
  const stopWords = ["에", "있는", "인", "의", "을", "를", "이", "가", "은", "는", "찾아줘", "보여줘", "알려줘", "목록", "리스트", "기업", "중에", "중", "에서"];
  stopWords.forEach(word => {
    remainingQuery = remainingQuery.replace(new RegExp(word, "g"), " ");
  });
  
  // 공백 정리
  remainingQuery = remainingQuery.trim().replace(/\s+/g, " ");
  
  // 남은 것이 있으면 키워드로 사용
  if (remainingQuery.length >= 2) {
    params.keyword = remainingQuery;
  }
  
  return params;
}

/**
 * 기업 검색을 실행합니다.
 * 
 * @param args - 검색 파라미터
 * @returns MCP 도구 결과
 */
export async function searchEnterprises(args: SearchEnterprisesArgs): Promise<ToolResult> {
  try {
    // 데이터 로드
    const enterprises = await loadEnterprises();
    
    // 검색 파라미터 구성
    let searchParams: SearchParams = {};
    
    // 명시적 파라미터 우선
    if (args.region) {
      searchParams.region = args.region as Region;
    }
    if (args.type) {
      searchParams.type = args.type as EnterpriseType;
    }
    if (args.keyword) {
      searchParams.keyword = args.keyword;
    }
    
    // 자연어 쿼리에서 추출 (명시적 파라미터가 없는 경우)
    if (args.query && !args.region && !args.type && !args.keyword) {
      const parsed = parseNaturalQuery(args.query);
      searchParams = { ...parsed, ...searchParams };
    }
    
    if (args.limit) {
      searchParams.limit = args.limit;
    }
    
    // 검색 실행
    const filteredEnterprises = filterEnterprises(enterprises, searchParams);
    
    // 결과 구성
    const result: SearchResult = {
      enterprises: filteredEnterprises,
      totalCount: filteredEnterprises.length,
      appliedFilters: {
        region: searchParams.region,
        type: searchParams.type,
        keyword: searchParams.keyword,
      },
    };
    
    // 결과 포맷팅
    const formattedResult = formatSearchResult(result);
    
    return {
      content: [
        {
          type: "text",
          text: formattedResult,
        },
      ],
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    
    return {
      content: [
        {
          type: "text",
          text: `❌ 검색 중 오류가 발생했습니다: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * 도구 정의 객체
 * MCP 서버에 등록할 때 사용합니다.
 */
export const searchEnterprisesTool = {
  name: "search_enterprises",
  description: `광명시 사회적경제 기업을 검색합니다.

사용 예시:
- 지역으로 검색: "소하동에 있는 기업 찾아줘"
- 유형으로 검색: "사회적협동조합 목록 보여줘"
- 키워드로 검색: "카페 운영하는 곳 있어?"
- 복합 검색: "철산동 마을기업 중 교육 관련"

지원하는 지역: 소하동, 일직동, 광명동, 철산동, 하안동, 노온사동, 가학동, 옥길동
지원하는 유형: 사회적기업, (예비)사회적기업, 협동조합, 사회적협동조합, 마을기업`,
  inputSchema: searchEnterprisesSchema,
};
