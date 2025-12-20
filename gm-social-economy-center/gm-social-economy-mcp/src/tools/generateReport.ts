/**
 * 보고서 생성 도구 (generate_report)
 * 
 * 광명시 사회적경제 기업 데이터를 바탕으로 보고서를 생성합니다.
 * 
 * 📚 사용 예시:
 * - "이번 분기 현황 보고서 작성해줘"
 * - "소하동 지역 분석 보고서 만들어줘"
 * - "시의회 제출용 요약 보고서"
 */

import { loadEnterprises, loadMetadata } from "../data/loader.js";
import type { Enterprise, EnterpriseType, Region, ReportType, ToolResult } from "../data/types.js";
import { filterByRegion, filterByType } from "../utils/filters.js";
import { calculateOverview } from "../utils/statistics.js";
import { formatKoreanDate, getCurrentQuarter, formatQuarter, formatCountTable } from "../utils/formatters.js";

/**
 * 도구 입력 파라미터 스키마
 */
export const generateReportSchema = {
  type: "object" as const,
  properties: {
    reportType: {
      type: "string",
      description: "보고서 유형",
      enum: ["quarterly", "regional", "summary", "detailed"],
      default: "summary",
    },
    title: {
      type: "string",
      description: "보고서 제목 (선택사항, 자동 생성됨)",
    },
    region: {
      type: "string",
      description: "특정 지역에 대한 보고서",
      enum: ["소하동", "일직동", "광명동", "철산동", "하안동", "노온사동", "가학동", "옥길동"],
    },
    enterpriseType: {
      type: "string",
      description: "특정 유형에 대한 보고서",
      enum: ["사회적기업", "(예비)사회적기업", "협동조합", "사회적협동조합", "마을기업"],
    },
  },
  required: [],
};

/**
 * 보고서 파라미터 인터페이스
 */
interface GenerateReportArgs {
  reportType?: ReportType;
  title?: string;
  region?: string;
  enterpriseType?: string;
}

/**
 * 분기 보고서를 생성합니다.
 */
function generateQuarterlyReport(enterprises: Enterprise[], metadata: any): string {
  const { year, quarter } = getCurrentQuarter();
  const overview = calculateOverview(enterprises);
  const topTypes = overview.byType.slice(0, 3);
  const topRegions = overview.byRegion.slice(0, 3);
  
  return `
# ${formatQuarter(year, quarter)} 광명시 사회적경제 현황 보고서

## 1. 개요

본 보고서는 ${formatQuarter(year, quarter)} 광명시사회적경제센터에 등록된 사회적경제 기업 현황을 분석하여 보고드립니다.

**작성일:** ${formatKoreanDate()}
**데이터 기준일:** ${metadata.lastUpdated}
**작성기관:** 광명시사회적경제센터

---

## 2. 전체 현황

| 구분 | 수치 |
|------|------|
| 등록 기업 수 | **${overview.totalEnterprises}개** |
| 기업 유형 | ${overview.totalTypes}개 유형 |
| 분포 지역 | ${overview.totalRegions}개 행정동 |

---

## 3. 유형별 분포

${formatCountTable(overview.byType, "유형별 기업 현황")}

**주요 특징:**
- ${topTypes[0].name}이(가) ${topTypes[0].count}개(${topTypes[0].percentage}%)로 가장 많음
- ${topTypes[1].name} ${topTypes[1].count}개(${topTypes[1].percentage}%), ${topTypes[2].name} ${topTypes[2].count}개(${topTypes[2].percentage}%) 순

---

## 4. 지역별 분포

${formatCountTable(overview.byRegion, "지역별 기업 현황")}

**주요 특징:**
- ${topRegions[0].name}에 ${topRegions[0].count}개(${topRegions[0].percentage}%)로 가장 많이 분포
- 상위 3개 지역(${topRegions.map(r => r.name).join(", ")})에 전체의 ${(topRegions[0].percentage + topRegions[1].percentage + topRegions[2].percentage).toFixed(1)}% 집중

---

## 5. 향후 계획

*(이 부분은 담당자가 작성해 주세요)*

- 
- 
- 

---

## 6. 첨부

- 첨부 1: 기업 상세 목록
- 첨부 2: 유형별 상세 현황

---

**문의처:** 광명시사회적경제센터 (${metadata.centerContact.phone})
`.trim();
}

