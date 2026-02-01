"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-8 text-center">
            <h1 className="mb-6 text-5xl font-extrabold text-white drop-shadow-lg">
                MNPS 포털
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300">
                통합 심리 분석 포털에 오신 것을 환영합니다. 아래 버튼을 눌러 Second Genesis 모듈을 확인해 보세요.
            </p>
            <Link
                href="/second-genesis"
                className="rounded-full bg-cyan-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-cyan-500"
            >
                Second Genesis 열기
            </Link>
        </main>
    );
}
