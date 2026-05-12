import React, { useState } from 'react';
import { clsx } from 'clsx';
import styles from './toggle.module.css';

export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'children'
  > {
  /** Размер трека/knob и типографика подписи. */
  size?: ToggleSize;
  /** Controlled-значение. Если задан — состояние берётся из пропа. */
  checked?: boolean;
  /** Uncontrolled-начальное значение. */
  defaultChecked?: boolean;
  /** Блокирует переключение; цвета — content-disabled. */
  disabled?: boolean;
  /** Хендлер смены значения (нативное событие input). */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Подпись слева от переключателя. Клик по ней переключает значение. */
  startText?: React.ReactNode;
  /** Подпись справа от переключателя. Клик по ней переключает значение. */
  endText?: React.ReactNode;
  /** Класс на корневой <label>. */
  className?: string;
}

const sizeClass: Record<ToggleSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  function Toggle(
    {
      size = 'medium',
      checked: checkedProp,
      defaultChecked,
      disabled = false,
      onChange,
      startText,
      endText,
      className,
      ...rest
    },
    ref
  ) {
    const isControlled = checkedProp !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      Boolean(defaultChecked)
    );
    const currentChecked = isControlled
      ? Boolean(checkedProp)
      : uncontrolledChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledChecked(event.target.checked);
      onChange?.(event);
    };

    const hasStart =
      startText !== undefined && startText !== null && startText !== '';
    const hasEnd = endText !== undefined && endText !== null && endText !== '';

    return (
      <label
        className={clsx(
          styles.root,
          sizeClass[size],
          disabled && styles.disabled,
          className
        )}
        data-checked={currentChecked ? '' : undefined}
        data-turbo-toggle=""
      >
        {hasStart && (
          <span className={clsx(styles.text, styles.textStart)}>
            {startText}
          </span>
        )}
        <span className={styles.control}>
          <input
            {...rest}
            ref={ref}
            type="checkbox"
            role="switch"
            className={styles.native}
            disabled={disabled}
            checked={isControlled ? Boolean(checkedProp) : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            aria-checked={currentChecked}
            onChange={handleChange}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.knob} />
          </span>
        </span>
        {hasEnd && (
          <span className={clsx(styles.text, styles.textEnd)}>{endText}</span>
        )}
      </label>
    );
  }
);
