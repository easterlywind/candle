import { Readable } from 'node:stream';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// @ts-expect-error - import js handler in dev config
import { handleTelegramPush } from './api/telegram.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'telegram-dev-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/telegram' && req.method === 'POST') {
              try {
                const fullUrl = `http://${req.headers.host || 'localhost'}${req.url}`;
                const webReq = new Request(fullUrl, {
                  method: req.method,
                  headers: req.headers as unknown as RequestInit['headers'],
                  body: Readable.toWeb(req) as unknown as RequestInit['body'],
                  duplex: 'half',
                });

                const result = await handleTelegramPush(webReq, env);
                res.writeHead(result.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.body));
              } catch (err: unknown) {
                const errorMsg = err instanceof Error ? err.message : 'Unknown dev server error';
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: errorMsg }));
              }
              return;
            }
            next();
          });
        },
      },
    ],
  };
});
