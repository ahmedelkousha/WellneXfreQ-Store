import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();

// Firebase setup for server-side injection
const firebaseConfig = {
  apiKey: process.env.PPV_FIREBASE_API_KEY,
  authDomain: process.env.PPV_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PPV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PPV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PPV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PPV_FIREBASE_APP_ID,
  measurementId: process.env.PPV_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTrackingScripts() {
  try {
    const q = query(collection(db, "tracking_tools"), where("enabled", "==", true));
    const querySnapshot = await getDocs(q);
    const tools = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let headScripts = '';
    let bodyScripts = '';

    tools.forEach(tool => {
      const generateTag = (content, subId) => {
        if (!content) return '';
        if (content.startsWith('http')) {
          return `<script id="tracking-${tool.id}-${subId}" src="${content}" async></script>\n`;
        }
        if (content.includes('<script')) {
          return content + '\n';
        }
        return `<script id="tracking-${tool.id}-${subId}" async>${content}</script>\n`;
      };

      const mainTag = generateTag(tool.content, 'main');
      const noscriptTag = tool.noscriptContent ? `\n${tool.noscriptContent}\n` : '';

      if (tool.placement === 'head') headScripts += mainTag;
      else if (tool.placement === 'body_start') bodyScripts = mainTag + bodyScripts;
      else bodyScripts += mainTag;

      if (tool.noscriptPlacement === 'head') headScripts += noscriptTag;
      else if (tool.noscriptPlacement === 'body_start') bodyScripts = noscriptTag + bodyScripts;
      else bodyScripts += noscriptTag;
    });

    return { headScripts, bodyScripts };
  } catch (error) {
    console.error("[SSI] Failed to fetch scripts:", error);
    return { headScripts: '', bodyScripts: '' };
  }
}

const server = express();

async function configureServer() {
  const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const port = process.env.PORT || 5173;

  let vite;
  if (!isProd) {
    // Dynamic import for Vite to avoid it in production
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    server.use(vite.middlewares);
  } else {
    // In production, serve built assets
    const distPath = path.resolve(root, 'dist');
    server.use(express.static(distPath, { index: false }));
  }

  server.use(async (req, res, next) => {
    const url = req.originalUrl;

    if (url.includes('.') && !url.endsWith('.html')) {
      return next();
    }

    try {
      let template;
      const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

      if (!isProd) {
        template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        const prodPaths = [
          path.resolve(root, 'dist', 'index.html'),
          path.resolve(__dirname, 'dist', 'index.html'),
          path.join(root, 'index.html'),
          '/var/task/dist/index.html' // Vercel specific common path
        ];
        
        console.log(`[SSI] Looking for index.html. Root: ${root}, __dirname: ${__dirname}`);
        
        for (const p of prodPaths) {
          if (fs.existsSync(p)) {
            console.log(`[SSI] Found template at: ${p}`);
            template = fs.readFileSync(p, 'utf-8');
            break;
          }
        }
        
        if (!template) {
          console.error("[SSI] ERROR: index.html not found in any of:", prodPaths);
          throw new Error("Could not find index.html in production.");
        }
      }

      const { headScripts, bodyScripts } = await getTrackingScripts();

      let html = template
        .replace('</head>', `${headScripts}</head>`)
        .replace(/<body\b[^>]*>/i, (match) => `${match}${bodyScripts}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProd && vite) vite.ssrFixStacktrace(e);
      console.error("[SSI] Request error:", e.message);
      next(e);
    }
  });

  if (!process.env.VERCEL) {
    server.listen(port, () => {
      console.log(`[SSI Server] (${isProd ? 'Production' : 'Development'}) Running at http://localhost:${port}`);
    });
  }
}

configureServer();

export default server;
