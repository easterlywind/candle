import React, { useState } from 'react';
import type { JarCustomizationState } from '../types/candle';
import {
  JAR_VESSELS,
  SCENTS,
  JAR_PACKAGING_OPTIONS,
  formatVND,
} from '../data/candleData';
import { StepIndicator, type StepItem } from './StepIndicator';
import { QuantitySelector } from './QuantitySelector';

interface JarStudioProps {
  state: JarCustomizationState;
  onChange: React.Dispatch<React.SetStateAction<JarCustomizationState>>;
  onAddToCart: () => void;
  onBackToCategory: () => void;
}

const JAR_STEPS: StepItem[] = [
  { id: 1, title: 'Chọn dạng nến', shortTitle: '1. Dạng nến' },
  { id: 2, title: 'Chọn chất liệu & kiểu dáng hũ', shortTitle: '2. Chất liệu' },
  { id: 3, title: 'Chọn dung tích hũ', shortTitle: '3. Dung tích' },
  { id: 4, title: 'Chọn màu sắc vỏ hoặc sáp', shortTitle: '4. Màu sắc' },
  { id: 5, title: 'Chọn mùi hương tinh dầu', shortTitle: '5. Mùi hương' },
  { id: 6, title: 'Đóng gói, Nhãn tên & Số lượng', shortTitle: '6. Hoàn tất' },
];

