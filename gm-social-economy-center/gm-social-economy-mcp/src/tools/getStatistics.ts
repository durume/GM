/**
 * 통계 생성 도구 (get_statistics)
 * 
 * 광명시 사회적경제 기업 데이터로부터 다양한 통계를 생성합니다.
 * 
 * 📚 사용 예시:
 * - "전체 현황 알려줘"
 * - "유형별 분포 통계 만들어줘"
 * - "소하동과 철산동 비교해줘"
 */

import { loadEnterprises } from "../data/loader.js";
import type { EnterpriseType, Region, StatisticsType, ToolResult } from "../data/types.js";
import { filterByRegion, filterByType } from "../utils/filters.js";
import { 
  calculateOverview, 
  countByType, 
  countByRegion, 
  toCountItems,
  compareCategories 
} from "../utils/statistics.js";
import { 
  formatOverviewStatistics, 
  formatCountTable, 
  formatComparison,
  formatSimpleStats 
} from "../utils/formatters.js";

/**
 * 도구 입력 파라미터 스키마
 */
export const getStatisticsSchema = {
  type: "object" as const,
  properties: {
    statisticsType: {
      type: "string",
      description: "생성할 통계 유형",
      enum: ["overview", "byType", "byRegion", "comparison"],
      default: "overview",
    },
    compareItems: {
      type: "array",
      items: { type: "string" },
      description: "비교할 항목들 (comparison 유형일 때). 예: ['소하동', '철산동'] 또는 ['사회적기업', '협동조합']",
    },
    compareCategory: {
      type: "string",
      description: "비교 카테고리 (comparison 유형일 때)",
      enum: ["type", "region"],
    },
    filterRegion: {
      type: "string",
      description: "특정 지역만 분석할 때",
      enum: ["소하동", "일직동", "광명동", "철산동", "하안동", "노온사동", "가학동", "옥길동"],
    },
    filterType: {
      type: "string",
      description: "특정 유형만 분석할 때",
      enum: ["사회적기업", "(예비)사회적기업", "협동조합", "사회적협동조합", "마을기업"],
    },
  },
  required: [],
};

/**
 * 통계 파라미터 인터페이스
 */
interface GetStatisticsArgs {
  statisticsType?: StatisticsType;
  compareItems?: string[];
  compareCategory?: "type" | "region";
  filterRegion?: string;
  filterType?: string;
}

/**
 * 통계를 생성합니다.
 * 
 * @param args - 통계 파라미터
 * @returns MCP 도구 결과
 */
export async function getStatistics(args: GetStatisticsArgs): Promise<ToolResult> {
  try {
    // 데이터 로드
    let enterprises = await loadEnterprises();
    
    // 필터 적용
    if (args.filterRegion) {
      enterprises = filterByRegion(enterprises, args.filterRegion as Region);
    }
    if (args.filterType) {
      enterprises = filterByType(enterprises, args.filterType as EnterpriseType);
    }
    
    // 통계 유형에 따른 처리
    const statsType = args.statisticsType || "overview";
    let resultText = "";
    
    switch (statsType) {
      case "overview": {
        const overview = calculateOverview(enterprises);
        resultText = formatOverviewStatistics(overview);
        break;
      }
      
      case "byType": {
        const counts = countByType(enterprises);
        const items = toCountItems(counts, enterprises.length);
        resultText = [
          `# 📊 유형별 기업 현황`,
          ``,
          `> 전체 ${enterprises.length}개 기업 기준`,
          ``,
          formatCountTable(items, "유형별 분포"),
        ].join("\n");
        break;
      }
      
      case "byRegion": {
        const counts = countByRegion(enterprises);
        const items = toCountItems(counts, enterprises.length);
        resultText = [
          `# 📍 지역별 기업 현황`,
          ``,
          `> 전체 ${enterprises.length}개 기업 기준`,
          ``,
          formatCountTable(items, "지역별 분포"),
        ].join("\n");
        break;
      }
      
      case "comparison": {
        if (!args.compareItems || args.compareItems.length < 2) {
          return {
            content: [{
              type: "text",
              text: "❌ 비교를 위해서는 2개 항목이 필요합니다. 예: ['소하동', '철산동']",
            }],
            isError: true,
          };
        }
        
        const category = args.compareCategory || "region";
        const comparison = compareCategories(
          enterprises,
          args.compareItems[0],
          args.compareItems[1],
          category
        );
        
        resultText = formatComparison(
          comparison.category1,
          comparison.category2,
          comparison.difference
        );
        break;
      }
      
      default:
        resultText = formatSimpleStats(calculateOverview(enterprises));
    }
    
    // 필터 정보 추가
    if (args.filterRegion || args.filterType) {
      const filterInfo: string[] = [];
      if (args.filterRegion) filterInfo.push(`지역: ${args.filterRegion}`);
      if (args.filterType) filterInfo.push(`유형: ${args.filterType}`);
      
      resultText = `> 📌 필터 적용됨: ${filterInfo.join(", ")}\n\n${resultText}`;
    }
    
    return {
      content: [{
        type: "text",
        text: resultText,
      }],
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    
    return {
      content: [{
        type: "text",
        text: `❌ 통계 생성 중 오류가 발생했습니다: ${errorMessage}`,
      }],
      isError: true,
    };
  }
}

/**
 * 도구 정의 객체
 */
export const getStatisticsTool = {
  name: "get_statistics",
  description: `광명시 사회적경제 기업 통계를 생성합니다.

사용 예시:
- 전체 개요: "사회적경제 기업 현황 통계 알려줘"
- 유형별 분석: "유형별로 몇 개씩 있어?"
- 지역별 분석: "지역별 분포 보여줘"
- 비교 분석: "소하동과 철산동 기업 수 비교해줘"
- 특정 지역 분석: "소하동의 유형별 현황"

통계 유형:
- overview: 전체 개요 (기본값)
- byType: 유형별 분포
- byRegion: 지역별 분포
- comparison: 두 항목 비교`,
  inputSchema: getStatisticsSchema,
};
