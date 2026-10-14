import React from 'react';

interface QuantitySelectorProps {
  qty: number;
  onChange: (qty: number) => void;
  hint?: string;
  quickButtons?: { label: string; value: number }[];
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  qty,
  onChange,
  hint = 'Nhập số lượng sản phẩm bạn cần cho cấu hình này.',
  quickButtons,
}) => {
  const handleDecrement = () => {
    onChange(Math.max(1, qty - 1));
  };

  const handleIncrement = () => {
    onChange(qty + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChange(Number.isNaN(val) ? 1 : Math.max(1, val));
  };

  return (
    <div className="bg-white/60 rounded-3xl p-6 sm:p-8 border border-stonewarm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal">Số lượng đặt làm</h3>
        <p className="text-xs text-muted mt-0.5">{hint}</p>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <div className="inline-flex items-center space-x-2">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-11 h-11 rounded-xl border border-stonewarm bg-alabaster hover:bg-oat text-lg font-medium text-charcoal active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Giảm số lượng"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            min={1}
            onChange={handleInputChange}
            className="w-20 text-center bg-alabaster border border-stonewarm rounded-xl py-2.5 font-semibold text-base text-charcoal focus:outline-none focus:border-charcoal transition"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="w-11 h-11 rounded-xl border border-stonewarm bg-alabaster hover:bg-oat text-lg font-medium text-charcoal active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Tăng số lượng"
          >
            +
          </button>
        </div>

        {quickButtons && quickButtons.length > 0 && (
          <div className="flex items-center space-x-1.5 pl-1 sm:pl-2">
            {quickButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                onClick={() => onChange(btn.value)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition cursor-pointer ${
                  qty === btn.value
                    ? 'bg-charcoal text-alabaster shadow-xs'
                    : 'bg-oat hover:bg-stonewarm text-charcoal'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
