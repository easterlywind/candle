import React, { useState } from 'react';
import type { MoldCustomizationState, MoldPackagingType } from '../types/candle';
import {
  MOLD_SHAPES,
  SCENTS,
  MOLD_PACKAGING_OPTIONS,
  formatVND,
} from '../data/candleData';
import { StepIndicator, type StepItem } from './StepIndicator';
import { QuantitySelector } from './QuantitySelector';

interface MoldStudioProps {
  state: MoldCustomizationState;
  onChange: React.Dispatch<React.SetStateAction<MoldCustomizationState>>;
  onAddToCart: () => void;
  onBackToCategory: () => void;
}

const MOLD_STEPS: StepItem[] = [
  { id: 1, title: 'Chọn dạng nến', shortTitle: '1. Dạng nến' },
  { id: 2, title: 'Chọn mẫu khuôn điêu khắc', shortTitle: '2. Mẫu khuôn' },
  { id: 3, title: 'Chọn mùi hương tinh dầu', shortTitle: '3. Mùi hương' },
  { id: 4, title: 'Quy cách đóng gói & Tag thiệp', shortTitle: '4. Đóng gói' },
  { id: 5, title: 'Số lượng & Hoàn tất', shortTitle: '5. Hoàn tất' },
];

export const MoldStudio: React.FC<MoldStudioProps> = ({
  state,
  onChange,
  onAddToCart,
  onBackToCategory,
}) => {
  const [currentStep, setCurrentStep] = useState(2);

  const currentMold = MOLD_SHAPES[state.shapeIndex] || MOLD_SHAPES[0];
  const currentScent = SCENTS[state.scentIndex] || SCENTS[0];

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

  const handleSelectScent = (idx: number) => {
    onChange((prev) => ({ ...prev, scentIndex: idx }));
  };

  const handleSelectPack = (packaging: MoldPackagingType) => {
    onChange((prev) => ({ ...prev, packaging }));
  };

  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => ({ ...prev, cardMsg: e.target.value }));
  };

  const handleQtyChange = (qty: number) => {
    onChange((prev) => ({ ...prev, qty }));
  };

  const handleNextStep = () => {
    if (currentStep < MOLD_STEPS.length) {
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
          steps={MOLD_STEPS}
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
          ← Dòng: Nến Khuôn Nghệ Thuật
        </button>
        {currentStep >= 3 && (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            Khuôn {currentMold.name}
          </button>
        )}
        {currentStep >= 4 && (
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {currentScent.name.split('(')[0]}
          </button>
        )}
        {currentStep >= 5 && (
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {state.packaging.split(' ')[0]}
          </button>
        )}
      </div>

      {/* ================= STEP 2: CHỌN MẪU KHUÔN (CÓ ẢNH THẬT CHO TỪNG KHUÔN) ================= */}
      {currentStep === 2 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 2 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn mẫu khuôn nến điêu khắc
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Tạo hình điêu khắc thủ công tinh xảo, thích hợp decor và làm quà lưu niệm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {MOLD_SHAPES.map((m, idx) => {
              const isActive = idx === state.shapeIndex;

              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => handleSelectShape(idx)}
                  className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                      : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                  }`}
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-oat border-b border-stonewarm/40">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 font-serif text-white text-sm font-bold drop-shadow-sm">
                      {formatVND(m.price)}
                    </span>
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                        {m.name}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-2 text-[11px] font-semibold flex justify-end">
                      <span className={isActive ? 'text-terracotta' : 'text-muted group-hover:text-charcoal'}>
                        {isActive ? '● Đã chọn' : 'Chọn mẫu này →'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: CHỌN MÙI HƯƠNG (CÓ ẢNH THẬT) ================= */}
      {currentStep === 3 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 3 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn nốt hương tinh dầu
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Mùi hương nhẹ nhàng tinh tế lan tỏa trong phòng khi trưng bày.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
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
                  <div className="relative h-36 w-full overflow-hidden bg-oat">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
                    <div>
                      <h4 className="font-serif text-base font-bold text-charcoal group-hover:text-terracotta transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {s.note}
                      </p>
                    </div>

                    <div className="pt-2 text-[11px] font-semibold flex justify-end">
                      <span className={isActive ? 'text-terracotta' : 'text-muted group-hover:text-charcoal'}>
                        {isActive ? '● Đã chọn' : 'Chọn mùi này →'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 4: QUY CÁCH ĐÓNG GÓI & THIỆP (CÓ ẢNH THẬT) ================= */}
      {currentStep === 4 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 4 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Quy cách đóng gói &amp; Lời nhắn thiệp
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Chọn bao bì đóng gói bảo vệ nến và gửi gắm lời nhắn gửi đến người nhận.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOLD_PACKAGING_OPTIONS.map((pack) => {
              const isSelected = state.packaging === pack.id;

              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => handleSelectPack(pack.id)}
                  className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                      : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                  }`}
                >
                  <div className="relative h-44 w-full overflow-hidden bg-oat">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-1.5">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                      {pack.name}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {pack.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="mold-msg-input" className="font-semibold text-charcoal">
                Lời nhắn đính kèm tag thiệp
              </label>
              <span className="text-sage font-bold">MIỄN PHÍ</span>
            </div>
            <input
              id="mold-msg-input"
              type="text"
              value={state.cardMsg}
              onChange={handleMsgChange}
              placeholder="Nhập lời chúc bạn muốn xưởng đính kèm..."
              className="w-full bg-alabaster border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
            />
          </div>
        </div>
      )}

      {/* ================= STEP 5: SỐ LƯỢNG & HOÀN TẤT ================= */}
      {currentStep === 5 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 5 trong 5
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Số lượng &amp; Hoàn tất
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Kiểm tra lại cấu hình nến khuôn điêu khắc trước khi thêm vào đơn đặt.
            </p>
          </div>

          <QuantitySelector
            qty={state.qty}
            onChange={handleQtyChange}
            hint="Nhập số lượng nến khuôn bạn muốn đặt làm."
          />

          <div className="p-5 rounded-2xl bg-oat/80 border border-stonewarm space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Khuôn điêu khắc:</span>
              <span className="font-semibold text-charcoal">{currentMold.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Đơn giá:</span>
              <span className="font-semibold text-charcoal">{formatVND(currentMold.price)} / cái</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Mùi hương:</span>
              <span className="font-semibold text-charcoal">{currentScent.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Quy cách đóng gói:</span>
              <span className="font-semibold text-charcoal">{state.packaging}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stonewarm font-serif text-lg sm:text-xl font-bold text-charcoal">
              <span>Tổng thành tiền ({state.qty} cái):</span>
              <span>{formatVND(currentMold.price * state.qty)}</span>
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
          Bước {currentStep} / {MOLD_STEPS.length}
        </div>

        {currentStep < MOLD_STEPS.length ? (
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
