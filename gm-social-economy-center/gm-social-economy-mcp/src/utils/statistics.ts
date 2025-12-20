/**
 * 통계 유틸리티 (Statistics Utilities)
 * 
 * 기업 데이터로부터 다양한 통계를 계산하는 함수들입니다.
 * 
 * 📚 초보자를 위한 설명:
 * - reduce() 함수는 배열을 순회하며 값을 누적합니다.
 * - Object.entries()는 객체를 [키, 값] 배열로 변환합니다.
 */

import type { Enterprise, EnterpriseType, Region, CountItem, OverviewStatistics } from "../data/types.js";
import { getAllRegions, getAllTypes } from "./filters.js";

/**
 * 유형별 기업 수를 계산합니다.
 * 
 * @param enterprises - 기업 배열
 * @returns 유형별 카운트
 * 
 * @example
 * const counts = countByType(enterprises);
 * // { "사회적기업": 45, "협동조합": 58, ... }
 */
export function countByType(enterprises: Enterprise[]): Record<EnterpriseType, number> {
  const counts: Record<string, number> = {};
  
  // 모든 유형을 0으로 초기화
  getAllTypes().forEach(type => {
    counts[type] = 0;
  });
  
  // 카운트
  enterprises.forEach(e => {
    counts[e.type] = (counts[e.type] || 0) + 1;
  });
  
  return counts as Record<EnterpriseType, number>;
}

/**
 * 지역별 기업 수를 계산합니다.
 * 
 * @param enterprises - 기업 배열
 * @returns 지역별 카운트
 * 
 * @example
 * const counts = countByRegion(enterprises);
 * // { "소하동": 30, "철산동": 25, ... }
 */
export function countByRegion(enterprises: Enterprise[]): Record<Region, number> {
  const counts: Record<string, number> = {};
  
  // 모든 지역을 0으로 초기화
  getAllRegions().forEach(region => {
    counts[region] = 0;
  });
  
  // 카운트
  enterprises.forEach(e => {
    counts[e.region] = (counts[e.region] || 0) + 1;
  });
  
  return counts as Record<Region, number>;
}

/**
 * 카운트를 퍼센티지가 포함된 CountItem 배열로 변환합니다.
 * 
 * @param counts - 카운트 객체
 * @param total - 전체 수 (퍼센티지 계산용)
 * @returns CountItem 배열 (내림차순 정렬)
 */
export function toCountItems(counts: Record<string, number>, total: number): CountItem[] {
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0, // 소수점 1자리
    }))
    .sort((a, b) => b.count - a.count); // 내림차순 정렬
}

/**
 * 전체 개요 통계를 생성합니다.
 * 
 * @param enterprises - 기업 배열
 * @returns 전체 통계 개요
 */
export function calculateOverview(enterprises: Enterprise[]): OverviewStatistics {
  const total = enterprises.length;
  
  const byTypeCount = countByType(enterprises);
  const byRegionCount = countByRegion(enterprises);
  
  return {
    totalEnterprises: total,
    totalTypes: Object.values(byTypeCount).filter(c => c > 0).length,
    totalRegions: Object.values(byRegionCount).filter(c => c > 0).length,
    byType: toCountItems(byTypeCount, total),
    byRegion: toCountItems(byRegionCount, total),
  };
}

/**
 * 가장 많은 기업이 있는 유형을 찾습니다.
 */
export function findTopType(enterprises: Enterprise[]): { type: EnterpriseType; count: number } | null {
  const counts = countByType(enterprises);
  const entries = Object.entries(counts) as [EnterpriseType, number][];
  
  if (entries.length === 0) return null;
  
  const top = entries.reduce((max, curr) => curr[1] > max[1] ? curr : max);
  
  return { type: top[0], count: top[1] };
}

/**
 * 가장 많은 기업이 있는 지역을 찾습니다.
 */
export function findTopRegion(enterprises: Enterprise[]): { region: Region; count: number } | null {
  const counts = countByRegion(enterprises);
  const entries = Object.entries(counts) as [Region, number][];
  
  if (entries.length === 0) return null;
  
  const top = entries.reduce((max, curr) => curr[1] > max[1] ? curr : max);
  
  return { type: top[0], count: top[1] } as unknown as { region: Region; count: number };
}

/**
 * 두 카테고리를 비교합니다.
 * 
 * @param enterprises - 기업 배열
 * @param category1 - 첫 번째 비교 대상
 * @param category2 - 두 번째 비교 대상
 * @param categoryType - "type" 또는 "region"
 */
export function compareCategories(
  enterprises: Enterprise[],
  category1: string,
  category2: string,
  categoryType: "type" | "region"
): { category1: CountItem; category2: CountItem; difference: number } {
  const counts = categoryType === "type" 
    ? countByType(enterprises) 
    : countByRegion(enterprises);
  
  const total = enterprises.length;
  
  const count1 = counts[category1 as keyof typeof counts] || 0;
  const count2 = counts[category2 as keyof typeof counts] || 0;
  
  return {
    category1: {
      name: category1,
      count: count1,
      percentage: total > 0 ? Math.round((count1 / total) * 1000) / 10 : 0,
    },
    category2: {
      name: category2,
      count: count2,
      percentage: total > 0 ? Math.round((count2 / total) * 1000) / 10 : 0,
    },
    difference: count1 - count2,
  };
}

/**
 * 간단한 텍스트 형태의 통계 요약을 생성합니다.
 */
export function generateStatsSummary(enterprises: Enterprise[]): string {
  const overview = calculateOverview(enterprises);
  
  const lines = [
    `📊 광명시 사회적경제 기업 현황`,
    ``,
    `• 전체 기업 수: ${overview.totalEnterprises}개`,
    `• 유형 수: ${overview.totalTypes}개`,
    `• 분포 지역: ${overview.totalRegions}개 동`,
    ``,
    `📈 유형별 TOP 3:`,
  ];
  
  overview.byType.slice(0, 3).forEach((item, index) => {
    lines.push(`  ${index + 1}. ${item.name}: ${item.count}개 (${item.percentage}%)`);
  });
  
  lines.push(``);
  lines.push(`📍 지역별 TOP 3:`);
  
  overview.byRegion.slice(0, 3).forEach((item, index) => {
    lines.push(`  ${index + 1}. ${item.name}: ${item.count}개 (${item.percentage}%)`);
  });
  
  return lines.join("\n");
}
