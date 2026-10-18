/**
 * Cart Use Cases
 * Clean Architecture - Application Layer
 */
import { cartRepository } from '../../../infrastructure/repositories/CartRepository.js';
import { CartItem } from '../../../domain/entities/CartItem.js';
import { DELIVERY_POLICY } from '../../../domain/constants/AppConstants.js';

export class GetCartUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getItems();
  }
}

export class AddToCartUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute(product, optionText = '기본 옵션', qty = 1) {
    const items = [...this.repo.getItems()];
    const existingIndex = items.findIndex(item => item.id === product.id && item.option === optionText);

    if (existingIndex > -1) {
      items[existingIndex].qty += qty;
    } else {
      items.push(new CartItem({
        id: product.id,
        name: product.name,
        price: product.price || 0,
        priceText: product.priceText || '0원',
        image: product.image,
        option: optionText,
        qty: qty
      }));
    }

    return this.repo.saveItems(items);
  }
}

export class UpdateCartQtyUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute(index, qty) {
    const items = [...this.repo.getItems()];
    if (items[index]) {
      if (qty <= 0) {
        items.splice(index, 1);
      } else {
        items[index].qty = qty;
      }
      return this.repo.saveItems(items);
    }
    return items;
  }
}

export class RemoveCartItemUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute(index) {
    const items = [...this.repo.getItems()];
    items.splice(index, 1);
    return this.repo.saveItems(items);
  }
}

export class ClearCartUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.clear();
  }
}

export class GetCartSummaryUseCase {
  constructor(repo = cartRepository) {
    this.repo = repo;
  }

  execute() {
    const items = this.repo.getItems();
    const subtotal = items.reduce((sum, item) => sum + item.getSubtotal(), 0);
    const count = items.reduce((sum, item) => sum + item.qty, 0);

    const deliveryFee = subtotal === 0 ? 0 : (subtotal >= DELIVERY_POLICY.FREE_THRESHOLD ? 0 : DELIVERY_POLICY.BASE_FEE);
    const total = subtotal + deliveryFee;
    const freeShippingRemaining = Math.max(0, DELIVERY_POLICY.FREE_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / DELIVERY_POLICY.FREE_THRESHOLD) * 100));

    return {
      subtotal,
      deliveryFee,
      total,
      count,
      freeShippingRemaining,
      freeShippingProgress
    };
  }
}
