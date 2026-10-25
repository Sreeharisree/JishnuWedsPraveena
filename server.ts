import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx3-WXw6PwcDwq6as4IlBjY5av4LLnWdMtkM-SgcePdKBdo6X7DJMB4hVRnZ2QgM9ey/exec';

// Server-side proxy for Google Drive upload
// Bypasses browser iframe CORS and cross-origin redirect restrictions
app.post('/api/upload-drive', async (req, res) => {
  try {
    const { folderId, fileName, mimeType, base64, uploader, uploaderEmail, caption } = req.body;

    if (!base64 || !fileName) {
      return res.status(400).json({ error: 'Missing required file data' });
    }

    const appsScriptUrl = process.env.VITE_DRIVE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;

    const payload = JSON.stringify({
      folderId: folderId || '1g5ZhgN7xTZjscf33oPsMINOBk6BaSMsP',
      fileName,
      mimeType: mimeType || 'image/jpeg',
      base64,
      uploader: uploader || 'Wedding Guest',
      uploaderEmail: uploaderEmail || '',
      caption: caption || '',
    });

    const googleRes = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payload,
    });

    const text = await googleRes.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: googleRes.ok ? 'success' : 'error', raw: text };
    }

    if (googleRes.ok && data.status !== 'error') {
      return res.json({
        status: 'success',
        id: data.id || `uploaded-${Date.now()}`,
        url: data.url || '',
        name: fileName,
      });
    } else {
      console.warn('Apps script returned error:', text);
      return res.status(googleRes.status || 500).json({
        error: data.message || data.error || 'Failed to upload to Google Drive',
      });
    }
  } catch (err: any) {
    console.error('Error in /api/upload-drive:', err);
    return res.status(500).json({ error: err.message || 'Internal upload error' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.resolve(__dirname, 'index.html'))
      ? __dirname
      : path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer();
