import React from 'react';
import { 
  X, 
  Trash2, 
  Heart, 
  ArrowRight, 
  Building, 
  Bed, 
  Bath, 
  Maximize2,
  MessageCircle
} from 'lucide-react';
import { Property } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onClearAll: () => void;
  onRequestConsultation: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProperty,
  onClearAll,
  onRequestConsultation
}) => {
  if (!isOpen) return null;

  const totalValue = favorites.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCF9F3] border-l border-[#E7DDCF] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="bg-[#1D1B16] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#2C6E49] text-white">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Saved Properties</h3>
                <span className="text-xs text-[#E7DDCF]/70">
                  {favorites.length} selected for comparison
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#E7DDCF]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of properties */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EFE9DF] text-[#7D7564] flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-display text-base font-semibold text-[#1D1B16]">
                  No saved properties yet
                </h4>
                <p className="text-xs text-[#7D7564] max-w-xs mx-auto">
                  Click the heart icon on any property card or detail page to bookmark your preferred Costa Blanca residences.
                </p>
              </div>
            ) : (
              favorites.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-xl border border-[#E7DDCF] p-3 shadow-sm flex gap-3 group relative hover:border-[#2C6E49] transition-colors"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-24 h-24 object-cover rounded-lg shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#A98158] font-semibold">
                          Ref: {prop.ref}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(prop.id)}
                          className="text-[#7D7564] hover:text-rose-600 transition-colors p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="font-display text-sm font-medium text-[#1D1B16] group-hover:text-[#2C6E49] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {prop.title}
                      </h4>

                      <p className="text-[11px] text-[#7D7564]">
                        {prop.location.town} · {prop.bedrooms} Bed · {prop.bathrooms} Bath
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#E7DDCF]/60">
                      <span className="font-display text-sm font-bold text-[#1D1B16]">
                        €{prop.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="text-xs text-[#2C6E49] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {favorites.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E7DDCF] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#7D7564]">Portfolio Total Value:</span>
                <span className="font-display text-base font-bold text-[#2C6E49]">
                  €{totalValue.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClearAll}
                  className="px-3 py-2.5 rounded-lg border border-[#E7DDCF] text-xs text-[#7D7564] hover:text-rose-600 transition-colors"
                >
                  Clear All
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onRequestConsultation();
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#225639] transition-colors cursor-pointer text-center"
                >
                  Inquire on Saved Portfolio
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
