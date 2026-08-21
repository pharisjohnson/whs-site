import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Landmark, 
  Compass, 
  FileCheck2, 
  Key, 
  ArrowRight,
  Database
} from 'lucide-react';

interface ServicesViewProps {
  onOpenInquiry: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98158] block">
          End-to-End Real Estate Concierge
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1B16]">
          Comprehensive Client Services
        </h1>
        <p className="text-sm sm:text-base text-[#7D7564] leading-relaxed">
          From legal title deed verification and Golden Visa residency to Spanish banking, bespoke construction management, and turnkey interior design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Service 1 */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
            Legal, NIE & Golden Visa Advisory
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7564] leading-relaxed">
            We collaborate exclusively with certified Spanish real estate attorneys (*Abogados*) to audit property titles, handle Power of Attorney (PoA), register Spanish tax numbers (NIE), and process residency applications for non-EU property investors.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#A98158]/15 text-[#A98158] flex items-center justify-center font-bold">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
            Mortgage Financing & Bank Relations
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7564] leading-relaxed">
            Our established relationships with leading Spanish banks (Banco Sabadell, CaixaBank, Santander) facilitate competitive non-resident mortgage financing up to 70% Loan-to-Value (LTV) with fixed or Euribor-linked terms.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#3A7288]/15 text-[#3A7288] flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
            Architecture & Project Management
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7564] leading-relaxed">
            Turnkey architectural design, municipal building licenses, Porcelanosa interior selections, infinity pool engineering, and complete contractor oversight for new construction and luxury villa reforms.
          </p>
        </div>

        {/* Service 4 */}
        <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold">
            <Key className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
            Property Management & Concierge
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7564] leading-relaxed">
            Key holding, regular estate inspections, bilingual utility contract setup, pool and garden maintenance coordination, and luxury seasonal rental licensing assistance.
          </p>
        </div>
      </div>

      <div className="bg-[#2C6E49] text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-display text-3xl font-bold">Require Tailored Advisory?</h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Book a confidential consultation with our senior advisory team.
          </p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="px-8 py-3.5 bg-white text-[#2C6E49] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#FCF9F3] transition-colors cursor-pointer"
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
};
