'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tile } from '@/content/tiles';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterTileProps {
    tile: Tile;
}

export function NewsletterTile({ tile }: NewsletterTileProps) {
    // Toggle for background image/texture visibility (defaulted to hidden as requested)
    const showTexture = false;
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [showSubscribe, setShowSubscribe] = useState(false);
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState(''); // Honeypot field for spam protection
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isExpanded && !showSubscribe) {
            timer = setTimeout(() => {
                setShowSubscribe(true);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [isExpanded, showSubscribe]);

    // Custom Smooth Scroll Logic
    const SCROLL_DELAY = 500; // ms to wait before starting scroll (allows for render)
    const SCROLL_DURATION = 2000; // ms for the scroll animation to complete (slower = higher value)

    useEffect(() => {
        if (showSubscribe && window.innerWidth <= 500 && modalRef.current && containerRef.current) {

            const target = modalRef.current;
            const container = containerRef.current;

            // Helper for easing - easeInOutQuad
            const easeInOutQuad = (t: number) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };

            const smoothScrollTo = (element: HTMLElement, container: HTMLElement, duration: number) => {
                // Calculate position relative to the scrollable container
                const startScrollTop = container.scrollTop;
                const elementRect = element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // The distance from the top of the container's visible area to the element
                const relativeElementTop = elementRect.top - containerRect.top;

                // Desired scroll position: Element top + current scroll - offset to center
                // Center offset = (Container Height - Element Height) / 2
                const centerOffset = (container.clientHeight - elementRect.height) / 2;

                // Target scrollTop
                const targetScrollTop = startScrollTop + relativeElementTop - centerOffset;

                const distance = targetScrollTop - startScrollTop;
                let startTime: number | null = null;

                const animation = (currentTime: number) => {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutQuad(progress);

                    container.scrollTop = startScrollTop + (distance * ease);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                };

                requestAnimationFrame(animation);
            };

            const timer = setTimeout(() => {
                smoothScrollTo(target, container, SCROLL_DURATION);
            }, SCROLL_DELAY);

            return () => clearTimeout(timer);
        }
    }, [showSubscribe, containerRef]);

    // Lock body scroll when expanded
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            setErrorMessage('Please enter a valid email');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, honeypot }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to subscribe');
            }

            setStatus('success');
            setTimeout(() => {
                setIsExpanded(false);
            }, 3000); // Close tile after 3s of success

            setTimeout(() => {
                setStatus('idle');
                setEmail('');
            }, 3500); // Reset form state after tile closes
        } catch {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <motion.div
                layoutId={`newsletter-tile-${tile.id}`}
                onClick={() => setIsExpanded(true)}
                className={cn(
                    "group relative flex flex-col justify-between rounded-[20px] p-[40px] lg:max-[1200px]:p-8 shadow-sm cursor-pointer",
                    "border border-[#4d4d4d]",
                    "bg-[#171717]", // Fallback
                    "lg:min-h-[220px] max-lg:h-[380px]", // Minimum height 220px
                    "font-sans",     // Ensure Geist Sans
                    "z-40",          // Second highest stacking order
                    "overflow-hidden", // Clip default background
                    tile.className
                )}
                style={{
                    // Adjusted gradient position to top center (50% 0%) vs center (50% 50%)
                    // Added toggleable texture layer
                    backgroundImage: `
                        ${showTexture ? "url('/noise.png'), " : ""} 
                        radial-gradient(100% 100% at 75% 100%, #505050 0%, #343434 50%, #252525 75%, #171717 100%)
                    `,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    transform: 'translateZ(0)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                whileHover={!isExpanded ? {
                    scale: 1.05,
                    rotateX: 2,
                    rotateY: -3,
                    rotateZ: 3,
                    z: 50, // simulated lift
                    boxShadow: "0 30px 60px -12px rgb(0 0 0 / 0.5), 0 18px 36px -18px rgb(0 0 0 / 0.4), 0 -4px 12px -4px rgb(255 255 255 / 0.05)"
                } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Hover Background Gradient - Fades in */}
                <motion.div
                    className={cn(
                        "absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-500",
                        !isExpanded && "group-hover:opacity-100"
                    )}
                    style={{
                        backgroundImage: `
                            ${showTexture ? "url('/noise.png'), " : ""} 
                            radial-gradient(100% 100% at 75% 100%, rgba(10,10,10,1) 0%, #3a3a3a 75%, #222 100%)
                        `
                    }}
                />

                <motion.div className="flex justify-between items-start w-full relative z-10 max-[500px]:flex-col max-[500px]:gap-6 max-[500px]:items-center max-[500px]:text-center" layout="position">
                    {/* Left Col */}
                    <div className="flex flex-col gap-6">
                        <motion.h3
                            layoutId={`newsletter-title-${tile.id}`}
                            className="font-semibold text-[32px] leading-[24px] tracking-[-1px] text-[#fff7f3]"
                        >
                            AI x Design
                        </motion.h3>
                        <motion.div
                            layoutId={`newsletter-desc-${tile.id}`}
                            className="font-normal text-[20px] leading-[28px] text-[#cfc6c3]"
                        >
                            <p>Gain the advantage.</p>
                            <p>Every 2 weeks.</p>
                            <motion.p layoutId={`newsletter-sub-${tile.id}`} className="text-[#f398a9]">Straight to your inbox.</motion.p>
                        </motion.div>
                    </div>

                    {/* Right Col */}
                    <motion.div
                        layoutId={`newsletter-stats-${tile.id}`}
                        className="flex flex-col items-end gap-1 max-[500px]:items-center max-[500px]:w-full"
                    >
                        <p className="font-semibold text-[16px] leading-[28px] text-[#9dea94] max-[500px]:text-center">
                            Join 100+ creatives
                        </p>
                        <div className="w-full text-center min-[501px]:text-right text-[16px] leading-[20px] text-[#cfc6c3]">
                            <p className="mb-2">Systems.</p>
                            <p className="mb-2">Experiments.</p>
                            <p className="mb-2">Templates.</p>
                            <p className="mb-2">News.</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hover Arrow Icon - Only show when NOT expanded */}
                {!isExpanded && (
                    <div className="absolute bottom-[40px] right-[40px] text-[#cfc6c3] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                        <ArrowUpRight size={24} />
                    </div>
                )}
            </motion.div>

            {/* EXPANDED OVERLAY */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                        />
                        <div className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center p-4 max-[500px]:p-0 md:p-8 lg:p-12">
                            <motion.div
                                layoutId={`newsletter-tile-${tile.id}`}
                                ref={containerRef}
                                className="w-full max-w-[1400px] h-full max-h-[90vh] bg-[#171717] overflow-hidden max-[500px]:overflow-y-auto relative pointer-events-auto flex flex-col rounded-[32px] max-[500px]:max-h-none max-[500px]:h-full max-[500px]:rounded-none shadow-2xl"
                                style={{
                                    border: '1px solid #333',
                                }}
                            >
                                {/* Close Button - Subtle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="absolute top-8 right-8 z-50 p-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={32} strokeWidth={1.5} />
                                </button>



                                {/* Static Background (Always present as base) */}
                                <div className="absolute inset-0 z-0 pointer-events-none bg-black" />

                                {/* Video Overlay (Fades out after playing) */}
                                {!hasPlayed && (
                                    <motion.div
                                        className="absolute inset-0 z-10 select-none pointer-events-none"
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    >
                                        <video
                                            autoPlay
                                            muted
                                            playsInline
                                            onEnded={() => setHasPlayed(true)}
                                            className="w-full h-full object-cover"
                                        >
                                            <source src="/_videos/Scooter-Video.mov" type="video/quicktime" />
                                            <source src="/_videos/Scooter-Video.mov" type="video/mp4" />
                                        </video>

                                        {/* Overlay to ensure text readability against video */}
                                        <div className="absolute inset-0 bg-black/40" />
                                    </motion.div>
                                )}

                                {/* Expanded Content - Matching Default Tile Structure */}
                                <motion.div className="p-[40px] max-[500px]:pt-24 md:p-[80px] h-full w-full relative z-10 flex flex-col justify-between" layout="position">
                                    <div className="flex justify-between items-start w-full max-[500px]:flex-col max-[500px]:items-center max-[500px]:text-center max-[500px]:gap-6">
                                        {/* Left Col */}
                                        <div className="flex flex-col gap-8">
                                            <motion.h3
                                                layoutId={`newsletter-title-${tile.id}`}
                                                className="font-semibold text-[48px] md:text-[48px] leading-[1.1] tracking-[-2px] text-[#fff7f3]"
                                            >
                                                AI x Design
                                            </motion.h3>
                                            <motion.div
                                                layoutId={`newsletter-desc-${tile.id}`}
                                                className="font-normal text-[20px] md:text-[20px] leading-tight text-[#cfc6c3]"
                                            >
                                                <p>Gain the advantage.</p>
                                                <p>Every 2 weeks.</p>
                                                <motion.p layoutId={`newsletter-sub-${tile.id}`} className="text-[#f398a9] mt-4">Straight to your inbox.</motion.p>
                                            </motion.div>
                                        </div>

                                        {/* Right Col */}
                                        <motion.div
                                            layoutId={`newsletter-stats-${tile.id}`}
                                            className="flex flex-col items-end gap-2 mt-4 max-[500px]:items-center max-[500px]:w-full"
                                        >
                                            <p className="font-semibold text-[16px] md:text-[16px] leading-relaxed text-[#9dea94] max-[500px]:text-center">
                                                Join 100+ creatives
                                            </p>
                                            <div className="w-full text-center min-[501px]:text-right text-[16px] md:text-[16px] leading-relaxed text-[#cfc6c3]">
                                                <p className="mb-2">Systems.</p>
                                                <p className="mb-2">Experiments.</p>
                                                <p className="mb-2">Templates.</p>
                                                <p className="mb-2">News.</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Arrow for consistency, maybe larger or hidden? Keeping it but larger for now as part of "same content" */}

                                </motion.div>

                                {/* Subscribe Modal/Card - Centered, No Overlay */}
                                <AnimatePresence>
                                    {showSubscribe && (
                                        <div className={cn(
                                            "absolute inset-0 z-50 flex items-center justify-center pointer-events-none",
                                            "max-[500px]:relative max-[500px]:inset-auto max-[500px]:pointer-events-auto max-[500px]:flex-col max-[500px]:justify-start max-[500px]:py-0 max-[500px]:px-4 max-[500px]:z-20",
                                            "max-[500px]:bg-transparent"
                                        )}>
                                            <motion.div
                                                ref={modalRef}
                                                initial={{ clipPath: hasPlayed ? 'inset(0 0 0 0%)' : 'inset(0 0 0 100%)' }}
                                                animate={{ clipPath: 'inset(0 0 0 0%)' }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Custom ease for smooth "slow" reveal
                                                className={cn(
                                                    "w-[370px] bg-white rounded-[20px] pt-[32px] pb-[48px] px-[35px] shadow-2xl pointer-events-auto overflow-hidden relative flex flex-col gap-[40px] items-center",
                                                    "ml-[24px] mr-[24px] mt-[180px] xl:mt-0",
                                                    "max-[500px]:w-full max-[500px]:mx-0 max-[500px]:mt-8 max-[500px]:mb-12",
                                                    "max-[500px]:bg-[#f0f0f0] max-[500px]:text-black"
                                                )}
                                            >
                                                <div className="flex flex-col gap-[12px] text-center w-full text-black">
                                                    <h4 className="font-semibold text-[24px] tracking-[-0.24px]">Use AI to design better,&nbsp;and&nbsp;faster.</h4>
                                                    {/*<p className="font-normal text-[16px]">I was always a good designer.</p>*/}
                                                </div>

                                                <div className="flex flex-col gap-[24px] w-full">
                                                    {status === 'success' ? (
                                                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-500">
                                                            <div className="text-[#c33b4f] mb-4">
                                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M20 6L9 17l-5-5" />
                                                                </svg>
                                                            </div>
                                                            <h5 className="text-[20px] font-semibold text-black mb-2">You&apos;re on the list!</h5>
                                                            <p className="text-[#6e6e6e]">Keep an eye on your inbox.</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {/* Honeypot field - hidden from users, visible to bots */}
                                                            <input
                                                                type="text"
                                                                name="website"
                                                                value={honeypot}
                                                                onChange={(e) => setHoneypot(e.target.value)}
                                                                autoComplete="off"
                                                                tabIndex={-1}
                                                                aria-hidden="true"
                                                                className="absolute opacity-0 pointer-events-none h-0"
                                                            />

                                                            <div className="flex flex-col gap-[9px] w-full text-left">
                                                                <label className="text-[#6e6e6e] text-[14px] font-medium">Your Email</label>
                                                                <input
                                                                    type="email"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    disabled={status === 'loading'}
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                                                                    className="w-full bg-[#f6f6f6] border border-[#b9b9b9] rounded-[8px] h-[52px] px-4 text-black focus:outline-none focus:border-[#666] transition-colors shadow-[inset_0px_0px_6px_0px_rgba(0,0,0,0.15)] disabled:opacity-50"
                                                                />
                                                            </div>

                                                            <div className="flex flex-col gap-2">
                                                                <button
                                                                    onClick={handleSubscribe}
                                                                    disabled={status === 'loading'}
                                                                    className="w-full bg-[#c33b4f] text-white font-semibold text-[16px] rounded-[8px] py-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                                                >
                                                                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                                                </button>
                                                                {errorMessage && (
                                                                    <p className="text-red-500 text-[12px] text-center">{errorMessage}</p>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <p className="text-[#8e8e8e] text-[12px] text-center w-full">
                                                    No spam guarantee. Unsubscribe at any time.
                                                </p>
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div >
                    </>
                )
                }
            </AnimatePresence >
        </>
    );
}