/**
 * 지역 분석 보고서를 생성합니다.
 */
function generateRegionalReport(
  enterprises: Enterprise[], 
  allEnterprises: Enterprise[],
  region: Region,
  metadata: any
): string {
  const overview = calculateOverview(enterprises);
  const totalOverview = calculateOverview(allEnterprises);
  const regionPercentage = ((enterprises.length / allEnterprises.length) * 100).toFixed(1);
  
  return `
# ${region} 지역 사회적경제 기업 분석 보고서

## 1. 개요

**분석 대상:** ${region} 소재 사회적경제 기업
**작성일:** ${formatKoreanDate()}
**데이터 기준일:** ${metadata.lastUpdated}

---

## 2. 현황 요약

| 구분 | ${region} | 광명시 전체 | 비율 |
|------|----------|------------|------|
| 기업 수 | **${enterprises.length}개** | ${allEnterprises.length}개 | ${regionPercentage}% |
| 유형 수 | ${overview.totalTypes}개 | ${totalOverview.totalTypes}개 | - |

---

## 3. 유형별 분포

${formatCountTable(overview.byType, `${region} 유형별 현황`)}

---

## 4. 주요 기업 목록

| 기업명 | 유형 | 주요 사업 | 연락처 |
|--------|------|----------|--------|
${enterprises.slice(0, 10).map(e => 
  `| ${e.name} | ${e.type} | ${e.product.slice(0, 15)}${e.product.length > 15 ? '...' : ''} | ${e.phone} |`
).join('\n')}

${enterprises.length > 10 ? `\n> *외 ${enterprises.length - 10}개 기업*` : ''}

---

## 5. 시사점 및 제언

*(담당자 작성 영역)*

**강점:**
- 

**개선 필요 사항:**
- 

**정책 제언:**
- 

---

**문의처:** 광명시사회적경제센터 (${metadata.centerContact.phone})
`.trim();
}

/**
 * 요약 보고서를 생성합니다.
 */
function generateSummaryReport(enterprises: Enterprise[], metadata: any): string {
  const overview = calculateOverview(enterprises);
  const topType = overview.byType[0];
  const topRegion = overview.byRegion[0];
  
  return `
# 광명시 사회적경제 현황 요약

**기준일:** ${metadata.lastUpdated} | **작성일:** ${formatKoreanDate()}

---

## 핵심 지표

| 지표 | 수치 |
|------|------|
| 📊 전체 기업 수 | **${overview.totalEnterprises}개** |
| 🏢 최다 유형 | ${topType.name} (${topType.count}개, ${topType.percentage}%) |
| 📍 최다 지역 | ${topRegion.name} (${topRegion.count}개, ${topRegion.percentage}%) |

---

## 유형별 현황

${overview.byType.map(item => 
  `- **${item.name}**: ${item.count}개 (${item.percentage}%)`
).join('\n')}

---

## 지역별 현황

${overview.byRegion.map(item => 
  `- **${item.name}**: ${item.count}개 (${item.percentage}%)`
).join('\n')}

---

*출처: 광명시사회적경제센터 (${metadata.centerContact.phone})*
`.trim();
}

/**
 * 상세 보고서를 생성합니다.
 */
