import React, { useState, useId } from 'react';
import { Calendar, CheckCircle2, X, Clock, ArrowRight, Phone } from 'lucide-react';
import { LuxuryLogo } from './LuxuryLogo';
import { adminStore } from '../data/adminStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  onCallClick: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceTitle = 'Discovery Consultation',
  onCallClick,
}) => {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const dateId = useId();
  const timeId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    adminStore.addLead({
      name,
      phone,
      email,
      type: 'consultation',
      source: 'Private Consultation Booking',
      details: `Topic: ${serviceTitle}. Preferred Date: ${preferredDate || 'Flexible'}, Time: ${preferredTime}`,
      preferredDate,
      preferredTime,
      priority: 'high',
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E1422] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 text-white relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center pb-2 border-b border-slate-800 flex flex-col items-center">
              <LuxuryLogo variant="markOnly" size={44} />
              <div className="mt-3 flex items-center gap-1.5 text-xs font-luxury-sans font-semibold uppercase tracking-[0.2em] text-amber-400">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <span>Private Consultation</span>
              </div>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                Book a One-on-One Session
              </h3>
              <p className="text-xs text-slate-300 font-body-read mt-0.5">
                Topic: <strong className="text-amber-300 font-semibold">{serviceTitle}</strong>
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label htmlFor={nameId} className="block text-xs font-semibold text-slate-200 mb-1">
                  Full Name *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={phoneId} className="block text-xs font-semibold text-slate-200 mb-1">
                    Phone Number *
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

                <div>
                  <label htmlFor={emailId} className="block text-xs font-semibold text-slate-200 mb-1">
                    Email Address
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={dateId} className="block text-xs font-semibold text-slate-200 mb-1">
                    Preferred Date
                  </label>
                  <input
                    id={dateId}
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#D4AF37]/35 text-sm bg-[#131A29] text-white shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor={timeId} className="block text-xs font-semibold text-slate-200 mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    id={timeId}
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#D4AF37]/35 text-sm bg-[#131A29] text-white shadow-2xs cursor-pointer"
                  >
                    <option value="Morning (9 AM - 12 PM)" className="bg-slate-900 text-white">Morning (9 AM – 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)" className="bg-slate-900 text-white">Afternoon (12 PM – 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)" className="bg-slate-900 text-white">Evening (4 PM – 7 PM)</option>
                    <option value="Weekend Appointment" className="bg-slate-900 text-white">Weekend Appointment</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-slate-950 via-[#18212D] to-slate-950 text-white font-luxury-sans uppercase tracking-[0.16em] font-semibold text-xs hover:border-[#F3E8CE] border border-[#D4AF37] shadow-luxury-glow transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm Consultation Request</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onCallClick}
                className="text-xs text-amber-300 hover:text-amber-200 underline cursor-pointer font-medium"
              >
                Or call us immediately at (317) 408-9532
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4 text-white">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-serif-luxury text-2xl font-bold text-white">
              Appointment Scheduled!
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-light">
              Thank you, {name}. We will review the available time slots and send you a confirmation message shortly.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 border border-[#D4AF37]/40 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
