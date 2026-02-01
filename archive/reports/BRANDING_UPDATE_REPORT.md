# KPSY LAB 브랜딩 업데이트 보고서

**작업 일시**: 2026-01-06  
**작업 내용**: Portal 임시명을 KPSY LAB 브랜드로 전면 교체

---

## ✅ 완료된 작업

### 1. 메인 페이지 브랜딩
- ✅ **타이틀 변경**: `PORTAL` → `KPSY LAB`
- ✅ **서브타이틀 변경**: "심리 분석 서비스 통합 포털" → "심리 분석 서비스 통합 플랫폼"
- **파일**: `portal/app/page.tsx`

### 2. 메타데이터 업데이트
- ✅ **메인 레이아웃 메타데이터** (`portal/app/layout.tsx`)
  - Title: "KPSY LAB - 심리 분석 서비스 통합 플랫폼"
  - Description 업데이트
  - 도메인 정보 추가: `www.kpsylab.com`
  - Open Graph 메타데이터 추가
  - Twitter 카드 메타데이터 추가
  - Canonical URL 설정

- ✅ **MNPS 레이아웃 메타데이터** (`portal/app/mnps/layout.tsx`)
  - Title: "MNPS - KPSY LAB"
  - Description 업데이트

### 3. 네비게이션 컴포넌트
- ✅ **로고/브랜드명 변경**: `PORTAL` → `KPSY LAB`
- **파일**: `portal/components/Navigation.tsx`

### 4. 설정 파일
- ✅ **Next.js 설정** (`portal/next.config.ts`)
  - 도메인 환경 변수 추가
  - 이미지 도메인 설정 추가

- ✅ **robots.txt 생성**
  - 사이트맵 URL 설정: `https://www.kpsylab.com/sitemap.xml`

### 5. 문서 업데이트
- ✅ **PORTAL_README.md**
  - 브랜드명 변경
  - 도메인 정보 추가
  - 접속 URL 업데이트

- ✅ **PROJECT_INTEGRATION_STRATEGY.md**
  - 전체 문서에서 Portal → KPSY LAB으로 변경
  - 도메인 정보 반영

---

## 📋 변경 사항 요약

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| **브랜드명** | Portal | **KPSY LAB** |
| **도메인** | localhost:3000/7777 | **www.kpsylab.com** |
| **메인 타이틀** | PORTAL | **KPSY LAB** |
| **서브타이틀** | 심리 분석 서비스 통합 포털 | **심리 분석 서비스 통합 플랫폼** |
| **메타 타이틀** | 심리학 서비스 포털 | **KPSY LAB - 심리 분석 서비스 통합 플랫폼** |

---

## 🌐 SEO 및 메타데이터

### 추가된 메타데이터
- Open Graph 태그 (소셜 미디어 공유 최적화)
- Twitter 카드 메타데이터
- Canonical URL 설정
- 키워드 메타데이터
- Author 정보

### 도메인 설정
- 프로덕션 도메인: `https://www.kpsylab.com`
- 개발 환경: `http://localhost:7777`

---

## 📁 수정된 파일 목록

1. `portal/app/page.tsx` - 메인 페이지 타이틀
2. `portal/app/layout.tsx` - 메타데이터
3. `portal/app/mnps/layout.tsx` - MNPS 메타데이터
4. `portal/components/Navigation.tsx` - 네비게이션 브랜드명
5. `portal/next.config.ts` - 도메인 설정
6. `portal/app/robots.txt` - 새로 생성
7. `PORTAL_README.md` - 문서 업데이트
8. `PROJECT_INTEGRATION_STRATEGY.md` - 문서 업데이트

---

## 🔄 다음 단계 권장 사항

1. **파비콘 업데이트**: KPSY LAB 브랜드에 맞는 파비콘 생성
2. **로고 이미지**: 네비게이션에 실제 로고 이미지 추가
3. **사이트맵 생성**: `/sitemap.xml` 파일 생성
4. **프로덕션 배포**: www.kpsylab.com 도메인에 배포
5. **SSL 인증서**: HTTPS 설정 확인
6. **검색 엔진 등록**: Google Search Console, Naver Webmaster 등록

---

**브랜딩 작업이 완료되었습니다.** 🎉

모든 사용자 노출 영역에서 Portal이 KPSY LAB으로 변경되었으며, 도메인 정보가 반영되었습니다.

