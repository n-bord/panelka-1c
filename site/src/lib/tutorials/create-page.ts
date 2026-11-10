// Реальные записи настройки общей панели, нарезанные tools/media/slice.py.
// Оба режима чтения статьи используют эти данные как единый источник.

import { tutorialMedia, type TutorialStep } from './tutorial';

export const createPageSteps1c: TutorialStep[] = [
  {
    title: 'Откройте настройки общей панели',
    description: 'В командной панели обработки выберите «Настройки» → «Настроить общую панель».',
    media: tutorialMedia('1c', 'create-page', '01-otkroyte-nastrojki', 'Открытие настроек общей панели в интерфейсе 1С'),
  },
  {
    title: 'Добавьте страницу',
    description: 'Нажмите правой кнопкой по странице «Главная» и выберите «Добавить страницу».',
    media: tutorialMedia('1c', 'create-page', '02-dobavte-stranicu', 'Команда «Добавить страницу» в контекстном меню'),
  },
  {
    title: 'Укажите название',
    description: 'Введите название новой страницы, например «Мой склад».',
    media: tutorialMedia('1c', 'create-page', '03-ukazhite-nazvanie', 'Ввод названия новой страницы в интерфейсе 1С'),
  },
  {
    title: 'Выберите картинку',
    description: 'Откройте «Выбрать картинку…», найдите «склад» и выберите подходящую пиктограмму.',
    media: tutorialMedia('1c', 'create-page', '04-vyberite-kartinku', 'Выбор картинки для страницы «Мой склад»'),
  },
  {
    title: 'Сохраните изменения',
    description: 'Нажмите «Сохранить и закрыть»: новая страница появится на общей панели.',
    media: tutorialMedia('1c', 'create-page', '05-sohranite-izmeneniya', 'Сохранённая страница «Мой склад» на общей панели'),
  },
];

export const createPageStepsWeb: TutorialStep[] = [
  {
    title: 'Добавьте страницу',
    description: 'В визуальном редакторе нажмите «+ Страница» рядом с вкладкой «Главная».',
    media: tutorialMedia('web', 'create-page', '01-dobavte-stranicu', 'Кнопка «+ Страница» в визуальном редакторе Панельки', 'gif'),
  },
  {
    title: 'Укажите название',
    description: 'В поле «Название» введите название раздела, например «Мой склад». Это название вкладки на панели.',
    media: tutorialMedia('web', 'create-page', '02-ukazhite-nazvanie', 'Ввод названия страницы в диалоге «Новая страница»', 'gif'),
  },
  {
    title: 'Пример — «Мой склад»',
    description: 'Проверьте название и нажмите «Создать».',
    media: tutorialMedia('web', 'create-page', '03-primer-moy-sklad', 'Название «Мой склад» и кнопка «Создать»', 'gif'),
  },
  {
    title: 'Страница создана',
    description: 'Название можно менять в свойствах справа.',
    media: tutorialMedia('web', 'create-page', '04-stranica-sozdana', 'Созданная страница и панель свойств', 'gif'),
  },
];
