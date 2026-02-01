# 🔄 Supabase 마이그레이션 가이드

**KPSY LAB Portal** - SQLite에서 Supabase로 완전 마이그레이션

---

## ✅ 마이그레이션 완료 항목

- [x] 프로젝트명 변경 (`portal` → `kpsylab`)
- [x] Supabase 클라이언트 설정
- [x] 모든 DB 파일을 Supabase로 변경
  - `lib/db/auth.ts` - 사용자 인증
  - `lib/db/analytics.ts` - 분석 데이터
  - `lib/db/board.ts` - 게시판
  - `lib/db/test-results.ts` - 테스트 결과
  - `app/api/blog/posts/route.ts` - 블로그 API
- [x] Supabase 스키마 설계
- [x] 데이터 마이그레이션 스크립트 작성

---

## 📋 마이그레이션 절차

### 1단계: Supabase 프로젝트 생성

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 새 프로젝트 생성
3. 프로젝트 설정:
   - 프로젝트 이름: `kpsylab-portal`
   - 데이터베이스 비밀번호: 강력한 비밀번호 설정
   - 지역: 가장 가까운 지역 선택

### 2단계: 스키마 적용

1. Supabase 대시보드 → SQL Editor 접속
2. `apps/portal/lib/db/supabase-schema.sql` 파일의 내용을 복사
3. SQL Editor에 붙여넣기 후 실행
4. 모든 테이블이 생성되었는지 확인:
   - `users`
   - `visits`
   - `page_views`
   - `service_usage`
   - `board_posts`
   - `test_results`
   - `blog_posts`

### 3단계: 환경 변수 설정

#### 로컬 개발 환경 (`.env.local`)

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 기타 환경 변수
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:7777
SESSION_SECRET=your-session-secret-here
```

#### Vercel 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택 → Settings → Environment Variables
2. 다음 환경 변수 추가:

```env
# Production, Preview, Development 모두에 추가
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://www.kpsylab.com
SESSION_SECRET=your-production-session-secret
```

### 4단계: 데이터 마이그레이션 (기존 데이터가 있는 경우)

**주의**: 기존 SQLite 데이터가 있다면 마이그레이션 스크립트 실행

```bash
# 환경 변수 설정 확인
cat .env.local

# 마이그레이션 스크립트 실행
cd apps/portal
node scripts/migrate-sqlite-to-supabase.js
```

마이그레이션되는 데이터:
- 사용자 계정 (`users`)
- 블로그 포스트 (`blog_posts`)
- 분석 데이터 (`visits`, `page_views`, `service_usage`)

### 5단계: 의존성 설치

```bash
cd apps/portal
npm install
```

새로운 패키지:
- `@supabase/supabase-js` - Supabase 클라이언트

제거된 패키지:
- `sqlite3` - 더 이상 필요 없음

### 6단계: 테스트

```bash
# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build
```

---

## 🔐 보안 설정

### Row Level Security (RLS)

Supabase 스키마에 RLS 정책이 포함되어 있습니다:
- 공개 데이터 (블로그, 게시판): 모든 사용자가 읽기 가능
- 사용자 데이터: 본인만 접근 가능
- 분석 데이터: 익명 로깅 지원

### API 키 보안

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 클라이언트에서 사용 가능 (RLS로 보호됨)
- 프로덕션에서는 Service Role Key를 절대 클라이언트에 노출하지 마세요

---

## 📊 데이터베이스 구조

### 주요 테이블

1. **users** - 사용자 계정
2. **blog_posts** - 블로그 포스트
3. **board_posts** - 게시판 게시글
4. **test_results** - 테스트 결과
5. **visits** - 방문 로그
6. **page_views** - 페이지 조회 통계
7. **service_usage** - 서비스 사용 통계

---

## 🚀 Vercel 배포

1. GitHub에 푸시:
   ```bash
   git add .
   git commit -m "Supabase 마이그레이션 완료"
   git push origin main
   ```

2. Vercel이 자동으로 빌드 및 배포
3. 환경 변수는 Vercel 대시보드에서 설정 필요

---

## ⚠️ 주의사항

1. **SQLite 파일 제거**: 더 이상 필요하지 않음
   - `data/*.db` 파일들은 삭제 가능
   - Git에 커밋하지 않도록 `.gitignore` 확인

2. **환경 변수**: 
   - `.env.local` 파일은 Git에 커밋하지 마세요
   - Vercel에서는 환경 변수를 대시보드에서 설정

3. **데이터 백업**: 
   - Supabase는 자동 백업을 제공하지만, 중요한 데이터는 별도 백업 권장

---

## 🔧 문제 해결

### 연결 오류
- Supabase URL과 키가 올바른지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 데이터 마이그레이션 실패
- SQLite 파일이 올바른 경로에 있는지 확인
- Supabase 스키마가 올바르게 생성되었는지 확인

### 빌드 오류
- `npm install` 다시 실행
- `.next` 폴더 삭제 후 다시 빌드

---

## 📝 다음 단계

- [ ] 기존 SQLite 데이터 마이그레이션 (필요시)
- [ ] Vercel 환경 변수 설정
- [ ] 프로덕션 배포 및 테스트
- [ ] 기존 SQLite 파일 정리

---

**마이그레이션 완료일**: 2024년

