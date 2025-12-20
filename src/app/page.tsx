import { BentoGrid } from "@/components/BentoGrid";
import { BentoTile } from "@/components/BentoTile";
import { tiles } from "@/content/tiles";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home',
    description: 'Product Designer crafting beautiful interfaces and AI-powered experiences. Creator of Materials, AI x Design newsletter, and Theta.',
    alternates: {
        canonical: 'https://dannystuart.com',
    },
};

export default function Home() {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto">
            <header className="mb-12 md:mb-12 flex justify-center">
                <h1 className="text-sm font-medium uppercase tracking-[10px] text-slate-900 text-center">
                    DANNYSTUART.COM
                </h1>
            </header>

            <BentoGrid>
                {tiles.map((tile) => (
                    <BentoTile key={tile.id} tile={tile} />
                ))}
            </BentoGrid>

            {/* Footer */}
            <footer className="mt-16 md:mt-16 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
                <div>
                    <p>© 2026 Danny Stuart. All rights reserved.</p>
                </div>
                <div className="flex items-center gap-3">
                    <p>Find me hanging out here →</p>
                    <a
                        href="https://www.threads.net/@dannystuart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/assets/threads_logo.svg"
                            alt="Threads"
                            className="w-6 h-6"
                        />
                    </a>
                </div>
            </footer>
        </main>
    );
}
