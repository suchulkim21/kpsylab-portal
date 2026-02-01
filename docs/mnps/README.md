# MNPS 프로젝트 (Dark Tetrad Analysis Platform)

## 📋 프로젝트 개요

MNPS는 Dark Tetrad(마키아벨리즘, 나르시시즘, 사이코패시, 사디즘) 심리 분석 플랫폼입니다.

### 프로젝트 구조

```
mnps/
├── _LEGACY/              # 레거시 프로젝트 (Node.js/Express)
│   └── _DEVELOPMENT/     # 개발 문서 및 스크립트
├── dark-nature-web/      # Next.js 기반 웹 애플리케이션
├── src/                  # 현재 활성 프로젝트 (Next.js)
└── models/               # 모델 및 엔진 코드
```

## 🚀 빠른 시작

### 현재 활성 프로젝트 (Next.js)

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

접속: `http://localhost:3000`

### 레거시 프로젝트 (_LEGACY)

```bash
cd _LEGACY
npm install
npm start
```

접속: `http://localhost:3000`

## 📚 문서 가이드

### 핵심 문서

#### 프로젝트 계획 및 전략
- **[개발 계획서](_LEGACY/_DEVELOPMENT/개발계획서.md)** - 전체 프로젝트 통합 개발 계획서
- **[구현 계획](_LEGACY/_DEVELOPMENT/implementation_plan.md)** - 구체적인 구현 계획 및 변경 사항

#### 시스템 아키텍처
- **[아키텍처 문서](_LEGACY/_DEVELOPMENT/docs/ARCHITECTURE.md)** - 시스템 설계 및 기술 스택
- **[콘텐츠 전략](_LEGACY/_DEVELOPMENT/docs/CONTENT_STRATEGY.md)** - 콘텐츠 및 수익화 전략
- **[개발 프로토콜](_LEGACY/_DEVELOPMENT/docs/DEVELOPMENT_PROTOCOL.md)** - 개발 시 준수할 규칙

#### 운영 및 거버넌스
- **[배포 가이드](_LEGACY/_DEVELOPMENT/DEPLOYMENT.md)** - 배포 및 환경 설정 가이드
- **[메인 페이지 거버넌스](_LEGACY/_DEVELOPMENT/MAIN_PAGE_GOVERNANCE.md)** - 메인 페이지 수정 규칙
- **[프로젝트 개요](_LEGACY/_DEVELOPMENT/walkthrough.md)** - 프로젝트 기능 및 플로우 설명

#### 개발 진행 상황
- **[작업 체크리스트](_LEGACY/_DEVELOPMENT/task.md)** - 개발 단계별 체크리스트

### Next.js 프로젝트 문서
- **[dark-nature-web README](dark-nature-web/README.md)** - Next.js 프로젝트 시작 가이드
- **[안정화 시스템](dark-nature-web/stabilization_systems/README.md)** - 안정화 스크립트 및 유틸리티

## 🛠️ 기술 스택

### 현재 활성 프로젝트
- **Framework**: Next.js 16
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS
- **Charts**: Recharts
- **Animation**: Framer Motion

### 레거시 프로젝트
- **Backend**: Node.js (Express)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Database**: SQLite / MySQL
- **Process Manager**: PM2

## 📁 주요 디렉토리

- `_LEGACY/_DEVELOPMENT/` - 레거시 프로젝트 개발 문서 및 스크립트
- `dark-nature-web/` - Next.js 기반 웹 애플리케이션
- `src/app/` - 현재 활성 Next.js 앱 소스 코드
- `models/` - 비즈니스 로직 및 엔진 코드

## 🔒 라이선스

Proprietary Software. All rights reserved.

---

**마지막 업데이트**: 2024

