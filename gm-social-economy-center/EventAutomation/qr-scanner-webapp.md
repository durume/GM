# 📱 QR 스캔 웹앱으로 출석 체크하기 (Apps Script 활용)

> 이 문서는 [email-confirmation-and-QR-scan.md](./email-confirmation-and-QR-scan.md)의 **대안 방법**입니다.
> 동일한 Google Sheets 구조를 사용하되, AppSheet 대신 **Apps Script 웹앱**으로 QR 스캔 출석 체크를 구현합니다.

## 🎯 AppSheet 대비 장점

- ✅ 화면 열자마자 스캔 가능 (버튼 한 번만 클릭)
- ✅ 연속 스캔이 더 빠르고 직관적 (자동 2초 후 재시작)
- ✅ 커스텀 UI/UX 가능
- ✅ 모바일 브라우저에서 바로 사용 (앱 설치 불필요)
- ✅ 대형 화면으로 QR 코드 영역 표시

## 🎯 필요한 사전 준비

다음 단계들은 **이미 완료되어 있어야 합니다**:

1. ✅ Google Forms 생성 및 Google Sheets 연결
2. ✅ Form Responses 1 시트에 QR 코드 생성 스크립트 설정 완료
   (QR 코드는 "성명|연락처" 형식으로 생성되어야 함)
3. ✅ ScanLogs 시트 생성 완료

**참고**: 위 단계는 [email-confirmation-and-QR-scan.md](./email-confirmation-and-QR-scan.md) 문서의 **1~2단계**를 따라 완료하세요.

**⚠️ 중요**: 이 웹앱은 기존 Apps Script 프로젝트에 추가됩니다. 별도의 새 프로젝트가 아닙니다!

## 📋 시트 구조 확인

웹앱을 만들기 전에 Google Sheets가 다음과 같이 구성되어 있는지 확인하세요:

### 시트 1: `Form Responses 1` (참가자 명단)

헤더 행(1행)이 다음과 같아야 합니다:

| A | B | C | D | E | ... | J | K | L | M |
|---|---|---|---|---|-----|---|---|---|---|
| Timestamp | 성명 | 소속 | 연락처 | 이메일 | ... | QR코드URL | 출석시간 | 출석여부 | 리마인더발송여부 |

**열 위치 확인**:
- B열: 성명
- D열: 연락처
- K열(11번째): 출석시간
- L열(12번째): 출석여부

### 시트 2: `ScanLogs` (스캔 기록)

헤더 행(1행)이 다음과 같아야 합니다:

| A | B | C | D |
|---|---|---|---|
| ID | 스캔된성명 | 스캔된연락처 | 스캔시간 |

**✅ 확인 완료** 후 다음 단계로 진행하세요.

## 🚀 웹앱 만들기

### 1단계: Apps Script 프로젝트 열기

1. Google Sheets 파일을 엽니다
2. 상단 메뉴에서 **[확장 프로그램]** → **[Apps Script]** 클릭
3. Apps Script 편집기가 새 탭에서 열립니다

**현재 화면 확인**:
- 왼쪽: 파일 목록 (기본적으로 `Code.gs` 파일이 있음)
- 오른쪽: 코드 편집 영역

### 2단계: HTML 파일 추가

1. **왼쪽 파일 목록**에서 파일 옆의 **[+]** 버튼을 클릭합니다
   - `코드.gs` 옆에 마우스를 올리면 나타나는 + 버튼
2. 드롭다운 메뉴에서 **[HTML]** 선택
3. 파일 이름 입력 창이 나타나면:
   - 정확히 `Scanner` 입력 (대소문자 구분, 확장자 없음)
   - **[만들기]** 클릭

**결과 확인**: 왼쪽에 `Scanner.html` 파일이 생성되었는지 확인

### 3단계: Scanner.html 코드 작성

