// 벽지왕 (BYEOKJIWANG) 공식 상품 카탈로그 데이터베이스
// https://arinadeco.co.kr/ 의 전체 카테고리 및 상품 체계를 충실하게 반영한 데이터

export const NAV_CATEGORIES = [
  {
    id: 'sash',
    name: 'KCC글라스(샷시)',
    link: '#sashSection',
    subcategories: []
  },
  {
    id: 'flooring',
    name: 'KCC숲(장판)',
    link: '#flooringSection',
    subcategories: ['숲 그린 1.8', '숲 옥 2.2', '숲 펫트 2.0']
  },
  {
    id: 'wall-board',
    name: '에디톤월',
    link: '#wallBoardSection',
    subcategories: ['에디톤 월 3.0T', '에디톤 월 6.0T']
  },
  {
    id: 'narrow',
    name: '소폭합지',
    link: '#bestSection',
    subcategories: ['롤판매 소폭합지', '박스판매 소폭합지', '현장용(10평) 소폭합지']
  },
  {
    id: 'wide',
    name: '장폭합지',
    link: '#bestSection',
    subcategories: ['벽지왕 기획벽지', 'LX장폭합지', '10평천장용합지']
  },
  {
    id: 'silk',
    name: '실크벽지',
    link: '#newArrivalsSection',
    subcategories: ['디아망', '베스띠', '테라피', '10평단위 천장용', '방염실크벽지']
  },
  {
    id: 'vermiculite',
    name: '질석벽지',
    link: '#bestSection',
    subcategories: ['질석벽지(3평)', '질석벽지(5평)', '질석벽지(1M단위판매)']
  },
  {
    id: 'adhesive',
    name: '접착식벽지',
    link: '#bestSection',
    subcategories: ['단열벽지', '실크 접착벽지']
  },
  {
    id: 'tools',
    name: '도배용품',
    link: '#bestSection',
    subcategories: ['정배솔', '가루풀/도배풀', '도배붓/헤라', '칼받이/실리콘']
  }
];

