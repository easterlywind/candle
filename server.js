import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync, createReadStream } from 'node:fs';
import { join, extname } from 'node:path';
import { Readable } from 'node:stream';
import { handleTelegramPush } from './api/telegram.js';

// Tự động nạp file .env nếu có (không cần cài thêm dotenv)
const loadEnvFile = (filePath = '.env') => {
  if (!existsSync(filePath)) return;
  try {
    const content = readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch (err) {
    console.warn('[Env] Không thể đọc file .env:', err.message);
  }
};

loadEnvFile();

const PORT = Number(process.env.PORT) || 8080;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID || '';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

// Khởi tạo máy chủ HTTP
const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  // 1. Health check
  if (url.pathname === '/health' || url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ok',
        telegramConfigured: Boolean(BOT_TOKEN && CHAT_ID),
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // 2. Telegram API
  if (url.pathname === '/api/telegram' && req.method === 'POST') {
    try {
      const webReq = new Request(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: Readable.toWeb(req),
        duplex: 'half',
      });

      const result = await handleTelegramPush(webReq);
      res.writeHead(result.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.body));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // 3. Phục vụ Static Files từ thư mục dist/
  const distDir = join(process.cwd(), 'dist');
  let filePath = join(distDir, url.pathname);

  let serveSpaFallback = false;

  if (existsSync(filePath)) {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      filePath = join(filePath, 'index.html');
      if (!existsSync(filePath)) {
        serveSpaFallback = true;
      }
    }
  } else {
    serveSpaFallback = true;
  }

  if (serveSpaFallback) {
    filePath = join(distDir, 'index.html');
  }

  if (!existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found. Hãy chạy npm run build trước khi khởi động server.');
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🕯️ L'Atelier Server đang chạy tại http://0.0.0.0:${PORT}`);
  console.log(`Telegram Bot Status: ${BOT_TOKEN && CHAT_ID ? '✅ Đã cấu hình' : '⚠️ Chế độ mô phỏng (chưa cấu hình Token)'}`);
});
