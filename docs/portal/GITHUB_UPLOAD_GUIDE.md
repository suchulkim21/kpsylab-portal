# 📤 GitHub 업로드 가이드

**현재 상태**: 저장소 `https://github.com/suchulkim21/mnps-test.git`를 찾을 수 없음

---

## 🔍 문제 진단

**오류 메시지**: `remote: Repository not found`

**가능한 원인**:
1. 저장소가 아직 생성되지 않음
2. 저장소 이름이 다름
3. 접근 권한 문제
4. GitHub 인증 문제

---

## ✅ 해결 방법

### 방법 1: GitHub에서 저장소 생성 (권장)

1. **GitHub 대시보드 접속**
   - https://github.com/new 접속
   - 또는 GitHub → 우측 상단 `+` → New repository

2. **저장소 생성**
   - **Repository name**: `mnps-test`
   - **Description**: "KPSY LAB Portal - Next.js + Supabase"
   - **Public** 또는 **Private** 선택
   - ⚠️ **중요**: "Initialize this repository with a README" 체크 해제
   - ⚠️ **중요**: "Add .gitignore" 선택하지 않음
   - ⚠️ **중요**: "Choose a license" 선택하지 않음
   - **Create repository** 클릭

3. **저장소 생성 후 푸시**
   ```bash
   cd c:\Projects\Pj-main\portal
   git push -u origin master
   ```

---

### 방법 2: 기존 다른 저장소 사용

다른 저장소가 있다면:

1. **원격 저장소 URL 확인**
   ```bash
   git remote -v
   ```

2. **원격 저장소 URL 변경** (필요시)
   ```bash
   git remote set-url origin https://github.com/사용자명/저장소명.git
   ```

3. **푸시**
   ```bash
   git push -u origin master
   ```

---

### 방법 3: 저장소 이름 확인

저장소 이름이 다를 수 있습니다. 다음을 확인하세요:

- `kpsylab-portal`
- `portal`
- `kpsylab`
- 기타 다른 이름

확인 후 원격 저장소 URL 업데이트:
```bash
git remote set-url origin https://github.com/suchulkim21/실제저장소명.git
git push -u origin master
```

---

## 🔐 인증 문제 해결

### Personal Access Token 사용

HTTPS를 사용하는 경우 Personal Access Token이 필요할 수 있습니다:

1. **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **Generate new token (classic)** 클릭
3. 권한 선택:
   - `repo` (전체 저장소 접근)
4. 토큰 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

### SSH 사용 (대안)

SSH 키를 사용하면 인증이 더 간단합니다:

1. **SSH 키 생성** (이미 있다면 스킵)
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **SSH 키를 GitHub에 추가**
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 공개 키(`~/.ssh/id_ed25519.pub`) 내용 복사하여 추가

3. **원격 저장소 URL을 SSH로 변경**
   ```bash
   git remote set-url origin git@github.com:suchulkim21/mnps-test.git
   ```

4. **푸시**
   ```bash
   git push -u origin master
   ```

---

## 📋 빠른 체크리스트

- [ ] GitHub에 로그인되어 있는가?
- [ ] 저장소 `suchulkim21/mnps-test`가 존재하는가?
- [ ] 저장소 접근 권한이 있는가?
- [ ] Git 인증 정보가 올바른가?
- [ ] 원격 저장소 URL이 올바른가?

---

## 🚀 저장소 생성 후 즉시 실행

저장소를 생성했다면 다음 명령어를 실행하세요:

```bash
cd c:\Projects\Pj-main\portal
git push -u origin master
```

**성공 메시지 예시**:
```
Enumerating objects: ...
Counting objects: 100% (194/194), done.
Writing objects: 100% (xxx/xxx), done.
To https://github.com/suchulkim21/mnps-test.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

---

## ⚠️ 주의사항

1. **저장소가 비어있어야 함**: README, .gitignore, license를 추가하지 않고 생성
2. **브랜치 이름**: 로컬은 `master`, 원격은 `main`일 수 있음
   - 이 경우: `git push -u origin master:main`
3. **첫 푸시**: 저장소가 비어있으면 첫 푸시 시 브랜치가 자동 생성됨

---

## 📞 다음 단계

저장소에 푸시가 성공하면:

1. ✅ GitHub에서 코드 확인
2. ✅ Vercel 자동 배포 시작 (연동되어 있다면)
3. ✅ 배포 로그 확인

---

**마지막 업데이트**: 2024년  
**커밋**: `a09f050`
