import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Grid, 
  List, 
  RefreshCw, 
  Database, 
  Sparkles, 
  ArrowUpDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property, FilterState, InmovillaConfig } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilter } from '../components/PropertyFilter';

interface ListingsViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  inmovillaConfig: InmovillaConfig;
  onTriggerSync: () => Promise<void>;
  isSyncing: boolean;
  onOpenInmovillaHub: () => void;
  initialFilter?: Partial<FilterState>;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  properties,
  onSelectProperty,
  onOpenInquiry,
  favorites,
  onToggleFavorite,
  inmovillaConfig,
  onTriggerSync,
  isSyncing,
  onOpenInmovillaHub,
  initialFilter
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const defaultFilter: FilterState = {
    search: '',
    location: initialFilter?.location || 'all',
    type: initialFilter?.type || 'all',
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 'all',
    bathrooms: 'all',
    features: [],
    sort: 'featured',
    ...initialFilter
  };

  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  // Filtered properties computation
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search term (title, location, or Inmovilla ref)
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTown = p.location.town.toLowerCase().includes(q);
        const matchRef = p.ref.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchTown && !matchRef && !matchDesc) return false;
      }

      // Location
      if (filter.location !== 'all') {
        if (!p.location.town.toLowerCase().includes(filter.location.toLowerCase())) {
          return false;
        }
      }

      // Type
      if (filter.type !== 'all') {
        if (p.type !== filter.type) return false;
      }

      // Bedrooms
      if (filter.bedrooms !== 'all') {
        if (p.bedrooms < Number(filter.bedrooms)) return false;
      }

      // Bathrooms
      if (filter.bathrooms !== 'all') {
        if (p.bathrooms < Number(filter.bathrooms)) return false;
      }

      // Price
      if (p.price > filter.maxPrice) return false;
      if (filter.minPrice > 0 && p.price < filter.minPrice) return false;

      // Features
      if (filter.features.length > 0) {
        const hasAllFeatures = filter.features.every(f => 
          p.features.some(pf => pf.toLowerCase().includes(f.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sort === 'price-asc') return a.price - b.price;
      if (filter.sort === 'price-desc') return b.price - a.price;
      if (filter.sort === 'beds-desc') return b.bedrooms - a.bedrooms;
      if (filter.sort === 'area-desc') return b.builtAreaM2 - a.builtAreaM2;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, filter]);

  const handleResetFilter = () => {
    setFilter({
      search: '',
      location: 'all',
      type: 'all',
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: 'all',
      bathrooms: 'all',
      features: [],
      sort: 'featured'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Title & Inmovilla CRM sync status bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7DDCF]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98158] block mb-1">
            Costa Blanca Real Estate Portfolio
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
            Exclusive Properties
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Real-time status indicator & refresh */}
          <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white border border-[#E7DDCF] shadow-xs text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#4B4539] font-medium">Verified Portfolio · Real-Time Availability</span>
            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="ml-2 text-[#2C6E49] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              title="Refresh property availability"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center p-1 bg-white border border-[#E7DDCF] rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#2C6E49] text-white' : 'text-[#7D7564] hover:text-[#1D1B16]'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#2C6E49] text-white' : 'text-[#7D7564] hover:text-[#1D1B16]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <PropertyFilter
        filter={filter}
        onFilterChange={setFilter}
        onReset={handleResetFilter}
        totalCount={filteredProperties.length}
      />

      {/* Properties Output */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E7DDCF] p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FCF9F3] text-[#A98158] flex items-center justify-center mx-auto">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
            No properties match your exact filters
          </h3>
          <p className="text-xs text-[#7D7564] max-w-md mx-auto">
            Try loosening price constraints, clearing specific amenity checkboxes, or resetting to view our full Costa Blanca portfolio.
          </p>
          <button
            onClick={handleResetFilter}
            className="mt-2 px-6 py-2.5 bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredProperties.map((prop) => (
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
      )}
    </div>
  );
};