export const JarStudio: React.FC<JarStudioProps> = ({
  state,
  onChange,
  onAddToCart,
  onBackToCategory,
}) => {
  // Step 2 is the default when entering JarStudio (Step 1 is Category selection)
  const [currentStep, setCurrentStep] = useState(2);

  const currentVessel = JAR_VESSELS[state.vesselIndex] || JAR_VESSELS[0];
  const currentSize = currentVessel.sizes[state.sizeIndex] || currentVessel.sizes[0];
  const currentColor = currentVessel.colors[state.colorIndex] || currentVessel.colors[0];
  const currentScent = SCENTS[state.scentIndex] || SCENTS[0];

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      onBackToCategory();
      return;
    }
    setCurrentStep(stepId);
  };

  const handleSelectVessel = (idx: number) => {
    onChange((prev) => ({
      ...prev,
      vesselIndex: idx,
      sizeIndex: 0,
      colorIndex: 0,
    }));
  };

  const handleSelectSize = (idx: number) => {
    onChange((prev) => ({ ...prev, sizeIndex: idx }));
  };

  const handleSelectColor = (idx: number) => {
    onChange((prev) => ({ ...prev, colorIndex: idx }));
  };

  const handleSelectScent = (idx: number) => {
    onChange((prev) => ({ ...prev, scentIndex: idx }));
  };

  const handleToggleGift = (isGift: boolean) => {
    onChange((prev) => ({ ...prev, giftPackaging: isGift }));
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => ({ ...prev, labelText: e.target.value }));
  };

  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => ({ ...prev, handwrittenMsg: e.target.value }));
  };

  const handleQtyChange = (qty: number) => {
    onChange((prev) => ({ ...prev, qty }));
  };

  const handleNextStep = () => {
    if (currentStep < JAR_STEPS.length) {
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
          steps={JAR_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Breadcrumb Context: Selected options so far */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={onBackToCategory}
          className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition font-semibold"
        >
          ← Dòng: Nến Hũ Cao Cấp
        </button>
        {currentStep >= 3 && (
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {currentVessel.name}
          </button>
        )}
        {currentStep >= 4 && (
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {currentSize.ml}
          </button>
        )}
        {currentStep >= 5 && (
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition flex items-center space-x-1"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
            <span>{currentColor.name}</span>
          </button>
        )}
        {currentStep >= 6 && (
          <button
            type="button"
            onClick={() => setCurrentStep(5)}
            className="bg-oat text-charcoal px-2.5 py-1 rounded-full border border-stonewarm hover:border-charcoal/40 transition"
          >
            {currentScent.name.split('(')[0]}
          </button>
        )}
      </div>

      {/* ================= STEP 2: CHỌN CHẤT LIỆU HŨ (CÓ ẢNH THẬT CHO TỪNG HŨ) ================= */}
      {currentStep === 2 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 2 trong 6
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn chất liệu &amp; kiểu dáng hũ nến
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Mỗi chất liệu mang vẻ đẹp thị giác và nét mộc mạc đặc trưng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {JAR_VESSELS.map((vessel, idx) => {
              const isActive = idx === state.vesselIndex;
              const minPrice = Math.min(...vessel.sizes.map((s) => s.price));

              return (
                <button
                  key={vessel.id}
                  type="button"
                  onClick={() => handleSelectVessel(idx)}
                  className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                      : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                  }`}
                >
                  {/* Photo of Vessel */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-oat border-b border-stonewarm/40">
                    <img
                      src={vessel.image}
                      alt={vessel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 font-serif text-white text-sm font-bold drop-shadow-sm">
                      từ {formatVND(minPrice)}
                    </span>
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Body Text */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                        {vessel.name}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {vessel.desc}
                      </p>
                    </div>

                    <div className="pt-2 text-[11px] text-muted border-t border-stonewarm/50 flex justify-between">
                      <span>{vessel.sizes.length} dung tích</span>
                      <span className={isActive ? 'font-bold text-charcoal' : 'text-muted'}>
                        {isActive ? '● Đã chọn' : 'Chọn mẫu này'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: CHỌN DUNG TÍCH ================= */}
      {currentStep === 3 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 3 trong 6
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn dung tích cho {currentVessel.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Dung tích tương ứng với thời lượng thắp sáng (từ 18h đến 60h cháy).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
            {currentVessel.sizes.map((s, idx) => {
              const isActive = idx === state.sizeIndex;
              return (
                <button
                  key={s.ml}
                  type="button"
                  onClick={() => handleSelectSize(idx)}
                  className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isActive
                      ? 'border-charcoal bg-charcoal text-alabaster shadow-md'
                      : 'border-stonewarm bg-alabaster/70 hover:border-charcoal/40 text-charcoal hover:bg-white'
                  }`}
                >
                  <span className="font-serif text-2xl sm:text-3xl font-bold">{s.ml}</span>
                  <span className={`text-xs sm:text-sm font-semibold mt-1.5 ${isActive ? 'text-stonewarm/90' : 'text-terracotta'}`}>
                    {formatVND(s.price)}
                  </span>
                  <span className={`text-[10.5px] mt-2 px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-alabaster' : 'bg-oat text-muted'}`}>
                    {isActive ? '✓ Đang chọn' : 'Chọn size này'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-oat/70 border border-stonewarm/60 text-xs text-muted leading-relaxed">
            💡 <strong>Hũ size lớn hơn 400ml:</strong> Nếu bạn cần hũ nến size đại cho phòng khách lớn hoặc khách sạn/spa, hãy chọn mục <strong>Bảng giá sỉ &amp; Hũ lớn</strong> ở chân trang để xưởng tư vấn số bấc gỗ và báo giá riêng nhé.
          </div>
        </div>
      )}

      {/* ================= STEP 4: CHỌN MÀU SẮC ================= */}
      {currentStep === 4 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 4 trong 6
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              {currentVessel.colorType || 'Màu sắc nguyên bản của hũ'}
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Lựa chọn tông màu hài hòa với phong cách không gian sống của bạn.
            </p>
          </div>

          {currentVessel.colorType ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {currentVessel.colors.map((c, idx) => {
                const isActive = idx === state.colorIndex;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelectColor(idx)}
                    className={`flex items-center space-x-3.5 p-3.5 rounded-2xl border text-left transition cursor-pointer shadow-2xs ${
                      isActive
                        ? 'border-charcoal bg-charcoal text-alabaster shadow-md scale-[1.01]'
                        : 'border-stonewarm bg-white/90 hover:border-charcoal/40 text-charcoal hover:bg-white'
                    }`}
                  >
                    {c.image ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-stonewarm/50 p-1 flex items-center justify-center">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <span
                        className="w-10 h-10 rounded-full border border-charcoal/20 shrink-0 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm sm:text-base block truncate">{c.name}</span>
                      <span className={`text-[11px] ${isActive ? 'text-stonewarm/70' : 'text-muted'}`}>
                        Mã màu: {c.hex}
                      </span>
                    </div>
                    {isActive && <span className="text-sm font-bold shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-stonewarm/80 text-center space-y-5 shadow-sm">
              <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-2xl overflow-hidden shadow-xs border border-stonewarm/60 bg-[#faf8f5] flex items-center justify-center p-4 group">
                {currentColor.image ? (
                  <img
                    src={currentColor.image}
                    alt={currentColor.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="w-20 h-20 rounded-full border border-charcoal/20 shadow-sm"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                )}
                <span className="absolute top-3 right-3 bg-charcoal text-alabaster text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Chất liệu nguyên bản</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-charcoal/20 shrink-0 shadow-2xs"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                    {currentColor.name}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Dòng {currentVessel.name} được chế tác tôn trọng vẻ đẹp vật liệu nguyên bản, tạo điểm nhấn mộc mạc và sang trọng cho không gian sống mà không qua xử lý nhuộm màu công nghiệp.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 5: CHỌN MÙI HƯƠNG (CÓ ẢNH NGUYÊN LIỆU THẢO MỘC) ================= */}
      {currentStep === 5 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 5 trong 6
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Chọn nốt hương tinh dầu nguyên bản
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              100% tinh dầu hữu cơ nhập khẩu đạt kiểm định IFRA an toàn cho hệ hô hấp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {SCENTS.map((s, idx) => {
              const isActive = idx === state.scentIndex;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScent(idx)}
                  className={`group text-left rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between shadow-2xs ${
                    isActive
                      ? 'border-charcoal bg-white ring-2 ring-charcoal/25 shadow-md scale-[1.01]'
                      : 'border-stonewarm bg-white/80 hover:border-charcoal/40 hover:bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug">
                        {s.name}
                      </h4>
                      {isActive ? (
                        <span className="w-5 h-5 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-2xs shrink-0 mt-0.5">
                          ✓
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-stonewarm group-hover:border-charcoal/40 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted leading-relaxed line-clamp-3">
                      {s.note}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stonewarm/40 flex items-center justify-between text-[11px]">
                    <span className="text-muted tracking-wide uppercase font-medium">Hương chuẩn IFRA</span>
                    <span className={isActive ? 'font-bold text-terracotta' : 'text-muted group-hover:text-charcoal font-medium'}>
                      {isActive ? '● Đã chọn' : 'Chọn mùi này →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 6: ĐÓNG GÓI, NHÃN TÊN & SỐ LƯỢNG ================= */}
      {currentStep === 6 && (
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 border border-stonewarm shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Bước 6 trong 6
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal mt-1">
              Đóng gói, Cá nhân hóa &amp; Hoàn tất
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              Khắc nhãn tên riêng lên hũ nến và đính kèm thiệp viết tay hoàn toàn miễn phí.
            </p>
          </div>

          {/* Tùy chọn đóng gói với ảnh thật */}
          <div>
            <label className="text-xs uppercase tracking-wider text-muted font-semibold block mb-3">
              Tùy chọn đóng gói quà tặng
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JAR_PACKAGING_OPTIONS.map((pack) => {
                const isSelected = state.giftPackaging === pack.isGift;

                return (
                  <button
                    key={pack.name}
                    type="button"
                    onClick={() => handleToggleGift(pack.isGift)}
                    className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-charcoal bg-alabaster shadow-md ring-2 ring-charcoal/20'
                        : 'border-stonewarm bg-alabaster/60 hover:border-charcoal/40 hover:bg-white'
                    }`}
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-oat">
                      <img
                        src={pack.image}
                        alt={pack.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 font-semibold text-white text-xs drop-shadow-sm">
                        {pack.fee === 0 ? 'Miễn phí' : `+${formatVND(pack.fee)}`}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-charcoal text-alabaster flex items-center justify-center text-xs font-bold shadow-sm">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                      <h4 className="font-serif text-base font-bold text-charcoal group-hover:text-terracotta transition-colors">
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
          </div>

          {/* In nhãn tên & Viết thiệp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="jar-label-input" className="font-semibold text-charcoal">
                  In Nhãn Tên Riêng (Trên hũ nến)
                </label>
                <span className="text-sage font-bold">MIỄN PHÍ</span>
              </div>
              <input
                id="jar-label-input"
                type="text"
                value={state.labelText}
                onChange={handleLabelChange}
                maxLength={28}
                placeholder="VD: For My Beloved / Happy Birthday..."
                className="w-full bg-alabaster border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="jar-msg-input" className="font-semibold text-charcoal">
                  Lời nhắn viết tay đính kèm
                </label>
                <span className="text-sage font-bold">MIỄN PHÍ</span>
              </div>
              <input
                id="jar-msg-input"
                type="text"
                value={state.handwrittenMsg}
                onChange={handleMsgChange}
                placeholder="Nhập lời chúc bạn muốn shop ghi thiệp..."
                className="w-full bg-alabaster border border-stonewarm rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition"
              />
            </div>
          </div>

          {/* Chọn số lượng */}
          <QuantitySelector
            qty={state.qty}
            onChange={handleQtyChange}
            hint="Nhập số lượng sản phẩm bạn muốn đặt cho cấu hình nến này."
          />
        </div>
      )}

      {/* Step Navigation Controls (Back / Next / Add to Cart) */}
      <div className="bg-white/70 rounded-2xl p-4 sm:p-5 border border-stonewarm flex items-center justify-between gap-3 shadow-2xs">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-5 py-3 rounded-full border border-stonewarm text-xs sm:text-sm font-semibold text-charcoal hover:bg-oat transition cursor-pointer"
        >
          ← {currentStep === 2 ? 'Chọn dạng nến khác' : 'Quay lại'}
        </button>

        <div className="text-xs text-muted font-medium">
          Bước {currentStep} / {JAR_STEPS.length}
        </div>

        {currentStep < JAR_STEPS.length ? (
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
