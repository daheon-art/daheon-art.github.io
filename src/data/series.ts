// 연작 정보. 순서가 곧 사이트에 보이는 순서다.
// E(번호 없는 옛 작품)의 이름은 임시. 작가와 정할 것.
// U(제목 미상)는 연작이 아니라 제목·번호를 확인 중인 그림을 모은 묶음이다. 처음 화면 연작 소개에는 넣지 않는다.
export type SeriesCode = 'L' | 'V' | 'W' | 'O' | 'E' | 'U';

export interface Series {
  code: SeriesCode;
  slug: string;
  ko: string;
  en: string;
  cover?: string; // 대표 작품 번호. 비우면 가장 최근 작품
  hideOnHome?: boolean; // 처음 화면 연작 소개에서 뺀다
}

export const SERIES: Series[] = [
  { code: 'L', slug: 'light', ko: '시공의 빛', en: 'Light of Time and Space' },
  { code: 'V', slug: 'variation', ko: '시공-변주', en: 'Light of Time and Space, Variation' },
  { code: 'W', slug: 'work', ko: '작품', en: 'Work' },
  { code: 'O', slug: 'old-times', ko: '古', en: 'Old Times' },
  { code: 'E', slug: 'other', ko: '그 밖의 작품', en: 'Other Works' },
  { code: 'U', slug: 'untitled', ko: '제목 미상', en: 'Title Unknown', hideOnHome: true },
];

// '제목 미상' 묶음 안내 문구
export const UNTITLED_NOTE = '제목과 작품 번호를 확인하고 있는 그림입니다.';

export const seriesByCode = (code: string) => SERIES.find((s) => s.code === code)!;
