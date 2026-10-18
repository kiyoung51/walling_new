/**
 * ProductRepository
 * Clean Architecture - Infrastructure Layer
 */
import { Product } from '../../domain/entities/Product.js';
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { ALL_PRODUCTS } from '../../data/byeokjiwang-catalog.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

export class ProductRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getAll() {
    const rawList = this.storage.get(STORAGE_KEYS.PRODUCTS, null);
    if (!rawList || !Array.isArray(rawList) || rawList.length === 0) {
      this.storage.set(STORAGE_KEYS.PRODUCTS, ALL_PRODUCTS);
      return ALL_PRODUCTS.map(p => new Product(p));
    }
    return rawList.map(p => new Product(p));
  }

  getById(id) {
    if (!id) return this.getAll()[0] || null;
    const query = String(id).trim().toLowerCase();
    const products = this.getAll();
    const exact = products.find(p => p.id.toLowerCase() === query);
    if (exact) return exact;
    const suffix = products.find(p => p.id.toLowerCase().endsWith(`-${query}`));
    if (suffix) return suffix;
    const partial = products.find(p => p.id.toLowerCase().includes(query));
    if (partial) return partial;

    // Fallback directly to ALL_PRODUCTS catalog
    const catalogMatch = ALL_PRODUCTS.find(p => p.id.toLowerCase() === query) ||
                         ALL_PRODUCTS.find(p => p.id.toLowerCase().endsWith(`-${query}`)) ||
                         ALL_PRODUCTS.find(p => p.id.toLowerCase().includes(query));
    if (catalogMatch) return new Product(catalogMatch);

    return products[0] || null;
  }

  getByCategory(categoryName) {
    if (!categoryName || categoryName === '전체') return this.getAll();
    return this.getAll().filter(p => p.matchesCategory(categoryName));
  }

  search(query) {
    if (!query) return this.getAll();
    return this.getAll().filter(p => p.matchesQuery(query));
  }

  save(productData) {
    const rawList = this.storage.get(STORAGE_KEYS.PRODUCTS, ALL_PRODUCTS);
    const existingIndex = rawList.findIndex(p => p.id === productData.id);

    const priceNum = Number(productData.price) || 0;
    const priceText = priceNum > 0 ? `${priceNum.toLocaleString()}원` : '견적상담';

    let options = ['기본 단품 주문'];
    if (Array.isArray(productData.options) && productData.options.length > 0) {
      options = productData.options;
    } else if (typeof productData.options === 'string' && productData.options.trim()) {
      options = productData.options.split('\n').map(s => s.trim()).filter(Boolean);
    }

    if (existingIndex > -1) {
      // Update existing
      const existing = rawList[existingIndex];
      const updated = {
        ...existing,
        ...productData,
        price: priceNum,
        priceText,
        options,
        updatedAt: Date.now()
      };
      rawList[existingIndex] = updated;
      this.storage.set(STORAGE_KEYS.PRODUCTS, rawList);
      eventBus.publish(APP_EVENTS.PRODUCTS_UPDATED, { action: 'update', product: updated });
      return new Product(updated);
    } else {
      // Create new
      const categoryKey = productData.categoryName === '에디톤월' ? 'wallboard' :
                          (productData.categoryName || '').includes('장판') ? 'floor' :
                          (productData.categoryName || '').includes('샷시') ? 'sash' :
                          (productData.categoryName || '').includes('도배용품') ? 'tool' : 'item';
      const id = productData.id || `${categoryKey}-${Date.now().toString().slice(-6)}`;

      const newProduct = {
        id,
        name: productData.name || '신규 등록 상품',
        categoryName: productData.categoryName || '에디톤월',
        price: priceNum,
        priceText,
        badge: productData.badge || 'NEW',
        summary: productData.summary || '벽지왕 관리자 등록 정품 인테리어 자재',
        spec: productData.spec || '규격 정보 참조',
        image: productData.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        options,
        deliveryFee: productData.deliveryFee || '3,000원 (50,000원 이상 구매 시 무료배송)',
        detailDesc: productData.detailDesc || `
          <h3>${productData.name}</h3>
          <p>${productData.summary || '친환경 인증 공정을 거친 벽지왕 정품 자재입니다.'}</p>
          <ul>
            <li>• 규격: ${productData.spec || '표준 규격'}</li>
            <li>• 품질보증 및 신속 출고 지원</li>
          </ul>
        `,
        createdAt: Date.now()
      };

      rawList.unshift(newProduct);
      this.storage.set(STORAGE_KEYS.PRODUCTS, rawList);
      eventBus.publish(APP_EVENTS.PRODUCTS_UPDATED, { action: 'add', product: newProduct });
      return new Product(newProduct);
    }
  }

  delete(id) {
    let rawList = this.storage.get(STORAGE_KEYS.PRODUCTS, ALL_PRODUCTS);
    const initialLen = rawList.length;
    rawList = rawList.filter(p => p.id !== id);
    if (rawList.length !== initialLen) {
      this.storage.set(STORAGE_KEYS.PRODUCTS, rawList);
      eventBus.publish(APP_EVENTS.PRODUCTS_UPDATED, { action: 'delete', id });
      return true;
    }
    return false;
  }

  resetToDefaults() {
    this.storage.set(STORAGE_KEYS.PRODUCTS, ALL_PRODUCTS);
    eventBus.publish(APP_EVENTS.PRODUCTS_UPDATED, { action: 'reset' });
    return ALL_PRODUCTS.map(p => new Product(p));
  }
}

export const productRepository = new ProductRepository();
