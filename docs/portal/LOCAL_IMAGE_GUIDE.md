# 로컬 이미지 사용 가이드

## 🎯 왜 로컬 이미지를 사용해야 하나요?

### 외부 URL 사용의 문제점
- ❌ **저작권 문제**: 외부 이미지 URL 사용 시 저작권 침해 위험
- ❌ **URL 변경/제거**: 외부 서비스의 URL이 변경되거나 이미지가 삭제될 수 있음
- ❌ **의존성**: 외부 서비스에 의존하여 안정성이 떨어짐
- ❌ **성능**: 외부 서버에서 이미지를 로드하므로 속도가 느릴 수 있음

### 로컬 이미지 사용의 장점
- ✅ **완전한 제어**: 이미지 파일을 직접 관리
- ✅ **안정성**: URL 변경이나 삭제 걱정 없음
- ✅ **성능**: 로컬 파일이므로 빠른 로딩
- ✅ **저작권**: 직접 제작하거나 라이선스를 확보한 이미지 사용 가능

---

## 📁 이미지 파일 구조

```
apps/portal/
  └── public/
      └── images/
          ├── dark-tetrad.png
          ├── machiavellianism.png
          ├── narcissism.png
          ├── psychopath-sociopath.png
          ├── digital-sadism.png
          ├── gaslighting.png
          ├── dark-triad-ceo.png
          ├── empathy-post-8.png  ✅ (이미 존재)
          ├── narcissist-relationship.png
          └── moral-licensing.png
```

---

## 🚀 사용 방법

### 1단계: 이미지 파일 준비

각 블로그 포스트에 맞는 이미지 파일을 준비하세요:

1. **이미지 소스**:
   - 직접 제작 (권장)
   - 무료 이미지 사이트에서 다운로드 (저작권 확인 필수)
     - Unsplash (무료, 상업적 사용 가능)
     - Pexels (무료, 상업적 사용 가능)
     - Pixabay (무료, 상업적 사용 가능)

2. **이미지 파일명 규칙**:
   - 소문자와 하이픈 사용 (예: `cold-empathy.png`)
   - 파일 확장자: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

3. **이미지 최적화**:
   - 권장 크기: 1200x630px (블로그 썸네일)
   - 파일 크기: 500KB 이하 권장
   - 형식: WebP (최신 브라우저) 또는 PNG/JPG

### 2단계: 이미지 파일 배치

이미지 파일을 `public/images/` 폴더에 복사하세요:

```bash
# 예시
cp ~/Downloads/cold-empathy.png c:\Projects\Pj-main\apps\portal\public\images\
```

### 3단계: 스크립트 실행

로컬 이미지 업데이트 스크립트를 실행하세요:

```bash
node scripts/update-blog-images-local.js
```

이 스크립트는:
- `public/images/` 폴더의 이미지 파일을 확인
- 각 포스트에 맞는 이미지 파일을 매핑
- Supabase에 로컬 경로 (`/images/filename.png`) 저장

### 4단계: 확인

로컬 개발 서버에서 확인:

```bash
npm run dev
```

브라우저에서 `http://localhost:7777/blog` 접속하여 이미지가 정상적으로 표시되는지 확인하세요.

---

## 📝 이미지 매핑 설정

`scripts/update-blog-images-local.js` 파일의 `imageMap` 객체를 수정하여 포스트와 이미지 파일을 매핑할 수 있습니다:

```javascript
const imageMap = {
  "포스트 제목": "이미지파일명.png",
  "공감 능력의 결여: 차가운 공감(Cold Empathy)": "empathy-post-8.png",
  // ...
};
```

---

## ⚠️ 주의사항

1. **저작권**: 
   - 모든 이미지는 저작권이 없는 것이거나 사용 권한을 확보한 것이어야 합니다.
   - Unsplash, Pexels 등의 무료 이미지도 사용 조건을 확인하세요.

2. **파일명**:
   - 파일명은 정확히 일치해야 합니다 (대소문자 구분)
   - 공백 대신 하이픈(`-`) 사용 권장

3. **파일 크기**:
   - 너무 큰 이미지는 로딩 속도를 느리게 합니다.
   - 이미지 최적화 도구 사용 권장

4. **Supabase UPDATE 정책**:
   - 이미지 업데이트를 위해서는 Supabase의 `UPDATE` RLS 정책이 필요합니다.
   - `lib/db/fix-blog-posts-update-rls.sql` 파일의 SQL을 실행하세요.

---

## 🔄 기존 외부 URL에서 로컬 이미지로 전환

현재 외부 Unsplash URL을 사용 중이라면:

1. 각 포스트에 맞는 이미지를 다운로드하거나 제작
2. `public/images/` 폴더에 저장
3. `update-blog-images-local.js` 스크립트 실행
4. Supabase의 이미지 경로가 `/images/filename.png` 형식으로 업데이트됨

---

## 📚 추가 리소스

- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Unsplash License](https://unsplash.com/license)
- [Pexels License](https://www.pexels.com/license/)
