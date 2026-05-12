---
description: "Actionable, dependency-ordered task list for Toggle (switch) implementation"
---

# Tasks: Toggle (switch)

**Input**: Design documents from `/specs/013-toggle/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/toggle.md ✅, quickstart.md ✅

**Tests**: ENABLED — спецификация требует ≥ 8 unit-тестов (SC-006). Тесты пишутся внутри каждой US.

**Organization**: задачи сгруппированы по user stories (US1–US5) для независимой реализации и проверки.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно выполнять параллельно (разные файлы, нет блокирующих зависимостей)
- **[Story]**: к какой user story относится задача (US1–US5)
- Все пути — абсолютные от корня репозитория

## Path Conventions

- Корень: `/Users/aleksandrborodin/Yandex.Disk-john-postman.localized/Turbo/Turbo UI/`
- Компонент: `src/ui/toggle/`
- Конфигурация сборки/Storybook: корневые файлы (`package.json`, `vite.config.lib.js`, `scripts/copy-styles.cjs`, `.storybook/preview.js`, `src/index.ts`, `CHANGELOG.md`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: каркас каталога компонента + точки экспорта/сборки. Никакого визуала и логики на этом этапе — только пустые/каркасные файлы, чтобы остальные задачи могли стартовать параллельно.

- [X] T001 Создать каталог компонента и index-файл с пустым реэкспортом: `src/ui/toggle/index.ts` (пока экспортирует ничего — заполнится в T010).
- [X] T002 [P] Создать каркас компонента `src/ui/toggle/Toggle.tsx` (пустой `forwardRef` с типами `ToggleProps`/`ToggleSize` без логики; рендерит `<label>` с вложенным `<input type="checkbox" role="switch">`).
- [X] T003 [P] Создать каркас CSS Module `src/ui/toggle/toggle.module.css` (только базовые селекторы `.root`, `.native`, `.control`, `.track`, `.knob`, `.text` — без значений).
- [X] T004 [P] Добавить реэкспорт компонента в главный entry `src/index.ts` (`export { Toggle } from './ui/toggle'; export type { ToggleProps, ToggleSize } from './ui/toggle';`).
- [X] T005 [P] Добавить subpath-экспорт `./toggle` в `package.json` (в `exports`, рядом с `./link`, формат: `{ "types": "./dist/ui/toggle.d.ts", "import": "./dist/ui/toggle.js" }`).
- [X] T006 [P] Добавить entry `'ui/toggle': path.resolve(dirname, 'src/ui/toggle/index.ts')` в `vite.config.lib.js` (секция `build.lib.entry`) и include `'src/ui/toggle/**/*.ts'`, `'src/ui/toggle/**/*.tsx'` в `plugins.dts.include`.
- [X] T007 [P] Добавить генерацию shim-декларации `dist/ui/toggle.d.ts` в `scripts/copy-styles.cjs` (по образцу для `link`).
- [X] T008 [P] Добавить `'Toggle'` в `storySort.order` в `.storybook/preview.js` ровно между `'Link'` и `'Input'`.

**Checkpoint 1**: каркас на месте, проект собирается без ошибок (`npm run build:lib` не падает), Storybook видит пустой Toggle.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: общие части компонента, нужные всем US (типы, базовые CSS-токены типографики, базовая разметка корня). Должны быть готовы до старта US1.

**⚠️ CRITICAL**: ни одна US не может стартовать пока эта фаза не закрыта.

- [X] T009 [P] Объявить публичные типы `ToggleSize` и `ToggleProps` в `src/ui/toggle/Toggle.tsx` (по спецификации `contracts/toggle.md` — точная сигнатура с `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'>` и всеми пропами; экспортируются именованно).
- [X] T010 Заполнить `src/ui/toggle/index.ts` правильными реэкспортами (`export { Toggle } from './Toggle'; export type { ToggleProps, ToggleSize } from './Toggle';`).
- [X] T011 В `src/ui/toggle/toggle.module.css` реализовать базовую разметку корня (без состояний): `.root` — `inline-flex`, `align-items: center`, `vertical-align: middle`, `cursor: pointer`; `.native` — visually hidden `<input>` (по образцу `Checkbox.module.css`); `.control` — обёртка трека (relative); `.track` — позиционирование (relative); `.knob` — `position: absolute; top: 2px; left: 2px;`. Только разметка/позиционирование, без размеров и цветов.
- [X] T012 Реализовать JSX-каркас `Toggle.tsx`: `<label className={...}>{startText? <span class="text textStart">…} <span class="control"><input.../><span class="track"><span class="knob"/></span></span> {endText? <span class="text textEnd">…}</label>`. Поддержать `ref` через `forwardRef<HTMLInputElement>`. Пробросить `...rest` на `<input>`. Поддержать `className` на `<label>` через `clsx`. На этом этапе — никаких размеров, цветов, controlled/uncontrolled-логики.

