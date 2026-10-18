/**
 * Header Component
 * Clean Architecture - Presentation Layer
 * Responsible for Top Utility Area and GNB interactions
 */
import { useCases } from '../../application/index.js';

export class HeaderComponent {
  constructor() {
    this.topUtilEl = document.getElementById('topUtilArea');
  }

  render() {
    if (!this.topUtilEl) {
      this.topUtilEl = document.getElementById('topUtilArea');
      if (!this.topUtilEl) return;
    }

    const user = useCases.getCurrentUser.execute();
    const recentCount = useCases.getRecent.execute().length;
    const currentHash = (window.location.hash || '').toLowerCase();
    const isHome = !currentHash || currentHash === '#home' || currentHash === '#';

    if (user) {
      // User is logged in
      const isAdmin = user.isAdministrator();

      // Constraint: On #home, "관리자" must NOT be visible
      if (isAdmin && !isHome) {
        this.topUtilEl.innerHTML = `
          <span style="color: #6D28D9; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
            👑 최고관리자 (Admin)
          </span>
          <span class="toparea_divider"></span>
          <a href="#admin" id="navAdmin" style="background: #6D28D9; color: #fff; padding: 3px 10px; border-radius: 4px; font-weight: 800; text-decoration: none; font-size: 11px; box-shadow: 0 2px 6px rgba(109,40,217,0.35); display: inline-flex; align-items: center; gap: 4px;">⚙️ 관리자 콘솔 바로가기</a>
          <span class="toparea_divider"></span>
          <a href="#logout" id="btnLogout" style="color: #EF4444; font-weight: 600;">로그아웃</a>
          <span class="toparea_divider"></span>
          <a href="#order" id="navOrder">주문조회</a>
          <span class="toparea_divider"></span>
          <a href="#recent" id="navRecent">최근본상품 <span class="badge_recent_count" id="recentBadgeTop">${recentCount}</span></a>
          <span class="toparea_divider"></span>
          <a href="#cs">고객센터</a>
        `;
      } else {
        // Standard user or admin on #home (where admin indicator is concealed)
        this.topUtilEl.innerHTML = `
          <span style="color: #111827; font-weight: 700;">
            👑 ${user.name} <span style="font-weight: 400; color: #6B7280; font-size: 11px;">(적립금 <strong>${user.point.toLocaleString()}P</strong>)</span>
          </span>
          <span class="toparea_divider"></span>
          <a href="#logout" id="btnLogout" style="color: #EF4444; font-weight: 600;">로그아웃</a>
          <span class="toparea_divider"></span>
          <a href="#mypage" id="navMyPage">마이쇼핑</a>
          <span class="toparea_divider"></span>
          <a href="#order" id="navOrder">주문조회</a>
          <span class="toparea_divider"></span>
          <a href="#recent" id="navRecent">최근본상품 <span class="badge_recent_count" id="recentBadgeTop">${recentCount}</span></a>
          <span class="toparea_divider"></span>
          <a href="#cs">고객센터</a>
        `;
      }
    } else {
      // Guest
      this.topUtilEl.innerHTML = `
        <a href="#login" id="navLogin">로그인</a>
        <span class="toparea_divider"></span>
        <a href="#join" id="navJoin">회원가입</a>
        <span class="toparea_divider"></span>
        <a href="#order" id="navOrder">주문조회</a>
        <span class="toparea_divider"></span>
        <a href="#recent" id="navRecent">최근본상품 <span class="badge_recent_count" id="recentBadgeTop">${recentCount}</span></a>
        <span class="toparea_divider"></span>
        <a href="#cs">고객센터</a>
      `;
    }
  }

  updateBadges() {
    const summary = useCases.getCartSummary.execute();
    const badges = document.querySelectorAll('.badge_cart_count');
    badges.forEach(b => {
      b.textContent = summary.count;
      b.style.display = summary.count > 0 ? 'inline-flex' : 'none';
    });

    const recentCount = useCases.getRecent.execute().length;
    const badgeTop = document.getElementById('recentBadgeTop');
    const badgeWing = document.getElementById('recentBadgeWing');
    if (badgeTop) badgeTop.textContent = recentCount;
    if (badgeWing) badgeWing.textContent = recentCount;
  }
}

export const headerComponent = new HeaderComponent();
