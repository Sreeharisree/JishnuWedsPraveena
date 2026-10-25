export interface UploadedPhoto {
  id: string;
  url: string; // base64 or blob URL
  caption: string;
  guestName: string;
  timestamp: number;
  uploadedByEmail?: string;
  uploadedByPhoto?: string;
  googleDriveFileId?: string;
  googleDriveLink?: string;
}

const STORAGE_KEY = 'wedding_guest_uploaded_photos';
const HOST_FOLDER_KEY = 'wedding_host_drive_folder_url';

export const TARGET_DRIVE_FOLDER_ID = '1g5ZhgN7xTZjscf33oPsMINOBk6BaSMsP';
export const DEFAULT_HOST_FOLDER = `https://drive.google.com/drive/folders/${TARGET_DRIVE_FOLDER_ID}?usp=sharing`;

export function getHostSharedFolderLink(): string {
  try {
    return localStorage.getItem(HOST_FOLDER_KEY) || DEFAULT_HOST_FOLDER;
  } catch {
    return DEFAULT_HOST_FOLDER;
  }
}

export function setHostSharedFolderLink(url: string): void {
  try {
    localStorage.setItem(HOST_FOLDER_KEY, url.trim());
  } catch (e) {
    console.error('Failed to set host folder link', e);
  }
}

/**
 * In-memory cache for ultra-fast synchronous UI rendering
 */
let inMemoryPhotos: UploadedPhoto[] = [];

// Initialize memory from localStorage on load
try {
  const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (raw) {
    inMemoryPhotos = JSON.parse(raw);
  }
} catch {
  inMemoryPhotos = [];
}

/**
 * Simple IndexedDB setup for persistent large image storage
 */
const DB_NAME = 'wedding_photos_db';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

function openPhotoDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// Hydrate from IndexedDB on startup
if (typeof window !== 'undefined') {
  openPhotoDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          // Merge with any in-memory photos
          const map = new Map<string, UploadedPhoto>();
          req.result.forEach((p: UploadedPhoto) => map.set(p.id, p));
          inMemoryPhotos.forEach((p) => map.set(p.id, p));
          inMemoryPhotos = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
          window.dispatchEvent(new CustomEvent('guest-photos-updated'));
        }
      };
    } catch (e) {
      console.warn('Could not read from IndexedDB', e);
    }
  });
}

export function getStoredGuestPhotos(): UploadedPhoto[] {
  return inMemoryPhotos;
}

export async function saveGuestPhotoAsync(
  photo: Omit<UploadedPhoto, 'id' | 'timestamp'>
): Promise<UploadedPhoto> {
  const newPhoto: UploadedPhoto = {
    ...photo,
    id: `guest-upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
  };

  inMemoryPhotos = [newPhoto, ...inMemoryPhotos];

  // Try saving to IndexedDB (best for images)
  try {
    const db = await openPhotoDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(newPhoto);
    }
  } catch (err) {
    console.warn('IndexedDB write failed', err);
  }

  // Also try saving metadata / smaller list to localStorage as backup
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPhotos.slice(0, 30)));
  } catch {
    // Quota exceeded in localStorage, which is why IndexedDB is primary
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('guest-photos-updated', { detail: newPhoto }));
  }

  return newPhoto;
}

export function saveGuestPhoto(photo: Omit<UploadedPhoto, 'id' | 'timestamp'>): UploadedPhoto {
  const newPhoto: UploadedPhoto = {
    ...photo,
    id: `guest-upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
  };

  inMemoryPhotos = [newPhoto, ...inMemoryPhotos];

  openPhotoDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(newPhoto);
    } catch {}
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPhotos.slice(0, 30)));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('guest-photos-updated', { detail: newPhoto }));
  }

  return newPhoto;
}

export function deleteStoredGuestPhoto(id: string): void {
  inMemoryPhotos = inMemoryPhotos.filter((p) => p.id !== id);

  openPhotoDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
    } catch {}
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPhotos.slice(0, 30)));
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('guest-photos-updated'));
  }
}

export function clearStoredGuestPhotos(): void {
  inMemoryPhotos = [];

  openPhotoDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {}
  });

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('guest-photos-updated'));
  }
}

/**
 * Optimizes an image File to a lightweight base64 data URL
 * Scales down large camera pictures (e.g. 12-48MP down to max 1600px width/height)
 * This avoids memory issues and allows instantaneous uploads
 */
export function optimizeImageFile(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for optimal compression ratio
        const optimized = canvas.toDataURL('image/jpeg', quality);
        resolve(optimized);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
