# 디스크 용량 정리 보고서

**분석 일시**: 2026-01-06  
**현재 총 용량**: 약 3.3GB (mnps 1.4GB + Second Genesis 0.98GB + node_modules 0.45GB + portal 0.41GB)

---

## 📊 용량 분석 결과

### 큰 폴더 순위
1. **mnps** - 1.4GB
2. **Second Genesis** - 0.98GB
3. **루트 node_modules** - 0.45GB
4. **portal** - 0.41GB

### 용량을 많이 차지하는 항목

#### 1. node_modules (여러 프로젝트에 분산)
- 루트 `node_modules`: 0.45GB
- `mnps/node_modules`: 있음
- `Second Genesis/Strategic_Pivot/node_modules`: 있음
- `portal/node_modules`: 있음
- `mnps/dark-nature-web/node_modules`: 있음
- `mnps/mnps-service/node_modules`: 있음
- `mnps/_LEGACY/node_modules`: 있음

**추정 총 용량**: 약 2-3GB 이상

#### 2. Next.js 빌드 아티팩트 (.next 폴더)
- `portal/.next`: 0.41GB
- `Second Genesis/Strategic_Pivot/.next`: 0.54GB
- `mnps/.next`: 0.19GB
- `mnps/dark-nature-web/.next`: 0.17GB
- `mnps/deploy_package/.next`: 0.01GB

**총 용량**: 약 1.3GB

#### 3. TypeScript 빌드 캐시 (.tsbuildinfo)
- 여러 프로젝트에 분산
- 각각 0.05-0.15MB

#### 4. 로그 파일
- `mnps/mnps-service/logs/`: 작은 용량
- `mnps/dark-nature-web/build*.log`: 작은 용량
- `mnps/_LEGACY/error.log`: 작은 용량

---

## 🧹 정리 전략

### Phase 1: 즉시 삭제 가능 (안전)

#### 1.1 Next.js 빌드 아티팩트 삭제
- **대상**: 모든 `.next` 폴더
- **예상 절감**: 약 1.3GB
- **위험도**: 낮음 (재빌드로 복구 가능)
- **복구 방법**: `npm run build` 실행

#### 1.2 TypeScript 빌드 캐시 삭제
- **대상**: `*.tsbuildinfo` 파일들
- **예상 절감**: 약 1-2MB
- **위험도**: 매우 낮음 (자동 재생성)

#### 1.3 오래된 로그 파일 삭제
- **대상**: `build*.log`, 오래된 로그 파일
- **예상 절감**: 수 MB
- **위험도**: 매우 낮음

### Phase 2: 신중히 삭제 (재생성 가능)

#### 2.1 node_modules 삭제
- **대상**: 모든 `node_modules` 폴더
- **예상 절감**: 약 2-3GB
- **위험도**: 중간 (npm install로 복구 가능)
- **주의사항**: 
  - 서버가 실행 중이면 중지 필요
  - `package-lock.json` 파일 유지
  - 복구 시간: 각 프로젝트별 5-10분

#### 2.2 불필요한 _LEGACY 폴더 확인
- **대상**: `mnps/_LEGACY`
- **예상 절감**: 확인 필요
- **위험도**: 확인 후 결정

### Phase 3: 장기 정리 전략

#### 3.1 .gitignore 확인 및 업데이트
- `.next` 폴더 gitignore 확인
- `node_modules` gitignore 확인

#### 3.2 정기 정리 스크립트
- 자동 정리 스크립트 작성
- 주기적 실행 (예: 월 1회)

---

## ✅ 실행 계획

### 즉시 실행 (Phase 1)
- [x] `.next` 폴더 삭제
- [x] `*.tsbuildinfo` 파일 삭제
- [x] 오래된 로그 파일 정리

### 사용자 승인 후 실행 (Phase 2)
- [ ] `node_modules` 삭제
- [ ] `_LEGACY` 폴더 확인 및 정리

---

## 📋 예상 절감량

| 항목 | 예상 절감량 |
|------|-------------|
| `.next` 폴더 | ~1.3GB |
| `node_modules` | ~2-3GB |
| 기타 캐시/로그 | ~10-50MB |
| **총 예상 절감** | **~3.3-4.3GB** |

---

## ⚠️ 주의사항

1. **서버 중지**: node_modules 삭제 전 서버 중지 필요
2. **백업**: 중요한 데이터는 백업 후 진행
3. **복구 시간**: node_modules 재설치에 시간 소요
4. **.env 파일**: 삭제하지 않도록 주의

