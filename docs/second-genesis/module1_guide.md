# Module 1 가이드

## 목적
`module1.ts`는 **심리 유형 A‑D**에 대한 심층 진단, 인지·행동 패턴, 성장 리스크, 임상 솔루션을 자동으로 생성하는 로직을 담고 있습니다. 모듈 1은 피검자의 본질 '어떤 사람인가?'와 피검자의 성장을 방해하는 내적·외적 요소를 질문을 통해 파악하고, 분석 결과를 피검자에게 알려주는 역할을 합니다.

## 주요 함수
- `generateModule1Content(type: string): string`
  - 입력: 유형 코드(`A`, `B`, `C`, `D`).
  - 반환: 각 항목을 `**제목**` 형식으로 구분한 문자열 전체(리포트용).
- `generateSynthesizedItems(type: string): ResultItem[]`
  - 내부에서 사용되는 함수이며, `ResultItem` 배열을 반환합니다. 각 아이템은 `id`, `title`, `content`를 포함합니다.

## 사용 흐름
1. 사용자 설문·점수로부터 **유형 코드**를 결정합니다.
2. `generateModule1Content`에 코드 전달 → 완전한 텍스트 리포트 반환.
3. 필요 시 `generateSynthesizedItems`를 직접 호출해 개별 블록을 조작할 수 있습니다.

## 주의사항
- 모든 문자열은 **한국어**만 사용하도록 설계되었습니다.
- 내부 코드(`H‑L‑A` 등)는 사용되지 않으며, `TYPE_DEFINITIONS` 등은 한국어 명칭을 그대로 출력합니다.
- 반환값은 이미 마크다운 형식이므로, 별도 포맷팅 없이 UI에 바로 삽입 가능합니다.
## 작업 내용

- `src/data/questions.ts`에 **내·외적 방해 요인**을 파악하는 `obstacleQuestions`를 추가하고 `fullObstacleQuestions`를 내보냈습니다.
- `src/lib/content/module1.ts`에 `fullObstacleQuestions`를 import하고, `generateSynthesizedItems`에 **obstacleBlock**을 삽입하여 리포트에 장애물 질문 리스트가 포함되도록 구현했습니다.
- `module1_guide.md`에 목적 설명을 업데이트하고, 위 변경 사항을 **작업 내용** 섹션에 기록했습니다.
