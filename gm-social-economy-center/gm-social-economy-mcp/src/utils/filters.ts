/**
 * 필터링 유틸리티 (Filter Utilities)
 * 
 * 기업 데이터를 다양한 조건으로 필터링하는 함수들입니다.
 * 
 * 📚 초보자를 위한 설명:
 * - filter() 함수는 배열에서 조건에 맞는 항목만 골라냅니다.
 * - 여러 필터를 조합해서 복잡한 검색도 가능합니다.
 */

import type { Enterprise, EnterpriseType, Region, SearchParams } from "../data/types.js";

/**
 * 지역으로 기업을 필터링합니다.
 * 
 * @param enterprises - 기업 배열
 * @param region - 검색할 지역
 * @returns 해당 지역의 기업들
 * 
 * @example
 * const results = filterByRegion(enterprises, "소하동");
 */
export function filterByRegion(enterprises: Enterprise[], region: Region): Enterprise[] {
  return enterprises.filter(e => e.region === region);
}

/**
 * 유형으로 기업을 필터링합니다.
 * 
 * @param enterprises - 기업 배열
 * @param type - 검색할 유형
 * @returns 해당 유형의 기업들
 * 
 * @example
 * const results = filterByType(enterprises, "사회적기업");
 */
export function filterByType(enterprises: Enterprise[], type: EnterpriseType): Enterprise[] {
  return enterprises.filter(e => e.type === type);
}

/**
 * 키워드로 기업을 검색합니다.
 * 기업명, 사업내용, 주소에서 키워드를 찾습니다.
 * 
 * @param enterprises - 기업 배열
 * @param keyword - 검색 키워드
 * @returns 키워드가 포함된 기업들
 * 
 * @example
 * const results = filterByKeyword(enterprises, "카페");
 */
export function filterByKeyword(enterprises: Enterprise[], keyword: string): Enterprise[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return enterprises.filter(e => 
    e.name.toLowerCase().includes(lowerKeyword) ||
    e.product.toLowerCase().includes(lowerKeyword) ||
    e.address.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 전화번호로 기업을 검색합니다.
 * 
 * @param enterprises - 기업 배열
 * @param phonePrefix - 전화번호 시작 부분
 * @returns 해당 전화번호로 시작하는 기업들
 * 
 * @example
 * const results = filterByPhone(enterprises, "02-2060");
 */
export function filterByPhone(enterprises: Enterprise[], phonePrefix: string): Enterprise[] {
  // 하이픈 제거하고 비교
  const normalizedPrefix = phonePrefix.replace(/-/g, "");
  
  return enterprises.filter(e => {
    const normalizedPhone = e.phone.replace(/-/g, "");
    return normalizedPhone.startsWith(normalizedPrefix);
  });
}

/**
 * 여러 조건을 조합하여 기업을 검색합니다.
 * 
 * @param enterprises - 기업 배열
 * @param params - 검색 파라미터
 * @returns 모든 조건을 만족하는 기업들
 * 
 * @example
 * const results = filterEnterprises(enterprises, {
 *   region: "소하동",
 *   type: "사회적기업",
 *   keyword: "카페"
 * });
 */
export function filterEnterprises(
  enterprises: Enterprise[], 
  params: SearchParams
): Enterprise[] {
  let results = [...enterprises];
  
  // 지역 필터
  if (params.region) {
    results = filterByRegion(results, params.region);
  }
  
  // 유형 필터
  if (params.type) {
    results = filterByType(results, params.type);
  }
  
  // 키워드 필터
  if (params.keyword) {
    results = filterByKeyword(results, params.keyword);
  }
  
  // 결과 수 제한
  if (params.limit && params.limit > 0) {
    results = results.slice(0, params.limit);
  }
  
  return results;
}

/**
 * 검색어에서 지역명을 추출합니다.
 * 자연어 검색을 지원하기 위한 헬퍼 함수입니다.
 * 
 * @param query - 검색어
 * @returns 추출된 지역 또는 undefined
 * 
 * @example
 * extractRegion("소하동에 있는 기업"); // "소하동"
 */
export function extractRegion(query: string): Region | undefined {
  const regions: Region[] = ["소하동", "일직동", "광명동", "철산동", "하안동", "노온사동", "가학동", "옥길동"];
  
  for (const region of regions) {
    if (query.includes(region)) {
      return region;
    }
  }
  
  return undefined;
}

/**
 * 검색어에서 기업 유형을 추출합니다.
 * 
 * @param query - 검색어
 * @returns 추출된 유형 또는 undefined
 * 
 * @example
 * extractType("사회적기업 목록"); // "사회적기업"
 */
export function extractType(query: string): EnterpriseType | undefined {
  // 순서 중요: 더 긴 것을 먼저 검사 (예비 사회적기업 vs 사회적기업)
  const types: EnterpriseType[] = [
    "사회적협동조합",
    "(예비)사회적기업",
    "사회적기업",
    "협동조합",
    "마을기업"
  ];
  
  // 변형된 표현도 인식
  const typeAliases: Record<string, EnterpriseType> = {
    "예비사회적기업": "(예비)사회적기업",
    "예비 사회적기업": "(예비)사회적기업",
    "사회적 기업": "사회적기업",
    "사회적 협동조합": "사회적협동조합",
    "마을 기업": "마을기업",
  };
  
  // 별칭 먼저 확인
  for (const [alias, type] of Object.entries(typeAliases)) {
    if (query.includes(alias)) {
      return type;
    }
  }
  
  // 정확한 유형명 확인
  for (const type of types) {
    if (query.includes(type)) {
      return type;
    }
  }
  
  return undefined;
}

/**
 * 모든 지역 목록을 반환합니다.
 */
export function getAllRegions(): Region[] {
  return ["소하동", "일직동", "광명동", "철산동", "하안동", "노온사동", "가학동", "옥길동"];
}

/**
 * 모든 기업 유형 목록을 반환합니다.
 */
export function getAllTypes(): EnterpriseType[] {
  return ["사회적기업", "(예비)사회적기업", "협동조합", "사회적협동조합", "마을기업"];
}
