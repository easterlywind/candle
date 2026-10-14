import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { CustomPhotoOrder } from '../types/candle';
import {
  generateOrderCode,
  formatCustomPhotoMessage,
  pushToTelegramBot,
  generateTelegramDirectUrl,
} from '../services/telegramService';

interface CustomPhotoSectionProps {
  order: CustomPhotoOrder;
  onChange: React.Dispatch<React.SetStateAction<CustomPhotoOrder>>;
  onBackToCategory?: () => void;
}

export const CustomPhotoSection: React.FC<CustomPhotoSectionProps> = ({
  order,
  onChange,
  onBackToCategory,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    directUrl?: string;
  } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Dung lượng ảnh vượt quá 10MB. Vui lòng chọn ảnh nhẹ hơn.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onChange((prev) => ({
      ...prev,
      imageFile: file,
      imagePreviewUrl: previewUrl,
    }));
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (order.imagePreviewUrl) {
      URL.revokeObjectURL(order.imagePreviewUrl);
    }
    onChange((prev) => ({
      ...prev,
      imageFile: null,
      imagePreviewUrl: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!order.imageFile && !order.imagePreviewUrl) {
      alert('Vui lòng tải lên ảnh mẫu nến bạn muốn xưởng chế tác.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const orderCode = generateOrderCode('PIC');
    const telegramMessage = formatCustomPhotoMessage(order, orderCode);

    try {
      const result = await pushToTelegramBot(telegramMessage, order.imageFile);

      if (result.success) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });

        const directLink = generateTelegramDirectUrl(telegramMessage);

        setStatusMessage({
          type: 'success',
          text: `Đã gửi ảnh mẫu và yêu cầu của bạn (#${orderCode}) thành công! Xưởng sẽ liên hệ SĐT/Zalo ${order.phone} sớm nhất.`,
          directUrl: directLink,
        });

        // Reset form
        onChange({
          name: '',
          phone: '',
          qty: 1,
          neededDate: '',
          note: '',
          imageFile: null,
          imagePreviewUrl: undefined,
        });
      } else {
        throw new Error(result.error || 'Có lỗi khi gửi Telegram');
      }
    } catch {
      const fallbackUrl = generateTelegramDirectUrl(telegramMessage);
      setStatusMessage({
        type: 'error',
        text: 'Chưa kết nối được Telegram Bot API tự động. Bạn có thể nhấn vào nút bên dưới để mở app Telegram gửi trực tiếp cho xưởng!',
        directUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="custom-order" className="py-16 sm:py-24 bg-oat/70 border-t border-stonewarm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-terracotta font-semibold block">
            Custom Design Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium mt-2 text-charcoal">
            Đặt làm theo mẫu riêng của bạn
          </h2>
          <p className="text-xs sm:text-base text-muted mt-3 leading-relaxed">
            Bạn đã có sẵn ý tưởng hoặc hình ảnh mẫu nến yêu thích trên Pinterest, Instagram? Tải ảnh lên và điền thông tin bên dưới — yêu cầu sẽ được đẩy tự động về{' '}
            <strong>Telegram của xưởng</strong> để báo giá ngay.
          </p>
        </div>
        {onBackToCategory && (
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={onBackToCategory}
              className="bg-alabaster text-charcoal px-5 py-2 rounded-full border border-stonewarm text-xs font-semibold hover:bg-oat transition cursor-pointer"
            >
              ← Chọn dòng nến khác (Nến hũ, Tealight, Nến khuôn)
            </button>
          </div>
        )}

        {/* 4-Step Flow Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs">
          <div className="bg-alabaster p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block">Bước 01</span>
            <span className="font-medium text-charcoal">Chọn đặt mẫu riêng</span>
          </div>
          <div className="bg-alabaster p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block">Bước 02</span>
            <span className="font-medium text-charcoal">Tải ảnh mẫu lên</span>
          </div>
          <div className="bg-alabaster p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block">Bước 03</span>
            <span className="font-medium text-charcoal">Điền yêu cầu chi tiết</span>
          </div>
          <div className="bg-alabaster p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block">Bước 04</span>
            <span className="font-medium text-charcoal">Đẩy thẳng về Telegram</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-alabaster rounded-3xl p-6 sm:p-10 border border-stonewarm shadow-sm space-y-6">
          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Ảnh mẫu nến mong muốn <span className="text-terracotta">*</span>
            </label>
            <label
              htmlFor="custom-image-upload"
              className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-stonewarm hover:border-charcoal rounded-2xl p-6 sm:p-8 transition text-center bg-oat/40 relative overflow-hidden"
            >
              {order.imagePreviewUrl ? (
                <div className="mb-3 relative group/preview">
                  <img
                    src={order.imagePreviewUrl}
                    alt="Preview mẫu nến"
                    className="max-h-52 rounded-xl object-contain mx-auto border border-stonewarm shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 text-xs bg-charcoal text-alabaster px-3 py-1 rounded-full hover:bg-terracotta transition"
                  >
                    Xóa &amp; Chọn ảnh khác
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="w-9 h-9 text-muted group-hover:text-charcoal mb-2 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-charcoal">
                    Nhấn để tải ảnh mẫu từ máy tính / điện thoại
                  </span>
                  <span className="text-xs text-muted mt-1">Hỗ trợ JPG, PNG, WEBP (Tối đa 10MB)</span>
                </>
              )}

              <input
                id="custom-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cust-name" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Họ tên của bạn *
              </label>
              <input
                id="cust-name"
                type="text"
                required
                value={order.name}
                onChange={(e) => onChange((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nguyễn Văn A"
                className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>

            <div>
              <label htmlFor="cust-phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Số điện thoại / Zalo *
              </label>
              <input
                id="cust-phone"
                type="tel"
                required
                value={order.phone}
                onChange={(e) => onChange((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="09xx xxx xxx"
                className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cust-qty" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Số lượng dự kiến
              </label>
              <input
                id="cust-qty"
                type="number"
                min={1}
                value={order.qty}
                onChange={(e) => onChange((prev) => ({ ...prev, qty: Math.max(1, parseInt(e.target.value, 10) || 1) }))}
                className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>

            <div>
              <label htmlFor="cust-date" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Ngày cần nhận hàng (Nếu gấp)
              </label>
              <input
                id="cust-date"
                type="date"
                value={order.neededDate}
                onChange={(e) => onChange((prev) => ({ ...prev, neededDate: e.target.value }))}
                className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cust-note" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Mô tả chi tiết yêu cầu (Màu sắc, mùi hương, kích thước, phụ kiện...) *
            </label>
            <textarea
              id="cust-note"
              rows={3}
              required
              value={order.note}
              onChange={(e) => onChange((prev) => ({ ...prev, note: e.target.value }))}
              placeholder="VD: Mình muốn làm mẫu nến giống trong ảnh nhưng đổi sang tông màu trắng kem, mùi gỗ đàn hương, đóng hộp quà tặng..."
              className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-muted leading-relaxed">
              🔒 Thông tin &amp; hình ảnh sẽ được gửi trực tiếp tới Bot Telegram quản lý đơn của xưởng.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-charcoal text-alabaster px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-terracotta disabled:opacity-50 transition cursor-pointer shrink-0 shadow-sm active:scale-95"
            >
              {isSubmitting ? 'Đang đẩy dữ liệu về Telegram...' : 'Gửi mẫu về Telegram ngay'}
            </button>
          </div>

          {/* Status Alert Notification */}
          {statusMessage && (
            <div
              className={`rounded-2xl p-4 sm:p-5 text-sm font-medium space-y-2 border ${
                statusMessage.type === 'success'
                  ? 'bg-sage/15 text-sage border-sage/30'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              <p>{statusMessage.text}</p>
              {statusMessage.directUrl && (
                <div className="pt-1">
                  <a
                    href={statusMessage.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold underline hover:opacity-80"
                  >
                    <span>Mở Telegram trò chuyện ngay với xưởng ↗</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
