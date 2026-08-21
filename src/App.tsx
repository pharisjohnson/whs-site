import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InmovillaHubModal } from './components/InmovillaHubModal';
import { InmovillaLeadModal } from './components/InmovillaLeadModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

// Views
import { HomeView } from './views/HomeView';
import { ListingsView } from './views/ListingsView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { LuxuryCollectionView } from './views/LuxuryCollectionView';
import { DevelopmentsView } from './views/DevelopmentsView';
import { DevelopmentDetailView } from './views/DevelopmentDetailView';
import { AreaGuidesView } from './views/AreaGuidesView';
import { AreaDetailView } from './views/AreaDetailView';
import { SellView } from './views/SellView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ContactView } from './views/ContactView';

// Data & Services
import { INITIAL_PROPERTIES } from './data/properties';
import { INITIAL_AREA_GUIDES } from './data/areaGuides';
import { INITIAL_DEVELOPMENTS } from './data/developments';
import { InmovillaService } from './services/inmovillaService';
import { Property, AreaGuide, NewDevelopment, InmovillaConfig, InmovillaLead, FilterState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);

  // Entities
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [areaGuides] = useState<AreaGuide[]>(INITIAL_AREA_GUIDES);
  const [developments] = useState<NewDevelopment[]>(INITIAL_DEVELOPMENTS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDevelopment, setSelectedDevelopment] = useState<NewDevelopment | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('whs_favorites');
      return saved ? JSON.parse(saved) : ['whs-1082', 'whs-2041'];
    } catch {
      return ['whs-1082'];
    }
  });

  // Inmovilla CRM State
  const [inmovillaConfig, setInmovillaConfig] = useState<InmovillaConfig>(() => InmovillaService.getConfig());
  const [leads, setLeads] = useState<InmovillaLead[]>(() => InmovillaService.getLeads());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Modals & Drawers
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalProperty, setLeadModalProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('whs_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProperty, selectedDevelopment, viewParam]);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);

    if (view === 'property-detail' && param) {
      const found = properties.find(p => p.id === param || p.ref.toLowerCase() === param.toLowerCase());
      if (found) setSelectedProperty(found);
    } else if (view === 'development-detail' && param) {
      const found = developments.find(d => d.id === param || d.slug === param);
      if (found) setSelectedDevelopment(found);
    }
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property-detail');
  };

  const handleSelectDevelopment = (dev: NewDevelopment) => {
    setSelectedDevelopment(dev);
    setCurrentView('development-detail');
  };

  const handleSelectArea = (slug: string) => {
    setViewParam(slug);
    setCurrentView('area-detail');
  };

  const handleOpenInquiry = (prop?: Property) => {
    setLeadModalProperty(prop || selectedProperty || null);
    setIsLeadModalOpen(true);
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const result = await InmovillaService.syncProperties();
      setInmovillaConfig(InmovillaService.getConfig());
      if (result.properties && result.properties.length > 0) {
        setProperties(result.properties);
      }
    } catch (err) {
      console.error('Inmovilla sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateConfig = (newConfig: Partial<InmovillaConfig>) => {
    const updated = InmovillaService.updateConfig(newConfig);
    setInmovillaConfig(updated);
  };

  const handleLeadSubmitted = (lead: InmovillaLead) => {
    setLeads(InmovillaService.getLeads());
  };

  // Favorite property objects
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  // Current selected Area object
  const currentArea = areaGuides.find(a => a.slug === viewParam) || areaGuides[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1D1B16] font-sans antialiased selection:bg-[#2C6E49] selection:text-white">
      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        inmovillaConfig={inmovillaConfig}
        onOpenInmovillaHub={() => setIsHubOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            properties={properties}
            areaGuides={areaGuides}
            developments={developments}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenInmovillaHub={() => setIsHubOpen(true)}
          />
        )}

        {currentView === 'properties' && (
          <ListingsView
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            inmovillaConfig={inmovillaConfig}
            onTriggerSync={handleTriggerSync}
            isSyncing={isSyncing}
            onOpenInmovillaHub={() => setIsHubOpen(true)}
            initialFilter={
              viewParam && ['villa', 'penthouse', 'apartment', 'finca', 'development'].includes(viewParam)
                ? { type: viewParam as any }
                : viewParam
                ? { location: viewParam }
                : undefined
            }
          />
        )}

        {currentView === 'property-detail' && selectedProperty && (
          <PropertyDetailView
            property={selectedProperty}
            allProperties={properties}
            onBack={() => setCurrentView('properties')}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
            isFavorite={favorites.includes(selectedProperty.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentView === 'luxury' && (
          <LuxuryCollectionView
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentView === 'developments' && (
          <DevelopmentsView
            developments={developments}
            onSelectDevelopment={handleSelectDevelopment}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}

        {currentView === 'development-detail' && selectedDevelopment && (
          <DevelopmentDetailView
            development={selectedDevelopment}
            onBack={() => setCurrentView('developments')}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}

        {currentView === 'areas' && (
          <AreaGuidesView
            areaGuides={areaGuides}
            onSelectArea={handleSelectArea}
            onNavigateToProperties={(loc) => handleNavigate('properties', loc)}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}

        {currentView === 'area-detail' && (
          <AreaDetailView
            area={currentArea}
            allAreas={areaGuides}
            properties={properties}
            onBack={() => setCurrentView('areas')}
            onSelectArea={handleSelectArea}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToProperties={(loc) => handleNavigate('properties', loc)}
          />
        )}

        {currentView === 'sell' && (
          <SellView 
            onOpenInquiry={() => handleOpenInquiry()}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'about' && (
          <AboutView 
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}

        {currentView === 'services' && (
          <ServicesView onOpenInquiry={() => handleOpenInquiry()} />
        )}

        {currentView === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        inmovillaConfig={inmovillaConfig}
        onOpenInmovillaHub={() => setIsHubOpen(true)}
      />

      {/* Inmovilla Integration Hub Modal */}
      <InmovillaHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        config={inmovillaConfig}
        onUpdateConfig={handleUpdateConfig}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
        properties={properties}
        leads={leads}
      />

      {/* Inmovilla Direct Inquiry Modal */}
      <InmovillaLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        property={leadModalProperty}
        onLeadSubmitted={handleLeadSubmitted}
      />

      {/* Saved Portfolio Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={handleSelectProperty}
        onClearAll={() => setFavorites([])}
        onRequestConsultation={() => {
          setIsFavoritesOpen(false);
          setIsLeadModalOpen(true);
        }}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloat
        currentProperty={currentView === 'property-detail' ? selectedProperty : null}
      />
    </div>
  );
}
