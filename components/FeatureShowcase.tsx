import React, { useState } from 'react';
import { Camera, PenTool, MessageSquare, BarChart3, Search, ShieldCheck, User, Bot } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Auto-Enhance Photos",
    description: "Our AI adjusts lighting, removes cluttered backgrounds, and centers the vehicle instantly.",
    icon: <Camera className="w-5 h-5" />,
    tags: ["Visuals", "Branding"]
  },
  {
    title: "Smart Descriptions",
    description: "Generate SEO-rich, emotive descriptions based on VIN data and key highlights.",
    icon: <PenTool className="w-5 h-5" />,
    tags: ["Content", "SEO"]
  },
  {
    title: "Lead Responder",
    description: "24/7 AI agent that answers technical questions about towing capacity, MPG, and features.",
    icon: <MessageSquare className="w-5 h-5" />,
    tags: ["Communication", "Sales"]
  },
  {
    title: "Market Analytics",
    description: "Real-time pricing adjustments based on local competitor inventory.",
    icon: <BarChart3 className="w-5 h-5" />,
    tags: ["Data", "Strategy"]
  }
];

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold mb-4 tracking-wider">
                AI IN EVERY DEPARTMENT
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                AI with full context — <br />
                embedded in your showroom.
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Controls */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Your Agents</h3>
                <div className="grid grid-cols-2 gap-2">
                    {features.map((feature, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveFeature(idx)}
                            className={`p-3 rounded-xl text-left transition-all duration-300 border ${
                                activeFeature === idx 
                                ? 'bg-gradient-to-br from-white/10 to-white/5 border-brand-400/50 shadow-lg shadow-brand-500/10' 
                                : 'bg-transparent border-transparent hover:bg-white/5'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                                activeFeature === idx ? 'bg-brand-500 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {feature.icon}
                            </div>
                            <div className={`text-sm font-semibold ${activeFeature === idx ? 'text-white' : 'text-gray-400'}`}>
                                {feature.title}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="p-6 bg-[#020617] border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Team Utilization</span>
                    <span className="text-green-400 text-sm font-mono">98%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-accent-purple w-[98%]" />
                </div>
            </div>
          </div>

          {/* Right Side: Display */}
          <div className="lg:col-span-8">
             <div className="h-full min-h-[500px] bg-[#0f172a] rounded-3xl border border-white/10 p-1 relative overflow-hidden group">
                {/* Gradient Background Effect */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-accent-purple/10" />
                
                <div className="relative h-full bg-[#020617] rounded-[20px] overflow-hidden flex flex-col">
                    {/* Header of the card */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <Bot className="w-5 h-5 text-brand-400" />
                            <span className="font-mono text-sm text-gray-300">Velocity_Agent_v2.5</span>
                        </div>
                        <div className="flex gap-2">
                            {features[activeFeature].tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wide bg-white/5 rounded border border-white/10 text-gray-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-black/50">
                            {/* Fix: Cast icon to ReactElement<any> to allow 'size' prop */}
                            {React.cloneElement(features[activeFeature].icon as React.ReactElement<any>, { size: 40, className: "text-white" })}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">{features[activeFeature].title}</h3>
                        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                            {features[activeFeature].description}
                        </p>
                        
                        {/* Simulated Activity Stream */}
                        <div className="mt-12 w-full max-w-lg text-left">
                            <div className="text-xs font-bold text-gray-600 uppercase mb-3 ml-2">Live Activity</div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="flex-1">
                                        <div className="h-2 w-3/4 bg-gray-700 rounded mb-2" />
                                        <div className="h-2 w-1/2 bg-gray-800 rounded" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 opacity-50">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                                    <div className="flex-1">
                                        <div className="h-2 w-2/3 bg-gray-700 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;