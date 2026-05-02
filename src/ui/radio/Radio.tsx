import React, { useCallback, useRef, useState } from 'react';
import { clsx } from 'clsx';
import styles from './radio.module.css';

export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** Размер индикатора: large, medium, small */
  size?: RadioSize;
  /** Визуал ошибки и `aria-invalid` */
  error?: boolean;
  /** Текст рядом с контролом; можно вместо этого передать `children` */
  label?: React.ReactNode;
  /** Содержимое рядом с контролом, если не задан `label` */
  children?: React.ReactNode;
  /**
   * Подсветка рамки как при клавиатурном фокусе — только для примеров (кнопка «Дать фокус» в Docs/Storybook).
   * В продуктах не используйте: обычный фокус только по Tab (`:focus-visible`).
   */
  demoFocusRing?: boolean;
}

const sizeClass: Record<RadioSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

const labelClass: Record<RadioSize, string> = {
  small: styles.labelSmall,
  medium: styles.labelMedium,
  large: styles.labelLarge,
};

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size = 'medium',
    disabled = false,
    error = false,
    className,
    demoFocusRing = false,
    label,
    children,
    checked: checkedProp,
    defaultChecked,
    onChange,
    ...rest
  },
  ref
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const isControlled = checkedProp !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked));

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      assignRef(ref, node);
    },
    [ref]
  );

  const checked = isControlled ? Boolean(checkedProp) : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked);
    onChange?.(e);
  };

  const labelContent = label ?? children;
  const hasLabel = labelContent != null && labelContent !== false && labelContent !== '';

  return (
    <label
      className={clsx(styles.field, sizeClass[size], error && styles.error, disabled && styles.disabled, demoFocusRing && styles.demoFocusRing, className)}
      data-checked={checked ? '' : undefined}
    >
      <span className={styles.control}>
        <input
          {...rest}
          ref={mergedRef}
          type="radio"
          className={styles.native}
          disabled={disabled}
          checked={isControlled ? checkedProp : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          aria-invalid={error ? true : undefined}
          onChange={handleChange}
        />
        <span className={styles.disc} aria-hidden>
          {checked ? <span className={styles.innerDot} /> : null}
        </span>
      </span>
      {hasLabel ? <span className={clsx(styles.label, labelClass[size])}>{labelContent}</span> : null}
    </label>
  );
});
