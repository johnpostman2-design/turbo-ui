---
description: "Task list — Link (typography)"
---

# Tasks: Link (typography)

**Input**: Design documents from `/specs/012-link-typography/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/link.md`, `quickstart.md`

**Tests**: Включены. Спецификация (SC-006) явно требует ≥ 8 unit-тестов для `Link` по образцу `Button.test.tsx`/`InputField.test.tsx`.

**Organization**: задачи сгруппированы по user-стори (US1..US5) спецификации. Все user-стори работают над одним и тем же файлом (`Link.tsx`/`link.module.css`), поэтому задачи внутри стори последовательны; параллельность — между независимыми файлами/конфигами.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно выполнять параллельно (разные файлы, нет блокирующих зависимостей).
- **[Story]**: к какой user-стори относится задача (US1..US5). Для Setup/Foundational/Polish — метка не ставится.
- Файловые пути указаны полностью.

## Path Conventions

- Корень проекта: `src/`
- Новый каталог: `src/ui/link/`
- Сборка/экспорты: `package.json`, `vite.config.lib.js`, `scripts/copy-styles.cjs`, `src/index.ts`, `.storybook/preview.js`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: подготовить публичный entry-подпуть `turbo-ui/link`, каталог компонента, сборку и место в навигации Storybook. Базовый файл `Link.tsx` пока не создаётся — это часть US1.

- [X] T001 [P] Создать каталог `src/ui/link/` с пустым `src/ui/link/index.ts`, содержащим только комментарий `// to be implemented` (заглушка нужна для конфигов сборки, см. T003).
- [X] T002 [P] В `package.json` добавить новую запись в `exports` по образцу `./input-field` (после `./icon-button`, чтобы сохранить порядок «по соседству» с другими интерактивными компонентами): `"./link": { "types": "./dist/ui/link.d.ts", "import": "./dist/ui/link.js" }`. Не трогать существующие entry.
- [X] T003 [P] В `vite.config.lib.js`:
  - Добавить в `build.lib.entry` ключ `'ui/link': path.resolve(dirname, 'src/ui/link/index.ts')` (между `'ui/icon-button'` и `'ui/input'`).
  - В `plugins.dts.include` добавить `'src/ui/link/**/*.ts'` и `'src/ui/link/**/*.tsx'`.
- [X] T004 [P] В `scripts/copy-styles.cjs` добавить генерацию shim-d.ts для `link` по образцу остальных компонентов:
  ```js
  const linkDts = path.join(dist, 'ui', 'link.d.ts');
  if (fs.existsSync(path.join(dist, 'ui', 'link', 'index.d.ts'))) {
    fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
    fs.writeFileSync(
      linkDts,
      "export { Link } from './link/index';\nexport type { LinkProps, LinkVariant } from './link/index';\n"
    );
    console.log('Written dist/ui/link.d.ts');
  }
  ```
- [X] T005 [P] В `.storybook/preview.js` в массиве `storySort.order` (внутри `Components`) добавить `'Link'` ровно между `'IconButton'` и `'Input'` (см. research §K).

**Checkpoint**: каталог и конфиги готовы. `npm run typecheck` и `npm run build:lib` остаются зелёными (пустой `index.ts` валиден, лишь не экспортирует ничего).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: компонент изолирован, breaking changes отсутствуют, новых токенов не добавляется. Отдельная общая инфраструктура не требуется.

> Этот этап **не нужен** для данной фичи: все базовые требования покрываются Phase 1 (Setup) и US1.

---

## Phase 3: User Story 1 — Inline-поведение и наследование typography (Priority: P1) 🎯 MVP

**Goal**: рабочий публичный компонент `Link` с одним вариантом (`default`), который рендерится как `<a href=...>` inline в любом тексте и наследует `font-family`/`font-size`/`line-height` от родителя. MVP — встроить `Link` в `<p>`, и ссылка визуально становится частью текста.

**Independent Test**: рендер `<p>Подробнее в <Link href="/docs">нашей документации</Link>.</p>` в Storybook/тесте. Computed style ссылки совпадает с computed style `<p>` по `font-family`/`font-size`/`line-height`; корневой DOM-узел — `<a>` с правильным `href`; цвет — `var(--content-brand)`.

### Implementation for User Story 1

