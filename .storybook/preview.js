import '../src/styles/fonts.css';
import '../src/styles/theme.css';
import '../src/styles/global.css';
import './turbo-ui-theme.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
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
    /* Основные контейнеры */
    .sbdocs-wrapper,
    .sbdocs-content {
      font-family: 'ONY ONE', sans-serif !important;
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
    
    /* Заголовки */
    .sbdocs-h1,
    .sbdocs-h2,
    .sbdocs-h3,
    .sbdocs-h4,
    .sbdocs-content h1,
    .sbdocs-content h2,
    .sbdocs-content h3,
    .sbdocs-content h4 {
      font-family: 'ONY ONE', sans-serif !important;
      color: #000000 !important;
      text-decoration: none !important;
      border-bottom: none !important;
    }
    
    .sbdocs-h1 {
      font-size: var(--text-h1) !important;
      font-weight: var(--font-weight-normal) !important;
      line-height: 1.5 !important;
      margin-bottom: 1.5rem !important;
    }
    
    .sbdocs-h2 {
      font-size: var(--text-h2) !important;
      font-weight: var(--font-weight-normal) !important;
      line-height: 1.5 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.25rem !important; /* 4px вместо 10px (0.67rem) */
    }
    
    .sbdocs-h3 {
      font-size: var(--text-h3) !important;
      font-weight: var(--font-weight-normal) !important;
      line-height: 1.5 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.75rem !important;
    }
    
    .sbdocs-h4 {
      font-size: var(--text-h4) !important;
      font-weight: var(--font-weight-normal) !important;
      line-height: 1.5 !important;
      margin-top: 1rem !important;
      margin-bottom: 0.5rem !important;
    }
    
    /* Параграфы и все текстовые элементы в Docs (исключая кнопки и код с подсветкой) */
    .sbdocs-p,
    .sbdocs-p p,
    .sbdocs-content p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *),
    .sbdocs-content span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]),
    .sbdocs-content div:not(.monospace):not([class*="monospace"]):not(button):not(pre):not([class*="prism"]):not(.syntax-highlighter-wrapper):not(.syntax-highlighter-wrapper *),
    .sbdocs-wrapper p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *),
    .sbdocs-wrapper span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]),
    .docs-story p:not(button p):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *),
    .docs-story span:not([class*="monospace"]):not(button span):not(.syntax-highlighter-wrapper *):not(pre *):not(code[class*="language-"] *):not([class*="token"]) {
      font-family: 'ONY ONE', sans-serif !important;
      font-size: var(--text-base) !important;
      font-weight: var(--font-weight-normal) !important;
      line-height: 1.5 !important;
      color: #000000 !important;
      margin-top: 0 !important; /* Убираем верхний margin (было 16px по умолчанию) */
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
      nav[style*="position: fixed"]:not(.button-docs-menu) {
        display: none !important;
      }
    }
    
    /* Показываем меню документации всегда */
    .button-docs-menu {
      display: block !important;
    }
  `;
  document.head.appendChild(style);
}
