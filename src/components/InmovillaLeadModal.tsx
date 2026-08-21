import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Building, 
  ShieldCheck,
  Database
} from 'lucide-react';
import { Property, InmovillaLead, LeadType } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface InmovillaLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  defaultType?: LeadType;
  onLeadSubmitted?: (lead: InmovillaLead) => void;
}

export const InmovillaLeadModal: React.FC<InmovillaLeadModalProps> = ({
  isOpen,
  onClose,
  property,
  defaultType = 'viewing_request',
  onLeadSubmitted
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState(
    property
      ? `I would like to schedule a private viewing or receive full documentation for ${property.title} (Ref: ${property.ref}).`
      : 'I would like to speak with a World Housing Spain advisor regarding Costa Blanca luxury properties.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<InmovillaLead | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await InmovillaService.submitLead({
        name,
        email,
        phone,
        propertyRef: property?.ref,
        propertyTitle: property?.title,
        leadType: (defaultType || 'viewing_request') as LeadType,
        message,
        preferredDate: preferredDate || undefined,
        language: 'EN'
      });

      setSubmittedLead(res.lead);
      if (onLeadSubmitted) onLeadSubmitted(res.lead);
    } catch {
      // handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FCF9F3] border border-[#E7DDCF] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2C6E49] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                {property ? 'Inquire on Property' : 'Speak with an Advisor'}
              </h3>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Direct Advisory Consultation</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-display text-2xl font-bold text-[#1D1B16]">
                Inquiry Registered
              </h4>

              <p className="text-xs text-[#4B4539] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{submittedLead.name}</strong>. Your inquiry has been registered with our senior advisory desk under reference:
              </p>

              <div className="p-3 bg-white border border-[#E7DDCF] rounded-lg inline-block font-mono text-sm font-bold text-[#2C6E49]">
                {submittedLead.inmovillaLeadId}
              </div>

              <p className="text-xs text-[#7D7564]">
                A dedicated Costa Blanca luxury advisor will reach out to you via {submittedLead.phone || submittedLead.email}.
              </p>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#225639] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {property && (
                <div className="p-3 bg-[#F5F0E7] rounded-lg border border-[#E7DDCF] flex items-center gap-3">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-14 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-[#1D1B16] truncate">{property.title}</h5>
                    <p className="text-[11px] text-[#7D7564]">
                      Ref: {property.ref} · €{property.price.toLocaleString()} · {property.location.town}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Harrington / Elena Rostova"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                  Preferred Viewing Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#7D7564] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#7D7564] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E49]" />
                  Confidential & GDPR compliant
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#225639] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Registering...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
