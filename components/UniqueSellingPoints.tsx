
import React from 'react';
import { User, Layers, Zap, Film, TrendingUp, Play, FileText, Image as ImageIcon } from 'lucide-react';

const UniqueSellingPoints: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-slate-50 dark:bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-4 tracking-wider uppercase">
            The Velocity Advantage
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Why Top Dealerships <br />
            <span className="text-gradient">Choose Velocity AI</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. Holistic Media Package (6 cols) */}
          <div className="md:col-span-6 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-8 flex flex-col relative overflow-hidden group hover:border-accent-purple/30 transition-all shadow-lg dark:shadow-none">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl group-hover:bg-accent-purple/10 transition-colors" />
             
             <div className="mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/10 dark:bg-accent-purple/20 flex items-center justify-center text-accent-purple mb-6">
                    <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Holistic Media Package</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    We provide a comprehensive, integrated solution – not just one asset. From professionally enhanced "eye candy" images and compelling descriptions to expert voiceovers and cinematic sales videos with captions.
                </p>
             </div>

             {/* Visual: Media Grid Placeholders */}
             <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 aspect-video flex items-center justify-center overflow-hidden relative group/item">
                    <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=300&q=80" className="opacity-50 w-full h-full object-cover transition-opacity group-hover/item:opacity-70" alt="Car detail" />
                    <ImageIcon className="absolute text-white/90 w-6 h-6 drop-shadow-md" />
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 aspect-video flex items-center justify-center overflow-hidden relative">
                     <div className="absolute inset-0 bg-brand-900/40"></div>
                     <FileText className="absolute text-white/90 w-6 h-6 drop-shadow-md" />
                     <div className="w-full p-2 space-y-1 opacity-30">
                        <div className="h-1 bg-white w-full"></div>
                        <div className="h-1 bg-white w-2/3"></div>
                        <div className="h-1 bg-white w-full"></div>
                     </div>
                </div>
                <div className="col-span-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 h-16 flex items-center px-4 gap-3 overflow-hidden relative group/video">
                    <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=300&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity group-hover/video:opacity-50" alt="Video thumb" />
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur z-10">
                        <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                    <div className="z-10">
                        <div className="h-2 w-24 bg-white/50 rounded mb-1"></div>
                        <div className="h-2 w-16 bg-white/30 rounded"></div>
                    </div>
                </div>
             </div>
          </div>

          {/* 2. Empowering Sales Team (6 cols) */}
          <div className="md:col-span-6 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-8 flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-lg dark:shadow-none">
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
             
             <div className="mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-6">
                    <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pre-Vetted Insights</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    Beyond the online listing, we equip your sales force with the most impactful, avatar-aligned selling points for each specific car. This ensures consistency, confidence, and efficiency in their interactions.
                </p>
             </div>

             {/* Visual: Mobile Interface Placeholder */}
             <div className="mt-auto flex justify-center">
                 <div className="w-48 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-t-2xl p-3 pb-0 relative shadow-2xl">
                     <div className="h-1 w-10 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-3"></div>
                     <div className="space-y-2">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-2 rounded text-[10px] text-blue-800 dark:text-blue-200 leading-tight">
                            💡 <strong>Key Selling Point:</strong> <br/> Mention the low mileage to this buyer.
                        </div>
                        <div className="h-20 bg-white dark:bg-gray-800/50 rounded border border-slate-200 dark:border-white/5 relative overflow-hidden">
                           <div className="absolute top-2 left-2 w-8 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                           <div className="absolute top-2 left-12 h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                           <div className="absolute top-6 left-12 h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                     </div>
                 </div>
             </div>
          </div>

          {/* 3. Dramatic Visual Storytelling (Full Width) */}
          <div className="md:col-span-12 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-8 flex flex-col relative overflow-hidden group hover:border-accent-pink/30 transition-all shadow-lg dark:shadow-none">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl group-hover:bg-accent-pink/10 transition-colors" />
             
             <div className="mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent-pink/10 dark:bg-accent-pink/20 flex items-center justify-center text-accent-pink mb-6">
                    <Film className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Dramatic Visual Storytelling</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                    We transform standard vehicle photos into captivating, "main character" visuals and produce dynamic video content that goes beyond a simple walk-around. Our focus is on creating an immersive experience that commands attention and keeps buyers engaged longer.
                </p>
             </div>

             {/* Visual: Cinematic Placeholder */}
             <div className="mt-auto relative rounded-xl overflow-hidden border border-white/10 aspect-[21/9] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-shadow">
                <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=1200&q=80" alt="Cinematic Car" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                        <div className="text-xs font-bold text-accent-pink uppercase tracking-widest mb-1">Cinematic Mode</div>
                        <div className="text-white font-serif text-lg italic">The Art of Motion</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                </div>
             </div>
          </div>

          {/* 4. Measurable ROI (Full Width) */}
          <div className="md:col-span-12 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-8 md:p-12 relative overflow-hidden group hover:border-green-500/30 transition-all shadow-lg dark:shadow-none flex flex-col md:flex-row gap-8 items-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-5"></div>
             
             <div className="flex-1 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Measurable ROI Through Accelerated Sales Velocity</h3>
                <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                    We don't just make listings look good; we make them perform. Our service is engineered to demonstrably reduce your time-to-sale, increase average selling prices, and improve lead quality, translating directly into tangible financial gains and a clearer return on your investment.
                </p>
             </div>

             {/* Visual: Dashboard Graph Placeholder */}
             <div className="flex-1 w-full max-w-2xl bg-slate-50 dark:bg-[#020617] rounded-xl border border-slate-200 dark:border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-xs text-slate-500 dark:text-gray-500 uppercase">Total Revenue Impact</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">+$1.2M <span className="text-green-500 text-sm font-normal">(+24%)</span></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-500 dark:text-gray-400">30 Days</div>
                        <div className="px-2 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-500 dark:text-gray-400">YTD</div>
                    </div>
                </div>
                
                {/* Graph Bars */}
                <div className="flex items-end gap-4 h-32">
                    {[40, 65, 45, 70, 55, 85, 95].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group/bar">
                            <div 
                                className="w-full bg-brand-100 dark:bg-brand-900/30 rounded-t-sm relative overflow-hidden transition-all duration-500 hover:bg-brand-500"
                                style={{ height: `${height}%` }}
                            >
                                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-brand-500/20 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* 5. Avatar-Driven Sales Narrative (Full Width - Moved to Bottom) */}
          <div className="md:col-span-12 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-8 md:p-12 flex flex-col relative overflow-hidden group hover:border-brand-500/30 transition-all shadow-lg dark:shadow-none">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/10 transition-colors" />
             
             {/* Title Block */}
             <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                    <User className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Avatar-Driven Sales Narrative</h3>
             </div>

             {/* Hero Image Block */}
             <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-brand-500/10 transition-shadow">
                <img 
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80" 
                    alt="Car Lifestyle" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                
                {/* Floating Avatar Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-white/90 dark:bg-[#020617]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-center gap-6 animate-float shadow-xl">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-brand-500">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center border border-white dark:border-[#020617]">
                            <User className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider mb-1">Matched Persona</div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">"The Weekend Warrior"</div>
                        <div className="text-xs text-slate-600 dark:text-gray-400 mt-1">Interests: Towing, Camping, Tech</div>
                    </div>
                </div>
             </div>

             {/* Text Block */}
             <div className="relative z-10 max-w-4xl">
                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-2xl">
                    <p className="text-slate-700 dark:text-gray-300 text-xl leading-relaxed">
                        Unlike generic listings, we create a bespoke customer avatar for each vehicle, meticulously crafting descriptions, video scripts, and in-person selling points that speak directly to your ideal buyer's desires, ensuring maximum emotional resonance and pre-qualified interest.
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UniqueSellingPoints;
