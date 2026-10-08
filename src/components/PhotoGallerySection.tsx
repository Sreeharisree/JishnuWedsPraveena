import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  PhotoItem,
  INITIAL_GROOM_PHOTOS,
  INITIAL_BRIDE_PHOTOS,
  INITIAL_COUPLE_PHOTOS,
} from '../data/weddingDetails';

export const PhotoGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'groom' | 'bride'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const groomPhotos: PhotoItem[] = INITIAL_GROOM_PHOTOS;
  const bridePhotos: PhotoItem[] = INITIAL_BRIDE_PHOTOS;
  const allMomentsPhotos: PhotoItem[] = INITIAL_COUPLE_PHOTOS;

  // Complete gallery: all moments, groom, and bride
  const allPhotos: PhotoItem[] = [
    ...allMomentsPhotos,
    ...groomPhotos,
    ...bridePhotos,
  ];

  const displayedPhotos =
    activeCategory === 'groom'
      ? groomPhotos
      : activeCategory === 'bride'
      ? bridePhotos
      : allPhotos;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + displayedPhotos.length) % displayedPhotos.length : 0
    );
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % displayedPhotos.length : 0
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + displayedPhotos.length) % displayedPhotos.length : 0
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % displayedPhotos.length : 0
        );
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, displayedPhotos.length]);

  return (
    <section id="photos" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Bridal & Groom Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Cherished Moments & Portraits
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            A celebration of love, heritage, and timeless wedding memories.
          </p>
        </div>

        {/* Modern Category Filter Tabs (Zero counts on buttons) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#EAE0D2] rounded-xl border border-[#D9CEBF]">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedPhotoIndex(null);
              }}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              All Moments
            </button>
            <button
              onClick={() => {
                setActiveCategory('groom');
                setSelectedPhotoIndex(null);
              }}
              className={`px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'groom'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              Groom
            </button>
            <button
              onClick={() => {
                setActiveCategory('bride');
                setSelectedPhotoIndex(null);
              }}
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

        {/* Modern Phone-Gallery Grid (Pure Image-Only Cards, No Text) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {displayedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-[#EFE9DF] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
            >
              {/* Image filling 100% of card, no text or labels */}
              <img
                src={photo.url}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
              />

              {/* Modern Phone-Gallery Glass Tap Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#2C241E] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-[#8B2635]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Fullscreen Phone-Gallery Lightbox */}
        {selectedPhotoIndex !== null && displayedPhotos[selectedPhotoIndex] && (
          <div
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNextPhoto}
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
                src={displayedPhotos[selectedPhotoIndex].url}
                alt=""
                referrerPolicy="no-referrer"
                draggable={false}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 duration-200 select-none pointer-events-none"
              />
            </div>

            {/* Bottom Subtle Photo Counter Indicator */}
            <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white/90">
                {selectedPhotoIndex + 1} / {displayedPhotos.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
