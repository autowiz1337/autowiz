
import React, { useState } from 'react';
import { Sparkles, ChevronRight, Loader2, Copy, Check } from 'lucide-react';
import { generateListingDescription } from '../services/geminiService';

const LiveDemo: React.FC = () => {
  const [make, setMake] = useState('Ford');
  const [model, setModel] = useState('F-150 Raptor');
  const [year, setYear] = useState('2022');
  const [features, setFeatures] = useState('Moonroof, Leather seats, Off-road package, Low mileage');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    try {
      const result = await generateListingDescription(make, model, year, features);
      setOutput(result);
    } catch (e) {
      setOutput("Error: Could not connect to AI service. Please check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="demo" className="py-24 bg-[#050b1d] relative overflow-hidden">
       <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-20" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Experience <span className="text-brand-400">Speed</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Don't just take our word for it. Generate a high-conversion listing description right now using our Gemini 2.5 Flash integration. 
                    <br/><br/>
                    What usually takes a copywriter 20 minutes, Velocity AI does in 2 seconds.
                </p>

                <div className="flex gap-8 border-t border-white/10 pt-8">
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">150k+</div>
                        <div className="text-sm text-gray-500">Listings Optimized</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1">1.1s</div>
                        <div className="text-sm text-gray-500">Generation Time</div>
                    </div>
                </div>
            </div>

            {/* Interactive Card */}
            <div className="bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="bg-[#020617] px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs font-mono text-gray-500">Demo Mode</span>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Year</label>
                            <input 
                                type="text" 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Make</label>
                            <input 
                                type="text" 
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-500 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Model</label>
                        <input 
                            type="text" 
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Key Features</label>
                        <input 
                            type="text" 
                            value={features}
                            onChange={(e) => setFeatures(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>

                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-500 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] bg-gradient-to-r from-brand-600 via-accent-purple to-brand-600 bg-[length:200%_auto] animate-gradient-x mt-4"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Generate Description
                            </>
                        )}
                    </button>

                    {output && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-accent-purple">AI OUTPUT</span>
                                <button 
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="bg-black/30 rounded-lg p-4 text-sm text-gray-300 leading-relaxed border border-white/5 font-mono">
                                {output}
                            </div>
                        </div>
                    )}
                </div>
            </div>
         </div>
       </div>
    </section>
  );
};

export default LiveDemo;
