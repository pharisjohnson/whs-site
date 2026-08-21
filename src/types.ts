export type PropertyType = 'villa' | 'apartment' | 'penthouse' | 'finca' | 'development';

export type PropertyStatus = 'available' | 'for_sale' | 'reserved' | 'sold' | 'new_development';

export interface Property {
  id: string;
  ref: string; // Inmovilla Property Reference (e.g. WHS-1082)
  inmovillaId?: string; // Inmovilla CRM cod_oferta
  title: string;
  slug: string;
  type: PropertyType;
  price: number;
  originalPrice?: number;
  currency?: string;
  description: string;
  shortDescription?: string;
  location: {
    address?: string;
    zone?: string;
    town: string;
    province: string;
    country?: string;
    postalCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  builtAreaM2: number;
  plotAreaM2?: number;
  terraceAreaM2?: number;
  images: string[];
  features: string[]; // e.g. ['Private Pool', 'Sea View', 'Garage', 'South Facing', 'Garden', 'Air Conditioning']
  yearBuilt?: number;
  energyRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  status: PropertyStatus;
  featured?: boolean;
  luxury?: boolean;
  isNewConstruction?: boolean;
  deliveryDate?: string;
  virtualTourUrl?: string;
  videoUrl?: string;
  inmovillaSyncDate?: string;
}

export interface InmovillaConfig {
  agencyNum: string;
  apiKey: string;
  apiUrl: string;
  apiDocUrl?: string;
  xmlFeedUrl?: string;
  autoSync: boolean;
  lastSyncTimestamp: string | null;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastError?: string;
  syncedCount: number;
}

export type LeadType = 'buyer_inquiry' | 'seller_valuation' | 'viewing_request' | 'general_contact';

export interface InmovillaLead {
  id: string;
  inmovillaLeadId?: string;
  name: string;
  email: string;
  phone: string;
  propertyRef?: string;
  propertyTitle?: string;
  leadType: LeadType;
  message: string;
  preferredDate?: string;
  budget?: string;
  propertyDetails?: {
    type?: string;
    location?: string;
    bedrooms?: string;
    estimatedValue?: number;
  };
  language?: string;
  timestamp: string;
  inmovillaStatus: 'dispatched' | 'pending' | 'failed';
  inmovillaResponse?: string;
}

export interface AreaIntroStat {
  icon: string;
  value: string;
  label: string;
}

export interface AreaHighlight {
  image: string;
  icon: string;
  title: string;
  description?: string;
  isLarge?: boolean;
}

export interface AreaMarketMetric {
  label: string;
  value: string;
}

export interface AreaGuide {
  id: string;
  slug: string;
  name: string;
  province: string;
  tag?: string;
  tagline: string;
  subtitle?: string;
  description?: string;
  indexDesc?: string;
  indexResidents?: string;
  heroImage: string;
  gallery: string[];
  averagePriceM2: number;
  introStats: AreaIntroStat[];
  introParagraphs: string[];
  highlights: AreaHighlight[];
  marketHeading: string;
  marketParagraphs: string[];
  marketImg: string;
  marketMetrics: AreaMarketMetric[];
  beaches?: string[];
  popularBeaches?: string[];
  lifestyle?: string;
  distanceAirport: string;
  sunshineDaysPerYear?: number;
}

export interface NewDevelopmentUnit {
  name: string;
  unitNumber?: string;
  beds: number;
  bedrooms?: number;
  baths: number;
  bathrooms?: number;
  areaM2: number;
  builtM2?: number;
  terraceM2?: number;
  floor?: string;
  type?: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
}

export interface NewDevelopment {
  id: string;
  inmovillaRef: string;
  name: string;
  slug: string;
  location: string;
  priceFrom: number;
  completionDate: string;
  totalUnits: number;
  availableUnits: number;
  heroImage: string;
  images: string[];
  description: string;
  features: string[];
  energyRating?: string;
  typologies: NewDevelopmentUnit[];
}

export interface FilterState {
  search: string;
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  features: string[];
  sort: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'beds-desc' | 'area-desc';
  onlyLuxury?: boolean;
  onlyNew?: boolean;
}
