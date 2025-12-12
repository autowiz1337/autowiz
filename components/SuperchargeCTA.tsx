
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const SuperchargeCTA: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Supercharge Your Listings?</h2>
            <div className="flex flex-col items-center justify-center">
                <button className="btn-primary group relative w-full sm:w-auto rounded-full px-12 py-5 text-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500 ease-hypnotic" />
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
