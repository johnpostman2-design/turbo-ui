// Дизайн-токены Turbo UI из Figma
// Источник: https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo--UI-Demo
// Все токены из tokens.json (семантические токены из Figma Variables)

import tokensData from './tokens.json';

// Типы для токенов
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'primary' | 'secondary' | 'text' | 'backless';
export type ButtonState = 'default' | 'hover' | 'disabled' | 'loading';

// Утилиты для получения токенов
export const getButtonSizeConfig = (size: ButtonSize) => {
  return tokensData.button.sizes[size];
};

// Удобные геттеры для семантических токенов (из tokens, без дублей)
export const colors = {
  content: {
    invert: tokensData.tokens['content-invert'],
    primary: tokensData.tokens['content-primary'],
    disabled: tokensData.tokens['content-disabled'],
    error: tokensData.tokens['content-error'],
    caution: tokensData.tokens['content-caution'],
    brand: tokensData.tokens['content-brand'],
    accent: tokensData.tokens['content-accent'],
    success: tokensData.tokens['content-success'],
    tertiary: tokensData.tokens['content-tertiary'],
    secondary: tokensData.tokens['content-secondary'],
  },
  surface: {
    primary: {
      main: tokensData.tokens['surface-primary-main'],
      hover: tokensData.tokens['surface-primary-hover'],
      disabled: tokensData.tokens['surface-primary-disabled'],
    },
    primaryInvert: {
      main: tokensData.tokens['surface-primary-invert-main'],
      hover: tokensData.tokens['surface-primary-invert-hover'],
      disabled: tokensData.tokens['surface-primary-invert-disabled'],
    },
    secondary: {
      main: tokensData.tokens['surface-secondary-main'],
      hover: tokensData.tokens['surface-secondary-hover'],
      disabled: tokensData.tokens['surface-secondary-disabled'],
    },
    tertiary: {
      main: tokensData.tokens['surface-tertiary-main'],
      hover: tokensData.tokens['surface-tertiary-hover'],
    },
    accent: {
      main: tokensData.tokens['surface-accent-main'],
      hover: tokensData.tokens['surface-accent-hover'],
    },
    success: {
      main: tokensData.tokens['surface-success-main'],
      hover: tokensData.tokens['surface-success-hover'],
    },
    error: {
      main: tokensData.tokens['surface-error-main'],
      hover: tokensData.tokens['surface-error-hover'],
    },
    caution: {
      main: tokensData.tokens['surface-caution-main'],
      hover: tokensData.tokens['surface-caution-hover'],
    },
    brand: {
      main: tokensData.tokens['surface-brand-main'],
      hover: tokensData.tokens['surface-brand-hover'],
      disabled: tokensData.tokens['surface-brand-disabled'],
    },
  },
  border: {
    primary: tokensData.tokens['border-primary'],
    secondary: tokensData.tokens['border-secondary'],
    tertiary: tokensData.tokens['border-tertiary'],
    disabled: tokensData.tokens['border-disabled'],
    error: tokensData.tokens['border-error'],
    caution: tokensData.tokens['border-caution'],
    brand: tokensData.tokens['border-brand'],
    accent: tokensData.tokens['border-accent'],
    success: tokensData.tokens['border-success'],
  },
};

// Удобные геттеры для типографики
export const typography = {
  family: {
    brand: `'${tokensData.typography['family-brand']}', sans-serif`,
  },
  weight: {
    regular: 400,
  },
  labelSmall: {
    size: `${tokensData.typography['typescale-lable-small-size']}px`,
    lineHeight: `${tokensData.typography['typescale-lable-small-height']}px`,
    tracking: tokensData.typography['typescale-lable-small-tracking'],
    font: tokensData.typography['typescale-lable-small-font'],
    weight: tokensData.typography['typescale-lable-small-weight'],
  },
  labelMedium: {
    size: `${tokensData.typography['typescale-lable-medium-size']}px`,
    lineHeight: `${tokensData.typography['typescale-lable-medium-height']}px`,
    tracking: tokensData.typography['typescale-lable-medium-tracking'],
    font: tokensData.typography['typescale-lable-medium-font'],
    weight: tokensData.typography['typescale-lable-medium-weight'],
  },
  labelLarge: {
    size: `${tokensData.typography['typescale-lable-large-size']}px`,
    lineHeight: `${tokensData.typography['typescale-lable-large-height']}px`,
    tracking: tokensData.typography['typescale-lable-large-tracking'],
    font: tokensData.typography['typescale-lable-large-font'],
    weight: tokensData.typography['typescale-lable-large-weight'],
  },
  // Для обратной совместимости
  size: {
    small: `${tokensData.typography['typescale-lable-small-size']}px`,
    medium: `${tokensData.typography['typescale-lable-medium-size']}px`,
    large: `${tokensData.typography['typescale-lable-large-size']}px`,
  },
  lineHeight: {
    small: `${tokensData.typography['typescale-lable-small-height']}px`,
    medium: `${tokensData.typography['typescale-lable-medium-height']}px`,
    large: `${tokensData.typography['typescale-lable-large-height']}px`,
  },
  letterSpacing: {
    labelLarge: `${tokensData.typography['typescale-lable-large-tracking']}px`,
  },
};

// Удобные геттеры для spacing
export const spacing = tokensData.spaces;

// Удобные геттеры для rounds (border radius)
export const rounds = tokensData.rounds;

// Удобные геттеры для button
export const button = {
  sizes: tokensData.button.sizes,
  borderRadius: tokensData.button.borderRadius,
  gap: tokensData.button.gap,
  gapEmpty: tokensData.button.gapEmpty,
  transition: tokensData.button.transition,
};

// Экспорт всех токенов для прямого доступа
export const tokens = tokensData;
