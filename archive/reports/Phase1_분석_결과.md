# Phase 1: 현재 상태 분석 결과

**작성일**: 2025-01-27  
**작업 단계**: Phase 1 - 현재 상태 정리 및 분석

---

## 1.1 현재 코드베이스 상세 분석

### 1.1.1 mnps-service 블로그 기능 분석

#### 위치 및 구조
- **폴더**: `mnps/mnps-service/blog/`
- **서버 파일**: `mnps/mnps-service/server.js` (48-114줄)
- **데이터베이스**: SQLite (`blog.db`)

#### 데이터베이스 스키마
```sql
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    date TEXT,
    tags TEXT,
    image TEXT
)
```

#### API 엔드포인트
- `GET /api/blog/posts` - 모든 게시글 조회 (검색 쿼리 지원: `?q=검색어`)
- `GET /api/blog/posts/:id` - 단일 게시글 조회
- `POST /api/blog/posts` - 게시글 작성
- `DELETE /api/blog/posts/:id` - 게시글 삭제

#### 프론트엔드 페이지
- `blog/index.html` - 블로그 목록 페이지
- `blog/article.html` - 블로그 상세 페이지
- `blog/write.html` - 블로그 작성 페이지

#### 정적 리소스
- `blog/assets/css/blog.css` - 블로그 스타일
- `blog/assets/images/` - 블로그 이미지 (20개)
- `blog/txt/` - 텍스트 파일 (10개)

#### 특징
- Express 서버에 직접 구현됨 (라우터 분리 안 됨)
- SQLite 데이터베이스 사용
- 검색 기능 포함
- 이미지 업로드 지원 (URL 형태)

---

### 1.1.2 게시판 기능 존재 여부 확인

#### 결과: 게시판 기능 없음 ✅

현재 프로젝트에는 일반 게시판 기능이 구현되어 있지 않습니다.
- `mnps-service`에는 게시판 관련 코드 없음
- `dark-nature-web`에도 일반 게시판 없음
- **문의 게시판만 존재** (별도 섹션 참조)

#### 결론
- Phase 5에서 **새로 구현**해야 함
- Next.js API Routes 사용 예정
- SQLite 데이터베이스 사용

---

### 1.1.3 문의 게시판 기능 확인

#### 위치
- **프론트엔드**: `mnps/dark-nature-web/app/contact/page.tsx`
- **API**: `mnps/dark-nature-web/app/api/inquiries/route.ts`
- **데이터 저장**: `mnps/dark-nature-web/data/inquiries.json` (JSON 파일)

#### 데이터 구조
```typescript
interface Inquiry {
    id: string;              // 랜덤 ID (Math.random().toString(36).substring(2, 9))
    content: string;         // 문의 내용
    email?: string;          // 이메일 (선택사항, 답변 알림용)
    createdAt: string;       // ISO 날짜 문자열
    answer?: string;         // 관리자 답변 (선택사항)
}
```

#### 기능
- ✅ 익명 문의 작성
- ✅ 이메일 입력 (선택사항)
- ✅ 문의 목록 조회
- ✅ 내 문의 필터링 (localStorage 기반)
- ✅ 관리자 답변 표시
- ❌ 문의 수정/삭제 기능 없음

#### API
- `GET /api/inquiries` - 모든 문의 조회
- `POST /api/inquiries` - 문의 작성

#### 특징
- Next.js API Route 사용
- JSON 파일 기반 저장 (데이터베이스 없음)
- 다국어 지원 (`LanguageProvider` 사용)
- localStorage로 "내 문의" 추적

#### 마이그레이션 계획
- `portal/app/contact/page.tsx`로 포팅
- API는 `portal/app/api/inquiries/route.ts`로 이동
- 데이터는 JSON 파일 유지 또는 SQLite로 전환 (선택사항)

---

### 1.1.4 Second Genesis 완성본 확인

#### 위치
- **소스 코드**: `Second Genesis/Strategic_Pivot/src/`
- **포털 연결**: `portal/app/second-genesis/`

#### 기술 스택
- Next.js 16.1.1
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4

#### 구조
```
portal/app/second-genesis/
├── page.tsx                  # 메인 페이지 (모듈 선택)
├── module1/                  # 모듈 1: 성장 저해 요인
├── module2/                  # 모듈 2: 현 상태 분석
├── assessment/               # 모듈 3: 이상향 및 잠재력
├── report/                   # 최종 리포트
├── components/               # 컴포넌트
├── lib/                      # 라이브러리 및 엔진
└── data/                     # 데이터
```

#### 상태
- ✅ **완성본 존재**
- ✅ 포털에 이미 연결됨
- ✅ 모든 모듈 구현 완료
- ✅ 최종 리포트 기능 포함

#### 결론
- **추가 작업 불필요**
- Phase 8에서 연결 상태만 확인하면 됨

---

### 1.1.5 각 서비스의 데이터베이스 구조 파악

#### 1) MNPS 서비스 (`mnps-service`)

**데이터베이스**: SQLite (`mnps_sqlite.db`)

