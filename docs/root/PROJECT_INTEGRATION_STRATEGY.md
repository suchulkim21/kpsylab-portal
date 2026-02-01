# 프로젝트 통합 전략 문서 (Project Integration Strategy)

**작성일**: 2026-01-06  
**작성자**: CEO 전략팀  
**목적**: MNPS와 Second Genesis 프로젝트의 통합 관리 및 운영 전략

---

## 📊 프로젝트 현황 요약

### 1. 프로젝트 구조

```
Pj-main/
├── apps/
│   ├── mnps/                    # Dark Tetrad 분석 플랫폼
│   │   └── mnps-service/       # 프로덕션 서버 (포트 7777)
│   ├── second-genesis/          # 전략적 방향 전환 도구
│   └── portal/                  # KPSY LAB 통합 플랫폼 (메인 허브)
│       └── app/
│           ├── mnps/           # MNPS 통합 페이지
│           └── second-genesis/ # Second Genesis 통합 페이지
```

### 2. 프로젝트 상태

| 프로젝트 | 상태 | 완료율 | 포트 | 접근 경로 |
|---------|------|--------|------|----------|
| **MNPS** | 개발/개선 중 | 90% | 7777 | `localhost:7777` / `apps/portal/mnps` |
| **Second Genesis** | 완료 | 100% | - | `apps/portal/second-genesis` |
| **KPSY LAB** | 운영 중 | 95% | 7777 | `www.kpsylab.com` |

---

## 🎯 통합 전략

### 1. KPSY LAB 중심 통합 아키텍처

**전략**: KPSY LAB을 통합 플랫폼으로 활용하여 두 서비스를 단일 진입점에서 제공

#### 구조
```
사용자
  ↓
KPSY LAB (www.kpsylab.com) - 메인 진입점
  ├─→ MNPS 서비스
  │     └─→ Dark Tetrad 분석
  │
  └─→ Second Genesis 서비스
        └─→ 전략적 방향 전환 분석
```

#### 장점
- 단일 도메인에서 모든 서비스 접근
- 사용자 여정 연결 (MNPS 진단 → Second Genesis 성장 전략)
- 브랜드 통합 및 일관성 유지
- 공통 인증 시스템 활용 가능

### 2. 서비스 차별화 전략

#### MNPS (Dark Tetrad Analysis)
- **타겟**: 자기 인식 및 진단이 필요한 사용자
- **접근법**: "당신은 ~입니다" (진단 중심)
- **수익 모델**: 프리미엄 리포트 판매
- **톤앤매너**: 도파민, 팩트 폭격, 유쾌한 냉소

#### Second Genesis (Strategic Pivot)
- **타겟**: 성장 전략 및 행동 변화가 필요한 사용자
- **접근법**: "~으로 전환하십시오" (행동 지향)
- **수익 모델**: 프리미엄 리포트 + 구독 모델 가능
- **톤앤매너**: 성장 지향, 행동 강령, 전략적 통찰

### 3. 시너지 활용 방안

#### 사용자 여정 연결
1. **MNPS 진단** → 자신의 성향 파악
2. **Second Genesis 전략** → 진단 결과를 바탕으로 성장 전략 제시
3. **통합 리포트** → 두 서비스 결과를 종합한 프리미엄 리포트

#### 크로스 프로모션
- MNPS 결과 페이지에 "성장 전략 보기 (Second Genesis)" CTA 추가
- Second Genesis 결과 페이지에 "심층 진단 보기 (MNPS)" CTA 추가

---

## 📋 관리 체계

### 1. 프로젝트 독립성 유지

각 프로젝트는 독립적으로 운영되되, KPSY LAB을 통해 통합 접근:
- **MNPS**: `apps/mnps/mnps-service/`에서 독립 실행 가능
- **Second Genesis**: KPSY LAB 내부에 통합되어 있음
- **KPSY LAB**: 두 서비스의 통합 플랫폼 역할 (www.kpsylab.com)

### 2. 코드 관리 원칙

#### 공유 리소스
- KPSY LAB에서 공통 컴포넌트 관리
- 공통 스타일 가이드 적용
- 공통 인증 시스템 (AuthContext)

