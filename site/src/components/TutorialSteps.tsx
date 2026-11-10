import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import TutorialVideo from './TutorialVideo';
import type { TutorialStep } from '../lib/tutorials/tutorial';

interface Props {
  title: string;
  subtitle?: string;
  steps1c: TutorialStep[];
  stepsWeb?: TutorialStep[];
  /** Плашка в углу карточки, напр. «Пошаговый просмотр». */
  badge?: string;
}

type Mode = '1c' | 'web';

function readMode(): Mode {
  return document.documentElement.dataset.interface === 'web' ? 'web' : '1c';
}

/**
 * Интерактивный пошаговый просмотр инструкции.
 * Переключатель интерфейса внутри карточки связан с глобальным режимом
 * сайта (этап 4): те же кнопки data-interface-switch, то же сохранение.
 */
export default function TutorialSteps({ title, subtitle, steps1c, stepsWeb, badge }: Props) {
  const [mode, setMode] = useState<Mode>('1c');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMode(readMode());
    const onMode = (e: Event) => {
      setMode((e as CustomEvent<Mode>).detail);
      setIndex(0); // новая инструкция — с первого шага
    };
    window.addEventListener('panelka:interface', onMode);
    return () => window.removeEventListener('panelka:interface', onMode);
  }, []);

  const steps = mode === 'web' && stepsWeb ? stepsWeb : steps1c;
  const step = steps[index];
  const total = steps.length;
  const isLast = index === total - 1;

  return (
    <section className="tutorial" aria-label={title}>
      <header className="tutorial__header">
        <div className="tutorial__meta">
          {badge && <span className="tutorial__badge">{badge}</span>}
          <div className="tutorial__progress-info">
            <span>Шаг {index + 1} из {total}</span>
            <span className="tutorial__platform">{mode === '1c' ? '1С:Предприятие' : 'Веб-интерфейс'}</span>
          </div>
        </div>

        <h2 className="tutorial__title">{title}</h2>
        {subtitle && <p className="tutorial__subtitle">{subtitle}</p>}

        <div className="interface-switch tutorial__switch" role="tablist" aria-label="Режим интерфейса">
          <button type="button" role="tab" data-interface-switch="1c" data-react-interface-switch aria-selected={mode === '1c'}>
            Интерфейс 1С
          </button>
          <button type="button" role="tab" data-interface-switch="web" data-react-interface-switch aria-selected={mode === 'web'}>
            Веб-интерфейс
          </button>
        </div>

        <div className="tutorial__progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total}>
          {steps.map((_, i) => (
            <span key={i} className={i <= index ? 'filled' : ''} />
          ))}
        </div>
      </header>

      <div className="tutorial__step" key={`${mode}-${index}`}>
        <h3 className="tutorial__step-title">{step.title}</h3>
        {step.description && <p className="tutorial__step-desc">{step.description}</p>}
        <TutorialVideo
          src={step.media?.src}
          webm={step.media?.webm}
          mp4={step.media?.mp4}
          poster={step.media?.poster}
          alt={step.media?.alt ?? step.title}
          placeholder={`Здесь будет видео или GIF шага ${index + 1}`}
        />
      </div>

      <footer className="tutorial__footer">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft size={15} aria-hidden />
          Назад
        </button>
        {isLast ? (
          <button type="button" className="btn btn--primary" onClick={() => setIndex(0)}>
            <RotateCcw size={15} aria-hidden />
            Начать заново
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
            Следующий шаг
            <ArrowRight size={15} aria-hidden />
          </button>
        )}
      </footer>
    </section>
  );
}
