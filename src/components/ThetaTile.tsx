'use client';

import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';
import { track } from '@vercel/analytics/react';

interface ThetaTileProps {
    tile: Tile;
}

const imgAppIcon3 = "/assets/theta/app-icon.png";
const imgGroup2 = "/assets/theta/bg-1.svg";
const imgGroup1 = "/assets/theta/bg-2.svg";

export function ThetaTile({ tile }: ThetaTileProps) {
    return (
        <div
            onClick={() => track('Tile Click', { tile: 'Theta', type: 'interaction' })}
            className={cn(
                "group relative w-full h-full overflow-hidden rounded-[20px] bg-[#1d1d1d] border border-[#4d4d4d] max-lg:h-[380px]",
                tile.className
            )}
            data-name="Theta"
        >
            {/* Main Card Bg / Overlay used in Figma */}
            <div className="absolute inset-0 bg-[#151515]" />

            {/* Inner Card Border/Glow effect simulation from Figma "Overlay" layer */}
            <div className="absolute inset-0 border-[0.775px] border-white/30 rounded-[20px] pointer-events-none z-20" />

            {/* Background Shapes */}
            <div className="absolute inset-0 w-full h-full opacity-100 pointer-events-none overflow-hidden z-0">
                <img src={imgGroup2} alt="Decorative gradient shape" className="absolute right-0 bottom-0 w-full h-full object-cover mix-blend-normal rotate-[160deg]" style={{ transform: 'scale(1.5)' }} />
            </div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] opacity-100 pointer-events-none ml-0 mt-0 z-0">
                <img src={imgGroup1} alt="Decorative gradient shape" className="w-full h-full object-contain" />
            </div>

            {/* Coming Soon */}
            <p className="absolute bottom-[35px] right-[35px] font-semibold text-[32px] md:text-[40px] leading-none tracking-[-1px] text-[#fff7f3] mix-blend-overlay opacity-100 z-10">
                Coming Soon
            </p>

            {/* Content */}
            <div className="relative z-30 p-[30px] md:p-[40px] lg:max-[1200px]:p-8 flex flex-row items-center gap-[24px]">
                {/* Icon */}
                <div className="relative w-[80px] h-[80px] shrink-0 rounded-[22px] overflow-hidden shadow-2xl">
                    <img src={imgAppIcon3} alt="Theta" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <h3 className="font-semibold text-[32px] leading-tight text-[#fff7f3] tracking-[-1px]">Theta</h3>
                    <p className="text-[20px] text-[#cfc6c3] leading-tight font-normal">Experimental sleep app.</p>
                </div>
            </div>
        </div>
    );
}
