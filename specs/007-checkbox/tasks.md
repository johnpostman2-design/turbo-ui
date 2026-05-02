# Tasks: Checkbox

**Input**: Design documents from `specs/007-checkbox/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/checkbox.md`, `quickstart.md`

**Organization**: Задачи сгруппированы по user story из `specs/007-checkbox/spec.md` для независимой проверки.

**Компонент**: публичное имя **Checkbox**, entry **`turbo-ui/checkbox`**; макет Figma node `761:112`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно распараллелить (разные файлы, нет зависимости от незавершённой задачи)
- **[USn]**: user story (`specs/007-checkbox/spec.md`): **US1** — подключение в продукте (P1), **US2** — визуал и токены (P1), **US3** — Storybook (P2)
- Пути от корня репозитория: `src/...`, `specs/007-checkbox/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Зафиксировать контекст фичи перед кодом

- [x] T001 Прочитать `specs/007-checkbox/plan.md`, `specs/007-checkbox/spec.md`, `specs/007-checkbox/contracts/checkbox.md` и убедиться, что рабочая ветка репозитория — `007-checkbox`

**Checkpoint**: Понятны границы MVP (три размера, три значения визуала, без отдельного CheckboxField) и контракт API

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Токены и генерация темы — обязательны до любой user story с UI

- [x] T002 Добавить секцию `checkbox` в `src/tokens/tokens.json`: объекты `sizes.large`, `sizes.medium`, `sizes.small` (минимум размер бокса и параметры, согласованные с `specs/007-checkbox/research.md` и макетом Figma 761:112); на уровне `checkbox` — `transition` и при необходимости общий `borderRadius`
- [x] T003 Расширить `scripts/gen-theme-css.cjs` генерацией CSS-переменных `--checkbox-*` по образцу блока `textarea` (обход `data.checkbox.sizes` и полей секции)
- [x] T004 Выполнить `npm run gen:theme` в корне репозитория и проверить, что `src/styles/theme-vars.css` содержит новые переменные `--checkbox-`

**Checkpoint**: Тема содержит `--checkbox-*`; стили компонента не опираются на «сырые» числа вне токенов

---

## Phase 3: User Story 1 — Разработчик подключает Checkbox в продукте (Priority: P1)

**Goal**: Импорт из модуля, нативный `input[type=checkbox]`, controlled/uncontrolled, `indeterminate` через DOM, `error` и `aria-invalid`, `disabled`, размер `size`, `forwardRef` на input.

**Independent Test**: Временный рендер или сторис (после Phase 5): три размера; переключение checked/unchecked; `indeterminate`; disabled не меняет значение; в DOM `aria-invalid` при ошибке.

- [x] T005 [US1] Создать `src/ui/checkbox/Checkbox.tsx` и `src/ui/checkbox/index.ts`: тип `CheckboxProps` по `specs/007-checkbox/contracts/checkbox.md` (на базе `React.InputHTMLAttributes<HTMLInputElement>` с фиксированным `type`, плюс `size?: 'large' | 'medium' | 'small'`, `error?: boolean`, `indeterminate?: boolean`); разметка: нативный checkbox (visually hidden) + визуальная обёртка для клика; `React.forwardRef<HTMLInputElement>` на input
- [x] T006 [US1] В `src/ui/checkbox/Checkbox.tsx`: синхронизация пропа `indeterminate` с `inputRef.current.indeterminate` через `useLayoutEffect` или эквивалент; выставить `aria-invalid` при `error`; объединение классов через `clsx` для `size`, `error`, `disabled`, состояний значения

**Checkpoint**: Компонент импортируется из `src/ui/checkbox/index.ts`; логика и a11y-база готовы (визуал дорабатывается в US2)

---

## Phase 4: User Story 2 — Визуальное соответствие макету и конституции (Priority: P1)

**Goal**: Состояния default, hover, focus, disabled, invalid и три размера; визуал checked / unchecked / indeterminate только через токены и семантические переменные темы.

**Independent Test**: Сравнение со скриншотом Figma node `761:112` по матрице; grep по `src/ui/checkbox/` на недопустимые литералы цветов вне `var(` (кроме допустимых исключений проекта)

- [x] T007 [US2] Реализовать `src/ui/checkbox/checkbox.module.css`: размеры через `var(--checkbox-*)` и семантические `--border-*`, `--content-*`, `--surface-*`; модификаторы hover (не disabled), `focus-within`/`focus-visible` для кольца фокуса, `disabled`, `error`; скрытие нативного input без потери фокуса/клика
- [x] T008 [US2] В `src/ui/checkbox/Checkbox.tsx` завершить визуальный слой: отображение галочки и режима indeterminate (inline SVG с `currentColor` / токенами размера) по макету; убедиться, что три значения визуально различимы и не смешиваются

**Checkpoint**: Статичные состояния визуально согласованы с макетом при подключённой теме

---

## Phase 5: User Story 3 — Документация в Storybook и сборка (Priority: P2)

**Goal**: Истории с матрицей размеров × состояний × значений; страница Docs по шаблону TextArea/Button; сборка `dist`; импорт `turbo-ui/checkbox`.

**Independent Test**: `npm run storybook` — раздел Components/Checkbox и Docs; `npm run build:lib` — артефакты для entry `checkbox`; типы из `package.json` exports.

- [x] T009 [P] [US3] Добавить `src/ui/checkbox/Checkbox.stories.tsx` по шаблону `src/ui/textarea/TextArea.stories.tsx` и `.cursor/rules/component-docs-template.mdc`: матрица large/medium/small, default/checked/indeterminate, disabled, error; `args` для интерактива
- [x] T010 [P] [US3] Добавить `src/ui/checkbox/Checkbox.docs.tsx`: lazy-страница как у TextArea (`ExampleBlock`, якорное меню, ссылки Figma/GitHub на node 761:112); тексты коротко, по делу (размеры, состояния, indeterminate, error)
- [x] T011 [US3] Добавить в `package.json` поле `exports` путь `"./checkbox"` (types, import) по аналогии с `"./textarea"`
- [x] T012 [US3] Добавить в `vite.config.lib.js` entry `ui/checkbox` → `src/ui/checkbox/index.ts` и включить `src/ui/checkbox/**/*.ts` и `src/ui/checkbox/**/*.tsx` в `dts` plugin `include`
- [x] T013 [US3] Реэкспортировать `Checkbox` и публичные типы из `src/index.ts`
- [x] T014 [US3] Добавить в `scripts/copy-styles.cjs` генерацию шима `dist/ui/checkbox.d.ts` по образцу блока для `textarea` / `input`
- [x] T015 [US3] Добавить в `.storybook/preview.js` селектор класса `.checkbox-docs-menu` к тем же правилам типографики Docs, что и `.textarea-docs-menu` / `.button-docs-menu`

**Checkpoint**: Потребитель может импортировать `turbo-ui/checkbox`; Storybook показывает компонент и Docs

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Unit-тесты и зелёная сборка

- [x] T016 [P] Добавить `src/ui/checkbox/Checkbox.test.tsx` (Vitest + Testing Library): рендер; `disabled`; `aria-invalid` при `error`; после рендера с `indeterminate` — свойство `indeterminate` у DOM input; по образцу `src/ui/input/Input.test.tsx`
- [x] T017 В корне репозитория выполнить `npm test`, `npm run typecheck`, `npm run build:lib`; устранить ошибки

**Checkpoint**: Тесты и сборка библиотеки проходят; типы доступны потребителю

---

## Dependencies & Execution Order

### Phase Dependencies

**Phase 1** → **Phase 2** → **Phase 3 (US1)** → **Phase 4 (US2)** → **Phase 5 (US3)** → **Phase 6**

- **US2** зависит от разметки и классов из **US1** (`Checkbox.tsx` с подключённым модулем)
- **US3** зависит от **US2** (стабильный визуал для сторис и скриншотов Docs)

### User Story Dependencies

| Story | Зависит от | Независимый инкремент |
|-------|------------|------------------------|
| US1 | Phase 2 | Логика и a11y без финальной отделки визуала |
| US2 | US1 | Визуал по токенам |
| US3 | US2 | Экспорт, Storybook, Docs |

### Parallel Opportunities

- После **T008**: **T009** [P] и **T010** [P] — параллельно (разные файлы), затем последовательно **T011** → **T012** → **T013** → **T014** → **T015**
- **T016** [P] можно начинать после **T006** для части кейсов, но полный прогон тестов логичен после **T008**; финальный **T017** — после **T016** и всех задач US3

### Parallel Example (после T008)

```text
# Одновременно: сторис и docs page
# Разработчик A: src/ui/checkbox/Checkbox.stories.tsx (T009)
# Разработчик B: src/ui/checkbox/Checkbox.docs.tsx (T010)
```

---

## Implementation Strategy

### MVP (минимум для первой приёмки)

1. Завершить **Phase 2** (токены + тема).
2. Завершить **US1** + **US2** (работающий визуально Checkbox в dev/Storybook без публикации entry).
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

- **US1**: рендер в изоляции + проверка DOM (`aria-invalid`, `indeterminate`, `disabled`).
- **US2**: визуальная матрица в Storybook / сравнение с Figma.
- **US3**: наличие страницы Docs и успешный `build:lib` с entry `./checkbox`.
