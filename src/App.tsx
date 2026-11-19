import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketStats } from './components/MarketStats';
import { PropertiesShowcase } from './components/PropertiesShowcase';
import { VideoTourGallery } from './components/VideoTourGallery';
import { ServicesSection } from './components/ServicesSection';
import { IndianaCommunities } from './components/IndianaCommunities';
import { ValuationCalculator } from './components/ValuationCalculator';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { TrustAndPhilosophy } from './components/TrustAndPhilosophy';
import { ClientStories } from './components/ClientStories';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PromptStudio } from './components/PromptStudio';
import { AdminPortal } from './components/AdminPortal';
import { CallModal } from './components/CallModal';
import { BookingModal } from './components/BookingModal';
import { AppMode, ThemeId, IndianaMarket } from './types';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('preview');
  const [activeTheme, setActiveTheme] = useState<ThemeId>('editorial');
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState('Discovery Consultation');

  // Sync active theme class to document body
  useEffect(() => {
    document.body.className = `theme-${activeTheme} antialiased`;
  }, [activeTheme]);

  const handleConsultClick = (serviceTitle?: string) => {
    if (serviceTitle) {
      setBookingService(serviceTitle);
    } else {
      setBookingService('Discovery Consultation');
    }
    setBookingModalOpen(true);
  };

  const handleValuationClick = () => {
    if (currentMode !== 'preview') {
      setCurrentMode('preview');
      setTimeout(() => {
        document.getElementById('valuation')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('valuation')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInvestmentClick = () => {
    if (currentMode !== 'preview') {
      setCurrentMode('preview');
      setTimeout(() => {
        document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommunityInquire = (community: IndianaMarket) => {
    setBookingService(`Exploring Real Estate in ${community.name} (${community.county})`);
    setBookingModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-[#070A0F] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Top Header Navigation */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        onCallClick={() => setCallModalOpen(true)}
        onConsultClick={() => handleConsultClick()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentMode === 'preview' ? (
          <div>
            {/* Section 1: Hero */}
            <Hero
              onCallClick={() => setCallModalOpen(true)}
              onConsultClick={() => handleConsultClick()}
              onValuationClick={handleValuationClick}
            />

            {/* Section 1.5: Local Indiana Market Statistics */}
            <MarketStats
              onValuationClick={handleValuationClick}
              onConsultClick={handleConsultClick}
            />

            {/* Section 1.8: Properties Showcase & Virtual Video Walkthroughs */}
            <PropertiesShowcase
              onScheduleTour={(title) => handleConsultClick(`Private In-Person Tour: ${title}`)}
              onCallClick={() => setCallModalOpen(true)}
            />

            {/* Section 1.9: Video Tour Gallery & Cinema Walkthroughs */}
            <VideoTourGallery
              onScheduleTour={(title) => handleConsultClick(title)}
              onCallClick={() => setCallModalOpen(true)}
            />

            {/* Section 2: Four Core Pillars */}
            <ServicesSection
              onConsultClick={handleConsultClick}
              onValuationClick={handleValuationClick}
              onInvestmentClick={handleInvestmentClick}
              onCallClick={() => setCallModalOpen(true)}
            />

            {/* Section 3: Indiana Communities Explorer */}
            <IndianaCommunities
              onCommunityInquire={handleCommunityInquire}
            />

            {/* Section 4: Instant Indiana Home Valuation Estimator */}
            <ValuationCalculator
              onCallClick={() => setCallModalOpen(true)}
            />

            {/* Section 5: Real Estate Investment & ROI Estimator */}
            <InvestmentCalculator
              onCallClick={() => setCallModalOpen(true)}
              onConsultClick={handleConsultClick}
            />

            {/* Section 6: The Neighbour Realtor Commitment */}
            <TrustAndPhilosophy
              onCallClick={() => setCallModalOpen(true)}
              onConsultClick={() => handleConsultClick()}
            />

            {/* Section 6.2: Client Success Stories Carousel */}
            <ClientStories
              onConsultClick={handleConsultClick}
              onCallClick={() => setCallModalOpen(true)}
            />

            {/* Section 6.5: Frequently Asked Questions Accordion */}
            <FAQSection
              onCallClick={() => setCallModalOpen(true)}
              onConsultClick={handleConsultClick}
              onValuationClick={handleValuationClick}
            />

            {/* Section 7: Schedule Consultation & Contact */}
            <ContactSection
              onCallClick={() => setCallModalOpen(true)}
              preselectedService={bookingService}
            />
          </div>
        ) : currentMode === 'studio' ? (
          /* Master Website Prompt Studio */
          <PromptStudio
            activeTheme={activeTheme}
            onThemeChange={setActiveTheme}
            onPreviewSiteClick={() => setCurrentMode('preview')}
          />
        ) : (
          /* Executive Realtor Admin Portal */
          <AdminPortal
            onBackToWebsite={() => setCurrentMode('preview')}
            onOpenStudio={() => setCurrentMode('studio')}
          />
        )}
      </main>

      {/* Quiet Footer (shown on public preview & studio, hidden in admin portal) */}
      {currentMode !== 'admin' && (
        <Footer
          onCallClick={() => setCallModalOpen(true)}
          onConsultClick={() => handleConsultClick()}
          onAdminClick={() => setCurrentMode('admin')}
        />
      )}

      {/* Direct Call Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
      />

      {/* Consultation Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        serviceTitle={bookingService}
        onCallClick={() => {
          setBookingModalOpen(false);
          setCallModalOpen(true);
        }}
      />

      </div>
    </LanguageProvider>
  );
}
