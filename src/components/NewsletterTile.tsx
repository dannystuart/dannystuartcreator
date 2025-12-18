import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';

interface NewsletterTileProps {
    tile: Tile;
}

export function NewsletterTile({ tile }: NewsletterTileProps) {
    // Toggle for background image/texture visibility (defaulted to hidden as requested)
    const showTexture = false;

    return (
        <Link
            href={tile.href}
            className={cn(
                "group relative flex flex-col justify-between rounded-[20px] p-[40px] shadow-sm transition-all duration-300 hover:shadow-md",
                "border border-[#4d4d4d]",
                "bg-[#171717]", // Fallback
                "min-h-[220px]", // Minimum height 220px
                "font-sans",     // Ensure Geist Sans
                tile.className
            )}
            style={{
                // Adjusted gradient position to top center (50% 0%) vs center (50% 50%)
                // Added toggleable texture layer
                backgroundImage: `
                    ${showTexture ? "url('/noise.png'), " : ""} 
                    radial-gradient(100% 100% at 75% 100%, #505050 0%, #343434 50%, #252525 75%, #171717 100%)
                `
            }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                {/* Left Col */}
                <div className="flex flex-col gap-6">
                    <h3 className="font-semibold text-[32px] leading-[24px] tracking-[-1px] text-[#fff7f3]">
                        AI x Design
                    </h3>
                    <div className="font-normal text-[20px] leading-[28px] text-[#cfc6c3]">
                        <p>Gain the advantage.</p>
                        <p>Every 2 weeks.</p>
                        <p className="text-[#f398a9]">Straight to your inbox.</p>
                    </div>
                </div>

                {/* Right Col */}
                <div className="flex flex-col items-end gap-1">
                    <p className="font-semibold text-[16px] leading-[28px] text-[#9dea94]">
                        Join 100+ creatives
                    </p>
                    <div className="text-right text-[16px] leading-[20px] text-[#cfc6c3]">
                        <p>Systems.</p>
                        <p>Experiments.</p>
                        <p>Templates.</p>
                        <p>News.</p>
                    </div>
                </div>
            </div>

            {/* Hover Arrow Icon */}
            <div className="absolute bottom-[40px] right-[40px] text-[#cfc6c3] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight size={24} />
            </div>
        </Link>
    );
}
