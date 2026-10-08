import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { shubhamAudio } from '../utils/shubhamAudio';

export const InvitationCoverModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the guest has already opened the invitation in this session
    const hasOpened = sessionStorage.getItem('wedding_invitation_opened') === 'true';
    if (!hasOpened) {
      setIsOpen(true);
    } else {
      // If already opened previously in session, attempt immediate autoplay
      shubhamAudio.initAutoplay();
    }
  }, []);

  const handleOpenInvitation = () => {
    sessionStorage.setItem('wedding_invitation_opened', 'true');
    // Direct user gesture ensures audio starts reliably in all browsers
    shubhamAudio.start();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOpenInvitation}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleOpenInvitation();
        }}
        className="relative w-full max-w-lg bg-[#FFFDF9] border-4 border-[#C5A059] rounded-3xl shadow-2xl p-6 sm:p-8 text-center text-[#2C241E] overflow-hidden"
      >
        {/* Traditional Gold Corner Accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C5A059]" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C5A059]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C5A059]" />

        {/* Sacred Sanskrit Invocation */}
        <p className="text-xs sm:text-sm font-serif tracking-widest text-[#8B2635] uppercase font-bold mb-3">
          ॥ ॐ ശ്രീ മഹാഗണപതയേ നമഃ ॥
        </p>

        {/* Sacred Love Motif */}
        <div className="mx-auto w-14 h-14 rounded-full bg-[#FAF0E1] border-2 border-[#C5A059] flex items-center justify-center shadow-inner mb-4">
          <Heart className="w-7 h-7 text-[#8B2635] fill-[#8B2635]/25 animate-pulse" />
        </div>

        <p className="text-xs tracking-wider text-[#6B5A4E] uppercase font-semibold mb-1">
          Auspicious Wedding Invitation
        </p>

        {/* Couple's Names */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          <span className="name-shimmer">Jishnu & Praveena</span>
        </h2>

        <p className="text-xs text-[#5D4F44] max-w-sm mx-auto mb-6">
          Sunday, 06 December 2026 • Madathilkavu Bhagavathi Temple, Kunnamthanam
        </p>

        {/* Ceremonial Button */}
        <button
          onClick={handleOpenInvitation}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] text-white font-semibold text-sm rounded-full shadow-lg border border-[#C5A059] transition-all transform hover:scale-[1.02] cursor-pointer tracking-wide"
        >
          Open Invitation
        </button>

        <p className="text-[11px] text-[#7A6B5F] mt-4">
          (Tap anywhere on screen to open)
        </p>
      </div>
    </div>
  );
};
