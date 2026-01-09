
```주의``` 아래 업무 자동화는 [2026년 광명시 사회연대경제 사업설명회 참가신청](https://docs.google.com/forms/d/e/1FAIpQLSeA8mKtJuPnSVJp4GgvzTqQGBEzVOm0vhNz07BlS7CFhQTF5w/viewform) 폼을 기초로 작성되어 있습니다.  

# 🎫 행사 자동화 관리 시스템 (구글 워크스페이스를 활용한 노코드 자동화)
## QR 코드 생성, 신청확인 이메일 보내기에서 입장시 QR 코드 활용 출석 체크까지  
이 가이드는 구글 설문지(Forms), 스프레드시트(Sheets), 앱시트(AppSheet)를 연동하여 비용 없이 행사 접수 시스템과 QR 코드 입장 체크 시스템을 구축하는 전체 과정을 안내합니다.

## 🌟 주요 기능: 구글 설문지로 신청을 받고, 데이터는 스프레드시트에 자동 저장됩니다.

입장권 자동 발송: 신청 즉시 QR 코드가 포함된 안내 메일이 발송됩니다.

원터치 스캔 입장: 스마트폰 앱(AppSheet)으로 QR을 찍으면 버튼 클릭 없이 즉시 '출석완료' 처리됩니다.

리마인더 일괄 발송: 행사 직전, 버튼 클릭 한 번으로 참가자 전원에게 리마인더 메일을 보냅니다. (New!)

## 🛠 1단계: 데이터 수집
1. 새로운 **구글 설문지**를 생성합니다.  
2. 다음 질문들을 추가합니다. (순서가 중요합니다. 스크립트가 이 순서대로 데이터를 읽습니다.)
 - 성명 (단답형)
 - 소속/직급 (단답형)
 - 연락처(010-0000-0000) (단답형)
 - 이메일 (단답형)
 - 2025년 광명시 사회연대경제를 떠올리면... (작문형)
 - 2026년 사회연대경제 사업 관련... (작문형)
 - 기타 궁금한 사항... (작문형)
 - 개인정보 보호법... (객관식)
3. 상단 [응답] 탭에서 **[Sheets에 연결]**을 클릭하여 새 스프레드시트를 생성합니다.

## ⚙️ 2단계: 자동화 엔진 설정 (구글 시트 & Apps Script)

1. 스프레드시트 구조 잡기 (시트 2개)

생성된 스프레드시트에서 아래 두 개의 시트(탭)를 준비합니다.

### 시트 1: ```Form Responses 1``` (설문 응답 시트)

구글 폼과 연동되어 자동 생성된 시트입니다. 오른쪽 끝(I열 이후)에 네 개의 열(컬럼)을 직접 추가합니다.

- J1: QR Code
- K1: 출석시간
- L1: 출석여부
- M1: 리마인더발송여부

### 시트 2: ```ScanLogs``` (스캔 기록용)

하단 + 버튼을 눌러 시트를 추가하고 이름을 ScanLogs로 변경합니다.
- A1: ID
- B1: 스캔된성명
- C1: 스캔된연락처
- D1: 스캔시간

2. QR 생성 및 메일 발송 스크립트 작성

  - 스프레드시트 상단 메뉴에서 [확장 프로그램] > **[Apps Script]**를 클릭합니다.
  - 편집기에 있는 기존 코드를 모두 지우고, 아래 전체 코드를 복사해 붙여넣습니다. (기존 함수 + 리마인더 기능 포함)

```Apps Script Code
// --- 공통 설정 (Configuration) ---
// 0:Time, 1:성명, 2:소속, 3:연락처, 4:이메일 ...
const NAME_INDEX = 1;   // B열
const PHONE_INDEX = 3;  // D열
const EMAIL_INDEX = 4;  // E열

// 저장 위치 (1부터 시작: J=10, M=13)
const QR_SAVE_COL = 10;      // J열
const REMIND_STATUS_COL = 13; // M열

// 행사 정보
const EVENT_NAME = "2026 광명시 사회연대경제 사업설명회";
const EVENT_DATE = "2026. 1. 13. (화) 13:50 ~ 16:00";
const EVENT_LOCATION = "광명시청 본관 1층 대회의실";
const CONTACT_INFO = "02-2680-6333";

/**
 * 1. 메뉴 생성 함수 (시트를 열 때 자동 실행)
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('➡️ 행사 관리 기능')
      .addItem('📧 리마인더 메일 일괄 발송', 'sendReminderEmails')
      .addToUi();
}

/**
 * 2. 신청 시 자동 메일 발송 함수 (트리거용)
 */
function sendEventConfirmation(e) {
  try {
    const responses = e.values;
    const userName = responses[NAME_INDEX];
    const userPhone = responses[PHONE_INDEX];
    const userEmail = responses[EMAIL_INDEX];

    // 필수 정보 유효성 검사
    if (!userName || !userPhone) {
      console.error("필수 정보 누락 - 성명: " + userName + ", 연락처: " + userPhone);
      return;
    }

    if (!userEmail || !userEmail.includes('@')) {
      console.error("유효하지 않은 이메일: " + userEmail);
      return;
    }

    // QR 코드 데이터: 성명|연락처 형식
    const qrData = userName + "|" + userPhone;
    const qrImageUrl = generateQRCode(qrData);

    // 시트에 QR 저장 (getActiveSheet 대신 명시적으로 시트 이름 지정)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
    if (!sheet) {
      console.error("'Form Responses 1' 시트를 찾을 수 없습니다.");
      return;
    }

    const row = e.range.getRow();
    sheet.getRange(row, QR_SAVE_COL).setValue(qrImageUrl);

    // 메일 발송
    sendEmail(userEmail, userName, qrImageUrl, "참가확정");

  } catch (error) {
    console.error("접수 메일 에러: " + error.toString());
  }
}

/**
 * 3. 리마인더 메일 일괄 발송 함수 (메뉴 클릭용)
 */
function sendReminderEmails() {
  // [중요] 실제 시트 이름인 'Form Responses 1'을 사용해야 합니다.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); 
  
  const ui = SpreadsheetApp.getUi();
  if (!sheet) {
    ui.alert("오류: 'Form Responses 1' 시트를 찾을 수 없습니다.");
    return;
  }

  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();
  
  let sentCount = 0;
  
  // 2행부터 루프 (헤더 제외)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const userEmail = row[EMAIL_INDEX];
    const userName = row[NAME_INDEX];
    // 배열 인덱스는 0부터이므로 J열(10번째)은 인덱스 9
    const qrImageUrl = row[QR_SAVE_COL - 1]; 
    // M열(13번째)은 인덱스 12
    const remindStatus = row[REMIND_STATUS_COL - 1];
    
    // 이메일이 있고, QR이 있고, 아직 발송 안 했다면
    if (userEmail && qrImageUrl && remindStatus !== "발송완료") {
      try {
        sendEmail(userEmail, userName, qrImageUrl, "리마인더");
        
        // M열에 '발송완료' 표시 (i+1 행)
        sheet.getRange(i + 1, REMIND_STATUS_COL).setValue("발송완료");
        sentCount++;
      } catch (err) {
        console.error("리마인더 에러 (" + userEmail + "): " + err.toString());
      }
    }
  }
  
  ui.alert(`총 ${sentCount}건의 리마인더 메일을 발송했습니다.`);
}

/**
 * 헬퍼 함수: QR 코드 생성
 */
function generateQRCode(text) {
  const encodedText = encodeURIComponent(text);
  return `https://quickchart.io/qr?text=${encodedText}&size=300`;
}

