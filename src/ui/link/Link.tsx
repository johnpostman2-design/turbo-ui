import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../components/icons/Icon';
import styles from './link.module.css';

export type LinkVariant = 'default' | 'secondary' | 'danger';

interface LinkCommonProps {
  /** Цветовая роль ссылки. */
  variant?: LinkVariant;
  /** Блокирует клик и навигацию; цвет — content-disabled, без подчёркивания. */
  disabled?: boolean;
  /** Состояние загрузки: блок клика, цвет content-disabled. Если задан startIcon/endIcon — он заменяется на спиннер. */
  loading?: boolean;
  /** Иконка слева от текста (1em, currentColor). */
  startIcon?: React.ReactNode;
  /** Иконка справа от текста (1em, currentColor). */
  endIcon?: React.ReactNode;
  /** Текст ссылки. */
  children?: React.ReactNode;
  /** Класс на корневой DOM-узел. */
  className?: string;
}

export interface LinkAnchorProps
  extends LinkCommonProps,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'children' | 'className'
    > {
  href: string;
}

export interface LinkButtonProps
  extends LinkCommonProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'type' | 'disabled'
    > {
  href?: undefined;
}

export type LinkProps = LinkAnchorProps | LinkButtonProps;

const variantClassMap: Record<LinkVariant, string> = {
  default: styles.variantDefault,
  secondary: styles.variantSecondary,
  danger: styles.variantDanger,
};

type AnyLinkProps = LinkCommonProps & {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  [key: string]: unknown;
};

/** Внешний URL — абсолютный по схеме (http(s)://) или протоколу-относительный (//host). */
function isExternalUrl(href: string): boolean {
  return /^(?:[a-z][a-z0-9+\-.]*:)?\/\//i.test(href);
}

function renderSpinnerSlot(slotClass: string): React.ReactElement {
  return (
    <span className={clsx(slotClass, styles.loadingSpinner)} aria-hidden="true">
      <Icon name="loading" size="100%" />
    </span>
  );
}

export const Link = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(function Link(props, ref) {
  const {
    variant = 'default',
    disabled = false,
    loading = false,
    startIcon,
    endIcon,
    children,
    className,
    onClick,
    href,
    target,
    rel,
    ...rest
  } = props as AnyLinkProps;

  const isBlocked = disabled || loading;
  const hasStart = startIcon != null;
  const hasEnd = endIcon != null;

  const rootClassName = clsx(
    styles.root,
    variantClassMap[variant],
    disabled && styles.disabled,
    loading && styles.loading,
    className
  );

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (isBlocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const renderStartIcon = () => {
    if (loading && hasStart) return renderSpinnerSlot(styles.iconStart);
    if (hasStart) {
      return (
        <span className={styles.iconStart} aria-hidden="true">
          {startIcon}
        </span>
      );
    }
    return null;
  };

  const renderEndIcon = () => {
    if (loading && hasEnd) return renderSpinnerSlot(styles.iconEnd);
    if (hasEnd) {
      return (
        <span className={styles.iconEnd} aria-hidden="true">
          {endIcon}
        </span>
      );
    }
    return null;
  };

  const body = (
    <>
      {renderStartIcon()}
      <span className={styles.text}>{children}</span>
      {renderEndIcon()}
    </>
  );

  if (href !== undefined) {
    const isExternal = isExternalUrl(href);
    const computedRel =
      isExternal && rel === undefined ? 'noopener noreferrer' : rel;
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a
        {...anchorRest}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={isBlocked ? undefined : href}
        target={target}
        rel={computedRel}
        aria-disabled={isBlocked ? true : undefined}
        aria-busy={loading ? true : undefined}
        tabIndex={isBlocked ? -1 : anchorRest.tabIndex}
        className={rootClassName}
        onClick={handleClick}
        data-turbo-link=""
      >
        {body}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={isBlocked}
      aria-busy={loading ? true : undefined}
      className={rootClassName}
      onClick={handleClick}
      data-turbo-link=""
    >
      {body}
    </button>
  );
});
