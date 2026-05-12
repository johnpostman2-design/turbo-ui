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
  /** Поле без обводки */
  borderless?: boolean;
  /** Многострочный режим: рендерится `<textarea>` с auto-grow по содержимому. */
  multiline?: boolean;
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
    borderless = false,
    multiline = false,
    type = 'text',
    className,
    onFocus,
    onBlur,
    onInput,
    ...rest
  },
  ref
) {
  const innerRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const mergedRef = React.useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      innerRef.current = el;
      setRef(ref as React.Ref<HTMLInputElement | HTMLTextAreaElement> | undefined, el);
    },
    [ref]
  );

  const adjustHeight = React.useCallback(() => {
    if (!multiline) return;
    const el = innerRef.current as HTMLTextAreaElement | null;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [multiline]);

  const value = (rest as { value?: unknown }).value;
  const defaultValue = (rest as { defaultValue?: unknown }).defaultValue;

  React.useLayoutEffect(() => {
    if (multiline) adjustHeight();
  }, [multiline, adjustHeight, value, defaultValue]);

  const handleInput: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (multiline) adjustHeight();
    (onInput as React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined)?.(e);
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div
        className={clsx(
          styles.fieldWrap,
          sizeToClass[size],
          multiline && styles.multiline,
          borderless && !disabled && styles.fieldBorderless,
          error && styles.fieldError,
          disabled && styles.fieldDisabled
        )}
      >
        {leftIcon != null && <span className={styles.leftIcon}>{leftIcon}</span>}
        {multiline ? (
          <textarea
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={mergedRef as React.RefCallback<HTMLTextAreaElement>}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={clsx(styles.input, styles.multilineInput)}
            onFocus={onFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement> | undefined}
            onBlur={onBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement> | undefined}
            onInput={handleInput as React.FormEventHandler<HTMLTextAreaElement>}
            rows={1}
          />
        ) : (
          <input
            {...rest}
            ref={mergedRef as React.RefCallback<HTMLInputElement>}
            type={type}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={styles.input}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={handleInput as React.FormEventHandler<HTMLInputElement>}
          />
        )}
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
