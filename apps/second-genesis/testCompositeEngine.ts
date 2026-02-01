// testCompositeEngine.ts
import { CompositeAnalysisEngine } from "./src/lib/CompositeAnalysisEngine.ts";

const dummyData = {};
const engine = new CompositeAnalysisEngine(dummyData, dummyData, dummyData);

console.log("=== 종합 진단 보고서 ===\n");
console.log(engine.generateCompositeReport());
