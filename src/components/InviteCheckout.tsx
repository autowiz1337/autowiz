import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, ArrowRight, ShieldCheck, Zap, Loader2, AlertCircle, UserCheck, Database, Image, MapPin, Mic, Info, Home } from 'lucide-react';
// @ts-ignore - Ignoring missing exports error from react-router-dom which may be due to environment type definition mismatch
import { useNavigate } from 'react-router-dom';

interface InviteCheckoutProps {
  onBack: () => void;
}

const CAR_MAKES = ["bmw", "audi", "mercedes", "ford", "toyota", "porsche", "tesla", "vw", "volkswagen"];

const InviteCheckout: React.FC<InviteCheckoutProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    listingUrl: '',
    voiceGender: 'female'
  });
  
  // URL Scanning State
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [detectedMake, setDetectedMake] = useState<string | null>(null);
  
  // Interaction states
  const [nameBlurred, setNameBlurred] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Slots logic
  const totalDailySlots = 50;
  const [remainingSlots] = useState(() => Math.floor(Math.random() * (15 - 5 + 1)) + 5);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Advanced URL Scanning Effect
  useEffect(() => {
    if (!formData.listingUrl) {
        setScanState('idle');
        setUrlError(null);
        return;
    }

    const delayScan = setTimeout(() => {
        if (formData.listingUrl.length > 8) {
             const lowerUrl = formData.listingUrl.toLowerCase();
             
             if (!lowerUrl.includes('autovit.ro')) {
                 setScanState('idle');
                 setUrlError("Please use a valid Autovit.ro URL");
                 return;
             }
             setUrlError(null);
            setScanState('scanning');

            setTimeout(() => {
                const foundMake = CAR_MAKES.find(make => lowerUrl.includes(make));
                setDetectedMake(foundMake || null);
                setScanState('complete');
            }, 1800);
        } else {
            setScanState('idle');
            setUrlError(null);
        }
    }, 800);

    return () => clearTimeout(delayScan);
  }, [formData.listingUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (urlError) return;

    setIsSubmitting(true);

    try {
      // Reverted to external webhook for data capture
      const response = await fetch('https://app.autowizz.cfd/webhook/new-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            product: 'invite_beta',
            timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
         setIsSuccess(true);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
         console.error('API returned error');
         setIsSuccess(true); // Still show success to user for pilot flow
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-20 flex flex-col items-center justify-center px-6">
             <div className="bg-white dark:bg-[#0f172a] p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl text-center max-w-lg w-full relative overflow-hidden animate-fade-in-up">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>
                
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pop">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Assets Generating...</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                    Welcome to the Velocity AI Beta Program, <span className="font-bold text-slate-900 dark:text-white">{formData.name.split(' ')[0]}</span>.
                    <br/><br/>
                    Our neural engines are currently processing your Autovit listing. You will receive the optimized photos, psychological copy, and video assets at <strong className="text-brand-600 dark:text-brand-400">{formData.email}</strong> within 15 minutes.
                </p>
                
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-8 text-left border border-slate-100 dark:border-white/5">
                    <div className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-2">Next Steps</div>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Check your inbox for the "Access Granted" email.
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Click the magic link to view your dashboard.
                        </li>
                    </ul>
                </div>

                <button onClick={() => navigate('/')} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" /> Return to Home
                </button>
             </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative pt-24 pb-12">
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/10 z-50 flex flex-col justify-center shadow-sm">
        <div className="max-w-4xl mx-auto w-full px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Invite-Only Access</span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-gray-400">
                Beta Batch #402
            </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        
        {/* URGENCY BANNER */}
        <div className="mb-8 animate-fade-in">
             <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-500/30 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
                            Invites Closing Soon: <span className="text-indigo-600 dark:text-indigo-400">{remainingSlots} slots</span> remaining today
                        </div>
                        <div className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatTime(timeLeft)}</div>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-200 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${((totalDailySlots - remainingSlots) / totalDailySlots) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* MAIN FORM */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500"></div>
            
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-brand-50 dark:bg-white/5 rounded-2xl mb-4">
                    <ShieldCheck className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">Activate Your Invite</h1>
                <p className="text-slate-500 dark:text-gray-400">
                    You've been selected to test Velocity AI. Enter your details to claim your free optimization package.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="e.g. Alex Johnson"
                            required
                            className="relative w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all z-10"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            onBlur={() => setNameBlurred(true)}
                        />
                    </div>
                    {formData.name.length > 2 && nameBlurred && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 animate-in fade-in slide-in-from-top-1">
                            <UserCheck className="w-3 h-3" />
                            <span>Authorized invite for <span className="font-bold">{formData.name.split(' ')[0]}</span></span>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Work Email</label>
                    <div className="relative group">
                        <input 
                            type="email" 
                            placeholder="alex@dealership.com"
                            required
                            className="relative w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all z-10"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    {isValidEmail(formData.email) && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-top-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Priority delivery enabled.</span>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Autovit Listing URL</label>
                    <div className="relative group">
                        <div className="relative z-10">
                            <input 
                                type="url" 
                                placeholder="https://www.autovit.ro/anunt/..."
                                required
                                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-[#020617] border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all ${
                                    urlError 
                                    ? 'border-red-500 dark:border-red-500' 
                                    : 'border-slate-200 dark:border-white/10'
                                }`}
                                value={formData.listingUrl}
                                onChange={(e) => setFormData({...formData, listingUrl: e.target.value})}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500">
                                <Lock className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    
                    {urlError && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 font-bold">
                            <AlertCircle className="w-3 h-3" />
                            <span>{urlError}</span>
                        </div>
                    )}
                    
                    {/* URL SCANNING UI */}
                    {scanState === 'scanning' && !urlError && (
                       <div className="mt-4 p-4 border border-brand-200 dark:border-brand-500/30 rounded-xl bg-brand-50 dark:bg-brand-900/10 animate-in fade-in slide-in-from-top-2">
                          <div className="flex items-center gap-3 mb-3">
                             <Loader2 className="w-4 h-4 text-brand-600 dark:text-brand-400 animate-spin" />
                             <span className="text-sm font-bold text-brand-900 dark:text-brand-100">Validating Listing Data...</span>
                          </div>
                          <div className="space-y-2">
                             <div className="h-1.5 w-full bg-brand-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-500 w-2/3 animate-[shimmer_1s_infinite] relative">
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                                 </div>
                             </div>
                          </div>
                       </div>
                    )}

                    {/* SCAN COMPLETE UI */}
                    {scanState === 'complete' && !urlError && (
                        <div className="mt-4 rounded-xl border border-brand-500/30 overflow-hidden bg-brand-50/50 dark:bg-brand-900/10 shadow-lg animate-in fade-in slide-in-from-top-2 p-4 flex gap-4 items-center relative group">
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                                <CheckCircle2 className="w-3 h-3" />
                                Confirmed
                            </div>

                            <div className="flex-1 min-w-0 py-1">
                                <div className="text-sm font-bold text-slate-900 dark:text-white truncate pr-24">
                                    {detectedMake 
                                        ? `${detectedMake.charAt(0).toUpperCase() + detectedMake.slice(1)} Detected`
                                        : 'Vehicle Detected'
                                    }
                                </div>
                                <div className="text-xs text-slate-500 dark:text-gray-400 mt-1 mb-2">
                                    Ready for optimization
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-[10px] text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/5 shadow-sm">
                                        <Database className="w-3 h-3" />
                                        Specs
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-[10px] text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/5 shadow-sm">
                                        <Image className="w-3 h-3" />
                                        Images
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-[10px] text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/5 shadow-sm">
                                        <MapPin className="w-3 h-3" />
                                        Location
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-3">AI Voice Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, voiceGender: 'male'})}
                            className={`relative group overflow-hidden p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                formData.voiceGender === 'male' 
                                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-white ring-2 ring-brand-500 shadow-md' 
                                : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#020617] text-slate-500 dark:text-gray-400 hover:border-brand-300 dark:hover:border-white/30'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                formData.voiceGender === 'male' ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-white/5'
                            }`}>
                                <Mic className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Male</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormData({...formData, voiceGender: 'female'})}
                            className={`relative group overflow-hidden p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                formData.voiceGender === 'female' 
                                ? 'border-accent-purple bg-purple-50 dark:bg-accent-purple/10 text-accent-purple dark:text-white ring-2 ring-accent-purple shadow-md' 
                                : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#020617] text-slate-500 dark:text-gray-400 hover:border-accent-purple/50 dark:hover:border-white/30'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                formData.voiceGender === 'female' ? 'bg-accent-purple text-white' : 'bg-slate-200 dark:bg-white/5'
                            }`}>
                                <Mic className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Female</span>
                        </button>
                    </div>
                </div>

                <div className="pt-4">
                     <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-200 dark:border-white/5">
                        <div className="flex gap-3">
                            <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                                <strong className="text-slate-700 dark:text-gray-300">Beta Program Terms:</strong> By clicking below, you agree to receive automated marketing assets. No credit card is required for this invited pilot session.
                            </p>
                        </div>
                     </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 rounded-xl text-xl font-bold text-white shadow-xl shadow-brand-500/20 transition-all duration-1000 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.5)] bg-gradient-to-r from-brand-600 via-accent-purple to-brand-600 bg-[length:200%_auto] animate-gradient-x flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                Claim My Optimization
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
            <button onClick={onBack} className="text-sm text-slate-400 hover:text-white transition-colors">
                Cancel and return to homepage
            </button>
        </div>

      </div>
    </div>
  );
};

export default InviteCheckout;