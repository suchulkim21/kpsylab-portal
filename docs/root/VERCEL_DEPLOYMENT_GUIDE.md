# 🚀 Vercel 배포 가이드

**프로젝트**: KPSY LAB Portal  
**배포 플랫폼**: Vercel (Serverless)  
**도메인**: www.kpsylab.com  
**GitHub 저장소**: suchulkim21/mnps-test

---

## ✅ 배포 준비 완료 상태

- [x] 빌드 성공 (31개 페이지 생성)
- [x] 모든 타입 에러 수정
- [x] `.next` 폴더 생성 확인

---

## 🔧 Vercel 배포 절차

### 1. GitHub 푸시

```bash
# 변경사항 커밋
git add .
git commit -m "Production build: 빌드 에러 수정 및 배포 준비"

# GitHub에 푸시 (자동 배포 트리거)
git push origin main
```

### 2. Vercel 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

#### 필수 환경 변수

```env
# Node 환경
NODE_ENV=production

# 포트 (Vercel은 자동 할당, 필요시 설정)
PORT=7777

# 세션 시크릿 (강력한 랜덤 문자열)
SESSION_SECRET=your_very_strong_random_secret_key_here

# 도메인 설정
NEXT_PUBLIC_BASE_URL=https://www.kpsylab.com

# 데이터베이스 경로 (SQLite는 Vercel에서 파일 시스템 제약이 있음)
# 주의: Vercel은 Serverless 환경이므로 SQLite 사용 시 제약이 있습니다
# 가능하면 Supabase나 다른 클라우드 DB 사용 권장
```

#### Supabase 사용 시 (dark-nature-web 프로젝트)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 환경 변수 설정 방법

1. Vercel 대시보드 접속: https://vercel.com/dashboard
2. 프로젝트 선택 (mnps-test)
3. Settings → Environment Variables
4. 위 환경 변수들을 Production, Preview, Development 환경에 추가

---

## ⚠️ 중요한 주의사항

### 1. SQLite와 Vercel의 호환성 문제

**현재 `apps/portal` 프로젝트는 SQLite를 사용하고 있으나, Vercel은 Serverless 환경입니다:**

- ❌ Vercel은 파일 시스템이 읽기 전용입니다
- ❌ SQLite 파일 쓰기가 불가능합니다
- ✅ **해결 방법**: 
  - Supabase로 마이그레이션 (권장)
  - 또는 외부 DB 서비스 사용 (PlanetScale, Neon 등)
  - 또는 VPS 서버로 배포 (PM2 사용)

### 2. 데이터베이스 마이그레이션 옵션

#### 옵션 A: Supabase로 마이그레이션 (권장)

```typescript
// lib/db/supabase.ts 생성 필요
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 옵션 B: PlanetScale (MySQL) 사용

```typescript
// lib/db/planetscale.ts
import { Client } from '@planetscale/database'

const client = new Client({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
})
```

#### 옵션 C: VPS 서버로 배포 (SQLite 유지)

- DigitalOcean, AWS EC2 등 사용
- PM2로 서버 실행
- SQLite 사용 가능

---

## 🔍 Vercel 배포 확인

### 자동 배포 확인

1. GitHub에 푸시하면 Vercel이 자동으로 감지
2. Vercel 대시보드에서 빌드 로그 확인
3. 배포 완료 후 도메인 접속 확인

### 수동 배포 (필요시)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
cd apps/portal
vercel --prod
```

---

## 📋 배포 후 확인 사항

- [ ] 메인 페이지 접속 확인 (https://www.kpsylab.com)
- [ ] 블로그 페이지 확인
- [ ] 로그인/회원가입 기능 확인
- [ ] API 엔드포인트 확인 (/api/docs)
- [ ] 이미지 로딩 확인

---

## 🔄 배포 롤백

Vercel에서 롤백:
1. Vercel 대시보드 → Deployments
2. 이전 배포 버전 선택
3. "Promote to Production" 클릭

---

## 🎯 다음 단계

현재 `portal` 프로젝트가 SQLite를 사용 중이므로, **Vercel 배포 전에 다음 중 선택해야 합니다:**

1. **Supabase로 마이그레이션** (Vercel 배포 가능)
2. **VPS 서버로 배포** (SQLite 유지 가능)
3. **PlanetScale/Neon 등 클라우드 DB 사용**

어떤 방법으로 진행할까요?

