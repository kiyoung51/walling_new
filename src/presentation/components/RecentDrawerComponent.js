/**
 * Recent Drawer Component
 * Clean Architecture - Presentation Layer
 */
import { useCases } from '../../application/index.js';
import { showToast } from '../ui/Toast.js';

export class RecentDrawerComponent {
  constructor() {
    this.drawerEl = document.getElementById('recentDrawer');
    this.overlayEl = document.getElementById('recentDrawerOverlay');
  }

  render() {
    const recentList = useCases.getRecent.execute();
    const count = recentList.length;

    // Badges
    const badgeTop = document.getElementById('recentBadgeTop');
    const badgeWing = document.getElementById('recentBadgeWing');
    const drawerCount = document.getElementById('recentDrawerCount');
    if (badgeTop) badgeTop.textContent = count;
    if (badgeWing) badgeWing.textContent = count;
    if (drawerCount) drawerCount.textContent = count;

    // Items in drawer
    const container = document.getElementById('recentItemList');
    if (!container) return;

    if (count === 0) {
      container.innerHTML = `
        <div class="recent_empty_state">
          <div class="cart_empty_icon">👀</div>
          <div>최근 본 상품이 없습니다.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = recentList.map(item => `
      <div class="recent_card" data-id="${item.id}">
        <div class="recent_card_thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="recent_card_info">
          <div class="recent_card_title">${item.name}</div>
          <div class="recent_card_price">${item.priceText}</div>
          <div class="recent_card_actions">
            <button type="button" class="btn_recent_cart btn_recent_add_cart" data-id="${item.id}">장바구니 담기</button>
          </div>
        </div>
        <button type="button" class="btn_recent_del" data-id="${item.id}" aria-label="삭제">✕</button>
      </div>
    `).join('');
  }

  open() {
    this.render();
    document.getElementById('recentDrawer')?.classList.add('active');
    document.getElementById('recentDrawerOverlay')?.classList.add('active');
  }

  close() {
    document.getElementById('recentDrawer')?.classList.remove('active');
    document.getElementById('recentDrawerOverlay')?.classList.remove('active');
  }

  init() {
    this.render();

    document.getElementById('btnCloseRecentDrawer')?.addEventListener('click', () => this.close());
    document.getElementById('recentDrawerOverlay')?.addEventListener('click', () => this.close());

    // Delegation inside recent item list
    document.getElementById('recentItemList')?.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn_recent_add_cart');
      if (addBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = addBtn.dataset.id;
        const product = useCases.getProductById.execute(id);
        if (product) {
          useCases.addToCart.execute(product, product.options?.[0] || '기본 단품 주문', 1);
          this.close();
          window.location.hash = '#cart';
          showToast(`🛒 ${product.name}이 장바구니에 담겼습니다.`);
        }
        return;
      }

      const delBtn = e.target.closest('.btn_recent_del');
      if (delBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = delBtn.dataset.id;
        useCases.removeRecent.execute(id);
        this.render();
        return;
      }
    });

    // Clear all recent items
    document.getElementById('btnClearRecent')?.addEventListener('click', () => {
      useCases.clearRecent.execute();
      this.render();
      showToast('최근 본 상품이 모두 삭제되었습니다.');
    });
  }
}

export const recentDrawerComponent = new RecentDrawerComponent();
