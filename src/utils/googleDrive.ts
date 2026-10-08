/**
 * Converts various Google Drive sharing links into direct embeddable preview image URLs
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Match /file/d/{id}/
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Match ?id={id}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  // Match /open?id={id} or /uc?id={id}
  const openMatch = trimmed.match(/\/(open|uc)\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch && openMatch[2]) return openMatch[2];

  // Match /thumbnail?id={id}
  const thumbMatch = trimmed.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
  if (thumbMatch && thumbMatch[1]) return thumbMatch[1];

  // Match raw ID if user pasted just the ID directly
  if (/^[a-zA-Z0-9_-]{25,55}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function formatGoogleDriveImageUrl(url: string, fallbackUrl?: string): string {
  if (!url) return fallbackUrl || '';
  const trimmed = url.trim();

  // If it's a raw Drive ID or contains drive.google.com
  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    // High-resolution thumbnail preview via Google's CDN
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`;
  }

  // If it's already a direct image (data url, blob, or other url)
  return trimmed;
}

export function formatGoogleDriveAudioUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const fileId = extractGoogleDriveId(trimmed);
  if (fileId) {
    return `https://docs.google.com/uc?export=download&id=${fileId}`;
  }
  return trimmed;
}
