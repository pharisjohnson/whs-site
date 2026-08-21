import { NewDevelopment } from '../types';

export const NEW_DEVELOPMENTS: NewDevelopment[] = [
  {
    id: 'dev-las-velas',
    inmovillaRef: 'WHS-2041',
    name: 'Las Velas de Guardamar',
    slug: 'las-velas-guardamar',
    location: 'Guardamar del Segura, Alicante',
    priceFrom: 189000,
    completionDate: 'Ready / Immediate Key Handover',
    totalUnits: 18,
    availableUnits: 4,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    description: 'A boutique residential sanctuary comprising independent luxury chalets and luxury penthouses with private solariums. Constructed using premium Porcelanosa ceramics, aerothermal systems, high acoustic insulation, and landscaped private Mediterranean gardens.',
    features: [
      'Private Swimming Pool option',
      'Underground Private Garage & Storage',
      'Aerothermal High-Efficiency Water Heater',
      'Pre-installation of Ducted Climate Control',
      'Walking distance to 11km Blue-Flag Beach & Dunes'
    ],
    typologies: [
      { name: 'Villa Type A (Corner Plot)', beds: 3, baths: 2, areaM2: 291, price: 189000, status: 'available' },
      { name: 'Villa Type B (Central Plot)', beds: 3, baths: 2, areaM2: 275, price: 195000, status: 'available' },
      { name: 'Penthouse Solarium Vista', beds: 3, baths: 2, areaM2: 142, price: 259000, status: 'available' },
      { name: 'Premium Villa Deluxe (Sold)', beds: 4, baths: 3, areaM2: 320, price: 285000, status: 'sold' }
    ]
  },
  {
    id: 'dev-blue-gardens',
    inmovillaRef: 'WHS-4029',
    name: 'Blue Gardens Benijófar',
    slug: 'blue-gardens-benijofar',
    location: 'Benijófar, Alicante',
    priceFrom: 364950,
    completionDate: 'Q4 2026',
    totalUnits: 12,
    availableUnits: 5,
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
    ],
    description: 'An exclusive collection of 12 bespoke contemporary independent villas in Benijófar. Offering double-height ceilings in the living area, private swimming pool, landscaped lawn, outdoor chill-out zone with barbecue prep, and motorized blinds.',
    features: [
      'Private 6x3m Swimming Pool with waterfall',
      'Floor-to-ceiling Climalit acoustic glass',
      'Underfloor Heating in all Bathrooms',
      'Fully equipped designer kitchen with Bosch appliances',
      '10-Year Structural Building Guarantee'
    ],
    typologies: [
      { name: 'Villa Sol (3 Beds, 3 Baths)', beds: 3, baths: 3, areaM2: 210, price: 364950, status: 'available' },
      { name: 'Villa Cielo (3 Beds, 3 Baths + Solarium)', beds: 3, baths: 3, areaM2: 235, price: 389000, status: 'available' },
      { name: 'Villa Palma (4 Beds, 4 Baths)', beds: 4, baths: 4, areaM2: 270, price: 445000, status: 'reserved' }
    ]
  },
  {
    id: 'dev-chalet-moraira-collection',
    inmovillaRef: 'WHS-1082',
    name: 'Chalet Moraira Signature Villas',
    slug: 'chalet-moraira-signature',
    location: 'El Portet / Pla del Mar, Moraira',
    priceFrom: 649000,
    completionDate: 'Phase 1 Ready / Phase 2 Q2 2027',
    totalUnits: 6,
    availableUnits: 2,
    heroImage: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80'
    ],
    description: 'Limited edition luxury residences in the prime residential zone of Moraira. Characterized by dry-stone masonry hand-crafted by local artisans, expansive covered summer naya terraces, private infinity pools, and landscaped Mediterranean gardens.',
    features: [
      'Handcrafted natural dry stone masonry',
      'Infinity swimming pool with saltwater chlorination',
      'Full Daikin aerothermal underfloor heating and ducted A/C',
      'Gated residential entrance with video intercom',
      '5 minutes to El Portet beach and Moraira Yacht Club'
    ],
    typologies: [
      { name: 'Villa Marítima (4 Beds, 3 Baths)', beds: 4, baths: 3, areaM2: 245, price: 649000, status: 'available' },
      { name: 'Villa Horizonte (4 Beds, 4 Baths)', beds: 4, baths: 4, areaM2: 290, price: 795000, status: 'available' }
    ]
  }
];

export const INITIAL_DEVELOPMENTS = NEW_DEVELOPMENTS;
