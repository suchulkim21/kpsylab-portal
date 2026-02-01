# 🚀 Vercel 프로젝트 설정 가이드

현재 Vercel에 두 개의 프로젝트가 있는 것으로 확인됩니다:

1. **mnps-test** → `mnps-test.vercel.app`
2. **mnps-test-3aj4** → `kpsylab.com` ⚠️ (경고 아이콘)

---

## 📋 프로젝트 확인 및 설정

### 현재 프로젝트 상태

**두 프로젝트 모두 같은 GitHub 저장소를 사용 중**:
- 저장소: `suchulkim21/mnps-test`

---

## ✅ 권장 설정

### 프로덕션 프로젝트 설정

`kpsylab.com` 도메인이 연결된 프로젝트를 메인으로 사용:

#### 1. 프로젝트 설정 확인

**Vercel 대시보드**에서 `mnps-test-3aj4` (또는 `kpsylab.com`) 프로젝트 클릭:

1. **Settings** → **General**
   - **Root Directory**: `apps/portal` 설정 확인 ✅
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

2. **Settings** → **Environment Variables**
   - 다음 환경 변수들이 모두 설정되어 있는지 확인:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SESSION_SECRET`
     - `NEXT_PUBLIC_BASE_URL` = `https://www.kpsylab.com`
     - `NODE_ENV` = `production`

3. **Settings** → **Domains**
   - `kpsylab.com` 확인
   - `www.kpsylab.com` 추가 (권장)

#### 2. 경고 아이콘 확인

경고 아이콘(⚠️)이 있다면:

1. **Deployments** 탭에서 최근 배포 확인
2. 실패한 배포가 있다면 로그 확인
3. **Settings** → **General**에서 빌드 오류 확인

---

## 🔧 문제 해결

### 빌드 실패 시

#### 1. 로컬에서 빌드 테스트

```bash
cd apps/portal
npm install
npm run build
```

#### 2. 빌드 오류 확인

- TypeScript 오류
- 환경 변수 누락
- 의존성 문제

#### 3. 환경 변수 확인

Vercel 대시보드에서:
- Settings → Environment Variables
- Production, Preview, Development 모두에 설정되어 있는지 확인

---

## 📁 Root Directory 설정 (중요!)

### 현재 프로젝트 구조

```
suchulkim21/mnps-test (GitHub)
├── apps/portal/     ← Next.js 프로젝트
├── apps/mnps/
├── apps/second-genesis/
└── ...
```

### Vercel 설정

**Root Directory를 `apps/portal`로 설정**해야 합니다:

1. Vercel 프로젝트 → Settings → General
2. **Root Directory** 섹션 찾기
3. `apps/portal` 입력
4. **Save** 클릭
5. 재배포 (자동 또는 수동)

---

## 🎯 권장 작업 순서

### Step 1: 프로덕션 프로젝트 확인

1. `kpsylab.com` 도메인이 연결된 프로젝트 클릭
2. Settings → General에서 Root Directory 확인
3. Settings → Environment Variables 확인
4. Deployments에서 최근 배포 상태 확인

### Step 2: 경고 해결

1. 경고 아이콘 클릭하여 상세 정보 확인
2. 배포 로그 확인
3. 문제 해결 후 재배포

### Step 3: 불필요한 프로젝트 정리 (선택사항)

- `mnps-test` 프로젝트는 개발/테스트용으로 유지하거나
- 삭제 후 하나의 프로젝트만 사용

---

## 🔄 새 배포 트리거

### 방법 1: GitHub 푸시 (자동)

```bash
git add .
git commit -m "Update project"
git push origin main
```

### 방법 2: Vercel에서 수동 재배포

1. 프로젝트 → Deployments
2. 최신 배포 선택
3. ... 메뉴 → Redeploy

---

## ✅ 체크리스트

- [ ] Root Directory가 `apps/portal`로 설정되어 있는가?
- [ ] 모든 환경 변수가 설정되어 있는가?
- [ ] 도메인이 올바르게 연결되어 있는가?
- [ ] 최근 배포가 성공했는가?
- [ ] 빌드 로그에 오류가 없는가?
- [ ] `www.kpsylab.com`도 연결되어 있는가?

---

## 🆘 문제 해결

### 경고 아이콘이 계속 나타나면

1. **배포 로그 확인**
   - Deployments → 실패한 배포 클릭 → Build Logs

2. **환경 변수 확인**
   - Settings → Environment Variables
   - 모든 변수가 올바른지 확인

3. **Root Directory 확인**
   - Settings → General
   - `apps/portal`로 설정되어 있는지 확인

4. **로컬 빌드 테스트**
   ```bash
   cd apps/portal
   npm run build
   ```

---

**프로젝트 설정을 확인하시고, 문제가 있으면 알려주세요!**

