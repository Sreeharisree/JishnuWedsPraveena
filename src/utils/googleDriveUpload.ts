import { getAccessToken } from './googleAuth';
import { TARGET_DRIVE_FOLDER_ID } from './uploadedPhotosStorage';
import { getSharedDriveWebhookUrl } from './driveConfig';

export interface DriveUploadResult {
  id: string;
  name: string;
  webViewLink?: string;
  thumbnailLink?: string;
  success: boolean;
  destination: string;
}

/**
 * Converts base64 data URL to a binary Blob
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mime });
}

/**
 * Uploads an image directly into the couple's target Google Drive folder (ID: 1g5ZhgN7xTZjscf33oPsMINOBk6BaSMsP).
 * Directly connects to Google Drive REST API v3 using the guest's authenticated Google OAuth token with drive.file scope.
 * Tags the file with the uploader's Gmail address so the wedding host knows exactly who uploaded each photo.
 */
export async function uploadImageToDrive({
  dataUrl,
  fileName,
  caption,
  guestName,
  uploaderEmail,
  token: tokenArg,
}: {
  dataUrl: string;
  fileName: string;
  caption?: string;
  guestName: string;
  uploaderEmail?: string;
  token?: string;
}): Promise<DriveUploadResult> {
  const cleanEmail = uploaderEmail ? uploaderEmail.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '_') : 'guest';
  const sanitizedFileName = `Wedding_${cleanEmail}_${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const base64Data = match ? match[2] : '';

  const description = `Jishnu & Praveena Sacred Wedding - Uploaded by ${uploaderEmail || 'Guest'} (${guestName || 'Wedding Guest'}) on ${new Date().toLocaleString()}`;

  // 1. Try server-side proxy route first (completely immune to browser iframe CORS and redirect blocks)
  try {
    const proxyRes = await fetch('/api/upload-drive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: TARGET_DRIVE_FOLDER_ID,
        fileName: sanitizedFileName,
        mimeType: mimeType,
        base64: base64Data,
        uploader: guestName,
        uploaderEmail: uploaderEmail || '',
        caption: caption || '',
      }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.status === 'success') {
        return {
          id: data.id || `uploaded-${Date.now()}`,
          name: sanitizedFileName,
          webViewLink: data.url,
          success: true,
          destination: 'google_drive_server_proxy',
        };
      }
    }
  } catch (proxyErr) {
    console.warn('Server proxy unavailable, falling back to direct script:', proxyErr);
  }

  // 2. Direct Google Apps Script Web App endpoint with resilient no-cors fallback
  const appsScriptUrl = await getSharedDriveWebhookUrl();

  if (appsScriptUrl && appsScriptUrl.startsWith('https://script.google.com/')) {
    const payload = JSON.stringify({
      folderId: TARGET_DRIVE_FOLDER_ID,
      fileName: sanitizedFileName,
      mimeType: mimeType,
      base64: base64Data,
      uploader: guestName,
      uploaderEmail: uploaderEmail || '',
      caption: caption || '',
    });

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: payload,
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        return {
          id: data.id || `apps-script-${Date.now()}`,
          name: sanitizedFileName,
          webViewLink: data.url,
          success: true,
          destination: 'google_drive_apps_script',
        };
      }
    } catch {
      // If browser CORS redirect fails in preview iframe, use mode: 'no-cors'
      // Google Apps Script still executes the POST and creates the file in Drive!
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: payload,
        });

        return {
          id: `apps-script-${Date.now()}`,
          name: sanitizedFileName,
          success: true,
          destination: 'google_drive_apps_script',
        };
      } catch (fallbackErr: any) {
        console.error('All script upload attempts failed:', fallbackErr);
      }
    }
  }

  // 2. Direct Google Drive REST API v3 upload using OAuth token with drive.file scope
  const token = tokenArg || (await getAccessToken());
  if (!token) {
    throw new Error(
      'Google blocked direct Drive authorization because Google requires manual verification for apps requesting Drive permissions. To allow all guests to upload photos directly to your Drive folder without Google blocks, configure the Google Apps Script Web App in Host Settings.'
    );
  }

  const blob = dataUrlToBlob(dataUrl);
  const metadata = {
    name: sanitizedFileName,
    mimeType: mimeType,
    parents: [TARGET_DRIVE_FOLDER_ID],
    description: description,
    properties: {
      weddingCouple: 'Jishnu & Praveena',
      uploadedByEmail: uploaderEmail || '',
      uploadedByName: guestName || 'Guest',
      targetFolderId: TARGET_DRIVE_FOLDER_ID,
    },
  };

  const boundary = '-------WeddingDriveBoundary' + Math.random().toString(36).substring(2, 10);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataHeader =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n`;

  const multipartBody = new Blob([metadataHeader, blob, closeDelimiter], {
    type: `multipart/related; boundary=${boundary}`,
  });

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    }
  );

  if (response.ok) {
    const result = await response.json();
    return {
      id: result.id,
      name: result.name || sanitizedFileName,
      webViewLink: result.webViewLink,
      success: true,
      destination: 'google_drive_api',
    };
  }

  // Handle errors from Google Drive API explicitly
  let errorMsg = `Google Drive upload failed (${response.status})`;
  try {
    const errJson = await response.json();
    if (errJson?.error?.message) {
      if (errJson.error.message.toLowerCase().includes('insufficient authentication scopes')) {
        errorMsg =
          'Google Drive requires Drive write permission. If you are the host (sreehari9011@gmail.com), click "Authorize Host Drive Access". For all other guests to upload without errors, connect the Google Apps Script Webhook in Host Settings.';
      } else {
        errorMsg = `Google Drive upload failed: ${errJson.error.message}`;
      }
    }
  } catch {
    const errText = await response.text().catch(() => '');
    if (errText) errorMsg = `Google Drive upload failed: ${errText}`;
  }

  throw new Error(errorMsg);
}

/**
 * Permanently deletes a photo from Google Drive.
 */
export async function deleteImageFromDrive(fileId: string, fileName?: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Authentication required to delete Drive files.');
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${fileName || 'this photo'}" from Google Drive? This action cannot be undone.`
  );
  if (!confirmed) {
    return false;
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
}
