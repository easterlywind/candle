import React from 'react';
import type { CandleCategory } from '../types/candle';
import { CANDLE_CATEGORIES } from '../data/candleData';

interface CategoryStepProps {
  selectedCategory: CandleCategory;
  onSelectCategory: (category: CandleCategory) => void;
  onNext: () => void;
}

export const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedCategory,
  onSelectCategory,
  onNext,
}) => {
  return (
    <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
      <div>
        <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
          Bước 1 trong hành trình
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
          Chọn dạng nến bạn muốn chế tác
        </h3>
        <p className="text-xs sm:text-base text-muted mt-1.5 leading-relaxed">
          Tùy theo sở thích trưng bày, không gian phòng hoặc làm quà tặng, hãy bắt đầu bằng việc chọn dòng nến phù hợp nhất.
        </p>
      </div>

      {/* Grid 4 Category Cards with Illustrative Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
        {CANDLE_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedCategory;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                  : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white/90'
              }`}
            >
              {/* Photo Banner */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-oat">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

                {/* Badge top-left */}
                {cat.badge && (
                  <span className="absolute top-3 left-3 bg-charcoal/85 backdrop-blur-xs text-alabaster text-[10.5px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {cat.badge}
                  </span>
                )}

                {/* Price tag bottom-left */}
                <span className="absolute bottom-3 left-3 font-serif text-white text-base font-bold drop-shadow-sm">
                  {cat.priceFrom}
                </span>

                {/* Selected checkmark indicator */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                    ✓
                  </span>
                )}
              </div>

              {/* Text Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                      {cat.name}
                    </h4>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-muted font-medium mt-0.5">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-terracotta' : 'text-charcoal group-hover:text-terracotta'}>
                    {isSelected ? '● Đang chọn dạng nến này' : 'Chọn dạng nến này →'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action to proceed */}
      <div className="pt-4 border-t border-stonewarm flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="bg-charcoal text-alabaster px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-terracotta active:scale-95 transition-all cursor-pointer shadow-sm flex items-center space-x-2"
        >
          <span>Tiếp tục bước tiếp theo</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
