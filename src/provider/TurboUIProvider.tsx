import React from 'react';

/**
 * Опциональные переопределения CSS-переменных темы (design tokens).
 * Ключ — имя переменной (например, --content-primary), значение — строка (например, #333333).
 * Применяются поверх дефолтных из tokens.json / theme.css.
 */
export type ThemeOverrides = Record<string, string>;

export interface TurboUIProviderProps {
  /** Переопределения токенов (CSS-переменные). Применяются к обёртке и наследуются потомками. */
  theme?: ThemeOverrides;
  children: React.ReactNode;
}

/**
 * Провайдер темы Turbo UI. Позволяет переопределять design tokens без изменения кода библиотеки.
 * Дефолтные значения задаются в theme.css (из tokens.json). Переданный theme применяется поверх.
 */
export function TurboUIProvider({ theme, children }: TurboUIProviderProps) {
  if (!theme || Object.keys(theme).length === 0) {
    return <>{children}</>;
  }
  return (
    <div style={theme as React.CSSProperties}>
      {children}
    </div>
  );
}
