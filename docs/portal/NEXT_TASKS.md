# 📋 다음 작업 가이드

**도메인 연결 완료 후 진행할 작업들**

---

## ✅ 완료된 작업

- [x] 도메인 연결 (`www.kpsylab.com`, `kpsylab.com`)
- [x] DNS 설정 및 전파 완료

---

## 🔄 다음 작업 (우선순위 순)

### 1️⃣ 블로그 데이터 추가 (우선)

**문제**: 블로그 글이 웹사이트에 표시되지 않음  
**원인**: Supabase `blog_posts` 테이블이 비어있음  
**해결**: 블로그 데이터 추가 스크립트 실행

#### 실행 방법

1. **환경 변수 확인**
   - `.env.local` 파일에 다음 변수가 설정되어 있는지 확인:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
     ```

2. **스크립트 실행**
   ```powershell
   cd c:\Projects\Pj-main\portal
   node scripts/populate-blog-supabase.js
   ```

3. **결과 확인**
   - 성공 시: "✅ X개의 블로그 포스트가 성공적으로 추가되었습니다!" 메시지
   - 실패 시: 오류 메시지 확인 및 해결

4. **웹사이트 확인**
   - `https://www.kpsylab.com` 접속
   - 블로그 글이 표시되는지 확인

---

### 2️⃣ Vercel 환경 변수 확인 및 설정

**목적**: 프로덕션 환경에서 모든 기능이 정상 작동하도록 환경 변수 설정

#### 필수 환경 변수 목록

Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**에서 확인:

| 변수명 | 설명 | 예시 값 |
|--------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 공개 키 | `eyJxxx...` |
| `SESSION_SECRET` | 세션 암호화 키 (32자 이상) | 랜덤 문자열 |
| `NEXT_PUBLIC_BASE_URL` | 프로덕션 도메인 | `https://www.kpsylab.com` |
| `NODE_ENV` | 환경 변수 (선택) | `production` |

#### 설정 방법

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - `kkimsspy` 프로젝트 선택

2. **Settings → Environment Variables**
   - 각 변수를 **Production**, **Preview**, **Development** 모두에 추가
   - **Add** 버튼으로 하나씩 추가

3. **SESSION_SECRET 생성** (없는 경우)
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Supabase 키 확인** (없는 경우)
   - Supabase 대시보드: https://supabase.com/dashboard
   - 프로젝트 선택 → **Settings** → **API**
   - Project URL과 anon public 키 복사

5. **설정 확인 후 재배포**
   - 환경 변수 추가 후 **Redeploy** 실행
   - 또는 새로운 커밋 푸시 시 자동 재배포

---

### 3️⃣ 추가 확인 사항

#### 3-1. Supabase 테이블 확인

1. Supabase 대시보드 → **Table Editor**
2. 다음 테이블들이 존재하는지 확인:
   - `blog_posts` ✅
   - `users` ✅
   - 기타 필요한 테이블들

3. **RLS (Row Level Security) 정책 확인**
   - `blog_posts` 테이블이 공개 읽기 허용인지 확인
   - 필요 시 `lib/db/supabase-schema.sql` 참조

#### 3-2. 웹사이트 기능 테스트

다음 기능들이 정상 작동하는지 확인:

- [ ] 홈페이지 로드 (`https://www.kpsylab.com`)
- [ ] 블로그 글 목록 표시
- [ ] 블로그 글 상세 페이지
- [ ] 로그인 기능 (있는 경우)
- [ ] 기타 주요 기능

#### 3-3. SSL 인증서 확인

- `https://www.kpsylab.com` 접속 시 자물쇠 아이콘 표시 확인
- Vercel이 자동으로 SSL 인증서를 발급하므로 별도 설정 불필요

---

## 🎯 권장 실행 순서

1. **블로그 데이터 추가** (5분)
   - 가장 빠르게 해결 가능
   - 즉시 웹사이트에 반영됨

2. **Vercel 환경 변수 확인** (10분)
   - 프로덕션 환경 안정성 확보
   - 모든 기능 정상 작동 보장

3. **전체 기능 테스트** (10분)
   - 모든 페이지 및 기능 확인
   - 문제 발견 시 즉시 해결

---

## 🆘 문제 해결

### 블로그 데이터 추가 실패 시

**오류**: "테이블 확인 실패"
- 해결: Supabase 대시보드에서 `blog_posts` 테이블이 생성되었는지 확인
- 필요 시 `lib/db/supabase-schema.sql` 파일의 내용을 Supabase SQL Editor에서 실행

**오류**: "환경 변수가 설정되지 않았습니다"
- 해결: `.env.local` 파일에 Supabase 환경 변수 추가

### Vercel 환경 변수 문제

**오류**: 빌드는 성공하지만 기능이 작동하지 않음
- 해결: Vercel 대시보드에서 환경 변수가 올바르게 설정되었는지 확인
- Production, Preview, Development 모두에 설정되어 있는지 확인

---

## 📞 완료 체크리스트

- [ ] 블로그 데이터 추가 완료
- [ ] Vercel 환경 변수 설정 완료
- [ ] 웹사이트 기능 테스트 완료
- [ ] SSL 인증서 확인 완료
- [ ] 모든 페이지 정상 작동 확인

---

**다음 작업 시작**: 블로그 데이터 추가부터 진행하세요! 🚀
