import React, { useState, useEffect, useId } from 'react';
import { Phone, Mail, MapPin, Calendar, CheckCircle2, MessageSquare, ArrowRight, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { adminStore } from '../data/adminStore';
import { checkSubmissionEligibility, recordFormSubmission, MAX_DAILY_SUBMISSIONS } from '../utils/rateLimiter';

interface ContactSectionProps {
  onCallClick: () => void;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCallClick,
  preselectedService = '',
}) => {
  const { t } = useLanguage();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceId = useId();
  const areaId = useId();
  const timelineId = useId();
  const methodId = useId();
  const notesId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(preselectedService || 'Buying a Home');
  const [area, setArea] = useState('Carmel / Hamilton County');
  const [timeline, setTimeline] = useState('1-3 months');
  const [preferredMethod, setPreferredMethod] = useState<'phone' | 'text' | 'email'>('phone');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(MAX_DAILY_SUBMISSIONS);
  const [isBanned, setIsBanned] = useState(false);
  const [banHours, setBanHours] = useState(24);
  const [banErrorMessage, setBanErrorMessage] = useState('');

  // Check IP rate limit on mount
  useEffect(() => {
    checkSubmissionEligibility('contact').then((res) => {
      setIsBanned(res.isBanned);
      setRemainingQuota(res.remaining);
      if (res.hoursRemaining) setBanHours(res.hoursRemaining);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Check & record submission with 2-per-24h IP rate limiter
    const rateCheck = await recordFormSubmission('contact');
    if (!rateCheck.success) {
      setIsBanned(true);
      setBanHours(rateCheck.hoursRemaining || 24);
      setBanErrorMessage(rateCheck.errorMessage || 'Submission limit exceeded. This IP has been restricted for 24 hours.');
      return;
    }

    setRemainingQuota(rateCheck.remaining);

    adminStore.addLead({
      name,
      phone,
      email,
      type: 'contact',
      source: 'Direct Contact Inbound Form',
      city: area.split('/')[0].trim(),
      details: `Service: ${service}. Area: ${area}. Timeline: ${timeline}. Contact via: ${preferredMethod}. Notes: ${notes || 'None'}`,
      priority: timeline.includes('Immediate') || timeline.includes('1-3') ? 'urgent' : 'high',
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-[#0A0D15] via-[#0B0F17] to-[#070A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-luxury-sans font-semibold tracking-[0.2em] uppercase text-amber-400 mb-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span>{t.contact.kicker}</span>
          </div>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight text-balance">
            {t.contact.title}
          </h2>
          <p className="font-body-read text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-light">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info Card */}
          <div className="lg:col-span-5 bg-[#0E1422]/95 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow space-y-8 text-white">
            
            <div className="space-y-3">
              <span className="text-[11px] font-luxury-sans uppercase tracking-widest text-slate-400">
                {t.contact.directLine}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-luxury-display text-2xl font-normal tracking-[0.2em] uppercase text-white">
                  INDY
                </span>
                <span className="font-luxury-serif italic font-light lowercase text-amber-300 text-xl">
                  Home
                </span>
                <span className="font-luxury-display text-2xl font-normal tracking-[0.2em] uppercase text-white">
                  COLLECTION
                </span>
              </div>
              <p className="text-xs text-slate-300 font-body-read leading-relaxed font-light">
                Dedicated residential, luxury, and investment real estate across Central and Statewide Indiana.
              </p>
            </div>

            {/* Direct Phone Block */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B0F17] via-[#121926] to-[#0B0F17] border border-[#D4AF37]/50 shadow-luxury-glow text-white space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gold-metallic text-slate-950 border border-[#D4AF37]">
                  <Phone className="w-5 h-5 fill-slate-950 text-slate-950" />
                </div>
                <div>
                  <span className="text-[10px] font-luxury-sans uppercase tracking-wider text-amber-300/80 block">Call or Text Anytime</span>
                  <a
                    href="tel:3174089532"
                    className="font-luxury-serif text-2xl font-normal text-white hover:text-amber-200 transition-colors"
                  >
                    (317) 408-9532
                  </a>
                </div>
              </div>
              <button
                onClick={onCallClick}
                className="w-full py-3 rounded-xl bg-gold-metallic text-slate-950 font-luxury-sans uppercase tracking-wider font-semibold text-xs hover:opacity-95 border border-[#D4AF37] transition-all cursor-pointer shadow-md"
              >
                Click to Call Directly
              </button>
            </div>

            {/* Service & Location Markers */}
            <div className="space-y-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Primary Focus Areas</span>
                  <span className="leading-relaxed text-slate-300">Carmel, Fishers, Zionsville, Avon, Plainfield, Brownsburg, Greenwood, Whiteland, Southport, McCordsville, Westfield, Noblesville, Indianapolis, Bloomington & statewide Indiana.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Flexible Private Showings</span>
                  <span className="leading-relaxed text-slate-300">7 days a week by appointment · Accommodating out-of-state flight arrivals and evening schedules.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7 bg-[#0E1422]/95 p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-luxury-glow text-white">
            
            {isBanned ? (
              <div className="py-8 px-6 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-5 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40 shadow-inner">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    24-Hour Security Restriction Active
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                    ਇਹ IP ਐਡਰੈੱਸ 24 ਘੰਟਿਆਂ ਲਈ ਬੈਨ ਹੈ
                  </h3>
                  <p className="text-sm font-medium text-amber-300">
                    ਇੱਕ ਦਿਨ (24 ਘੰਟੇ) ਵਿੱਚ ਸਿਰਫ਼ 2 ਵਾਰ ਫਾਰਮ ਭਰਿਆ ਜਾ ਸਕਦਾ ਹੈ।
                  </p>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-1">
                    Your IP address has reached the maximum threshold of 2 submissions per 24 hours. To safeguard our client network, access is paused for approximately <strong className="text-white font-bold">{banHours} more hours</strong>.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onCallClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-sm font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-slate-950" />
                    <span>Call Directly: (317) 408-9532</span>
                  </button>
                </div>
              </div>
            ) : !submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans-clean">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                      {t.contact.formTitle}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 font-light">
                      {t.contact.formSubtitle}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Quota: {remainingQuota}/2 today
                    </span>
                  </div>
                </div>

                {banErrorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{banErrorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.nameLabel}
                    </label>
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

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      placeholder="(317) 408-9532"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor={serviceId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      id={serviceId}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm cursor-pointer shadow-2xs focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    >
                      <option value="Buying a Home" className="bg-slate-900 text-white">Buying a Home in Indiana</option>
                      <option value="Selling Your Home" className="bg-slate-900 text-white">Selling My Indiana Property</option>
                      <option value="Investment Properties" className="bg-slate-900 text-white">Investment / Multi-Family Property</option>
                      <option value="Relocating to Indiana" className="bg-slate-900 text-white">Relocating from Out of State</option>
                      <option value="General Question" className="bg-slate-900 text-white">General Real Estate Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={areaId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.communityLabel}
                    </label>
                    <select
                      id={areaId}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm cursor-pointer shadow-2xs focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    >
                      <optgroup label="Hamilton & Boone Counties" className="bg-slate-900 text-white">
                        <option value="Carmel / Hamilton County">Carmel (Hamilton Co.)</option>
                        <option value="Fishers / Geist">Fishers / Geist</option>
                        <option value="Zionsville">Zionsville (Boone Co.)</option>
                        <option value="Westfield / Grand Park">Westfield / Grand Park</option>
                        <option value="Noblesville">Noblesville</option>
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
                        <option value="Indianapolis Downtown/Meridian">Indianapolis (Marion Co.)</option>
                        <option value="Southport">Southport (Marion Co.)</option>
                        <option value="McCordsville / Geist">McCordsville (Hancock Co.)</option>
                      </optgroup>
                      <optgroup label="Regional & Exploring" className="bg-slate-900 text-white">
                        <option value="Bloomington / Regional">Bloomington / Regional Indiana</option>
                        <option value="Not Sure / Exploring">Not Sure / Open to Recommendation</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={timelineId} className="block text-xs font-semibold text-slate-200 mb-1">
                      {t.contact.timelineLabel}
                    </label>
                    <select
                      id={timelineId}
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white text-sm cursor-pointer shadow-2xs focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    >
                      <option value="Immediate (0-30 days)" className="bg-slate-900 text-white">Immediate (0–30 days)</option>
                      <option value="1-3 months" className="bg-slate-900 text-white">1–3 months</option>
                      <option value="3-6 months" className="bg-slate-900 text-white">3–6 months</option>
                      <option value="Just Researching" className="bg-slate-900 text-white">Just Researching / Future</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label htmlFor={methodId} className="block text-xs font-semibold text-slate-200 mb-1.5">
                    How do you prefer us to reach you?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'text', label: 'Text Message' },
                      { id: 'email', label: 'Email' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPreferredMethod(m.id as 'phone' | 'text' | 'email')}
                        className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          preferredMethod === m.id
                            ? 'border-[#D4AF37] bg-gold-metallic text-slate-950 font-bold shadow-xs'
                            : 'border-[#D4AF37]/30 bg-[#131B2A] text-slate-300 hover:bg-[#1A2438]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label htmlFor={notesId} className="block text-xs font-semibold text-slate-200 mb-1">
                    Any Specific Requests or Questions? (Optional)
                  </label>
                  <textarea
                    id={notesId}
                    rows={3}
                    placeholder="e.g., We are looking for a 4-bed home near Carmel Clay schools with a fenced yard..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/35 bg-[#131A29] text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] resize-none shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-slate-950 via-[#18212D] to-slate-950 text-white font-luxury-sans uppercase tracking-[0.18em] font-semibold text-xs hover:border-[#F3E8CE] border border-[#D4AF37] shadow-luxury-glow transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.contact.submitButton}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <p className="text-[11px] text-slate-400 text-center font-body-read">
                  Direct connection with us · Respectful communication · Zero aggressive sales pressure
                </p>
              </form>
            ) : (
              <div className="py-12 px-6 text-center space-y-4 font-sans-clean text-white">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Consultation Request Confirmed!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. We have received your request regarding <strong>{service}</strong> in <strong>{area}</strong> and will connect via <strong>{preferredMethod}</strong> shortly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onCallClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 border border-[#D4AF37]/50 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Need immediate answers? Call (317) 408-9532</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    Submit Another Inquiry
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
