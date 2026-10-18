import React, { useState } from 'react';
import type {
  CandleCategory,
  JarCustomizationState,
  TealightCustomizationState,
  MoldCustomizationState,
  CustomPhotoOrder,
  CartItem,
} from './types/candle';
import {
  JAR_VESSELS,
  SCENTS,
  TEALIGHT_SHAPES,
  TEALIGHT_COLORS,
  MOLD_SHAPES,
  INITIAL_JAR_STATE,
  INITIAL_TEALIGHT_STATE,
  INITIAL_MOLD_STATE,
  calculateJarPrice,
  calculateTealightPrice,
  calculateMoldPrice,
} from './data/candleData';
import { Header } from './components/Header';
import { CategoryStep } from './components/CategoryStep';
import { JarStudio } from './components/JarStudio';
import { TealightStudio } from './components/TealightStudio';
import { MoldStudio } from './components/MoldStudio';
import { CustomPhotoSection } from './components/CustomPhotoSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Step 1: Chọn dạng nến
  const [category, setCategory] = useState<CandleCategory>('jar');
  const [isSelectingCategory, setIsSelectingCategory] = useState<boolean>(true);

  // Customization states
  const [jarState, setJarState] = useState<JarCustomizationState>(INITIAL_JAR_STATE);
  const [tealightState, setTealightState] = useState<TealightCustomizationState>(INITIAL_TEALIGHT_STATE);
  const [moldState, setMoldState] = useState<MoldCustomizationState>(INITIAL_MOLD_STATE);

  // Custom Photo Order state
  const [customPhotoOrder, setCustomPhotoOrder] = useState<CustomPhotoOrder>({
    name: '',
    phone: '',
    qty: 1,
    neededDate: '',
    note: '',
  });

  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBackToCategory = () => {
    setIsSelectingCategory(true);
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate live total price for Mobile Quick Bar
  let currentTotalPrice = 0;
  if (category === 'jar') {
    currentTotalPrice = calculateJarPrice(jarState).total;
  } else if (category === 'tealight') {
    currentTotalPrice = calculateTealightPrice(tealightState.qty).total;
  } else if (category === 'mold') {
    currentTotalPrice = calculateMoldPrice(moldState).total;
  }

  // Add configured candle to Cart
  const handleAddToCart = () => {
    let title = '';
    let subtitle = '';
    let specs = '';
    let note = '';
    let unitPrice = 0;
    let qty = 1;
    let total = 0;
    let image = '';

    if (category === 'jar') {
      const vessel = JAR_VESSELS[jarState.vesselIndex] || JAR_VESSELS[0];
      const sizeObj = vessel.sizes[jarState.sizeIndex] || vessel.sizes[0];
      const colorObj = vessel.colors[jarState.colorIndex] || vessel.colors[0];
      const scentObj = SCENTS[jarState.scentIndex] || SCENTS[0];
      const pricing = calculateJarPrice(jarState);

      title = `${vessel.name} (${sizeObj.ml})`;
      subtitle = 'Nến Hũ Cao Cấp';
      specs = `${colorObj.name} · ${scentObj.name} · ${jarState.giftPackaging ? 'Hộp quà & Hoa khô' : 'Hộp tiêu chuẩn'}`;
      unitPrice = pricing.unitPrice;
      qty = jarState.qty;
      total = pricing.total;
      image = colorObj.image || vessel.image;

      const parts = [];
      if (jarState.labelText.trim()) parts.push(`Nhãn tên: "${jarState.labelText.trim()}"`);
      if (jarState.handwrittenMsg.trim()) parts.push(`Thiệp viết tay: "${jarState.handwrittenMsg.trim()}"`);
      note = parts.join(' | ');
    } else if (category === 'tealight') {
      const shape = TEALIGHT_SHAPES[tealightState.shapeIndex] || TEALIGHT_SHAPES[0];
      const colorObj = TEALIGHT_COLORS[tealightState.colorIndex] || TEALIGHT_COLORS[0];
      const scentObj = SCENTS[tealightState.scentIndex] || SCENTS[0];
      const pricing = calculateTealightPrice(tealightState.qty);

      title = `Tealight cốc trong suốt (${shape.name})`;
      subtitle = 'Nến Hũ Tealight';
      specs = `Sáp ${colorObj.name} · ${tealightState.wick} · ${scentObj.name}`;
      unitPrice = pricing.unitPrice;
      qty = tealightState.qty;
      total = pricing.total;
      image = shape.image;
    } else if (category === 'mold') {
      const mold = MOLD_SHAPES[moldState.shapeIndex] || MOLD_SHAPES[0];
      const scentObj = SCENTS[moldState.scentIndex] || SCENTS[0];
      const pricing = calculateMoldPrice(moldState);

      title = `Khuôn ${mold.name}`;
      subtitle = 'Nến Khuôn Nghệ Thuật';
      specs = `Tạo hình điêu khắc · ${scentObj.name} · ${moldState.packaging}`;
      unitPrice = pricing.unitPrice;
      qty = moldState.qty;
      total = pricing.total;
      image = mold.image;

      if (moldState.cardMsg.trim()) {
        note = `Lời nhắn thiệp: "${moldState.cardMsg.trim()}"`;
      }
    }

    const newItem: CartItem = {
      id: `ITEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      category,
      title,
      subtitle,
      specs,
      note: note || undefined,
      unitPrice,
      qty,
      total,
      image,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          let newTotal = item.unitPrice * newQty;
          if (item.category === 'tealight') {
            newTotal = calculateTealightPrice(newQty).total;
          }
          return {
            ...item,
            qty: newQty,
            total: newTotal,
          };
        }
        return item;
      })
    );
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-alabaster text-charcoal font-sans flex flex-col selection:bg-charcoal selection:text-alabaster">
      {/* Top Header & Navigation */}
      <Header
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onResetToStart={() => setIsSelectingCategory(true)}
      />

      {/* MAIN STEP-BY-STEP STUDIO WIZARD (CENTERED, CLEAN, IMAGE-DRIVEN) */}
      <main id="studio" className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="space-y-6">
          {/* STEP 1: CHỌN DẠNG NẾN (CANDLE TYPE SELECTION) */}
          {isSelectingCategory ? (
            <CategoryStep
              selectedCategory={category}
              onSelectCategory={(cat) => setCategory(cat)}
              onNext={() => setIsSelectingCategory(false)}
            />
          ) : (
            <>
              {/* SUBSEQUENT STEPS FOR CHOSEN CANDLE TYPE */}
              {category === 'jar' && (
                <JarStudio
                  state={jarState}
                  onChange={setJarState}
                  onAddToCart={handleAddToCart}
                  onBackToCategory={handleBackToCategory}
                />
              )}

              {category === 'tealight' && (
                <TealightStudio
                  state={tealightState}
                  onChange={setTealightState}
                  onAddToCart={handleAddToCart}
                  onBackToCategory={handleBackToCategory}
                />
              )}

              {category === 'mold' && (
                <MoldStudio
                  state={moldState}
                  onChange={setMoldState}
                  onAddToCart={handleAddToCart}
                  onBackToCategory={handleBackToCategory}
                />
              )}

              {category === 'custom_photo' && (
                <CustomPhotoSection
                  order={customPhotoOrder}
                  onChange={setCustomPhotoOrder}
                  onBackToCategory={handleBackToCategory}
                />
              )}
            </>
          )}
        </div>
      </main>


      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQty={handleUpdateCartQty}
        onStartCheckout={handleStartCheckout}
      />

      {/* Checkout Modal with VietQR & Telegram */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Mobile Sticky Quick Bar (khi không ở bước Custom Photo) */}
      {!isSelectingCategory && category !== 'custom_photo' && (
        <MobileQuickBar
          totalPrice={currentTotalPrice}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default App;
