import React from 'react';

interface LuxuryLogoProps {
  variant?: 'header' | 'footer' | 'stacked' | 'markOnly';
  className?: string;
  sloganText?: string;
  size?: number;
  showLogos?: boolean;
  onClick?: () => void;
}

// Official Real Estate Credentials & Trust Logos (REALTOR®, EQUAL HOUSING, MLS®)
export const TrustCredentialsLogos: React.FC<{ className?: string; isDark?: boolean }> = ({
  className = '',
  isDark = true,
}) => (
  <div
    className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all ${
      isDark
        ? 'bg-slate-900/90 border-[#D4AF37]/40 shadow-xs'
        : 'bg-white/90 border-[#D4AF37]/35 shadow-xs'
    } ${className}`}
    title="Licensed Indiana Real Estate Professional · Official REALTOR®, Equal Housing Opportunity & MLS Member"
  >
    {/* REALTOR® Official Symbol */}
    <div className="flex items-center gap-1" title="National Association of REALTORS® Member">
      <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" rx="4" fill="#080B0F" stroke="#D4AF37" strokeWidth="1.2" />
        <path
          d="M9 8 H18 C22 8 24 10 24 13.5 C24 16.5 22 18.5 18 18.5 H13 V24 H9 V8 Z M13 11 V15.5 H17.5 C19.5 15.5 20.5 14.5 20.5 13.2 C20.5 12 19.5 11 17.5 11 H13 Z M17 18.5 L24 24 H19.5 L13.8 18.5 H17 Z"
          fill="#E3BE72"
        />
      </svg>
      <span className="text-[8.5px] font-luxury-sans font-bold tracking-[0.18em] uppercase text-slate-200">
        REALTOR<sup className="text-[6px] -top-1">®</sup>
      </span>
    </div>

    <span className="h-3 w-px bg-[#D4AF37]/40" aria-hidden="true" />

    {/* Equal Housing Opportunity Symbol */}
    <div className="flex items-center gap-1" title="Equal Housing Opportunity">
      <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" rx="4" fill="#080B0F" stroke="#D4AF37" strokeWidth="1.2" />
        <path d="M6 16 L16 7 L26 16" stroke="#E3BE72" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21 8 V11" stroke="#E3BE72" strokeWidth="1.4" />
        <path d="M9 15 V24 H23 V15" stroke="#E3BE72" strokeWidth="1.4" />
        <line x1="12" y1="18.5" x2="20" y2="18.5" stroke="#E3BE72" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="12" y1="21.5" x2="20" y2="21.5" stroke="#E3BE72" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="text-[8.5px] font-luxury-sans font-bold tracking-[0.16em] uppercase text-slate-200 hidden sm:inline">
        EQUAL HOUSING
      </span>
    </div>

    <span className="h-3 w-px bg-[#D4AF37]/40 hidden sm:inline" aria-hidden="true" />

    {/* MLS® Multiple Listing Service */}
    <div className="hidden sm:flex items-center gap-1" title="Indiana Regional MLS Certified">
      <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="30" height="30" rx="4" fill="#080B0F" stroke="#D4AF37" strokeWidth="1.2" />
        <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" fill="#E3BE72" letterSpacing="0.08em">
          MLS
        </text>
      </svg>
      <span className="text-[8.5px] font-luxury-sans font-bold tracking-[0.16em] uppercase text-amber-300">
        VERIFIED
      </span>
    </div>
  </div>
);

export const LuxuryLogo: React.FC<LuxuryLogoProps> = ({
  variant = 'header',
  className = '',
  sloganText = 'Real Estate & Advisory · Indiana',
  size,
  onClick,
}) => {
  // Designer Haute Horlogerie / Real Estate Monogram Crest: Architectural Octagonal Cartouche with interlocking H & K
  const MonogramCrest = ({
    size: crestSize = size || 44,
    isDark = false,
  }: {
    size?: number;
    isDark?: boolean;
  }) => (
    <div
      className="relative flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105"
      style={{ width: crestSize, height: crestSize }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="goldSheenCrest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9F1E2" />
            <stop offset="25%" stopColor="#E3BE72" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#F5E4BE" />
            <stop offset="100%" stopColor="#9B7328" />
          </linearGradient>
          <linearGradient id="goldDarkCrest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B38936" />
            <stop offset="100%" stopColor="#6E4F18" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Fine-Line Octagonal Cartouche */}
        <polygon
          points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
          stroke="url(#goldSheenCrest)"
          strokeWidth="1.75"
          fill={isDark ? '#080B0F' : '#FFFFFF'}
          className="transition-colors duration-300"
        />

        {/* Inner Hairline Inset Border */}
        <polygon
          points="32,9 68,9 91,32 91,68 68,91 32,91 9,68 9,32"
          stroke="url(#goldSheenCrest)"
          strokeWidth="0.85"
          strokeDasharray="3 1.5"
          opacity="0.85"
        />

        {/* Four Regal Diamond Cardinal Points */}
        <polygon points="50,11 52,14 50,17 48,14" fill="url(#goldSheenCrest)" />
        <polygon points="50,83 52,86 50,89 48,86" fill="url(#goldSheenCrest)" />
        <polygon points="11,50 14,52 17,50 14,48" fill="url(#goldSheenCrest)" />
        <polygon points="83,50 86,52 89,50 86,48" fill="url(#goldSheenCrest)" />

        {/* Interlocking Serif "I", "H", & "C" (Indy Home Collection) */}
        {/* 'I' Left serif column */}
        <path
          d="M 23 33 L 31 33 M 27 33 L 27 67 M 23 67 L 31 67"
          stroke="url(#goldSheenCrest)"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        {/* 'H' Center */}
        <path
          d="M 38 27 L 44 27 M 41 27 L 41 73 M 38 73 L 44 73 M 41 50 L 59 50 M 56 27 L 62 27 M 59 27 L 59 73 M 56 73 L 62 73"
          stroke="url(#goldDarkCrest)"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        {/* 'C' Right wing arc */}
        <path
          d="M 78 35 C 70 26 66 36 66 50 C 66 64 70 74 78 65"
          stroke="url(#goldSheenCrest)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Crown Starburst Ornament at Top Peak */}
        <path
          d="M 50 18 L 51.5 21.5 L 55 23 L 51.5 24.5 L 50 28 L 48.5 24.5 L 45 23 L 48.5 21.5 Z"
          fill="url(#goldSheenCrest)"
        />
      </svg>
    </div>
  );

  if (variant === 'markOnly') {
    return <MonogramCrest size={size || 44} />;
  }

  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center group cursor-pointer ${className}`}
      >
        <MonogramCrest size={size || 56} />
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-luxury-display text-2xl sm:text-3xl font-normal tracking-[0.22em] uppercase text-slate-950 group-hover:text-amber-900 transition-colors">
            <span>INDY</span>
            <span className="font-luxury-serif italic font-light lowercase text-amber-700 tracking-normal text-xl sm:text-2xl">
              Home
            </span>
            <span className="animated-shining-word">COLLECTION</span>
          </div>
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-luxury-sans text-[9px] tracking-[0.35em] uppercase font-semibold text-amber-800">
              INDIANA REALTOR
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-[10px] tracking-[0.2em] font-luxury-sans uppercase text-slate-500 pt-1">
            {sloganText}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-4 group cursor-pointer text-left ${className}`}
      >
        <MonogramCrest size={size || 50} isDark={true} />
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-luxury-display text-xl sm:text-2xl font-normal tracking-[0.22em] uppercase text-white group-hover:text-[#F3E5C8] transition-colors">
              INDY
            </span>
            <span className="font-luxury-serif italic font-light lowercase text-amber-300 text-lg sm:text-xl">
              Home
            </span>
            <span className="font-luxury-display text-xl sm:text-2xl font-medium tracking-[0.22em] uppercase animated-gold-glow-word leading-none">
              COLLECTION
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
            <span className="text-[10px] font-luxury-sans tracking-[0.25em] uppercase font-semibold text-[#D4AF37]">
              {sloganText}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: variant === 'header' (Strict Top Bar Contract: 1 single-line, zero wrapping)
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left focus:outline-none select-none ${className}`}
    >
      <MonogramCrest size={size || 44} isDark={true} />
      <div className="flex flex-col justify-center">
        {/* Designer Haute Wordmark: Roman All-Caps + Italic Script + Animated Shining Word */}
        <div className="flex items-baseline gap-2 relative">
          <span className="font-luxury-display text-lg sm:text-xl font-normal tracking-[0.22em] uppercase text-white group-hover:text-[#F3E5C8] transition-colors leading-none">
            INDY
          </span>
          <span className="font-luxury-serif italic font-light lowercase text-amber-300 text-lg sm:text-xl leading-none -mx-0.5 font-normal">
            Home
          </span>
          <span className="font-luxury-display text-lg sm:text-xl font-medium tracking-[0.22em] uppercase animated-shining-word leading-none drop-shadow-xs">
            COLLECTION
          </span>
          <span className="sparkle-twinkle text-[#D4AF37] text-xs font-serif leading-none select-none absolute -top-1.5 -right-3" aria-hidden="true">
            ✦
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
          <span className="text-[9.5px] font-luxury-sans tracking-[0.22em] uppercase font-semibold text-amber-400/90">
            {sloganText}
          </span>
        </div>
      </div>
    </div>
  );
};
