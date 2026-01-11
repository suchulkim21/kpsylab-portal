# 🔧 빠른 수정 가이드

**문제**: 원격 저장소 URL에 저장소 이름이 누락됨

---

## ✅ 해결 방법

PowerShell에서 다음 명령어를 **순서대로** 실행하세요:

```powershell
cd c:\Projects\Pj-main\portal

# 1. 잘못된 원격 저장소 제거
git remote remove origin

# 2. 올바른 원격 저장소 추가 (저장소 이름 포함!)
git remote add origin https://github.com/suchulkim21/kpsylab-portal.git

# 3. 원격 저장소 확인 (올바른지 확인)
git remote -v

# 4. 새로 생성된 파일들 추가
git add .

# 5. 변경사항 커밋
git commit -m "Update documentation and fix git remote URL"

# 6. GitHub에 푸시
git push -u origin main
```

---

## ⚠️ 주의사항

**중요**: URL 끝에 반드시 `/kpsylab-portal.git`이 포함되어야 합니다!

- ❌ 잘못됨: `https://github.com/suchulkim21`
- ✅ 올바름: `https://github.com/suchulkim21/kpsylab-portal.git`

---

## 📋 실행 후 확인

푸시 성공 메시지 예시:
```
Enumerating objects: ...
Counting objects: 100% (xxx/xxx), done.
Writing objects: 100% (xxx/xxx), done.
To https://github.com/suchulkim21/kpsylab-portal.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

**빠른 해결**: 위 명령어를 순서대로 복사하여 실행하세요!
