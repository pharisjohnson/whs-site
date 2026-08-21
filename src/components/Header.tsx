import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Phone,
  MessageCircle,
  Building,
  Sparkles,
  Database
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
  onOpenInquiry?: () => void;
  inmovillaConfig?: any;
  onOpenInmovillaHub?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  favoritesCount = 0,
  onOpenFavorites,
  onOpenInquiry,
  inmovillaConfig,
  onOpenInmovillaHub
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const buyDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buyDropdownRef.current && !buyDropdownRef.current.contains(event.target as Node)) {
        setBuyDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile nav on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileNavOpen(false);
        setBuyDropdownOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileNavOpen(false);
    setBuyDropdownOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#2C6E49] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6E49] focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Main Sticky/Fixed Header */}
      <header 
        id="site-header" 
        className="sticky top-0 left-0 right-0 z-50 bg-[#FCF9F3]/95 backdrop-blur-xl border-b border-[#cec5b4]/50 shadow-[0_1rem_2rem_-1rem_rgba(0,0,0,0.05)] transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <button 
              onClick={() => handleNav('home')} 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
              aria-label="World Housing Spain Homepage"
            >
              {!logoError ? (
                <img 
                  src="https://worldhousingspain.eu/wp-content/uploads/2024/09/whs-logo-retina-500.png" 
                  alt="World Housing Spain" 
                  className="h-10 sm:h-11 w-auto brightness-0"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2C6E49] text-white flex items-center justify-center font-display text-xl font-bold">
                    W
                  </div>
                  <div>
                    <span className="font-display text-xl font-bold tracking-tight text-[#1D1B16] block leading-none">
                      World Housing Spain
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#7D7564] font-medium block mt-1">
                      Costa Blanca Luxury Real Estate
                    </span>
                  </div>
                </div>
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10" aria-label="Main navigation">
              <button 
                onClick={() => handleNav('home')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'home' 
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                Home
              </button>

              <button 
                onClick={() => handleNav('about')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'about' 
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                About Us
              </button>

              {/* Buy Dropdown */}
              <div 
                ref={buyDropdownRef}
                className="relative py-2 group"
                onMouseEnter={() => setBuyDropdownOpen(true)}
                onMouseLeave={() => setBuyDropdownOpen(false)}
              >
                <button 
                  onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors focus:outline-none cursor-pointer ${
                    currentView === 'properties' || currentView === 'developments'
                      ? 'text-[#2C6E49] font-semibold'
                      : 'text-[#2C6E49] hover:text-[#A98158]'
                  }`}
                  aria-expanded={buyDropdownOpen}
                >
                  <span>Buy</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div 
                  className={`absolute left-0 mt-2 w-52 bg-[#FCF9F3]/95 backdrop-blur-xl border border-[#E7DDCF] rounded-2xl shadow-xl transition-all duration-200 z-50 py-2.5 ${
                    buyDropdownOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <button 
                    onClick={() => handleNav('developments')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    New Builds
                  </button>
                  <button 
                    onClick={() => handleNav('properties')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Resale Properties
                  </button>
                  <button 
                    onClick={() => handleNav('properties', 'villa')}
                    className="w-full text-left block px-4 py-2 text-xs text-[#4B4539] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Exclusive Villas
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleNav('sell')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'sell' 
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                Sell
              </button>

              <button 
                onClick={() => handleNav('luxury')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'luxury' 
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                Luxury
              </button>

              <button 
                onClick={() => handleNav('areas')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'areas' || currentView === 'area-detail'
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                Areas
              </button>

              {/* Services Dropdown */}
              <div 
                ref={servicesDropdownRef}
                className="relative py-2 group"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button 
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors focus:outline-none cursor-pointer ${
                    currentView === 'services'
                      ? 'text-[#2C6E49] font-semibold'
                      : 'text-[#2C6E49] hover:text-[#A98158]'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div 
                  className={`absolute left-0 mt-2 w-60 bg-[#FCF9F3]/95 backdrop-blur-xl border border-[#E7DDCF] rounded-2xl shadow-xl transition-all duration-200 z-50 py-2.5 ${
                    servicesDropdownOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <button 
                    onClick={() => handleNav('sell')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Property Valuation
                  </button>
                  <button 
                    onClick={() => handleNav('services')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Legal & Golden Visa Advice
                  </button>
                  <button 
                    onClick={() => handleNav('services')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Mortgages & Non-Resident Financing
                  </button>
                  <button 
                    onClick={() => handleNav('services')}
                    className="w-full text-left block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#2C6E49] hover:text-[#A98158] hover:bg-[#F5F0E7] transition-colors cursor-pointer"
                  >
                    Full-Service Management
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleNav('contact')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  currentView === 'contact' 
                    ? 'text-[#2C6E49] font-semibold' 
                    : 'text-[#2C6E49] hover:text-[#A98158]'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Consultation / Valuation CTA */}
              <button
                onClick={() => onOpenInquiry ? onOpenInquiry() : handleNav('contact')}
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#225639] transition-all shadow-xs cursor-pointer"
              >
                <span>Book Consultation</span>
              </button>

              {/* Mobile Menu Button */}
              <button 
                id="open-mobile-nav" 
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 text-[#2C6E49] hover:bg-[#F5F0E7] rounded-xl transition-colors cursor-pointer" 
                aria-label="Open menu" 
                aria-expanded={mobileNavOpen} 
                aria-controls="mobile-nav"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div 
          id="mobile-nav" 
          className="fixed inset-0 z-50 bg-[#FCF9F3]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
          role="dialog" 
          aria-modal="true" 
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#E7DDCF]">
            <button 
              onClick={() => handleNav('home')}
              className="text-left"
            >
              <span className="font-display text-xl font-bold tracking-tight text-[#1D1B16] block">
                World Housing Spain
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7D7564]">
                Costa Blanca Luxury
              </span>
            </button>
            
            <button 
              id="close-mobile-nav" 
              onClick={() => setMobileNavOpen(false)}
              className="p-2.5 text-[#2C6E49] bg-[#EFE9DF] rounded-full hover:bg-[#2C6E49] hover:text-white transition-colors cursor-pointer" 
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-5 overflow-y-auto py-8">
            <button 
              onClick={() => handleNav('home')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              Home
            </button>

            <button 
              onClick={() => handleNav('about')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              About Us
            </button>

            {/* Buy Submenu */}
            <div className="text-center my-1 bg-[#F5F0E7] w-full max-w-xs py-3 px-4 rounded-2xl border border-[#E7DDCF]">
              <span className="text-xs uppercase tracking-widest text-[#7D7564] font-semibold block mb-2">
                Buy Portfolio
              </span>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleNav('developments')}
                  className="text-lg font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  New Builds
                </button>
                <button 
                  onClick={() => handleNav('properties')}
                  className="text-lg font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  Resale Properties
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleNav('sell')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              Sell
            </button>

            <button 
              onClick={() => handleNav('luxury')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              Luxury
            </button>

            <button 
              onClick={() => handleNav('areas')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              Areas
            </button>

            {/* Services Submenu */}
            <div className="text-center my-1 bg-[#F5F0E7] w-full max-w-xs py-3 px-4 rounded-2xl border border-[#E7DDCF]">
              <span className="text-xs uppercase tracking-widest text-[#7D7564] font-semibold block mb-2">
                Services
              </span>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleNav('sell')}
                  className="text-base font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  Property Valuation
                </button>
                <button 
                  onClick={() => handleNav('services')}
                  className="text-base font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  Legal & NIE Advice
                </button>
                <button 
                  onClick={() => handleNav('services')}
                  className="text-base font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  Mortgages
                </button>
                <button 
                  onClick={() => handleNav('services')}
                  className="text-base font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
                >
                  Full-Service Management
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleNav('contact')}
              className="text-2xl font-display font-medium text-[#2C6E49] hover:text-[#A98158] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="pt-6 border-t border-[#E7DDCF] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                if (onOpenInquiry) onOpenInquiry();
                else handleNav('contact');
              }}
              className="w-full py-3.5 bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#225639] transition-colors text-center cursor-pointer"
            >
              Book Direct Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};
