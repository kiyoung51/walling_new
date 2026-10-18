/**
 * Order Use Cases
 * Clean Architecture - Application Layer
 */
import { orderRepository } from '../../../infrastructure/repositories/OrderRepository.js';

export class GetOrdersUseCase {
  constructor(repo = orderRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getAll();
  }
}

export class CreateOrderUseCase {
  constructor(repo = orderRepository) {
    this.repo = repo;
  }

  execute(orderData) {
    return this.repo.createOrder(orderData);
  }
}

export class UpdateOrderStatusUseCase {
  constructor(repo = orderRepository) {
    this.repo = repo;
  }

  execute(orderNo, newStatus) {
    return this.repo.updateStatus(orderNo, newStatus);
  }
}

export class LookupGuestOrderUseCase {
  constructor(repo = orderRepository) {
    this.repo = repo;
  }

  execute(name, orderNo) {
    return this.repo.findGuestOrder(name, orderNo);
  }
}
