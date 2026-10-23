import type {
  CandleCategoryOption,
  ScentItem,
  JarVesselItem,
  ColorSwatch,
  TealightShapeItem,
  MoldShapeItem,
  JarCustomizationState,
  TealightCustomizationState,
  MoldCustomizationState,
} from '../types/candle';

// ================= DÒNG SẢN PHẨM (BƯỚC 1: CHỌN DẠNG NẾN) =================
export const CANDLE_CATEGORIES: CandleCategoryOption[] = [
  {
    id: 'jar',
    name: 'Nến Hũ Cao Cấp',
    tagline: 'Signature Scented Jar',
    desc: 'Chế tác trong cốc gốm xi măng, thủy tinh nút bần hoặc hộp thiếc. Dung tích từ 30ml đến 330ml.',
    priceFrom: 'Từ 69.000đ',
    badge: 'Bán chạy nhất',
    image: '/images/jars/frosted_glass.png',
  },
  {
    id: 'tealight',
    name: 'Nến Hũ Tealight',
    tagline: 'Aroma Petite Tealight',
    desc: 'Cốc nhựa trong suốt chịu nhiệt với 8 hình dáng đa dạng. Đốt trực tiếp hoặc dùng làm sáp thơm xông đèn.',
    priceFrom: 'Từ 49.000đ',
    badge: 'Giá sỉ từ 49k',
    image: 'https://images.pexels.com/photos/289756/pexels-photo-289756.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'mold',
    name: 'Nến Khuôn Nghệ Thuật',
    tagline: 'Sculptural Art Candle',
    desc: 'Điêu khắc tạo hình hoa cúc, mẫu đơn, gấu teddy, bươm bướm. Đóng gói hộp quà hoặc túi kiếng thắt nơ.',
    priceFrom: 'Từ 79.000đ',
    badge: 'Điêu khắc thủ công',
    image: '/images/molds/peony.png',
  },
  {
    id: 'custom_photo',
    name: 'Đặt Mẫu Theo Ảnh Riêng',
    tagline: 'Bespoke Custom Design',
    desc: 'Bạn đã có mẫu nến yêu thích trên Pinterest / Instagram? Tải ảnh lên để xưởng tư vấn báo giá ngay.',
    priceFrom: 'Báo giá theo ảnh',
    badge: 'Thiết kế riêng',
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=700&q=80',
  },
];

