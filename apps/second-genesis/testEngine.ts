// testEngine.ts
import { FinalAnalysisEngine } from "@/lib/content/finalAnalysisEngine";



// Sample data
const m1 = { type: "A", subType: "subA", scoreMap: { "score1": 80 } };
const m2 = { typeCode: "TC1", scores: { p: 70, a: 40, sd: 55 }, clinicalType: "typeX" };
const m3 = {
    ideal: { stability: 70, growth: 80, relation: 60, autonomy: 75 },
    potential: { stability: 60, growth: 70, relation: 55, autonomy: 65 },
    dominantGap: "growth",
    strategy: "someStrategy",
    calibration: "A"
};

const engine = new FinalAnalysisEngine(m1, m2, m3);

console.log("=== Full Report ===");
console.log(engine.generateFullReport());

console.log("\n=== Feedback Variants ===");
console.log(JSON.stringify(engine.getFeedbackVariants(), null, 2));

console.log("\n=== Diagnosis Terms ===");
console.log(JSON.stringify(engine.getDiagnosisTerms(), null, 2));
