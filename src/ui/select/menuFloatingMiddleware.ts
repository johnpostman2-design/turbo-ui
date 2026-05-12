import type { Middleware } from '@floating-ui/react';
import type { Placement } from '@floating-ui/dom';
import { flip, offset, shift, size as sizeMiddleware } from '@floating-ui/react';

export interface CreateMenuFloatingMiddlewareOptions {
  /** Отступ между якорём и панелью по main axis (px) */
  mainGapPx: number;
  /** Padding для shift middleware (px) */
  shiftPaddingPx: number;
  /** Горизонтальный сдвиг панели: положительный — влево, отрицательный — вправо */
  menuOffset: number;
  /** Fallback placements после primary */
  fallbackPlacements: Placement[];
  /** Если задана фиксированная ширина меню — не добавляем size middleware для minWidth по якорю */
  menuWidth?: string;
}

/**
 * Общий стек middleware для выпадающих панелей (Select, ComboBox).
 * Не включает `autoUpdate` — он задаётся в `whileElementsMounted` у `useFloating`.
 */
export function createMenuFloatingMiddleware(o: CreateMenuFloatingMiddlewareOptions): Middleware[] {
  const middleware: Middleware[] = [
    offset(() => ({
      mainAxis: o.mainGapPx,
      crossAxis: -o.menuOffset,
    })),
    flip({
      fallbackPlacements: o.fallbackPlacements.length ? o.fallbackPlacements : undefined,
    }),
    shift({ padding: o.shiftPaddingPx }),
  ];

  if (!o.menuWidth) {
    middleware.push(
      sizeMiddleware({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      })
    );
  }

  return middleware;
}
