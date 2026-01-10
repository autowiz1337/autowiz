import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
// @ts-ignore - Ignoring missing exports error from react-router-dom which may be due to environment type definition mismatch
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  currentPage?: 'landing' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'landing' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isDashboard = location.pathname.includes('dashboard');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out border-b ${
        isScrolled || isDashboard
          ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Velocity<span className="text-indigo-600 dark:text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isDashboard && (
            <>
              <a href="/#features" className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors duration-500">Platform</a>
              <a href="/#solutions" className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors duration-500">Solutions</a>
              <a href="/#pricing" className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors duration-500">Pricing</a>
            </>
          )}
          
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isDashboard ? (
              <div className="flex items-center gap-4">
                 <Link
                    to="/create"
                    className="btn-primary btn-glow relative rounded-full px-5 py-2.5 text-sm font-bold overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
                 >
                    <Sparkles className="w-4 h-4" />
                    Optimize New Listing
                 </Link>
              </div>
            ) : (
              <>
                <Link 
                    to="/dashboard"
                    className="text-sm font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300 hover:scale-105"
                >
                  Log in
                </Link>
                <Link 
                    to="/create"
                    className="btn-primary btn-glow relative rounded-full px-6 py-3 text-base font-medium overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
                className="text-slate-900 dark:text-white z-50 relative transition-transform duration-500 active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl z-40 transition-transform duration-500 md:hidden flex flex-col justify-center px-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
             <div className="flex flex-col gap-8">
                 {!isDashboard && (
                   <>
                     <a href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Platform</a>
                     <a href="/#solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Solutions</a>
                     <a href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
                   </>
                 )}
                 
                 <button 
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/create');
                    }}
                    className="btn-primary btn-glow w-full py-4 rounded-xl font-bold text-lg mt-4 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                 >
                    {isDashboard ? 'Optimize New Listing' : 'Get Started'}
                 </button>
             </div>
        </div>
    </nav>
  );
};

export default Navbar;