import React from 'react';
import { Icon } from '../../components/icons/Icon';
import { getButtonSizeConfig, colors } from '../../tokens';
import { clsx } from 'clsx';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'backless' | 'success' | 'danger' | 'caution';

const NATIVE_BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type NativeButtonType = (typeof NATIVE_BUTTON_TYPES)[number];

/** @deprecated Используйте variant. Если передан type со значением варианта (primary, secondary, …), трактуется как variant. */
export type ButtonTypeDeprecated = ButtonVariant;

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Нативный HTML type (button | submit | reset). По умолчанию "button". */
  type?: NativeButtonType | ButtonTypeDeprecated;
  /** Визуальный вариант кнопки */
  variant?: ButtonVariant;
  state?: 'default' | 'hover' | 'disabled' | 'loading';
  size?: 'small' | 'medium' | 'large';
  /** Слот слева: undefined = иконка play по умолчанию, null = не показывать, ReactNode = своя иконка */
  startIcon?: React.ReactNode | null;
  /** Слот справа: undefined = иконка play по умолчанию, null = не показывать, ReactNode = своя иконка */
  endIcon?: React.ReactNode | null;
  /** Показывать текст (children) */
  text?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const variantToClass: Record<ButtonVariant, string> = {
  primary: styles.typePrimary,
  secondary: styles.typeSecondary,
  text: styles.typeText,
  backless: styles.typeBackless,
  success: styles.typeSuccess,
  danger: styles.typeDanger,
  caution: styles.typeCaution,
};

const sizeToClass: Record<NonNullable<ButtonProps['size']>, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

function isNativeButtonType(t: unknown): t is NativeButtonType {
  return typeof t === 'string' && NATIVE_BUTTON_TYPES.includes(t as NativeButtonType);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type: typeProp,
    variant: variantProp,
    state = 'default',
    size = 'medium',
    startIcon = undefined,
    endIcon = undefined,
    text = true,
    children = 'Button',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const variant: ButtonVariant =
    variantProp ?? (typeProp && !isNativeButtonType(typeProp) ? (typeProp as ButtonVariant) : 'primary');
  const nativeType: NativeButtonType = isNativeButtonType(typeProp) ? typeProp : 'button';

  const config = getButtonSizeConfig(size);
  const setRef = React.useCallback(
    (el: HTMLButtonElement | null) => {
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    },
    [ref]
  );

  const hasStart = startIcon !== null;
  const hasEnd = endIcon !== null;

  const effectiveState = state;
  const isDisabled = state === 'disabled' || state === 'loading';
  const isLoading = state === 'loading';
  const gapEmpty = !text && !hasStart && !hasEnd;

  const getIconStroke = () => {
    if (effectiveState === 'disabled') return colors.content.disabled;
    if (variant === 'primary') return colors.content.invert;
    if (variant === 'success') return colors.content.success;
    if (variant === 'danger') return colors.content.error;
    if (variant === 'caution') return colors.content.caution;
    return colors.content.primary;
  };

  const getLoadingIconStroke = () => colors.content.disabled;

  const showDefaultOrHover = effectiveState === 'default' || effectiveState === 'hover';
  const showLoading = effectiveState === 'loading';
  const showDisabled = effectiveState === 'disabled';

  const loadingHasTextOrIcons = text || hasStart || hasEnd;

  const defaultStartIcon = <Icon name="play" color={getIconStroke()} size={config.iconSize} state="default" />;
  const defaultEndIcon = <Icon name="play" color={getIconStroke()} size={config.iconSize} state="default" />;
  const defaultStartIconDisabled = <Icon name="play" color={getIconStroke()} size={config.iconSize} state="disabled" />;
  const defaultEndIconDisabled = <Icon name="play" color={getIconStroke()} size={config.iconSize} state="disabled" />;
  const loadingIcon = <Icon name="loading" color={getLoadingIconStroke()} size={config.iconSize} />;
  const loadingPlaceholderEndIcon = <Icon name="play" color={getLoadingIconStroke()} size={config.iconSize} state="default" />;

  const buttonClassName = clsx(
    styles.root,
    variantToClass[variant],
    sizeToClass[size],
    isLoading && styles.loading,
    gapEmpty && styles.gapEmpty,
    className
  );

  return (
    <button
      {...rest}
      ref={setRef}
      type={nativeType}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClassName}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
    >
      {showDefaultOrHover && (
        <>
          {hasStart && (startIcon ?? defaultStartIcon)}
          {text && <span className={styles.text}>{children}</span>}
          {hasEnd && (endIcon ?? defaultEndIcon)}
        </>
      )}
      {showLoading && (
        loadingHasTextOrIcons ? (
          <>
            {hasStart && (
              <span key="loading-l" className={styles.loadingSpinner}>
                {loadingIcon}
              </span>
            )}
            {text && <span key="loading-text" className={styles.text}>{children}</span>}
            {hasEnd && hasStart && (
              <span key="loading-right-icon" className={styles.loadingRight}>
                {endIcon ?? loadingPlaceholderEndIcon}
              </span>
            )}
            {hasEnd && !hasStart && (
              <span key="loading-r" className={styles.loadingSpinner}>
                {loadingIcon}
              </span>
            )}
          </>
        ) : (
          <span className={styles.loadingSpinner}>
            {loadingIcon}
          </span>
        )
      )}
      {showDisabled && (
        <>
          {hasStart && (startIcon ?? defaultStartIconDisabled)}
          {text && <span className={styles.text}>{children}</span>}
          {hasEnd && (endIcon ?? defaultEndIconDisabled)}
        </>
      )}
    </button>
  );
});
