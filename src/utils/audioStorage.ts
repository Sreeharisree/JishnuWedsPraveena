// IndexedDB storage utility for large custom wedding audio files

const DB_NAME = 'WeddingAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'audio_files';
const AUDIO_KEY = 'wedding_song';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioToStorage(blobOrDataUrl: Blob | string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(blobOrDataUrl, AUDIO_KEY);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('IndexedDB save failed, falling back to localStorage:', e);
    if (typeof blobOrDataUrl === 'string') {
      try {
        localStorage.setItem(AUDIO_KEY, blobOrDataUrl);
      } catch {}
    }
  }
}

export async function getAudioFromStorage(): Promise<Blob | string | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(AUDIO_KEY);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          // Fallback to localStorage
          const local = localStorage.getItem(AUDIO_KEY);
          resolve(local);
        }
      };
      request.onerror = () => {
        const local = localStorage.getItem(AUDIO_KEY);
        resolve(local);
      };
    });
  } catch (e) {
    const local = localStorage.getItem(AUDIO_KEY);
    return local;
  }
}

export async function removeAudioFromStorage(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(AUDIO_KEY);
    localStorage.removeItem(AUDIO_KEY);
  } catch {
    localStorage.removeItem(AUDIO_KEY);
  }
}
