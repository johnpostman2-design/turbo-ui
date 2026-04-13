import React from 'react';
import { clsx } from 'clsx';
import { Input, type InputProps } from '../input';
import styles from './input-field.module.css';

export interface InputFieldProps extends InputProps {
  /** Подпись над полем */
  label?: string;
  /** Подсказка под полем; при наличии errorText не показывается */
  helperText?: string;
  /** Текст ошибки под полем; приоритет над helperText */
  errorText?: string;
}

function setRef<T>(r: React.Ref<T> | undefined, value: T | null) {
  if (typeof r === 'function') r(value);
  else if (r != null) (r as React.MutableRefObject<T | null>).current = value;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    label,
    helperText,
    errorText,
    className,
    id: idProp,
    error: errorProp,
    disabled = false,
    ...inputProps
  },
  ref
) {
  const reactId = React.useId();
  const inputId = idProp ?? `turbo-input-field-${reactId.replace(/:/g, '')}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasErrorText = Boolean(errorText);
  const showError = Boolean(errorProp || hasErrorText);
  const activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined;

  const { 'aria-describedby': ariaDescribedByUser, ...restInput } = inputProps;
  const ariaDescribedBy =
    [activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined;

  const mergedRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      setRef(ref, el);
    },
    [ref]
  );

  return (
    <div className={clsx(styles.root, disabled && styles.rootDisabled, className)}>
      {label != null && label !== '' && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        <Input
          {...restInput}
          ref={mergedRef}
          id={inputId}
          disabled={disabled}
          error={showError}
          aria-describedby={ariaDescribedBy}
        />
      </div>
      <div className={styles.helperSlot}>
        {hasErrorText ? (
          <p
            id={errorId}
            className={styles.helperError}
            role="alert"
            data-turbo-input-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'error'}
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={styles.helper}
            data-turbo-input-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {helperText}
          </p>
        ) : (
          <p
            className={clsx(styles.helper, styles.helperInvisible)}
            aria-hidden
            data-turbo-input-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {'\u00a0'}
          </p>
        )}
      </div>
    </div>
  );
});
