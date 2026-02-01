# Vercel 프로젝트 삭제 가이드

## 🗑️ CLI를 사용한 프로젝트 삭제 방법

### Step 1: Vercel CLI 로그인

터미널에서 실행:
```bash
vercel login
```
브라우저가 열리면 Vercel 계정으로 로그인하세요.

### Step 2: 프로젝트 목록 확인

```bash
vercel ls
```

### Step 3: 프로젝트 삭제

각 프로젝트를 삭제하려면:
```bash
vercel remove <프로젝트-이름> --yes
```

삭제할 프로젝트:
- `mnps-test-3aj4`
- `크스필람` 또는 `kspylam`  
- `mnps-테스트` 또는 `mnps-test`

---

## 🌐 웹 대시보드를 사용한 삭제 방법 (더 쉬움)

### Step 1: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. 로그인

### Step 2: 프로젝트 삭제

각 프로젝트마다:

1. **프로젝트 클릭** (예: `mnps-test-3aj4`)
2. **Settings** 탭 클릭
3. 맨 아래로 스크롤
4. **"Delete Project"** 섹션 찾기
5. 프로젝트 이름 입력 (확인용)
6. **"Delete Project"** 버튼 클릭
7. 확인 대화상자에서 **"Delete"** 클릭

삭제할 프로젝트:
- ✅ `mnps-test-3aj4` (kpsylab.com 도메인 연결)
- ✅ `크스필람` (kspylam)
- ✅ `mnps-테스트` (mnps-test)

---

## ⚠️ 주의사항

1. **도메인 연결 해제**: 프로젝트를 삭제하면 연결된 도메인도 자동으로 해제됩니다.
   - `kpsylab.com` 도메인을 사용하는 경우, 새 프로젝트에서 다시 연결해야 합니다.

2. **데이터 백업**: 삭제 전에 필요한 데이터가 있다면 백업하세요.

3. **환경 변수**: 삭제되면 환경 변수도 함께 삭제됩니다. 새 프로젝트에서 다시 설정해야 합니다.

---

## 🔄 삭제 후 작업

1. Portal 프로젝트 새로 배포
2. 도메인 다시 연결 (`kpsylab.com`)
3. 환경 변수 재설정

---

## 📝 빠른 참고

**CLI 명령어 요약:**
```bash
# 로그인
vercel login

# 프로젝트 목록
vercel ls

# 프로젝트 삭제 (대화형)
vercel remove <프로젝트-이름>

# 프로젝트 삭제 (자동 확인)
vercel remove <프로젝트-이름> --yes
```

**웹 대시보드:**
- https://vercel.com/dashboard → 프로젝트 → Settings → Delete Project
