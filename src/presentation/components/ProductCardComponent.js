/**
 * Product Card Component
 * Clean Architecture - Presentation Layer
 */
import { useCases } from '../../application/index.js';

export class ProductCardComponent {
  static createHTML(product) {
    if (!product) return '';
    const isWished = useCases.checkWish.execute(product.id);

    return `
      <li class="prdList__item" data-id="${product.id}">
        <div class="thumbnail">
          <a href="#product-${product.id}" class="product-link" data-id="${product.id}" style="display: block; width: 100%; height: 100%;">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </a>
          ${product.badge ? `<div class="badge ${product.badge === 'BEST' ? 'primary' : ''}">${product.badge}</div>` : ''}
          <div class="icon__box">
            <span class="btn-wish ${isWished ? 'active' : ''}" data-id="${product.id}">${isWished ? '❤️ WISH' : '♡ WISH'}</span>
            <span class="btn-cart" data-id="${product.id}">+ ADD</span>
            <span class="btn-opt" data-id="${product.id}">OPTION</span>
          </div>
        </div>
        <div class="description">
          <div class="name">
            <a href="#product-${product.id}" class="product-link" data-id="${product.id}">${product.name}</a>
          </div>
          ${product.summary ? `<div class="summary">${product.summary}</div>` : product.spec ? `<div class="summary">${product.spec}</div>` : ''}
          <div class="price_row">
            <span style="font-size: 11px; color: #888;">판매가</span>
            <span class="price_val">${product.priceText}</span>
          </div>
        </div>
      </li>
    `;
  }
}