// ================= DANH MỤC 6 CHẤT LIỆU HŨ NẾN (ẢNH CHỤP CHÍNH XÁC) =================
export const JAR_VESSELS: JarVesselItem[] = [
  {
    id: 'cork_glass',
    name: 'Hũ Thủy Tinh Màu Nút Bần',
    desc: 'Nút bần gỗ mộc mạc, giữ hương thơm bền lâu trong không gian.',
    image: '/images/jars/cork_main.png',
    sizes: [
      { ml: '100ml', price: 139000 },
      { ml: '200ml', price: 229000 },
    ],
    colorType: 'Chọn màu vỏ cốc thủy tinh',
    colors: [
      { name: 'Trắng mờ', hex: '#EAE6DF', image: '/images/jars/cork_frosted.png' },
      { name: 'Đen nhám', hex: '#262626', image: '/images/jars/cork_black.png' },
      { name: 'Xanh lá cây', hex: '#3B5E4C', image: '/images/jars/cork_green.png' },
      { name: 'Trong suốt', hex: '#F4F4F2', image: '/images/jars/cork_clear.png' },
      { name: 'Nâu hổ phách', hex: '#7A4B2A', image: '/images/jars/cork_amber.png' },
    ],
  },
  {
    id: 'amber_alu',
    name: 'Hũ Thủy Tinh Nâu Nắp Nhôm',
    desc: 'Phong cách tiệm thuốc Apothecary cổ điển, thủy tinh nâu bảo vệ tinh dầu.',
    image: '/images/jars/amber_main.png',
    sizes: [
      { ml: '100ml', price: 149000 },
      { ml: '200ml', price: 239000 },
    ],
    colorType: null,
    colors: [{ name: 'Nâu nắp nhôm nguyên bản', hex: '#7A4B2A', image: '/images/jars/amber_open.png' }],
  },
  {
    id: 'tin_box',
    name: 'Hộp Thiếc',
    desc: 'Vỏ nhôm thiếc siêu nhẹ, bền bỉ chống va đập, nắp đậy kín giữ trọn hương thơm.',
    image: '/images/jars/tin_can.png',
    sizes: [
      { ml: '30ml', price: 69000 },
      { ml: '40ml', price: 79000 },
      { ml: '50ml', price: 89000 },
      { ml: '80ml', price: 119000 },
      { ml: '150ml', price: 189000 },
      { ml: '200ml', price: 229000 },
    ],
    colorType: null,
    colors: [{ name: 'Hộp thiếc nguyên bản', hex: '#D4D4D8', image: '/images/jars/tin_can.png' }],
  },
  {
    id: 'clear_glass',
    name: 'Cốc Thủy Tinh Trong Suốt',
    desc: 'Thấy rõ lớp sáp màu nghệ thuật bên trong khi ngọn lửa thắp sáng.',
    image: '/images/jars/clear_glass.png',
    sizes: [
      { ml: '70ml', price: 109000 },
      { ml: '100ml', price: 139000 },
      { ml: '200ml', price: 229000 },
      { ml: '250ml', price: 249000 },
      { ml: '280ml', price: 279000 },
      { ml: '330ml', price: 309000 },
    ],
    colorType: 'Chọn màu sáp nến bên trong cốc',
    colors: [
      { name: 'Sáp Trắng Kem', hex: '#FCFBF7' },
      { name: 'Sáp Xanh Pastel', hex: '#BFD8D2' },
      { name: 'Sáp Đỏ Rượu', hex: '#9E3B33' },
      { name: 'Sáp Tím Oải Hương', hex: '#C8B8DB' },
      { name: 'Sáp Hồng Phấn', hex: '#EED2CC' },
    ],
  },
  {
    id: 'frosted_glass',
    name: 'Cốc Thủy Tinh Đục (Frosted)',
    desc: 'Lớp kính mờ sang trọng, ánh nến xuyên qua mờ ảo, ấm áp dịu mắt.',
    image: '/images/jars/frosted_glass.png',
    sizes: [
      { ml: '50ml', price: 99000 },
      { ml: '100ml', price: 149000 },
      { ml: '150ml', price: 199000 },
      { ml: '200ml', price: 239000 },
      { ml: '300ml', price: 339000 },
    ],
    colorType: null,
    colors: [{ name: 'Trắng đục mờ (Frosted)', hex: '#EFECE6', image: '/images/jars/frosted_glass.png' }],
  },
  {
    id: 'cement_cup',
    name: 'Cốc Xi Măng Thủ Công',
    desc: 'Vẻ đẹp Wabi-sabi tối giản, bề mặt vân đá thô mộc độc bản từng cốc.',
    image: '/images/jars/cement_cup.png',
    sizes: [
      { ml: '120ml', price: 159000 },
      { ml: '220ml', price: 259000 },
    ],
    colorType: 'Chọn màu vỏ cốc xi măng',
    colors: [
      { name: 'Xám đen', hex: '#4A4C50', image: '/images/jars/cement_charcoal.png' },
      { name: 'Xi măng nguyên bản', hex: '#8C9194', image: '/images/jars/cement_raw.png' },
      { name: 'Trắng khoáng', hex: '#EBEBEB', image: '/images/jars/cement_white.png' },
      { name: 'Vàng bơ', hex: '#DFDC6F', image: '/images/jars/cement_yellow.png' },
      { name: 'Đỏ', hex: '#D22956', image: '/images/jars/cement_red.png' },
      { name: 'Xanh lá cây', hex: '#91CBBF', image: '/images/jars/cement_green.png' },
      { name: 'Xanh dương', hex: '#3B418E', image: '/images/jars/cement_blue.png' },
      { name: 'Hồng', hex: '#E4A9C1', image: '/images/jars/cement_pink.png' },
    ],
  },
];

