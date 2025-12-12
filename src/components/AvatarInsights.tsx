import React from 'react';
import { Users, Target, Lightbulb, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

interface AvatarInsightsProps {
  onNavigate?: (page: string) => void;
}

const AvatarInsights: React.FC<AvatarInsightsProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content (Right on Desktop, Top on Mobile) */}
          <div className="lg:order-last">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 tracking-wider uppercase">
              <Target className="w-3 h-3 inline-block mr-1 mb-0.5" />
              Sales Enablement
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Know Your Buyer <br />
              <span className="text-blue-600 dark:text-white">Before You Meet Them</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              We research and generate all the intelligence your team needs to sell as fast as possible. Velocity AI provides a deep-dive data sheet on the specific customer avatar for every vehicle, along with the top 3 selling points that matter most to them.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Precise Customer Avatars</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Know if your buyer is a "Safety-First Parent" or a "Weekend Off-Roader" before the test drive begins.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Top 3 Selling Points</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Curated talking points that connect vehicle features directly to the buyer's specific desires and pain points.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Faster Close Rates</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    Equip your team with the right words to handle objections and build emotional value instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
                <button 
                    onClick={() => onNavigate?.('checkout')}
                    className="btn-primary group relative rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                    Get My Buyer Avatars
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                    <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=64&h=64" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#020617] object-cover" />
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#020617] object-cover" />
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-[#020617] object-cover" />
                    </div>
                    Used by 500+ Sales Managers
                </div>
            </div>
          </div>

          {/* Visual: Battle Card (Left on Desktop, Bottom on Mobile) */}
          <div className="relative lg:order-first">
            <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden relative z-10 group hover:border-blue-500/30 transition-colors">
                {/* Header */}
                <div className="bg-slate-100 dark:bg-[#1e293b] px-6 py-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center font-bold text-white text-xs">AI</div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">Vehicle Strategy Report</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">2022 Toyota 4Runner TRD Pro</div>
                        </div>
                    </div>
                    <div className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold rounded border border-green-200 dark:border-green-500/30">
                        High Demand
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Avatar Section */}
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <h5 className="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide">Target Avatar</h5>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16">
                                <img 
                                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                                    alt="Avatar" 
                                    className="w-full h-full rounded-full object-cover border-2 border-blue-500"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-[10px] px-1.5 py-0.5 rounded-full text-white font-bold">92%</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">"The Adventure Seeker"</div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                                    <span className="bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent px-2 py-0.5 rounded">Age 30-45</span>
                                    <span className="bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent px-2 py-0.5 rounded">Active Lifestyle</span>
                                    <span className="bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent px-2 py-0.5 rounded">Dog Owner</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Selling Points */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <h5 className="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide">Talking Points</h5>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 flex gap-3 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors cursor-default">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold text-xs">1</div>
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">Off-Road Capability</div>
                                <div className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">"Mention the locking rear diff and crawl control for their weekend trips."</div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-default">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-gray-400 font-bold text-xs">2</div>
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">Resale Value</div>
                                <div className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">"Highlight that 4Runners hold value better than almost any other SUV."</div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-default">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-gray-400 font-bold text-xs">3</div>
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">Cargo Versatility</div>
                                <div className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">"Show the sliding rear cargo deck – perfect for camping gear."</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Background Card */}
            <div className="absolute top-4 -right-4 w-full h-full bg-blue-100 dark:bg-blue-600/5 rounded-3xl border border-slate-200 dark:border-white/5 -z-10 transform rotate-3" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AvatarInsights;