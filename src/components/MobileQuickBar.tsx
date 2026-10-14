import React from 'react';
import { formatVND } from '../data/candleData';

interface MobileQuickBarProps {
  totalPrice: number;
  onAddToCart: () => void;
  showAddButton?: boolean;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  totalPrice,
  onAddToCart,
  showAddButton = true,
}) => {
  return (
    <aside
      aria-label="Thanh thao tác nhanh di động"
      className="lg:hidden fixed bottom-0 inset-x-0 bg-alabaster/95 backdrop-blur-md border-t border-stonewarm p-3 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted block leading-none">
            Tạm tính
          </span>
          <span className="font-serif text-xl font-bold text-charcoal">
            {formatVND(totalPrice)}
          </span>
        </div>

        {showAddButton && (
          <button
            type="button"
            onClick={onAddToCart}
            className="bg-charcoal text-alabaster px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-terracotta active:scale-95 transition cursor-pointer shadow-xs"
          >
            Thêm vào giỏ
          </button>
        )}
      </div>
    </aside>
  );
};
