import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Globe, 
  Headset, 
  Languages, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  BadgeCheck, 
  X, 
  MessageCircle, 
  Building,
  Mail
} from 'lucide-react';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';

interface AgentModalData {
  id: string;
  name: string;
  title: string;
  img: string;
  license: string;
  office: string;
  mobile: string;
  fax: string;
  whatsapp: string;
  email: string;
  bio: string;
}

const AGENTS: Record<string, AgentModalData> = {
  mariluz: {
    id: 'mariluz',
    name: 'Mari Luz Sánchez',
    title: 'CEO & Managing Director',
    img: '/images/mariluz-sanchez.jpg',
    license: '+34 966 14 64 70',
    office: '+34 966 14 64 70',
    mobile: '+34 645 44 26 32',
    fax: '+34 966 14 64 70',
    whatsapp: '+34 645 44 26 32',
    email: 'info@worldhousingspain.eu',
    bio: 'With more than 28 years of experience in the real estate sector, Mari Luz Sánchez has built her career on integrity, personalised service, and a deep understanding of the market. A registered real estate agent and businesswoman, her primary priority is protecting the interests of each client, ensuring clear, secure, and well-managed processes. Her leadership is based on trust and a commitment to providing professional service with a personal touch.'
  },
  ana: {
    id: 'ana',
    name: 'Ana Isabel Obando',
    title: 'Commercial Director & Real Estate Advisor',
    img: 'https://hallowed-grove-a5gc.here.now/images/ana-isa.jpg',
    license: '+34 966 14 64 70',
    office: '+34 966 14 64 70',
    mobile: '+34 633 75 48 09',
    fax: '+34 966 14 64 70',
    whatsapp: '+34 633 75 48 09',
    email: 'info@worldhousingspain.eu',
    bio: 'Ana Isabel brings more than 24 years of experience in strategic business development, marketing, and brand positioning in multinational environments. At World Housing Spain she leads commercial strategy and expansion, focusing on acquiring qualified clients and strengthening the brand\'s presence in key markets. Her contribution combines strategic vision, structure, and a results-driven approach, ensuring each property is properly positioned and every client receives professional and efficient service.'
  }
};

