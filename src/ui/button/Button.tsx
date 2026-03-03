import React from 'react';
import { Icon } from '../../components/icons/Icon';
import { getButtonSizeConfig, colors } from '../../tokens';
import { clsx } from 'clsx';
import './button.css';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'text' | 'backless' | 'success' | 'danger' | 'caution';
  state?: 'default' | 'hover' | 'disabled' | 'loading';
  size?: 'small' | 'medium' | 'large';
  iconL?: boolean;
  iconR?: boolean;
  text?: boolean;
  iconL2?: React.ReactNode | null;
  iconR2?: React.ReactNode | null;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  type = 'primary',
  state = 'default',
  size = 'medium',
  iconL = true,
  iconR = true,
  text = true,
  iconL2 = null,
  iconR2 = null,
  children = 'Button',
  onClick,
  className,
}: ButtonProps) {
  const config = getButtonSizeConfig(size);
  const [isHovered, setIsHovered] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const widthWhenDefaultRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if ((state === 'default' || state === 'hover') && buttonRef.current) {
      widthWhenDefaultRef.current = buttonRef.current.offsetWidth;
    }
  }, [state, children, iconL, iconR, text]);

  const handleMouseEnter = () => {
    if (state === 'default') setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  const effectiveState = isHovered && state === 'default' ? 'hover' : state;
  const isDisabled = state === 'disabled' || state === 'loading';
  const isLoading = effectiveState === 'loading';
  const gapEmpty = !text && !iconL && !iconR;

  const getIconStroke = () => {
    if (effectiveState === 'disabled') return colors.content.disabled;
    if (type === 'primary') return colors.content.invert;
    if (type === 'success') return colors.content.success;
    if (type === 'danger') return colors.content.error;
    if (type === 'caution') return colors.content.caution;
    return colors.content.primary;
  };

  /** Цвет иконки загрузки: наследует disabled-стиль типа; если у типа нет disabled — default */
  const getLoadingIconStroke = () => {
    return colors.content.disabled;
  };

  const showDefaultOrHover = effectiveState === 'default' || effectiveState === 'hover';
  const showLoading = effectiveState === 'loading';
  const showDisabled = effectiveState === 'disabled';

  const loadingHasTextOrRightIcon = text && (iconL || iconR);

  const buttonClassName = clsx(
    'btn',
    `btn--${type}`,
    `btn--${size}`,
    isLoading && 'btn--loading',
    gapEmpty && 'btn--gap-empty',
    className
  );

  const loadingStyle = isLoading && widthWhenDefaultRef.current != null
    ? { ['--btn-width' as string]: `${widthWhenDefaultRef.current}px` }
    : undefined;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClassName}
      style={loadingStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
    >
      {showDefaultOrHover && (
        <>
          {iconL && (iconL2 ?? <Icon name="chart" color={getIconStroke()} size={config.iconSize} state="default" />)}
          {text && <span className="btn__text">{children}</span>}
          {iconR && (iconR2 ?? <Icon name="chart" color={getIconStroke()} size={config.iconSize} state="default" />)}
        </>
      )}
      {showLoading && (
        loadingHasTextOrRightIcon ? (
          <>
            {iconL && (
              <span key="loading-l" className="btn__loading-spinner animate-loading-spin">
                <Icon name="loading" color={getLoadingIconStroke()} size={config.iconSize} />
              </span>
            )}
            {text && <span key="loading-text" className="btn__text">{children}</span>}
            {iconR && iconL && (
              <span key="loading-right-icon" className="btn__loading-right">
                {iconR2 ?? <Icon name="chart" color={getLoadingIconStroke()} size={config.iconSize} state="default" />}
              </span>
            )}
            {iconR && !iconL && (
              <span key="loading-r" className="btn__loading-spinner animate-loading-spin">
                <Icon name="loading" color={getLoadingIconStroke()} size={config.iconSize} />
              </span>
            )}
          </>
        ) : (
          <span className="btn__loading-spinner animate-loading-spin">
            <Icon name="loading" color={getLoadingIconStroke()} size={config.iconSize} />
          </span>
        )
      )}
      {showDisabled && (
        <>
          {iconL && (iconL2 ?? <Icon name="chart" color={getIconStroke()} size={config.iconSize} state="disabled" />)}
          {text && <span className="btn__text">{children}</span>}
          {iconR && (iconR2 ?? <Icon name="chart" color={getIconStroke()} size={config.iconSize} state="disabled" />)}
        </>
      )}
    </button>
  );
}
