import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  Sparkles,
} from 'lucide-react';
import { CURATED_SELECTED_WISHES, SelectedWish } from '../data/selectedWishes';

interface BelovedWishesCardProps {
  wishes?: SelectedWish[];
  targetHeight?: number;
}

export const BelovedWishesCard: React.FC<BelovedWishesCardProps> = ({
  wishes = CURATED_SELECTED_WISHES,
  targetHeight,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const activeWish = wishes[currentIndex] || wishes[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
    setFadeKey((k) => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
    setFadeKey((k) => k + 1);
  };

  const handleSelectIndex = (idx: number) => {
    setCurrentIndex(idx);
    setFadeKey((k) => k + 1);
  };

  // Extract author initials for modern avatar badge
  const initials = activeWish.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  // Dynamically compute typography and padding according to content length so it fits the card
  const getDynamicTextStyling = (msg: string) => {
    const trimmed = msg.trim();
    const len = trimmed.length;
    const lineCount = trimmed.split('\n').filter(Boolean).length;

    if (len < 55 && lineCount <= 2) {
      // Very short wish (e.g. Muhammed Ajmal)
      return {
        textClass:
          'text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed text-center text-[#8B2635] dark:text-[#E88294] font-semibold',
        boxClass: 'items-center justify-center text-center p-6 sm:p-8',
      };
    }

    if (len < 90) {
      // Short poetic wish (e.g. Thomas)
      return {
        textClass:
          'text-base sm:text-xl md:text-2xl font-serif italic leading-relaxed text-center text-[#3B281E] dark:text-[#F0E6DD]',
        boxClass: 'items-center justify-center text-center p-5 sm:p-7',
      };
    }

    if (len < 220) {
      // Medium wish (e.g. Raju Kumar Mishra)
      return {
        textClass:
          'text-sm sm:text-base md:text-[16px] leading-relaxed font-normal text-[#3B281E] dark:text-[#EDE3D8]',
        boxClass: 'items-start justify-center p-4 sm:p-6',
      };
    }

    // Long detailed message (e.g. Arun Pushpakumar's equipment note)
    return {
      textClass:
        'text-[11px] sm:text-xs md:text-[12.5px] leading-relaxed font-normal text-[#382B24] dark:text-[#EAE0D5]',
      boxClass: 'items-start justify-start p-3 sm:p-4',
    };
  };

  const dynamicStyling = getDynamicTextStyling(activeWish.message);

  return (
    <div
      style={targetHeight ? { height: `${targetHeight}px` } : undefined}
      className={`bg-white dark:bg-[#1A1412] border border-[#E3D8C8] dark:border-[#382B24] rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden transition-all duration-300 w-full flex flex-col justify-between ${
        targetHeight ? '' : 'min-h-[580px] h-full'
      }`}
    >
      {/* Decorative Warm Gold Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A059]/15 via-[#8B2635]/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8B2635]/5 to-transparent rounded-tr-full pointer-events-none" />

      {/* Top Header & Content Container */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Card Header: Beloved Wishes with Index Counter */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#ECE2D0] dark:border-[#2D231C] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3E5] dark:bg-[#2C211A] border border-[#E8DEC8] dark:border-[#423328] flex items-center justify-center text-[#8B2635] dark:text-[#E88294] shadow-2xs">
              <Heart className="w-4 h-4 fill-[#8B2635]/20 dark:fill-[#E88294]/20" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#8B2635] dark:text-[#E88294] tracking-tight">
                Beloved Wishes
              </h3>
              <p className="text-[11px] text-[#735E50] dark:text-[#A8988B]">
                From Cherished Friends & Family
              </p>
            </div>
          </div>

          {/* Simple Index Counter Badge */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-[#735E50] dark:text-[#A8988B] bg-[#FAF7F2] dark:bg-[#251D18] px-2.5 py-1 rounded-md border border-[#EFE4D3] dark:border-[#382B24]">
            <span className="text-[#8B2635] dark:text-[#E88294] font-semibold">
              {currentIndex + 1}
            </span>
            <span>/</span>
            <span>{wishes.length}</span>
          </div>
        </div>

        {/* Dynamic Wish Content Body */}
        <div
          key={fadeKey}
          className="animate-in fade-in slide-in-from-right-2 duration-300 flex-1 flex flex-col min-h-0 justify-between overflow-hidden"
        >
          {/* Author Meta: Initials Avatar, Name & Relation Badge */}
          <div className="flex items-start justify-between gap-3 mb-2.5 shrink-0">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B2635] to-[#681824] dark:from-[#A83244] dark:to-[#681824] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs shrink-0 mt-0.5">
                {initials || 'W'}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C241E] dark:text-[#FAF5EE] leading-tight">
                  {activeWish.name}
                </h4>
                <div className="mt-1.5 inline-flex items-start gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-medium bg-[#FAF3E5] dark:bg-[#291F1A] text-[#7A5B3E] dark:text-[#DEC1A3] border border-[#E9DEC9] dark:border-[#3D2E24] max-w-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="leading-snug break-words whitespace-normal">{activeWish.relation}</span>
                </div>
              </div>
            </div>

            <Quote className="w-6 h-6 text-[#C5A059]/40 dark:text-[#D4AF37]/30 shrink-0 mt-1" />
          </div>

          {/* Heartfelt Message Box with content-adaptive font sizing */}
          <div
            className={`relative bg-[#FAF8F5] dark:bg-[#201815] border border-[#ECE2D0] dark:border-[#33261F] rounded-2xl my-1 flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-thin ${dynamicStyling.boxClass}`}
          >
            <p
              className={`${dynamicStyling.textClass} whitespace-pre-line selection:bg-[#8B2635]/20 selection:text-[#8B2635]`}
            >
              {activeWish.message}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer: Interactive Navigation Dots & Prev/Next Controls */}
      <div className="pt-3.5 mt-2 border-t border-[#ECE2D0] dark:border-[#2D231C] flex items-center justify-between gap-2 shrink-0">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {wishes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectIndex(idx)}
              title={`View wish ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-[#8B2635] dark:bg-[#E88294]'
                  : 'w-2 bg-[#D9CABB] dark:bg-[#4A3B32] hover:bg-[#8B2635]/50'
              }`}
              aria-label={`Go to wish ${idx + 1}`}
            />
          ))}
        </div>

        {/* Manual Prev & Next Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            title="Previous wish"
            className="p-2 rounded-xl border border-[#DECDB5] dark:border-[#382B24] bg-[#FAF7F2] dark:bg-[#251D18] text-[#735E50] dark:text-[#B5A496] hover:text-[#8B2635] dark:hover:text-[#FAF5EE] hover:border-[#8B2635]/40 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Previous wish"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            title="Next wish"
            className="p-2 rounded-xl bg-[#8B2635] hover:bg-[#721F2B] dark:bg-[#A83244] dark:hover:bg-[#912536] text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Next wish"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
