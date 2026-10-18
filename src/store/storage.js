/**
 * Backward-Compatibility Facade
 * Delegates legacy storage interface to the Clean Architecture Repositories & Use Cases.
 */
import {
  productRepository,
  userRepository,
  cartRepository,
  orderRepository,
  wishRepository,
  recentRepository
} from '../infrastructure/index.js';

import { useCases } from '../application/index.js';

export const authStore = {
  getUser() {
    return userRepository.getCurrentUser();
  },
  isAdmin() {
    const user = this.getUser();
    return user ? user.isAdministrator() : false;
  },
  login(userId, password) {
    return useCases.login.execute(userId, password);
  },
  signup(userData) {
    return useCases.signup.execute(userData);
  },
  logout() {
    return useCases.logout.execute();
  }
};

export const cartStore = {
  getCart() {
    return cartRepository.getItems();
  },
  addItem(product, optionText = '기본 옵션', qty = 1) {
    return useCases.addToCart.execute(product, optionText, qty);
  },
  updateQty(index, qty) {
    return useCases.updateCartQty.execute(index, qty);
  },
  removeItem(index) {
    return useCases.removeCartItem.execute(index);
  },
  clear() {
    return useCases.clearCart.execute();
  },
  getSummary() {
    return useCases.getCartSummary.execute();
  }
};

export const wishStore = {
  getWishlist() {
    return wishRepository.getWishlist();
  },
  toggle(productId) {
    return useCases.toggleWish.execute(productId);
  },
  has(productId) {
    return useCases.checkWish.execute(productId);
  }
};

export const recentStore = {
  getRecent() {
    return recentRepository.getRecent();
  },
  add(product) {
    return useCases.addRecent.execute(product);
  },
  remove(productId) {
    return useCases.removeRecent.execute(productId);
  },
  clear() {
    return useCases.clearRecent.execute();
  }
};

export const orderStore = {
  getOrders() {
    return orderRepository.getAll();
  },
  getAll() {
    return this.getOrders();
  },
  createOrder(orderData) {
    return useCases.createOrder.execute(orderData);
  },
  findGuestOrder(name, orderNo) {
    return useCases.lookupGuestOrder.execute(name, orderNo);
  },
  updateStatus(orderNo, newStatus) {
    return useCases.updateOrderStatus.execute(orderNo, newStatus);
  }
};

export const productStore = {
  getProducts() {
    return productRepository.getAll();
  },
  getAll() {
    return this.getProducts();
  },
  getById(id) {
    return productRepository.getById(id);
  },
  getByCategory(categoryName) {
    return productRepository.getByCategory(categoryName);
  },
  add(productData) {
    return useCases.addProduct.execute(productData);
  },
  update(id, updatedFields) {
    return useCases.updateProduct.execute(id, updatedFields);
  },
  delete(id) {
    return useCases.deleteProduct.execute(id);
  },
  resetToDefaults() {
    return useCases.resetProducts.execute();
  }
};
