/**
 * Hero Slider Component
 * Clean Architecture - Presentation Layer
 */
const HERO_SLIDES = [
  {
    badge: 'KCC글라스 공식 파트너',
    title: '냉·난방비 절감!<br>정품 KCC 창호 맞춤 견적',
    desc: '서울·경기 전지역 무료 방문 실측부터 13년 본사 보증까지 한 번에 해결하세요.',
    btnPrimary: '창호 견적 상담 신청',
    btnLink: '#sashSection',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
  },
  {
    badge: '2025/2026 하이엔드 신제품',
    title: 'LX 디아망 실크벽지<br>프리미엄 딥 엠보 기획전',
    desc: '실제 프랑스 회벽 스투코를 구현한 최고급 입체 질감과 물걸레 세척 기능.',
    btnPrimary: '디아망 신제품 보러가기',
    btnLink: '#newArrivalsSection',
    bg: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80'
  },
  {
    badge: '초보자도 1초 셀프시공',
    title: '벽지왕 만능 풀바른벽지<br>물이나 풀을 갤 필요 없이 즉시 부착',
    desc: '친환경 무독성 천연 전분풀 완도포로 원룸, 안방 셀프도배를 가장 쉽고 빠르게 완성.',
    btnPrimary: '풀바른 벽지 베스트 보기',
    btnLink: '#bestSection',
    bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80'
  }
];

export class HeroSliderComponent {
  constructor() {
    this.currentSlide = 0;
    this.timer = null;
  }

  render() {
    const container = document.getElementById('heroSlider');
    const pagination = document.getElementById('heroPagination');
    if (!container || !pagination) return;

    container.innerHTML = HERO_SLIDES.map((slide, idx) => `
      <div class="hero_slide ${idx === this.currentSlide ? 'active' : ''}" style="background-image: url('${slide.bg}');">
        <div class="hero_slide_content">
          <span class="hero_slide_badge">${slide.badge}</span>
          <h2 class="hero_slide_title">${slide.title}</h2>
          <p class="hero_slide_desc">${slide.desc}</p>
          <div class="hero_btn_group">
            <a href="${slide.btnLink}" class="btn_hero_action">${slide.btnPrimary}</a>
            <a href="#bestSection" class="btn_hero_sub">베스트 상품 보기</a>
          </div>
        </div>
      </div>
    `).join('');

    pagination.innerHTML = HERO_SLIDES.map((_, idx) => `
      <span class="hero_dot ${idx === this.currentSlide ? 'active' : ''}" data-index="${idx}"></span>
    `).join('');
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % HERO_SLIDES.length;
    this.render();
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    this.render();
  }

  goTo(index) {
    this.currentSlide = Math.max(0, Math.min(index, HERO_SLIDES.length - 1));
    this.render();
  }

  startAutoplay(intervalMs = 5000) {
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), intervalMs);
  }

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  init() {
    this.render();
    this.startAutoplay();

    document.getElementById('heroPrev')?.addEventListener('click', () => {
      this.prev();
      this.startAutoplay();
    });

    document.getElementById('heroNext')?.addEventListener('click', () => {
      this.next();
      this.startAutoplay();
    });

    document.getElementById('heroPagination')?.addEventListener('click', (e) => {
      const dot = e.target.closest('.hero_dot');
      if (dot) {
        const idx = parseInt(dot.dataset.index, 10);
        this.goTo(idx);
        this.startAutoplay();
      }
    });
  }
}

export const heroSliderComponent = new HeroSliderComponent();