1. 왼쪽 파일 목록에서 **`Scanner.html`** 클릭
2. 오른쪽 편집 영역에 기본 코드가 보입니다
3. **모든 내용을 지우고** 아래 코드를 복사하여 붙여넣기:

```html
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR 스캔 출석 체크</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      min-height: 100vh;
    }

    .container {
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .header {
      background: #4285f4;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 24px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
    }

    .video-container {
      position: relative;
      width: 100%;
      background: #000;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #video {
      width: 100%;
      height: auto;
      display: block;
    }

    .scan-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 250px;
      height: 250px;
      border: 3px solid #4285f4;
      border-radius: 12px;
      pointer-events: none;
      box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.3);
    }

    .scan-overlay::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      border: 2px dashed rgba(66, 133, 244, 0.5);
      border-radius: 16px;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.5;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
    }

    .controls {
      padding: 20px;
      text-align: center;
    }

    button {
      background: #4285f4;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      max-width: 300px;
      margin: 5px auto;
      display: block;
      transition: background 0.3s;
    }

    button:hover {
      background: #357ae8;
    }

    button:active {
      background: #2b66c9;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    #stopBtn {
      background: #ea4335;
    }

    #stopBtn:hover {
      background: #d33426;
    }

    .status {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      color: #666;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.5;
    }

    .status.success {
      background: #e8f5e9;
      color: #2e7d32;
      font-weight: 600;
      font-size: 18px;
    }

    .status.error {
      background: #ffebee;
      color: #c62828;
      font-weight: 600;
    }

    .status.processing {
      background: #fff3e0;
      color: #f57c00;
    }

    .loading {
      display: none;
      text-align: center;
      padding: 20px;
      font-size: 16px;
      color: #666;
    }

    .loading.active {
      display: block;
    }

    .loading::after {
      content: '...';
      animation: dots 1.5s steps(4, end) infinite;
    }

    @keyframes dots {
      0%, 20% { content: '.'; }
      40% { content: '..'; }
      60%, 100% { content: '...'; }
    }

    canvas {
      display: none;
    }

    .info-box {
      padding: 15px;
      margin: 15px;
      background: #e3f2fd;
      border-radius: 8px;
      font-size: 14px;
      color: #1976d2;
      line-height: 1.6;
    }

    .info-box strong {
      display: block;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📱 QR 출석 체크</h1>
      <p>QR 코드를 파란색 사각형 안에 맞춰주세요</p>
    </div>

    <div class="video-container" id="videoContainer">
      <video id="video" playsinline></video>
      <div class="scan-overlay" id="overlay"></div>
    </div>

    <div class="controls">
      <button id="startBtn" onclick="startScanning()">📷 스캔 시작</button>
      <button id="stopBtn" onclick="stopScanning()" style="display:none;">⏹️ 스캔 중지</button>
    </div>

    <div id="status" class="status">
      카메라를 시작하려면 "스캔 시작" 버튼을 눌러주세요
    </div>

    <div id="loading" class="loading">
      처리 중
    </div>

    <div class="info-box" id="infoBox">
      <strong>💡 사용 팁</strong>
      • QR 코드를 화면에 가까이 가져가세요<br>
      • 밝은 곳에서 스캔하면 더 잘 인식됩니다<br>
      • 스캔 완료 후 자동으로 다음 스캔 준비됩니다
    </div>
  </div>

  <canvas id="canvas"></canvas>

  <script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"></script>
  <script>
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const statusDiv = document.getElementById('status');
    const loadingDiv = document.getElementById('loading');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const overlay = document.getElementById('overlay');
    const infoBox = document.getElementById('infoBox');

    let scanning = false;
    let stream = null;
    let lastScanTime = 0;
    const SCAN_COOLDOWN = 1000; // 1초 쿨다운

    async function startScanning() {
      try {
        statusDiv.className = 'status processing';
        statusDiv.textContent = '📷 카메라 시작 중...';
        infoBox.style.display = 'none';

        // 후면 카메라 우선 시도
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        video.srcObject = stream;
        await video.play();

        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
        overlay.style.display = 'block';

        scanning = true;
        statusDiv.className = 'status';
        statusDiv.textContent = '👀 QR 코드를 스캔해주세요';
        requestAnimationFrame(scan);

      } catch (err) {
        console.error('카메라 에러:', err);
        statusDiv.className = 'status error';

        let errorMsg = '카메라 접근 실패: ';
        if (err.name === 'NotAllowedError') {
          errorMsg += '카메라 권한을 허용해주세요.';
        } else if (err.name === 'NotFoundError') {
          errorMsg += '카메라를 찾을 수 없습니다.';
        } else {
          errorMsg += err.message;
        }
        statusDiv.textContent = errorMsg;
        infoBox.style.display = 'block';
      }
    }

    function stopScanning() {
      scanning = false;

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }

      video.srcObject = null;
      startBtn.style.display = 'block';
      stopBtn.style.display = 'none';
      overlay.style.display = 'none';
      statusDiv.className = 'status';
      statusDiv.textContent = '스캔이 중지되었습니다';
      infoBox.style.display = 'block';
    }

    function scan() {
      if (!scanning) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });

        if (code) {
          const currentTime = Date.now();
          // 쿨다운 체크 (같은 QR을 연속으로 읽는 것 방지)
          if (currentTime - lastScanTime > SCAN_COOLDOWN) {
            lastScanTime = currentTime;
            processQRCode(code.data);
            return;
          }
        }
      }

      requestAnimationFrame(scan);
    }

    function processQRCode(qrData) {
      scanning = false;
      loadingDiv.classList.add('active');
      statusDiv.className = 'status processing';
      statusDiv.textContent = '⏳ 처리 중...';

      console.log('스캔된 QR 데이터:', qrData);

      // QR 데이터를 서버로 전송
      google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(onError)
        .recordAttendance(qrData);
    }

    function onSuccess(result) {
      loadingDiv.classList.remove('active');

      if (result.success) {
        statusDiv.className = 'status success';
        statusDiv.textContent = '✅ ' + result.message;

        // 2초 후 다시 스캔 시작
        setTimeout(() => {
          if (!scanning && stream) {
            scanning = true;
            statusDiv.className = 'status';
            statusDiv.textContent = '👀 QR 코드를 스캔해주세요';
            requestAnimationFrame(scan);
          }
        }, 2000);
      } else {
        statusDiv.className = 'status error';
        statusDiv.textContent = '❌ ' + result.message;

        // 3초 후 다시 스캔 시작
        setTimeout(() => {
          if (!scanning && stream) {
            scanning = true;
            statusDiv.className = 'status';
            statusDiv.textContent = '👀 QR 코드를 스캔해주세요';
            requestAnimationFrame(scan);
          }
        }, 3000);
      }
    }

    function onError(error) {
      loadingDiv.classList.remove('active');
      statusDiv.className = 'status error';
      statusDiv.textContent = '❌ 에러 발생: ' + error.message;
      console.error('서버 에러:', error);

      setTimeout(() => {
        if (!scanning && stream) {
          scanning = true;
          statusDiv.className = 'status';
          statusDiv.textContent = '👀 QR 코드를 스캔해주세요';
          requestAnimationFrame(scan);
        }
      }, 3000);
    }

    // 페이지를 떠날 때 카메라 정리
    window.addEventListener('beforeunload', () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
  </script>
</body>
</html>
```

