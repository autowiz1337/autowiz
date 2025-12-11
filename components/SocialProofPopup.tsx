
import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, MapPin } from 'lucide-react';

const MOCK_DATA = [
    { type: 'live', count: 284 },
    { type: 'conversion', name: 'Cristian M.', action: 'submitted a listing', time: 'Just now', location: 'Bucharest' },
    { type: 'conversion', name: 'Sarah J.', action: 'started 14-day trial', time: '2 mins ago', location: 'London' },
    { type: 'conversion', name: 'Alex D.', action: 'purchased Pro Plan', time: '5 mins ago', location: 'Austin' },
    { type: 'live', count: 312 },
    { type: 'conversion', name: 'David W.', action: 'generated 5 videos', time: '1 min ago', location: 'Sydney' },
    { type: 'conversion', name: 'Michael R.', action: 'booked a demo', time: 'Just now', location: 'New York' },
];

const SocialProofPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        // Initial delay before first popup - Reduced to 1000ms for faster visibility
        const startTimeout = setTimeout(() => setIsVisible(true), 1000);
        
        // Cycle interval
        const interval = setInterval(() => {
            setIsVisible(false); // Slide out
            
            setTimeout(() => {
                setIndex(prev => (prev + 1) % MOCK_DATA.length);
                setIsVisible(true); // Slide in new data
            }, 600); // Wait for exit animation to finish
            
        }, 8000); // Show every 8 seconds
        
        return () => {
            clearTimeout(startTimeout);
            clearInterval(interval);
        };
    }, []);

    const data = MOCK_DATA[index];
    const isLive = data.type === 'live';

    return (
        <div 
            className={`fixed bottom-6 left-6 z-50 max-w-sm w-full md:w-auto transition-all duration-700 ease-hypnotic ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
        >
            <div className="bg-white dark:bg-[#0f172a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden group">
                {/* Animated Gradient Border Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {isLive ? (
                    <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#0f172a] animate-pulse" />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold text-sm border border-slate-200 dark:border-white/10 flex-shrink-0">
                         {/* Extract initials safely */}
                         {(data as any).name.split(' ').map((n:string) => n[0]).join('')}
                    </div>
                )}

                <div>
                    {isLive ? (
                         <div>
                             <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                                 {(data as any).count} People Online
                                 <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                 </span>
                             </div>
                             <div className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                                 Viewing pricing page right now
                             </div>
                         </div>
                    ) : (
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">
                                {(data as any).name} <span className="font-normal text-slate-600 dark:text-gray-400">{(data as any).action}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-gray-500 mt-1">
                                <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400">
                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                </span>
                                <span>•</span>
                                <span>{(data as any).time}</span>
                                { (data as any).location && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-0.5">
                                            <MapPin className="w-3 h-3" /> {(data as any).location}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialProofPopup;
