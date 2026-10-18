/**
 * Product Entity
 * Clean Architecture - Domain Layer
 */

export class Product {
  constructor({
    id,
    name,
    categoryName,
    price = 0,
    priceText = '',
    spec = '',
    summary = '',
    badge = '',
    image = '',
    options = [],
    deliveryInfo = '3,000원 (50,000원 이상 무료배송)',
    description = ''
  }) {
    this.id = String(id || `item-${Date.now().toString().slice(-6)}`);
    this.name = String(name || '정품 인테리어 자재');
    this.categoryName = String(categoryName || '에디톤월');
    this.price = Number(price) || 0;
    this.priceText = priceText || (this.price > 0 ? `${this.price.toLocaleString()}원` : '견적상담');
    this.spec = String(spec || '');
    this.summary = String(summary || '');
    this.badge = String(badge || '');
    this.image = String(image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
    this.options = Array.isArray(options) ? options : (typeof options === 'string' ? options.split('\n').filter(Boolean) : ['기본 단품 주문']);
    this.deliveryInfo = String(deliveryInfo || '3,000원 (50,000원 이상 무료배송)');
    this.description = String(description || `<p>${this.name} 상품 설명입니다.</p>`);
  }

  isEstimateOnly() {
    return this.price <= 0 || this.priceText === '견적상담';
  }

  getFormattedPrice() {
    return this.isEstimateOnly() ? '견적상담' : `${this.price.toLocaleString()}원`;
  }

  matchesQuery(query) {
    if (!query) return true;
    const q = String(query).toLowerCase().trim();
    return (
      this.name.toLowerCase().includes(q) ||
      this.id.toLowerCase().includes(q) ||
      this.categoryName.toLowerCase().includes(q) ||
      this.spec.toLowerCase().includes(q) ||
      this.summary.toLowerCase().includes(q)
    );
  }

  matchesCategory(category) {
    if (!category || category === '전체') return true;
    return this.categoryName === category;
  }
}
