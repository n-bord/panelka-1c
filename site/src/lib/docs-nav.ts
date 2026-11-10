// Единственный источник правды о структуре документации.
// Новая статья добавляется в src/content/docs и одной строкой сюда —
// без изменения компонентов (см. этап 3 ТЗ).

export interface NavEntry {
  /** Относительный путь файла без расширения, напр. 'pages/create-page'.
      Только у страниц; у групп отсутствует. */
  slug?: string;
  /** Подпись: обязательна для групп, для страниц можно опустить —
      тогда берётся title статьи. */
  label?: string;
  children?: NavEntry[];
}

export const docsNav: NavEntry[] = [
  {
    label: 'Начало работы',
    children: [
      { slug: 'introduction' },
      { slug: 'getting-started' },
      { slug: 'ut-example' },
      { slug: 'compatibility' },
    ],
  },
  {
    label: 'Интерфейс',
    children: [
      { slug: 'interface/overview' },
      { slug: 'interface/usage-example' },
    ],
  },
  {
    label: 'Настройки',
    children: [
      { slug: 'settings/general' },
      { slug: 'pages/create-page', label: 'Страницы, колонки и ссылки' },
      { slug: 'pages/sources' },
      { slug: 'settings/import-export' },
      { slug: 'settings/personal-panel', label: 'Личная панель: пользователю' },
      { slug: 'settings/personal-panel-admin', label: 'Личные панели: администратору' },
    ],
  },
  {
    label: 'Справка',
    children: [{ slug: 'faq' }],
  },
];

/** Плоский список страниц в порядке навигации — для «предыдущая/следующая». */
export function flattenNav(entries: NavEntry[] = docsNav): string[] {
  const out: string[] = [];
  for (const entry of entries) {
    if (entry.slug) out.push(entry.slug);
    if (entry.children) out.push(...flattenNav(entry.children));
  }
  return out;
}

/** Группа, в которую входит страница (для хлебных крошек). */
export function parentGroupOf(slug: string, entries: NavEntry[] = docsNav): string | null {
  for (const entry of entries) {
    if (entry.slug === slug) return null;
    if (entry.children) {
      if (entry.children.some((c) => c.slug === slug)) return entry.label ?? null;
      const nested = parentGroupOf(slug, entry.children);
      if (nested) return nested;
    }
  }
  return null;
}
