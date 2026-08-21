import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Calendar, 
  Heart, 
  Share2, 
  MessageCircle, 
  Phone, 
  Mail, 
  Check, 
  ShieldCheck, 
  Database, 
  ArrowLeft, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Download,
  Flame,
  Zap,
  Building
} from 'lucide-react';
import { Property } from '../types';
import { MortgageCalculator } from '../components/MortgageCalculator';
import { InmovillaService } from '../services/inmovillaService';
import { PropertyCard } from '../components/PropertyCard';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  allProperties,
  onBack,
  onSelectProperty,
  onOpenInquiry,
  isFavorite,
  onToggleFavorite
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  // Inmovilla lead form state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState(`I would like to schedule a private viewing for ${property.title} (Ref: ${property.ref}).`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'];

  const whatsappLink = InmovillaService.getWhatsAppLink('34633754809', property);

  const similarProperties = allProperties
    .filter(p => p.id !== property.id && (p.location.town === property.location.town || p.type === property.type))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await InmovillaService.submitLead({
        name: buyerName,
        email: buyerEmail,
        phone: buyerPhone,
        propertyRef: property.ref,
        propertyTitle: property.title,
        leadType: 'viewing_request',
        message: notes,
        preferredDate: preferredDate || undefined,
        language: 'EN'
      });
      setSubmittedLeadId(res.lead.inmovillaLeadId || 'INMO-L-PROPDETAIL');
    } catch {
      // handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Back button & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B4539] hover:text-[#2C6E49] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#E7DDCF] text-xs font-medium text-[#4B4539] hover:bg-[#FCF9F3] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copySuccess ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-[#E7DDCF] text-[#4B4539] hover:border-[#2C6E49]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Saved' : 'Save Property'}</span>
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Agent</span>
          </a>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        {/* Main large image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#EFE9DF] shadow-md border border-[#E7DDCF]">
          <img
            src={images[activeImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Badges on main image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#1D1B16]/80 backdrop-blur-md text-white rounded-lg text-xs font-mono font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Ref: {property.ref}
            </span>
            {property.luxury && (
              <span className="px-3 py-1 bg-[#A98158] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm">
                Luxury Estate
              </span>
            )}
            {property.isNewConstruction && (
              <span className="px-3 py-1 bg-[#3A7288] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm">
                New Development
              </span>
            )}
          </div>

          {/* Next / Prev Image arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-[#1D1B16] shadow-lg backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-[#1D1B16] shadow-lg backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg">
            Photo {activeImageIndex + 1} of {images.length}
          </div>
        </div>

        {/* Thumbnails strip */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#2C6E49] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Details Grid: Left Content + Right Sticky Booking Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-[#E7DDCF]">
            <div className="flex items-center gap-2 text-xs text-[#7D7564]">
              <MapPin className="w-4 h-4 text-[#2C6E49]" />
              <span className="font-semibold text-[#1D1B16]">{property.location.town}</span>
              <span>· {property.location.province}</span>
              {property.location.address && <span>· {property.location.address}</span>}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-baseline gap-4 pt-2">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#2C6E49]">
                €{property.price.toLocaleString()}
              </span>
              {property.originalPrice && (
                <span className="text-base text-[#7D7564] line-through font-normal">
                  €{property.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-[#7D7564]">
                (Ref: {property.ref})
              </span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#E7DDCF] shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#2C6E49]" />
                Bedrooms
              </span>
              <p className="font-display text-2xl font-bold text-[#1D1B16]">{property.bedrooms}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#2C6E49]" />
                Bathrooms
              </span>
              <p className="font-display text-2xl font-bold text-[#1D1B16]">{property.bathrooms}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#2C6E49]" />
                Built Living Area
              </span>
              <p className="font-display text-2xl font-bold text-[#1D1B16]">{property.builtAreaM2} m²</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#2C6E49]" />
                Plot / Terrace
              </span>
              <p className="font-display text-2xl font-bold text-[#1D1B16]">
                {property.plotAreaM2 ? `${property.plotAreaM2} m²` : `${property.terraceAreaM2 || 45} m²`}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs">
            <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
              Architectural Overview & Highlights
            </h3>
            <p className="text-[#4B4539] leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {property.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E7DDCF] text-xs text-[#4B4539]">
              <div><strong>Property Category:</strong> {property.type.toUpperCase()}</div>
              <div><strong>Energy Rating:</strong> {property.energyRating || 'A'} Certified</div>
              <div><strong>Year Built:</strong> {property.yearBuilt || 2024}</div>
              <div><strong>Status:</strong> {property.status.toUpperCase()}</div>
            </div>
          </div>

          {/* Amenities & Features checklist */}
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs">
            <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
              Amenities & Equipment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#1D1B16]">
                  <div className="w-5 h-5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
                Location & Environs
              </h3>
              <span className="text-xs text-[#7D7564]">{property.location.town}, Costa Blanca</span>
            </div>
            
            <div className="relative aspect-[16/7] rounded-xl overflow-hidden bg-[#EFE9DF] border border-[#E7DDCF] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
                alt="Map topography preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-[#2C6E49]/10 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#2C6E49] text-white flex items-center justify-center shadow-lg mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-[#1D1B16]">
                  {property.location.town} Prime Zone
                </h4>
                <p className="text-xs text-[#4B4539] max-w-sm">
                  {property.location.address || 'Exclusive residential sector'} · Proximity to Mediterranean coves, golf clubs, and international schools.
                </p>
              </div>
            </div>
          </div>

          {/* Mortgage Calculator */}
          <MortgageCalculator propertyPrice={property.price} />

        </div>

        {/* Right Column: Sticky Inmovilla Viewing & Lead Capture Box (4 cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          
          <div className="bg-white rounded-3xl border border-[#E7DDCF] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-[#E7DDCF] pb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A98158] block mb-1">
                Direct Appointment Booking
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
                Schedule Private Viewing
              </h3>
              <p className="text-xs text-[#7D7564] mt-1">
                Directly coordinated with our local listing director.
              </p>
            </div>

            {submittedLeadId ? (
              <div className="text-center py-6 space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-emerald-900">
                  Viewing Request Registered
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your appointment request for <strong>{property.title}</strong> has been registered under reference:
                </p>
                <div className="font-mono text-sm font-bold text-emerald-950 bg-white py-2 px-3 rounded-md inline-block border border-emerald-300">
                  {submittedLeadId}
                </div>
                <p className="text-[11px] text-emerald-700">
                  Our listing director for {property.location.town} will contact you shortly to confirm the appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Preferred Viewing Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Notes / Questions
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#2C6E49] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Registering...' : 'Book Viewing Appointment'}
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-[#E7DDCF] space-y-2 text-xs text-[#7D7564]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
                <span>Discreet & confidential client handling</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Official Real Estate Syndicate Representation</span>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Agent info card */}
          <div className="bg-[#F5F0E7] p-5 rounded-2xl border border-[#E7DDCF] flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
              alt="Listing specialist"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h5 className="text-sm font-bold text-[#1D1B16]">Helena van der Berg</h5>
              <p className="text-xs text-[#7D7564]">Senior Costa Blanca Advisor</p>
              <p className="text-[11px] text-[#2C6E49] font-medium mt-0.5">EN · ES · DE · NL</p>
            </div>
          </div>

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-[#E7DDCF] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl font-medium text-[#1D1B16]">
              Similar Mediterranean Properties
            </h3>
            <span className="text-xs text-[#7D7564]">Curated Selection</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                onOpenInquiry={onOpenInquiry}
                isFavorite={false}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
