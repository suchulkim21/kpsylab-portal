// testCompositeEngineReal.ts
import { CompositeAnalysisEngine } from "./src/lib/CompositeAnalysisEngine.ts";

// Dummy data matching expected structures
const m1Data = { dominantType: "A" };
const m2Data = { typeCode: "H-L-A", scores: { p: 70, a: 40, sd: 30 } };
const m3Data = {
    ideal: { stability: 80, growth: 70, relation: 60, autonomy: 50 },
    potential: { stability: 60, growth: 50, relation: 40, autonomy: 30 },
    strategy: "Alignment",
    dominantGap: "growth"
};

const engine = new CompositeAnalysisEngine(m1Data, m2Data, m3Data);

console.log("=== 종합 진단 보고서 ===\n");
console.log(engine.generateCompositeReport());
