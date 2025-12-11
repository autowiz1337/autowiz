
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import UniqueSellingPoints from './components/UniqueSellingPoints';
import ComparisonSlider from './components/ComparisonSlider';
import CopyComparison from './components/CopyComparison';
import VoiceoverShowcase from './components/VoiceoverShowcase';
import VideoShowcase from './components/VideoShowcase';
import AvatarInsights from './components/AvatarInsights';
import FAQ from './components/FAQ';
import ComparisonTable from './components/ComparisonTable';
import GuaranteeSection from './components/GuaranteeSection';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import PaidCheckout from './components/PaidCheckout';
import InviteCheckout from './components/InviteCheckout';
import SocialProofPopup from './components/SocialProofPopup';
import ReclaimBudgetCTA from './components/ReclaimBudgetCTA';

// CONFIGURATION: Controls where the "Get Started" buttons redirect
// Options: 'checkout' (Free/Pilot Flow) or 'paid-checkout' (Stripe/Paid Flow)
const CHECKOUT_DESTINATION: 'checkout' | 'paid-checkout' = 'paid-checkout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'checkout' | 'paid-checkout' | 'invite'>('landing');

  useEffect(() => {
    // Check for query parameters to handle direct navigation (e.g., from new tab)
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    
    if (pageParam === 'checkout') {
      setCurrentPage(CHECKOUT_DESTINATION);
    } else if (pageParam === 'invite') {
      setCurrentPage('invite');
    }
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'checkout') {
      setCurrentPage(CHECKOUT_DESTINATION);
    } else {
      setCurrentPage(page as any);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-brand-500 selection:text-white transition-colors duration-500">
      {currentPage !== 'checkout' && currentPage !== 'paid-checkout' && currentPage !== 'invite' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage === 'dashboard' ? 'dashboard' : 'landing'} />
      )}
      
      <main>
        {currentPage === 'dashboard' ? (
          <Dashboard />
        ) : currentPage === 'checkout' ? (
          <Checkout onBack={() => setCurrentPage('landing')} />
        ) : currentPage === 'paid-checkout' ? (
          <PaidCheckout onBack={() => setCurrentPage('landing')} />
        ) : currentPage === 'invite' ? (
          <InviteCheckout onBack={() => setCurrentPage('landing')} />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <Stats onNavigate={handleNavigate} />
            <ComparisonSlider onNavigate={handleNavigate} />
            <AvatarInsights onNavigate={handleNavigate} />
            <CopyComparison onNavigate={handleNavigate} />
            <VoiceoverShowcase onNavigate={handleNavigate} />
            <VideoShowcase onNavigate={handleNavigate} />
            <UniqueSellingPoints />
            {/* Logic: Rational Close */}
            <ComparisonTable onNavigate={handleNavigate} />
            {/* Safety: Risk Reversal */}
            <GuaranteeSection onNavigate={handleNavigate} />
            {/* Proof: Social Validation */}
            <Testimonials />
            {/* Action: Offer Stack Close */}
            <ReclaimBudgetCTA onNavigate={handleNavigate} />
            <FAQ />
          </>
        )}
      </main>
      
      {/* Global Social Proof Popup - Only show on Landing Page */}
      {currentPage === 'landing' && <SocialProofPopup />}

      {currentPage === 'landing' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