**Checkpoint 2**: Toggle рендерится без ошибок типов, базовая DOM-структура корректна, ref указывает на input.

---

## Phase 3: User Story 1 — Базовое переключение вкл/выкл (Priority: P1) 🎯 MVP

**Goal**: компонент в размере `medium` поддерживает controlled и uncontrolled, кликом мышью и Space-ом меняет значение, визуально показывает off/on (knob слева ↔ справа, трек серый ↔ чёрный).

**Independent Test**: `<Toggle defaultChecked={false} onChange={fn} />` — клик вызывает `onChange(event)` с `event.target.checked === true`; повторный клик — с `false`. Контролируемая версия `<Toggle checked={value} onChange={setValue} />` отрисовывает значение из пропа. Space на сфокусированном переключателе вызывает `onChange`.

### Tests for User Story 1 ⚠️ (write FIRST, ensure they FAIL)

- [X] T013 [P] [US1] Создать `src/ui/toggle/Toggle.test.tsx`. Тест: «рендерит off по умолчанию» — `getByRole('switch')` найден, `.checked === false`.
- [X] T014 [P] [US1] Тест в том же файле: «рендерит on при `defaultChecked`» — `<Toggle defaultChecked />`, `.checked === true`.
- [X] T015 [P] [US1] Тест: «uncontrolled клик переключает значение» — `userEvent.click(input)`, `onChange` вызван, `.checked` инвертирован.
- [X] T016 [P] [US1] Тест: «controlled: клик вызывает onChange, но без потребительского setState DOM не меняется» — `<Toggle checked={false} onChange={spy} />`, после клика `spy` вызван, `.checked === false`.
- [X] T017 [P] [US1] Тест: «Space на сфокусированном переключателе вызывает onChange» — фокус через `.focus()`, `userEvent.keyboard(' ')`, `onChange` вызван.
- [X] T018 [P] [US1] Тест: «ref указывает на HTMLInputElement» — `ref.current.tagName === 'INPUT'`, `ref.current.type === 'checkbox'`.

### Implementation for User Story 1

- [X] T019 [US1] Реализовать controlled/uncontrolled state в `src/ui/toggle/Toggle.tsx`: `isControlled = checked !== undefined`, `useState(defaultChecked ?? false)` для uncontrolled, derived `currentChecked`. Прокинуть на `<input checked={...}>` или `<input defaultChecked={...}>`. Обработчик `handleChange` обновляет внутренний state (если uncontrolled) и вызывает внешний `onChange`.
- [X] T020 [US1] Добавить data-атрибут `data-checked=""` на корневой `<label>` когда `currentChecked === true` — для CSS-таргетинга (по образцу `Checkbox`).
- [X] T021 [US1] В `src/ui/toggle/toggle.module.css` реализовать фиксированный размер medium как дефолт (track 40×24, knob 20×20, padding 2) и цвета:
  - `.track` — `background-color: var(--content-tertiary); border-radius: 12px;`
  - `.root[data-checked] .track` — `background-color: var(--content-primary);`
  - `.knob` — `background-color: var(--surface-primary-main); border-radius: 50%;`
  - Размеры через локальные класс-селекторы `.sizeMedium .track`/`.knob` (готовим расширение для US2).
- [X] T022 [US1] В `toggle.module.css` реализовать движение knob: `.knob` — `transform: translateX(0); transition: transform 0.15s ease;`. `.root[data-checked] .knob` — `transform: translateX(16px);` (для medium: `track.W − knob.W − 2 × padding = 40 − 20 − 4 = 16`). `.track` — `transition: background-color 0.15s ease;`.
- [X] T023 [US1] В `toggle.module.css` реализовать `:focus-visible` ринг на трек: `.root:has(.native:focus-visible):not(.disabled) .track { outline: 2px solid var(--content-primary); outline-offset: 2px; }`. Дополнительно `.native:focus { outline: none; }` чтобы скрыть нативную обводку браузера на скрытом input.

