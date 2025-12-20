import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';

interface LimelightTileProps {
    tile: Tile;
}

export function LimelightTile({ tile }: LimelightTileProps) {
    return (
        <Link
            href={tile.href}
            className={cn(
                "group relative flex flex-col justify-end rounded-[20px] p-[40px] lg:max-[1200px]:p-8 shadow-sm transition-all duration-300 hover:shadow-md",
                "border border-[#4d4d4d]",
                "lg:min-h-[300px] max-lg:max-h-[380px] max-[500px]:h-[190px] max-lg:h-[190px]",
                "overflow-visible", // Allow breakout
                "z-50",             // Highest stacking order
                tile.className
            )}
            style={{
                background: "radial-gradient(80.896% 75.482% at 71.57% 5.24%, rgb(80, 80, 80) 0%, rgb(52, 52, 52) 51%, rgb(37, 37, 37) 75%, rgb(23, 23, 23) 100%)"
            }}
        >
            {/* Character Image - Positioned at bottom center, overflowing top */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[450px] max-[500px]:w-[200px] max-[500px]:h-[225px] pointer-events-none z-10">
                <img
                    src="/assets/character-image.png"
                    alt=""
                    className="w-full h-full object-cover object-top opacity-100"
                />
            </div>

            {/* Hover Arrow Icon */}

        </Link>
    );
}
