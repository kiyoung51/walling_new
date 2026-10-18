/**
 * CartItem Value Object
 * Clean Architecture - Domain Layer
 */

export class CartItem {
  constructor({
    id,
    name,
    price = 0,
    priceText = '0원',
    image = '',
    option = '기본 단품 주문',
    qty = 1
  }) {
    this.id = String(id);
    this.name = String(name || '상품');
    this.price = Number(price) || 0;
    this.priceText = String(priceText || (this.price > 0 ? `${this.price.toLocaleString()}원` : '견적상담'));
    this.image = String(image || '');
    this.option = String(option || '기본 단품 주문');
    this.qty = Math.max(1, Number(qty) || 1);
  }

  getSubtotal() {
    return this.price * this.qty;
  }

  getFormattedSubtotal() {
    return this.price > 0 ? `${this.getSubtotal().toLocaleString()}원` : '견적상담';
  }
}
