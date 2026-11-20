import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, MapPin, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imagesMap';
import { useLanguage } from '../context/LanguageContext';
import { LuxuryLogo } from './LuxuryLogo';

interface HeroProps {
  onCallClick: () => void;
  onConsultClick: () => void;
  onValuationClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCallClick,
  onConsultClick,
  onValuationClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#070A0F] via-[#0B0F18] to-[#0D121F]">
      {/* Ambient Haute Horlogerie Gold Glow Orbs */}
      <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 via-[#F5E4BE]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[650px] h-[650px] bg-gradient-to-bl from-[#D4AF37]/12 via-[#FAF1E4]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Architectural Dot Mesh Grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Desktop / Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Value Proposition & Conversion Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Jewel-Crafted Kicker Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1422]/90 border border-[#D4AF37]/45 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              <span className="font-luxury-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-amber-300">
                {t.hero.kicker}
              </span>
            </div>

            {/* Main Headline with Haute Typographic Contrast */}
            <h1 className="font-luxury-display text-4xl sm:text-5xl lg:text-[3.9rem] font-normal tracking-tight text-white leading-[1.07] text-balance">
              Your Trusted Indiana{' '}
              <span className="block sm:inline font-luxury-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D1] to-[#E3BE72] drop-shadow-xs">
                Advisor & Concierge
              </span>{' '}
              in Every Real Estate Move.
            </h1>

            {/* Designer Accolades Ribbon (Luxury Multi-Stat Row) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-2">
              {/* Stat 1 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1422]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-xs hover:border-[#D4AF37] hover:shadow-luxury-glow transition-all">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-luxury-display font-bold text-white">
                  <span className="text-[#D4AF37]">$</span>
                  <span>48M+</span>
                </div>
                <div className="text-[10px] font-luxury-sans uppercase tracking-wider text-slate-300 font-semibold mt-0.5">
                  Indiana Homes Closed
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1422]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-xs hover:border-[#D4AF37] hover:shadow-luxury-glow transition-all">
                <div className="flex items-center gap-1 text-xs sm:text-sm font-luxury-display font-bold text-amber-300">
                  <span>100%</span>
                  <div className="flex text-amber-400 text-[10px] ml-0.5">★★★★★</div>
                </div>
                <div className="text-[10px] font-luxury-sans uppercase tracking-wider text-slate-300 font-semibold mt-0.5">
                  Verified 5-Star Trust
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1422]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-xs hover:border-[#D4AF37] hover:shadow-luxury-glow transition-all">
                <div className="flex items-center gap-1 text-xs sm:text-sm font-luxury-display font-bold text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Central IN</span>
                </div>
                <div className="text-[10px] font-luxury-sans uppercase tracking-wider text-slate-300 font-semibold mt-0.5 truncate">
                  Carmel · Fishers · Zionsville
                </div>
              </div>
            </div>

            {/* Sub-headline */}
            <p className="font-body-read text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {t.hero.subheadline}
            </p>

            {/* Direct Conversion Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary: Haute Noir & 24K Gold Button */}
              <button
                onClick={onCallClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-slate-950 via-[#151B24] to-slate-950 text-white font-luxury-sans uppercase tracking-[0.2em] font-semibold text-xs border border-[#D4AF37] shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_30px_-5px_rgba(212,175,55,0.6)] hover:border-[#F5E4BE] active:scale-98 transition-all cursor-pointer whitespace-nowrap overflow-hidden"
              >
                {/* Micro Gold Shimmer Overlay */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <Phone className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span className="relative z-10">{t.hero.callCta}</span>
              </button>

              {/* Secondary: Gilded Dark Obsidian Button */}
              <button
                onClick={onConsultClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#0E1422] border border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-[#151E33] text-amber-200 font-luxury-sans uppercase tracking-[0.18em] font-semibold text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs hover:shadow-luxury-glow"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{t.hero.consultCta}</span>
              </button>
            </div>

            {/* Eye-Catching Instant Valuation Banner */}
            <div className="pt-2">
              <div
                onClick={onValuationClick}
                className="group p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 via-[#121A2A]/80 to-[#0E1422] border border-[#D4AF37]/45 hover:border-[#D4AF37] shadow-xs hover:shadow-luxury-glow transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {t.hero.valuationPrompt}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-luxury-sans font-bold uppercase tracking-wider text-amber-300 group-hover:text-amber-200 transition-colors">
                  <span>{t.hero.valuationLink}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Trust Signals & Communities Strip */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 font-sans-clean flex flex-wrap items-center gap-y-2 gap-x-3">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.trustPoint1}</span>
              </div>
              <span aria-hidden="true" className="text-[#D4AF37]">·</span>
              <span className="font-semibold text-amber-300">{t.hero.trustPoint2}</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Carmel</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Fishers</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Zionsville</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Westfield</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Avon</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Brownsburg</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
              <span className="text-slate-300 font-medium">Greenwood</span>
            </div>

          </div>

          {/* Right Column: Architectural Haute Contour Showcase Frame */}
          <div className="lg:col-span-5 relative">
            
            {/* Fine-Art Architectural Double Border */}
            <div className="relative rounded-3xl p-2 bg-gradient-to-br from-[#D4AF37]/50 via-slate-900 to-[#B38936]/40 shadow-2xl">
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 group">
                {/* Twilight Luxury Estate Image */}
                <img
                  src={ASSET_IMAGES.heroEstate}
                  alt="Modern luxury Indiana residential estate at twilight"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[480px] lg:h-[530px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Multi-Tone Gradient Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/35 pointer-events-none" />

                {/* Top-Right Architectural Stamp */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-[#D4AF37]/60 text-amber-300 text-[10px] font-luxury-sans uppercase tracking-[0.24em] flex items-center gap-2 shadow-lg">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] animate-pulse" />
                  <span>Premier Indiana Portfolio</span>
                </div>

                {/* Top-Left Live Virtual Tour Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9.5px] font-luxury-sans uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Verified Virtual Walkthrough</span>
                </div>

                {/* Floating Glassmorphic Identity Card: INDY HOME COLLECTION */}
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-2xl bg-slate-950/92 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-luxury-sans font-semibold tracking-[0.24em] uppercase text-amber-400">
                          Personal Concierge & Realtor
                        </span>
                        <span className="text-amber-300 text-xs">·</span>
                        <span className="text-[10px] font-semibold text-emerald-400">Active</span>
                      </div>

                      {/* Brand Wordmark & Crest */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-luxury-display text-xl sm:text-2xl font-normal tracking-[0.2em] text-white">
                          INDY
                        </span>
                        <span className="font-luxury-serif italic font-light lowercase text-amber-300 text-lg sm:text-xl">
                          Home
                        </span>
                        <span className="font-luxury-display text-xl sm:text-2xl font-normal tracking-[0.2em] text-white">
                          COLLECTION
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 flex items-center gap-1.5 font-body-read font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Greater Indianapolis · Carmel · Zionsville & All Indiana</span>
                      </p>
                    </div>

                    {/* Quick Call Action */}
                    <button
                      onClick={onCallClick}
                      className="p-3.5 rounded-xl bg-gradient-to-br from-[#E3BE72] via-[#D4AF37] to-[#9E7B31] text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer border border-[#F5E4BE] shrink-0"
                      title="Direct Private Realtor Line: (317) 408-9532"
                      aria-label="Call Direct Line"
                    >
                      <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
