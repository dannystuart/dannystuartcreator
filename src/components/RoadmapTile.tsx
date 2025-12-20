import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';

interface RoadmapTileProps {
    tile: Tile;
}

export function RoadmapTile({ tile }: RoadmapTileProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-[#141414] p-[40px] lg:max-[1200px]:p-8 transition-all duration-300 hover:shadow-lg",
                "border border-[#4d4d4d]",
                "lg:min-h-[626px] max-lg:h-[auto] h-full max-[500px]:h-auto max-[500px]:min-h-0 max-[500px]:max-h-none", // Height from Figma metadata
                tile.className
            )}
        >
            <div className="flex flex-col relative z-10 w-full h-full justify-between">
                {/* Top Section: Active & Timeline */}
                <div className="flex flex-col gap-3">
                    {/* Timeline Header */}
                    <div className="flex items-center justify-between w-[160px]">
                        <div className="flex items-center">
                            <span className="text-[#7bf66d] text-[10px] leading-[28px] font-normal font-sans whitespace-nowrap">Planning</span>
                        </div>
                        <div className="w-[13px] h-[1px] bg-[#4d4d4d]" />
                        <div className="flex items-center">
                            <span className="text-white opacity-50 text-[10px] leading-[28px] font-normal font-sans whitespace-nowrap">Started</span>
                        </div>
                        <div className="w-[13px] h-[1px] bg-[#4d4d4d]" />
                        <div className="flex items-center">
                            <span className="text-white opacity-50 text-[10px] leading-[28px] font-normal font-sans whitespace-nowrap">Done</span>
                        </div>
                    </div>

                    {/* Active Item Description */}
                    <div>
                        <p className="text-[#cfc6c3] text-[16px] leading-[22px] font-normal font-sans">
                            2026 content strategy.
                            <br />
                            Big things coming.
                        </p>
                    </div>
                </div>

                {/* Middle Section: Up Next */}
                {/* Positioned at y=245 in Figma, likely a spacer or just flex gap */}
                <div className="flex flex-col gap-3 mt-auto mb-auto pt-8">
                    <p className="text-[#cfc6c3] text-[12px] leading-[28px] font-normal font-sans ">
                        Up Next
                    </p>
                    <div className="flex flex-col gap-4">
                        <p className="text-[#cfc6c3] text-[16px] leading-[22px] opacity-60 font-normal font-sans">
                            Updating website for newlayer.co
                        </p>
                        <p className="text-[#cfc6c3] text-[16px] leading-[22px] opacity-60 font-normal font-sans">
                            Preparing for Materials genCLASS
                        </p>
                        <p className="text-[#cfc6c3] text-[16px] leading-[22px] opacity-60 font-normal font-sans">
                            Building Materials landing page
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Q1 Title */}
                <div>
                    <h3 className="font-semibold mt-[60px] text-[32px] leading-[24px] tracking-[-1px] text-[#fff7f3] font-sans">
                        2026 Q1
                    </h3>
                </div>
            </div>
        </div>
    );
}
