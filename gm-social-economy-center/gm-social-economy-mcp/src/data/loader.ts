/**
 * 데이터 로더 (Data Loader)
 * 
 * enterprises.json 파일에서 기업 데이터를 불러오는 모듈입니다.
 * 
 * 📚 초보자를 위한 설명:
 * - 이 파일은 JSON 데이터를 읽어오는 역할을 합니다.
 * - 다른 파일에서 `loadEnterprises()`를 호출하면 기업 데이터를 받을 수 있습니다.
 */

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { EnterpriseData, Enterprise, Metadata } from "./types.js";

// 현재 파일의 디렉토리 경로 계산
// (ES 모듈에서는 __dirname을 직접 사용할 수 없어서 이렇게 계산합니다)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// enterprises.json 파일 경로
const DATA_FILE_PATH = join(__dirname, "enterprises.json");

// 캐시: 한 번 불러온 데이터를 메모리에 저장
let cachedData: EnterpriseData | null = null;

/**
 * JSON 파일에서 전체 데이터를 불러옵니다.
 * 
 * @returns 전체 데이터 (메타정보 + 기업 목록)
 * 
 * @example
 * const data = await loadData();
 * console.log(data.metadata.totalEnterprises); // 171
 * console.log(data.enterprises.length); // 171
 */
export async function loadData(): Promise<EnterpriseData> {
  // 이미 캐시에 있으면 캐시된 데이터 반환 (성능 최적화)
  if (cachedData) {
    return cachedData;
  }

  try {
    // 파일 읽기
    const fileContent = await readFile(DATA_FILE_PATH, "utf-8");
    
    // JSON 파싱
    const data = JSON.parse(fileContent) as EnterpriseData;
    
    // 캐시에 저장
    cachedData = data;
    
    return data;
  } catch (error) {
    // 에러 처리
    if (error instanceof Error) {
      throw new Error(`데이터 파일을 불러올 수 없습니다: ${error.message}`);
    }
    throw error;
  }
}

/**
 * 기업 목록만 불러옵니다.
 * 
 * @returns 기업 배열
 * 
 * @example
 * const enterprises = await loadEnterprises();
 * enterprises.forEach(e => console.log(e.name));
 */
export async function loadEnterprises(): Promise<Enterprise[]> {
  const data = await loadData();
  return data.enterprises;
}

/**
 * 메타정보만 불러옵니다.
 * 
 * @returns 메타데이터 객체
 * 
 * @example
 * const meta = await loadMetadata();
 * console.log(meta.lastUpdated); // "2024-11-27"
 */
export async function loadMetadata(): Promise<Metadata> {
  const data = await loadData();
  return data.metadata;
}

/**
 * 캐시를 초기화합니다.
 * 데이터 파일이 변경된 경우 호출하세요.
 */
export function clearCache(): void {
  cachedData = null;
}

/**
 * 특정 ID의 기업을 찾습니다.
 * 
 * @param id - 기업 ID
 * @returns 기업 정보 또는 undefined
 * 
 * @example
 * const enterprise = await findEnterpriseById(1);
 * if (enterprise) {
 *   console.log(enterprise.name);
 * }
 */
export async function findEnterpriseById(id: number): Promise<Enterprise | undefined> {
  const enterprises = await loadEnterprises();
  return enterprises.find(e => e.id === id);
}

/**
 * 데이터가 정상적으로 로드되는지 확인합니다.
 * 
 * @returns 정상 여부
 */
export async function validateData(): Promise<{ valid: boolean; message: string }> {
  try {
    const data = await loadData();
    
    // 기본 검증
    if (!data.metadata) {
      return { valid: false, message: "메타데이터가 없습니다." };
    }
    
    if (!Array.isArray(data.enterprises)) {
      return { valid: false, message: "기업 데이터가 배열이 아닙니다." };
    }
    
    if (data.enterprises.length === 0) {
      return { valid: false, message: "기업 데이터가 비어있습니다." };
    }
    
    // 데이터 개수 일치 검증
    if (data.enterprises.length !== data.metadata.totalEnterprises) {
      return { 
        valid: false, 
        message: `메타데이터(${data.metadata.totalEnterprises}개)와 실제 데이터(${data.enterprises.length}개) 개수가 다릅니다.` 
      };
    }
    
    return { valid: true, message: `${data.enterprises.length}개 기업 데이터가 정상적으로 로드되었습니다.` };
    
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    return { valid: false, message };
  }
}