4. **저장**: Ctrl+S (Windows) 또는 Cmd+S (Mac)

**✅ 확인**: 파일 이름 옆에 저장되지 않은 표시(*)가 사라졌는지 확인

### 4단계: Code.gs에 서버 함수 추가

1. 왼쪽 파일 목록에서 **`Code.gs`** (또는 `코드.gs`) 클릭
2. **기존 코드 끝에** 아래 코드를 추가합니다 (기존 코드는 지우지 마세요!)

```javascript
/**
 * ==============================================
 * 웹앱 QR 스캔 기능 (여기서부터 추가)
 * ==============================================
 */

/**
 * 웹앱 진입점
 * 사용자가 웹앱 URL로 접속하면 이 함수가 실행됩니다
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Scanner')
    .setTitle('QR 출석 체크')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * QR 스캔 데이터 처리 및 출석 기록
 * @param {string} qrData - 스캔된 QR 코드 데이터 (형식: "성명|연락처")
 * @return {object} 처리 결과 {success: boolean, message: string}
 */
function recordAttendance(qrData) {
  try {
    // 스프레드시트 및 시트 가져오기
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const scanSheet = ss.getSheetByName("ScanLogs");
    const attendeeSheet = ss.getSheetByName("Form Responses 1");

    // 시트 존재 확인
    if (!scanSheet) {
      return {
        success: false,
        message: "ScanLogs 시트를 찾을 수 없습니다. 시트 이름을 확인해주세요."
      };
    }

    if (!attendeeSheet) {
      return {
        success: false,
        message: "Form Responses 1 시트를 찾을 수 없습니다."
      };
    }

    // QR 데이터 검증 및 파싱
    if (!qrData || typeof qrData !== 'string') {
      return {
        success: false,
        message: "잘못된 QR 코드입니다."
      };
    }

    // "성명|연락처" 형식으로 분리
    const parts = qrData.split("|");
    if (parts.length !== 2) {
      return {
        success: false,
        message: "QR 코드 형식이 올바르지 않습니다. (예상: 성명|연락처)"
      };
    }

    const name = parts[0].trim();
    const phone = parts[1].trim();

    // 빈 값 체크
    if (!name || !phone) {
      return {
        success: false,
        message: "성명 또는 연락처 정보가 없습니다."
      };
    }

    // 참가자 찾기 (성명과 연락처 모두 일치해야 함)
    const attendeeData = attendeeSheet.getDataRange().getValues();
    let attendeeRow = -1;

    // 헤더 행(0) 제외하고 검색 시작
    for (let i = 1; i < attendeeData.length; i++) {
      const rowName = attendeeData[i][1]; // B열: 성명
      const rowPhone = attendeeData[i][3]; // D열: 연락처

      if (rowName === name && rowPhone === phone) {
        attendeeRow = i + 1; // 1-based index로 변환
        break;
      }
    }

    // 참가자 미등록 확인
    if (attendeeRow === -1) {
      return {
        success: false,
        message: name + "님은 등록되지 않은 참가자입니다."
      };
    }

    // 중복 출석 체크
    const currentStatus = attendeeSheet.getRange(attendeeRow, 12).getValue(); // L열: 출석여부
    if (currentStatus === "출석완료") {
      const attendanceTime = attendeeSheet.getRange(attendeeRow, 11).getValue(); // K열: 출석시간
      const timeStr = attendanceTime ? Utilities.formatDate(new Date(attendanceTime), Session.getScriptTimeZone(), "HH:mm") : "";

      return {
        success: false,
        message: name + "님은 이미 출석 완료되었습니다" + (timeStr ? " (" + timeStr + ")" : "")
      };
    }

    // ScanLogs에 스캔 기록 저장
    const scanId = Utilities.getUuid();
    const scanTime = new Date();
    scanSheet.appendRow([scanId, qrData, phone, scanTime]);

    // Form Responses 1에 출석 처리
    attendeeSheet.getRange(attendeeRow, 11).setValue(scanTime); // K열: 출석시간
    attendeeSheet.getRange(attendeeRow, 12).setValue("출석완료"); // L열: 출석여부

    // 성공 메시지 반환
    return {
      success: true,
      message: name + "님 출석 완료! (" + Utilities.formatDate(scanTime, Session.getScriptTimeZone(), "HH:mm") + ")"
    };

  } catch (error) {
    // 에러 로깅
    console.error("출석 처리 에러:", error);
    console.error("스택:", error.stack);

    return {
      success: false,
      message: "시스템 오류: " + error.message
    };
  }
}

/**
 * 테스트용 함수: 웹앱이 정상 작동하는지 확인
 * Apps Script 편집기에서 직접 실행하여 테스트 가능
 */
function testRecordAttendance() {
  // 테스트 데이터 (실제 데이터로 교체 필요)
  const testQR = "홍길동|010-1234-5678"; // Form Responses 1에 존재하는 데이터로 교체

  const result = recordAttendance(testQR);
  console.log("테스트 결과:", result);

  if (result.success) {
    Logger.log("✅ 성공: " + result.message);
  } else {
    Logger.log("❌ 실패: " + result.message);
  }
}
```

