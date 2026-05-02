# Tasks: Radio

**Input**: Design documents from `specs/008-radio/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/radio.md`, `quickstart.md`

**Organization**: Задачи сгруппированы по user story из `specs/008-radio/spec.md` для независимой проверки.

**Компонент**: публичное имя **Radio**, entry **`turbo-ui/radio`**; макет Figma node `794:352`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно распараллелить (разные файлы, нет зависимости от незавершённой задачи)
- **[USn]**: user story (`specs/008-radio/spec.md`): **US1** — подключение и группа (P1), **US2** — визуал и токены (P1), **US3** — Storybook и сборка (P2)
- Пути от корня репозитория: `src/...`, `specs/008-radio/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Зафиксировать контекст фичи перед кодом

- [x] T001 Прочитать `specs/008-radio/plan.md`, `specs/008-radio/spec.md`, `specs/008-radio/contracts/radio.md` и убедиться, что рабочая ветка репозитория — `008-radio`

**Checkpoint**: Понятны границы MVP (три размера, выбран/не выбран, без `RadioGroup`; группа через `name` + controlled state) и контракт API

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Токены и генерация темы — обязательны до любой user story с UI

- [x] T002 Добавить секцию `radio` в `src/tokens/tokens.json`: объекты `sizes.large`, `sizes.medium`, `sizes.small` (диаметр индикатора, зазор до подписи и прочие поля по `specs/008-radio/research.md` и макету Figma 794:352); на уровне `radio` — `transition` и при необходимости общие поля (например толщины обводок), без дублирования семантических цветов вне существующих токенов темы
- [x] T003 Расширить `scripts/gen-theme-css.cjs` генерацией CSS-переменных `--radio-*` по образцу блока `checkbox` (обход `data.radio.sizes` и полей секции)
- [x] T004 Выполнить `npm run gen:theme` в корне репозитория и проверить, что `src/styles/theme-vars.css` содержит новые переменные `--radio-`

**Checkpoint**: Тема содержит `--radio-*`; стили компонента не опираются на «сырые» числа вне токенов

---

## Phase 3: User Story 1 — Разработчик подключает Radio и получает выбор одного значения (Priority: P1)

**Goal**: Импорт из модуля, нативный `input[type=radio]`, controlled/uncontrolled, `name`/`value`/`checked`/`onChange`, `error` и `aria-invalid`, `disabled`, размер `size`, опциональные `label`/`children`, `forwardRef` на input; hover-логика не применяется при disabled (через `data-disabled` или эквивалент на корне для CSS).

**Independent Test**: Временный рендер или сторис (после Phase 5): несколько `Radio` с одним `name` и controlled `checked`; disabled не меняет выбор и не показывает hover-визуал; в DOM `aria-invalid` при `error`.

- [x] T005 [US1] Создать `src/ui/radio/Radio.tsx` и `src/ui/radio/index.ts`: тип `RadioProps` по `specs/008-radio/contracts/radio.md` (на базе `React.InputHTMLAttributes<HTMLInputElement>` с фиксированным `type="radio"`, плюс `size?: 'large' | 'medium' | 'small'`, `error?: boolean`, `label`/`children`, `demoFocusRing?`); разметка: нативный radio (visually hidden) + визуальная обёртка; `React.forwardRef<HTMLInputElement>` на input
- [x] T006 [US1] В `src/ui/radio/Radio.tsx`: выставить `aria-invalid` при `error`; пометить корень атрибутом/классом для селектора «без hover при disabled» (`data-disabled` или `:has(input:disabled)` по решению в CSS); объединение классов через `clsx` для `size`, `error`, `disabled`, выбранности

**Checkpoint**: Компонент импортируется из `src/ui/radio/index.ts`; логика и a11y-база готовы (визуал дорабатывается в US2)

---

## Phase 4: User Story 2 — Визуальное соответствие макету и конституции (Priority: P1)

**Goal**: Состояния default, hover (только если не disabled), focus, disabled, invalid и три размера; визуал выбран / не выбран только через `var(--radio-*)` и семантические переменные темы.

**Independent Test**: Сравнение со скриншотом Figma node `794:352` по матрице; grep по `src/ui/radio/` на недопустимые литералы цветов вне `var(` (кроме допустимых исключений проекта)

- [x] T007 [US2] Реализовать `src/ui/radio/radio.module.css`: размеры и отступы через `var(--radio-*)` и семантические `--border-*`, `--content-*`, `--surface-*`; hover только для интерактивного состояния (селектор согласован с `specs/008-radio/research.md`); `focus-visible`/`focus-within` для кольца фокуса; `disabled`; `error`; скрытие нативного input без потери фокуса/клика
- [x] T008 [US2] В `src/ui/radio/Radio.tsx` завершить визуальный слой: круг и внутренний индикатор выбранного состояния по макету; типографика подписи по размеру (`labelSmall` / `labelMedium` / `labelLarge` или токены, согласованные с `src/ui/checkbox/checkbox.module.css`)

**Checkpoint**: Статичные состояния визуально согласованы с макетом при подключённой теме

---

## Phase 5: User Story 3 — Документация в Storybook и сборка (Priority: P2)

**Goal**: Истории с матрицей размеров × состояний × выбран/не выбран; пример controlled-группы из трёх пунктов; страница Docs по шаблону Checkbox/TextArea; сборка `dist`; импорт `turbo-ui/radio`.

**Independent Test**: `npm run storybook` — раздел Components/Radio и Docs; `npm run build:lib` — артефакты для entry `radio`; типы из `package.json` exports.

- [x] T009 [P] [US3] Добавить `src/ui/radio/Radio.stories.tsx` по шаблону `src/ui/checkbox/Checkbox.stories.tsx` и `.cursor/rules/component-docs-template.mdc`: матрица large/medium/small; default / hover-демо / focus / disabled / error; выбран и не выбран; история **группы** с общим `name` и `useState`
- [x] T010 [P] [US3] Добавить `src/ui/radio/Radio.docs.tsx`: lazy-страница как у Checkbox (`ExampleBlock`, якорное меню, ссылки Figma на node 794:352); тексты коротко (размеры, группа, `error`, `disabled`, отсутствие hover у disabled)
- [x] T011 [US3] Добавить в `package.json` поле `exports` путь `"./radio"` (`types`, `import`) по аналогии с `"./checkbox"`
- [x] T012 [US3] Добавить в `vite.config.lib.js` entry `ui/radio` → `src/ui/radio/index.ts` и включить `src/ui/radio/**/*.ts` и `src/ui/radio/**/*.tsx` в `dts` plugin `include`
- [x] T013 [US3] Реэкспортировать `Radio` и публичные типы из `src/index.ts`
- [x] T014 [US3] Добавить в `scripts/copy-styles.cjs` генерацию шима `dist/ui/radio.d.ts` по образцу блока для `checkbox` / `textarea`
- [x] T015 [US3] Добавить в `.storybook/preview.js` селектор класса `.radio-docs-menu` к тем же правилам типографики Docs, что и `.checkbox-docs-menu` / `.textarea-docs-menu`

**Checkpoint**: Потребитель может импортировать `turbo-ui/radio`; Storybook показывает компонент и Docs

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Unit-тесты и зелёная сборка

- [x] T016 [P] Добавить `src/ui/radio/Radio.test.tsx` (Vitest + Testing Library): рендер; `disabled`; `aria-invalid` при `error`; checked/unchecked в controlled-режиме; по образцу `src/ui/checkbox/Checkbox.test.tsx`
- [x] T017 В корне репозитория выполнить `npm test`, `npm run typecheck`, `npm run build:lib`; устранить ошибки

**Checkpoint**: Тесты и сборка библиотеки проходят; типы доступны потребителю

---

## Dependencies & Execution Order

### Phase Dependencies

**Phase 1** → **Phase 2** → **Phase 3 (US1)** → **Phase 4 (US2)** → **Phase 5 (US3)** → **Phase 6**

- **US2** зависит от разметки и классов из **US1** (`Radio.tsx` с подключённым модулем)
- **US3** зависит от **US2** (стабильный визуал для сторис и скриншотов Docs)

### User Story Dependencies

| Story | Зависит от | Независимый инкремент |
|-------|------------|------------------------|
| US1 | Phase 2 | Логика и a11y без финальной отделки визуала |
| US2 | US1 | Визуал по токенам |
| US3 | US2 | Экспорт, Storybook, Docs |

### Parallel Opportunities

- После **T008**: **T009** [P] и **T010** [P] — параллельно (разные файлы), затем последовательно **T011** → **T012** → **T013** → **T014** → **T015**
- **T016** [P] можно начинать после **T006** для части кейсов; полный прогон и **T017** — после завершения **T016** и задач US3

### Parallel Example (после T008)

```text
# Одновременно: сторис и docs page
# Разработчик A: src/ui/radio/Radio.stories.tsx (T009)
# Разработчик B: src/ui/radio/Radio.docs.tsx (T010)
```

---

## Implementation Strategy

### MVP (минимум для первой приёмки)

1. Завершить **Phase 2** (токены + тема).
2. Завершить **US1** + **US2** (работающий визуально Radio в dev/Storybook без публикации entry).
3. Затем **US3** (экспорт + Docs) и **Phase 6** (тесты + CI).

### Итоговые метрики задач

| Метрика | Значение |
|---------|----------|
| Всего задач | 17 (T001–T017) |
| US1 | 2 (T005–T006) |
| US2 | 2 (T007–T008) |
| US3 | 7 (T009–T015) |
| Без story (Setup + Foundational + Polish) | 6 (T001–T004, T016–T017) |
| Параллельные [P] | T009, T010, T016 |

### Независимый тест по историям

- **US1**: рендер в изоляции + проверка DOM (`aria-invalid`, `disabled`, переключение `checked` в группе).
- **US2**: визуальная матрица в Storybook / сравнение с Figma 794:352.
- **US3**: наличие страницы Docs и успешный `build:lib` с entry `./radio`.
