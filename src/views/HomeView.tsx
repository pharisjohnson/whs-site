import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Building, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  Database,
  ChevronRight,
  TrendingUp,
  Compass
} from 'lucide-react';
import { Property, AreaGuide, NewDevelopment } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { ValuationCalculator } from '../components/ValuationCalculator';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';
import { InmovillaService } from '../services/inmovillaService';

interface HomeViewProps {
  properties: Property[];
  areaGuides: AreaGuide[];
  developments: NewDevelopment[];
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property?: Property) => void;
  onNavigate: (view: string, param?: string) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  onOpenInmovillaHub: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  areaGuides,
  developments,
  onSelectProperty,
  onOpenInquiry,
  onNavigate,
  favorites,
  onToggleFavorite,
  onOpenInmovillaHub
}) => {
  const [quickSearch, setQuickSearch] = useState('');
  const [quickLocation, setQuickLocation] = useState('all');
  const [quickType, setQuickType] = useState('all');

  // Contact section state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLeadId, setContactLeadId] = useState('');

  const featuredProperties = properties.filter(p => p.featured || p.luxury).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties', quickLocation !== 'all' ? quickLocation : undefined);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await InmovillaService.submitLead({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        leadType: 'general_contact',
        message: contactMessage || 'General luxury property inquiry from Home page.',
        language: 'EN'
      });
      setContactLeadId(res.lead.inmovillaLeadId || 'INMO-L-9988');
      setContactSubmitted(true);
    } catch {
      // handled
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#1D1B16] text-white overflow-hidden pt-12 pb-20">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury Costa Blanca villa overlooking Mediterranean sea"
            className="w-full h-full object-cover opacity-35 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16] via-[#1D1B16]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-[#E7DDCF] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#2C6E49] animate-pulse"></span>
            Costa Blanca’s Premier Real Estate Legacy Since 2005
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#FCF9F3] leading-[1.08]">
            Exceptional Living on the <br />
            <span className="italic font-normal text-[#E7DDCF]">Costa Blanca</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#E7DDCF]/90 font-light leading-relaxed">
            Curated luxury villas, frontline penthouses, and private architectural estates in Moraira, Jávea, Altea, and Benissa — verified in real time.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-4xl mx-auto bg-[#FCF9F3] text-[#1D1B16] p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#E7DDCF] grid grid-cols-1 md:grid-cols-4 gap-3 text-left"
          >
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                Location
              </label>
              <select
                value={quickLocation}
                onChange={(e) => setQuickLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] cursor-pointer"
              >
                <option value="all">All Prime Locations</option>
                <option value="Moraira">Moraira & El Portet</option>
                <option value="Jávea">Jávea / Xàbia</option>
                <option value="Altea">Altea & Altea Hills</option>
                <option value="Benissa">Benissa Coast</option>
                <option value="Guardamar del Segura">Guardamar del Segura</option>
                <option value="Calpe">Calpe</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                Property Type
              </label>
              <select
                value={quickType}
                onChange={(e) => setQuickType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] cursor-pointer"
              >
                <option value="all">All Collections</option>
                <option value="villa">Villas & Estates</option>
                <option value="penthouse">Penthouses</option>
                <option value="apartment">Apartments</option>
                <option value="development">New Developments</option>
                <option value="finca">Fincas & Country Homes</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                Keyword / Property Ref
              </label>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="e.g. WHS-1082, Sea View..."
                className="w-full px-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2C6E49] text-white rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#225639] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>

          {/* Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-[#E7DDCF]/80">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified & Direct Portfolio
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              20+ Years Costa Blanca Authority
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              Multilingual Concierge Desk
            </span>
          </div>
        </div>
      </section>

      {/* 2. STATS & WHY WORLD HOUSING SPAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A98158] mb-3">
              Why World Housing Spain
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16] leading-tight mb-6">
              A Legacy of <br />
              <span className="italic font-normal text-[#2C6E49]">Excellence & Distinction</span>
            </h2>
            <p className="text-[#4B4539] leading-relaxed mb-8 text-base">
              Since 2005, World Housing Spain has guided international families and private investors to secure the most exceptional residences along the Costa Blanca. Our deep local roots, combined with institutional-grade market telemetry, ensure transactions are discreet, seamless, and transparent.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#E7DDCF]">
              <div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#2C6E49] mb-1">20+</p>
                <p className="text-xs text-[#7D7564]">Years of Excellence</p>
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#2C6E49] mb-1">1,200+</p>
                <p className="text-xs text-[#7D7564]">Properties Sold</p>
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#2C6E49] mb-1">98%</p>
                <p className="text-xs text-[#7D7564]">Client Satisfaction</p>
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#2C6E49] mb-1">5</p>
                <p className="text-xs text-[#7D7564]">Costa Blanca Offices</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E7DDCF] bg-[#EFE9DF]">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
              alt="Mediterranean architecture and sea view villa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <p className="font-display text-xl sm:text-2xl italic">
                "The art of finding home is the art of understanding soul."
              </p>
              <p className="text-xs text-[#E7DDCF]/80 uppercase tracking-widest mt-2">
                World Housing Spain Philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A98158] mb-2">
              Collections
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
              Curated for the <br />
              <span className="italic font-normal text-[#2C6E49]">Discerning Eye</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C6E49] hover:text-[#225639] transition-colors mt-4 md:mt-0 cursor-pointer"
          >
            <span>Explore All 12 Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Collection 1 */}
          <div
            onClick={() => onNavigate('properties', 'villa')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE9DF] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Contemporary luxury villas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/90 via-[#1D1B16]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1 block">
                42 Active Listings
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-2">
                Villas & Private Estates
              </h3>
              <p className="text-xs text-[#E7DDCF]/80 line-clamp-2">
                Ultra-modern infinity villas and authentic Mediterranean estates in Moraira and Jávea.
              </p>
            </div>
          </div>

          {/* Collection 2 */}
          <div
            onClick={() => onNavigate('properties', 'penthouse')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE9DF] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
              alt="Penthouses and Apartments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/90 via-[#1D1B16]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1 block">
                28 Active Listings
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-2">
                Penthouses & Solariums
              </h3>
              <p className="text-xs text-[#E7DDCF]/80 line-clamp-2">
                Panoramic sea-view penthouses on Guardamar dunes and Jávea Arenal promenade.
              </p>
            </div>
          </div>

          {/* Collection 3 */}
          <div
            onClick={() => onNavigate('developments')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE9DF] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
              alt="New developments and fincas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/90 via-[#1D1B16]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1 block">
                15 New Developments
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-2">
                New Builds & Fincas
              </h3>
              <p className="text-xs text-[#E7DDCF]/80 line-clamp-2">
                Las Velas de Guardamar, Chalet Moraira, and rustic country retreats in Benissa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED / SELECTED PROPERTIES */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A98158]">
                Featured Portfolio
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                Direct & Verified
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
              Selected <br />
              <span className="italic font-normal text-[#2C6E49]">Costa Blanca Properties</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C6E49] hover:text-[#225639] transition-colors mt-4 md:mt-0 cursor-pointer"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={onSelectProperty}
              onOpenInquiry={onOpenInquiry}
              isFavorite={favorites.includes(prop.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* 5. PRIME DESTINATIONS SPOTLIGHT */}
      <section className="bg-[#F5F0E7] py-20 border-y border-[#E7DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A98158] mb-2">
                Prime Enclaves
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
                Explore Costa Blanca’s <br />
                <span className="italic font-normal text-[#2C6E49]">Finest Microclimates</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('areas')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C6E49] hover:text-[#225639] transition-colors mt-4 md:mt-0 cursor-pointer"
            >
              <span>Read Comprehensive Area Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaGuides.slice(0, 6).map((area) => (
              <div
                key={area.id}
                onClick={() => onNavigate('area-detail', area.slug)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E7DDCF] shadow-sm hover:border-[#2C6E49] transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DF]">
                  <img
                    src={area.heroImage}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#1D1B16]/80 text-white px-2.5 py-1 rounded-md text-[11px] font-mono">
                    Avg €{area.averagePriceM2.toLocaleString()}/m²
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-xs text-[#A98158] font-medium mt-0.5 mb-2">
                      {area.tagline}
                    </p>
                    <p className="text-xs text-[#7D7564] line-clamp-2 leading-relaxed">
                      {area.indexDesc || (area.introParagraphs && area.introParagraphs[0]) || area.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E7DDCF] flex items-center justify-between text-xs text-[#2C6E49] font-semibold">
                    <span>View Area Profile & Homes</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VALUATION ESTIMATOR COMPONENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <ValuationCalculator />
      </section>

      {/* 7. BESPOKE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A98158]">
            Comprehensive Real Estate Advisory
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
            Bespoke Services for <br />
            <span className="italic font-normal text-[#2C6E49]">Buyers & Homeowners</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-[#E7DDCF] shadow-sm hover:border-[#2C6E49] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[#1D1B16]">
              Legal & NIE Assistance
            </h3>
            <p className="text-xs text-[#7D7564] leading-relaxed">
              Full coordination with trusted multilingual Spanish solicitors for title deed verification, Spanish NIE tax numbers, bank account setup, and Golden Visa residency.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E7DDCF] shadow-sm hover:border-[#2C6E49] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#A98158]/15 text-[#A98158] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[#1D1B16]">
              Mortgages & Financing
            </h3>
            <p className="text-xs text-[#7D7564] leading-relaxed">
              Direct access to premier Spanish banks (Sabadell, CaixaBank, Santander) offering competitive non-resident mortgage financing up to 70% LTV with fixed or variable rates.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E7DDCF] shadow-sm hover:border-[#2C6E49] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#3A7288]/15 text-[#3A7288] flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-medium text-[#1D1B16]">
              Architecture & Turnkey
            </h3>
            <p className="text-xs text-[#7D7564] leading-relaxed">
              From concept designs to municipal building permits, Porcelanosa interiors, and landscape architecture for bespoke new villa construction and luxury reformations.
            </p>
          </div>
        </div>
      </section>

      {/* 8. DIRECT CONTACT & INMOVILLA LEAD CAPTURE */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#1D1B16] text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C6E49]/40 border border-[#2C6E49] text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Private Client Advisory Desk
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                Begin Your Costa Blanca <br />
                <span className="italic text-[#E7DDCF]">Property Journey</span>
              </h2>

              <p className="text-sm text-[#E7DDCF]/80 leading-relaxed max-w-md">
                Whether you are seeking a turnkey luxury villa or planning to market your Costa Blanca estate, our private listing directors are at your service.
              </p>

              <div className="space-y-3 text-xs text-[#E7DDCF]/90 pt-4 border-t border-[#4B4539]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#A98158]" />
                  <span>Central Desk: +34 633 754 809 (Direct WhatsApp & Voice)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#A98158]" />
                  <span>Private Inquiries: info@worldhousingspain.eu</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#A98158]" />
                  <span>Offices in Moraira (Head Office), Elche & Santa Pola</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#FCF9F3] text-[#1D1B16] p-6 sm:p-8 rounded-2xl shadow-xl">
              {contactSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">Inquiry Dispatched</h3>
                  <p className="text-xs text-[#4B4539] leading-relaxed">
                    Thank you, <strong>{contactName}</strong>. Your inquiry has been registered under reference <strong>{contactLeadId}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactPhone('');
                      setContactMessage('');
                    }}
                    className="mt-2 px-5 py-2 bg-[#2C6E49] text-white text-xs font-semibold rounded-lg"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="font-display text-xl font-bold">Direct Consultation Request</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                      How can we assist you?
                    </label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your target location, budget, or property requirements..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2C6E49] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors cursor-pointer"
                  >
                    Submit Direct Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 9. Office Locations & Regional Map */}
      <OfficeLocationsSection
        id="offices"
        subtitle="Our Offices"
        title="Visit Us in"
        titleEmphasis="Person"
        showMap={true}
        mapSubtitle="Find Us"
        mapTitle="Our"
        mapTitleEmphasis="Location"
        bgOffices="bg-[#F5F0E7]"
        bgMap="bg-[#FCF9F3]"
      />
    </div>
  );
};
