import { formatVND } from '../data/candleData';
import type { CartItem, CustomerOrderInfo, CustomPhotoOrder } from '../types/candle';

export const STORE_CONFIG = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? '',
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID ?? '',
  shopTelegramUsername: import.meta.env.VITE_TELEGRAM_SHOP_USERNAME ?? 'latelier_candle_bot',
  hotline: '0988.888.888',
  bank: {
    bankId: 'MB',
    accountNo: '0988888888',
    accountName: 'L ATELIER CANDLE STUDIO',
  },
};

export const generateOrderCode = (prefix = 'LAT'): string => {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${timestamp}${random}`;
};

export const generateVietQRUrl = (amount: number, orderCode: string): string => {
  const { bankId, accountNo, accountName } = STORE_CONFIG.bank;
  const memo = encodeURIComponent(`Thanh toan don ${orderCode}`);
  const holder = encodeURIComponent(accountName);
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${memo}&accountName=${holder}`;
};

export const generateTelegramDirectUrl = (
  message: string,
  username = STORE_CONFIG.shopTelegramUsername
): string => {
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
};

export const formatCustomPhotoMessage = (order: CustomPhotoOrder, orderCode: string): string => {
  return [
    `🕯️ [ĐƠN ĐẶT NẾN THEO MẪU ẢNH RIÊNG]`,
    `Mã đơn: #${orderCode}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 Khách hàng: ${order.name}`,
    `📞 SĐT / Zalo: ${order.phone}`,
    `📦 Số lượng dự kiến: ${order.qty} cái`,
    `📅 Ngày cần hàng: ${order.neededDate || 'Không gấp'}`,
    `📝 Yêu cầu chi tiết:`,
    `${order.note}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Tự động gửi từ Website L'Atelier Studio`,
  ].join('\n');
};

export const formatStandardOrderMessage = (
  items: CartItem[],
  customer: CustomerOrderInfo,
  orderCode: string,
  totalAmount: number
): string => {
  const itemLines = items.map((item, idx) => {
    const lines = [
      `${idx + 1}. ${item.title} (x${item.qty}) — ${formatVND(item.total)}`,
      `   • Quy cách: ${item.specs}`,
    ];
    if (item.note) {
      lines.push(`   • Ghi chú riêng: ${item.note}`);
    }
    return lines.join('\n');
  }).join('\n\n');

  return [
    `🕯️ [ĐƠN ĐẶT HÀNG MỚI - L'ATELIER STUDIO]`,
    `Mã đơn: #${orderCode}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 Khách hàng: ${customer.name}`,
    `📞 Số điện thoại / Zalo: ${customer.phone}`,
    `📍 Địa chỉ giao hàng: ${customer.address}`,
    customer.note ? `💬 Lời nhắn của khách: ${customer.note}` : '',
    `💳 Thanh toán: ${customer.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'Thanh toán COD khi nhận'}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `DANH SÁCH SẢN PHẨM:`,
    itemLines,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💰 TỔNG CỘNG: ${formatVND(totalAmount)}`,
    `Thời gian đặt: ${new Date().toLocaleString('vi-VN')}`,
  ].filter(Boolean).join('\n');
};

export interface PushResult {
  success: boolean;
  simulated: boolean;
  error?: string;
}

export const pushToTelegramBot = async (
  message: string,
  photoFile?: File | null
): Promise<PushResult> => {
  const { botToken, chatId } = STORE_CONFIG;

  if (!botToken || !chatId) {
    // Mode mô phỏng khi chưa điền token production
    const { promise, resolve } = Promise.withResolvers<void>();
    setTimeout(resolve, 800);
    await promise;
    return { success: true, simulated: true };
  }
  try {
    if (photoFile) {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', photoFile);
      formData.append('caption', message);

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Telegram Photo API status: ${res.status}`);
      }
      return { success: true, simulated: false };
    }

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!res.ok) {
      throw new Error(`Telegram Message API status: ${res.status}`);
    }
    return { success: true, simulated: false };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown Telegram API error';
    return { success: false, simulated: false, error: errorMsg };
  }
};
