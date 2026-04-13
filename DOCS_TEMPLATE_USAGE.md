# Шаблон документации компонента (эталон — Button)

**Источник правды:** `src/ui/button/Button.stories.tsx`. Все новые компоненты делают документацию по этой структуре, не собирают лэйаут заново.

---

## 1. Откуда копировать

- **Лэйаут и порядок секций:** `src/ui/button/Button.stories.tsx` (компонент `ButtonDocsPage`).
- **Стили якорного меню:** `.storybook/preview.js` — селекторы `.button-docs-menu`. Для нового компонента добавляется класс `.[компонент]-docs-menu` в те же правила.

---

## 2. Структура страницы документации (как в Button)

Один и тот же каркас для любого компонента:

```tsx
return (
  <>
    <div style={{
      display: 'flex',
      gap: '80px',
      maxWidth: '1400px',
      margin: '0 auto',
      paddingLeft: '2rem',
      paddingRight: 'calc(240px + 80px + 20px)',
      boxSizing: 'border-box'
    }}>
      {/* Основной контент */}
      <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
        <h1 id="{component}-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>{ComponentName}</h1>

        {/* Кнопки Figma и GitHub — всегда этот блок */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <Button
            variant="backless"
            startIcon={null}
            endIcon={null}
            onClick={() => window.open(FIGMA_URL, '_blank', 'noopener,noreferrer')}
          >
            Figma
          </Button>
          <Button
            variant="backless"
            startIcon={null}
            endIcon={null}
            onClick={() => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')}
          >
            GitHub
          </Button>
        </div>

        <p style={{ marginBottom: '2rem', fontFamily: 'var(--typescale-lable-medium-font), var(--family-brand), "ONY ONE", sans-serif', fontSize: 'var(--typescale-lable-medium-size)', lineHeight: 'var(--typescale-lable-medium-height)', letterSpacing: 'var(--typescale-lable-medium-tracking)', color: '#000000' }}>
          {description}
        </p>

        {/* Секция: Подключение в проекте (id="setup") */}
        {/* Секция: Импорт (id="import") */}
        {/* Секция: Пример (ExampleBlock) */}
        {/* Секция: Все пропсы (id="all-props") + CollapsiblePropsList */}
        {/* Секция: Интеграция (id="integration") */}
        {/* Секция: Тема и изоляция (id="theme-scope") */}
        {/* Секция: Варианты стилей (id="style-variants") */}
        {/* Остальные секции по необходимости (Размеры, Иконки, Состояние загрузки, Состояние блокировки и т.д.) */}
      </div>
    </div>

    {/* Меню навигации — всегда так, класс [component]-docs-menu */}
    <nav
      className="{component}-docs-menu"
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        width: '240px',
        fontFamily: 'var(--typescale-lable-small-font), var(--family-brand), "ONY ONE", sans-serif',
        fontSize: 'var(--typescale-lable-small-size)',
        lineHeight: 'var(--typescale-lable-small-height)',
        letterSpacing: 'var(--typescale-lable-small-tracking)',
        color: '#000000'
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {/* По одному <li> на пункт меню, id совпадают с id секций */}
        <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
          <a href="#import" onClick={...} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>Импорт</a>
        </li>
        {/* ... остальные пункты в том же порядке, что и секции */}
      </ul>
    </nav>
  </>
);
```

---

## 3. Стили секций (не выдумывать, брать из Button)

- **Заголовок h2:**  
  `id="..."` для якоря, стили:  
  `marginBottom: '0.25rem'`, `textDecoration: 'none'`, `borderBottom: 'none'`,  
  `fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)'`, `color: '#000000'`.

- **Абзац p (наборный текст):**  
  **Label/medium** из токенов:  
  `fontFamily: 'var(--typescale-lable-medium-font), var(--family-brand), "ONY ONE", sans-serif'`,  
  `fontSize: 'var(--typescale-lable-medium-size)'`,  
  `lineHeight: 'var(--typescale-lable-medium-height)'`,  
  `letterSpacing: 'var(--typescale-lable-medium-tracking)'`,  
  `color: '#000000'`.  
  При необходимости: `marginBottom: '1rem'` или `'1.5rem'`.  
  Глобально то же задаётся в `.storybook/preview.js` для контента Docs (`!important`).

- **Инлайн code:**  
  `style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}`.

- **Блок кода (SyntaxHighlighter):**  
  обёртка с `borderRadius: '8px'`, `overflow: 'hidden'`, `background: '#f5f5f5'`, `padding: '1rem'`, `fontSize: '0.875rem'`.

- **Секция:**  
  обёртка `<div style={{ marginBottom: '3rem' }}>`.

---

## 4. Якорное меню и preview.js

- Класс меню: **`[component]-docs-menu`** (например `button-docs-menu`, `icon-button-docs-menu`).
- Стили меню задаются в **`.storybook/preview.js`**: один раз прописаны для `.button-docs-menu`, для каждого нового компонента в те же правила добавляется класс `.[component]-docs-menu`.
- В preview.js должны быть:
  - `display: block !important` для `.button-docs-menu` и `.icon-button-docs-menu` (и для следующих компонентов);
  - якорное меню справа — **Label/small**; наборный текст страницы — **Label/medium** (см. правила в `preview.js`).

**При добавлении нового компонента:** добавить в preview.js класс `.[новый-компонент]-docs-menu` рядом с `.button-docs-menu` / `.icon-button-docs-menu` в тех же селекторах.

---

## 5. Порядок секций и пунктов меню (как в Button)

Порядок в контенте и в меню должен совпадать:

1. Подключение в проекте (id `setup`)
2. Импорт (id `import`)
3. Пример (первый ExampleBlock)
4. Все пропсы (id `all-props`)
5. Интеграция: ref и нативные атрибуты (id `integration`)
6. Тема и изоляция (id `theme-scope`)
7. Варианты стилей (id `style-variants`)
8. Дальше — секции по компоненту (Размеры, Иконки, Состояние загрузки, Состояние блокировки и т.д.)

Каждой секции с `id` соответствует один пункт в `<nav>` с `href="#id"` и тем же текстом.

---

## 6. Чеклист для нового компонента

- [ ] Скопировать структуру `ButtonDocsPage` из `src/ui/button/Button.stories.tsx` (обёртки, порядок блоков, меню).
- [ ] Заменить заголовок, описание, ссылки Figma/GitHub, код импорта и примеров на свои.
- [ ] Оставить блок кнопок Figma/GitHub через `<Button variant="backless" startIcon={null} endIcon={null} onClick={...}>`.
- [ ] Меню: класс `[component]-docs-menu`, те же стили что у nav в Button, пункты меню в том же формате (li > a с теми же style).
- [ ] В `.storybook/preview.js` добавить класс `.[component]-docs-menu` в правила для якорного меню (display + типографика).
- [ ] Не придумывать новый лэйаут: только подставлять свои тексты и секции в каркас Button.

---

## 7. handleMenuClick (плавная прокрутка)

Использовать одну и ту же функцию во всех документациях:

```tsx
const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};
```

---

**Итог:** документация нового компонента = копия лэйаута и стилей из `Button.stories.tsx` + подстановка своих текстов, ссылок и секций + регистрация класса меню в `preview.js`. Лэйаут не собирать заново.
