import React, { useState } from 'react';
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
import { YouTubeAudioPlayer } from './components/YouTubeAudioPlayer';

export default function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#E8D4BE] selection:text-[#5A1723]">
      {/* Top Bar Header */}
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

        {/* Photo Gallery: 5 Photos Each for Bride & Groom + Google Drive Link Input */}
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

      {/* Background Indian Wedding Classical Music Player (YouTube: CqXjW27NlHs) */}
      <YouTubeAudioPlayer />

      {/* Original Invitation Card Viewer Modal */}
      <CardShowcaseModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </div>
  );
}
