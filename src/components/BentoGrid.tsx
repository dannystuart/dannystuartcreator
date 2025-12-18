import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[minmax(0,1fr)]",
                className
            )}
        >
            {children}
        </div>
    );
}
