import React from 'react';
import { HeartHandshake, PhoneCall, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TrustAndPhilosophyProps {
  onCallClick: () => void;
  onConsultClick: () => void;
}

export const TrustAndPhilosophy: React.FC<TrustAndPhilosophyProps> = ({
  onCallClick,
  onConsultClick,
}) => {
  const { t } = useLanguage();
  const commitments = [
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-800" />,
      title: 'Client-First Relationship',
      desc: 'Real estate is about people and their lives, not transactional volume. We prioritize honest counsel, clear expectations, and long-term fiduciary respect over quick commissions.',
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-amber-800" />,
      title: 'Direct Personal Accessibility',
      desc: 'When you call (317) 408-9532, you reach us directly. No call centers, no outsourced junior assistants. You get dedicated, responsive attention when decisions count.',
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-800" />,
      title: 'Candid Indiana Market Guidance',
      desc: 'We share the good, the bad, and the practical about every neighborhood, school zone, and resale outlook so you move forward with absolute clarity and confidence.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-800" />,
      title: 'Uncompromised Fiduciary Care',
      desc: 'From initial consultation through the closing table, we safeguard your earnest money, negotiate firmly on your behalf, and ensure every contract protects your interests.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#080B13] via-[#0B0F17] to-[#0A0D15] border-y border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span>{t.trust.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.trust.title}
          </h2>
          <p className="font-body-read text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-light">
            {t.trust.subtitle}
          </p>
        </div>

        {/* Commitment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0E1422]/95 p-6 rounded-2xl border border-[#D4AF37]/25 shadow-luxury-glow hover:shadow-luxury-card hover:border-[#D4AF37] transition-all duration-300 space-y-3 flex flex-col justify-between group hover:-translate-y-1 text-white"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#131B2A] border border-[#D4AF37]/45 shadow-2xs w-fit text-amber-300">
                  {item.icon}
                </div>
                <h3 className="font-luxury-serif text-xl font-normal text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="font-body-read text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 text-[10px] text-amber-400 font-luxury-sans uppercase tracking-widest font-semibold">
                The Indy Home Collection Guarantee
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F17] via-[#141C2A] to-[#0B0F17] border border-[#D4AF37]/50 shadow-luxury-glow text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white">
              {t.trust.readyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 font-body-read font-light">
              {t.trust.readySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCallClick}
              className="px-6 py-3.5 rounded-xl bg-gold-metallic text-slate-950 font-luxury-sans uppercase tracking-wider font-semibold text-xs hover:opacity-95 border border-[#D4AF37] transition-all cursor-pointer shadow-luxury-glow active:scale-95 whitespace-nowrap"
            >
              Call (317) 408-9532
            </button>
            <button
              onClick={onConsultClick}
              className="px-5 py-3.5 rounded-xl bg-slate-900 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white font-luxury-sans uppercase tracking-wider font-semibold text-xs hover:bg-slate-850 transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              Book Private Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
