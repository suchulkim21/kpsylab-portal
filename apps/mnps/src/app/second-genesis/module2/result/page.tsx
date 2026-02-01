"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { Module2Engine } from "@second-genesis/lib/module2/analysisEngine";
import { ResultItem, getKoreanTypeName, determineTypeCode } from "@second-genesis/lib/content/module2";

// Grouping Helper
const groupByCategory = (items: ResultItem[]) => {
    const groups: Record<string, ResultItem[]> = {};
    items.forEach(item => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
    });
    return groups;
};

export default function Module2ResultPage() {
    const router = useRouter();
    const [typeName, setTypeName] = useState<string>("");
    const [groupedContent, setGroupedContent] = useState<Record<string, ResultItem[]> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('sg_module2_result');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Determine where the scores are located
                let scores: any = null;
                if (parsed.analysis) {
                    scores = parsed.analysis;
                } else if (parsed.scores) {
                    scores = parsed.scores;
                } else if (parsed.proactivity !== undefined) {
                    scores = {
                        proactivity: parsed.proactivity,
                        adaptability: parsed.adaptability,
                        socialDistance: parsed.socialDistance,
                    };
                } else {
                    // Fallback: assume whole object is scores
                    scores = parsed;
                }
                const engine = new Module2Engine({ scores });
                const results = engine.generateResults();
                const typeCode = determineTypeCode(scores);
                const name = getKoreanTypeName(typeCode);
                setTypeName(name);
                setGroupedContent(groupByCategory(results));
            } catch (e) {
                console.error('Parse error', e);
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            }
        } else {
            setError('분석 결과가 존재하지 않습니다.');
        }
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
                <div className="text-red-500 text-xl font-bold mb-4">DATA ERROR</div>
                <p className="text-gray-400 mb-8">{error}</p>
                <Link href="/module2">
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                        다시 진단하기
                    </button>
                </Link>
            </div>
        );
    }

    if (!groupedContent) return <div className="min-h-screen bg-black text-white flex items-center justify-center">분석 중...</div>;

    // Define Category Order for Display
    const categoryOrder = ["심층 진단", "인지 프로세스", "행동 패턴", "사회적 역동", "임상 솔루션"];

    return (
        <div className="min-h-screen bg-black text-white p-6 animate-fade-in-up relative overflow-hidden font-sans">
            <Link href="/" className="absolute top-4 left-4 p-2 text-gray-500 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full">
                <Home size={24} />
            </Link>

            <div className="max-w-4xl mx-auto pt-10 pb-20 relative z-10">
                <header className="mb-10 text-center">
                    <span className="text-blue-500 font-mono text-xs tracking-widest border border-blue-900 bg-blue-900/10 px-3 py-1 rounded-full mb-4 inline-block">
                        심층 분석 보고서
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                        행동 패턴 정밀 진단
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">대인 관계 및 의사결정 메커니즘 해독</p>
                </header>

                {/* TYPE HEADER - Unified Glass Style */}
                <div className="glass-panel p-8 rounded-2xl mb-12 border border-white/10 bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-900/20 border border-blue-500/30 rounded-full">
                            <Brain className="text-blue-500" size={16} />
                            <span className="text-blue-400 font-bold text-sm">진단된 유형</span>
                        </div>
                        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-2">
                            {typeName}
                        </h2>
                    </div>
                </div>

                {/* CONTENT CARDS */}
                <div className="space-y-12">
                    {categoryOrder.map((catKey) => {
                        const items = groupedContent[catKey];
                        if (!items) return null;

                        return (
                            <section key={catKey} className="border-t border-gray-800 pt-8">
                                <h3 className="text-2xl font-bold text-blue-400 mb-6 pl-2 border-l-4 border-blue-500">
                                    {catKey}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>
                                            <div className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider relative z-10">{item.title}</div>
                                            <div className="text-gray-200 leading-relaxed font-medium relative z-10">
                                                {item.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="mt-20 text-center flex justify-center gap-4">
                    <Link href="/module2">
                        <div className="px-6 py-3 border border-gray-700 text-gray-400 font-bold rounded-full hover:bg-gray-800 transition-colors cursor-pointer text-sm">
                            다시 진단하기
                        </div>
                    </Link>
                    <Link href="/assessment">
                        <div className="px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 text-sm">
                            다음 단계로 이동 <span className="text-xs">→</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent opacity-50"></div>
            </div>
        </div>
    );
}
