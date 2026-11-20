import { LeadItem, PropertyListingItem, ReviewItem, AdminSettingsData, LeadStatus, LeadPriority, TeamMember, AuditLogEntry } from '../types';
import { ASSET_IMAGES } from '../assets/imagesMap';

const STORAGE_KEYS = {
  LEADS: 'indy_admin_leads_v1',
  PROPERTIES: 'indy_admin_properties_v1',
  REVIEWS: 'indy_admin_reviews_v1',
  SETTINGS: 'indy_admin_settings_v1',
  AUTH: 'indy_admin_auth_v1',
  SUPER_AUTH: 'indy_admin_super_auth_v1',
  TEAM: 'indy_admin_team_v1',
  LOGS: 'indy_admin_logs_v1',
};

// Initial Realistic Leads for Central Indiana
const DEFAULT_LEADS: LeadItem[] = [
  {
    id: 'lead-101',
    name: 'Gurinder & Priya Sandhu',
    phone: '(317) 555-0142',
    email: 'gurinder.sandhu@example.com',
    type: 'consultation',
    source: 'Website - Private Consultation',
    city: 'Carmel',
    preferredDate: '2026-11-15',
    preferredTime: 'Morning (9 AM - 12 PM)',
    estimatedValue: 850000,
    details: 'Looking for a 4-5 bedroom home in Carmel Clay Schools near Clay Terrace or Monon Trail. Pre-approved for $900k.',
    status: 'new',
    priority: 'urgent',
    createdAt: '2026-11-12T07:15:00.000Z',
    notes: [
      {
        id: 'n-1',
        author: 'Realtor',
        content: 'Relocating from Chicago suburbs in January for Eli Lilly contract. Needs quick school registration.',
        timestamp: '2026-11-12T07:30:00.000Z',
      },
    ],
  },
  {
    id: 'lead-102',
    name: 'Dr. Michael & Sarah Vance',
    phone: '(317) 555-8831',
    email: 'm.vance.md@example.com',
    type: 'valuation',
    source: 'Instant Valuation Tool',
    city: 'Zionsville',
    estimatedValue: 1250000,
    details: '4,800 sqft Custom Brick Estate in Village of Zionsville. Upgraded walk-out basement, heated pool, 3-car garage.',
    status: 'contacted',
    priority: 'high',
    createdAt: '2026-11-11T19:40:00.000Z',
    notes: [
      {
        id: 'n-2',
        author: 'Realtor',
        content: 'Left voicemail with CMA estimate breakdown. Scheduled follow-up walk-through for Friday at 4 PM.',
        timestamp: '2026-11-11T20:10:00.000Z',
      },
    ],
  },
  {
    id: 'lead-103',
    name: 'Amit & Neha Sharma',
    phone: '(317) 555-4921',
    email: 'amit.sharma.re@example.com',
    type: 'investment',
    source: 'Investment ROI Calculator',
    city: 'Fishers',
    estimatedValue: 460000,
    details: 'Interested in acquiring 2-3 single-family rentals in Fishers / Noblesville area. Looking for cap rate > 7.5%.',
    status: 'showing',
    priority: 'high',
    createdAt: '2026-11-10T14:22:00.000Z',
    notes: [
      {
        id: 'n-3',
        author: 'Realtor',
        content: 'Sent off-market inventory packet with 3 turnkey tenant-occupied duplexes in Hamilton County.',
        timestamp: '2026-11-10T15:00:00.000Z',
      },
    ],
  },
  {
    id: 'lead-104',
    name: 'Rajveer & Jasleen Cheema',
    phone: '(317) 555-3392',
    email: 'jasleen.cheema@example.com',
    type: 'showing',
    source: 'Video Tour - Stonegate Manor',
    city: 'Zionsville',
    preferredDate: '2026-11-14',
    preferredTime: 'Afternoon (1 PM - 4 PM)',
    estimatedValue: 1875000,
    details: 'Requested private weekend tour of The Stonegate Grand Manor & Grounds. Cash buyers, proofs on file.',
    status: 'showing',
    priority: 'urgent',
    createdAt: '2026-11-09T11:05:00.000Z',
    notes: [
      {
        id: 'n-4',
        author: 'Realtor',
        content: 'Listing agent confirmed access for Saturday 2:00 PM. Private car gate code provided.',
        timestamp: '2026-11-09T16:20:00.000Z',
      },
    ],
  },
  {
    id: 'lead-105',
    name: 'Kevin O’Connor',
    phone: '(317) 555-7190',
    email: 'kevin.oconnor@example.com',
    type: 'contact',
    source: 'Website Contact Form',
    city: 'Avon',
    estimatedValue: 310000,
    details: 'First-time home buyer looking in Avon or Brownsburg. Has questions about down payment assistance programs.',
    status: 'under_contract',
    priority: 'normal',
    createdAt: '2026-11-05T09:45:00.000Z',
    notes: [
      {
        id: 'n-5',
        author: 'Realtor',
        content: 'Offer accepted on Prairie View Craftsman at $289,500. Inspection scheduled for Monday.',
        timestamp: '2026-11-08T18:00:00.000Z',
      },
    ],
  },
  {
    id: 'lead-106',
    name: 'Sukhdeep & Harleen Gill',
    phone: '(317) 555-9012',
    email: 'sukhdeep.gill@example.com',
    type: 'consultation',
    source: 'Direct Client Referral',
    city: 'Greenwood',
    estimatedValue: 520000,
    details: 'Relocated from Queens, NY. Closed on southside lakefront home last week with us.',
    status: 'closed',
    priority: 'normal',
    createdAt: '2026-10-20T16:00:00.000Z',
    notes: [
      {
        id: 'n-6',
        author: 'Realtor',
        content: 'Successfully closed and handed over keys! Client submitted verified 5-star review.',
        timestamp: '2026-11-02T12:00:00.000Z',
      },
    ],
  },
];

