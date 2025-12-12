
import React from 'react';
import { ArrowRight, Sparkles, Play, CheckCircle2, Star } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'checkout') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-indigo-600 dark:text-indigo-300 mb-8 animate-fade-in shadow-sm dark:shadow-none">
          <Sparkles className="w-3 h-3" />
          <span>Velocity AI 3.0: Cloudflare Optimized</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
          The only AI that drives <br className="hidden md:block" />
          <span className="text-gradient-primary">inventory turnover</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Velocity AI automates your dealership's merchandising. From photo enhancement to compelling descriptions, turn browsers into buyers 30% faster.
        </p>

        <div className="flex flex-col items-center mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <button 
                onClick={() => onNavigate?.('checkout')}
                className="btn-primary group relative w-full sm:w-auto rounded-full px-10 py-5 text-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-3xl shadow-lg"
              >
                Paste Your URL
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-white font-medium text-lg transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm shadow-sm dark:shadow-none">
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-slate-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <span>No credit card required</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-700" />
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                    </div>
                    <span><strong className="text-slate-900 dark:text-white">4.9/5</strong> from 1,500+ dealers</span>
                </div>
            </div>
        </div>

        {/* Hero Visual/Dashboard Mockup */}
        <div className="relative max-w-5xl mx-auto mt-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9]">
            {/* Mock UI Header */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="mx-auto px-3 py-1 bg-black/20 rounded text-[10px] text-gray-500 font-mono">velocity-dashboard.exe</div>
            </div>
            {/* Mock UI Content */}
            <div className="p-6 grid grid-cols-3 gap-6 h-full text-left">
                <div className="col-span-2 flex flex-col gap-4">
                    <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                             <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Sparkles size={16} />
                             </div>
                             <span className="text-green-400 text-xs font-mono">+24% vs last week</span>
                         </div>
                         <div>
                             <div className="text-2xl font-bold text-white">142</div>
                             <div className="text-xs text-gray-400">Descriptions Optimized</div>
                         </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                         <div className="relative z-10">
                            <h3 className="text-sm font-medium text-gray-300 mb-3">Active Listings</h3>
                            <div className="space-y-2">
                                {[1,2,3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                        <div className="w-10 h-10 rounded bg-gray-700" />
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-gray-600 rounded mb-1" />
                                            <div className="h-2 w-16 bg-gray-700 rounded" />
                                        </div>
                                        <div className="text-xs text-green-400">Optimized</div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>
                <div className="col-span-1 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 p-4">
                    <div className="flex items-center gap-2 mb-4">
                         <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                         <span className="text-xs font-bold text-pink-500">LIVE AGENT</span>
                    </div>
                    <div className="space-y-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-gray-300">
                            Analyzing market trends for SUV pricing in Q3...
                        </div>
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-gray-300">
                            Detected 5 new leads from Listings #402 and #119.
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
