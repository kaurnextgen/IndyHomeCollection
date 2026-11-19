import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, Bell } from 'lucide-react';
import { adminStore } from '../data/adminStore';
import { AdminSettingsData } from '../types';

export const AnnouncementBar: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettingsData>(adminStore.getSettings());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(adminStore.getSettings());
    };
    window.addEventListener('indy_admin_data_changed', handleUpdate);
    return () => window.removeEventListener('indy_admin_data_changed', handleUpdate);
  }, []);

  if (!settings.announcementActive || dismissed) return null;

  return (
    <aside aria-label="Announcement" className="relative z-50 bg-gradient-to-r from-[#0C121E] via-[#1E170A] to-[#0C121E] border-b border-[#D4AF37]/40 text-white py-2 px-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 mx-auto">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#997928] text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>Super Admin VIP Broadcast</span>
          </span>
          <span className="font-sans-clean text-slate-200 font-medium hidden sm:inline">
            {settings.announcementText}
          </span>
          <span className="font-sans-clean text-slate-200 font-medium sm:hidden line-clamp-1">
            {settings.announcementText}
          </span>
          {settings.announcementLinkText && (
            <a
              href={settings.announcementLinkUrl || '#contact'}
              className="inline-flex items-center gap-1 font-luxury-sans text-amber-300 hover:text-white font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
            >
              <span>{settings.announcementLinkText}</span>
              <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
            </a>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