// Initial Properties
const DEFAULT_PROPERTIES: PropertyListingItem[] = [
  {
    id: 'prop-1',
    title: 'The Stonegate Grand Manor & Grounds',
    category: 'luxury',
    categoryLabel: 'Luxury Big Homes & Estates',
    price: '$1,875,000',
    priceNumber: 1875000,
    city: 'Zionsville',
    county: 'Boone County',
    beds: 6,
    baths: 7.5,
    sqft: 7850,
    lotSize: '2.4 Wooded Acres',
    style: 'Custom European Stone & Timber Estate',
    image: ASSET_IMAGES.luxuryEstateLarge,
    status: 'Active',
    featured: true,
    description: 'Dramatic soaring timber-beamed foyer, custom limestone fireplaces, private primary retreat with dual spa baths, wine cellar, and circular cobblestone motor court surrounded by old-growth Indiana hardwoods.',
  },
  {
    id: 'prop-2',
    title: 'The Prairie View Garden Craftsman',
    category: 'small',
    categoryLabel: 'Charming Small Homes & Cottages',
    price: '$289,500',
    priceNumber: 289500,
    city: 'Avon',
    county: 'Hendricks County',
    beds: 3,
    baths: 2,
    sqft: 1680,
    lotSize: '0.28 Acre Landscaped Lot',
    style: 'Charming Bungalow Craftsman',
    image: ASSET_IMAGES.cozySmallHome,
    status: 'Pending',
    featured: false,
    description: 'Warm welcoming front porch with artisan rocking chairs, manicured perennial flowerbeds, sunny open living room with oak hardwood floors, updated butcher-block kitchen, and private fenced backyard.',
  },
  {
    id: 'prop-3',
    title: 'The Grand Junction Modern Farmhouse',
    category: 'new',
    categoryLabel: 'New Construction & Modern Builds',
    price: '$645,000',
    priceNumber: 645000,
    city: 'Westfield',
    county: 'Hamilton County',
    beds: 4,
    baths: 3.5,
    sqft: 3450,
    lotSize: '0.35 Acre Corner Lot',
    style: 'Modern Farmhouse New Construction',
    image: ASSET_IMAGES.modernNewConstruction,
    status: 'Active',
    featured: true,
    description: 'Crisp black board-and-batten accents, massive quartz waterfall island, walk-in scullery pantry, primary suite with freestanding soak tub, and covered rear patio with gas fireplace overlooking conservation greenspace.',
  },
  {
    id: 'prop-4',
    title: 'The Heartland Traditions Heritage Estate',
    category: 'family',
    categoryLabel: 'Spacious Multi-Gen Family Brick Homes',
    price: '$498,000',
    priceNumber: 498000,
    city: 'Fishers',
    county: 'Hamilton County',
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSize: '0.42 Acre Cul-de-Sac Lot',
    style: 'Classic Executive Red Brick Two-Story',
    image: ASSET_IMAGES.largeFamilyBrick,
    status: 'Active',
    featured: false,
    description: 'Grand center-hall colonial layout, expansive sun-drenched breakfast room, dedicated main-level in-law or guest suite, finished daylight basement with wet bar, and mature shade trees on a quiet child-safe cul-de-sac.',
  },
];

