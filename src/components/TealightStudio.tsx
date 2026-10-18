import React, { useState } from 'react';
import type { TealightCustomizationState, TealightWickType } from '../types/candle';
import {
  TEALIGHT_SHAPES,
  TEALIGHT_COLORS,
  TEALIGHT_WICKS,
  SCENTS,
  calculateTealightPrice,
  formatVND,
} from '../data/candleData';
import { StepIndicator, type StepItem } from './StepIndicator';
import { QuantitySelector } from './QuantitySelector';

interface TealightStudioProps {
  state: TealightCustomizationState;
  onChange: React.Dispatch<React.SetStateAction<TealightCustomizationState>>;
  onAddToCart: () => void;
  onBackToCategory: () => void;
}

const TEALIGHT_STEPS: StepItem[] = [
  { id: 1, title: 'Chọn dạng nến', shortTitle: '1. Dạng nến' },
  { id: 2, title: 'Chọn hình dáng cốc Tealight', shortTitle: '2. Dáng cốc' },
  { id: 3, title: 'Tùy chọn Bấc đốt hoặc Sáp thơm', shortTitle: '3. Bấc nến' },
  { id: 4, title: 'Chọn màu sáp & Mùi hương', shortTitle: '4. Màu & Hương' },
  { id: 5, title: 'Số lượng & Bảng giá sỉ', shortTitle: '5. Số lượng & Giá' },
];

