import { questions } from '../text/questions.js';

export class AssessmentEngine {
    constructor() {
        this.traits = ['machiavellianism', 'narcissism', 'psychopathy', 'sadism'];
        this.results = {
            scores: {},
            subScores: {},
            answers: {}
        };
    }

    calculate() {
        this.traits.forEach(trait => {
            // 1. Load Answers
            const storedAnswers = JSON.parse(localStorage.getItem(`mnps_answers_${trait}`) || '{}');
            this.results.answers[trait] = storedAnswers;

            // 2. Initialize Scores
            let traitTotal = 0;
            const subTraitScores = {};

            // 3. Process Each Question
            questions[trait].forEach((q, index) => {
                const score = storedAnswers[index] || 0; // Default to 0 if not answered

                // Main Score Accumulation
                traitTotal += score;

                // Sub-trait Score Accumulation
                if (q.subTrait) {
                    if (!subTraitScores[q.subTrait]) {
                        subTraitScores[q.subTrait] = 0;
                    }
                    subTraitScores[q.subTrait] += score;
                }
            });

            this.results.scores[trait] = traitTotal;
            this.results.subScores[trait] = subTraitScores;
        });

        return this.results;
    }

    getAnalysis() {
        const results = this.calculate();
        results.report = this.generateReport(results.scores, results.subScores);
        return results;
    }

