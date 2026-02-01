# MNPS 레거시 프로젝트 개발 문서

이 폴더는 MNPS 레거시 프로젝트(Node.js/Express 기반)의 개발 문서 및 스크립트를 포함합니다.

## 📚 문서 구조

### 핵심 계획 문서
- **[개발 계획서](개발계획서.md)** - 전체 프로젝트 통합 개발 계획서 (서비스 목적, 수익화 전략, 시스템 아키텍처)
- **[구현 계획](implementation_plan.md)** - 구체적인 구현 계획 및 변경 사항

### 시스템 문서 (`docs/` 폴더)
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - 시스템 설계 및 기술 스택
- **[CONTENT_STRATEGY.md](docs/CONTENT_STRATEGY.md)** - 콘텐츠 및 수익화 전략
- **[DEVELOPMENT_PROTOCOL.md](docs/DEVELOPMENT_PROTOCOL.md)** - 개발 시 준수할 규칙 (Strict Mode)

### 운영 문서
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - 배포 및 환경 설정 가이드
- **[MAIN_PAGE_GOVERNANCE.md](MAIN_PAGE_GOVERNANCE.md)** - 메인 페이지 수정 규칙 및 무결성 검증
- **[walkthrough.md](walkthrough.md)** - 프로젝트 기능 및 플로우 설명

### 진행 상황
- **[task.md](task.md)** - 개발 단계별 체크리스트

## 🚀 빠른 시작

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
# 또는
node server.js

# PM2로 프로덕션 실행
pm2 start ecosystem.config.js --env production
```

접속: `http://localhost:3000`

## 📁 주요 디렉토리

- `pages/` - HTML 페이지 파일들
- `modules/` - 비즈니스 로직 모듈
  - `engine/` - 검사 엔진
  - `data_layer/` - 데이터 저장/조회
  - `text/` - 콘텐츠 데이터
- `assets/` - 정적 리소스 (CSS, JS, 이미지)
- `routes/` - Express 라우트 핸들러
- `scripts/` - 유틸리티 스크립트

## 🔧 유틸리티 스크립트

- `scripts/integrity_check.js` - 파일 무결성 검증
- `scripts/validate_integrity.js` - 무결성 검증 (간소화 버전)
- `test_suite.js` - API 및 플로우 테스트
- `create_admin.js` - 관리자 계정 생성

## 📝 개발 프로토콜

모든 코드 수정 시 다음 프로토콜을 준수해야 합니다:

1. **계획 단계**: `implementation_plan.md` 작성
2. **실행 단계**: 최소한의 변경만 수행
3. **검증 단계**: `integrity_check.js` 실행 필수
4. **중단 규칙**: 검증 실패 시 즉시 중단 및 복구

자세한 내용은 [DEVELOPMENT_PROTOCOL.md](docs/DEVELOPMENT_PROTOCOL.md)를 참조하세요.

## 🔒 라이선스

Proprietary Software. All rights reserved.
