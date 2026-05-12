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
          ['Colors', 'Typography', 'Tokens'],
          'Components',
          [
            'Icons',
            'Button',
            'IconButton',
            'Link',
            'Input',
            'InputField',
            'FloatingInputField',
            'TextArea',
            'TextAreaField',
            'Select',
            'SelectField',
            'ComboBox',
            'ComboBoxField',
            'Listbox',
            'Checkbox',
            'Radio',
            'Toggle',
            'Tabs',
          ],
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
    
    /* Helper/error под полями (*Field, legacy TextArea) — стиль caption по токенам; перебивает .sbdocs-content p и .turbo-ui-scope * */
    p[data-turbo-input-field-helper],
    p[data-turbo-textarea-helper],
    p[data-turbo-select-field-helper],
    p[data-turbo-combobox-field-helper],
    p[data-turbo-textarea-field-helper] {
      font-family: var(--typescale-caption-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-caption-medium-size) !important;
      line-height: var(--typescale-caption-medium-height) !important;
      font-weight: var(--typescale-caption-medium-weight) !important;
      letter-spacing: var(--typescale-caption-medium-tracking) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="tertiary"],
    p[data-turbo-textarea-helper][data-helper-tone="tertiary"],
    p[data-turbo-select-field-helper][data-helper-tone="tertiary"],
    p[data-turbo-combobox-field-helper][data-helper-tone="tertiary"],
    p[data-turbo-textarea-field-helper][data-helper-tone="tertiary"] {
      color: var(--content-tertiary) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="error"],
    p[data-turbo-textarea-helper][data-helper-tone="error"],
    p[data-turbo-select-field-helper][data-helper-tone="error"],
    p[data-turbo-combobox-field-helper][data-helper-tone="error"],
    p[data-turbo-textarea-field-helper][data-helper-tone="error"] {
      color: var(--content-error) !important;
    }
    p[data-turbo-input-field-helper][data-helper-tone="disabled"],
    p[data-turbo-textarea-helper][data-helper-tone="disabled"],
    p[data-turbo-select-field-helper][data-helper-tone="disabled"],
    p[data-turbo-combobox-field-helper][data-helper-tone="disabled"],
    p[data-turbo-textarea-field-helper][data-helper-tone="disabled"] {
      color: var(--content-disabled) !important;
    }

    /* Превью Turbo UI в Docs: форсим ONY ONE на ВСЁ внутри scope/панели Listbox.
       UA-дефолты у <button>/<input> и Storybook-хуки больше не уводят в системный шрифт.
       Исключены svg/code/pre/monospace (для иконок и блоков кода). */
    .turbo-ui-scope,
    .turbo-ui-scope *:not(svg):not(svg *):not(code):not(pre):not(pre *):not(.monospace):not([class*="monospace"]):not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]),
    [data-no-sbdocs-typography],
    [data-no-sbdocs-typography] *:not(svg):not(svg *):not(code):not(pre):not(pre *):not(.monospace):not([class*="monospace"]):not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]) {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
    }
    .turbo-ui-scope input::placeholder,
    [data-no-sbdocs-typography] input::placeholder {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
    }

    /* Плавающий лейбл FloatingInputField: исключён из глобального span — задаём только семейство; размеры из CSS Modules */
    [data-turbo-floating-input-field-label] {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
    }

    /* Наборный текст в Docs — абзацы: стиль label по токенам + цвет */
    .sbdocs-p:not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]),
    .sbdocs-p p:not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]),
    .sbdocs-content p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]),
    .sbdocs-wrapper p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]),
    .docs-story p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([data-turbo-input-field-helper]):not([data-turbo-textarea-helper]):not([data-turbo-select-field-helper]):not([data-turbo-combobox-field-helper]):not([data-turbo-textarea-field-helper]) {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
      color: var(--content-primary) !important;
      margin-top: 0 !important;
    }

    /* Стиль label в Docs для span/div без принудительного цвета — внутри data-no-sbdocs-typography не трогаем (размеры/цвета из CSS Modules, напр. Listbox) */
    .sbdocs-content span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .sbdocs-content div:not([data-no-sbdocs-typography]):not(:is([data-no-sbdocs-typography] *)):not(.monospace):not([class*="monospace"]):not(button):not(pre):not([class*="prism"]):not(.syntax-highlighter-wrapper):not(.syntax-highlighter-wrapper *):not(.color-swatch-label):not(.typography-sample-text):not(.colors-table-header):not(.colors-table-row),
    .sbdocs-wrapper span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .docs-story span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]) {
      font-family: var(--typescale-lable-medium-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-medium-size) !important;
      line-height: var(--typescale-lable-medium-height) !important;
      font-weight: var(--typescale-lable-medium-weight) !important;
      letter-spacing: var(--typescale-lable-medium-tracking) !important;
      margin-top: 0 !important;
    }

    /* Цвет набора в Docs — отдельно, чтобы не перебивать disabled/selected в превью (Listbox и др.) */
    .sbdocs-content span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .sbdocs-content div:not([data-no-sbdocs-typography]):not(:is([data-no-sbdocs-typography] *)):not(.monospace):not([class*="monospace"]):not(button):not(pre):not([class*="prism"]):not(.syntax-highlighter-wrapper):not(.syntax-highlighter-wrapper *):not(.color-swatch-label):not(.typography-sample-text):not(.colors-table-header):not(.colors-table-row),
    .sbdocs-wrapper span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]),
    .docs-story span:not(:is([data-no-sbdocs-typography] *)):not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]):not(.typography-pill):not(.colors-table-header-cell):not(.colors-table-row-cell):not([data-turbo-floating-input-field-label]) {
      color: var(--content-primary) !important;
    }
    
    /* Списки в Docs — стиль label по токенам */
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
    
    /* Пилюли типографики: токены caption, content-tertiary */
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
      nav[style*="position: fixed"]:not(.button-docs-menu):not(.icon-button-docs-menu):not(.icons-docs-menu):not(.input-docs-menu):not(.input-field-docs-menu):not(.floating-input-field-docs-menu):not(.textarea-docs-menu):not(.textarea-field-docs-menu):not(.checkbox-docs-menu):not(.radio-docs-menu):not(.listbox-docs-menu):not(.select-docs-menu):not(.select-field-docs-menu):not(.combobox-docs-menu):not(.combobox-field-docs-menu):not(.link-docs-menu):not(.toggle-docs-menu):not(.tabs-docs-menu) {
        display: none !important;
      }
    }
    
    /* Показываем меню документации всегда (Button, IconButton, Input, InputField) */
    .button-docs-menu,
    .icon-button-docs-menu,
    .icons-docs-menu,
    .input-docs-menu,
    .input-field-docs-menu,
    .floating-input-field-docs-menu,
    .textarea-docs-menu,
    .checkbox-docs-menu,
    .radio-docs-menu,
    .listbox-docs-menu,
    .select-docs-menu,
    .combobox-docs-menu,
    .select-field-docs-menu,
    .combobox-field-docs-menu,
    .textarea-field-docs-menu,
    .link-docs-menu,
    .toggle-docs-menu,
    .tabs-docs-menu {
      display: block !important;
    }
    
    /* Оглавление справа — Label/small (компактнее основного текста) */
    .button-docs-menu,
    .button-docs-menu a,
    .button-docs-menu li,
    .icon-button-docs-menu,
    .icon-button-docs-menu a,
    .icon-button-docs-menu li,
    .icons-docs-menu,
    .icons-docs-menu a,
    .icons-docs-menu li,
    .input-docs-menu,
    .input-docs-menu a,
    .input-docs-menu li,
    .input-field-docs-menu,
    .input-field-docs-menu a,
    .input-field-docs-menu li,
    .floating-input-field-docs-menu,
    .floating-input-field-docs-menu a,
    .floating-input-field-docs-menu li,
    .textarea-docs-menu,
    .textarea-docs-menu a,
    .textarea-docs-menu li,
    .checkbox-docs-menu,
    .checkbox-docs-menu a,
    .checkbox-docs-menu li,
    .radio-docs-menu,
    .radio-docs-menu a,
    .radio-docs-menu li,
    .listbox-docs-menu,
    .listbox-docs-menu a,
    .listbox-docs-menu li,
    .select-docs-menu,
    .select-docs-menu a,
    .select-docs-menu li,
    .select-field-docs-menu,
    .select-field-docs-menu a,
    .select-field-docs-menu li,
    .combobox-docs-menu,
    .combobox-docs-menu a,
    .combobox-docs-menu li,
    .combobox-field-docs-menu,
    .combobox-field-docs-menu a,
    .combobox-field-docs-menu li,
    .textarea-field-docs-menu,
    .textarea-field-docs-menu a,
    .textarea-field-docs-menu li,
    .link-docs-menu,
    .link-docs-menu a,
    .link-docs-menu li,
    .toggle-docs-menu,
    .toggle-docs-menu a,
    .toggle-docs-menu li,
    .tabs-docs-menu,
    .tabs-docs-menu a,
    .tabs-docs-menu li {
      font-family: var(--typescale-lable-small-font), var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--typescale-lable-small-size) !important;
      line-height: var(--typescale-lable-small-height) !important;
      font-weight: var(--typescale-lable-small-weight) !important;
      letter-spacing: var(--typescale-lable-small-tracking) !important;
      color: var(--content-primary) !important;
    }

    /* Link: span/иконка внутри <a>/<button> должны наследовать font/color/decoration
       от корня Link, а не получать "label-medium" из глобальных sbdocs-правил.
       data-turbo-link выставляется самим компонентом на корне. */
    .sbdocs-content [data-turbo-link],
    .sbdocs-wrapper [data-turbo-link],
    .docs-story [data-turbo-link],
    .sb-story [data-turbo-link] {
      font: inherit !important;
      letter-spacing: inherit !important;
    }
    .sbdocs-content [data-turbo-link] > span,
    .sbdocs-wrapper [data-turbo-link] > span,
    .docs-story [data-turbo-link] > span,
    .sb-story [data-turbo-link] > span {
      font: inherit !important;
      color: inherit !important;
      line-height: inherit !important;
      letter-spacing: inherit !important;
      margin-top: 0 !important;
    }

    /* Link docs: блок "Внутри типографики" — возвращаем нативные стили p/h2,
       чтобы продемонстрировать наследование Link от контекста.
       Перебиваем глобальные .sbdocs-content p/h2 правила. */
    .link-typo-demo p,
    .sbdocs-content .link-typo-demo p,
    .sbdocs-wrapper .link-typo-demo p,
    .docs-story .link-typo-demo p {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--text-base) !important;
      line-height: 1.5 !important;
      font-weight: var(--weight-regular) !important;
      letter-spacing: normal !important;
      color: var(--content-primary) !important;
      margin: 0 !important;
    }
    .link-typo-demo h2,
    .sbdocs-content .link-typo-demo h2,
    .sbdocs-wrapper .link-typo-demo h2,
    .docs-story .link-typo-demo h2 {
      font-family: var(--family-brand), 'ONY ONE', sans-serif !important;
      font-size: var(--text-h2) !important;
      line-height: var(--text-h2-height) !important;
      font-weight: var(--weight-regular) !important;
      letter-spacing: normal !important;
      color: var(--content-primary) !important;
      margin: 0 !important;
    }
  `;
  document.head.appendChild(style);
}
