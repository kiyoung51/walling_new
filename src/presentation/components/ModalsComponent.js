/**
 * Modals Component
 * Clean Architecture - Presentation Layer
 * Coordinates Auth, Order Inquiry, Quick Option, Checkout Success, and Live Search Modals
 */
import { useCases } from '../../application/index.js';
import { showToast } from '../ui/Toast.js';

export class ModalsComponent {
  // 1. AUTH MODAL
  openAuth(tab = 'login') {
    const overlay = document.getElementById('authModalOverlay');
    if (!overlay) return;
    overlay.classList.add('active');

    const tabBtnLogin = document.getElementById('tabBtnLogin');
    const tabBtnSignup = document.getElementById('tabBtnSignup');
    const panelLogin = document.getElementById('panelLogin');
    const panelSignup = document.getElementById('panelSignup');

    if (tab === 'signup') {
      tabBtnLogin?.classList.remove('active');
      tabBtnSignup?.classList.add('active');
      panelLogin?.classList.remove('active');
      panelSignup?.classList.add('active');
    } else {
      tabBtnSignup?.classList.remove('active');
      tabBtnLogin?.classList.add('active');
      panelSignup?.classList.remove('active');
      panelLogin?.classList.add('active');
    }
  }

  closeAuth() {
    document.getElementById('authModalOverlay')?.classList.remove('active');
  }

  // 2. ORDER INQUIRY MODAL
  openOrder(tab = 'member') {
    const overlay = document.getElementById('orderModalOverlay');
    if (!overlay) return;
    overlay.classList.add('active');

    const tabMember = document.getElementById('tabBtnMemberOrders');
    const tabGuest = document.getElementById('tabBtnGuestOrders');
    const panelMember = document.getElementById('panelMemberOrders');
    const panelGuest = document.getElementById('panelGuestOrders');

    if (tab === 'guest') {
      tabMember?.classList.remove('active');
      tabGuest?.classList.add('active');
      panelMember?.classList.remove('active');
      panelGuest?.classList.add('active');
    } else {
      tabGuest?.classList.remove('active');
      tabMember?.classList.add('active');
      panelGuest?.classList.remove('active');
      panelMember?.classList.add('active');
      this.renderMemberOrders();
    }
  }

  closeOrder() {
    document.getElementById('orderModalOverlay')?.classList.remove('active');
  }

  renderMemberOrders() {
    const container = document.getElementById('memberOrdersList');
    if (!container) return;

    const orders = useCases.getOrders.execute();
    if (orders.length === 0) {
      container.innerHTML = `
        <div class="cart_empty_state">
          <div class="cart_empty_icon">📦</div>
          <div>주문/배송 내역이 없습니다.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="order_card_item">
        <div class="order_card_head">
          <div>
            <span class="order_number">${order.orderNo}</span>
            <span style="font-size: 11px; color: #888; margin-left: 8px;">${order.date}</span>
          </div>
          <span class="badge_order_status">${order.status}</span>
        </div>
        <div class="order_prod_list">
          ${(order.items || []).map(item => `
            <div class="order_prod_row">
              <img class="order_prod_thumb" src="${item.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'}" alt="${item.name}">
              <div class="order_prod_title">
                <div><strong>${item.name}</strong></div>
                <div style="font-size: 11px; color: #6B7280;">${item.option || ''} (${item.qty}개)</div>
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #111827;">${(item.price * item.qty).toLocaleString()}원</div>
            </div>
          `).join('')}
        </div>
        <div class="order_total_bar">
          <div>택배송장: <strong>${order.courier || '배송준비중'}</strong></div>
          <div>총 결제금액: <span class="order_total_val">${order.totalPrice.toLocaleString()}원</span></div>
        </div>
      </div>
    `).join('');
  }

