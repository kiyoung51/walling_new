/**
 * Order Entity
 * Clean Architecture - Domain Layer
 */
import { ORDER_STATUS } from '../constants/AppConstants.js';

export class Order {
  constructor({
    orderNo,
    date,
    userName = '고객님',
    phone = '010-0000-0000',
    status = ORDER_STATUS.PAID,
    courier = 'CJ대한통운 (출고 시 송장 발급 예정)',
    items = [],
    deliveryFee = 0,
    totalPrice = 0,
    address = '서울시 강남구'
  }) {
    this.orderNo = orderNo || Order.generateOrderNo();
    this.date = date || new Date().toLocaleString('ko-KR', { hour12: false });
    this.userName = String(userName || '고객님');
    this.phone = String(phone || '010-0000-0000');
    this.status = String(status || ORDER_STATUS.PAID);
    this.courier = String(courier);
    this.items = Array.isArray(items) ? items : [];
    this.deliveryFee = Number(deliveryFee) || 0;
    this.totalPrice = Number(totalPrice) || 0;
    this.address = String(address);
  }

  static generateOrderNo() {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `BYK-${today}-${rand}`;
  }

  getFormattedTotal() {
    return `${this.totalPrice.toLocaleString()}원`;
  }
}
