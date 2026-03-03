import React from 'react';
import { ChartIcon as ChartIconComponent } from '../../components/icons/ChartIcon';
import { LoadingIcon as LoadingIconComponent } from '../../components/icons/LoadingIcon';
import { getButtonSizeConfig, colors } from '../../tokens';
import { clsx } from 'clsx';
import './button.css';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'text' | 'backless';
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
  const [buttonWidth, setButtonWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (buttonRef.current && (state === 'default' || state === 'hover')) {
      setButtonWidth(buttonRef.current.offsetWidth);
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
    return colors.content.primary;
  };

  const showDefaultOrHover = effectiveState === 'default' || effectiveState === 'hover';
  const showLoading = effectiveState === 'loading';
  const showDisabled = effectiveState === 'disabled';

  const buttonClassName = clsx(
    'btn',
    `btn--${type}`,
    `btn--${size}`,
    isLoading && 'btn--loading',
    gapEmpty && 'btn--gap-empty',
    className
  );

  const inlineVars = isLoading && buttonWidth != null
    ? { ['--btn-width' as string]: `${buttonWidth}px` }
    : undefined;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClassName}
      style={inlineVars}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
    >
      {showDefaultOrHover && (
        <>
          {iconL && (iconL2 ?? <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />)}
          {text && <span className="btn__text">{children}</span>}
          {iconR && (iconR2 ?? <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />)}
        </>
      )}
      {showLoading && (
        <>
          {iconL && !text && !iconR && <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />}
          {!iconL && !text && !iconR && <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />}
          {iconL && text && !iconR && (
            <>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
              <span className="btn__text">{children}</span>
            </>
          )}
          {!iconL && text && iconR && (
            <>
              <span className="btn__text">{children}</span>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
            </>
          )}
          {iconL && text && iconR && (
            <>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
              <span className="btn__text">{children}</span>
              {iconR2 ?? <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />}
            </>
          )}
        </>
      )}
      {showDisabled && (
        <>
          {iconL && (iconL2 ?? <ChartIconComponent stroke={getIconStroke()} disabled size={config.iconSize} />)}
          {text && <span className="btn__text">{children}</span>}
          {iconR && (iconR2 ?? <ChartIconComponent stroke={getIconStroke()} disabled size={config.iconSize} />)}
        </>
      )}
    </button>
  );
}
