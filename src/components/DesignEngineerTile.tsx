import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';

interface DesignEngineerTileProps {
    tile: Tile;
}

export function DesignEngineerTile({ tile }: DesignEngineerTileProps) {
    return (
        <Link
            href={tile.href}
            className={cn(
                "group relative flex flex-col justify-end overflow-hidden rounded-[20px] bg-[#1a1a1a] p-[40px] lg:max-[1200px]:p-8 transition-all duration-300 hover:shadow-2xl",
                "lg:min-h-[626px] max-lg:h-[380px] h-full", // Matching height from Roadmap/Figma reference
                tile.className
            )}
        >
            {/* Background Image with Hover Effect */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/design-engineer-bg.png"
                    alt="Product design workspace background"
                    className={cn(
                        "w-[120%] h-[120%] object-cover opacity-80 transition-transform duration-700 ease-out",
                        "group-hover:scale-110 group-hover:rotate-1",
                        "-translate-x-[-50px] -translate-y-[20px]"
                    )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1d] from-[20.773%] to-[66.023%] to-[rgba(0,0,0,0)]" />
                {/* Hover Gradient Overlay - Fades in */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2A] from-[20.773%] to-[66.023%] to-[rgba(0,0,0,0)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4">
                {/* Availability Indicator - Updated to match Figma "Available 2026" */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative flex items-center justify-center w-6 h-6">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]" />
                    </div>
                    <span className="text-[#86efac] text-[16px] font-normal leading-[24px] font-sans">
                        Available 2026
                    </span>
                </div>

                {/* Title & Description */}
                <div>
                    <h3 className="font-semibold text-[32px] mb-2 text-[#fff7f3] leading-[36px] tracking-[-1px] font-sans">
                        {tile.title}
                    </h3>
                    <p className="text-[#cfc6c3] text-[18px] leading-[28px] max-w-[90%] font-sans whitespace-pre-line">
                        {tile.description}
                    </p>
                </div>
            </div>

            {/* Hover Arrow Icon */}
            <div className="absolute top-[40px] right-[40px] text-[#cfc6c3] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    <ArrowUpRight size={24} />
                </div>
            </div>
        </Link>
    );
}
