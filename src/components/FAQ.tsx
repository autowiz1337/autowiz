import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Does Velocity AI integrate with my DMS?",
    answer: "Yes. We integrate seamlessly with major Dealer Management Systems including CDK, Reynolds & Reynolds, vAuto, and HomeNet. Our system pulls inventory data automatically every 15 minutes."
  },
  {
    question: "How long does it take to set up?",
    answer: "Most dealerships are live within 48 hours. We handle the initial calibration of your brand voice and visual templates. Once set, the process is 100% automated."
  },
  {
    question: "Can I edit the AI-generated descriptions?",
    answer: "Absolutely. While our AI is 99% accurate, you have full control. You can edit descriptions manually or ask the AI to 'make it more exciting' or 'focus on safety' with a single click."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our priority. We are SOC2 Type II compliant and use enterprise-grade encryption for all inventory data. We never share your sales data with competitors."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617] relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-white/5 mb-6 shadow-sm dark:shadow-none">
            <HelpCircle className="w-6 h-6 text-slate-400 dark:text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-gray-400">Everything you need to know about the product and billing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-300 dark:hover:border-white/10 shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-slate-900 dark:text-white text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 dark:text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 dark:text-gray-500 text-sm">
            Still have questions? <a href="#" className="text-brand-600 dark:text-brand-400 hover:underline">Chat with our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;