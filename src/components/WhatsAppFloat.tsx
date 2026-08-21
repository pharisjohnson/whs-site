import React, { useState } from 'react';
import { MessageCircle, X, Phone, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface WhatsAppFloatProps {
  currentProperty?: Property | null;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ currentProperty }) => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = InmovillaService.getWhatsAppLink('34633754809', currentProperty || undefined);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 bg-white border border-[#E7DDCF] rounded-2xl p-4 shadow-2xl w-72 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#E7DDCF] pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
                WH
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1D1B16]">World Housing Spain</h5>
                <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online · Costa Blanca Desk
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#7D7564] hover:text-[#1D1B16] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#4B4539] mb-3 leading-relaxed">
            {currentProperty ? (
              <>
                Interested in <strong>{currentProperty.title}</strong> (Ref: {currentProperty.ref})? Connect directly with our listing specialist on WhatsApp.
              </>
            ) : (
              'Hello! How can we assist with your Costa Blanca property search or listing valuation today?'
            )}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Contact on WhatsApp"
        title="WhatsApp World Housing Spain"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
