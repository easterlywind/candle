export type CandleCategory = 'jar' | 'tealight' | 'mold' | 'custom_photo';

// ================= DÒNG SẢN PHẨM (CANDLE CATEGORY) =================
export interface CandleCategoryOption {
  id: CandleCategory;
  name: string;
  tagline: string;
  desc: string;
  priceFrom: string;
  image: string;
  badge?: string;
}

// ================= MÙI HƯƠNG =================
export interface ScentItem {
  id: string;
  name: string;
  note: string;
  image?: string;
}

// ================= NẾN HŨ =================
export interface JarSizeOption {
  ml: string;
  price: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  image?: string;
}

export interface JarVesselItem {
  id: string;
  name: string;
  desc: string;
  sizes: JarSizeOption[];
  colorType: string | null;
  colors: ColorSwatch[];
  image: string;
}

export interface JarCustomizationState {
  vesselIndex: number;
  sizeIndex: number;
  colorIndex: number;
  scentIndex: number;
  giftPackaging: boolean;
  labelText: string;
  handwrittenMsg: string;
  qty: number;
}

// ================= NẾN TEALIGHT =================
export type TealightWickType = 'Có bấc' | 'Không bấc';

export interface TealightShapeItem {
  name: string;
  image: string;
  desc: string;
}

export interface TealightCustomizationState {
  shapeIndex: number;
  wick: TealightWickType;
  colorIndex: number;
  scentIndex: number;
  qty: number;
}

// ================= NẾN KHUÔN =================
export interface MoldShapeItem {
  name: string;
  price: number;
  desc: string;
  image: string;
}

export type MoldPackagingType = 'Túi trong suốt & Ruy băng' | 'Hộp giấy Kraft kèm giấy rơm';

export interface MoldCustomizationState {
  shapeIndex: number;
  scentIndex: number;
  packaging: MoldPackagingType;
  cardMsg: string;
  qty: number;
}

// ================= GIỎ HÀNG (CART ITEM) =================
export interface CartItem {
  id: string;
  category: CandleCategory;
  title: string;
  subtitle: string;
  specs: string;
  note?: string;
  unitPrice: number;
  qty: number;
  total: number;
  image?: string;
}

// ================= CUSTOM PHOTO ORDER =================
export interface CustomPhotoOrder {
  name: string;
  phone: string;
  qty: number;
  neededDate: string;
  note: string;
  imageFile?: File | null;
  imagePreviewUrl?: string;
}

// ================= CHECKOUT / ORDER =================
export type PaymentMethod = 'vietqr' | 'cod';

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
}