// ================= DANH MỤC MÙI HƯƠNG (ẢNH NGUYÊN LIỆU THẬT) =================
export const SCENTS: ScentItem[] = [
  {
    id: 'wood_sage',
    name: 'Wood Sage & Sea Salt (Muối Biển & Xô Thơm)',
    note: 'Muối biển khoáng đạt, cây xô thơm thanh mát kết hợp nốt gỗ xạ hương mộc mạc, tự do.',
  },
  {
    id: 'coconut_lime',
    name: 'Coconut Lime Verbena (Chanh & Kem Dừa)',
    note: 'Hương chanh ngọt mát, tép cam quýt tươi hòa quyện lớp kem dừa nhiệt đới béo ngậy.',
  },
  {
    id: 'whitetea_ginger',
    name: 'White Tea & Ginger (Trà Trắng & Gừng)',
    note: 'Trà trắng thanh khiết, gừng ấm nồng kết hợp cam bergamot thảo mộc và nền gỗ trầm thư thái.',
  },
  {
    id: 'coffee_mocha',
    name: 'Coffee & Mocha (Cà Phê Rang & Mocha)',
    note: 'Hạt cà phê nguyên chất mới xay, đậm đà vị Espresso có đường và lớp kem mocha ngọt ngào ấm cúng.',
  },
  {
    id: 'green_tea',
    name: 'Green Tea & Bergamot (Trà Xanh & Hoa Trà)',
    note: 'Cam quýt xanh, cam bergamot, hoa hồng dịu nhẹ, hoa trà xanh thanh tao và xạ hương quả mọng.',
  },
  {
    id: 'cherry_blossom',
    name: 'Japanese Cherry Blossom (Hoa Anh Đào)',
    note: 'Cánh hoa anh đào Nhật Bản bung nở yêu kiều, hoa hồng ngọt ngào trên lớp nền gỗ xạ hương ấm áp.',
  },
  {
    id: 'bobbi_beach',
    name: 'Bobbi Brown Beach (Gió Biển Mùa Hè)',
    note: 'Hương hoa nhài xanh thanh khiết, hoa oải hương tươi mát cùng làn gió biển ngập tràn ánh nắng.',
  },
  {
    id: 'sandalwood',
    name: 'Sandalwood & Bergamot (Gỗ Đàn Hương)',
    note: 'Gỗ đàn hương quý phái, cam bergamot thảo dược cay nồng, hoa oải hương và xạ hương rêu rừng tĩnh tâm.',
  },
  {
    id: 'rose_vanilla',
    name: 'Rose Vanilla (Hoa Hồng & Vani Ngọt)',
    note: 'Hoa phong lữ tươi tắn, tép cam quýt mọng nước, hoa hồng nhung kiêu kỳ quyện cùng vani ngọt ngào.',
  },
  {
    id: 'blacktea_clove',
    name: 'Black Tea & Clove (Trà Đen & Đinh Hương)',
    note: 'Vị chanh ngọt sảng khoái, trà đen đậm đà ướp hoa oải hương kết hợp nốt gỗ đinh hương cay ấm sâu lắng.',
  },
  {
    id: 'jasmine_type',
    name: 'Jasmine Bloom (Hoa Nhài Non & Đàn Hương)',
    note: 'Cam bergamot tươi mát, hoa nhài non chớm nở thanh tao, đọng lại vị ngọt dịu của vani và gỗ đàn hương.',
  },
  {
    id: 'dark_musk',
    name: 'Dark Musk Fragrance (Xạ Hương Đen & Hoắc Hương)',
    note: 'Tầng hương phức hợp bí ẩn từ xạ hương đen, hoắc hương, nụ đinh hương, oải hương, hoa hồng và bạc hà the mát.',
  },
];

// ================= NẾN TEALIGHT (8 HÌNH DÁNG CÓ ẢNH THẬT) =================
export const TEALIGHT_SHAPES: TealightShapeItem[] = [
  {
    name: 'Hình Vuông',
    desc: 'Cạnh vuông vức hiện đại',
    image: '/images/tealight/square.png',
  },
  {
    name: 'Hình Tròn',
    desc: 'Tròn đều cổ điển thanh lịch',
    image: '/images/tealight/round.png',
  },
  {
    name: 'Trái Tim',
    desc: 'Tạo hình tình yêu ngọt ngào',
    image: '/images/tealight/heart.png',
  },
  {
    name: 'Bông Hoa',
    desc: 'Cánh hoa xòe mềm mại',
    image: '/images/tealight/flower.png',
  },
  {
    name: 'Cánh Bướm',
    desc: 'Đường nét bay bổng tinh tế',
    image: '/images/tealight/butterfly.png',
  },
  {
    name: 'Cây Thông',
    desc: 'Không khí lễ hội Noel ấm cúng',
    image: '/images/tealight/tree.png',
  },
  {
    name: 'Quả Chuông',
    desc: 'Dáng chuông Giáng sinh độc đáo',
    image: '/images/tealight/bell.png',
  },
  {
    name: 'Ngôi Sao',
    desc: 'Ánh sao 5 cánh lấp lánh',
    image: '/images/tealight/star.png',
  },
];

export const TEALIGHT_COLORS: ColorSwatch[] = [
  { name: 'Trắng Kem', hex: '#FCFBF7' },
  { name: 'Hồng Pastel', hex: '#EED2CC' },
  { name: 'Xanh Mint', hex: '#BFD8D2' },
  { name: 'Tím Lavender', hex: '#C8B8DB' },
  { name: 'Vàng Bơ', hex: '#F3E5AB' },
];

