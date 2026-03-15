import React from 'react';
import { clsx } from 'clsx';
import styles from './icon-button.module.css';

export type IconButtonVariant = 'primary' | 'secondary';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Визуальный вариант */
  variant?: IconButtonVariant;
  /** Иконка (обязательно). Рекомендуется передавать aria-label для доступности. */
  icon: React.ReactNode;
  /** Размер кнопки (квадрат по высоте Button) */
  size?: 'small' | 'medium' | 'large';
  /** Нативный HTML type */
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantToClass: Record<IconButtonVariant, string> = {
  primary: styles.typePrimary,
  secondary: styles.typeSecondary,
};

const sizeToClass: Record<NonNullable<IconButtonProps['size']>, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'primary', icon, size = 'medium', type = 'button', className, disabled, ...rest },
  ref
) {
  const buttonClassName = clsx(styles.root, variantToClass[variant], sizeToClass[size], className);

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled}
      className={buttonClassName}
      aria-disabled={disabled}
    >
      <span className={styles.iconWrap}>{icon}</span>
    </button>
  );
});
