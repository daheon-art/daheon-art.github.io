// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 주소는 daheon.art (2026-11-07 결정). 호스팅은 GitHub Pages, 도메인 등록과 DNS는 Cloudflare (2026-11-08 결정).
// 사이트맵은 빌드할 때 dist/sitemap-index.xml 로 만들어진다. 구글 Search Console에 이 주소를 제출한다.
export default defineConfig({
  site: 'https://daheon.art',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