3. **저장**: Ctrl+S (Windows) 또는 Cmd+S (Mac)

**✅ 확인**: 코드에 문법 오류가 없는지 확인 (오류가 있으면 빨간 밑줄이 나타남)

### 5단계: 코드 검증 (테스트 실행)

배포하기 전에 코드가 정상 작동하는지 테스트합니다.

#### 5-1. 테스트 데이터 준비

1. Google Sheets로 돌아갑니다
2. **Form Responses 1** 시트에서 실제 참가자 한 명의 데이터를 확인합니다:
   - B열(성명): 예) 홍길동
   - D열(연락처): 예) 010-1234-5678
3. 이 정보를 기억해둡니다

#### 5-2. 테스트 함수 수정

1. Apps Script 편집기로 돌아갑니다
2. `Code.gs` 파일에서 `testRecordAttendance` 함수를 찾습니다
3. **9번 라인**의 테스트 데이터를 실제 데이터로 수정:

```javascript
const testQR = "홍길동|010-1234-5678"; // 실제 참가자 데이터로 교체
```

예시:
```javascript
const testQR = "김영희|010-9876-5432"; // Form Responses 1에 있는 실제 데이터
```

#### 5-3. 테스트 실행

1. 상단의 **함수 선택 드롭다운**을 클릭
2. **`testRecordAttendance`** 선택
3. **[실행]** 버튼 (▶️ 재생 버튼 모양) 클릭
4. 처음 실행 시 권한 요청:
   - **[권한 검토]** 클릭
   - Google 계정 선택
   - **[고급]** 클릭
   - **[이름(안전하지 않은 페이지로 이동)]** 클릭
   - **[허용]** 클릭

