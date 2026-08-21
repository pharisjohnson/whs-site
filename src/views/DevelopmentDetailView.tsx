import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Check, 
  ArrowLeft, 
  Database, 
  FileText, 
  ShieldCheck, 
  MessageCircle, 
  Send,
  Sparkles
} from 'lucide-react';
import { NewDevelopment } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface DevelopmentDetailViewProps {
  development: NewDevelopment;
  onBack: () => void;
  onOpenInquiry: (devTitle?: string) => void;
}

export const DevelopmentDetailView: React.FC<DevelopmentDetailViewProps> = ({
  development,
  onBack,
  onOpenInquiry
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCode, setLeadCode] = useState<string | null>(null);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await InmovillaService.submitLead({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        propertyRef: development.inmovillaRef,
        propertyTitle: `${development.name} (Unit: ${selectedUnit || 'General Dossier'})`,
        leadType: 'buyer_inquiry',
        message: `Dossier and floor plan request for ${development.name} (${development.location.town}). Selected Unit: ${selectedUnit || 'All floor plans'}.`,
        language: 'EN'
      });
      setLeadCode(res.lead.inmovillaLeadId || 'INMO-L-DEV');
    } catch {
      // handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/34633754809?text=${encodeURIComponent(`Hello World Housing Spain, I would like to receive the architectural dossier and price list for ${development.name} (Ref: ${development.inmovillaRef}).`)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4B4539] hover:text-[#2C6E49] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Developments</span>
      </button>

      {/* Hero Banner */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-[#EFE9DF] shadow-lg border border-[#E7DDCF]">
        <img
          src={development.heroImage}
          alt={development.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B16]/90 via-[#1D1B16]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[#2C6E49] text-white rounded-lg text-xs font-semibold uppercase tracking-wider">
                {development.status}
              </span>
              <span className="px-3 py-1 bg-[#1D1B16]/80 text-white rounded-lg text-xs font-mono">
                Ref: {development.inmovillaRef}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-white">
              {development.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#E7DDCF]/90 flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{development.location.address}, {development.location.town}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#E7DDCF] block">Prices Starting From</span>
            <span className="font-display text-3xl sm:text-4xl font-bold text-white">
              €{development.priceFrom.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#E7DDCF]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7D7564] block font-semibold">Total Units</span>
              <span className="font-display text-2xl font-bold text-[#1D1B16]">{development.totalUnits} Units</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7D7564] block font-semibold">Available</span>
              <span className="font-display text-2xl font-bold text-[#2C6E49]">{development.availableUnits} Active</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7D7564] block font-semibold">Handover Date</span>
              <span className="font-display text-2xl font-bold text-[#1D1B16]">{development.completionDate}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7D7564] block font-semibold">Energy Class</span>
              <span className="font-display text-2xl font-bold text-[#1D1B16]">{development.energyRating}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] space-y-4">
            <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
              Development Vision & Architecture
            </h3>
            <p className="text-[#4B4539] text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {development.description}
            </p>
          </div>

          {/* Available Units Table */}
          <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] space-y-4">
            <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
              Available Floor Plans & Typologies
            </h3>
            <p className="text-xs text-[#7D7564]">
              Select a typology below to request exact architectural blueprints and price schedule.
            </p>

            <div className="space-y-3 pt-2">
              {development.units.map((unit) => (
                <div
                  key={unit.unitNumber}
                  onClick={() => setSelectedUnit(unit.unitNumber)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-4 ${
                    selectedUnit === unit.unitNumber
                      ? 'border-[#2C6E49] bg-[#2C6E49]/5 shadow-sm'
                      : 'border-[#E7DDCF] bg-[#FCF9F3] hover:border-[#2C6E49]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-[#1D1B16]">
                        {unit.unitNumber}
                      </span>
                      <span className="text-xs uppercase font-semibold text-[#A98158] px-2 py-0.5 rounded bg-white border border-[#E7DDCF]">
                        {unit.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#7D7564] mt-1">
                      Floor: {unit.floor} · {unit.bedrooms} Bed · {unit.bathrooms} Bath · {unit.builtM2} m² living · {unit.terraceM2} m² terrace
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl font-bold text-[#1D1B16]">
                      €{unit.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                        selectedUnit === unit.unitNumber
                          ? 'bg-[#2C6E49] text-white'
                          : 'bg-white border border-[#E7DDCF] text-[#4B4539]'
                      }`}
                    >
                      {selectedUnit === unit.unitNumber ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-8 rounded-2xl border border-[#E7DDCF] space-y-4">
            <h3 className="font-display text-2xl font-semibold text-[#1D1B16]">
              Project Specifications & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {development.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#1D1B16]">
                  <div className="w-5 h-5 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dossier Request Form (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7DDCF] shadow-xl space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A98158] block mb-1">
                Developer Direct Dossier
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1D1B16]">
                Request Full Dossier & Price List
              </h3>
              <p className="text-xs text-[#7D7564] mt-1">
                Receive high-resolution floor plans, building specifications, and payment stages.
              </p>
            </div>

            {leadCode ? (
              <div className="text-center py-6 space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-display text-lg font-bold text-emerald-900">
                  Dossier Request Dispatched
                </h4>
                <p className="text-xs text-emerald-800">
                  Registered under reference <strong>{leadCode}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3.5">
                {selectedUnit && (
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 font-medium">
                    Selected Unit: <strong>{selectedUnit}</strong>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7D7564] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#2C6E49] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Dispatching...' : 'Request Project Dossier'}
                </button>
              </form>
            )}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Development Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
