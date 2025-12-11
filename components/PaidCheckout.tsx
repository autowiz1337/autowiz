
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Lock, ArrowRight, ShieldCheck, Clock, Loader2, CreditCard, AlertCircle, Star, Quote, UserCheck, Users, MessageSquare, Mic, Check, Eye, Zap, MapPin, Globe, Database, Image, Camera, Film } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe (Replace with your Publishable Key)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaidCheckoutProps {
  onBack: () => void;
}

const CAR_MAKES = ["bmw", "audi", "mercedes", "ford", "toyota", "porsche", "tesla", "vw", "volkswagen"];

const reviews = [
    {
        name: "Alex M.",
        role: "Sales Manager",
        initials: "AM",
        content: "Submitted my listing and got the assets in 2 minutes. The video generated 5 leads on day 1.",
        rating: 4.5
    },
    {
        name: "Sarah K.",
        role: "General Manager",
        initials: "SK",
        content: "The psychological copy is actually scary good. It highlights features I didn't even know the car had.",
        rating: 4.8
    },
    {
        name: "Robert D.",
        role: "Dealer Principal",
        initials: "RD",
        content: "Was skeptical about the pilot but it's legit. The results speak for themselves.",
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

const teamMembers = [
    { 
        role: "Senior Copywriter", 
        name: "Sarah Jenkins", 
        delay: 1000, 
        messages: [
            "Hi {name}! I'm ready to craft your psychological sales copy. Just waiting for the green light!",
            "Checking out your listing details now, {name}. I've already spotted a great sales angle.",
            "Ready to optimize. {name}, your vehicle description is going to stand out significantly."
        ]
    },
    { 
        role: "Visual Specialist", 
        name: "David Chen", 
        delay: 2500, 
        messages: [
            "Photos are queued, {name}. I can start the studio enhancements the moment you confirm.",
            "I'm standing by to run the background replacement for you, {name}.",
            "Visual assets are prepped. Just need your go-ahead to render the final images, {name}."
        ]
    },
    { 
        role: "Video Director", 
        name: "Marcus O'Neil", 
        delay: 4000, 
        messages: [
            "Studio is prepped for your video generation, {name}. Let's get this listing live!",
            "Voiceover script is drafted. Ready to synthesize the audio and cut the video for you, {name}.",
            "Video engine is warm. Waiting for your confirmation to start the rendering process."
        ]
    },
    { 
        role: "Account Manager", 
        name: "Emily Rose", 
        delay: 5500, 
        messages: [
            "I've reserved your priority slot, {name}. Please complete payment to avoid losing your place in line.",
            "Welcome {name}! I'll be overseeing your project to ensure 24-hour turnaround.",
            "Hi {name}! I've flagged your account for expedited processing once approved."
        ]
    }
];

// --- TEAM ASSIGNMENT WIDGET ---
const TeamAssignment: React.FC<{ customerName: string }> = ({ customerName }) => {
    const [statuses, setStatuses] = useState<string[]>([]);
    const [messages, setMessages] = useState<Array<{id: number, sender: string, text: string}>>([]);

    // Extract first name for personalization, fallback to "there" if empty
    const firstName = customerName ? customerName.split(' ')[0] : 'there';

    // 1. Handle Assignments Sequence
    useEffect(() => {
        const timers: number[] = [];
        setStatuses([]); // Reset on mount

        teamMembers.forEach((member) => {
            const assignTimer = window.setTimeout(() => {
                setStatuses(prev => [...prev, member.name]);
            }, member.delay);
            timers.push(assignTimer);
        });

        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    // 2. Handle Chat Sequence (Starts only after EVERYONE is assigned)
    useEffect(() => {
        // Only start if all members are assigned
        if (statuses.length !== teamMembers.length) return;

        let isMounted = true;

        const runChatSequence = async () => {
            // Small pause after the last person is assigned before chatting starts
            await new Promise(resolve => setTimeout(resolve, 1500));

            for (let i = 0; i < teamMembers.length; i++) {
                if (!isMounted) break;
                
                // Random delay between 5 to 8 seconds (5000ms - 8000ms)
                const delay = Math.floor(Math.random() * (8000 - 5000 + 1) + 5000);
                
                await new Promise(resolve => setTimeout(resolve, delay));
                
                if (!isMounted) break;

                const member = teamMembers[i];
                // Select a random message from the member's variations
                const randomTemplate = member.messages[Math.floor(Math.random() * member.messages.length)];
                
                // Personalize the message
                const personalizedMessage = randomTemplate.replace('{name}', firstName);

                setMessages(prev => [...prev, { 
                    id: i, 
                    sender: member.name, 
                    text: personalizedMessage 
                }]);
            }
        };

        runChatSequence();

        return () => { isMounted = false; };
    }, [statuses.length, firstName]);

    return (
        <div className="mt-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
            
            {/* Live Messages Stream (Moved to Top) */}
            {messages.length > 0 && (
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase">Team Chat</span>
                    </div>
                    {/* Removed scroll/height restrictions to show full content */}
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div key={msg.id} className="flex gap-3 animate-chat-appear">
                                <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-[10px] font-bold text-brand-700 dark:text-brand-300 flex-shrink-0 mt-1">
                                    {msg.sender.split(' ')[0][0]}
                                </div>
                                <div className="bg-white dark:bg-[#0f172a] p-2.5 rounded-r-xl rounded-bl-xl border border-slate-200 dark:border-white/10 shadow-sm">
                                    <div className="text-[10px] font-bold text-slate-900 dark:text-white mb-0.5">{msg.sender}</div>
                                    <p className="text-xs text-slate-600 dark:text-gray-300 leading-tight">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />
                </div>
            )}

            <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                    <Users className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Live Team Allocation</h3>
            </div>

            {/* Team List */}
            <div className="space-y-3 mb-6">
                {teamMembers.map((member, idx) => {
                    const isAssigned = statuses.includes(member.name);
                    return (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${
                            isAssigned 
                                ? 'bg-white dark:bg-brand-900/20 border-brand-200 dark:border-brand-500/30 shadow-sm animate-pop' 
                                : 'bg-transparent border-transparent opacity-50'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    isAssigned 
                                        ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300' 
                                        : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                                }`}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className={`text-sm font-bold ${isAssigned ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
                                        {member.name}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-gray-400">{member.role}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {isAssigned ? (
                                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg animate-in zoom-in duration-300">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Assigned</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>Matching...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-slate-400 dark:text-gray-500">
                    Your dedicated team is on standby for immediate start.
                </p>
            </div>
        </div>
    );
};

// --- STEP 2: PAYMENT FORM COMPONENT ---
const PaymentForm: React.FC<{ onSuccess: () => void; customerName: string }> = ({ onSuccess, customerName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Extract first name for dynamic greeting
  const firstName = customerName ? customerName.split(' ')[0] : 'there';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      // SIMULATION
      setTimeout(() => {
        setProcessing(false);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <>
        {/* SUCCESS MANAGER HUMANIZATION */}
        <div className="flex items-start gap-4 mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 animate-in fade-in slide-in-from-top-2">
            <div className="relative flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Sarah" className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-[#0f172a]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full animate-pulse"></div>
            </div>
            <div>
                <div className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1">
                    Sarah - Success Manager <CheckCircle2 className="w-3 h-3 text-blue-500" />
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300/80 leading-relaxed">
                    "Hi {firstName}, I've reviewed your listing URL. The photos are perfect candidates for our AI enhancement. You're going to see a huge difference!"
                </p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* High-Visibility Gradient Border Wrapper for Card Input */}
        <div className="relative rounded-xl p-[3px] shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)] group">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 bg-[length:200%_auto] animate-gradient-x opacity-100 rounded-xl" />
            
            {/* Inner Container */}
            <div className="relative bg-white dark:bg-[#1e293b] p-5 rounded-[9px]">
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770', 
                        '::placeholder': {
                        color: '#94a3b8',
                        },
                        iconColor: '#0ea5e9',
                    },
                    invalid: {
                        color: '#ef4444',
                    },
                    },
                }}
                />
            </div>
        </div>
        
        {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {error}
            </div>
        )}

        <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full py-5 rounded-xl text-xl font-bold text-white shadow-xl shadow-brand-500/20 transition-all duration-1000 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.5)] bg-gradient-to-r from-brand-600 via-accent-purple to-brand-600 bg-[length:200%_auto] animate-gradient-x flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {processing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
            <>
                <Lock className="w-5 h-5" />
                Complete Order - $499
            </>
            )}
        </button>
        
        <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" className="h-5 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-7 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-5 w-auto" />
            </div>
            <div className="flex justify-center gap-4 text-slate-400 dark:text-gray-600 opacity-70">
                <span className="text-xs flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 256-bit SSL Encrypted</span>
                <span className="text-xs">Stripe Secure</span>
            </div>
        </div>
        </form>

        {/* Team Assignment Section */}
        <TeamAssignment customerName={customerName} />
    </>
  );
};


// --- MAIN PAGE COMPONENT ---
const PaidCheckout: React.FC<PaidCheckoutProps> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    listingUrl: '',
    voiceGender: 'female'
  });
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  
  // URL Scanning State
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [detectedMake, setDetectedMake] = useState<string | null>(null);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  
  // New interaction states
  const [nameBlurred, setNameBlurred] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Dynamic slots configuration (Satisfies total <= 12 constraint)
  const totalDailySlots = 12;
  
  // Initialize remainingSlots with persistence logic (24h validity)
  const [remainingSlots] = useState(() => {
    const STORAGE_KEY = 'velocity_pilot_slots';
    const TIMESTAMP_KEY = 'velocity_pilot_timestamp';
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
        const storedSlots = localStorage.getItem(STORAGE_KEY);
        const storedTime = localStorage.getItem(TIMESTAMP_KEY);

        if (storedSlots && storedTime) {
            const now = Date.now();
            const timePassed = now - parseInt(storedTime, 10);

            // If less than 24 hours have passed, return stored value
            if (timePassed < TWENTY_FOUR_HOURS) {
                return parseInt(storedSlots, 10);
            }
        }

        // Generate new number if expired or not found (between 6 and 12)
        const newSlots = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
        localStorage.setItem(STORAGE_KEY, newSlots.toString());
        localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
        return newSlots;
    }
    
    // Default fallback for SSR or initial render
    return 8; 
  });

  // Generate random dealership count for social proof banner (between 3 and 9)
  const [dealershipCount] = useState(() => Math.floor(Math.random() * (9 - 3 + 1)) + 3);

  // Helper for email validation
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Advanced URL Scanning Effect
  useEffect(() => {
    if (!formData.listingUrl) {
        setScanState('idle');
        setUrlError(null);
        return;
    }

    // Debounce scan to avoid flickering typing
    const delayScan = setTimeout(() => {
        // Trigger scanning only if URL is substantial
        if (formData.listingUrl.length > 8) {
             const lowerUrl = formData.listingUrl.toLowerCase();
             
             // Strict Check for autovit.ro
             if (!lowerUrl.includes('autovit.ro')) {
                 setScanState('idle');
                 setUrlError("Use only Autovit Listing URL");
                 return;
             }
             setUrlError(null);

            setScanState('scanning');
            setDetectedPlatform('autovit');

            // Simulate scanning duration for realism
            setTimeout(() => {
                // Extract make from URL
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

  // STEP 1 SUBMISSION
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission if URL error
    if (urlError) {
        return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send Data to Webhook
      await fetch('https://app.autowizz.cfd/webhook/new-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, stage: 'step1_initiated' }),
      });

      // 2. Redirect to Step 2 (Payment)
      setTimeout(() => {
        setStep(2);
        setIsSubmitting(false);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800); 
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
     alert("Payment Successful! Redirecting to dashboard...");
     onBack(); 
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative pt-24 pb-12">
      
      {/* PROGRESS BAR HEADER */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/10 z-50 flex flex-col justify-center shadow-sm">
        <div className="max-w-4xl mx-auto w-full px-6">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    {step === 1 ? 'Step 1: Account Details' : 'Step 2: Secure Payment'}
                </span>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                    {step === 1 ? '70%' : '95%'} Complete
                </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-purple transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
                    style={{ width: step === 1 ? '70%' : '95%' }}
                />
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* REMOVED BACK BUTTON TO PREVENT LEAKAGE */}

        {/* URGENCY BANNER */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4 animate-fade-in">
             {/* Live Activity Banner */}
             <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 px-4 py-2 rounded-full flex items-center justify-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-300 w-fit mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {dealershipCount} other dealerships in <span className="font-bold underline">Your Area</span> are optimizing listings right now.
             </div>

             {/* Scarcity Timer */}
             <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-500/20 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-pulse" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-bold text-brand-900 dark:text-brand-100">
                            High Demand: <span className="text-red-500">{remainingSlots} of {totalDailySlots}</span> Daily Pilot Slots Remaining
                        </div>
                        <div className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">{formatTime(timeLeft)}</div>
                    </div>
                    <div className="w-full h-1.5 bg-brand-200 dark:bg-brand-900/50 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-500 rounded-full animate-pulse" 
                            style={{ width: `${((totalDailySlots - remainingSlots) / totalDailySlots) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* --- STEP 1: LEAD CAPTURE --- */}
        {step === 1 && (
             <div className="max-w-2xl mx-auto bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500"></div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white text-center">Create Your Account</h1>
                <p className="text-slate-500 dark:text-gray-400 mb-10 text-center">Enter your details below to proceed to the secure checkout.</p>

                <form className="space-y-6" onSubmit={handleStep1Submit}>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm group-focus-within:animate-gradient-x"></div>
                            <div className="absolute -inset-px bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500" />
                            <input 
                                type="text" 
                                placeholder="e.g. Alex Johnson"
                                required
                                className="relative w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-transparent focus:ring-0 transition-all z-10"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                onBlur={() => setNameBlurred(true)}
                            />
                        </div>
                        {/* Name Micro-interaction - Now triggers on Blur */}
                        {formData.name.length > 2 && nameBlurred && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 animate-in fade-in slide-in-from-top-1">
                                <UserCheck className="w-3 h-3" />
                                <span>Nice to meet you, <span className="font-bold">{formData.name.split(' ')[0]}</span>!</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm group-focus-within:animate-gradient-x"></div>
                            <div className="absolute -inset-px bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500" />
                            <input 
                                type="email" 
                                placeholder="alex@dealership.com"
                                required
                                className="relative w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-transparent focus:ring-0 transition-all z-10"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        {/* Email Micro-interaction */}
                        {isValidEmail(formData.email) ? (
                            <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-top-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Secure access link will be sent here.</span>
                            </div>
                        ) : (
                             <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> We'll send your completed assets here securely.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Autovit Listing URL</label>
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm group-focus-within:animate-gradient-x"></div>
                            <div className="absolute -inset-px bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500" />
                            <div className="relative z-10">
                                <input 
                                    type="url" 
                                    placeholder="https://www.autovit.ro/anunt/..."
                                    required
                                    className={`w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-[#0f172a] border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-transparent focus:ring-0 transition-all ${
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
                        
                        {/* URL Error Message */}
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
                                 <span className="text-sm font-bold text-brand-900 dark:text-brand-100">Analyzing Listing URL...</span>
                              </div>
                              <div className="space-y-2">
                                 <div className="h-1.5 w-full bg-brand-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                                     <div className="h-full bg-brand-500 w-2/3 animate-[shimmer_1s_infinite] relative">
                                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                                     </div>
                                 </div>
                                 <div className="flex justify-between text-[10px] text-brand-600/70 dark:text-brand-400/70 font-mono">
                                     <span>Connecting to platform...</span>
                                     <span>Fetching images...</span>
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* SCAN COMPLETE UI - CONSOLIDATED SINGLE SECTION */}
                        {scanState === 'complete' && !urlError && (
                            <div className="mt-4 rounded-xl border border-brand-500/30 overflow-hidden bg-brand-50/50 dark:bg-brand-900/10 shadow-lg animate-in fade-in slide-in-from-top-2 p-4 flex gap-4 items-center relative group">
                                {/* Absolute Badge top right */}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Verified Listing
                                </div>

                                <div className="flex-1 min-w-0 py-1">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate pr-24">
                                        {detectedMake 
                                            ? `${detectedMake.charAt(0).toUpperCase() + detectedMake.slice(1)} Model Detected`
                                            : 'Vehicle Model Detected'
                                        }
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-gray-400 mt-1 mb-2">
                                        Successfully connected to Autovit.ro
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

                    {/* AI Voice Preference Section */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-3">AI Voice Preference</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, voiceGender: 'male'})}
                                className={`relative group overflow-hidden p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    formData.voiceGender === 'male' 
                                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-white ring-2 ring-brand-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] text-slate-500 dark:text-gray-400 hover:border-brand-300 dark:hover:border-white/30'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    formData.voiceGender === 'male' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-white/5'
                                }`}>
                                    <Mic className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm">Male Voice</span>
                                
                                {formData.voiceGender === 'male' && (
                                    <div className="absolute top-2 right-2 text-brand-500 animate-in zoom-in duration-300">
                                        <CheckCircle2 className="w-4 h-4 fill-current" />
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData({...formData, voiceGender: 'female'})}
                                className={`relative group overflow-hidden p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    formData.voiceGender === 'female' 
                                    ? 'border-accent-purple bg-purple-50 dark:bg-accent-purple/10 text-accent-purple dark:text-white ring-2 ring-accent-purple shadow-[0_0_20px_rgba(217,70,239,0.3)]' 
                                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] text-slate-500 dark:text-gray-400 hover:border-accent-purple/50 dark:hover:border-white/30'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    formData.voiceGender === 'female' ? 'bg-accent-purple text-white' : 'bg-slate-100 dark:bg-white/5'
                                }`}>
                                    <Mic className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm">Female Voice</span>

                                {formData.voiceGender === 'female' && (
                                    <div className="absolute top-2 right-2 text-accent-purple animate-in zoom-in duration-300">
                                        <CheckCircle2 className="w-4 h-4 fill-current" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 rounded-xl text-xl font-bold text-white shadow-xl shadow-brand-500/20 transition-all duration-1000 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.5)] bg-gradient-to-r from-brand-600 via-accent-purple to-brand-600 bg-[length:200%_auto] animate-gradient-x flex items-center justify-center gap-2 mt-8 disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                Continue to Payment
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
             </div>
        )}

        {/* --- STEP 2: PAYMENT + OFFER STACK --- */}
        {step === 2 && (
             <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                
                {/* LEFT COLUMN: SECURE PAYMENT */}
                <div className="order-2 lg:order-1">
                    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-brand-500 to-green-500"></div>
                        
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="w-6 h-6 text-slate-900 dark:text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Payment Details</h2>
                            <p className="text-slate-500 dark:text-gray-400 mt-2">Complete your purchase securely.</p>
                        </div>

                        <Elements stripe={stripePromise}>
                            <PaymentForm onSuccess={handlePaymentSuccess} customerName={formData.name} />
                        </Elements>
                        
                        <div className="mt-8 text-center">
                             <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-brand-500 transition-colors">
                                Change contact details
                             </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: OFFER STACK */}
                <div className="order-1 lg:order-2">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 mb-8 shadow-lg dark:shadow-none sticky top-24">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">What you're getting today:</h3>
                        
                        {/* VISUAL OFFER STACK */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">AI Studio Photo Suite</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$2,000</span>
                            </div>
                            
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                        <Quote className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Psychological Copywriting</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$1,500</span>
                            </div>

                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                        <Film className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Cinematic Video Gen</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$2,500</span>
                            </div>

                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                        <Mic className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Neural Voiceover Engine</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">$800</span>
                            </div>
                            
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Market Analytics</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white text-green-500">BONUS</span>
                            </div>
                            
                            <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />
                            
                             <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 dark:text-white">Total Value</span>
                                <span className="font-bold text-slate-400 dark:text-gray-500 line-through decoration-red-500 decoration-2">$7,300+</span>
                            </div>
                             <div className="flex flex-col items-end mt-2">
                                <div className="flex justify-between w-full items-center mb-1">
                                    <span className="font-bold text-brand-600 dark:text-brand-400">Your Price Today</span>
                                    <span className="text-2xl font-extrabold text-green-500 dark:text-green-400">$499</span>
                                </div>
                                <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">One sale covers this 10x over</span>
                            </div>
                        </div>

                        {/* Gold Guarantee Section */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-4 border border-yellow-200 dark:border-yellow-500/30 flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                            <p className="text-xs text-yellow-800 dark:text-yellow-200/80 leading-relaxed">
                                <strong className="text-yellow-900 dark:text-yellow-100">100% Performance Guarantee:</strong> If we don't double your leads in 30 days, we refund your investment in full.
                            </p>
                        </div>

                        {/* REVIEWS SECTION - MOVED INSIDE THE STICKY CONTAINER */}
                        <div className="border-t border-slate-200 dark:border-white/10 pt-8 mt-8 overflow-hidden relative">
                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Success Stories</span>
                            </div>
                            
                            {/* Gradient Masks */}
                            <div className="absolute left-0 top-20 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-[#0f172a] to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-20 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-[#0f172a] to-transparent z-10 pointer-events-none" />

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
        )}
      </div>
    </div>
  );
};

export default PaidCheckout;
