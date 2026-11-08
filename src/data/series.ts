// 연작 정보. 순서가 곧 사이트에 보이는 순서다.
// E(번호 없는 옛 작품)의 이름은 임시. 작가와 정할 것.
export type SeriesCode = 'L' | 'V' | 'W' | 'O' | 'E';

export interface Series {
  code: SeriesCode;
  slug: string;
  ko: string;
  en: string;
  cover?: string; // 대표 작품 번호. 비우면 가장 최근 작품
}

export const SERIES: Series[] = [
  { code: 'L', slug: 'light', ko: '시공의 빛', en: 'Light of Time and Space' },
  { code: 'V', slug: 'variation', ko: '시공-변주', en: 'Light of Time and Space, Variation' },
  { code: 'W', slug: 'work', ko: '작품', en: 'Work' },
  { code: 'O', slug: 'old-times', ko: '古', en: 'Old Times' },
  { code: 'E', slug: 'other', ko: '그 밖의 작품', en: 'Other Works' },
];

export const seriesByCode = (code: string) => SERIES.find((s) => s.code === code)!;
