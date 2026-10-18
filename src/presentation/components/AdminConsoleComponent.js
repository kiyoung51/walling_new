/**
 * Admin Console Component
 * Clean Architecture - Presentation Layer
 * Dedicated management console for administrators
 */
import { useCases } from '../../application/index.js';
import { showToast } from '../ui/Toast.js';

export class AdminConsoleComponent {
  constructor() {
    this.currentTab = 'products';
    this.searchQuery = '';
    this.categoryFilter = '전체';
  }

  render() {
    const products = useCases.getProducts.execute();
    const orders = useCases.getOrders.execute();
    const user = useCases.getCurrentUser.execute();

    // Stats
    const statProdsEl = document.getElementById('adminStatTotalProducts');
    if (statProdsEl) statProdsEl.textContent = products.length;

    const statCatsEl = document.getElementById('adminStatTotalCategories');
    if (statCatsEl) {
      const uniqueCats = new Set(products.map(p => p.categoryName || '기타'));
      statCatsEl.textContent = uniqueCats.size;
    }

    const statOrdersEl = document.getElementById('adminStatTotalOrders');
    if (statOrdersEl) statOrdersEl.textContent = orders.length;

    const adminUserTag = document.getElementById('adminUserTag');
    if (adminUserTag) {
      adminUserTag.textContent = user ? `${user.name} (${user.userId})` : '최고관리자 (admin)';
    }

    const panelProducts = document.getElementById('adminPanelProducts');
    const panelOrders = document.getElementById('adminPanelOrders');

    if (this.currentTab === 'products') {
      if (panelProducts) panelProducts.style.display = 'block';
      if (panelOrders) panelOrders.style.display = 'none';
      this.renderProductsTable();
    } else {
      if (panelProducts) panelProducts.style.display = 'none';
      if (panelOrders) panelOrders.style.display = 'block';
      this.renderOrdersTable();
    }
  }