**Checkpoint 3 (MVP)**: User Story 1 полностью функциональна. Все 6 тестов проходят. Toggle можно использовать в формах в размере `medium`.

---

## Phase 4: User Story 2 — Размер переключателя (Priority: P1)

**Goal**: пропом `size` управляются габариты трека/knob и типографика подписи (когда она есть).

**Independent Test**: рендер трёх Toggle с `size="small"`, `size="medium"`, `size="large"`. Габариты трека — 24×16 / 40×24 / 44×28 px (DOM-измерение через `getBoundingClientRect`). Если задана `startText` — типографика подписи соответствует размеру.

### Tests for User Story 2

- [X] T024 [P] [US2] Тест в `src/ui/toggle/Toggle.test.tsx`: «без пропа `size` применяется medium-класс» — корень имеет `className` с `sizeMedium`.
- [X] T025 [P] [US2] Тест: «`size="small"` применяет класс sizeSmall».
- [X] T026 [P] [US2] Тест: «`size="large"` применяет класс sizeLarge».

### Implementation for User Story 2

- [X] T027 [US2] В `src/ui/toggle/Toggle.tsx` маппинг `sizeClass: Record<ToggleSize, string>` (`small/medium/large` → `styles.sizeSmall/Medium/Large`) и применить через `clsx` к корневому `<label>`. Значение по умолчанию `size = 'medium'`.
- [X] T028 [US2] В `src/ui/toggle/toggle.module.css` реализовать класс `.sizeSmall`: track 24×16, knob 12×12, knob `translateX(8px)` в checked (`24 − 12 − 4 = 8`), gap `var(--spacing-8)` между текстом и треком, типографика подписи через `--typescale-lable-small-*`.
- [X] T029 [US2] В `src/ui/toggle/toggle.module.css` реализовать класс `.sizeLarge`: track 44×28, knob 24×24, knob `translateX(16px)` в checked (`44 − 24 − 4 = 16`), gap `var(--spacing-12)` между текстом и треком, типографика подписи через `--typescale-lable-large-*`.
- [X] T030 [US2] Уточнить класс `.sizeMedium`: типографика подписи через `--typescale-lable-medium-*`, gap `var(--spacing-8)`. (Базовые размеры medium уже заданы в T021/T022; здесь — финализируем под общую структуру.)
- [X] T031 [US2] Уточнить border-radius трека по размеру: small → 8px, medium → 12px, large → 14px (= height / 2). Реализовать через классы `.sizeSmall .track`, `.sizeMedium .track`, `.sizeLarge .track`.

**Checkpoint 4**: User Story 2 функциональна. Все три размера выглядят как в макете. Тесты US1 + US2 проходят.

---

## Phase 5: User Story 3 — Подпись слева или справа (Priority: P1)

**Goal**: пропы `startText` / `endText` рендерят подпись слева/справа от переключателя; клик по подписи переключает значение; типографика подписи следует пропу `size`.

**Independent Test**: `<Toggle startText="A" />` — текст рендерится слева. `<Toggle endText="B" />` — справа. Клик по `<span class="text">` срабатывает через нативную семантику `<label>` с вложенным input.

### Tests for User Story 3

- [X] T032 [P] [US3] Тест в `Toggle.test.tsx`: «`startText` рендерится слева от трека» — DOM-порядок: `<span class="text textStart">`, затем `<span class="control">`.
- [X] T033 [P] [US3] Тест: «`endText` рендерится справа от трека» — DOM-порядок: `<span class="control">`, затем `<span class="text textEnd">`.
- [X] T034 [P] [US3] Тест: «оба пропа подписи пусты → текстовые слоты не рендерятся».
- [X] T035 [P] [US3] Тест: «клик по `<span class="text">` переключает значение» — поиск `getByText('Some label')`, `userEvent.click`, `.checked` инвертирован.
- [X] T036 [P] [US3] Тест: «`startText` и `endText` заданы одновременно — оба рендерятся».

### Implementation for User Story 3

