# 🛠️ AppSheet Development Execution Prompt: Gwangmyeong Food Bank Management App

## 🎯 목표 (Goal)

Google Sheets 기반의 데이터베이스를 활용하여 광명시 푸드뱅크의 재고, 배분, 후원자, 자원봉사, 프로그램 업무를 하나의 AppSheet 앱에서 운영합니다.

## 1. 데이터 소스 및 구조 설정 (Data Source & Structure Setup)

**데이터 소스:** Google Sheet 파일 (`Gwangmyeong Food Bank DB` 권장). 각 CSV를 동일한 이름의 워크시트로 가져옵니다.

### 1-1 핵심(Core) 테이블 매핑

| Sheet | Key Column | Label Column | Critical Refs | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `Inventories` | `Inventory_ID` | `Inventory_Name` | - | 창고 담당자, 용량, 온도 조건을 확인 |
| `Items` | `Item_ID` | `Item_Name` | - | 유닛, 보관 유형, 식이 태그로 필터링 |
| `Stock` | `Stock_ID` | `Item_ID` | `Inventory_ID` -> `Inventories`, `Item_ID` -> `Items` | 재고 임계치와 마지막 실사 정보 포함 |
| `Clients` | `Client_ID` | `Household_Name` | - | 언어, 가구 규모, 자격 상태 필드 사용 |
| `Distribution_Events` | `Distribution_ID` | `Distribution_Date` | `Client_ID` -> `Clients` | 픽업/배달 정보와 서명을 저장 |
| `Distribution_Items` | `Distribution_Item_ID` | `Item_ID` | `Distribution_ID` -> `Distribution_Events`, `Stock_ID` -> `Stock` | 한 번의 배분에서 여러 품목을 처리 |
| `Donors` | `Donor_ID` | `Donor_Name` | - | 후원자 연락처와 선호 채널 관리 |
| `Donations` | `Donation_ID` | `Donation_Date` | `Donor_ID` -> `Donors` | 기부 전달 방식과 서류 상태 추적 |
| `Donation_Items` | `Donation_Item_ID` | `Item_ID` | `Donation_ID` -> `Donations`, `Inventory_ID` -> `Inventories` | 기부 품목을 즉시 재고에 연결 |

### 1-2 선택(Optional) 모듈

| Sheet | Key Column | Label Column | Critical Refs | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `Volunteers` | `Volunteer_ID` | `Name` | - | 선호 역할, 가능 시간, 교육 이력 관리 |
| `Volunteer_Shifts` | `Shift_ID` | `Shift_Date` | `Volunteer_ID` -> `Volunteers` | 봉사 배치와 상태(예정, 완료) 추적 |
| `Programs` | `Program_ID` | `Program_Name` | - | 대상 그룹, 활성 여부 |
| `Client_Programs` | `Client_Program_ID` | `Client_ID` | `Client_ID` -> `Clients`, `Program_ID` -> `Programs` | 등록 상태, 메모, 시작 날짜 관리 |

### 1-3 추천 Virtual Columns & Expressions

- `Stock[Days_To_Expiry]`: `IF(ISBLANK([Expiry_Date]), "", ([Expiry_Date] - TODAY()))`
- `Clients[Primary_Language_Flag]`: `IFS([Preferred_Language] = "Korean", "KR", [Preferred_Language] = "Vietnamese", "VI", TRUE, "ETC")`
- `Donations[Total_Items]`: `SUM(SELECT(Donation_Items[Quantity], [Donation_ID] = [_THISROW].[Donation_ID]))`
- `Volunteers[Next_Shift_Date]`: `MIN(SELECT(Volunteer_Shifts[Shift_Date], AND([Volunteer_ID] = [_THISROW].[Volunteer_ID], [Shift_Status] <> "Completed", [Shift_Date] >= TODAY())))`

## 2. 사용자 경험(UX) 및 뷰 설정 (Views and UX)

