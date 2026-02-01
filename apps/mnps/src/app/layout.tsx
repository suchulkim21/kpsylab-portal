import './globals.css';

export const metadata = {
    title: 'MNPS 포털',
    description: '통합 포털 메인 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="notranslate" suppressHydrationWarning>
            <head>
                <meta name="google" content="notranslate" />
            </head>
            <body className="bg-gray-900 text-gray-100 antialiased">
                <header className="p-4 bg-gray-800 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">MNPS 포털</h1>
                    <nav>
                        <a href="/second-genesis" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            Second Genesis
                        </a>
                    </nav>
                </header>
                <main className="p-6">{children}</main>
                <footer className="p-4 text-center text-sm text-gray-500">
                    © MNPS 포털 – 모든 권리 보유
                </footer>
            </body>
        </html>
    );
}
