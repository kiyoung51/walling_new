/**
 * UserRepository
 * Clean Architecture - Infrastructure Layer
 */
import { User } from '../../domain/entities/User.js';
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

export class UserRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getCurrentUser() {
    const raw = this.storage.get(STORAGE_KEYS.USER, null);
    if (!raw) return null;
    return new User(raw);
  }

  save(userData) {
    const user = userData instanceof User ? userData : new User(userData);
    this.storage.set(STORAGE_KEYS.USER, {
      userId: user.userId,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
      point: user.point,
      coupons: user.coupons,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    eventBus.publish(APP_EVENTS.AUTH_CHANGED, user);
    return user;
  }

  remove() {
    this.storage.remove(STORAGE_KEYS.USER);
    eventBus.publish(APP_EVENTS.AUTH_CHANGED, null);
    return true;
  }
}

export const userRepository = new UserRepository();
