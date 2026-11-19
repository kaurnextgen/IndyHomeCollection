import React, { useState, useId } from 'react';
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { adminStore } from '../data/adminStore';

interface ValuationCalculatorProps {
  onCallClick: () => void;
}

export const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ onCallClick }) => {
  const { t } = useLanguage();
  const addressId = useId();
  const cityId = useId();
  const typeId = useId();
  const sqftId = useId();
  const bedsId = useId();
  const bathsId = useId();
  const conditionId = useId();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Carmel');
  const [propertyType, setPropertyType] = useState('single-family');
  const [sqft, setSqft] = useState(2400);
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2.5);
  const [condition, setCondition] = useState('updated');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Indiana City Median Per-Sq-Ft Baselines
  const cityMultipliers: Record<string, number> = {
    Carmel: 220,
    Zionsville: 235,
    Fishers: 195,
    Westfield: 190,
    Brownsburg: 185,
    McCordsville: 185,
    Avon: 180,
    Plainfield: 175,
    Noblesville: 175,
    Greenwood: 170,
    Indianapolis: 165,
    Whiteland: 160,
    Southport: 160,
    Bloomington: 180,
    Other: 170,
  };

  const conditionFactors: Record<string, number> = {
    'needs-tlc': 0.88,
    standard: 1.0,
    updated: 1.12,
    luxury: 1.28,
  };

  const baseRate = cityMultipliers[city] || 180;
  const condFactor = conditionFactors[condition] || 1.0;
  const calculatedEstimate = Math.round((sqft * baseRate * condFactor) / 1000) * 1000;
  const lowRange = Math.round((calculatedEstimate * 0.95) / 1000) * 1000;
  const highRange = Math.round((calculatedEstimate * 1.06) / 1000) * 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    adminStore.addLead({
      name,
      phone,
      email,
      type: 'valuation',
      source: 'Instant Home Valuation Calculator',
      city,
      estimatedValue: calculatedEstimate,
      details: `${address ? address + ', ' : ''}${city}, IN · ${sqft} sqft, ${beds} beds, ${baths} baths. Condition: ${condition}. Calculated Range: $${lowRange.toLocaleString()} - $${highRange.toLocaleString()}`,
      priority: calculatedEstimate > 700000 ? 'urgent' : 'high',
    });

    setSubmitted(true);
  };

  return (
    <section id="valuation" className="py-16 lg:py-24 bg-gradient-to-b from-[#080B12] via-[#0B0F17] to-[#0A0D15] border-y border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span>{t.valuation.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.valuation.title}
          </h2>
          <p className="font-body-read text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-light">
            {t.valuation.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Parameters */}
          <div className="lg:col-span-7 bg-[#0E1422]/95 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow space-y-6 text-white">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={addressId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t.valuation.addressLabel}
                </label>
                <input
                  id={addressId}
                  type="text"
                  placeholder="e.g., 1428 Prairie View Dr"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor={cityId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t.valuation.cityLabel}
                </label>
                <select
                  id={cityId}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all cursor-pointer shadow-2xs"
                >
                  <optgroup label="Hamilton & Boone Counties" className="bg-slate-900 text-white">
                    <option value="Carmel">Carmel (Hamilton Co.)</option>
                    <option value="Fishers">Fishers (Hamilton Co.)</option>
                    <option value="Zionsville">Zionsville (Boone Co.)</option>
                    <option value="Westfield">Westfield (Hamilton Co.)</option>
                    <option value="Noblesville">Noblesville (Hamilton Co.)</option>
                  </optgroup>
                  <optgroup label="Hendricks County (Westside)" className="bg-slate-900 text-white">
                    <option value="Avon">Avon (Hendricks Co.)</option>
                    <option value="Plainfield">Plainfield (Hendricks Co.)</option>
                    <option value="Brownsburg">Brownsburg (Hendricks Co.)</option>
                  </optgroup>
                  <optgroup label="Johnson County (Southside)" className="bg-slate-900 text-white">
                    <option value="Greenwood">Greenwood (Johnson Co.)</option>
                    <option value="Whiteland">Whiteland (Johnson Co.)</option>
                  </optgroup>
                  <optgroup label="Marion & Hancock Counties" className="bg-slate-900 text-white">
                    <option value="Indianapolis">Indianapolis (Marion Co.)</option>
                    <option value="Southport">Southport (Marion Co.)</option>
                    <option value="McCordsville">McCordsville (Hancock Co.)</option>
                  </optgroup>
                  <optgroup label="Regional Indiana" className="bg-slate-900 text-white">
                    <option value="Bloomington">Bloomington (Monroe Co.)</option>
                    <option value="Other">Other Indiana Market</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Square Footage Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={sqftId} className="text-xs font-semibold text-slate-200">
                  {t.valuation.sqftLabel}
                </label>
                <span className="font-mono tabular-nums text-sm font-bold text-amber-300">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id={sqftId}
                type="range"
                min="1000"
                max="5500"
                step="50"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1,000 sq ft</span>
                <span>3,250 sq ft</span>
                <span>5,500+ sq ft</span>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={bedsId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t.valuation.bedsLabel}
                </label>
                <select
                  id={bedsId}
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm"
                >
                  <option value={2} className="bg-slate-900 text-white">2 Bedrooms</option>
                  <option value={3} className="bg-slate-900 text-white">3 Bedrooms</option>
                  <option value={4} className="bg-slate-900 text-white">4 Bedrooms</option>
                  <option value={5} className="bg-slate-900 text-white">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label htmlFor={bathsId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                  {t.valuation.bathsLabel}
                </label>
                <select
                  id={bathsId}
                  value={baths}
                  onChange={(e) => setBaths(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm"
                >
                  <option value={1.5} className="bg-slate-900 text-white">1.5 Baths</option>
                  <option value={2} className="bg-slate-900 text-white">2 Full Baths</option>
                  <option value={2.5} className="bg-slate-900 text-white">2.5 Baths</option>
                  <option value={3} className="bg-slate-900 text-white">3 Full Baths</option>
                  <option value={4} className="bg-slate-900 text-white">4+ Baths</option>
                </select>
              </div>
            </div>

            {/* Condition Selector */}
            <div>
              <label htmlFor={conditionId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                {t.valuation.conditionLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'needs-tlc', label: 'Needs TLC' },
                  { id: 'standard', label: 'Move-in Ready' },
                  { id: 'updated', label: 'Modern Updates' },
                  { id: 'luxury', label: 'Custom Luxury' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      condition === item.id
                        ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-bold shadow-xs'
                        : 'border-[#D4AF37]/30 bg-[#131B2A] text-slate-300 hover:bg-[#1A2438]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Card & Lead Conversion */}
          <div className="lg:col-span-5 bg-[#0E1422]/95 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow space-y-6 text-white">
            
            {/* Live Calculation Output */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B0F17] via-[#121926] to-[#0B0F17] border border-[#D4AF37]/50 shadow-luxury-glow text-center space-y-2 text-white">
              <span className="text-[11px] font-luxury-sans uppercase tracking-widest text-amber-300/90 block">
                {t.valuation.estimatedRange} ({city})
              </span>
              <div className="font-luxury-serif text-3xl sm:text-4xl font-normal text-amber-300 tabular-nums">
                ${lowRange.toLocaleString()} – ${highRange.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300 font-body-read font-light">
                Based on active & recent comps for {sqft.toLocaleString()} sq ft in {city}, IN
              </p>
            </div>

            {/* Free Official Report Request Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-clean">
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-lg font-bold text-white">
                    {t.valuation.cmaTitle}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Receive a full neighborhood breakdown including off-market comparables, buyer pool analysis, and home prep tips.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-semibold text-slate-200 mb-1">{t.valuation.nameLabel}</label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={phoneId} className="block text-xs font-semibold text-slate-200 mb-1">{t.valuation.phoneLabel}</label>
                      <input
                        id={phoneId}
                        type="tel"
                        required
                        placeholder="317-408-9532"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label htmlFor={emailId} className="block text-xs font-semibold text-slate-200 mb-1">{t.valuation.emailLabel}</label>
                      <input
                        id={emailId}
                        type="email"
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-slate-950 via-[#18212D] to-slate-950 text-white font-luxury-sans uppercase tracking-[0.16em] font-semibold text-xs border border-[#D4AF37] shadow-luxury-glow hover:border-[#F3E8CE] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>{t.valuation.sendReport}</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Zero sales pressure · Your data is strictly private · No automated spam
                </p>
              </form>
            ) : (
              <div className="p-6 rounded-xl bg-[#0B1A14] border border-emerald-500/40 text-center space-y-3 font-sans-clean text-white">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  Valuation Request Received!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, {name}. We are pulling the latest comparative sales for your {city} property and will send your detailed report shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onCallClick}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Have immediate questions? Call (317) 408-9532</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
