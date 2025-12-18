import { BentoGrid } from "@/components/BentoGrid";
import { BentoTile } from "@/components/BentoTile";
import { tiles } from "@/content/tiles";

export default function Home() {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto">
            <header className="mb-12 md:mb-16">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wide uppercase">Open for work</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-slate-900 mb-6">
                        Danny Stuart is a <span className="italic text-slate-500">Design Engineer</span> building digital products with <span className="text-slate-900">purpose</span> and <span className="text-slate-900">precision</span>.
                    </h1>
                </div>
            </header>

            <BentoGrid>
                {tiles.map((tile) => (
                    <BentoTile key={tile.id} tile={tile} />
                ))}
            </BentoGrid>
        </main>
    );
}
