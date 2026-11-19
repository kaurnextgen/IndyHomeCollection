import React, { useState, useEffect } from 'react';
import {
  Crown,
  Shield,
  LayoutDashboard,
  Users,
  Home as HomeIcon,
  Star,
  Settings as SettingsIcon,
  Search,
  Plus,
  Download,
  Upload,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
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
  LogOut,
  DollarSign,
  TrendingUp,
  Building,
  Check,
  X,
  MessageSquare,
  ChevronDown,
  Bell,
  Megaphone,
  Radio,
  History,
  Database,
  UserCheck,
  UserPlus,
  Eye,
  Sliders,
  Award,
  Zap,
} from 'lucide-react';
import {
  LeadItem,
  PropertyListingItem,
  ReviewItem,
  AdminSettingsData,
  LeadStatus,
  LeadPriority,
  TeamMember,
  AuditLogEntry,
  TeamMemberRole,
} from '../types';
import { adminStore } from '../data/adminStore';
import { LuxuryLogo } from './LuxuryLogo';

interface SuperAdminPortalProps {
  onBackToWebsite: () => void;
  onOpenStudio?: () => void;
}

type SuperAdminTab =
  | 'command_center'
  | 'team_management'
  | 'leads_crm'
  | 'properties_cms'
  | 'site_broadcast'
  | 'reviews_cms'
  | 'audit_logs'
  | 'brokerage_settings';

