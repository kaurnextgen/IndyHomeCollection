import React, { useState } from 'react';
import { MapPin, Clock, School, ArrowUpRight } from 'lucide-react';
import { INDIANA_COMMUNITIES } from '../data/realEstateData';
import { IndianaMarket } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ASSET_IMAGES } from '../assets/imagesMap';

interface IndianaCommunitiesProps {
  onCommunityInquire: (community: IndianaMarket) => void;
}

export const IndianaCommunities: React.FC<IndianaCommunitiesProps> = ({
  onCommunityInquire,
}) => {
  const { t } = useLanguage();
  const [filterCounty, setFilterCounty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const communityImages: Record<string, string> = {
    carmel: ASSET_IMAGES.suburbanCarmel,
    fishers: ASSET_IMAGES.largeFamilyBrick,
    zionsville: ASSET_IMAGES.zionsvilleCottage,
    westfield: ASSET_IMAGES.modernNewConstruction,
    brownsburg: ASSET_IMAGES.brownsburgHome,
    greenwood: ASSET_IMAGES.greenwoodLakefront,
    avon: ASSET_IMAGES.cozySmallHome,
    plainfield: ASSET_IMAGES.largeFamilyBrick,
    noblesville: ASSET_IMAGES.noblesvilleCustom,
    southport: ASSET_IMAGES.brownsburgHome,
    whiteland: ASSET_IMAGES.greenwoodLakefront,
    mccordsville: ASSET_IMAGES.modernNewConstruction,
    indianapolis: ASSET_IMAGES.investmentProperty,
    bloomington: ASSET_IMAGES.luxuryEstateLarge,
  };

  const counties = [
    { id: 'all', label: t.communities.allCommunities },
    { id: 'Hamilton', label: 'Hamilton & Boone (Carmel, Fishers, Zionsville)' },
    { id: 'Hendricks', label: 'Hendricks West (Avon, Plainfield, Brownsburg)' },
    { id: 'Johnson', label: 'Johnson South (Greenwood, Whiteland)' },
    { id: 'Marion', label: 'Marion County (Indy, Southport)' },
    { id: 'Regional', label: 'Hancock & Regional (McCordsville, Bloomington)' },
  ];

  const filteredCommunities = INDIANA_COMMUNITIES.filter((c) => {
    const matchesFilter =
      filterCounty === 'all' ||
      (filterCounty === 'Hamilton' && (c.county.includes('Hamilton') || c.county.includes('Boone'))) ||
      (filterCounty === 'Hendricks' && c.county.includes('Hendricks')) ||
      (filterCounty === 'Johnson' && c.county.includes('Johnson')) ||
      (filterCounty === 'Marion' && c.county.includes('Marion')) ||
      (filterCounty === 'Regional' && (c.county.includes('Hancock') || c.county.includes('Monroe')));

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.county.toLowerCase().includes(query) ||
      c.vibe.toLowerCase().includes(query) ||
      c.bestFor.toLowerCase().includes(query) ||
      c.highlights.some((h) => h.toLowerCase().includes(query));

    return matchesFilter && matchesQuery;
  });

  return (
    <section id="communities" className="py-16 lg:py-24 bg-gradient-to-b from-[#090D16] via-[#0B0F18] to-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <span>{t.communities.kicker}</span>
            </div>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
              {t.communities.title}
            </h2>
            <p className="font-body-read text-base text-slate-300 mt-3 font-light">
              {t.communities.subtitle}
            </p>
          </div>

          {/* Unboxed Summary Metric */}
          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] font-luxury-sans uppercase tracking-widest text-slate-400 block">Active Service Coverage</span>
            <span className="font-luxury-serif text-2xl font-normal text-white">
              14+ Indiana Communities
            </span>
          </div>
        </div>

        {/* Filter Bar & Quick Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#131A29] rounded-xl border border-[#D4AF37]/35 shadow-2xs">
            {counties.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCounty(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-luxury-sans uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  filterCounty === cat.id
                    ? 'bg-gold-metallic text-slate-950 font-bold shadow-xs border border-[#D4AF37]'
                    : 'text-slate-400 hover:text-amber-300 hover:bg-[#1A2338]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Filter by town, county, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 font-sans-clean focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((market) => (
            <div
              key={market.id}
              tabIndex={0}
              role="button"
              onClick={() => onCommunityInquire(market)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCommunityInquire(market);
                }
              }}
              className="relative bg-[#0E1422]/95 rounded-2xl border border-[#D4AF37]/25 hover:border-[#D4AF37] hover-card-float transition-all duration-500 flex flex-col justify-between overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white"
            >
              {/* Home Picture Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={communityImages[market.id] || ASSET_IMAGES.suburbanCarmel}
                  alt={`Homes and neighborhoods in ${market.name}, Indiana`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out hover-image-zoom"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-luxury-sans uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#0B0F17]/90 backdrop-blur-sm text-[10px] border border-[#D4AF37]/40 text-[#F6EBD7]">
                    {market.county}
                  </span>
                  <span className="font-luxury-serif tabular-nums px-2.5 py-1 rounded bg-slate-950 text-amber-300 border border-[#D4AF37]/60 text-xs shadow-sm animate-pulse-subtle">
                    Med. {market.medianPrice}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                
                {/* Header: Title */}
                <div>
                  <h3 className="font-luxury-serif text-2xl font-normal text-white group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300">
                    {market.name}
                  </h3>
                  <p className="text-[11px] font-luxury-sans uppercase tracking-wider font-semibold text-amber-400 mt-0.5">
                    {market.vibe}
                  </p>
                </div>

                {/* Best For */}
                <div className="text-xs text-slate-300 bg-[#131B2A] p-3 rounded-xl border border-[#D4AF37]/20 font-sans-clean leading-relaxed transition-colors duration-200">
                  <span className="font-semibold text-white">{t.communities.idealFor} </span>
                  {market.bestFor}
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 font-sans-clean block">
                    {t.communities.highlights}
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 font-sans-clean">
                    {market.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#D4AF37] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commute Marker */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans-clean pt-1 border-t border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{market.commuteToIndy}</span>
                </div>

              </div>

              {/* Bottom Action Strip */}
              <div className="p-4 bg-[#090D16] group-hover:bg-[#111726] border-t border-slate-800 transition-colors duration-300 flex items-center justify-between">
                <span className="text-xs font-sans-clean text-slate-400 group-hover:text-slate-200 transition-colors">
                  Ask about active listings
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:text-amber-200 transition-colors font-sans-clean">
                  <span>{t.communities.explore} {market.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#D4AF37]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
