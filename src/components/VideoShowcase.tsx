
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Subtitles, FileText, Settings, Maximize2, Film, ArrowRight, Star } from 'lucide-react';

interface VideoShowcaseProps {
  onNavigate?: (page: string) => void;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-4 tracking-wider uppercase">
            <Film className="w-3 h-3 inline-block mr-1 mb-0.5" />
            Automated Video Production
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Stop Scrolling. <br />
            <span className="text-gradient">Start Watching.</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            We create a professional video with voiceover and captions that is meant to engage the buyer emotionally into a story with our professional written copywriting script and voiceover.
          </p>
        </div>

        {/* Video Player Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#000] group">
          {/* Main Video Area */}
          <div className="aspect-video relative">
            <img 
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
              alt="Cinematic Car Video" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

            {/* Center Play Button */}
            {!isPlaying && (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-all duration-700 ease-hypnotic hover:bg-brand-500/90 hover:border-brand-400 hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] z-20"
              >
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </button>
            )}

            {/* Overlays */}
            <div className="absolute top-6 left-6 flex gap-3">
                <div className="bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium text-white">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    AI Director Mode
                </div>
                <div className="bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium text-gray-300">
                    <FileText className="w-3 h-3 text-brand-400" />
                    Script Generated
                </div>
            </div>

            {/* Dynamic Captions Overlay */}
            <div className="absolute bottom-24 left-0 right-0 text-center px-12">
                <span className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-xl md:text-2xl font-bold text-white shadow-lg">
                    "Experience the raw power of the <span className="text-brand-400">V8 engine</span>..."
                </span>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress transition-all duration-500 hover:h-1.5">
                    <div 
                        className="h-full bg-brand-500 rounded-full relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 shadow transition-opacity" />
                    </div>
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-400 transition-colors duration-300 hover:scale-110">
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                        </button>
                        <div className="flex items-center gap-2 group/vol">
                            <Volume2 className="w-5 h-5" />
                            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                <div className="w-16 h-1 bg-white/30 rounded-full ml-2">
                                    <div className="w-3/4 h-full bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="text-sm font-mono text-gray-400">0:12 / 0:45</div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded border border-white/5 transition-all duration-500 hover:scale-105">
                            <Subtitles className="w-3 h-3" />
                            CC
                        </button>
                        <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hover:rotate-90 duration-700" />
                        <Maximize2 className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" />
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-700 ease-hypnotic">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                    <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">Emotional Scripting</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">AI analyzes features to write a compelling narrative, not just a spec list.</p>
            </div>
            <div className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-700 ease-hypnotic">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                    <Volume2 className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">Pro Voiceover</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Seamlessly synced neural voiceovers that sound indistinguishable from human talent.</p>
            </div>
            <div className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-700 ease-hypnotic">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                    <Subtitles className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">Dynamic Captions</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Burned-in captions ensure engagement even when sound is muted on social feeds.</p>
            </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 pt-24 border-t border-slate-200 dark:border-white/5 text-center">
            <div className="flex flex-col items-center justify-center">
                <button 
                    onClick={() => onNavigate?.('checkout')}
                    className="btn-primary btn-glow group relative w-full sm:w-auto rounded-full px-12 py-5 text-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                    <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-gray-400">Rated 4.9/5 by Dealership Principals</div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default VideoShowcase;