- [X] T037 [US3] В `src/ui/toggle/Toggle.tsx` реализовать условный рендер `{startText != null && startText !== '' && <span className={clsx(styles.text, styles.textStart)}>{startText}</span>}` перед `.control`, аналогично `{endText != null && endText !== '' && <span className={clsx(styles.text, styles.textEnd)}>{endText}</span>}` после.
- [X] T038 [US3] В `src/ui/toggle/toggle.module.css` стили `.text`: `color: var(--content-primary)`, `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`, `min-width: 0`. Типографика — наследуется через размерные классы (`.sizeSmall .text` / `.sizeMedium .text` / `.sizeLarge .text` — добавлено в T028/T029/T030).
- [X] T039 [US3] Реализовать gap между подписью и треком через `gap` на `.root` (`flex` контейнер): `.sizeSmall { gap: var(--spacing-8); }`, `.sizeMedium { gap: var(--spacing-8); }`, `.sizeLarge { gap: var(--spacing-12); }`. (Эти строки уже добавлены частично в T028/T029/T030 — здесь финализация.)

**Checkpoint 5**: User Story 3 функциональна. Все тесты US1+US2+US3 проходят.

---

## Phase 6: User Story 4 — Состояние disabled (Priority: P2)

**Goal**: проп `disabled` блокирует переключение, окрашивает трек/knob/подпись в `--content-disabled`, исключает из Tab.

**Independent Test**: `<Toggle disabled defaultChecked />` — клик и Space не вызывают `onChange`; визуально knob справа, цвета приглушены. `<Toggle disabled />` — то же, knob слева.

### Tests for User Story 4

- [X] T040 [P] [US4] Тест в `Toggle.test.tsx`: «`disabled` → нативный input имеет attr `disabled`».
- [X] T041 [P] [US4] Тест: «клик в `disabled` не вызывает `onChange`».
- [X] T042 [P] [US4] Тест: «Space на `disabled` не меняет значение».
- [X] T043 [P] [US4] Тест: «`disabled` → корневой `<label>` имеет класс `.disabled`».

### Implementation for User Story 4

- [X] T044 [US4] В `src/ui/toggle/Toggle.tsx` пробросить `disabled` на нативный `<input>` и добавить класс `.disabled` на корневой `<label>` через `clsx`. Хендлер `handleChange` дополнительно проверяет `if (disabled) return;` (защитный rail на случай программных событий).
- [X] T045 [US4] В `src/ui/toggle/toggle.module.css` стили `.disabled`:
  - `cursor: not-allowed;`
  - `.disabled .track { background-color: var(--content-disabled) !important; }` (перекрывает off- и on-цвет).
  - `.disabled .knob { background-color: var(--content-disabled); }`
  - `.disabled .text { color: var(--content-disabled); }`
  - `.disabled .native { cursor: not-allowed; }`
- [X] T046 [US4] Убедиться, что `.root:has(.native:focus-visible):not(.disabled) .track { outline: ... }` (селектор `:not(.disabled)` уже в T023) — в `disabled` фокус-ринг не появляется (нативно — `disabled` input не получает фокус по Tab).

**Checkpoint 6**: User Story 4 функциональна. Тесты US1–US4 проходят.

---

## Phase 7: User Story 5 — Storybook stories и страница документации (Priority: P3)

**Goal**: разработчик видит в Storybook `Components → Toggle` (между `Link` и `Input`) с ≥ 6 stories и Docs-страницей по проектному шаблону. Разделов «Доступность» / «Адаптивность» нет.

**Independent Test**: открыть Storybook → `Components → Toggle` — присутствует. Открыть Docs — есть кнопки Figma/GitHub, краткое описание, разделы Подключение / Пропсы / Размеры / Состояния / Подпись.

### Implementation for User Story 5

- [X] T047 [US5] Создать `src/ui/toggle/Toggle.stories.tsx` (по образцу `src/ui/link/Link.stories.tsx`):
  - Meta: `title: 'Components/Toggle'`, `component: Toggle`, `tags: ['autodocs']`, `parameters.docs.page = docsPageFromModule(() => import('./Toggle.docs'), 'ToggleDocsPage')`.
  - Stories через `render`: `Default` (off), `On` (defaultChecked), `Small`, `Medium`, `Large`, `WithStartText`, `WithEndText`, `BothStartAndEndText`, `Disabled`, `DisabledOn`.
