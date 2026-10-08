import React, { useState, useEffect } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { HeroSection } from './components/HeroSection';
import { CoupleStorySection } from './components/CoupleStorySection';
import { GpsNavigationSection } from './components/GpsNavigationSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ScheduleSection } from './components/ScheduleSection';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { FamilyContactsSection } from './components/FamilyContactsSection';
import { Footer } from './components/Footer';
import { CardShowcaseModal } from './components/CardShowcaseModal';
import { InvitationCoverModal } from './components/InvitationCoverModal';
import { shubhamAudio } from './utils/shubhamAudio';

export default function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    // Autoplay ceremony audio on entry by default
    shubhamAudio.initAutoplay();

    // Anti-screenshot & content protection handlers
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Intercept PrintScreen
      if (e.key === 'PrintScreen') {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('');
        }
      }
      // Block Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
      }
      // Block Ctrl+S / Cmd+S (Save page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
      // Block Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }
      // Block F12 and Ctrl+Shift+I (DevTools inspection)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j'))
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans select-none selection:bg-transparent"
    >
      {/* Top Bar Header with Mute / Unmute Button */}
      <NavigationHeader onNavigateToSection={handleNavigateToSection} />

      {/* Main Wedding Content Flow */}
      <main className="flex-1">
        {/* Hero Section & Auspicious Card Header */}
        <HeroSection
          onOpenCardModal={() => setIsCardModalOpen(true)}
          onNavigateToGps={() => handleNavigateToSection('gps-navigation')}
        />

        {/* Meet the Couple: Ancestry, Lineage & Family Ties */}
        <div id="ceremony">
          <CoupleStorySection />
        </div>

        {/* GPS Navigation Section: Groom's Home & Wedding Venue */}
        <GpsNavigationSection />

        {/* Photo Gallery: Modern Phone-Gallery Grid */}
        <PhotoGallerySection />

        {/* Order of Sacred Ceremonies & Timeline */}
        <ScheduleSection onNavigateToGps={() => handleNavigateToSection('gps-navigation')} />

        {/* Guest Blessings & RSVP */}
        <BlessingsGuestbook />

        {/* Family Contact Directory & Hosts */}
        <FamilyContactsSection />
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
    </div>
  );
}
