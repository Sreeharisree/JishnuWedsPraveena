import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  PhotoItem,
  INITIAL_GROOM_PHOTOS,
  INITIAL_BRIDE_PHOTOS,
  INITIAL_COUPLE_PHOTOS,
  WEDDING_DATA,
} from '../data/weddingDetails';
import { formatGoogleDriveImageUrl, extractGoogleDriveId } from '../utils/googleDrive';

export const PhotoGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'groom' | 'bride'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isDriveManagerOpen, setIsDriveManagerOpen] = useState(false);

  // Custom photo drive links stored in local storage
  const [groomDriveLinks, setGroomDriveLinks] = useState<string[]>(['', '', '', '', '']);
  const [brideDriveLinks, setBrideDriveLinks] = useState<string[]>(['', '', '', '', '']);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Load custom links from localStorage
  useEffect(() => {
    try {
      const savedGroom = localStorage.getItem('wedding_drive_groom_links');
      const savedBride = localStorage.getItem('wedding_drive_bride_links');
      if (savedGroom) {
        setGroomDriveLinks(JSON.parse(savedGroom));
      }
      if (savedBride) {
        setBrideDriveLinks(JSON.parse(savedBride));
      }
    } catch (e) {
      console.warn('Failed to load saved links:', e);
    }
  }, []);

  // Compute final photo lists merging initial placeholders with user drive links
  const groomPhotos: PhotoItem[] = INITIAL_GROOM_PHOTOS.map((item, idx) => {
    const customLink = groomDriveLinks[idx];
    if (customLink && customLink.trim()) {
      return {
        ...item,
        url: formatGoogleDriveImageUrl(customLink, item.url),
        googleDriveUrl: customLink.trim(),
        caption: `Groom Jishnu Vikraman Pillai — Photo ${idx + 1}`,
      };
    }
    return item;
  });

  const bridePhotos: PhotoItem[] = INITIAL_BRIDE_PHOTOS.map((item, idx) => {
    const customLink = brideDriveLinks[idx];
    if (customLink && customLink.trim()) {
      return {
        ...item,
        url: formatGoogleDriveImageUrl(customLink, item.url),
        googleDriveUrl: customLink.trim(),
        caption: `Bride K.S. Praveena — Photo ${idx + 1}`,
      };
    }
    return item;
  });

  const allPhotos: PhotoItem[] = [
    ...INITIAL_COUPLE_PHOTOS,
    ...bridePhotos,
    ...groomPhotos,
  ];

  const displayedPhotos =
    activeCategory === 'groom'
      ? groomPhotos
      : activeCategory === 'bride'
      ? bridePhotos
      : allPhotos;

  const handleSaveDriveLinks = () => {
    try {
      localStorage.setItem('wedding_drive_groom_links', JSON.stringify(groomDriveLinks));
      localStorage.setItem('wedding_drive_bride_links', JSON.stringify(brideDriveLinks));
      setIsSavedNotice(true);
      setTimeout(() => {
        setIsSavedNotice(false);
        setIsDriveManagerOpen(false);
      }, 1500);
    } catch (e) {
      console.error('Failed to save links:', e);
    }
  };

  const handleResetLinks = () => {
    setGroomDriveLinks(['', '', '', '', '']);
    setBrideDriveLinks(['', '', '', '', '']);
    localStorage.removeItem('wedding_drive_groom_links');
    localStorage.removeItem('wedding_drive_bride_links');
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = displayedPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + displayedPhotos.length) % displayedPhotos.length;
    setSelectedPhoto(displayedPhotos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = displayedPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % displayedPhotos.length;
    setSelectedPhoto(displayedPhotos[nextIndex]);
  };

  return (
    <section id="photos" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B2635]">
            Bridal & Groom Portrait Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E] mt-2 text-balance">
            Cherished Moments & Portraits
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A4E] mt-2">
            View portraits of Groom Jishnu Vikraman Pillai and Bride K.S. Praveena. Google Drive links can be updated anytime below.
          </p>

          {/* Drive Links Configurator Trigger */}
          <div className="mt-4">
            <button
              onClick={() => setIsDriveManagerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#8B2635] bg-[#F0E6D8] hover:bg-[#E7DBCB] rounded-lg transition-colors border border-[#D9CABB] cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Update Google Drive Links (5 Bride & 5 Groom)</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Zero-pill discipline: Segmented control with clean states) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#EAE0D2] rounded-xl border border-[#D9CEBF]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              All Moments
            </button>
            <button
              onClick={() => setActiveCategory('groom')}
              className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'groom'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              Groom: Jishnu (5 Photos)
            </button>
            <button
              onClick={() => setActiveCategory('bride')}
              className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'bride'
                  ? 'bg-white text-[#8B2635] shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#2C241E]'
              }`}
            >
              Bride: Praveena (5 Photos)
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative bg-white border border-[#E3D8C8] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-3/4 overflow-hidden bg-[#F0EAE1]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Graceful fallback container if custom Google Drive link needs direct permission
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'text-center');
                      parent.innerHTML = `
                        <div class="space-y-2">
                          <div class="w-12 h-12 mx-auto rounded-full bg-[#EAE0D2] flex items-center justify-center text-[#8B2635]">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                          <p class="text-xs font-semibold text-[#8B2635]">${photo.caption}</p>
                          <p class="text-[10px] text-[#735E50]">Google Drive Photo</p>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Hover Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white w-full flex items-center justify-between">
                    <span className="text-xs font-medium truncate">{photo.caption}</span>
                    <Maximize2 className="w-4 h-4 shrink-0 text-[#C5A059]" />
                  </div>
                </div>

                {/* Subtle category tag (quiet typography, no candy pill) */}
                <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm">
                  {photo.category === 'groom' ? 'Groom' : photo.category === 'bride' ? 'Bride' : 'Ceremony'}
                </div>
              </div>

              {/* Caption Under Card */}
              <div className="p-3 bg-white border-t border-[#ECE2D0]">
                <p className="text-xs font-medium text-[#2C241E] truncate">{photo.caption}</p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[#735E50]">
                  <span>{photo.category === 'groom' ? 'Jishnu V. Pillai' : photo.category === 'bride' ? 'K.S. Praveena' : 'Wedding Highlights'}</span>
                  {photo.googleDriveUrl && (
                    <span className="text-[#8B2635] font-semibold">Google Drive Link</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Google Drive Photo Manager */}
        {isDriveManagerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#E3D8C8] shadow-2xl p-6 sm:p-8 text-[#2C241E]">
              {/* Close button */}
              <button
                onClick={() => setIsDriveManagerOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] text-[#6B5A4E] hover:text-[#8B2635] transition-colors cursor-pointer"
                aria-label="Close photo manager"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pb-4 border-b border-[#ECE2D0]">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#8B2635]">
                  Google Drive Photo Link Manager
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5A4E] mt-1">
                  Paste the Google Drive links for the 5 Bride and 5 Groom photos. They will be saved to your device and displayed across the invitation gallery.
                </p>
              </div>

              {/* Helpful Drive Instruction Box */}
              <div className="my-4 p-3.5 bg-[#FAF7F2] border border-[#E3D8C8] rounded-xl text-xs text-[#5D4F44] space-y-1">
                <div className="font-semibold text-[#8B2635] flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>How to use Google Drive photo links:</span>
                </div>
                <p>1. Open Google Drive, right click the photo, select <strong>Share ➔ Share</strong>.</p>
                <p>2. Set General Access to <strong>&quot;Anyone with the link can view&quot;</strong>.</p>
                <p>3. Copy the link and paste it into any of the 5 slots below. The app will automatically convert and display high-res previews!</p>
              </div>

              {/* Groom's 5 Photo Inputs */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm text-[#8B2635] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Groom: Jishnu Vikraman Pillai (5 Photos)</span>
                </h4>
                {groomDriveLinks.map((link, idx) => (
                  <div key={`groom-input-${idx}`} className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-[#735E50] text-right">#{idx + 1}</span>
                    <input
                      type="url"
                      placeholder={`https://drive.google.com/file/d/.../view?usp=sharing (Groom Photo ${idx + 1})`}
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...groomDriveLinks];
                        newLinks[idx] = e.target.value;
                        setGroomDriveLinks(newLinks);
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
                    />
                  </div>
                ))}
              </div>

              {/* Bride's 5 Photo Inputs */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm text-[#8B2635] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Bride: K.S. Praveena (5 Photos)</span>
                </h4>
                {brideDriveLinks.map((link, idx) => (
                  <div key={`bride-input-${idx}`} className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-[#735E50] text-right">#{idx + 1}</span>
                    <input
                      type="url"
                      placeholder={`https://drive.google.com/file/d/.../view?usp=sharing (Bride Photo ${idx + 1})`}
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...brideDriveLinks];
                        newLinks[idx] = e.target.value;
                        setBrideDriveLinks(newLinks);
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-[#D9CABB] rounded-lg focus:outline-hidden focus:border-[#8B2635] bg-[#FFFDF9]"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#ECE2D0] flex items-center justify-between">
                <button
                  onClick={handleResetLinks}
                  className="inline-flex items-center gap-1.5 text-xs text-[#735E50] hover:text-[#8B2635] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to default photos</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDriveManagerOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#5D4F44] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDriveLinks}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#8B2635] hover:bg-[#721F2B] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavedNotice ? 'Saved!' : 'Save & Update Gallery'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Fullscreen Photo Lightbox */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
              aria-label="Close fullscreen photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox content */}
            <div className="max-w-4xl max-h-[88vh] flex flex-col items-center">
              <div className="relative max-h-[75vh] overflow-hidden rounded-xl bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>
              <div className="mt-4 text-center text-white space-y-1 max-w-xl">
                <p className="font-serif text-lg font-semibold">{selectedPhoto.caption}</p>
                {selectedPhoto.googleDriveUrl && (
                  <a
                    href={selectedPhoto.googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:underline"
                  >
                    <span>Open in Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
