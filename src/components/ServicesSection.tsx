import React, { useState } from 'react';
import { Check, ArrowRight, Home, TrendingUp, Building2, Compass } from 'lucide-react';
import { SERVICE_PILLARS } from '../data/realEstateData';
import { ASSET_IMAGES } from '../assets/imagesMap';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onConsultClick: (serviceTitle?: string) => void;
  onValuationClick: () => void;
  onInvestmentClick: () => void;
  onCallClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onConsultClick,
  onValuationClick,
  onInvestmentClick,
  onCallClick,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('buying');

  const iconsMap: Record<string, React.ReactNode> = {
    buying: <Home className="w-5 h-5" />,
    selling: <TrendingUp className="w-5 h-5" />,
    investing: <Building2 className="w-5 h-5" />,
    relocating: <Compass className="w-5 h-5" />,
  };

  const imagesMap: Record<string, string> = {
    haven_suburban_carmel: ASSET_IMAGES.suburbanCarmel,
    haven_modern_interior: ASSET_IMAGES.modernInterior,
    haven_investment_property: ASSET_IMAGES.investmentProperty,
    haven_hero_estate: ASSET_IMAGES.heroEstate,
  };

  const selectedService = SERVICE_PILLARS.find((p) => p.id === activeTab) || SERVICE_PILLARS[0];

  const handleAction = (actionType: string, serviceTitle: string) => {
    if (actionType === 'valuation') {
      onValuationClick();
    } else if (actionType === 'investment') {
      onInvestmentClick();
    } else {
      onConsultClick(serviceTitle);
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-[#080C14] via-[#0B0F18] to-[#090D16] border-y border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span>{t.services.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.services.title}
          </h2>
          <p className="font-body-read text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-light">
            {t.services.subtitle}
          </p>
        </div>

        {/* Tab Controls (Functional Buttons with Active States) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#131A29] rounded-2xl max-w-2xl mb-10 border border-[#D4AF37]/35 shadow-2xs">
          {SERVICE_PILLARS.map((service, index) => {
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-luxury-sans uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gold-metallic text-slate-950 font-bold shadow-xs border border-[#D4AF37]'
                    : 'text-slate-400 hover:text-amber-300 hover:bg-[#1A2338]'
                }`}
              >
                <span className={isActive ? 'text-slate-950' : 'text-amber-400/80'}>
                  {iconsMap[service.id]}
                </span>
                <span>{`0${index + 1}. ${service.title.split(' ')[0]}`}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Service Spotlight Bento Card */}
        <div className="bg-[#0E1422]/95 rounded-3xl border border-[#D4AF37]/25 shadow-luxury-glow hover-card-float overflow-hidden text-white transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-luxury-sans font-semibold text-amber-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] animate-pulse" />
                  <span>{selectedService.subtitle}</span>
                </div>
                
                <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
                  <span className="animated-shining-word">{selectedService.title}</span>
                </h3>
                
                <p className="font-body-read text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  {selectedService.description}
                </p>

                {/* Key Deliverables List */}
                <div className="pt-4 space-y-3">
                  <p className="text-[11px] font-luxury-sans font-semibold uppercase tracking-widest text-slate-400">
                    {t.services.whatWeDeliver}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-body-read hover:translate-x-1 transition-transform">
                        <span className="p-1 rounded-md bg-[#131B2A] text-amber-300 shrink-0 mt-0.5 border border-[#D4AF37]/30 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleAction(selectedService.actionType, selectedService.title)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900 text-white font-luxury-sans uppercase tracking-wider font-semibold text-xs hover:bg-slate-850 border border-[#D4AF37] shadow-luxury-glow transition-all active:scale-95 cursor-pointer animate-pulse-subtle"
                >
                  <span>{selectedService.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <button
                  onClick={onCallClick}
                  className="text-xs font-luxury-sans uppercase tracking-wider font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
                >
                  {t.services.discussDirectly}
                </button>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 overflow-hidden group">
              <img
                src={imagesMap[selectedService.imageKey] || ASSET_IMAGES.suburbanCarmel}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[460px] lg:max-h-none hover-image-zoom group-hover:scale-108 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-2xl bg-[#0B0F17]/85 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-sans-clean shadow-lg animate-float-slow">
                <span className="font-semibold text-amber-200 block text-sm">{selectedService.title}</span>
                <span className="text-white/80 block text-[11px] mt-0.5">
                  Personalized guidance across Carmel, Fishers, Zionsville & Indiana
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
