import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';

interface GuaranteeSectionProps {
  onNavigate?: (page: string) => void;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-yellow-50/30 dark:bg-[#020617] relative overflow-hidden">
      {/* Background elements for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-8 shadow-[0_0_40px_rgba(234,179,8,0.3)] group hover:scale-110 transition-transform duration-700 ease-hypnotic">
            <ShieldCheck className="w-10 h-10 text-white dark:text-[#020617]" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
            Our "Double Your Performance" <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 dark:from-yellow-200 dark:via-yellow-400 dark:to-yellow-200">Guarantee</span>
        </h2>

        <div className="bg-white dark:bg-[#0f172a]/80 backdrop-blur-sm border border-yellow-500/20 p-8 md:p-12 rounded-3xl relative group hover:border-yellow-500/40 transition-colors duration-500 shadow-xl dark:shadow-none">
             {/* Corner accents */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/30 rounded-tl-xl group-hover:border-yellow-500/60 transition-colors" />
             <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500/30 rounded-tr-xl group-hover:border-yellow-500/60 transition-colors" />
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500/30 rounded-bl-xl group-hover:border-yellow-500/60 transition-colors" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/30 rounded-br-xl group-hover:border-yellow-500/60 transition-colors" />

            <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-6 font-light text-left md:text-center">
                We are so profoundly confident in our ability to drive results that we offer this ironclad promise: if this fully optimized, visually breathtaking listing doesn't generate at least <strong className="text-slate-900 dark:text-white font-bold">DOUBLE the qualified inquiries</strong> for that specific car within the first 30 days (compared to its previous 30-day average), your entire pilot fee is <strong className="text-yellow-600 dark:text-yellow-400">immediately and completely refunded</strong> – no questions asked.
            </p>
            <p className="text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed font-light text-left md:text-center">
                This isn't just an offer; it's a direct challenge to dramatically increase your sales velocity and attract a flood of serious buyers. You get our full, world-class service, a visually compelling and persuasive listing, and a guaranteed surge in interest – all with <strong className="text-slate-900 dark:text-white">zero financial risk</strong> and nothing but accelerated sales and profits to gain. The only thing you risk is not seeing what's possible when your listings truly stand out and perform.
            </p>
            
            <div className="mt-10 text-center">
                <button 
                    onClick={() => onNavigate?.('checkout')}
                    className="btn-primary group relative w-full sm:w-auto rounded-full px-12 py-5 text-xl font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto mb-6"
                >
                    Claim My Risk-Free Pilot
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <div className="flex items-center justify-center gap-3 opacity-80">
                    <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                    <span className="font-serif italic text-yellow-600 dark:text-yellow-500 font-bold text-lg tracking-wide">The Velocity Ironclad Promise</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;