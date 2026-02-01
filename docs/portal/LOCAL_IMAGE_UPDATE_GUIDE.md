# 🖼️ 로컬에서 이미지 업데이트 및 확인 가이드

**블로그 포스트 이미지 업데이트 워크플로우**

---

## 📋 현재 상태

- ✅ 모든 포스트에 이미지 URL이 설정되어 있음 (10개)
- ⚠️ 일부 포스트의 이미지 URL이 이전 값으로 남아 있음
  - ID 3: "현대 사회의 마키아벨리즘" 
  - ID 9: "공감 능력의 결여: 차가운 공감"

---

## 🔧 로컬에서 업데이트 및 확인 절차

### Step 1: Supabase UPDATE 정책 추가 (필수)

**이 작업은 한 번만 하면 됩니다.**

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 왼쪽 메뉴 → **SQL Editor**
   - **New query** 클릭

3. **UPDATE 정책 추가**
   ```sql
   -- blog_posts 테이블에 UPDATE 권한 추가
   CREATE POLICY "Public update access" ON blog_posts 
     FOR UPDATE USING (true) WITH CHECK (true);
   ```

4. **Run** 클릭하여 실행
   - "Success. No rows returned" 메시지 확인

---

### Step 2: 로컬에서 이미지 업데이트

1. **이미지 업데이트 스크립트 실행**
   ```powershell
   cd c:\Projects\Pj-main\apps\portal
   node scripts/update-blog-images.js
   ```

2. **결과 확인**
   - 업데이트된 포스트 목록 확인
   - 오류가 없는지 확인

---

### Step 3: 로컬 개발 서버에서 확인

1. **로컬 개발 서버 실행**
   ```powershell
   cd c:\Projects\Pj-main\apps\portal
   npm run dev
   ```

2. **브라우저에서 확인**
   - http://localhost:7777 접속
   - 홈페이지에서 블로그 포스트 이미지 확인
   - `/blog` 페이지에서 모든 포스트 이미지 확인
   - 각 포스트 상세 페이지에서 이미지 확인

3. **확인 사항**
   - ✅ 모든 포스트에 이미지가 표시되는지
   - ✅ 이미지가 깨지지 않고 정상 로드되는지
   - ✅ 이미지가 포스트 내용과 적절한지

---

### Step 4: 문제 해결 (필요 시)

**이미지가 표시되지 않는 경우:**

1. **브라우저 개발자 도구 확인**
   - F12 → Console 탭
   - 이미지 로드 오류 확인

2. **이미지 URL 유효성 확인**
   ```powershell
   node scripts/check-blog-images.js
   ```

3. **캐시 문제**
   - 브라우저 강력 새로고침 (Ctrl + Shift + R)
   - 또는 시크릿 모드에서 확인

---

### Step 5: 프로덕션에 반영

**로컬에서 확인 완료 후:**

1. **자동 반영됨**
   - Supabase는 로컬과 프로덕션이 같은 데이터베이스를 사용
   - 로컬에서 업데이트하면 프로덕션에도 즉시 반영됨

2. **프로덕션 확인**
   - https://www.kpsylab.com 접속
   - 블로그 포스트 이미지 확인
   - 문제없으면 완료!

---

## 📝 참고 파일

- `scripts/update-blog-images.js` - 이미지 업데이트 스크립트
- `scripts/check-blog-images.js` - 이미지 상태 확인 스크립트
- `lib/db/fix-blog-posts-update-rls.sql` - UPDATE 정책 SQL

---

## ⚠️ 주의사항

1. **UPDATE 정책은 한 번만 추가하면 됩니다**
   - 이미 추가했다면 Step 1은 건너뛰세요

2. **로컬과 프로덕션은 같은 Supabase 사용**
   - 로컬에서 업데이트하면 프로덕션에도 즉시 반영됨
   - 주의해서 업데이트하세요

3. **이미지 URL은 Unsplash 사용**
   - 모든 이미지는 Unsplash에서 제공
   - URL이 유효한지 확인 필요

---

**다음 단계**: Step 1부터 순서대로 진행하세요! 🚀
