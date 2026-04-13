import React from 'react';
import { clsx } from 'clsx';
import styles from './input.module.css';

export type InputSize = 'small' | 'medium' | 'large';

export type InputType = 'text' | 'number' | 'tel' | 'search' | 'time' | 'date' | 'email' | 'password';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Иконка слева внутри поля */
  leftIcon?: React.ReactNode;
  /** Только IconButton из Turbo UI; кликабелен; tabIndex=-1 */
  endAdornment?: React.ReactNode;
  /** Размер поля */
  size?: InputSize;
  /** Визуал ошибки и aria-invalid */
  error?: boolean;
  /** Нативный type input */
  type?: InputType;
}

const sizeToClass: Record<NonNullable<InputProps['size']>, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) {
    const r = ref as React.MutableRefObject<T | null>;
    r.current = value;
  }
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    leftIcon,
    endAdornment,
    size = 'medium',
    disabled = false,
    error = false,
    type = 'text',
    className,
    onFocus,
    onBlur,
    ...rest
  },
  ref
) {
  const mergedRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      setRef(ref, el);
    },
    [ref]
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div
        className={clsx(
          styles.fieldWrap,
          sizeToClass[size],
          error && styles.fieldError,
          disabled && styles.fieldDisabled
        )}
      >
        {leftIcon != null && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          {...rest}
          ref={mergedRef}
          type={type}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
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
