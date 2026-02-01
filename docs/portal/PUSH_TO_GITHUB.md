# 📤 GitHub에 코드 푸시하기

**저장소**: `https://github.com/suchulkim21/kpsylab-portal`

**현재 상태**: ✅ 저장소 생성 완료 (Public)

---

## 🚀 Step 1: 원격 저장소 확인 및 설정

현재 화면에 표시된 "push an existing repository from the command line" 섹션의 명령어를 사용합니다.

### 명령어 (순서대로 실행)

```bash
cd c:\Projects\Pj-main\apps\portal

# 1. 기존 잘못된 원격 저장소 제거 (있다면)
git remote remove origin

# 2. 올바른 원격 저장소 추가
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 3. 원격 저장소 확인
git remote -v

# 4. 현재 브랜치를 main으로 변경 (GitHub의 기본 브랜치)
git branch -M main

# 5. GitHub에 푸시
git push -u origin main
```

**⚠️ 주의**: 원격 저장소 URL에 저장소 이름(`/kpsylab-portal.git`)이 포함되어야 합니다!

**참고**: 
- 현재 브랜치가 `master`인 경우, `git branch -M main` 명령어로 `main`으로 변경
- 또는 `master` 브랜치 그대로 푸시하려면: `git push -u origin master`

---

## 🎯 실행 방법

### 방법 1: PowerShell/Terminal에서 직접 실행

1. VS Code에서 터미널 열기 (Ctrl + `)
2. 위의 명령어를 순서대로 복사하여 실행

### 방법 2: 배치 파일 실행

프로젝트 루트에 있는 `push-to-github.bat` 파일을 더블클릭하여 실행

### 방법 3: VS Code Source Control 사용

1. VS Code 왼쪽 메뉴에서 **Source Control** (Ctrl+Shift+G)
2. 상단의 **...** (더보기) 메뉴 클릭
3. **Push** 선택
4. 또는 이미 원격 저장소가 연결되어 있다면 **Sync Changes** (동기화) 클릭

---

## ✅ 성공 확인

푸시가 성공하면:

1. **GitHub 저장소 페이지 새로고침**
   - https://github.com/suchulkim21/kpsylab-portal
   - 파일 목록이 표시되어야 함

2. **확인 사항**:
   - ✅ `package.json` 파일이 보이는가?
   - ✅ `app/` 디렉토리가 보이는가?
   - ✅ `lib/` 디렉토리가 보이는가?
   - ✅ `README.md` 파일이 보이는가?
   - ✅ `DEPLOY_CHECKLIST.md` 파일이 보이는가?

3. **커밋 확인**:
   - **Commits** 탭 클릭
   - 커밋 `a09f050` "Complete Supabase migration and prepare for deployment" 확인

---

## 🔧 문제 해결

### 문제 1: "remote origin already exists"

**원인**: 이미 원격 저장소가 설정되어 있음

**해결**:
```bash
# 기존 원격 저장소 제거
git remote remove origin

# 새 원격 저장소 추가
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 푸시
git branch -M main
git push -u origin main
```

### 문제 2: "Permission denied" 또는 인증 요구

**해결**:
1. GitHub Personal Access Token 필요
2. 푸시 시 사용자명과 비밀번호 대신 토큰 입력
3. 또는 SSH 키 사용

### 문제 3: "branch name does not match"

**해결**: 
- `master` 브랜치를 `main`으로 변경: `git branch -M main`
- 또는 `master` 그대로 푸시: `git push -u origin master`

---

## 📋 체크리스트

- [ ] 원격 저장소가 올바르게 설정되었는가?
- [ ] 브랜치 이름이 올바른가? (`master` 또는 `main`)
- [ ] 푸시가 성공했는가?
- [ ] GitHub에서 파일들이 보이는가?
- [ ] 커밋 히스토리가 보이는가?

---

## 🎯 다음 단계

푸시 완료 후:

1. **Vercel 프로젝트 연결**
   - Vercel 대시보드 → Add New Project
   - 저장소: `suchulkim21/kpsylab-portal` 선택
   - **Root Directory**: `apps/portal` 설정 (중요!)

2. **Vercel 환경 변수 설정**
   - Settings → Environment Variables
   - 필수 변수 추가

3. **자동 배포 확인**
   - Vercel이 자동으로 빌드 및 배포 시작

---

**가이드 생성일**: 2024년
