import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from './googleAuth';
import firebaseConfig from '../../firebase-applet-config.json';
import { initializeApp, getApps, getApp } from 'firebase/app';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const CONFIG_STORAGE_KEY = 'wedding_drive_apps_script_url';

export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx3-WXw6PwcDwq6as4IlBjY5av4LLnWdMtkM-SgcePdKBdo6X7DJMB4hVRnZ2QgM9ey/exec';

let inMemoryWebhookUrl: string =
  (typeof window !== 'undefined' && localStorage.getItem(CONFIG_STORAGE_KEY)) ||
  (import.meta as any).env?.VITE_DRIVE_APPS_SCRIPT_URL ||
  DEFAULT_APPS_SCRIPT_URL;

/**
 * Retrieves the shared Google Drive Webhook URL.
 * Defaults to the host's active Google Apps Script Web App endpoint,
 * allowing every guest on any device (phone, laptop, tablet) to upload
 * photos directly into Google Drive folder 1g5ZhgN7xTZjscf33oPsMINOBk6BaSMsP.
 */
export async function getSharedDriveWebhookUrl(): Promise<string> {
  if (inMemoryWebhookUrl && inMemoryWebhookUrl.startsWith('https://script.google.com/')) {
    return inMemoryWebhookUrl;
  }

  // Check localStorage first
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (local && local.startsWith('https://script.google.com/')) {
      inMemoryWebhookUrl = local;
      return inMemoryWebhookUrl;
    }
  }

  // Fetch shared config from Firestore if available
  try {
    const docRef = doc(db, 'settings', 'drive');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data?.webhookUrl && typeof data.webhookUrl === 'string') {
        inMemoryWebhookUrl = data.webhookUrl.trim();
        if (typeof window !== 'undefined') {
          localStorage.setItem(CONFIG_STORAGE_KEY, inMemoryWebhookUrl);
        }
        return inMemoryWebhookUrl;
      }
    }
  } catch (err) {
    console.warn('Could not retrieve shared Drive Webhook from Firestore:', err);
  }

  // Fallback to active deployed Web App endpoint
  inMemoryWebhookUrl = DEFAULT_APPS_SCRIPT_URL;
  return inMemoryWebhookUrl;
}

/**
 * Persists the Google Drive Webhook URL to Firestore and localStorage
 * so that all wedding guests immediately receive the provision to upload.
 */
export async function saveSharedDriveWebhookUrl(url: string): Promise<boolean> {
  const cleanUrl = url.trim() || DEFAULT_APPS_SCRIPT_URL;
  inMemoryWebhookUrl = cleanUrl;

  if (typeof window !== 'undefined') {
    localStorage.setItem(CONFIG_STORAGE_KEY, cleanUrl);
  }

  try {
    const docRef = doc(db, 'settings', 'drive');
    await setDoc(
      docRef,
      {
        webhookUrl: cleanUrl,
        folderId: '1g5ZhgN7xTZjscf33oPsMINOBk6BaSMsP',
        updatedAt: Date.now(),
        updatedBy: auth.currentUser?.email || 'sreehari9011@gmail.com',
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    console.warn('Failed to save Drive Webhook to Firestore:', err);
    return false;
  }
}
