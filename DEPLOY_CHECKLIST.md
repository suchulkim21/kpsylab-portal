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
  - 브랜치: `master` (또는 자동 생성된 브랜치)
  - 방법: VS Code "Publish Branch" 사용
- [ ] Vercel 환경 변수 설정 ⚡ (다음 단계)

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
- 모든 파일이 올바르게 업로드되었는지 확인

---

### Step 4: Vercel 환경 변수 설정

**⚠️ 필수**: 배포 전에 반드시 Vercel 대시보드에서 환경 변수를 설정해야 합니다!

#### 4-1. Vercel 대시보드 접속

1. https://vercel.com/dashboard 접속 및 로그인
2. 프로젝트 선택:
   - 기존 프로젝트가 있다면: `kpsylab.com` 또는 관련 프로젝트 선택
   - 없다면: **Add New Project** 클릭하여 `suchulkim21/kpsylab-portal` 저장소 연결

#### 4-2. Root Directory 설정 (중요!)

1. Settings → General
2. **Root Directory** 섹션 찾기
3. `portal` 입력 (저장)
4. **이 설정이 없으면 빌드가 실패합니다!**

#### 4-3. 환경 변수 추가

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

#### 4-4. 환경 변수 확인

모든 변수가 **Production**, **Preview**, **Development** 세 가지 환경에 모두 설정되어 있는지 확인하세요.

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
- 코드 커밋: **완료** (커밋 해시: `a09f050`, 194개 파일)
- GitHub 푸시: **완료** (`kpsylab-portal` 저장소)

### 즉시 실행 가능한 작업 (오늘 중)

#### 1. Vercel 환경 변수 설정 (우선순위: 매우 높음) ⚡
**예상 소요 시간**: 10-15분
- GitHub 저장소와 독립적으로 진행 가능
- Vercel 대시보드에서 즉시 설정 가능
- Supabase 키만 준비되면 됨

**액션**: `NEXT_STEPS.md` 파일 참조

#### 2. GitHub 저장소 확인/생성 ✅ (완료)
- 저장소 URL: `https://github.com/suchulkim21/kpsylab-portal.git`
- 방법: VS Code "Publish Branch" 기능 사용
- 저장소 생성 및 푸시 완료

### 다음 단계
1. **Vercel 환경 변수 설정** ⚡ (즉시 실행 가능)
   - 저장소: `https://github.com/suchulkim21/kpsylab-portal.git`
   - Root Directory: `portal` (중요!)
   - 필수 환경 변수: Supabase 키, SESSION_SECRET 등
2. **Vercel 프로젝트 연결** (GitHub 저장소 연결)
3. **자동 배포 확인** (Vercel이 자동으로 빌드/배포)

**자세한 가이드**: `DEPLOY_CHECKLIST.md` Step 4 참조

---

**준비되셨으면 다음 단계로 진행하세요!**