#### 5-4. 테스트 결과 확인

1. 하단 **[실행 로그]** 탭 클릭
2. 로그 확인:
   - ✅ 성공: `✅ 성공: 홍길동님 출석 완료!`
   - ❌ 실패: 오류 메시지 확인

3. Google Sheets 확인:
   - **Form Responses 1**: K열(출석시간), L열(출석여부) 업데이트 확인
   - **ScanLogs**: 새 행에 스캔 기록 추가 확인

**⚠️ 문제 발생 시**:
- "시트를 찾을 수 없습니다" → 시트 이름 확인 (정확히 "Form Responses 1", "ScanLogs")
- "등록되지 않은 참가자" → 테스트 데이터가 Form Responses 1에 없음
- 기타 오류 → 로그 메시지 확인 후 문제 해결

**✅ 테스트 통과** 후 다음 단계로 진행하세요.

### 6단계: 웹앱 배포

#### 6-1. 배포 시작

1. Apps Script 편집기 오른쪽 상단의 **[배포]** 버튼 클릭
2. 드롭다운에서 **[새 배포]** 선택

#### 6-2. 배포 설정

1. **"유형 선택"** 옆의 ⚙️(설정) 아이콘 클릭
2. **[웹 앱]** 선택
3. 아래 설정 입력:

   **설명** (선택사항):
   ```
   QR 출석 체크 웹앱 v1.0
   ```

   **실행 권한**:
   - **"나"** 선택 (본인 계정으로 실행)

   **액세스 권한** (중요!):
   - **"모든 사용자"** 선택
   - (이것을 선택해야 다른 사람도 접속 가능)

