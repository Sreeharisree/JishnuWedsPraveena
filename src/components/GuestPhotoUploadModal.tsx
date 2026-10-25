import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import {
  optimizeImageFile,
  saveGuestPhotoAsync,
} from '../utils/uploadedPhotosStorage';
import { uploadImageToDrive } from '../utils/googleDriveUpload';

interface GuestPhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (count: number) => void;
}

interface PreviewItem {
  id: string;
  dataUrl: string;
  name: string;
  file: File;
}

export const GuestPhotoUploadModal: React.FC<GuestPhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedPhotos, setSelectedPhotos] = useState<PreviewItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setSelectedPhotos((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              dataUrl: result,
              name: file.name,
              file,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) {
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (id: string) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPhotos.length === 0) return;

    setIsUploading(true);
    setUploadProgressText('Processing photos...');
    setUploadError(null);

    const total = selectedPhotos.length;

    try {
      for (let i = 0; i < selectedPhotos.length; i++) {
        setUploadProgressText(`Uploading photo ${i + 1} of ${total}...`);
        const item = selectedPhotos[i];
        let optimizedDataUrl = item.dataUrl;

        try {
          optimizedDataUrl = await optimizeImageFile(item.file, 1600, 0.85);
        } catch {
          // fallback to item.dataUrl
        }

        // Upload directly to the couple's Drive folder via Google Apps Script proxy
        await uploadImageToDrive({
          dataUrl: optimizedDataUrl,
          fileName: item.name,
          caption: '',
          guestName: 'Wedding Guest',
          uploaderEmail: '',
        });

        // Store persistent record locally
        await saveGuestPhotoAsync({
          url: optimizedDataUrl,
          caption: '',
          guestName: 'Wedding Guest',
          uploadedByEmail: '',
        });
      }

      const count = total;
      setSelectedPhotos([]);
      setUploadError(null);

      // Automatically close modal immediately upon upload completion
      if (onUploadSuccess) {
        onUploadSuccess(count);
      }
      onClose();
    } catch (err: any) {
      console.error('Error during upload flow:', err);
      setUploadError(err.message || 'Upload encountered an issue. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FCFBF8] dark:bg-[#1C1613] rounded-3xl border border-[#E6D7C3] dark:border-[#3D2E24] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#F0E4D5] dark:border-[#352720] bg-linear-to-r from-[#F9F5EE] to-[#FCFBF8] dark:from-[#231A15] dark:to-[#1C1613]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#8B2635]/10 dark:bg-[#8B2635]/25 flex items-center justify-center text-[#8B2635] dark:text-[#E2838F]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3B291F] dark:text-[#F3ECE1]">
                Upload Photos
              </h3>
              <p className="text-xs text-[#7A695D] dark:text-[#A7978B]">
                Share celebration memories for Jishnu &amp; Praveena
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A695D] hover:text-[#3B291F] dark:text-[#A7978B] dark:hover:text-[#F3ECE1] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error banner */}
            {uploadError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Direct Upload Photos Button (File upload from device) */}
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-7 px-4 rounded-2xl border-2 border-dashed border-[#D5C6B5] hover:border-[#8B2635] dark:border-[#47382F] dark:hover:border-[#8B2635] bg-[#F7F3EB]/60 hover:bg-[#F2ECE1] dark:bg-[#231A15]/60 dark:hover:bg-[#2B211B] flex flex-col items-center justify-center gap-2.5 text-center transition-all cursor-pointer group"
              >
                <div className="w-13 h-13 rounded-full bg-white dark:bg-[#2F241E] flex items-center justify-center text-[#8B2635] dark:text-[#E2838F] group-hover:scale-110 transition-transform shadow-xs">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs sm:text-sm font-bold text-[#45362E] dark:text-[#D9CCBF] block">
                    {selectedPhotos.length > 0 ? 'Choose More Photos' : 'Select Photos to Upload'}
                  </span>
                  <span className="text-[11px] text-[#806F63] dark:text-[#9A8A7D] block">
                    Tap here to pick photos from your phone or computer
                  </span>
                </div>
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Selected Photos Preview Grid */}
            {selectedPhotos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#665447] dark:text-[#BFB0A3]">
                  <span>Selected Photos ({selectedPhotos.length})</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhotos([])}
                    className="text-[#8B2635] dark:text-[#F38BA8] hover:underline cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1">
                  {selectedPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-[#D5C6B5] dark:border-[#47382F] bg-black/5"
                    >
                      <img
                        src={photo.dataUrl}
                        alt="Selected preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        aria-label="Remove image"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-[#8B2635] text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Submit Upload Button */}
            <button
              type="submit"
              disabled={selectedPhotos.length === 0 || isUploading}
              className="w-full py-3 px-4 rounded-xl bg-[#8B2635] hover:bg-[#721F2B] active:bg-[#5C1822] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{uploadProgressText || 'Uploading photos...'}</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>
                    Upload {selectedPhotos.length > 0 ? `${selectedPhotos.length} ` : ''}Photo
                    {selectedPhotos.length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C7A6D] dark:text-[#9A8A7D] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Direct upload to the wedding album. No login or authorization needed.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
