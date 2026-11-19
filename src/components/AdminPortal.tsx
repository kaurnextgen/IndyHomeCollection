import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Home as HomeIcon,
  Star,
  Settings as SettingsIcon,
  Search,
  Plus,
  Download,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  ExternalLink,
  Filter,
  ArrowUpRight,
  FileText,
  RefreshCw,
  Sparkles,
  ChevronRight,
  LogOut,
  DollarSign,
  TrendingUp,
  Building,
  Check,
  X,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import {
  LeadItem,
  PropertyListingItem,
  ReviewItem,
  AdminSettingsData,
  LeadStatus,
  LeadPriority,
  AppMode,
} from '../types';
import { adminStore } from '../data/adminStore';
import { LuxuryLogo } from './LuxuryLogo';

interface AdminPortalProps {
  onBackToWebsite: () => void;
  onOpenStudio?: () => void;
}

type AdminTab = 'dashboard' | 'leads' | 'properties' | 'reviews' | 'settings';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToWebsite, onOpenStudio }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(adminStore.isAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Live store states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [properties, setProperties] = useState<PropertyListingItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [settings, setSettings] = useState<AdminSettingsData>(adminStore.getSettings());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [propertyCategoryFilter, setPropertyCategoryFilter] = useState<string>('all');

  // Modals
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [addPropModalOpen, setAddPropModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Form states for new lead
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'consultation' as const,
    city: 'Carmel',
    estimatedValue: 500000,
    details: '',
    priority: 'high' as LeadPriority,
  });

  // Form states for new property
  const [newPropForm, setNewPropForm] = useState({
    title: '',
    price: '$550,000',
    priceNumber: 550000,
    city: 'Carmel',
    county: 'Hamilton County',
    beds: 4,
    baths: 3,
    sqft: 3200,
    lotSize: '0.35 Acre',
    style: 'Modern Craftsman',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'family' as const,
    categoryLabel: 'Spacious Multi-Gen Family Brick Homes',
    description: '',
  });

  // Refresh data from adminStore
  const refreshData = () => {
    setLeads(adminStore.getLeads());
    setProperties(adminStore.getProperties());
    setReviews(adminStore.getReviews());
    setSettings(adminStore.getSettings());
  };

  useEffect(() => {
    refreshData();
    const handleDataChanged = () => refreshData();
    window.addEventListener('indy_admin_data_changed', handleDataChanged);
    return () => window.removeEventListener('indy_admin_data_changed', handleDataChanged);
  }, []);

  // Handle Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '0000' || pinInput.toLowerCase() === 'admin') {
      adminStore.setAuthenticated(true);
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleQuickDemoAccess = () => {
    adminStore.setAuthenticated(true);
    setIsAuthenticated(true);
    setPinError(false);
  };

  const handleLogout = () => {
    adminStore.setAuthenticated(false);
    setIsAuthenticated(false);
  };

  // KPIs
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const activePipelineValue = leads
    .filter((l) => l.status !== 'closed' && l.status !== 'archived')
    .reduce((sum, l) => sum + (l.estimatedValue || 450000), 0);
  const activePropertiesCount = properties.filter((p) => p.status === 'Active').length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.city && l.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Properties
  const filteredProperties = properties.filter((p) => {
    return propertyCategoryFilter === 'all' || p.category === propertyCategoryFilter;
  });

  // Add note to lead
  const handleAddNote = (leadId: string) => {
    if (!newNoteContent.trim()) return;
    adminStore.addLeadNote(leadId, newNoteContent.trim(), settings.realtorName);
    setNewNoteContent('');
    // refresh selected lead
    const updated = adminStore.getLeads().find((l) => l.id === leadId);
    if (updated) setSelectedLead(updated);
  };

  // Create lead submit
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;
    adminStore.addLead({
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      type: newLeadForm.type,
      city: newLeadForm.city,
      estimatedValue: Number(newLeadForm.estimatedValue),
      details: newLeadForm.details || 'Manually added via Admin Portal.',
      source: 'Admin Direct Entry',
      priority: newLeadForm.priority,
    });
    setAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      type: 'consultation',
      city: 'Carmel',
      estimatedValue: 500000,
      details: '',
      priority: 'high',
    });
  };

  // Create property submit
  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropForm.title || !newPropForm.price) return;
    adminStore.addProperty({
      title: newPropForm.title,
      price: newPropForm.price,
      priceNumber: Number(newPropForm.priceNumber),
      city: newPropForm.city,
      county: newPropForm.county,
      beds: Number(newPropForm.beds),
      baths: Number(newPropForm.baths),
      sqft: Number(newPropForm.sqft),
      lotSize: newPropForm.lotSize,
      style: newPropForm.style,
      image: newPropForm.image,
      category: newPropForm.category,
      categoryLabel: newPropForm.categoryLabel,
      description: newPropForm.description || 'Exclusive Indy Home Collection listing.',
      status: 'Active',
      featured: true,
    });
    setAddPropModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.saveSettings(settings);
    alert('Settings successfully updated!');
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans-clean">
        {/* Ambient Gold Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center space-y-6">
          <div className="flex flex-col items-center">
            <LuxuryLogo variant="markOnly" size={60} />
            <div className="mt-4 flex items-center gap-2 text-[10px] font-luxury-sans font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              <span>Executive Portal</span>
            </div>
            <h1 className="font-luxury-display text-2xl font-normal tracking-[0.18em] text-white uppercase mt-1">
              INDY HOME COLLECTION
            </h1>
            <p className="text-xs text-slate-400 font-light mt-1">
              Realtor CRM, Inquiries, Property Inventory & Intelligence
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Enter Security PIN
              </label>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.5em] text-2xl py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-amber-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-mono"
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN (Use 1234 or Demo Access)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E3BE72] to-[#B38936] text-slate-950 font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-105 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Unlock Admin Portal
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <button
              onClick={handleQuickDemoAccess}
              className="text-xs text-amber-300/90 hover:text-amber-200 underline cursor-pointer transition-colors"
            >
              One-Click Instant Demo Access (PIN: 1234)
            </button>

            <div>
              <button
                onClick={onBackToWebsite}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
              >
                ← Return to Public Website
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-slate-400">
          Indy Home Collection · Indiana Real Estate Realtor Console
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED PORTAL VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans-clean">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Crest & Title */}
        <div className="flex items-center gap-3">
          <LuxuryLogo variant="markOnly" size={38} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-luxury-display text-base sm:text-lg font-normal tracking-[0.16em] uppercase text-white">
                INDY HOME COLLECTION
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9.5px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                Admin Console
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Central Indiana Real Estate Pipeline & Operations
            </div>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          {/* Back to Live Website */}
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Preview Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">View Public Website</span>
            <span className="md:hidden">Website</span>
          </button>

          {/* Prompt Studio Switcher */}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Studio</span>
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-xs text-red-300 border border-red-800/40 transition-colors cursor-pointer"
            title="Lock Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/80 border-r border-slate-800/80 p-4 shrink-0 flex flex-row md:flex-col justify-between overflow-x-auto">
          <div className="flex flex-row md:flex-col gap-1 w-full">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
              <span>Overview Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Leads & CRM</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'properties'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <HomeIcon className="w-4 h-4 text-sky-400" />
                <span>Properties & Listings</span>
              </div>
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
                {properties.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Reviews & Stories</span>
              </div>
              {pendingReviewsCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  {pendingReviewsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
              <span>Realtor Profile & Config</span>
            </button>
          </div>

          {/* Quick Realtor ID Card in Sidebar */}
          <div className="hidden md:block mt-auto pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="font-semibold text-white">{settings.realtorName}</div>
              <div className="text-[10px] text-amber-300/80">{settings.realtorPhone}</div>
              <div className="text-[9.5px] text-slate-400 truncate">{settings.licenseNumber}</div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-luxury-serif text-white">
                    Central Indiana Executive Overview
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live client pipeline, home valuations, and listing status across Hamilton, Boone, and Hendricks counties.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAddLeadModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs hover:brightness-105 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add Inbound Lead
                  </button>
                  <button
                    onClick={() => adminStore.exportLeadsCSV()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Export CSV
                  </button>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Active Leads */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Client Inquiries</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-luxury-serif font-bold text-white mt-2">
                    {totalLeads}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{newLeadsCount} new this week</span>
                  </div>
                </div>

                {/* Pipeline Value */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Pipeline Volume</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-luxury-serif font-bold text-emerald-300 mt-2">
                    ${(activePipelineValue / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    Median Inquiry: $580,000
                  </div>
                </div>

                {/* Active Listings */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Showcases</span>
                    <HomeIcon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-3xl font-luxury-serif font-bold text-white mt-2">
                    {activePropertiesCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    {properties.length} total catalogued homes
                  </div>
                </div>

                {/* Client Satisfaction */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Client Trust Rating</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="text-3xl font-luxury-serif font-bold text-amber-300 mt-2">
                    5.0 ★
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    100% Verified Closings
                  </div>
                </div>

              </div>

              {/* Territory Breakdown & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Territory Distribution */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    Central Indiana Hotspots
                  </h3>
                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Carmel (Hamilton County)</span>
                        <span className="font-semibold text-amber-300">42%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-[#D4AF37]" style={{ width: '42%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Zionsville (Boone County)</span>
                        <span className="font-semibold text-amber-300">28%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-400" style={{ width: '28%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Fishers & Westfield</span>
                        <span className="font-semibold text-amber-300">18%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-sky-400" style={{ width: '18%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Avon & Brownsburg (Hendricks)</span>
                        <span className="font-semibold text-amber-300">12%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Average Days on Market (DOM)</span>
                    <span className="font-semibold text-white">18 Days</span>
                  </div>
                </div>

                {/* Recent High-Intent Leads */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      Recent Inbound Leads
                    </h3>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      View All Leads <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="pb-2">Client</th>
                          <th className="pb-2">Community</th>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Est. Value</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {leads.slice(0, 5).map((l) => (
                          <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 font-medium text-white flex items-center gap-2">
                              {l.priority === 'urgent' && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Urgent Priority" />
                              )}
                              <span>{l.name}</span>
                            </td>
                            <td className="py-2.5 text-slate-400">{l.city || 'Indiana'}</td>
                            <td className="py-2.5 capitalize">{l.type}</td>
                            <td className="py-2.5 text-amber-300 font-mono">
                              {l.estimatedValue ? `$${(l.estimatedValue / 1000).toFixed(0)}k` : '—'}
                            </td>
                            <td className="py-2.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                  l.status === 'new'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : l.status === 'showing'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : l.status === 'contacted'
                                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                    : l.status === 'under_contract'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {l.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => setSelectedLead(l)}
                                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-amber-300 cursor-pointer"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: LEADS & CRM MANAGER */}
          {/* ========================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              {/* Header with Search and New Lead */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-luxury-serif text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#D4AF37]" />
                    Client Inquiries & CRM
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage buyer consultations, home valuations, investment inquiries, and showing requests.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAddLeadModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs hover:brightness-105 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add Lead
                  </button>
                  <button
                    onClick={() => adminStore.exportLeadsCSV()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Export CSV
                  </button>
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, city, email..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Status Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['all', 'new', 'contacted', 'showing', 'under_contract', 'closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap cursor-pointer transition-all ${
                        leadStatusFilter === st
                          ? 'bg-[#D4AF37] text-slate-950 font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 text-[10.5px] uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Client Contact</th>
                        <th className="py-3 px-4">Inquiry Source</th>
                        <th className="py-3 px-4">Market Target</th>
                        <th className="py-3 px-4">Budget / Est.</th>
                        <th className="py-3 px-4">Pipeline Status</th>
                        <th className="py-3 px-4">Priority</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-500">
                            No client leads found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Contact Details */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white flex items-center gap-2">
                                <span>{lead.name}</span>
                                {lead.notes && lead.notes.length > 0 && (
                                  <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded" title="Has internal notes">
                                    {lead.notes.length} notes
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                                <a href={`tel:${lead.phone}`} className="hover:text-amber-300 flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-[#D4AF37]" /> {lead.phone}
                                </a>
                                {lead.email && (
                                  <a href={`mailto:${lead.email}`} className="hover:text-amber-300 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-slate-400" /> {lead.email}
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Source */}
                            <td className="py-3.5 px-4">
                              <div className="text-slate-300">{lead.source}</div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </div>
                            </td>

                            {/* Market / City */}
                            <td className="py-3.5 px-4">
                              <span className="text-amber-200 font-medium">{lead.city || 'Central Indiana'}</span>
                            </td>

                            {/* Est Value */}
                            <td className="py-3.5 px-4 font-mono font-medium text-amber-300">
                              {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '—'}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => adminStore.updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                className={`text-[11px] font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                                  lead.status === 'new'
                                    ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                                    : lead.status === 'showing'
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                                    : lead.status === 'contacted'
                                    ? 'bg-sky-950/60 text-sky-300 border-sky-800'
                                    : lead.status === 'under_contract'
                                    ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="showing">Showing Scheduled</option>
                                <option value="under_contract">Under Contract</option>
                                <option value="closed">Closed</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>

                            {/* Priority */}
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.priority}
                                onChange={(e) => adminStore.updateLeadPriority(lead.id, e.target.value as LeadPriority)}
                                className="text-[10px] uppercase font-bold rounded bg-slate-950 border border-slate-700 px-2 py-1 text-slate-300"
                              >
                                <option value="urgent">Urgent</option>
                                <option value="high">High</option>
                                <option value="normal">Normal</option>
                              </select>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-amber-300 border border-[#D4AF37]/40 text-xs font-medium cursor-pointer"
                              >
                                Notes & Details
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Archive lead for ${lead.name}?`)) {
                                    adminStore.deleteLead(lead.id);
                                  }
                                }}
                                className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PROPERTIES & LISTINGS */}
          {/* ========================================================= */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-luxury-serif text-white flex items-center gap-2">
                    <HomeIcon className="w-6 h-6 text-sky-400" />
                    Property Inventory & Listings
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage active showcases, pricing updates, and luxury estates.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAddPropModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs hover:brightness-105 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add New Listing
                  </button>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'All Listings' },
                  { id: 'luxury', label: 'Luxury Big Homes' },
                  { id: 'small', label: 'Charming Small Homes' },
                  { id: 'new', label: 'New Construction' },
                  { id: 'family', label: 'Multi-Gen Brick Homes' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPropertyCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                      propertyCategoryFilter === cat.id
                        ? 'bg-[#D4AF37] text-slate-950 font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg flex flex-col sm:flex-row"
                  >
                    {/* Image Preview */}
                    <div className="sm:w-52 h-48 sm:h-auto shrink-0 relative bg-slate-950">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-amber-300 border border-amber-500/40">
                        {prop.city}
                      </span>
                    </div>

                    {/* Content & Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                            {prop.categoryLabel}
                          </span>
                          <select
                            value={prop.status}
                            onChange={(e) =>
                              adminStore.updateProperty(prop.id, {
                                status: e.target.value as any,
                              })
                            }
                            className={`text-[10px] font-bold uppercase rounded px-2 py-0.5 border cursor-pointer ${
                              prop.status === 'Active'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                                : prop.status === 'Pending'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Sold">Sold</option>
                            <option value="Coming Soon">Coming Soon</option>
                          </select>
                        </div>

                        <h3 className="font-luxury-serif text-lg text-white font-medium mt-1">
                          {prop.title}
                        </h3>

                        <div className="text-xl font-luxury-serif text-amber-300 font-normal mt-1">
                          {prop.price}
                        </div>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                          {prop.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div>
                          {prop.beds} Beds · {prop.baths} Baths · {prop.sqft.toLocaleString()} sqft
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Delete property listing "${prop.title}"?`)) {
                              adminStore.deleteProperty(prop.id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                          title="Remove property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: REVIEWS & CLIENT STORIES */}
          {/* ========================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-luxury-serif text-white flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    Client Reviews & Testimonials
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Moderate client success stories submitted via the public website or add verified testimonials.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white text-sm">{rev.clientName}</span>
                        <span className="text-xs text-amber-400 font-medium">({rev.location})</span>
                        <span className="text-xs text-slate-400">· {rev.transactionType}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            rev.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-luxury-serif text-amber-200">
                        {rev.headline}
                      </h4>

                      <p className="text-xs text-slate-300 font-body-read leading-relaxed">
                        {rev.story}
                      </p>

                      <div className="text-[11px] italic text-slate-400">
                        Closing Statement: {rev.closingStatement}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center justify-center gap-2 shrink-0">
                      {rev.status !== 'approved' ? (
                        <button
                          onClick={() => adminStore.updateReviewStatus(rev.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve & Publish
                        </button>
                      ) : (
                        <button
                          onClick={() => adminStore.updateReviewStatus(rev.id, 'pending')}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                        >
                          Set to Pending
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Remove review by ${rev.clientName}?`)) {
                            adminStore.deleteReview(rev.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 text-xs cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: REALTOR PROFILE & SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-2xl font-luxury-serif text-white flex items-center gap-2">
                  <SettingsIcon className="w-6 h-6 text-slate-400" />
                  Realtor Profile & Operations Config
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update public contact lines, Indiana license details, and inbound alert settings.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Realtor Display Name
                    </label>
                    <input
                      type="text"
                      value={settings.realtorName}
                      onChange={(e) => setSettings({ ...settings, realtorName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={settings.realtorTitle}
                      onChange={(e) => setSettings({ ...settings, realtorTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Direct Private Cell / Call Line
                    </label>
                    <input
                      type="text"
                      value={settings.realtorPhone}
                      onChange={(e) => setSettings({ ...settings, realtorPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Lead Notification Email
                    </label>
                    <input
                      type="email"
                      value={settings.realtorEmail}
                      onChange={(e) => setSettings({ ...settings, realtorEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Indiana Real Estate License Registration
                    </label>
                    <input
                      type="text"
                      value={settings.licenseNumber}
                      onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Office / Brokerage Address
                    </label>
                    <input
                      type="text"
                      value={settings.officeAddress}
                      onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Notification Toggles */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Instant Inbound Notifications
                  </h4>

                  <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>Receive instant email alerts on new home valuation submissions</span>
                  </label>

                  <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsAlerts}
                      onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>Send SMS text alert to {settings.realtorPhone} for urgent showing requests</span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs tracking-wider uppercase shadow-md hover:brightness-105 cursor-pointer"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset all demo data back to factory defaults?')) {
                        adminStore.resetAll();
                        refreshData();
                      }
                    }}
                    className="text-xs text-slate-400 hover:text-rose-400 underline cursor-pointer"
                  >
                    Reset Sample Demo Data
                  </button>
                </div>

              </form>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: LEAD DETAIL & NOTES */}
      {/* ========================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Lead File · {selectedLead.id}
                </span>
                <h3 className="text-xl font-luxury-serif text-white mt-0.5">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Direct Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-amber-300 hover:underline">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Email</span>
                <span className="text-white truncate block">{selectedLead.email || 'None'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Community</span>
                <span className="text-white">{selectedLead.city || 'Central IN'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Budget / Est</span>
                <span className="text-emerald-300 font-mono">
                  {selectedLead.estimatedValue ? `$${selectedLead.estimatedValue.toLocaleString()}` : '—'}
                </span>
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Inquiry Message / Request
              </span>
              <p className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-body-read">
                {selectedLead.details}
              </p>
            </div>

            {/* Status & Priority Controller */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const st = e.target.value as LeadStatus;
                    adminStore.updateLeadStatus(selectedLead.id, st);
                    setSelectedLead({ ...selectedLead, status: st });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  <option value="new">New Inquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="showing">Showing Scheduled</option>
                  <option value="under_contract">Under Contract</option>
                  <option value="closed">Closed Deal</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Priority Rating
                </label>
                <select
                  value={selectedLead.priority}
                  onChange={(e) => {
                    const pr = e.target.value as LeadPriority;
                    adminStore.updateLeadPriority(selectedLead.id, pr);
                    setSelectedLead({ ...selectedLead, priority: pr });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
            </div>

            {/* Notes Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Internal Realtor Notes
              </span>

              {/* Add Note Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNote(selectedLead.id);
                    }
                  }}
                  placeholder="Add private note (e.g., Called client, looking for 4-car garage)..."
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={() => handleAddNote(selectedLead.id)}
                  className="px-3.5 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer hover:bg-amber-500/30"
                >
                  Add Note
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-semibold text-amber-300">{note.author}</span>
                        <span>{new Date(note.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No notes added yet.</p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW INBOUND LEAD */}
      {/* ========================================================= */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-luxury-serif text-white">
                Add Inbound Client Lead
              </h3>
              <button
                onClick={() => setAddLeadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="e.g., Harpreet Boparai"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="(317) 555-0199"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target City
                  </label>
                  <select
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="Carmel">Carmel</option>
                    <option value="Zionsville">Zionsville</option>
                    <option value="Fishers">Fishers</option>
                    <option value="Westfield">Westfield</option>
                    <option value="Avon">Avon</option>
                    <option value="Brownsburg">Brownsburg</option>
                    <option value="Plainfield">Plainfield</option>
                    <option value="Greenwood">Greenwood</option>
                    <option value="Indianapolis">Indianapolis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={newLeadForm.type}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="consultation">Buying Consultation</option>
                    <option value="valuation">Home Valuation (Selling)</option>
                    <option value="investment">Investment Property</option>
                    <option value="showing">Private Showing Request</option>
                    <option value="contact">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Budget ($)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client Notes / Details
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.details}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, details: e.target.value })}
                  placeholder="Specific requirements, school districts, timeline..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddLeadModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW PROPERTY */}
      {/* ========================================================= */}
      {addPropModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-luxury-serif text-white">
                Add New Showcase Property
              </h3>
              <button
                onClick={() => setAddPropModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPropForm.title}
                  onChange={(e) => setNewPropForm({ ...newPropForm, title: e.target.value })}
                  placeholder="e.g., The Prairie Ridge Custom Timber Estate"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPropForm.price}
                    onChange={(e) => setNewPropForm({ ...newPropForm, price: e.target.value })}
                    placeholder="$675,000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newPropForm.city}
                    onChange={(e) => setNewPropForm({ ...newPropForm, city: e.target.value })}
                    placeholder="Carmel"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={newPropForm.beds}
                    onChange={(e) => setNewPropForm({ ...newPropForm, beds: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={newPropForm.baths}
                    onChange={(e) => setNewPropForm({ ...newPropForm, baths: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SqFt
                  </label>
                  <input
                    type="number"
                    value={newPropForm.sqft}
                    onChange={(e) => setNewPropForm({ ...newPropForm, sqft: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={newPropForm.image}
                  onChange={(e) => setNewPropForm({ ...newPropForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newPropForm.description}
                  onChange={(e) => setNewPropForm({ ...newPropForm, description: e.target.value })}
                  placeholder="Architectural style, upgrades, finishes..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddPropModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 font-semibold text-xs"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

