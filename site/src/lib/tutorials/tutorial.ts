// Общий тип и построитель путей для пошаговых инструкций.
// Интерактивный просмотр использует WebM/MP4, текстовая версия —
// лёгкие JPG-кадры (или GIF там, где нужна анимация без плеера).

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export interface TutorialStep {
  title: string;
  description?: string;
  media?: {
    src?: string;
    webm?: string;
    mp4?: string;
    poster?: string;
    alt?: string;
  };
}

export function makeStep(
  mode: '1c' | 'web',
  scenario: string,
  name: string,
  title: string,
  description: string,
  staticFormat: 'poster' | 'gif' = 'poster',
): TutorialStep {
  return {
    title,
    description,
    media: tutorialMedia(mode, scenario, name, `${title}. ${description}`, staticFormat),
  };
}

export function tutorialMedia(
  mode: '1c' | 'web',
  scenario: string,
  name: string,
  alt: string,
  staticFormat: 'poster' | 'gif' = 'poster',
) {
  const dir = `${BASE}media/${mode}/${scenario}`;
  const extension = staticFormat === 'gif' ? 'gif' : 'jpg';
  return {
    src: `${dir}/${name}.${extension}`,
    webm: `${dir}/${name}.webm`,
    mp4: `${dir}/${name}.mp4`,
    poster: `${dir}/${name}.jpg`,
    alt,
  };
}
