
# 📖 누구나 따라하는 앱 만들기: 광명 푸드뱅크 앱 전체 개발 가이드

안녕하세요! 👋 코딩을 하나도 몰라도 괜찮아요. 이 가이드만 천천히 따라오면, 우리 동네를 돕는 멋진 '광명 푸드뱅크' 앱을 내 손으로 직접 만들 수 있어요. 정말이에요! 컴퓨터랑 조금만 친해지면, 놀라운 마법이 펼쳐질 거예요. 자, 함께 시작해볼까요?

---

## 1부: 우리 앱의 심장, 데이터베이스 만들기 (in Google Sheets)

모든 앱은 데이터를 저장할 공간이 필요해요. 우리는 가장 익숙한 구글 시트(엑셀과 비슷해요!)를 우리 앱의 데이터베이스로 사용할 거예요.

### 1단계: 구글 드라이브에서 새 파일 만들기

1. 먼저, 구글에 로그인하고 [구글 드라이브](https://drive.google.com)로 이동하세요.
2. 왼쪽 위에 있는 **[+ 새로 만들기]** 버튼을 클릭하세요.
3. **[Google 스프레드시트]** 를 선택해서 새로운 빈 시트를 열어주세요.
4. 파일 이름을 `광명 푸드뱅크 DB` 라고 변경해주세요. (왼쪽 위 '제목 없는 스프레드시트'를 클릭하면 바꿀 수 있어요.)

### 2단계: 데이터를 담을 '방' 만들기 (시트 생성)

먼저 필수(Core) 9개의 시트를 만들고, 이후 필요에 따라 선택(Optional) 시트를 추가할 거예요. 아래쪽 시트 탭에서 **[+]** 버튼을 눌러 시트를 추가하고, 각 시트의 이름을 정확히 입력해주세요.

#### 필수(Core) 시트

1. `Inventories`
2. `Items`
3. `Stock`
4. `Clients`
5. `Distribution_Events`
6. `Distribution_Items`
7. `Donors`
8. `Donations`
9. `Donation_Items`

#### 선택(Optional) 시트

- `Volunteers`
- `Volunteer_Shifts`
- `Programs`
- `Client_Programs`

> 팁: 이 저장소의 `database/` 폴더를 열면 각 워크시트로 바로 가져올 수 있는 CSV 샘플 데이터를 확인할 수 있어요. 먼저 샘플을 복사해 두고, 이후에 우리 센터 데이터를 덮어쓰면 훨씬 편합니다.

### 3단계: 각 방에 '이름표' 붙여주기 (열 이름 입력)

이제 각 시트의 첫 번째 행(가로줄)에 데이터의 '이름표'(열 이름)를 적어줄 거예요. 아래 표를 보고 **정확하게 똑같이** 입력해주세요. 이게 틀리면 앱이 데이터를 못 읽어요!

**1. `Inventories` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Inventory_ID | Inventory_Name | Address | Manager_Name | Manager_Phone | Storage_Capacity_CubicM | Temperature_Control | Notes |

**2. `Items` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Item_ID | Item_Name | Category_Large | Category_Medium | Category_Small | Unit_Size | Storage_Type | Dietary_Tags | Default_Reorder_Point |

**3. `Stock` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Stock_ID | Inventory_ID | Item_ID | Quantity | Expiry_Date | Reorder_Threshold | Last_Stock_Count | Last_Stock_Count_Date | Condition | Storage_Bin |

**4. `Clients` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Client_ID | Household_Name | Primary_Contact | Phone | Preferred_Language | Household_Size | Allergies_Dietary_Restrictions | Address | Eligibility_Status | Eligibility_Review_Date | Notes |

**5. `Distribution_Events` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Distribution_ID | Distribution_Date | Client_ID | Pickup_Method | Staff_Lead | Scheduled_Window | Recipient_Signature | Notes |

**6. `Distribution_Items` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Distribution_Item_ID | Distribution_ID | Stock_ID | Item_ID | Quantity_Distributed | Unit | Outcome_Notes |

**7. `Donors` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Donor_ID | Donor_Name | Donor_Type | Primary_Contact | Email | Phone | Address | Preferred_Communication | Notes |

**8. `Donations` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Donation_ID | Donation_Date | Donor_ID | Received_By | Delivery_Method | Paperwork_Completed | Notes |

**9. `Donation_Items` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Donation_Item_ID | Donation_ID | Item_ID | Quantity | Unit | Expiry_Date | Inventory_ID |

#### 선택 시트 열 이름

**`Volunteers` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Volunteer_ID | Name | Phone | Email | Preferred_Role | Availability_Notes | Background_Check_Status | Last_Training_Date |

**`Volunteer_Shifts` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Shift_ID | Volunteer_ID | Shift_Date | Start_Time | End_Time | Location | Role | Shift_Status | Notes |

**`Programs` 시트**

| A1 | B1 | C1 | D1 | E1 |
| :--- | :--- | :--- | :--- | :--- |
| Program_ID | Program_Name | Description | Target_Group | Active |

**`Client_Programs` 시트**

| A1 | B1 | C1 | D1 | E1 | F1 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Client_Program_ID | Client_ID | Program_ID | Enrollment_Date | Status | Notes |

---

## 2부: 앱 조립 마법 시작! (in AppSheet)

데이터 준비가 끝났으니, 이제 진짜 앱을 조립하러 가볼까요?

### 1단계: AppSheet 접속하고 새 앱 만들기

1. [AppSheet 홈페이지](https://www.appsheet.com)로 이동해서 구글 계정으로 로그인하세요.
2. **[+ Create]** -> **[App]** -> **[Start with existing data]** 를 차례로 클릭하세요.
3. 앱 이름을 `광명 푸드뱅크` 라고 지어주고, 카테고리는 `Inventory Management`를 선택하세요.
4. **[Choose your data]** 버튼을 누르고, 방금 우리가 만든 `광명 푸드뱅크 DB` 구글 시트 파일을 선택하세요.

### 2단계: 테이블 설정하기 (⭐가장 중요해요!⭐)

AppSheet이 구글 시트의 데이터들을 불러왔어요. 이제 각 테이블의 규칙을 정해줄 거예요. 왼쪽 메뉴에서 **[Data]** 탭을 누르면 조금 전 만든 테이블들이 모두 보여요. 각 테이블을 클릭해서 아래 설명대로 설정을 바꿔주세요.

- **규칙 1: Key (열쇠 🔑)**: 각 데이터 줄을 구별하는 유일한 '주민등록번호' 같은 거예요. 체크박스를 꼭 켜주세요.
- **규칙 2: Label (이름표 🏷️)**: 앱에서 데이터를 보여줄 때, 가장 대표로 보여줄 '이름'이에요. 체크박스를 꼭 켜주세요.
- **규칙 3: Ref (연결 다리 🔗)**: 테이블과 테이블을 연결해주는 '다리'예요. 다른 테이블의 Key를 가져와서 사용해요.

| 테이블 | 열 이름 | 설정할 규칙 | 설명 |
| :--- | :--- | :--- | :--- |
| **Inventories** | `Inventory_ID` | **Key 🔑** | 창고의 고유 번호 |
| | `Inventory_Name` | **Label 🏷️** | 앱에 보여줄 창고 이름 |
| **Items** | `Item_ID` | **Key 🔑** | 물품의 고유 번호 |
| | `Item_Name` | **Label 🏷️** | 앱에 보여줄 물품 이름 |
| **Stock** | `Stock_ID` | **Key 🔑** | 재고 기록의 고유 번호 |
| | `Inventory_ID` | **Ref 🔗** -> `Inventories` | 어느 창고에 있는지 연결 |
| | `Item_ID` | **Ref 🔗** -> `Items` | 어떤 물품인지 연결 |
| **Clients** | `Client_ID` | **Key 🔑** | 이용자(가구)의 고유 번호 |
| | `Household_Name` | **Label 🏷️** | 앱에서 보여줄 가구 이름 |
| **Distribution_Events** | `Distribution_ID` | **Key 🔑** | 배분 이벤트 고유 번호 |
| | `Distribution_Date` | **Label 🏷️** | 날짜가 기본 레이블로 보이도록 설정 |
| | `Client_ID` | **Ref 🔗** -> `Clients` | 어떤 가구에 전달했는지 연결 |
| **Distribution_Items** | `Distribution_Item_ID` | **Key 🔑** | 배분 상세 라인 고유 번호 |
| | `Distribution_ID` | **Ref 🔗** -> `Distribution_Events` | 상위 배분 이벤트와 연결 |
| | `Stock_ID` | **Ref 🔗** -> `Stock` | 실제 재고와 연결 |
| **Donors** | `Donor_ID` | **Key 🔑** | 후원자의 고유 번호 |
| | `Donor_Name` | **Label 🏷️** | 후원자 이름 |
| **Donations** | `Donation_ID` | **Key 🔑** | 기부 이벤트 고유 번호 |
| | `Donor_ID` | **Ref 🔗** -> `Donors` | 어느 후원자에게서 왔는지 연결 |
| **Donation_Items** | `Donation_Item_ID` | **Key 🔑** | 기부 상세 라인 고유 번호 |
| | `Donation_ID` | **Ref 🔗** -> `Donations` | 상위 기부 이벤트와 연결 |
| | `Inventory_ID` | **Ref 🔗** -> `Inventories` | 어느 창고에 입고할지 연결 |
| **Volunteers** | `Volunteer_ID` | **Key 🔑** | 자원봉사자 고유 번호 |
| | `Name` | **Label 🏷️** | 봉사자 이름 |
| **Volunteer_Shifts** | `Shift_ID` | **Key 🔑** | 봉사 스케줄 고유 번호 |
| | `Volunteer_ID` | **Ref 🔗** -> `Volunteers` | 어떤 봉사자가 배정되었는지 연결 |
| **Programs** | `Program_ID` | **Key 🔑** | 프로그램 고유 번호 |
| | `Program_Name` | **Label 🏷️** | 프로그램 이름 |
| **Client_Programs** | `Client_Program_ID` | **Key 🔑** | 등록 기록 고유 번호 |
| | `Client_ID` | **Ref 🔗** -> `Clients` | 어떤 가구가 참여 중인지 연결 |
| | `Program_ID` | **Ref 🔗** -> `Programs` | 어떤 프로그램인지 연결 |

> 참고: 나머지 테이블은 AppSheet이 자동으로 잘 설정해주니 처음에는 그대로 둬도 괜찮아요.

---

## 3부: 우리 앱의 얼굴, 화면 만들기 (Views)

이제 사용자가 실제로 보게 될 화면을 만들어볼게요. 왼쪽 메뉴에서 **[UX]** 탭을 눌러주세요.

### 1단계: 창고별 재고 현황 화면 만들기

1. **[+ New View]** 버튼을 클릭하세요.
2. **For this data** 에서 `Stock` 테이블을 선택하세요.
3. **View name** 에 `재고 현황` 이라고 입력하세요.
4. **View type** 에서 `deck` (카드 모양)을 선택하세요.
5. **Group by** 옵션에서 `Inventory_ID` 를 선택하세요.

🎉 **축하해요!** 이제 앱 미리보기 화면에 '재고 현황'이 생겼을 거예요. 들어가 보면, '광명시청 푸드뱅크', '소하동 제1창고' 처럼 창고별로 재고가 묶여서 보이는 걸 확인할 수 있어요. 각 창고를 누르면 안에 있는 물품들이 카드 형태로 보일 거예요!

---

## 4부: 앞으로 나아갈 길

지금까지 정말 잘 따라오셨어요! 여러분은 이미 푸드뱅크 앱의 뼈대를 완성했어요. 앞으로는...

- **데이터 입력하기:** 구글 시트나 앱에서 직접 더 많은 물품, 이용자, 재고 데이터를 입력해 보세요.
- **화면 꾸미기:** [UX] 탭에서 다른 View type을 선택해보거나, 아이콘을 바꾸면서 앱을 예쁘게 꾸며보세요.
- **자동화 도전하기:** [Automation] 탭에서 '재고가 10개 미만이면 나에게 이메일 보내기' 같은 멋진 자동화 규칙도 만들 수 있답니다.
- **커뮤니티 모듈 켜기:** 후원자, 봉사자, 프로그램 테이블을 연결해 커뮤니티 활동 데이터까지 한 번에 관리해 보세요.

이 가이드가 여러분의 첫 앱 만들기에 즐거운 경험이 되었으면 좋겠습니다. 여러분은 이제 세상을 바꾸는 멋진 개발자입니다!
