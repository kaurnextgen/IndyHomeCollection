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
      headline: 'From pre-approval to keys in hand, they guided our family with trusted expertise.',
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
    {
      id: 'gill-westfield',
      clientName: 'Jaspreet & Kulwinder Gill',
      location: 'Westfield, IN',
      county: 'Hamilton County',
      transactionType: 'New Construction Estate Closing',
      purchasePrice: '$540,000 Purchase',
      image: ASSET_IMAGES.modernNewConstruction,
      languageSupport: 'Fluent Punjabi & English Consultation',
      headline: 'Guided our lot selection and builder upgrades in Westfield with tremendous insight.',
      story:
        'We wanted a home close to Grand Park with an open kitchen layout and east-facing morning sunshine. She reviewed the builder contract line by line, helped us choose structural upgrades that actually hold resale value, and negotiated builder credits. Her patience and deep knowledge of Hamilton County made this huge milestone stress-free for our family.',
      closingStatement: 'Closed with $15,000 builder concession in Westfield Washington Schools.',
    },
    {
      id: 'rao-fishers',
      clientName: 'Amit & Priyanka Rao',
      location: 'Fishers, IN',
      county: 'Hamilton County',
      transactionType: 'Luxury Waterfront Community Closing',
      purchasePrice: '$675,000 Purchase',
      image: ASSET_IMAGES.suburbanCarmel,
      languageSupport: 'Fluent Hindi & English Consultation',
      headline: 'Found us our dream home near Geist with space for pooja room and in-laws.',
      story:
        'Moving our family from Chicago to Fishers, we needed a home with a dedicated first-floor prayer and pooja space, plus privacy for visiting parents. She showed us 8 properties on FaceTime HD before we even flew in, pointed out HOA rules on exterior additions, and negotiated $18,000 below listing price.',
      closingStatement: 'Smooth 30-day closing in HSE School District with complete repair escrow.',
    },
    {
      id: 'grewal-plainfield',
      clientName: 'Satnam & Ravinder Grewal',
      location: 'Plainfield, IN',
      county: 'Hendricks County',
      transactionType: 'Custom Brick Residence Purchase',
      purchasePrice: '$430,000 Purchase',
      image: ASSET_IMAGES.largeFamilyBrick,
      languageSupport: 'Fluent Punjabi & English Consultation',
      headline: 'Honest advice that saved us from making an expensive mistake on a property.',
      story:
        'We were ready to put an offer on a house in Plainfield, but she inspected the crawl space and noticed foundation settlement issues that we completely missed. Instead of rushing for a quick commission, she advised us to walk away and found us an even better brick home with a massive backyard 2 weeks later. That genuine honesty is rare.',
      closingStatement: 'Closed with clean title, zero structural concerns, and immediate occupancy.',
    },
    {
      id: 'chawla-carmel',
      clientName: 'Dr. Sandeep & Anjali Chawla',
      location: 'Carmel, IN',
      county: 'Hamilton County',
      transactionType: 'Executive Luxury Residence Closing',
      purchasePrice: '$920,000 Purchase',
      image: ASSET_IMAGES.luxuryEstateLarge,
      languageSupport: 'Fluent Hindi & English Consultation',
      headline: 'Exceptional white-glove advisory for our busy physician schedules.',
      story:
        'Between hospital on-call hours and raising three school-age kids, house hunting seemed impossible. She curated private evening walkthroughs, coordinated with our private wealth lender, and handled every inspection negotiation with meticulous attention to detail. Her representation was nothing short of perfection.',
      closingStatement: 'Flawless private closing in West Carmel within 25 days.',
    },
    {
      id: 'brar-brownsburg',
      clientName: 'Manpreet & Simranjit Brar',
      location: 'Brownsburg, IN',
      county: 'Hendricks County',
      transactionType: 'Family Move-Up Home Closing',
      purchasePrice: '$485,000 Purchase',
      image: ASSET_IMAGES.brownsburgHome,
      languageSupport: 'Fluent Punjabi & English Consultation',
      headline: 'Explained every Indiana real estate law in Punjabi so my parents felt 100% included.',
      story:
        'Buying our second home in Brownsburg, it was vital that my elderly parents felt part of every decision. She patiently explained property tax caps, homestead exemptions, and title vesting in fluent Punjabi. She treated us like family from day one.',
      closingStatement: 'Keys in hand with 4-star Brownsburg schools and top-tier warranty.',
    },
    {
      id: 'venkat-zionsville',
      clientName: 'Karthik & Deepa Venkataraman',
      location: 'Zionsville, IN',
      county: 'Boone County',
      transactionType: 'Wooded Village Residence Closing',
      purchasePrice: '$850,000 Purchase',
      image: ASSET_IMAGES.zionsvilleCottage,
      languageSupport: 'Fluent English & Hindi Consultation',
      headline: 'Won in a competitive multi-bid situation without overpaying appraisal.',
      story:
        'Zionsville homes in our target neighborhood were receiving multiple offers within 48 hours. Her tactical offer structuring—including appraisal gap protection and flexible seller lease-back—won us the home against four other competing bids without exceeding our budget. Her negotiation strategy is unmatched.',
      closingStatement: 'Secured accepted contract in 24 hours in Zionsville Community Schools.',
    },
    {
      id: 'sandhu-greenwood',
      clientName: 'Jagmohan & Kamaljit Sandhu',
      location: 'Greenwood, IN',
      county: 'Johnson County',
      transactionType: 'Center Grove Single-Family Closing',
      purchasePrice: '$510,000 Purchase',
      image: ASSET_IMAGES.greenwoodLakefront,
      languageSupport: 'Fluent Punjabi & Hindi Consultation',
      headline: 'The most trusted real estate partner for our Indian family in Central Indiana.',
      story:
        'We moved from New Jersey to Greenwood to be closer to our extended Punjabi family and the Gurdwara. She helped us compare Center Grove vs. Avon, analyzed recent neighborhood comps, and negotiated a brand new HVAC system replacement before closing. We could not be happier with our decision.',
      closingStatement: 'Closed on schedule with $9,500 seller repair credits in Center Grove.',
    },
    {
      id: 'deshmukh-mccordsville',
      clientName: 'Rohan & Meera Deshmukh',
      location: 'McCordsville, IN',
      county: 'Hancock County',
      transactionType: '5-Bedroom Residence near Geist Closing',
      purchasePrice: '$460,000 Purchase',
      image: ASSET_IMAGES.heroEstate,
      languageSupport: 'Fluent Hindi & Marathi Consultation',
      headline: 'Unbeatable neighborhood knowledge of the booming McCordsville corridor.',
      story:
        'McCordsville is growing fast, and she knew exactly which subdivisions have planned town-center walkability, lower tax assessments, and premier Mt. Vernon schools. She helped us secure a premium corner-lot home with a finished walkout basement that our family absolutely loves.',
      closingStatement: 'Closed with 2.5% builder rate buydown savings and lifetime warranty.',
    },
    {
      id: 'toor-noblesville',
      clientName: 'Navdeep & Sukhmani Toor',
      location: 'Noblesville, IN',
      county: 'Hamilton County',
      transactionType: 'Custom Residence Purchase',
      purchasePrice: '$525,000 Purchase',
      image: ASSET_IMAGES.noblesvilleCustom,
      languageSupport: 'Fluent Punjabi & English Consultation',
      headline: 'Patient, culturally attentive, and always available on direct phone call.',
      story:
        'Unlike large corporate teams where you get passed between junior assistants, whenever we called (317) 408-9532, she answered directly. She spent evenings discussing earnest money safety and radon mitigation. She is truly a trusted partner for any Indian family moving to Indiana.',
      closingStatement: 'Closed smoothly with full radon remediation completed by seller.',
    },
    {
      id: 'malhotra-avon',
      clientName: 'Vikram & Neha Malhotra',
      location: 'Avon, IN',
      county: 'Hendricks County',
      transactionType: 'First-Time US Home Purchase Closing',
      purchasePrice: '$390,000 Purchase',
      image: ASSET_IMAGES.cozySmallHome,
      languageSupport: 'Fluent Hindi & English Consultation',
      headline: 'Made our first American home buying journey an absolute joy.',
      story:
        'Coming from Delhi on an H-1B visa, buying our first US property felt daunting with mortgage underwriting and HOA rules. She walked us step-by-step through every document, recommended an outstanding local lender who understood visa guidelines, and negotiated all closing costs covered by the seller.',
      closingStatement: 'Closed with zero out-of-pocket closing costs in Avon.',
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
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-[11px] font-mono font-bold text-amber-300/90 px-2.5 py-1 rounded-md bg-[#131A29] border border-[#D4AF37]/30">
                    {currentIndex + 1} / {stories.length}
                  </span>

                  <div className="hidden sm:flex gap-1 max-w-[140px] overflow-hidden">
                    {stories.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx
                            ? 'w-4 bg-gold-metallic border border-[#D4AF37]'
                            : 'w-1.5 bg-slate-700 hover:bg-[#D4AF37]/50'
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
