# Vercel 프로젝트 설정 가이드

## 문제 상황
- 같은 GitHub 저장소(`suchulkim21/mnps-test`)가 3개의 Vercel 프로젝트로 연결됨
- 메인 프로젝트(`mnps-test-3aj4`)에 경고 표시 및 옛날 페이지가 계속 표시됨

## 해결 방법

### 1. 메인 프로젝트 (mnps-test-3aj4) 설정 확인

Vercel 대시보드에서 다음을 확인:

1. **프로젝트 설정 → General → Root Directory**
   - 현재 설정: (비어있거나 잘못된 경로)
   - 올바른 설정: `mnps/dark-nature-web` (또는 저장소 루트 기준 상대 경로)
   
2. **프로젝트 설정 → Build & Development Settings**
   - Build Command: `npm run build` (또는 자동 감지)
   - Output Directory: `.next` (자동 감지됨)
   - Install Command: `npm install` (자동 감지됨)

3. **프로젝트 설정 → Domains**
   - 메인 도메인: `kpsylab.com`
   - 이 도메인이 올바른 배포에 연결되어 있는지 확인

### 2. 다른 프로젝트 정리

**크스필람 (kspylam)** 및 **mnps-테스트 (mnps-test)** 프로젝트:
- 이 프로젝트들이 필요한지 확인
- 불필요하다면 삭제하거나 비활성화
- 필요하다면 각각 다른 목적(예: 스테이징, 개발 환경)으로 사용

### 3. Root Directory 설정 방법

Vercel 대시보드에서:

1. 프로젝트 선택 (`mnps-test-3aj4`)
2. Settings → General
3. "Root Directory" 섹션 찾기
4. `mnps/dark-nature-web` 입력 (저장소 루트 기준)
5. Save

**주의**: 
- 저장소 루트가 `mnps/dark-nature-web`이 아니라면, 실제 Next.js 프로젝트가 있는 상대 경로를 입력해야 합니다.
- Git 저장소 루트 기준의 상대 경로를 사용합니다.

### 4. 배포 재시도

설정 변경 후:
1. 최신 커밋으로 재배포 트리거
2. 배포 로그 확인하여 빌드 성공 여부 확인
3. 배포가 성공하면 도메인에서 변경사항 확인

### 5. 확인 사항

배포 후 확인:
- [ ] 빌드가 성공했는지 확인 (Build Logs)
- [ ] 올바른 디렉토리에서 빌드가 실행되었는지 확인
- [ ] `kpsylab.com` 도메인에서 새로운 페이지가 표시되는지 확인
- [ ] 브라우저 캐시 클리어 후 재확인

## 현재 프로젝트 구조

```
저장소 루트 (suchulkim21/mnps-test)
├── mnps/
│   └── dark-nature-web/    ← 실제 Next.js 프로젝트
│       ├── app/
│       ├── components/
│       ├── package.json
│       └── next.config.ts
└── (기타 파일들)
```

**Root Directory 설정**: `mnps/dark-nature-web`

## 추가 문제 해결

만약 Root Directory 설정 후에도 문제가 발생하면:

1. **빌드 로그 확인**
   - Vercel 대시보드 → Deployments → 최신 배포 → Build Logs
   - 오류 메시지 확인

2. **환경 변수 확인**
   - Settings → Environment Variables
   - 필요한 환경 변수가 설정되어 있는지 확인

3. **package.json 확인**
   - 빌드 스크립트가 올바른지 확인
   - 의존성이 올바르게 정의되어 있는지 확인
