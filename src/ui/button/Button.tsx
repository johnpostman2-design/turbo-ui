import React from 'react';
import { ChartIcon as ChartIconComponent } from '../../components/icons/ChartIcon';
import { LoadingIcon as LoadingIconComponent } from '../../components/icons/LoadingIcon';
import './button.css';

interface ButtonProps {
  type?: "primary" | "secondary" | "text" | "backless";
  state?: "default" | "hover" | "disabled" | "loading";
  size?: "small" | "medium" | "large";
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
  type = "primary",
  state = "default",
  size = "medium",
  iconL = true,
  iconR = true,
  text = true,
  iconL2 = null,
  iconR2 = null,
  children = "Button",
  onClick,
  className 
}: ButtonProps) {
  const isPrimary = type === "primary";
  const isSecondary = type === "secondary";
  const isText = type === "text";
  const isBackless = type === "backless";
  
  // Размеры из Figma
  const sizeConfig = {
    small: { 
      height: '32px', 
      paddingX: 'var(--12, 12px)', 
      paddingY: 'var(--8, 8px)', 
      iconSize: 16, 
      fontSize: '14px', 
      lineHeight: '16px' 
    },
    medium: { 
      height: '40px', 
      paddingX: 'var(--12, 12px)', 
      paddingY: 'var(--8, 8px)', 
      iconSize: 24, 
      fontSize: 'var(--font-size-p2, 17px)', 
      lineHeight: 'var(--font-line-height-p2, 24px)' 
    },
    large: { 
      height: '56px', 
      paddingX: 'var(--16, 16px)', 
      paddingY: 'var(--12, 12px)', 
      iconSize: 32, 
      fontSize: '20px', 
      lineHeight: '32px' 
    }
  };
  
  const config = sizeConfig[size];

  const [isHovered, setIsHovered] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = React.useState<number | null>(null);

  // Сохраняем ширину кнопки в default/hover состоянии
  React.useEffect(() => {
    if (buttonRef.current && (state === "default" || state === "hover")) {
      const width = buttonRef.current.offsetWidth;
      setButtonWidth(width);
    }
  }, [state, children, iconL, iconR, text]);

  const handleMouseEnter = () => {
    if (state === "default") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const effectiveState = isHovered && state === "default" ? "hover" : state;

  // Используем только CSS переменные из FIGMA_VARIABLES_ANALYSIS.md
  const getContainerStyle = (): React.CSSProperties => {
    const isLoadingState = effectiveState === "loading";
    
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: 'var(--radius, 4px)',
      cursor: effectiveState === "disabled" ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease',
      boxSizing: 'border-box',
    };

    // Размеры из конфигурации
    base.minHeight = config.height;
    base.height = config.height;
    base.paddingTop = config.paddingY;
    base.paddingBottom = config.paddingY;
    base.paddingLeft = config.paddingX;
    base.paddingRight = config.paddingX;
    
    if (isLoadingState) {
      // Для loading кнопок: сохраняем ширину из default/hover состояния
      if (buttonWidth !== null) {
        base.width = `${buttonWidth}px`;
      }
      // Gap зависит от того, есть ли текст и иконки
      if (!text && !iconL && !iconR) {
        base.gap = '0px';
      } else {
        base.gap = 'var(--8, 8px)';
      }
    } else {
      // Для обычных кнопок: gap из переменных из FIGMA_VARIABLES_ANALYSIS.md
      base.gap = 'var(--8, 8px)';
    }

    if (isPrimary) {
      // Primary кнопки не имеют border
      base.border = 'none';
      if (effectiveState === "default") {
        base.backgroundColor = 'var(--surface-primary-invert-main)';
      } else if (effectiveState === "hover") {
        base.backgroundColor = 'var(--surface-primary-invert-hover)';
      } else if (effectiveState === "disabled") {
        base.backgroundColor = 'var(--surface-primary-invert-disabled)';
      } else if (effectiveState === "loading") {
        base.backgroundColor = 'var(--surface-primary-invert-main)';
      }
    } else if (isSecondary) {
      if (effectiveState === "default") {
        base.backgroundColor = 'var(--surface-primary-main)';
        base.border = '1px solid var(--border-secondary)';
      } else if (effectiveState === "hover") {
        base.backgroundColor = 'var(--surface-primary-hover)';
        base.border = '1px solid var(--border-secondary)';
      } else if (effectiveState === "disabled") {
        base.backgroundColor = 'var(--surface-secondary-disabled)';
        base.border = '1px solid var(--border-disabled)';
      } else if (effectiveState === "loading") {
        base.backgroundColor = 'var(--surface-primary-main)';
        base.border = '1px solid var(--border-secondary)';
      }
    } else if (isText) {
      // Text кнопки - белый фон без border
      base.border = 'none';
      if (effectiveState === "default") {
        base.backgroundColor = 'var(--surface-primary-main)';
      } else if (effectiveState === "hover") {
        base.backgroundColor = 'var(--surface-primary-hover)';
      } else if (effectiveState === "disabled") {
        base.backgroundColor = 'var(--surface-secondary-disabled)';
      } else if (effectiveState === "loading") {
        base.backgroundColor = 'var(--surface-primary-main)';
      }
    } else if (isBackless) {
      // Backless кнопки - только border, прозрачный фон
      base.backgroundColor = 'transparent';
      if (effectiveState === "default") {
        base.border = '1px solid var(--border-secondary)';
      } else if (effectiveState === "hover") {
        base.backgroundColor = 'var(--surface-primary-hover)';
        base.border = '1px solid var(--border-secondary)';
      } else if (effectiveState === "disabled") {
        base.border = '1px solid var(--border-disabled)';
      } else if (effectiveState === "loading") {
        base.border = '1px solid var(--border-secondary)';
      }
    }

    return base;
  };

  const getTextStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: 'var(--family-brand)',
      fontWeight: 'var(--weight-regular, normal)',
      fontSize: config.fontSize,
      lineHeight: config.lineHeight,
      letterSpacing: 'var(--typescale-lable-large-tracking)',
      position: 'relative',
      flexShrink: 0,
      whiteSpace: 'nowrap',
    };

    if (effectiveState === "disabled") {
      base.color = 'var(--content-disabled)';
    } else if (isPrimary) {
      base.color = 'var(--content-invert)';
    } else {
      // Secondary, Text, Backless - все используют primary цвет текста
      base.color = 'var(--content-primary)';
    }

    return base;
  };

  const getIconStroke = () => {
    if (effectiveState === "disabled") return "var(--content-disabled)";
    if (isPrimary) return "var(--content-invert)";
    // Secondary, Text, Backless - все используют primary цвет иконки
    return "var(--content-primary)";
  };

  const showDefaultOrHover = (effectiveState === "default" || effectiveState === "hover");
  const showLoading = effectiveState === "loading";
  const showDisabled = effectiveState === "disabled";

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={state === "disabled" || state === "loading"}
      className={className || ""}
      style={getContainerStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Основной контент для default и hover */}
      {showDefaultOrHover && (
        <>
          {iconL && (iconL2 || (
            <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />
          ))}
          {text && (
            <p style={getTextStyle()}>
              {children}
            </p>
          )}
          {iconR && (iconR2 || (
            <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />
          ))}
        </>
      )}

      {/* Loading состояние - поддерживает разные варианты */}
      {showLoading && (
        <>
          {/* Только loading иконка (когда iconL=true, text=false, iconR=false - первая кнопка) */}
          {iconL && !text && !iconR && (
            <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
          )}
          {/* Только loading иконка (когда все false) */}
          {!iconL && !text && !iconR && (
            <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
          )}
          {/* Loading слева + текст */}
          {iconL && text && !iconR && (
            <>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
              <p style={getTextStyle()}>
                {children}
              </p>
            </>
          )}
          {/* Текст + loading справа */}
          {!iconL && text && iconR && (
            <>
              <p style={getTextStyle()}>
                {children}
              </p>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
            </>
          )}
          {/* Loading слева + текст + иконка справа */}
          {iconL && text && iconR && (
            <>
              <LoadingIconComponent stroke={getIconStroke()} size={config.iconSize} />
              <p style={getTextStyle()}>
                {children}
              </p>
              {iconR2 || (
                <ChartIconComponent stroke={getIconStroke()} disabled={false} size={config.iconSize} />
              )}
            </>
          )}
        </>
      )}

      {/* Disabled состояние */}
      {showDisabled && (
        <>
          {iconL && (iconL2 || (
            <ChartIconComponent stroke={getIconStroke()} disabled={true} size={config.iconSize} />
          ))}
          {text && (
            <p style={getTextStyle()}>
              {children}
            </p>
          )}
          {iconR && (iconR2 || (
            <ChartIconComponent stroke={getIconStroke()} disabled={true} size={config.iconSize} />
          ))}
        </>
      )}
    </button>
  );
}

