# Панелька — сайт документации

Статический сайт документации обработки «Панелька» для 1С:Предприятие.

О запуске самой обработки и её возможностях см. [основной README](../README.md).
Здесь описаны локальный просмотр, сборка сайта и редактирование статей.

## Стек

- **Astro 5** — статическая генерация, маршрутизация, content collections.
- **React 19** (`@astrojs/react`) — интерактивные пошаговые инструкции с видео.
- **MDX** (`@astrojs/mdx`) — формат статей документации.
- **TypeScript**, **Lucide Icons**.
- CSS без UI-фреймворка, светлая и тёмная темы.

## Команды

Команды выполняются из каталога `site/`:

```bash
npm ci           # установка зависимостей по package-lock.json
npm run dev      # локальная разработка
npm run build    # production-сборка в dist/
npm run preview  # проверка production-сборки
```

## Структура

```text
src/
  content/docs/     # статьи документации (MDX), структура папок = URL
  content.config.ts # схема коллекции документации
  lib/docs-nav.ts   # конфигурация боковой навигации
  layouts/          # каркасы страниц
  pages/            # index и динамический маршрут docs/[...slug]
  components/       # React- и Astro-компоненты
public/
  media/            # видеозаписи, постеры и метаданные шагов
  downloads/        # XML демонстрационной раскладки
```

Новая статья: добавить MDX-файл в `src/content/docs/` и строку в
`src/lib/docs-nav.ts`. Компоненты менять не нужно.

## Написание статей

Frontmatter: `title` (обязателен), `description`, `order`, `draft`
(черновики не попадают в сборку).

Ссылки между статьями — относительные, как файлы лежат в `src/content/docs`,
с расширением или без: `[Быстрый старт](./getting-started)`,
`[Создание страницы](../pages/create-page.mdx#параметры-страницы)`.

Дополнительные компоненты (импортируются в начале MDX-файла):

```mdx
import Note from '../../components/Note.astro';
import Warning from '../../components/Warning.astro';
import Details from '../../components/Details.astro';

<Note title="Подсказка">текст</Note>
<Note variant="tip">короткий совет</Note>
<Warning>предупреждение</Warning>
<Warning variant="danger">критичное предупреждение</Warning>
<Details summary="Подробнее">скрытое содержимое</Details>
```

Переключение интерфейсов 1С/веб внутри статьи (режим глобальный:
сохраняется между статьями, поддерживает `?interface=1c|web`):

```mdx
import InterfaceTabs from '../../components/InterfaceTabs.astro';
import InterfaceTab from '../../components/InterfaceTab.astro';

Общий текст статьи — не дублируется.

<InterfaceTabs>
<InterfaceTab mode="1c">

## Раздел для интерфейса 1С
Шаги, изображения и примечания для форм 1С.

</InterfaceTab>
<InterfaceTab mode="web">

## Раздел для веб-интерфейса
Шаги, изображения и примечания для HTML-режима.

</InterfaceTab>
</InterfaceTabs>
```

Поддерживается GFM: таблицы, чек-листы, зачёркивание. Код подсвечивается
Shiki (включая язык 1С — `bsl`/`1c`), у блоков кода есть кнопка копирования.
У заголовков — якорные ссылки (# появляется при наведении). Содержание
статьи справа формируется автоматически из заголовков H2/H3.

Изображения: кладите файл в `src/assets/` и импортируйте в MDX —
так Astro подставит правильный путь с учётом `BASE_PATH`:

```mdx
import logo from '../../assets/media/panelka.gif';

<img class="pixel" src={logo.src} alt="…" width="112" height="112" />
```

## GitHub Pages

Сборка под адрес вида `https://<user>.github.io/<repo>/`:

```bash
BASE_PATH=/<repo> npm run build
```

Для репозитория `panelka-1c` используйте `BASE_PATH=/panelka-1c/`.
Каталог публикации — `dist/`; Node.js на сервере не требуется.
Автоматическая сборка и публикация настроены в
[`docs-pages.yml`](../.github/workflows/docs-pages.yml). Путь и домен сайт получает
из настроек GitHub Pages. Публикация запускается при изменении `site/` в ветке `main`
или вручную из Actions.

Перед первым запуском включите **Settings → Pages → Source → GitHub Actions**.
Полная [инструкция по публикации](../PUBLISHING.md) находится в корне репозитория.
