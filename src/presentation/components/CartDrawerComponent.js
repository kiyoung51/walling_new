/**
 * Cart Drawer Component
 * Clean Architecture - Presentation Layer
 */
import { useCases } from '../../application/index.js';
import { showToast } from '../ui/Toast.js';

export class CartDrawerComponent {
  constructor() {
    this.drawerEl = document.getElementById('cartDrawer');
    this.overlayEl = document.getElementById('cartDrawerOverlay');
  }

  render() {
    const summary = useCases.getCartSummary.execute();
    const cart = useCases.getCart.execute();

    // Badges in Header & Quick Wing
    const badges = document.querySelectorAll('.badge_cart_count');
    badges.forEach(b => {
      b.textContent = summary.count;
      b.style.display = summary.count > 0 ? 'inline-flex' : 'none';
    });

    const cartDrawerCount = document.getElementById('cartDrawerItemCount');
    if (cartDrawerCount) cartDrawerCount.textContent = summary.count;

    // Free shipping meter
    const freeShippingText = document.getElementById('freeShippingText');
    const meterBarFill = document.getElementById('meterBarFill');
    if (freeShippingText && meterBarFill) {
      if (summary.subtotal >= 50000) {
        freeShippingText.innerHTML = `🎉 <strong>무료배송 혜택</strong>이 적용되었습니다! (50,000원 이상)`;
        freeShippingText.style.color = '#0284C7';
        meterBarFill.style.width = '100%';
      } else {
        freeShippingText.innerHTML = `50,000원 이상 무료배송! <strong>${summary.freeShippingRemaining.toLocaleString()}원</strong> 추가 시 무료배송`;
        freeShippingText.style.color = '#0284C7';
        meterBarFill.style.width = `${summary.freeShippingProgress}%`;
      }
    }

    // Summary Text
    const subtotalEl = document.getElementById('cartSubtotalText');
    const deliveryEl = document.getElementById('cartDeliveryText');
    const grandTotalEl = document.getElementById('cartGrandTotalText');
    if (subtotalEl) subtotalEl.textContent = `${summary.subtotal.toLocaleString()}원`;
    if (deliveryEl) deliveryEl.textContent = summary.deliveryFee === 0 ? '무료 (0원)' : `${summary.deliveryFee.toLocaleString()}원`;
    if (grandTotalEl) grandTotalEl.textContent = `${summary.total.toLocaleString()}원`;

    // Render items inside Cart Drawer
    const container = document.getElementById('cartDrawerItems');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart_empty_state">
          <div class="cart_empty_icon">🛒</div>
          <div>장바구니가 비어 있습니다.</div>
          <a href="#bestSection" class="btn_recent_cart" style="padding: 8px 16px; margin-top: 8px;" id="btnCartGoShop">베스트 상품 보러가기</a>
        </div>
      `;
      return;
    }

    container.innerHTML = cart.map((item, idx) => `
      <div class="cart_item_row" data-index="${idx}">
        <div class="cart_item_thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart_item_info">
          <div class="cart_item_title">${item.name}</div>
          <div class="cart_item_option">${item.option}</div>
          <div class="cart_item_action_row">
            <div class="cart_stepper">
              <button type="button" class="btn_step btn_cart_minus" data-index="${idx}">-</button>
              <span class="step_qty_val">${item.qty}</span>
              <button type="button" class="btn_step btn_cart_plus" data-index="${idx}">+</button>
            </div>
            <div class="cart_item_subtotal">
              ${(item.price * item.qty).toLocaleString()}원
            </div>
          </div>
        </div>
        <button type="button" class="btn_cart_remove" data-index="${idx}" aria-label="삭제">✕</button>
      </div>
    `).join('');
  }

  open() {
    this.render();
    document.getElementById('cartDrawer')?.classList.add('active');
    document.getElementById('cartDrawerOverlay')?.classList.add('active');
  }

  close() {
    document.getElementById('cartDrawer')?.classList.remove('active');
    document.getElementById('cartDrawerOverlay')?.classList.remove('active');
  }

  init() {
    this.render();

    // Close on overlay or button
    document.getElementById('btnCloseCartDrawer')?.addEventListener('click', () => this.close());
    document.getElementById('cartDrawerOverlay')?.addEventListener('click', () => this.close());

    // Cart Stepper delegation inside cart drawer items
    document.getElementById('cartDrawerItems')?.addEventListener('click', (e) => {
      const plusBtn = e.target.closest('.btn_cart_plus');
      if (plusBtn) {
        e.preventDefault();
        const idx = parseInt(plusBtn.dataset.index, 10);
        const cart = useCases.getCart.execute();
        if (cart[idx]) {
          useCases.updateCartQty.execute(idx, cart[idx].qty + 1);
          this.render();
        }
        return;
      }

      const minusBtn = e.target.closest('.btn_cart_minus');
      if (minusBtn) {
        e.preventDefault();
        const idx = parseInt(minusBtn.dataset.index, 10);
        const cart = useCases.getCart.execute();
        if (cart[idx]) {
          useCases.updateCartQty.execute(idx, cart[idx].qty - 1);
          this.render();
        }
        return;
      }

      const removeBtn = e.target.closest('.btn_cart_remove');
      if (removeBtn) {
        e.preventDefault();
        const idx = parseInt(removeBtn.dataset.index, 10);
        useCases.removeCartItem.execute(idx);
        this.render();
        showToast('상품이 장바구니에서 삭제되었습니다.');
        return;
      }
    });

    // Clear cart button
    document.getElementById('btnClearCart')?.addEventListener('click', () => {
      if (confirm('장바구니를 모두 비우시겠습니까?')) {
        useCases.clearCart.execute();
        this.render();
        showToast('장바구니가 비워졌습니다.');
      }
    });

    // Checkout button
    document.getElementById('btnCartCheckout')?.addEventListener('click', () => {
      const summary = useCases.getCartSummary.execute();
      if (summary.count === 0) {
        alert('장바구니가 비어 있습니다.');
        return;
      }
      const cart = useCases.getCart.execute();
      const user = useCases.getCurrentUser.execute();

      const order = useCases.createOrder.execute({
        userName: user?.name || '고객님',
        items: [...cart],
        totalPrice: summary.total,
        deliveryFee: summary.deliveryFee,
        address: user?.address || '서울시 강남구 테헤란로 000 (기본 배송지)'
      });

      useCases.clearCart.execute();
      this.close();

      // Open Success Modal
      const overlay = document.getElementById('checkoutSuccessModalOverlay');
      const details = document.getElementById('checkoutSuccessDetails');
      if (overlay && details) {
        details.innerHTML = `
          <div><strong>주문번호:</strong> ${order.orderNo}</div>
          <div><strong>주문일시:</strong> ${order.date}</div>
          <div><strong>주문상품:</strong> ${order.items.map(i => `${i.name} (${i.qty}개)`).join(', ')}</div>
          <div><strong>총 결제금액:</strong> <span style="font-weight: 800; color: var(--primary-color);">${order.totalPrice.toLocaleString()}원</span> (배송비 ${order.deliveryFee === 0 ? '무료' : order.deliveryFee.toLocaleString() + '원'})</div>
          <div><strong>배송지:</strong> ${order.address}</div>
        `;
        overlay.classList.add('active');
      }
    });
  }
}

export const cartDrawerComponent = new CartDrawerComponent();
