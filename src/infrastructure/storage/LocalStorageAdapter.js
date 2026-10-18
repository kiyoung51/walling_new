/**
 * LocalStorageAdapter
 * Clean Architecture - Infrastructure Layer
 * Safe wrapper around browser localStorage with Event notification
 */
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { eventBus } from '../../core/EventBus.js';

export class LocalStorageAdapter {
  constructor() {
    this.isAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  get(key, defaultValue = null) {
    if (!this.isAvailable) return defaultValue;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null || raw === undefined) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.error(`[LocalStorageAdapter] Error reading key "${key}":`, e);
      return defaultValue;
    }
  }

  set(key, value) {
    if (!this.isAvailable) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      // Notify via EventBus and window CustomEvent for maximum backwards compatibility
      eventBus.publish(APP_EVENTS.STORAGE_UPDATE, { key, value });
      window.dispatchEvent(new CustomEvent('byk_storage_update', { detail: { key, val: value } }));
      return true;
    } catch (e) {
      console.error(`[LocalStorageAdapter] Error writing key "${key}":`, e);
      return false;
    }
  }

  remove(key) {
    if (!this.isAvailable) return false;
    try {
      window.localStorage.removeItem(key);
      eventBus.publish(APP_EVENTS.STORAGE_UPDATE, { key, value: null });
      window.dispatchEvent(new CustomEvent('byk_storage_update', { detail: { key, val: null } }));
      return true;
    } catch (e) {
      console.error(`[LocalStorageAdapter] Error removing key "${key}":`, e);
      return false;
    }
  }

  clear() {
    if (!this.isAvailable) return false;
    try {
      window.localStorage.clear();
      return true;
    } catch (e) {
      console.error('[LocalStorageAdapter] Error clearing storage:', e);
      return false;
    }
  }
}

export const localStorageAdapter = new LocalStorageAdapter();
