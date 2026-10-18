// ROOM VISUALIZER STUDIO (3D/2D 룸 텍스처 시뮬레이터)

export const ROOM_SCENES = [
  {
    id: 'living',
    name: '모던 거실 (Living Room)',
    icon: '🛋️',
    desc: '소파와 플로어 스탠드가 배치된 미니멀 거실 공간'
  },
  {
    id: 'bedroom',
    name: '아늑한 침실 (Bedroom)',
    icon: '🛏️',
    desc: '원목 협탁과 간접 조명이 비치는 휴식 침실 공간'
  },
  {
    id: 'study',
    name: '감성 서재/작업실 (Study)',
    icon: '🪴',
    desc: '책상과 선반, 플랜테리어가 조화된 작업 공간'
  }
];

export const LIGHTING_MODES = [
  { id: 'daylight', name: '자연광 (5500K)', kelvin: '5500K', filter: 'brightness(1.05) contrast(1.02)' },
  { id: 'neutral', name: '주백색 (4000K)', kelvin: '4000K', filter: 'sepia(0.08) brightness(1.02)' },
  { id: 'warm', name: '전구색 (3000K)', kelvin: '3000K', filter: 'sepia(0.28) saturate(1.15) brightness(0.96)' }
];

export const SIMULATOR_WALLPAPERS = [
  {
    id: 'pure-white',
    name: '마띠에르 퓨어 화이트',
    type: '스투코 미장 질감',
    baseColor: '#F8F9FA',
    patternType: 'stucco',
    productId: 'wk-pasted-01'
  },
  {
    id: 'natural-sand',
    name: '샌드 내추럴 베이지',
    type: '소프트 샌드 질감',
    baseColor: '#F2ECE4',
    patternType: 'sand',
    productId: 'wk-pasted-02'
  },
  {
    id: 'tweed-gray',
    name: '트위드 쿨 그레이',
    type: '모던 패브릭 직조',
    baseColor: '#DEE2E6',
    patternType: 'fabric',
    productId: 'wk-pasted-03'
  },
  {
    id: 'sage-green',
    name: '어반 세이지 그레이',
    type: '감성 미장 콘크리트',
    baseColor: '#CCD5CC',
    patternType: 'stucco',
    productId: 'wk-silk-02'
  },
  {
    id: 'snow-painting',
    name: '페인팅 스노우 화이트',
    type: '매트 프리미엄 도장',
    baseColor: '#FAF8F5',
    patternType: 'fine',
    productId: 'wk-silk-01'
  }
];
