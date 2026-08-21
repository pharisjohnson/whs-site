import React from 'react';
import { 
  Building, 
  MapPin, 
  Bed, 
  Euro, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Database
} from 'lucide-react';
import { NewDevelopment } from '../types';

interface DevelopmentsViewProps {
  developments: NewDevelopment[];
  onSelectDevelopment: (dev: NewDevelopment) => void;
  onOpenInquiry: (devTitle?: string) => void;
}

export const DevelopmentsView: React.FC<DevelopmentsViewProps> = ({
  developments,
  onSelectDevelopment,
  onOpenInquiry
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98158] block">
          Turnkey Architectural Projects
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
          Exclusive New Developments
        </h1>
        <p className="text-sm sm:text-base text-[#7D7564] leading-relaxed">
          Pioneering energy-efficient architectural complexes, frontline dune residences, and bespoke modern villas in prime Costa Blanca coastal sectors with direct developer allocation.
        </p>
      </div>

      {/* Grid of Developments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developments.map((dev) => (
          <div
            key={dev.id}
            onClick={() => onSelectDevelopment(dev)}
            className="group bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] overflow-hidden hover:border-[#2C6E49] transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DF]">
              <img
                src={dev.heroImage}
                alt={dev.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#2C6E49] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                {dev.status}
              </div>
              <div className="absolute top-3 right-3 bg-[#1D1B16]/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                Ref: {dev.inmovillaRef}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-[#7D7564]">
                  <MapPin className="w-3.5 h-3.5 text-[#2C6E49]" />
                  <span className="font-semibold text-[#1D1B16]">{dev.location.town}</span>
                  <span>· {dev.location.zone}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors">
                  {dev.name}
                </h3>

                <p className="text-xs text-[#7D7564] line-clamp-2 leading-relaxed">
                  {dev.description}
                </p>

                <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-[#F5F0E7] rounded-lg text-xs text-[#4B4539]">
                  <div>
                    <span className="text-[10px] text-[#7D7564] block">Units:</span>
                    <span className="font-bold">{dev.availableUnits} of {dev.totalUnits} Available</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7D7564] block">Completion:</span>
                    <span className="font-bold">{dev.completionDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7DDCF] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7D7564] block">From</span>
                  <span className="font-display text-2xl font-bold text-[#1D1B16]">
                    €{dev.priceFrom.toLocaleString()}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C6E49] group-hover:translate-x-1 transition-transform">
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