#### 프로젝트별 독립성
- 각 프로젝트의 비즈니스 로직은 독립적으로 유지
- 데이터베이스는 프로젝트별로 분리 가능
- API 엔드포인트는 프로젝트별 네임스페이스 유지

### 3. 배포 전략

#### 개발 환경
```bash
# KPSY LAB (통합 플랫폼)
cd apps/portal
npm run dev  # localhost:7777

# MNPS (독립 서비스)
cd apps/mnps/mnps-service
npm start    # localhost:7777
```

#### 프로덕션 환경
- **KPSY LAB**: www.kpsylab.com (Vercel 또는 Next.js 호스팅)
- **MNPS**: 독립 서버 (PM2로 관리) 또는 KPSY LAB 통합
- **Second Genesis**: KPSY LAB 내부에 포함 (별도 배포 불필요)

---

## 🚀 즉시 실행 계획

### Phase 1: 통합 상태 점검 (완료)
- [x] Second Genesis 프로젝트 상태 확인
- [x] Portal 통합 상태 확인
- [x] 프로젝트 구조 분석

### Phase 2: 통합 문서화 (진행 중)
- [x] 통합 전략 문서 작성
- [x] 브랜딩 업데이트 (Portal → KPSY LAB)
- [ ] 각 프로젝트 README 업데이트
- [ ] 통합 개발 가이드 작성

### Phase 3: 사용자 여정 개선 (예정)
- [ ] MNPS → Second Genesis 연결 플로우 구현
- [ ] 통합 리포트 기능 설계
- [ ] 크로스 프로모션 CTA 추가

### Phase 4: 운영 최적화 (예정)
- [ ] 공통 모니터링 시스템 구축
- [ ] 통합 로깅 체계 구축
- [ ] 성능 최적화

---

## 📈 예상 효과

### 1. 사용자 경험 개선
- 단일 진입점으로 접근성 향상
- 연계된 서비스로 사용자 만족도 증가
- 프리미엄 리포트 가치 상승

### 2. 수익 다각화
- 두 서비스 모두 수익 창출 가능
- 크로스 프로모션으로 전환율 향상
- 프리미엄 패키지 판매 가능

### 3. 운영 효율성
- Portal 중심 관리로 운영 복잡도 감소
- 공통 인프라 공유로 비용 절감
- 통합 모니터링으로 운영 투명성 향상

---

## 🔒 주의사항

### 1. 프로젝트 독립성 보장
- 각 프로젝트의 핵심 기능 변경 시 독립성 유지
- 데이터 격리 보장 (필요 시)
- 각 프로젝트의 브랜드 아이덴티티 유지

### 2. 기술 부채 관리
- Portal 통합 코드의 중복 최소화
- 공통 컴포넌트 라이브러리 구축
- 문서화 유지

### 3. 확장성 고려
- 향후 추가 서비스 통합 가능한 구조 유지
- 마이크로서비스 아키텍처 고려
- API 게이트웨이 도입 검토

---

## 📞 담당자 및 리소스

### 프로젝트별 책임
- **MNPS**: mnps-service 팀
- **Second Genesis**: KPSY LAB 팀 (통합 관리)
- **KPSY LAB**: KPSY LAB 팀 (통합 플랫폼 관리)

### 문서 위치
- 본 문서: 루트 `PROJECT_INTEGRATION_STRATEGY.md`
- MNPS 전략: `mnps/PROJECT_STRATEGIC_ANALYSIS.md`
- CEO 요약: `mnps/CEO_EXECUTIVE_SUMMARY.md`
- Second Genesis 상태: `apps/second-genesis/STATUS_REPORT.md`

---

## ✅ 결론

**MNPS와 Second Genesis는 KPSY LAB (www.kpsylab.com)을 통해 통합 운영되며, 각각의 독립성을 유지하면서 시너지를 창출하는 구조입니다.**

두 프로젝트 모두 버리지 않고, KPSY LAB 중심의 통합 전략으로 운영함으로써:
1. 사용자 경험 향상
2. 수익 다각화
3. 운영 효율성 향상

을 달성할 수 있습니다.

---

**다음 단계**: KPSY LAB 통합 상태 점검 및 사용자 여정 개선 작업 진행

