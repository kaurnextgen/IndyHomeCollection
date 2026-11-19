import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  Settings2,
  Code2,
  ExternalLink,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
import { TargetBuilder, ThemeId } from '../types';
import {
  generateMasterPrompt,
  BUILDER_DETAILS,
  THEMES_INFO,
  PromptConfig,
} from '../data/promptData';

interface PromptStudioProps {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onPreviewSiteClick: () => void;
}

export const PromptStudio: React.FC<PromptStudioProps> = ({
  activeTheme,
  onThemeChange,
  onPreviewSiteClick,
}) => {
  const [selectedBuilder, setSelectedBuilder] = useState<TargetBuilder>('bolt');
  const [regionalFocus, setRegionalFocus] = useState<string>(
    'Greater Indianapolis, Carmel, Fishers, Zionsville, Westfield, and statewide Indiana'
  );
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    'High-intent direct phone calls to (317) 408-9532, consultation bookings, and instant home valuation lead captures'
  );
  const [activeInspectorTab, setActiveInspectorTab] = useState<
    'full' | 'profile' | 'design' | 'funnel' | 'nofabrication'
  >('full');
  const [copied, setCopied] = useState(false);

  // Compile prompt
  const masterPrompt = useMemo(() => {
    return generateMasterPrompt({
      builder: selectedBuilder,
      theme: activeTheme,
      primaryGoal,
      regionalFocus,
    });
  }, [selectedBuilder, activeTheme, primaryGoal, regionalFocus]);

  const tokenEstimate = Math.round(masterPrompt.length / 4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(masterPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = masterPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([masterPrompt], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `indy-home-collection-${selectedBuilder}-master-prompt.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const builderList: TargetBuilder[] = ['bolt', 'lovable', 'v0', 'framer', 'replit'];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans-clean">
      
      {/* Studio Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Master Website Prompt Engineering Engine</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Production-Ready AI Website Generation Prompt
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-body-read leading-relaxed">
            Crafted for <strong className="text-white">Indy Home Collection</strong> under the 9-phase methodology (Understand → Research → Analyse → Strategize → Structure → Design → Write → Validate). Copy directly into your chosen AI builder or customize parameters below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            title="Download .md file"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Target Builder Selector Strip */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-800" />
            Select Target AI Website Builder
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Optimized syntax formatting
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {builderList.map((builderKey) => {
            const b = BUILDER_DETAILS[builderKey];
            const isSelected = selectedBuilder === builderKey;
            return (
              <button
                key={builderKey}
                onClick={() => setSelectedBuilder(builderKey)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm font-serif-luxury">{b.name}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </div>
                <p className={`text-[11px] leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {b.tag}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Real-Time Parameter Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parameter Customizer */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Settings2 className="w-4 h-4 text-amber-800" />
            <h3 className="font-serif-luxury text-lg font-bold text-slate-900">
              Prompt Parameters
            </h3>
          </div>

          {/* Color Palette Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Color Scheme in Prompt
            </label>
            <div className="space-y-1.5">
              {(Object.keys(THEMES_INFO) as ThemeId[]).map((themeKey) => {
                const info = THEMES_INFO[themeKey];
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => onThemeChange(themeKey)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      activeTheme === themeKey
                        ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{info.name}</span>
                    <span className="text-[10px] opacity-80">{info.font.split('+')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Regional Focus */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Indiana Market Focus
            </label>
            <select
              value={regionalFocus}
              onChange={(e) => setRegionalFocus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            >
              <option value="Greater Indianapolis, Carmel, Fishers, Zionsville, Avon, Plainfield, Brownsburg, Greenwood, Whiteland, Southport, McCordsville, Westfield, Noblesville, and statewide Indiana">
                All Indiana (14+ Communities: Carmel, Avon, Greenwood, etc.)
              </option>
              <option value="Hendricks County Westside Hubs (Avon, Plainfield, Brownsburg)">
                Hendricks Westside (Avon, Plainfield, Brownsburg)
              </option>
              <option value="Johnson County & Southside (Greenwood, Whiteland, Southport)">
                Johnson Southside (Greenwood, Whiteland, Southport)
              </option>
              <option value="Northern Indianapolis Suburbs (Carmel, Fishers, Zionsville, Westfield, Noblesville, McCordsville)">
                Hamilton & Boone Luxury Corridor (Carmel, Fishers, Zionsville)
              </option>
              <option value="Indianapolis Metro & Urban Cultural Districts (Marion County, Meridian-Kessler, Southport)">
                Marion County / Downtown & Historic Districts
              </option>
              <option value="College & Regional Rental Corridors (Bloomington, Lafayette, Central IN)">
                Regional Investment Markets (Bloomington & Statewide)
              </option>
            </select>
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Primary Conversion Focus
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            >
              <option value="High-intent direct phone calls to (317) 408-9532, consultation bookings, and instant home valuation lead captures">
                Omni-Channel (Direct Calls + Valuation + Booking)
              </option>
              <option value="Direct phone calls to (317) 408-9532 and SMS neighborhood inquiries">
                Direct Phone Calls Focus
              </option>
              <option value="Home valuation comparative market analysis (CMA) seller leads">
                Home Seller Valuation Lead Funnel
              </option>
              <option value="Out-of-state relocation packets and investment property consultations">
                Relocation & Investment Focus
              </option>
            </select>
          </div>

          {/* Prompt Metrics Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span>Estimated Tokens:</span>
              <span className="font-bold text-slate-900">~{tokenEstimate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Character Count:</span>
              <span className="font-bold text-slate-900">{masterPrompt.length.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Platform:</span>
              <span className="font-bold text-amber-800">{BUILDER_DETAILS[selectedBuilder].name}</span>
            </div>
          </div>

          {/* Live Preview Switch Button */}
          <button
            onClick={onPreviewSiteClick}
            className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Switch to Live Website Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: Master Prompt Code Viewer with Line Numbers */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* Header of Code Container */}
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-semibold tracking-wide">
                MASTER_PROMPT_{selectedBuilder.toUpperCase()}.MD
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 sm:p-6 bg-[#0B0F19] text-slate-200 font-mono text-xs overflow-x-auto max-h-[640px] leading-relaxed selection:bg-amber-500/30 selection:text-white">
            <pre className="whitespace-pre-wrap">{masterPrompt}</pre>
          </div>

          {/* Builder Tip Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <strong>Tip for {BUILDER_DETAILS[selectedBuilder].name}:</strong>{' '}
              {BUILDER_DETAILS[selectedBuilder].bestFor}.
            </span>
            <span className="hidden sm:inline text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Zero Fake Data Guaranteed
            </span>
          </div>

        </div>

      </div>

      {/* Master Prompt Constitution Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            Rule 1: Real Business Facts
          </div>
          <h4 className="font-serif-luxury font-bold text-slate-900">
            Truth Grounding & Identity
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The prompt explicitly embeds Indy Home Collection, phone (317) 408-9532, and the exact Indiana territory with zero fabricated client counts or fake awards.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            Rule 2: Anti-Slop Discipline
          </div>
          <h4 className="font-serif-luxury font-bold text-slate-900">
            Zero Pill & 60-30-10 Math
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instructs AI builders to avoid candy badges, mechanical slashes, or floating stat boxes. Allocates exact color tokens for {THEMES_INFO[activeTheme].name}.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            Rule 3: Conversion Rigor
          </div>
          <h4 className="font-serif-luxury font-bold text-slate-900">
            Live Handlers & Calculators
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Specifies exact state models for instant Indiana home valuation math, mortgage cash flow calculations, and multi-field consultation booking.
          </p>
        </div>
      </div>

    </div>
  );
};
