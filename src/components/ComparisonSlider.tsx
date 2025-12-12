import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, Wand2, CheckCircle2, ScanEye, ArrowRight, MousePointerClick } from 'lucide-react';

interface ComparisonSliderProps {
  onNavigate?: (page: string) => void;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ onNavigate }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Global mouse up handler to stop dragging even if mouse leaves component
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchend', handleGlobalMouseUp);
    }
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Context & Features */}
            <div className="lg:col-span-5">
                <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-6 tracking-wider uppercase">
                    <Wand2 className="w-3 h-3 inline-block mr-1 mb-0.5" />
                    Visual Intelligence
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                    Turn "Lot Rot" into <span className="text-brand-500 dark:text-brand-400">Sold Units</span>
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                    First impressions are digital. Velocity AI instantly removes distractions, corrects lighting, and places vehicles in a premium virtual studio, increasing click-through rates by up to 45%.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">Automatic Background Removal & Replacement</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">Adaptive Lighting & Color Correction</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300">Number Plate Privacy Masking</span>
                    </div>
                </div>
                
                <div className="mt-8 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-4 shadow-md dark:shadow-none">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                        <ScanEye className="w-5 h-5 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 dark:text-gray-500 uppercase font-bold">Processing Speed</div>
                        <div className="text-slate-900 dark:text-white font-mono font-bold">~1.4s per image</div>
                    </div>
                </div>

                <div className="mt-10">
                    <button 
                        onClick={() => onNavigate?.('checkout')}
                        className="btn-primary group relative rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        Fix My Inventory
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                        <MousePointerClick className="w-4 h-4 text-brand-500" />
                        Increases Click-Through Rate by 45%
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Slider - Expanded Size */}
            <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl select-none group cursor-ew-resize bg-slate-900 dark:bg-[#0f172a]">
                <div 
                    ref={containerRef}
                    className="relative w-full h-full"
                    onMouseMove={isDragging ? handleMove : undefined}
                    onMouseDown={handleMouseDown}
                    onTouchMove={handleMove}
                    onTouchStart={handleMouseDown}
                >
                    {/* AFTER Image (Background - Full Width) */}
                    <img 
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
                        alt="Enhanced" 
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                    />
                    <div className="absolute top-6 right-6 bg-brand-500/90 dark:bg-brand-500/20 backdrop-blur-md border border-brand-400/30 text-white dark:text-brand-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 shadow-lg">
                        Velocity Studio
                    </div>

                    {/* BEFORE Image (Foreground - Clipped) */}
                    <div 
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
                            alt="Original" 
                            className="absolute inset-0 w-full h-full object-cover max-w-none" 
                            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
                            draggable="false"
                        />
                        <div className="absolute inset-0 bg-black/10"></div> {/* Slight dim for "bad" photo */}
                        <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-gray-300 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            Raw Lot Photo
                        </div>
                        
                        {/* Vertical Shadow Line */}
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-black/30 to-transparent"></div>
                    </div>

                    {/* Slider Handle */}
                    {/* Added -translate-x-1/2 to line to center exactly on split */}
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-brand-500 cursor-ew-resize z-20 -translate-x-1/2"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        {/* Changed centering from transform to margins to avoid animation conflict */}
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

export default ComparisonSlider;