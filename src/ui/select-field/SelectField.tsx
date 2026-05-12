import React from 'react';
import { clsx } from 'clsx';
import { Select, type SelectProps } from '../select';
import styles from './select-field.module.css';

export interface SelectFieldProps extends SelectProps {
  /** Подпись над триггером; если пусто/undefined — не рендерится. */
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

export const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(function SelectField(
  {
    label,
    helperText,
    errorText,
    className,
    id: idProp,
    error: errorProp,
    disabled = false,
    'aria-describedby': ariaDescribedByUser,
    ...selectRest
  },
  ref
) {
  const reactId = React.useId();
  const triggerId = idProp ?? `turbo-select-field-${reactId.replace(/:/g, '')}`;
  const helperId = `${triggerId}-helper`;
  const errorId = `${triggerId}-error`;

  const hasErrorText = Boolean(errorText);
  /** disabled подавляет визуал ошибки и aria-invalid (приоритет блокировки). */
  const showError = !disabled && Boolean(errorProp || hasErrorText);
  const activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined;

  const ariaDescribedBy =
    [activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined;

  const mergedRef = React.useCallback(
    (el: HTMLButtonElement | null) => {
      setRef(ref, el);
    },
    [ref]
  );

  return (
    <div className={clsx(styles.root, disabled && styles.rootDisabled, className)}>
      {label != null && label !== '' && (
        <label className={styles.label} htmlFor={triggerId}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        <Select
          {...selectRest}
          ref={mergedRef}
          triggerId={triggerId}
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
            data-turbo-select-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'error'}
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={styles.helper}
            data-turbo-select-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {helperText}
          </p>
        ) : (
          <p
            className={clsx(styles.helper, styles.helperInvisible)}
            aria-hidden
            data-turbo-select-field-helper=""
            data-helper-tone={disabled ? 'disabled' : 'tertiary'}
          >
            {'\u00a0'}
          </p>
        )}
      </div>
    </div>
  );
});
