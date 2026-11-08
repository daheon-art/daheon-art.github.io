import { getCollection, type CollectionEntry } from 'astro:content';
import { SERIES } from '../data/series';

export type Work = CollectionEntry<'works'>;

const seriesOrder = (code: string) => SERIES.findIndex((s) => s.code === code);

// 연작 순서 → 연도 내림차순 → 번호 내림차순
export function sortWorks(list: Work[]): Work[] {
  return [...list].sort((a, b) => {
    const s = seriesOrder(a.data.series) - seriesOrder(b.data.series);
    if (s) return s;
    const y = (b.data.year ?? 0) - (a.data.year ?? 0);
    if (y) return y;
    return b.data.num.localeCompare(a.data.num);
  });
}

export async function getWorks(): Promise<Work[]> {
  return sortWorks(await getCollection('works'));
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ''));

// 세로 × 가로 cm
export function sizeText(w: Work): string {
  const { height_cm: h, width_cm: wd } = w.data;
  if (h == null || wd == null) return '';
  return `${fmt(h)} × ${fmt(wd)} cm`;
}

export function yearRange(list: Work[]): string {
  const ys = list.map((w) => w.data.year).filter((y): y is number => y != null);
  if (!ys.length) return '';
  const a = Math.min(...ys);
  const b = Math.max(...ys);
  return a === b ? `${a}` : `${a}–${b}`;
}

export const workUrl = (w: Work) => `/works/${w.id}/`;
export const altText = (w: Work) => [w.data.title_ko, w.data.year].filter(Boolean).join(', ');
