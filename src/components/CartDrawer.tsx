import React from 'react';
import type { CartItem } from '../types/candle';
import { formatVND } from '../data/candleData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onStartCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onStartCheckout,
}) => {
  if (!isOpen) return null;

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/45 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-alabaster border-l border-stonewarm shadow-2xl flex flex-col z-10 transition-transform">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stonewarm flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-charcoal">Giỏ hàng của bạn</h3>
            <p className="text-xs text-muted mt-0.5">
              {items.length} cấu hình nến đã được thiết kế
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-oat text-muted hover:text-charcoal transition cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-3xl block">🕯️</span>
              <p className="text-sm font-medium text-charcoal">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-muted max-w-xs mx-auto">
                Hãy tùy chỉnh hũ nến theo ý thích tại xưởng và nhấn "Thêm vào đơn đặt" nhé!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-oat/70 p-4 rounded-2xl border border-stonewarm relative space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-sm text-charcoal pr-6">
                    {item.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-xs text-muted hover:text-red-700 transition cursor-pointer shrink-0"
                  >
                    Xóa
                  </button>
                </div>

                <p className="text-xs text-muted leading-relaxed">{item.specs}</p>

                {item.note && (
                  <p className="text-xs italic text-charcoal/85 bg-alabaster/80 px-2.5 py-1.5 rounded-lg border border-stonewarm/60">
                    {item.note}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-stonewarm/50">
                  {/* Quantity modifier */}
                  <div className="inline-flex items-center space-x-2 bg-alabaster rounded-lg border border-stonewarm px-2 py-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="text-sm px-1.5 font-bold hover:text-terracotta cursor-pointer"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold px-1">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="text-sm px-1.5 font-bold hover:text-terracotta cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-serif text-base sm:text-lg font-semibold text-charcoal">
                    {formatVND(item.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-stonewarm bg-oat/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                Tổng cộng đơn hàng
              </span>
              <span className="font-serif text-2xl font-semibold text-charcoal">
                {formatVND(grandTotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={onStartCheckout}
              className="w-full bg-charcoal text-alabaster py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider font-semibold hover:bg-terracotta active:scale-[0.98] transition-all cursor-pointer shadow-sm text-center"
            >
              Chốt đơn &amp; Đẩy thông tin về Telegram
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
