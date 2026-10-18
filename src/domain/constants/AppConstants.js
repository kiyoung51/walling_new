/**
 * 벽지왕 (BYEOKJIWANG) Domain Constants & Enumerations
 * Clean Architecture - Domain Layer
 */

export const STORAGE_KEYS = Object.freeze({
  USER: 'byk_user',
  CART: 'byk_cart',
  WISH: 'byk_wish',
  RECENT: 'byk_recent',
  ORDERS: 'byk_orders',
  PRODUCTS: 'byk_products'
});

export const APP_EVENTS = Object.freeze({
  STORAGE_UPDATE: 'byk_storage_update',
  AUTH_CHANGED: 'byk_auth_changed',
  CART_UPDATED: 'byk_cart_updated',
  WISH_UPDATED: 'byk_wish_updated',
  RECENT_UPDATED: 'byk_recent_updated',
  ORDERS_UPDATED: 'byk_orders_updated',
  PRODUCTS_UPDATED: 'byk_products_updated',
  NAVIGATE: 'byk_navigate'
});

export const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  BUSINESS: 'business',
  USER: 'user'
});

export const ORDER_STATUS = Object.freeze({
  PAID: '결제완료',
  PREPARING: '배송준비중',
  SHIPPED: '배송중',
  DELIVERED: '배송완료',
  CANCELLED: '주문취소'
});

export const PRODUCT_CATEGORIES = Object.freeze({
  SASH: 'KCC글라스(샷시)',
  FLOORING: 'KCC숲(장판)',
  WALLBOARD: '에디톤월',
  NARROW_PAPER: '소폭합지',
  WIDE_PAPER: '장폭합지',
  SILK_PAPER: '실크벽지',
  MICA_PAPER: '질석벽지',
  STICKER_PAPER: '접착식벽지',
  TOOLS: '도배용품'
});

export const DELIVERY_POLICY = Object.freeze({
  FREE_THRESHOLD: 50000,
  BASE_FEE: 3000
});
