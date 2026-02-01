# 🚀 KPSY LAB Portal 배포 절차

**Vercel + Supabase 배포 가이드**

---

## ✅ 사전 준비 사항

### 1. Supabase 프로젝트 생성 (필수)

#### 1-1. Supabase 프로젝트 생성
1. [Supabase 대시보드](https://supabase.com/dashboard) 접속 및 로그인
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `kpsylab-portal`
   - **Database Password**: 강력한 비밀번호 설정 (복사해서 저장)
   - **Region**: 가장 가까운 지역 선택 (예: Northeast Asia (Seoul))
4. **Create new project** 클릭
5. 프로젝트 생성 완료까지 대기 (약 2분)

#### 1-2. Supabase 스키마 적용
1. Supabase 대시보드 → **SQL Editor** 메뉴
2. **New query** 클릭
3. `apps/portal/lib/db/supabase-schema.sql` 파일 내용 복사
4. SQL Editor에 붙여넣기
5. **Run** 버튼 클릭 (또는 `Ctrl+Enter`)
6. 성공 메시지 확인

#### 1-3. Supabase 연결 정보 확인
1. Supabase 대시보드 → **Settings** → **API**
2. 다음 정보 복사 (나중에 사용):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** 키 (표시되는 키)

---

### 2. GitHub 저장소 준비

#### 2-1. 현재 코드 커밋
```bash
cd C:\Projects\Pj-main
git add .
git commit -m "Supabase 마이그레이션 완료 - Vercel 배포 준비"
git push origin main
```

#### 2-2. GitHub 저장소 확인
- 저장소: `suchulkim21/mnps-test`
- 브랜치: `main`

---

## 📋 배포 단계

### Step 1: Vercel 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속 및 로그인
2. **Add New Project** 클릭
3. GitHub 저장소 선택: `suchulkim21/mnps-test`
4. 프로젝트 설정:
   - **Project Name**: `kpsylab-portal` (또는 원하는 이름)
  - **Root Directory**: `apps/portal` 선택 (중요!)
   - **Framework Preset**: Next.js (자동 감지)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
5. **Environment Variables** 섹션으로 이동 (아직 배포하지 않음)

---

### Step 2: 환경 변수 설정 (중요!)

Vercel 프로젝트 설정에서 다음 환경 변수를 추가:

#### 필수 환경 변수

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Supabase anon 키 |
| `SESSION_SECRET` | 랜덤 문자열 | 세션 암호화 키 (강력한 값 권장) |
| `NEXT_PUBLIC_BASE_URL` | `https://www.kpsylab.com` | 프로덕션 도메인 |
| `NODE_ENV` | `production` | 환경 변수 |

#### 환경 변수 추가 방법

1. 각 환경 변수를 **Production**, **Preview**, **Development**에 모두 추가
2. **Add** 버튼 클릭하여 하나씩 추가
3. 모든 변수 추가 후 확인

#### SESSION_SECRET 생성 방법

터미널에서 실행:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

또는 온라인 생성기: https://generate-secret.vercel.app/32

---

### Step 3: 프로젝트 배포

1. 모든 환경 변수 설정 확인
2. **Deploy** 버튼 클릭
3. 빌드 진행 상황 확인
4. 배포 완료까지 대기 (약 2-3분)

---

### Step 4: 도메인 설정

#### 4-1. Vercel 도메인 설정
1. Vercel 프로젝트 → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 도메인 입력: `www.kpsylab.com`
4. **Add** 클릭
5. DNS 설정 안내 확인

#### 4-2. DNS 설정 (도메인 관리자에서)
Vercel에서 제공하는 DNS 레코드를 도메인 관리자에 추가:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

또는

```
Type: A
Name: @
Value: 76.76.21.21
```

#### 4-3. SSL 인증서
- Vercel이 자동으로 SSL 인증서 발급
- 몇 분 내에 HTTPS 활성화

---

### Step 5: 마스터 계정 생성

배포 완료 후 마스터 계정 생성:

#### 방법 1: Supabase 대시보드에서 직접 생성
1. Supabase 대시보드 → **Table Editor** → **users**
2. **Insert row** 클릭
3. 다음 값 입력:
   - `username`: `alyce`
   - `email`: `alyce@kpsylab.com`
   - `password_hash`: (아래 스크립트로 생성)
   - `role`: `master`
4. **Save** 클릭

#### 방법 2: 로컬 스크립트 실행
```bash
cd apps/portal

# .env.local 파일 생성 (Supabase 정보 입력)
echo NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co > .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx... >> .env.local

# 마스터 계정 생성
node scripts/create-master-account.js
```

#### password_hash 생성 방법
```bash
node -e "const crypto=require('crypto');const salt=crypto.randomBytes(16).toString('hex');const hash=crypto.pbkdf2Sync('gksrnr21@!',salt,1000,64,'sha512').toString('hex');console.log(salt+':'+hash)"
```

---

### Step 6: 배포 확인

1. **메인 페이지 확인**
   - https://www.kpsylab.com 접속
   - 정상 로딩 확인

2. **블로그 페이지 확인**
   - https://www.kpsylab.com/blog 접속
   - 포스트 목록 확인

3. **로그인 테스트**
   - https://www.kpsylab.com/login 접속
   - 마스터 계정으로 로그인: `alyce` / `gksrnr21@!`

4. **관리자 대시보드 확인**
   - https://www.kpsylab.com/admin/dashboard 접속
   - 통계 데이터 확인

---

## 🔄 업데이트 배포 (향후)

코드 변경 후 재배포:

```bash
# 1. 변경사항 커밋
git add .
git commit -m "변경사항 설명"

# 2. GitHub에 푸시
git push origin main

# 3. Vercel이 자동으로 빌드 및 배포
#    대시보드에서 배포 상태 확인
```

---

## 🔧 문제 해결

### 빌드 실패

**문제**: `Error: Cannot find module '@supabase/supabase-js'`
- **해결**: `package.json`에 패키지가 추가되었는지 확인
- Root Directory가 `apps/portal`로 설정되었는지 확인

**문제**: `Error: NEXT_PUBLIC_SUPABASE_URL is not defined`
- **해결**: Vercel 환경 변수가 올바르게 설정되었는지 확인
- Production, Preview, Development 모두에 설정되어 있는지 확인

### 배포 후 500 에러

**문제**: Supabase 연결 실패
- **해결**: 
  1. 환경 변수 값 확인
  2. Supabase 프로젝트가 활성 상태인지 확인
  3. RLS 정책이 올바르게 설정되었는지 확인

### 도메인 연결 안 됨

**문제**: DNS 설정 후 접속 안 됨
- **해결**:
  1. DNS 전파 확인 (최대 24-48시간 소요)
  2. `nslookup www.kpsylab.com` 명령어로 확인
  3. Vercel Domains 설정에서 상태 확인

---

## 📊 배포 후 모니터링

1. **Vercel 대시보드**
   - 배포 상태 확인
   - 로그 확인
   - 성능 모니터링

2. **Supabase 대시보드**
   - 데이터베이스 사용량
   - API 요청 통계
   - 실시간 로그

3. **애플리케이션 모니터링**
   - https://www.kpsylab.com/admin/dashboard
   - 방문자 통계
   - 에러 로그

---

## ✅ 배포 체크리스트

배포 전 확인 사항:

- [ ] Supabase 프로젝트 생성 완료
- [ ] Supabase 스키마 적용 완료
- [ ] GitHub에 코드 푸시 완료
- [ ] Vercel 프로젝트 생성 완료
- [ ] Root Directory를 `apps/portal`로 설정
- [ ] 모든 환경 변수 설정 완료
- [ ] 도메인 설정 완료
- [ ] DNS 레코드 추가 완료
- [ ] SSL 인증서 활성화 확인
- [ ] 마스터 계정 생성 완료
- [ ] 메인 페이지 접속 확인
- [ ] 블로그 페이지 접속 확인
- [ ] 로그인 기능 확인
- [ ] 관리자 대시보드 확인

---

## 🎯 빠른 배포 명령어 요약

```bash
# 1. 코드 커밋 및 푸시
git add .
git commit -m "배포 준비 완료"
git push origin main

# 2. Vercel CLI로 배포 (선택사항)
cd apps/portal
npm install -g vercel
vercel --prod
```

---

**배포 완료 후**: https://www.kpsylab.com 에서 서비스 확인!

