import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, Clapperboard } from 'lucide-react';

interface Props {
  /** Единственный источник (GIF/картинка или видео). */
  src?: string;
  /** Видеоисточники по приоритету: WebM, затем MP4. */
  webm?: string;
  mp4?: string;
  /** Обложка, показывается до загрузки видео. */
  poster?: string;
  alt?: string;
  /** Подпись в нижней панели плеера. */
  label?: string;
  /** Текст заглушки, когда материал ещё не записан. */
  placeholder?: string;
}

const IMAGE_RE = /\.(gif|png|jpe?g|webp|avif)(\?.*)?$/i;

/**
 * Видео/GIF для пошаговых инструкций.
 * Автозапуск без звука, повтор, пауза вне экрана, отложенная загрузка,
 * полноэкранный режим. GIF загружаются лениво нативно.
 */
export default function TutorialVideo({ src, webm, mp4, poster, alt = '', label, placeholder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isImage = src ? IMAGE_RE.test(src) && !webm && !mp4 : false;
  const hasVideo = Boolean(webm || mp4 || (src && !isImage));
  const hasMedia = hasVideo || Boolean(src);

  // Пауза вне области видимости и возобновление при возвращении.
  useEffect(() => {
    if (isImage || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isImage, src, webm, mp4]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  };

  return (
    <div className="tutorial-video" ref={containerRef}>
      <div className="tutorial-video__stage">
        {hasMedia ? (
          isImage ? (
            <img src={src} alt={alt} loading="lazy" />
          ) : (
            <video
              ref={videoRef}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
            >
              {webm && <source src={webm} type="video/webm" />}
              {mp4 && <source src={mp4} type="video/mp4" />}
              {!webm && !mp4 && src && <source src={src} />}
            </video>
          )
        ) : (
          <div className="tutorial-video__placeholder">
            <Clapperboard size={28} aria-hidden />
            <span>{placeholder ?? 'Материал будет добавлен после записи'}</span>
          </div>
        )}
      </div>
      <div className="tutorial-video__bar">
        {hasVideo ? (
          <button
            type="button"
            className="tutorial-video__btn"
            onClick={togglePlay}
            aria-label={playing ? 'Пауза' : 'Воспроизвести'}
          >
            {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          </button>
        ) : (
          <span className="tutorial-video__btn" aria-hidden>
            <Play size={14} />
          </span>
        )}
        <span className="tutorial-video__label">{label ?? 'Демонстрация действия'}</span>
        <button
          type="button"
          className="tutorial-video__btn tutorial-video__btn--right"
          onClick={fullscreen}
          aria-label="Во весь экран"
        >
          <Maximize2 size={14} aria-hidden />
        </button>
      </div>
    </div>
  );
}
