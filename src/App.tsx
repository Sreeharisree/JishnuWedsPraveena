import React, { useState, useEffect } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { HeroSection } from './components/HeroSection';
import { CoupleStorySection } from './components/CoupleStorySection';
import { GpsNavigationSection } from './components/GpsNavigationSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ScheduleSection } from './components/ScheduleSection';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { Footer } from './components/Footer';
import { CardShowcaseModal } from './components/CardShowcaseModal';
import { InvitationCoverModal } from './components/InvitationCoverModal';
import { GuestPhotoUploadModal } from './components/GuestPhotoUploadModal';
import { BlessingsToast } from './components/BlessingsToast';
import { CheckCircle } from 'lucide-react';
import { shubhamAudio } from './utils/shubhamAudio';
import { ThemeProvider } from './context/ThemeContext';

function WeddingAppContent() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Autoplay ceremony audio on entry by default
    shubhamAudio.initAutoplay();
  }, []);

  const handleUploadSuccess = (count: number) => {
    setToastMessage(
      `${count} photo${count > 1 ? 's' : ''} uploaded successfully! Thank you for sharing.`
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (sectionId === 'wishes') {
        setTimeout(() => {
          const input = el.querySelector('input') as HTMLInputElement | null;
          if (input) input.focus();
        }, 500);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] dark:bg-[#120E0C] text-[#2C241E] dark:text-[#F3EDE6] flex flex-col font-sans transition-colors duration-300"
    >
      {/* Top Bar Header with Mute / Unmute Button & Theme Switch */}
      <NavigationHeader
        onNavigateToSection={handleNavigateToSection}
        onOpenPhotoUpload={() => setIsPhotoUploadModalOpen(true)}
      />

      {/* Main Wedding Content Flow */}
      <main className="flex-1">
        {/* Hero Section & Auspicious Card Header */}
        <HeroSection
          onNavigateToBlessings={() => handleNavigateToSection('wishes')}
          onNavigateToGps={() => handleNavigateToSection('gps-navigation')}
        />

        {/* Meet the Couple: Ancestry, Lineage & Family Ties */}
        <div id="ceremony">
          <CoupleStorySection />
        </div>

        {/* GPS Navigation Section: Groom's Home & Wedding Venue */}
        <GpsNavigationSection />

        {/* Photo Gallery: Modern Phone-Gallery Grid */}
        <PhotoGallerySection
          onOpenPhotoUpload={() => setIsPhotoUploadModalOpen(true)}
        />

        {/* Order of Sacred Ceremonies & Timeline */}
        <ScheduleSection onNavigateToGps={() => handleNavigateToSection('gps-navigation')} />

        {/* Guest Blessings & RSVP */}
        <BlessingsGuestbook />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auspicious Welcome Cover (ensures instant audio playback on 1st tap) */}
      <InvitationCoverModal />

      {/* Original Invitation Card Viewer Modal */}
      <CardShowcaseModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />

      {/* Guest Photo Upload Modal */}
      <GuestPhotoUploadModal
        isOpen={isPhotoUploadModalOpen}
        onClose={() => setIsPhotoUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Floating Success Toast Notification (positioned above bottom blessings bar) */}
      {toastMessage && (
        <div className="fixed bottom-24 inset-x-0 mx-auto w-fit max-w-[92vw] z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1C1613]/95 dark:bg-[#2A201B]/95 text-[#FAF5EE] border border-[#C5A059]/40 shadow-2xl backdrop-blur-md">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Persistent Bottom Blessings Toast / Ticker with Call-to-Action */}
      <BlessingsToast
        onBlessCoupleClick={() => handleNavigateToSection('wishes')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeddingAppContent />
    </ThemeProvider>
  );
}

