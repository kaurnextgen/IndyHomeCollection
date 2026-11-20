import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  onCallClick: () => void;
  onConsultClick: (topic?: string) => void;
  onValuationClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onCallClick,
  onConsultClick,
  onValuationClick,
}) => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('val');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      id: 'val',
      category: 'Selling & Value',
      question: "How do I accurately determine my home's real market value in Indiana?",
      answer:
        "Automated algorithm algorithms (like Zillow or Redfin) use broad ZIP-code averages and often miss micro-neighborhood boundaries, interior condition, finished basement quality, or recent school zoning shifts. In markets like Carmel, Fishers, Zionsville, or Avon, two identical floorplans can vary by $30,000–$50,000 depending on lot position or updates. We provide a complimentary, in-depth Comparative Market Analysis (CMA) that evaluates actual pending sales and hyper-local buyer demand.",
    },
    {
      id: 'relo',
      category: 'Relocation',
      question: 'How long does an out-of-state relocation to Indiana typically take?',
      answer:
        'A smooth relocation usually spans 30 to 75 days, though we frequently assist clients on accelerated 2-to-3 week employer transfer timelines. The process begins with an orientation call where we map your commute requirements and school preferences. We then conduct live FaceTime HD walkthroughs of prospective properties and neighborhood streets. Once an offer is accepted, standard Indiana escrow closes within 30 to 45 days.',
    },
    {
      id: 'invest',
      category: 'Investing',
      question: 'What makes Indiana one of the most attractive markets for rental property investors?',
      answer:
        'Indiana consistently ranks among the top Midwest states for cash-flow stability. Investors benefit from favorable property tax caps (2% cap on non-homestead residential rentals), relatively low acquisition price points compared to national averages, strong employment anchors (medical, biotech, logistics, and tech corridors), and consistent 6%–9% cap rates across single-family and duplex assets in Marion, Hendricks, and Johnson counties.',
    },
    {
      id: 'schools',
      category: 'Communities',
      question: 'How significantly do school districts affect home values across Central Indiana?',
      answer:
        'School performance is one of the strongest drivers of long-term property appreciation and resale velocity in Indiana. Districts such as Carmel Clay, Zionsville Community, Brownsburg, Avon, Hamilton Southeastern, and Center Grove maintain exceptionally tight inventory and quick absorption rates, offering high resale protection even during shifting macroeconomic cycles.',
    },
    {
      id: 'first-time',
      category: 'Buying',
      question: 'What should first-time home buyers in Indiana prepare before making an offer?',
      answer:
        'Before touring homes, securing a verified pre-approval letter from a reputable local lender is vital. Sellers in competitive communities like Fishers or Plainfield require this before reviewing offers. You will also want 1%–2% in liquid funds ready for your earnest money deposit upon contract acceptance, plus funds for home inspection ($400–$600) and closing costs.',
    },
    {
      id: 'advisory',
      category: 'General',
      question: "How does working with Indy Home Collection differ from large corporate teams?",
      answer:
        'At large corporate agencies, clients are often passed between lead coordinators, showing assistants, and transaction coordinators. When you partner with Indy Home Collection, you work directly with us at every stage. You have our direct personal cell at (317) 408-9532, receiving honest counsel focused on your family’s well-being without high-pressure sales quotas.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Selling & Value', label: 'Home Valuation & Selling' },
    { id: 'Relocation', label: 'Relocating to Indiana' },
    { id: 'Investing', label: 'Investment Properties' },
    { id: 'Buying', label: 'Buying a Home' },
  ];

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  );

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-gradient-to-b from-[#080C14] via-[#0B0F17] to-[#0A0D15] border-y border-[#D4AF37]/25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.faq.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.faq.title}
          </h2>
          <p className="font-body-read text-base text-slate-300 mt-3 font-light">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#131A29] rounded-2xl max-w-fit mx-auto mb-10 border border-[#D4AF37]/35 shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-luxury-sans uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gold-metallic text-slate-950 font-bold shadow-xs border border-[#D4AF37]'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-[#1A2338]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden text-white ${
                  isOpen
                    ? 'border-[#D4AF37] bg-[#131B2A] shadow-luxury-glow ring-1 ring-[#D4AF37]/35'
                    : 'border-[#D4AF37]/25 bg-[#0E1422]/95 hover:border-[#D4AF37]/50 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-6 rounded-full transition-colors duration-300 ${
                        isOpen ? 'bg-[#D4AF37]' : 'bg-slate-700'
                      }`}
                    />
                    <span
                      className={`font-luxury-serif text-lg sm:text-xl font-normal transition-colors ${
                        isOpen ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#0B0F17] text-amber-300 rotate-180 border border-[#D4AF37]/50'
                        : 'bg-[#131B2A] text-slate-300 border border-[#D4AF37]/30'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 font-body-read leading-relaxed border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p>{faq.answer}</p>
                    
                    {faq.id === 'val' && (
                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                        <button
                          onClick={onValuationClick}
                          className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Try the Instant Home Valuation Estimator</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footnote Strip: Direct Line Prompt */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 shadow-luxury-glow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white">
          <div className="space-y-0.5">
            <h4 className="font-serif-luxury font-bold text-white text-base">
              {t.faq.haveQuestion}
            </h4>
            <p className="text-xs text-slate-300 font-body-read font-light">
              We provide direct, confidential answers with zero commitment required.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-xs font-luxury-sans uppercase tracking-wider font-semibold hover:bg-slate-900 border border-[#D4AF37] shadow-luxury-glow transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Call (317) 408-9532</span>
            </button>
            <button
              onClick={() => onConsultClick('Custom Question / General Inquiry')}
              className="px-4 py-3 rounded-xl border border-[#D4AF37]/45 bg-[#131A29] text-amber-300 text-xs font-luxury-sans uppercase tracking-wider font-semibold hover:bg-[#1C263B] transition-all cursor-pointer shadow-2xs"
            >
              {t.faq.askOnline}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
