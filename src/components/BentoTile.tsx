'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';
import { NewsletterTile } from './NewsletterTile';
import { DesignEngineerTile } from './DesignEngineerTile';
import { RoadmapTile } from './RoadmapTile';
import { MaterialsTile } from './MaterialsTile';
import { LimelightTile } from './LimelightTile';
import { ThetaTile } from './ThetaTile';
import { track } from '@vercel/analytics/react';

interface BentoTileProps {
    tile: Tile;
}

export function BentoTile({ tile }: BentoTileProps) {
    if (tile.variant === 'newsletter') {
        return <NewsletterTile tile={tile} />;
    }
    if (tile.variant === 'design-engineer') {
        return <DesignEngineerTile tile={tile} />;
    }
    if (tile.variant === 'roadmap') {
        return <RoadmapTile tile={tile} />;
    }
    if (tile.variant === 'materials') {
        return <MaterialsTile tile={tile} />;
    }
    if (tile.variant === 'limelight') {
        return <LimelightTile tile={tile} />;
    }
    if (tile.variant === 'theta') {
        return <ThetaTile tile={tile} />;
    }

    const isLink = !!tile.href;
    const Wrapper = (isLink ? Link : 'div') as React.ElementType;

    return (
        <Wrapper
            href={isLink ? tile.href : undefined}
            onClick={() => track('Tile Click', { tile: tile.title, type: 'standard' })}
            className={cn(
                "group relative flex w-full h-full overflow-hidden rounded-[20px] bg-white border border-slate-200 p-6 md:p-8 transition-all duration-300 hover:shadow-lg",
                "min-h-[300px] flex-col justify-between",
                tile.className
            )}
        >
            {/* Background / Breakouts */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Blob Breakout */}
                {tile.breakoutType === 'blob' && (
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700" />
                )}

                {/* Mockup UI Breakout */}
                {tile.breakoutType === 'mockup-ui' && (
                    <div className="absolute top-10 right-[-10%] w-[120%] h-full bg-slate-50 border border-slate-200 rounded-tl-xl shadow-lg transform rotate-[-2deg] group-hover:rotate-0 group-hover:translate-y-2 transition-all duration-500 p-4">
                        <div className="w-full h-4 bg-slate-200 rounded-full mb-3" />
                        <div className="w-2/3 h-4 bg-slate-200 rounded-full mb-3" />
                        <div className="w-5/6 h-4 bg-slate-200 rounded-full" />
                    </div>
                )}

                {/* Code Breakout */}
                {tile.breakoutType === 'code' && (
                    <div className="absolute top-8 right-[-20%] w-[120%] h-[120%] bg-slate-900 rounded-tl-xl p-4 shadow-xl opacity-90 group-hover:translate-x-[-10px] transition-transform duration-500">
                        <div className="flex gap-1.5 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="space-y-2 font-mono text-xs text-slate-400">
                            <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> &apos;react&apos;;</p>
                            <p><span className="text-blue-400">const</span> <span className="text-yellow-400">App</span> = () ={'>'} {'{'}</p>
                            <p className="pl-4">return (</p>
                            <p className="pl-8 text-green-400">{'<div />'}</p>
                            <p className="pl-4">);</p>
                            <p>{'}'}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Layer (z-10 relative to breakout) */}
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <div className="flex items-start justify-between">
                    {/* Icon / Brand placeholder could go here */}
                    {tile.variant === 'stat' && (
                        <div className="mb-4 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-slate-900" />
                        </div>
                    )}
                </div>

                <div className="mt-auto pointer-events-auto">
                    <h3 className="font-serif italic text-2xl mb-2 text-slate-900 leading-tight">
                        {tile.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[90%]">
                        {tile.description}
                    </p>
                </div>
            </div>

            {/* Hover Arrow Icon for standard tiles - Exclude Version Control (list variant/bottom right) */}
            {tile.id !== 'versions' && isLink && (
                <div className="absolute bottom-[32px] right-[32px] text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                    <ArrowUpRight size={24} />
                </div>
            )}
        </Wrapper>
    );
}
