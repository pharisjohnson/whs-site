import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Euro, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles,
  Check
} from 'lucide-react';
import { FilterState } from '../types';

interface PropertyFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

const LOCATIONS = [
  'All Costa Blanca',
  'Moraira',
  'Jávea',
  'Altea',
  'Benissa',
  'Guardamar del Segura',
  'Benijófar',
  'Calpe'
];

const PROPERTY_TYPES = [
  { value: 'all', label: 'All Property Types' },
  { value: 'villa', label: 'Luxury Villas' },
  { value: 'penthouse', label: 'Penthouses' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'finca', label: 'Fincas & Estates' },
  { value: 'development', label: 'New Developments' }
];

const AMENITY_OPTIONS = [
  'Private Pool',
  'Sea View',
  'Garage',
  'Private Garden',
  'Air Conditioning',
  'Underfloor Heating',
  'South Facing',
  'Rooftop Solarium',
  'Elevator',
  'Walk to Beach'
];

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleLocation = (loc: string) => {
    onFilterChange({
      ...filter,
      location: loc === 'All Costa Blanca' ? 'all' : loc
    });
  };

  const handleType = (type: string) => {
    onFilterChange({
      ...filter,
      type
    });
  };

  const handleBedrooms = (beds: number | 'all') => {
    onFilterChange({
      ...filter,
      bedrooms: beds
    });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filter.features.includes(amenity);
    const updated = exists 
      ? filter.features.filter(f => f !== amenity)
      : [...filter.features, amenity];
    onFilterChange({
      ...filter,
      features: updated
    });
  };

  const hasActiveFilters = 
    filter.search !== '' ||
    filter.location !== 'all' ||
    filter.type !== 'all' ||
    filter.bedrooms !== 'all' ||
    filter.minPrice > 0 ||
    filter.maxPrice < 5000000 ||
    filter.features.length > 0;

  return (
    <div className="bg-[#FCF9F3] border border-[#E7DDCF] rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
      {/* Primary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search by keyword or Ref */}
        <div className="relative">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
            Search or Ref #
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Moraira, WHS-1082, Sea view..."
              value={filter.search}
              onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
            Prime Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filter.location === 'all' ? 'All Costa Blanca' : filter.location}
              onChange={(e) => handleLocation(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] appearance-none cursor-pointer"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
            Property Type
          </label>
          <div className="relative">
            <Home className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filter.type}
              onChange={(e) => handleType(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] appearance-none cursor-pointer"
            >
              {PROPERTY_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggle Advanced / Action buttons */}
        <div className="flex items-center gap-2 pt-5">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              showAdvanced || filter.features.length > 0
                ? 'bg-[#2C6E49]/10 border-[#2C6E49] text-[#2C6E49]'
                : 'border-[#E7DDCF] bg-white text-[#4B4539] hover:bg-[#F5F0E7]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {filter.features.length > 0 ? `(${filter.features.length})` : ''}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="p-2.5 rounded-lg border border-[#E7DDCF] bg-white text-[#7D7564] hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Expandable Area */}
      {showAdvanced && (
        <div className="pt-5 mt-5 border-t border-[#E7DDCF] grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#7D7564]">
                Price Cap: €{filter.maxPrice >= 5000000 ? '5,000,000+' : filter.maxPrice.toLocaleString()}
              </label>
            </div>
            <input
              type="range"
              min="150000"
              max="5000000"
              step="50000"
              value={filter.maxPrice}
              onChange={(e) => onFilterChange({ ...filter, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#2C6E49] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#7D7564] mt-1">
              <span>€150,000</span>
              <span>€2.5M</span>
              <span>€5M+</span>
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-2">
              Bedrooms
            </label>
            <div className="flex items-center gap-1.5">
              {(['all', 2, 3, 4, 5] as const).map((b) => (
                <button
                  key={String(b)}
                  onClick={() => handleBedrooms(b)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                    filter.bedrooms === b
                      ? 'bg-[#2C6E49] border-[#2C6E49] text-white'
                      : 'bg-white border-[#E7DDCF] text-[#4B4539] hover:bg-[#F5F0E7]'
                  }`}
                >
                  {b === 'all' ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-2">
              Sort Listings
            </label>
            <select
              value={filter.sort}
              onChange={(e) => onFilterChange({ ...filter, sort: e.target.value as any })}
              className="w-full px-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="beds-desc">Most Bedrooms</option>
              <option value="area-desc">Largest Built Area m²</option>
            </select>
          </div>

          {/* Amenities Multi-Pills */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-2">
              Desired Amenities & Features
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const selected = filter.features.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#2C6E49] text-white shadow-sm'
                        : 'bg-white border border-[#E7DDCF] text-[#4B4539] hover:border-[#2C6E49]'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Result Count Banner */}
      <div className="mt-4 pt-3 border-t border-[#E7DDCF]/70 flex items-center justify-between text-xs text-[#7D7564]">
        <span>
          Showing <strong className="text-[#1D1B16] font-bold">{totalCount}</strong> luxury properties matching criteria
        </span>
        <span className="text-[11px] text-[#2C6E49] font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Verified Inmovilla CRM Feed
        </span>
      </div>
    </div>
  );
};
