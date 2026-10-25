import { CURATED_SELECTED_WISHES, SelectedWish } from '../data/selectedWishes';

const STORAGE_KEY = 'wedding_guestbook_blessings';
const EVENT_NAME = 'wedding_blessing_updated';

// Immediate purge of any unwanted test blessings (such as from 'Manu') from localStorage on startup
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((item: any) => {
          const name = String(item.name || '').toLowerCase().trim();
          const msg = String(item.message || item.blessing || '').toLowerCase().trim();
          const rel = String(item.relation || '').toLowerCase().trim();
          return !name.includes('manu') && !msg.includes('manu') && !rel.includes('manu');
        });
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
        }
      }
    }
  } catch {
    // Ignore storage parse errors
  }
}

/**
 * Loads all blessings, combining stored local blessings with curated initial wishes
 */
export function getAllBlessings(): SelectedWish[] {
  let stored: SelectedWish[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((item: any) => {
          const name = String(item.name || '').toLowerCase().trim();
          const msg = String(item.message || item.blessing || '').toLowerCase().trim();
          const rel = String(item.relation || '').toLowerCase().trim();
          return !name.includes('manu') && !msg.includes('manu') && !rel.includes('manu');
        });

        if (filtered.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }

        stored = filtered.map((item: any, idx: number) => ({
          id: item.id || `local-${idx}-${item.timestamp || Date.now()}`,
          name: item.name || 'Well-wisher',
          relation: item.relation || 'Cherished Guest',
          message: item.message || item.blessing || '',
          date: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent',
          highlight: true,
        })).filter(b => b.message.trim().length > 0);
      }
    }
  } catch {
    // Ignore storage parse errors
  }

  // Stored user blessings appear first, followed by curated selected wishes
  return [...stored, ...CURATED_SELECTED_WISHES];
}

/**
 * Adds a new blessing to storage and triggers an update event
 */
export function saveBlessing(data: {
  name: string;
  relation?: string;
  message: string;
  attending?: string;
}): SelectedWish {
  const newBlessing: SelectedWish = {
    id: `blessing-${Date.now()}`,
    name: data.name.trim(),
    relation: data.relation?.trim() || 'Well-wisher',
    message: data.message.trim(),
    date: 'Just now',
    highlight: true,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift({
      ...newBlessing,
      timestamp: new Date().toISOString(),
      attending: data.attending || 'Well-wisher',
      recipient: 'jweddsp@gmail.com',
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage quotas
  }

  // Dispatch custom event for in-page reactivity
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newBlessing }));
  }

  return newBlessing;
}

/**
 * Subscribe to blessing updates
 */
export function subscribeToBlessings(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => callback();
  window.addEventListener(EVENT_NAME, handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener(EVENT_NAME, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}