function generateDetailedReport(enterprises: Enterprise[], metadata: any): string {
  const overview = calculateOverview(enterprises);
  
  // 유형별 기업 그룹화
  const byTypeGroups: Record<string, Enterprise[]> = {};
  enterprises.forEach(e => {
    if (!byTypeGroups[e.type]) {
      byTypeGroups[e.type] = [];
    }
    byTypeGroups[e.type].push(e);
  });
  
  let typeDetails = "";
  for (const [type, typeEnterprises] of Object.entries(byTypeGroups)) {
    typeDetails += `
### ${type} (${typeEnterprises.length}개)

| 기업명 | 지역 | 주요 사업 | 연락처 |
|--------|------|----------|--------|
${typeEnterprises.map(e => 
  `| ${e.name} | ${e.region} | ${e.product.slice(0, 20)}${e.product.length > 20 ? '...' : ''} | ${e.phone} |`
).join('\n')}

`;
  }
  
  return `
# 광명시 사회적경제 기업 상세 보고서

**작성일:** ${formatKoreanDate()}
**데이터 기준일:** ${metadata.lastUpdated}
**전체 기업 수:** ${overview.totalEnterprises}개

---

## 1. 전체 현황 요약

${formatCountTable(overview.byType, "유형별 분포")}

${formatCountTable(overview.byRegion, "지역별 분포")}

---

## 2. 유형별 기업 상세 목록

${typeDetails}

---

## 3. 데이터 출처

- **출처:** ${metadata.source}
- **URL:** ${metadata.sourceUrl}
- **문의:** ${metadata.centerContact.phone}
- **주소:** ${metadata.centerContact.address}
- **이메일:** ${metadata.centerContact.email}

---

*본 보고서는 광명시사회적경제센터 등록 데이터를 기반으로 자동 생성되었습니다.*
`.trim();
}

/**
 * 보고서를 생성합니다.
 * 
 * @param args - 보고서 파라미터
 * @returns MCP 도구 결과
 */
export async function generateReport(args: GenerateReportArgs): Promise<ToolResult> {
  try {
    // 데이터 로드
    let enterprises = await loadEnterprises();
    const allEnterprises = [...enterprises];
    const metadata = await loadMetadata();
    
    // 필터 적용
    if (args.region) {
      enterprises = filterByRegion(enterprises, args.region as Region);
    }
    if (args.enterpriseType) {
      enterprises = filterByType(enterprises, args.enterpriseType as EnterpriseType);
    }
    
    // 데이터가 없는 경우
    if (enterprises.length === 0) {
      return {
        content: [{
          type: "text",
          text: "❌ 해당 조건에 맞는 기업이 없어 보고서를 생성할 수 없습니다.",
        }],
        isError: true,
      };
    }
    
    // 보고서 유형에 따른 생성
    const reportType = args.reportType || "summary";
    let reportContent = "";
    
    switch (reportType) {
      case "quarterly":
        reportContent = generateQuarterlyReport(enterprises, metadata);
        break;
        
      case "regional":
        if (!args.region) {
          return {
            content: [{
              type: "text",
              text: "❌ 지역 분석 보고서를 생성하려면 지역을 지정해 주세요.",
            }],
            isError: true,
          };
        }
        reportContent = generateRegionalReport(
          enterprises, 
          allEnterprises, 
          args.region as Region, 
          metadata
        );
        break;
        
      case "detailed":
        reportContent = generateDetailedReport(enterprises, metadata);
        break;
        
      case "summary":
      default:
        reportContent = generateSummaryReport(enterprises, metadata);
    }
    
    // 커스텀 제목이 있으면 교체
    if (args.title) {
      const lines = reportContent.split("\n");
      if (lines[0].startsWith("# ")) {
        lines[0] = `# ${args.title}`;
        reportContent = lines.join("\n");
      }
    }
    
    return {
      content: [{
        type: "text",
        text: reportContent,
      }],
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    
    return {
      content: [{
        type: "text",
        text: `❌ 보고서 생성 중 오류가 발생했습니다: ${errorMessage}`,
      }],
      isError: true,
    };
  }
}

/**
 * 도구 정의 객체
 */
export const generateReportTool = {
  name: "generate_report",
  description: `광명시 사회적경제 기업 보고서를 생성합니다.

사용 예시:
- 분기 보고서: "이번 분기 현황 보고서 작성해줘"
- 지역 분석: "소하동 지역 분석 보고서 만들어줘"
- 요약 보고서: "시의회 제출용 요약 보고서"
- 상세 보고서: "전체 기업 목록 포함한 상세 보고서"

보고서 유형:
- quarterly: 분기 보고서 (구조화된 공식 보고서)
- regional: 지역 분석 보고서 (특정 지역 심층 분석)
- summary: 요약 보고서 (한 페이지 핵심 요약)
- detailed: 상세 보고서 (전체 기업 목록 포함)`,
  inputSchema: generateReportSchema,
};