- [X] T006 [US1] Создать CSS-модуль `src/ui/link/link.module.css` с базовой разметкой:
  ```css
  .root {
    display: inline;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    text-decoration: underline;
    text-decoration-color: currentColor;
    text-decoration-thickness: from-font;
    text-underline-offset: from-font;
    border-radius: var(--rounds-s);
  }
  .variantDefault { color: var(--content-brand); }
  /* Остальные варианты, hover/active/focus/disabled — добавляются в US2/US3 */
  ```
  Только токены проекта (`--content-brand`, `--rounds-s`). Никаких hardcoded цветов/размеров. `border-radius` ставим сразу — пригодится для focus-ring в US3.
- [X] T007 [US1] Создать `src/ui/link/Link.tsx`:
  ```tsx
  import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
  import clsx from 'clsx';
  import styles from './link.module.css';

  export type LinkVariant = 'default' | 'secondary' | 'danger';

  export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> {
    href?: string;
    variant?: LinkVariant;
    children?: ReactNode;
    className?: string;
  }

  export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { href, variant = 'default', className, children, ...rest },
    ref,
  ) {
    const variantClass =
      variant === 'secondary' ? styles.variantSecondary :
      variant === 'danger' ? styles.variantDanger :
      styles.variantDefault;
    return (
      <a ref={ref} href={href} className={clsx(styles.root, variantClass, className)} {...rest}>
        {children}
      </a>
    );
  });
  ```
  На этом этапе: только корневой тег `<a>`, один реальный variant (`default`); типы для `secondary`/`danger` уже объявлены (классов CSS пока нет, добавятся в US3). Кейс «без `href`», `<button>`, `disabled`, иконки — НЕ реализуются здесь, добавляются в US2..US4.
- [X] T008 [P] [US1] Создать `src/ui/link/index.ts` с реэкспортом:
  ```ts
  export { Link } from './Link';
  export type { LinkProps, LinkVariant } from './Link';
  ```
- [X] T009 [US1] В `src/index.ts` добавить реэкспорт `Link` и типов рядом с другими компонентами (после `IconButton`, перед `Input`):
  ```ts
  export { Link } from './ui/link';
  export type { LinkProps, LinkVariant } from './ui/link';
  ```

### Tests for User Story 1

- [X] T010 [P] [US1] Создать `src/ui/link/Link.test.tsx` с MVP-набором тестов:
  1. Рендерится `<a>` с заданным `href`.
  2. `children` отображается внутри корневого узла.
  3. `ref` указывает на корневой `HTMLAnchorElement`.
  4. `className` мержится с базовыми классами (через присутствие класса CSS-Module + пользовательский класс на корне).
  5. `variant="default"` (или отсутствие пропа) применяет класс `.variantDefault` (через `data-testid` + `className` инспекцию).
  6. Computed style: внутри `<p style={{ fontSize: '20px' }}>` корневой `<a>` имеет `getComputedStyle(...).fontSize === '20px'` (jsdom — наследование через CSS `font: inherit`).
  7. Rest-пропы пробрасываются: `data-testid`, `id`, `aria-label` оказываются на `<a>`.

**Checkpoint**: MVP готов. `npm run typecheck`, `npm test`, `npm run build:lib` зелёные. Компонент уже импортируется как `import { Link } from 'turbo-ui'` и `import { Link } from 'turbo-ui/link'`.

---

## Phase 4: User Story 2 — Навигация по `href` и действие по `onClick` (Priority: P1)

**Goal**: `Link` без `href` рендерится как `<button type="button">`; для обоих корневых тегов корректно работает `onClick`; при `disabled` — ни клик, ни навигация не выполняются; для `target="_blank"` автоматически проставляется безопасный `rel`.

**Independent Test**: рендер `<Link href="/x" onClick={fn}>…</Link>` и `<Link onClick={fn}>…</Link>` — оба варианта вызывают `fn` при клике. `<Link disabled href="/x" onClick={fn}>` — `fn` не вызывается, навигации нет. `<Link href="https://x" target="_blank">` имеет `rel="noopener noreferrer"`.

### Implementation for User Story 2

