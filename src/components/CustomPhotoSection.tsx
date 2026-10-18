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
          text: `Tuyệt vời! Yêu cầu đặt mẫu theo ảnh riêng (Mã: ${orderCode}) đã được đẩy trực tiếp về hệ thống Telegram của xưởng L’Atelier. Chúng mình sẽ liên hệ với bạn trong thời gian sớm nhất!`,
          directUrl: directLink,
        });

        // Reset form
        onChange({
          imageFile: null,
          imagePreviewUrl: undefined,
          name: '',
          phone: '',
          note: '',
          qty: 1,
          neededDate: '',
        });
      } else {
        throw new Error(result.error || 'Gửi Telegram thất bại');
      }
    } catch {
      const fallbackUrl = generateTelegramDirectUrl(telegramMessage);
      setStatusMessage({
        type: 'error',
        text: 'Hệ thống tự động đang bận hoặc gặp sự cố kết nối. Bạn hãy nhấn vào nút bên dưới để mở app Telegram gửi ảnh và yêu cầu trực tiếp cho xưởng nhé!',
        directUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb Context & Back Button */}
      {onBackToCategory && (
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={onBackToCategory}
            className="bg-oat text-charcoal px-3 py-1.5 rounded-full border border-stonewarm hover:border-charcoal/40 transition font-semibold flex items-center space-x-1.5 cursor-pointer shadow-2xs hover:bg-white"
          >
            <span>←</span>
            <span>Quay lại chọn dạng nến khác</span>
          </button>
          <span className="text-muted text-[11px] font-medium hidden sm:inline">
            May đo cá nhân hóa theo ảnh Pinterest / Instagram
          </span>
        </div>
      )}

      {/* Main Studio Card */}
      <div className="bg-white/70 rounded-3xl p-6 sm:p-10 border border-stonewarm shadow-sm space-y-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
            Bespoke Custom Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            Đặt làm theo mẫu ảnh riêng
          </h2>
          <p className="text-xs sm:text-base text-muted leading-relaxed">
            Bạn đã có sẵn ý tưởng hoặc hình ảnh mẫu nến yêu thích trên Pinterest / Instagram? Tải ảnh lên và điền thông tin bên dưới — xưởng sẽ nhận trực tiếp trên Telegram và tư vấn báo giá ngay.
          </p>
        </div>

        {/* 4-Step Process Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-alabaster/80 p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block text-[11px]">Bước 01</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Chọn đặt mẫu riêng</span>
          </div>
          <div className="bg-alabaster/80 p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block text-[11px]">Bước 02</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Tải ảnh mẫu lên</span>
          </div>
          <div className="bg-alabaster/80 p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block text-[11px]">Bước 03</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Điền chi tiết may đo</span>
          </div>
          <div className="bg-alabaster/80 p-3.5 rounded-2xl border border-stonewarm shadow-2xs">
            <span className="text-terracotta font-bold block text-[11px]">Bước 04</span>
            <span className="font-semibold text-charcoal mt-0.5 block">Nhận báo giá Telegram</span>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Ảnh mẫu nến bạn muốn xưởng chế tác <span className="text-terracotta">*</span>
            </label>
            <label
              htmlFor="custom-image-upload"
              className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-stonewarm hover:border-charcoal rounded-2xl p-6 sm:p-10 transition text-center bg-oat/40 relative overflow-hidden"
            >
              {order.imagePreviewUrl ? (
                <div className="relative group/preview flex flex-col items-center">
                  <img
                    src={order.imagePreviewUrl}
                    alt="Preview mẫu nến"
                    className="max-h-60 rounded-xl object-contain mx-auto border border-stonewarm shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-3 text-xs bg-charcoal text-alabaster px-4 py-1.5 rounded-full hover:bg-terracotta transition cursor-pointer font-medium"
                  >
                    ✕ Xóa &amp; Chọn ảnh khác
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-muted group-hover:text-charcoal mb-2.5 transition"
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
                  <span className="text-sm font-semibold text-charcoal">
                    Nhấn vào đây để tải ảnh mẫu nến từ máy tính / điện thoại
                  </span>
                  <span className="text-xs text-muted mt-1">
                    Hỗ trợ định dạng JPG, PNG, WEBP (Dung lượng tối đa 10MB)
                  </span>
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

          {/* Customer Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="cust-name" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Họ tên của bạn <span className="text-terracotta">*</span>
              </label>
              <input
                id="cust-name"
                type="text"
                required
                value={order.name}
                onChange={(e) => onChange((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="VD: Nguyễn Hoài An"
                className="w-full bg-white border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition"
              />
            </div>

            <div>
              <label htmlFor="cust-phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Số điện thoại / Zalo <span className="text-terracotta">*</span>
              </label>
              <input
                id="cust-phone"
                type="tel"
                required
                value={order.phone}
                onChange={(e) => onChange((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="09xx xxx xxx"
                className="w-full bg-white border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition"
              />
            </div>
          </div>

          {/* Quantity & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="cust-qty" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Số lượng dự kiến làm
              </label>
              <input
                id="cust-qty"
                type="number"
                min={1}
                value={order.qty}
                onChange={(e) => onChange((prev) => ({ ...prev, qty: Math.max(1, parseInt(e.target.value, 10) || 1) }))}
                className="w-full bg-white border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition"
              />
            </div>

            <div>
              <label htmlFor="cust-date" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Ngày cần nhận hàng (Nếu có hẹn gấp)
              </label>
              <input
                id="cust-date"
                type="date"
                value={order.neededDate}
                onChange={(e) => onChange((prev) => ({ ...prev, neededDate: e.target.value }))}
                className="w-full bg-white border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition"
              />
            </div>
          </div>

          {/* Detailed Request Note */}
          <div>
            <label htmlFor="cust-note" className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
              Mô tả chi tiết mong muốn (Màu sắc, nốt hương, kích thước, hộp quà...) <span className="text-terracotta">*</span>
            </label>
            <textarea
              id="cust-note"
              rows={3}
              required
              value={order.note}
              onChange={(e) => onChange((prev) => ({ ...prev, note: e.target.value }))}
              placeholder="VD: Mình muốn làm mẫu nến giống trong ảnh nhưng kích thước to hơn, tone màu trắng kem, mùi gỗ đàn hương ấm áp, có thắt nơ ruy băng để làm quà tặng..."
              className="w-full bg-white border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition leading-relaxed"
            />
          </div>

          {/* Bottom Action Footer with Clear BACK and SUBMIT Buttons */}
          <div className="pt-4 border-t border-stonewarm flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            {onBackToCategory ? (
              <button
                type="button"
                onClick={onBackToCategory}
                className="border border-stonewarm text-charcoal px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-oat active:scale-95 transition cursor-pointer flex items-center justify-center space-x-2 shrink-0"
              >
                <span>←</span>
                <span>Quay lại chọn dạng nến khác</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-charcoal text-alabaster px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-terracotta disabled:opacity-50 active:scale-95 transition cursor-pointer shadow-sm flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Đang gửi về Telegram...' : 'Gửi mẫu về Telegram ngay'}</span>
              <span>→</span>
            </button>
          </div>

          {/* Status Alert Notification */}
          {statusMessage && (
            <div
              className={`rounded-2xl p-4 sm:p-5 text-sm font-medium space-y-2 border animate-in fade-in ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
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
                    <span>Mở Telegram trò chuyện trực tiếp với xưởng ↗</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
