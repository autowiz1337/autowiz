
import React from 'react';
import { ArrowRight, CheckCircle2, Check, Sparkles } from 'lucide-react';

interface ReclaimBudgetCTAProps {
  onNavigate?: (page: string) => void;
}

const ReclaimBudgetCTA: React.FC<ReclaimBudgetCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 to-[#0f172a] p-8 md:p-12 text-center border border-white/10 shadow-2xl group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            
            {/* Animated Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-purple/20 transition-colors duration-1000" />

            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  Ready to reclaim your budget?
                </h2>
                <p className="text-lg md:text-xl text-blue-200/80 mb-10 font-medium">
                  Get the entire Velocity AI suite for less than the cost of one agency lunch.
                </p>
                
                {/* OFFER STACK TABLE */}
                <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 text-left shadow-2xl">
                    <div className="grid grid-cols-1 gap-y-4 mb-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">AI Studio Photo Suite</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$2,000/mo value</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">Psychological Sales Copy</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$1,500/mo value</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">Neural Voiceover Engine</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$800/mo value</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">Cinematic Video Gen</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$2,500/mo value</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">Market Analytics Dashboard</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$500/mo value</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-4 h-4 text-green-400" />
                                </div>
                                <span className="font-medium text-lg">24/7 Lead Responder Agent</span>
                            </div>
                            <span className="text-white font-bold text-lg line-through decoration-red-500 decoration-2">$1,200/mo value</span>
                        </div>
                    </div>

                    {/* Total Value Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="text-slate-300 text-base mb-2 md:mb-0 font-medium">
                            Total Monthly Value: <span className="line-through decoration-red-500 text-white font-bold text-xl decoration-2 ml-2">$8,500+</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-white font-medium text-lg">Your Price Today:</span>
                            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 flex items-center gap-2 drop-shadow-sm">
                                <Sparkles className="w-6 h-6 text-green-400" fill="currentColor" />
                                FREE
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center relative z-10">
                    <button 
                        onClick={() => onNavigate?.('checkout')}
                        className="btn-primary group relative w-full sm:w-auto rounded-full px-12 py-5 text-xl font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                          Stop Wasting Budget
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-medium text-blue-200/60">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span>SOC2 Compliant</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-blue-500/30" />
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span>Cancel Anytime</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-blue-500/30" />
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            <span>No Credit Card Required</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ReclaimBudgetCTA;
