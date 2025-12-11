
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const SuperchargeCTA: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Supercharge Your Listings?</h2>
            <div className="flex flex-col items-center justify-center">
                <button className="group relative w-full sm:w-auto rounded-full p-[3px] overflow-hidden shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)] transition-all duration-1000 ease-hypnotic hover:shadow-[0_0_70px_-10px_rgba(217,70,239,0.6)] hover:scale-105">
                    <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#ec4899_0%,#0ea5e9_50%,#ec4899_100%)] animate-spin-slow group-hover:[animation-duration:3s]" />
                    <span className="relative flex h-full w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-10 py-4 text-lg font-bold text-white backdrop-blur-3xl transition-all duration-700 ease-hypnotic group-hover:bg-slate-900/90">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500 ease-hypnotic" />
                    </span>
                </button>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                    <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                    </div>
                    <div className="text-xs font-medium text-gray-400">Rated 4.9/5 by Dealership Principals</div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default SuperchargeCTA;
