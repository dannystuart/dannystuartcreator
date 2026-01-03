'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';
import { track } from '@vercel/analytics/react';

interface MaterialsTileProps {
    tile: Tile;
}

export function MaterialsTile({ tile }: MaterialsTileProps) {
    return (
        <Link
            href={tile.href}
            onClick={() => track('Tile Click', { tile: 'Materials', type: 'link' })}
            className={cn(
                "group relative flex flex-col justify-start overflow-hidden rounded-[20px] bg-black p-[40px] lg:max-[1200px]:p-8 transition-all duration-300 hover:shadow-2xl",
                "lg:min-h-[311px] max-lg:h-[380px]",
                tile.className
            )}
        >
            {/* Background Video */}
            <div className="absolute inset-x-0 bottom-[-60%] h-[200%] translate-x-[20%] max-[560px]:bottom-[auto] max-[560px]:translate-x-[0%]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                >
                    <source src="/_videos/v1/materials-bg.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Gradient Overlay from Figma Node 39:115 */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "linear-gradient(95.8deg, rgb(70, 17, 26, 0.6) 10.1%, rgba(0, 0, 0, 0) 60%)"
                }}
            />
            {/* Hover Gradient Overlay - Fades in */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(95.8deg, rgb(90, 27, 36, 0.7) 10.1%, rgba(0, 0, 0, 0) 60%)" // Slightly brighter/redder
                }}
            />
            {/* Content - Positioned bottom left */}
            <div className="relative z-20">
                <h3 className="font-semibold text-[32px] mb-2 text-[#fff7f3] leading-[36px] tracking-[-1px] font-sans">
                    {tile.title}
                </h3>
                <p className="text-[#cfc6c3] text-[18px] leading-[28px] max-w-[200px] font-sans">
                    {tile.description}
                </p>
            </div>

            {/* Hover Arrow Icon */}
            <div className="absolute top-[40px] right-[40px] text-[#cfc6c3] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-30">
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    <ArrowUpRight size={24} />
                </div>
            </div>
        </Link >
    );
}
