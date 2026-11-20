import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign, Percent, BarChart3, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MarketStatsProps {
  onValuationClick: () => void;
  onConsultClick: (topic: string) => void;
}

type MarketRegion = 'central' | 'hamilton' | 'hendricks' | 'johnson';

interface StatItem {
  id: string;
  labelKey: 'medianPrice' | 'daysOnMarket' | 'saleToList' | 'inventory';
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  trendContext: string;
  subtitle: string;
}

export const MarketStats: React.FC<MarketStatsProps> = ({
  onValuationClick,
  onConsultClick,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('central');
  const { t } = useLanguage();

  const regionData: Record<
    MarketRegion,
    {
      name: string;
      focus: string;
      stats: StatItem[];
    }
  > = {
    central: {
      name: 'Greater Indianapolis (Overall)',
      focus: 'Marion, Hamilton, Hendricks & Johnson Counties',
      stats: [
        {
          id: 'price',
          labelKey: 'medianPrice',
          value: '$382,500',
          trend: '+4.8%',
          trendDirection: 'up',
          trendContext: 'vs. last year',
          subtitle: 'Steady Midwestern equity growth',
        },
        {
          id: 'dom',
          labelKey: 'daysOnMarket',
          value: '22 Days',
          trend: '-3 days',
          trendDirection: 'down',
          trendContext: 'from last quarter',
          subtitle: 'Move-in ready homes sell rapidly',
        },
        {
          id: 'ratio',
          labelKey: 'saleToList',
          value: '98.6%',
          trend: '+0.4%',
          trendDirection: 'up',
          trendContext: 'strong pricing discipline',
          subtitle: 'Sellers capture close to full ask',
        },
        {
          id: 'inventory',
          labelKey: 'inventory',
          value: '2.1 Mo',
          trend: 'Balanced',
          trendDirection: 'neutral',
          trendContext: 'healthy absorption',
          subtitle: 'Favorable window for both buyers & sellers',
        },
      ],
    },
    hamilton: {
      name: 'Hamilton & Boone County',
      focus: 'Carmel, Fishers, Zionsville, Westfield & Noblesville',
      stats: [
        {
          id: 'price',
          labelKey: 'medianPrice',
          value: '$498,000',
          trend: '+5.6%',
          trendDirection: 'up',
          trendContext: 'vs. last year',
          subtitle: 'High demand for top-rated school districts',
        },
        {
          id: 'dom',
          labelKey: 'daysOnMarket',
          value: '16 Days',
          trend: '-5 days',
          trendDirection: 'down',
          trendContext: 'brisk luxury pace',
          subtitle: 'Turnkey homes frequently receive multiple offers',
        },
        {
          id: 'ratio',
          labelKey: 'saleToList',
          value: '99.4%',
          trend: '+0.7%',
          trendDirection: 'up',
          trendContext: 'firm seller negotiations',
          subtitle: 'Premium finishes command top dollar',
        },
        {
          id: 'inventory',
          labelKey: 'inventory',
          value: '1.7 Mo',
          trend: 'Seller Advantage',
          trendDirection: 'up',
          trendContext: 'tight active listings',
          subtitle: 'Strong appreciation in custom neighborhoods',
        },
      ],
    },
    hendricks: {
      name: 'Hendricks County Westside',
      focus: 'Avon, Plainfield & Brownsburg',
      stats: [
        {
          id: 'price',
          labelKey: 'medianPrice',
          value: '$358,000',
          trend: '+5.2%',
          trendDirection: 'up',
          trendContext: 'vs. last year',
          subtitle: 'Rapid suburban expansion & park access',
        },
        {
          id: 'dom',
          labelKey: 'daysOnMarket',
          value: '19 Days',
          trend: '-2 days',
          trendDirection: 'down',
          trendContext: 'high family demand',
          subtitle: 'Safe neighborhoods & Four-Star schools',
        },
        {
          id: 'ratio',
          labelKey: 'saleToList',
          value: '98.8%',
          trend: '+0.3%',
          trendDirection: 'up',
          trendContext: 'stable valuations',
          subtitle: 'Competitive entry & move-up pricing',
        },
        {
          id: 'inventory',
          labelKey: 'inventory',
          value: '2.0 Mo',
          trend: 'Balanced',
          trendDirection: 'neutral',
          trendContext: 'steady construction pipeline',
          subtitle: 'Healthy selection across sub-divisions',
        },
      ],
    },
    johnson: {
      name: 'Johnson County Southside',
      focus: 'Greenwood, Whiteland & Center Grove',
      stats: [
        {
          id: 'price',
          labelKey: 'medianPrice',
          value: '$335,000',
          trend: '+4.5%',
          trendDirection: 'up',
          trendContext: 'vs. last year',
          subtitle: 'High value with easy I-65 commutes',
        },
        {
          id: 'dom',
          labelKey: 'daysOnMarket',
          value: '23 Days',
          trend: '-1 day',
          trendDirection: 'down',
          trendContext: 'consistent buyer traffic',
          subtitle: 'Popular for first-time & move-up buyers',
        },
        {
          id: 'ratio',
          labelKey: 'saleToList',
          value: '98.2%',
          trend: '+0.2%',
          trendDirection: 'up',
          trendContext: 'fair market alignment',
          subtitle: 'Realistic pricing yields quick closes',
        },
        {
          id: 'inventory',
          labelKey: 'inventory',
          value: '2.3 Mo',
          trend: 'Balanced Market',
          trendDirection: 'neutral',
          trendContext: 'favorable choice pool',
          subtitle: 'Excellent affordability and lot sizes',
        },
      ],
    },
  };

  const currentData = regionData[selectedRegion];

  return (
    <section id="market-stats" className="relative z-10 py-12 lg:py-16 border-y border-[#D4AF37]/25 bg-gradient-to-b from-[#0D121F] via-[#0B0F18] to-[#0A0D15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Sub-region Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold text-amber-400 uppercase tracking-[0.2em] mb-1.5">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.marketStats.kicker}</span>
            </div>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
              <span className="animated-shining-word">{t.marketStats.title}</span>
            </h2>
            <p className="text-xs text-slate-300 font-body-read mt-1">
              {t.marketStats.subtitle} · <strong className="text-amber-300 font-semibold">{currentData.focus}</strong>
            </p>
          </div>

          {/* Interactive Region Selector */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#131A29] rounded-xl border border-[#D4AF37]/35 shrink-0 shadow-2xs">
            {[
              { id: 'central', label: 'All Central IN' },
              { id: 'hamilton', label: 'Hamilton & Boone' },
              { id: 'hendricks', label: 'Hendricks West' },
              { id: 'johnson', label: 'Johnson South' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as MarketRegion)}
                className={`px-3.5 py-1.5 text-xs font-luxury-sans uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedRegion === tab.id
                    ? 'bg-gold-metallic text-slate-950 shadow-xs border border-[#D4AF37] font-bold'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Statistics Cards Strip with Luxury Polish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentData.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#0E1422]/90 p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/25 shadow-luxury-glow hover:border-[#D4AF37] hover-card-float transition-all duration-300 flex flex-col justify-between space-y-3 group text-white"
            >
              <div>
                <span className="text-[11px] font-luxury-sans uppercase tracking-wider font-semibold text-slate-400 block group-hover:text-amber-300 transition-colors">
                  {t.marketStats[stat.labelKey]}
                </span>

                {/* Big Luxury Serif Number */}
                <div className="font-luxury-serif text-3xl sm:text-4xl font-normal text-white tabular-nums tracking-tight mt-1.5 animated-gold-glow-word">
                  {stat.value}
                </div>

                {/* Subtle Trend Indicator */}
                <div className="flex items-center gap-1.5 text-xs font-sans-clean mt-2">
                  {stat.trendDirection === 'up' && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-400 font-semibold font-luxury-sans">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {stat.trend}
                    </span>
                  )}
                  {stat.trendDirection === 'down' && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-400 font-semibold font-luxury-sans">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {stat.trend}
                    </span>
                  )}
                  {stat.trendDirection === 'neutral' && (
                    <span className="inline-flex items-center gap-0.5 text-slate-400 font-semibold font-luxury-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      {stat.trend}
                    </span>
                  )}
                  <span className="text-[#D4AF37]/50 font-normal">·</span>
                  <span className="text-slate-400 text-[11px] font-body-read truncate">
                    {stat.trendContext}
                  </span>
                </div>
              </div>

              {/* Subtitle / Context Footnote */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-body-read leading-snug">
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive CTA Footnote Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>
              Updated bi-weekly with localized MIBOR MLS data across Indianapolis & surrounding counties.
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-medium">
            <button
              onClick={onValuationClick}
              className="text-amber-300 hover:text-amber-200 underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{t.marketStats.seeComps}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => onConsultClick(`In-Depth Market Comps for ${currentData.name}`)}
              className="text-slate-300 hover:text-white underline cursor-pointer"
            >
              {t.marketStats.requestReport}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
