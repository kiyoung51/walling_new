/**
 * Wish Use Cases
 * Clean Architecture - Application Layer
 */
import { wishRepository } from '../../../infrastructure/repositories/WishRepository.js';

export class GetWishlistUseCase {
  constructor(repo = wishRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getWishlist();
  }
}

export class ToggleWishUseCase {
  constructor(repo = wishRepository) {
    this.repo = repo;
  }

  execute(productId) {
    return this.repo.toggle(productId);
  }
}

export class CheckWishUseCase {
  constructor(repo = wishRepository) {
    this.repo = repo;
  }

  execute(productId) {
    return this.repo.has(productId);
  }
}
