# ✅ 배포 전 체크리스트

배포 전 확인사항을 체크하세요!

---

## 🔍 현재 상태

- [x] Supabase 마이그레이션 완료
- [x] Keep-Alive API 추가 완료
- [x] 프로젝트명 변경 완료 (portal → kpsylab)
- [x] 로컬 빌드 테스트 ✅ (성공)
- [x] 코드 커밋 완료 ✅ (194개 파일, 25,023줄 추가)
- [ ] GitHub 푸시 ⚠️ (저장소 생성 필요)
  - 원격 저장소: `https://github.com/suchulkim21/mnps-test.git`
  - 브랜치: `master` (로컬)
  - 상태: 저장소를 찾을 수 없음 (`Repository not found`)
  - **해결**: GitHub에서 저장소 생성 필요
  - **가이드**: `GITHUB_UPLOAD_GUIDE.md` 참조
- [ ] Vercel 환경 변수 설정 ⚠️ (대시보드에서 수동 설정 필요)

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

**현재 상태**: 원격 저장소가 설정되지 않았거나 접근할 수 없습니다.

#### 3-1. GitHub 저장소 확인/생성

1. GitHub에서 저장소 확인: https://github.com/suchulkim21/mnps-test
2. 저장소가 없다면 생성:
   - GitHub → New Repository
   - Name: `mnps-test`
   - Private 또는 Public 설정
   - README 파일 생성하지 않기 (이미 코드가 있음)

#### 3-2. 원격 저장소 연결 및 푸시

```bash
# 현재 브랜치 확인 (master 사용 중)
git branch

# 원격 저장소 설정 (아직 설정되지 않은 경우)
git remote add origin https://github.com/suchulkim21/mnps-test.git

# 원격 저장소 확인
git remote -v

# 푸시 시도 (master 브랜치)
git push -u origin master

# 만약 원격 저장소가 main 브랜치를 사용한다면:
git push -u origin master:main
```

**참고**: 저장소가 비어있고 master/main 브랜치가 없다면, 첫 푸시 시 브랜치가 자동 생성됩니다.

---

### Step 4: Vercel 환경 변수 설정

**⚠️ 필수**: 배포 전에 반드시 Vercel 대시보드에서 환경 변수를 설정해야 합니다!

#### 4-1. Vercel 대시보드 접속

1. https://vercel.com/dashboard 접속 및 로그인
2. 프로젝트 선택:
   - 기존 프로젝트가 있다면: `kpsylab.com` 또는 관련 프로젝트 선택
   - 없다면: **Add New Project** 클릭하여 `suchulkim21/mnps-test` 저장소 연결

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

### 즉시 실행 가능한 작업 (오늘 중)

#### 1. Vercel 환경 변수 설정 (우선순위: 매우 높음) ⚡
**예상 소요 시간**: 10-15분
- GitHub 저장소와 독립적으로 진행 가능
- Vercel 대시보드에서 즉시 설정 가능
- Supabase 키만 준비되면 됨

**액션**: `NEXT_STEPS.md` 파일 참조

#### 2. GitHub 저장소 확인/생성 (우선순위: 높음) ⚡
**예상 소요 시간**: 5-10분
- 저장소 URL: `https://github.com/suchulkim21/mnps-test.git` (설정됨)
- 문제: 저장소를 찾을 수 없음 (`Repository not found`)
- 해결: GitHub에서 저장소 존재 여부 확인 후 생성 또는 URL 수정

### 다음 단계
1. **Vercel 환경 변수 설정** (지금 바로 가능)
2. **GitHub 저장소 확인 및 푸시** (저장소 준비 후)
3. **자동 배포 확인** (푸시 후 Vercel이 자동 처리)

**자세한 가이드**: `NEXT_STEPS.md` 파일 참조

---

**준비되셨으면 다음 단계로 진행하세요!**

