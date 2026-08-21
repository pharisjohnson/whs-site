import React from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  MapPin, 
  MessageCircle, 
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onOpenInquiry,
  isFavorite,
  onToggleFavorite
}) => {
  const whatsappLink = InmovillaService.getWhatsAppLink('34633754809', property);

  return (
    <div className="group relative bg-[#FCF9F3] rounded-xl border border-[#E7DDCF] overflow-hidden hover:border-[#2C6E49] transition-all duration-300 hover:shadow-xl flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DF]">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {property.featured && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#2C6E49] text-white rounded-md shadow-sm">
              Featured
            </span>
          )}
          {property.luxury && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#A98158] text-white rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Luxury
            </span>
          )}
          {property.isNewConstruction && (
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#3A7288] text-white rounded-md shadow-sm">
              New Build
            </span>
          )}
        </div>

        {/* Favorite & CRM Ref */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isFavorite 
                ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                : 'bg-white/80 text-[#4B4539] hover:bg-white border border-white/40'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Inmovilla Ref Tag */}
        <div className="absolute bottom-3 left-3 bg-[#1D1B16]/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] font-mono font-medium flex items-center gap-1.5">
          <Database className="w-3 h-3 text-emerald-400" />
          <span>Ref: {property.ref}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Town & Type */}
        <div className="flex items-center justify-between text-xs text-[#7D7564] mb-1.5">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#2C6E49]" />
            <span className="font-medium text-[#4B4539]">{property.location.town}</span>
            {property.location.zone && <span>· {property.location.zone}</span>}
          </div>
          <span className="uppercase tracking-wider font-semibold text-[10px] text-[#A98158]">
            {property.type}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(property)}
          className="font-display text-xl font-medium text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {property.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#7D7564] line-clamp-2 leading-relaxed mb-4">
          {property.shortDescription || property.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#F5F0E7] rounded-lg text-xs text-[#4B4539] mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#2C6E49]" />
            <span className="font-semibold">{property.bedrooms}</span>
            <span className="text-[11px] text-[#7D7564]">Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#2C6E49]" />
            <span className="font-semibold">{property.bathrooms}</span>
            <span className="text-[11px] text-[#7D7564]">Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-[#2C6E49]" />
            <span className="font-semibold">{property.builtAreaM2}</span>
            <span className="text-[11px] text-[#7D7564]">m²</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-auto pt-3 border-t border-[#E7DDCF] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7D7564] block">Price</span>
            <span className="font-display text-2xl font-bold text-[#1D1B16]">
              €{property.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              title="Chat on WhatsApp with reference"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onSelect(property)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#225639] transition-colors cursor-pointer"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