- [X] T011 [US2] Расширить `src/ui/link/Link.tsx`:
  - Заменить тип пропов на дискриминированный union `LinkAnchorProps | LinkButtonProps` из контракта (`contracts/link.md`); `disabled` — общий проп.
  - Добавить рендер `<button type="button">` для случая `href === undefined`.
  - Внутри компонента вычислить:
    - `Component = href !== undefined ? 'a' : 'button'`;
    - `computedRel = target === '_blank' && rel === undefined ? 'noopener noreferrer' : rel` — только для `<a>`-ветки;
    - `onClickGuarded`: если `disabled` — `event.preventDefault()` + ранний return; иначе — вызывать `onClick`.
  - Передавать `ref` правильного типа в зависимости от тега: `forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>`.
- [X] T012 [US2] В `Link.tsx` реализовать `disabled`-логику:
  - Для `<a>`: НЕ ставить атрибут `href` в DOM при `disabled` (`href={disabled ? undefined : href}`), ставить `aria-disabled="true"` и `tabIndex={-1}`.
  - Для `<button>`: ставить нативный `disabled={true}`.
  - На корневой элемент добавить класс `styles.disabled` (CSS-правила появятся в US3 / T015).
- [X] T013 [P] [US2] В `src/ui/link/link.module.css` добавить минимум — поведенческие CSS-правила для `.disabled` (полные визуальные — в US3):
  ```css
  .root.disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
  ```
- [X] T014 [US2] В `src/ui/link/Link.test.tsx` добавить тесты:
  - `<Link onClick={fn}>` без `href` рендерится как `<button type="button">`; клик вызывает `fn`.
  - `<Link href="/x" onClick={fn}>` рендерится как `<a>`; клик вызывает `fn`.
  - `<Link disabled href="/x" onClick={fn}>` — `fn` НЕ вызван, атрибут `href` в DOM отсутствует, `aria-disabled="true"`, `tabIndex="-1"`.
  - `<Link disabled onClick={fn}>` (button) — `fn` НЕ вызван, у DOM-элемента `disabled === true`.
  - `target="_blank"` без `rel` → DOM-атрибут `rel="noopener noreferrer"`.
  - `target="_blank"` с `rel="custom"` → DOM-атрибут `rel="custom"` (не перетёрт).
  - `ref` указывает на `HTMLButtonElement` в кейсе без `href`.

**Checkpoint**: оба корневых тега работают; `disabled` подавляет клик и навигацию; авто-`rel` для `_blank`. Тесты зелёные.

---

## Phase 5: User Story 3 — Цветовые варианты и состояния (Priority: P1)

**Goal**: `Link` поддерживает `variant: 'default' | 'secondary' | 'danger'` и все визуальные состояния: `default`, `hover`, `active`, `focus-visible`, `disabled` — строго через токены.

**Independent Test**: рендер `<Link variant="default" />`, `<Link variant="secondary" />`, `<Link variant="danger" />` в Storybook — цвета соответствуют `var(--content-brand)` / `var(--content-primary)` / `var(--content-error)`. `:hover` убирает подчёркивание; `:active` усиливает подчёркивание; `:focus-visible` отрисовывает outline с currentColor; `disabled` окрашивает в `var(--content-disabled)` и убирает подчёркивание.

### Implementation for User Story 3

- [X] T015 [US3] Расширить `src/ui/link/link.module.css` полным набором правил состояний и вариантов (по таблице из `data-model.md`):
  ```css
  .variantSecondary { color: var(--content-primary); }
  .variantDanger { color: var(--content-error); }

  .root:hover:not(.disabled) {
    text-decoration: none;
  }
  .root:active:not(.disabled) {
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
  }
  .root:focus-visible:not(.disabled) {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  .root.disabled,
  .root:disabled {
    color: var(--content-disabled);
    text-decoration: none;
  }
  ```
  Только токены/CSS-keyword’ы; `2px`/`0.1em` — относительные/системные значения (см. research §E, §F).
- [X] T016 [US3] В `src/ui/link/Link.tsx` убедиться, что класс варианта применяется корректно для всех трёх значений (для `secondary` и `danger` теперь есть CSS — T015 добавил классы; реализация в T007 уже выбирает их по `variant`).
- [X] T017 [P] [US3] В `src/ui/link/Link.test.tsx` добавить тесты:
  - `<Link variant="secondary" />` имеет класс `.variantSecondary`; computed `color` соответствует `var(--content-primary)` (или хотя бы класс присутствует — jsdom не вычисляет CSS-переменные).
  - `<Link variant="danger" />` имеет класс `.variantDanger`.
  - `<Link disabled />` имеет класс `.disabled` и одновременно `aria-disabled="true"` (anchor) или нативный `disabled` (button).