export const TEALIGHT_WICKS = [
  {
    type: 'Có bấc' as const,
    name: 'Có bấc (Đốt trực tiếp)',
    desc: 'Trang bị bấc cotton không khói truyền thống, thắp sáng lung linh bàn tiệc.',
    image: 'https://images.pexels.com/photos/289756/pexels-photo-289756.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    type: 'Không bấc' as const,
    name: 'Không bấc (Sáp thơm)',
    desc: 'Dạng sáp thơm nguyên khối dùng cho đèn đốt nến halogen hoặc để trong tủ đồ.',
    image: 'https://images.pexels.com/photos/8591648/pexels-photo-8591648.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// ================= NẾN KHUÔN NGHỆ THUẬT (7 MẪU ĐIÊU KHẮC CÓ ẢNH THẬT) =================
export const MOLD_SHAPES: MoldShapeItem[] = [
  {
    name: 'Hoa Cúc',
    price: 85000,
    desc: 'Từng cánh cúc nở rộ thanh nhã, nét điêu khắc sắc sảo.',
    image: '/images/molds/daisy.png',
  },
  {
    name: 'Hoa Mẫu Đơn',
    price: 95000,
    desc: 'Bông mẫu đơn xếp tầng quyền quý, biểu tượng của sự may mắn thịnh vượng.',
    image: '/images/molds/peony.png',
  },
  {
    name: 'Gấu Teddy',
    price: 95000,
    desc: 'Chú gấu bông đáng yêu thắt nơ xinh xắn, quà tặng sinh nhật được yêu thích.',
    image: '/images/molds/teddy.png',
  },
  {
    name: 'Bươm Bướm',
    price: 79000,
    desc: 'Cánh bướm mong manh đậu nhẹ, nét chạm khắc độc đáo giàu tính nghệ thuật.',
    image: '/images/molds/butterfly.png',
  },
];

// ================= QUY CÁCH ĐÓNG GÓI (ẢNH CHỤP THỰC TẾ) =================
export const JAR_PACKAGING_OPTIONS = [
  {
    isGift: false,
    name: 'Đóng gói tiêu chuẩn',
    fee: 0,
    desc: 'Gói giấy chống sốc và hộp carton Kraft bảo vệ chỉn chu, thân thiện môi trường.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
  },
  {
    isGift: true,
    name: 'Nâng cấp Hộp Quà Tặng',
    fee: 15000,
    desc: 'Hộp cứng thắt nơ lụa cao cấp, hoa khô trang trí & thiệp viết tay theo yêu cầu.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
  },
];

export const MOLD_PACKAGING_OPTIONS = [
  {
    id: 'Túi trong suốt & Ruy băng' as const,
    name: 'Túi trong suốt & Ruy băng',
    desc: 'Túi kiếng trong suốt tôn trọn vẻ đẹp điêu khắc của nến, thắt nơ ruy băng thủ công.',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Hộp giấy Kraft kèm giấy rơm' as const,
    name: 'Hộp giấy Kraft & Giấy rơm',
    desc: 'Hộp carton Kraft phong cách mộc mạc Vintage, lót giấy rơm màu êm ái chống sốc.',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
  },
];

// ================= GIÁ TRỊ KHỞI TẠO =================
export const INITIAL_JAR_STATE: JarCustomizationState = {
  vesselIndex: 0,
  sizeIndex: 0,
  colorIndex: 0,
  scentIndex: 1,
  giftPackaging: false,
  labelText: '',
  handwrittenMsg: '',
  qty: 1,
};

export const INITIAL_TEALIGHT_STATE: TealightCustomizationState = {
  shapeIndex: 0,
  wick: 'Có bấc',
  colorIndex: 0,
  scentIndex: 1,
  qty: 10,
};

export const INITIAL_MOLD_STATE: MoldCustomizationState = {
  shapeIndex: 0,
  scentIndex: 1,
  packaging: 'Túi trong suốt & Ruy băng',
  cardMsg: '',
  qty: 1,
};

// ================= HÀM TÍNH TOÁN =================
export const formatVND = (num: number): string => {
  return num.toLocaleString('vi-VN') + 'đ';
};

export const calculateJarPrice = (state: JarCustomizationState) => {
  const vessel = JAR_VESSELS[state.vesselIndex] || JAR_VESSELS[0];
  const sizeObj = vessel.sizes[state.sizeIndex] || vessel.sizes[0];
  const unitPrice = sizeObj.price;
  const extraFee = state.giftPackaging ? 15000 : 0;
  const total = unitPrice * Math.max(1, state.qty) + extraFee;
  return { unitPrice, extraFee, total };
};

export const calculateTealightPrice = (qty: number) => {
  const validQty = Math.max(1, qty);
  let unitPrice = 59000;
  if (validQty >= 50) {
    unitPrice = 49000;
  } else if (validQty >= 20) {
    unitPrice = 55000;
  }
  const regularTotal = 59000 * validQty;
  const total = unitPrice * validQty;
  const discountTotal = regularTotal - total;
  return { unitPrice, total, discountTotal };
};

export const calculateMoldPrice = (state: MoldCustomizationState) => {
  const mold = MOLD_SHAPES[state.shapeIndex] || MOLD_SHAPES[0];
  const unitPrice = mold.price;
  const total = unitPrice * Math.max(1, state.qty);
  return { unitPrice, total };
};
