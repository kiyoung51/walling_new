/**
 * WishRepository
 * Clean Architecture - Infrastructure Layer
 */
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

export class WishRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getWishlist() {
    const list = this.storage.get(STORAGE_KEYS.WISH, []);
    return Array.isArray(list) ? list : [];
  }

  toggle(productId) {
    const list = this.getWishlist();
    const index = list.indexOf(productId);
    let isAdded = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(productId);
      isAdded = true;
    }
    this.storage.set(STORAGE_KEYS.WISH, list);
    eventBus.publish(APP_EVENTS.WISH_UPDATED, { productId, isAdded, list });
    return isAdded;
  }

  has(productId) {
    return this.getWishlist().includes(productId);
  }
}

export const wishRepository = new WishRepository();
