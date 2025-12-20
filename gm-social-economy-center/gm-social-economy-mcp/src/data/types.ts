/**
 * 광명시 사회적경제 기업 데이터 타입 정의
 * 
 * 이 파일은 프로젝트에서 사용하는 모든 데이터 타입을 정의합니다.
 * TypeScript를 처음 접하시는 분들을 위해 설명을 추가했습니다.
 */

// ============================================================
// 기업 유형 (Enterprise Types)
// ============================================================

/**
 * 사회적경제 기업의 5가지 유형
 * 
 * - 사회적기업: 취약계층 고용이나 사회서비스 제공이 목적인 기업
 * - (예비)사회적기업: 사회적기업 인증을 준비 중인 기업
 * - 협동조합: 조합원의 권익 향상이 목적인 협동 조직
 * - 사회적협동조합: 공익 목적의 협동조합
 * - 마을기업: 마을 공동체가 운영하는 기업
 */
export type EnterpriseType =
  | "사회적기업"
  | "(예비)사회적기업"
  | "협동조합"
  | "사회적협동조합"
  | "마을기업";

// ============================================================
// 지역 (Regions)
// ============================================================

/**
 * 광명시의 8개 행정동
 */
export type Region =
  | "소하동"
  | "일직동"
  | "광명동"
  | "철산동"
  | "하안동"
  | "노온사동"
  | "가학동"
  | "옥길동";

// ============================================================
// 기업 정보 (Enterprise)
// ============================================================

/**
 * 개별 기업의 상세 정보
 * 
 * @example
 * {
 *   id: 1,
 *   name: "광명사회적협동조합",
 *   type: "사회적협동조합",
 *   phone: "02-1234-5678",
 *   product: "카페 운영, 바리스타 교육",
 *   address: "경기도 광명시 오리로 123",
 *   region: "소하동",
 *   website: "https://example.com"
 * }
 */
export interface Enterprise {
  /** 고유 식별자 (1부터 시작하는 순번) */
  id: number;
  
  /** 기업명 */
  name: string;
  
  /** 기업 유형 */
  type: EnterpriseType;
  
  /** 연락처 (전화번호) */
  phone: string;
  
  /** 주요 사업/제품/서비스 */
  product: string;
  
  /** 주소 */
  address: string;
  
  /** 소재 행정동 */
  region: Region;
  
  /** 웹사이트 (선택사항) */
  website?: string;
}

// ============================================================
// 메타데이터 (Metadata)
// ============================================================

/**
 * 센터 연락처 정보
 */
export interface CenterContact {
  /** 전화번호 */
  phone: string;
  
  /** 주소 */
  address: string;
  
  /** 이메일 */
  email: string;
}

/**
 * 데이터셋 메타정보
 */
export interface Metadata {
  /** 데이터 출처 */
  source: string;
  
  /** 출처 URL */
  sourceUrl: string;
  
  /** 최종 업데이트 일자 */
  lastUpdated: string;
  
  /** 전체 기업 수 */
  totalEnterprises: number;
  
  /** 포함된 지역 목록 */
  regions: Region[];
  
  /** 포함된 기업 유형 목록 */
  enterpriseTypes: EnterpriseType[];
  
  /** 센터 연락처 */
  centerContact: CenterContact;
}

/**
 * 전체 데이터 구조
 */
export interface EnterpriseData {
  /** 메타정보 */
  metadata: Metadata;
  
  /** 기업 목록 */
  enterprises: Enterprise[];
}

// ============================================================
// 검색 관련 타입 (Search Types)
// ============================================================

/**
 * 기업 검색 파라미터
 */
export interface SearchParams {
  /** 지역 필터 */
  region?: Region;
  
  /** 유형 필터 */
  type?: EnterpriseType;
  
  /** 키워드 검색 (이름, 사업내용, 주소에서 검색) */
  keyword?: string;
  
  /** 최대 결과 수 (기본값: 전체) */
  limit?: number;
}

/**
 * 검색 결과
 */
export interface SearchResult {
  /** 검색된 기업 목록 */
  enterprises: Enterprise[];
  
  /** 전체 검색 결과 수 */
  totalCount: number;
  
  /** 적용된 필터 정보 */
  appliedFilters: {
    region?: Region;
    type?: EnterpriseType;
    keyword?: string;
  };
}

// ============================================================
// 통계 관련 타입 (Statistics Types)
// ============================================================

/**
 * 통계 유형
 */
export type StatisticsType = 
  | "overview"      // 전체 개요
  | "byType"        // 유형별 분포
  | "byRegion"      // 지역별 분포
  | "comparison";   // 비교 분석

/**
 * 통계 요청 파라미터
 */
export interface StatisticsParams {
  /** 통계 유형 */
  type: StatisticsType;
  
  /** 비교할 대상들 (comparison 유형일 때) */
  compareTargets?: string[];
}

/**
 * 카운트 항목 (유형별/지역별 카운트)
 */
export interface CountItem {
  /** 항목명 */
  name: string;
  
  /** 기업 수 */
  count: number;
  
  /** 비율 (%) */
  percentage: number;
}

/**
 * 전체 개요 통계
 */
export interface OverviewStatistics {
  /** 전체 기업 수 */
  totalEnterprises: number;
  
  /** 유형 수 */
  totalTypes: number;
  
  /** 지역 수 */
  totalRegions: number;
  
  /** 유형별 분포 */
  byType: CountItem[];
  
  /** 지역별 분포 */
  byRegion: CountItem[];
}

// ============================================================
// 보고서 관련 타입 (Report Types)
// ============================================================

/**
 * 보고서 유형
 */
export type ReportType =
  | "quarterly"     // 분기 보고서
  | "regional"      // 지역 분석 보고서
  | "summary"       // 요약 보고서
  | "detailed";     // 상세 보고서

/**
 * 보고서 생성 파라미터
 */
export interface ReportParams {
  /** 보고서 유형 */
  type: ReportType;
  
  /** 제목 (선택사항, 자동 생성됨) */
  title?: string;
  
  /** 특정 지역에 대한 보고서 */
  region?: Region;
  
  /** 특정 기업 유형에 대한 보고서 */
  enterpriseType?: EnterpriseType;
  
  /** 보고서 기준 날짜 */
  asOfDate?: string;
}

/**
 * 생성된 보고서
 */
export interface GeneratedReport {
  /** 보고서 제목 */
  title: string;
  
  /** 생성 일시 */
  generatedAt: string;
  
  /** 보고서 내용 (마크다운 형식) */
  content: string;
  
  /** 보고서 유형 */
  type: ReportType;
}

// ============================================================
// MCP 도구 결과 타입 (Tool Result Types)
// ============================================================

/**
 * MCP 도구 실행 결과
 */
export interface ToolResult {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
}