- [X] T048 [US5] Создать `src/ui/toggle/Toggle.docs.tsx` (по шаблону `src/ui/link/Link.docs.tsx`, см. `.cursor/rules/component-docs-template.mdc`):
  - Заголовок `Toggle` + кнопки Figma (929:141) / GitHub.
  - Краткое описание (1–2 фразы): «Переключатель вкл/выкл. Часть форм; использует нативный input role="switch".»
  - Раздел «Подключение» — `import { Toggle } from 'turbo-ui/toggle';` через `ExampleBlock`.
  - Раздел «Пропсы» — `CollapsiblePropsList` с пропами из `contracts/toggle.md` (size, checked, defaultChecked, disabled, onChange, startText, endText, name, value, id, className, style, ref + native attrs note).
  - Раздел «Размеры» — три Toggle (`size="small|medium|large"`) с подписью `startText`. Формат `<code>small</code> — компактный, <code>medium</code> — базовый, <code>large</code> — крупный.`
  - Раздел «Состояния» — Off / On / Disabled off / Disabled on. Без hover (упомянуть, что hover отсутствует).
  - Раздел «Подпись» — варианты `startText`, `endText`, оба сразу, «голый».
  - Правое якорное меню `nav.toggle-docs-menu` со ссылками: Подключение / Пропсы / Размеры / Состояния / Подпись.
  - **БЕЗ** разделов «Доступность» и «Адаптивность».
- [X] T049 [US5] В `.storybook/preview.js` добавить `.toggle-docs-menu` в whitelist якорного меню (по образцу `.link-docs-menu`):
  - в media-query `@media (max-width: 1200px)` — `:not(.toggle-docs-menu)`,
  - в правиле `.button-docs-menu, .icon-button-docs-menu, … { display: block !important; }` — добавить `.toggle-docs-menu`,
  - в правиле типографики `.…-docs-menu a, .…-docs-menu li { font-family: …; }` — добавить `.toggle-docs-menu`, `.toggle-docs-menu a`, `.toggle-docs-menu li`.

**Checkpoint 7**: User Story 5 готова. Storybook показывает Toggle между Link и Input, все примеры рендерятся, Docs соответствует шаблону.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: финализация — CHANGELOG, сборка, аудит на hardcoded, контрольная проверка contract.

- [X] T050 [P] Запустить `npm run build:lib` и убедиться, что `dist/ui/toggle.js`, `dist/ui/toggle.d.ts`, `dist/ui/toggle/index.js`, `dist/ui/toggle/index.d.ts` сгенерированы. Проверить, что gzip-размер `dist/ui/toggle.js` ≤ 2 KB (SC-005).
- [X] T051 [P] Запустить `npm run test -- src/ui/toggle/Toggle.test.tsx` — все ≥ 8 тестов должны проходить (SC-006).
- [X] T052 [P] Запустить `npm run lint` — никаких новых нарушений в `src/ui/toggle/`.
- [X] T053 [P] Аудит на hardcoded в `src/ui/toggle/Toggle.tsx` и `src/ui/toggle/toggle.module.css`: `rg -n "#[0-9a-fA-F]{3,8}|rgba?\(|font-family:\s*['\"]" src/ui/toggle/` — должен вернуть только комментарии. Геометрия (`24px`, `40px`, `44px`, `2px`, `0.15s`) — допускается как CSS-механика по research §B/§E.
- [X] T054 Обновить `CHANGELOG.md`: в секции `Unreleased > Added` добавить запись «`Toggle` — переключатель вкл/выкл с тремя размерами (small/medium/large), опциональными подписями `startText`/`endText`, состоянием `disabled`. Без hover-стиля. Только токены проекта и шрифт ONY One.»
- [X] T055 [P] Открыть `specs/013-toggle/quickstart.md` и пройтись по 7 примерам — каждый рендерится в Storybook без ошибок и визуально совпадает с ожиданиями.
- [X] T056 Финальная сверка с `specs/013-toggle/contracts/toggle.md`:
  - все 13 пропов реализованы и типизированы,
  - все 4 состояния (Off/On/DisabledOff/DisabledOn) визуально корректны,
  - `import { Toggle } from 'turbo-ui'` и `import { Toggle } from 'turbo-ui/toggle'` оба работают и подтягивают типы.

**Checkpoint 8**: Toggle полностью завершён, готов к мерджу.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001 первой; T002–T008 параллельно после T001.
- **Foundational (Phase 2)**: T009 → T010 → T011/T012 (T011 и T012 — параллельно). Блокирует все US.
- **US1 (Phase 3)**: тесты T013–T018 пишутся первыми (параллельно), затем имплементация T019 → T020 → T021/T022/T023 (последние три по разным правилам CSS, можно параллельно, но в одном файле — лучше последовательно).
- **US2 (Phase 4)**: тесты T024–T026 параллельно, затем T027 → T028/T029/T030/T031 (все в `toggle.module.css` — последовательно).
- **US3 (Phase 5)**: тесты T032–T036 параллельно, затем T037 → T038 → T039.
- **US4 (Phase 6)**: тесты T040–T043 параллельно, затем T044 → T045 → T046.
- **US5 (Phase 7)**: T047 и T048 параллельно (разные файлы), затем T049 (`.storybook/preview.js`).
- **Polish (Phase 8)**: T050–T053 и T055 параллельно после всех US; T054, T056 — последовательно после T050.

