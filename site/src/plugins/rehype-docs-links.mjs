import { visit } from 'unist-util-visit';

/**
 * Относительные ссылки между статьями документации.
 *
 * В статьях можно ссылаться на соседние материалы так, как они лежат
 * в src/content/docs, с расширением или без:
 *
 *   [Создание страницы](./pages/create-page)
 *   [Быстрый старт](../getting-started.mdx)
 *
 * Плагин превращает такие ссылки в маршруты сайта от корня документации:
 * снимает расширение .md/.mdx и добивает завершающий слэш. Абсолютные
 * и внешние ссылки не трогает.
 */
export function rehypeDocsLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      let href = node.properties?.href;
      if (typeof href !== 'string') return;
      if (!href.startsWith('./') && !href.startsWith('../')) return;

      // Отделяем якорь, если есть.
      let hash = '';
      const hashIndex = href.indexOf('#');
      if (hashIndex >= 0) {
        hash = href.slice(hashIndex);
        href = href.slice(0, hashIndex);
      }
      if (!href) {
        node.properties.href = hash;
        return;
      }

      href = href.replace(/\.(md|mdx)$/i, '');
      if (!href.endsWith('/')) href += '/';
      node.properties.href = href + hash;
    });
  };
}
