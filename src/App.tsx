import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

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
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';

// Wrapper for Landing Page components to keep routing clean
const LandingPage = () => {
  const navigate = useNavigate();
  // Helper to maintain compatibility with components using onNavigate prop
  const handleNavigate = (page: string) => {
      if (page === 'checkout') navigate('/checkout');
      else if (page === 'dashboard') navigate('/dashboard');
      else if (page === 'landing') navigate('/');
      else navigate(`/${page}`);
  };

  return (
    <>
      <SEO title="Velocity AI | Automate Your Dealership" description="The only AI that drives inventory turnover. Automate your dealership's merchandising." />
      <Navbar currentPage="landing" />
      <Hero onNavigate={handleNavigate} />
      <Stats onNavigate={handleNavigate} />
      <ComparisonSlider onNavigate={handleNavigate} />
      <AvatarInsights onNavigate={handleNavigate} />
      <CopyComparison onNavigate={handleNavigate} />
      <VoiceoverShowcase onNavigate={handleNavigate} />
      <VideoShowcase onNavigate={handleNavigate} />
      <UniqueSellingPoints />
      <ComparisonTable onNavigate={handleNavigate} />
      <GuaranteeSection onNavigate={handleNavigate} />
      <Testimonials />
      <ReclaimBudgetCTA onNavigate={handleNavigate} />
      <FAQ />
      <SocialProofPopup />
      <Footer onNavigate={handleNavigate} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-brand-500 selection:text-white transition-colors duration-500">
            <Routes>
              {/* Main Landing Page */}
              <Route path="/" element={<LandingPage />} />
              
              {/* App Routes */}
              <Route path="/dashboard" element={
                <>
                  <Navbar currentPage="dashboard" />
                  <Dashboard />
                </>
              } />
              
              {/* Checkout Flows */}
              <Route path="/checkout" element={
                <>
                  <SEO title="Secure Checkout | Velocity AI" />
                  <PaidCheckout onBack={() => window.history.back()} />
                </>
              } />
              
              <Route path="/pilot" element={
                <>
                  <SEO title="Free Pilot | Velocity AI" />
                  <Checkout onBack={() => window.history.back()} />
                </>
              } />
              
              <Route path="/invite" element={
                <>
                  <SEO title="VIP Access | Velocity AI" />
                  <InviteCheckout onBack={() => window.history.back()} />
                </>
              } />

              {/* Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
            
            {/* Global Toast Notifications */}
            <Toaster 
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                  borderRadius: '10px',
                },
                success: {
                  style: {
                    background: '#064e3b',
                    color: '#a7f3d0',
                  },
                },
                error: {
                  style: {
                    background: '#7f1d1d',
                    color: '#fecaca',
                  },
                },
              }}
            />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;