##### Users 테이블
```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT,
    referral_code TEXT UNIQUE,
    referred_by TEXT,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

##### Results 테이블
```sql
CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    score_m INTEGER,              -- Machiavellianism
    score_n INTEGER,              -- Narcissism
    score_p INTEGER,              -- Psychopathy
    score_s INTEGER,              -- Sadism
    sub_scores TEXT,              -- JSON 문자열
    is_paid INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
)
```

**특징**:
- SQLite 사용 (MySQL도 지원 가능, mysql_client.js 참조)
- 회원 시스템 포함
- 추천인 코드 시스템
- 포인트 시스템

#### 2) 블로그 (`mnps-service`)

**데이터베이스**: SQLite (`blog.db`)

##### Posts 테이블
```sql
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    date TEXT,
    tags TEXT,
    image TEXT
)
```

**특징**:
- 별도 데이터베이스 파일
- 날짜는 TEXT 형식 (ISO 문자열)
- 태그는 TEXT 형식 (구분자 불명확)

#### 3) 문의 게시판 (`dark-nature-web`)

**데이터 저장**: JSON 파일 (`data/inquiries.json`)

```json
[
  {
    "id": "string",
    "content": "string",
    "email": "string (optional)",
    "createdAt": "ISO string",
    "answer": "string (optional)"
  }
]
```

**특징**:
- 데이터베이스 없음 (JSON 파일)
- 파일 기반 저장
- 단순한 구조

#### 4) Second Genesis

**데이터 저장**: localStorage (클라이언트 사이드)

- `sg_module1_result` - 모듈 1 결과
- `sg_module2_result` - 모듈 2 결과
- `sg_module3_result` - 모듈 3 결과

**특징**:
- 서버 사이드 데이터베이스 없음
- 클라이언트 사이드만 저장
- 분석 엔진은 서버 사이드에서 실행 (Next.js API Routes)

---

## 1.2 의존성 및 기술 스택 정리

### 1.2.1 Portal (메인 포털)

**위치**: `portal/`

**기술 스택**:
- **프레임워크**: Next.js 16.1.1 (App Router)
- **언어**: TypeScript 5
- **UI 라이브러리**: React 19.2.3
- **스타일링**: Tailwind CSS 4
- **아이콘**: lucide-react 0.562.0
- **애니메이션**: framer-motion 12.23.26
- **차트**: recharts 3.6.0

**현재 상태**:
- ✅ 기본 구조 존재
- ✅ 레이아웃 및 네비게이션 기본 구현
- ⚠️ 메인 페이지 단순 (MNPS, Second Genesis 카드만)
- ❌ 서비스 소개 페이지 없음
- ❌ 블로그/게시판/문의 페이지 없음

---

### 1.2.2 MNPS Service

**위치**: `mnps/mnps-service/`

**기술 스택**:
- **런타임**: Node.js
- **프레임워크**: Express 4.18.2
- **언어**: JavaScript (CommonJS)
- **데이터베이스**: 
  - SQLite3 5.1.7 (메인)
  - MySQL2 3.15.3 (선택사항)
- **인증**: express-session 1.18.2, bcryptjs 3.0.3
- **기타**: 
  - body-parser 1.20.2
  - compression 1.8.1
  - dotenv 17.2.3

**현재 상태**:
- ✅ MNPS 테스트 기능 완성
- ✅ 인증 시스템 완성
- ✅ 블로그 기능 포함 (분리 필요)
- ✅ 관리자 대시보드 포함
- ⚠️ 블로그가 서비스와 결합되어 있음

---

### 1.2.3 Second Genesis

**위치**: `Second Genesis/Strategic_Pivot/`

**기술 스택**:
- **프레임워크**: Next.js 16.1.1 (App Router)
- **언어**: TypeScript 5
- **UI 라이브러리**: React 19.2.3
- **스타일링**: Tailwind CSS 4
- **아이콘**: lucide-react 0.562.0
- **애니메이션**: framer-motion 12.23.26
- **차트**: recharts 3.6.0

**현재 상태**:
- ✅ 완성본
- ✅ 포털에 연결됨
- ✅ 모든 모듈 구현 완료

---

### 1.2.4 Dark Nature Web (참고용)

**위치**: `mnps/dark-nature-web/`

**기술 스택**:
- Next.js
- TypeScript
- React
- Tailwind CSS

**현재 상태**:
- ✅ 문의 게시판 구현됨
- ⚠️ 이 프로젝트는 참고용 (portal로 마이그레이션 예정)

---

## 📊 종합 분석 요약

### 현재 문제점
1. ✅ **블로그가 mnps-service에 결합되어 있음** → 분리 필요
2. ✅ **게시판 기능 없음** → 새로 구현 필요
3. ✅ **문의 게시판이 dark-nature-web에 있음** → portal로 마이그레이션 필요
4. ✅ **메인 포털 기능 부족** → 확장 필요
5. ✅ **서비스 소개 페이지 없음** → 새로 구현 필요

### 데이터베이스 현황
- **MNPS**: SQLite (users, results)
- **블로그**: SQLite (posts) - 별도 파일
- **문의**: JSON 파일
- **Second Genesis**: localStorage (클라이언트 사이드)

### 마이그레이션 전략
1. **블로그**: SQLite → JSON 또는 SQLite 유지 (portal에서 접근)
2. **문의 게시판**: JSON 파일 유지 또는 SQLite로 전환
3. **게시판**: SQLite로 새로 구현

---

## ✅ Phase 1 완료 체크리스트

- [x] `mnps-service`의 블로그 기능 코드 분석
- [x] 게시판 기능 존재 여부 확인
- [x] 문의 게시판 기능 확인
- [x] Second Genesis 완성본 확인
- [x] 각 서비스의 데이터베이스 구조 파악
- [x] 의존성 및 기술 스택 정리

---

## 📝 다음 단계 (Phase 2)

Phase 1 분석이 완료되었습니다. 다음 단계로 **Phase 2: 포털 메인 페이지 구축**을 진행합니다.

**Phase 2 주요 작업**:
1. 메인 페이지 확장 (모든 서비스 링크)
2. 공통 레이아웃 개선 (네비게이션 메뉴)
3. 반응형 디자인 적용

---

**작성 완료**: 2025-01-27



