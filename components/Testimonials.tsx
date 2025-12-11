
import React from 'react';
import { Testimonial } from '../types';
import { Quote, Star, ArrowRight } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    name: "Elena Rodriguez",
    role: "Digital Director",
    company: "AutoNation",
    content: "We reduced our time-to-market by 60%. The AI descriptions are indistinguishable from our best copywriters.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Marcus Chen",
    role: "General Manager",
    company: "Prestige Imports",
    content: "Velocity AI doesn't just write descriptions; it captures the emotion of driving a luxury vehicle. Incredible ROI.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Sarah Johnson",
    role: "VP of Operations",
    company: "Carvana",
    content: "Handling 1,000+ listings a week was a nightmare before Velocity. Now it's fully automated and quality has gone up.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "David Smith",
    role: "Dealer Principal",
    company: "Ford of Smithtown",
    content: "The photo enhancement alone is worth the subscription. The descriptions are just the cherry on top.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Jessica Williams",
    role: "Marketing Lead",
    company: "Tesla Certified",
    content: "Seamless integration with our existing inventory feed. It just works perfectly.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "James Wilson",
    role: "Inventory Manager",
    company: "Hendrick Automotive",
    content: "The AI agent functionality for answering lead questions has saved my BDC team countless hours.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
  }
];

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="w-[85vw] md:w-[400px] flex-shrink-0 p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors relative group shadow-lg dark:shadow-none">
      <div className="absolute top-6 right-8 flex gap-0.5">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
      </div>
      <div className="mb-6 text-brand-200 dark:text-brand-500/30 group-hover:text-brand-300 dark:group-hover:text-brand-500/50 transition-colors">
          <Quote size={32} fill="currentColor" />
      </div>
      <p className="text-slate-700 dark:text-gray-300 text-lg mb-8 relative z-10 leading-relaxed font-light">"{item.content}"</p>
      <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-6">
          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 grayscale group-hover:grayscale-0 transition-all object-cover" />
          <div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">{item.name}</div>
              <div className="text-slate-500 dark:text-gray-500 text-xs font-mono">{item.role} • {item.company}</div>
          </div>
      </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
        
        {/* Gradient masks for smooth fade edges */}
        <div className="absolute left-0 bottom-0 top-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 bottom-0 top-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-6 animate-scroll hover:[animation-play-state:paused]">
            {/* First set of items */}
            {testimonials.map((item, idx) => (
                <TestimonialCard key={`1-${idx}`} item={item} />
            ))}
            {/* Duplicated set for seamless loop */}
            {testimonials.map((item, idx) => (
                <TestimonialCard key={`2-${idx}`} item={item} />
            ))}
        </div>
    </section>
  );
};

export default Testimonials;
