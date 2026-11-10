import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'panelka-theme';

type Theme = 'light' | 'dark';

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle() {
  // Начальное значение совпадает с инлайн-скриптом в <head> — без рассинхрона.
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(currentTheme());

    // Если пользователь не выбирал тему вручную — следуем за системной.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      let stored: string | null = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* игнорируем */ }
      if (!stored) {
        const next: Theme = media.matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }
    };
    media.addEventListener('change', onSystemChange);
    return () => media.removeEventListener('change', onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* игнорируем */ }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="site-header__icon-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
