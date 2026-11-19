import React from 'react';
import { Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LuxuryLogo } from './LuxuryLogo';

interface FooterProps {
  onCallClick: () => void;
  onConsultClick: () => void;
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCallClick, onConsultClick, onAdminClick }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#0B0F17] via-[#080B10] to-[#040608] text-white font-sans-clean pt-16 pb-12 border-t border-[#D4AF37]/35 relative overflow-hidden">
      {/* Subtle luxury ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D4AF37]/20">
          
          {/* Brand Col with Bespoke Luxury Monogram & Crest */}
          <div className="lg:col-span-2 space-y-4">
            <LuxuryLogo variant="footer" sloganText={t.brand.slogan} />
            <p className="text-xs text-slate-300 font-body-read leading-relaxed max-w-sm pt-1 font-light">
              Providing personalized, authentic, and high-touch real estate guidance for home buyers, sellers, relocators, and investors across Carmel, Fishers, Zionsville, Hendricks & Johnson Counties.
            </p>
            <div className="pt-2">
              <button
                onClick={onCallClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-amber-300 text-xs font-luxury-sans uppercase tracking-wider font-semibold hover:bg-slate-850 transition-all cursor-pointer shadow-luxury-glow"
              >
                <Phone className="w-3.5 h-3.5 fill-amber-300" />
                <span>Direct Line: (317) 408-9532</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <span className="font-luxury-sans text-xs font-semibold text-amber-300/95 tracking-widest uppercase block">
              {t.footer.servicesHeader}
            </span>
            <ul className="space-y-2 text-slate-300 font-body-read font-light">
              <li>
                <a href="#services" className="hover:text-[#F6EBD7] transition-colors">
                  Buying Your Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F6EBD7] transition-colors">
                  Selling Your Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F6EBD7] transition-colors">
                  Investment Properties
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F6EBD7] transition-colors">
                  Relocating to Indiana
                </a>
              </li>
              <li>
                <a href="#valuation" className="hover:text-[#F6EBD7] transition-colors">
                  Instant Home Valuation
                </a>
              </li>
            </ul>
          </div>

          {/* Communities */}
          <div className="space-y-3 text-xs">
            <span className="font-luxury-sans text-xs font-semibold text-amber-300/95 tracking-widest uppercase block">
              {t.footer.communitiesHeader}
            </span>
            <ul className="space-y-2 text-slate-300 font-body-read font-light">
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  Carmel & Fishers
                </a>
              </li>
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  Avon & Plainfield (Hendricks)
                </a>
              </li>
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  Brownsburg & Zionsville
                </a>
              </li>
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  Greenwood & Whiteland (Johnson)
                </a>
              </li>
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  Southport & Indianapolis
                </a>
              </li>
              <li>
                <a href="#communities" className="hover:text-[#F6EBD7] transition-colors">
                  McCordsville & Geist
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Disclaimers */}
          <div className="space-y-3 text-xs">
            <span className="font-luxury-sans text-xs font-semibold text-amber-300/95 tracking-widest uppercase block">
              {t.footer.connectHeader}
            </span>
            <p className="text-slate-300 font-body-read leading-relaxed font-light">
              Have a quick question about listing your home or viewing an exclusive property?
            </p>
            <div className="space-y-1.5 pt-1">
              <a
                href="tel:3174089532"
                className="font-mono text-sm text-amber-300 font-bold hover:text-white transition-colors block"
              >
                (317) 408-9532
              </a>
              <span className="text-[11px] text-amber-200/80 block font-luxury-sans uppercase tracking-wider">
                Direct Phone & SMS · 7 Days a Week
              </span>
            </div>
            <button
              onClick={onConsultClick}
              className="mt-2 text-xs text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer font-luxury-sans tracking-wide"
            >
              Book Private Consultation →
            </button>
          </div>

        </div>

        {/* Bottom Bar: Equal Housing & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Indy Home Collection. {t.footer.allRightsReserved}</span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
            <span>{t.footer.equalHousing}</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right flex items-center justify-center sm:justify-end gap-3">
            <span>Information deemed reliable but not guaranteed.</span>
            {onAdminClick && (
              <>
                <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
                <button
                  onClick={onAdminClick}
                  className="text-amber-400/90 hover:text-amber-300 transition-colors underline cursor-pointer font-medium"
                >
                  Super Admin Portal
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
