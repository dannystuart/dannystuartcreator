import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';

interface MaterialsTileProps {
    tile: Tile;
}

export function MaterialsTile({ tile }: MaterialsTileProps) {
    return (
        <Link
            href={tile.href}
            className={cn(
                "group relative flex flex-col justify-start overflow-hidden rounded-[20px] bg-black p-[40px] transition-all duration-300 hover:shadow-lg",
                "min-h-[311px]",
                tile.className
            )}
        >
            {/* Background Video */}
            <div className="absolute inset-x-0 bottom-[-60%] h-[200%] translate-x-[20%]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-90"
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
                <ArrowUpRight size={24} />
            </div>
        </Link>
    );
}