/**
 * 헬퍼 함수: 이메일 발송
 */
function sendEmail(to, name, qrUrl, type) {
  let subject = "";
  let intro = "";
  
  if (type === "참가확정") {
    subject = `[참가확정] ${EVENT_NAME} 입장 QR 코드`;
    intro = "참가 신청이 완료되었습니다.";
  } else {
    subject = `[D-Day 알림] ${EVENT_NAME} 행사 안내`;
    intro = "행사가 곧 시작됩니다! 잊지 말고 참석해주세요.";
  }

  const htmlBody = `
    <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #E91E63;">${EVENT_NAME}</h2>
      <p>안녕하세요, <strong>${name}</strong>님.</p>
      <p>${intro} 입장 시 아래 QR 코드를 제시해주세요.</p>
      <hr>
      <div style="text-align: center; margin: 30px 0;">
        <img src="${qrUrl}" alt="QR Code" style="border: 1px solid #ccc; padding: 10px; border-radius: 10px;">
      </div>
      <p><strong>일시:</strong> ${EVENT_DATE}</p>
      <p><strong>장소:</strong> ${EVENT_LOCATION}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">문의: ${CONTACT_INFO}</p>
    </div>
  `;

  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody
  });
}
```

상단 **디스켓 아이콘(💾 저장)**을 누릅니다.

[중요] 구글 시트 화면을 새로고침(F5) 합니다. 몇 초 뒤 메뉴바 오른쪽에 [➡️ 행사 관리 기능] 메뉴가 나타납니다.

3. 트리거(자동 실행) 설정

**[중요] 신청 시 자동으로 QR 코드와 확인 메일을 발송하려면 트리거 설정이 필수입니다.**

1. Apps Script 편집기 화면에서 왼쪽 메뉴의 **시계 아이콘(⏰ 트리거)**을 클릭합니다.
2. 오른쪽 하단의 **[+ 트리거 추가]** 버튼을 클릭합니다.
3. 다음과 같이 설정합니다:
   - **실행할 함수 선택**: `sendEventConfirmation`
   - **실행할 배포 선택**: `Head`
   - **이벤트 소스 선택**: `스프레드시트에서`
   - **이벤트 유형 선택**: `양식 제출 시`
4. **[저장]** 버튼을 클릭합니다.
5. 처음 설정 시 Google 계정 권한 승인을 요청하면 승인합니다.

**✅ 완료!** 이제 구글 폼으로 신청이 들어올 때마다 자동으로 QR 코드가 생성되고 확인 메일이 발송됩니다.

## 📱 3단계: 출석 체크 앱 만들기 (AppSheet)

### 1. 앱 생성 및 데이터 추가

스프레드시트 메뉴에서 [확장 프로그램] > [AppSheet] > **[앱 만들기]**를 클릭합니다.

앱이 열리면 왼쪽 메뉴 Data 탭을 클릭합니다.

[+] 버튼(Add Table)을 눌러 ScanLogs 시트도 앱에 추가합니다.

### 2. 데이터 컬럼 설정 (Data > Columns)

#### A. Form Responses 1 (참가자 명단)

1. 테이블 이름을 클릭해 펼칩니다.
2. 다음과 같이 설정합니다.

- 이메일: Type Email, Key 체크 ✅, Label 해제
- 성명: Type Text, Label 체크 ✅
- QR Code: Type Image
- 출석여부: Type Text (Editable 체크되어 있어야 함)

#### B. ScanLogs (스캔 기록)

1. 테이블을 펼치고 설정을 변경합니다.
2. ID:
- Type: Text, Key 체크 ✅
- Initial value (수식 아이콘): =UNIQUEID() 입력
- Show?: 체크 해제 (화면에 안 보이게 숨김)

3. 스캔된성명:
- Type: Text
- Initial value: 비워둠 (사용자가 QR 스캔으로 직접 입력)
- [Scan] 기능 켜기:
  - 컬럼 왼쪽 연필 아이콘(Edit) 클릭
  - 설정 창 아래쪽 Other Properties 섹션 클릭 (펼치기)
  - Scannable 항목 체크 ✅
  - 상단 Done 클릭
- **이 컬럼에 QR 스캔 시 "성명|연락처" 전체가 저장됩니다**

**⚠️ 중요**: QR 스캔 기능(카메라 아이콘)은 **스마트폰의 AppSheet 앱에서만** 나타납니다. 웹 브라우저의 Preview나 PC에서는 카메라 아이콘이 보이지 않으므로, 반드시 모바일 기기에서 테스트하세요.

- [중복 방지] 설정 (선택사항):
  - 컬럼 편집 > Data Validity 섹션 클릭
  - Valid If 수식 입력:
    ```
    OR(
      ISBLANK([_THIS]),
      COUNT(
        SELECT(Form Responses 1[성명],
          AND(
            [성명] = INDEX(SPLIT([_THIS], "|"), 1),
            [연락처] = INDEX(SPLIT([_THIS], "|"), 2),
            [출석여부] = "출석완료"
          )
        )
      ) = 0
    )
    ```
  - Invalid value error 입력: "이미 출석 처리된 참가자입니다."

**수식 설명:**
- `OR(조건1, 조건2)`: 조건1 또는 조건2 중 하나라도 참이면 입력 허용
- 조건1: `ISBLANK([_THIS])` - 빈 값이면 허용 (취소할 때)
- 조건2: `COUNT(...) = 0` - 이미 출석한 기록이 0건이면 허용
  - `INDEX(SPLIT([_THIS], "|"), 1)`: QR 코드에서 성명 추출 (예: "홍길동|010-1234-5678" → "홍길동")
  - `INDEX(SPLIT([_THIS], "|"), 2)`: QR 코드에서 연락처 추출 (예: "홍길동|010-1234-5678" → "010-1234-5678")
  - `SELECT(...)`: Form Responses 1에서 **성명과 연락처 둘 다 일치하고** 출석완료인 사람 찾기
  - 출석완료 기록이 0건 = 아직 출석 안 함 = 입력 허용

**중요:** 동명이인(같은 이름)이 있을 경우를 대비하여 성명과 연락처를 모두 확인합니다.

**더 간단한 방식 (권장):**
중복 방지를 생략하고, 대신 참가자 화면에서 "출석여부" 컬럼을 표시하여 육안으로 확인하는 것도 좋습니다. Valid If를 생략하려면 이 설정을 건너뛰세요.

4. 스캔된연락처:
- Type: Text
- Formula 섹션:
  - **Initial value**: ```INDEX(SPLIT([스캔된성명], "|"), 2)```
  - **App formula**: 비워두기 (Google Sheets의 실제 컬럼이므로)
- (스캔된성명 컬럼에서 "|" 뒤의 연락처 부분만 자동 추출하여 Sheets에 저장)
- Editable?: 체크 해제

**참고**: Initial value는 데이터베이스에 저장되는 컬럼, App formula는 가상 컬럼(저장 안 됨)

5. 참가자찾기:
- Type: Ref
- Source table: Form Responses 1
- **Referenced column은 나타나지 않습니다 (App formula를 사용할 때는 수식이 대신 참조를 결정합니다)**
- Formula 섹션 (이 설정이 중요합니다!):
  - **Initial value**: 비워두기
  - **App formula**: 다음 수식 입력
    ```
    ANY(
      SELECT(Form Responses 1[성명],
        AND(
          [성명] = INDEX(SPLIT([스캔된성명], "|"), 1),
          [연락처] = INDEX(SPLIT([스캔된성명], "|"), 2)
        )
      )
    )
    ```
- (스캔된성명에서 성명과 연락처를 모두 추출하여 정확한 참가자 검색)
- Show?: 체크 해제 (숨김 - 내부 로직용)
- Editable?: 자동으로 체크 해제됨 (Virtual Column이므로)

**설정 순서:**
1. Type을 Ref로 선택
2. Source table을 Form Responses 1로 선택
3. Formula 섹션에서 **App formula 필드**에 위 수식 입력 (Initial value는 비워둠)
4. Show를 체크 해제

**중요 참고사항:**
- **App formula**에 수식을 입력하면 이 컬럼은 **Virtual Column(가상 컬럼)**이 됩니다
- Virtual Column은 데이터베이스에 저장되지 않고, 매번 계산됩니다
- **성명과 연락처를 모두 확인**하여 동명이인이 있어도 정확한 사람을 찾습니다
- 이 방식이 권장됩니다. QR 스캔 시 성명+연락처로 실시간 참가자를 찾습니다

6. 스캔시간:
- Type: DateTime
- Initial value: ```NOW()```
- Editable?: 체크 해제

**📊 컬럼 유형 정리:**
- **실제 컬럼 (Google Sheets에 저장됨):**
  - ID, 스캔된성명, 스캔된연락처, 스캔시간
  - 이 컬럼들은 **Initial value**에 수식을 입력하고 **App formula는 비워둠**

- **가상 컬럼 (Virtual Column - 계산만 수행):**
  - 참가자찾기
  - **Initial value는 비우고**, **App formula에 수식 입력**

**핵심 차이:**
- `Initial value` = 데이터베이스에 값 저장 (실제 컬럼)
- `App formula` = 실시간 계산만 (가상 컬럼, 저장 안 됨)

### 3. 동작(Actions) 만들기

1. 왼쪽 메뉴에서 **Automation** 탭 클릭
2. **Actions** 섹션으로 이동
3. **New Action** 클릭 (+ 버튼)

#### Action 1: 출석상태 변경 (참가자 명단용)
- **Action name**: `출석상태변경`
- **For a record of this table**: `Form Responses 1`
- **Do this**: `Data: set the values of some columns in this row` 선택
- **Set these columns** 섹션에서 [+] 버튼을 눌러 다음을 추가:
  - Column: `출석시간` → Value: `NOW()`
  - Column: `출석여부` → Value: `"출석완료"`
- **Position**: `Hide` 선택 (사용자 화면에 버튼 숨김)

**Position 옵션 설명:**
- Primary: 주요 버튼으로 표시
- Prominent: 눈에 띄게 표시
- Inline: 인라인으로 표시
- Hide: 숨김 (자동화/백그라운드 액션용)

#### Action 2: 자동 연결 (ScanLogs용)

다시 **New Action** 클릭하여 새 액션 생성:

- **Action name**: `자동출석트리거`
- **For a record of this table**: `ScanLogs`
- **Do this**: `Data: execute an action on a set of rows` 선택
- 추가 설정 필드가 나타나면:
  - **Referenced Table**: `Form Responses 1`
  - **Referenced Rows**: `LIST([참가자찾기])`
  - **Referenced Action**: `출석상태변경` (위에서 만든 액션 선택)
- **Position**: `Hide` 선택

**설명**: QR 코드 스캔 시 "성명|연락처" 데이터가 스캔되면, `참가자찾기` Ref 컬럼이 **성명과 연락처를 모두 확인**하여 Form Responses 1 테이블에서 해당 참가자를 정확하게 찾아 출석 처리합니다. 동명이인이 있어도 연락처로 구분됩니다.

### 4. 스캐너 화면 설정하기 (왼쪽 메뉴 'UX')

**참고**: AppSheet가 자동으로 생성한 `ScanLogs_Form` 뷰를 그대로 사용합니다. 원하면 View name을 "스캐너"로 변경할 수 있습니다.

1. 왼쪽 메뉴에서 **UX** 탭 클릭
2. **Views** 섹션에서 **ScanLogs_Form** 뷰를 찾아 클릭
3. (선택사항) View name을 "스캐너"로 변경 가능
4. **Behavior** 섹션을 펼칩니다:
   - **Event Actions** 찾기
   - **Form Saved** 드롭다운에서 `자동출석트리거` 선택
5. **Behavior** 섹션 내 **Navigation** 항목 설정:
   - **Finish view**: 다음 중 선택
     - **`ScanLogs_Form`** (권장): 스캔 후 다시 같은 Form 화면으로 돌아가 연속 스캔 가능
     - **`Auto assign (Go Back)`**: 스캔 후 이전 화면(메인 메뉴 등)으로 자동 복귀
   - View name을 "스캐너"로 변경했다면 Finish view 드롭다운에도 "스캐너"로 나타납니다

   **권장**: 여러 참가자를 연속으로 스캔해야 하므로 `ScanLogs_Form` 선택을 추천합니다.

**참고**: 2025년 AppSheet에서는 Auto save 옵션이 기본적으로 활성화되어 있으며, Form Saved 이벤트를 통해 저장 후 동작을 제어합니다.

# ✅ 최종 사용 방법

## QR 코드 데이터 형식
- 생성되는 QR 코드에는 **"성명|연락처"** 형식으로 데이터가 저장됩니다
- 예: "홍길동|010-1234-5678"
- 이를 통해 동명이인 구분 및 참가자 확인이 가능합니다

## 앱 사용 방법
1. 상단 [Save] 버튼을 눌러 앱을 저장합니다.
2. 스마트폰에 AppSheet 앱을 설치하고 로그인합니다.
3. 만들어진 앱을 실행하고 [ScanLogs_Form] 메뉴로 들어갑니다.
   - View name을 "스캐너"로 변경했다면 [스캐너] 메뉴로 표시됩니다
4. [스캔된성명] 입력창을 터치합니다.
5. 입력창 내부의 **[QR 코드 아이콘]**을 누릅니다.
6. 참가자의 QR 코드를 비추면:
   - "성명|연락처" 데이터가 자동으로 스캔됩니다
   - 성명과 연락처를 모두 확인하여 정확한 참가자를 찾습니다
   - 자동으로 출석 처리가 완료됩니다
   - 다시 스캔 화면으로 돌아가 다음 참가자를 스캔할 수 있습니다
