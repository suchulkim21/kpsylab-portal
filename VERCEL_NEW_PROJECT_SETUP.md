# 🆕 Vercel 새 프로젝트 설정 가이드

기존 프로젝트를 새 프로젝트로 교체하는 방법입니다.

---

## 📋 옵션 1: 새 프로젝트 생성 (권장)

### Step 1: Vercel에서 새 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **Add New Project** 클릭
3. GitHub 저장소 선택: `suchulkim21/mnps-test`
4. 프로젝트 설정:
   - **Project Name**: `kpsylab-portal` (또는 원하는 이름)
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `portal` ← **중요!**
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

### Step 2: 환경 변수 설정

**배포 전에 환경 변수를 먼저 설정하세요!**

1. **Environment Variables** 섹션으로 이동
2. 다음 변수들 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SESSION_SECRET=your-random-secret-key
NEXT_PUBLIC_BASE_URL=https://www.kpsylab.com
NODE_ENV=production
```

3. 각 변수를 **Production**, **Preview**, **Development** 모두에 추가

### Step 3: 프로젝트 배포

1. 모든 설정 확인
2. **Deploy** 버튼 클릭
3. 배포 완료까지 대기

### Step 4: 도메인 연결

1. 프로젝트 → **Settings** → **Domains**
2. `www.kpsylab.com` 추가
3. DNS 설정 안내 따르기

---

## 🔄 옵션 2: 기존 프로젝트 설정 변경

기존 프로젝트를 그대로 사용하되 설정만 변경:

### Step 1: 기존 프로젝트 선택

1. Vercel 대시보드에서 프로젝트 선택
   - `kpsylab.com` 도메인이 연결된 프로젝트 사용 권장

### Step 2: 프로젝트 설정 초기화

1. **Settings** → **General**
2. **Root Directory** 확인/변경: `portal`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Step 3: 환경 변수 초기화

1. **Settings** → **Environment Variables**
2. 기존 변수 삭제 (필요시)
3. 새 변수 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SESSION_SECRET
   NEXT_PUBLIC_BASE_URL
   NODE_ENV
   ```

### Step 4: 재배포

1. **Deployments** 탭
2. 최신 배포 선택
3. **...** 메뉴 → **Redeploy**

---

## 🗑️ 옵션 3: 기존 프로젝트 삭제 후 새로 생성

### Step 1: 기존 프로젝트 삭제

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → 맨 아래로 스크롤
3. **Delete Project** 클릭
4. 확인

### Step 2: 새 프로젝트 생성

위의 **옵션 1** 참조

---

## ⚠️ 주의사항

### 도메인 연결 시

- 기존 프로젝트를 삭제하면 도메인이 해제됩니다
- 새 프로젝트에서 다시 도메인을 연결해야 합니다
- DNS 설정이 필요할 수 있습니다

### 환경 변수

- **반드시** 배포 전에 환경 변수를 설정하세요
- Supabase 키가 없으면 애플리케이션이 작동하지 않습니다

### GitHub 연동

- 같은 저장소(`suchulkim21/mnps-test`)를 사용하면 됩니다
- Root Directory만 `portal`로 설정하면 됩니다

---

## 🎯 권장 방법

**옵션 1 (새 프로젝트 생성)**을 권장합니다:

✅ 기존 프로젝트는 그대로 유지 (백업용)
✅ 새 프로젝트로 깔끔하게 시작
✅ 문제 발생 시 기존 프로젝트로 롤백 가능

---

## 📝 체크리스트

새 프로젝트 생성 시:

- [ ] Vercel 대시보드에서 "Add New Project" 클릭
- [ ] GitHub 저장소 선택 (`suchulkim21/mnps-test`)
- [ ] Root Directory를 `portal`로 설정
- [ ] 환경 변수 모두 추가 (배포 전!)
- [ ] Deploy 클릭
- [ ] 도메인 연결 (`www.kpsylab.com`)
- [ ] 배포 완료 확인
- [ ] 브라우저에서 접속 테스트

---

## 🔧 문제 해결

### 빌드 실패 시

1. **Build Logs** 확인
2. Root Directory가 `portal`로 설정되었는지 확인
3. 환경 변수가 올바른지 확인
4. 로컬에서 `npm run build` 테스트

### 환경 변수 오류

- Supabase 키가 올바른지 확인
- Production, Preview, Development 모두에 설정되어 있는지 확인

---

**어떤 방법으로 진행하시겠습니까?** 

옵션 1 (새 프로젝트 생성)을 권장합니다! 🚀

