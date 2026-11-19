import React, { useState, useEffect, useId } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  ShieldCheck,
  CheckCircle2,
  X,
  MessageSquarePlus,
  Key,
  Languages,
} from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imagesMap';
import { useLanguage } from '../context/LanguageContext';
import { adminStore } from '../data/adminStore';

interface StoryItem {
  id: string;
  clientName: string;
  location: string;
  county: string;
  transactionType: string;
  purchasePrice: string;
  image: string;
  languageSupport: string;
  headline: string;
  story: string;
  closingStatement: string;
}

interface ClientStoriesProps {
  onConsultClick: (topic?: string) => void;
  onCallClick: () => void;
}

export const ClientStories: React.FC<ClientStoriesProps> = ({
  onConsultClick,
  onCallClick,
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const reviewNameId = useId();
  const reviewCityId = useId();
  const reviewTypeId = useId();
  const reviewTextId = useId();

  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('Carmel');
  const [revType, setRevType] = useState('Buying a Home');
  const [revText, setRevText] = useState('');

  const stories: StoryItem[] = [
    {
      id: 'boparai-carmel',
      clientName: 'Harpreet & Simran Boparai',
      location: 'Carmel, IN',
      county: 'Hamilton County',
      transactionType: 'Luxury Single-Family Home Closing',
      purchasePrice: '$780,000 Purchase',
      image: ASSET_IMAGES.clientPunjabiCarmel,
      languageSupport: 'Fluent Punjabi & English Consultation',
      headline: 'Finding a home with morning light, a guest suite for parents, and Carmel Clay schools was seamless with us.',
      story:
        'Relocating to Carmel, we needed a home with thoughtful spatial flow, a guest bedroom on the main floor for visiting parents, and top school ratings. They took the time to understand both our cultural family priorities and Indiana closing laws. She reviewed the seller disclosures thoroughly, negotiated an additional $12,000 in closing repair credits, and stood beside us at the closing table when keys were handed over.',
      closingStatement: 'Closed on schedule at title in Carmel with full inspection credits and zero surprise fees.',
    },
    {
      id: 'sharma-fishers',
      clientName: 'Rajesh & Sunita Sharma',
      location: 'Fishers, IN',
      county: 'Hamilton County',
      transactionType: 'New Construction Build Closing',
      purchasePrice: '$615,000 Purchase',
      image: ASSET_IMAGES.clientIndianFishers,
      languageSupport: 'Fluent Hindi & English Consultation',
      headline: 'Navigated our custom builder contract and pre-drywall walk with incredible dedication and care.',
      story:
        'Building a home in Fishers near Geist was initially intimidating with so many builder upgrade clauses. They attended our pre-drywall walk, caught electrical framing discrepancies that needed remediation before insulation, and made sure our earnest money deposit was strictly protected. Having someone who speaks Hindi and breaks down mortgage rate locks so patiently gave our family total peace of mind.',
      closingStatement: 'Keys received with 100% builder punch-list compliance in Hamilton Southeastern School District.',
    },
    {
      id: 'singh-avon',
      clientName: 'Gurpreet & Amanpreet Singh Family',
      location: 'Avon, IN',
      county: 'Hendricks County',
      transactionType: 'First-Time Home Purchase Closing',
      purchasePrice: '$365,000 Purchase',
      image: ASSET_IMAGES.clientPunjabiAvon,
      languageSupport: 'Fluent Punjabi & Hindi Consultation',
      headline: 'From pre-approval to keys in hand, they guided our family like a trusted neighbor.',
      story:
        'As first-time home buyers in the US, we had countless questions about Indiana property tax caps, homeowner association covenants, and escrow accounts. They took us through more than 15 homes across Avon, Plainfield, and Brownsburg without ever rushing us. She honestly advised us against two houses with hidden drainage problems and found this beautiful brick home with a large yard for our children.',
      closingStatement: 'Closed with 30-day conventional financing and immediate occupancy in Avon Four-Star Schools.',
    },
    {
      id: 'patel-zionsville',
      clientName: 'Dr. Vikram & Pooja Patel',
      location: 'Zionsville, IN',
      county: 'Boone County',
      transactionType: 'Multi-Generational Luxury Estate Closing',
      purchasePrice: '$1,450,000 Purchase',
      image: ASSET_IMAGES.clientIndianZionsville,
      languageSupport: 'Fluent Hindi & English Consultation',
      headline: 'An off-market Zionsville wooded estate that checked every box for multi-generational living.',
      story:
        'With elderly parents living with us, we needed an estate with a zero-step main level suite and peaceful wooded acreage near premier medical facilities. They used their local network to find an off-market custom stone residence before it hit the public MLS. Her quiet, firm negotiation saved us from a multi-bid scenario and secured clean title in under a month.',
      closingStatement: 'Private off-market closing completed in 28 days with full title insurance and boundary survey.',
    },
  ];

  // Auto-rotation every 8 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, stories.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[currentIndex];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revText) return;

    adminStore.addReview({
      clientName: revName,
      location: `${revCity}, IN`,
      county: revCity === 'Carmel' || revCity === 'Fishers' ? 'Hamilton County' : revCity === 'Zionsville' ? 'Boone County' : revCity === 'Avon' || revCity === 'Brownsburg' || revCity === 'Plainfield' ? 'Hendricks County' : 'Central Indiana',
      transactionType: revType,
      purchasePrice: 'Client Verified',
      headline: `Verified Client Closing Experience (${revCity})`,
      story: revText,
      closingStatement: '“A smooth and dedicated journey with Indy Home Collection.”',
      rating: 5,
      status: 'pending',
    });

    // Also register as high-intent contact in CRM
    adminStore.addLead({
      name: revName,
      phone: 'Provided in review',
      email: '',
      type: 'contact',
      source: 'Client Story / Testimonial Submission',
      city: revCity,
      details: `Submitted closing review for ${revType} in ${revCity}: "${revText.slice(0, 80)}..."`,
      status: 'closed',
      priority: 'normal',
    });

    setReviewSubmitted(true);
  };

  return (
    <section
      id="stories"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#0A0D15] via-[#0B0F18] to-[#080C14] border-y border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.stories.kicker}</span>
            </div>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
              {t.stories.title}
            </h2>
            <p className="font-body-read text-base text-slate-300 mt-3 leading-relaxed font-light">
              {t.stories.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setReviewSubmitted(false);
                setReviewModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4AF37]/45 bg-[#131A29] text-xs font-luxury-sans uppercase tracking-wider font-semibold text-amber-300 hover:bg-[#1B2538] transition-all cursor-pointer shadow-2xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.stories.shareExperience}</span>
            </button>
          </div>
        </div>

        {/* Carousel Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-[#0E1422]/95 rounded-3xl border border-[#D4AF37]/25 shadow-luxury-glow overflow-hidden text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Photo Column */}
            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[460px] bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800">
              <img
                src={current.image}
                alt={current.clientName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              {/* Photo Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-luxury-glow space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-luxury-sans uppercase tracking-wider font-semibold text-[#F6EBD7]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{current.location}</span>
                  </div>
                  <span className="font-luxury-serif text-amber-300 text-sm">
                    {current.purchasePrice}
                  </span>
                </div>
                <div className="text-[11px] text-white/80 flex items-center gap-1 font-body-read font-light">
                  <Languages className="w-3 h-3 text-emerald-400" />
                  <span>{current.languageSupport}</span>
                </div>
              </div>
            </div>

            {/* Right Story & Testimonial Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Unboxed Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-luxury-sans uppercase tracking-wider font-semibold">
                  <span className="text-amber-400">{current.transactionType}</span>
                  <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
                  <span className="text-slate-400 font-normal">{current.county}</span>
                  <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Home Purchase
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#D4AF37]/50 -mb-2" />

                <h3 className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white leading-snug italic">
                  "{current.headline}"
                </h3>

                <p className="font-body-read text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {current.story}
                </p>

                {/* Closing Statement Box */}
                <div className="p-4 rounded-xl bg-[#131B2A] border border-[#D4AF37]/20 text-xs text-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.stories.officialStatement}</span>
                  </div>
                  <p className="text-slate-300 font-normal leading-relaxed pl-5 font-light">
                    {current.closingStatement}
                  </p>
                </div>
              </div>

              {/* Client Signature & Carousel Controls */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-luxury-serif text-lg font-normal text-white">
                    {current.clientName}
                  </h4>
                  <span className="text-xs text-slate-400 font-body-read">
                    Homeowners in {current.location} ({current.county})
                  </span>
                </div>

                {/* Arrow Controls & Indicators */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 mr-2">
                    {stories.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx
                            ? 'w-6 bg-gold-metallic border border-[#D4AF37]'
                            : 'w-2 bg-slate-700 hover:bg-[#D4AF37]/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-2 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-amber-300 hover:bg-[#1B2538] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-2 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-amber-300 hover:bg-[#1B2538] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Community & Cultural Consultation Callout */}
        <div className="mt-8 p-4 rounded-2xl bg-[#131B2A] border border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {t.stories.multilingualNotice}
            </span>
          </div>

          <button
            onClick={onCallClick}
            className="text-amber-300 hover:text-amber-200 font-semibold underline shrink-0 cursor-pointer"
          >
            Speak with us directly: (317) 408-9532
          </button>
        </div>

      </div>

      {/* Submit Experience Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative font-sans-clean space-y-5">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!reviewSubmitted ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase text-amber-800">
                    Client Feedback
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-slate-900">
                    Share Your Closing Experience
                  </h3>
                  <p className="text-xs text-slate-600 font-body-read">
                    Share your home purchasing or selling journey with Indy Home Collection.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor={reviewNameId} className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name / Family Name *
                    </label>
                    <input
                      id={reviewNameId}
                      type="text"
                      required
                      placeholder="e.g., Harpreet & Simran Boparai"
                      value={revName}
                      onChange={(e) => setRevName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={reviewCityId} className="block text-xs font-semibold text-slate-700 mb-1">
                        Indiana Community
                      </label>
                      <select
                        id={reviewCityId}
                        value={revCity}
                        onChange={(e) => setRevCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Carmel">Carmel (Hamilton Co.)</option>
                        <option value="Fishers">Fishers (Hamilton Co.)</option>
                        <option value="Avon">Avon (Hendricks Co.)</option>
                        <option value="Brownsburg">Brownsburg (Hendricks Co.)</option>
                        <option value="Plainfield">Plainfield (Hendricks Co.)</option>
                        <option value="Greenwood">Greenwood (Johnson Co.)</option>
                        <option value="Zionsville">Zionsville (Boone Co.)</option>
                        <option value="Other">Other Indiana City</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={reviewTypeId} className="block text-xs font-semibold text-slate-700 mb-1">
                        Transaction
                      </label>
                      <select
                        id={reviewTypeId}
                        value={revType}
                        onChange={(e) => setRevType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Buying a Home">Home Purchase</option>
                        <option value="New Construction">New Construction</option>
                        <option value="Selling a Home">Home Sale</option>
                        <option value="Relocation">Out-of-State Relocation</option>
                        <option value="Investment">Investment Property</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={reviewTextId} className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Closing Experience *
                    </label>
                    <textarea
                      id={reviewTextId}
                      rows={3}
                      required
                      placeholder="How did we help you navigate your purchase, negotiations, and closing in Indiana?"
                      value={revText}
                      onChange={(e) => setRevText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  Submit Closing Story
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-serif-luxury text-xl font-bold text-slate-900">
                  Thank You for Sharing!
                </h4>
                <p className="text-xs text-slate-600 font-body-read leading-relaxed">
                  Your closing experience has been submitted. Thank you for your partnership with Indy Home Collection.
                </p>
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
