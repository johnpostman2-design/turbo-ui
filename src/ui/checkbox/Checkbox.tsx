import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../components/icons/Icon';
import { tokens } from '../../tokens/tokens';
import styles from './checkbox.module.css';

export type CheckboxSize = 'small' | 'medium' | 'large';

const checkboxSizes = tokens.checkbox.sizes;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** Размер квадрата: large, medium, small */
  size?: CheckboxSize;
  /** Визуал ошибки и `aria-invalid` */
  error?: boolean;
  /** Неопределённость (частичный выбор); синхронизируется с DOM `indeterminate` */
  indeterminate?: boolean;
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

const sizeClass: Record<CheckboxSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

const labelClass: Record<CheckboxSize, string> = {
  small: styles.labelSmall,
  medium: styles.labelMedium,
  large: styles.labelLarge,
};

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = 'medium',
    disabled = false,
    error = false,
    indeterminate = false,
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

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (el) el.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  const checked = isControlled ? Boolean(checkedProp) : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked);
    onChange?.(e);
  };

  const showIndeterminate = Boolean(indeterminate);
  const showChecked = !showIndeterminate && checked;

  const labelContent = label ?? children;
  const hasLabel = labelContent != null && labelContent !== false && labelContent !== '';

  const iconColor = disabled ? 'var(--content-disabled)' : 'var(--content-primary)';

  return (
    <label
      className={clsx(
        styles.field,
        sizeClass[size],
        error && styles.error,
        disabled && styles.disabled,
        demoFocusRing && styles.demoFocusRing,
        className
      )}
      data-checked={showChecked ? '' : undefined}
      data-indeterminate={showIndeterminate ? '' : undefined}
    >
      <span className={styles.control}>
        <input
          {...rest}
          ref={mergedRef}
          type="checkbox"
          className={styles.native}
          disabled={disabled}
          checked={isControlled ? checkedProp : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          aria-invalid={error ? true : undefined}
          onChange={handleChange}
        />
        <span className={styles.box} aria-hidden>
          {showIndeterminate ? (
            <Icon className={styles.icon} name="minus" size={checkboxSizes[size].iconSize} color={iconColor} />
          ) : showChecked ? (
            <Icon className={styles.icon} name="check-done" size={checkboxSizes[size].iconSize} color={iconColor} />
          ) : null}
        </span>
      </span>
      {hasLabel ? (
        <span className={clsx(styles.label, labelClass[size])}>{labelContent}</span>
      ) : null}
    </label>
  );
});
