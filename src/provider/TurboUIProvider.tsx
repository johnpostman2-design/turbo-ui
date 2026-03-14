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
  /** Опциональный класс обёртки для scoped-темы (переопределение токенов только внутри этого поддерева). */
  scopeClassName?: string;
  children: React.ReactNode;
}

/**
 * Провайдер темы Turbo UI. Позволяет переопределять design tokens без изменения кода библиотеки.
 * Дефолтные значения задаются в theme.css (из tokens.json). Переданный theme применяется поверх.
 * При scopeClassName всегда рендерится обёртка (для изоляции темы внутри поддерева).
 */
export function TurboUIProvider({ theme, scopeClassName, children }: TurboUIProviderProps) {
  const hasTheme = theme && Object.keys(theme).length > 0;
  const hasScope = Boolean(scopeClassName);

  if (!hasScope && !hasTheme) {
    return <>{children}</>;
  }

  return (
    <div className={scopeClassName ?? undefined} style={hasTheme ? (theme as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
