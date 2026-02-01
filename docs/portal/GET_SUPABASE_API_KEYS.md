# 🔑 Supabase API 키 확인 방법

Supabase 프로젝트가 이미 생성되어 있다면, API 키를 다시 확인할 수 있습니다.

---

## 방법 1: 기존 Supabase 프로젝트에서 API 키 확인

### 1단계: Supabase 대시보드 접속
1. [https://supabase.com/dashboard](https://supabase.com/dashboard) 접속
2. GitHub 계정으로 로그인 (또는 이메일/비밀번호)

### 2단계: 프로젝트 선택
1. 대시보드에서 기존 프로젝트 선택
2. 프로젝트 이름이 기억나지 않으면, 목록에서 확인

### 3단계: API 키 확인
1. 왼쪽 사이드바에서 **Settings** (⚙️) 클릭
2. **API** 메뉴 클릭
3. 다음 정보 확인:

#### 필요한 키들:
- **Project URL**: 
  ```
  https://xxxxx.supabase.co
  ```
  이것이 `NEXT_PUBLIC_SUPABASE_URL` 값입니다.

- **anon public** 키:
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTI5MTE0MCwiZXhwIjoxOTMwODY3MTQwfQ.xxxxx
  ```
  이것이 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 값입니다.

### 4단계: 키 복사
1. 각 키 옆의 **복사 버튼** 클릭
2. 안전한 곳에 저장 (텍스트 파일 등)

---

## 방법 2: 새 Supabase 프로젝트 생성 (기존 프로젝트를 찾을 수 없는 경우)

### 1단계: 새 프로젝트 생성
1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `kpsylab-portal` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 입력 (복사해서 저장!)
   - **Region**: 가장 가까운 지역 선택 (예: Northeast Asia (Seoul))
4. **Create new project** 클릭
5. 프로젝트 생성 완료까지 대기 (약 2분)

### 2단계: 스키마 적용
1. 프로젝트 생성 완료 후, 왼쪽 사이드바에서 **SQL Editor** 클릭
2. **New query** 클릭
3. `apps/portal/lib/db/supabase-schema.sql` 파일 내용 복사
4. SQL Editor에 붙여넣기
5. **Run** 버튼 클릭 (또는 `Ctrl+Enter`)
6. 성공 메시지 확인

### 3단계: API 키 확인
1. **Settings** → **API** 메뉴로 이동
2. **Project URL**과 **anon public** 키 복사

---

## 📝 API 키 저장 위치

### 로컬 개발용 (.env.local)
프로젝트 루트(`apps/portal/`)에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ 주의**: `.env.local` 파일은 Git에 커밋하지 마세요!

### Vercel 배포용
Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서 추가:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

---

## 🔒 보안 참고사항

### anon 키는 안전한가요?
- **anon (public) 키**: 클라이언트에 노출되어도 안전합니다
  - Row Level Security (RLS)로 보호됩니다
  - 읽기 전용 작업에 사용됩니다
  
### 절대 노출하면 안 되는 키:
- **service_role 키**: 서버 사이드에서만 사용
- **Database Password**: 데이터베이스 접근용

---

## 📋 체크리스트

- [ ] Supabase 대시보드 접속
- [ ] 프로젝트 선택 또는 새로 생성
- [ ] Project URL 복사
- [ ] anon public 키 복사
- [ ] `.env.local` 파일에 저장 (로컬 개발용)
- [ ] Vercel 환경 변수에 추가 (배포용)

---

## ❓ 문제 해결

### 프로젝트를 찾을 수 없어요
- Supabase 대시보드에서 모든 프로젝트 확인
- 다른 조직(Organization)에 있을 수 있음
- 찾을 수 없으면 새 프로젝트 생성

### API 키가 작동하지 않아요
- 키가 정확히 복사되었는지 확인 (공백, 줄바꿈 없이)
- 프로젝트가 일시 정지되지 않았는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 스키마를 적용해야 하나요?
- **새 프로젝트**: 반드시 스키마 적용 필요
- **기존 프로젝트**: 테이블이 이미 있다면 스키마 적용 불필요

---

**API 키를 확인하셨다면, 다음 단계로 진행하세요!**

1. 로컬 개발: `.env.local` 파일 생성
2. 배포: Vercel 환경 변수 설정

