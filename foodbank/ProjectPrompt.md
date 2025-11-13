# 🛠️ AppSheet Development Execution Prompt: Gwangmyeong Food Bank Management App

## 🎯 목표 (Goal)
Google Sheets 기반의 데이터베이스를 활용하여 광명시 푸드뱅크의 핵심 업무(재고, 배분, 이용자 관리)를 지원하는 모바일 최적화 AppSheet 애플리케이션 구축.

## 1. 데이터 소스 및 구조 설정 (Data Source & Structure Setup)

**데이터 소스:** Google Sheet 파일 (`Gwangmyeong Food Bank DB` 권장)

### 1-1. 테이블 설정 및 타입 정의

| Sheet | Key Column | Label Column | Initial View Type | Critical Type/Refs |
| :--- | :--- | :--- | :--- | :--- |
| `물품_재고_현황` | `재고_ID` | `물품명` | Deck | `최종_유통기한` (Date) |
| `이용자_정보` | `이용자_ID` | `이름` | Deck | `특이사항(알레르기/식단)` (Long Text) |
| `배분_활동_기록` | `활동_기록_ID` | `배분_날짜` | Form | **`이용자_ID` (Ref: `이용자_정보`)** |
| `기부_후원_내역` | `기부_ID` | `기부자_이름/기업명` | Table | `기부_날짜` (Date) |

**📌 필수 설정:**
1.  `배분_활동_기록` 테이블의 `이용자_ID` 컬럼을 **Ref** 타입으로 설정하고, 대상 테이블을 `이용자_정보`로 지정합니다.
2.  `배분_활동_기록` 테이블의 `수령자_서명(파일)` 컬럼을 **Signature** 타입으로 설정합니다.

### 2. 사용자 경험(UX) 및 뷰 설정 (Views and UX)

| View Name | Data Table | View Type | Position | Style/Grouping |
| :--- | :--- | :--- | :--- | :--- |
| **Inventory Dashboard** | `물품_재고_현황` | Dashboard | Left/Center | (1) 재고 현황 (2) 유통기한 임박 리스트 통합 |
| **New Distribution** | `배분_활동_기록` | Form | Center | 배분 시 가장 자주 사용되는 메인 뷰 |
| **Client Search** | `이용자_정보` | Search/Deck | Right | `이름` 검색 활성화 |
| **Donation Log** | `기부_후원_내역` | Table | Menu | Admin용 기록 조회 |

**추가 UX 개선:**
* `이용자_정보` 상세 뷰(Detail View)에 **Virtual Column**을 생성하여, `REF_ROWS("배분_활동_기록", "이용자_ID")`를 통해 해당 이용자의 과거 **배분 활동 기록**을 인라인으로 표시합니다.

### 3. 핵심 기능 구현: Action 및 Automation

#### 3-1. AppSheet Action: 재고 자동 업데이트 (Inventory Adjustment)

1.  **Action 1 (Outflow - 차감):**
    * **Scope:** `배분_활동_기록` 테이블.
    * **Execution:** 폼 저장 시(`Form Saved`).
    * **Logic:** `물품_재고_현황` 테이블의 해당 물품의 `현재_재고_수량`을 입력된 수량만큼 **차감**하는 로직을 구현합니다.
    * *Note: 이 로직은 `배분_물품_명세` 컬럼의 구조에 따라 복잡도가 달라질 수 있으므로, 초기에는 단일 품목만 배분한다고 가정하고 시작하거나, 별도의 자식 테이블을 구성해야 할 수 있습니다.*

2.  **Action 2 (Inflow - 증가):**
    * **Scope:** `기부_후원_내역` 테이블.
    * **Execution:** 폼 저장 시(`Form Saved`).
    * **Logic:** `물품_재고_현황` 테이블의 해당 물품의 `현재_재고_수량`을 입력된 수량만큼 **증가**시키고 `입고_날짜`를 업데이트합니다.

#### 3-2. AppSheet Automation: 자동 알림 (Alerts)

1.  **Automation 1: Low Stock Alert (재고 부족):**
    * **Event:** Scheduled check (Daily, KST).
    * **Condition:** `SELECT(물품_재고_현황[재고_ID], [현재_재고_수량] < 50)`
    * **Process:** Email Body에 재고 부족 물품 리스트를 포함하여 관리자 이메일로 발송.
    * **Threshold:** 초기 임계값은 **50 단위**로 설정합니다.

2.  **Automation 2: Expiry Warning Alert (유통기한 임박):**
    * **Event:** Scheduled check (Daily, KST).
    * **Condition:** `TODAY() + [물품_재고_현황].[유통기한_알림_임계값(일)] >= [물품_재고_현황].[최종_유통기한]`
    * **Process:** Email Body에 임박 물품 리스트와 유통기한을 포함하여 운영팀 이메일로 발송.

---