// Initial Reviews
const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Harpreet & Simran Boparai',
    location: 'Carmel, IN',
    county: 'Hamilton County',
    transactionType: 'Relocation & Luxury Purchase ($880K)',
    purchasePrice: '$880,000',
    headline: '“Found Us an Off-Market Dream in Carmel Clay Schools Within 2 Weeks”',
    story: 'Moving from the East Coast with two young children, we needed someone who understood not just floor plans, but school zoning, quiet cul-de-sacs, and our Punjabi community connections. They were patient, incredibly knowledgeable, and negotiated $25,000 below asking with brand new roof concessions.',
    closingStatement: '“She treated our family like her own family from day one.”',
    rating: 5,
    status: 'approved',
    date: '2026-10-14',
  },
  {
    id: 'rev-2',
    clientName: 'Dr. Rajesh & Sunita Patel',
    location: 'Zionsville, IN',
    county: 'Boone County',
    transactionType: 'Custom Estate Purchase ($1.25M)',
    purchasePrice: '$1,250,000',
    headline: '“Flawless Confidential Guidance on Our Custom Zionsville Estate”',
    story: 'As physicians with unpredictable hospital shifts, we required high-touch coordination and absolute discretion. They scheduled private twilight tours, vetted structural inspectors, and navigated complex HOA covenants effortlessly.',
    closingStatement: '“A consummate professional with an unmatched Hoosier heart.”',
    rating: 5,
    status: 'approved',
    date: '2026-10-28',
  },
  {
    id: 'rev-3',
    clientName: 'Gurjit & Manpreet Dhillon',
    location: 'Avon, IN',
    county: 'Hendricks County',
    transactionType: 'First-Time Home Purchase ($395K)',
    purchasePrice: '$395,000',
    headline: '“Made First-Time Buying Seamless with Complete Punjabi Explanations”',
    story: 'Being our first home in America, my parents had many questions regarding inspections, earnest money, and closing escrow. They explained every document clearly in Punjabi and English, ensuring complete peace of mind.',
    closingStatement: '“No pressure, total transparency, and honest advice throughout.”',
    rating: 5,
    status: 'approved',
    date: '2026-11-04',
  },
];

