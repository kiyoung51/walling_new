// WALLKING (월킹) 독자 카탈로그 데이터베이스
// 법적 리스크 없는 클린룸 벤치마킹 제품군 구성

export const CATEGORIES = [
  { id: 'all', name: '전체 상품', icon: '✨' },
  { id: 'pasted', name: '만능 풀바른 벽지', badge: '셀프추천 1위', icon: '💧' },
  { id: 'silk', name: '프리미엄 실크벽지', badge: '호텔급 질감', icon: '💎' },
  { id: 'wide', name: '장폭 친환경 합지', badge: '가성비 광폭', icon: '🌿' },
  { id: 'narrow', name: '소폭 합지 (2평 롤)', badge: '원룸/투룸용', icon: '🏠' },
  { id: 'tools', name: '도배공구 & 부자재', badge: '필수 장비', icon: '🧰' },
  { id: 'flooring', name: '친환경 바닥재/장판', badge: 'DIY 바닥', icon: '🪵' }
];

export const PRODUCTS = [
  // 1. 만능 풀바른 벽지 (초보자 최적화)
  {
    id: 'wk-pasted-01',
    name: '월킹 만능 풀바른벽지 - 마띠에르 퓨어 화이트 (풀칠완료)',
    category: 'pasted',
    categoryName: '만능 풀바른 벽지',
    price: 18500,
    originalPrice: 22000,
    unit: '1롤 (폭 93cm × 2.4m, 약 1평형)',
    specs: {
      width: '93cm',
      height: '240cm',
      coverage: '약 0.7평(벽면 1폭)',
      difficulty: '초급 (★☆☆☆☆)',
      material: '친환경 수성 접착제 완도포',
      texture: '미세 회벽 스투코 질감'
    },
    color: '#F8F9FA',
    accentColor: '#EDEDED',
    textureClass: 'texture-stucco',
    badge: 'BEST 1위',
    isBest: true,
    rating: 4.9,
    reviews: 1428,
    delivery: '오늘출발 (오후 2시 이전)',
    description: '물이나 풀을 갤 필요 없이 개봉 후 벽면에 바로 붙이는 1초 만능 풀바른 벽지입니다. 1인 가구, 원룸 부분 도배에 최적화되었습니다.'
  },
  {
    id: 'wk-pasted-02',
    name: '월킹 만능 풀바른벽지 - 샌드 내추럴 베이지 (웜톤 감성)',
    category: 'pasted',
    categoryName: '만능 풀바른 벽지',
    price: 18900,
    originalPrice: 23000,
    unit: '1롤 (폭 93cm × 2.4m, 1폭 단위)',
    specs: {
      width: '93cm',
      height: '240cm',
      coverage: '약 0.7평',
      difficulty: '초급 (★☆☆☆☆)',
      material: '천연 펄프 + 만능 항균풀',
      texture: '부드러운 모래알 샌드 텍스처'
    },
    color: '#F4EFEA',
    accentColor: '#E8DFC8',
    textureClass: 'texture-sand',
    badge: 'MD 추천',
    isBest: true,
    rating: 4.8,
    reviews: 890,
    delivery: '오늘출발',
    description: '은은하고 차분한 모래알 질감으로 조명을 받았을 때 따스한 웜톤 분위기를 극대화해주는 베스트셀러 벽지입니다.'
  },
  {
    id: 'wk-pasted-03',
    name: '월킹 만능 풀바른벽지 - 트위드 쿨 그레이 (모던 패브릭)',
    category: 'pasted',
    categoryName: '만능 풀바른 벽지',
    price: 19500,
    originalPrice: 24000,
    unit: '1롤 (폭 93cm × 2.4m)',
    specs: {
      width: '93cm',
      height: '240cm',
      coverage: '약 0.7평',
      difficulty: '초급 (★☆☆☆☆)',
      material: '패브릭 패턴지 + 점착 풀',
      texture: '패브릭 직조 트위드 텍스처'
    },
    color: '#E3E6E8',
    accentColor: '#CFD4D8',
    textureClass: 'texture-fabric',
    badge: '모던 인기',
    isBest: false,
    rating: 4.7,
    reviews: 620,
    delivery: '오늘출발',
    description: '호텔 라운지처럼 세련되고 단정한 느낌을 주는 모던 쿨 그레이 컬러입니다. 서재와 거실 포인트 벽면에 추천합니다.'
  },

  // 2. 프리미엄 실크벽지
  {
    id: 'wk-silk-01',
    name: '아키텍트 디아망급 딥 엠보 실크벽지 - 페인팅 스노우 화이트',
    category: 'silk',
    categoryName: '프리미엄 실크벽지',
    price: 64000,
    originalPrice: 72000,
    unit: '1롤 (폭 106cm × 15.6m, 약 5평 시공)',
    specs: {
      width: '106cm',
      height: '15.6m',
      coverage: '약 5평 (16.5㎡)',
      difficulty: '중고급 (★★★★☆)',
      material: '친환경 하이엔드 PVC 실크 코팅',
      texture: '도장 페인트 입체 마티에르'
    },
    color: '#FDFCFA',
    accentColor: '#F0ECE1',
    textureClass: 'texture-stucco',
    badge: '하이엔드 프리미엄',
    isBest: true,
    rating: 4.95,
    reviews: 1850,
    delivery: '내일 도착 보장',
    description: '특수 딥 엠보싱 공법으로 실제 무광 페인트 도장벽과 같은 깊이감 있는 텍스처를 구현합니다. 긁힘에 강하고 오염 물질을 물티슈로 쉽게 닦아낼 수 있습니다.'
  },
  {
    id: 'wk-silk-02',
    name: '아키텍트 딥 엠보 실크벽지 - 어반 세이지 그레이',
    category: 'silk',
    categoryName: '프리미엄 실크벽지',
    price: 66000,
    originalPrice: 75000,
    unit: '1롤 (폭 106cm × 15.6m, 약 5평 시공)',
    specs: {
      width: '106cm',
      height: '15.6m',
      coverage: '약 5평 (16.5㎡)',
      difficulty: '중고급 (★★★★☆)',
      material: '방염 친환경 실크벽지',
      texture: '미니멀 콘크리트 미장 텍스처'
    },
    color: '#D8DDD8',
    accentColor: '#BAC4BA',
    textureClass: 'texture-sand',
    badge: '인테리어 디자이너 픽',
    isBest: false,
    rating: 4.88,
    reviews: 512,
    delivery: '내일 도착 보장',
    description: '그레이와 세이지 그린이 오묘하게 섞여 자연스러운 휴식을 선사하는 프리미엄 컬러입니다. 침실과 안방 인테리어에 제격입니다.'
  },

  // 3. 장폭 합지 (광폭 친환경 합지)
  {
    id: 'wk-wide-01',
    name: '에코 순수 장폭합지 - 휘앙세핏 심플 클라우드 화이트',
    category: 'wide',
    categoryName: '장폭 친환경 합지',
    price: 21000,
    originalPrice: 26000,
    unit: '1롤 (폭 93cm × 17.8m, 약 5평 시공)',
    specs: {
      width: '93cm',
      height: '17.8m',
      coverage: '약 5평 (16.5㎡)',
      difficulty: '중급 (★★☆☆☆)',
      material: '100% 천연 펄프 친환경 종이지',
      texture: '자연스러운 한지 미세 엠보'
    },
    color: '#FAF9F6',
    accentColor: '#EAE6DF',
    textureClass: 'texture-stucco',
    badge: '가성비 1위',
    isBest: true,
    rating: 4.85,
    reviews: 2190,
    delivery: '오늘출발',
    description: '합지 특유의 통기성과 친환경성을 갖추었으며, 93cm 광폭으로 이음매가 적어 깔끔하고 경제적인 셀프 시공이 가능합니다.'
  },
  {
    id: 'wk-wide-02',
    name: '에코 순수 장폭합지 - 라이트 오트밀 베이지',
    category: 'wide',
    categoryName: '장폭 친환경 합지',
    price: 21000,
    originalPrice: 26000,
    unit: '1롤 (폭 93cm × 17.8m, 약 5평 시공)',
    specs: {
      width: '93cm',
      height: '17.8m',
      coverage: '약 5평 (16.5㎡)',
      difficulty: '중급 (★★☆☆☆)',
      material: '친환경 무독성 종이벽지',
      texture: '코튼 린넨 텍스처'
    },
    color: '#F2ECE1',
    accentColor: '#E2D5C3',
    textureClass: 'texture-fabric',
    badge: '스테디셀러',
    isBest: false,
    rating: 4.82,
    reviews: 940,
    delivery: '오늘출발',
    description: '편안하고 아늑한 분위기를 완성해주는 오트밀 톤 장폭합지입니다. 아이 방이나 서재에 추천합니다.'
  },

  // 4. 소폭 합지 (2평 롤)
  {
    id: 'wk-narrow-01',
    name: '이지롤 소폭합지 롤판매 - 블링 스노우 펄 화이트',
    category: 'narrow',
    categoryName: '소폭 합지 (2평 롤)',
    price: 5200,
    originalPrice: 6500,
    unit: '1롤 (폭 53cm × 12.5m, 약 2평 시공)',
    specs: {
      width: '53cm',
      height: '12.5m',
      coverage: '약 2평 (6.6㎡)',
      difficulty: '초급 (★☆☆☆☆)',
      material: '친환경 펄 코팅 합지',
      texture: '미세 펄 은은한 반사광'
    },
    color: '#FCFCFD',
    accentColor: '#F0F0F3',
    textureClass: 'texture-stucco',
    badge: '원룸 셀프 1위',
    isBest: true,
    rating: 4.79,
    reviews: 3410,
    delivery: '오늘출발',
    description: '폭이 53cm로 혼자서도 팔을 벌려 잡기 편해 여성 및 1인 가구 초보 도배사들의 원룸/원 포인트 벽 도배에 가장 인기 있는 상품입니다.'
  },
  {
    id: 'wk-narrow-02',
    name: '이지롤 소폭합지 롤판매 - 모던 라이트 웜그레이',
    category: 'narrow',
    categoryName: '소폭 합지 (2평 롤)',
    price: 5200,
    originalPrice: 6500,
    unit: '1롤 (폭 53cm × 12.5m, 약 2평 시공)',
    specs: {
      width: '53cm',
      height: '12.5m',
      coverage: '약 2평 (6.6㎡)',
      difficulty: '초급 (★☆☆☆☆)',
      material: '친환경 합지 도배지',
      texture: '모던 플랫 엠보'
    },
    color: '#E9EAE8',
    accentColor: '#D8D9D6',
    textureClass: 'texture-sand',
    badge: '착한 가격',
    isBest: false,
    rating: 4.75,
    reviews: 1205,
    delivery: '오늘출발',
    description: '오염에 강하고 어떤 가구와도 자연스럽게 조화되는 웜그레이 소폭합지입니다.'
  },

  // 5. 도배공구 & 부자재 (DIY 필수)
  {
    id: 'wk-tool-starter-set',
    name: '월킹 셀프도배 올인원 프로 공구 7종 풀세트',
    category: 'tools',
    categoryName: '도배공구 & 부자재',
    price: 19800,
    originalPrice: 28000,
    unit: '1세트 (정배솔+칼받이+도배칼+헤라+롤러+목공본드+장갑)',
    specs: {
      items: '고급 정배솔 270mm, 스테인리스 칼받이, 전문가용 커터칼, 플라스틱 헤라, 실리콘 롤러, 친환경 수성 본드, 도배 면장갑',
      difficulty: '모든 시공 필수품'
    },
    color: '#2B303A',
    accentColor: '#4A5568',
    textureClass: 'texture-tool',
    badge: '★ 공구 구매율 1위',
    isBest: true,
    rating: 4.96,
    reviews: 4200,
    delivery: '오늘출발',
    description: '도배 전문가들이 현장에서 실제 사용하는 필수 공구 7가지를 단 하나의 키트로 묶었습니다. 개별 구매 대비 30% 이상 저렴합니다.'
  },
  {
    id: 'wk-tool-glue-powder',
    name: '독일 친환경 인스턴트 가루풀 (500g 믹스용)',
    category: 'tools',
    categoryName: '도배공구 & 부자재',
    price: 5800,
    originalPrice: 7500,
    unit: '1봉 (500g, 벽지 약 10~15평 분량)',
    specs: {
      capacity: '500g (물 8~10L 혼합)',
      safety: '유해물질 무첨가, 냄새 없는 천연 전분'
    },
    color: '#F7FAFC',
    accentColor: '#E2E8F0',
    textureClass: 'texture-tool',
    badge: '냄새 無 친환경',
    isBest: false,
    rating: 4.88,
    reviews: 980,
    delivery: '오늘출발',
    description: '찬물에도 30초 만에 덩어리 없이 빠르게 풀리는 최고급 천연 감자전분 가루풀입니다. 냄새가 전혀 없어 시공 당일 취침이 가능합니다.'
  },
  {
    id: 'wk-tool-brush-pro',
    name: '장인 수제 말총 정배솔 (280mm 도배 전용)',
    category: 'tools',
    categoryName: '도배공구 & 부자재',
    price: 12500,
    originalPrice: 15000,
    unit: '1개',
    specs: {
      size: '길이 280mm × 모 길이 65mm',
      material: '최고급 천연 혼합모'
    },
    color: '#718096',
    accentColor: '#4A5568',
    textureClass: 'texture-tool',
    badge: '전문가용',
    isBest: false,
    rating: 4.92,
    reviews: 1530,
    delivery: '오늘출발',
    description: '벽지 손상 없이 공기 방울을 완벽하게 밀어내는 고탄성 말총 정배솔입니다.'
  },

  // 6. 친환경 바닥재/장판
  {
    id: 'wk-floor-01',
    name: '포레스트 에코 1.8T 친환경 륨 장판 - 내추럴 워시오크 (1m 단위)',
    category: 'flooring',
    categoryName: '친환경 바닥재/장판',
    price: 11900,
    originalPrice: 14500,
    unit: '1m 단위 절단판매 (폭 180cm × 길이 100cm 기준)',
    specs: {
      thickness: '1.8mm (1.8T)',
      width: '180cm 고정폭',
      coverage: '1m당 약 0.55평',
      feature: '항균 은나노 코팅, 미끄럼 방지'
    },
    color: '#D4C4A8',
    accentColor: '#BFA886',
    textureClass: 'texture-wood',
    badge: '바닥재 1위',
    isBest: true,
    rating: 4.87,
    reviews: 840,
    delivery: '맞춤 재단 후 화물배송',
    description: '자연스러운 원목 결의 입체감을 살린 1.8T 친환경 바닥재입니다. 층간소음 완화 및 충격 흡수 쿠션층이 적용되었습니다.'
  }
];

// 방 평수별 벽지 소요량 산출 팩터
export const ROOM_PRESETS = [
  { id: 'single_room_6', name: '원룸 (실 6평)', floorPy: 6, wallAreaPy: 15, recNarrow: 8, recWide: 3, recSilk: 3 },
  { id: 'two_room_12', name: '투룸 (실 12평)', floorPy: 12, wallAreaPy: 30, recNarrow: 16, recWide: 6, recSilk: 6 },
  { id: 'apt_24', name: '24평형 아파트 (방3/거실)', floorPy: 24, wallAreaPy: 60, recNarrow: 32, recWide: 13, recSilk: 13 },
  { id: 'apt_32', name: '32평형 아파트 (방3/거실/주방)', floorPy: 32, wallAreaPy: 80, recNarrow: 43, recWide: 17, recSilk: 17 },
  { id: 'accent_wall_1', name: '포인트 벽 1면 (가로 3m)', floorPy: 2, wallAreaPy: 3, recNarrow: 2, recWide: 1, recSilk: 1 }
];
