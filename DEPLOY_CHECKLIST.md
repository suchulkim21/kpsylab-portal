# ✅ 배포 전 체크리스트

배포 전 확인사항을 체크하세요!

---

## 🔍 현재 상태

- [x] Supabase 마이그레이션 완료
- [x] Keep-Alive API 추가 완료
- [x] 프로젝트명 변경 완료 (portal → kpsylab)
- [x] 로컬 빌드 테스트
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 환경 변수 설정

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

```bash
git push origin master
```

(또는 `main` 브랜치를 사용하는 경우)

---

### Step 4: Vercel 환경 변수 확인

**중요**: 배포 전에 Vercel 대시보드에서 환경 변수를 설정해야 합니다!

1. Vercel 대시보드 접속
2. `kpsylab.com` 프로젝트 선택
3. Settings → Environment Variables
4. 다음 변수들 확인/추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_BASE_URL` = `https://www.kpsylab.com`
   - `NODE_ENV` = `production`

---

## ⚠️ 주의사항

1. **Root Directory**: Vercel 프로젝트 설정에서 `portal`로 설정되어 있는지 확인
2. **환경 변수**: Supabase 키가 올바르게 설정되어 있는지 확인
3. **빌드 오류**: 로컬에서 빌드가 성공하는지 먼저 확인

---

**준비되셨으면 다음 단계로 진행하세요!**

