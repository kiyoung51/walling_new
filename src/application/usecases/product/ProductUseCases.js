/**
 * Product Use Cases
 * Clean Architecture - Application Layer
 */
import { productRepository } from '../../../infrastructure/repositories/ProductRepository.js';

export class GetProductsUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute({ category = '전체', query = '' } = {}) {
    let products = this.repo.getAll();
    if (category && category !== '전체') {
      products = products.filter(p => p.matchesCategory(category));
    }
    if (query) {
      products = products.filter(p => p.matchesQuery(query));
    }
    return products;
  }
}

export class GetProductByIdUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute(id) {
    return this.repo.getById(id);
  }
}

export class AddProductUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute(productData) {
    return this.repo.save(productData);
  }
}

export class UpdateProductUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute(id, productData) {
    return this.repo.save({ ...productData, id });
  }
}

export class DeleteProductUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute(id) {
    return this.repo.delete(id);
  }
}

export class ResetProductsUseCase {
  constructor(repo = productRepository) {
    this.repo = repo;
  }

  execute() {
    return this.repo.resetToDefaults();
  }
}
