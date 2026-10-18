/**
 * Home Sections Component
 * Clean Architecture - Presentation Layer
 * Renders product grids on the home page view
 */
import { useCases } from '../../application/index.js';
import { ProductCardComponent } from './ProductCardComponent.js';
import {
  SASH_PRODUCTS,
  FLOORING_PRODUCTS,
  WALL_BOARD_PRODUCTS,
  BEST_TAB_PRODUCTS,
  NEW_ARRIVALS
} from '../../data/byeokjiwang-catalog.js';

export class HomeSectionsComponent {
  constructor() {
    this.activeBestTab = 'narrow';
  }

  setBestTab(tabKey) {
    this.activeBestTab = tabKey;
    document.querySelectorAll('.main_tab_btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });
    this.renderBestSection();
  }

  render() {
    this.renderSashSection();
    this.renderFlooringSection();
    this.renderWallboardSection();
    this.renderBestSection();
    this.renderNewArrivalsSection();
  }

  renderSashSection() {
    const listEl = document.getElementById('sashProductList');
    if (!listEl) return;
    const products = useCases.getProducts.execute({ category: 'KCC글라스(샷시)' });
    const items = products.length ? products : SASH_PRODUCTS;
    listEl.innerHTML = items.map(p => ProductCardComponent.createHTML(p)).join('');
  }

  renderFlooringSection() {
    const listEl = document.getElementById('flooringProductList');
    if (!listEl) return;
    const products = useCases.getProducts.execute({ category: 'KCC숲(장판)' });
    const items = products.length ? products : FLOORING_PRODUCTS;
    listEl.innerHTML = items.map(p => ProductCardComponent.createHTML(p)).join('');
  }

  renderWallboardSection() {
    const listEl = document.getElementById('wallBoardProductList');
    if (!listEl) return;
    const products = useCases.getProducts.execute({ category: '에디톤월' });
    const items = products.length ? products : WALL_BOARD_PRODUCTS;
    listEl.innerHTML = items.map(p => ProductCardComponent.createHTML(p)).join('');
  }

  renderBestSection() {
    const listEl = document.getElementById('bestProductList');
    if (!listEl) return;

    let category = '소폭합지';
    if (this.activeBestTab === 'wide') category = '장폭합지';
    else if (this.activeBestTab === 'silk') category = '실크벽지';
    else if (this.activeBestTab === 'paste') category = '만능풀바른벽지';

    const products = useCases.getProducts.execute({ category });
    const items = products.length ? products : (BEST_TAB_PRODUCTS[this.activeBestTab] || BEST_TAB_PRODUCTS.narrow);
    listEl.innerHTML = items.map(p => ProductCardComponent.createHTML(p)).join('');
  }

  renderNewArrivalsSection() {
    const listEl = document.getElementById('newArrivalsList');
    if (!listEl) return;
    const products = useCases.getProducts.execute({ category: '실크벽지' });
    const items = products.length ? products : NEW_ARRIVALS;
    listEl.innerHTML = items.map(p => ProductCardComponent.createHTML(p)).join('');
  }

  init() {
    this.render();

    // Tab buttons event listener
    document.querySelectorAll('.main_tab_btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.main_tab_btn');
        if (targetBtn && targetBtn.dataset.tab) {
          this.setBestTab(targetBtn.dataset.tab);
        }
      });
    });
  }
}

export const homeSectionsComponent = new HomeSectionsComponent();
