# 🚀 Vercel 프로젝트 생성 가이드

**KPSY LAB Portal - Vercel 새 프로젝트 생성**

GitHub에 코드가 푸시되었으니, 이제 Vercel에서 프로젝트를 생성하고 배포하세요!

---

## ✅ 사전 확인

- [x] GitHub 푸시 완료: `https://github.com/suchulkim21/kpsylab-portal.git`
- [ ] Supabase API 키 준비됨 (필수)
- [ ] Vercel 계정 로그인됨

---

## 📋 단계별 가이드

### Step 1: Vercel 대시보드 접속

1. [https://vercel.com/dashboard](https://vercel.com/dashboard) 접속
2. GitHub 계정으로 로그인 (또는 이메일/비밀번호)
3. 대시보드에서 **Add New Project** 버튼 클릭

---

### Step 2: GitHub 저장소 선택

1. **Import Git Repository** 화면에서 GitHub 저장소 목록 확인
2. `suchulkim21/kpsylab-portal` 저장소 찾기
3. 저장소 옆의 **Import** 버튼 클릭

**참고**: 저장소가 보이지 않으면:
- **Configure GitHub App** 클릭하여 권한 확인
- 저장소에 대한 접근 권한이 있는지 확인

---

### Step 3: 프로젝트 설정

프로젝트 설정 화면에서 다음 정보를 확인/수정:

#### 3-1. 기본 설정

- **Project Name**: `kpsylab-portal` (또는 원하는 이름)
  - 기본값으로 GitHub 저장소 이름이 들어갑니다
  - 원하는 이름으로 변경 가능

- **Framework Preset**: `Next.js` (자동 감지됨)
  - Next.js 프로젝트로 자동 인식됩니다

#### 3-2. Root Directory 설정 (중요!)

**⚠️ 중요**: 프로젝트가 루트에 직접 있는 경우:
- Root Directory는 **비워두거나** `./` (기본값)로 설정
- **설정하지 않아도 됩니다**

**만약 프로젝트가 `portal` 폴더 안에 있다면:**
- **Root Directory**: `portal` 입력
- **Configure** 버튼 클릭하여 설정 저장

#### 3-3. Build Settings

- **Build Command**: `npm run build` (기본값, 변경 불필요)
- **Output Directory**: `.next` (기본값, 변경 불필요)
- **Install Command**: `npm install` (기본값, 변경 불필요)

---

### Step 4: 환경 변수 설정 (배포 전 필수!)

**⚠️ 중요**: 환경 변수를 먼저 설정한 후 배포하세요!

#### 4-1. 환경 변수 섹션으로 이동

프로젝트 설정 화면에서 **Environment Variables** 섹션 찾기

#### 4-2. 필수 환경 변수 추가

다음 변수들을 **Production**, **Preview**, **Development** 모두에 추가하세요:

| 변수명 | 설명 | 예시 값 |
|--------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 키 | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SESSION_SECRET` | 세션 암호화 키 (32자 이상) | 랜덤 문자열 생성 |
| `NEXT_PUBLIC_BASE_URL` | 프로덕션 도메인 | `https://kpsylab-portal.vercel.app` (초기) |
| `NODE_ENV` | 환경 변수 (선택) | `production` |

**추가 방법:**
1. 각 변수명 입력 (예: `NEXT_PUBLIC_SUPABASE_URL`)
2. 값 입력 (예: `https://xxxxx.supabase.co`)
3. **Environment** 선택:
   - ☑ Production
   - ☑ Preview
   - ☑ Development
4. **Add** 버튼 클릭
5. 다음 변수 추가 반복

#### 4-3. Supabase API 키 확인 방법

Supabase 키가 없다면:

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** (⚙️) → **API** 메뉴 클릭
4. 다음 정보 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` 값
   - **anon public** 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY` 값

**상세 가이드**: `GET_SUPABASE_API_KEYS.md` 파일 참조

#### 4-4. SESSION_SECRET 생성 방법

터미널에서 다음 명령어 실행:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

생성된 문자열을 복사하여 `SESSION_SECRET` 값으로 사용

**또는** 온라인 생성기: https://generate-secret.vercel.app/32

---

### Step 5: 프로젝트 배포

#### 5-1. 설정 확인

배포하기 전에 다음 사항 확인:
- ✅ 모든 환경 변수가 추가되었는가?
- ✅ Production, Preview, Development 모두에 설정되었는가?
- ✅ Supabase 키가 올바른가?

#### 5-2. 배포 실행

1. 모든 설정 확인 완료 후
2. 화면 하단의 **Deploy** 버튼 클릭
3. 배포 진행 상황 확인

#### 5-3. 배포 완료 대기

- 빌드 시간: 약 2-3분
- 진행 상황은 실시간으로 확인 가능
- 빌드 로그에서 오류 확인

---

### Step 6: 배포 확인

#### 6-1. 배포 성공 확인

배포가 완료되면:
- ✅ **Congratulations!** 메시지 확인
- 배포된 URL 확인: `https://kpsylab-portal-xxxxx.vercel.app`

#### 6-2. 사이트 접속 테스트

1. 배포된 URL 클릭하여 접속
2. 메인 페이지가 정상적으로 로드되는지 확인
3. 콘솔에서 오류 확인 (F12 → Console)

#### 6-3. 문제가 있다면

- **Build Logs** 확인: Deployments → 최신 배포 → Build Logs
- **Environment Variables** 재확인
- **Function Logs** 확인 (런타임 오류)

---

## ⚠️ 주의사항

### 1. Root Directory

프로젝트 구조에 따라 설정:
- **루트에 직접 있는 경우**: 설정 불필요 (기본값)
- **서브폴더에 있는 경우**: 폴더명 입력 (예: `portal`)

### 2. 환경 변수

- **반드시 배포 전에 설정**하세요!
- Supabase 키가 없으면 애플리케이션이 작동하지 않습니다
- Production, Preview, Development 모두에 설정하는 것을 권장합니다

### 3. 첫 배포

- 첫 배포는 수동으로 진행합니다
- 이후 GitHub에 푸시하면 **자동으로 재배포**됩니다

---

## 🔄 다음 단계 (배포 후)

### 1. 커스텀 도메인 연결 (선택)

1. Vercel 프로젝트 → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 도메인 입력 (예: `www.kpsylab.com`)
4. DNS 설정 안내 따르기

### 2. GitHub 자동 배포 확인

코드를 변경하고 GitHub에 푸시하면:
```powershell
git add .
git commit -m "Update project"
git push origin main
```

Vercel이 자동으로 감지하여 재배포합니다!

### 3. 환경 변수 업데이트

도메인 연결 후 `NEXT_PUBLIC_BASE_URL` 업데이트:
- Vercel 프로젝트 → Settings → Environment Variables
- `NEXT_PUBLIC_BASE_URL` 값 수정
- 재배포 (자동 또는 수동)

---

## 📋 체크리스트

프로젝트 생성 시:

- [ ] Vercel 대시보드에서 "Add New Project" 클릭
- [ ] GitHub 저장소 `suchulkim21/kpsylab-portal` 선택
- [ ] 프로젝트 이름 확인/설정
- [ ] Root Directory 확인 (필요시 설정)
- [ ] **모든 환경 변수 추가** (배포 전!)
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SESSION_SECRET`
  - [ ] `NEXT_PUBLIC_BASE_URL`
  - [ ] `NODE_ENV` (선택)
- [ ] Production, Preview, Development 모두에 설정 확인
- [ ] Deploy 버튼 클릭
- [ ] 배포 완료 대기 (2-3분)
- [ ] 배포된 URL 접속 테스트
- [ ] 사이트 정상 동작 확인

---

## 🔧 문제 해결

### 빌드 실패 시

**오류**: `Error: Cannot find module`
- **해결**: Root Directory가 올바르게 설정되었는지 확인
- `package.json`이 올바른 위치에 있는지 확인

**오류**: `Error: NEXT_PUBLIC_SUPABASE_URL is not defined`
- **해결**: 환경 변수가 올바르게 설정되었는지 확인
- Production, Preview, Development 모두에 설정 확인

**오류**: `Error: Failed to fetch`
- **해결**: Supabase URL과 키가 올바른지 확인
- Supabase 프로젝트가 활성 상태인지 확인

### 배포 후 500 에러

**문제**: Supabase 연결 실패
- **해결**: 
  1. 환경 변수 값 확인
  2. Supabase 프로젝트 상태 확인
  3. Function Logs에서 상세 오류 확인

### 저장소를 찾을 수 없음

**문제**: GitHub 저장소가 목록에 나타나지 않음
- **해결**:
  1. **Configure GitHub App** 클릭
  2. 저장소 접근 권한 확인
  3. 저장소를 Private으로 설정했다면 권한 필요

---

## 📚 관련 문서

- [배포 체크리스트](./DEPLOY_CHECKLIST.md) - 배포 전 확인사항
- [Supabase API 키 확인](./GET_SUPABASE_API_KEYS.md) - Supabase 키 확인 방법
- [배포 단계](./DEPLOYMENT_STEPS.md) - 상세 배포 가이드

---

**준비되셨으면 Vercel 대시보드에서 프로젝트를 생성하세요!** 🚀

[Vercel 대시보드 바로가기](https://vercel.com/dashboard)
