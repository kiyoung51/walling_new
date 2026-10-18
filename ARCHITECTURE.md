# 벽지왕 (BYEOKJIWANG) Clean Architecture 개발자 가이드

본 문서는 **벽지왕 이커머스 플랫폼**을 여러 개발자가 공동으로 유지보수, 테스트, 기능 확장할 수 있도록 설계된 **Clean Architecture (클린 아키텍처)** 구조 및 개발 가이드입니다.

---

## 1. 아키텍처 핵심 원칙 (Dependency Rule)

```
       +---------------------------------------------+
       |             Presentation Layer              |
       |  (UI Components, Modals, Drawers, App.js)   |
       +---------------------------------------------+
                              | (Uses)
                              v
       +---------------------------------------------+
       |              Application Layer              |
       |    (Use Cases: Product, Auth, Cart, Order)   |
       +---------------------------------------------+
             | (Depends on)                  ^ (Implements)
             v                               |
+--------------------------+    +--------------------------+
|       Domain Layer       |    |   Infrastructure Layer   |
| (Entities, Value Objects,|    |  (LocalStorage, Catalogs,|
|   Constants, Enums)      |    |      Repositories)       |
+--------------------------+    +--------------------------+
```

1. **의존성 역전 원칙 (DIP)**:
   - 비즈니스 핵심 로직(`Domain`, `Application`)은 브라우저 DOM, LocalStorage, 외부 API 라이브러리에 의존하지 않습니다.
   - UI(Presentation)와 데이터 저장소(Infrastructure)는 Use Case 인터페이스에 의존합니다.
2. **단일 책임 원칙 (SRP)**:
   - 각 Use Case(`AddToCartUseCase`, `UpdateOrderStatusUseCase` 등)는 1가지 명확한 비즈니스 유스케이스만 수행합니다.
   - 각 Presentation 컴포넌트는 해당 UI 영역의 렌더링과 사용자 입력 전달만 전담합니다.
3. **독립적 테스트 용이성 (Testability)**:
   - `Domain`과 `Application` 계층은 브라우저 환경 없이 순수 Node.js 환경에서 단위 테스트(Unit Test)가 가능합니다.
   - Repository를 가상 Mock 객체로 교체하여 UI 및 Use Case를 즉시 검증할 수 있습니다.

---

## 2. 디렉터리 구조 및 파일 맵

```
src/
├── core/                               # [횡단 관심사 & 코어 인프라]
│   ├── EventBus.js                     # 분산 이벤트 발행/구독 (Pub/Sub) 엔진
│   └── Router.js                       # SPA 선언적 해시 라우터 및 Route Guard
│
├── domain/                             # [도메인 계층 - 비즈니스 핵심 규칙]
│   ├── constants/
│   │   └── AppConstants.js             # 시스템 상수, 키값, 주문상태, 카테고리 Enum
│   └── entities/
│       ├── Product.js                  # 상품 엔티티 (가격 계산, 검색/필터링 로직)
│       ├── User.js                     # 사용자 엔티티 (권한 판별, 회원등급)
│       ├── CartItem.js                 # 장바구니 아이템 값 객체 (소계 계산)
│       └── Order.js                    # 주문 엔티티 (주문번호 생성, 결제상태)
│
├── application/                        # [애플리케이션 계층 - 유스케이스]
│   ├── usecases/
│   │   ├── product/
│   │   │   └── ProductUseCases.js      # 상품 목록조회, 단건조회, 추가, 수정, 삭제, 리셋
│   │   ├── auth/
│   │   │   └── AuthUseCases.js         # 현재사용자, 로그인, 회원가입, 로그아웃
│   │   ├── cart/
│   │   │   └── CartUseCases.js         # 장바구니 추가, 수량변경, 삭제, 무료배송 계산
│   │   ├── order/
│   │   │   └── OrderUseCases.js        # 주문생성, 주문조회, 상태변경, 비회원조회
│   │   ├── wish/
│   │   │   └── WishUseCases.js         # 관심상품 토글, 목록조회, 포함여부
│   │   └── recent/
│   │       └── RecentUseCases.js       # 최근본상품 추가, 삭제, 전체삭제
│   └── index.js                        # DI 컨테이너 및 유스케이스 번들 익스포트
│
├── infrastructure/                     # [인프라스트럭처 계층 - 영속성 및 외부 데이터]
│   ├── storage/
│   │   └── LocalStorageAdapter.js      # LocalStorage 읽기/쓰기/예외처리/이벤트 통지
│   ├── repositories/
│   │   ├── ProductRepository.js        # 상품 데이터 저장소 (초기 카탈로그 시딩 지원)
│   │   ├── UserRepository.js           # 사용자 세션 저장소
│   │   ├── CartRepository.js           # 장바구니 저장소
│   │   ├── OrderRepository.js          # 주문 및 배송 상태 저장소
│   │   ├── WishRepository.js           # 관심상품 저장소
│   │   └── RecentRepository.js         # 최근본상품 저장소
│   └── index.js                        # 인프라스트럭처 단일 진입점 익스포트
│
├── presentation/                       # [프레젠테이션 계층 - UI 컴포넌트]
│   ├── components/
│   │   ├── HeaderComponent.js          # 상단 유틸리티, 관리자 버튼 숨김제어(#home), 배지
│   │   ├── HeroSliderComponent.js      # 메인 배너 슬라이더 (오토플레이, 페이징)
│   │   ├── ProductCardComponent.js     # 상품 카드 렌더링 템플릿 (위시/카트/옵션)
│   │   ├── HomeSectionsComponent.js    # 메인 섹션들 (샷시, 장판, 에디톤월, 베스트, 신제품)
│   │   ├── ProductDetailComponent.js   # 상품 상세 페이지 (갤러리, 옵션, 탭, 관련상품)
│   │   ├── CartDrawerComponent.js      # 장바구니 드로어 (무료배송 게이지, 수량조절, 결제)
│   │   ├── RecentDrawerComponent.js    # 최근 본 상품 드로어
│   │   ├── ModalsComponent.js          # 로그인/가입, 주문조회, 옵션팝업, 검색모달
│   │   └── AdminConsoleComponent.js    # 관리자 콘솔 대시보드 (통계, 상품CRUD, 주문관리)
│   ├── ui/
│   │   └── Toast.js                    # 전역 토스트 알림 컴포넌트
│   └── App.js                          # 프레젠테이션 오케스트레이터 및 라우트 바인딩
│
├── store/                              # [하위 호환성 레이어]
│   └── storage.js                      # 기존 코드 호환을 위한 Facade Adapter
│
├── data/                               # [정적 데이터 및 카탈로그]
│   └── byeokjiwang-catalog.js          # 정품 원본 카탈로그 데이터
│
├── main.js                             # [애플리케이션 진입점] ~50라인 경량 부트스트랩
└── style.css                           # 전역 스타일시트
```

