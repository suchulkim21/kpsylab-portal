# Portal 프로젝트 배포 가이드

MNPS 프로젝트를 삭제하고 Portal 프로젝트를 새로 배포하는 방법입니다.

---

## 🗑️ Step 1: 기존 MNPS 프로젝트 삭제

### Vercel에서 기존 프로젝트 삭제

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 다음 프로젝트들을 삭제:
   - **mnps-test-3aj4** (kpsylab.com 도메인 연결)
   - **크스필람** (kspylam)
   - **mnps-테스트** (mnps-test)

### 삭제 방법

각 프로젝트에서:
1. 프로젝트 클릭 → **Settings** 탭
2. 맨 아래 **Delete Project** 섹션으로 스크롤
3. 프로젝트 이름 입력하여 확인
4. **Delete Project** 클릭

⚠️ **주의**: 도메인(`kpsylab.com`)이 연결된 프로젝트를 삭제하면 도메인이 해제됩니다. 새 프로젝트에서 다시 연결해야 합니다.

---

## 🆕 Step 2: Portal 프로젝트 새로 배포

### 방법 1: Vercel 대시보드에서 새 프로젝트 생성 (권장)

#### 1. 새 프로젝트 추가

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **Add New Project** 클릭
3. GitHub 저장소 선택: `suchulkim21/mnps-test` (또는 해당 저장소)

#### 2. 프로젝트 설정

**프로젝트 기본 정보:**
- **Project Name**: `kpsylab-portal` (또는 원하는 이름)
- **Framework Preset**: Next.js (자동 감지됨)
- **Root Directory**: `apps/portal` ← **매우 중요!**
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)
- **Install Command**: `npm install` (기본값)

#### 3. 환경 변수 설정

**⚠️ 배포 전에 반드시 환경 변수를 먼저 설정하세요!**

**Environment Variables** 섹션에서 다음 변수들 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SESSION_SECRET=your-random-secret-key-here
NEXT_PUBLIC_BASE_URL=https://www.kpsylab.com
NODE_ENV=production
```

**각 변수를 다음 환경에 모두 추가:**
- ✅ Production
- ✅ Preview  
- ✅ Development

#### 4. 배포 실행

1. 모든 설정 확인
2. **Deploy** 버튼 클릭
3. 배포 완료까지 대기 (약 2-5분)

---

## 🌐 Step 3: 도메인 연결

### kpsylab.com 도메인 연결

1. 프로젝트 → **Settings** → **Domains**
2. 도메인 추가:
   - `kpsylab.com`
   - `www.kpsylab.com` (권장)

### DNS 설정 (도메인이 아직 연결되지 않은 경우)

Vercel에서 제공하는 DNS 레코드를 도메인 제공업체에 추가:

```
Type: CNAME
Name: @ (또는 www)
Value: cname.vercel-dns.com
```

또는

```
Type: A
Name: @
Value: 76.76.21.21
```

---

## 🔍 Step 4: 배포 확인

### 배포 상태 확인

1. **Deployments** 탭에서 최신 배포 상태 확인
2. ✅ 성공 (초록색) 표시 확인
3. 빌드 로그 확인:
   - 배포 클릭 → **Build Logs** 탭
   - 오류가 없는지 확인

### 사이트 접속 확인

1. `https://kpsylab.com` 접속
2. 사이트가 정상적으로 로드되는지 확인
3. 브라우저 개발자 도구(F12)에서 콘솔 오류 확인

---

## 🔧 문제 해결

### 빌드 실패 시

#### 1. 로컬에서 빌드 테스트

```bash
cd apps/portal
npm install
npm run build
```

#### 2. 일반적인 오류 해결

**TypeScript 오류:**
- `tsconfig.json` 확인
- 타입 오류 수정

**환경 변수 오류:**
- Vercel 대시보드에서 환경 변수 확인
- `.env.local` 파일 확인 (로컬 개발용)

**의존성 오류:**
- `package.json` 확인
- `npm install` 재실행

### 배포 후 오류

**502 Bad Gateway:**
- 빌드는 성공했지만 런타임 오류
- Functions 탭에서 서버 로그 확인
- 환경 변수 재확인

**404 Not Found:**
- 라우팅 설정 확인
- `app` 디렉토리 구조 확인

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] 기존 MNPS 프로젝트 삭제 완료
- [ ] Portal 프로젝트 로컬 빌드 성공
- [ ] Vercel에서 새 프로젝트 생성
- [ ] Root Directory: `apps/portal` 설정
- [ ] 모든 환경 변수 설정 완료
- [ ] 프로젝트 배포 성공
- [ ] 도메인 연결 완료
- [ ] 사이트 정상 작동 확인

---

## 📝 추가 정보

### 프로젝트 구조

```
저장소 루트 (suchulkim21/mnps-test)
├── apps/portal/         ← 배포할 프로젝트
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── next.config.ts
├── apps/mnps/          ← 서비스 소스
└── ...
```

### 빌드 설정

- **Framework**: Next.js 16.1.1
- **Node Version**: 18.x (Vercel 기본값)
- **Build Command**: `npm run build`
- **Output**: `.next` (자동)

---

## 🆘 도움말

문제가 발생하면:

1. **빌드 로그 확인**: Deployments → Build Logs
2. **환경 변수 확인**: Settings → Environment Variables
3. **로컬 빌드 테스트**: `cd apps/portal && npm run build`
4. **Vercel 문서 확인**: https://vercel.com/docs

---

**배포가 완료되면 알려주세요!**
