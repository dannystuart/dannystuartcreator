import { BentoGrid } from "@/components/BentoGrid";
import { BentoTile } from "@/components/BentoTile";
import { tiles } from "@/content/tiles";

export default function Home() {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto">
            <header className="mb-12 md:mb-16">
                <h1 className="text-sm font-medium uppercase tracking-[20px] text-slate-900">
                    DANNYSTUART.COM
                </h1>
            </header>

            <BentoGrid>
                {tiles.map((tile) => (
                    <BentoTile key={tile.id} tile={tile} />
                ))}
            </BentoGrid>
        </main>
    );
}
