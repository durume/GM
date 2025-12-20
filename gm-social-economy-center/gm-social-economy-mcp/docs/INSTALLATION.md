# 📦 설치 가이드

이 문서는 `gm-social-economy-mcp`를 처음부터 설치하는 방법을 단계별로 안내합니다.
프로그래밍 경험이 없어도 따라할 수 있도록 상세하게 설명되어 있습니다.

---

## 📋 목차

1. [사전 준비](#-사전-준비)
2. [Node.js 설치](#-nodejs-설치)
3. [프로젝트 다운로드](#-프로젝트-다운로드)
4. [MCP 서버 설치](#-mcp-서버-설치)
5. [Claude Desktop 설정](#-claude-desktop-설정)
6. [설치 확인](#-설치-확인)
7. [문제 해결](#-문제-해결)

---

## 🔍 사전 준비

### 필요한 것들

| 항목 | 설명 | 다운로드 링크 |
|------|------|--------------|
| **컴퓨터** | Windows 10/11 또는 macOS | - |
| **인터넷** | 설치 파일 다운로드용 | - |
| **Node.js** | JavaScript 실행 환경 | [nodejs.org](https://nodejs.org/) |
| **Claude Desktop** | Claude AI 앱 | [claude.ai/download](https://claude.ai/download) |
| **VS Code** (권장) | 코드 편집기 | [code.visualstudio.com](https://code.visualstudio.com/) |

---

## 🟢 Node.js 설치

Node.js는 이 프로젝트를 실행하는 데 필요한 프로그램입니다.

### Windows 사용자

1. [nodejs.org](https://nodejs.org/)에 접속
2. **LTS 버전** (왼쪽 버튼)을 클릭하여 다운로드
3. 다운로드된 설치 파일 실행
4. "Next"를 계속 클릭하여 기본 설정으로 설치
5. 설치 완료!

### macOS 사용자

1. [nodejs.org](https://nodejs.org/)에 접속
2. **LTS 버전** (왼쪽 버튼)을 클릭하여 다운로드
3. 다운로드된 .pkg 파일 실행
4. 안내에 따라 설치
5. 설치 완료!

### 설치 확인

터미널(명령 프롬프트)을 열고 다음을 입력하세요:

```bash
node --version
```

`v18.0.0` 이상이 표시되면 성공입니다! 🎉

**터미널 여는 방법:**
- **Windows**: 시작 메뉴에서 "cmd" 검색 → "명령 프롬프트" 클릭
- **macOS**: Spotlight(⌘+Space)에서 "터미널" 검색 → 실행

---

## 📥 프로젝트 다운로드

### 방법 1: Git 사용 (권장)

Git이 설치되어 있다면:

```bash
# 원하는 폴더로 이동
cd ~/Documents

# 저장소 클론
git clone https://github.com/durume/GM.git

# MCP 폴더로 이동
cd GM/gm-social-economy-mcp
```

### 방법 2: 직접 다운로드

1. [github.com/durume/GM](https://github.com/durume/GM)에 접속
2. 녹색 "Code" 버튼 클릭
3. "Download ZIP" 클릭
4. 다운로드된 ZIP 파일 압축 해제
5. 압축 해제된 폴더 안의 `gm-social-economy-mcp` 폴더로 이동

---

## 🔧 MCP 서버 설치

터미널에서 `gm-social-economy-mcp` 폴더로 이동한 후:

```bash
# 1. 필요한 패키지 설치 (처음 한 번만)
npm install

# 2. TypeScript 빌드
npm run build
```

**예상 결과:**
```
added 15 packages in 5s
```

빌드 후 `dist` 폴더가 생성됩니다.

---

## ⚙️ Claude Desktop 설정

Claude Desktop이 이 MCP 서버를 인식하도록 설정해야 합니다.

### Step 1: 설정 파일 위치 찾기

| 운영체제 | 설정 파일 경로 |
|---------|---------------|
| **Windows** | `C:\Users\[사용자명]\AppData\Roaming\Claude\claude_desktop_config.json` |
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |

**팁:** Windows에서 AppData 폴더가 안 보이면:
1. 파일 탐색기 열기
2. 주소창에 `%APPDATA%\Claude` 입력
3. Enter

### Step 2: 설정 파일 편집

설정 파일이 없으면 새로 만드세요. 있으면 편집하세요.

**Windows 예시:**
```json
{
  "mcpServers": {
    "gm-social-economy": {
      "command": "node",
      "args": ["C:\\Users\\YourName\\Documents\\GM\\gm-social-economy-mcp\\dist\\index.js"],
      "env": {}
    }
  }
}
```

**macOS 예시:**
```json
{
  "mcpServers": {
    "gm-social-economy": {
      "command": "node",
      "args": ["/Users/YourName/Documents/GM/gm-social-economy-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

⚠️ **중요:** `YourName`을 실제 사용자명으로, 경로를 실제 설치 경로로 바꾸세요!

### Step 3: 경로 확인하기

터미널에서 다음을 실행하여 전체 경로를 확인할 수 있습니다:

**Windows:**
```bash
cd GM\gm-social-economy-mcp\dist
echo %cd%\index.js
```

**macOS:**
```bash
cd GM/gm-social-economy-mcp/dist
pwd
```

### Step 4: Claude Desktop 재시작

1. Claude Desktop 완전 종료 (트레이 아이콘도 확인)
2. Claude Desktop 다시 실행

---

## ✅ 설치 확인

Claude Desktop에서 다음과 같이 물어보세요:

```
광명시 사회적경제 기업이 몇 개야?
```

정상 응답 예시:
```
현재 30개의 사회적경제 기업이 등록되어 있습니다.
(샘플 데이터 기준)
```

축하합니다! 🎉 설치가 완료되었습니다!

---

## ❓ 문제 해결

### "Cannot find module" 오류

```
Error: Cannot find module '.../dist/index.js'
```

**해결 방법:**
1. `npm run build`를 다시 실행
2. `dist` 폴더가 생성되었는지 확인
3. 설정 파일의 경로가 정확한지 확인

### "ENOENT" 오류

```
Error: ENOENT: no such file or directory
```

**해결 방법:**
1. 설정 파일의 경로에 오타가 없는지 확인
2. Windows는 `\\` (역슬래시 두 개), macOS는 `/`를 사용

### MCP 서버가 연결되지 않음

**확인할 것들:**
1. Node.js 버전이 18 이상인가?
2. `npm install`을 실행했나?
3. `npm run build`를 실행했나?
4. Claude Desktop을 완전히 재시작했나?
5. 설정 파일의 JSON 문법이 올바른가?

### JSON 문법 확인

JSON 파일은 다음 규칙을 따라야 합니다:
- 모든 문자열은 큰따옴표(`"`)로 감싸야 함
- 마지막 항목 뒤에는 쉼표가 없어야 함
- 중괄호(`{}`)와 대괄호(`[]`)가 쌍을 이루어야 함

**잘못된 예:**
```json
{
  "name": "test",  // ← 쉼표가 있으면 안 됨 (마지막 항목)
}
```

**올바른 예:**
```json
{
  "name": "test"
}
```

### 도움 요청

문제가 해결되지 않으면:
1. [GitHub Issues](https://github.com/durume/GM/issues)에 문제 등록
2. 오류 메시지 전체를 함께 올려주세요

---

## 📚 다음 단계

설치가 완료되었다면 [사용자 가이드](./USER_GUIDE.md)를 확인하세요!
