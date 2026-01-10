# 📡 API Routes 가이드

**Next.js App Router + Vercel = 자동 API 엔드포인트**

---

## 🎯 작동 원리

### Next.js App Router 구조

```
portal/app/api/
├── result/route.ts          → https://kpsylab.com/api/result
├── auth/login/route.ts      → https://kpsylab.com/api/auth/login
├── blog/posts/route.ts      → https://kpsylab.com/api/blog/posts
└── keepalive/route.ts       → https://kpsylab.com/api/keepalive
```

**규칙**:
- `app/api/` 폴더 안에 `route.ts` (또는 `route.js`) 파일을 만들면
- 자동으로 `/api/[폴더명]` 주소가 생성됨
- Vercel에 배포하면 바로 작동!

---

## 📋 현재 설정된 API 엔드포인트

### 인증 API
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

### 블로그 API
- `GET /api/blog/posts` - 블로그 포스트 목록
- `GET /api/blog/posts/[id]` - 특정 포스트 조회

### 게시판 API
- `GET /api/board/posts` - 게시글 목록
- `POST /api/board/posts` - 게시글 작성
- `GET /api/board/posts/[id]` - 게시글 조회

### 관리자 API
- `GET /api/admin/stats` - 통계 정보
- `GET /api/admin/analytics` - 분석 데이터

### 분석 API
- `POST /api/analytics/track` - 방문 추적

### 유틸리티 API
- `GET /api/keepalive` - Supabase Keep-Alive
- `GET /api/docs` - API 문서

---

## 🆕 새 API 엔드포인트 만들기

### 예시: 테스트 결과 계산 API

#### 1. 폴더 및 파일 생성

```
portal/app/api/result/route.ts
```

#### 2. 기본 구조

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// POST 요청 처리
export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { answers } = body;

    // 점수 계산 로직
    const scores = calculateScores(answers);

    // 결과 저장 (선택사항)
    if (body.userId) {
      await saveResult(body.userId, scores);
    }

    // 결과 반환
    return NextResponse.json({
      success: true,
      scores,
      result: analyzeScores(scores),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (선택사항)
export async function GET() {
  return NextResponse.json({
    message: 'Result API - Use POST to submit answers',
  });
}

// 점수 계산 함수
function calculateScores(answers: any[]) {
  // 계산 로직
  return {
    m: 0, // Machiavellianism
    n: 0, // Narcissism
    p: 0, // Psychopathy
    s: 0, // Sadism
  };
}

// 결과 분석 함수
function analyzeScores(scores: any) {
  // 분석 로직
  return {
    interpretation: '...',
    recommendations: [],
  };
}

// 결과 저장 함수
async function saveResult(userId: number, scores: any) {
  if (!supabase) return;
  
  await supabase.from('test_results').insert({
    user_id: userId,
    test_type: 'mnps',
    test_data: scores,
  });
}
```

#### 3. 배포

```bash
git add .
git commit -m "Add result calculation API"
git push origin main
```

자동으로 `https://kpsylab.com/api/result` 주소가 생성됩니다!

---

## 🎨 API 엔드포인트 사용 예시

### 프론트엔드에서 호출

```typescript
// 클라이언트 컴포넌트에서
async function submitAnswers(answers: any[]) {
  const response = await fetch('/api/result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answers,
      userId: currentUser?.id, // 선택사항
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log('점수:', data.scores);
    console.log('결과:', data.result);
  }
}
```

---

## 📝 API 라우트 템플릿

### 기본 GET API

```typescript
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 로직 구현
    return NextResponse.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### 기본 POST API

```typescript
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 로직 구현
    return NextResponse.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 🔐 인증이 필요한 API

```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 세션 확인
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 사용자 확인 로직
    // ...

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 🌐 동적 라우트 (예: [id])

```
app/api/posts/[id]/route.ts
```

```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // id 사용
}
```

접근: `GET /api/posts/123` → `id = "123"`

---

## ✅ 체크리스트

새 API를 만들 때:

- [ ] `app/api/[폴더명]/route.ts` 파일 생성
- [ ] HTTP 메서드 함수 구현 (GET, POST, PUT, DELETE 등)
- [ ] `export const dynamic = 'force-dynamic'` 추가 (데이터가 동적일 때)
- [ ] 에러 처리 추가
- [ ] 타입 정의 (TypeScript)
- [ ] 테스트
- [ ] 배포

---

## 📚 참고

- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Vercel Serverless Functions**: 자동으로 지원됨
- 현재 프로젝트는 `app/api/` 구조 사용 중

---

**새 API를 추가하고 싶으시면 말씀해주세요!** 🚀

