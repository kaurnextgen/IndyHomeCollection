import React, { useState } from 'react';
import { Phone, MessageSquare, Copy, Check, X, ShieldCheck } from 'lucide-react';
import { LuxuryLogo } from './LuxuryLogo';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const phoneNumber = '317-408-9532';
  const cleanPhone = '3174089532';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E1422] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 relative space-y-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <LuxuryLogo variant="markOnly" size={44} />
          <div className="mt-2 text-xs font-luxury-sans font-semibold uppercase tracking-[0.2em] text-amber-400">
            Direct Private Line
          </div>
          <h3 className="font-luxury-serif text-2xl font-normal text-white">
            Call Indy Home Collection
          </h3>
          <p className="text-xs text-slate-300 font-body-read font-light">
            Connect directly with our Indiana Real Estate Advisory for confidential buying, selling, or investment guidance.
          </p>
        </div>

        {/* Highlighted Phone Display */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B0F17] via-[#121926] to-[#0B0F17] border border-[#D4AF37]/50 shadow-luxury-glow text-center space-y-1.5 text-white">
          <span className="text-[10px] font-luxury-sans uppercase tracking-wider text-amber-300/80">Direct Realtor Line</span>
          <div className="font-luxury-serif text-3xl font-normal text-amber-300 tracking-wide">
            (317) 408-9532
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1 font-body-read">
            <ShieldCheck className="w-3.5 h-3.5" />
            Direct access · No call center transfers
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <a
            href={`tel:${cleanPhone}`}
            className="w-full py-3.5 px-4 rounded-xl bg-gold-metallic text-slate-950 font-luxury-sans uppercase tracking-wider font-semibold text-xs border border-[#D4AF37] hover:opacity-95 transition-all shadow-luxury-glow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Dial (317) 408-9532 Now</span>
          </a>

          <a
            href={`sms:${cleanPhone}`}
            className="w-full py-3 px-4 rounded-xl bg-[#131B2A] border border-[#D4AF37]/45 text-amber-300 font-semibold text-xs hover:bg-[#1C263B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Send a Text Message</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37]/30 bg-[#131B2A] text-slate-300 hover:bg-[#1C263B] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Phone Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Number (317-408-9532)</span>
              </>
            )}
          </button>
        </div>

        {/* Availability footnote */}
        <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-3 font-light">
          Available 7 days a week · Greater Indianapolis, Carmel, Fishers & Statewide Indiana
        </div>

      </div>
    </div>
  );
};
