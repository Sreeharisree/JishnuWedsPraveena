import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Navigation, Sun, Moon, Upload } from 'lucide-react';
import { shubhamAudio } from '../utils/shubhamAudio';
import { useTheme } from '../context/ThemeContext';

interface NavigationHeaderProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenPhotoUpload?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onNavigateToSection,
  onOpenPhotoUpload,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to real-time audio state changes
    const unsubscribeAudio = shubhamAudio.subscribe((playing: boolean) => {
      setIsPlayingAudio(playing);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      unsubscribeAudio();
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
          ? 'bg-[#FAF7F2]/95 dark:bg-[#140F0C]/95 backdrop-blur-md border-[#E3D8C8] dark:border-[#382B24] shadow-xs py-3'
          : 'bg-[#FAF7F2] dark:bg-[#140F0C] border-[#ECE2D0] dark:border-[#2D221C] py-4'
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

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B5A4E] dark:text-[#C5B4A5]">
          <button
            onClick={() => onNavigateToSection('ceremony')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Ceremony
          </button>
          <button
            onClick={() => onNavigateToSection('couple')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Bride & Groom
          </button>
          <button
            onClick={() => onNavigateToSection('gps-navigation')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            GPS Locations
          </button>
          <button
            onClick={() => onNavigateToSection('photos')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Photo Gallery
          </button>
          <button
            onClick={() => onNavigateToSection('schedule')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => onNavigateToSection('wishes')}
            className="hover:text-[#8B2635] dark:hover:text-[#E88294] transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            Blessings
          </button>
        </nav>

        {/* Zone 3: Theme switch, Audio & Action buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dark / Light Theme Switch Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg transition-all cursor-pointer border bg-white dark:bg-[#201814] text-[#7D6E63] dark:text-[#E5C378] border-[#DECFC0] dark:border-[#42332A] hover:bg-[#F0E6D8] dark:hover:bg-[#2B211B] hover:text-[#3B2D22] dark:hover:text-[#FFF2D6] active:scale-95 shadow-2xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#E5C378] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-[#7D6E63] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Audio Mute / Unmute Button */}
          <button
            onClick={handleToggleAudio}
            title={isPlayingAudio ? 'Mute ceremony prayer chant' : 'Play ceremony prayer chant'}
            aria-label="Toggle ceremony audio"
            className={`p-2 rounded-lg transition-colors cursor-pointer border shadow-2xs ${
              isPlayingAudio
                ? 'bg-[#F4ECE1] dark:bg-[#34221D] text-[#8B2635] dark:text-[#E88294] border-[#DECFC0] dark:border-[#52352C] hover:bg-[#EBDCCB] dark:hover:bg-[#3E2923]'
                : 'bg-white dark:bg-[#201814] text-[#7D6E63] dark:text-[#B5A496] border-[#DECFC0] dark:border-[#42332A] hover:bg-[#F0E6D8] dark:hover:bg-[#2B211B] hover:text-[#3B2D22] dark:hover:text-[#EFE2D5]'
            }`}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 text-[#8B2635] dark:text-[#E88294]" />
            ) : (
              <VolumeX className="w-5 h-5 text-[#7D6E63] dark:text-[#B5A496]" />
            )}
          </button>

          {/* Guest Photo Upload Button: Icon-only on mobile, icon+text on desktop */}
          {onOpenPhotoUpload && (
            <button
              onClick={onOpenPhotoUpload}
              title="Upload wedding photos"
              aria-label="Upload photos to wedding album"
              className="inline-flex items-center justify-center p-2 sm:px-3 sm:py-1.5 gap-1.5 text-xs sm:text-sm font-semibold text-[#8B2635] dark:text-[#E88294] bg-[#FAF3E5] dark:bg-[#2C211A] hover:bg-[#F2E5D0] dark:hover:bg-[#382B24] border border-[#DECDB5] dark:border-[#423328] rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <Upload className="w-4 h-4 text-[#8B2635] dark:text-[#E88294]" />
              <span className="hidden sm:inline">Upload Photos</span>
            </button>
          )}

          {/* Navigate Button: Icon-only on mobile, icon+text on desktop */}
          <button
            onClick={() => onNavigateToSection('gps-navigation')}
            title="Navigate to wedding locations"
            aria-label="Navigate to wedding locations"
            className="inline-flex items-center justify-center p-2 sm:px-3.5 sm:py-1.5 gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] dark:bg-[#A83244] dark:hover:bg-[#912536] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span className="hidden sm:inline">Navigate</span>
          </button>
        </div>
      </div>
    </header>
  );
};