**Checkpoint**: все три варианта и пять состояний работают; визуальная проверка — через Storybook (US5), но классы и базовая структура DOM закрыты unit-тестами.

---

## Phase 6: User Story 4 — Иконки в ссылке (Priority: P2)

**Goal**: `Link` принимает `startIcon` и `endIcon` (ReactNode); иконки масштабируются под текущий `font-size` (`1em`) и наследуют цвет через `currentColor`. Иконки в `<span aria-hidden="true">`.

**Independent Test**: рендер `<Link startIcon={<Icon name="download" size="100%" />}>Скачать</Link>` — иконка занимает `1em × 1em`, цвет совпадает с цветом текста (включая `disabled`). `<Link endIcon={…} variant="danger" />` — иконка перекрашивается в `var(--content-error)` через `currentColor`.

### Implementation for User Story 4

- [X] T018 [US4] Расширить `src/ui/link/Link.tsx`:
  - Принять пропы `startIcon?: ReactNode` и `endIcon?: ReactNode` (поднять в `LinkCommonProps` интерфейса).
  - Изменить рендер тела: вместо одного `{children}` рендерить
    ```tsx
    {startIcon && <span className={styles.iconStart} aria-hidden="true">{startIcon}</span>}
    <span className={styles.text}>{children}</span>
    {endIcon && <span className={styles.iconEnd} aria-hidden="true">{endIcon}</span>}
    ```
  - Корневому `.root` поменять `display: inline` → `display: inline-flex; align-items: baseline; vertical-align: baseline;` (только если есть `startIcon` или `endIcon` — либо всегда, см. T019).
- [X] T019 [US4] В `src/ui/link/link.module.css` добавить классы слотов и текста:
  ```css
  .root {
    /* было: display: inline; — заменить на inline-flex */
    display: inline-flex;
    align-items: baseline;
    vertical-align: baseline;
    /* остальные правила .root остаются */
  }
  .text { display: inline; }
  .iconStart,
  .iconEnd {
    display: inline-flex;
    align-items: center;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    color: currentColor;
  }
  .iconStart { margin-right: 0.25em; }
  .iconEnd { margin-left: 0.25em; }
  .iconStart > *,
  .iconEnd > * {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
  ```
  Переход с `inline` на `inline-flex` сохраняет наследование шрифта и работает в строке текста (см. research §H).
- [X] T020 [P] [US4] В `src/ui/link/Link.test.tsx` добавить тесты:
  - `<Link startIcon={<svg data-testid="start" />} />` рендерит `<span class="iconStart" aria-hidden="true">` с переданным SVG.
  - `<Link endIcon={<svg data-testid="end" />} />` рендерит `<span class="iconEnd" aria-hidden="true">`.
  - Без `startIcon`/`endIcon` соответствующих `<span>` в DOM нет.
  - `<Link disabled startIcon={<svg />} />` — корневой элемент имеет класс `.disabled`, slot имеет `aria-hidden="true"` (smoke).

**Checkpoint**: иконки работают, цвет наследуется во всех состояниях, лишних DOM-узлов нет.

---

## Phase 7: User Story 5 — Storybook и страница документации (Priority: P3)

**Goal**: страница `Components → Link` в Storybook с матрицей вариантов и состояний и docs-страница, собранная по шаблону остальных компонентов проекта (Figma/GitHub кнопки сверху, короткое описание, разделы Подключение, Пропсы, Варианты, Состояния, Иконки). Разделов «Доступность» и «Адаптивность» — нет.

**Independent Test**: открыть `npm run storybook` → `Components → Link`. На странице есть ≥ 8 stories (Default, Secondary, Danger, InParagraph, InHeading, WithStartIcon, WithEndIcon, Disabled). Открыть Docs — есть кнопки Figma/GitHub, базовое описание (1–2 фразы), разделы Подключение/Пропсы/Варианты/Состояния/Иконки; разделов «Доступность» и «Адаптивность» нет.

### Implementation for User Story 5

