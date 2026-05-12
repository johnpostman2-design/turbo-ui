import React from 'react';
import { clsx } from 'clsx';
import styles from './textarea.module.css';

export type TextAreaSize = 'small' | 'medium' | 'large';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Размер поля */
  size?: TextAreaSize;
  /** Иконка слева внутри поля */
  leftIcon?: React.ReactNode;
  /** Кнопка или слот справа (например IconButton очистки); tabIndex=-1 для фокус-кругозора внутри поля */
  endAdornment?: React.ReactNode;
  /** Визуал ошибки и aria-invalid */
  error?: boolean;
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
  /** Поле без полной обводки (нижняя линия по токенам combobox) */
  borderless?: boolean;
}

const sizeToClass: Record<NonNullable<TextAreaProps['size']>, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
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
    borderless = false,
    leftIcon,
    endAdornment,
    className,
    id: idProp,
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

  const showError = Boolean(errorProp);

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
          borderless && !disabled && styles.fieldBorderless,
          showError && styles.fieldError,
          disabled && styles.fieldDisabled
        )}
      >
        {leftIcon != null && <span className={styles.leftIcon}>{leftIcon}</span>}
        <textarea
          {...rest}
          ref={ref}
          id={inputId}
          rows={heightFromRows ? rows : undefined}
          disabled={disabled}
          aria-invalid={showError ? true : undefined}
          className={styles.textarea}
          style={textarea}
        />
        {endAdornment != null && (
          <span className={styles.endAdornment}>
            {React.isValidElement(endAdornment) && typeof endAdornment.type !== 'string'
              ? React.cloneElement(endAdornment as React.ReactElement<{ tabIndex?: number; disabled?: boolean }>, {
                  tabIndex: -1,
                  disabled: disabled ? true : (endAdornment as React.ReactElement<{ disabled?: boolean }>).props?.disabled,
                })
              : endAdornment}
          </span>
        )}
      </div>
    </div>
  );
});
