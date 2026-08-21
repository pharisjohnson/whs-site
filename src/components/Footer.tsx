import React from 'react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenInmovillaHub?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 sm:pt-20 pb-12 bg-[#F5F0E7] text-[#1D1B16] font-body border-t border-[#CEC5B4]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <div 
              className="cursor-pointer inline-block" 
              onClick={() => handleNav('home')}
            >
              <img 
                src="https://worldhousingspain.eu/wp-content/uploads/2024/09/whs-logo-retina-500.png" 
                alt="World Housing Spain" 
                className="h-10 w-auto brightness-0 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback Vector Logo if asset fails to load */}
              <div style={{ display: 'none' }} className="flex items-center gap-3">
                <svg className="w-9 h-9 text-[#1D1B16]" viewBox="0 0 100 80" fill="currentColor">
                  <path d="M50 5 L95 40 L80 40 L50 16 L20 40 L5 40 Z" />
                  <path d="M50 35 L78 57 L70 57 L50 42 L30 57 L22 57 Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold tracking-tight text-[#1D1B16] leading-none">
                    World Housing
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#1D1B16] font-medium mt-0.5">
                    Spain
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[15px] sm:text-base leading-relaxed text-[#1D1B16]">
              <p>Luxury real estate on the Costa Blanca.</p>
              <p>Curating exceptional properties since 2005.</p>
            </div>

            <div className="text-[14px] text-[#1D1B16] space-y-1 pt-2">
              <p>+34 662 51 29 94 · +34 966 14 64 70</p>
              <p>
                <a 
                  href="mailto:worldhousingspain24@gmail.com" 
                  className="hover:text-[#2C6E49] transition-colors"
                >
                  worldhousingspain24@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Properties */}
          <div>
            <h3 className="text-lg font-normal text-[#1D1B16] mb-6">
              Properties
            </h3>
            <ul className="space-y-3.5 text-[15px] sm:text-base text-[#1D1B16]">
              <li>
                <button 
                  onClick={() => handleNav('properties')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Buy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('sell')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Sell
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('luxury')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Luxury
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('developments')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  New Developments
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-normal text-[#1D1B16] mb-6">
              Company
            </h3>
            <ul className="space-y-3.5 text-[15px] sm:text-base text-[#1D1B16]">
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-normal text-[#1D1B16] mb-6">
              Legal
            </h3>
            <ul className="space-y-3.5 text-[15px] sm:text-base text-[#1D1B16]">
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-[#2C6E49] transition-colors cursor-pointer text-left font-normal"
                >
                  Legal Notice
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Office Locations Strip */}
        <div className="py-6 my-6 border-y border-[#CEC5B4]/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#4B4539]">
          <div className="flex items-center gap-2 text-[#1D1B16] font-semibold">
            <span className="material-symbols-outlined text-xl text-[#2C6E49]">location_on</span>
            <span>Our Offices:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center md:text-left">
            <div>
              <span className="font-semibold text-[#1D1B16]">Moraira (Head Office):</span>{' '}
              <span>Calle Mayor 42, 03724 Moraira, Alicante</span>
            </div>
            <div>
              <span className="font-semibold text-[#1D1B16]">Elche:</span>{' '}
              <span>Calle Mayor 42, 03724 Moraira, Alicante</span>
            </div>
            <div>
              <span className="font-semibold text-[#1D1B16]">Santa Pola:</span>{' '}
              <span>Calle Mayor 42, 03724 Moraira, Alicante</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Media Icons */}
        <div className="pt-8 border-t border-[#CEC5B4]/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[#7D7564]">
          <p>© 2026 World Housing Spain. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/worldhousingspain" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7D7564] hover:text-[#2C6E49] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@worldhousing.spain" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7D7564] hover:text-[#2C6E49] transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.46V11.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.91-1.12l-.01.01z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/WorldHousingSpain" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7D7564] hover:text-[#2C6E49] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/world-housing-spain-3a1176385" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7D7564] hover:text-[#2C6E49] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
