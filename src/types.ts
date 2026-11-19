export type ThemeId = 'editorial' | 'earthy' | 'luxury' | 'midwestern';

export type AppMode = 'preview' | 'studio' | 'admin';

export type LeadType = 'consultation' | 'valuation' | 'investment' | 'contact' | 'showing';
export type LeadStatus = 'new' | 'contacted' | 'showing' | 'under_contract' | 'closed' | 'archived';
export type LeadPriority = 'urgent' | 'high' | 'normal';

export interface LeadNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: LeadType;
  source: string;
  city?: string;
  preferredDate?: string;
  preferredTime?: string;
  estimatedValue?: number;
  details: string;
  status: LeadStatus;
  priority: LeadPriority;
  createdAt: string;
  notes: LeadNote[];
}

export interface PropertyListingItem {
  id: string;
  title: string;
  category: 'luxury' | 'small' | 'new' | 'family';
  categoryLabel: string;
  price: string;
  priceNumber: number;
  city: string;
  county: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  style: string;
  image: string;
  status: 'Active' | 'Pending' | 'Sold' | 'Coming Soon';
  description: string;
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  location: string;
  county: string;
  transactionType: string;
  purchasePrice: string;
  headline: string;
  story: string;
  closingStatement: string;
  rating: number;
  status: 'approved' | 'pending' | 'archived';
  date: string;
}

export interface AdminSettingsData {
  realtorName: string;
  realtorTitle: string;
  realtorPhone: string;
  realtorEmail: string;
  licenseNumber: string;
  brokerage: string;
  officeAddress: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  autoAssignNewLeads: boolean;
  dailyDigest: boolean;
}

export type TargetBuilder = 'bolt' | 'lovable' | 'v0' | 'framer' | 'replit';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  paletteDescription: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  borderClass: string;
}

export interface IndianaMarket {
  id: string;
  name: string;
  county: string;
  vibe: string;
  medianPrice: string;
  highlights: string[];
  bestFor: string;
  commuteToIndy: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  actionType: 'consult' | 'valuation' | 'investment' | 'relocation';
  imageKey: string;
}

export interface ValuationData {
  address: string;
  city: string;
  zipCode: string;
  propertyType: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  condition: 'needs-work' | 'fair' | 'updated' | 'luxury-remodeled';
  email: string;
  phone: string;
  estimatedLow: number;
  estimatedHigh: number;
}

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  preferredContactMethod: 'phone' | 'text' | 'email';
  message: string;
}
