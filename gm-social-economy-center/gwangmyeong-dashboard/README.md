# 광명시 사회적경제 대시보드

광명시사회적경제센터의 171개 사회적경제 기업 데이터를 시각화하는 대시보드입니다.

## 주요 기능

### 통계 대시보드
- 전체 기업 수, 유형 수, 지역 수 등 주요 통계 카드
- 유형별/지역별 분포 파이 차트
- 연도별 성장 추이 차트 (필터 연동)

### 필터링 기능
- **유형별 필터**: 사회적기업, (예비)사회적기업, 마을기업, 사회적협동조합, 협동조합
- **지역별 필터**: 소하동, 일직동, 광명동, 철산동, 하안동, 노온사동, 가학동, 옥길동
- **검색**: 기업명, 사업내용, 주소로 검색

### 기업 목록
- 페이지네이션 (10개씩)
- 기업 상세 정보 모달

## 기술 스택

- **React 18** - UI 프레임워크
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Recharts** - 차트 라이브러리
- **Lucide React** - 아이콘

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
gwangmyeong-dashboard/
├── public/data/
│   └── enterprises.json      # 171개 기업 데이터
├── src/
│   ├── components/
│   │   ├── TypeFilterButtons.jsx  # 유형별 필터 버튼
│   │   ├── GrowthChart.jsx        # 성장 추이 차트
│   │   ├── PieChartPanel.jsx      # 파이 차트
│   │   ├── EnterpriseList.jsx     # 기업 목록
│   │   ├── EnterpriseModal.jsx    # 기업 상세 모달
│   │   ├── Pagination.jsx         # 페이지네이션
│   │   └── StatCard.jsx           # 통계 카드
│   ├── constants/index.js    # 색상, 아이콘, 설정
│   ├── hooks/useEnterprises.js # 데이터 fetching 훅
│   ├── App.jsx               # 메인 컴포넌트
│   ├── main.jsx              # 엔트리 포인트
│   └── index.css             # 글로벌 스타일
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 데이터 구조

### enterprises.json

```json
{
  "metadata": {
    "source": "광명시사회적경제센터",
    "sourceUrl": "https://gmsocial.or.kr/map",
    "lastUpdated": "2025-11-27",
    "totalEnterprises": 171,
    "regions": ["소하동", "일직동", ...],
    "enterpriseTypes": ["사회적기업", "(예비)사회적기업", ...],
    "centerContact": {
      "phone": "02-2680-6729",
      "address": "경기도 광명시 오리로 362 광명시사회적경제센터 3층",
      "email": "pjy3869@korea.kr"
    }
  },
  "enterprises": [
    {
      "id": 1,
      "name": "기업명",
      "type": "사회적기업",
      "phone": "02-xxxx-xxxx",
      "product": "주요 사업/제품",
      "address": "주소",
      "region": "소하동",
      "website": "https://..." // optional
    }
  ]
}
```

## 기업 유형별 색상

| 유형 | 색상 |
|------|------|
| 사회적기업 | 파랑 (#3B82F6) |
| (예비)사회적기업 | 보라 (#8B5CF6) |
| 마을기업 | 초록 (#10B981) |
| 사회적협동조합 | 주황 (#F59E0B) |
| 협동조합 | 빨강 (#EF4444) |

## 라이선스

MIT License

## 데이터 출처

- [광명시사회적경제센터](https://gmsocial.or.kr/map)
