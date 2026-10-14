import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { CartItem, CustomerOrderInfo } from '../types/candle';
import { formatVND } from '../data/candleData';
import {
  generateOrderCode,
  generateVietQRUrl,
  STORE_CONFIG,
  formatStandardOrderMessage,
  pushToTelegramBot,
  generateTelegramDirectUrl,
} from '../services/telegramService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customer, setCustomer] = useState<CustomerOrderInfo>({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'vietqr',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderCode: string;
    total: number;
    vietQrUrl: string;
    telegramDirectUrl: string;
  } | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorNotice(null);

    const orderCode = generateOrderCode('LAT');
    const message = formatStandardOrderMessage(items, customer, orderCode, totalAmount);
    const vietQrUrl = generateVietQRUrl(totalAmount, orderCode);
    const directTelegramUrl = generateTelegramDirectUrl(message);

    try {
      const result = await pushToTelegramBot(message);

      if (result.success) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });

        setConfirmedOrder({
          orderCode,
          total: totalAmount,
          vietQrUrl,
          telegramDirectUrl: directTelegramUrl,
        });

        onOrderSuccess();
      } else {
        throw new Error(result.error || 'Lỗi khi gửi Telegram');
      }
    } catch {
      // Fallback: order confirmed locally, direct link provided
      setConfirmedOrder({
        orderCode,
        total: totalAmount,
        vietQrUrl,
        telegramDirectUrl: directTelegramUrl,
      });
      setErrorNotice(
        'Đơn hàng đã được tạo. Hãy nhấn vào nút Telegram bên dưới để gửi tin nhắn xác nhận trực tiếp cho xưởng nhé!'
      );
      onOrderSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    setErrorNotice(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-alabaster w-full max-w-2xl rounded-3xl border border-stonewarm shadow-2xl p-6 sm:p-8 z-10 my-8">
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-oat text-muted hover:text-charcoal transition cursor-pointer"
          >
            ✕
          </button>

          {/* CONFIRMED STATE */}
          {confirmedOrder ? (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-sage/15 text-sage flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                  Đặt Hàng Thành Công
                </span>
                <h3 className="font-serif text-3xl font-semibold mt-1 text-charcoal">
                  Cảm ơn bạn đã lựa chọn L'Atelier!
                </h3>
                <p className="text-sm text-muted mt-2">
                  Mã đơn hàng của bạn là{' '}
                  <strong className="text-charcoal font-semibold">#{confirmedOrder.orderCode}</strong>
                </p>
              </div>

              {/* VietQR Box if selected */}
              {customer.paymentMethod === 'vietqr' && (
                <div className="bg-white rounded-2xl p-5 border border-stonewarm max-w-md mx-auto text-left space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-stonewarm/60 pb-3">
                    <div>
                      <span className="text-xs uppercase font-bold text-charcoal block">
                        Thanh toán Chuyển khoản VietQR
                      </span>
                      <span className="text-xs text-muted">Quét nhanh qua bất kỳ app ngân hàng / ví</span>
                    </div>
                    <span className="font-serif text-lg font-bold text-terracotta">
                      {formatVND(confirmedOrder.total)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={confirmedOrder.vietQrUrl}
                      alt="Mã QR Chuyển khoản"
                      className="w-40 h-40 object-contain rounded-xl border border-stonewarm/60 shadow-xs shrink-0"
                    />
                    <div className="text-xs space-y-1.5 text-muted leading-relaxed">
                      <p>
                        Ngân hàng: <strong className="text-charcoal">{STORE_CONFIG.bank.bankId}</strong>
                      </p>
                      <p>
                        Số tài khoản:{' '}
                        <strong className="text-charcoal font-mono">{STORE_CONFIG.bank.accountNo}</strong>
                      </p>
                      <p>
                        Chủ tài khoản:{' '}
                        <strong className="text-charcoal">{STORE_CONFIG.bank.accountName}</strong>
                      </p>
                      <p>
                        Nội dung chuyển khoản:{' '}
                        <strong className="text-terracotta font-mono font-bold">
                          Thanh toan don {confirmedOrder.orderCode}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errorNotice && (
                <div className="bg-amber-50 text-amber-800 text-xs p-3.5 rounded-xl border border-amber-200">
                  {errorNotice}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={confirmedOrder.telegramDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-charcoal text-alabaster px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-terracotta transition"
                >
                  Mở Telegram gửi đơn cho xưởng ↗
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-oat text-charcoal px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-stonewarm transition cursor-pointer"
                >
                  Đóng &amp; Tiếp tục khám phá
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                  Xác nhận đơn hàng
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-1">
                  Thông tin người nhận &amp; Thanh toán
                </h3>
                <p className="text-xs text-muted mt-1">
                  Đơn hàng gồm {items.length} cấu hình nến · Tổng cộng:{' '}
                  <strong className="text-charcoal font-serif text-sm">{formatVND(totalAmount)}</strong>
                </p>
              </div>

              {/* Customer Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Họ tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="09xx xxx xxx"
                    className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                  Địa chỉ giao nhận nến *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP..."
                  className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                  Ghi chú cho xưởng (nếu có)
                </label>
                <input
                  type="text"
                  value={customer.note}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder="VD: Giao giờ hành chính, cần trước ngày thứ Bảy..."
                  className="w-full bg-oat/50 border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Hình thức thanh toán
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, paymentMethod: 'vietqr' }))}
                    className={`option-card text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      customer.paymentMethod === 'vietqr'
                        ? 'active border-charcoal bg-charcoal text-alabaster shadow-sm'
                        : 'border-stonewarm bg-alabaster/70 hover:border-charcoal/40 text-charcoal'
                    }`}
                  >
                    <span className="font-semibold text-sm block">Chuyển khoản VietQR</span>
                    <span className={`sub-price text-xs block mt-0.5 ${customer.paymentMethod === 'vietqr' ? 'text-stonewarm/80' : 'text-muted'}`}>
                      Quét mã QR tự động bằng App ngân hàng
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`option-card text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      customer.paymentMethod === 'cod'
                        ? 'active border-charcoal bg-charcoal text-alabaster shadow-sm'
                        : 'border-stonewarm bg-alabaster/70 hover:border-charcoal/40 text-charcoal'
                    }`}
                  >
                    <span className="font-semibold text-sm block">Thanh toán COD</span>
                    <span className={`sub-price text-xs block mt-0.5 ${customer.paymentMethod === 'cod' ? 'text-stonewarm/80' : 'text-muted'}`}>
                      Thanh toán tiền mặt khi nhận hàng
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stonewarm">
                <div>
                  <span className="text-xs text-muted block">Tổng thanh toán:</span>
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    {formatVND(totalAmount)}
                  </span>
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-muted hover:text-charcoal hover:bg-oat transition cursor-pointer"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-charcoal text-alabaster px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-terracotta disabled:opacity-50 transition cursor-pointer shadow-sm active:scale-95"
                  >
                    {isSubmitting ? 'Đang gửi đơn...' : 'Xác nhận & Gửi đơn hàng'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
