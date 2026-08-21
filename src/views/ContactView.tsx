import React, { useState } from 'react';
import { InmovillaService } from '../services/inmovillaService';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';

interface AgentModalData {
  name: string;
  title: string;
  img: string;
  license: string;
  office: string;
  mobile: string;
  fax: string;
  whatsapp: string;
}

const AGENTS_DATA: Record<'mariluz' | 'ana', AgentModalData> = {
  mariluz: {
    name: 'Mariluz Sánchez M.',
    title: 'CEO & Managing Director',
    img: '/images/mariluz-sanchez.jpg',
    license: '+34 966 14 64 70',
    office: '+34 966 14 64 70',
    mobile: '+34 645 44 26 32',
    fax: '+34 966 14 64 70',
    whatsapp: '+34 645 44 26 32'
  },
  ana: {
    name: 'Ana Isa O.',
    title: 'Commercial Director & Real Estate Advisor',
    img: '/images/ana-isa.jpg',
    license: '+34 966 14 64 70',
    office: '+34 966 14 64 70',
    mobile: '+34 633 75 48 09',
    fax: '+34 966 14 64 70',
    whatsapp: '+34 633 75 48 09'
  }
};

export const ContactView: React.FC = () => {
  // Active Form Tab
  const [activeTab, setActiveTab] = useState<'sell' | 'find' | 'rent' | 'quick'>('sell');

  // Modal State
  const [selectedAgent, setSelectedAgent] = useState<AgentModalData | null>(null);

  // Form States
  const [submittedForm, setSubmittedForm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form 1: Sell
  const [sellForm, setSellForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    message: ''
  });

  // Form 2: Find
  const [findForm, setFindForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    propertyType: '',
    location: '',
    requirements: ''
  });

  // Form 3: Rent
  const [rentForm, setRentForm] = useState({
    name: '',
    email: '',
    phone: '',
    rentalType: '',
    location: '',
    details: ''
  });

  // Form 4: Quick
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    time: '',
    message: ''
  });

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await InmovillaService.submitLead({
        name: sellForm.name,
        email: sellForm.email,
        phone: sellForm.phone,
        leadType: 'seller_valuation',
        propertyDetails: {
          type: sellForm.propertyType,
          location: sellForm.location
        },
        message: sellForm.message || 'Valuation / Sell Property Request',
        language: 'EN'
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmittedForm('sell');
    }
  };

  const handleFindSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await InmovillaService.submitLead({
        name: findForm.name,
        email: findForm.email,
        phone: findForm.phone,
        leadType: 'buyer_inquiry',
        budget: findForm.budget,
        propertyDetails: {
          type: findForm.propertyType,
          location: findForm.location
        },
        message: `Budget: ${findForm.budget}. Location: ${findForm.location}. Requirements: ${findForm.requirements}`,
        language: 'EN'
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmittedForm('find');
    }
  };

  const handleRentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await InmovillaService.submitLead({
        name: rentForm.name,
        email: rentForm.email,
        phone: rentForm.phone,
        leadType: 'general_contact',
        propertyDetails: {
          location: rentForm.location
        },
        message: `Rental Type: ${rentForm.rentalType}. Details: ${rentForm.details}`,
        language: 'EN'
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmittedForm('rent');
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await InmovillaService.submitLead({
        name: quickForm.name,
        email: quickForm.email || 'quickcall@worldhousingspain.eu',
        phone: quickForm.phone,
        leadType: 'general_contact',
        message: `Quick Call Request. Subject: ${quickForm.subject}. Preferred Time: ${quickForm.time}. Note: ${quickForm.message}`,
        language: 'EN'
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmittedForm('quick');
    }
  };

  return (
    <div className="bg-[#FCF9F3] text-[#1D1B16] font-body">
      {/* 1. Hero Section */}
      <section className="relative h-[70svh] min-h-[480px] flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury Mediterranean villa with pool and palm trees on the Costa Blanca"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCF9F3] via-[#FCF9F3]/50 to-[#FCF9F3]/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1D1B16]/60 mb-4">
                Get In Touch
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium tracking-tight mb-5">
                We'd Love to<br />
                <span className="italic">Hear From You</span>
              </h1>
              <p className="text-[#1D1B16]/70 text-lg leading-relaxed max-w-lg">
                Whether you are buying, selling, renting, or simply exploring — our team is ready to help you take the next step.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+34662512994"
                className="flex items-center gap-2.5 px-5 py-3 bg-[#FCF9F3]/90 backdrop-blur-sm rounded-xl border border-[#CEC5B4]/30 hover:border-[#2C6E49]/50 hover:bg-[#FCF9F3] transition-all duration-300 group shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px] text-[#2C6E49]">call</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-[#1D1B16]/50 font-medium">Call Us</p>
                  <p className="text-sm font-medium text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors">662 51 29 94</p>
                </div>
              </a>

              <a
                href="https://wa.me/34662512994"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 bg-[#25D366]/10 backdrop-blur-sm rounded-xl border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 transition-all duration-300 group shadow-xs"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.013-5.101-2.859-6.953C16.578 1.999 14.118.99 11.998.99c-5.441 0-9.866 4.372-9.87 9.802 0 1.714.473 3.391 1.369 4.869L2.512 21.99l6.135-1.836zM18.254 14.91c-.344-.173-2.035-1.004-2.348-1.118-.314-.115-.543-.173-.77.173-.228.347-.88 1.118-1.079 1.35-.198.232-.397.26-.74.088-.344-.173-1.45-.535-2.762-1.706-1.02-1.018-1.708-2.276-1.908-2.623-.198-.347-.021-.534.152-.706.156-.155.344-.36.516-.54.172-.18.229-.304.344-.508.115-.203.057-.383-.028-.556-.086-.173-.771-1.854-1.056-2.057-.278-.2-.56-.172-.77-.162-.198.009-.427.013-.656.013-.23 0-.602.087-.917.43-.314.343-1.199 1.15-1.199 2.802 0 1.652 1.2 3.25 1.369 3.48.17.23 2.362 3.633 5.722 5.093.801.348 1.424.555 1.912.712.805.257 1.537.221 2.115.141.644-.089 2.035-.83 2.319-1.63.284-.8 2.84-3.525.17-1.15z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-[#1D1B16]/50 font-medium">WhatsApp</p>
                  <p className="text-sm font-medium text-[#1D1B16] group-hover:text-[#25D366] transition-colors">Chat Now</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content: Contact Info + Interactive Tabbed Forms */}
      <section className="py-20 lg:py-28 bg-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            
            {/* Contact Info (2 cols) */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl font-medium mb-4">Contact Information</h2>
                <p className="text-[#1D1B16]/60 text-sm leading-relaxed">
                  Reach out to us directly or fill out the form and our team will get back to you promptly.
                </p>
              </div>

              <div className="space-y-6">
                {/* Direct Lines */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1D1B16]/50 mb-1">Direct Lines</h3>
                    <a href="tel:+34662512994" className="text-sm font-medium hover:text-[#2C6E49] transition-colors block">
                      +34 662 51 29 94
                    </a>
                    <a href="tel:+34966146470" className="text-sm font-medium hover:text-[#2C6E49] transition-colors block">
                      +34 966 14 64 70
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1D1B16]/50 mb-1">Email Us</h3>
                    <a href="mailto:worldhousingspain24@gmail.com" className="text-sm font-medium hover:text-[#2C6E49] transition-colors block">
                      worldhousingspain24@gmail.com
                    </a>
                    <a href="mailto:info@worldhousingspain.eu" className="text-sm font-medium hover:text-[#2C6E49] transition-colors block">
                      info@worldhousingspain.eu
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1D1B16]/50 mb-1">Working Hours</h3>
                    <p className="text-sm">Monday – Friday: 9:00 – 19:00</p>
                    <p className="text-sm">Saturday: 10:00 – 14:00</p>
                    <p className="text-sm text-[#1D1B16]/50">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#CEC5B4]/40">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1D1B16]/50 mb-3">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61558765943028" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors" 
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/worldhousingspain/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors" 
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@worldhousing.spain" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors" 
                    aria-label="TikTok"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.46V11.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.91-1.12l-.01.01z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/world-housing-spain-3a1176385" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors" 
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Forms Column (3 cols) */}
            <div className="lg:col-span-3">
              {/* Form Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  type="button"
                  onClick={() => { setActiveTab('sell'); setSubmittedForm(null); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'sell'
                      ? 'bg-[#2C6E49] text-white shadow-xs'
                      : 'bg-[#EFE9DF] text-[#1D1B16] hover:bg-[#E9E3D8]'
                  }`}
                >
                  Sell Property
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('find'); setSubmittedForm(null); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'find'
                      ? 'bg-[#2C6E49] text-white shadow-xs'
                      : 'bg-[#EFE9DF] text-[#1D1B16] hover:bg-[#E9E3D8]'
                  }`}
                >
                  Find Property
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('rent'); setSubmittedForm(null); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'rent'
                      ? 'bg-[#2C6E49] text-white shadow-xs'
                      : 'bg-[#EFE9DF] text-[#1D1B16] hover:bg-[#E9E3D8]'
                  }`}
                >
                  Rent Out
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('quick'); setSubmittedForm(null); }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'quick'
                      ? 'bg-[#2C6E49] text-white shadow-xs'
                      : 'bg-[#EFE9DF] text-[#1D1B16] hover:bg-[#E9E3D8]'
                  }`}
                >
                  Quick Call
                </button>
              </div>

              {/* Form 1: Sell Property */}
              {activeTab === 'sell' && (
                <form
                  onSubmit={handleSellSubmit}
                  className="bg-[#F5F0E7] rounded-xl p-8 lg:p-10 border border-[#CEC5B4]/40 shadow-xs animate-fade-in"
                >
                  {submittedForm === 'sell' ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                      </div>
                      <h3 className="font-display text-2xl font-medium">Thank You!</h3>
                      <p className="text-sm text-[#1D1B16]/70 max-w-md mx-auto">
                        Your property valuation inquiry has been received. One of our Costa Blanca valuation specialists will contact you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedForm(null)}
                        className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-medium mb-2">Sell Your Property</h2>
                      <p className="text-[#1D1B16]/60 text-sm mb-6">
                        Get a professional market valuation and list your property with us.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="sell-name" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Full Name <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="text"
                            id="sell-name"
                            required
                            value={sellForm.name}
                            onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="sell-email" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Email <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="email"
                            id="sell-email"
                            required
                            value={sellForm.email}
                            onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="sell-phone" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Phone <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="tel"
                            id="sell-phone"
                            required
                            value={sellForm.phone}
                            onChange={(e) => setSellForm({ ...sellForm, phone: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="sell-property-type" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Property Type
                          </label>
                          <select
                            id="sell-property-type"
                            value={sellForm.propertyType}
                            onChange={(e) => setSellForm({ ...sellForm, propertyType: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select type</option>
                            <option value="villa">Villa</option>
                            <option value="apartment">Apartment</option>
                            <option value="penthouse">Penthouse</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="finca">Finca / Country Home</option>
                            <option value="plot">Plot / Land</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="sell-location" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Property Location
                          </label>
                          <input
                            type="text"
                            id="sell-location"
                            placeholder="e.g. Moraira, Jávea, Altea..."
                            value={sellForm.location}
                            onChange={(e) => setSellForm({ ...sellForm, location: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="sell-message" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Additional Details
                          </label>
                          <textarea
                            id="sell-message"
                            rows={4}
                            placeholder="Tell us about your property..."
                            value={sellForm.message}
                            onChange={(e) => setSellForm({ ...sellForm, message: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] resize-y"
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-[#225639] transition-colors shadow-xs cursor-pointer"
                        >
                          <span>{isSubmitting ? 'Submitting...' : 'Request Valuation'}</span>
                          <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

              {/* Form 2: Find Property */}
              {activeTab === 'find' && (
                <form
                  onSubmit={handleFindSubmit}
                  className="bg-[#F5F0E7] rounded-xl p-8 lg:p-10 border border-[#CEC5B4]/40 shadow-xs animate-fade-in"
                >
                  {submittedForm === 'find' ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                      </div>
                      <h3 className="font-display text-2xl font-medium">Inquiry Sent!</h3>
                      <p className="text-sm text-[#1D1B16]/70 max-w-md mx-auto">
                        Thank you for sharing your search criteria. Our property specialists will match your preferences with available and off-market listings.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedForm(null)}
                        className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-medium mb-2">Find Your Dream Property</h2>
                      <p className="text-[#1D1B16]/60 text-sm mb-6">
                        Tell us what you're looking for and we'll find the perfect match.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="find-name" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Full Name <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="text"
                            id="find-name"
                            required
                            value={findForm.name}
                            onChange={(e) => setFindForm({ ...findForm, name: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="find-email" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Email <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="email"
                            id="find-email"
                            required
                            value={findForm.email}
                            onChange={(e) => setFindForm({ ...findForm, email: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="find-phone" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="find-phone"
                            value={findForm.phone}
                            onChange={(e) => setFindForm({ ...findForm, phone: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="find-budget" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Budget Range
                          </label>
                          <select
                            id="find-budget"
                            value={findForm.budget}
                            onChange={(e) => setFindForm({ ...findForm, budget: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select range</option>
                            <option value="200-400">€200,000 – €400,000</option>
                            <option value="400-600">€400,000 – €600,000</option>
                            <option value="600-800">€600,000 – €800,000</option>
                            <option value="800-1m">€800,000 – €1,000,000</option>
                            <option value="1m-2m">€1,000,000 – €2,000,000</option>
                            <option value="2m+">€2,000,000+</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="find-type" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Property Type
                          </label>
                          <select
                            id="find-type"
                            value={findForm.propertyType}
                            onChange={(e) => setFindForm({ ...findForm, propertyType: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select type</option>
                            <option value="villa">Villa</option>
                            <option value="apartment">Apartment</option>
                            <option value="penthouse">Penthouse</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="finca">Finca / Country Home</option>
                            <option value="any">Any Type</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="find-location" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Preferred Location
                          </label>
                          <select
                            id="find-location"
                            value={findForm.location}
                            onChange={(e) => setFindForm({ ...findForm, location: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select area</option>
                            <option value="moraira">Moraira</option>
                            <option value="javea">Jávea</option>
                            <option value="altea">Altea</option>
                            <option value="benissa">Benissa</option>
                            <option value="calpe">Calpe</option>
                            <option value="denia">Denia</option>
                            <option value="santa-pola">Santa Pola</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="find-requirements" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Your Requirements
                          </label>
                          <textarea
                            id="find-requirements"
                            rows={4}
                            placeholder="Bedrooms, bathrooms, sea view, pool, etc..."
                            value={findForm.requirements}
                            onChange={(e) => setFindForm({ ...findForm, requirements: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] resize-y"
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-[#225639] transition-colors shadow-xs cursor-pointer"
                        >
                          <span>{isSubmitting ? 'Searching...' : 'Search Properties'}</span>
                          <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

              {/* Form 3: Rent Out Property */}
              {activeTab === 'rent' && (
                <form
                  onSubmit={handleRentSubmit}
                  className="bg-[#F5F0E7] rounded-xl p-8 lg:p-10 border border-[#CEC5B4]/40 shadow-xs animate-fade-in"
                >
                  {submittedForm === 'rent' ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                      </div>
                      <h3 className="font-display text-2xl font-medium">Property Details Received</h3>
                      <p className="text-sm text-[#1D1B16]/70 max-w-md mx-auto">
                        Thank you. Our rental management team will review your property details and contact you with rental potential and management terms.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedForm(null)}
                        className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-medium mb-2">Rent Out Your Property</h2>
                      <p className="text-[#1D1B16]/60 text-sm mb-6">
                        Let us manage your holiday or long-term rental property.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="rent-name" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Full Name <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="text"
                            id="rent-name"
                            required
                            value={rentForm.name}
                            onChange={(e) => setRentForm({ ...rentForm, name: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="rent-email" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Email <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="email"
                            id="rent-email"
                            required
                            value={rentForm.email}
                            onChange={(e) => setRentForm({ ...rentForm, email: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="rent-phone" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Phone <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="tel"
                            id="rent-phone"
                            required
                            value={rentForm.phone}
                            onChange={(e) => setRentForm({ ...rentForm, phone: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="rent-type" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Rental Type
                          </label>
                          <select
                            id="rent-type"
                            value={rentForm.rentalType}
                            onChange={(e) => setRentForm({ ...rentForm, rentalType: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select type</option>
                            <option value="holiday">Holiday Rental</option>
                            <option value="long-term">Long-Term Rental</option>
                            <option value="both">Both</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="rent-location" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Property Location
                          </label>
                          <input
                            type="text"
                            id="rent-location"
                            placeholder="e.g. Moraira, Jávea, Altea..."
                            value={rentForm.location}
                            onChange={(e) => setRentForm({ ...rentForm, location: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="rent-details" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Property Details
                          </label>
                          <textarea
                            id="rent-details"
                            rows={4}
                            placeholder="Bedrooms, amenities, availability..."
                            value={rentForm.details}
                            onChange={(e) => setRentForm({ ...rentForm, details: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] resize-y"
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-[#225639] transition-colors shadow-xs cursor-pointer"
                        >
                          <span>{isSubmitting ? 'Listing...' : 'List My Property'}</span>
                          <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

              {/* Form 4: Quick Call */}
              {activeTab === 'quick' && (
                <form
                  onSubmit={handleQuickSubmit}
                  className="bg-[#F5F0E7] rounded-xl p-8 lg:p-10 border border-[#CEC5B4]/40 shadow-xs animate-fade-in"
                >
                  {submittedForm === 'quick' ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-2xl">call</span>
                      </div>
                      <h3 className="font-display text-2xl font-medium">Callback Scheduled</h3>
                      <p className="text-sm text-[#1D1B16]/70 max-w-md mx-auto">
                        Thank you for requesting a call back. An agent will contact you at your preferred time window.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedForm(null)}
                        className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-medium mb-2">Request a Quick Call</h2>
                      <p className="text-[#1D1B16]/60 text-sm mb-6">
                        Leave your details and we'll call you back within 30 minutes during office hours.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="quick-name" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Full Name <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="text"
                            id="quick-name"
                            required
                            value={quickForm.name}
                            onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="quick-phone" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Phone Number <span className="text-[#2C6E49]">*</span>
                          </label>
                          <input
                            type="tel"
                            id="quick-phone"
                            required
                            value={quickForm.phone}
                            onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="quick-email" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            id="quick-email"
                            value={quickForm.email}
                            onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49]"
                          />
                        </div>

                        <div>
                          <label htmlFor="quick-subject" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Subject <span className="text-[#2C6E49]">*</span>
                          </label>
                          <select
                            id="quick-subject"
                            required
                            value={quickForm.subject}
                            onChange={(e) => setQuickForm({ ...quickForm, subject: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select subject</option>
                            <option value="buying">Buying a property</option>
                            <option value="selling">Selling a property</option>
                            <option value="renting">Renting a property</option>
                            <option value="valuation">Property valuation</option>
                            <option value="legal">Legal advice</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="quick-time" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Best Time to Call
                          </label>
                          <select
                            id="quick-time"
                            value={quickForm.time}
                            onChange={(e) => setQuickForm({ ...quickForm, time: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] text-[#1D1B16]"
                          >
                            <option value="" disabled>Select time</option>
                            <option value="asap">As soon as possible</option>
                            <option value="morning">Morning (9:00 – 12:00)</option>
                            <option value="afternoon">Afternoon (12:00 – 18:00)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="quick-message" className="block text-xs font-medium text-[#1D1B16]/60 mb-1.5">
                            Brief Message
                          </label>
                          <textarea
                            id="quick-message"
                            rows={3}
                            placeholder="How can we help you?"
                            value={quickForm.message}
                            onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                            className="w-full bg-[#FCF9F3] border border-[#CEC5B4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2C6E49] focus:ring-1 focus:ring-[#2C6E49] resize-y"
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C6E49] text-white text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-[#225639] transition-colors shadow-xs cursor-pointer"
                        >
                          <span>{isSubmitting ? 'Requesting...' : 'Request Call Back'}</span>
                          <span className="material-symbols-outlined text-[20px]">call</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 3. Office Locations & 4. Interactive Map */}
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

      {/* 5. Agent Contact Cards */}
      <section className="py-20 lg:py-28 bg-[#F5F0E7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1D1B16]/60 mb-4">
              Speak to an Agent
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight">
              Direct <span className="italic">Contacts</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Agent 1: Mariluz Sánchez M. */}
            <div className="bg-[#FCF9F3] rounded-xl p-6 text-center shadow-xs border border-[#CEC5B4]/40">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E3DDD2] overflow-hidden border border-[#CEC5B4]">
                <img
                  src="/images/mariluz-sanchez.jpg"
                  alt="Mariluz Sánchez M."
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized avatar if local asset not present
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80";
                  }}
                />
              </div>
              <h3 className="font-display text-lg font-medium">Mariluz Sánchez M.</h3>
              <p className="text-xs text-[#2C6E49] font-medium mb-3">CEO & Managing Director</p>

              <div className="flex items-center justify-center gap-3 mb-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61558765943028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/worldhousingspain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              <a href="tel:+34645442632" className="text-sm text-[#1D1B16]/60 hover:text-[#2C6E49] transition-colors block">
                +34 645 44 26 32
              </a>
              <a href="mailto:info@worldhousingspain.eu" className="text-sm text-[#1D1B16]/60 hover:text-[#2C6E49] transition-colors block">
                info@worldhousingspain.eu
              </a>

              <button
                type="button"
                onClick={() => setSelectedAgent(AGENTS_DATA.mariluz)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Details</span>
              </button>
            </div>

            {/* Agent 2: Ana Isa O. */}
            <div className="bg-[#FCF9F3] rounded-xl p-6 text-center shadow-xs border border-[#CEC5B4]/40">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E3DDD2] overflow-hidden border border-[#CEC5B4]">
                <img
                  src="/images/ana-isa.jpg"
                  alt="Ana Isa O."
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized avatar if local asset not present
                    e.currentTarget.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80";
                  }}
                />
              </div>
              <h3 className="font-display text-lg font-medium">Ana Isa O.</h3>
              <p className="text-xs text-[#2C6E49] font-medium mb-3">Commercial Director & Real Estate Advisor</p>

              <div className="flex items-center justify-center gap-3 mb-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61558765943028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/worldhousingspain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#CEC5B4] flex items-center justify-center text-[#1D1B16]/60 hover:text-[#2C6E49] hover:border-[#2C6E49] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              <a href="tel:+34633754809" className="text-sm text-[#1D1B16]/60 hover:text-[#2C6E49] transition-colors block">
                +34 633 75 48 09
              </a>
              <a href="mailto:info@worldhousingspain.eu" className="text-sm text-[#1D1B16]/60 hover:text-[#2C6E49] transition-colors block">
                info@worldhousingspain.eu
              </a>

              <button
                type="button"
                onClick={() => setSelectedAgent(AGENTS_DATA.ana)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase bg-[#2C6E49] text-white rounded-lg hover:bg-[#225639] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Agent Details Modal Dialog */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedAgent(null);
          }}
        >
          <div className="bg-[#FCF9F3] rounded-2xl max-w-sm w-full p-8 shadow-xl relative border border-[#CEC5B4]/50 animate-fade-in">
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#EFE9DF] text-[#1D1B16]/60 hover:text-[#1D1B16] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E3DDD2] overflow-hidden border border-[#CEC5B4]">
                <img
                  src={selectedAgent.img}
                  alt={selectedAgent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-medium">{selectedAgent.name}</h3>
              <p className="text-xs text-[#2C6E49] font-medium">{selectedAgent.title}</p>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex justify-between text-sm py-2 border-b border-[#CEC5B4]/40">
                <span className="text-[#1D1B16]/50">License No.</span>
                <span className="font-medium text-[#1D1B16]">{selectedAgent.license}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#CEC5B4]/40">
                <span className="text-[#1D1B16]/50">Office</span>
                <span className="font-medium text-[#1D1B16]">{selectedAgent.office}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#CEC5B4]/40">
                <span className="text-[#1D1B16]/50">Mobile</span>
                <span className="font-medium text-[#1D1B16]">{selectedAgent.mobile}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#CEC5B4]/40">
                <span className="text-[#1D1B16]/50">Fax</span>
                <span className="font-medium text-[#1D1B16]">{selectedAgent.fax}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-[#1D1B16]/50">WhatsApp</span>
                <span className="font-medium text-[#1D1B16]">{selectedAgent.whatsapp}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Floating WhatsApp Button */}
      <a
        href="https://wa.me/34633754809"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.013-5.101-2.859-6.953C16.578 1.999 14.118.99 11.998.99c-5.441 0-9.866 4.372-9.87 9.802 0 1.714.473 3.391 1.369 4.869L2.512 21.99l6.135-1.836zM18.254 14.91c-.344-.173-2.035-1.004-2.348-1.118-.314-.115-.543-.173-.77.173-.228.347-.88 1.118-1.079 1.35-.198.232-.397.26-.74.088-.344-.173-1.45-.535-2.762-1.706-1.02-1.018-1.708-2.276-1.908-2.623-.198-.347-.021-.534.152-.706.156-.155.344-.36.516-.54.172-.18.229-.304.344-.508.115-.203.057-.383-.028-.556-.086-.173-.771-1.854-1.056-2.057-.278-.2-.56-.172-.77-.162-.198.009-.427.013-.656.013-.23 0-.602.087-.917.43-.314.343-1.199 1.15-1.199 2.802 0 1.652 1.2 3.25 1.369 3.48.17.23 2.362 3.633 5.722 5.093.801.348 1.424.555 1.912.712.805.257 1.537.221 2.115.141.644-.089 2.035-.83 2.319-1.63.284-.8 2.84-3.525.17-1.15z"/>
        </svg>
      </a>
    </div>
  );
};
