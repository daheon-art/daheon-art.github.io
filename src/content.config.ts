// 작품 하나 = site/works/<번호>/ 폴더 하나 (info.md + image.jpg).
// 검수가 끝날 때까지 이 폴더들은 ../scripts/export_site.py 가 catalog/works.csv 에서 만든다.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({
    pattern: '*/info.md',
    base: './works',
    // 폴더 이름(작품 번호)을 그대로 id로 쓴다. 예: L-2304
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      key: z.string(),
      series: z.enum(['L', 'V', 'W', 'O', 'E', 'U']),
      num: z.string(),
      // 번호 미상(U) 작품의 일련번호. 이름표 catalog/unnamed.csv 의 미상번호
      unnamed_no: z.number().int().nullable().default(null),
      title_ko: z.string(),
      title_en: z.string().default(''),
      year: z.number().int().nullable(),
      height_cm: z.number().nullable(),
      width_cm: z.number().nullable(),
      medium_ko: z.string().default(''),
      medium_en: z.string().default(''),
      collection: z.string().default(''),
      exhibitions: z.array(z.string()).default([]),
      image: image(),
      image_source: z.string(),
      status: z.enum(['draft', 'reviewed']),
    }),
});

export const collections = { works };