  // 3. OPTION MODAL
  openOption(productId) {
    const product = useCases.getProductById.execute(productId);
    if (!product) return;

    const overlay = document.getElementById('optionModalOverlay');
    const content = document.getElementById('quickOptionContent');
    if (!overlay || !content) return;

    const unitPrice = product.price || 0;
    let quickQty = 1;

    content.innerHTML = `
      <div class="quick_opt_product">
        <img src="${product.image}" class="quick_opt_img" alt="${product.name}">
        <div class="quick_opt_info">
          <h4>${product.name}</h4>
          <div class="quick_opt_price" id="quickOptPrice">${product.priceText}</div>
          <div style="font-size: 11px; color: #888; margin-top: 4px;">${product.spec || '정품 인테리어 자재'}</div>
        </div>
      </div>

      <div class="form_group" style="margin-bottom: 14px;">
        <label for="quickSelectOption" style="font-size: 12px; font-weight: 700;">옵션 선택 (필수)</label>
        <select id="quickSelectOption" class="auth_input" style="padding: 10px;">
          ${(product.options || ['기본 단품 주문']).map(opt => `
            <option value="${opt}">${opt}</option>
          `).join('')}
        </select>
      </div>

      <div class="detail_selected_item" style="margin-bottom: 14px; background: #F9FAFB; padding: 12px; border-radius: 6px; border: 1px solid #E5E7EB;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; font-weight: 600;">수량 선택</span>
          <div class="cart_stepper">
            <button type="button" class="btn_step" id="btnQuickMinus">-</button>
            <span class="step_qty_val" id="quickQtyVal">1</span>
            <button type="button" class="btn_step" id="btnQuickPlus">+</button>
          </div>
        </div>
        <div style="text-align: right; margin-top: 8px; font-size: 14px; font-weight: 800; color: var(--primary-color);" id="quickSubtotal">
          ${unitPrice > 0 ? unitPrice.toLocaleString() + '원' : '견적상담'}
        </div>
      </div>

      <div class="quick_actions_row">
        <button type="button" class="btn_opt_add_cart" id="btnQuickAddCart">장바구니 담기</button>
        <button type="button" class="btn_opt_buy_now" id="btnQuickBuyNow">바로구매</button>
      </div>
    `;

    overlay.classList.add('active');

    const updateQuickTotal = () => {
      const qtyEl = document.getElementById('quickQtyVal');
      const subtotalEl = document.getElementById('quickSubtotal');
      if (qtyEl) qtyEl.textContent = quickQty;
      if (subtotalEl) {
        subtotalEl.textContent = unitPrice > 0 ? (unitPrice * quickQty).toLocaleString() + '원' : '견적상담';
      }
    };

    document.getElementById('btnQuickMinus')?.addEventListener('click', () => {
      if (quickQty > 1) {
        quickQty--;
        updateQuickTotal();
      }
    });

    document.getElementById('btnQuickPlus')?.addEventListener('click', () => {
      quickQty++;
      updateQuickTotal();
    });

    document.getElementById('btnQuickAddCart')?.addEventListener('click', () => {
      const optVal = document.getElementById('quickSelectOption')?.value || '기본 옵션';
      useCases.addToCart.execute(product, optVal, quickQty);
      this.closeOption();
      window.location.hash = '#cart';
      showToast(`🛒 ${product.name} (${quickQty}개)가 장바구니에 담겼습니다.`);
    });

    document.getElementById('btnQuickBuyNow')?.addEventListener('click', () => {
      const optVal = document.getElementById('quickSelectOption')?.value || '기본 옵션';
      this.closeOption();
      if (unitPrice === 0) {
        alert(`[벽지왕 견적 접수]\n'${product.name}' 무료 방문실측 및 견적 상담이 접수되었습니다.`);
        return;
      }
      const user = useCases.getCurrentUser.execute();
      const order = useCases.createOrder.execute({
        userName: user?.name || '고객님',
        items: [{
          id: product.id,
          name: product.name,
          price: unitPrice,
          qty: quickQty,
          option: optVal,
          image: product.image
        }],
        totalPrice: unitPrice * quickQty,
        deliveryFee: (unitPrice * quickQty) >= 50000 ? 0 : 3000
      });
      this.openCheckoutSuccess(order);
    });
  }

  closeOption() {
    document.getElementById('optionModalOverlay')?.classList.remove('active');
  }

