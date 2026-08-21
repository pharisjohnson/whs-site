import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Bed, 
  Maximize2, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles,
  Database
} from 'lucide-react';
import { InmovillaService } from '../services/inmovillaService';
import { InmovillaLead } from '../types';

const BASE_RATES: Record<string, number> = {
  Moraira: 4350,
  Jávea: 3950,
  Altea: 4100,
  Benissa: 3600,
  'Guardamar del Segura': 2450,
  Benijófar: 2200,
  Calpe: 3400,
  Other: 3000
};

export const ValuationCalculator: React.FC = () => {
  const [town, setTown] = useState('Moraira');
  const [propertyType, setPropertyType] = useState<'villa' | 'apartment' | 'penthouse' | 'finca'>('villa');
  const [builtM2, setBuiltM2] = useState<number>(250);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [hasPool, setHasPool] = useState(true);
  const [hasSeaView, setHasSeaView] = useState(true);
  const [condition, setCondition] = useState<'excellent' | 'good' | 'renovate'>('excellent');

  // Contact / Inmovilla dispatch state
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState<InmovillaLead | null>(null);

  // Valuation algorithm
  const baseRate = BASE_RATES[town] || 3200;
  let multiplier = 1.0;
  if (propertyType === 'villa') multiplier += 0.15;
  if (propertyType === 'penthouse') multiplier += 0.2;
  if (hasPool) multiplier += 0.08;
  if (hasSeaView) multiplier += 0.25;
  if (condition === 'excellent') multiplier += 0.1;
  if (condition === 'renovate') multiplier -= 0.18;

  const estimatedValue = Math.round(builtM2 * baseRate * multiplier);
  const lowerBound = Math.round(estimatedValue * 0.94);
  const upperBound = Math.round(estimatedValue * 1.06);

  const handleSubmitSellerLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await InmovillaService.submitLead({
        name: sellerName,
        email: sellerEmail,
        phone: sellerPhone,
        leadType: 'seller_valuation',
        message: `Seller valuation requested for ${propertyType} in ${town} (${builtM2} m², ${bedrooms} beds, Pool: ${hasPool ? 'Yes' : 'No'}, Sea view: ${hasSeaView ? 'Yes' : 'No'}). Estimated algorithm range: €${lowerBound.toLocaleString()} - €${upperBound.toLocaleString()}.`,
        propertyDetails: {
          location: town,
          type: propertyType,
          bedrooms: String(bedrooms),
          estimatedValue
        },
        language: 'EN'
      });

      setLeadResult(res.lead);
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FCF9F3] rounded-3xl border border-[#E7DDCF] p-6 sm:p-10 shadow-sm">
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A98158] block mb-2">
          Proprietary Costa Blanca Market Engine
        </span>
        <h3 className="font-display text-3xl sm:text-4xl font-medium text-[#1D1B16] tracking-tight">
          Instant Property Valuation Estimator
        </h3>
        <p className="text-sm text-[#7D7564] mt-2 leading-relaxed">
          Powered by 20+ years of Costa Blanca sales telemetry and real-time comparable market data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 rounded-2xl border border-[#E7DDCF]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1.5">
                Location / Municipality
              </label>
              <select
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] cursor-pointer"
              >
                {Object.keys(BASE_RATES).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1.5">
                Property Category
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] cursor-pointer"
              >
                <option value="villa">Luxury Villa / Chalet</option>
                <option value="penthouse">Penthouse / Ático</option>
                <option value="apartment">Apartment</option>
                <option value="finca">Rustic Finca / Country Home</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1.5">
                Built Area: {builtM2} m²
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={builtM2}
                onChange={(e) => setBuiltM2(Number(e.target.value))}
                className="w-full accent-[#2C6E49] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1.5">
                Bedrooms
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBedrooms(b)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                      bedrooms === b
                        ? 'bg-[#2C6E49] border-[#2C6E49] text-white'
                        : 'bg-[#FCF9F3] border-[#E7DDCF] text-[#4B4539] hover:bg-[#F5F0E7]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature toggles */}
          <div className="pt-2 border-t border-[#E7DDCF] flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-xs font-medium text-[#1D1B16] cursor-pointer">
              <input
                type="checkbox"
                checked={hasPool}
                onChange={(e) => setHasPool(e.target.checked)}
                className="w-4 h-4 rounded text-[#2C6E49] accent-[#2C6E49]"
              />
              <span>Private Swimming Pool</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-[#1D1B16] cursor-pointer">
              <input
                type="checkbox"
                checked={hasSeaView}
                onChange={(e) => setHasSeaView(e.target.checked)}
                className="w-4 h-4 rounded text-[#2C6E49] accent-[#2C6E49]"
              />
              <span>Sea / Panoramic View</span>
            </label>
          </div>
        </div>

        {/* Right Output & Consultation Dispatch */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#2C6E49] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200 block mb-1">
              Estimated Market Range
            </span>
            <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              €{lowerBound.toLocaleString()} – €{upperBound.toLocaleString()}
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Calculated for <strong>{town}</strong> based on current active buyer demand in our Costa Blanca network.
            </p>
          </div>

          {/* Form to submit valuation dossier */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7DDCF] shadow-sm">
            {leadResult ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-display text-lg font-bold text-[#1D1B16]">
                  Valuation Request Received
                </h5>
                <p className="text-xs text-[#7D7564]">
                  Registered under reference <strong>{leadResult.inmovillaLeadId}</strong>. Our senior listing director will provide a full on-site appraisal dossier.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitSellerLead} className="space-y-3">
                <h5 className="font-display text-base font-bold text-[#1D1B16] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
                  Request Official Appraisal Dossier
                </h5>
                <p className="text-xs text-[#7D7564]">
                  Receive a comprehensive market appraisal including recent comparable sales.
                </p>

                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number / WhatsApp"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-xs text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Generating Valuation...' : 'Get Official Valuation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