| View Name | Data Table | View Type | Position | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Inventory Command Center** | `Stock` | Dashboard | Center | 카드(재고 현황) + 차트(임박 기한) + 테이블(재고 임계치) 조합 |
| **Distribution Planner** | `Distribution_Events` | Deck | Left | 날짜별 그룹, `Client_ID`와 `Pickup_Method` 하이라이트 |
| **Distribution Detail** | `Distribution_Items` | Inline | Related | `Distribution_Events` 상세 뷰에 인라인으로 표시 |
| **Donation Intake** | `Donations` | Form | Center | 기부 접수용 폼, 저장 시 Donation_Items Quick Edit |
| **Donor CRM** | `Donors` | Table | Menu | 연락처와 커뮤니케이션 선호도 필터 |
| **Volunteer Schedule** | `Volunteer_Shifts` | Calendar | Right | 주간 캘린더로 차주 봉사 배치 확인 |
| **Program Enrollment** | `Client_Programs` | Table | Menu | `Status`별 색상 강조, Ref 뷰로 연결 |
| **Inbound Donations Dashboard** | `Donation_Items` | Dashboard | Center | 품목별 합계 차트 + 최근 접수 테이블로 재고 유입 한눈에 파악 |
| **Client Outreach Map** | `Clients` | Map | Menu | 주소 확인 후 현장 배달 동선 계획, 언어 태그 색상 규칙 적용 |
| **Volunteer Leaderboard** | `Volunteer_Shifts` | Chart | Menu | `SUM(Duration)` 기준 상위 봉사자 시각화, 동기 부여용 |

### UX 힌트

- `Clients` 상세 뷰에 `REF_ROWS("Distribution_Events", "Client_ID")`와 `REF_ROWS("Client_Programs", "Client_ID")`를 각각 추가하면 가구 이력과 프로그램 참여 현황을 한눈에 볼 수 있어요.
- `Stock` 테이블에 색상 규칙을 적용하여 `[Quantity] <= [Reorder_Threshold]`일 때 빨간색 카드로 표시하세요.
- 대시보드 뷰에 `Donation Intake` 폼과 `Inbound Donations Dashboard`를 함께 배치하면 신규 기부 입력 직후 재고 반영 결과를 바로 확인할 수 있어요.
- `Client Outreach Map`과 `Distribution Planner`를 동기화하여 지도에서 항목을 탭하면 해당 배분 이벤트 상세로 이동하도록 `Row Selected` 행동을 연결하세요.

### 뷰 생성 가이드 (Step-by-step)

1. **Deck View: Distribution Planner**

    - AppSheet 편집기 좌측 메뉴에서 `UX` → `Views` → `New View`를 선택하세요.
    - 이름에 `Distribution Planner`, 데이터 소스로 `Distribution_Events`, View type을 `Deck`으로 지정합니다.
    - `Behavior` 탭에서 `Row selected`를 `Auto` 유지하고, `Grouping` 섹션에서 `Group by`를 `Distribution_Date`로 설정해 날짜별 묶음을 만듭니다.
    - `Options`에서 `Prominence`를 `Primary`로 바꾸면 좌측 내비게이션에 고정됩니다.

1. **Dashboard View: Inventory Command Center**

    - `New View`를 열고 이름을 `Inventory Command Center`, View type을 `Dashboard`, `Position`을 `Center`로 설정합니다.
    - `View entries`에 `Stock_Table`, `Stock_Card`, `Stock_Chart` (또는 원하는 기존 뷰)를 추가하여 카드/차트/테이블 조합을 만듭니다.
    - `Interactive mode`를 켜면 대시보드 내에서 항목을 선택할 때 다른 위젯이 필터링됩니다.
    - `Options`에서 `Use tabs in mobile view`를 해제하면 단일 화면에 카드/차트를 동시에 표시할 수 있습니다.

