/**
 * 포맷팅 유틸리티 (Formatting Utilities)
 * 
 * 데이터를 읽기 좋은 형태로 변환하는 함수들입니다.
 * 
 * 📚 초보자를 위한 설명:
 * - 이 함수들은 데이터를 예쁘게 표시하기 위한 것입니다.
 * - 마크다운 형식으로 출력하면 Claude가 보기 좋게 렌더링합니다.
 */

import type { Enterprise, CountItem, OverviewStatistics, SearchResult } from "../data/types.js";

/**
 * 기업 정보를 간단한 한 줄로 포맷합니다.
 */
export function formatEnterpriseOneLine(enterprise: Enterprise): string {
  return `${enterprise.name} (${enterprise.type}) - ${enterprise.region}`;
}

/**
 * 기업 정보를 상세하게 포맷합니다.
 */
export function formatEnterpriseDetail(enterprise: Enterprise): string {
  const lines = [
    `### ${enterprise.name}`,
    ``,
    `| 항목 | 내용 |`,
    `|------|------|`,
    `| 유형 | ${enterprise.type} |`,
    `| 지역 | ${enterprise.region} |`,
    `| 주소 | ${enterprise.address} |`,
    `| 연락처 | ${enterprise.phone} |`,
    `| 주요 사업 | ${enterprise.product} |`,
  ];
  
  if (enterprise.website) {
    lines.push(`| 웹사이트 | ${enterprise.website} |`);
  }
  
  return lines.join("\n");
}

/**
 * 기업 목록을 테이블 형태로 포맷합니다.
 */
export function formatEnterpriseTable(enterprises: Enterprise[]): string {
  if (enterprises.length === 0) {
    return "검색 결과가 없습니다.";
  }
  
  const lines = [
    `| # | 기업명 | 유형 | 지역 | 주요 사업 | 연락처 |`,
    `|---|--------|------|------|----------|--------|`,
  ];
  
  enterprises.forEach((e, index) => {
    // 사업 내용이 너무 길면 자르기
    const product = e.product.length > 20 ? e.product.slice(0, 20) + "..." : e.product;
    lines.push(`| ${index + 1} | ${e.name} | ${e.type} | ${e.region} | ${product} | ${e.phone} |`);
  });
  
  return lines.join("\n");
}

/**
 * 검색 결과를 포맷합니다.
 */
export function formatSearchResult(result: SearchResult): string {
  const lines: string[] = [];
  
  // 헤더
  lines.push(`## 🔍 검색 결과`);
  lines.push(``);
  
  // 필터 정보
  const filters: string[] = [];
  if (result.appliedFilters.region) {
    filters.push(`지역: ${result.appliedFilters.region}`);
  }
  if (result.appliedFilters.type) {
    filters.push(`유형: ${result.appliedFilters.type}`);
  }
  if (result.appliedFilters.keyword) {
    filters.push(`키워드: "${result.appliedFilters.keyword}"`);
  }
  
  if (filters.length > 0) {
    lines.push(`**적용된 필터:** ${filters.join(", ")}`);
    lines.push(``);
  }
  
  // 결과 수
  lines.push(`**검색 결과:** ${result.totalCount}개 기업`);
  lines.push(``);
  
  // 테이블
  if (result.enterprises.length > 0) {
    lines.push(formatEnterpriseTable(result.enterprises));
  }
  
  return lines.join("\n");
}

/**
 * CountItem 배열을 테이블로 포맷합니다.
 */
export function formatCountTable(items: CountItem[], title: string): string {
  const lines = [
    `### ${title}`,
    ``,
    `| 구분 | 기업 수 | 비율 |`,
    `|------|--------|------|`,
  ];
  
  items.forEach(item => {
    lines.push(`| ${item.name} | ${item.count}개 | ${item.percentage}% |`);
  });
  
  return lines.join("\n");
}

/**
 * 전체 개요 통계를 포맷합니다.
 */
export function formatOverviewStatistics(stats: OverviewStatistics, asOfDate?: string): string {
  const date = asOfDate || new Date().toISOString().split("T")[0];
  
  const lines = [
    `# 📊 광명시 사회적경제 기업 현황`,
    ``,
    `> 기준일: ${date}`,
    ``,
    `## 개요`,
    ``,
    `| 구분 | 수치 |`,
    `|------|------|`,
    `| 전체 기업 수 | **${stats.totalEnterprises}개** |`,
    `| 기업 유형 | ${stats.totalTypes}개 유형 |`,
    `| 분포 지역 | ${stats.totalRegions}개 동 |`,
    ``,
    formatCountTable(stats.byType, "📈 유형별 분포"),
    ``,
    formatCountTable(stats.byRegion, "📍 지역별 분포"),
  ];
  
  return lines.join("\n");
}

/**
 * 간단한 통계 요약을 포맷합니다.
 */
export function formatSimpleStats(stats: OverviewStatistics): string {
  const topType = stats.byType[0];
  const topRegion = stats.byRegion[0];
  
  return [
    `📊 **전체 ${stats.totalEnterprises}개 기업**`,
    ``,
    `• 가장 많은 유형: ${topType.name} (${topType.count}개, ${topType.percentage}%)`,
    `• 가장 많은 지역: ${topRegion.name} (${topRegion.count}개, ${topRegion.percentage}%)`,
  ].join("\n");
}

/**
 * 비교 결과를 포맷합니다.
 */
export function formatComparison(
  item1: CountItem, 
  item2: CountItem, 
  difference: number
): string {
  const winner = difference > 0 ? item1.name : difference < 0 ? item2.name : "동일";
  const diffText = difference === 0 
    ? "동일합니다" 
    : `${Math.abs(difference)}개 더 많습니다`;
  
  return [
    `## 📊 비교 분석`,
    ``,
    `| 구분 | ${item1.name} | ${item2.name} |`,
    `|------|-------------|-------------|`,
    `| 기업 수 | ${item1.count}개 | ${item2.count}개 |`,
    `| 비율 | ${item1.percentage}% | ${item2.percentage}% |`,
    ``,
    `**결과:** ${winner === "동일" ? "두 항목이 동일합니다" : `${winner}이(가) ${diffText}`}`,
  ].join("\n");
}

/**
 * 날짜를 한국어 형식으로 포맷합니다.
 */
export function formatKoreanDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 현재 분기를 계산합니다.
 */
export function getCurrentQuarter(): { year: number; quarter: number } {
  const now = new Date();
  const month = now.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  
  return { year: now.getFullYear(), quarter };
}

/**
 * 분기를 한국어로 포맷합니다.
 */
export function formatQuarter(year: number, quarter: number): string {
  return `${year}년 ${quarter}분기`;
}