- [X] T021 [P] [US5] Создать `src/ui/link/Link.stories.tsx` по образцу `Button.stories.tsx`:
  - `title: 'Components/Link'`.
  - Stories: `Default`, `Secondary`, `Danger`, `InParagraph` (внутри `<p>` с типовым текстом), `InHeading` (внутри `<h2>`), `WithStartIcon` (использовать существующий `Icon` проекта), `WithEndIcon`, `Disabled` (две демки: `<a disabled>` и `<button disabled>`), `AsButton` (без `href`).
  - Все примеры — на токенах, без hardcoded.
- [X] T022 [US5] Создать `src/ui/link/Link.docs.tsx` по проектному шаблону (`Button.stories.tsx` + `Checkbox.docs.tsx`):
  - Кнопки `Figma` и `GitHub` сверху (`figmaUrl` для Link можно временно указать домашнюю страницу Figma-файла; `githubUrl` — `https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/link`).
  - Базовое описание (1–2 фразы, только главная функция): «Текстовая ссылка как часть typography. Используется внутри абзацев, заголовков и любого набора текста: наследует шрифт и размер из контекста.»
  - Раздел `Подключение в проекте` с импортом `import { Link } from 'turbo-ui'` / `'turbo-ui/link'` + минимальный пример.
  - Раздел `Пропсы` через `CollapsiblePropsList`-таблицу (как в `Input.docs.tsx`) с пропами из `contracts/link.md`.
  - Раздел `Варианты` — `ExampleBlock` с тремя `Link` рядом (default/secondary/danger).
  - Раздел `Состояния` — `ExampleBlock` с примерами `Default`, `Disabled` (демка интерактивных состояний через ховер/фокус — статичные превью + аннотация).
  - Раздел `Иконки` — пример с `startIcon` и `endIcon`.
  - **НЕ** создавать разделов «Доступность» и «Адаптивность».
- [X] T023 [P] [US5] (опционально) Если в проекте используется отдельный CSS для Storybook docs-меню по типу `data-link-docs-menu` — добавить нужное правило в `.storybook/preview.js`. Если общий CSS для docs уже работает (см. остальные компоненты) — пропустить задачу.

**Checkpoint**: Storybook содержит страницу `Components → Link` в правильном месте навигации (между `IconButton` и `Input`); stories и docs рендерятся.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: финальные правки, не относящиеся к конкретной user-стори.

- [X] T024 [P] В `CHANGELOG.md` добавить запись в раздел `Added` ближайшего pre-release: «`Link` — typography component: inline ссылка/inline-действие с тремя цветовыми вариантами (`default`/`secondary`/`danger`), состояниями `hover`/`active`/`focus-visible`/`disabled`, опциональными `startIcon`/`endIcon`. Корневой тег — `<a>` при наличии `href`, `<button type="button">` без него. Автоматический `rel="noopener noreferrer"` при `target="_blank"`. Только токены проекта и шрифт ONY One.»
- [X] T025 [P] Запустить `npm run typecheck && npm test && npm run build:lib` — все три зелёные; в `dist/` появились `ui/link.js`, `ui/link.d.ts`, `ui/link/Link.js`, `ui/link/Link.d.ts`.
- [X] T026 [P] Запустить Storybook (`npm run storybook`) и пройти сценарии из `specs/012-link-typography/quickstart.md`: внутри абзаца, внутри заголовка, навигация на внешний адрес, inline-действие без `href`, три варианта, иконки, `disabled`, `ref`. Убедиться, что все примеры рендерятся как описано.
- [X] T027 [P] В `src/ui/link/Link.tsx` финальный аудит на hardcoded значения: `grep -E '#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|font-family:\s*[^v]|font-size:\s*[0-9]'` по `Link.tsx` и `link.module.css` — должно вернуть пустой результат (значения `1em`/`0.1em`/`0.25em`/`2px` допустимы как CSS-механика, не как «дизайн-значения», см. research §E, §F, §H).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: без зависимостей; задачи T001..T005 параллельны.
- **Foundational (Phase 2)**: не требуется.
- **US1 (Phase 3)**: зависит от Setup (T001). MVP-выход.
- **US2 (Phase 4)**: зависит от US1 (правит тот же `Link.tsx`/`link.module.css`/`Link.test.tsx`).
- **US3 (Phase 5)**: зависит от US1 (классы вариантов используются в T007). Может выполняться параллельно с US2, если их правки в `Link.tsx` не конфликтуют по строкам — на практике проще выполнять последовательно.
- **US4 (Phase 6)**: зависит от US1 и US3 (требует `.disabled` и итоговые цвета `currentColor`).
- **US5 (Phase 7)**: зависит от US1..US4 (Stories и docs показывают всю функциональность). Может стартовать раньше, если делать «черновые» stories, но рекомендация — после US4.
- **Polish (Phase 8)**: после US5.

