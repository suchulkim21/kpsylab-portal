# ✅ 배포 전 체크리스트

배포 전 확인사항을 체크하세요!

---

## 🔍 현재 상태

- [x] Supabase 마이그레이션 완료
- [x] Keep-Alive API 추가 완료
- [x] 프로젝트명 변경 완료 (portal → kpsylab)
- [x] 로컬 빌드 테스트 ✅ (성공)
- [x] 코드 커밋 완료 ✅ (194개 파일, 25,023줄 추가)
- [x] GitHub 푸시 ✅ (완료)
  - 원격 저장소: `https://github.com/suchulkim21/kpsylab-portal.git`
  - 브랜치: `main`
  - 상태: 코드 푸시 완료
- [ ] Vercel 프로젝트 생성 ⚡ (다음 단계)
  - 새 프로젝트 생성 필요
  - GitHub 저장소 연결: `suchulkim21/kpsylab-portal`
- [ ] Vercel 환경 변수 설정 (프로젝트 생성 후)

---

## 📋 배포 단계

### Step 1: 로컬 빌드 테스트 (권장)

```bash
cd portal
npm install
npm run build
```

빌드 성공 시 계속 진행하세요.

---

### Step 2: 변경사항 커밋

```bash
git add .
git commit -m "Supabase 마이그레이션 완료 및 배포 준비"
```

---

### Step 3: GitHub 푸시

**상태**: ✅ 완료 (VS Code "Publish Branch" 사용)

#### 3-1. 완료된 작업

- ✅ GitHub 저장소 생성: `kpsylab-portal`
- ✅ 원격 저장소 URL: `https://github.com/suchulkim21/kpsylab-portal.git`
- ✅ 코드 푸시 완료

#### 3-2. 확인 방법

GitHub에서 확인:
- 저장소: https://github.com/suchulkim21/kpsylab-portal
- 브랜치: `main`
- 모든 파일이 올바르게 업로드되었는지 확인
- 커밋 히스토리 확인

---

### Step 4: Vercel 프로젝트 생성

**⚠️ 필수**: Vercel에서 새 프로젝트를 생성하고 GitHub 저장소를 연결해야 합니다!

#### 4-1. Vercel 대시보드 접속

1. https://vercel.com/dashboard 접속 및 로그인
2. **Add New Project** 버튼 클릭

#### 4-2. GitHub 저장소 선택

1. **Import Git Repository** 화면에서 GitHub 저장소 목록 확인
2. `suchulkim21/kpsylab-portal` 저장소 찾기
3. 저장소 옆의 **Import** 버튼 클릭

#### 4-3. 프로젝트 설정

- **Project Name**: `kpsylab-portal` (또는 원하는 이름)
- **Framework Preset**: `Next.js` (자동 감지됨)
- **Root Directory**: 프로젝트 구조에 따라 설정
  - 루트에 직접 있는 경우: 설정 불필요 (기본값)
  - 서브폴더에 있는 경우: 폴더명 입력 (예: `portal`)

**상세 가이드**: `VERCEL_PROJECT_CREATE_GUIDE.md` 파일 참조

---

### Step 5: Vercel 환경 변수 설정

**⚠️ 필수**: 배포 전에 반드시 Vercel 대시보드에서 환경 변수를 설정해야 합니다!

#### 5-1. 환경 변수 섹션으로 이동

프로젝트 설정 화면에서 **Environment Variables** 섹션 찾기

#### 5-2. 환경 변수 추가

Settings → Environment Variables → Add New

**다음 변수들을 Production, Preview, Development 모두에 추가:**

| 변수명 | 값 예시 | 설명 |
|--------|---------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase 프로젝트 URL (필수) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Supabase anon 공개 키 (필수) |
| `SESSION_SECRET` | 랜덤 문자열 (32자 이상 권장) | 세션 암호화 키 (필수) |
| `NEXT_PUBLIC_BASE_URL` | `https://www.kpsylab.com` | 프로덕션 도메인 (필수) |
| `NODE_ENV` | `production` | 환경 변수 (선택사항, 자동 설정됨) |

**SESSION_SECRET 생성 방법:**
```bash
# 터미널에서 실행
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 5-3. 환경 변수 확인

모든 변수가 **Production**, **Preview**, **Development** 세 가지 환경에 모두 설정되어 있는지 확인하세요.

---

### Step 6: 프로젝트 배포

#### 6-1. 배포 실행

1. 모든 환경 변수 설정 확인 완료
2. 화면 하단의 **Deploy** 버튼 클릭
3. 배포 진행 상황 확인 (약 2-3분 소요)

#### 6-2. 배포 확인

1. 배포 완료 후 배포된 URL 확인
2. 사이트 접속 테스트
3. 정상 동작 확인

---

## ⚠️ 주의사항

1. **Root Directory**: Vercel 프로젝트 설정에서 `portal`로 설정되어 있는지 확인
2. **환경 변수**: Supabase 키가 올바르게 설정되어 있는지 확인
3. **빌드 오류**: 로컬에서 빌드가 성공하는지 먼저 확인

---

---

## 📊 CEO 최종 의사결정 요약

### 완료된 작업 ✅
- Supabase 마이그레이션: **완료**
- 로컬 빌드 테스트: **성공** (Exit code: 0)
- 코드 커밋: **완료** (194개 파일)
- GitHub 푸시: **완료** (`kpsylab-portal` 저장소, `main` 브랜치)

### 즉시 실행 가능한 작업 (오늘 중)

#### 1. Vercel 프로젝트 생성 (우선순위: 매우 높음) ⚡
**예상 소요 시간**: 15-20분
- Vercel 대시보드에서 새 프로젝트 생성
- GitHub 저장소 연결: `suchulkim21/kpsylab-portal`
- 환경 변수 설정 (배포 전 필수!)

**액션**: `VERCEL_PROJECT_CREATE_GUIDE.md` 파일 참조

#### 2. GitHub 저장소 ✅ (완료)
- 저장소 URL: `https://github.com/suchulkim21/kpsylab-portal.git`
- 브랜치: `main`
- 코드 푸시 완료

### 다음 단계
1. **Vercel 프로젝트 생성** ⚡ (즉시 실행 가능)
   - Vercel 대시보드 → Add New Project
   - GitHub 저장소 선택: `suchulkim21/kpsylab-portal`
   - 프로젝트 설정 확인

2. **환경 변수 설정** (프로젝트 생성 후)
   - Supabase 키 준비
   - SESSION_SECRET 생성
   - 모든 환경 변수 추가 (Production, Preview, Development)

3. **프로젝트 배포**
   - Deploy 버튼 클릭
   - 배포 완료 대기 (약 2-3분)
   - 배포된 URL 접속 테스트

**자세한 가이드**: `VERCEL_PROJECT_CREATE_GUIDE.md` 파일 참조

---

**준비되셨으면 다음 단계로 진행하세요!**