  renderProductsTable() {
    const tbody = document.getElementById('adminProductTableBody');
    if (!tbody) return;

    let products = useCases.getProducts.execute();

    if (this.categoryFilter && this.categoryFilter !== '전체') {
      products = products.filter(p => p.matchesCategory(this.categoryFilter));
    }

    if (this.searchQuery) {
      products = products.filter(p => p.matchesQuery(this.searchQuery));
    }

    if (products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 48px; color: #9CA3AF;">
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            조건에 일치하는 등록 상품이 없습니다.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = products.map(p => `
      <tr>
        <td style="text-align: center;">
          <img src="${p.image}" alt="${p.name}" class="admin_tbl_thumb" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'">
        </td>
        <td>
          <span class="admin_tbl_id">${p.id}</span>
        </td>
        <td>
          <span class="admin_tbl_cat">${p.categoryName || '-'}</span>
        </td>
        <td>
          <div class="admin_tbl_name">
            <a href="#product-${p.id}" target="_blank" title="쇼핑몰 상세페이지 바로가기">${p.name} ↗</a>
          </div>
          ${p.spec ? `<div class="admin_tbl_spec">${p.spec}</div>` : ''}
          ${p.summary ? `<div class="admin_tbl_summary">${p.summary}</div>` : ''}
        </td>
        <td>
          <strong style="color: #111827;">${p.priceText || (p.price ? p.price.toLocaleString() + '원' : '견적상담')}</strong>
        </td>
        <td>
          ${p.badge ? `<span class="admin_tbl_badge">${p.badge}</span>` : '<span style="color: #9CA3AF; font-size: 11px;">-</span>'}
        </td>
        <td style="text-align: center;">
          <div class="admin_tbl_actions">
            <button type="button" class="btn_tbl_action btn_tbl_edit" data-id="${p.id}" title="상품 수정">수정</button>
            <button type="button" class="btn_tbl_action btn_tbl_del" data-id="${p.id}" title="상품 삭제">삭제</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    const orders = useCases.getOrders.execute();

    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 48px; color: #9CA3AF;">
            <div style="font-size: 32px; margin-bottom: 8px;">📭</div>
            아직 접수된 실시간 주문이 없습니다.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = orders.map(ord => {
      const itemsText = (ord.items || []).map(it => `${it.name} (${it.option || '기본'}) × ${it.qty}개`).join('<br>');
      const amountVal = ord.totalPrice || 0;
      const amountText = Number(amountVal).toLocaleString() + '원';
      const statusOptions = ['결제완료', '배송준비중', '배송중', '배송완료', '주문취소'];

      return `
        <tr>
          <td><strong>${ord.orderNo}</strong></td>
          <td style="font-size: 12px; color: #6B7280;">${ord.date || '-'}</td>
          <td>
            <div style="font-weight: 700; color: #111827;">${ord.userName || '비회원'}</div>
            <div style="font-size: 11px; color: #6B7280;">${ord.phone || '-'}</div>
          </td>
          <td style="font-size: 12px; line-height: 1.5;">${itemsText || '-'}</td>
          <td><strong style="color: #B91C1C;">${amountText}</strong></td>
          <td>
            <select class="admin_order_status_select" data-orderno="${ord.orderNo}">
              ${statusOptions.map(opt => `<option value="${opt}" ${(ord.status && ord.status.includes(opt)) ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </td>
          <td style="font-size: 12px; color: #4B5563; max-width: 200px; white-space: normal;">
            ${ord.address || '-'}
          </td>
        </tr>
      `;
    }).join('');
  }

  openProductModal(mode = 'add', productId = null) {
    const overlay = document.getElementById('adminProductModalOverlay');
    if (!overlay) return;

    const titleEl = document.getElementById('adminProductModalTitle');
    const inputId = document.getElementById('formAdminProdId');
    const selectCat = document.getElementById('formAdminProdCategory');
    const selectBadge = document.getElementById('formAdminProdBadge');
    const inputName = document.getElementById('formAdminProdName');
    const inputPrice = document.getElementById('formAdminProdPrice');
    const inputSpec = document.getElementById('formAdminProdSpec');
    const inputSummary = document.getElementById('formAdminProdSummary');
    const inputImage = document.getElementById('formAdminProdImage');
    const textareaOptions = document.getElementById('formAdminProdOptions');
    const inputDelivery = document.getElementById('formAdminProdDelivery');
    const textareaDesc = document.getElementById('formAdminProdDesc');

    if (mode === 'edit' && productId) {
      const prod = useCases.getProductById.execute(productId);
      if (!prod) {
        showToast('해당 상품 정보를 찾을 수 없습니다.');
        return;
      }
      if (titleEl) titleEl.textContent = `✏️ 상품 정보 수정 (${prod.id})`;
      if (inputId) inputId.value = prod.id;
      if (selectCat) selectCat.value = prod.categoryName || '에디톤월';
      if (selectBadge) selectBadge.value = prod.badge || '';
      if (inputName) inputName.value = prod.name || '';
      if (inputPrice) inputPrice.value = prod.price || 0;
      if (inputSpec) inputSpec.value = prod.spec || '';
      if (inputSummary) inputSummary.value = prod.summary || '';
      if (inputImage) inputImage.value = prod.image || '';
      if (textareaOptions) textareaOptions.value = Array.isArray(prod.options) ? prod.options.join('\n') : '';
      if (inputDelivery) inputDelivery.value = prod.deliveryFee || prod.deliveryInfo || '';
      if (textareaDesc) textareaDesc.value = prod.detailDesc || prod.description || '';
    } else {
      if (titleEl) titleEl.textContent = '✨ 신규 상품 등록';
      if (inputId) inputId.value = '';
      if (selectCat) selectCat.value = '에디톤월';
      if (selectBadge) selectBadge.value = 'NEW';
      if (inputName) inputName.value = '';
      if (inputPrice) inputPrice.value = '';
      if (inputSpec) inputSpec.value = '';
      if (inputSummary) inputSummary.value = '';
      if (inputImage) inputImage.value = 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/4889107ae9db41d5662673ca37f0a72a.jpg';
      if (textareaOptions) textareaOptions.value = '[기본] 단품 1박스 주문\n전용 접착제 + 실리콘 세트 추가 (+15,000원)';
      if (inputDelivery) inputDelivery.value = '화물택배 (전국 무료/방문실측 상담)';
      if (textareaDesc) textareaDesc.value = '<h3>벽지왕 프리미엄 정품 자재</h3><p>친환경 고강도 최고급 정품 자재로 안전하게 시공됩니다.</p>';
    }

    overlay.classList.add('active');
  }

  closeProductModal() {
    document.getElementById('adminProductModalOverlay')?.classList.remove('active');
  }

  init() {
    // Tabs
    document.querySelectorAll('.admin_tab_btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.admin_tab_btn').forEach(b => b.classList.remove('active'));
        const targetBtn = e.target.closest('.admin_tab_btn');
        targetBtn.classList.add('active');
        this.currentTab = targetBtn.dataset.adminTab || 'products';
        this.render();
      });
    });

    // Live search
    const adminSearchInput = document.getElementById('adminProductSearchInput');
    adminSearchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderProductsTable();
    });

    // Category filter
    const adminCatFilter = document.getElementById('adminProductCategoryFilter');
    adminCatFilter?.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.renderProductsTable();
    });

    // Add modal button
    document.getElementById('btnAdminOpenAddModal')?.addEventListener('click', () => {
      this.openProductModal('add');
    });

    document.getElementById('btnCloseAdminProductModal')?.addEventListener('click', () => this.closeProductModal());
    document.getElementById('btnAdminCancelProduct')?.addEventListener('click', () => this.closeProductModal());
    document.getElementById('adminProductModalOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'adminProductModalOverlay') this.closeProductModal();
    });

    // Preset image clicks
    document.querySelectorAll('.btn_img_preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.dataset.url;
        const imgInput = document.getElementById('formAdminProdImage');
        if (imgInput && url) {
          imgInput.value = url;
          showToast('선택한 예시 이미지가 적용되었습니다.');
        }
      });
    });

    // Admin form submit
    document.getElementById('formAdminProduct')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idInput = document.getElementById('formAdminProdId');
      const catInput = document.getElementById('formAdminProdCategory');
      const badgeInput = document.getElementById('formAdminProdBadge');
      const nameInput = document.getElementById('formAdminProdName');
      const priceInput = document.getElementById('formAdminProdPrice');
      const specInput = document.getElementById('formAdminProdSpec');
      const summaryInput = document.getElementById('formAdminProdSummary');
      const imageInput = document.getElementById('formAdminProdImage');
      const optionsInput = document.getElementById('formAdminProdOptions');
      const deliveryInput = document.getElementById('formAdminProdDelivery');
      const descInput = document.getElementById('formAdminProdDesc');

      const editingId = idInput?.value?.trim();
      const name = nameInput?.value?.trim();
      const price = parseInt(priceInput?.value || 0, 10);
      const categoryName = catInput?.value || '에디톤월';
      const badge = badgeInput?.value || '';
      const spec = specInput?.value?.trim() || '';
      const summary = summaryInput?.value?.trim() || '';
      const image = imageInput?.value?.trim() || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
      const optionsRaw = optionsInput?.value || '';
      const options = optionsRaw.split('\n').map(s => s.trim()).filter(Boolean);
      const deliveryInfo = deliveryInput?.value?.trim() || '3,000원 (50,000원 이상 무료배송)';
      const description = descInput?.value?.trim() || `<p>${name} 상품 설명입니다.</p>`;

      if (!name) {
        alert('상품명을 입력해 주십시오.');
        return;
      }

      if (editingId) {
        useCases.updateProduct.execute(editingId, {
          name,
          price,
          categoryName,
          badge,
          spec,
          summary,
          image,
          options: options.length ? options : ['기본 단품 주문'],
          deliveryInfo,
          description
        });
        showToast(`✅ [${name}] 상품 정보가 수정되었습니다.`);
      } else {
        const newProd = useCases.addProduct.execute({
          name,
          price,
          categoryName,
          badge,
          spec,
          summary,
          image,
          options: options.length ? options : ['기본 단품 주문'],
          deliveryInfo,
          description
        });
        showToast(`🎉 신규 상품 [${newProd.name}]이 성공적으로 등록되었습니다.`);
      }

      this.closeProductModal();
      this.render();
    });

    // Table Action Delegation (Edit & Delete)
    document.getElementById('adminProductTableBody')?.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn_tbl_edit');
      if (editBtn) {
        const id = editBtn.dataset.id;
        if (id) this.openProductModal('edit', id);
        return;
      }

      const delBtn = e.target.closest('.btn_tbl_del');
      if (delBtn) {
        const id = delBtn.dataset.id;
        const targetProd = useCases.getProductById.execute(id);
        const prodName = targetProd ? targetProd.name : id;
        if (confirm(`정말로 [${prodName}] 상품을 삭제하시겠습니까?\n삭제 후 복구하려면 '기본 카탈로그 초기화'를 실행해야 합니다.`)) {
          useCases.deleteProduct.execute(id);
          this.render();
          showToast(`🗑️ [${prodName}] 상품이 삭제되었습니다.`);
        }
        return;
      }
    });

    // Reset Defaults
    document.getElementById('btnAdminResetDefaults')?.addEventListener('click', () => {
      if (confirm('모든 상품을 쇼핑몰 초기 기본 카탈로그로 되돌리시겠습니까?\n관리자가 직접 등록/수정한 내역이 초기화됩니다.')) {
        useCases.resetProducts.execute();
        this.render();
        showToast('🔄 기본 상품 카탈로그가 복구되었습니다.');
      }
    });

    // Orders Status Change
    document.getElementById('adminOrdersTableBody')?.addEventListener('change', (e) => {
      const select = e.target.closest('.admin_order_status_select');
      if (select) {
        const orderNo = select.dataset.orderno;
        const newStatus = select.value;
        if (orderNo && newStatus) {
          useCases.updateOrderStatus.execute(orderNo, newStatus);
          showToast(`📦 주문 [${orderNo}] 상태가 '${newStatus}'(으)로 변경되었습니다.`);
        }
      }
    });

    // Admin Logout
    document.getElementById('btnAdminLogout')?.addEventListener('click', () => {
      useCases.logout.execute();
      showToast('관리자 계정에서 로그아웃 되었습니다.');
      window.location.hash = '#home';
    });
  }
}

export const adminConsoleComponent = new AdminConsoleComponent();
