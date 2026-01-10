# KPSY LAB Portal

**심리학 연구 및 테스트 플랫폼**

KPSY LAB Portal은 Dark Tetrad (MNPS) 심리 테스트, Second Genesis 프로젝트, 그리고 심리학 관련 블로그를 제공하는 포털 서비스입니다.

---

## 🚀 기술 스택

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 📋 주요 기능

- 🔐 사용자 인증 시스템 (회원가입/로그인)
- 📝 블로그 포스트 시스템
- 🧪 MNPS (Dark Tetrad) 심리 테스트
- 🎯 Second Genesis 프로젝트 모듈
- 📊 분석 대시보드 (마스터 계정)
- 🔍 포털 서비스 (메인 페이지)

---

## 🛠️ 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 기타 설정
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:7777
SESSION_SECRET=your-session-secret-here
```

### 3. Supabase 스키마 설정

1. Supabase 프로젝트 생성
2. `lib/db/supabase-schema.sql` 파일의 내용을 SQL Editor에서 실행
3. 모든 테이블 생성 확인

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:7777](http://localhost:7777) 접속

---

## 📦 빌드 및 배포

### 로컬 빌드

```bash
npm run build
npm start
```

### Vercel 배포

1. GitHub 저장소에 코드 푸시
2. Vercel 대시보드에서 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SESSION_SECRET`
   - 기타 필요한 환경 변수

자동 배포: `git push origin main` → Vercel이 자동 빌드/배포

---

## 📚 문서

- [Supabase 마이그레이션 가이드](./SUPABASE_MIGRATION_GUIDE.md) - SQLite에서 Supabase로 마이그레이션
- [Vercel 배포 가이드](../VERCEL_DEPLOYMENT_GUIDE.md) - 프로덕션 배포 가이드
- [관리자 가이드](./admin/ADMIN_GUIDE.md) - 관리자 기능 사용법

---

## 🔧 주요 스크립트

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start

# 테스트
npm test

# E2E 테스트
npm run test:e2e

# 이미지 최적화
npm run optimize:images
```

---

## 📁 프로젝트 구조

```
portal/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── admin/             # 관리자 대시보드
│   ├── blog/              # 블로그
│   └── second-genesis/    # Second Genesis 프로젝트
├── lib/                   # 유틸리티 및 라이브러리
│   └── db/                # 데이터베이스 연결 (Supabase)
├── components/            # React 컴포넌트
├── public/                # 정적 파일
└── scripts/               # 유틸리티 스크립트
```

---

## 🔐 마스터 계정 생성

마스터 계정은 웹 인터페이스에서 생성하거나, Supabase 대시보드에서 직접 생성할 수 있습니다.

마스터 계정 권한:
- 분석 대시보드 접근
- 전체 서비스 통계 확인
- 시스템 관리 기능

---

## 🐛 문제 해결

### 빌드 오류
- `.next` 폴더 삭제 후 다시 빌드
- `node_modules` 삭제 후 `npm install` 재실행

### Supabase 연결 오류
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

---

## 📝 라이선스

Private Project - KPSY LAB

---

## 👥 개발팀

KPSY LAB Team
