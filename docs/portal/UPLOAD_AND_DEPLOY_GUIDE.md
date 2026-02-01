# 업로드 & 배포 가이드

**작성일**: 2025-02-01  
**적용 대상**: Git 커밋/푸시, GitHub 업로드, Vercel 배포

---

## 현재 상태

- **Git 저장소**: ❌ 미초기화 (`c:\Projects\Pj-main`에 `.git` 없음)
- **배포 환경**: Vercel (`vercel.json` 존재, `apps/portal` 기준)
- **문서상 원격 저장소**: `https://github.com/suchulkim21/kpsylab-portal.git`

---

## 1. Git 커밋 & 푸시 (GitHub 업로드)

### Step 1-1: Git 저장소 초기화

PowerShell 또는 터미널에서 실행:

```powershell
cd c:\Projects\Pj-main
git init
```

### Step 1-2: 원격 저장소 연결

GitHub에 이미 저장소가 있다면:

```powershell
# 원격 저장소 추가 (저장소 URL은 본인 것으로 수정)
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 확인
git remote -v
```

저장소가 없다면 먼저 [GitHub에서 저장소 생성](https://github.com/new) 후 위 명령 실행.

### Step 1-3: 파일 스테이징 & 커밋

```powershell
# 모든 변경사항 스테이징
git add .

# 커밋 (report-templates 변경사항 포함)
git commit -m "feat: KPSY LAB 리포트 템플릿 - 확신적 모호함(Barnum) 기법 적용"
```

### Step 1-4: 푸시

```powershell
# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

**인증 오류**가 나면:
- **HTTPS**: GitHub Personal Access Token 사용 (Settings → Developer settings → Personal access tokens)
- **SSH**: `git remote set-url origin git@github.com:suchulkim21/kpsylab-portal.git` 후 푸시

---

## 2. 파일/코드 업로드

Git push가 성공하면 GitHub에 코드가 올라갑니다. 별도 업로드는 필요 없습니다.

**다른 곳으로 업로드**가 필요하다면:
- **Vercel CLI**: `vercel --prod` (아래 배포 섹션 참고)
- **FTP/SFTP**: 호스팅 제공업체 가이드 참고
- **npm 패키지**: `npm publish` (패키지로 배포 시)

---

## 3. 배포 (Vercel)

### 3-1: Vercel과 GitHub 연동 (권장)

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **Add New Project** → GitHub 저장소 `suchulkim21/kpsylab-portal` 선택
3. **Root Directory**: `apps/portal` 로 설정 (중요)
4. **Environment Variables** 설정 (Supabase 등)
5. **Deploy** 클릭

GitHub에 푸시할 때마다 자동으로 배포됩니다.

### 3-2: Vercel CLI로 수동 배포

```powershell
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 프로젝트 루트에서 배포
cd c:\Projects\Pj-main
vercel --prod
```

### 3-3: vercel.json 설정 (이미 적용됨)

```json
{
  "buildCommand": "cd apps/portal && npm run build",
  "outputDirectory": "apps/portal/.next",
  "installCommand": "cd apps/portal && npm install",
  "framework": "nextjs",
  "rootDirectory": "apps/portal"
}
```

---

## 빠른 실행 체크리스트

| 순서 | 작업 | 명령어/행동 |
|------|------|-------------|
| 1 | Git 초기화 | `git init` |
| 2 | 원격 추가 | `git remote add origin https://github.com/사용자명/저장소명.git` |
| 3 | 스테이징 | `git add .` |
| 4 | 커밋 | `git commit -m "메시지"` |
| 5 | 푸시 | `git push -u origin main` |
| 6 | Vercel 배포 | 대시보드에서 GitHub 연동 또는 `vercel --prod` |

---

## 문제 해결

### "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/사용자명/저장소명.git
```

### "Permission denied" / 인증 오류
- Personal Access Token 생성 후 비밀번호 대신 입력
- 또는 SSH 키 설정 후 `git remote set-url origin git@github.com:사용자명/저장소명.git`

### "Repository not found"
- GitHub에서 저장소가 실제로 존재하는지 확인
- 저장소 이름, URL 오타 확인
- 해당 저장소에 대한 접근 권한 확인
