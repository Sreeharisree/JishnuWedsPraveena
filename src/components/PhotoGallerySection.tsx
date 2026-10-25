import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Upload,
} from 'lucide-react';
import {
  INITIAL_GROOM_PHOTOS,
  INITIAL_BRIDE_PHOTOS,
  CAROUSEL_ORDERED_PHOTOS,
} from '../data/weddingDetails';

interface PhotoGallerySectionProps {
  onOpenPhotoUpload?: () => void;
}

export interface ExtendedPhotoItem {
  id: string;
  caption: string;
  category: 'groom' | 'bride' | 'couple';
  url: string;
  googleDriveUrl?: string;
  aspectRatio?: string;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  onOpenPhotoUpload,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'groom' | 'bride'>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayedPhotos: ExtendedPhotoItem[] =
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

  const activeLightboxPhoto =
    lightboxIndex !== null && displayedPhotos[lightboxIndex]
      ? displayedPhotos[lightboxIndex]
      : null;

  return (
    <section
      id="photos"
      className="py-10 md:py-16 bg-[#FAF7F2] dark:bg-[#120E0C] border-t border-[#ECE2D0] dark:border-[#261E1A] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635] dark:text-[#E88294]">
            Sacred Memories
          </span>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#2C241E] dark:text-[#FAF5EE]">
            Visual Chronicle
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-8 bg-[#C5A059] opacity-60"></span>
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="h-px w-8 bg-[#C5A059] opacity-60"></span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5A4E] dark:text-[#C5B4A5]">
            Swipe horizontally or tap cards to preview moments of grace and celebration
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-[#EFE9DF] dark:bg-[#201814] border border-[#DECFC0] dark:border-[#382B24] gap-1 shadow-inner text-xs sm:text-sm">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-[#34261F] text-[#8B2635] dark:text-[#F38BA8] shadow-xs'
                  : 'text-[#6B5A4E] dark:text-[#BFAFA2] hover:text-[#2C241E] dark:hover:text-[#FAF5EE]'
              }`}
            >
              All Moments ({INITIAL_GROOM_PHOTOS.length + INITIAL_BRIDE_PHOTOS.length})
            </button>
            <button
              onClick={() => handleCategoryChange('groom')}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'groom'
                  ? 'bg-white dark:bg-[#34261F] text-[#8B2635] dark:text-[#F38BA8] shadow-xs'
                  : 'text-[#6B5A4E] dark:text-[#BFAFA2] hover:text-[#2C241E] dark:hover:text-[#FAF5EE]'
              }`}
            >
              Groom ({INITIAL_GROOM_PHOTOS.length})
            </button>
            <button
              onClick={() => handleCategoryChange('bride')}
              className={`px-3 sm:px-4 py-1.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'bride'
                  ? 'bg-white dark:bg-[#34261F] text-[#8B2635] dark:text-[#F38BA8] shadow-xs'
                  : 'text-[#6B5A4E] dark:text-[#BFAFA2] hover:text-[#2C241E] dark:hover:text-[#FAF5EE]'
              }`}
            >
              Bride ({INITIAL_BRIDE_PHOTOS.length})
            </button>
          </div>
        </div>

        {/* Guest Photo Upload Call-to-Action Bar */}
        {onOpenPhotoUpload && (
          <div className="max-w-3xl mx-auto mb-8 p-4 sm:p-5 rounded-3xl bg-linear-to-r from-[#FAF3E5] via-[#FFFDF9] to-[#FAF3E5] dark:from-[#221915] dark:via-[#1A1412] dark:to-[#221915] border border-[#E8DEC8] dark:border-[#382B24] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#8B2635] to-[#601420] text-white flex items-center justify-center shadow-xs shrink-0 mx-auto sm:mx-0">
                <Upload className="w-5 h-5 text-[#F9E9B8]" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#2C241E] dark:text-[#FAF5EE] flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>Attending the Wedding? Share Your Photos!</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-[#735E50] dark:text-[#B5A496]">
                  Upload your celebration memories directly to Jishnu &amp; Praveena's wedding album.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenPhotoUpload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photos</span>
            </button>
          </div>
        )}

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
                className={`absolute w-[240px] sm:w-[290px] md:w-[330px] aspect-4/5 rounded-3xl overflow-hidden bg-[#EAE2D5] dark:bg-[#201814] border border-black/5 dark:border-white/10 cursor-pointer transition-all duration-500 ease-out transform ${transformClass} ${opacityClass}`}
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
                    <div className="w-11 h-11 rounded-full bg-white/85 dark:bg-[#1E1714]/85 backdrop-blur-md flex items-center justify-center shadow-lg text-[#8B2635] dark:text-[#E88294] transform scale-90 hover:scale-105 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Dots (Always in Infinite Loop) */}
        <div className="mt-7 flex items-center justify-center gap-1.5 sm:gap-2 select-none">
          {displayedPhotos.map((_, dotIdx) => {
            const total = displayedPhotos.length;
            let circularDist = Math.abs(dotIdx - activeIndex);
            if (circularDist > total / 2) circularDist = total - circularDist;

            const isActive = circularDist === 0;
            let dotStyle = 'w-1.5 h-1.5 bg-[#D9CABB] dark:bg-[#382B24] opacity-50';

            if (isActive) {
              dotStyle =
                'w-7 sm:w-8 h-2 bg-linear-to-r from-[#8B2635] via-[#A83244] to-[#C5A059] shadow-xs shadow-[#8B2635]/30 opacity-100 ring-2 ring-[#C5A059]/40';
            } else if (circularDist === 1) {
              dotStyle = 'w-3 h-2 bg-[#8B2635]/65 dark:bg-[#E88294]/65 opacity-85 hover:opacity-100';
            } else if (circularDist === 2) {
              dotStyle = 'w-2 h-2 bg-[#C5A059]/65 dark:bg-[#E5C378]/65 opacity-70 hover:opacity-100';
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
        {activeLightboxPhoto && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none p-4"
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
              className="relative max-w-5xl max-h-[82vh] p-2 sm:p-4 flex flex-col items-center justify-center"
            >
              <img
                src={activeLightboxPhoto.url}
                alt=""
                referrerPolicy="no-referrer"
                className="max-h-[70vh] sm:max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
              />

              {/* Photo Caption Overlay */}
              {activeLightboxPhoto.caption && (
                <div className="mt-3 w-full max-w-lg bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 text-white text-center shadow-xl">
                  <p className="text-xs sm:text-sm text-white/90 italic font-serif">
                    &ldquo;{activeLightboxPhoto.caption}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Subtle Photo Counter Indicator */}
            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-medium text-white/90">
                {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {displayedPhotos.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