### User Story Dependencies

- **US1 (P1, MVP)**: после Setup.
- **US2 (P1)**: после US1.
- **US3 (P1)**: после US1.
- **US4 (P2)**: после US1+US3.
- **US5 (P3)**: после US4 (для полного показа всех функциональностей).

### Within Each User Story

- Реализация → тесты → сторис/docs (для US5 сторис/docs и есть реализация).
- Внутри `Link.tsx`/`link.module.css` правки последовательны (общий файл).

### Parallel Opportunities

- Все задачи Phase 1 (T001..T005) — параллельны.
- T008 (index.ts), T010 (тесты) в US1 — параллельны с реализацией T007 после её завершения (или одновременно, если две сессии).
- T013 (CSS-правила) в US2 — параллельно с T011 (TSX).
- T017 (тесты) в US3 — параллельно с T016 (TSX).
- T020 (тесты) в US4 — параллельно с T018/T019.
- T021/T022 в US5 — параллельны (разные файлы).
- T024..T027 в Polish — параллельны (разные файлы / только проверки).

---

## Parallel Example: Setup (Phase 1)

Все задачи Phase 1 можно запустить вместе — независимые файлы:

```text
T001  src/ui/link/index.ts (заглушка)
T002  package.json (exports.link)
T003  vite.config.lib.js (entry + dts include)
T004  scripts/copy-styles.cjs (shim-d.ts)
T005  .storybook/preview.js (storySort.order)
```

## Parallel Example: User Story 1

После завершения T006 + T007 можно запускать параллельно:

```text
T008  src/ui/link/index.ts (реэкспорт)
T010  src/ui/link/Link.test.tsx (MVP-тесты)
```

`T009` (`src/index.ts` реэкспорт) можно сделать параллельно с тестами, но не до T008 (импортирует из `./ui/link`).

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Выполнить Phase 1 (Setup): T001..T005.
2. Phase 2 пропустить (не требуется).
3. Выполнить Phase 3 (US1): T006..T010.
4. **STOP and VALIDATE**: проверить, что `<Link href="/x">…</Link>` рендерится как `<a>` с правильным `href` и наследует typography в `<p>` и `<h2>`. `npm test`, `npm run typecheck`, `npm run build:lib` зелёные.
5. Можно сделать pre-release/демо: MVP уже даёт ссылку-в-тексте.

### Incremental Delivery

1. Setup (Phase 1).
2. **US1 (MVP)**: базовый Link с `href` и variant=default → проверка/демо.
3. **US2**: добавить `<button>`-режим, `disabled`, авто `rel` → проверка/демо.
4. **US3**: остальные варианты и состояния → проверка/демо.
5. **US4**: иконки → проверка/демо.
6. **US5**: Storybook + docs → release.
7. **Polish**: CHANGELOG, финальная проверка сборки, прогон quickstart.

### Parallel Team Strategy

С учётом того, что почти все user-стори правят один файл (`Link.tsx`), эффективная параллельность ограничена. Возможные ветки:

- Developer A: T006..T010 (US1) → T011..T014 (US2).
- Developer B: T021 (Storybook stories) — параллельно с US2/US3, используя текущее состояние Link.
- Developer C: T024 (CHANGELOG), T027 (аудит hardcoded) — после US3.

---

## Notes

- `[P]` помечены задачи, которые работают над разными файлами или независимыми проверками.
- `[Story]` метка ставится для всех задач Phase 3..7; в Setup и Polish — без метки.
- Все user-стори валидируются независимо: после каждой можно тестировать через unit-тесты, и каждая даёт инкрементальную пользу.
- Никаких breaking changes у других компонентов — компонент изолирован.
- Все визуальные значения — только токены или CSS-keyword’ы; `grep` на hardcoded цвета/шрифты в финальной проверке (T027) должен возвращать пустой результат.
- Разделов «Доступность» и «Адаптивность» в spec/plan/contracts/docs не создавалось — по требованию пользователя.
