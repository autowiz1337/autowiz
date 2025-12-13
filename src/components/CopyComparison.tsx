
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, PenTool, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';

interface CopyComparisonProps {
  onNavigate?: (page: string) => void;
}

const CopyComparison: React.FC<CopyComparisonProps> = ({ onNavigate }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    // Initial width calculation
    if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchend', handleGlobalMouseUp);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Context & Benefits */}
            <div>
                <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-6 tracking-wider uppercase">
                    <PenTool className="w-3 h-3 inline-block mr-1 mb-0.5" />
                    Psychological Sales Copy
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                    We transform boring listings into <span className="text-gradient">Sales Stories</span>
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                    Stop posting specs. Start selling dreams. Velocity AI analyzes vehicle data to craft emotionally resonant narratives that highlight specific features, packages, and lifestyle benefits, driving higher engagement and lead conversion.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">SEO-optimized for higher search visibility (VDPs)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">Consistent, premium brand voice across all inventory</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">Highlights hidden value (packages, rare options) automatically</span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-10">
                    <button 
                        onClick={() => onNavigate?.('checkout')}
                        className="btn-primary btn-glow group relative rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        Rewrite My Listings
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Boosts SEO Ranking by 40%
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Slider */}
            <div className="relative w-full h-full min-h-[600px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl select-none group cursor-ew-resize bg-white dark:bg-[#0f172a]">
                <div 
                    ref={containerRef}
                    className="relative w-full h-full min-h-[600px]"
                    onMouseMove={isDragging ? handleMove : undefined}
                    onMouseDown={handleMouseDown}
                    onTouchMove={handleMove}
                    onTouchStart={handleMouseDown}
                >
                    {/* AFTER: Velocity AI Copy (Background Layer) */}
                    <div className="absolute inset-0 w-full h-full bg-white dark:bg-[#0f172a] p-8 flex flex-col">
                        <div className="absolute top-6 right-6 bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                            Velocity Narrative
                        </div>
                        
                        <div className="mt-12 space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                Command the Road in the <span className="text-brand-500 dark:text-brand-400">2022 BMW X5 xDrive40i</span>
                            </h3>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-base">
                                Elevate your daily drive with the ultimate blend of performance and luxury. Wrapped in a stunning <span className="text-slate-900 dark:text-white font-medium">Jet Black</span> finish, this X5 isn't just an SUV—it's a statement.
                            </p>
                            
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                                <div className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest">Key Highlights</div>
                                <ul className="space-y-1 text-sm text-slate-700 dark:text-gray-300">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>Panoramic Sky Lounge LED Roof</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>M Sport Package w/ 20" Alloys</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>Harman Kardon Surround Sound</li>
                                </ul>
                            </div>
                            
                            <p className="text-slate-600 dark:text-gray-400 text-sm italic border-l-2 border-brand-500 pl-4 py-1">
                                "This vehicle has been meticulously inspected and is ready for immediate delivery. Schedule your VIP test drive today."
                            </p>
                        </div>
                    </div>

                    {/* BEFORE: Standard Dealer Copy (Foreground Layer - Clipped) */}
                    <div 
                        className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100 dark:bg-[#1e293b] border-r border-slate-300 dark:border-white/10"
                        style={{ width: `${sliderPosition}%` }}
                    >
                         {/* To ensure content stays fixed while container shrinks, we need a wrapper with full width */}
                         <div className="absolute inset-0 h-full p-8 flex flex-col" style={{ width: containerWidth ?? '100%' }}>
                            <div className="absolute top-6 left-6 bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                                Standard Dealer Template
                            </div>
                            
                            <div className="mt-12 space-y-6 opacity-60">
                                <h3 className="text-xl font-bold text-slate-700 dark:text-gray-300 leading-tight font-mono">
                                    USED 2022 BMW X5 SUV AWD
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm font-mono whitespace-pre-line">
                                    VIN: 5UXCR...
                                    Stock #: 12345
                                    Color: Black
                                    Interior: Black
                                    Engine: 3.0L I6
                                    Trans: Auto
                                    
                                    Vehicle Features:
                                    - Power Windows
                                    - Power Locks
                                    - Air Conditioning
                                    - Cruise Control
                                    - Alloy Wheels
                                    - AM/FM Radio
                                    
                                    Clean Carfax. One Owner. Call for price.
                                </p>
                            </div>
                         </div>
                    </div>

                    {/* Slider Handle */}
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-brand-500 cursor-ew-resize z-20 -translate-x-1/2"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        {/* Centering using margins to allow animation transform */}
                        <div className={`absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform border-4 border-brand-500 ${!isDragging ? 'animate-slider-hint' : ''}`}>
                            <MoveHorizontal className="w-5 h-5 text-brand-600" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default CopyComparison;