4. **[배포]** 버튼 클릭

#### 6-3. 웹앱 URL 복사

1. **"웹 앱"** 섹션에서 URL 확인:
   ```
   https://script.google.com/macros/s/...../exec
   ```

2. **URL 전체를 복사**합니다
3. 안전한 곳에 저장 (메모장, 구글 문서 등)

4. **[완료]** 클릭

**🎉 축하합니다!** 웹앱 배포가 완료되었습니다.

### 7단계: 웹앱 테스트

#### 7-1. 모바일에서 접속

1. 복사한 URL을 본인의 **스마트폰**으로 전송 (메신저, 이메일 등)
2. 스마트폰에서 URL 클릭 (Chrome 또는 Safari 브라우저 권장)
3. 웹앱 화면이 표시되는지 확인

#### 7-2. 카메라 테스트

1. **"📷 스캔 시작"** 버튼 클릭
2. 카메라 권한 요청 → **"허용"** 선택
3. 카메라 화면이 켜지고 파란색 사각형이 표시되는지 확인

#### 7-3. QR 코드 스캔 테스트

1. 참가자의 QR 코드를 준비 (이메일에서 받은 QR 이미지)
2. QR 코드를 화면의 파란색 사각형 안에 맞춤
3. 자동으로 인식되고 결과 표시:
   - ✅ "홍길동님 출석 완료!" (초록색)
   - ❌ 오류 메시지 (빨간색)

4. 2초 후 자동으로 다음 스캔 준비 확인

**✅ 모든 테스트 통과** → 실제 행사에서 사용 가능!

## 📱 실제 사용 방법

### 행사 전 준비

1. **URL 공유**:
   - 행사 담당자에게 웹앱 URL 전달
   - 스마트폰 홈 화면에 북마크 추가 권장

2. **인터넷 확인**:
   - 행사장 WiFi 또는 모바일 데이터 연결 확인
   - 약한 신호 시 모바일 데이터 사용 권장

3. **테스트**:
   - 행사 시작 30분 전 실제 QR로 1~2명 테스트

### 행사 당일

1. **웹앱 열기**:
   - 스마트폰에서 저장한 URL로 접속
   - **"📷 스캔 시작"** 버튼 클릭

2. **연속 스캔**:
   - 참가자 QR 코드를 파란색 사각형에 맞춤
   - 자동 인식 → 결과 확인 (2초)
   - 자동으로 다음 스캔 준비

3. **결과 해석**:
   - ✅ **"OO님 출석 완료!"** (초록색):
     정상 출석 처리됨

   - ❌ **"이미 출석 완료되었습니다"** (빨간색):
     중복 스캔, 이미 들어온 사람

   - ❌ **"등록되지 않은 참가자"** (빨간색):
     사전 신청하지 않은 사람

   - ❌ **"QR 코드 형식이 올바르지 않습니다"** (빨간색):
     잘못된 QR 코드

4. **중지/재시작**:
   - 잠시 멈추려면: **"⏹️ 스캔 중지"** 버튼 클릭
   - 다시 시작: **"📷 스캔 시작"** 버튼 클릭

### 데이터 확인

#### 실시간 현황

1. Google Sheets 열기
2. **Form Responses 1** 시트:
   - K열: 출석 시간
   - L열: 출석 여부 ("출석완료")
3. 필터/정렬로 출석자 확인

#### 스캔 기록

1. **ScanLogs** 시트:
   - 모든 스캔 시도 기록 (중복 포함)
   - 문제 발생 시 디버깅에 사용

## 🎯 AppSheet vs 웹앱 비교

