import { makeStep, type TutorialStep } from './tutorial';

export const usageExampleSteps1c: TutorialStep[] = [
  makeStep('1c', 'usage-example', '01-poisk-i-otkrytie', 'Найдите и откройте объект', 'Введите запрос «Пользователи» и откройте нужный список из результатов поиска.'),
  makeStep('1c', 'usage-example', '02-novoe-okno', 'Откройте объект в новом окне', 'В меню ссылки выберите «Открыть в новом окне».'),
  makeStep('1c', 'usage-example', '03-skopirujte-dannye', 'Скопируйте данные ссылки', 'В меню «Скопировать» доступны название, внутренняя и внешняя ссылки, а также подсказка.'),
  makeStep('1c', 'usage-example', '04-izbrannoe', 'Добавьте в избранное', 'Выберите команду «Добавить в избранное».'),
];

export const usageExampleStepsWeb: TutorialStep[] = [
  makeStep('web', 'usage-example', '01-poisk-i-otkrytie', 'Найдите и откройте объект', 'Введите запрос «Пользователи», отфильтруйте результаты и откройте нужный список.'),
  makeStep('web', 'usage-example', '02-novoe-okno', 'Откройте объект в новом окне', 'В контекстном меню ссылки выберите «Открыть в новом окне».'),
  makeStep('web', 'usage-example', '03-izbrannoe', 'Добавьте в избранное', 'Выберите «Добавить в избранное»: у ссылки появится отметка звездой.'),
  makeStep('web', 'usage-example', '05-temnaya-tema', 'Переключите тему панели', 'Включите тёмную тему панели и при необходимости вернитесь к светлой.'),
];
