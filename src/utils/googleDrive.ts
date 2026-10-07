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

  return null;
}

export function formatGoogleDriveImageUrl(url: string, fallbackUrl?: string): string {
  if (!url) return fallbackUrl || '';
  const trimmed = url.trim();
  
  // If it's already a direct image (data url, blob, or non-drive url)
  if (!trimmed.includes('drive.google.com')) {
    return trimmed;
  }

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    // High-resolution thumbnail preview via Google's CDN
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`;
  }

  return trimmed;
}