// Initial Team Members for Super Admin Roster
const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Indy Executive Broker',
    role: 'Super Admin',
    email: 'broker@indyhomecollection.com',
    phone: '(317) 408-9532',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    activeLeads: 8,
    closedVolume: '$14.2M',
    commissionSplit: '100%',
    status: 'active',
    license: 'RB24001988 (Indiana Principal Broker)',
    bio: 'Founder & Principal Managing Broker overseeing Central Indiana luxury real estate portfolio and investment developments.',
  },
  {
    id: 'team-2',
    name: 'Navjot Singh',
    role: 'Senior Realtor',
    email: 'navjot@indyhomecollection.com',
    phone: '(317) 408-9532',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    activeLeads: 5,
    closedVolume: '$8.6M',
    commissionSplit: '85/15',
    status: 'active',
    license: 'RS21004812 (Hamilton County Specialist)',
    bio: 'Carmel & Fishers luxury residential specialist, multilingual relocation advisor for Northside communities.',
  },
  {
    id: 'team-3',
    name: 'Elena Rostova',
    role: 'Buyer Specialist',
    email: 'elena@indyhomecollection.com',
    phone: '(317) 408-9532',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    activeLeads: 6,
    closedVolume: '$5.4M',
    commissionSplit: '80/20',
    status: 'active',
    license: 'RS22009140 (Boone & Hendricks Specialist)',
    bio: 'Zionsville, Brownsburg & Avon buyer advisor, master negotiator on new construction and estate acreage.',
  },
  {
    id: 'team-4',
    name: 'Marcus Vance',
    role: 'Transaction Coordinator',
    email: 'closing@indyhomecollection.com',
    phone: '(317) 408-9532',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    activeLeads: 12,
    closedVolume: '$28.2M Managed',
    commissionSplit: 'Salary + Bonus',
    status: 'active',
    license: 'TC-IN-9941 (Certified Escrow Coordinator)',
    bio: 'Manages title escrow, earnest deposits, home inspections, and closing contingencies from contract to keys.',
  },
];

// Initial Audit Logs
const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    action: 'Lead Captured via CMA Tool',
    user: 'System Webhook',
    timestamp: '2026-11-19T17:40:00.000Z',
    category: 'lead',
    details: 'Dr. Michael & Sarah Vance submitted $1,250,000 Zionsville home valuation inquiry.',
  },
  {
    id: 'log-2',
    action: 'Super Admin Elevated Session',
    user: 'Super Admin',
    timestamp: '2026-11-19T16:15:00.000Z',
    category: 'auth',
    details: 'Master PIN authorization verified for root administrator access.',
  },
  {
    id: 'log-3',
    action: 'Listing Price Updated',
    user: 'Navjot Singh',
    timestamp: '2026-11-18T20:30:00.000Z',
    category: 'property',
    details: 'Price improved for The Grand Junction Modern Farmhouse ($645,000).',
  },
  {
    id: 'log-4',
    action: 'Site Broadcast Banner Published',
    user: 'Super Admin',
    timestamp: '2026-11-18T14:10:00.000Z',
    category: 'settings',
    details: 'Activated top announcement banner for Carmel Lakefront preview tours.',
  },
  {
    id: 'log-5',
    action: 'Lead Assigned to Agent',
    user: 'Super Admin',
    timestamp: '2026-11-17T11:20:00.000Z',
    category: 'team',
    details: 'Assigned Lead #101 (Gurinder Sandhu) to Navjot Singh for Carmel Clay tour.',
  },
];

// Default Settings
const DEFAULT_SETTINGS: AdminSettingsData = {
  realtorName: 'Indy Home Collection Team',
  realtorTitle: 'Principal Realtor & Founder',
  realtorPhone: '(317) 408-9532',
  realtorEmail: 'contact@indyhomecollection.com',
  licenseNumber: 'RB24001988 (Indiana Real Estate Commission)',
  brokerage: 'Indy Home Collection Real Estate Group',
  officeAddress: '11555 N Meridian St, Suite 400, Carmel, IN 46032',
  emailAlerts: true,
  smsAlerts: true,
  autoAssignNewLeads: true,
  dailyDigest: true,
  announcementActive: true,
  announcementText: 'Exclusive Spring Previews: Private VIP walkthroughs open in Carmel & Zionsville this weekend.',
  announcementLinkText: 'Schedule VIP Tour',
  announcementLinkUrl: '#contact',
  maintenanceMode: false,
  leadAutoRouting: true,
  superAdminPin: '948261',
  superAdminPassword: 'Indy#Luxury@Estate!2026',
  currency: 'USD ($)',
  defaultCommissionRate: 3.0,
};

// Dispatch Custom Event for live synchronization across components
function notifyUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('indy_admin_data_changed'));
  }
}