interface AboutViewProps {
  onNavigate?: (view: string, param?: string) => void;
  onOpenInquiry?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenInquiry }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentModalData | null>(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAgent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#FCF9F3] text-[#1D1B16]">
      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-32 bg-[#F5F0E7] overflow-hidden border-b border-[#E7DDCF]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&q=80" 
            alt="Traditional Spanish villa with terracotta roof and Mediterranean garden" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E7] via-[#F5F0E7]/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D7564] mb-4">
              Who We Are
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1D1B16] mb-6">
              World Housing Spain<span className="italic font-serif text-[#A98158]">.</span>
            </h1>
            <p className="text-[#4B4539] text-lg sm:text-xl font-light leading-relaxed">
              Real Estate. Strategy. Trust.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="py-20 lg:py-28 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98158] mb-3">
                Our Foundation
              </p>
              <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight text-[#1D1B16] mb-6">
                Who <span className="italic font-serif">We Are</span>
              </h2>
              <div className="space-y-5 text-[#4B4539] leading-relaxed text-base sm:text-lg font-light">
                <p>
                  World Housing Spain is a real estate agency specialising in premium properties and investment opportunities on the Costa Blanca. We work with international buyers and property owners who are looking for more than just a transaction — they are seeking clarity, security, and strategic advice.
                </p>
                <p>
                  Our approach combines real estate expertise, business vision, and highly personalised service. We understand that acquiring or selling a high-value property is not just a financial operation — it is a lifestyle and asset decision.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E7DDCF] flex items-center gap-6">
                <div>
                  <p className="font-display text-2xl font-bold text-[#2C6E49]">Est. 2005</p>
                  <p className="text-xs uppercase tracking-wider text-[#7D7564]">Moraira, Spain</p>
                </div>
                <div className="w-px h-8 bg-[#CEC5B4]"></div>
                <div>
                  <p className="font-display text-2xl font-bold text-[#2C6E49]">Costa Blanca</p>
                  <p className="text-xs uppercase tracking-wider text-[#7D7564]">North & South Specialists</p>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] bg-[#EFE9DF] rounded-2xl overflow-hidden border border-[#E7DDCF] shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" 
                alt="Modern luxury home in Costa Blanca with Mediterranean architecture" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services Section */}
      <section className="py-20 lg:py-28 bg-[#F5F0E7] border-y border-[#E7DDCF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D7564] mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight text-[#1D1B16]">
              Our <span className="italic font-serif">Services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="p-8 bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] text-center shadow-xs hover:border-[#2C6E49] transition-all group">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center group-hover:bg-[#2C6E49] group-hover:text-white transition-colors">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1D1B16] mb-3">
                Full-Service Advisory
              </h3>
              <p className="text-xs text-[#4B4539] leading-relaxed">
                Integral advisory in the purchase and sale of premium properties, from valuation to completion.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] text-center shadow-xs hover:border-[#2C6E49] transition-all group">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center group-hover:bg-[#2C6E49] group-hover:text-white transition-colors">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1D1B16] mb-3">
                International Marketing
              </h3>
              <p className="text-xs text-[#4B4539] leading-relaxed">
                International commercialisation strategies to connect your property with qualified buyers worldwide.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] text-center shadow-xs hover:border-[#2C6E49] transition-all group">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center group-hover:bg-[#2C6E49] group-hover:text-white transition-colors">
                <Headset className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1D1B16] mb-3">
                Professional Management
              </h3>
              <p className="text-xs text-[#4B4539] leading-relaxed">
                Professional management and full accompaniment throughout the entire process, from listing to closing.
              </p>
            </div>

            {/* Service 4 */}
            <div className="p-8 bg-[#FCF9F3] rounded-2xl border border-[#E7DDCF] text-center shadow-xs hover:border-[#2C6E49] transition-all group">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center group-hover:bg-[#2C6E49] group-hover:text-white transition-colors">
                <Languages className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1D1B16] mb-3">
                Multilingual Service
              </h3>
              <p className="text-xs text-[#4B4539] leading-relaxed">
                Multilingual support with certified translation for official documentation and procedures.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center bg-[#FCF9F3] p-8 rounded-2xl border border-[#E7DDCF]">
            <p className="text-[#4B4539] leading-relaxed text-sm sm:text-base">
              In addition to our expertise in the property market, we offer representation services for international clients who are not physically present in Spain. We also provide certified translation for documentation and official procedures, ensuring our foreign clients can proceed with complete confidence, clarity, and professional support.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Proven Authority Stats Bar (Olive Green) */}
      <section className="py-16 lg:py-24 bg-[#2C6E49] text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="pt-4 md:pt-0">
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                28+
              </p>
              <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider">
                Years Experience
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                500+
              </p>
              <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider">
                Properties Sold
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                €2B+
              </p>
              <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider">
                Total Sales
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                3
              </p>
              <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider">
                Office Locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Team Section */}
      <section id="team" className="py-20 lg:py-28 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D7564] mb-3">
              Our Leadership
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight text-[#1D1B16]">
              The <span className="italic font-serif">Team</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 max-w-4xl mx-auto">
            {/* Mari Luz Sánchez */}
            <div className="bg-[#F5F0E7] p-8 sm:p-10 rounded-3xl border border-[#E7DDCF] text-center flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-[#EFE9DF] overflow-hidden border-2 border-[#A98158]/30 shadow-md">
                  <img 
                    src={AGENTS.mariluz.img} 
                    alt="Mari Luz Sánchez" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback elegant portrait if host is unavailable
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80";
                    }}
                  />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1D1B16] mb-1">
                  Mari Luz Sánchez
                </h3>
                <p className="text-sm text-[#2C6E49] font-semibold mb-4">
                  CEO & Managing Director
                </p>
                <p className="text-xs sm:text-sm text-[#4B4539] leading-relaxed font-light">
                  With more than 28 years of experience in the real estate sector, Mari Luz Sánchez has built her career on integrity, personalised service, and a deep understanding of the market. A registered real estate agent and businesswoman, her primary priority is protecting the interests of each client, ensuring clear, secure, and well-managed processes.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E7DDCF] flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61558765943028" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-[#CEC5B4] bg-[#FCF9F3] flex items-center justify-center text-[#4B4539] hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                    aria-label="Facebook Mari Luz Sánchez"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/worldhousingspain/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-[#CEC5B4] bg-[#FCF9F3] flex items-center justify-center text-[#4B4539] hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                    aria-label="Instagram Mari Luz Sánchez"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>

                <button 
                  onClick={() => setSelectedAgent(AGENTS.mariluz)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#2C6E49] text-white rounded-xl hover:bg-[#225639] transition-colors cursor-pointer shadow-xs"
                >
                  <BadgeCheck className="w-4 h-4" />
                  <span>Agent Credentials</span>
                </button>
              </div>
            </div>

            {/* Ana Isabel Obando */}
            <div className="bg-[#F5F0E7] p-8 sm:p-10 rounded-3xl border border-[#E7DDCF] text-center flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-[#EFE9DF] overflow-hidden border-2 border-[#A98158]/30 shadow-md">
                  <img 
                    src={AGENTS.ana.img} 
                    alt="Ana Isabel Obando" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80";
                    }}
                  />
                </div>
                <h3 className="font-display text-2xl font-medium text-[#1D1B16] mb-1">
                  Ana Isabel Obando
                </h3>
                <p className="text-sm text-[#2C6E49] font-semibold mb-4">
                  Commercial Director & Real Estate Advisor
                </p>
                <p className="text-xs sm:text-sm text-[#4B4539] leading-relaxed font-light">
                  Ana Isabel brings more than 24 years of experience in strategic business development, marketing, and brand positioning in multinational environments. At World Housing Spain she leads commercial strategy and expansion, focusing on acquiring qualified clients and strengthening the brand's presence in key markets.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E7DDCF] flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61558765943028" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-[#CEC5B4] bg-[#FCF9F3] flex items-center justify-center text-[#4B4539] hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                    aria-label="Facebook Ana Isabel Obando"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/worldhousingspain/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-[#CEC5B4] bg-[#FCF9F3] flex items-center justify-center text-[#4B4539] hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                    aria-label="Instagram Ana Isabel Obando"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>

                <button 
                  onClick={() => setSelectedAgent(AGENTS.ana)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#2C6E49] text-white rounded-xl hover:bg-[#225639] transition-colors cursor-pointer shadow-xs"
                >
                  <BadgeCheck className="w-4 h-4" />
                  <span>Agent Credentials</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Approach Section */}
      <section className="py-20 lg:py-28 bg-[#F5F0E7] border-y border-[#E7DDCF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D7564] mb-3">
              How We Work
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight text-[#1D1B16]">
              Our <span className="italic font-serif">Approach</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* For Buyers */}
            <div className="p-8 sm:p-10 bg-[#FCF9F3] rounded-3xl border border-[#E7DDCF] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1D1B16]">
                  For Buyers
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-[#4B4539]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Access to carefully selected properties matched to your requirements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Clear, professional advice at every stage of the process.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Legal and administrative accompaniment throughout.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Transparent communication with no pressure.</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate ? onNavigate('properties') : onOpenInquiry?.()}
                className="w-full py-3 bg-[#EFE9DF] hover:bg-[#2C6E49] text-[#1D1B16] hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer mt-4"
              >
                Browse Buyer Portfolio
              </button>
            </div>

            {/* For Sellers */}
            <div className="p-8 sm:p-10 bg-[#FCF9F3] rounded-3xl border border-[#E7DDCF] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#A98158]/15 text-[#A98158] flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1D1B16]">
                  For Sellers
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-[#4B4539]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Premium positioning strategy tailored to the luxury segment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>International marketing and qualified exposure to global buyers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Professional negotiation management to maximise your return.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C6E49] shrink-0 mt-0.5" />
                  <span>Protection of your property's image and value throughout.</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate ? onNavigate('sell') : onOpenInquiry?.()}
                className="w-full py-3 bg-[#EFE9DF] hover:bg-[#2C6E49] text-[#1D1B16] hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer mt-4"
              >
                Request Property Valuation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Commitment Section */}
      <section className="py-20 lg:py-28 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7D7564]">
              Our Commitment
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1D1B16]">
              Trust. Results. <span className="italic font-serif text-[#A98158]">Reputation.</span>
            </h2>
            <p className="text-[#4B4539] leading-relaxed text-base sm:text-lg font-light">
              We do not chase volume. We build long-term relationships based on trust, results, and reputation. World Housing Spain represents a modern, strategic vision of the real estate sector on the Costa Blanca — where business expertise and a personal touch go hand in hand.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate ? onNavigate('contact') : onOpenInquiry?.()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#225639] transition-all shadow-md cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+34966146470"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#7D7564] text-[#1D1B16] text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#F5F0E7] transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#2C6E49]" />
                <span>+34 966 14 64 70</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Office Locations & Regional Map */}
      <OfficeLocationsSection
        id="offices"
        subtitle="Our Offices"
        title="Visit Us in"
        titleEmphasis="Person"
        showMap={true}
        mapSubtitle="Find Us"
        mapTitle="Our"
        mapTitleEmphasis="Location"
        bgOffices="bg-[#F5F0E7]"
        bgMap="bg-[#FCF9F3]"
      />

      {/* Interactive Agent Credentials Modal */}
      {selectedAgent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedAgent(null);
          }}
        >
          <div className="bg-[#FCF9F3] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E7DDCF] relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedAgent(null)} 
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#EFE9DF] text-[#4B4539] hover:bg-[#2C6E49] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#EFE9DF] overflow-hidden border-2 border-[#A98158]/30 shadow-md">
                <img 
                  src={selectedAgent.img} 
                  alt={selectedAgent.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80";
                  }}
                />
              </div>
              <h3 className="font-display text-2xl font-medium text-[#1D1B16]">
                {selectedAgent.name}
              </h3>
              <p className="text-xs text-[#2C6E49] font-semibold tracking-wide uppercase mt-1">
                {selectedAgent.title}
              </p>
            </div>

            <div className="space-y-3 bg-[#F5F0E7] p-5 rounded-2xl border border-[#E7DDCF]">
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#CEC5B4]/50">
                <span className="text-[#7D7564]">Professional Registration</span>
                <span className="font-semibold text-[#1D1B16]">{selectedAgent.license}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#CEC5B4]/50">
                <span className="text-[#7D7564]">Head Office</span>
                <a href={`tel:${selectedAgent.office.replace(/\s+/g, '')}`} className="font-semibold text-[#2C6E49] hover:underline">
                  {selectedAgent.office}
                </a>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#CEC5B4]/50">
                <span className="text-[#7D7564]">Direct Mobile</span>
                <a href={`tel:${selectedAgent.mobile.replace(/\s+/g, '')}`} className="font-semibold text-[#2C6E49] hover:underline">
                  {selectedAgent.mobile}
                </a>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#CEC5B4]/50">
                <span className="text-[#7D7564]">Direct Email</span>
                <a href={`mailto:${selectedAgent.email}`} className="font-semibold text-[#2C6E49] hover:underline">
                  {selectedAgent.email}
                </a>
              </div>
              <div className="flex justify-between items-center text-xs py-2">
                <span className="text-[#7D7564]">Direct WhatsApp</span>
                <a 
                  href={`https://wa.me/${selectedAgent.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{selectedAgent.whatsapp}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`https://wa.me/${selectedAgent.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#25D366] text-white rounded-xl text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${selectedAgent.mobile.replace(/\s+/g, '')}`}
                className="flex-1 py-3 bg-[#2C6E49] text-white rounded-xl text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:bg-[#225639] transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