    generateReport(scores, subScores) {
        // 1. Sort Traits by Score
        const sortedTraits = Object.entries(scores).sort(([, a], [, b]) => b - a);
        const primaryTrait = sortedTraits[0][0];
        const primaryScore = sortedTraits[0][1];
        const secondaryTrait = sortedTraits[1][0];
        const secondaryScore = sortedTraits[1][1];

        // 2. Identify Dominant Sub-trait
        const subTraitObj = subScores[primaryTrait];
        const sortedSubTraits = Object.entries(subTraitObj).sort(([, a], [, b]) => b - a);
        const dominantSubTrait = sortedSubTraits[0][0];

        // 3. Define Content Dictionaries
        const CORE_PERSONAS = {
            'machiavellianism': { name: '지배자', desc: '냉철한 이성으로 세상을 체스판처럼 내려다보는' },
            'narcissism': { name: '포식자', desc: '타인의 시선을 먹고 자라며 스스로 빛나는' },
            'psychopathy': { name: '파괴자', desc: '감정의 족쇄를 끊고 본능대로 질주하는' },
            'sadism': { name: '설계자', desc: '타인의 고통을 정교하게 조율하는' }
        };

        const MODIFIERS = {
            'machiavellianism': ['치밀하게 계산하는', '전략적인', '냉혹한'],
            'narcissism': ['화려하게 군림하는', '오만한', '매혹적인'],
            'psychopathy': ['거침없이 돌진하는', '충동적인', '위험한'],
            'sadism': ['잔혹하게 미소짓는', '가학적인', '악마적인']
        };

        const INTENSITY_MODIFIERS = {
            low: ['잠재된', '숨어있는', '소심한'],
            mid: ['뚜렷한', '능숙한', '대담한'],
            high: ['폭주하는', '압도적인', '통제불능의']
        };

        const SUB_TRAIT_EPITHETS = {
            // Machiavellianism
            '계산적 조작': '심리 조종의 대가',
            '냉소적 세계관': '차가운 회의론자',
            '도덕적 유연성': '규율을 넘나드는 자',
            '평판 관리': '가면의 마술사',
            // Narcissism
            '우월감': '오만한 제왕',
            '관심 추구': '무대 위의 독재자',
            '특권 의식': '선택받은 귀족',
            '착취적 대인관계': '영혼의 사냥꾼',
            // Psychopathy
            '충동성': '브레이크 없는 전차',
            '공감 결여': '감정 없는 기계',
            '자극 추구': '위험한 갬블러',
            '무책임': '자유로운 영혼',
            // Sadism
            '신체적 잔혹성': '피의 예술가',
            '언어적 잔혹성': '독설의 저격수',
            '대리 만족': '그림자 관찰자',
            '지배 욕구': '고통의 지휘자'
        };

        // 4. Combinatorial Logic
        let modifier = "";
        let core = CORE_PERSONAS[primaryTrait].name;
        let epithet = SUB_TRAIT_EPITHETS[dominantSubTrait] || "어둠의 방랑자";

        // Determine Intensity
        let intensityLevel = 'mid';
        if (primaryScore >= 35) intensityLevel = 'high';
        else if (primaryScore <= 20) intensityLevel = 'low';

        // Select Modifier based on Secondary Trait & Intensity
        // If Secondary is also high (>100), mix it in. Otherwise use Intensity or Primary flavor.
        if (secondaryScore > 100) {
            const modList = MODIFIERS[secondaryTrait];
            modifier = modList[Math.floor(Math.random() * modList.length)];
        } else {
            const intList = INTENSITY_MODIFIERS[intensityLevel];
            modifier = intList[Math.floor(Math.random() * intList.length)];
        }

        // Final Archetype Title
        const fullArchetype = `${modifier} ${core}, ${epithet}`;

        // 5. Modular Report Generation
        // Block A: Nature (Primary + Secondary)
        const blockA = `당신의 본성은 **[${CORE_PERSONAS[primaryTrait].desc}]** ${core}에 가깝습니다. 
        여기에 **[${secondaryTrait.toUpperCase()}]** 성향이 더해져, ${modifier} 특성을 동시에 보입니다. 
        이는 당신이 단순한 악당이 아니라, 상황에 따라 가면을 바꿔 쓸 수 있는 입체적인 인물임을 의미합니다.`;

        // Block B: Behavior (Sub-trait)
        const blockB = `특히 **[${dominantSubTrait}]** 성향이 두드러지는데, 이는 당신이 **'${epithet}'**라 불릴 만한 자질을 갖췄음을 보여줍니다. 
        당신은 목표를 위해서라면 타인의 심리를 교묘하게 파고들거나, 상황을 자신에게 유리하도록 조작하는 데 천부적인 재능이 있습니다.`;

        // Block C: Weakness & Strategy (Based on Lowest Trait - The "Missing Link")
        const lowestTrait = sortedTraits[3][0];
        let weakness = "";
        let strategy = "";

        switch (lowestTrait) {
            case 'machiavellianism':
                weakness = "지나치게 감정적이거나 순진하여, 타인의 계략에 쉽게 넘어갈 수 있습니다.";
                strategy = "차가운 이성으로 상황을 분석하는 '체스 플레이어'의 마인드를 훈련하세요.";
                break;
            case 'narcissism':
                weakness = "자신감이 부족하여 결정적인 순간에 주저하거나, 타인의 눈치를 너무 많이 봅니다.";
                strategy = "가끔은 근거 없는 자신감도 무기가 됩니다. 스스로를 '주인공'이라 최면을 거세요.";
                break;
            case 'psychopathy':
                weakness = "지나친 신중함과 공포심 때문에 눈앞에 온 기회를 놓칠 수 있습니다.";
                strategy = "생각을 멈추고 저지르는 '야성'을 깨우세요. 가끔은 무모함이 답입니다.";
                break;
            case 'sadism':
                weakness = "타인에게 싫은 소리를 못하고 끙끙 앓다가, 결국 혼자 스트레스를 떠안습니다.";
                strategy = "건전한 공격성을 표출하세요. 거절과 비판도 연습하면 훌륭한 방어기제가 됩니다.";
                break;
        }

        return {
            archetype: fullArchetype,
            description: `${blockA} <br><br> ${blockB}`,
            weakness: weakness,
            strategy: strategy,
            dominantTrait: primaryTrait,
            dominantSubTrait: dominantSubTrait
        };
    }
}