  // 4. CHECKOUT SUCCESS MODAL
  openCheckoutSuccess(order) {
    const overlay = document.getElementById('checkoutSuccessModalOverlay');
    const details = document.getElementById('checkoutSuccessDetails');
    if (!overlay || !details) return;

    details.innerHTML = `
      <div><strong>주문번호:</strong> ${order.orderNo}</div>
      <div><strong>주문일시:</strong> ${order.date}</div>
      <div><strong>주문상품:</strong> ${order.items.map(i => `${i.name} (${i.qty}개)`).join(', ')}</div>
      <div><strong>총 결제금액:</strong> <span style="font-weight: 800; color: var(--primary-color);">${order.totalPrice.toLocaleString()}원</span> (배송비 ${order.deliveryFee === 0 ? '무료' : order.deliveryFee.toLocaleString() + '원'})</div>
      <div><strong>배송지:</strong> ${order.address}</div>
    `;

    overlay.classList.add('active');
  }

  closeCheckoutSuccess() {
    document.getElementById('checkoutSuccessModalOverlay')?.classList.remove('active');
  }

  // 5. LIVE SEARCH MODAL
  openSearch() {
    const overlay = document.getElementById('searchModalOverlay');
    if (!overlay) return;
    overlay.classList.add('active');
    const input = document.getElementById('globalSearchInput');
    if (input) {
      input.focus();
      if (input.value.trim()) {
        this.performSearch(input.value.trim());
      }
    }
  }

  closeSearch() {
    document.getElementById('searchModalOverlay')?.classList.remove('active');
  }

  performSearch(query) {
    const container = document.getElementById('searchResultsContainer');
    const btnClear = document.getElementById('btnSearchClear');
    if (!container) return;

    const q = (query || '').trim().toLowerCase();

    if (btnClear) {
      btnClear.style.display = q ? 'flex' : 'none';
    }

    if (!q) {
      container.innerHTML = `
        <div class="search_empty_hint">
          <span style="font-size: 24px; display: block; margin-bottom: 8px;">💡</span>
          검색어를 입력하시면 즉시 실시간으로 상품을 찾아드립니다.
        </div>
      `;
      return;
    }

    const matches = useCases.getProducts.execute({ query: q });

    if (matches.length === 0) {
      container.innerHTML = `
        <div class="search_empty_hint">
          <span style="font-size: 24px; display: block; margin-bottom: 8px;">🔍</span>
          '<strong>${query}</strong>'에 대한 검색 결과가 없습니다.<br>
          <span style="font-size: 12px; color: #9CA3AF; margin-top: 6px; display: block;">
            철자나 검색어를 확인하시거나, 인기 키워드를 클릭해 보세요.
          </span>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 12px; color: #6B7280; font-weight: 700; margin-bottom: 12px;">
        총 <span style="color: var(--primary-color);">${matches.length}개</span>의 상품이 검색되었습니다.
      </div>
      ${matches.map(p => `
        <a href="#product-${p.id}" class="search_result_item" data-id="${p.id}">
          <div class="search_result_thumb">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="search_result_info">
            <div class="search_result_category">${p.categoryName || '인테리어 자재'}</div>
            <div class="search_result_title">${p.name}</div>
            <div class="search_result_price">${p.priceText}</div>
          </div>
        </a>
      `).join('')}
    `;
  }

  closeAll() {
    this.closeAuth();
    this.closeOrder();
    this.closeOption();
    this.closeCheckoutSuccess();
    this.closeSearch();
  }

  init() {
    // Auth Modal Tabs
    document.getElementById('tabBtnLogin')?.addEventListener('click', () => this.openAuth('login'));
    document.getElementById('tabBtnSignup')?.addEventListener('click', () => this.openAuth('signup'));

    // Order Modal Tabs
    document.getElementById('tabBtnMemberOrders')?.addEventListener('click', () => this.openOrder('member'));
    document.getElementById('tabBtnGuestOrders')?.addEventListener('click', () => this.openOrder('guest'));

    // Sample Order fill
    document.getElementById('btnFillSampleOrder')?.addEventListener('click', () => {
      const nameInput = document.getElementById('guestOrderName');
      const noInput = document.getElementById('guestOrderNo');
      if (nameInput && noInput) {
        nameInput.value = '홍길동';
        noInput.value = 'BYK-20261018-84920';
      }
    });

    // Login Form Submit
    document.getElementById('formLogin')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('loginId')?.value || 'user1';
      const pw = document.getElementById('loginPw')?.value || '';
      const user = useCases.login.execute(id, pw);
      this.closeAuth();
      showToast(`🎉 ${user.name}님 환영합니다!`);
      if (user.isAdministrator()) {
        window.location.hash = '#admin';
      }
    });

