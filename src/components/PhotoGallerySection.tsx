import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import {
  PhotoItem,
  INITIAL_GROOM_PHOTOS,
  INITIAL_BRIDE_PHOTOS,
  CAROUSEL_ORDERED_PHOTOS,
} from '../data/weddingDetails';

export const PhotoGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'groom' | 'bride'>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayedPhotos: PhotoItem[] =
    activeCategory === 'groom'
      ? INITIAL_GROOM_PHOTOS
      : activeCategory === 'bride'
      ? INITIAL_BRIDE_PHOTOS
      : CAROUSEL_ORDERED_PHOTOS;

  // Carousel is always in continuous infinite loop (only pauses if user opens fullscreen lightbox)
  useEffect(() => {
    if (lightboxIndex !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayedPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [lightboxIndex, displayedPhotos.length]);

  // Reset active index when category changes
  const handleCategoryChange = (category: 'all' | 'groom' | 'bride') => {
    setActiveCategory(category);
    setActiveIndex(0);
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayedPhotos.length) % displayedPhotos.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayedPhotos.length);
  };

  // Touch Swipe Handlers for smooth mobile swiping
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + displayedPhotos.length) % displayedPhotos.length : 0
          );
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % displayedPhotos.length : 0
          );
        } else if (e.key === 'Escape') {
          setLightboxIndex(null);
        }
      } else {
        if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, displayedPhotos.length]);

  return (
    <section id="photos" className="py-10 md:py-16 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Bridal & Groom Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Cherished Moments & Portraits
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            Swipe or use controls to browse through wedding portraits and memories.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#EAE0D2] rounded-xl border border-[#D9CEBF]">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              All Moments
            </button>
            <button
              onClick={() => handleCategoryChange('groom')}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'groom'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              Groom
            </button>
            <button
              onClick={() => handleCategoryChange('bride')}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'bride'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              Bride
            </button>
          </div>
        </div>

        {/* 3D Flow Carousel Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-4xl mx-auto h-[380px] sm:h-[450px] md:h-[490px] flex items-center justify-center"
        >
          {displayedPhotos.map((photo, index) => {
            const total = displayedPhotos.length;
            let diff = index - activeIndex;

            // Circular wrapping offset calculation
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isNear = Math.abs(diff) <= 2;

            if (!isNear) return null;

            // Transform styles based on offset from active center card
            let transformClass = '';
            let zIndex = 10;
            let opacityClass = 'opacity-0';

            if (diff === 0) {
              transformClass = 'translate-x-0 scale-100 shadow-2xl';
              zIndex = 30;
              opacityClass = 'opacity-100';
            } else if (diff === 1) {
              transformClass = 'translate-x-[55%] sm:translate-x-[62%] md:translate-x-[68%] scale-[0.84] shadow-lg';
              zIndex = 20;
              opacityClass = 'opacity-70 hover:opacity-90';
            } else if (diff === -1) {
              transformClass = '-translate-x-[55%] sm:-translate-x-[62%] md:-translate-x-[68%] scale-[0.84] shadow-lg';
              zIndex = 20;
              opacityClass = 'opacity-70 hover:opacity-90';
            } else if (diff === 2) {
              transformClass = 'translate-x-[95%] sm:translate-x-[110%] md:translate-x-[120%] scale-[0.68] shadow-md';
              zIndex = 10;
              opacityClass = 'opacity-35 hover:opacity-55';
            } else if (diff === -2) {
              transformClass = '-translate-x-[95%] sm:-translate-x-[110%] md:-translate-x-[120%] scale-[0.68] shadow-md';
              zIndex = 10;
              opacityClass = 'opacity-35 hover:opacity-55';
            }

            return (
              <div
                key={`${photo.id}-${index}`}
                onClick={() => {
                  if (isCenter) {
                    setLightboxIndex(index);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                style={{ zIndex }}
                className={`absolute w-[240px] sm:w-[290px] md:w-[330px] aspect-4/5 rounded-3xl overflow-hidden bg-[#EAE2D5] cursor-pointer transition-all duration-500 ease-out transform ${transformClass} ${opacityClass}`}
              >
                <img
                  src={photo.url}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover block"
                />

                {/* Subtle Hover Zoom Overlay on Center Card */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/15 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-lg text-[#8B2635] transform scale-90 hover:scale-105 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Dots (Always in Infinite Loop, No Background, No End Arrows) */}
        <div className="mt-7 flex items-center justify-center gap-1.5 sm:gap-2 select-none">
          {displayedPhotos.map((_, dotIdx) => {
            const total = displayedPhotos.length;
            let circularDist = Math.abs(dotIdx - activeIndex);
            if (circularDist > total / 2) circularDist = total - circularDist;

            const isActive = circularDist === 0;

            let dotStyle = 'w-1.5 h-1.5 bg-[#D9CABB] opacity-50';
            if (isActive) {
              dotStyle =
                'w-7 sm:w-8 h-2 bg-gradient-to-r from-[#8B2635] via-[#A83244] to-[#C5A059] shadow-xs shadow-[#8B2635]/30 opacity-100 ring-2 ring-[#C5A059]/40';
            } else if (circularDist === 1) {
              dotStyle = 'w-3 h-2 bg-[#8B2635]/65 opacity-85 hover:opacity-100';
            } else if (circularDist === 2) {
              dotStyle = 'w-2 h-2 bg-[#C5A059]/65 opacity-70 hover:opacity-100';
            }

            return (
              <button
                key={dotIdx}
                onClick={() => setActiveIndex(dotIdx)}
                aria-label={`View photo ${dotIdx + 1}`}
                className={`rounded-full transition-all duration-500 ease-out cursor-pointer hover:scale-110 ${dotStyle}`}
              />
            );
          })}
        </div>

        {/* Modal: Fullscreen Lightbox View */}
        {lightboxIndex !== null && displayedPhotos[lightboxIndex] && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + displayedPhotos.length) % displayedPhotos.length : 0
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % displayedPhotos.length : 0
                );
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Center Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] p-4 flex items-center justify-center"
            >
              <img
                src={displayedPhotos[lightboxIndex].url}
                alt=""
                referrerPolicy="no-referrer"
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Bottom Subtle Photo Counter Indicator */}
            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white/90">
                {lightboxIndex + 1} / {displayedPhotos.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