| 기능 | AppSheet | Apps Script 웹앱 |
|------|----------|------------------|
| **설정 난이도** | ⭐⭐ 쉬움 (노코드) | ⭐⭐⭐ 중간 (코딩 필요) |
| **스캔 속도** | ⭐⭐⭐ 보통 | ⭐⭐⭐⭐ 빠름 |
| **사용 편의성** | ⭐⭐⭐ 입력창 터치 필요 | ⭐⭐⭐⭐⭐ 버튼 한 번 클릭 |
| **연속 스캔** | ⭐⭐⭐ 수동 | ⭐⭐⭐⭐⭐ 자동 (2초 후) |
| **UI 커스터마이징** | ⭐⭐ 제한적 | ⭐⭐⭐⭐⭐ 자유로움 |
| **앱 설치** | 필요 | 불필요 (브라우저) |
| **오프라인** | 제한적 지원 | 불가 |
| **비용** | 무료 | 무료 |

## 🔄 배포 업데이트 방법

코드를 수정한 후 웹앱에 반영하는 방법:

### 방법 1: 새 버전 배포 (권장)

1. Apps Script에서 코드 수정
2. **저장** (Ctrl+S / Cmd+S)
3. 오른쪽 상단 **[배포]** → **[배포 관리]** 클릭
4. 활성 배포 옆 **연필 아이콘** 클릭
5. **[버전]** 드롭다운 → **[새 버전]** 선택
6. **[배포]** 클릭

**중요**: URL은 변경되지 않으므로 기존 링크 그대로 사용 가능!

### 방법 2: 빠른 테스트

1. 코드 수정 후 저장
2. 웹앱을 닫고 다시 열기
3. Ctrl+Shift+R (강력 새로고침) 또는 Cmd+Shift+R

**참고**: 캐시 때문에 바로 반영 안 될 수 있음. 방법 1 권장.

## ⚠️ 주의사항 및 제한사항

### 기술적 제약

1. **카메라 권한**:
   - HTTPS 환경에서만 작동 (Apps Script는 자동 HTTPS 제공)
   - 사용자가 카메라 권한 허용해야 함

2. **브라우저 호환성**:
   - ✅ Chrome, Edge (권장)
   - ✅ Safari (iOS 11+)
   - ❌ Internet Explorer (지원 안 함)
   - ❌ 일부 구형 안드로이드 브라우저

3. **인터넷 연결**:
   - 실시간 데이터 저장 필요
   - WiFi 또는 모바일 데이터 필수
   - 느린 연결 시 처리 지연 가능

4. **동시 사용**:
   - 여러 기기에서 동시 스캔 가능
   - Google Apps Script 일일 할당량:
     - 개인 계정: 하루 20,000회 실행
     - G Suite: 하루 100,000회 실행

### 보안 고려사항

1. **액세스 제한**:
   - "모든 사용자" 설정 → URL 아는 사람 누구나 접속
   - 민감한 데이터 처리 시 주의

2. **URL 관리**:
   - URL 외부 유출 주의
   - 행사 종료 후 배포 중지 권장

## 🛠️ 문제 해결 가이드

### 카메라 관련

#### 문제: 카메라가 켜지지 않음

**해결 방법**:
1. 브라우저 설정 → 사이트 설정 → 카메라 → 허용
2. 다른 앱이 카메라 사용 중인지 확인
3. 스마트폰 재시작

#### 문제: 전면 카메라만 켜짐

**해결 방법**:
1. 브라우저에서 카메라 전환 기능 사용
2. 또는 QR 코드를 전면 카메라로 스캔 (거울 모드)

### QR 스캔 관련

#### 문제: QR 코드가 인식되지 않음

**해결 방법**:
1. 밝은 곳으로 이동
2. QR 코드를 화면에 가까이 가져가기
3. QR 코드가 구겨지거나 손상되지 않았는지 확인
4. 카메라 렌즈 청소

#### 문제: "QR 코드 형식이 올바르지 않습니다"

**원인**: QR 코드가 "성명|연락처" 형식이 아님

**해결 방법**:
1. QR 생성 스크립트 확인
2. 테스트 QR로 형식 확인:
   ```javascript
   const qrData = "홍길동|010-1234-5678"; // 이 형식이어야 함
   ```

