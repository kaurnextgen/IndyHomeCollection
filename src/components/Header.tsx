import React, { useState } from 'react';
import { Sparkles, Monitor, Palette, Menu, X, Globe, Shield } from 'lucide-react';
import { AppMode, ThemeId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { LuxuryLogo } from './LuxuryLogo';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onCallClick: () => void;
  onConsultClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  activeTheme,
  onThemeChange,
  onCallClick,
  onConsultClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const themeOptions: { id: ThemeId; label: string; dot: string }[] = [
    { id: 'editorial', label: 'Imperial Noir & Gold', dot: 'bg-[#D4AF37]' },
    { id: 'earthy', label: 'Emerald & Gilded Bronze', dot: 'bg-[#C9A86A]' },
    { id: 'luxury', label: 'Haute Parisian Cashmere', dot: 'bg-[#CBA258]' },
    { id: 'midwestern', label: 'Royal Midnight Platinum', dot: 'bg-[#D6B575]' },
  ];

  const languages: { id: Language; label: string; short: string; flag: string }[] = [
    { id: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
    { id: 'hi', label: 'हिन्दी', short: 'हिन्दी', flag: '🇮🇳' },
    { id: 'pa', label: 'ਪੰਜਾਬੀ', short: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070A0F]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Zone 1: Luxury Brand Monogram, Animated Shining Wordmark & Trust Logos */}
          <div className="flex items-center gap-3.5 shrink-0">
            <LuxuryLogo
              variant="header"
              onClick={() => onModeChange('preview')}
            />
          </div>

          {/* Zone 2: Redesigned Haute Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-[11.5px] font-semibold uppercase tracking-[0.18em] font-luxury-sans">
            {currentMode === 'preview' ? (
              <>
                <a
                  href="#properties"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{t.nav.homes}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="Virtual 3D Tours Available" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>

                <a
                  href="#communities"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span>{t.nav.communities}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>

                <a
                  href="#services"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span>{t.nav.services}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>

                <a
                  href="#valuation"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    <span>{t.nav.valuation}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider">
                      CMA
                    </span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>

                <a
                  href="#faq"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span>{t.nav.faq}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>

                <a
                  href="#contact"
                  className="group relative py-1 text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  <span>{t.nav.contact}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#8C6721] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              </>
            ) : currentMode === 'studio' ? (
              <span className="text-[11px] text-amber-300 font-luxury-display tracking-widest uppercase">
                MASTER PROMPT GENERATOR · TARGET AI BUILDERS
              </span>
            ) : (
              <span className="text-[11px] text-amber-300 font-luxury-display tracking-widest uppercase flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                EXECUTIVE REALTOR ADMIN & CRM CONSOLE
              </span>
            )}
          </nav>

          {/* Zone 3: Primary Action, Language Switcher, Mode Toggle & Theme Selector */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Language Switcher Segmented Control */}
            <div
              className="inline-flex items-center p-0.5 bg-[#121826] rounded-lg border border-[#D4AF37]/35 text-xs font-medium font-sans-clean shadow-2xs"
              role="group"
              aria-label="Language Switcher"
            >
              <span className="px-1.5 text-amber-400 hidden sm:inline-flex items-center">
                <Globe className="w-3.5 h-3.5" />
              </span>
              {languages.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLanguage(item.id)}
                  className={`px-2.5 py-1 rounded-md transition-all text-xs font-medium whitespace-nowrap cursor-pointer ${
                    language === item.id
                      ? 'bg-gold-metallic text-slate-950 shadow-xs font-bold border border-[#D4AF37]'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                  title={`${item.label} language content`}
                >
                  {item.short}
                </button>
              ))}
            </div>

            {/* Mode Switcher Tabs */}
            <div className="hidden sm:inline-flex p-1 bg-[#121826] rounded-lg border border-[#D4AF37]/35 text-xs font-medium font-sans-clean shadow-2xs">
              <button
                onClick={() => onModeChange('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  currentMode === 'preview'
                    ? 'bg-gold-metallic text-slate-950 shadow-xs font-bold border border-[#D4AF37]'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title="Live Website View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t.nav.preview}</span>
                <span className="md:hidden">Live</span>
              </button>
              <button
                onClick={() => onModeChange('studio')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  currentMode === 'studio'
                    ? 'bg-gold-metallic text-slate-950 shadow-xs font-bold border border-[#D4AF37]'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title="Master Prompt Studio for AI Builders"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{t.nav.promptStudio}</span>
                <span className="md:hidden">Prompt</span>
              </button>
              <button
                onClick={() => onModeChange('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  currentMode === 'admin'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 shadow-xs font-bold border border-[#D4AF37]'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title="Realtor Admin CRM & Pipeline"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Admin Portal</span>
                <span className="md:hidden">Admin</span>
              </button>
            </div>

            {/* Theme Dropdown / Preset Selector */}
            <div className="hidden lg:flex items-center gap-1 bg-[#121826] border border-[#D4AF37]/40 rounded-lg p-1 text-xs shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
              <select
                value={activeTheme}
                onChange={(e) => onThemeChange(e.target.value as ThemeId)}
                aria-label="Color Palette"
                className="bg-transparent text-slate-200 font-medium py-1 px-1.5 text-xs focus:outline-none cursor-pointer"
              >
                {themeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800 space-y-4 font-sans-clean bg-[#0B0F17] rounded-b-2xl p-4">
            {/* Mobile Language Selector */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Language / ਭਾਸ਼ਾ / भाषा
              </span>
              <div className="flex gap-1.5">
                {languages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setLanguage(item.id);
                    }}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      language === item.id
                        ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-bold'
                        : 'border-slate-800 bg-[#121826] text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <a
                href="#properties"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.homes}
              </a>
              <a
                href="#communities"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.communities}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.services}
              </a>
              <a
                href="#valuation"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.valuation}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.faq}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:bg-slate-800/80 rounded"
              >
                {t.nav.contact}
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Color Palette:</span>
              <div className="flex gap-1.5">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onThemeChange(opt.id)}
                    className={`px-2 py-1 text-xs rounded border cursor-pointer ${
                      activeTheme === opt.id
                        ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-medium'
                        : 'border-slate-800 bg-[#121826] text-slate-300'
                    }`}
                  >
                    {opt.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  onModeChange('preview');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 min-w-[80px] py-2 text-xs rounded-md border text-center font-medium ${
                  currentMode === 'preview'
                    ? 'bg-gold-metallic text-slate-950 border-[#D4AF37] font-bold'
                    : 'bg-[#121826] text-slate-300 border-slate-800'
                }`}
              >
                {t.nav.preview}
              </button>
              <button
                onClick={() => {
                  onModeChange('studio');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 min-w-[80px] py-2 text-xs rounded-md border text-center font-medium ${
                  currentMode === 'studio'
                    ? 'bg-gold-metallic text-slate-950 border-[#D4AF37] font-bold'
                    : 'bg-[#121826] text-slate-300 border-slate-800'
                }`}
              >
                {t.nav.promptStudio}
              </button>
              <button
                onClick={() => {
                  onModeChange('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 min-w-[80px] py-2 text-xs rounded-md border text-center font-medium ${
                  currentMode === 'admin'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 border-[#D4AF37] font-bold'
                    : 'bg-[#121826] text-slate-300 border-slate-800'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
