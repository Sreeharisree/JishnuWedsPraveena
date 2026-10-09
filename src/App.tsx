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
import { shubhamAudio } from './utils/shubhamAudio';

export default function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    // Autoplay ceremony audio on entry by default
    shubhamAudio.initAutoplay();
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans"
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
