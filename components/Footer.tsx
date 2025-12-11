
import React from 'react';
import { Zap, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'landing' | 'dashboard' | 'checkout') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 dark:bg-[#020617] pt-12 pb-12 border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center">
                <Zap className="text-white w-4 h-4" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Velocity AI</span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-6">
              The enterprise-grade AI platform designed specifically for high-volume automotive dealerships and listing agencies.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-500"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-500"><Linkedin size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-500"><Github size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-brand-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-500"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Listing AI</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Photo Enhancer</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Market Data</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">API Docs</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Community</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">About</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Legal</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-gray-500">© 2024 Velocity AI Inc. Security. Privacy. Terms.</p>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-slate-500 dark:text-gray-400">All Systems Operational</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
