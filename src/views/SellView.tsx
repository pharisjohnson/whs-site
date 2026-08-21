import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Globe2, 
  ShieldCheck, 
  Users, 
  Wrench, 
  Bath, 
  Waves, 
  Trees, 
  Hammer, 
  Palette, 
  Zap, 
  FileText,
  Building2,
  Sparkles,
  Award
} from 'lucide-react';
import { ValuationCalculator } from '../components/ValuationCalculator';

interface SellViewProps {
  onOpenInquiry?: (initialMessage?: string) => void;
  onNavigateToContact?: () => void;
}

export const SellView: React.FC<SellViewProps> = ({ 
  onOpenInquiry,
  onNavigateToContact 
}) => {
  const handleScrollToValuation = () => {
    const el = document.getElementById('valuation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactAction = (serviceTopic?: string) => {
    if (onOpenInquiry) {
      onOpenInquiry(serviceTopic ? `I am interested in ${serviceTopic} for my property.` : undefined);
    } else if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#1d1b16]">
      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-32 bg-[#f5f0e7] overflow-hidden border-b border-[#cec5b4]/60">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80"
            alt="Luxury Mediterranean villa with infinity pool overlooking the sea"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F3]/90 via-[#FCF9F3]/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
              Sell With Confidence
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1d1b16] mb-6">
              Sell Your <span className="italic font-normal">Property</span>
            </h1>
            <p className="text-[#4b4539] text-base sm:text-lg leading-relaxed mb-8">
              From valuation to closing, our team delivers a premium selling experience tailored to the Costa Blanca luxury market.
            </p>
            <button
              onClick={handleScrollToValuation}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#225639] transition-colors shadow-sm cursor-pointer"
            >
              <span>Request a Valuation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Property Valuation Estimator Section */}
      <section id="valuation-section" className="py-16 lg:py-24 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ValuationCalculator />
        </div>
      </section>

      {/* 3. Editorial / Why List With Us */}
      <section className="py-20 lg:py-28 bg-[#f5f0e7] border-y border-[#cec5b4]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/3] bg-[#efe9df] rounded-xl overflow-hidden shadow-md border border-[#cec5b4]/60">
              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18f2b3d9a?w=800&q=80"
                alt="Elegant living room with panoramic sea views through floor-to-ceiling windows"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
                Why List With Us
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1d1b16] mb-6">
                A <span className="italic font-normal">Premium</span> Approach to Selling
              </h2>
              <div className="space-y-4 text-[#4b4539] text-base leading-relaxed">
                <p>
                  Selling a luxury property requires more than a listing on a website. It demands a strategic approach, a deep understanding of the market, and access to the right buyers.
                </p>
                <p>
                  At World Housing Spain, we combine local expertise with a global reach. Our portfolio attracts discerning buyers from across Europe, the UK, and beyond — individuals seeking the finest properties the Costa Blanca has to offer.
                </p>
                <p>
                  From professional photography and videography to targeted digital marketing and private viewings, every aspect of your sale is handled with meticulous attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process / How It Works */}
      <section className="py-20 lg:py-28 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
              How It Works
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1d1b16]">
              Your Selling <span className="italic font-normal">Journey</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-[#ffffff] p-8 rounded-xl border border-[#cec5b4]/60 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2C6E49]/10 flex items-center justify-center">
                <span className="font-display text-2xl font-medium text-[#2C6E49]">01</span>
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Valuation</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                Our experts assess your property and provide a comprehensive market valuation backed by data and local insight.
              </p>
            </div>

            <div className="text-center bg-[#ffffff] p-8 rounded-xl border border-[#cec5b4]/60 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2C6E49]/10 flex items-center justify-center">
                <span className="font-display text-2xl font-medium text-[#2C6E49]">02</span>
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Preparation</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                Professional photography, virtual tours, and premium marketing materials showcase your property at its best.
              </p>
            </div>

            <div className="text-center bg-[#ffffff] p-8 rounded-xl border border-[#cec5b4]/60 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2C6E49]/10 flex items-center justify-center">
                <span className="font-display text-2xl font-medium text-[#2C6E49]">03</span>
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Marketing</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                Your property reaches qualified buyers through our website, international portals, and private client network.
              </p>
            </div>

            <div className="text-center bg-[#ffffff] p-8 rounded-xl border border-[#cec5b4]/60 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2C6E49]/10 flex items-center justify-center">
                <span className="font-display text-2xl font-medium text-[#2C6E49]">04</span>
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Closing</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                We guide you through offers, negotiations, and legal formalities to ensure a smooth, successful sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why World Housing Spain / The Advantage */}
      <section className="py-20 lg:py-28 bg-[#f5f0e7] border-t border-[#cec5b4]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
              Why World Housing Spain
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1d1b16]">
              The <span className="italic font-normal">Advantage</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Global Reach</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                Your property gains exposure to an international audience through our multilingual platform and partner network spanning Europe, the UK, and beyond.
              </p>
            </div>

            <div className="p-8 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Proven Results</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                With over €2 billion in transactions and hundreds of successful sales, our track record speaks for itself.
              </p>
            </div>

            <div className="p-8 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1d1b16] mb-3">Dedicated Agent</h3>
              <p className="text-xs text-[#4b4539] leading-relaxed">
                You are assigned a personal agent who manages your sale from start to finish, providing transparency and regular updates throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Complete Renovation & Construction Services */}
      <section className="py-20 lg:py-28 bg-[#FCF9F3] border-t border-[#cec5b4]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#A98158] mb-4">
                Beyond Selling
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1d1b16] mb-6">
                Complete Renovation & Construction <span className="italic font-normal">Services</span>
              </h2>
              <p className="text-[#4b4539] leading-relaxed mb-8 text-base">
                We manage all types of renovations and construction for second-hand properties. From minor updates to complete refurbishments, our team handles every detail so you can focus on enjoying your new home.
              </p>
              <button
                onClick={() => handleContactAction('Renovation and Construction Services')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#225639] transition-colors shadow-sm cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Full Property Refurbishment
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Complete property makeovers from structural work to final finishes.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Bath className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Kitchen & Bathroom Renovation
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Modern kitchen and bathroom installations with premium materials.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Waves className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Swimming Pool Construction & Renovation
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  New pool builds, resurfacing, and complete pool area redesigns.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Trees className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Garden & Exterior Design
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Landscaping, outdoor living spaces, and Mediterranean garden design.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Hammer className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Structural Modifications
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Extensions, load-bearing wall removal, and structural engineering work.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Interior Design & Styling
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Professional interior design, furnishing, and styling services.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Energy Efficiency Upgrades
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  Solar panels, insulation, double glazing, and energy certifications.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff] rounded-xl border border-[#cec5b4]/60">
                <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-medium text-[#1d1b16] mb-2">
                  Legal Permits & Documentation
                </h3>
                <p className="text-xs text-[#4b4539] leading-relaxed">
                  We handle all municipal permits, licenses, and legal paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact / Start Your Journey CTA */}
      <section id="contact" className="py-20 lg:py-28 bg-[#2C6E49] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-200 mb-4">
            Start Your Journey
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6">
            Ready to Sell Your <span className="italic font-normal">Property?</span>
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 leading-relaxed text-base">
            Request a complimentary valuation and discover what your property is worth in today's market.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleContactAction()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2C6E49] text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#FCF9F3] transition-colors shadow-sm cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+34966146470"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>+34 966 14 64 70</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
