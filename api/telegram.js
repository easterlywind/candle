// Trình xử lý gửi tin nhắn đơn hàng qua Telegram Bot API (Web Standard Request)
export async function handleTelegramPush(webReq, customEnv = {}) {
  const BOT_TOKEN =
    customEnv.TELEGRAM_BOT_TOKEN ||
    process.env.TELEGRAM_BOT_TOKEN ||
    customEnv.VITE_TELEGRAM_BOT_TOKEN ||
    process.env.VITE_TELEGRAM_BOT_TOKEN ||
    '';

  const CHAT_ID =
    customEnv.TELEGRAM_CHAT_ID ||
    process.env.TELEGRAM_CHAT_ID ||
    customEnv.VITE_TELEGRAM_CHAT_ID ||
    process.env.VITE_TELEGRAM_CHAT_ID ||
    '';

  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('[Telegram API] Chưa cấu hình BOT_TOKEN hoặc CHAT_ID. Chạy chế độ mô phỏng.');
    return {
      status: 200,
      body: {
        success: true,
        simulated: true,
        message: 'Chế độ mô phỏng (chưa cấu hình TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID)',
      },
    };
  }

  let message = '';
  let photoFile = null;

  const contentType = webReq.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await webReq.formData();
    message = (formData.get('message') || '').toString();
    const photo = formData.get('photo');
    if (photo && typeof photo === 'object' && 'arrayBuffer' in photo && photo.size > 0) {
      photoFile = photo;
    }
  } else {
    const json = await webReq.json();
    message = json.message || '';
  }

  if (!message && !photoFile) {
    return {
      status: 400,
      body: { success: false, error: 'Thiếu nội dung tin nhắn (message)' },
    };
  }

  try {
    if (photoFile) {
      const tgFormData = new FormData();
      tgFormData.append('chat_id', CHAT_ID);
      tgFormData.append('caption', message);
      tgFormData.append('photo', photoFile, photoFile.name || 'order-photo.jpg');

      const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: tgFormData,
      });

      if (!tgRes.ok) {
        const errorText = await tgRes.text();
        throw new Error(`Telegram sendPhoto failed (${tgRes.status}): ${errorText}`);
      }

      const resData = await tgRes.json();
      return { status: 200, body: { success: true, simulated: false, data: resData } };
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!tgRes.ok) {
      const errorText = await tgRes.text();
      throw new Error(`Telegram sendMessage failed (${tgRes.status}): ${errorText}`);
    }

    const resData = await tgRes.json();
    return { status: 200, body: { success: true, simulated: false, data: resData } };
  } catch (err) {
    console.error('[Telegram API] Lỗi gửi thông báo:', err.message);
    return {
      status: 502,
      body: { success: false, error: err.message },
    };
  }
}

// Hỗ trợ Vercel Serverless Function mặc định nếu deploy lên Vercel
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { Readable } = await import('node:stream');
    const fullUrl = `http://${req.headers.host || 'localhost'}${req.url}`;
    const webReq = new Request(fullUrl, {
      method: req.method,
      headers: req.headers,
      body: Readable.toWeb(req),
      duplex: 'half',
    });

    const result = await handleTelegramPush(webReq);
    return res.status(result.status).json(result.body);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
