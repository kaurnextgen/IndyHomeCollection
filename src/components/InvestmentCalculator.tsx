import React, { useState, useId } from 'react';
import { DollarSign, TrendingUp, Building, ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InvestmentCalculatorProps {
  onCallClick: () => void;
  onConsultClick: (topic: string) => void;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  onCallClick,
  onConsultClick,
}) => {
  const { t } = useLanguage();
  const priceId = useId();
  const rentId = useId();

  const [price, setPrice] = useState<number>(340000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [monthlyRent, setMonthlyRent] = useState<number>(2350);

  // Financial calculations
  const downPayment = (price * downPercent) / 100;
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = 30 * 12;

  // Monthly mortgage (P&I)
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  // Indiana property tax (~1% capped for homestead, ~2% for non-homestead/investment) & insurance
  const monthlyTaxes = (price * 0.018) / 12;
  const monthlyInsurance = 95;
  const maintenanceBuffer = monthlyRent * 0.08; // 8% maintenance & vacancy reserve
  const totalMonthlyExpenses =
    monthlyMortgage + monthlyTaxes + monthlyInsurance + maintenanceBuffer;
  const netMonthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualNetIncome = (monthlyRent - (monthlyTaxes + monthlyInsurance + maintenanceBuffer)) * 12;
  const capRate = ((annualNetIncome / price) * 100).toFixed(2);
  const cashOnCash = (((netMonthlyCashFlow * 12) / downPayment) * 100).toFixed(2);

  return (
    <section id="investment" className="py-16 lg:py-24 bg-gradient-to-b from-[#0A0D15] via-[#0B0F18] to-[#080B13] border-y border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span>{t.investment.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.investment.title}
          </h2>
          <p className="font-body-read text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-light">
            {t.investment.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#0E1422]/95 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow space-y-6 font-sans-clean text-white">

            {/* Purchase Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={priceId} className="text-xs font-semibold text-slate-200">
                  {t.investment.purchasePrice}
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-amber-300">
                  ${price.toLocaleString()}
                </span>
              </div>
              <input
                id={priceId}
                type="range"
                min="150000"
                max="850000"
                step="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>$150,000</span>
                <span>$500,000</span>
                <span>$850,000</span>
              </div>
            </div>

            {/* Down Payment % Selector */}
            <div>
              <span className="block text-xs font-semibold text-slate-200 mb-2">
                {t.investment.downPayment} ({downPercent}%) · <span className="font-mono text-amber-300">${Math.round(downPayment).toLocaleString()}</span>
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 25, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPercent(pct)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${downPercent === pct
                      ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-bold shadow-xs'
                      : 'border-[#D4AF37]/30 bg-[#131B2A] text-slate-300 hover:bg-[#1A2438]'
                      }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Monthly Rent */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={rentId} className="text-xs font-semibold text-slate-200">
                  {t.investment.monthlyRent}
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-emerald-400">
                  ${monthlyRent.toLocaleString()} / mo
                </span>
              </div>
              <input
                id={rentId}
                type="range"
                min="1200"
                max="5000"
                step="50"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>$1,200/mo</span>
                <span>$3,100/mo</span>
                <span>$5,000/mo</span>
              </div>
            </div>

            {/* Interest Rate Selector */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">Financing Interest Rate:</span>
              <div className="flex items-center gap-1.5">
                {[6.0, 6.5, 7.0, 7.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setInterestRate(rate)}
                    className={`px-3 py-1 text-xs rounded-lg border cursor-pointer font-medium transition-all ${interestRate === rate
                      ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-bold shadow-xs'
                      : 'border-[#D4AF37]/30 bg-[#131B2A] text-slate-300 hover:bg-[#1A2438]'
                      }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-[#0E1422]/95 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow space-y-6 text-white">

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#131B2A] border border-[#D4AF37]/30 text-center">
                <span className="text-[11px] font-luxury-sans font-semibold uppercase tracking-wider text-slate-400 block">
                  {t.investment.monthlyCashFlow}
                </span>
                <span
                  className={`font-serif-luxury text-2xl sm:text-3xl font-bold font-mono tabular-nums block mt-1 ${netMonthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                >
                  {netMonthlyCashFlow >= 0 ? `+$${Math.round(netMonthlyCashFlow)}` : `-$${Math.abs(Math.round(netMonthlyCashFlow))}`}
                  <span className="text-xs font-normal text-slate-400"> /mo</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#131B2A] border border-[#D4AF37]/30 text-center">
                <span className="text-[11px] font-luxury-sans font-semibold uppercase tracking-wider text-slate-400 block">
                  {t.investment.capRate}
                </span>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-300 font-mono tabular-nums block mt-1">
                  {capRate}%
                </span>
              </div>
            </div>

            {/* Detailed Monthly Breakdown */}
            <div className="space-y-2.5 text-xs font-sans-clean border-t border-b border-slate-800 py-4">
              <div className="flex justify-between text-slate-300">
                <span>Principal & Interest (30-Yr Fixed @ {interestRate}%):</span>
                <span className="font-mono tabular-nums font-semibold text-white">
                  ${Math.round(monthlyMortgage).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Property Tax (IN Investment 1.8%):</span>
                <span className="font-mono tabular-nums text-white">
                  ${Math.round(monthlyTaxes).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hazard & Landlord Insurance:</span>
                <span className="font-mono tabular-nums text-white">
                  ${monthlyInsurance}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Vacancy & Maintenance Reserve (8%):</span>
                <span className="font-mono tabular-nums text-white">
                  ${Math.round(maintenanceBuffer).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-white font-semibold">
                <span>Total Monthly Outlay:</span>
                <span className="font-mono tabular-nums text-amber-300">
                  ${Math.round(totalMonthlyExpenses).toLocaleString()} /mo
                </span>
              </div>
            </div>

            {/* Investor CTA */}
            <div className="space-y-3 pt-1">
              <button
                onClick={() => onConsultClick('Investment Property Consultation')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-slate-950 via-[#18212D] to-slate-950 text-white font-luxury-sans uppercase tracking-[0.16em] font-semibold text-xs border border-[#D4AF37] shadow-luxury-glow hover:border-[#F3E8CE] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>{t.investment.requestDeals}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onCallClick}
                className="w-full py-3 px-4 rounded-xl bg-[#131B2A] border border-[#D4AF37]/45 text-amber-300 font-luxury-sans uppercase tracking-wider font-semibold text-xs hover:bg-[#1B2538] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Us Directly for Indiana Investment Guidance: (317) 408-9532</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
