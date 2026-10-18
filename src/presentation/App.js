/**
 * App Orchestrator
 * Clean Architecture - Presentation Layer
 */
import { eventBus } from '../core/EventBus.js';
import { router } from '../core/Router.js';
import { APP_EVENTS } from '../domain/constants/AppConstants.js';
import { useCases } from '../application/index.js';
import { showToast } from './ui/Toast.js';

import { headerComponent } from './components/HeaderComponent.js';
import { heroSliderComponent } from './components/HeroSliderComponent.js';
import { homeSectionsComponent } from './components/HomeSectionsComponent.js';
import { productDetailComponent } from './components/ProductDetailComponent.js';
import { cartDrawerComponent } from './components/CartDrawerComponent.js';
import { recentDrawerComponent } from './components/RecentDrawerComponent.js';
import { modalsComponent } from './components/ModalsComponent.js';
import { adminConsoleComponent } from './components/AdminConsoleComponent.js';

export class App {
  constructor() {
    this.homeView = null;
    this.detailView = null;
    this.adminView = null;
  }

  bootstrap() {
    this.homeView = document.getElementById('homeView');
    this.detailView = document.getElementById('productDetailView');
    this.adminView = document.getElementById('adminView');

    // 1. Initialize Components
    headerComponent.render();
    headerComponent.updateBadges();
    heroSliderComponent.init();
    homeSectionsComponent.init();
    cartDrawerComponent.init();
    recentDrawerComponent.init();
    modalsComponent.init();
    adminConsoleComponent.init();

    // 2. Setup Router
    this.setupRoutes();

    // 3. Setup Reactive Domain Event Listeners via EventBus
    this.setupEventSubscriptions();

    // 4. Setup Global UI Delegations
    this.setupGlobalDelegation();

    // 5. Initial Routing
    router.init();
  }

