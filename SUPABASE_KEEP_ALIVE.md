# 🔄 Supabase 프로젝트 유지 전략

Supabase 무료 플랜에서는 7일 이상 비활성화되면 프로젝트가 일시 정지될 수 있습니다.
이 문서는 프로젝트를 활성 상태로 유지하는 방법을 설명합니다.

---

## ⚠️ Supabase 무료 플랜 제한사항

- **비활성 기간**: 7일 이상 비활성화 → 프로젝트 일시 정지
- **일시 정지 후**: API 요청 시 자동 재개 (몇 초 소요)
- **영구 삭제**: 60일 이상 일시 정지 상태 → 영구 삭제

---

## 💡 프로젝트 유지 방법

### 방법 1: 정기적인 API 호출 (권장)

Vercel에 Cron Job을 설정하여 주기적으로 API를 호출합니다.

#### Vercel Cron 설정

`vercel.json` 파일 생성:

```json
{
  "crons": [
    {
      "path": "/api/keepalive",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

#### Keep-Alive API 엔드포인트 생성

`portal/app/api/keepalive/route.ts` 파일 생성:

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // 빠른 응답을 위해

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // 간단한 쿼리로 Supabase 연결 확인
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = 테이블 없음 (정상, 초기 상태일 수 있음)
      console.error('Keep-alive check failed:', error.message);
      return NextResponse.json(
        { 
          status: 'error', 
          message: error.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase is alive',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
```

**동작 방식**:
- 6시간마다 자동으로 `/api/keepalive` 엔드포인트 호출
- Supabase에 간단한 쿼리 실행
- 프로젝트 활성 상태 유지

---

### 방법 2: 외부 Cron 서비스 사용

Vercel Cron이 지원되지 않거나, 더 세밀한 제어가 필요한 경우:

#### cron-job.org 사용

1. [cron-job.org](https://cron-job.org) 가입 (무료)
2. 새 Cron Job 생성:
   - **URL**: `https://www.kpsylab.com/api/keepalive`
   - **Schedule**: `0 */6 * * *` (6시간마다)
   - **Request Method**: GET
3. 저장 및 활성화

#### GitHub Actions 사용

`.github/workflows/keepalive.yml` 파일 생성:

```yaml
name: Supabase Keep-Alive

on:
  schedule:
    - cron: '0 */6 * * *'  # 6시간마다
  workflow_dispatch:  # 수동 실행 가능

jobs:
  keepalive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -X GET https://www.kpsylab.com/api/keepalive
```

---

### 방법 3: 실제 사용 트래픽 활용

웹사이트가 정기적으로 사용된다면 자동으로 활성 상태가 유지됩니다:
- 방문자 접속
- 블로그 글 조회
- API 호출

---

## 🔧 구현 방법 (권장: 방법 1)

### Step 1: Keep-Alive API 생성

`portal/app/api/keepalive/route.ts` 파일을 생성합니다.

### Step 2: Vercel Cron 설정

프로젝트 루트에 `vercel.json` 파일 생성:

```json
{
  "crons": [
    {
      "path": "/api/keepalive",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Cron 스케줄 옵션**:
- `0 */6 * * *` - 6시간마다 (권장)
- `0 */12 * * *` - 12시간마다
- `0 * * * *` - 1시간마다
- `0 0 * * *` - 매일 자정

### Step 3: 배포

```bash
git add .
git commit -m "Add Supabase keep-alive endpoint"
git push origin main
```

Vercel이 자동으로 배포하고 Cron Job을 설정합니다.

---

## 📊 모니터링

### Keep-Alive 상태 확인

브라우저에서 직접 접속:
```
https://www.kpsylab.com/api/keepalive
```

성공 응답:
```json
{
  "status": "ok",
  "message": "Supabase is alive",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Vercel Cron 로그 확인

1. Vercel 대시보드 접속
2. 프로젝트 → **Deployments** 탭
3. Cron Job 실행 로그 확인

---

## ⚙️ 고급 옵션

### 더 복잡한 Keep-Alive (실제 작업 수행)

```typescript
// portal/app/api/keepalive/route.ts
export async function GET() {
  try {
    // 실제로 의미 있는 작업 수행
    const { data } = await supabase
      .from('visits')
      .select('count')
      .limit(1);

    // 또는 분석 데이터 집계 등
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // ...
  }
}
```

---

## 🎯 권장 설정

### 최소 설정
- **Cron 주기**: 12시간마다 (`0 */12 * * *`)
- **엔드포인트**: `/api/keepalive`
- **쿼리**: 간단한 SELECT 쿼리

### 보수적 설정
- **Cron 주기**: 6시간마다 (`0 */6 * * *`)
- **엔드포인트**: `/api/keepalive`
- **쿼리**: 간단한 SELECT 쿼리

---

## ❓ FAQ

### Q: Cron Job을 설정하지 않으면 어떻게 되나요?
A: 7일 이상 비활성화되면 프로젝트가 일시 정지됩니다. 다시 요청이 오면 자동으로 재개됩니다.

### Q: 프로젝트가 일시 정지된 상태에서 접속하면?
A: 첫 요청이 약간 느릴 수 있지만 (몇 초), 자동으로 재개됩니다.

### Q: 무료 플랜 제한을 피하려면?
A: Supabase Pro 플랜 ($25/월)으로 업그레이드하면 제한이 없습니다.

### Q: 데이터는 안전한가요?
A: 네, 일시 정지되어도 데이터는 보존됩니다. 60일 이상 일시 정지 상태일 때만 삭제됩니다.

---

## 📝 체크리스트

- [ ] Keep-Alive API 엔드포인트 생성 (`/api/keepalive`)
- [ ] `vercel.json` 파일에 Cron 설정 추가
- [ ] GitHub에 푸시 및 배포
- [ ] Vercel에서 Cron Job 확인
- [ ] 수동으로 엔드포인트 호출하여 테스트
- [ ] 6시간 후 자동 실행 확인

---

**이 설정으로 프로젝트가 계속 활성 상태로 유지됩니다!** 🚀

