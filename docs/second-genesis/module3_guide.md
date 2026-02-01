# Module 3 가이드

## 이상향 분석
피검자가 의식적으로 지향하는 목표와 가치를 확인합니다. 설문을 통해 피검자가 '무엇을 원하는지', '어떤 상태를 이상적이라고 생각하는지'를 파악하여 4가지 차원(안정, 성장, 관계, 자율)의 점수로 수치화합니다.

## 잠재력 확인
피검자의 무의식적인 경향성과 실제 행동 패턴을 검증합니다. 시나리오 기반의 질문을 통해 실제 상황에서 어떻게 반응하는지, 내재된 역량은 어느 정도인지를 측정하여 이상향과 동일한 4가지 차원으로 분석합니다.

## 분석 흐름
1. **설문·점수 수집**: 이상향(4차원) 및 잠재력(행동 패턴) 데이터 확보
2. **격차(Gap) 계산**: `potential - ideal`로 차원별 불일치 산출
3. **주요 차원 선정**: 절대값이 가장 큰 격차 영역(`dominantGap`) 식별
4. **전략 선택**: 비즈니스 로직에 따라 `Alignment`, `Expansion`, `Correction`, `Pivot` 중 택 1
5. **보고서 생성**: `generateModule3Content` 함수로 마크다운 리포트 생성
6. **UI 적용**: 생성된 리포트를 사용자 인터페이스에 표시

## 주요 타입
```ts
interface M3Data {
  ideal:     { stability: number; growth: number; relation: number; autonomy: number };
  potential: { stability: number; growth: number; relation: number; autonomy: number };
  strategy:  string;   // Alignment | Expansion | Correction | Pivot
  dominantGap: string; // stability | growth | relation | autonomy
}
```

## 주요 상수
- `STRATEGY_DEFINITIONS`: 각 전략(`Alignment` 등)에 대한 상세 한국어 설명
- `DIMENSION_ANALYSIS`: 4가지 차원(`stability`, `growth`, `relation`, `autonomy`) 불일치에 대한 해석
- `GAP_ADVICE`: 전략별 구체적 행동 지침 및 조언

## 핵심 함수
- `generateModule3Content(data: M3Data): string`
  - 입력: `M3Data` 객체
  - 출력: 전략, 분석, 조언이 포함된 완성된 마크다운 문자열

## 예시 질문
| 차원 | 이상향 질문 (의식) | 잠재력 질문 (행동/무의식) |
|------|-------------------|-------------------------|
| **안정** | "현재 생활에서 가장 안정감을 느끼는 순간은 언제인가요?" | "예상치 못한 변화가 생겼을 때 얼마나 빨리 적응하나요?" |
| **성장** | "5년 뒤 어떤 역량을 갖추고 싶나요?" | "새로운 기술을 배우는 데 얼마나 시간을 투자하나요?" |
| **관계** | "가장 소중하게 생각하는 인간관계는 무엇인가요?" | "팀 내 의견 차이를 어떻게 조율하나요?" |
| **자율** | "자신이 스스로 결정을 내릴 때 가장 만족스러운 순간은?" | "상사의 지시 없이 스스로 업무를 정의하고 진행한 경험을 말해주세요." |

## 검증 체크리스트
- [ ] 이상향 및 잠재력 점수가 4차원으로 정확히 산출되는가?
- [ ] 가장 큰 격차(`dominantGap`)가 올바르게 식별되는가?
- [ ] 전략(`strategy`)이 로직에 따라 적절히 선택되는가?
- [ ] `generateModule3Content`가 한국어 마크다운을 정상적으로 반환하는가?
- [ ] UI에서 결과 리포트가 깨짐 없이 렌더링되는가?
