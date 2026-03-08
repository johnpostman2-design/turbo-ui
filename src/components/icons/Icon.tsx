import React, { useState, useEffect } from 'react';
import { getIconContent } from './iconRegistry';
import { clsx } from 'clsx';

export type IconState = 'default' | 'disabled';

export interface IconProps {
  /** Имя иконки из папки icons (например: plus, chart, trash) */
  name?: string;
  /** Размер в пикселях */
  size?: number;
  /** Цвет (CSS, токен или hex). Передаётся в svg через color; пути должны использовать fill="currentColor" */
  color?: string;
  /** Состояние: default — полная непрозрачность, disabled — приглушённый вид */
  state?: IconState;
  viewBox?: string;
  className?: string;
  /** Контент иконки (path и т.д.). Используется, если не передан name */
  children?: React.ReactNode;
  /** Доступность: подпись для скринридеров */
  ariaLabel?: string;
}

const DEFAULT_VIEWBOX = '0 0 24 24';

export function Icon({
  name,
  size = 24,
  color = 'currentColor',
  state = 'default',
  viewBox = DEFAULT_VIEWBOX,
  className,
  children,
  ariaLabel,
}: IconProps) {
  const [content, setContent] = useState<{ viewBox: string; content: string } | null>(null);

  useEffect(() => {
    if (!name) {
      setContent(null);
      return;
    }
    let cancelled = false;
    getIconContent(name).then((loaded) => {
      if (!cancelled && loaded) setContent(loaded);
    });
    return () => { cancelled = true; };
  }, [name]);

  const opacity = state === 'disabled' ? 0.08 : 1;
  const resolvedContent = content ?? null;

  return (
    <span
      className={clsx('inline-flex shrink-0 overflow-clip', className)}
      style={{ width: size, height: size }}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      <svg
        className="block size-full max-w-none"
        viewBox={resolvedContent?.viewBox ?? viewBox}
        fill="none"
        style={{ color, opacity }}
        aria-hidden={!ariaLabel}
      >
        {resolvedContent ? (
          <g dangerouslySetInnerHTML={{ __html: resolvedContent.content }} />
        ) : (
          children
        )}
      </svg>
    </span>
  );
}