// 1. KCC 정품 샷시 라인업
export const SASH_PRODUCTS = [
  {
    id: 'sash-508',
    name: 'KCC글라스 홈씨씨 윈도우 스마트 창호 [서울/경기 전지역] 맞춤 견적 13년 품질보증',
    categoryName: 'KCC글라스(샷시)',
    priceText: '견적상담',
    price: 0,
    badge: 'BEST',
    summary: '서울/경기 전지역 실측 무료 방문 및 13년 본사 품질보증',
    spec: '스마트 창호 규격 / 고단열 24mm 복층유리 기본 장착',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 시공 공간: 거실 분합창', '[필수] 시공 공간: 안방 발코니창', '[필수] 시공 공간: 주방/작은방 창'],
    deliveryFee: '무료 (방문 실측 후 시공)',
    detailDesc: `
      <h3>냉·난방비 폭탄? 정품 KCC 창호로 한 번에 해결하세요!</h3>
      <p>KCC글라스 홈씨씨 윈도우 스마트는 고단열 복층 유리와 다격실 구조의 고기밀성 프로파일을 적용하여 겨울철 단열과 여름철 냉방 효율을 극대화합니다.</p>
      <ul>
        <li>• 본사 직영 13년 품질보증 (창틀 및 하드웨어 일체)</li>
        <li>• 서울/인천/경기 전지역 전문 기술자 무료 방문 실측 서비스</li>
        <li>• 에너지소비효율 1등급 고기밀성 복층유리 적용</li>
      </ul>
    `
  },
  {
    id: 'sash-510',
    name: 'KCC글라스 홈씨씨 윈도우 5 외창 창호 [서울/경기 전지역] 맞춤 견적 13년 품질보증',
    categoryName: 'KCC글라스(샷시)',
    priceText: '견적상담',
    price: 0,
    badge: 'BEST',
    summary: '로이유리 적용, 겨울철 난방비 40% 절감 고단열 외창',
    spec: '외창 전용 140mm 광폭 단창 / 250mm 이중창 선택 가능',
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 사양 선택: 140mm 단창 (로이유리)', '[필수] 사양 선택: 250mm 이중창 (최고급 로이유리)'],
    deliveryFee: '무료 (방문 실측 후 시공)',
    detailDesc: `
      <h3>외부 소음 차단과 냉난방비 절감에 탁월한 프리미엄 외창</h3>
      <p>외부 풍압에 견고한 고강도 보강재와 특수 가스켓을 장착하여 태풍에도 끄떡없는 고성능 외창 창호 시스템입니다.</p>
    `
  },
  {
    id: 'sash-511',
    name: 'KCC글라스 홈씨씨 윈도우 5 플러스 외창 [서울/경기 전지역] 맞춤 견적 13년 품질보증',
    categoryName: 'KCC글라스(샷시)',
    priceText: '견적상담',
    price: 0,
    badge: 'BEST',
    summary: '기밀성 1등급, 태풍 및 강풍에 안전한 하이엔드 창호',
    spec: '26mm 아르곤가스 주입 로이 복층유리 적용',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 규격: 아파트 발코니 전면창', '[필수] 규격: 빌라/주택 외창'],
    deliveryFee: '무료 (방문 실측 후 시공)',
    detailDesc: `
      <h3>하이엔드 아파트를 위한 최상급 단열 창호</h3>
      <p>국내 최고 수준의 기밀성과 수밀성을 자랑하는 KCC 정품 윈도우 5 플러스입니다.</p>
    `
  },
  {
    id: 'sash-512',
    name: 'KCC글라스 홈씨씨 윈도우 5i trendy [서울/경기 전지역] 맞춤견적 13년 품질보증',
    categoryName: 'KCC글라스(샷시)',
    priceText: '견적상담',
    price: 0,
    badge: 'BEST',
    summary: '슬림 프레임으로 극대화된 조망권과 우수한 단열 성능',
    spec: '슬림 프레임 디자인 / 트렌디 엣지 핸들 적용',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 색상: 퓨어 화이트', '[필수] 색상: 모던 다크그레이'],
    deliveryFee: '무료 (방문 실측 후 시공)',
    detailDesc: `
      <h3>탁 트인 뷰를 선사하는 슬림 프레임 트렌디 창호</h3>
      <p>프레임 두께를 줄여 채광을 15% 이상 높이고, 모던한 실내 인테리어와 자연스럽게 어우러집니다.</p>
    `
  }
];

