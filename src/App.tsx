import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DonationProgressCard } from './components/DonationProgressCard';
import { StoryAndLetterSection } from './components/StoryAndLetterSection';
import { KeyDatesTimeline } from './components/KeyDatesTimeline';
import { DonorWall } from './components/DonorWall';
import { TransparencyFAQ } from './components/TransparencyFAQ';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { ShareModal } from './components/ShareModal';
import { ImageLightbox } from './components/ImageLightbox';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Language, Donor } from './types';
import { INITIAL_DONORS, CAMPAIGN_META, CAMPAIGN_IMAGES } from './data/campaignData';
import { Heart, Share2, Languages } from 'lucide-react';

export default function App() {
  // Language State: defaults to English or saved preference
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('villagrana_lang');
    return saved === 'es' ? 'es' : 'en';
  });

  // Raised Amount State: Starts at $0 and adds all new donations
  const [raisedAmount, setRaisedAmount] = useState<number>(() => {
    try {
      localStorage.removeItem('villagrana_raised');
      localStorage.removeItem('villagrana_donors');
      const saved = localStorage.getItem('villagrana_live_raised');
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Donors State: Starts empty, holds real donations & messages
  const [donors, setDonors] = useState<Donor[]>(() => {
    try {
      const saved = localStorage.getItem('villagrana_live_donors');
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedInitialAmount, setSelectedInitialAmount] = useState(100);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Hash watcher for #admin
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lightbox State
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    src: string;
    caption: string;
  }>({
    isOpen: false,
    src: '',
    caption: '',
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save language
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('villagrana_lang', newLang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'es' : 'en';
    handleLanguageChange(next);
  };

  // Open Donate with specific amount
  const handleSelectAmount = (amt: number) => {
    setSelectedInitialAmount(amt);
    setIsDonateOpen(true);
  };

  // Donation Success handler
  const handleDonationSuccess = (newDonor: Donor) => {
    const updatedAmount = raisedAmount + newDonor.amount;
    const updatedDonors = [newDonor, ...donors];

    setRaisedAmount(updatedAmount);
    setDonors(updatedDonors);

    localStorage.setItem('villagrana_live_raised', updatedAmount.toString());
    localStorage.setItem('villagrana_live_donors', JSON.stringify(updatedDonors));

    setToastMessage(
      language === 'en'
        ? `Thank you! Your donation of $${newDonor.amount.toLocaleString()} was received.`
        : `¡Muchas gracias! Se recibió tu donación de $${newDonor.amount.toLocaleString()}.`
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Free message handler
  const handleAddMessageOnly = (name: string, message: string) => {
    const newEntry: Donor = {
      id: `msg-${Date.now()}`,
      name,
      amount: 0,
      date: language === 'en' ? 'Just now' : 'Hace un momento',
      message,
    };
    const updatedDonors = [newEntry, ...donors];
    setDonors(updatedDonors);
    localStorage.setItem('villagrana_live_donors', JSON.stringify(updatedDonors));
  };

  // Admin Handlers (for Jeremy Urpman)
  const handleUpdateRaisedAmount = (newAmount: number) => {
    const clamped = Math.max(0, newAmount);
    setRaisedAmount(clamped);
    localStorage.setItem('villagrana_live_raised', clamped.toString());
    setToastMessage(
      language === 'en'
        ? `Campaign goal total updated: $${clamped.toLocaleString()}`
        : `Total de recaudación actualizado: $${clamped.toLocaleString()}`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDeleteMessage = (donorId: string) => {
    const updated = donors.filter((d) => d.id !== donorId);
    setDonors(updated);
    localStorage.setItem('villagrana_live_donors', JSON.stringify(updated));
    setToastMessage(
      language === 'en'
        ? 'Message removed from community wall.'
        : 'Mensaje eliminado del muro comunitario.'
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddManualDonation = (amount: number, name: string, message?: string) => {
    const updatedAmount = raisedAmount + amount;
    const newEntry: Donor = {
      id: `admin-${Date.now()}`,
      name,
      amount,
      date: language === 'en' ? 'Verified Gift' : 'Aporte Verificado',
      message,
    };
    const updatedDonors = [newEntry, ...donors];

    setRaisedAmount(updatedAmount);
    setDonors(updatedDonors);
    localStorage.setItem('villagrana_live_raised', updatedAmount.toString());
    localStorage.setItem('villagrana_live_donors', JSON.stringify(updatedDonors));

    setToastMessage(
      language === 'en'
        ? `Added $${amount.toLocaleString()} from ${name} to legal defense.`
        : `Se añadieron $${amount.toLocaleString()} de ${name}.`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Lightbox
  const handleViewImage = (src: string, caption: string) => {
    setLightboxData({
      isOpen: true,
      src,
      caption,
    });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-50 text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-stone-900 pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-xl bg-stone-900 text-white shadow-2xl border border-amber-500/50 text-xs sm:text-sm font-medium animate-fade-in flex items-center gap-2 max-w-[calc(100vw-2rem)]">
          <Heart className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero Section with whole family photo */}
      <HeroSection
        language={language}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
        onOpenShare={() => setIsShareOpen(true)}
        onViewImage={handleViewImage}
      />

      {/* $20,000 Goal Progress Card */}
      <DonationProgressCard
        language={language}
        raisedAmount={raisedAmount}
        donorCount={donors.length}
        onSelectAmount={handleSelectAmount}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Full Family Plea & Official Document Flyer Viewer */}
      <StoryAndLetterSection
        language={language}
        onLanguageToggle={toggleLanguage}
        onViewImage={handleViewImage}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Key Dates Timeline (Nov 13 urgent target & Dec 4 sentencing hearing) */}
      <KeyDatesTimeline
        language={language}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
      />

      {/* Community Prayers & Donor Wall */}
      <DonorWall
        language={language}
        donors={donors}
        onAddMessageOnly={handleAddMessageOnly}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
      />

      {/* Transparency & FAQ */}
      <TransparencyFAQ language={language} />

      {/* Footer */}
      <Footer
        language={language}
        onLanguageToggle={toggleLanguage}
        onOpenDonate={() => {
          setSelectedInitialAmount(100);
          setIsDonateOpen(true);
        }}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Sticky Mobile Quick Donate Bar (capped <= 15% viewport height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-2.5 px-3 sm:px-4 flex items-center justify-between gap-2 shadow-2xl w-full max-w-full overflow-hidden">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold truncate">
            {language === 'en' ? 'Goal $20,000' : 'Meta $20,000'}
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-white font-mono truncate">
            ${raisedAmount.toLocaleString()}{' '}
            <span className="text-[11px] text-amber-400 font-normal">
              ({Math.min(100, Math.round((raisedAmount / CAMPAIGN_META.goalAmount) * 100))}%)
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold"
            title="Toggle language"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>

          {/* Quick Share */}
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="p-2 rounded-lg bg-stone-800 border border-stone-700 text-stone-300"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Donate Button */}
          <button
            type="button"
            onClick={() => {
              setSelectedInitialAmount(50);
              setIsDonateOpen(true);
            }}
            className="py-2 px-4 rounded-xl font-bold text-xs text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Heart className="w-3.5 h-3.5 fill-stone-950" />
            <span>{language === 'en' ? 'Donate' : 'Donar'}</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        language={language}
        initialAmount={selectedInitialAmount}
        onDonationSuccess={handleDonationSuccess}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        language={language}
      />

      <ImageLightbox
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        caption={lightboxData.caption}
        onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Admin Portal Modal (Jeremy Urpman) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', ' ');
          }
        }}
        language={language}
        raisedAmount={raisedAmount}
        goalAmount={CAMPAIGN_META.goalAmount}
        donors={donors}
        onUpdateRaisedAmount={handleUpdateRaisedAmount}
        onDeleteMessage={handleDeleteMessage}
        onAddManualDonation={handleAddManualDonation}
      />
    </div>
  );
}
