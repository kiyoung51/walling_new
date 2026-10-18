/**
 * Recent Use Cases
 * Clean Architecture - Application Layer
 */
import { recentRepository } from '../../../infrastructure/repositories/RecentRepository.js';

export class GetRecentUseCase {
  constructor(repo = recentRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.getRecent();
  }
}

export class AddRecentUseCase {
  constructor(repo = recentRepository) {
    this.repo = repo;
  }

  execute(product) {
    return this.repo.add(product);
  }
}

export class RemoveRecentUseCase {
  constructor(repo = recentRepository) {
    this.repo = repo;
  }

  execute(productId) {
    return this.repo.remove(productId);
  }
}

export class ClearRecentUseCase {
  constructor(repo = recentRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.clear();
  }
}
