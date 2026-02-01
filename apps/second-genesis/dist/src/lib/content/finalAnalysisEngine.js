"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalAnalysisEngine = void 0;
const engine_1 = require("./engine");
const confrontationData_1 = require("./data/confrontationData");
const deconstructionData_1 = require("./data/deconstructionData");
const reconstructionData_1 = require("./data/reconstructionData");
const depthAnalysisData_1 = require("./data/depthAnalysisData");
class FinalAnalysisEngine {
    constructor(m1, m2, m3) {
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
    }
    getM1Term() {
        const terms = {
            "A": "성취 지향적 강박",
            "B": "애정 결핍성 의존",
            "C": "회피성 불안",
            "D": "해리성 도피"
        };
        return terms[this.m1.type] || "미분화된 무의식";
    }
    getM2Term() {
        const { p, a, sd } = this.m2.scores;
        if (p >= 60 && sd >= 50)
            return "체제 구축가";
        if (p >= 60 && a >= 50)
            return "체제 혁신가";
        if (a >= 60 && sd < 50)
            return "체제 순응자";
        return "체제 독립자";
    }
    getGapTerm() {
        const terms = {
            "growth": "성장과 확장",
            "stability": "안정과 질서",
            "relation": "관계와 연결",
            "autonomy": "자율과 독립"
        };
        return terms[this.m3.dominantGap] || this.m3.dominantGap;
    }
    // --- EXPANDED ROADMAP SECTIONS ---
    generateConfrontation() {
        return (0, confrontationData_1.getConfrontationText)(this.m1.type, this.getM1Term());
    }
    generateDeconstruction() {
        return (0, deconstructionData_1.getDeconstructionText)(this.getM2Term());
    }
    generateReconstruction() {
        return (0, reconstructionData_1.getReconstructionText)(this.getGapTerm(), this.m3.dominantGap);
    }
    // --- MAIN GENERATION ---
    generateFullReport() {
        // ANALYSIS SECTIONS (Keep for evidence)
        const conflict = this.analyzeIdentityConflict();
        const mask = this.analyzeBehavioralMask();
        const failure = this.analyzeStrategicFailure();
        // 1. Move Roadmap to TOP
        // 2. Expand Sections
        const blocks = [
            {
                id: 'intro',
                content: "**[종합 진단 보고서: 종합 요약]**\n\n본 시스템은 귀하의 심층 데이터를 분석하여, 단순한 현상 진단을 넘어 삶을 재설계하기 위한 구체적인 **전술 프로토콜**을 최우선으로 제시합니다."
            },
            { id: 'roadmap_confrontation', content: this.generateConfrontation() },
            { id: 'roadmap_deconstruction', content: this.generateDeconstruction() },
            { id: 'roadmap_reconstruction', content: this.generateReconstruction() },
            {
                id: 'divider',
                content: "**[첨부: 상세 분석 데이터]**\n\n하단 내용은 위 제언의 근거가 되는 정밀 심리 분석 결과입니다. 귀하의 무의식과 행동 패턴이 어떻게 충돌하고 있는지 데이터를 통해 검증하십시오."
            },
            { id: 'layer1', content: conflict },
            { id: 'layer2', content: mask },
            { id: 'layer3', content: failure }
        ];
        return (0, engine_1.assembleParagraphs)(blocks);
    }
    // Public accessor for feedback variants
    getFeedbackVariants() {
        return this.generateFeedbackVariants();
    }
    /**
     * Generate multiple feedback variants based on analysis data and calibration.
     * Returns an array of FeedbackVariant objects for UI selection.
     */
    generateFeedbackVariants() {
        const variants = [];
        // Variant 1: Comprehensive integrated feedback
        variants.push({
            id: 'v1',
            title: '통합 피드백',
            content: this.generateConfrontation() + "\n\n" + this.generateDeconstruction() + "\n\n" + this.generateReconstruction()
        });
        // Variant 2: Strategic focus on gap & calibration
        const gapInfo = `주요 전략적 격차: ${this.getGapTerm()} (보정 선택: ${this.m3.calibration ?? '없음'})`;
        variants.push({
            id: 'v2',
            title: '전략적 피드백',
            content: gapInfo + "\n\n" + this.analyzeStrategicFailure()
        });
        // Variant 3: Identity conflict deep dive
        variants.push({
            id: 'v3',
            title: '정체성 심층 피드백',
            content: this.analyzeIdentityConflict()
        });
        return variants;
    }
    analyzeIdentityConflict() {
        return (0, depthAnalysisData_1.getIdentityConflictAnalysis)(this.getM1Term(), this.getGapTerm());
    }
    analyzeBehavioralMask() {
        return (0, depthAnalysisData_1.getBehavioralMaskAnalysis)(this.getM2Term());
    }
    analyzeStrategicFailure() {
        return (0, depthAnalysisData_1.getStrategicFailureAnalysis)(this.m3.dominantGap, this.getGapTerm(), this.m3.calibration ?? '없음');
    }
    getDiagnosisTerms() {
        return {
            m1Term: this.getM1Term(),
            m2Term: this.getM2Term(),
            gapTerm: this.getGapTerm()
        };
    }
}
exports.FinalAnalysisEngine = FinalAnalysisEngine;
