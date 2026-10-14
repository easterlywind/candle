# 🕯️ L'Atelier de Bougie — Xưởng Nến Thơm Thủ Công Theo Yêu Cầu

Ứng dụng web đặt nến thơm may đo cá nhân hóa theo từng bước (Step-by-Step Guided Wizard), hỗ trợ ảnh minh họa thực tế cho mọi lựa chọn, giỏ hàng trực quan, thanh toán chuyển khoản VietQR tự động và đẩy đơn hàng về Telegram Bot.

---

## ✨ Điểm Nổi Bật

1. **Luồng Đặt Hàng Từng Bước (Progressive Guided Wizard)**:
   - **Bước 1 — Chọn dạng nến**: 4 dòng sản phẩm chính có ảnh chụp thực tế:
     - 🕯️ *Nến Hũ Cao Cấp* (6 chất liệu vỏ: Nút bần, Nắp nhôm, Hộp thiếc, Thủy tinh trong, Thủy tinh đục, Cốc xi măng Wabi-sabi)
     - ✨ *Nến Hũ Tealight* (8 hình dáng cốc trong suốt, có bấc / không bấc, bảng giá sỉ tự động từ 20-50 cái)
     - 🌸 *Nến Khuôn Nghệ Thuật* (7 mẫu điêu khắc thủ công: Hoa cúc, Mẫu đơn, Tulip, Trái tim, Rubik, Gấu teddy, Bươm bướm)
     - 📸 *Đặt Mẫu Theo Ảnh Riêng* (Gửi ảnh mẫu từ Pinterest/Instagram để xưởng tư vấn báo giá)
   - **Bước 2..N — Tùy chỉnh chi tiết**: Chất liệu hũ, dung tích (30ml - 330ml), màu sắc vỏ/sáp, 6 nốt hương IFRA, đóng gói hộp quà nơ lụa hoa khô, in nhãn tên riêng miễn phí và số lượng.

2. **Ảnh Minh Họa Thực Tế Cho Mọi Option**:
   - Mỗi chất liệu hũ, cốc tealight, khuôn nến, nốt hương thảo mộc và quy cách đóng gói đều có ảnh chụp thực tế rõ nét.
   - Thao tác chọn trực quan, không bắt người dùng phải cuộn trang dài.

3. **Giỏ Hàng & Thanh Toán VietQR Tự Động**:
   - Giỏ hàng slide-over drawer quản lý nhiều cấu hình nến, thay đổi số lượng, tính tổng tiền.
   - Modal chốt đơn tích hợp sinh mã **VietQR** chuẩn Napas 247 (ngân hàng MB, số tài khoản, số tiền và nội dung chuyển khoản tự động).
   - Tích hợp gửi dữ liệu đơn hàng về **Telegram Bot API** hoặc mở app Telegram với nội dung soạn sẵn.

4. **Tối Ưu 100% Giao Diện Di Động & Máy Tính**:
   - Desktop: Khung thẻ ảnh lưới 2-3 cột cân đối, thanh tiến trình bước rõ ràng.
   - Mobile: Các bước hiển thị gọn gàng trong khung nhìn màn hình, thanh cố định đáy hiển thị tạm tính và nút thêm giỏ hàng nhanh.

---

## 🛠️ Công Nghệ Sử Dụng

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@theme` tokens: Cormorant Garamond, Plus Jakarta Sans, alabaster, oat, terracotta, charcoal)
- **Canvas Confetti**
- **GitHub CLI** / **Telegram Bot API** / **VietQR API**

---

## 🚀 Khởi Chạy Dự Án (Local Development)

```bash
# Cài đặt thư viện
npm install

# Khởi chạy server dev (mở mạng LAN để test trên điện thoại)
npm run dev -- --host
```

- Truy cập máy tính: `http://localhost:5173/`
- Truy cập điện thoại cùng mạng Wi-Fi: `http://<dia-chi-ip-lan>:5173/`

---

## 📦 Build Production

```bash
npm run build
```
Mã nguồn được biên dịch tối ưu vào thư mục `dist/`.