    // Quick Admin Login
    document.getElementById('btnQuickAdminLogin')?.addEventListener('click', () => {
      const user = useCases.login.execute('admin', 'admin1234');
      this.closeAuth();
      showToast('👑 최고관리자(admin)로 로그인되었습니다. 관리자 센터로 이동합니다.');
      window.location.hash = '#admin';
    });

    // Social Login
    document.getElementById('btnKakaoLogin')?.addEventListener('click', () => {
      const user = useCases.login.execute('kakao_user', '1234');
      this.closeAuth();
      showToast(`💬 카카오 간편 로그인 완료! ${user.name}님 환영합니다.`);
    });

    document.getElementById('btnNaverLogin')?.addEventListener('click', () => {
      const user = useCases.login.execute('naver_user', '1234');
      this.closeAuth();
      showToast(`📗 네이버 간편 로그인 완료! ${user.name}님 환영합니다.`);
    });

    // Signup Form
    document.getElementById('formSignup')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('signupId')?.value;
      const name = document.getElementById('signupName')?.value;
      const phone = document.getElementById('signupPhone')?.value;
      const address = document.getElementById('signupAddress')?.value;
      const type = document.querySelector('input[name="signupUserType"]:checked')?.value;

      useCases.signup.execute({ userId: id, name, phone, address, type });
      this.closeAuth();
      showToast(`🎁 회원가입 완료! 5,000P 웰컴 적립금이 지급되었습니다.`);
    });

    // Guest Order Lookup
    document.getElementById('formGuestOrder')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestOrderName')?.value;
      const no = document.getElementById('guestOrderNo')?.value;
      const resultBox = document.getElementById('guestOrderResult');
      if (!resultBox) return;

      const order = useCases.lookupGuestOrder.execute(name, no);
      if (order) {
        resultBox.innerHTML = `
          <div class="order_card_item" style="margin-top: 14px; background: #F0FDF4; border-color: #86EFAC;">
            <div class="order_card_head">
              <span class="order_number">${order.orderNo}</span>
              <span class="badge_order_status" style="background: #DCFCE7; color: #15803D;">${order.status}</span>
            </div>
            <div><strong>주문자:</strong> ${order.userName} (${order.phone})</div>
            <div><strong>배송지:</strong> ${order.address}</div>
            <div style="margin-top: 8px;"><strong>송장번호:</strong> ${order.courier}</div>
            <div style="margin-top: 8px; font-size: 14px; font-weight: 800; color: #111827;">
              결제금액: ${order.totalPrice.toLocaleString()}원
            </div>
          </div>
        `;
      } else {
        resultBox.innerHTML = `
          <div style="padding: 16px; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 6px; color: #DC2626; font-size: 13px; text-align: center; margin-top: 14px;">
            일치하는 주문 내역이 없습니다. 주문자명과 주문번호를 다시 확인해 주세요.
          </div>
        `;
      }
    });

    // Search events
    document.getElementById('btnSearchToggle')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openSearch();
    });

    document.getElementById('btnCloseSearchModal')?.addEventListener('click', () => this.closeSearch());

    const searchInput = document.getElementById('globalSearchInput');
    searchInput?.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });

    document.getElementById('btnSearchClear')?.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        this.performSearch('');
      }
    });

    document.querySelectorAll('.btn_hot_tag').forEach(tagBtn => {
      tagBtn.addEventListener('click', (e) => {
        const tag = e.currentTarget.dataset.tag;
        if (searchInput && tag) {
          searchInput.value = tag;
          this.performSearch(tag);
        }
      });
    });

    // Success Modal -> View Order
    document.getElementById('btnSuccessViewOrder')?.addEventListener('click', () => {
      this.closeCheckoutSuccess();
      this.openOrder('member');
    });

    // Fill Admin credentials shortcut in login modal
    document.getElementById('btnFillAdminLogin')?.addEventListener('click', () => {
      const loginId = document.getElementById('loginId');
      const loginPw = document.getElementById('loginPw');
      if (loginId) loginId.value = 'admin';
      if (loginPw) loginPw.value = 'admin1234';
      showToast('🔑 최고관리자(admin) 계정 정보가 입력되었습니다. [로그인] 버튼을 누르세요.');
    });
  }
}

export const modalsComponent = new ModalsComponent();