// 2. KCC숲 친환경 바닥재 (장판)
export const FLOORING_PRODUCTS = [
  {
    id: 'floor-682',
    name: 'KCC 숲 그린 1.8T 1롤 35m 친환경 바닥재 장판 NP18-4123 샌디 워시오크',
    categoryName: 'KCC숲(장판)',
    priceText: '390,000원',
    price: 390000,
    badge: 'BEST',
    summary: '친환경 가소제, 항균 피톤치드 코팅, 1롤 35m 대용량 롤판매',
    spec: '두께 1.8mm (1.8T) / 폭 180cm × 길이 35m (약 19평 시공 분량)',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 수량: 1롤 (35m)', '추가구매: 장판 전용 본드 3kg (+15,000원)', '추가구매: 륨 본드 + 용착제 시공세트 (+22,000원)'],
    deliveryFee: '화물 착불 또는 선결제 (지역별 상이)',
    detailDesc: `
      <h3>천연 피톤치드 코팅으로 안심하는 KCC 숲 그린 1.8T</h3>
      <p>친환경 식물성 가소제를 적용하여 아토피 및 환경호르몬 걱정 없이 아이와 반려동물이 안심하고 생활할 수 있는 프리미엄 바닥재입니다.</p>
      <ul>
        <li>• 미끄럼 방지 논슬립(Non-slip) 표면 엠보싱</li>
        <li>• 고탄성 쿠션층 적용으로 보행감 우수 및 경량 층간소음 저감</li>
        <li>• 스크래치와 변색에 강한 UV 하이그로시 표면 코팅</li>
      </ul>
    `
  },
  {
    id: 'floor-683',
    name: 'KCC 숲 그린 1.8T 1롤 35m 친환경 바닥재 장판 NP18-4703 노르딕 엘름',
    categoryName: 'KCC숲(장판)',
    priceText: '390,000원',
    price: 390000,
    badge: 'BEST',
    summary: '밝고 모던한 북유럽 엘름 무늬, 층간소음 완화 쿠션층',
    spec: '두께 1.8mm (1.8T) / 폭 180cm × 길이 35m',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 수량: 1롤 (35m)', '추가구매: 륨 본드 + 용착제 시공세트 (+22,000원)'],
    deliveryFee: '화물 착불 또는 선결제',
    detailDesc: `
      <h3>환하고 넓어 보이는 북유럽 감성의 노르딕 엘름</h3>
      <p>화이트 우드 톤의 화사한 나뭇결 패턴으로 좁은 공간도 시각적으로 시원하게 확장해줍니다.</p>
    `
  },
  {
    id: 'floor-684',
    name: 'KCC 숲 그린 1.8T 1롤 35m 친환경 바닥재 장판 NP18-4681 리얼 오크',
    categoryName: 'KCC숲(장판)',
    priceText: '390,000원',
    price: 390000,
    badge: 'BEST',
    summary: '천연 원목 질감을 사실적으로 표현한 스테디셀러 리얼 오크',
    spec: '두께 1.8mm (1.8T) / 폭 180cm × 길이 35m',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 수량: 1롤 (35m)', '추가구매: 륨 본드 + 용착제 시공세트 (+22,000원)'],
    deliveryFee: '화물 착불 또는 선결제',
    detailDesc: `
      <h3>원목 마루의 따스함과 질감을 그대로 담은 리얼 오크</h3>
      <p>어떤 가구와도 완벽하게 매치되는 가장 대중적이고 품격 있는 원목 무늬 바닥재입니다.</p>
    `
  },
  {
    id: 'floor-1358',
    name: 'KCC 숲 그린 1.8T 1롤 35m 친환경 바닥재 장판 NP18-5021 피오니 오크',
    categoryName: 'KCC숲(장판)',
    priceText: '390,000원',
    price: 390000,
    badge: 'BEST',
    summary: '부드러운 크림톤 오크 패턴으로 공간을 더 넓어 보이게 연출',
    spec: '두께 1.8mm (1.8T) / 폭 180cm × 길이 35m',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    options: ['[필수] 수량: 1롤 (35m)'],
    deliveryFee: '화물 착불 또는 선결제',
    detailDesc: `
      <h3>트렌디한 버터크림 웜톤 인테리어에 제격인 피오니 오크</h3>
      <p>과하지 않은 잔잔한 결감으로 미니멀하고 아늑한 신혼집 및 원룸 공간에 추천합니다.</p>
    `
  }
];

