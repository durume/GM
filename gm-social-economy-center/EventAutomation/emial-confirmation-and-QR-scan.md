
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
- [Scan] 기능 켜기:
  - 컬럼 왼쪽 연필 아이콘(Edit) 클릭
  - 설정 창 아래쪽 Other Properties 섹션 클릭 (펼치기)
  - Scannable 항목 체크 ✅
  - 상단 Done 클릭
- [자동 추출] 설정:
  - Initial value 수식: ```SPLIT([_THISROW].[스캔데이터], "|")[0]```
  - (QR 코드의 "성명|연락처" 형식에서 성명 부분만 추출)

4. 스캔된연락처:
- Type: Phone
- Initial value 수식: ```SPLIT([_THISROW].[스캔데이터], "|")[1]```
- (QR 코드에서 연락처 부분 추출)

5. 스캔시간:
- Type: DateTime
- Initial value: =NOW() 입력

**중요**: 실제로는 QR 코드를 스캔할 때 "성명|연락처" 형식의 텍스트가 "스캔된성명" 컬럼에 입력됩니다. AppSheet의 Scannable 기능은 한 컬럼에만 적용되므로, 아래 방식으로 설정을 변경하겠습니다:

**수정된 설정 (권장):**

3. 스캔된성명:
- Type: Text
- [Scan] 기능 켜기 (위와 동일)
- **이 컬럼에 "성명|연락처" 전체가 저장됩니다**
- [중복 방지] 설정:
  - 컬럼 편집 > Data Validity 섹션 클릭
  - Valid If 수식 입력:
    ```
    ISBLANK(
      LOOKUP(
        SPLIT([_THIS], "|")[0],
        "Form Responses 1",
        "성명",
        "출석여부"
      )
    ) OR
    LOOKUP(
      SPLIT([_THIS], "|")[0],
      "Form Responses 1",
      "성명",
      "출석여부"
    ) <> "출석완료"
    ```
  - Invalid value error 입력: "이미 출석 처리된 참가자입니다."
  - (QR 코드에서 성명을 추출하여 이미 출석한 사람인지 확인)

4. 스캔된연락처:
- Type: Text
- Initial value 수식: ```SPLIT([스캔된성명], "|")[1]```
- App formula 체크 ✅
- (스캔된성명에서 연락처 부분만 추출)

5. 참가자찾기:
- Type: Ref
- Source table: Form Responses 1
- Referenced column: 성명
- App formula: ```SPLIT([스캔된성명], "|")[0]```
- App formula 체크 ✅
- Show?: 체크 해제 (숨김)

6. 스캔시간:
- Type: DateTime
- Initial value: =NOW() 입력

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
- **Display** 섹션을 펼쳐서:
  - **Prominence**: `Do not display` 선택 (사용자 화면에 버튼 숨김)

#### Action 2: 자동 연결 (ScanLogs용)

다시 **New Action** 클릭하여 새 액션 생성:

- **Action name**: `자동출석트리거`
- **For a record of this table**: `ScanLogs`
- **Do this**: `Data: execute an action on a set of rows` 선택
- 추가 설정 필드가 나타나면:
  - **Referenced Table**: `Form Responses 1`
  - **Referenced Rows**: `LIST([참가자찾기])`
  - **Referenced Action**: `출석상태변경` (위에서 만든 액션 선택)
- **Display** 섹션:
  - **Prominence**: `Do not display`

**설명**: QR 코드 스캔 시 "성명|연락처" 데이터가 스캔되면, `참가자찾기` Ref 컬럼이 성명을 기준으로 Form Responses 1 테이블에서 해당 참가자를 찾아 출석 처리합니다.

### 4. 스캐너 화면 만들기 (왼쪽 메뉴 'UX')
1. 왼쪽 메뉴에서 **UX** 탭 클릭
2. **Views** 섹션에서 **New View** 클릭 (+ 버튼)
3. 다음과 같이 설정:
   - **View name**: `스캐너`
   - **For this data**: `ScanLogs`
   - **View type**: `form` (중요)
4. 생성된 뷰를 클릭하여 설정 화면으로 들어갑니다
5. **Behavior** 섹션을 펼칩니다:
   - **Event Actions** 찾기
   - **Form Saved** 드롭다운에서 `자동출석트리거` 선택
6. **Behavior** 섹션 내 **Navigation** 항목 설정:
   - **Finish view**: `스캐너` (자기 자신을 선택 - 스캔 후 다시 스캔 화면으로 돌아옴)

**참고**: 2025년 AppSheet에서는 Auto save 옵션이 기본적으로 활성화되어 있으며, Form Saved 이벤트를 통해 저장 후 동작을 제어합니다.

# ✅ 최종 사용 방법

## QR 코드 데이터 형식
- 생성되는 QR 코드에는 **"성명|연락처"** 형식으로 데이터가 저장됩니다
- 예: "홍길동|010-1234-5678"
- 이를 통해 동명이인 구분 및 참가자 확인이 가능합니다

## 앱 사용 방법
1. 상단 [Save] 버튼을 눌러 앱을 저장합니다.
2. 스마트폰에 AppSheet 앱을 설치하고 로그인합니다.
3. 만들어진 앱을 실행하고 [스캐너] 메뉴로 들어갑니다.
4. [스캔된성명] 입력창을 터치합니다.
5. 입력창 내부의 **[QR 코드 아이콘]**을 누릅니다.
6. 참가자의 QR 코드를 비추면:
   - "성명|연락처" 데이터가 자동으로 스캔됩니다
   - 성명을 기준으로 참가자를 찾습니다
   - 자동으로 출석 처리가 완료됩니다
   - 다시 스캐너 화면으로 돌아가 다음 참가자를 스캔할 수 있습니다
