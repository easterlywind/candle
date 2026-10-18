import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onResetToStart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onResetToStart,
}) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onResetToStart) {
      onResetToStart();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-alabaster text-xs tracking-widest uppercase py-2.5 px-4 text-center font-medium">
        Miễn phí khắc nhãn tên &amp; thiệp viết tay cho mọi đơn hàng nến hũ
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-alabaster/90 backdrop-blur-md border-b border-stonewarm/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="MOOD&SCENT"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal group-hover:text-terracotta transition-colors">
                MOOD &amp; SCENT
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-muted -mt-0.5 font-medium">
                Bespoke Candle Studio · 2026
              </span>
            </div>
          </a>

          {/* Right Action: Cart Button */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center space-x-2 bg-charcoal text-alabaster px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-terracotta active:scale-95 transition cursor-pointer shadow-sm"
            >
              <span>Giỏ hàng</span>
              <span className="bg-terracotta text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
