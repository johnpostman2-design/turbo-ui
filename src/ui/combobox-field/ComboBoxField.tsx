import React from 'react';
import { clsx } from 'clsx';
import { ComboBox, type ComboBoxProps } from '../combobox';
import styles from './combobox-field.module.css';

export interface ComboBoxFieldProps extends ComboBoxProps {
  /** Подпись над полем; если пусто/undefined — не рендерится. */
  label?: string;
  /** Подсказка под полем; скрывается при наличии errorText. */
  helperText?: string;
  /** Текст ошибки под полем; приоритет над helperText. */
  errorText?: string;
}

function setRef<T>(r: React.Ref<T> | undefined, value: T | null) {
  if (typeof r === 'function') r(value);
  else if (r != null) (r as React.MutableRefObject<T | null>).current = value;
}

export const ComboBoxField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ComboBoxFieldProps
>(function ComboBoxField(
  {
    label,
    helperText,
    errorText,
    className,
    id: idProp,
    error: errorProp,
    disabled = false,
    'aria-describedby': ariaDescribedByUser,
    ...comboRest
  },
  ref
) {
  const reactId = React.useId();
  const inputId = idProp ?? `turbo-combobox-field-${reactId.replace(/:/g, '')}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasErrorText = Boolean(errorText);
  /** disabled подавляет визуал ошибки и aria-invalid (приоритет блокировки). */
  const showError = !disabled && Boolean(errorProp || hasErrorText);
  const activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined;

  const ariaDescribedBy =
    [activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined;

  const mergedRef = React.useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) => {
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
        <ComboBox
          {...comboRest}
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
            data-turbo-combobox-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'error'}
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={styles.helper}
            data-turbo-combobox-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {helperText}
          </p>
        ) : (
          <p
            className={clsx(styles.helper, styles.helperInvisible)}
            aria-hidden
            data-turbo-combobox-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {'\u00a0'}
          </p>
        )}
      </div>
    </div>
  );
});