  setupRoutes() {
    // Utility Modals/Drawers routes
    router.register('^#login$', () => modalsComponent.openAuth('login'));
    router.register('^#join$', () => modalsComponent.openAuth('signup'));
    router.register('^#(order|mypage)$', () => modalsComponent.openOrder('member'));
    router.register('^#recent$', () => recentDrawerComponent.open());
    router.register('^#cart$', () => cartDrawerComponent.open());

    router.register('^#logout$', () => {
      useCases.logout.execute();
      showToast('안전하게 로그아웃 되었습니다.');
      if (this.adminView) this.adminView.style.display = 'none';
      window.location.hash = '#home';
    });

    // Admin Console Route (Strictly Guarded)
    router.register('^#admin$', () => {
      this.closeAllOverlays();
      if (this.homeView) this.homeView.style.display = 'none';
      if (this.detailView) this.detailView.classList.remove('active');
      if (this.adminView) {
        this.adminView.style.display = 'block';
        adminConsoleComponent.render();
      }
      headerComponent.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, {
      guard: () => {
        const user = useCases.getCurrentUser.execute();
        const isAdmin = user && user.isAdministrator();
        if (!isAdmin) {
          alert('⛔ 접근 제한: 관리자 전용 페이지입니다.\n관리자(admin) 계정으로 먼저 로그인해 주십시오.');
          if (this.adminView) this.adminView.style.display = 'none';
          if (this.homeView) this.homeView.style.display = 'block';
          window.location.hash = '#home';
          modalsComponent.openAuth('login');
          setTimeout(() => {
            const loginId = document.getElementById('loginId');
            const loginPw = document.getElementById('loginPw');
            if (loginId) loginId.value = 'admin';
            if (loginPw) loginPw.value = 'admin1234';
          }, 50);
          return false;
        }
        return true;
      }
    });

    // Product Detail Routes
    router.register('^#(product|detail)-(?<id>.+)$', ({ id }) => {
      this.closeAllOverlays();
      const product = useCases.getProductById.execute(id);
      if (product) {
        if (this.homeView) this.homeView.style.display = 'none';
        if (this.adminView) this.adminView.style.display = 'none';
        if (this.detailView) {
          this.detailView.classList.add('active');
          productDetailComponent.render(product);
        }
        headerComponent.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = '#home';
      }
    });

    // Home Route (and Section Anchors)
    router.register('^.*$', (params, fullHash) => {
      // If it's another registered modal, don't switch views
      if (['#login', '#join', '#order', '#mypage', '#recent', '#cart', '#logout'].includes(fullHash)) {
        return;
      }

      this.closeAllOverlays();
      if (this.adminView) this.adminView.style.display = 'none';
      if (this.detailView) this.detailView.classList.remove('active');
      if (this.homeView) this.homeView.style.display = 'block';

      // Always update header ensuring home admin concealment
      headerComponent.render();

      // Handle in-page anchors (e.g. #sashSection, #bestSection)
      if (fullHash && fullHash !== '#' && fullHash !== '#home') {
        try {
          const targetElement = document.querySelector(fullHash);
          if (targetElement) {
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        } catch (err) {
          // Ignore invalid selector queries
        }
      }
    });
  }

  closeAllOverlays() {
    modalsComponent.closeAll();
    recentDrawerComponent.close();
    cartDrawerComponent.close();
  }

  setupEventSubscriptions() {
    // Auth changed
    eventBus.subscribe(APP_EVENTS.AUTH_CHANGED, () => {
      headerComponent.render();
      const currentHash = (window.location.hash || '').toLowerCase();
      if (currentHash === '#admin') {
        adminConsoleComponent.render();
      }
    });

    // Cart updated
    eventBus.subscribe(APP_EVENTS.CART_UPDATED, () => {
      headerComponent.updateBadges();
      cartDrawerComponent.render();
    });

    // Wish updated
    eventBus.subscribe(APP_EVENTS.WISH_UPDATED, () => {
      homeSectionsComponent.render();
    });

    // Recent updated
    eventBus.subscribe(APP_EVENTS.RECENT_UPDATED, () => {
      headerComponent.updateBadges();
      recentDrawerComponent.render();
    });

    // Products updated (Admin CRUD)
    eventBus.subscribe(APP_EVENTS.PRODUCTS_UPDATED, () => {
      homeSectionsComponent.render();
      adminConsoleComponent.render();
    });

    // Orders updated
    eventBus.subscribe(APP_EVENTS.ORDERS_UPDATED, () => {
      adminConsoleComponent.render();
      modalsComponent.renderMemberOrders();
    });
  }

  setupGlobalDelegation() {
    document.addEventListener('click', (e) => {
      // 1. Wish button toggle on cards
      const wishBtn = e.target.closest('.btn-wish');
      if (wishBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishBtn.dataset.id;
        if (id) {
          const isAdded = useCases.toggleWish.execute(id);
          if (isAdded) {
            wishBtn.classList.add('active');
            wishBtn.innerHTML = '❤️ WISH';
            showToast('❤️ 관심상품에 등록되었습니다.');
          } else {
            wishBtn.classList.remove('active');
            wishBtn.innerHTML = '♡ WISH';
            showToast('관심상품에서 제외되었습니다.');
          }
        }
        return;
      }

      // 2. Add to Cart button on Card
      const cartBtn = e.target.closest('.btn-cart');
      if (cartBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = cartBtn.dataset.id;
        if (id) {
          const product = useCases.getProductById.execute(id);
          if (product) {
            useCases.addToCart.execute(product, product.options?.[0] || '기본 단품 주문', 1);
            cartDrawerComponent.open();
            showToast(`🛒 ${product.name} (1개)가 장바구니에 담겼습니다.`);
          }
        }
        return;
      }

      // 3. Option button on Card
      const optBtn = e.target.closest('.btn-opt');
      if (optBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = optBtn.dataset.id;
        if (id) {
          modalsComponent.openOption(id);
        }
        return;
      }

      // 4. Logo click -> home
      const logoLink = e.target.closest('.brand_logo_area');
      if (logoLink && window.location.hash !== '' && window.location.hash !== '#home') {
        e.preventDefault();
        window.location.hash = '#home';
        return;
      }

      // 5. Product Card Click -> navigate to detail
      const prodItem = e.target.closest('.prdList__item');
      if (prodItem && !e.target.closest('.icon__box')) {
        const id = prodItem.dataset.id;
        if (id) {
          e.preventDefault();
          window.location.hash = `#product-${id}`;
        }
        return;
      }

      // 6. Search result item click
      const searchItem = e.target.closest('.search_result_item');
      if (searchItem) {
        const id = searchItem.dataset.id;
        if (id) {
          e.preventDefault();
          modalsComponent.closeSearch();
          window.location.hash = `#product-${id}`;
        }
        return;
      }

      // 7. GNB tab click
      const gnbTabLink = e.target.closest('[data-tab]');
      if (gnbTabLink && !gnbTabLink.classList.contains('main_tab_btn') && !gnbTabLink.classList.contains('detail_tab_btn')) {
        const tabKey = gnbTabLink.dataset.tab;
        if (tabKey) {
          homeSectionsComponent.setBestTab(tabKey);
          if (window.location.hash.startsWith('#product-')) {
            window.location.hash = '#home';
          }
        }
      }

      // 8. Mobile hamburger drawer
      const btnOpenDrawer = e.target.closest('#btnOpenDrawer');
      if (btnOpenDrawer) {
        document.getElementById('sideDrawer')?.classList.add('active');
        document.getElementById('sideDrawerOverlay')?.classList.add('active');
        return;
      }

      const btnCloseDrawer = e.target.closest('#btnCloseDrawer') || e.target.id === 'sideDrawerOverlay';
      if (btnCloseDrawer) {
        document.getElementById('sideDrawer')?.classList.remove('active');
        document.getElementById('sideDrawerOverlay')?.classList.remove('active');
        return;
      }

      // 9. Quick Wing Top Button
      const btnTop = e.target.closest('#btnScrollTop');
      if (btnTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 10. Close buttons on modals
      if (e.target.closest('#btnCloseAuthModal') || e.target.id === 'authModalOverlay') {
        modalsComponent.closeAuth();
        return;
      }
      if (e.target.closest('#btnCloseOrderModal') || e.target.id === 'orderModalOverlay') {
        modalsComponent.closeOrder();
        return;
      }
      if (e.target.closest('#btnCloseOptionModal') || e.target.id === 'optionModalOverlay') {
        modalsComponent.closeOption();
        return;
      }
      if (e.target.closest('#btnSuccessContinue') || e.target.id === 'checkoutSuccessModalOverlay') {
        modalsComponent.closeCheckoutSuccess();
        return;
      }
    });
  }
}

export const app = new App();
