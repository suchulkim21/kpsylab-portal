# KPSY LAB - 심리 분석 서비스 통합 플랫폼

## 📋 개요

KPSY LAB (www.kpsylab.com)은 MNPS와 Second Genesis를 통합하여 제공하는 심리 분석 서비스 플랫폼입니다.

## 🚀 빠른 시작

### 개발 서버 실행

```bash
cd apps/portal
npm install
npm run dev
```

접속: `http://localhost:7777` (개발) 또는 `https://www.kpsylab.com` (프로덕션)

## 📁 프로젝트 구조

```
apps/portal/
├── app/
│   ├── page.tsx              # 메인 포털 페이지
│   ├── mnps/                 # MNPS 서비스 통합
│   └── second-genesis/       # Second Genesis 서비스 통합
├── components/
│   └── Navigation.tsx        # 공통 네비게이션
└── contexts/
    └── AuthContext.tsx       # 공통 인증 컨텍스트
```

## 🔗 통합 서비스

### 1. MNPS (Dark Tetrad Analysis)
- **경로**: `/mnps`
- **설명**: 어둠의 4요소(Dark Tetrad) 심리 분석
- **상태**: 개발/개선 중

### 2. Second Genesis (Strategic Pivot)
- **경로**: `/second-genesis`
- **설명**: 전략적 방향 전환 도구
- **상태**: 완료 (100%)

### 3. 기타 서비스
- **블로그**: `/blog`
- **게시판**: `/board`
- **문의**: `/contact`

## 📚 관련 문서

- [프로젝트 통합 전략](./PROJECT_INTEGRATION_STRATEGY.md)
- [MNPS 전략 분석](../mnps/PROJECT_STRATEGIC_ANALYSIS.md)
- [Second Genesis 상태](../second-genesis/STATUS_REPORT.md)

## 🔧 기술 스택

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## 📝 개발 가이드

### 새 서비스 추가
1. `app/` 디렉토리에 새 서비스 폴더 생성
2. `app/page.tsx`에 서비스 카드 추가
3. 공통 컴포넌트 및 스타일 가이드 준수

### 공통 컴포넌트
- `Navigation.tsx`: 전역 네비게이션
- `AuthContext.tsx`: 사용자 인증 관리

## 🚀 배포

### 프로덕션 빌드
```bash
npm run build
npm start
```

### Vercel 배포
```bash
vercel deploy
```

---

**KPSY LAB은 심리 분석 서비스의 통합 플랫폼입니다.** 🚀

**도메인**: www.kpsylab.com

