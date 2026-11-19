import React, { useState } from 'react';
import {
  Video,
  Play,
  Pause,
  Maximize2,
  Volume2,
  Calendar,
  Phone,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Sparkles,
  ArrowRight,
  X,
  Compass,
  Check,
} from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imagesMap';
import { useLanguage } from '../context/LanguageContext';

export interface PropertyShowcaseItem {
  id: string;
  category: 'luxury' | 'small' | 'new' | 'family';
  categoryLabel: string;
  title: string;
  price: string;
  city: string;
  county: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  style: string;
  image: string;
  status: string;
  description: string;
  videoDuration: string;
  videoHighlights: string[];
}

interface PropertiesShowcaseProps {
  onScheduleTour: (propertyTitle: string) => void;
  onCallClick: () => void;
}

export const PropertiesShowcase: React.FC<PropertiesShowcaseProps> = ({
  onScheduleTour,
  onCallClick,
}) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideoProperty, setActiveVideoProperty] = useState<PropertyShowcaseItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(38); // Simulated progress %

  const properties: PropertyShowcaseItem[] = [
    {
      id: 'zionsville-mansion',
      category: 'luxury',
      categoryLabel: 'Luxury Big Homes & Estates',
      title: 'The Stonegate Grand Manor & Grounds',
      price: '$1,875,000',
      city: 'Zionsville',
      county: 'Boone County',
      beds: 6,
      baths: 7.5,
      sqft: 7850,
      lotSize: '2.4 Wooded Acres',
      style: 'Custom European Stone & Timber Estate',
      image: ASSET_IMAGES.luxuryEstateLarge,
      status: 'Exclusive Showcase',
      description:
        'Dramatic soaring timber-beamed foyer, custom limestone fireplaces, private primary retreat with dual spa baths, wine cellar, and circular cobblestone motor court surrounded by old-growth Indiana hardwoods.',
      videoDuration: '3:45 HD Walkthrough',
      videoHighlights: [
        '0:10 - Circular Driveway & Architectural Façade',
        '0:55 - Two-Story Great Room with Stone Fireplace',
        '1:40 - Culinary Chef’s Kitchen & Scullery',
        '2:30 - Primary Wing & Marble En-Suite Bath',
        '3:15 - Resort Veranda & Private Forest Grounds',
      ],
    },
    {
      id: 'avon-cottage',
      category: 'small',
      categoryLabel: 'Charming Small Homes & Cottages',
      title: 'The Prairie View Garden Craftsman',
      price: '$289,500',
      city: 'Avon',
      county: 'Hendricks County',
      beds: 3,
      baths: 2,
      sqft: 1680,
      lotSize: '0.28 Acre Landscaped Lot',
      style: 'Charming Bungalow Craftsman',
      image: ASSET_IMAGES.cozySmallHome,
      status: 'Move-In Ready',
      description:
        'Warm welcoming front porch with artisan rocking chairs, manicured perennial flowerbeds, sunny open living room with oak hardwood floors, updated butcher-block kitchen, and private fenced backyard.',
      videoDuration: '2:15 HD Walkthrough',
      videoHighlights: [
        '0:05 - Welcoming Front Porch & Cottage Garden',
        '0:35 - Sunlit Living Room with Hardwood Floors',
        '1:10 - Updated Kitchen & Sunny Dining Nook',
        '1:45 - Primary Bedroom with Walk-In Closet',
        '2:05 - Fenced Backyard Patio & Firepit Area',
      ],
    },
    {
      id: 'westfield-new-build',
      category: 'new',
      categoryLabel: 'New Construction & Modern Builds',
      title: 'The Grand Junction Modern Farmhouse',
      price: '$645,000',
      city: 'Westfield',
      county: 'Hamilton County',
      beds: 4,
      baths: 3.5,
      sqft: 3450,
      lotSize: '0.35 Acre Corner Lot',
      style: 'Modern Farmhouse New Construction',
      image: ASSET_IMAGES.modernNewConstruction,
      status: 'Brand New Build (2026)',
      description:
        'Pristine modern architecture with crisp white board-and-batten siding, black architectural trim, 10-foot ceilings, quartz waterfall island, main-floor executive office, and oversized 3-car garage.',
      videoDuration: '3:10 HD Walkthrough',
      videoHighlights: [
        '0:15 - Modern Board-and-Batten Curb Appeal',
        '0:50 - 10-Foot Ceiling Open Concept Great Room',
        '1:35 - Quartz Waterfall Island & Walk-In Pantry',
        '2:15 - Upper Floor Loft & Secondary Bedrooms',
        '2:50 - Covered Rear Patio Overlooking Green Space',
      ],
    },
    {
      id: 'fishers-family-estate',
      category: 'family',
      categoryLabel: 'Large Family Brick Homes',
      title: 'The Geist Reserve Stately Brick Colonial',
      price: '$685,000',
      city: 'Fishers',
      county: 'Hamilton County',
      beds: 5,
      baths: 4.5,
      sqft: 4320,
      lotSize: '0.42 Acre Mature Trees',
      style: 'Executive Two-Story Brick Residence',
      image: ASSET_IMAGES.largeFamilyBrick,
      status: 'Active Listing',
      description:
        'Stately all-brick exterior with arched entry, generous 3-car side-load garage, finished day-light basement with home theater and wet bar, expansive family kitchen, and walkout deck under mature shade trees.',
      videoDuration: '3:30 HD Walkthrough',
      videoHighlights: [
        '0:10 - Regal Brick Front & 3-Car Garage',
        '0:45 - Sweeping Curved Staircase & Grand Foyer',
        '1:25 - Kitchen with Island & Sunroom Extension',
        '2:20 - Finished Basement Lounge & Game Room',
        '3:05 - Shaded Backyard Lawn near Geist Trails',
      ],
    },
    {
      id: 'carmel-luxury-home',
      category: 'luxury',
      categoryLabel: 'Luxury Big Homes & Estates',
      title: 'The Monon Trail Modern Craftsman',
      price: '$895,000',
      city: 'Carmel',
      county: 'Hamilton County',
      beds: 5,
      baths: 5,
      sqft: 5100,
      lotSize: '0.55 Acre Private Lot',
      style: 'Upscale Transitional Craftsman',
      image: ASSET_IMAGES.suburbanCarmel,
      status: 'Featured Exclusive',
      description:
        'Walkable to the Arts & Design District, high-end stone masonry, covered outdoor living room with integrated fireplace, spa en-suite, and seamless proximity to Carmel Clay schools.',
      videoDuration: '2:50 HD Walkthrough',
      videoHighlights: [
        '0:10 - Artisan Stone & Cedar Shake Facade',
        '0:40 - Open Concept Living with Gas Fireplace',
        '1:20 - Designer Kitchen with Custom Cabinetry',
        '2:05 - Primary Suite with Soaking Tub',
        '2:35 - Outdoor Fireplace & Screened Veranda',
      ],
    },
    {
      id: 'investment-modern-townhome',
      category: 'new',
      categoryLabel: 'New Construction & Modern Builds',
      title: 'The Boulevard Modern Multi-Unit Residence',
      price: '$525,000',
      city: 'Indianapolis / Carmel Border',
      county: 'Marion / Hamilton Line',
      beds: 4,
      baths: 3.5,
      sqft: 2850,
      lotSize: 'Low Maintenance Urban Lot',
      style: 'Contemporary Multi-Level Modern',
      image: ASSET_IMAGES.investmentProperty,
      status: 'High Cash Flow Potential',
      description:
        'Contemporary multi-story residence with rooftop terrace, modern wood and slate panels, high-efficiency mechanicals, strong short-term or long-term rental appreciation profile.',
      videoDuration: '2:20 HD Walkthrough',
      videoHighlights: [
        '0:10 - Contemporary Architectural Exterior',
        '0:45 - Minimalist Glass Railing Living Space',
        '1:15 - Euro-Style Flat Panel Kitchen',
        '1:50 - Rooftop Lounge with Skyline Vistas',
      ],
    },
    {
      id: 'brownsburg-custom-estate',
      category: 'family',
      categoryLabel: 'Large Family Brick Homes',
      title: 'The Thornburg Manor & Woodland Grounds',
      price: '$765,000',
      city: 'Brownsburg',
      county: 'Hendricks County',
      beds: 5,
      baths: 4.5,
      sqft: 4850,
      lotSize: '0.65 Acre Wooded Corner Lot',
      style: 'Executive Custom Indiana Brick Estate',
      image: ASSET_IMAGES.brownsburgHome,
      status: 'New On Market',
      description:
        'Grand architectural limestone archway entry, warm two-story soaring great room with floor-to-ceiling brick hearth, gourmet kitchen with dual convection ovens, private main-level guest suite, and expansive 3-car side-load motor court.',
      videoDuration: '3:20 HD Walkthrough',
      videoHighlights: [
        '0:10 - Stately Limestone Arch & Curved Driveway',
        '0:50 - Two-Story Vaulted Great Room & Hearth',
        '1:30 - Chef’s Kitchen with Custom Maple Cabinetry',
        '2:15 - Main-Floor Guest En-Suite Suite',
        '2:55 - Shaded Backyard Lawn with Dogwood Trees',
      ],
    },
    {
      id: 'greenwood-waterfront-retreat',
      category: 'luxury',
      categoryLabel: 'Luxury Big Homes & Estates',
      title: 'The Center Grove Lakeside Modern Villa',
      price: '$1,295,000',
      city: 'Greenwood',
      county: 'Johnson County',
      beds: 5,
      baths: 5.5,
      sqft: 5600,
      lotSize: '0.88 Acre Waterfront Shoreline',
      style: 'Architectural Waterfront Glass & Cedar Residence',
      image: ASSET_IMAGES.greenwoodLakefront,
      status: 'Lakeside Exclusive',
      description:
        'Breathtaking floor-to-ceiling glass walls capturing panoramic sunrise water views, cantilevered cedar party deck with integrated gas fire pit, private boat dock with power lift, and direct proximity to Center Grove Four-Star schools.',
      videoDuration: '4:05 HD Walkthrough',
      videoHighlights: [
        '0:15 - Aerial Drone View of Private Shoreline',
        '1:00 - Double-Height Lakeview Living Room',
        '1:50 - Gourmet Island Kitchen & Wet Bar',
        '2:45 - Lakefront Master Deck & Soaking Tub',
        '3:30 - Sunset Fire Table & Private Boat Launch',
      ],
    },
    {
      id: 'zionsville-village-bungalow',
      category: 'small',
      categoryLabel: 'Charming Small Homes & Cottages',
      title: 'The Cedar Street Historic Village Cottage',
      price: '$345,000',
      city: 'Zionsville',
      county: 'Boone County',
      beds: 3,
      baths: 2,
      sqft: 1820,
      lotSize: '0.22 Acre Village Lot',
      style: 'Artisan Gabled Cottage with Stone Chimney',
      image: ASSET_IMAGES.zionsvilleCottage,
      status: 'Walk to Main Street',
      description:
        'Enchanting historic village aesthetic with cobblestone paver pathway, artisan sage green shutters, dry-stack stone perimeter wall, blooming perennial gardens, and an open sunlit floor plan with real white oak hardwood floors.',
      videoDuration: '2:35 HD Walkthrough',
      videoHighlights: [
        '0:08 - Cobblestone Walk & Lavender Garden Beds',
        '0:40 - Sunlit Cottage Living with Stone Hearth',
        '1:15 - Country Kitchen & Custom Breakfast Nook',
        '1:55 - Serene Primary Bedroom & Walk-in Shower',
        '2:20 - Front Porch Swing Under Shady Maples',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: t.properties.allStyles },
    { id: 'luxury', label: t.properties.luxuryBig },
    { id: 'small', label: t.properties.smallCozy },
    { id: 'new', label: t.properties.newBuilds },
    { id: 'family', label: t.properties.familyBrick },
  ];

  const filteredProperties = properties.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="properties" className="py-16 lg:py-24 bg-gradient-to-b from-[#0A0D15] via-[#0B0F18] to-[#080C14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-luxury-sans font-semibold text-amber-400 uppercase tracking-[0.2em] mb-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.properties.kicker}</span>
            </div>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
              {t.properties.title}
            </h2>
            <p className="font-body-read text-base sm:text-lg text-slate-300 mt-3 leading-relaxed font-light">
              {t.properties.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950 text-white font-luxury-sans uppercase tracking-wider text-xs font-semibold hover:bg-slate-900 border border-[#D4AF37] shadow-luxury-glow transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{t.properties.askOffMarket}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#131A29] rounded-xl border border-[#D4AF37]/35 shadow-2xs max-w-fit mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-luxury-sans uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gold-metallic text-slate-950 font-bold shadow-xs border border-[#D4AF37]'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-[#1A2338]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((home) => (
            <div
              key={home.id}
              className="bg-[#0E1422]/95 rounded-2xl border border-[#D4AF37]/25 shadow-luxury-glow hover:shadow-luxury-card hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 text-white"
            >
              <div>
                {/* Photo & Video Trigger Container */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={home.image}
                    alt={home.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Status & Location Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-[#0B0F17]/90 backdrop-blur-sm text-[#F6EBD7] font-luxury-sans uppercase tracking-wider font-semibold text-[10px] shadow-sm border border-[#D4AF37]/40">
                      {home.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1 font-body-read">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      {home.city}, IN
                    </span>
                  </div>

                  {/* Centered Play Video Button */}
                  <button
                    onClick={() => {
                      setActiveVideoProperty(home);
                      setIsPlaying(true);
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-slate-950/85 hover:bg-slate-950 text-amber-300 border border-[#D4AF37]/60 flex items-center justify-center shadow-luxury-glow transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                    title="Watch HD Virtual Walkthrough Video"
                    aria-label={`Watch video walkthrough for ${home.title}`}
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-amber-300 text-amber-300" />
                  </button>

                  {/* Bottom Video Badge Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-[10px] text-amber-300 border border-amber-400/20">
                      <Video className="w-3.5 h-3.5 text-amber-400" />
                      {home.videoDuration}
                    </span>
                    <span className="text-white/90 text-xs font-luxury-sans tracking-wide">{home.categoryLabel}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-luxury-serif text-2xl font-normal text-white tabular-nums">
                        {home.price}
                      </span>
                      <span className="text-xs text-slate-400 font-luxury-sans uppercase tracking-wider">
                        {home.county}
                      </span>
                    </div>

                    <h3 className="font-luxury-serif text-xl sm:text-2xl font-normal text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {home.title}
                    </h3>

                    <p className="text-[11px] font-luxury-sans uppercase tracking-wider text-amber-400 font-semibold">
                      {home.style}
                    </p>
                  </div>

                  {/* Spec Row (Tabular Figures) */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[#131B2A] border border-[#D4AF37]/20 text-xs text-slate-200 font-body-read font-medium tabular-nums">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-amber-400" />
                      <span>{home.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-amber-400" />
                      <span>{home.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-amber-400" />
                      <span>{home.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <p className="font-body-read text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                    {home.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions Strip */}
              <div className="p-4 bg-[#090D16] border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setActiveVideoProperty(home);
                    setIsPlaying(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-luxury-sans uppercase tracking-wider font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{t.properties.watchTour}</span>
                </button>

                <button
                  onClick={() => onScheduleTour(home.title)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-luxury-sans uppercase tracking-wider font-semibold hover:bg-slate-850 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all cursor-pointer shadow-sm hover:shadow-luxury-glow"
                >
                  <span>{t.properties.scheduleTour}</span>
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Virtual Video Walkthrough Modal */}
      {activeVideoProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-950 rounded-2xl max-w-4xl w-full border border-slate-800 shadow-2xl overflow-hidden relative text-white font-sans-clean flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white leading-tight">
                    {activeVideoProperty.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeVideoProperty.city}, IN · {activeVideoProperty.price} · {activeVideoProperty.videoDuration}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveVideoProperty(null)}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black overflow-hidden group">
              <img
                src={activeVideoProperty.image}
                alt={activeVideoProperty.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Watermark / Direct Agent Stamp */}
              <div className="absolute top-4 left-4 text-[10px] font-luxury-sans font-semibold tracking-[0.2em] uppercase text-white/95 bg-black/70 backdrop-blur-sm px-3 py-1 rounded border border-[#D4AF37]/40 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <span>Indy Home Collection · Verified Virtual Walkthrough</span>
              </div>

              {/* Center Play/Pause Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-slate-950" />
                ) : (
                  <Play className="w-7 h-7 ml-1 fill-slate-950" />
                )}
              </button>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
                
                {/* Scrubber Bar */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setVideoProgress(Math.round((clickX / rect.width) * 100));
                  }}
                  className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative overflow-hidden"
                >
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <Volume2 className="w-4 h-4" />
                    <span className="font-mono text-[11px]">01:14 / 03:45</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-amber-400 font-medium">1080p 60fps HD</span>
                    <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Chapters & Tour Navigation */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Video Chapters & Room Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {activeVideoProperty.videoHighlights.map((chap, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setVideoProgress((idx + 1) * 20);
                      setIsPlaying(true);
                    }}
                    className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 cursor-pointer transition-colors text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <span className="text-amber-400 font-mono text-[11px]">▶</span>
                    <span className="truncate">{chap}</span>
                  </div>
                ))}
              </div>

              {/* Action Strip inside Video Modal */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Want a live personal FaceTime walkthrough with us?
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setActiveVideoProperty(null);
                      onCallClick();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call (317) 408-9532</span>
                  </button>
                  <button
                    onClick={() => {
                      const propTitle = activeVideoProperty.title;
                      setActiveVideoProperty(null);
                      onScheduleTour(propTitle);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs cursor-pointer transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Private In-Person Showing</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