1. **Map View: Client Outreach Map**

    - `New View` → 이름 `Client Outreach Map`, 데이터 소스 `Clients`, View type `Map`을 선택합니다.
    - `Map style`을 `Roadmap`, `Address or LatLong` 필드를 `[Address]` 또는 지정한 위치 컬럼으로 매핑합니다.
    - `Format Rules`에서 `[Preferred_Language]` 값을 기준으로 점 색상을 바꾸면 현장 방문 동선을 언어별로 구분할 수 있습니다.
    - `Row selected` 액션을 `App: go to another view within this app` → `LINKTOVIEW("Distribution Planner")`로 지정해 지도에서 바로 일정으로 이동하세요.

1. **Card View: Low Stock Highlight**

    - 이름 `Low Stock Cards`, 데이터 소스 `Stock`, View type `Card`를 선택합니다.
    - `Row image`에 재고 이미지 컬럼이 있다면 연결하고, `Primary header`를 `[Item_ID].[Item_Name]`, `Primary footer`를 `[Quantity]`로 설정합니다.
    - `Slice`를 이용해 `[Quantity] <= [Reorder_Threshold]` 조건을 먼저 만들어 이 뷰에 연결하면 필요한 품목만 보여줄 수 있습니다.
    - `Options`에서 `Group by` → `Inventory_ID`를 적용해 창고별 위험 품목을 묶어서 표시하세요.

1. **Chart View: Volunteer Leaderboard**

    - `New View` → 이름 `Volunteer Leaderboard`, 데이터 `Volunteer_Shifts`, View type `Chart`를 고릅니다.
    - `Chart type`을 `Column`으로 지정하고 `Label column`은 `[Volunteer_ID].[Name]`, `Values`는 `SUM([Duration])` 집계를 선택합니다.
    - `Grouping`에서 `Group by`를 `Volunteer_ID`로 설정하면 자원봉사자 단위로 누적 시간이 계산됩니다.
    - 모바일 가독성을 위해 `Options`의 `Stacked`를 끄고 `Short name`을 `Leaderboard`로 지정하면 하단 메뉴에 짧게 표시됩니다.

1. **Calendar View: Volunteer Schedule**

    - `New View` → 이름 `Volunteer Schedule`, 데이터 `Volunteer_Shifts`, View type `Calendar`를 선택합니다.
    - `Start date`는 `[Shift_Date]`, `End date`는 `[Shift_End]` 또는 동일 컬럼으로 설정합니다.
    - `Category`에 `[Shift_Status]`를 할당하면 상태별 색상으로 일정이 구분됩니다.
    - `Options`에서 `Time zone`을 `Asia/Seoul`로 지정해 봉사 시간 표시 오류를 방지하세요.

1. **Form View: Donation Intake**

    - `New View` → 이름 `Donation Intake`, 데이터 `Donations`, View type `Form`을 설정합니다.
    - `Behavior` 탭의 `Form Saved` 액션으로 `Donation Intake (Inflow)` 오토메이션용 행동을 연결합니다.
    - `Pages`에서 `Section`을 분리해 `Donor Details`, `Donation Logistics`, `Documentation` 등을 나누면 초보자가 필드를 놓치지 않습니다.
    - `Quick edit columns`에 `Related Donation_Items`를 추가하면 폼 저장 후 바로 품목 세부 정보를 입력할 수 있습니다.

## 3. 핵심 기능 구현: Action 및 Automation

### 3-1 Inventory & Service Actions

1. **Distribution Fulfillment (Outflow)**

    - **Scope:** `Distribution_Items`
    - **Type:** Data: execute an action on a set of rows
    - **Behavior:** `LINKTOFORM("Stock_Adjustment", "Stock_ID", [Stock_ID], "Adjustment_Type", "Out", "Quantity", [Quantity_Distributed])`
    - **Effect:** 감소 폼을 호출하거나 직접 `[Quantity] - [Quantity_Distributed]` 계산식으로 업데이트 (AppSheet Assistant에 "inventory decrement" 질문 추천).
    - **Trigger:** `Distribution_Items` 폼 저장 시 `Form Saved` 이벤트에 연결.

