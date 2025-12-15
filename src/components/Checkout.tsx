
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, ArrowRight, AlertCircle, ShieldCheck, Clock, Star, Quote, Loader2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  onBack: () => void;
}

const reviews = [
    {
        name: "Alex M.",
        role: "Sales Manager",
        initials: "AM",
        content: "Submitted my listing and got the assets in 2 minutes. The video generated 5 leads on day 1.",
        rating: 5
    },
    {
        name: "Sarah K.",
        role: "General Manager",
        initials: "SK",
        content: "The psychological copy is actually scary good. It highlights features I didn't even know the car had.",
        rating: 5
    },
    {
        name: "Robert D.",
        role: "Dealer Principal",
        initials: "RD",
        content: "Was skeptical about the 'free' pilot but it's legit. No card asked. The results speak for themselves.",
        rating: 5
    },
    {
        name: "Elena V.",
        role: "Marketing Dir.",
        initials: "EV",
        content: "Finally a tool that replaces 3 different agencies. The photos look studio quality.",
        rating: 5
    }
];

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    listingUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            product: 'free_pilot',
            timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error('Failed to submit form');
         setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-20 flex flex-col items-center justify-center px-6">
             <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl text-center max-w-md w-full animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pop">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Application Received</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Your pilot application has been securely received. Our team is already analyzing your listing URL and will reach out to <strong className="text-slate-900 dark:text-white">{formData.email}</strong> shortly with your optimized assets.
                </p>
                <button onClick={() => navigate('/')} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" /> Return to Home
                </button>
             </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative pt-20 pb-12">
      {/* TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/10 z-50 flex flex-col justify-center shadow-sm">
        <div className="max-w-3xl mx-auto w-full px-6">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-slate-50 dark:text-gray-400 uppercase tracking-wider">Application Progress</span>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">90% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-accent-purple w-[90%] animate-pulse rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Back Button */}
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white mb-8 flex items-center gap-2 transition-colors">
            ← Back to details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-7">
                
                {/* Timer Alert */}
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 p-4 rounded-xl flex items-center gap-4 mb-8 animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-red-800 dark:text-red-300">Spot Reserved for <span className="font-mono text-lg">{formatTime(timeLeft)}</span></div>
                        <div className="text-xs text-red-600 dark:text-red-400/70">Due to high demand, we can only hold your pilot slot for 5 minutes.</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500"></div>
                    
                    <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Final Step</h2>
                    <p className="text-slate-500 dark:text-gray-400 mb-8">Complete your details to start your risk-free pilot.</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Alex Johnson"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="alex@dealership.com"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">
                                Autovit Listing URL
                                <span className="ml-2 text-xs font-normal text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded-full border border-brand-100 dark:border-brand-500/30">Required</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="url" 
                                    placeholder="https://www.autovit.ro/anunt/..."
                                    required
                                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                    value={formData.listingUrl}
                                    onChange={(e) => setFormData({...formData, listingUrl: e.target.value})}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500">
                                    <Lock className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                Your listing data is processed securely via SSL encryption.
                            </p>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary btn-glow w-full py-5 rounded-xl text-xl font-bold text-white shadow-xl shadow-brand-500/20 transition-all duration-1000 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.5)] bg-gradient-to-r from-brand-600 via-accent-purple to-brand-600 bg-[length:200%_auto] animate-gradient-x flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Claim My Free Optimization
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-xs text-slate-400 dark:text-gray-500">
                                By clicking above, you agree to our Terms of Service. <br/> No credit card required for the pilot.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* RIGHT COLUMN: SUMMARY */}
            <div className="lg:col-span-5">
                <div className="sticky top-32">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 mb-6 shadow-lg dark:shadow-none">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">What you're getting today:</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="mt-1 bg-green-100 dark:bg-green-500/20 p-1 rounded-full h-fit">
                                        <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-gray-300">AI Studio Photo Suite</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$2,000</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="mt-1 bg-green-100 dark:bg-green-500/20 p-1 rounded-full h-fit">
                                        <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-gray-300">Psychological Copywriting</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$1,500</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="mt-1 bg-green-100 dark:bg-green-500/20 p-1 rounded-full h-fit">
                                        <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-gray-300">Cinematic Video Gen</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$2,500</span>
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />
                             <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 dark:text-white">Total Value</span>
                                <span className="font-bold text-slate-400 dark:text-gray-500 line-through decoration-red-500 decoration-2">$6,000+</span>
                            </div>
                             <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-brand-600 dark:text-brand-400">Your Price Today</span>
                                <span className="text-2xl font-extrabold text-green-500 dark:text-green-400">FREE</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-[#020617] rounded-xl p-4 border border-slate-200 dark:border-white/5 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-slate-400 dark:text-gray-500 flex-shrink-0" />
                            <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                                <strong className="text-slate-700 dark:text-gray-300">100% Performance Guarantee:</strong> If we don't double your leads in 30 days, you pay absolutely nothing for the continued service.
                            </p>
                        </div>
                    </div>

                    {/* REVIEWS SECTION */}
                    <div className="border-t border-slate-200 dark:border-white/10 pt-8 mt-8 overflow-hidden relative">
                        <div className="flex items-center gap-2 mb-6">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Success Stories</span>
                        </div>
                        
                        <div className="flex w-max gap-4 animate-scroll hover:[animation-play-state:paused]">
                            {[...reviews, ...reviews].map((review, i) => (
                                <div key={i} className="w-[280px] bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg relative flex-shrink-0">
                                    <div className="absolute top-4 right-4 flex gap-0.5">
                                        {[1,2,3,4,5].map(star => (
                                            <Star key={star} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <div className="mb-3 text-brand-200 dark:text-brand-500/30">
                                        <Quote size={20} fill="currentColor" />
                                    </div>
                                    <p className="text-slate-700 dark:text-gray-300 text-xs mb-4 relative z-10 leading-relaxed font-light">"{review.content}"</p>
                                    <div className="flex items-center gap-3 border-t border-slate-100 dark:border-white/5 pt-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-[10px] font-bold text-brand-700 dark:text-brand-300 border border-slate-200 dark:border-white/10">
                                            {review.initials}
                                        </div>
                                        <div>
                                            <div className="text-slate-900 dark:text-white font-bold text-xs">{review.name}</div>
                                            <div className="text-slate-500 dark:text-gray-500 text-[10px] font-mono">{review.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
