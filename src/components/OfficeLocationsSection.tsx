import React from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export interface OfficeLocation {
  id: string;
  name: string;
  badge?: string;
  addressLines: string[];
  phone: string;
  phoneRaw: string;
  email?: string;
  hours?: string;
  googleMapsUrl?: string;
}

export const OFFICIAL_OFFICES: OfficeLocation[] = [
  {
    id: 'moraira',
    name: 'Moraira',
    badge: 'Head Office',
    addressLines: ['Calle Mayor 42', '03724 Moraira, Alicante', 'Spain'],
    phone: '+34 966 14 64 70',
    phoneRaw: '+34966146470',
    email: 'info@worldhousingspain.eu',
    hours: 'Mon - Fri: 9:30 - 18:30 · Sat: 10:00 - 14:00',
    googleMapsUrl: 'https://maps.google.com/?q=Calle+Mayor+42+03724+Moraira+Alicante'
  },
  {
    id: 'elche',
    name: 'Elche',
    addressLines: ['Calle Mayor 42', '03724 Moraira, Alicante', 'Spain'],
    phone: '+34 966 14 64 70',
    phoneRaw: '+34966146470',
    email: 'info@worldhousingspain.eu',
    hours: 'Mon - Fri: 9:30 - 18:30',
    googleMapsUrl: 'https://maps.google.com/?q=Calle+Mayor+42+03724+Moraira+Alicante'
  },
  {
    id: 'santa-pola',
    name: 'Santa Pola',
    addressLines: ['Calle Mayor 42', '03724 Moraira, Alicante', 'Spain'],
    phone: '+34 966 14 64 70',
    phoneRaw: '+34966146470',
    email: 'info@worldhousingspain.eu',
    hours: 'Mon - Fri: 9:30 - 18:30',
    googleMapsUrl: 'https://maps.google.com/?q=Calle+Mayor+42+03724+Moraira+Alicante'
  }
];

interface OfficeLocationsSectionProps {
  id?: string;
  subtitle?: string;
  title?: string;
  titleEmphasis?: string;
  showMap?: boolean;
  mapSubtitle?: string;
  mapTitle?: string;
  mapTitleEmphasis?: string;
  bgOffices?: string;
  bgMap?: string;
  className?: string;
}

export const OfficeLocationsSection: React.FC<OfficeLocationsSectionProps> = ({
  id = 'offices',
  subtitle = 'Our Offices',
  title = 'Visit Us in',
  titleEmphasis = 'Person',
  showMap = true,
  mapSubtitle = 'Find Us',
  mapTitle = 'Our',
  mapTitleEmphasis = 'Location',
  bgOffices = 'bg-[#F5F0E7]',
  bgMap = 'bg-[#FCF9F3]',
  className = ''
}) => {
  return (
    <div id={id} className={`w-full ${className}`}>
      {/* 1. Office Cards */}
      <section className={`py-20 lg:py-28 ${bgOffices}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1D1B16]/60 mb-4">
              {subtitle}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1D1B16]">
              {title} <span className="italic font-serif">{titleEmphasis}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFICIAL_OFFICES.map((office) => (
              <div
                key={office.id}
                className="bg-[#FCF9F3] rounded-2xl p-8 shadow-xs border border-[#CEC5B4]/40 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#2C6E49]/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-3xl text-[#2C6E49]">
                      location_on
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#1D1B16] mb-3">
                    {office.name}{' '}
                    {office.badge && (
                      <span className="text-sm font-normal text-[#1D1B16]/50">
                        ({office.badge})
                      </span>
                    )}
                  </h3>

                  <div className="text-sm text-[#1D1B16]/60 leading-relaxed mb-6 space-y-0.5">
                    {office.addressLines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#CEC5B4]/30 flex items-center justify-between">
                  <a
                    href={`tel:${office.phoneRaw}`}
                    className="text-sm text-[#2C6E49] hover:underline font-semibold inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{office.phone}</span>
                  </a>

                  <a
                    href={office.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#7D7564] hover:text-[#2C6E49] inline-flex items-center gap-1 transition-colors"
                    aria-label={`Directions to ${office.name} office`}
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Regional Map */}
      {showMap && (
        <section className={`py-20 lg:py-28 ${bgMap}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1D1B16]/60 mb-4">
                {mapSubtitle}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-[#1D1B16]">
                {mapTitle} <span className="italic font-serif">{mapTitleEmphasis}</span>
              </h2>
            </div>

            <div className="aspect-[21/9] bg-[#E3DDD2] rounded-2xl overflow-hidden shadow-sm border border-[#CEC5B4]/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199292.4013728902!2d-0.0055555555555555!3d38.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63b0b77e5ebd5b%3A0x62a6b48eea7f0f0!2sAlicante%2C%20Spain!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Costa Blanca region showing our office locations"
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
