import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plus,
  Quote,
} from 'lucide-react';
import { SelectedWish } from '../data/selectedWishes';
import { getAllBlessings, subscribeToBlessings } from '../utils/blessingsStore';

interface BlessingsToastProps {
  onBlessCoupleClick: () => void;
}

const ROTATION_INTERVAL_MS = 6500;

export const BlessingsToast: React.FC<BlessingsToastProps> = ({
  onBlessCoupleClick,
}) => {
  const [blessings, setBlessings] = useState<SelectedWish[]>(getAllBlessings);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // Sync blessings on load and whenever new blessings are saved
  useEffect(() => {
    return subscribeToBlessings(() => {
      const updated = getAllBlessings();
      setBlessings(updated);
      // Automatically show the newest blessing if one was just added
      setCurrentIndex(0);
      setFadeKey((k) => k + 1);
    });
  }, []);

  // Automatic rotation timer
  useEffect(() => {
    if (isPaused || isMinimized || blessings.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blessings.length);
      setFadeKey((k) => k + 1);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, isMinimized, blessings.length]);

  const activeBlessing = blessings[currentIndex] || blessings[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + blessings.length) % blessings.length);
    setFadeKey((k) => k + 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % blessings.length);
    setFadeKey((k) => k + 1);
  };

  if (!activeBlessing) return null;

  // Truncate long messages cleanly for the bottom toast
  const getCleanSnippet = (msg: string, limit = 110) => {
    const singleLine = msg.replace(/\s+/g, ' ').trim();
    if (singleLine.length <= limit) return singleLine;
    return singleLine.slice(0, limit) + '...';
  };

  // Author initials for avatar
  const initials = activeBlessing.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <aside
      aria-label="Guest Blessings Ticker"
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-[580px] pointer-events-auto transition-all duration-300 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {isMinimized ? (
        /* MINIMIZED PILL: Compact, non-intrusive, still invites adding blessings */
        <div className="flex items-center justify-between gap-2.5 px-3.5 py-2 rounded-full bg-[#FFFDFB]/95 dark:bg-[#1A1412]/95 border border-[#D4AF37]/50 dark:border-[#D4AF37]/35 shadow-lg backdrop-blur-md text-xs">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 text-left cursor-pointer hover:opacity-90 transition-opacity min-w-0"
            title="Expand blessings toast"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8B2635] to-[#631823] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-serif font-semibold text-[#8B2635] dark:text-[#E88294] truncate">
                {blessings.length} Sacred Blessings
              </span>
              <span className="text-[#8C7A6D] dark:text-[#9A8A7E] text-[11px] hidden sm:inline">
                • {activeBlessing.name}
              </span>
            </div>
            <ChevronUp className="w-3.5 h-3.5 text-[#8C7A6D] dark:text-[#9A8A7E] shrink-0 ml-1" />
          </button>

          <button
            onClick={onBlessCoupleClick}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8B2635] hover:bg-[#721F2B] dark:bg-[#A83244] dark:hover:bg-[#912536] text-white text-[11px] font-medium shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3 h-3" />
            <span>Add Blessing</span>
          </button>
        </div>
      ) : (
        /* EXPANDED TOAST: Rich quote ticker with author details & prominent Add Blessing CTA */
        <div className="relative rounded-2xl bg-[#FFFDFB]/95 dark:bg-[#1A1412]/95 border border-[#D4AF37]/50 dark:border-[#D4AF37]/35 shadow-xl dark:shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300">
          {/* Subtle Decorative Golden Gradient Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 via-[#8B2635]/5 to-transparent rounded-bl-full pointer-events-none" />

          {/* Animated Auto-Rotation Progress Bar */}
          <div className="w-full h-[2px] bg-[#EAE0D2] dark:bg-[#2C211B] overflow-hidden">
            <div
              key={fadeKey}
              ref={progressRef}
              className={`h-full bg-gradient-to-r from-[#8B2635] via-[#D4AF37] to-[#8B2635] dark:from-[#E88294] dark:via-[#D4AF37] dark:to-[#E88294] ${
                isPaused ? 'animate-none opacity-50' : 'animate-progress'
              }`}
              style={{
                animationDuration: `${ROTATION_INTERVAL_MS}ms`,
                animationTimingFunction: 'linear',
              }}
            />
          </div>

          <div className="p-3 sm:p-3.5 flex flex-col gap-2">
            {/* Top Bar: Author, Relation, Indicator & Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {/* Avatar Badge */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B2635] to-[#631823] dark:from-[#A83244] dark:to-[#631823] text-white flex items-center justify-center font-serif text-[11px] font-bold shrink-0 shadow-2xs">
                  {initials || 'W'}
                </div>

                {/* Author Name & Relationship */}
                <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#2C241E] dark:text-[#FAF5EE]">
                    {activeBlessing.name}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-[#FAF3E5] dark:bg-[#281F1A] text-[#8B2635] dark:text-[#E88294] border border-[#E8DEC8] dark:border-[#3D2E24] font-medium whitespace-normal leading-snug">
                    {activeBlessing.relation}
                  </span>
                </div>
              </div>

              {/* Top Right Controls: Counter, Navigation & Minimize */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[10px] font-mono text-[#8C7A6D] dark:text-[#9A8A7E] mr-1 hidden xs:inline">
                  {currentIndex + 1}/{blessings.length}
                </span>

                <button
                  onClick={handlePrev}
                  title="Previous blessing"
                  aria-label="Previous blessing"
                  className="p-1 rounded-md text-[#7A695D] dark:text-[#9F8F82] hover:text-[#8B2635] dark:hover:text-[#FAF5EE] hover:bg-[#F2ECE1] dark:hover:bg-[#2A201A] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNext}
                  title="Next blessing"
                  aria-label="Next blessing"
                  className="p-1 rounded-md text-[#7A695D] dark:text-[#9F8F82] hover:text-[#8B2635] dark:hover:text-[#FAF5EE] hover:bg-[#F2ECE1] dark:hover:bg-[#2A201A] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize toast"
                  aria-label="Minimize blessings toast"
                  className="p-1 rounded-md text-[#7A695D] dark:text-[#9F8F82] hover:text-[#8B2635] dark:hover:text-[#FAF5EE] hover:bg-[#F2ECE1] dark:hover:bg-[#2A201A] transition-colors cursor-pointer ml-0.5"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle & Bottom: Quote snippet & Add Blessing CTA Button */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              {/* Blessing Message Snippet */}
              <div
                key={fadeKey}
                onClick={onBlessCoupleClick}
                title="Tap to scroll to blessings form"
                className="flex-1 min-w-0 cursor-pointer group animate-in fade-in slide-in-from-right-1 duration-200"
              >
                <p className="text-xs text-[#4A3B31] dark:text-[#DDD1C5] leading-snug line-clamp-2 group-hover:text-[#8B2635] dark:group-hover:text-[#E88294] transition-colors">
                  <span className="font-serif italic text-[#C5A059] mr-0.5">“</span>
                  {getCleanSnippet(activeBlessing.message)}
                  <span className="font-serif italic text-[#C5A059] ml-0.5">”</span>
                </p>
              </div>

              {/* Call-to-Action: Inspires the user to add their own blessing */}
              <button
                onClick={onBlessCoupleClick}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] dark:bg-[#A83244] dark:hover:bg-[#912536] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FAD074]" />
                <span>Bless Couple</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
