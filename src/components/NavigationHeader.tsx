import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Navigation } from 'lucide-react';
import { shubhamAudio } from '../utils/shubhamAudio';

interface NavigationHeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onNavigateToSection }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to real-time audio state changes
    const unsubscribe = shubhamAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleAudio = () => {
    shubhamAudio.toggle();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-[#E3D8C8] shadow-xs py-3'
          : 'bg-[#FAF7F2] border-[#ECE2D0] py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateToSection('invitation')}
          className="text-left font-serif text-lg sm:text-xl font-bold tracking-tight focus-visible:outline-hidden cursor-pointer"
        >
          <span className="name-shimmer">Jishnu & Praveena</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B5A4E]">
          <button
            onClick={() => onNavigateToSection('ceremony')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Ceremony
          </button>
          <button
            onClick={() => onNavigateToSection('couple')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Bride & Groom
          </button>
          <button
            onClick={() => onNavigateToSection('gps-navigation')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            GPS Locations
          </button>
          <button
            onClick={() => onNavigateToSection('photos')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Photo Gallery
          </button>
          <button
            onClick={() => onNavigateToSection('schedule')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => onNavigateToSection('wishes')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Blessings
          </button>
        </nav>

        {/* Zone 3: Audio mute button and navigation action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute / Unmute Button (Icon only) */}
          <button
            onClick={handleToggleAudio}
            title={isPlayingAudio ? 'Mute ceremony prayer chant' : 'Play ceremony prayer chant'}
            aria-label="Toggle ceremony audio"
            className={`p-2 rounded-lg transition-colors cursor-pointer border ${
              isPlayingAudio
                ? 'bg-[#F4ECE1] text-[#8B2635] border-[#DECFC0] hover:bg-[#EBDCCB]'
                : 'bg-white text-[#7D6E63] border-[#DECFC0] hover:bg-[#F0E6D8] hover:text-[#3B2D22]'
            }`}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 text-[#8B2635]" />
            ) : (
              <VolumeX className="w-5 h-5 text-[#7D6E63]" />
            )}
          </button>

          <button
            onClick={() => onNavigateToSection('gps-navigation')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate</span>
          </button>
        </div>
      </div>
    </header>
  );
};