---

## 3. 다른 개발자와의 협업 방법 (How to collaborate)

### 3.1 새로운 비즈니스 기능(Use Case) 추가하기
1. **도메인 엔티티 확인/추가**:
   - `src/domain/entities/`에 필요한 엔티티나 메서드를 작성합니다.
   - 예: 쿠폰 적용 로직이 필요하다면 `Coupon.js` 작성.
2. **Use Case 작성**:
   - `src/application/usecases/` 하위에 새로운 Use Case 클래스를 만듭니다.
   - 생성자 주입(Constructor Injection)으로 Repository를 받도록 구성합니다.
   ```javascript
   export class ApplyCouponUseCase {
     constructor(repo = couponRepository) {
       this.repo = repo;
     }
     execute(couponCode, orderSubtotal) {
       // 비즈니스 로직
     }
   }
   ```
3. **DI 컨테이너 등록**:
   - `src/application/index.js`에 인스턴스를 등록하여 어디서든 `useCases.applyCoupon.execute(...)`로 호출 가능하게 만듭니다.

### 3.2 백엔드 API (REST/GraphQL/Firebase)로 저장소 교체하기
- 현재는 `src/infrastructure/repositories/`에서 `LocalStorageAdapter`를 사용합니다.
- 백엔드 서버 연동 시 **도메인 계층과 UI 계층 코드는 1줄도 수정할 필요가 없습니다**.
- `ProductRepository.js` 내부에서 `fetch('/api/products')`를 호출하도록 인프라 계층만 수정하면 모든 UI와 유스케이스가 즉시 서버 API와 연동됩니다.

### 3.3 UI 컴포넌트 추가 및 수정하기
- 각 UI 컴포넌트는 `src/presentation/components/`에 캡슐화되어 있습니다.
- 서로 다른 컴포넌트 간에는 직접 참조하지 않고 `eventBus.publish(APP_EVENTS.CART_UPDATED)`와 같이 이벤트를 통해 느슨하게 통신(Decoupled)합니다.
- 특정 화면이나 기능을 수정할 때 다른 화면 파일과의 충돌(Git Merge Conflict)이 발생하지 않습니다.

### 3.4 관리자 권한 및 보안 규칙
- **홈 화면 관리자 미노출 원칙**:
  `#home` 경로에서는 일반 고객에게 관리자 콘솔 버튼이 노출되지 않도록 `HeaderComponent.js`에서 제어됩니다.
- **라우트 가드 (Route Guard)**:
  `src/presentation/App.js`의 Router 설정에서 `#admin` 진입 시 `user.isAdministrator()`를 체크하여, 비관리자의 직접 URL 접근을 원천 차단합니다.

---

## 4. 빌드 및 테스트 명령어

```bash
# 로컬 개발 서버 실행 (Vite HMR)
npm run dev

# 프로덕션 빌드 및 정적 분석 검증
npm run build

# 프로덕션 프리뷰
npm run preview
```
