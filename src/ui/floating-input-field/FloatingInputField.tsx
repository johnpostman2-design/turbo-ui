import React from 'react';
import { clsx } from 'clsx';
import { Input, type InputProps } from '../input';
import ifStyles from '../input-field/input-field.module.css';
import styles from './floating-input-field.module.css';

export interface FloatingInputFieldProps extends Omit<InputProps, 'placeholder'> {
  /**
   * Название поля (обязательно): непустая строка после `trim()`.
   * Используется для оверлея, плавающего лейбла и `aria-label` у `<input>`. При пустом значении компонент не рендерится.
   */
  label: string;
  helperText?: string;
  errorText?: string;
}

const sizeToShell: Record<NonNullable<InputProps['size']>, string> = {
  small: clsx(styles.shell, styles.shellSmall),
  medium: clsx(styles.shell, styles.shellMedium),
  large: clsx(styles.shell, styles.shellLarge),
};

function setRef<T>(r: React.Ref<T> | undefined, value: T | null) {
  if (typeof r === 'function') r(value);
  else if (r != null) (r as React.MutableRefObject<T | null>).current = value;
}

export const FloatingInputField = React.forwardRef<HTMLInputElement, FloatingInputFieldProps>(
  function FloatingInputField(
    {
      label,
      helperText,
      errorText,
      className,
      id: idProp,
      error: errorProp,
      disabled = false,
      size = 'medium',
      value: valueProp,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...restInput
    },
    ref
  ) {
    const labelText = label.trim();
    const reactId = React.useId();
    const inputId = idProp ?? `turbo-floating-input-field-${reactId.replace(/:/g, '')}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const [focused, setFocused] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const isControlled = valueProp !== undefined;
    const valueStr = isControlled ? String(valueProp ?? '') : String(uncontrolledValue ?? '');
    const floated = focused || valueStr.length > 0;

    const hasErrorText = Boolean(errorText);
    const showError = Boolean(errorProp || hasErrorText);
    const activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined;

    const { 'aria-describedby': ariaDescribedByUser, ...inputRest } = restInput;
    const ariaDescribedBy =
      [activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined;

    const mergedRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        setRef(ref, el);
      },
      [ref]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setUncontrolledValue(e.target.value);
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const hasLeftIcon = inputRest.leftIcon != null;

    if (!labelText) {
      if (!import.meta.env.PROD) {
        console.error(
          '[FloatingInputField] Передайте непустой `label` — название поля для подписи и доступности (aria-label).'
        );
      }
      return null;
    }

    return (
      <div className={clsx(ifStyles.root, disabled && ifStyles.rootDisabled, className)}>
        <div className={clsx(sizeToShell[size], hasLeftIcon && styles.shellWithLeftIcon)}>
          <div
            className={clsx(styles.floatingWrap, floated ? styles.floatingWrapFloated : styles.floatingWrapRest)}
            aria-hidden
          >
            <span
              data-turbo-floating-input-field-label=""
              className={clsx(
                styles.floatingText,
                floated && styles.floatingTextFloated,
                disabled && styles.floatingTextDisabled
              )}
            >
              {labelText}
            </span>
          </div>
          <div className={styles.inputGrow}>
            <Input
              {...inputRest}
              ref={mergedRef}
              id={inputId}
              size={size}
              disabled={disabled}
              error={showError}
              aria-label={labelText}
              aria-describedby={ariaDescribedBy}
              placeholder=""
              value={isControlled ? valueProp : undefined}
              defaultValue={!isControlled ? defaultValue : undefined}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={ifStyles.helperSlot}>
          {hasErrorText ? (
            <p
              id={errorId}
              className={ifStyles.helperError}
              role="alert"
              data-turbo-input-field-helper=""
              data-helper-tone={disabled ? 'disabled' : 'error'}
            >
              {errorText}
            </p>
          ) : helperText ? (
            <p
              id={helperId}
              className={ifStyles.helper}
              data-turbo-input-field-helper=""
              data-helper-tone={disabled ? 'disabled' : 'tertiary'}
            >
              {helperText}
            </p>
          ) : (
            <p
              className={clsx(ifStyles.helper, ifStyles.helperInvisible)}
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
  }
);
