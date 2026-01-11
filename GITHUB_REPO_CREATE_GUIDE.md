# 📦 GitHub 저장소 수동 생성 가이드

**목표**: `kpsylab-portal` 저장소를 GitHub에 생성하고 코드 업로드

---

## 🎯 Step-by-Step 가이드

### Step 1: GitHub 웹사이트 접속

1. 브라우저에서 https://github.com 접속
2. 로그인 (계정: `suchulkim21`)

---

### Step 2: 새 저장소 생성 페이지 이동

**방법 A**: 직접 링크
- https://github.com/new 접속

**방법 B**: GitHub 메뉴 사용
1. GitHub 우측 상단의 **`+`** 아이콘 클릭
2. **New repository** 선택

---

### Step 3: 저장소 정보 입력

#### 3-1. 기본 정보 입력

1. **Repository name** 입력란
   - `kpsylab-portal` 입력
   - 초록색 체크마크 ✅와 "kpsylab-portal is available" 메시지가 나타나면 사용 가능

2. **Description** 입력란 (선택사항)
   - `KPSY LAB Portal - Next.js + Supabase 심리학 연구 플랫폼` 입력
   - 또는 비워둬도 됨

#### 3-2. Visibility 설정 (중요!)

**위치**: Description 바로 아래, "Configuration" 섹션 (2) 내부

**방법**:
1. **"Choose visibility *"** 라벨을 찾으세요 (별표(*)는 필수 항목 표시)
2. 오른쪽에 **"Public"** 버튼이 보입니다 (아래쪽 화살표 ▼가 있는 드롭다운 버튼)
3. **"Public" 버튼을 클릭**하면 선택 옵션이 나타납니다:
   - **Public** - 누구나 볼 수 있음 (오픈소스 프로젝트용)
   - **Private** - 초대받은 사람만 볼 수 있음 (비공개 프로젝트용) ⭐ 권장
4. 원하는 옵션 선택

**참고**: 기본값은 "Public"이므로, 비공개로 하려면 반드시 "Private"을 선택해야 합니다.

#### 3-3. 초기화 옵션 (⚠️ 모두 기본값 유지!)

다음 옵션들은 **모두 기본값 그대로** 두세요 (체크하지 않기):
- **Add README**: "Off" (기본값 유지)
- **Add .gitignore**: "No .gitignore" (기본값 유지)
- **Choose a license**: "No license" (기본값 유지)

**이유**: 이미 로컬에 코드가 있으므로, 빈 저장소로 생성해야 합니다.

---

### Step 4: 저장소 생성

1. 모든 정보 입력 확인
2. **Create repository** 버튼 클릭
3. 저장소 생성 완료 페이지로 이동

---

### Step 5: 로컬 저장소와 연결

저장소 생성 후 GitHub에서 표시되는 페이지에서 다음 중 하나를 선택:

#### 옵션 A: 기존 저장소 푸시 (권장)

GitHub에서 표시되는 명령어를 사용하거나, 아래 명령어 실행:

```bash
cd c:\Projects\Pj-main\portal

# 원격 저장소 추가 (아직 없다면)
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 원격 저장소 확인
git remote -v

# 현재 브랜치 확인
git branch

# 푸시 (master 브랜치인 경우)
git push -u origin master

# 또는 main 브랜치로 푸시하려면
git push -u origin master:main
```

#### 옵션 B: VS Code 사용

1. VS Code에서 프로젝트 열기
2. 왼쪽 메뉴 **Source Control** (Ctrl+Shift+G)
3. **Publish Branch** (☁️ 구름 아이콘) 클릭
4. 저장소 이름 입력: `kpsylab-portal`
5. Enter

---

## ✅ 확인 사항

### 1. 저장소 생성 확인

브라우저에서 접속:
- https://github.com/suchulkim21/kpsylab-portal

저장소가 보이면 성공!

### 2. 파일 업로드 확인

저장소 페이지에서 다음을 확인:
- ✅ `package.json` 파일이 있는가?
- ✅ `app/` 디렉토리가 있는가?
- ✅ `lib/` 디렉토리가 있는가?
- ✅ `README.md` 파일이 있는가?

### 3. 커밋 히스토리 확인

저장소 페이지에서:
- **Commits** 탭 클릭
- 커밋 `a09f050` "Complete Supabase migration and prepare for deployment"가 보이는지 확인

---

## 🔧 문제 해결

### 문제 1: "Repository already exists" 오류

**원인**: 이미 같은 이름의 저장소가 존재함

**해결**:
1. 기존 저장소를 사용하거나
2. 다른 이름으로 저장소 생성 (예: `kpsylab-portal-v2`)

### 문제 2: "Permission denied" 오류

**원인**: GitHub 인증 문제

**해결**:
1. GitHub Personal Access Token 생성 필요
2. 또는 SSH 키 사용

**Personal Access Token 생성**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. `repo` 권한 선택
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### 문제 3: "Remote origin already exists" 오류

**원인**: 이미 원격 저장소가 설정되어 있음

**해결**:
```bash
# 기존 원격 저장소 제거
git remote remove origin

# 새 원격 저장소 추가
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 푸시
git push -u origin master
```

또는 기존 원격 저장소 URL 변경:
```bash
git remote set-url origin https://github.com/suchulkim21/kpsylab-portal.git
git push -u origin master
```

---

## 📋 체크리스트

저장소 생성 전:
- [ ] GitHub에 로그인되어 있는가?
- [ ] 저장소 이름 `kpsylab-portal`이 사용 가능한가?
- [ ] 로컬 코드가 커밋되어 있는가? (커밋 해시: `a09f050`)

저장소 생성 후:
- [ ] 저장소가 생성되었는가?
- [ ] 원격 저장소가 올바르게 설정되었는가?
- [ ] 코드가 성공적으로 푸시되었는가?
- [ ] GitHub에서 파일들이 보이는가?

---

## 🎯 성공 확인

다음이 모두 확인되면 성공입니다:

1. ✅ https://github.com/suchulkim21/kpsylab-portal 접속 가능
2. ✅ 저장소에 파일들이 표시됨
3. ✅ 커밋 히스토리가 보임
4. ✅ `git remote -v` 명령어로 원격 저장소 URL 확인 가능

---

## 📞 다음 단계

저장소 생성 및 푸시 완료 후:

1. **Vercel 프로젝트 연결**
   - Vercel 대시보드 → Add New Project
   - 저장소: `suchulkim21/kpsylab-portal` 선택
   - Root Directory: `portal` 설정

2. **Vercel 환경 변수 설정**
   - Settings → Environment Variables
   - Supabase 키 등 필수 변수 추가

3. **자동 배포 확인**
   - Vercel이 GitHub 푸시를 감지하여 자동 배포

---

## 🔗 유용한 링크

- **GitHub 새 저장소 생성**: https://github.com/new
- **저장소 확인**: https://github.com/suchulkim21/kpsylab-portal
- **Personal Access Token 생성**: https://github.com/settings/tokens

---

**가이드 생성일**: 2024년  
**대상 저장소**: `kpsylab-portal`
