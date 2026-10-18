/**
 * RecentRepository
 * Clean Architecture - Infrastructure Layer
 */
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

export class RecentRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getRecent() {
    const list = this.storage.get(STORAGE_KEYS.RECENT, []);
    return Array.isArray(list) ? list : [];
  }

  add(product) {
    if (!product || !product.id) return this.getRecent();
    let list = this.getRecent();
    list = list.filter(item => item.id !== product.id);
    list.unshift({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      priceText: product.priceText || '0원',
      image: product.image,
      summary: product.summary || product.spec || '',
      viewedAt: Date.now()
    });
    if (list.length > 15) list = list.slice(0, 15);
    this.storage.set(STORAGE_KEYS.RECENT, list);
    eventBus.publish(APP_EVENTS.RECENT_UPDATED, list);
    return list;
  }

  remove(productId) {
    let list = this.getRecent();
    list = list.filter(item => item.id !== productId);
    this.storage.set(STORAGE_KEYS.RECENT, list);
    eventBus.publish(APP_EVENTS.RECENT_UPDATED, list);
    return list;
  }

  clear() {
    this.storage.set(STORAGE_KEYS.RECENT, []);
    eventBus.publish(APP_EVENTS.RECENT_UPDATED, []);
    return [];
  }
}

export const recentRepository = new RecentRepository();
