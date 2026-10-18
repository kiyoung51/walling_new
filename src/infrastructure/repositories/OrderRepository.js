/**
 * OrderRepository
 * Clean Architecture - Infrastructure Layer
 */
import { Order } from '../../domain/entities/Order.js';
import { STORAGE_KEYS, APP_EVENTS } from '../../domain/constants/AppConstants.js';
import { localStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { eventBus } from '../../core/EventBus.js';

const INITIAL_ORDERS = [
  {
    orderNo: 'BYK-20261018-84920',
    date: '2026-10-18 08:30',
    userName: '홍길동',
    phone: '010-1234-5678',
    status: '배송준비중',
    courier: 'CJ대한통운 (송장: 6842-9901-2831)',
    items: [
      {
        id: 'floor-682',
        name: 'KCC 숲 그린 1.8T 친환경 바닥재 장판 NP18-4123 샌디 워시오크',
        option: '[필수] 수량: 1롤 (35m)',
        price: 390000,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'tool-65',
        name: '정배솔 (270mm)',
        option: '[필수] 수량: 1개',
        price: 13000,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80'
      }
    ],
    deliveryFee: 0,
    totalPrice: 416000,
    address: '서울특별시 강남구 테헤란로 123 벽지왕아파트 101동 502호'
  }
];

export class OrderRepository {
  constructor(storage = localStorageAdapter) {
    this.storage = storage;
  }

  getAll() {
    const raw = this.storage.get(STORAGE_KEYS.ORDERS, null);
    if (!raw) {
      this.storage.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS.map(o => new Order(o));
    }
    return raw.map(o => new Order(o));
  }

  getOrders() {
    return this.getAll();
  }

  createOrder(orderData) {
    const orders = this.getAll();
    const order = new Order({
      orderNo: Order.generateOrderNo(),
      date: new Date().toLocaleString('ko-KR', { hour12: false }),
      userName: orderData.userName || '고객님',
      phone: orderData.phone || '010-0000-0000',
      status: '결제완료 (배송준비중)',
      courier: 'CJ대한통운 (출고 시 송장 발급 예정)',
      items: orderData.items || [],
      deliveryFee: orderData.deliveryFee || 0,
      totalPrice: orderData.totalPrice || 0,
      address: orderData.address || '서울시 강남구 테헤란로 (기본 배송지)'
    });

    const serialized = [
      order,
      ...orders
    ];
    this.storage.set(STORAGE_KEYS.ORDERS, serialized);
    eventBus.publish(APP_EVENTS.ORDERS_UPDATED, { action: 'create', order });
    return order;
  }

  findGuestOrder(name, orderNo) {
    const orders = this.getAll();
    const cleanName = (name || '').trim();
    const cleanNo = (orderNo || '').trim();
    return orders.find(o =>
      (cleanNo && o.orderNo.toLowerCase().includes(cleanNo.toLowerCase())) ||
      (cleanName && o.userName.includes(cleanName))
    ) || null;
  }

  updateStatus(orderNo, newStatus) {
    const orders = this.getAll();
    const order = orders.find(o => o.orderNo === orderNo);
    if (order) {
      order.status = newStatus;
      this.storage.set(STORAGE_KEYS.ORDERS, orders);
      eventBus.publish(APP_EVENTS.ORDERS_UPDATED, { action: 'status_update', orderNo, newStatus });
      return order;
    }
    return null;
  }
}

export const orderRepository = new OrderRepository();