1. **Donation Intake (Inflow)**

    - **Scope:** `Donation_Items`
    - **Type:** Data: execute an action on a set of rows
    - **Behavior:** `LINKTOFORM("Stock_Adjustment", "Inventory_ID", [Inventory_ID], "Stock_ID", ANY(SELECT(Stock[Stock_ID], AND([Inventory_ID] = [_THISROW].[Inventory_ID], [Item_ID] = [_THISROW].[Item_ID]))), "Adjustment_Type", "In", "Quantity", [Quantity])`
    - **Effect:** 존재하는 재고 라인을 찾고 없으면 새로 생성하도록 두 단계 분리 (Action A: 찾기, Action B: 없으면 추가).

1. **Reorder Flag Reset**

    - **Scope:** `Stock`
    - **Type:** Data: set the values of some columns in this row
    - **Behavior:** `[Last_Stock_Count] = [Quantity]`, `[Last_Stock_Count_Date] = TODAY()`
    - **Use:** 실사 완료 시 Quick Edit 버튼으로 사용.

### 3-2 Automations (Bots)

1. **Low Stock Alert**

    - **Event:** Scheduled daily 09:00 KST.
    - **Condition:** `ANY(SELECT(Stock[Stock_ID], [Quantity] <= [Reorder_Threshold]))`
    - **Process:** 이메일 + Microsoft Teams(웹훅) 알림, 부족 품목 테이블 포함.

1. **Expiry Watchdog**

    - **Event:** Scheduled daily 07:00 KST.
    - **Condition:** `AND(ISNOTBLANK([Expiry_Date]), ([Expiry_Date] - TODAY()) <= 14)`
    - **Process:** `[Inventory_ID].[Manager_Email]` (추가 열)로 요약 전송.

1. **Donation Thank-you**

    - **Event:** `Donations` 데이터 변경 (Adds Only)
    - **Process:** Donor 이메일/문자 템플릿 발송 + Google Sheet `Donor_Touches` 탭에 기록(추가 가상 테이블).

1. **Volunteer Shift Reminder**

    - **Event:** Scheduled daily 18:00 KST.
    - **Condition:** `AND([Shift_Date] = TODAY() + 1, [Shift_Status] = "Scheduled")`
    - **Process:** 봉사자 이메일/문자 발송, 관리용 Slack/Teams 메시지 동시 전송.

### 3-3 Community Touchpoints (Optional)

- `Client_Programs` 상태가 `On Hold`로 변경되면 케이스 매니저에게 태스크 생성.
- `Donors`의 `Preferred_Communication`이 `SMS`인 경우 Twilio 커넥터 사용을 고려.

## 4. 테스트 & 운영 체크리스트

- [ ] 기부 -> 재고 증가 -> 배분 -> 재고 감소 흐름이 샘플 데이터에서 정상 동작하는지 확인.
- [ ] `Stock` 카드 색상 규칙과 Dashboard 차트가 최신 데이터를 반영하는지 확인.
- [ ] Automations 4종이 기대한 시간에 실행되는지, 테스트 이메일 주소로 먼저 검증.
- [ ] 모바일 앱에서 자원봉사 캘린더와 프로그램 등록 테이블이 보기 쉬운지 사용자 테스트 수행.
- [ ] Google Sheet 공유 권한(보기/편집)을 역할별로 점검하고, AppSheet 보안 필터 적용 여부 확인.

## 5. 생성형 AI 사용 팁

- AppSheet Assistant에게 "Create action to reduce stock when distribution item saved" 또는 "Build volunteer reminder bot"처럼 구체적으로 요청하세요.
- 완성된 표현식이나 봇 구성을 `README`와 별도 시트에 기록해 다음 기수 교육에서 재사용하세요.
