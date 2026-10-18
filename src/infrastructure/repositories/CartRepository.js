/**
 * CartRepository
 * Clean Architecture - Infrastructure Layer
 */
import { CartItem } from '../../domain/entities/CartItem.js';
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

export class CartRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getItems() {
    const raw = this.storage.get(STORAGE_KEYS.CART, []);
    if (!Array.isArray(raw)) return [];
    return raw.map(item => new CartItem(item));
  }

  saveItems(items) {
    const serialized = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      priceText: item.priceText,
      image: item.image,
      option: item.option,
      qty: item.qty
    }));
    this.storage.set(STORAGE_KEYS.CART, serialized);
    eventBus.publish(APP_EVENTS.CART_UPDATED, items);
    return items;
  }

  clear() {
    this.storage.set(STORAGE_KEYS.CART, []);
    eventBus.publish(APP_EVENTS.CART_UPDATED, []);
    return [];
  }
}

export const cartRepository = new CartRepository();
