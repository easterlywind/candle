import React from 'react';
import { STORE_CONFIG } from '../services/telegramService';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-alabaster border-t border-stonewarm py-12 text-center text-xs text-muted">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        <p className="font-serif text-2xl text-charcoal font-semibold tracking-tight">
          L’ATELIER DE BOUGIE
        </p>
        <p className="max-w-md mx-auto text-muted leading-relaxed">
          Xưởng nến thơm cá nhân hóa theo yêu cầu · Chế tác thủ công từng mẻ nhỏ từ sáp đậu nành &amp; tinh dầu IFRA nguyên bản.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-medium text-charcoal">
          <span>Hotline: {STORE_CONFIG.hotline}</span>
          <span>•</span>
          <span>Telegram: @{STORE_CONFIG.shopTelegramUsername}</span>
          <span>•</span>
          <span>Giao hàng toàn quốc</span>
        </div>
        <p className="pt-3 text-[11px] text-muted">
          © 2026 L’Atelier Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
