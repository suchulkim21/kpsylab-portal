// src/lib/module3/analysis.ts
import { ScenarioOption } from "@second-genesis/types/module3";
import { Module3Variables } from "@second-genesis/types/module3";

/**
 * 선택된 옵션들을 기반으로 에너지·집중·창의성 점수를 합산합니다.
 */
export function calculateAnalysis(selectedOptions: ScenarioOption[]): Module3Variables {
    const result: Module3Variables = {
        energy: 0,
        focus: 0,
        creativity: 0,
    };

    selectedOptions.forEach((opt) => {
        if (opt.weight.energy) result.energy += opt.weight.energy;
        if (opt.weight.focus) result.focus += opt.weight.focus;
        if (opt.weight.creativity) result.creativity += opt.weight.creativity;
    });

    return result;
}

/**
 * Phase(1~3) 별로 중간 결과를 반환합니다.
 * 각 Phase에 해당하는 옵션 배열을 전달하면, 가장 높은 점수를 가진 차원을 dominant 로 반환합니다.
 */
export function calculateIntermediateResult(phase: number, options: ScenarioOption[]) {
    const scores = calculateAnalysis(options);
    const maxScore = Math.max(scores.energy, scores.focus, scores.creativity);
    let dominantTrait = "";
    let description = "";

    if (maxScore === scores.energy) {
        dominantTrait = "에너지 주도형";
        description = "당신은 활력과 추진력이 강합니다. 목표를 향해 빠르게 움직이며, 활동적인 환경을 선호합니다.";
    } else if (maxScore === scores.focus) {
        dominantTrait = "집중형";
        description = "당신은 집중력이 뛰어나며, 세밀한 작업에 강합니다. 방해 요소를 최소화하고 몰입하는 것을 즐깁니다.";
    } else {
        dominantTrait = "창의성형";
        description = "당신은 독창적인 아이디어와 발상을 잘 도출합니다. 자유로운 사고와 새로운 접근을 선호합니다.";
    }

    return {
        phase,
        dominantTrait,
        description,
        scores,
    };
}
