import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Sun, 
  Users, 
  Waves, 
  TrendingUp, 
  Check, 
  Compass, 
  Building2, 
  Sparkles, 
  Calendar, 
  PhoneCall,
  Heart,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AreaGuide, Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';

interface AreaDetailViewProps {
  area: AreaGuide;
  allAreas: AreaGuide[];
  properties: Property[];
  onBack: () => void;
  onSelectArea: (slug: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenInquiry: (property?: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  onNavigateToProperties: (location?: string) => void;
}

export const AreaDetailView: React.FC<AreaDetailViewProps> = ({
  area,
  allAreas,
  properties,
  onBack,
  onSelectArea,
  onSelectProperty,
  onOpenInquiry,
  favorites,
  onToggleFavorite,
  onNavigateToProperties
}) => {
  // Find properties in this area
  const areaNameClean = area.name.split('/')[0].split('&')[0].trim().toLowerCase();
  
  const matchingProperties = properties.filter((p) => {
    const town = p.location.town.toLowerCase();
    const zone = (p.location.zone || '').toLowerCase();
    const title = p.title.toLowerCase();
    const desc = p.description.toLowerCase();

    return (
      town.includes(areaNameClean) ||
      areaNameClean.includes(town) ||
      zone.includes(areaNameClean) ||
      title.includes(areaNameClean) ||
      desc.includes(areaNameClean)
    );
  });

  // Fallback if none directly found (show top featured Costa Blanca properties)
  const displayProperties = matchingProperties.length > 0 
    ? matchingProperties 
    : properties.slice(0, 3);

  // Other neighboring areas (exclude current)
  const otherAreas = allAreas.filter(a => a.slug !== area.slug).slice(0, 3);

  // Helper icon for highlight items
  const getHighlightIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'museum':
      case 'architecture':
        return <Building2 className="w-5 h-5" />;
      case 'beach_access':
      case 'waves':
        return <Waves className="w-5 h-5" />;
      case 'sailing':
      case 'directions_boat':
        return <Compass className="w-5 h-5" />;
      case 'directions_walk':
      case 'park':
        return <Sparkles className="w-5 h-5" />;
      case 'groups':
        return <Users className="w-5 h-5" />;
      case 'sunny':
        return <Sun className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1D1B16]">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-end pb-16 sm:pb-20 overflow-hidden bg-[#1D1B16]">
        <div className="absolute inset-0">
          <img
            src={area.heroImage}
            alt={`${area.name} - ${area.tagline}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16] via-[#1D1B16]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#E7DDCF]/80">
              <li>
                <button
                  onClick={onBack}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[#C6BCAD]" />
              </li>
              <li>
                <button
                  onClick={onBack}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Area Guides
                </button>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[#C6BCAD]" />
              </li>
              <li className="text-white font-medium">
                {area.name}
              </li>
            </ol>
          </nav>

          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C2A37E] mb-3">
            Area Guide
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-3">
            {area.name}
          </h1>
          <p className="text-lg sm:text-2xl text-[#E7DDCF] max-w-2xl leading-relaxed font-serif italic">
            {area.tagline || area.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction & Key Quick Facts */}
      <section className="py-20 lg:py-28 bg-[#FBF9F5]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* 3 Prominent Stat Boxes */}
          {area.introStats && area.introStats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {area.introStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] shadow-sm flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                    {getHighlightIcon(stat.icon)}
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-medium text-[#1D1B16] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#7D7564] uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Narrative Paragraphs */}
          <div className="text-[#5A5343] leading-relaxed text-base sm:text-lg space-y-6">
            {area.introParagraphs && area.introParagraphs.length > 0 ? (
              area.introParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            ) : (
              <p>{area.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Local Highlights Bento Grid */}
      {area.highlights && area.highlights.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#EFEBE4] border-y border-[#E7DDCF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-3">
                Highlights
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1B16]">
                Life in <span className="italic font-normal">{area.name}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {area.highlights.map((hl, idx) => {
                const isLarge = hl.isLarge || idx === 0;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden bg-[#1D1B16] group shadow-md ${
                      isLarge
                        ? 'md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[480px]'
                        : 'min-h-[220px]'
                    }`}
                  >
                    <img
                      src={hl.image}
                      alt={hl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/90 via-[#1D1B16]/30 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <div className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 backdrop-blur-md text-white mb-2">
                        {getHighlightIcon(hl.icon)}
                      </div>
                      <h3 className={`font-display font-medium text-white mb-1 ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                        {hl.title}
                      </h3>
                      {hl.description && (
                        <p className="text-xs sm:text-sm text-[#E7DDCF] max-w-lg mt-1 line-clamp-3">
                          {hl.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Property Market Overview */}
      <section className="py-20 lg:py-28 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-3">
                  Market Overview
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1B16]">
                  {area.marketHeading || `The ${area.name} Property Market`}
                </h2>
              </div>

              <div className="text-[#5A5343] leading-relaxed space-y-4 text-sm sm:text-base">
                {area.marketParagraphs && area.marketParagraphs.length > 0 ? (
                  area.marketParagraphs.map((mp, idx) => (
                    <p key={idx}>{mp}</p>
                  ))
                ) : (
                  <p>
                    {area.name}'s property market remains among the most sought-after on the Costa Blanca, combining strong capital appreciation with high rental demand from international second-home buyers and investors.
                  </p>
                )}
              </div>

              {/* 4 Market Metric Cards */}
              {area.marketMetrics && area.marketMetrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {area.marketMetrics.map((met, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 bg-[#FCF9F3] rounded-xl border border-[#E7DDCF] shadow-sm"
                    >
                      <p className="text-[10px] sm:text-xs text-[#7D7564] uppercase tracking-wide mb-1 font-medium">
                        {met.label}
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-medium text-[#1D1B16]">
                        {met.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-[#EFE9DF] overflow-hidden rounded-2xl shadow-lg border border-[#E7DDCF]">
                <img
                  src={area.marketImg || area.gallery[1] || area.heroImage}
                  alt={`Real estate in ${area.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties in this Area */}
      <section className="py-20 lg:py-28 bg-[#EFEBE4] border-t border-[#E7DDCF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-3">
                Featured in {area.name}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#1D1B16]">
                Available <span className="italic font-normal">Properties</span>
              </h2>
            </div>

            <button
              onClick={() => onNavigateToProperties(area.name)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#2C6E49] hover:text-[#23583A] transition-colors group mt-4 md:mt-0 cursor-pointer"
            >
              <span>View All Properties in {area.name}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onOpenInquiry={onOpenInquiry}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Neighboring Enclaves */}
      {otherAreas.length > 0 && (
        <section className="py-20 lg:py-24 bg-[#FBF9F5] border-t border-[#E7DDCF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-2">
                  Nearby Enclaves
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1D1B16]">
                  Explore Other <span className="italic font-normal">Costa Blanca Destinations</span>
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-semibold uppercase tracking-wider text-[#2C6E49] hover:underline mt-3 sm:mt-0 cursor-pointer"
              >
                View All 10 Area Guides
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherAreas.map((neighbor) => (
                <div
                  key={neighbor.id}
                  onClick={() => onSelectArea(neighbor.slug)}
                  className="group bg-[#FCF9F3] rounded-2xl overflow-hidden border border-[#E7DDCF] shadow-sm hover:shadow-md hover:border-[#2C6E49]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#EFE9DF] relative">
                    <img
                      src={neighbor.heroImage}
                      alt={neighbor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase bg-[#2C6E49] text-white rounded-full">
                        {neighbor.tag || 'Enclave'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display text-xl font-medium text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors mb-1">
                      {neighbor.name}
                    </h4>
                    <p className="text-xs text-[#A98158] italic font-serif mb-2">
                      {neighbor.tagline || neighbor.subtitle}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#2C6E49] font-medium pt-3 border-t border-[#E7DDCF]">
                      <span>Read Area Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="py-24 lg:py-32 bg-[#EFEBE4] border-t border-[#E7DDCF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1D1B16] mb-6">
            Discover <span className="italic font-normal">{area.name}</span>
          </h2>
          <p className="text-[#5A5343] leading-relaxed mb-10 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you are looking for a permanent residence, a summer villa, or a high-yielding investment, our team is ready to guide you to the perfect property in {area.name}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenInquiry ? onOpenInquiry() : onNavigateToProperties(area.name)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#23583A] transition-colors rounded-xl shadow-sm cursor-pointer"
            >
              <span>Schedule a Viewing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-[#E7DDCF] text-[#1D1B16] font-medium text-xs tracking-wider uppercase hover:bg-[#FBF9F5] transition-colors rounded-xl shadow-sm cursor-pointer"
            >
              <span>Explore All Areas</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