### 데이터 관련

#### 문제: "시트를 찾을 수 없습니다"

**원인**: 시트 이름이 정확하지 않음

**해결 방법**:
1. Google Sheets에서 시트 이름 확인:
   - 정확히 "Form Responses 1" (띄어쓰기 포함)
   - 정확히 "ScanLogs" (대소문자 구분)
2. `Code.gs` 파일의 시트 이름 수정

#### 문제: "등록되지 않은 참가자입니다"

**원인**: Form Responses 1에 해당 참가자 데이터 없음

**해결 방법**:
1. Form Responses 1 시트에서 성명, 연락처 확인
2. QR 코드의 데이터와 정확히 일치하는지 확인
3. 공백, 특수문자 주의

#### 문제: "이미 출석 완료되었습니다"

**원인**: 정상 동작 (중복 방지 기능)

**해결 방법**:
- 재출석 처리가 필요한 경우:
  1. Google Sheets로 이동
  2. Form Responses 1 시트
  3. 해당 행의 L열(출석여부) 셀 내용 삭제
  4. 다시 QR 스캔

### 성능 관련

#### 문제: 스캔 후 응답이 느림

**원인**: 네트워크 속도 또는 Google Apps Script 처리 시간

**해결 방법**:
1. WiFi 신호 확인
2. 모바일 데이터로 전환
3. 참가자 많을 시 여러 기기로 분산

#### 문제: "할당량 초과" 오류

**원인**: Google Apps Script 일일 실행 한도 초과

**해결 방법**:
- 개인 계정: 하루 20,000회 제한
- G Suite 계정 사용 고려 (하루 100,000회)

## 📊 고급 기능 추가

### 출석률 통계 보기

Google Sheets에서 간단한 수식으로 통계 확인:

```
=COUNTIF(L:L, "출석완료") / COUNTA(B:B) - 1
```

이 수식을 빈 셀에 입력하면 출석률(%) 계산

### 실시간 대시보드

Google Data Studio와 연동하여 실시간 출석 현황 대시보드 제작 가능

## 💡 활용 팁

### 대규모 행사

- 여러 스마트폰에 동일 URL 배포
- 입구별로 담당자 배치
- 태블릿 사용 시 화면 크기 장점

### QR 코드 출력

- 참가자가 QR를 인쇄하지 않은 경우:
  - 스마트폰 화면으로도 스캔 가능
  - 밝기 최대로 설정 권장

### 백업

- 행사 전 Google Sheets 복사본 생성
- 문제 발생 시 원본 복구 가능

## 📝 라이센스

이 코드는 자유롭게 수정하여 사용할 수 있습니다.
개선 사항이나 버그 제보는 GitHub Issues를 통해 공유해주세요.

## 🙋 FAQ

**Q: AppSheet와 웹앱 중 어느 것을 사용해야 하나요?**
A:
- 코딩 경험 없음 → AppSheet 권장
- 더 빠른 스캔 원함 → 웹앱 권장
- 둘 다 설정해두고 비교 가능

**Q: 오프라인에서 사용할 수 있나요?**
A: 아니요. 실시간 데이터 저장을 위해 인터넷 연결 필수입니다.

**Q: 비용이 발생하나요?**
A: 무료입니다. Google Apps Script와 Google Sheets 모두 무료 서비스입니다.

**Q: PC에서도 사용할 수 있나요?**
A: 네, 하지만 스마트폰 권장. PC 웹캠은 QR 스캔이 느릴 수 있습니다.

**Q: 여러 행사에서 재사용할 수 있나요?**
A: 네, 행사마다 새 Google Sheets 복사 후 Apps Script도 함께 복사하면 됩니다.

**Q: 참가자 수 제한이 있나요?**
A: Google Sheets는 1,000만 셀까지 지원. 수천 명 행사도 문제없습니다.
