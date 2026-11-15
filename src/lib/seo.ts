// 검색 엔진과 공유 미리보기에 쓰는 설명 문구와 구조화 데이터(JSON-LD).
// 출생 연도처럼 사이트에서 뺀 정보는 여기에도 넣지 않는다.
import { ARTIST } from '../data/site';
import { UNTITLED_NOTE, type Series } from '../data/series';
import { sizeText, yearRange, type Work } from './works';

// astro.config.mjs 의 site 값 (https://daheon.art)
const SITE = import.meta.env.SITE;
export const abs = (path: string) => new URL(path, SITE).href;

export const SITE_NAME = `${ARTIST.ko} ${ARTIST.hanja}`;
const BY = `한국화가 ${ARTIST.ko}(${ARTIST.en})`;

export const DEFAULT_DESCRIPTION = `한국화가 ${ARTIST.ho} ${ARTIST.ko}(${ARTIST.hoHanja} ${ARTIST.hanja}, ${ARTIST.en})의 작품과 약력, 전시`;

// 예: 한국화가 김수길(Kim Soo-gil)의 〈시공의 빛 2304〉(Light of Time and Space 2304), 2023, 지본채묵, 46.3 × 65.3 cm
export function workDescription(w: Work): string {
  const d = w.data;
  if (d.series === 'U') return `${BY}의 ${d.title_ko}. ${UNTITLED_NOTE}`;
  const title = `〈${d.title_ko}〉${d.title_en ? `(${d.title_en})` : ''}`;
  return [`${BY}의 ${title}`, d.year, d.medium_ko, sizeText(w)].filter(Boolean).join(', ');
}

export function seriesDescription(s: Series, list: Work[]): string {
  if (s.code === 'U') return `${s.ko}(${s.en}) · ${list.length}점. ${BY}의 그림 가운데 ${UNTITLED_NOTE}`;
  const head = [`${s.ko}(${s.en})`, yearRange(list), `${list.length}점`].filter(Boolean).join(' · ');
  return `${head}. ${BY}의 작품`;
}

export const worksDescription = (count: number, seriesNames: string[]) =>
  `${BY}의 작품 ${count}점 (${seriesNames.join(', ')})`;

export const exhibitionsDescription = (count: number) => `${BY}의 전시 ${count}건`;

export const aboutDescription = (sectionTitles: string[]) =>
  `한국화가 ${ARTIST.ho} ${ARTIST.ko}(${ARTIST.hoHanja} ${ARTIST.hanja}, ${ARTIST.en})의 약력. ${sectionTitles.join(', ')}`;

// ----- 구조화 데이터 (schema.org) -----

const ARTIST_ID = abs('/#artist');

export const artistLd = () => ({
  '@type': 'Person',
  '@id': ARTIST_ID,
  name: ARTIST.ko,
  alternateName: [ARTIST.hanja, ARTIST.en, `${ARTIST.ho} ${ARTIST.ko}`, `${ARTIST.hoHanja} ${ARTIST.hanja}`],
  jobTitle: '한국화가',
  url: abs('/'),
});

export const homeLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: abs('/'),
      name: SITE_NAME,
      inLanguage: 'ko',
      about: { '@id': ARTIST_ID },
    },
    artistLd(),
  ],
});

export const aboutLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: abs('/about/'),
  mainEntity: artistLd(),
});

const cm = (v: number | null) => (v == null ? undefined : { '@type': 'QuantitativeValue', value: v, unitCode: 'CMT' });

export function workLd(w: Work, url: string) {
  const d = w.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: d.title_ko,
    alternateName: d.title_en || undefined,
    url,
    image: abs(d.image.src),
    creator: { '@type': 'Person', '@id': ARTIST_ID, name: ARTIST.ko },
    dateCreated: d.year ? String(d.year) : undefined,
    artMedium: d.medium_ko || undefined,
    height: cm(d.height_cm),
    width: cm(d.width_cm),
  };
}
