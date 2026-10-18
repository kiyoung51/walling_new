// CART & QUOTE SYSTEM (장바구니 및 맞춤 견적서 시스템)

export class CartManager {
  constructor(renderCallback) {
    this.renderCallback = renderCallback;
    this.storageKey = 'wallking_cart_v1';
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
    if (this.renderCallback) this.renderCallback(this);
  }

  addItem(product, quantity = 1, customNote = '') {
    const existing = this.items.find(i => i.id === product.id && i.note === customNote);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        categoryName: product.categoryName,
        price: product.price,
        unit: product.unit,
        quantity: quantity,
        note: customNote,
        color: product.color || '#EEE'
      });
    }
    this.saveCart();
  }

  updateQuantity(id, note, quantity) {
    const item = this.items.find(i => i.id === id && i.note === note);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  removeItem(id, note) {
    this.items = this.items.filter(i => !(i.id === id && i.note === note));
    this.saveCart();
  }

  clear() {
    this.items = [];
    this.saveCart();
  }

  getSummary() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 벽지와 공구를 함께 사면 공구 10% 패키지 할인
    const hasWallpaper = this.items.some(i => ['pasted', 'silk', 'wide', 'narrow'].includes(i.category));
    const toolItems = this.items.filter(i => i.category === 'tools');
    let packageDiscount = 0;
    if (hasWallpaper && toolItems.length > 0) {
      const toolSubtotal = toolItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      packageDiscount = Math.round(toolSubtotal * 0.1);
    }

    // 5만 원 이상 무료배송 (미만 시 3,000원)
    const shippingFee = (subtotal === 0 || subtotal >= 50000) ? 0 : 3000;
    const total = Math.max(0, subtotal - packageDiscount + shippingFee);

    return {
      itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      packageDiscount,
      shippingFee,
      total,
      freeShippingThreshold: 50000,
      remainingForFreeShipping: Math.max(0, 50000 - subtotal)
    };
  }

  // 카카오톡/문자 공유용 텍스트 견적서 포맷팅
  generateQuoteText() {
    const summary = this.getSummary();
    const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let text = `[WALLKING] 월킹 셀프도배 견적서 (${date})\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    this.items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name}\n`;
      text += `   - 수량: ${item.quantity}개 / 금액: ${(item.price * item.quantity).toLocaleString()}원\n`;
      if (item.note) text += `   - 참고: ${item.note}\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `상품 합계: ${summary.subtotal.toLocaleString()}원\n`;
    if (summary.packageDiscount > 0) {
      text += `셀프도배 올인원 세트 할인: -${summary.packageDiscount.toLocaleString()}원\n`;
    }
    text += `배송비: ${summary.shippingFee === 0 ? '무료 (5만원 이상)' : summary.shippingFee.toLocaleString() + '원'}\n`;
    text += `최종 예상 견적: ${summary.total.toLocaleString()}원\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `* 오후 2시 이전 주문 시 오늘 즉시 발송됩니다.`;

    return text;
  }
}
