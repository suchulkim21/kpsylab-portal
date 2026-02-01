
const text = `인간 본성의 숨겨진 그림자
심리학에서 '어둠의 3요소(Dark Triad)'는 나르시시즘(Narcissism), 마키아벨리즘(Machiavellianism), 사이코패스(Psychopathy)를 일컫습니다. 최근 연구에서는 여기에 사디즘(Sadism)을 더해 '어둠의 4요소(Dark Tetrad)'라고 부릅니다. MNPS는 이 네 가지 성향을 분석하여 인간 내면의 복잡성을 탐구합니다.

이 성향들은 병리적인 범죄자와만 관련된 것이 아닙니다. 우리 모두의 내면에 다양한 농도로 존재하며, 사회적 성공이나 리더십의 원동력이 되기도, 파괴적인 관계의 원인이 되기도 합니다.

Machiavellianism: 전략적 조작과 계산
Narcissism: 자아 도취와 인정 욕구
Psychopathy: 공감 결여와 충동성
Sadism: 타인의 고통에서 느끼는 쾌락`;

console.log(`Length (with spaces): ${text.length}`);
console.log(`Length (without spaces): ${text.replace(/\s/g, '').length}`);
