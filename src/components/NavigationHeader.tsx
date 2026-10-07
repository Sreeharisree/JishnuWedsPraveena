import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Navigation, MapPin } from 'lucide-react';
import { templeAudio } from '../utils/templeAudio';

interface NavigationHeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onNavigateToSection }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const playing = templeAudio.toggle();
    setIsPlayingAudio(playing);
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
          className="text-left font-serif text-lg sm:text-xl font-bold tracking-tight text-[#3B2D22] hover:text-[#8B2635] transition-colors focus-visible:outline-hidden"
        >
          Jishnu & Praveena
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B5A4E]">
          <button
            onClick={() => onNavigateToSection('ceremony')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            Ceremony
          </button>
          <button
            onClick={() => onNavigateToSection('couple')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            Bride & Groom
          </button>
          <button
            onClick={() => onNavigateToSection('gps-navigation')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            GPS Locations
          </button>
          <button
            onClick={() => onNavigateToSection('photos')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            Photo Gallery
          </button>
          <button
            onClick={() => onNavigateToSection('schedule')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            Schedule
          </button>
          <button
            onClick={() => onNavigateToSection('wishes')}
            className="hover:text-[#8B2635] transition-colors hover:underline underline-offset-8"
          >
            Blessings
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleAudio}
            title={isPlayingAudio ? 'Mute sacred ambient chimes' : 'Play sacred temple chimes'}
            aria-label="Toggle sacred temple audio"
            className="p-2 rounded-lg text-[#6B5A4E] hover:text-[#8B2635] hover:bg-[#F0E6D8] transition-colors cursor-pointer"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 text-[#8B2635] animate-pulse" />
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
