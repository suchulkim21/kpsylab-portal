# Module 2 가이드 (Enhanced)

## 목적
피검자의 사회적 상호작용 방식과 내부 의사결정 패턴을 심층 분석합니다. 단순한 성향 파악을 넘어, **주도성(Proactivity)**, **적응성(Adaptability)**, **사회적 거리(Social Distance)** 의 3가지 핵심 차원을 정밀 측정하여 '소셜 아키타입'을 도출합니다.

## 분석 차원 (3-Axis Model)
1. **Proactivity (주도성)**: 상황을 통제하고 먼저 행동하려는 경향. (0~100)
   - High: 주도적, 지시적, 리더십 발휘.
   - Low: 수용적, 관조적, 팔로워십.
2. **Adaptability (적응성)**: 변화하는 환경이나 타인의 의견에 맞추는 유연성. (0~100)
   - High: 유연함, 변화 수용, 협상 지향.
   - Low: 원칙 고수, 일관성 유지, 보수적.
3. **Social Distance (사회적 거리)**: 타인과의 관계 맺기 깊이와 선호도. (0~100)
   - High: 독립적, 개인 공간 중시, 업무 중심.
   - Low: 친화적, 정서적 교류 중시, 관계 중심.

## 분석 흐름
1. **Scenario Assessment**: 구체적인 10~20개의 상황 시나리오 제시.
   - 각 질문은 4개의 선택지(A, B, C, D)를 가짐.
   - 각 선택지는 3가지 차원(`p`, `a`, `sd`)에 상이한 가중치를 부여.
2. **Scoring Engine**:
   - 선택된 답변의 가중치를 누적 합산.
   - 최종 점수를 0~100 스케일로 정규화.
3. **Archetype Mapping**:
   - 3차원 점수 조합에 따라 8가지 소셜 아키타입 중 하나로 분류.
   - 예: High P + High A = **"Strategic Pioneer (전략적 개척자)"**
4. **Result Generation**:
   - 레이더 차트로 3차원 점수 시각화.
   - 아키타입에 따른 Core Strength(강점), Potential Risk(약점), Action Strategy(행동 전략) 제시.

## 주요 데이터 구조
```typescript
interface Module2Variables {
  proactivity: number;    // 주도성
  adaptability: number;   // 적응성
  socialDistance: number; // 사회적 거리
}

interface ScenarioOption {
  id: string; // "A", "B", "C", "D"
  text: string;
  weight: Partial<Module2Variables>; // 가중치 (예: { proactivity: 5, adaptability: -2 })
}
```

## 검증 포인트
- [ ] 선택지에 따른 점수 누적이 정확한가?
- [ ] 극단적인 답변 선택 시 예상되는 아키타입이 도출되는가?
- [ ] 결과 페이지에서 레이더 차트가 올바르게 렌더링되는가?