export const SuperAdminPortal: React.FC<SuperAdminPortalProps> = ({
  onBackToWebsite,
  onOpenStudio,
}) => {
  // Auth & Role State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(adminStore.isAuthenticated());
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(adminStore.isSuperAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<SuperAdminTab>('command_center');

  // Live Store Data
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [properties, setProperties] = useState<PropertyListingItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [settings, setSettings] = useState<AdminSettingsData>(adminStore.getSettings());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadPriorityFilter, setLeadPriorityFilter] = useState<string>('all');
  const [propertyCategoryFilter, setPropertyCategoryFilter] = useState<string>('all');
  const [logCategoryFilter, setLogCategoryFilter] = useState<string>('all');

  // Modals
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [addPropModalOpen, setAddPropModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Form states for new Lead
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'consultation' as const,
    city: 'Carmel',
    estimatedValue: 650000,
    details: '',
    priority: 'high' as LeadPriority,
    assignedAgentId: 'team-1',
  });

  // Form states for new Property
  const [newPropForm, setNewPropForm] = useState({
    title: '',
    price: '$750,000',
    priceNumber: 750000,
    city: 'Carmel',
    county: 'Hamilton County',
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    lotSize: '0.45 Acre',
    style: 'Modern Custom Estate',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'luxury' as const,
    categoryLabel: 'Luxury Big Homes & Estates',
    description: '',
    featured: true,
  });

  // Form states for new Team Member
  const [newTeamForm, setNewTeamForm] = useState({
    name: '',
    role: 'Senior Realtor' as TeamMemberRole,
    email: '',
    phone: '(317) 408-9532',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    commissionSplit: '80/20',
    license: 'RS25000000 (Indiana Broker License)',
    bio: '',
  });

  // PIN settings form
  const [newSuperPin, setNewSuperPin] = useState(settings.superAdminPin || '7777');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Refresh data from adminStore
  const refreshData = () => {
    setLeads(adminStore.getLeads());
    setProperties(adminStore.getProperties());
    setReviews(adminStore.getReviews());
    setTeam(adminStore.getTeam());
    setAuditLogs(adminStore.getAuditLogs());
    setSettings(adminStore.getSettings());
  };

  useEffect(() => {
    refreshData();
    const handleDataChanged = () => refreshData();
    window.addEventListener('indy_admin_data_changed', handleDataChanged);
    return () => window.removeEventListener('indy_admin_data_changed', handleDataChanged);
  }, []);

  // Login Handler
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = pinInput.trim().toLowerCase();
    const currentSuperPin = settings.superAdminPin || '7777';

    if (input === currentSuperPin || input === 'superadmin' || input === '7777') {
      adminStore.setSuperAdminAuthenticated(true);
      setIsSuperAdmin(true);
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
      adminStore.addAuditLog({
        action: 'Super Admin Login',
        user: 'Super Admin',
        category: 'auth',
        details: 'Root Super Admin authenticated via master PIN.',
      });
    } else if (input === '1234' || input === '0000' || input === 'admin') {
      adminStore.setAuthenticated(true);
      adminStore.setSuperAdminAuthenticated(false);
      setIsSuperAdmin(false);
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
      adminStore.addAuditLog({
        action: 'Staff Agent Login',
        user: 'Associate Agent',
        category: 'auth',
        details: 'Standard agent access session initiated.',
      });
    } else {
      setPinError(true);
    }
  };

  const handleQuickSuperAccess = () => {
    adminStore.setSuperAdminAuthenticated(true);
    setIsSuperAdmin(true);
    setIsAuthenticated(true);
    setPinError(false);
  };

  const handleQuickAgentAccess = () => {
    adminStore.setAuthenticated(true);
    adminStore.setSuperAdminAuthenticated(false);
    setIsSuperAdmin(false);
    setIsAuthenticated(true);
    setPinError(false);
  };

  const handleLogout = () => {
    adminStore.setAuthenticated(false);
    adminStore.setSuperAdminAuthenticated(false);
    setIsAuthenticated(false);
    setIsSuperAdmin(false);
  };

  // Toggle between Super Admin and Agent View
  const toggleSuperAdminView = () => {
    const nextState = !isSuperAdmin;
    adminStore.setSuperAdminAuthenticated(nextState);
    setIsSuperAdmin(nextState);
    adminStore.addAuditLog({
      action: nextState ? 'Switched to Super Admin Role' : 'Switched to Standard Agent Role',
      user: 'Super Admin',
      category: 'auth',
      details: `Active portal session permission changed to ${nextState ? 'Super Admin' : 'Agent'}.`,
    });
  };

  // KPIs
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const activePipelineValue = leads
    .filter((l) => l.status !== 'closed' && l.status !== 'archived')
    .reduce((sum, l) => sum + (l.estimatedValue || 500000), 0);
  const closedVolumeYTD = 18620000;
  const projectedCommission = activePipelineValue * ((settings.defaultCommissionRate || 3.0) / 100);
  const activePropertiesCount = properties.filter((p) => p.status === 'Active').length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.city && l.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.assignedAgentName && l.assignedAgentName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchesPriority = leadPriorityFilter === 'all' || l.priority === leadPriorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Filtered Properties
  const filteredProperties = properties.filter((p) => {
    return propertyCategoryFilter === 'all' || p.category === propertyCategoryFilter;
  });

  // Filtered Audit Logs
  const filteredLogs = auditLogs.filter((log) => {
    return logCategoryFilter === 'all' || log.category === logCategoryFilter;
  });

  // Add Note to Lead
  const handleAddNote = (leadId: string) => {
    if (!newNoteContent.trim()) return;
    adminStore.addLeadNote(leadId, newNoteContent.trim(), isSuperAdmin ? 'Super Admin' : settings.realtorName);
    setNewNoteContent('');
    const updated = adminStore.getLeads().find((l) => l.id === leadId);
    if (updated) setSelectedLead(updated);
  };

  // Reassign Lead Agent
  const handleAssignAgent = (leadId: string, agentId: string) => {
    const targetAgent = team.find((m) => m.id === agentId);
    if (targetAgent) {
      adminStore.assignLeadToAgent(leadId, targetAgent.id, targetAgent.name);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({
          ...selectedLead,
          assignedAgentId: targetAgent.id,
          assignedAgentName: targetAgent.name,
        });
      }
    }
  };

  // Create Lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;
    const assignedAgent = team.find((m) => m.id === newLeadForm.assignedAgentId) || team[0];
    adminStore.addLead({
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      type: newLeadForm.type,
      city: newLeadForm.city,
      estimatedValue: Number(newLeadForm.estimatedValue),
      details: newLeadForm.details || 'Manually added by Super Admin Console.',
      source: 'Super Admin Direct Entry',
      priority: newLeadForm.priority,
      assignedAgentId: assignedAgent ? assignedAgent.id : undefined,
      assignedAgentName: assignedAgent ? assignedAgent.name : undefined,
    });
    setAddLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      type: 'consultation',
      city: 'Carmel',
      estimatedValue: 650000,
      details: '',
      priority: 'high',
      assignedAgentId: team[0]?.id || 'team-1',
    });
  };

  // Create Property
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
      description: newPropForm.description || 'Exclusive Indy Home Collection curated luxury estate.',
      status: 'Active',
      featured: newPropForm.featured,
    });
    setAddPropModalOpen(false);
  };

  // Create Team Member
  const handleCreateTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamForm.name || !newTeamForm.email) return;
    adminStore.addTeamMember({
      name: newTeamForm.name,
      role: newTeamForm.role,
      email: newTeamForm.email,
      phone: newTeamForm.phone,
      avatar: newTeamForm.avatar,
      activeLeads: 0,
      closedVolume: '$0.0M',
      commissionSplit: newTeamForm.commissionSplit,
      status: 'active',
      license: newTeamForm.license,
      bio: newTeamForm.bio,
    });
    setAddTeamModalOpen(false);
    setNewTeamForm({
      name: '',
      role: 'Senior Realtor',
      email: '',
      phone: '(317) 408-9532',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      commissionSplit: '80/20',
      license: 'RS25000000 (Indiana Broker License)',
      bio: '',
    });
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.saveSettings(settings);
    adminStore.addAuditLog({
      action: 'Brokerage Settings Updated',
      user: 'Super Admin',
      category: 'settings',
      details: 'Super Admin saved updated brokerage configuration and phone lines.',
    });
    setSaveSuccessMsg('Settings saved successfully and published to live website!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Save Announcement Bar CMS
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.saveSettings(settings);
    adminStore.addAuditLog({
      action: 'Announcement Broadcast Updated',
      user: 'Super Admin',
      category: 'settings',
      details: `Announcement set to ${settings.announcementActive ? 'ACTIVE' : 'OFF'}: "${settings.announcementText.slice(0, 40)}..."`,
    });
    setSaveSuccessMsg('Live Announcement broadcast updated across public site!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Save Super Admin PIN
  const handleSaveSuperPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSuperPin.length >= 4) {
      const updated = { ...settings, superAdminPin: newSuperPin };
      setSettings(updated);
      adminStore.saveSettings(updated);
      adminStore.addAuditLog({
        action: 'Master Super Admin PIN Changed',
        user: 'Super Admin',
        category: 'auth',
        details: 'Super Admin master security credentials updated.',
      });
      setSaveSuccessMsg('Super Admin Master PIN updated successfully!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  // --------------------------------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#05070B] via-[#0A0D15] to-[#040609] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans-clean">
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-[#0D1322]/95 border border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10 text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <LuxuryLogo variant="markOnly" size={68} isDark={true} />
              <div className="absolute -top-1 -right-1 p-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 shadow-md">
                <Crown className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-luxury-sans font-bold uppercase tracking-[0.25em]">
              <Shield className="w-3 h-3 text-[#D4AF37]" />
              <span>Super Admin Portal · Central Indiana</span>
            </div>

            <h1 className="font-luxury-display text-2xl sm:text-3xl font-normal tracking-[0.2em] text-white uppercase mt-2">
              INDY HOME COLLECTION
            </h1>
            <p className="text-xs text-slate-300 font-light mt-1">
              Brokerage Command, Agent Roster, Leads CRM & Live CMS
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Enter Master Security PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.6em] text-2xl py-3 rounded-2xl bg-[#070A10] border border-[#D4AF37]/40 text-amber-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 transition-all font-mono"
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid PIN. Use 7777 (Super Admin) or 1234 (Agent).
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E8CB7E] to-[#B38936] text-slate-950 font-bold text-xs tracking-widest uppercase shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:brightness-105 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-slate-950" />
              <span>Access Super Admin Console</span>
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleQuickSuperAccess}
                className="px-3 py-2 rounded-xl bg-amber-500/15 border border-[#D4AF37]/50 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-semibold"
                title="Log in with full Root permissions"
              >
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Super Admin (7777)</span>
              </button>
              <button
                onClick={handleQuickAgentAccess}
                className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-medium"
                title="Log in with associate agent view"
              >
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Agent (1234)</span>
              </button>
            </div>

            <div>
              <button
                onClick={onBackToWebsite}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto mt-2"
              >
                ← Return to Public Website
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-slate-500 font-mono">
          Indy Home Collection · Secure Real Estate Enterprise Console
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED SUPER ADMIN PORTAL VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans-clean">
      
      {/* Top Super Admin Master Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F18]/95 border-b border-[#D4AF37]/30 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-lg">
        
        {/* Left: Brand Crest & Super Admin Badge */}
        <div className="flex items-center gap-3">
          <LuxuryLogo variant="markOnly" size={40} isDark={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-luxury-display text-base sm:text-lg font-normal tracking-[0.16em] uppercase text-white">
                INDY HOME COLLECTION
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#D4AF37] to-[#B38936] text-slate-950 uppercase tracking-wider shadow-xs">
                <Crown className="w-3 h-3" />
                <span>{isSuperAdmin ? 'Super Admin' : 'Agent Portal'}</span>
              </span>
            </div>
            <div className="text-[10.5px] text-slate-400 hidden sm:flex items-center gap-2">
              <span>Central Indiana Brokerage Headquarters</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">Live Connected</span>
            </div>
          </div>
        </div>

        {/* Right Tools & Role Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Super Admin Role Toggle */}
          <button
            onClick={toggleSuperAdminView}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isSuperAdmin
                ? 'bg-[#182133] border-[#D4AF37]/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Switch permission perspective between Super Admin and Standard Agent"
          >
            {isSuperAdmin ? <Crown className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Users className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isSuperAdmin ? 'Root: Super Admin' : 'View: Associate Agent'}</span>
          </button>

          {/* Export Full Database Backup */}
          {isSuperAdmin && (
            <button
              onClick={() => adminStore.exportDatabaseBackup()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs text-amber-300 border border-[#D4AF37]/40 transition-colors cursor-pointer shadow-xs"
              title="Download full system JSON snapshot"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>
          )}

          {/* View Public Website */}
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Preview Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Public Site</span>
            <span className="md:hidden">Site</span>
          </button>

          {/* Prompt Studio Switcher */}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Studio</span>
            </button>
          )}

          {/* Lock / Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-xs text-rose-300 border border-rose-800/40 transition-colors cursor-pointer"
            title="Lock Console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Super Admin Navigation Sidebar */}
        <aside className="w-full md:w-68 bg-[#0A0E17] border-r border-[#D4AF37]/25 p-4 shrink-0 flex flex-row md:flex-col justify-between overflow-x-auto gap-4">
          <div className="flex flex-row md:flex-col gap-1.5 w-full">
            
            {/* Tab 1: Executive Command Center */}
            <button
              onClick={() => setActiveTab('command_center')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'command_center'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Command Center</span>
            </button>

            {/* Tab 2: Team & Agent Roster (Super Admin Exclusive) */}
            <button
              onClick={() => setActiveTab('team_management')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'team_management'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Team & Agents</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-950 border border-sky-800/60 text-sky-300 font-semibold">
                {team.length}
              </span>
            </button>

            {/* Tab 3: Leads CRM & Routing */}
            <button
              onClick={() => setActiveTab('leads_crm')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads_crm'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Leads & CRM</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-slate-950">
                  {newLeadsCount}
                </span>
              )}
            </button>

            {/* Tab 4: Property Inventory & Virtual Tours */}
            <button
              onClick={() => setActiveTab('properties_cms')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'properties_cms'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <HomeIcon className="w-4 h-4 text-amber-400" />
                <span>Listing Inventory</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">
                {properties.length}
              </span>
            </button>

            {/* Tab 5: Site Announcement & Broadcast (Super Admin Exclusive) */}
            <button
              onClick={() => setActiveTab('site_broadcast')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'site_broadcast'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4 text-purple-400" />
                <span>Live Broadcast</span>
              </div>
              {settings.announcementActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Banner Live" />
              )}
            </button>

            {/* Tab 6: Reviews & Client Stories */}
            <button
              onClick={() => setActiveTab('reviews_cms')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews_cms'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Client Reviews</span>
              </div>
              {pendingReviewsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  {pendingReviewsCount}
                </span>
              )}
            </button>

            {/* Tab 7: Audit Logs & Security Vault (Super Admin Exclusive) */}
            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'audit_logs'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <History className="w-4 h-4 text-rose-400" />
              <span>Audit Trail & Vault</span>
            </button>

            {/* Tab 8: Brokerage Settings */}
            <button
              onClick={() => setActiveTab('brokerage_settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'brokerage_settings'
                  ? 'bg-amber-500/15 text-amber-300 border border-[#D4AF37]/50 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
              <span>Brokerage Settings</span>
            </button>
          </div>

          {/* Super Admin Status Card */}
          <div className="hidden md:block mt-auto pt-4 border-t border-[#D4AF37]/20">
            <div className="p-3.5 rounded-2xl bg-[#0D1424] border border-[#D4AF37]/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3 text-[#D4AF37]" />
                  <span>Root Authority</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  PIN 7777
                </span>
              </div>
              <div className="font-semibold text-white truncate">{settings.realtorName}</div>
              <div className="text-[10px] text-amber-400/90 font-mono">{settings.realtorPhone}</div>
              <div className="text-[9.5px] text-slate-400 truncate">{settings.licenseNumber}</div>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          
          {/* Success Banner Notification */}
          {saveSuccessMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 flex items-center justify-between gap-3 text-xs shadow-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
              <button onClick={() => setSaveSuccessMsg('')} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 1: EXECUTIVE COMMAND CENTER */}
          {/* ================================================================= */}
          {activeTab === 'command_center' && (
            <div className="space-y-8">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-luxury-sans text-amber-400 tracking-widest uppercase font-semibold">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Executive Command Center</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white mt-1">
                    Brokerage Performance & Live Operations
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAddLeadModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-metallic text-slate-950 text-xs font-luxury-sans font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Lead</span>
                  </button>
                  <button
                    onClick={() => setAddPropModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#131A29] border border-[#D4AF37]/50 text-white text-xs font-luxury-sans font-semibold uppercase tracking-wider hover:bg-[#1A2438] cursor-pointer"
                  >
                    <Building className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add Listing</span>
                  </button>
                </div>
              </div>

              {/* Top 4 Financial & Pipeline Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Portfolio Value</span>
                    <Building className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white">
                    $28,450,000
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.4% MoM Portfolio Growth</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Deal Pipeline</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-luxury-serif text-2xl sm:text-3xl font-normal text-amber-300">
                    ${activePipelineValue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span>{leads.filter((l) => l.status !== 'closed').length} active buyer/seller deals</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Projected Commissions</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white">
                    ${Math.round(projectedCommission).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-300/90">
                    <span>Calculated at {settings.defaultCommissionRate || 3.0}% brokerage split</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Closed Volume YTD</span>
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="font-luxury-serif text-2xl sm:text-3xl font-normal text-white">
                    ${(closedVolumeYTD / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span>42 closed Central Indiana transactions</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Visitor & Engagement Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white font-luxury-serif flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Live Traffic & Digital Inquiries</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real-time visitor interactions across Indianapolis Northside, Westside & Southside
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                      ● 18 Active Right Now
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#131A29] border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Today's Visitors</span>
                      <span className="font-mono text-xl font-bold text-white">1,280</span>
                      <span className="text-[10px] text-emerald-400 block">+18% vs yesterday</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#131A29] border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Virtual Tour Plays</span>
                      <span className="font-mono text-xl font-bold text-amber-300">1,640</span>
                      <span className="text-[10px] text-slate-300 block">Stonegate Manor #1</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#131A29] border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">CMA Valuations</span>
                      <span className="font-mono text-xl font-bold text-sky-400">34</span>
                      <span className="text-[10px] text-sky-300 block">Hamilton & Boone</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#131A29] border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Conversion Rate</span>
                      <span className="font-mono text-xl font-bold text-emerald-400">4.8%</span>
                      <span className="text-[10px] text-slate-300 block">Industry avg: 1.8%</span>
                    </div>
                  </div>

                  {/* Regional Visitor Breakdown */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-slate-300">Traffic by Indiana Submarket:</div>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Carmel & Westfield (Hamilton County)</span>
                          <span className="font-mono font-semibold text-amber-300">38%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E8CB7E] rounded-full" style={{ width: '38%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Fishers & Geist (Hamilton/Hancock)</span>
                          <span className="font-mono font-semibold text-amber-300">26%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E8CB7E] rounded-full" style={{ width: '26%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Zionsville (Boone County)</span>
                          <span className="font-mono font-semibold text-amber-300">18%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E8CB7E] rounded-full" style={{ width: '18%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Out of State Relocation (Chicago, CA, NY)</span>
                          <span className="font-mono font-semibold text-sky-400">18%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full" style={{ width: '18%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Roster Quick Glance */}
                <div className="p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white font-luxury-serif flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-400" />
                      <span>Active Agents</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('team_management')}
                      className="text-xs text-amber-300 hover:text-white underline cursor-pointer"
                    >
                      Manage All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {team.map((member) => (
                      <div
                        key={member.id}
                        className="p-3 rounded-2xl bg-[#131A29] border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/50"
                          />
                          <div>
                            <div className="text-xs font-bold text-white">{member.name}</div>
                            <div className="text-[10px] text-amber-300/80">{member.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-emerald-400">{member.closedVolume}</div>
                          <div className="text-[9.5px] text-slate-400">{member.activeLeads} active leads</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setAddTeamModalOpen(true)}
                    className="w-full py-2.5 rounded-xl border border-dashed border-[#D4AF37]/50 text-amber-300 hover:bg-amber-500/10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Broker / Agent to Team</span>
                  </button>
                </div>
              </div>

              {/* In-Flight High Priority Leads Ready for Follow-up */}
              <div className="p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-luxury-serif flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>Priority Inbound Inquiries</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">High-touch client opportunities requiring 2-hour SLA response</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads_crm')}
                    className="text-xs text-amber-300 hover:text-white underline cursor-pointer"
                  >
                    View CRM Pipeline →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads.slice(0, 3).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-4 rounded-2xl bg-[#131A29] border border-slate-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {lead.priority}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-xs text-amber-300 font-mono mt-0.5">{lead.phone}</div>
                        <div className="text-xs text-slate-400 mt-1 line-clamp-2">{lead.details}</div>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">{lead.city}</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : 'Custom'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: TEAM & AGENT MANAGEMENT (SUPER ADMIN EXCLUSIVE) */}
          {/* ================================================================= */}
          {activeTab === 'team_management' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-luxury-sans text-amber-400 tracking-widest uppercase font-semibold">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Super Admin Roster Command</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white mt-1">
                    Team Members & Associate Realtors
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage agent roles, lead auto-distribution, licenses, and commission splits.
                  </p>
                </div>
                <button
                  onClick={() => setAddTeamModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]/50 shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">{member.name}</h3>
                            {member.role === 'Super Admin' && (
                              <Crown className="w-4 h-4 text-[#D4AF37]" title="Root Super Admin" />
                            )}
                          </div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {member.role}
                          </span>
                          <div className="text-xs text-slate-400 mt-1 font-mono">{member.license}</div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {member.status}
                      </span>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {member.bio}
                      </p>
                    )}

                    <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#131A29] border border-slate-800 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Active Leads</span>
                        <span className="font-mono font-bold text-white">{member.activeLeads}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Closed Volume</span>
                        <span className="font-mono font-bold text-emerald-400">{member.closedVolume}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Split</span>
                        <span className="font-mono font-bold text-amber-300">{member.commissionSplit}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-slate-300">
                        <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="flex items-center gap-1 hover:text-amber-300">
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{member.phone}</span>
                        </a>
                        <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:text-amber-300">
                          <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="truncate max-w-[140px]">{member.email}</span>
                        </a>
                      </div>

                      {member.role !== 'Super Admin' && (
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${member.name} from team roster?`)) {
                              adminStore.deleteTeamMember(member.id);
                            }
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer p-1"
                          title="Remove Team Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: LEADS & CRM PIPELINE */}
          {/* ================================================================= */}
          {activeTab === 'leads_crm' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white">
                    Client Leads & CRM Inquiries
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Centralized pipeline with lead routing, agent assignment, and call notes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adminStore.exportLeadsCSV()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-850 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setAddLeadModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Manual Lead</span>
                  </button>
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client name, phone, city, or assigned agent..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1424] border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-[#0D1424] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="all">All Statuses ({leads.length})</option>
                    <option value="new">New Inbound</option>
                    <option value="contacted">Contacted</option>
                    <option value="showing">Showing Scheduled</option>
                    <option value="under_contract">Under Contract</option>
                    <option value="closed">Closed</option>
                    <option value="archived">Archived</option>
                  </select>

                  <select
                    value={leadPriorityFilter}
                    onChange={(e) => setLeadPriorityFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-[#0D1424] border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 overflow-hidden shadow-luxury-glow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121A2B] text-slate-300 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Client Name</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Inquiry / City</th>
                        <th className="py-3.5 px-4">Est. Value</th>
                        <th className="py-3.5 px-4">Assigned Agent</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#131C2E] transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">
                            <div className="flex items-center gap-2">
                              <span>{lead.name}</span>
                              {lead.priority === 'urgent' && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                  URGENT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            <div className="font-mono text-amber-300">{lead.phone}</div>
                            <div className="text-[10.5px] text-slate-400">{lead.email}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            <span className="capitalize font-semibold text-white">{lead.type}</span>
                            <span className="text-slate-400 block">{lead.city || 'Central Indiana'}</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                            {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '—'}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.assignedAgentId || team[0]?.id}
                              onChange={(e) => handleAssignAgent(lead.id, e.target.value)}
                              className="px-2 py-1 rounded-lg bg-[#182236] border border-slate-700 text-xs text-amber-300 focus:outline-none cursor-pointer"
                            >
                              {team.map((m) => (
                                <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                                  {m.name} ({m.role.split(' ')[0]})
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => adminStore.updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="px-2 py-1 rounded-lg bg-[#182236] border border-slate-700 text-xs text-white focus:outline-none cursor-pointer"
                            >
                              <option value="new">New Inbound</option>
                              <option value="contacted">Contacted</option>
                              <option value="showing">Showing Scheduled</option>
                              <option value="under_contract">Under Contract</option>
                              <option value="closed">Closed Deal</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-3 py-1.5 rounded-lg bg-[#182133] border border-[#D4AF37]/40 text-amber-300 hover:text-white hover:bg-slate-800 text-xs font-medium cursor-pointer"
                            >
                              View Notes ({lead.notes?.length || 0})
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: PROPERTY INVENTORY & VIRTUAL TOURS */}
          {/* ================================================================= */}
          {activeTab === 'properties_cms' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white">
                    Property Inventory & Virtual 3D Tours
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage active listings, pending escrows, and featured home highlights.
                  </p>
                </div>
                <button
                  onClick={() => setAddPropModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Luxury Property</span>
                </button>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 overflow-hidden shadow-luxury-glow flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-[#D4AF37]/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                        {prop.status}
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                        {prop.city}, IN
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="font-luxury-serif text-xl font-bold text-amber-300">
                          {prop.price}
                        </div>
                        <h3 className="font-serif-luxury text-sm font-semibold text-white mt-0.5">
                          {prop.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {prop.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs text-slate-300">
                        <div>
                          <span className="font-mono font-bold text-white block">{prop.beds}</span>
                          <span className="text-[10px] text-slate-400">Beds</span>
                        </div>
                        <div>
                          <span className="font-mono font-bold text-white block">{prop.baths}</span>
                          <span className="text-[10px] text-slate-400">Baths</span>
                        </div>
                        <div>
                          <span className="font-mono font-bold text-white block">{prop.sqft}</span>
                          <span className="text-[10px] text-slate-400">Sq Ft</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <select
                          value={prop.status}
                          onChange={(e) => adminStore.updateProperty(prop.id, { status: e.target.value as any })}
                          className="px-2 py-1 rounded-lg bg-[#182236] border border-slate-700 text-xs text-white cursor-pointer"
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold">Sold</option>
                          <option value="Coming Soon">Coming Soon</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete listing "${prop.title}"?`)) {
                              adminStore.deleteProperty(prop.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                          title="Delete Listing"
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

          {/* ================================================================= */}
          {/* TAB 5: LIVE SITE CMS & VIP BROADCAST (SUPER ADMIN EXCLUSIVE) */}
          {/* ================================================================= */}
          {activeTab === 'site_broadcast' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-luxury-sans text-amber-400 tracking-widest uppercase font-semibold">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Real-Time Public Site CMS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white mt-1">
                    Live Broadcast & Global Dispatch Banner
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Control what appears at the very top of the live website for all visitors.
                  </p>
                </div>
              </div>

              {/* Announcement Bar Settings Card */}
              <form onSubmit={handleSaveAnnouncement} className="p-6 sm:p-8 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-[#D4AF37]" />
                      <span>Top Header Announcement Bar</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      When enabled, displays an ultra-luxury gold banner across the top of all public pages.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.announcementActive}
                      onChange={(e) => setSettings({ ...settings, announcementActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Announcement Text Headline
                    </label>
                    <input
                      type="text"
                      value={settings.announcementText}
                      onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                      placeholder="e.g., Exclusive Spring VIP Previews: Private walkthroughs open in Carmel this weekend."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Call-to-Action Link Text
                      </label>
                      <input
                        type="text"
                        value={settings.announcementLinkText}
                        onChange={(e) => setSettings({ ...settings, announcementLinkText: e.target.value })}
                        placeholder="e.g., Schedule VIP Tour"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Link URL / Anchor Target
                      </label>
                      <input
                        type="text"
                        value={settings.announcementLinkUrl}
                        onChange={(e) => setSettings({ ...settings, announcementLinkUrl: e.target.value })}
                        placeholder="e.g., #contact or https://..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview Banner */}
                <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Live Banner Preview (What Visitors See):
                  </span>
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#0C121E] via-[#1E170A] to-[#0C121E] border border-[#D4AF37]/50 text-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 mx-auto">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#997928] text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                        VIP Broadcast
                      </span>
                      <span className="text-slate-200 font-medium">{settings.announcementText}</span>
                      <span className="text-amber-300 underline font-semibold ml-1">{settings.announcementLinkText} →</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                  >
                    Publish Broadcast Live
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: CLIENT REVIEWS & STORIES */}
          {/* ================================================================= */}
          {activeTab === 'reviews_cms' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white">
                    Client Testimonials & Stories
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Approve, feature, and manage authentic 5-star real estate reviews.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                        {rev.status}
                      </span>
                    </div>

                    <h4 className="font-serif-luxury text-base font-bold text-white">
                      {rev.headline}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {rev.story}
                    </p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{rev.clientName}</div>
                        <div className="text-[10px] text-amber-300">{rev.transactionType} · {rev.location}</div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Delete review from ${rev.clientName}?`)) {
                            adminStore.deleteReview(rev.id);
                          }
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 7: AUDIT TRAIL & SECURITY VAULT (SUPER ADMIN EXCLUSIVE) */}
          {/* ================================================================= */}
          {activeTab === 'audit_logs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-luxury-sans text-amber-400 tracking-widest uppercase font-semibold">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Security Vault & Compliance</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white mt-1">
                    System Audit Trail & Master Credentials
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adminStore.exportDatabaseBackup()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Backup (JSON)</span>
                  </button>
                </div>
              </div>

              {/* Master Security PIN Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form onSubmit={handleSaveSuperPin} className="p-6 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-4">
                  <h3 className="text-base font-bold text-white font-luxury-serif flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Master Super Admin PIN</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    This PIN grants root access to all financial KPIs, agent rosters, and database backups.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      New Super Admin PIN (Minimum 4 digits)
                    </label>
                    <input
                      type="password"
                      maxLength={8}
                      value={newSuperPin}
                      onChange={(e) => setNewSuperPin(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-amber-300 font-mono text-lg tracking-widest focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-[#D4AF37]/40 text-amber-300 hover:text-white hover:bg-slate-850 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Update Master PIN
                  </button>
                </form>

                {/* Reset & Emergency Restore */}
                <div className="p-6 rounded-3xl bg-[#0E1422] border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white font-luxury-serif flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-400" />
                    <span>Database Reset & Restore</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Reset demo central Indiana properties and sample leads back to initial state.
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore initial demo data?')) {
                          adminStore.resetAll();
                          alert('Database reset to fresh state.');
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold cursor-pointer"
                    >
                      Reset All Data to Factory Default
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Logs List */}
              <div className="rounded-3xl bg-[#0E1422] border border-[#D4AF37]/30 overflow-hidden shadow-luxury-glow">
                <div className="p-4 bg-[#121A2B] border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">Chronological Audit Log</span>
                  </div>
                  <select
                    value={logCategoryFilter}
                    onChange={(e) => setLogCategoryFilter(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-[#182236] border border-slate-700 text-xs text-slate-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="auth">Auth & Sessions</option>
                    <option value="lead">Leads & CRM</option>
                    <option value="property">Property Listings</option>
                    <option value="team">Team Management</option>
                    <option value="settings">Settings & CMS</option>
                  </select>
                </div>

                <div className="divide-y divide-slate-800/80 max-h-96 overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-[#131C2E] transition-colors flex items-start justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9.5px] uppercase font-mono bg-slate-800 text-slate-300">
                            {log.category}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">{log.details}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono text-amber-300/80 text-[11px]">{log.user}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 8: BROKERAGE & LEGAL SETTINGS */}
          {/* ================================================================= */}
          {activeTab === 'brokerage_settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-luxury-serif text-white">
                  Brokerage & Compliance Configuration
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Public profile details, license disclosures, and alert preferences.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-[#0E1422] border border-[#D4AF37]/35 shadow-luxury-glow space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Realtor / Team Entity Name
                    </label>
                    <input
                      type="text"
                      value={settings.realtorName}
                      onChange={(e) => setSettings({ ...settings, realtorName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Principal Title
                    </label>
                    <input
                      type="text"
                      value={settings.realtorTitle}
                      onChange={(e) => setSettings({ ...settings, realtorTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Brokerage Phone Line
                    </label>
                    <input
                      type="text"
                      value={settings.realtorPhone}
                      onChange={(e) => setSettings({ ...settings, realtorPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.realtorEmail}
                      onChange={(e) => setSettings({ ...settings, realtorEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Indiana Real Estate License Disclosure
                    </label>
                    <input
                      type="text"
                      value={settings.licenseNumber}
                      onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Principal Office Address
                    </label>
                    <input
                      type="text"
                      value={settings.officeAddress}
                      onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#131A29] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider shadow-luxury-glow hover:opacity-95 cursor-pointer"
                  >
                    Save Brokerage Profile
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* ================================================================= */}
      {/* MODAL 1: ADD MANUAL LEAD */}
      {/* ================================================================= */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1424] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-luxury-serif text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#D4AF37]" />
                <span>New Client Lead Entry</span>
              </h3>
              <button onClick={() => setAddLeadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g., Harpreet & Simran Boparai"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="(317) 408-9532"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Target Indiana City</label>
                  <select
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Carmel">Carmel</option>
                    <option value="Fishers">Fishers</option>
                    <option value="Zionsville">Zionsville</option>
                    <option value="Westfield">Westfield</option>
                    <option value="Noblesville">Noblesville</option>
                    <option value="Avon">Avon</option>
                    <option value="Brownsburg">Brownsburg</option>
                    <option value="Greenwood">Greenwood</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Estimated Budget / Value ($)</label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Assign Lead to Agent</label>
                <select
                  value={newLeadForm.assignedAgentId}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, assignedAgentId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-amber-300 focus:outline-none"
                >
                  {team.map((m) => (
                    <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                      {m.name} — {m.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Lead Notes / Requirements</label>
                <textarea
                  rows={2}
                  value={newLeadForm.details}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, details: e.target.value })}
                  placeholder="Looking for 4 bedrooms in Carmel Clay schools with basement..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-metallic text-slate-950 font-bold uppercase tracking-wider"
                >
                  Create & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 2: ADD NEW PROPERTY LISTING */}
      {/* ================================================================= */}
      {addPropModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1424] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-luxury-serif text-xl font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-[#D4AF37]" />
                <span>Add Luxury Property Listing</span>
              </h3>
              <button onClick={() => setAddPropModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">Listing Title *</label>
                <input
                  type="text"
                  required
                  value={newPropForm.title}
                  onChange={(e) => setNewPropForm({ ...newPropForm, title: e.target.value })}
                  placeholder="e.g., The Bridgewater Club Modern Villa"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">List Price ($) *</label>
                  <input
                    type="text"
                    required
                    value={newPropForm.price}
                    onChange={(e) => {
                      const num = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                      setNewPropForm({
                        ...newPropForm,
                        price: e.target.value,
                        priceNumber: num,
                      });
                    }}
                    placeholder="$850,000"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">City</label>
                  <input
                    type="text"
                    value={newPropForm.city}
                    onChange={(e) => setNewPropForm({ ...newPropForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Beds</label>
                  <input
                    type="number"
                    value={newPropForm.beds}
                    onChange={(e) => setNewPropForm({ ...newPropForm, beds: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Baths</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newPropForm.baths}
                    onChange={(e) => setNewPropForm({ ...newPropForm, baths: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Sq Ft</label>
                  <input
                    type="number"
                    value={newPropForm.sqft}
                    onChange={(e) => setNewPropForm({ ...newPropForm, sqft: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">High-Res Image URL</label>
                <input
                  type="text"
                  value={newPropForm.image}
                  onChange={(e) => setNewPropForm({ ...newPropForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newPropForm.description}
                  onChange={(e) => setNewPropForm({ ...newPropForm, description: e.target.value })}
                  placeholder="Gourmet chef kitchen, spa primary bath, walk-out basement..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddPropModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-metallic text-slate-950 font-bold uppercase tracking-wider"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 3: ADD NEW TEAM MEMBER (SUPER ADMIN) */}
      {/* ================================================================= */}
      {addTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1424] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-luxury-serif text-xl font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#D4AF37]" />
                <span>Add Associate Realtor or Staff</span>
              </h3>
              <button onClick={() => setAddTeamModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeamMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">Agent Full Name *</label>
                <input
                  type="text"
                  required
                  value={newTeamForm.name}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, name: e.target.value })}
                  placeholder="e.g., Harpreet Kaur"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Role</label>
                  <select
                    value={newTeamForm.role}
                    onChange={(e) => setNewTeamForm({ ...newTeamForm, role: e.target.value as TeamMemberRole })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Managing Broker">Managing Broker</option>
                    <option value="Senior Realtor">Senior Realtor</option>
                    <option value="Buyer Specialist">Buyer Specialist</option>
                    <option value="Transaction Coordinator">Transaction Coordinator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Commission Split</label>
                  <input
                    type="text"
                    value={newTeamForm.commissionSplit}
                    onChange={(e) => setNewTeamForm({ ...newTeamForm, commissionSplit: e.target.value })}
                    placeholder="80/20"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newTeamForm.phone}
                    onChange={(e) => setNewTeamForm({ ...newTeamForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newTeamForm.email}
                    onChange={(e) => setNewTeamForm({ ...newTeamForm, email: e.target.value })}
                    placeholder="agent@indyhomecollection.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Indiana Real Estate License #</label>
                <input
                  type="text"
                  value={newTeamForm.license}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, license: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">Specialties & Bio</label>
                <textarea
                  rows={2}
                  value={newTeamForm.bio}
                  onChange={(e) => setNewTeamForm({ ...newTeamForm, bio: e.target.value })}
                  placeholder="Relocation specialist, Carmel Clay neighborhood guide..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-metallic text-slate-950 font-bold uppercase tracking-wider"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 4: LEAD DETAILS & CALL TIMELINE */}
      {/* ================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1424] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300">
                  {selectedLead.priority} Priority
                </span>
                <h3 className="font-luxury-serif text-xl font-bold text-white mt-1">
                  {selectedLead.name}
                </h3>
                <div className="text-xs text-amber-300 font-mono">{selectedLead.phone} · {selectedLead.email}</div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#131A29] border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Inquiry Type:</span>
                <span className="font-semibold text-white capitalize">{selectedLead.type}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Location:</span>
                <span className="font-semibold text-white">{selectedLead.city || 'Central Indiana'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Value:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {selectedLead.estimatedValue ? `$${selectedLead.estimatedValue.toLocaleString()}` : 'Custom'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Assigned To:</span>
                <span className="font-semibold text-amber-300">{selectedLead.assignedAgentName || 'Unassigned'}</span>
              </div>
              <p className="text-slate-300 pt-1 text-xs border-t border-slate-800">
                {selectedLead.details}
              </p>
            </div>

            {/* Direct Call & Email Actions */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${selectedLead.phone.replace(/\D/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-emerald-900/60 border border-emerald-600/40 text-emerald-200 hover:bg-emerald-800 flex items-center justify-center gap-1.5 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
              <a
                href={`mailto:${selectedLead.email}`}
                className="py-2.5 px-3 rounded-xl bg-sky-900/60 border border-sky-600/40 text-sky-200 hover:bg-sky-800 flex items-center justify-center gap-1.5 font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Notes & Timeline */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Internal Client Notes ({selectedLead.notes?.length || 0})</span>
              </h4>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Add private update (e.g., Scheduled tour for Friday)..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#131A29] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={() => handleAddNote(selectedLead.id)}
                  className="px-3.5 py-2 rounded-xl bg-gold-metallic text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Add Note
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.notes?.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#131A29] border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-semibold text-amber-300">{n.author}</span>
                      <span className="font-mono">{new Date(n.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-200">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
