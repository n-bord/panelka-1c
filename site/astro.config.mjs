// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeDocsLinks } from './src/plugins/rehype-docs-links.mjs';

// Базовый путь для GitHub Pages вида https://<user>.github.io/<repo>/.
// Локально — '/', при публикации путь и домен передаёт GitHub Actions.
const basePath = process.env.BASE_PATH || '/';
const base = basePath.endsWith('/') ? basePath : `${basePath}/`;

const markdown = {
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  rehypePlugins: [
    rehypeDocsLinks,
    // Якорные ссылки у заголовков: знак # появляется при наведении.
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
        properties: {
          class: 'heading-anchor',
          ariaLabel: 'Ссылка на этот раздел',
          tabIndex: -1,
        },
        content: { type: 'text', value: '#' },
      },
    ],
  ],
};

export default defineConfig({
  site: process.env.SITE_URL,
  base,
  // MDX по умолчанию наследует общий markdown-конфиг (extendMarkdownConfig).
  integrations: [react(), mdx()],
  // Статическая генерация — сайт полностью работает без backend.
  output: 'static',
  markdown,
});
