import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Bot, Volume2, ArrowRight, BarChart3, CheckCircle2, Star } from 'lucide-react';

interface VoiceoverShowcaseProps {
  onNavigate?: (page: string) => void;
}

const AudioPlayer: React.FC<{ 
  type: 'robotic' | 'pro'; 
  title: string; 
  subtitle: string; 
  duration: string;
  audioSrc?: string; // URL to the audio file
}> = ({ type, title, subtitle, duration, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPro = type === 'pro';

  const togglePlay = () => {
    if (audioRef.current && audioSrc) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Fallback simulation if no audio file is present
      if (!isPlaying) setProgress(0);
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Real Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Fallback Simulation Effect (only runs if no audioSrc)
  useEffect(() => {
    if (audioSrc) return; 

    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 50); // Simulates 5 second clip
    }
    return () => clearInterval(interval);
  }, [isPlaying, audioSrc]);

  return (
    <div className="relative p-6 rounded-2xl border transition-all duration-700 ease-hypnotic overflow-hidden group bg-white dark:bg-brand-900/10 border-slate-200 dark:border-brand-500/30 hover:border-brand-400 dark:hover:border-brand-500/50 shadow-lg shadow-brand-500/5 dark:shadow-brand-500/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-brand-500/5 dark:to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-80" />

      {/* Hidden Audio Element - Conditionally rendered to prevent "no supported sources" error */}
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}

      <div className="relative z-10 flex items-center gap-4">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ease-hypnotic hover:scale-110 bg-brand-500 hover:bg-brand-400 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              {/* Keep icon distinct to differentiate content type */}
              {isPro ? <Mic className="w-3 h-3 text-brand-500 dark:text-brand-400" /> : <Bot className="w-3 h-3 text-brand-500 dark:text-brand-400" />}
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-gray-500">{duration}</span>
          </div>
          
          <div className="text-xs text-slate-500 dark:text-gray-500 mb-3">{subtitle}</div>

          {/* Visualizer Waveform */}
          <div className="h-8 flex items-center gap-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-1 rounded-full transition-all duration-150 bg-brand-400 dark:bg-brand-400"
                style={{
                  height: isPlaying 
                    ? `${Math.max(20, Math.random() * 100)}%` 
                    : `${30 + Math.sin(i) * 20}%`,
                  opacity: i / 20 < progress / 100 ? 1 : 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-white/5">
        <div 
          className="h-full transition-all duration-100 ease-linear bg-brand-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const VoiceoverShowcase: React.FC<VoiceoverShowcaseProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Player Comparison (Left Side on Desktop, Bottom on Mobile) */}
          <div className="bg-white dark:bg-[#0f172a] p-2 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl order-2 lg:order-1">
            <div className="bg-slate-50 dark:bg-[#020617] rounded-[20px] p-8 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest">Audio Sample Comparison</h3>
                <span className="px-2 py-1 rounded bg-white dark:bg-white/5 text-[10px] text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-white/10">Script: 2022 Ford F-150</span>
              </div>

              <AudioPlayer 
                type="robotic"
                title="Standard TTS"
                subtitle="Flat, monotone, mispronounces technical terms."
                duration="0:12"
                audioSrc="" 
              />

              <div className="flex justify-center -my-3 relative z-20">
                <div className="bg-white dark:bg-[#020617] px-3 py-1 text-xs text-slate-500 dark:text-gray-500 font-mono border border-slate-200 dark:border-white/10 rounded-full shadow-lg">
                  VS
                </div>
              </div>

              <AudioPlayer 
                type="pro"
                title="Velocity Neural Voice"
                subtitle="Warm, confident, emphasizes key selling points."
                duration="0:14"
                audioSrc="" 
              />
            </div>
          </div>

          {/* Text Content (Right Side on Desktop, Top on Mobile) */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-xs font-bold mb-6 tracking-wider uppercase">
              <Volume2 className="w-3 h-3 inline-block mr-1 mb-0.5" />
              Neural Audio Engine
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Give your listings a <br />
              <span className="text-slate-900 dark:text-white">Voice that Sells</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Buyers engage 4x longer with video content that includes professional audio. Velocity AI instantly transforms your script into a studio-quality voiceover, complete with emotive inflections that robotic TTS simply can't match.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500" />
                </div>
                <span className="text-slate-700 dark:text-gray-300">Human-like breathing and pacing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500" />
                </div>
                <span className="text-slate-700 dark:text-gray-300">Auto-adjusts tone for Luxury vs Sport</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-500" />
                </div>
                <span className="text-slate-700 dark:text-gray-300">Multi-language support included</span>
              </div>
            </div>

            <div className="mt-10">
                <button 
                    onClick={() => onNavigate?.('checkout')}
                    className="btn-primary group relative rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                    Generate Sales Voiceovers
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    4x Longer Viewer Retention
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VoiceoverShowcase;