/**
 * Product Detail Component
 * Clean Architecture - Presentation Layer
 */
import { useCases } from '../../application/index.js';
import { ProductCardComponent } from './ProductCardComponent.js';
import { showToast } from '../ui/Toast.js';

export class ProductDetailComponent {
  constructor() {
    this.currentProduct = null;
    this.quantity = 1;
    this.container = null;
  }

  render(product) {
    if (!product) return;
    this.currentProduct = product;
    this.quantity = 1;

    // Track in recently viewed
    useCases.addRecent.execute(product);

    this.container = document.getElementById('detailContainer');
    if (!this.container) return;

    const unitPrice = product.price || 0;
    const isEstimate = product.isEstimateOnly ? product.isEstimateOnly() : (product.priceText === '견적상담' || unitPrice === 0);
    const isWished = useCases.checkWish.execute(product.id);

    const relatedProducts = useCases.getProducts.execute()
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    this.container.innerHTML = `
      <!-- Breadcrumb -->
      <div class="detail_breadcrumb">
        <div class="breadcrumb_path">
          <a href="#home">홈</a>
          <span>&gt;</span>
          <a href="#home">${product.categoryName || '인테리어 자재'}</a>
          <span>&gt;</span>
          <strong>${product.name}</strong>
        </div>
        <button class="btn_back_home" id="btnBackToHome">← 상품 목록으로</button>
      </div>

      <!-- Product Top Detail Area -->
      <div class="product_detail_grid">
        <!-- Left: Big Image & Thumbnails -->
        <div class="detail_img_area">
          <div class="detail_big_image">
            <img id="detailMainImg" src="${product.image}" alt="${product.name}">
          </div>
          <div class="detail_thumb_list">
            <div class="detail_thumb_item active" data-img="${product.image}">
              <img src="${product.image}" alt="썸네일 1">
            </div>
            <div class="detail_thumb_item" data-img="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="썸네일 2">
            </div>
            <div class="detail_thumb_item" data-img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="썸네일 3">
            </div>
          </div>
        </div>

        <!-- Right: Product Purchase Info Area -->
        <div class="detail_info_area">
          <h1 class="detail_product_title">${product.name}</h1>

          <table class="detail_info_table">
            <tbody>
              <tr>
                <th>상품요약정보</th>
                <td>${product.summary || product.spec || '벽지왕 정품 친환경 인테리어 자재'}</td>
              </tr>
              <tr>
                <th>판매가</th>
                <td>
                  <span class="detail_price_highlight" id="detailUnitPrice">${product.priceText}</span>
                </td>
              </tr>
              <tr>
                <th>규격/사양</th>
                <td>${product.spec || '상세정보 참조'}</td>
              </tr>
              <tr>
                <th>배송방법</th>
                <td>택배 (대용량/샷시는 전문 화물/방문 시공)</td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>${product.deliveryFee || product.deliveryInfo || '3,000원 (50,000원 이상 구매 시 무료배송)'}</td>
              </tr>
            </tbody>
          </table>

          <!-- Option Dropdown -->
          <div class="detail_option_box">
            <label class="detail_option_label" for="detailOptionSelect">옵션 선택 (필수/추가)</label>
            <select class="detail_option_select" id="detailOptionSelect">
              <option value="">- [필수] 옵션을 선택해 주세요 -</option>
              ${(product.options || ['기본 단품 주문']).map(opt => `
                <option value="${opt}">${opt}</option>
              `).join('')}
            </select>

            <!-- Selected Item & Quantity Control -->
            <div class="detail_selected_item" id="selectedItemBox">
              <div class="selected_item_name">${product.name}</div>
              <div class="detail_qty_ctrl">
                <button class="btn_detail_qty" id="btnQtyMinus">-</button>
                <input type="text" class="input_detail_qty" id="inputDetailQty" value="1" readonly>
                <button class="btn_detail_qty" id="btnQtyPlus">+</button>
              </div>
              <div class="selected_item_price" id="selectedItemPrice">
                ${isEstimate ? '견적상담' : (unitPrice * this.quantity).toLocaleString() + '원'}
              </div>
            </div>
          </div>

          <!-- Total Price Display -->
          <div class="detail_total_box">
            <div class="total_box_label">
              TOTAL <span>(총 상품금액)</span>
            </div>
            <div>
              <span class="total_box_price" id="detailTotalPrice">
                ${isEstimate ? '견적상담' : (unitPrice * this.quantity).toLocaleString() + '원'}
              </span>
              <span class="total_box_qty" id="detailTotalQty">(${this.quantity}개)</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="detail_actions_row">
            <button class="btn_buy_now" id="btnDetailBuyNow">
              ${isEstimate ? '무료 방문견적 신청' : 'BUY IT NOW'}
            </button>
            <button class="btn_add_cart" id="btnDetailAddCart">CART</button>
            <button class="btn_add_wish ${isWished ? 'active' : ''}" id="btnDetailAddWish">
              ${isWished ? '❤️ WISH' : '♡ WISH'}
            </button>
          </div>

          <a href="tel:1800-0000" class="btn_bulk_inquiry">📞 대량구매 및 시공 상담 (1800-0000)</a>
        </div>
      </div>

      <!-- Product Detail Tabs -->
      <div class="product_detail_tab_bar">
        <button class="detail_tab_btn active" data-tab="info">상품상세정보</button>
        <button class="detail_tab_btn" data-tab="shipping">구매안내 / 배송·교환</button>
        <button class="detail_tab_btn" data-tab="reviews">상품후기 (28)</button>
        <button class="detail_tab_btn" data-tab="qna">상품 Q&amp;A (8)</button>
      </div>

      <!-- Tab 1: Detailed Specs -->
      <div class="detail_tab_panel active" id="tabInfo">
        <div class="detail_content_box">
          ${product.detailDesc || product.description || `
            <h3>벽지왕 프리미엄 정품 자재 안내</h3>
            <p>본 상품은 친환경 공정으로 생산된 정품 자재로, 시공 후 냄새가 적고 우수한 내구성과 고급스러운 질감을 제공합니다.</p>
          `}
          <div class="caution_callout">
            <strong>⚠️ 시공 시 필독 주의사항</strong><br>
            • 도배 후 24시간~48시간 동안은 맞바람을 피하고 실내에서 서서히 자연 건조해 주세요. (급격히 건조 시 터짐 발생 우려)<br>
            • 모니터 해상도 및 조명 색온도에 따라 실제 제품의 색상과 미세한 차이가 발생할 수 있습니다.
          </div>
        </div>
      </div>

      <!-- Tab 2: Shipping & Return Policy -->
      <div class="detail_tab_panel" id="tabShipping">
        <div class="detail_content_box">
          <h3>배송 및 교환/반품 안내</h3>
          <p><strong>배송 안내:</strong></p>
          <ul>
            <li>• 평일 오후 2시 이전 결제 완료 건은 당일 출고를 원칙으로 합니다. (주문 제작/화물 상품 제외)</li>
            <li>• 기본 배송비는 3,000원이며, 50,000원 이상 구매 시 무료배송입니다. (제주/도서산간 추가 비용 발생)</li>
          </ul>
          <p><strong>교환/반품 안내:</strong></p>
          <ul>
            <li>• 상품 수령 후 7일 이내에 고객센터로 접수해 주셔야 합니다.</li>
            <li>• 풀바른 벽지 및 맞춤 재단 상품(장판 롤 절단)은 주문 제작 상품으로 단순 변심 반품이 불가합니다.</li>
          </ul>
        </div>
      </div>

      <!-- Tab 3: Customer Reviews -->
      <div class="detail_tab_panel" id="tabReviews">
        <div class="detail_content_box">
          <h3>고객 상품 사용후기 (28건)</h3>
          <div class="review_item_row">
            <div class="review_meta">
              <span class="review_rating">★★★★★</span>
              <span>김*수 고객님 | 2026-10-15</span>
            </div>
            <div class="review_text">배송도 엄청 빠르고 벽지 품질이 너무 좋아요! 초보자인데도 풀이 고르게 잘 발라져 있어서 혼자 방 1칸 2시간 만에 끝냈습니다. 강력 추천합니다.</div>
          </div>
          <div class="review_item_row">
            <div class="review_meta">
              <span class="review_rating">★★★★★</span>
              <span>이*영 고객님 | 2026-10-12</span>
            </div>
            <div class="review_text">색상이 화면이랑 똑같이 화사하고 은은해요. KCC 정품이라 믿고 샀는데 냄새도 안 나고 깔끔하게 마감되었습니다!</div>
          </div>
        </div>
      </div>

      <!-- Tab 4: Q&A -->
      <div class="detail_tab_panel" id="tabQna">
        <div class="detail_content_box">
          <h3>상품 Q&amp;A (8건)</h3>
          <div class="review_item_row">
            <div class="review_meta">
              <span style="font-weight: 700; color: #1E3A8A;">Q. 방 1칸(3평)에 몇 롤 정도 필요한가요?</span>
              <span>답변완료</span>
            </div>
            <div class="review_text">
              <strong>A. 벽지왕 고객센터:</strong> 안녕하세요 고객님! 방 1칸(실평수 3평) 기준 벽면 면적은 약 8~9평 정도로 소폭합지는 4~5롤, 장폭합지/실크는 2롤 정도 권장드립니다.
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Related Recommended Products -->
      <div class="detail_related_section" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #E5E5E5;">
        <div class="section_title_area" style="text-align: left; margin-bottom: 24px;">
          <h3 style="font-size: 20px; font-weight: 800; color: #111111;">벽지왕 함께 보면 좋은 추천 상품</h3>
          <div style="font-size: 13px; color: #777; margin-top: 4px;">해당 상품과 함께 많이 시공·구매하시는 베스트 셀러입니다.</div>
        </div>
        <ul class="prdList_grid4" id="detailRelatedList">
          ${relatedProducts.map(p => ProductCardComponent.createHTML(p)).join('')}
        </ul>
      </div>
    `;

    this.bindEvents(product, isEstimate, unitPrice);
  }

  bindEvents(product, isEstimate, unitPrice) {
    if (!this.container) return;

    // 1. Back to Home
    document.getElementById('btnBackToHome')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#home';
    });

    // 2. Thumbnail selection
    this.container.querySelectorAll('.detail_thumb_item').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        this.container.querySelectorAll('.detail_thumb_item').forEach(t => t.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const imgUrl = target.dataset.img;
        const mainImg = document.getElementById('detailMainImg');
        if (mainImg) mainImg.src = imgUrl;
      });
    });

    // 3. Quantity controls
    const updateTotals = () => {
      const inputQty = document.getElementById('inputDetailQty');
      const selectedItemPrice = document.getElementById('selectedItemPrice');
      const totalPriceEl = document.getElementById('detailTotalPrice');
      const totalQtyEl = document.getElementById('detailTotalQty');

      if (inputQty) inputQty.value = this.quantity;
      if (totalQtyEl) totalQtyEl.textContent = `(${this.quantity}개)`;

      if (!isEstimate) {
        const sum = unitPrice * this.quantity;
        if (selectedItemPrice) selectedItemPrice.textContent = `${sum.toLocaleString()}원`;
        if (totalPriceEl) totalPriceEl.textContent = `${sum.toLocaleString()}원`;
      }
    };

    document.getElementById('btnQtyMinus')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.quantity > 1) {
        this.quantity--;
        updateTotals();
      }
    });

    document.getElementById('btnQtyPlus')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.quantity++;
      updateTotals();
    });

    // 4. Detail Tab Switching
    this.container.querySelectorAll('.detail_tab_btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.container.querySelectorAll('.detail_tab_btn').forEach(b => b.classList.remove('active'));
        this.container.querySelectorAll('.detail_tab_panel').forEach(p => p.classList.remove('active'));

        const target = e.currentTarget;
        target.classList.add('active');
        const tabName = target.dataset.tab;
        if (tabName === 'info') document.getElementById('tabInfo')?.classList.add('active');
        if (tabName === 'shipping') document.getElementById('tabShipping')?.classList.add('active');
        if (tabName === 'reviews') document.getElementById('tabReviews')?.classList.add('active');
        if (tabName === 'qna') document.getElementById('tabQna')?.classList.add('active');
      });
    });

    // 5. Add to Cart
    document.getElementById('btnDetailAddCart')?.addEventListener('click', (e) => {
      e.preventDefault();
      const optSelect = document.getElementById('detailOptionSelect');
      const optText = optSelect?.value || '기본 옵션';
      useCases.addToCart.execute(product, optText, this.quantity);
      window.location.hash = '#cart';
      showToast(`🛒 ${product.name} (${this.quantity}개)가 장바구니에 담겼습니다.`);
    });

    // 6. Buy Now
    document.getElementById('btnDetailBuyNow')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (isEstimate) {
        alert(`[벽지왕 견적 접수]\n'${product.name}' 무료 방문 실측 및 견적 상담이 접수되었습니다. 담당 기사가 곧 연락드립니다.`);
      } else {
        const optSelect = document.getElementById('detailOptionSelect');
        const optText = optSelect?.value || '기본 옵션';
        const sum = unitPrice * this.quantity;
        const user = useCases.getCurrentUser.execute();

        const order = useCases.createOrder.execute({
          userName: user?.name || '고객님',
          items: [{
            id: product.id,
            name: product.name,
            price: unitPrice,
            qty: this.quantity,
            option: optText,
            image: product.image
          }],
          totalPrice: sum,
          deliveryFee: sum >= 50000 ? 0 : 3000
        });

        // Open checkout modal
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
      }
    });

    // 7. Add to Wishlist
    document.getElementById('btnDetailAddWish')?.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btnDetailAddWish');
      const isAdded = useCases.toggleWish.execute(product.id);
      if (btn) {
        if (isAdded) {
          btn.classList.add('active');
          btn.innerHTML = '❤️ WISH';
          showToast('❤️ 관심상품에 등록되었습니다.');
        } else {
          btn.classList.remove('active');
          btn.innerHTML = '♡ WISH';
          showToast('관심상품에서 제외되었습니다.');
        }
      }
    });
  }
}

export const productDetailComponent = new ProductDetailComponent();