### User Story Dependencies

- **US1 (P1, MVP)**: зависит только от Foundational. После завершения — MVP готов.
- **US2 (P1)**: расширяет US1 (добавляет `size`). Можно начинать параллельно после Foundational, но в одних и тех же файлах (`Toggle.tsx`, `toggle.module.css`) — рекомендуется последовательно.
- **US3 (P1)**: расширяет US1+US2 (добавляет подписи и связывает их с типографикой по размеру). Зависит от US2 для типографики (`--typescale-lable-*`).
- **US4 (P2)**: расширяет US1 (добавляет `disabled`). Независим от US2/US3 концептуально, но в одних и тех же файлах.
- **US5 (P3)**: документация. Зависит от US1–US4 (нужны все примеры).

### Within Each User Story

- Тесты пишутся ПЕРВЫМИ и должны падать до имплементации.
- В одном файле задачи выполняются последовательно (даже если помечены [P] — [P] относится только к независимым файлам).

---

## Parallel Execution Examples

### Phase 1 (Setup) — после T001

```bash
# В одном сообщении агента — параллельные правки независимых файлов:
T002: src/ui/toggle/Toggle.tsx (каркас)
T003: src/ui/toggle/toggle.module.css (каркас)
T004: src/index.ts (реэкспорт)
T005: package.json (exports)
T006: vite.config.lib.js (entry+dts)
T007: scripts/copy-styles.cjs (shim)
T008: .storybook/preview.js (storySort)
```

### Phase 3 (US1) — тесты параллельно

```bash
# Все 6 тестов добавляются в один Toggle.test.tsx, но описаны как независимые it(...) блоки:
T013–T018 — можно генерировать одним пакетом
```

### Phase 7 (US5) — два файла параллельно

```bash
T047: src/ui/toggle/Toggle.stories.tsx
T048: src/ui/toggle/Toggle.docs.tsx
# затем T049: .storybook/preview.js
```

---

## Implementation Strategy

### MVP-first (US1 only)

1. Завершить Phase 1 (Setup).
2. Завершить Phase 2 (Foundational).
3. Завершить Phase 3 (US1) — Toggle в `medium`, controlled+uncontrolled, Space, ref.
4. **STOP and VALIDATE**: запустить тесты US1, проверить пример в Storybook.
5. Достаточно для интеграции в существующие формы проекта в дефолтном размере.

### Incremental Delivery

1. Setup + Foundational → каркас.
2. US1 → MVP (Toggle medium).
3. US2 → размеры small/large.
4. US3 → подписи startText/endText.
5. US4 → disabled.
6. US5 → Storybook + Docs.
7. Polish → release-ready.

### Параллельная стратегия (если есть ресурс)

- Один поток — компонент (`Toggle.tsx` + `toggle.module.css`): US1 → US2 → US3 → US4.
- Второй поток — Storybook/Docs (`Toggle.stories.tsx` + `Toggle.docs.tsx`): можно стартовать после Checkpoint 3 (MVP) с заглушками, итеративно добавлять примеры по мере появления функциональности.

---

## Notes

- [P] = разные файлы, нет блокирующих зависимостей.
- [Story] метка — для трассировки задачи к user story.
- Каждая US должна быть независимо проверяема (тесты + примеры в Storybook).
- Все ≥ 8 тестов из SC-006 распределены по US1–US4 (T013–T018, T024–T026, T032–T036, T040–T043) — суммарно 18 тестов, что с запасом перекрывает требование.
- Размеры трека/knob (24/40/44, padding 2) и анимация (0.15s ease) — CSS-механика по research §B/§E, не нарушают принцип II конституции.
- Тень knob (drop-shadow) **не реализуется** на MVP — см. research §D.
- Hover-стили **отсутствуют** по FR-008.
- Разделы «Доступность» и «Адаптивность» в Docs **отсутствуют** по требованию пользователя.
