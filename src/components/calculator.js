// SMART ROOM WALLPAPER CALCULATOR (스마트 도배 소요량 계산기)

export class WallpaperCalculator {
  constructor(cartCallback) {
    this.cartCallback = cartCallback;
    this.currentMode = 'preset'; // 'preset' or 'custom'
    this.selectedType = 'pasted'; // 'pasted', 'narrow', 'wide', 'silk'
    this.activePreset = 'single_room_6';
  }

  // 계산 공식
  calculate(params) {
    let wallAreaPy = 0;
    let floorPy = 0;

    if (params.mode === 'preset') {
      const presets = {
        'single_room_6': { floor: 6, wall: 15 },
        'two_room_12': { floor: 12, wall: 30 },
        'apt_24': { floor: 24, wall: 60 },
        'apt_32': { floor: 32, wall: 80 },
        'accent_wall_1': { floor: 2, wall: 3.5 }
      };
      const p = presets[params.presetId] || presets['single_room_6'];
      floorPy = p.floor;
      wallAreaPy = p.wall;
    } else {
      // 실측 치수: 가로(m), 세로(m), 높이(m, 기본 2.3m)
      const w = parseFloat(params.width) || 3;
      const l = parseFloat(params.length) || 3;
      const h = parseFloat(params.height) || 2.3;
      const doors = parseInt(params.doors) || 1;
      const windows = parseInt(params.windows) || 1;

      // 둘레 * 높이 = 총 벽면적 (㎡) - (문/창문 평균 면적 2.5㎡ 차감)
      const perimeter = (w + l) * 2;
      const grossAreaSqM = perimeter * h;
      const deductionSqM = (doors * 2.0) + (windows * 1.5);
      const netAreaSqM = Math.max(grossAreaSqM - deductionSqM, 5);
      
      // ㎡를 평으로 환산 (1평 = 3.3058㎡)
      wallAreaPy = netAreaSqM / 3.3058;
      floorPy = (w * l) / 3.3058;
    }

    // 로스율 10% 추가
    const adjustedWallPy = wallAreaPy * 1.1;

    // 벽지 타입별 롤 계산
    // 1) 만능 풀바른 벽지 (폭 93cm * 2.4m = 1폭 = 약 0.68평 시공)
    const pastedPieces = Math.ceil(adjustedWallPy / 0.68);

    // 2) 소폭합지 (폭 53cm, 1롤 2평)
    const narrowRolls = Math.ceil(adjustedWallPy / 2.0);

    // 3) 장폭합지 (폭 93cm, 1롤 5평)
    const wideRolls = Math.ceil(adjustedWallPy / 5.0);

    // 4) 실크벽지 (폭 106cm, 1롤 5평)
    const silkRolls = Math.ceil(adjustedWallPy / 5.0);

    // 추천 부자재
    const gluePacks = Math.ceil(adjustedWallPy / 10); // 10평당 가루풀 1봉
    const needToolKit = true;

    return {
      floorPy: Math.round(floorPy * 10) / 10,
      wallAreaPy: Math.round(wallAreaPy * 10) / 10,
      adjustedWallPy: Math.round(adjustedWallPy * 10) / 10,
      pasted: {
        rolls: pastedPieces,
        unit: '폭 (2.4m 완제품)',
        desc: '재단 및 풀칠 불필요, 1폭씩 벽면에 바로 부착',
        estPrice: pastedPieces * 18500
      },
      narrow: {
        rolls: narrowRolls,
        unit: '롤 (1롤 2평)',
        desc: '폭 53cm로 가볍고 혼자 잡기 편함 (가성비 최고)',
        estPrice: narrowRolls * 5200
      },
      wide: {
        rolls: wideRolls,
        unit: '롤 (1롤 5평)',
        desc: '폭 93cm 광폭으로 이음매가 적고 깔끔',
        estPrice: wideRolls * 21000
      },
      silk: {
        rolls: silkRolls,
        unit: '롤 (1롤 5평)',
        desc: '호텔급 입체 엠보, 오염 세척 가능, 최고급 마감',
        estPrice: silkRolls * 64000
      },
      tools: {
        glueCount: gluePacks,
        kitRecommended: needToolKit
      }
    };
  }
}
