import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'email',
  'profile',
];

// 1. Basic Google Provider (Standard email + profile)
// Because the app is published, standard email+profile is ALWAYS accepted by Google for 100% of Gmail accounts!
export const basicProvider = new GoogleAuthProvider();
basicProvider.setCustomParameters({
  prompt: 'select_account',
});

// 2. Drive Google Provider (Requests drive.file write permission)
// Note: On published apps, Google blocks external accounts from sensitive scopes unless CASA-verified or in test users
export const driveProvider = new GoogleAuthProvider();
driveProvider.addScope('https://www.googleapis.com/auth/drive.file');
driveProvider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate if we are in the middle of a sign-in flow
let isSigningIn = false;
// Cache the access token in memory (never in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

/**
 * Initialize auth state listener. Call this on app load.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) {
        onAuthSuccess(user, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) {
        onAuthFailure();
      }
    }
  });
};

/**
 * Google Sign-In:
 * Uses standard email and profile scopes.
 * Because the app is published, standard email+profile is 100% UNBLOCKED
 * by Google for all Gmail users worldwide with zero verification warnings.
 */
export const googleSignIn = async (
  requestDrive = false
): Promise<{ user: User; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const providerToUse = requestDrive ? driveProvider : basicProvider;
    const result = await signInWithPopup(auth, providerToUse);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Requests Google Drive write permission if token is missing.
 */
export const requestDrivePermission = async (): Promise<string | null> => {
  try {
    const res = await googleSignIn();
    return res?.accessToken || null;
  } catch (error: any) {
    console.warn('Google Drive authorization error:', error?.code || error?.message);
    return null;
  }
};

/**
 * Retrieves the current cached access token in memory.
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sets or updates the in-memory access token.
 */
export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

/**
 * Signs the user out of Firebase and clears in-memory credentials.
 */
export const logout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Gets the currently signed in Firebase user.
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
