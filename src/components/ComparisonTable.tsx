import React from 'react';
import { CheckCircle2, XCircle, Clock, DollarSign, Users, Zap, ShieldAlert, Award, ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  onNavigate?: (page: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs font-bold mb-4 tracking-wider uppercase">
            The Hard Truth
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Stop Burning Cash on <br />
            <span className="text-slate-900 dark:text-white">Slow Processes</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            To match Velocity AI's output, you'd need to hire a Copywriter, a Video Editor, a Voice Artist, and a Market Analyst. That's over $18k/mo in salaries alone.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0f172a]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
                
                {/* Feature Labels Column */}
                <div className="hidden md:block p-8 bg-white dark:bg-[#020617]">
                    <div className="h-24 flex items-center text-xl font-bold text-slate-400 dark:text-gray-500">Comparison Metric</div>
                    <div className="space-y-8 mt-8">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <DollarSign className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Monthly Cost
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <Clock className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Turnaround Time
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <Users className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Required Team
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <ShieldAlert className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Reliability Risk
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <Award className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Quality Consistency
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium h-12">
                            <Zap className="w-5 h-5 text-slate-400 dark:text-gray-600" /> Scalability
                        </div>
                    </div>
                </div>

                {/* Traditional Way */}
                <div className="p-8 bg-slate-50 dark:bg-[#0f172a]/50 relative">
                    <div className="h-24 flex flex-col justify-center mb-8 border-b border-slate-200 dark:border-white/5 pb-6">
                        <div className="text-sm font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">The Old Way</div>
                        <h3 className="text-2xl font-bold text-slate-700 dark:text-gray-300">In-House Team</h3>
                    </div>

                    {/* Mobile Headers included inline for responsive */}
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Monthly Cost</span>
                            <div className="text-xl font-bold text-red-500 dark:text-red-400">$18,000+ <span className="text-sm font-normal text-slate-500 dark:text-gray-500">/mo</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Time</span>
                            <div className="text-slate-700 dark:text-gray-300">48-72 Hours <span className="text-slate-500 dark:text-gray-500 text-sm">per listing</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Team</span>
                            <div className="text-slate-700 dark:text-gray-300">4 Specialists <span className="text-slate-500 dark:text-gray-500 text-sm">(Hiring, Training)</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Risk</span>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                <XCircle className="w-4 h-4 text-red-500" />
                                Sick days, Turnover, Burnout
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Consistency</span>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                <XCircle className="w-4 h-4 text-red-500" />
                                Varies by employee mood
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                            <span className="md:hidden text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">Scalability</span>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                <XCircle className="w-4 h-4 text-red-500" />
                                Bottlenecked by headcount
                            </div>
                        </div>
                    </div>
                </div>

                {/* Velocity AI Way */}
                <div className="p-8 bg-brand-50 dark:bg-brand-900/10 relative overflow-hidden shadow-[inset_0_0_40px_rgba(14,165,233,0.1)]">
                    {/* Slow Burning Glow Border Effect */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute inset-0 border border-brand-400/40 shadow-[inset_0_0_30px_rgba(14,165,233,0.25)] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_20px_#38bdf8] animate-[pulse_3s_ease-in-out_infinite]"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent"></div>
                    </div>
                    
                    <div className="h-24 flex flex-col justify-center mb-8 border-b border-brand-200 dark:border-white/10 pb-6 relative z-10">
                        <div className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">The Velocity Way</div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Velocity AI</h3>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Monthly Cost</span>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">$499 <span className="text-sm font-normal text-brand-600 dark:text-brand-200">/mo</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Time</span>
                            <div className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                2 Minutes <span className="text-brand-600 dark:text-brand-200 text-sm font-normal">per listing</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Team</span>
                            <div className="text-slate-900 dark:text-white font-bold">1 Platform <span className="text-brand-600 dark:text-brand-200 text-sm font-normal">(All-in-One)</span></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Risk</span>
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                                99.9% Uptime, 24/7 Availability
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Consistency</span>
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                                100% Brand Compliant Always
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center h-auto md:h-12 gap-2">
                             <span className="md:hidden text-xs font-bold text-brand-500 uppercase">Scalability</span>
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                                Infinite (1 or 10,000 listings)
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* New CTA Section - "Rational Close" */}
        <div className="mt-16 text-center">
            <button 
                onClick={() => onNavigate?.('checkout')}
                className="btn-primary group relative w-full sm:w-auto rounded-full px-12 py-5 text-xl font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
                Stop Wasting Budget
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <p className="mt-4 text-sm text-slate-500 dark:text-gray-500 font-medium">
                30-Day Money-Back Guarantee • Cancel Anytime
            </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;