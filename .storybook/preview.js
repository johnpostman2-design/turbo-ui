import '../src/styles/fonts.css';
import '../src/styles/theme.css';
import '../src/styles/global.css';
import './turbo-ui-theme.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography'],
          'Components',
          ['Icons', 'Button', 'IconButton', 'Input', 'InputField', 'FloatingInputField'],
        ],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    docs: {
      toc: false,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },
  },
};

export default preview;

// Добавляем глобальные стили для Storybook Docs
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    /* Основные контейнеры — типографика из токенов проекта */
    .sbdocs-wrapper,
    .sbdocs-content {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
      background: var(--background) !important;
      color: var(--foreground) !important;
    }
    
    .sbdocs-content {
      max-width: 1200px !important;
      padding: 3rem 0 3rem 2rem !important;
      margin: 0 auto !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    
    /* Респонсивные стили для контентной зоны */
    @media (max-width: 768px) {
      .sbdocs-content {
        padding: 2rem 0 2rem 1.5rem !important;
      }
    }
    
    @media (max-width: 480px) {
      .sbdocs-content {
        padding: 1.5rem 0 1.5rem 1rem !important;
      }
    }
    
    @media (min-width: 1400px) {
      .sbdocs-content {
        max-width: 1400px !important;
      }
    }
    
    /* Заголовки Docs — Display/Headline/Title/Body из токенов */
    .sbdocs-h1,
    .sbdocs-h2,
    .sbdocs-h3,
    .sbdocs-h4,
    .sbdocs-content h1,
    .sbdocs-content h2,
    .sbdocs-content h3,
    .sbdocs-content h4 {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
      color: var(--content-primary) !important;
      text-decoration: none !important;
      border-bottom: none !important;
      font-weight: var(--weight-regular) !important;
    }
    
    .sbdocs-h1, .sbdocs-content h1 {
      font-size: var(--text-h1) !important;
      line-height: var(--text-h1-height) !important;
      margin-bottom: var(--spacing-24) !important;
    }
    
    .sbdocs-h2, .sbdocs-content h2 {
      font-size: var(--text-h2) !important;
      line-height: var(--text-h2-height) !important;
      margin-top: var(--spacing-32) !important;
      margin-bottom: calc(3 * var(--spacing-4)) !important;
    }
    
    .sbdocs-h3, .sbdocs-content h3 {
      font-size: var(--text-h3) !important;
      line-height: var(--text-h3-height) !important;
      margin-top: var(--spacing-24) !important;
      margin-bottom: calc(3 * var(--spacing-12)) !important;
    }
    
    .sbdocs-h4, .sbdocs-content h4 {
      font-size: var(--text-h4) !important;
      line-height: var(--text-h4-height) !important;
      margin-top: var(--spacing-16) !important;
      margin-bottom: calc(3 * var(--spacing-8)) !important;
    }
    
    /* InputField helper — Caption/medium по макету Figma (696-412); цвет — семантика токенов (перебивает color у .sbdocs-content) */
    p[data-turbo-input-field-helper] {
      font-family: var(--typescale-caption-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-caption-medium-size) !important;
      line-height: var(--typescale-caption-medium-height) !important;
      font-weight: var(--typescale-caption-medium-weight) !important;
      letter-spacing: var(--typescale-caption-medium-tracking) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="tertiary"] {
      color: var(--content-tertiary) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="error"] {
      color: var(--content-error) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="disabled"] {
      color: var(--content-disabled) !important;
    }

    /* Плавающий лейбл FloatingInputField: исключён из глобального span — задаём только семейство; размеры из CSS Modules */
    [data-turbo-floating-input-field-label] {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
    }

    /* Наборный текст в Docs — Label/medium (типографика из токенов) */
    .sbdocs-p:not([data-turbo-input-field-helper]),
    .sbdocs-p p:not([data-turbo-input-field-helper]),
    .sbdocs-content p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]),
    .sbdocs-content span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .sbdocs-content div:not(.monospace):not([class*="monospace"]):not(button):not(pre):not([class*="prism"]):not(.syntax-highlighter-wrapper):not(.syntax-highlighter-wrapper *):not(.color-swatch-label):not(.typography-sample-text):not(.colors-table-header):not(.colors-table-row),
    .sbdocs-wrapper p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]),
    .sbdocs-wrapper span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .docs-story p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]),
    .docs-story span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]) {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
      color: var(--content-primary) !important;
      margin-top: 0 !important;
    }
    
    /* Списки в Docs — Label/medium */
    .sbdocs-content ul,
    .sbdocs-content ol,
    .sbdocs-content li,
    .sbdocs-wrapper ul,
    .sbdocs-wrapper ol,
    .sbdocs-wrapper li,
    .docs-story ul,
    .docs-story ol,
    .docs-story li {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
      color: var(--content-primary) !important;
    }
    
    /* Пилюли типографики: caption-medium, content-tertiary */
    .typography-pill {
      font-family: var(--family-brand) !important;
      font-size: var(--typescale-caption-medium-size) !important;
      line-height: var(--typescale-caption-medium-height) !important;
      color: var(--content-tertiary) !important;
      font-weight: var(--weight-regular) !important;
    }
    
    /* Таблица Colors: шапка — content-tertiary, строки — content-primary (ID для приоритета над глобальными стилями) */
    #colors-docs-root .colors-table-header-cell,
    #colors-docs-root .colors-table-header span {
      color: var(--content-tertiary) !important;
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
    }
    #colors-docs-root .colors-table-row-cell,
    #colors-docs-root .colors-table-row span {
      color: var(--content-primary) !important;
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
    }
    
    /* Стили для заголовков в карточках цветов */
    .color-swatch-label {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-caption-medium-size) !important;
      line-height: var(--typescale-caption-medium-height) !important;
      font-weight: var(--weight-regular) !important;
      color: var(--content-tertiary) !important;
      margin-bottom: var(--spacing-4) !important;
    }
    
    /* Защита текста внутри кнопок от глобальных стилей */
    .sbdocs-wrapper button p,
    .sbdocs-content button p,
    .docs-story button p,
    .sb-story button p {
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Исключения для моноширинного шрифта (код) */
    .sbdocs-p code,
    .sbdocs-content code,
    .monospace,
    [style*="font-family: monospace"],
    [style*="fontFamily: 'monospace'"],
    [style*="fontFamily: \"monospace\""] {
      font-family: monospace !important;
    }
    
    
    /* Canvas превью */
    .sb-story {
      background: var(--background) !important;
    }
    
    /* Docs story wrapper */
    .docs-story {
      background: transparent !important;
    }
    
    /* Убираем стандартную рамку вокруг preview */
    .docs-story > div:first-child {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    
    /* Якорное меню справа */
    .sbdocs-content {
      position: relative;
    }
    
    /* Скрываем меню на мобильных устройствах */
    @media (max-width: 1200px) {
      nav[style*="position: fixed"]:not(.button-docs-menu):not(.icon-button-docs-menu):not(.input-docs-menu):not(.input-field-docs-menu):not(.floating-input-field-docs-menu) {
        display: none !important;
      }
    }
    
    /* Показываем меню документации всегда (Button, IconButton, Input, InputField) */
    .button-docs-menu,
    .icon-button-docs-menu,
    .input-docs-menu,
    .input-field-docs-menu,
    .floating-input-field-docs-menu {
      display: block !important;
    }
    
    /* Оглавление справа — Label/small (компактнее основного текста) */
    .button-docs-menu,
    .button-docs-menu a,
    .button-docs-menu li,
    .icon-button-docs-menu,
    .icon-button-docs-menu a,
    .icon-button-docs-menu li,
    .input-docs-menu,
    .input-docs-menu a,
    .input-docs-menu li,
    .input-field-docs-menu,
    .input-field-docs-menu a,
    .input-field-docs-menu li,
    .floating-input-field-docs-menu,
    .floating-input-field-docs-menu a,
    .floating-input-field-docs-menu li {
      font-family: var(--typescale-lable-small-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-small-size) !important;
      line-height: var(--typescale-lable-small-height) !important;
      font-weight: var(--typescale-lable-small-weight) !important;
      letter-spacing: var(--typescale-lable-small-tracking) !important;
      color: var(--content-primary) !important;
    }
  `;
  document.head.appendChild(style);
}
