import React, { useEffect } from 'react';
// @ts-ignore - Ignoring missing exports error from react-router-dom which may be due to environment type definition mismatch
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
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
import ListingGenerator from './components/ListingGenerator'; // NEW
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';

const LegacyRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');

  useEffect(() => {
    if (page === 'checkout') navigate('/checkout', { replace: true });
    else if (page === 'paid-checkout') navigate('/checkout', { replace: true });
    else if (page === 'invite') navigate('/invite', { replace: true });
    else if (page === 'dashboard') navigate('/dashboard', { replace: true });
    else if (page === 'create') navigate('/create', { replace: true });
  }, [page, navigate]);

  return null;
};

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
      if (page === 'checkout') navigate('/checkout');
      else if (page === 'dashboard') navigate('/dashboard');
      else if (page === 'create') navigate('/create');
      else if (page === 'landing') navigate('/');
      else navigate(`/${page}`);
  };

  return (
    <>
      <SEO title="Velocity AI | Automate Your Dealership" description="The only AI that drives inventory turnover. Automate your dealership's merchandising." />
      <LegacyRedirectHandler />
      
      <Navbar />
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

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-brand-500 selection:text-white transition-colors duration-500">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <Dashboard />
          </>
        } />
        
        <Route path="/create" element={
          <>
            <SEO title="Generate New Listing | Velocity AI" />
            <Navbar />
            <ListingGenerator />
          </>
        } />

        <Route path="/checkout" element={
          <>
            <SEO title="Secure Checkout | Velocity AI" />
            <PaidCheckout onBack={() => navigate('/')} />
          </>
        } />
        
        <Route path="/pilot" element={
          <>
            <SEO title="Free Pilot | Velocity AI" />
            <Checkout onBack={() => navigate('/')} />
          </>
        } />
        
        <Route path="/invite" element={
          <>
            <SEO title="VIP Access | Velocity AI" />
            <InviteCheckout onBack={() => navigate('/')} />
          </>
        } />

        <Route path="*" element={<LandingPage />} />
      </Routes>
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: 'dark:bg-slate-900 dark:text-white dark:border dark:border-white/10',
          duration: 4000,
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;