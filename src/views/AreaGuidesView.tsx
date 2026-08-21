import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Sun, 
  Compass, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Search,
  Filter
} from 'lucide-react';
import { AreaGuide } from '../types';

interface AreaGuidesViewProps {
  areaGuides: AreaGuide[];
  onSelectArea: (slug: string) => void;
  onNavigateToProperties?: (location?: string) => void;
  onOpenInquiry?: () => void;
}

export const AreaGuidesView: React.FC<AreaGuidesViewProps> = ({
  areaGuides,
  onSelectArea,
  onNavigateToProperties,
  onOpenInquiry
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'north' | 'south' | 'coastal' | 'city'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = useMemo(() => {
    return areaGuides.filter((guide) => {
      // search query
      const matchesSearch = 
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (guide.tag && guide.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (guide.tagline && guide.tagline.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (guide.indexDesc && guide.indexDesc.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'north') {
        return ['moraira', 'javea', 'altea', 'calpe', 'denia', 'benissa'].includes(guide.slug);
      }
      if (activeFilter === 'south') {
        return ['alicante', 'santa-pola', 'elche', 'guardamar'].includes(guide.slug);
      }
      if (activeFilter === 'city') {
        return ['alicante', 'elche', 'benidorm'].includes(guide.slug);
      }
      if (activeFilter === 'coastal') {
        return ['moraira', 'javea', 'altea', 'calpe', 'denia', 'benissa', 'santa-pola'].includes(guide.slug);
      }
      return true;
    });
  }, [areaGuides, activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1D1B16]">
      {/* Hero Section */}
      <section className="relative py-28 lg:py-36 bg-[#EFEBE4] overflow-hidden border-b border-[#E7DDCF]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586525198428-225f6f12cff9?w=1920&q=80"
            alt="Costa Blanca coastline with turquoise Mediterranean Sea"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F5]/90 via-[#FBF9F5]/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
              Destinations
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1D1B16] mb-6">
              Explore the <span className="italic font-normal">Costa Blanca</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5A5343] leading-relaxed mb-8">
              From vibrant coastal cities to tranquil fishing villages and exclusive hillside enclaves, discover the distinct character, lifestyle, and luxury property opportunities across our region.
            </p>

            {/* Quick Stats Pill Ribbon */}
            <div className="inline-flex flex-wrap items-center gap-3 p-2 bg-[#FBF9F5]/80 backdrop-blur-md rounded-2xl border border-[#E7DDCF] shadow-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#2C6E49]">
                <MapPin className="w-4 h-4" />
                <span>10 Prime Enclaves</span>
              </div>
              <span className="text-[#C6BCAD]">•</span>
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#2C6E49]">
                <Sun className="w-4 h-4" />
                <span>320+ Days of Sunshine</span>
              </div>
              <span className="text-[#C6BCAD]">•</span>
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#2C6E49]">
                <Compass className="w-4 h-4" />
                <span>200+ km Coastline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-[#FBF9F5] border-b border-[#E7DDCF]/60 sticky top-20 z-20 backdrop-blur-md bg-[#FBF9F5]/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#2C6E49] text-white shadow-sm'
                  : 'bg-[#EFEBE4] text-[#5A5343] hover:bg-[#E4DDD2]'
              }`}
            >
              All Enclaves ({areaGuides.length})
            </button>
            <button
              onClick={() => setActiveFilter('north')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === 'north'
                  ? 'bg-[#2C6E49] text-white shadow-sm'
                  : 'bg-[#EFEBE4] text-[#5A5343] hover:bg-[#E4DDD2]'
              }`}
            >
              North Costa Blanca
            </button>
            <button
              onClick={() => setActiveFilter('south')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === 'south'
                  ? 'bg-[#2C6E49] text-white shadow-sm'
                  : 'bg-[#EFEBE4] text-[#5A5343] hover:bg-[#E4DDD2]'
              }`}
            >
              South Costa Blanca
            </button>
            <button
              onClick={() => setActiveFilter('coastal')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === 'coastal'
                  ? 'bg-[#2C6E49] text-white shadow-sm'
                  : 'bg-[#EFEBE4] text-[#5A5343] hover:bg-[#E4DDD2]'
              }`}
            >
              Coastal & Coves
            </button>
            <button
              onClick={() => setActiveFilter('city')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === 'city'
                  ? 'bg-[#2C6E49] text-white shadow-sm'
                  : 'bg-[#EFEBE4] text-[#5A5343] hover:bg-[#E4DDD2]'
              }`}
            >
              Urban & Capital
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D7564]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search enclave by name or feature..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E7DDCF] rounded-full text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section id="destinations" className="py-16 lg:py-24 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => onSelectArea(guide.slug)}
                className="group bg-[#FCF9F3] rounded-2xl overflow-hidden border border-[#E7DDCF] shadow-sm hover:shadow-xl hover:border-[#2C6E49]/60 transition-all duration-300 block cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image with 16/10 aspect ratio */}
                  <div className="aspect-[16/10] overflow-hidden bg-[#EFE9DF] relative">
                    <img
                      src={guide.heroImage}
                      alt={`${guide.name} - ${guide.tagline}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase bg-[#2C6E49] text-white rounded-full shadow-sm">
                        {guide.tag || 'Enclave'}
                      </span>
                    </div>
                    {guide.averagePriceM2 > 0 && (
                      <div className="absolute top-3 right-3 bg-[#1D1B16]/80 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                        Avg €{guide.averagePriceM2.toLocaleString()}/m²
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-medium text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors mb-1">
                      {guide.name}
                    </h3>
                    <p className="text-xs text-[#A98158] font-serif italic mb-3">
                      {guide.tagline || guide.subtitle}
                    </p>
                    <p className="text-xs text-[#5A5343] leading-relaxed line-clamp-2">
                      {guide.indexDesc || (guide.introParagraphs && guide.introParagraphs[0]) || guide.description}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 pb-5">
                  <div className="flex items-center justify-between pt-4 border-t border-[#E7DDCF]/70">
                    <span className="text-xs text-[#7D7564]">
                      <span className="font-medium text-[#1D1B16]">
                        {guide.indexResidents || (guide.introStats && guide.introStats[0]?.value) || 'Prime'}
                      </span> residents
                    </span>
                    <span className="text-xs font-semibold text-[#2C6E49] tracking-wide uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore Area
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E7DDCF] p-8 max-w-lg mx-auto">
              <Compass className="w-12 h-12 text-[#A98158] mx-auto mb-3" />
              <h3 className="font-display text-xl font-medium text-[#1D1B16]">No matching enclaves found</h3>
              <p className="text-xs text-[#7D7564] mt-1 mb-4">Try clearing your search term or selecting "All Enclaves".</p>
              <button
                onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
                className="px-4 py-2 bg-[#2C6E49] text-white text-xs font-semibold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* "Need Guidance? Not Sure Which Area Suits You?" Section */}
      <section className="py-20 lg:py-28 bg-[#EFEBE4] border-t border-[#E7DDCF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
            Need Guidance?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1D1B16] mb-6">
            Not Sure Which Area <span className="italic font-normal">Suits You?</span>
          </h2>
          <p className="text-[#5A5343] leading-relaxed mb-10 text-base sm:text-lg max-w-2xl mx-auto">
            Our local property advisors have lived and worked on the Costa Blanca for decades. Tell us what matters most to you — coastal lifestyle, investment yields, international schooling, or seclusion — and we will curate the ideal enclaves and properties for your brief.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenInquiry ? onOpenInquiry() : onNavigateToProperties?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#23583A] transition-colors rounded-xl shadow-sm cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToProperties?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-[#E7DDCF] text-[#1D1B16] font-medium text-xs tracking-wider uppercase hover:bg-[#FBF9F5] transition-colors rounded-xl shadow-sm cursor-pointer"
            >
              <span>Browse All Properties</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
