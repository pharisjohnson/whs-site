import React from 'react';
import { Sparkles, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';

interface LuxuryCollectionViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
}

export const LuxuryCollectionView: React.FC<LuxuryCollectionViewProps> = ({
  properties,
  onSelectProperty,
  onOpenInquiry,
  favorites,
  onToggleFavorite
}) => {
  const luxuryProps = properties.filter(p => p.luxury || p.price >= 900000);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A98158]/15 border border-[#A98158]/30 text-xs font-semibold text-[#A98158] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          The Million-Euro Collection
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[#1D1B16]">
          Luxury & Prime Estates
        </h1>
        <p className="text-sm sm:text-base text-[#7D7564] leading-relaxed">
          An ultra-exclusive portfolio of iconic architectural villas, private hilltop compounds, and beachfront sanctuaries across Moraira, Jávea, and Altea Hills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {luxuryProps.map((prop) => (
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
    </div>
  );
};
