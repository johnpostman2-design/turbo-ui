import React from 'react';
import { clsx } from 'clsx';
import styles from './textarea.module.css';

export type TextAreaSize = 'small' | 'medium';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Размер поля (small / medium) */
  size?: TextAreaSize;
  /** Визуал ошибки и aria-invalid */
  error?: boolean;
  /** Текст ошибки под полем; приоритет над helperText */
  errorText?: string;
  /** Подсказка под полем; при непустом errorText не показывается */
  helperText?: string;
  /**
   * Число видимых строк; при большем тексте — вертикальный скролл (`overflow: auto`).
   * Без `rows` минимальная высота задаётся токенами `size`.
   */
  rows?: number;
  /**
   * Ширина блока с рамкой: число (px), `'50%'`, `'12rem'` и т.д. Задаётся на корневой обёртке.
   * Перекрывает `style.width` при одновременной передаче.
   */
  width?: React.CSSProperties['width'];
  /** Максимальная ширина блока с рамкой (корень). Перекрывает `style.maxWidth` при одновременной передаче. */
  maxWidth?: React.CSSProperties['maxWidth'];
}

const sizeToClass: Record<NonNullable<TextAreaProps['size']>, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
};

/** Часть style на корне — рамка и поле одной ширины, ручка resize в углу. Остальное — на нативном textarea. */
const STYLE_ON_ROOT: (keyof React.CSSProperties)[] = [
  'width',
  'minWidth',
  'maxWidth',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'alignSelf',
];

function splitStyle(style: React.CSSProperties | undefined): {
  root: React.CSSProperties | undefined;
  textarea: React.CSSProperties | undefined;
} {
  if (style == null) return { root: undefined, textarea: undefined };
  const root: React.CSSProperties = {};
  for (const key of STYLE_ON_ROOT) {
    const v = style[key];
    if (v !== undefined) (root as Record<string, unknown>)[key] = v;
  }
  const textarea = { ...style } as Record<string, unknown>;
  for (const key of STYLE_ON_ROOT) delete textarea[key as string];
  const ta = textarea as React.CSSProperties;
  return {
    root: Object.keys(root).length ? root : undefined,
    textarea: Object.keys(ta).length ? ta : undefined,
  };
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    size = 'medium',
    disabled = false,
    error: errorProp = false,
    errorText,
    helperText,
    className,
    id: idProp,
    'aria-describedby': ariaDescribedByUser,
    rows,
    width: widthProp,
    maxWidth: maxWidthProp,
    style,
    ...rest
  },
  ref
) {
  const reactId = React.useId();
  const inputId = idProp ?? `turbo-textarea-${reactId.replace(/:/g, '')}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasErrorText = Boolean(errorText);
  const showError = Boolean(errorProp || hasErrorText);
  const activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined;

  const ariaDescribedBy =
    [activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined;

  const { root, textarea } = splitStyle(style);

  const heightFromRows = typeof rows === 'number' && rows > 0 && Number.isFinite(rows);

  const rootStyle: React.CSSProperties | undefined = (() => {
    const merged: React.CSSProperties = { ...root };
    if (widthProp !== undefined) merged.width = widthProp;
    if (maxWidthProp !== undefined) merged.maxWidth = maxWidthProp;
    return Object.keys(merged).length ? merged : undefined;
  })();

  return (
    <div className={clsx(styles.root, disabled && styles.rootDisabled, className)} style={rootStyle}>
      <div
        className={clsx(
          styles.fieldWrap,
          sizeToClass[size],
          heightFromRows && styles.heightFromRows,
          showError && styles.fieldError,
          disabled && styles.fieldDisabled
        )}
      >
        <textarea
          {...rest}
          ref={ref}
          id={inputId}
          rows={heightFromRows ? rows : undefined}
          disabled={disabled}
          aria-invalid={showError ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className={styles.textarea}
          style={textarea}
        />
      </div>
      <div className={styles.helperSlot}>
        {hasErrorText ? (
          <p
            id={errorId}
            className={styles.helperError}
            role="alert"
            data-turbo-textarea-helper=""
            data-helper-tone={disabled ? 'disabled' : 'error'}
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={styles.helper}
            data-turbo-textarea-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {helperText}
          </p>
        ) : (
          <p
            className={clsx(styles.helper, styles.helperInvisible)}
            aria-hidden
            data-turbo-textarea-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {'\u00a0'}
          </p>
        )}
      </div>
    </div>
  );
});