// 2-1. LX Z:IN 에디톤 월 (벽장재 / 아트월) 라인업 (8종)
export const WALL_BOARD_PRODUCTS = [
  {
    id: 'wallboard-581',
    name: 'LX Z:IN 디자인 벽장재 에디톤 월 EDL6826 솔티 브라운 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: 'BEST',
    summary: '천연 대리석의 깊이감과 모던한 브라운 톤의 조화',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/4889107ae9db41d5662673ca37f0a72a.jpg',
    options: ['[기본] EDL6826 솔티 브라운 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>천연 석재의 질감과 무메지 시공의 완벽한 일체감</h3>
      <p>LX Z:IN 에디톤 월(EDITON Wall)은 디지털 프린팅 기술로 천연 대리석과 콘크리트 질감을 정밀하게 구현한 하이엔드 프리미엄 벽장재입니다.</p>
      <ul>
        <li>• 4.0T 고강도 코어층으로 내충격성 및 내구성 우수</li>
        <li>• V-그루브 조인트로 메지 없는 깔끔한 마감 연출</li>
        <li>• 포름알데히드 방출 걱정 없는 친환경 안심 자재</li>
      </ul>
    `
  },
  {
    id: 'wallboard-580',
    name: 'LX Z:IN 디자인 벽장재 에디톤 월 EDL6837 모더나 그레이 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: 'BEST',
    summary: '차분하고 도시적인 감성의 모더나 그레이 아트월',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/5f7e79d004216f41c1558b15fb331c3a.jpg',
    options: ['[기본] EDL6837 모더나 그레이 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>차분하고 세련된 모던 인테리어의 중심, 모더나 그레이</h3>
      <p>거실 TV 아트월과 복도 벽면에 감각적인 모던 무드를 더해주는 에디톤 월 시그니처 컬러입니다.</p>
    `
  },
  {
    id: 'wallboard-579',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6834 콘크리트 라이트 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '미니멀하고 세련된 인더스트리얼 콘크리트 질감',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/b89ec5f7617bfea3964a5e80b4bf9f01.jpg',
    options: ['[기본] EDL6834 콘크리트 라이트 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>인더스트리얼 미니멀리즘 콘크리트 텍스처</h3>
      <p>빛의 각도에 따라 잔잔하게 반사되는 콘크리트 고유의 질감을 완벽하게 살린 인기 모델입니다.</p>
    `
  },
  {
    id: 'wallboard-578',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6843 소프트 스톤 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '부드러운 천연 석재 텍스처로 아늑한 거실 완성',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/823da23c5f4d16c84c9b3dce19080414.jpg',
    options: ['[기본] EDL6843 소프트 스톤 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>따뜻한 웜톤 계열의 소프트 스톤 감성</h3>
      <p>원목 가구 및 아이보리 톤 인테리어와 최상의 조화를 이루는 프리미엄 월 패널입니다.</p>
    `
  },
  {
    id: 'wallboard-577',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6840 벨벳 쿼츠 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '은은한 석영 광택과 벨벳 터치감의 럭셔리 월',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/a218053532b30c9f84eb905e54650d80.jpg',
    options: ['[기본] EDL6840 벨벳 쿼츠 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>고급 석영(Quartz)의 입자감을 그대로</h3>
      <p>특수 표면 처리로 지문 방지 기능과 부드러운 촉감을 자랑합니다.</p>
    `
  },
  {
    id: 'wallboard-576',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6844 스노우 테라조 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '화사하고 트렌디한 화이트 테라조 패턴',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/1444d79ad9f284cb43259ab0a0b063d4.jpg',
    options: ['[기본] EDL6844 스노우 테라조 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>트렌디한 카페 무드를 연출하는 스노우 테라조</h3>
      <p>상업 공간 및 주거 공간의 포인트 아트월로 가장 주목받는 패턴입니다.</p>
    `
  },
  {
    id: 'wallboard-575',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6829 프로스트 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '맑고 깨끗한 화이트 톤의 텍스처로 공간 확장 효과',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/1b11979c609bf32dc146e62d054e0ace.jpg',
    options: ['[기본] EDL6829 프로스트 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>깨끗하고 밝은 화이트 공간 확장 효과</h3>
      <p>빛을 화사하게 반사하여 좁은 공간도 넓고 쾌적하게 보이는 프로스트 디자인입니다.</p>
    `
  },
  {
    id: 'wallboard-574',
    name: '[재고보유] LX Z:IN 디자인 벽장재 에디톤 월 EDL6824 솔티 애쉬 4.0x600x1200mm 4PC/BOX (2.88㎡)',
    categoryName: '에디톤월',
    price: 75000,
    priceText: '75,000원',
    badge: '재고보유',
    summary: '네추럴한 애쉬 그레이 톤의 고급스러운 입체감',
    spec: '4.0×600×1200mm (4PC/BOX 2.88㎡)',
    image: 'https://ecimg.cafe24img.com/pg437b79500102030/seo8464200/web/product/medium/20231219/56169501c2715e0a13619b2d2d25a771.jpg',
    options: ['[기본] EDL6824 솔티 애쉬 (1BOX / 4장)', '전용 접착제 + 실리콘 세트 추가 (+15,000원)'],
    deliveryFee: '화물택배 (박스당 6,000원)',
    detailDesc: `
      <h3>자연스러운 애쉬 그레이의 입체 질감</h3>
      <p>호텔 로비 같은 고급스러운 분위기를 완성해주는 베스트셀러 모델입니다.</p>
    `
  }
];

// 3. 베스트 상품 탭 데이터
export const BEST_TAB_PRODUCTS = {
  narrow: [
    {
      id: 'best-105',
      name: '[박스판매] 소폭합지 휘앙세 4092-1 화이트 펄 1박스 (20롤) 40평 종이 도배지 천정 단색 셀프벽지 전세 월세',
      categoryName: '소폭합지',
      summary: '소폭합지 1롤(2평)/1박스(20롤-40평)이며, 원룸 및 임대용 가성비 1등 상품',
      spec: '폭 53cm × 길이 12.5m (1롤 2평) × 20롤 (총 40평 시공 분량)',
      price: 90000,
      priceText: '90,000원',
      badge: 'BEST',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 1박스 (20롤 - 40평형)', '추가구매: 친환경 가루풀 500g (+6,000원)', '추가구매: 도배공구 4종 세트 (+12,000원)'],
      deliveryFee: '3,000원 (50,000원 이상 구매 시 무료배송)',
      detailDesc: `
        <h3>가장 경제적인 원룸/투룸/임대용 소폭합지 1박스 특가</h3>
        <p>폭이 53cm로 가벼워 사다리나 발판 위에서도 혼자서 쉽게 들고 바를 수 있는 1등 셀프도배지입니다.</p>
      `
    },
    {
      id: 'best-93',
      name: '[박스판매] LX소폭합지 휘앙세 4077-1 화이트 1박스(20롤) 40평 벽지 원룸 도배지 천정 셀프벽지 단색 전세 월세',
      categoryName: '소폭합지',
      summary: '가장 많이 판매되는 순백 화이트 톤, 무난하고 깔끔한 마감',
      spec: '폭 53cm × 20롤 (40평형)',
      price: 90000,
      priceText: '90,000원',
      badge: 'BEST',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 1박스 (20롤)'],
      deliveryFee: '무료배송',
      detailDesc: `<h3>깔끔하고 화사한 순백 무광 화이트 컬러의 정석</h3>`
    },
    {
      id: 'best-94',
      name: '[박스판매] 소폭합지 휘앙세 4077-2 라이트 그레이 1박스(20롤) 40평 원룸 도배 천정 단색 셀프벽지 전세 월세',
      categoryName: '소폭합지',
      summary: '은은한 라이트 그레이로 오염에 강하고 모던한 실내 완성',
      spec: '폭 53cm × 20롤 (40평형)',
      price: 90000,
      priceText: '90,000원',
      badge: 'BEST',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 1박스 (20롤)'],
      deliveryFee: '무료배송',
      detailDesc: `<h3>오염에 강해 오래 보존되는 라이트그레이 톤</h3>`
    },
    {
      id: 'best-27',
      name: 'LX소폭합지 롤판매 휘앙세 4092-1 블링화이트 펄 1롤(2평) 셀프도배 원룸 투룸 벽지',
      categoryName: '소폭합지',
      summary: '1롤 2평 낱개 롤판매로 필요한 만큼 알뜰하게 구매 가능',
      spec: '폭 53cm × 12.5m (1롤 2평)',
      price: 5300,
      priceText: '5,300원',
      badge: '인기',
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
      options: ['[필수] 옵션: 1롤 (2평)', '추가구매: 풀바른 상태로 받기 (+3,000원)'],
      deliveryFee: '3,000원 (5만원 이상 무료배송)',
      detailDesc: `<h3>벽 1면만 포인트로 도배할 때 최적의 낱개 롤판매</h3>`
    }
  ],
  wide: [
    {
      id: 'wide-1054',
      name: 'LX벽지 만능 풀바른벽지 장폭합지 휘앙세 49491-01 심플패브릭 화이트 초간단 셀프 벽지 친환경 1롤 5평 셀프도배 도배지',
      categoryName: '장폭합지',
      summary: '93cm 광폭으로 이음매가 적고 풀이 발라져 있어 바로 붙이는 편리함',
      spec: '폭 93cm × 17.8m (1롤 5평형, 만능 풀도포 완제품)',
      price: 22000,
      priceText: '22,000원',
      badge: 'HIT',
      image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 풀바른 상태 배송', '[선택] 옵션: 일반 종이벽지 상태 배송 (-3,000원)'],
      deliveryFee: '3,000원 (5만원 이상 무료배송)',
      detailDesc: `
        <h3>풀 갤 필요 없이 상자에서 꺼내 바로 벽에 붙이는 1초 만능풀</h3>
        <p>친환경 천연 옥수수/감자 전분풀을 기계로 균일하게 도포하여 밀폐 포장 발송해 드립니다.</p>
      `
    },
    {
      id: 'wide-1049',
      name: 'LX벽지 만능 풀바른벽지 장폭합지 휘앙세 49211-01 고운샌드 화이트 초간단 셀프 벽지 친환경 1롤 5평 셀프도배 도배지',
      categoryName: '장폭합지',
      summary: '미세 모래알 질감으로 고급스러운 벽면 텍스처 연출',
      spec: '폭 93cm × 1롤 (5평)',
      price: 22000,
      priceText: '22,000원',
      badge: 'BEST',
      image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 풀바른 상태 배송'],
      deliveryFee: '3,000원 (5만원 이상 무료배송)',
      detailDesc: `<h3>부드러운 모래알 텍스처로 우아한 실내 인테리어</h3>`
    },
    {
      id: 'wide-1066',
      name: 'LX벽지 만능 풀바른벽지 장폭합지 휘앙세 49476-03 트위드 라이트그레이 초간단 셀프 벽지 친환경 1롤 5평 셀프도배 도배지',
      categoryName: '장폭합지',
      summary: '직조 패브릭 질감으로 차분하고 정돈된 분위기',
      spec: '폭 93cm × 1롤 (5평)',
      price: 22000,
      priceText: '22,000원',
      badge: '',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 풀바른 상태 배송'],
      deliveryFee: '3,000원',
      detailDesc: `<h3>패브릭 원사의 정교한 직조감을 살린 모던 그레이</h3>`
    },
    {
      id: 'wide-1065',
      name: 'LX벽지 만능 풀바른벽지 장폭합지 휘앙세 49605-01 페인팅 화이트크림 초간단 셀프 벽지 친환경 1롤 5평 셀프도배 도배지',
      categoryName: '장폭합지',
      summary: '도장 페인트를 칠한 듯한 플랫하고 내추럴한 질감',
      spec: '폭 93cm × 1롤 (5평)',
      price: 22000,
      priceText: '22,000원',
      badge: '',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 옵션: 풀바른 상태 배송'],
      deliveryFee: '3,000원',
      detailDesc: `<h3>무광 페인트를 롤러로 칠한 듯한 세련된 도장 마감</h3>`
    }
  ],
  silk: [
    {
      id: 'silk-1305',
      name: 'LX 디아망 PR043-01 마띠에르 순백 실크벽지 셀프도배 만능풀바른벽지',
      categoryName: '실크벽지',
      summary: '호텔급 하이엔드 딥 엠보 실크벽지, 물걸레 청소 가능',
      spec: '폭 106cm × 길이 15.6m (1롤 5평)',
      price: 65000,
      priceText: '65,000원',
      badge: 'MD추천',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 상태: 만능 풀바른벽지 완제품', '[선택] 상태: 일반 롤 벽지 (풀없음)'],
      deliveryFee: '무료배송',
      detailDesc: `
        <h3>독보적인 입체감, LX 디아망(DIAMANT) 프리미엄 컬렉션</h3>
        <p>일반 실크벽지 대비 3배 이상의 두께감과 깊은 엠보싱으로 벽면의 요철을 완벽히 감춰주며, 오염 물질도 물걸레로 손쉽게 닦아낼 수 있습니다.</p>
      `
    },
    {
      id: 'silk-1306',
      name: 'LX 디아망 PR043-02 마띠에르 크림 실크벽지 셀프도배 만능풀바른벽지',
      categoryName: '실크벽지',
      summary: '따스하고 우아한 웜크림 톤의 프리미엄 실크벽지',
      spec: '폭 106cm × 15.6m (5평)',
      price: 65000,
      priceText: '65,000원',
      badge: 'BEST',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 상태: 만능 풀바른벽지 완제품'],
      deliveryFee: '무료배송',
      detailDesc: `<h3>우아하고 차분한 웜크림 톤으로 아늑한 공간 완성</h3>`
    },
    {
      id: 'silk-1307',
      name: 'LX 디아망 PR043-03 마띠에르 뉴트럴 화이트 실크벽지 셀프도배 만능풀바른벽지',
      categoryName: '실크벽지',
      summary: '조명에 따라 다채로운 음영을 선사하는 뉴트럴 화이트',
      spec: '폭 106cm × 15.6m (5평)',
      price: 65000,
      priceText: '65,000원',
      badge: '',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 상태: 만능 풀바른벽지 완제품'],
      deliveryFee: '무료배송',
      detailDesc: `<h3>빛의 각도에 따라 은은하게 반짝이는 뉴트럴 화이트</h3>`
    },
    {
      id: 'silk-1308',
      name: 'LX 디아망 PR044-01 샌드 스타코 화이트 실크벽지 셀프도배 만능풀바른벽지',
      categoryName: '실크벽지',
      summary: '프랑스 스투코 미장 공법의 회벽 질감을 완벽 구현',
      spec: '폭 106cm × 15.6m (5평)',
      price: 65000,
      priceText: '65,000원',
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      options: ['[선택] 상태: 만능 풀바른벽지 완제품'],
      deliveryFee: '무료배송',
      detailDesc: `<h3>고급 갤러리나 카페에서 볼 수 있는 정통 회벽 스투코 질감</h3>`
    }
  ],
  tools: [
    {
      id: 'tool-65',
      name: '정배솔 (270mm)',
      categoryName: '도배용품',
      summary: '도배 시공 시 벽지를 쓸어내릴 때 사용하는 고탄성 필수 공구',
      spec: '길이 270mm / 말총 혼합모',
      price: 13000,
      priceText: '13,000원',
      badge: '필수',
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      options: ['[필수] 수량: 1개'],
      deliveryFee: '3,000원',
      detailDesc: `
        <h3>도배 마감의 퀄리티를 결정하는 장인 정배솔</h3>
        <p>벽지에 손상을 주지 않고 부드럽게 공기 방울을 밀어내어 구김 없는 완벽한 밀착을 돕습니다.</p>
      `
    },
    {
      id: 'tool-83',
      name: '가루풀 (500g)',
      categoryName: '도배용품',
      summary: '도배 작업 시 물에 바로 개어 쓰는 천연 전분 인스턴트 가루풀',
      spec: '500g (물 8~10L와 혼합)',
      price: 6000,
      priceText: '6,000원',
      badge: '',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      options: ['[필수] 수량: 1봉 (500g)'],
      deliveryFee: '3,000원',
      detailDesc: `<h3>찬물에도 30초 만에 덩어리 없이 개어지는 친환경 가루풀</h3>`
    },
    {
      id: 'tool-85',
      name: '도배붓 (막솔)',
      categoryName: '도배용품',
      summary: '벽지에 풀칠할 때 고르게 도포해주는 전문가용 도배붓',
      spec: '폭 160mm',
      price: 2600,
      priceText: '2,600원',
      badge: '',
      image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80',
      options: ['[필수] 수량: 1개'],
      deliveryFee: '3,000원',
      detailDesc: `<h3>풍성한 붓모로 풀을 듬뿍 머금어 빠르고 균일하게 도포</h3>`
    },
    {
      id: 'tool-1302',
      name: '[도배용품] 새롬 도배풀 1포(6봉) 5.5kg 도배용 습식 다용도 도배부자재 오늘출발',
      categoryName: '도배용품',
      summary: '현장에서 널리 쓰이는 대용량 습식 친환경 완제품 풀',
      spec: '1포 6봉 (총 5.5kg)',
      price: 6500,
      priceText: '6,500원',
      badge: '오늘출발',
      image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80',
      options: ['[필수] 수량: 1포 (6봉)'],
      deliveryFee: '4,000원',
      detailDesc: `<h3>물만 살짝 타서 바로 쓰는 국내 시공 전문가 1위 도배풀</h3>`
    }
  ]
};

// 4. 새로운 신상품 (NEW ARRIVALS)
export const NEW_ARRIVALS = [
  {
    id: 'new-1305',
    name: 'LX 디아망 PR043-01 마띠에르 순백 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '순백의 깨끗함과 프랑스 회벽의 깊은 질감',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품', '일반 롤 벽지 (풀없음)'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>LX 디아망 2025/2026 베스트 신상품 컬렉션</h3>`
  },
  {
    id: 'new-1306',
    name: 'LX 디아망 PR043-02 마띠에르 크림 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '따스하고 포근한 웜톤 인테리어의 완성',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품', '일반 롤 벽지 (풀없음)'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>자연스러운 크림 컬러와 고급스러운 마띠에르 텍스처</h3>`
  },
  {
    id: 'new-1307',
    name: 'LX 디아망 PR043-03 마띠에르 뉴트럴 화이트 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '세련된 뉴트럴 톤으로 어느 가구와도 조화',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>빛에 따라 오묘한 질감을 연출하는 뉴트럴 화이트</h3>`
  },
  {
    id: 'new-1308',
    name: 'LX 디아망 PR044-01 샌드 스타코 화이트 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '정교한 모래알 스투코 텍스처',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>벽면 결점을 완벽히 커버해주는 딥 엠보 샌드 스타코</h3>`
  },
  {
    id: 'new-1309',
    name: 'LX 디아망 PR044-02 샌드 스타코 라이트 그레이 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '모던하고 시크한 라이트그레이 미장 질감',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>도심 속 모던 하우스를 위한 프리미엄 라이트그레이</h3>`
  },
  {
    id: 'new-1310',
    name: 'LX 디아망 PR044-03 샌드 스타코 웜 화이트 실크벽지 셀프도배 만능풀바른벽지',
    categoryName: '실크벽지',
    price: 65000,
    priceText: '65,000원',
    summary: '눈이 편안하고 온화한 웜화이트 스투코',
    spec: '폭 106cm × 15.6m (5평)',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    options: ['만능 풀바른벽지 완제품'],
    deliveryFee: '무료배송',
    detailDesc: `<h3>따스한 햇살이 머무는 웜화이트 텍스처</h3>`
  }
];

// Helper: 전체 상품 목록 및 ID 검색기
export const ALL_PRODUCTS = [
  ...SASH_PRODUCTS,
  ...FLOORING_PRODUCTS,
  ...WALL_BOARD_PRODUCTS,
  ...BEST_TAB_PRODUCTS.narrow,
  ...BEST_TAB_PRODUCTS.wide,
  ...BEST_TAB_PRODUCTS.silk,
  ...BEST_TAB_PRODUCTS.tools,
  ...NEW_ARRIVALS
];

export function getProductById(id) {
  if (!id) return ALL_PRODUCTS[0];
  const query = String(id).trim().toLowerCase();
  // 1. Exact match
  const exact = ALL_PRODUCTS.find(p => p.id.toLowerCase() === query);
  if (exact) return exact;

  // 2. Suffix match (e.g. '510' matching 'sash-510', '1305' matching 'silk-1305')
  const suffix = ALL_PRODUCTS.find(p => p.id.toLowerCase().endsWith(`-${query}`));
  if (suffix) return suffix;

  // 3. Partial substring match
  const partial = ALL_PRODUCTS.find(p => p.id.toLowerCase().includes(query));
  if (partial) return partial;

  return ALL_PRODUCTS[0];
}
