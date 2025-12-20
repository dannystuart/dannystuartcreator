export type BreakoutType = 'blob' | 'mockup-ui' | 'code' | 'none';
export type TileVariant = 'default' | 'image' | 'list' | 'mockup' | 'stat' | 'newsletter' | 'design-engineer' | 'roadmap' | 'materials' | 'limelight' | 'theta';

export interface Tile {
    id: string;
    title: string;
    description: string;
    href: string;
    colSpan: number; // 1 to 4
    rowSpan: number; // 1 to 2
    variant: TileVariant;
    breakoutType: BreakoutType;
    className?: string; // For explicit grid placement if needed, though simpler to let auto-flow work with spans
}

export const tiles: Tile[] = [
    // Row 1 & 2 Left (Tall) - ROADMAP (Was Right)
    {
        id: 'roadmap',
        title: '2026 Q1',
        description: '2026 content strategy. Big things coming.',
        href: '',
        colSpan: 1,
        rowSpan: 2,
        variant: 'roadmap',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-1 lg:row-span-2 order-6 lg:order-none'
    },
    // Row 1 Center (Wide)
    {
        id: 'project-1',
        title: 'AI x Design',
        description: 'Gain the advantage. Every 2 weeks.',
        href: '#',
        colSpan: 2,
        rowSpan: 1,
        variant: 'newsletter',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1 order-1 lg:order-none'
    },
    // Row 1 & 2 Right (Tall) - HIRE ME (Was Left)
    {
        id: 'intro',
        title: 'Hire me',
        description: 'Apps + Websites. Founders, let’s talk.',
        href: 'https://www.newlayer.co',
        colSpan: 1,
        rowSpan: 2,
        variant: 'design-engineer',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-1 lg:row-span-2 order-3 lg:order-none'
    },
    // Row 2 Center (Wide)
    {
        id: 'limelight',
        title: 'Limelight',
        description: 'A minimal design system for enterprise dashboards.',
        href: '#',
        colSpan: 2,
        rowSpan: 1,
        variant: 'limelight',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1 order-2 lg:order-none'
    },
    // Row 3 Left (Wide) - NEW MATERIALS TILE
    {
        id: 'materials',
        title: 'Materials¹',
        description: 'Visual ingredients for creative explorers.',
        href: 'https://dannystuart.gumroad.com/l/Materials-Edition-1',
        colSpan: 2,
        rowSpan: 1,
        variant: 'materials',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1 order-4 lg:order-none'
    },
    // Row 3 Right (Wide)
    {
        id: 'theta',
        title: 'Theta',
        description: 'Experimental sleep app.',
        href: '#',
        colSpan: 2,
        rowSpan: 1,
        variant: 'theta',
        breakoutType: 'none',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1 order-5 lg:order-none'
    },
];
