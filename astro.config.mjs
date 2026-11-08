// @ts-check
import { defineConfig } from 'astro/config';

// 주소는 daheon.art (2026-11-07 결정). 호스팅은 GitHub Pages, 도메인 등록과 DNS는 Cloudflare (2026-11-08 결정).
export default defineConfig({
  site: 'https://daheon.art',
  trailingSlash: 'always',
});
