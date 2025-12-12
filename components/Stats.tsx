
import React from 'react';
import { Link, Sparkles, DollarSign, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface StatsProps {
  onNavigate?: (page: string) => void;
}

const Stats: React.FC<StatsProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* NEW: 3-Step Process Section */}
        <div className="mb-24">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h2>
              <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">Transform your inventory performance in three simple steps.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector Line (Desktop only) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-indigo-500/20 to-transparent -translate-y-1/2 z-0" />

              {/* Step 1 */}
              <div className="relative z-10 bg-white dark:bg-[#0f172a] p-8 rounded-2xl border border-slate-200 dark:border-white/10 text-center group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-xl">
                  <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-indigo-950 rounded-full flex items-center justify-center border-2 border-indigo-500/30 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                    <Link className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-bold text-slate-100 dark:text-white/5 select-none">01</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Submit URL</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    Submit your listing URL. Simply paste the link to your existing vehicle detail page or upload raw photos.
                  </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 bg-white dark:bg-[#0f172a] p-8 rounded-2xl border border-slate-200 dark:border-white/10 text-center group hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-xl">
                  <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-indigo-950 rounded-full flex items-center justify-center border-2 border-purple-500/30 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                    <Sparkles className="w-7 h-7 text-purple-500" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-bold text-slate-100 dark:text-white/5 select-none">02</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">We Optimize</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    Wait for our team's new listing. Our AI & experts generate studio photos, sales copy, and video assets.
                  </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 bg-white dark:bg-[#0f172a] p-8 rounded-2xl border border-slate-200 dark:border-white/10 text-center group hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-xl">
                  <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-indigo-950 rounded-full flex items-center justify-center border-2 border-green-500/30 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <DollarSign className="w-7 h-7 text-green-500" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-bold text-slate-100 dark:text-white/5 select-none">03</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Profit</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    Change your listing or create a new one. Publish the new assets and watch the leads and profit roll in.
                  </p>
              </div>
           </div>
        </div>

        {/* CTA Button - Mid Section */}
        <div className="flex flex-col items-center mb-32">
            <button 
                onClick={() => onNavigate?.('checkout')}
                className="group relative w-full sm:w-auto rounded-full px-12 py-5 text-xl font-bold text-white shadow-lg shadow-indigo-500/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 flex items-center justify-center gap-2"
            >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-500 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                SOC2 Compliant • Cancel Anytime
            </div>
        </div>

        {/* Trusted By Section */}
        <div className="text-center mb-12 text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-widest">
          Trusted by 1,500+ Dealerships Worldwide
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale mb-8 text-slate-800 dark:text-white">
           <span className="text-2xl font-serif font-bold hover:opacity-100 transition-opacity cursor-default">CARVANA</span>
           <span className="text-2xl font-sans font-black tracking-tighter italic hover:opacity-100 transition-opacity cursor-default">AUTONATION</span>
           <span className="text-2xl font-mono font-bold hover:opacity-100 transition-opacity cursor-default">VROOM</span>
           <span className="text-2xl font-serif font-bold hover:opacity-100 transition-opacity cursor-default">CARMAX</span>
           <span className="text-2xl font-sans font-bold tracking-wide hover:opacity-100 transition-opacity cursor-default">KMX</span>
        </div>
      </div>
    </section>
  );
};

export default Stats;
