// testCompositeEngine.ts
import { CompositeAnalysisEngine } from "./module_3/src/lib/CompositeAnalysisEngine";

// 샘플 데이터 (실제 데이터 구조와 무관, 엔진은 더미 데이터를 사용)
const dummyData = {};

const engine = new CompositeAnalysisEngine(dummyData, dummyData, dummyData);

console.log("=== 종합 진단 보고서 ===\n");
console.log(engine.generateCompositeReport());