export const adminStore = {
  // --- LEADS ---
  getLeads(): LeadItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_LEADS;
  },

  saveLeads(leads: LeadItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  addLead(lead: Omit<LeadItem, 'id' | 'createdAt' | 'notes' | 'status' | 'priority'> & Partial<LeadItem>): LeadItem {
    const leads = this.getLeads();
    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      type: lead.type || 'consultation',
      source: lead.source || 'Website Form',
      city: lead.city || 'Greater Indianapolis',
      preferredDate: lead.preferredDate,
      preferredTime: lead.preferredTime,
      estimatedValue: lead.estimatedValue,
      details: lead.details || 'New inbound lead from web portal.',
      status: lead.status || 'new',
      priority: lead.priority || 'high',
      createdAt: new Date().toISOString(),
      notes: lead.notes || [],
    };

    leads.unshift(newLead);
    this.saveLeads(leads);
    return newLead;
  },

  updateLeadStatus(id: string, status: LeadStatus): void {
    const leads = this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      this.saveLeads(leads);
    }
  },

  updateLeadPriority(id: string, priority: LeadPriority): void {
    const leads = this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx].priority = priority;
      this.saveLeads(leads);
    }
  },

  addLeadNote(leadId: string, content: string, author: string = 'Realtor'): void {
    const leads = this.getLeads();
    const lead = leads.find((l) => l.id === leadId);
    if (lead) {
      const newNote = {
        id: `note-${Date.now()}`,
        author,
        content,
        timestamp: new Date().toISOString(),
      };
      lead.notes = [newNote, ...(lead.notes || [])];
      this.saveLeads(leads);
    }
  },

  deleteLead(id: string): void {
    const leads = this.getLeads().filter((l) => l.id !== id);
    this.saveLeads(leads);
  },

  // --- PROPERTIES ---
  getProperties(): PropertyListingItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROPERTIES;
  },

  saveProperties(props: PropertyListingItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(props));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  addProperty(property: Omit<PropertyListingItem, 'id'>): PropertyListingItem {
    const properties = this.getProperties();
    const newProp: PropertyListingItem = {
      id: `prop-${Date.now()}`,
      ...property,
    };
    properties.unshift(newProp);
    this.saveProperties(properties);
    return newProp;
  },

  updateProperty(id: string, updates: Partial<PropertyListingItem>): void {
    const properties = this.getProperties();
    const idx = properties.findIndex((p) => p.id === id);
    if (idx !== -1) {
      properties[idx] = { ...properties[idx], ...updates };
      this.saveProperties(properties);
    }
  },

  deleteProperty(id: string): void {
    const properties = this.getProperties().filter((p) => p.id !== id);
    this.saveProperties(properties);
  },

  // --- REVIEWS ---
  getReviews(): ReviewItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_REVIEWS;
  },

  saveReviews(reviews: ReviewItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  addReview(review: Omit<ReviewItem, 'id' | 'date'> & { date?: string }): ReviewItem {
    const reviews = this.getReviews();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      date: review.date || new Date().toISOString().split('T')[0],
      ...review,
    };
    reviews.unshift(newRev);
    this.saveReviews(reviews);
    return newRev;
  },

  updateReviewStatus(id: string, status: 'approved' | 'pending' | 'archived'): void {
    const reviews = this.getReviews();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx !== -1) {
      reviews[idx].status = status;
      this.saveReviews(reviews);
    }
  },

  deleteReview(id: string): void {
    const reviews = this.getReviews().filter((r) => r.id !== id);
    this.saveReviews(reviews);
  },

  // --- SETTINGS ---
  getSettings(): AdminSettingsData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: AdminSettingsData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  // --- AUTH STATUS ---
  isAuthenticated(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  },

  setAuthenticated(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, val ? 'true' : 'false');
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  // --- EXPORT TO CSV ---
  exportLeadsCSV(): void {
    const leads = this.getLeads();
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Type', 'City', 'Est Value', 'Status', 'Priority', 'Source', 'Details'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.type}"`,
      `"${l.city || ''}"`,
      `"${l.estimatedValue ? '$' + l.estimatedValue.toLocaleString() : ''}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.source}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `indy-home-collection-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // --- SUPER ADMIN AUTH STATUS ---
  isSuperAdminAuthenticated(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.SUPER_AUTH) === 'true';
    } catch {
      return false;
    }
  },

  setSuperAdminAuthenticated(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SUPER_AUTH, val ? 'true' : 'false');
      if (val) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      }
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  // --- TEAM / AGENT MANAGEMENT (SUPER ADMIN) ---
  getTeam(): TeamMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TEAM;
  },

  saveTeam(team: TeamMember[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
    const team = this.getTeam();
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      ...member,
    };
    team.push(newMember);
    this.saveTeam(team);
    this.addAuditLog({
      action: 'Team Member Added',
      user: 'Super Admin',
      category: 'team',
      details: `Added ${newMember.name} as ${newMember.role}.`,
    });
    return newMember;
  },

  updateTeamMember(id: string, updates: Partial<TeamMember>): void {
    const team = this.getTeam();
    const idx = team.findIndex((m) => m.id === id);
    if (idx !== -1) {
      team[idx] = { ...team[idx], ...updates };
      this.saveTeam(team);
      this.addAuditLog({
        action: 'Team Member Updated',
        user: 'Super Admin',
        category: 'team',
        details: `Updated details for ${team[idx].name}.`,
      });
    }
  },

  deleteTeamMember(id: string): void {
    const member = this.getTeam().find((m) => m.id === id);
    const team = this.getTeam().filter((m) => m.id !== id);
    this.saveTeam(team);
    if (member) {
      this.addAuditLog({
        action: 'Team Member Removed',
        user: 'Super Admin',
        category: 'team',
        details: `Removed ${member.name} (${member.role}) from roster.`,
      });
    }
  },

  // --- LEAD ASSIGNMENT ---
  assignLeadToAgent(leadId: string, agentId: string, agentName: string): void {
    const leads = this.getLeads();
    const lead = leads.find((l) => l.id === leadId);
    if (lead) {
      lead.assignedAgentId = agentId;
      lead.assignedAgentName = agentName;
      this.addLeadNote(leadId, `Lead assigned to ${agentName}.`, 'Super Admin');
      this.saveLeads(leads);
      this.addAuditLog({
        action: 'Lead Reassigned',
        user: 'Super Admin',
        category: 'lead',
        details: `Assigned Lead #${leadId} (${lead.name}) to ${agentName}.`,
      });
    }
  },

  // --- AUDIT LOGS (SUPER ADMIN) ---
  getAuditLogs(): AuditLogEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_AUDIT_LOGS;
  },

  saveAuditLogs(logs: AuditLogEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },

  addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    logs.unshift(newLog);
    // Keep max 100 logs
    if (logs.length > 100) logs.pop();
    this.saveAuditLogs(logs);
  },

  // --- FULL DATABASE BACKUP & RESTORE (SUPER ADMIN) ---
  exportDatabaseBackup(): void {
    const backup = {
      exportDate: new Date().toISOString(),
      version: '2.0-super-admin',
      platform: 'Indy Home Collection Real Estate',
      leads: this.getLeads(),
      properties: this.getProperties(),
      reviews: this.getReviews(),
      team: this.getTeam(),
      settings: this.getSettings(),
      auditLogs: this.getAuditLogs(),
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `indy-homes-superadmin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.addAuditLog({
      action: 'Full System Backup Exported',
      user: 'Super Admin',
      category: 'system',
      details: 'Complete JSON state snapshot generated and downloaded.',
    });
  },

  importDatabaseBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.leads) localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(data.leads));
      if (data.properties) localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(data.properties));
      if (data.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(data.reviews));
      if (data.team) localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(data.team));
      if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      if (data.auditLogs) localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(data.auditLogs));
      notifyUpdate();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  // --- RESET ALL DATA ---
  resetAll(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(DEFAULT_LEADS));
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(DEFAULT_PROPERTIES));
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(DEFAULT_TEAM));
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEFAULT_AUDIT_LOGS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      notifyUpdate();
    } catch (e) {
      console.error(e);
    }
  },
};