export const TealightStudio: React.FC<TealightStudioProps> = ({
  state,
  onChange,
  onAddToCart,
  onBackToCategory,
}) => {
  const [currentStep, setCurrentStep] = useState(2);

  const currentShape = TEALIGHT_SHAPES[state.shapeIndex] || TEALIGHT_SHAPES[0];
  const currentColor = TEALIGHT_COLORS[state.colorIndex] || TEALIGHT_COLORS[0];
  const currentScent = SCENTS[state.scentIndex] || SCENTS[0];
  const pricing = calculateTealightPrice(state.qty);

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      onBackToCategory();
      return;
    }
    setCurrentStep(stepId);
  };

  const handleSelectShape = (idx: number) => {
    onChange((prev) => ({ ...prev, shapeIndex: idx }));
  };

  const handleSelectWick = (wick: TealightWickType) => {
    onChange((prev) => ({ ...prev, wick }));
  };

  const handleSelectColor = (idx: number) => {
    onChange((prev) => ({ ...prev, colorIndex: idx }));
  };

  const handleSelectScent = (idx: number) => {
    onChange((prev) => ({ ...prev, scentIndex: idx }));
  };

  const handleQtyChange = (qty: number) => {
    onChange((prev) => ({ ...prev, qty }));
  };

  const handleNextStep = () => {
    if (currentStep < TEALIGHT_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      onBackToCategory();
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* Step Tracker Header */}
      <div className="bg-white/70 rounded-3xl p-5 sm:p-6 border border-stonewarm shadow-2xs">
        <StepIndicator
          steps={TEALIGHT_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Breadcrumb Context */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={onBackToCategory}
          className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition font-semibold"
        >
          ← Dòng: Nến Hũ Tealight
        </button>
        {currentStep >= 3 && (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {currentShape.name}
          </button>
        )}
        {currentStep >= 4 && (
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {state.wick}
          </button>
        )}
        {currentStep >= 5 && (
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition flex items-center space-x-1"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
            <span>Sáp {currentColor.name} · {currentScent.name.split('(')[0]}</span>
          </button>
        )}
      </div>

      {/* ================= STEP 2: CHỌN HÌNH DÁNG CỐC (CÓ ẢNH THẬT CHO TỪNG DÁNG) ================= */}
      {currentStep === 2 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                Bước 2 trong 5
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
                Chọn hình dáng cốc Tealight
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
                Cốc nhựa chịu nhiệt cao cấp chuẩn an toàn khi thắp sáng.
              </p>
            </div>
            <a
              href="https://shopee.vn/C%E1%BB%91c-N%E1%BA%BFn-Tealight-Trong-Su%E1%BB%91t-Nhi%E1%BB%81u-H%C3%ACnh-C%E1%BB%91c-Nh%E1%BB%B1a-Ch%E1%BB%8Bu-Nhi%E1%BB%87t-%C4%90%E1%BB%B1ng-N%E1%BA%BFn-Tealight-Handmade-D%E1%BB%A5ng-C%E1%BB%A5-L%C3%A0m-N%E1%BA%BFn-Th%C6%A1m-i.748089097.19457836372"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline text-muted hover:text-charcoal shrink-0 transition"
            >
              Xem mẫu cốc chịu nhiệt ↗
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
            {TEALIGHT_SHAPES.map((shape, idx) => {
              const isActive = idx === state.shapeIndex;

              return (
                <button
                  key={shape.name}
                  type="button"
                  onClick={() => handleSelectShape(idx)}
                  className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md ${
                    isActive
                      ? 'border-charcoal bg-white ring-2 ring-charcoal/25 shadow-md scale-[1.01]'
                      : 'border-stonewarm bg-white/90 hover:border-charcoal/50 hover:bg-white'
                  }`}
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-2.5 border-b border-stonewarm/40">
                    <img
                      src={shape.image}
                      alt={shape.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-md">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="p-3 text-center bg-white flex-1 flex flex-col justify-center">
                    <span className="font-semibold text-xs sm:text-sm text-charcoal block group-hover:text-terracotta transition-colors">
                      {shape.name}
                    </span>
                    <span className="text-[11px] text-muted block mt-0.5 truncate">
                      {shape.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: TÙY CHỌN BẤC (CÓ ẢNH MINH HỌA) ================= */}
      {currentStep === 3 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 3 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Tùy chọn Bấc nến
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Bạn muốn thắp lửa ấm cúng hay dùng sáp thơm cho đèn đốt nến?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {TEALIGHT_WICKS.map((w) => {
              const isSelected = state.wick === w.type;

              return (
                <button
                  key={w.type}
                  type="button"
                  onClick={() => handleSelectWick(w.type)}
                  className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                      : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                  }`}
                >
                  <div className="relative h-44 w-full overflow-hidden bg-oat">
                    <img
                      src={w.image}
                      alt={w.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    {isSelected && (
                      <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                        {w.name}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        {w.desc}
                      </p>
                    </div>

                    <div className="pt-2 text-xs font-semibold">
                      <span className={isSelected ? 'text-terracotta' : 'text-muted'}>
                        {isSelected ? '● Đang chọn' : 'Chọn dạng này →'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 4: MÀU SÁP & MÙI HƯƠNG (CÓ ẢNH THẬT) ================= */}
      {currentStep === 4 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 4 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn màu sắc sáp &amp; Nốt hương
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Tạo điểm nhấn màu sắc pastel dịu mát cho set nến tealight của bạn.
            </p>
          </div>

          {/* Màu sáp */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal block">
              Màu sáp nến bên trong
            </label>
            <div className="flex flex-wrap gap-3">
              {TEALIGHT_COLORS.map((c, idx) => {
                const isActive = idx === state.colorIndex;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelectColor(idx)}
                    className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border text-xs transition cursor-pointer ${
                      isActive
                        ? 'border-charcoal bg-charcoal text-alabaster font-semibold shadow-md'
                        : 'border-stonewarm bg-alabaster/70 hover:border-charcoal/40 text-charcoal'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-charcoal/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mùi hương có ảnh */}
          <div className="pt-4 border-t border-stonewarm/60 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal block">
              Mùi hương tinh dầu nguyên bản
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SCENTS.map((s, idx) => {
                const isActive = idx === state.scentIndex;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScent(idx)}
                    className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                        : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                    }`}
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-oat">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {isActive && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between space-y-1">
                      <span className="font-serif text-sm font-bold text-charcoal group-hover:text-terracotta">
                        {s.name}
                      </span>
                      <span className="text-[11px] text-muted line-clamp-2">
                        {s.note}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 5: SỐ LƯỢNG & BẢNG GIÁ SỈ ================= */}
      {currentStep === 5 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 5 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Số lượng &amp; Ưu đãi giá sỉ
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Chiết khấu bậc thang theo số lượng: càng đặt nhiều, giá càng tốt.
            </p>
          </div>

          {/* 3 Price Tiers Highlight Card */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center">
            <div className={`p-3 sm:p-4 rounded-2xl border transition ${state.qty < 20 ? 'bg-charcoal text-alabaster border-charcoal shadow-sm' : 'bg-oat/60 border-stonewarm text-charcoal'}`}>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider block font-medium">Dưới 20 cái</span>
              <span className="font-serif text-lg sm:text-2xl font-bold mt-1 block">59.000đ</span>
              <span className={`text-[10px] sm:text-[11px] ${state.qty < 20 ? 'text-stonewarm/80' : 'text-muted'}`}>Giá bán lẻ</span>
            </div>

            <div className={`p-3 sm:p-4 rounded-2xl border transition ${state.qty >= 20 && state.qty < 50 ? 'bg-charcoal text-alabaster border-charcoal shadow-sm' : 'bg-oat/60 border-stonewarm text-charcoal'}`}>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider block font-medium">Từ 20 cái</span>
              <span className="font-serif text-lg sm:text-2xl font-bold mt-1 block">55.000đ</span>
              <span className={`text-[10px] sm:text-[11px] ${state.qty >= 20 && state.qty < 50 ? 'text-sage font-bold' : 'text-sage font-medium'}`}>Tiết kiệm 4k/cái</span>
            </div>

            <div className={`p-3 sm:p-4 rounded-2xl border transition ${state.qty >= 50 ? 'bg-charcoal text-alabaster border-charcoal shadow-sm' : 'bg-oat/60 border-stonewarm text-charcoal'}`}>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider block font-medium">Từ 50 cái</span>
              <span className="font-serif text-lg sm:text-2xl font-bold mt-1 block">49.000đ</span>
              <span className={`text-[10px] sm:text-[11px] ${state.qty >= 50 ? 'text-terracotta font-bold' : 'text-terracotta font-medium'}`}>Tiết kiệm 10k/cái</span>
            </div>
          </div>

          <QuantitySelector
            qty={state.qty}
            onChange={handleQtyChange}
            hint="Chọn số lượng bạn cần làm cho mẫu tealight này."
            quickButtons={[
              { label: '20 cái (55k)', value: 20 },
              { label: '50 cái (49k)', value: 50 },
            ]}
          />

          <div className="p-4 sm:p-5 rounded-2xl bg-oat/80 border border-stonewarm space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Đơn giá áp dụng:</span>
              <span className="font-semibold text-charcoal">{formatVND(pricing.unitPrice)} / cái</span>
            </div>
            {pricing.discountTotal > 0 && (
              <div className="flex justify-between text-sage font-semibold">
                <span>Ưu đãi số lượng lớn tiết kiệm:</span>
                <span>-{formatVND(pricing.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-stonewarm font-serif text-lg sm:text-xl font-bold text-charcoal">
              <span>Tổng thành tiền ({state.qty} cái):</span>
              <span>{formatVND(pricing.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step Navigation Controls */}
      <div className="bg-white/70 rounded-2xl p-4 sm:p-5 border border-stonewarm flex items-center justify-between gap-3 shadow-2xs">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-5 py-3 rounded-full border border-stonewarm text-xs sm:text-sm font-semibold text-charcoal hover:bg-oat transition cursor-pointer"
        >
          ← {currentStep === 2 ? 'Chọn dạng nến khác' : 'Quay lại'}
        </button>

        <div className="text-xs text-muted font-medium">
          Bước {currentStep} / {TEALIGHT_STEPS.length}
        </div>

        {currentStep < TEALIGHT_STEPS.length ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-charcoal text-alabaster px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-terracotta active:scale-95 transition cursor-pointer shadow-sm flex items-center space-x-2"
          >
            <span>Tiếp theo</span>
            <span>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAddToCart}
            className="bg-terracotta text-alabaster px-7 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-charcoal active:scale-95 transition cursor-pointer shadow-sm"
          >
            Thêm vào đơn đặt
          </button>
        )}
      </div>
    </div>
  );
};
