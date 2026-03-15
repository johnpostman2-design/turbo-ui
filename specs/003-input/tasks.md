# Tasks: Input

**Input**: Design documents from `specs/003-input/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/input.md

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[USn]**: User story (US1 = use Input in project, US2 = docs & build, US3 = a11y)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Tokens and structure required before component implementation

- [x] T001 Убедиться, что в репозитории есть specs/003-input/ (plan.md, spec.md, contracts/input.md, data-model.md, research.md)
- [x] T002 [P] Добавить секцию `input` в src/tokens/tokens.json с размерами small, medium, large (height, padding, fontSize по образцу button/iconButton или по макету)
- [x] T003 Запустить `npm run gen:theme` для генерации CSS-переменных input в src/styles/theme-vars.css

**Checkpoint**: Токены input доступны в теме

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Структура файлов компонента; без неё нельзя реализовывать US1

- [x] T004 Создать директорию src/ui/input/ и заготовку Input.tsx: типы InputProps (extends React.InputHTMLAttributes<HTMLInputElement>), forwardRef, пропсы label?, helperText?, errorText?, leftIcon?, endAdornment?, size?, disabled?, error?, type; проброс ...rest на нативный input

**Checkpoint**: Заготовка Input готова к реализации логики и стилей

---

## Phase 3: User Story 1 — Разработчик использует Input в проекте (P1) — MVP

**Goal**: Компонент Input можно импортировать из turbo-ui/input, рендерить с label, helper/error, leftIcon, endAdornment (IconButton); controlled/uncontrolled; layout не прыгает при появлении helper/error.

**Independent Test**: Импорт из turbo-ui/input (после Phase 4), рендер с label, с errorText, с endAdornment (IconButton); ввод в controlled и uncontrolled; проверка, что высота блока не меняется при показе/скрытии helper или error.

- [x] T005 [P] [US1] Реализовать стили в src/ui/input/input.module.css: размеры (small, medium, large) из токенов, состояния default/hover/focus/error/disabled через CSS-переменные, зарезервированная область под одну строку helper/error (min-height), левый слот и endAdornment (сетка/флекс)
- [x] T006 [US1] Реализовать в src/ui/input/Input.tsx: разметка (label + обёртка поля с leftIcon + input + endAdornment + блок helper/error), связь label с input через htmlFor и id (id из пропа или useId), aria-invalid при error или errorText, aria-describedby на id блока helper или error (приоритет error)
- [x] T007 [US1] Реализовать в src/ui/input/Input.tsx: controlled/uncontrolled (value + onChange vs defaultValue + internal state), disabled на input и передача disabled в endAdornment (React.cloneElement или контекст), endAdornment с tabIndex={-1} при рендере (чтобы Tab не переходил на IconButton)
- [x] T008 [P] [US1] Создать barrel-экспорт в src/ui/input/index.ts (Input, InputProps, при необходимости типы size)

**Checkpoint**: Input рендерится, все варианты (label, helper, error, leftIcon, endAdornment) и размеры работают; layout стабилен; a11y заложен в разметку

---

## Phase 4: User Story 2 — Документация и сборка как у Button (P1)

**Goal**: Контракт актуален, Storybook показывает все виды и размеры, сборка создаёт dist для input, импорт из turbo-ui/input работает.

**Independent Test**: Storybook — страница Input с примерами default, error, disabled, с leftIcon, с endAdornment, с обоими, с label, с helper text, размеры small/medium/large; `npm run build:lib` создаёт dist/ui/input.js и типы; в другом проекте `import { Input } from 'turbo-ui/input'` работает.

- [x] T009 [P] [US2] Обновить specs/003-input/contracts/input.md по итогам реализации: итоговые пропсы, CSS-переменные, a11y
- [x] T010 [P] [US2] Добавить Storybook-истории в src/ui/input/Input.stories.tsx по образцу Button/IconButton: варианты default, error, disabled, с leftIcon, с endAdornment, с leftIcon и endAdornment, с label, с helper text; размеры small, medium, large; пример подключения в проекте
- [x] T011 [US2] Добавить в package.json в exports поле "./input" с types и import на dist/ui/input.d.ts и dist/ui/input.js
- [x] T012 [US2] Добавить в vite.config.lib.js в lib.entry запись ui/input (path на src/ui/input/index.ts) и в dts.include пути src/ui/input/**
- [x] T013 [US2] Реэкспортировать Input и типы из src/index.ts
- [x] T014 [US2] В scripts/copy-styles.cjs добавить запись для dist/ui/input.d.ts (по аналогии с ui/icon-button): при наличии dist/ui/input/index.d.ts писать dist/ui/input.d.ts с реэкспортом Input и InputProps

**Checkpoint**: Документация и сборка готовы; потребитель может подключать turbo-ui/input

---

## Phase 5: User Story 3 — Доступность и семантика (P2)

**Goal**: Label фокусирует input; при error есть aria-invalid; hint/error в aria-describedby; Tab с input не переходит на IconButton внутри.

**Independent Test**: В браузере: клик по label фокусирует input; при error в разметке aria-invalid="true"; у input есть aria-describedby на блок с ошибкой/подсказкой; с фокуса на input по Tab фокус уходит на следующий элемент страницы, не на endAdornment.

- [x] T015 [US3] Проверить в src/ui/input/Input.tsx: label с htmlFor={inputId}, input с id={inputId}; при error или errorText — aria-invalid="true"; блок helper/error с id и input aria-describedby={id}; endAdornment при рендере с tabIndex={-1}
- [x] T016 [US3] Проверить в Storybook отображение Input с label, с error, с endAdornment и убедиться вручную: фокус по клику на label, наличие aria-invalid и aria-describedby, Tab не попадает на IconButton

**Checkpoint**: A11y соответствует спеце

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: Валидация quickstart и финальная согласованность

- [x] T017 Запустить сборку `npm run build:lib` и проверить наличие dist/ui/input.js, dist/ui/input.d.ts (или dist/ui/input/index.*)
- [x] T018 [P] Сверить примеры в specs/003-input/quickstart.md с реальным API Input и при необходимости обновить quickstart.md
- [x] T019 Проверить в Storybook отображение Input 1:1 с контрактом и макетом (при наличии Figma)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Без зависимостей — можно начинать сразу
- **Phase 2 (Foundational)**: Зависит от Phase 1 (токены нужны для стилей)
- **Phase 3 (US1)**: Зависит от Phase 2 — реализация компонента и стилей
- **Phase 4 (US2)**: Зависит от Phase 3 — Storybook и экспорт строятся на готовом Input
- **Phase 5 (US3)**: Зависит от Phase 3 (проверка/доработка a11y в том же Input.tsx); может выполняться параллельно с Phase 4
- **Phase 6 (Polish)**: Зависит от завершения Phase 4 и при необходимости Phase 5

### User Story Dependencies

- **US1 (P1)**: После Phase 2; независима от US2/US3
- **US2 (P1)**: После US1 (нужен готовый Input для Storybook и сборки)
- **US3 (P2)**: Реализация заложена в US1 (T006, T007); Phase 5 — верификация и при необходимости правки

### Parallel Opportunities

- T002 и T001 можно выполнять параллельно (разные файлы)
- T005 и T008 после T004 — параллельно (CSS и index.ts)
- T009 и T010 после Phase 3 — параллельно (контракт и stories)
- T011, T012, T013, T014 — последовательно или T011/T012 параллельно, затем T013/T014

---

## Implementation Strategy

### MVP First (User Story 1 + экспорт для проверки)

1. Phase 1: Setup (токены input)
2. Phase 2: Foundational (заготовка Input)
3. Phase 3: US1 (стили, разметка, controlled/uncontrolled, a11y в коде, barrel)
4. Временно: добавить entry ui/input и реэкспорт в index (минимально для проверки импорта)
5. **STOP and VALIDATE**: Рендер Input в Storybook вручную или через временную историю; проверить layout и Tab

### Full Delivery

1. Phase 1 → Phase 2 → Phase 3 → **Checkpoint US1**
2. Phase 4 (Storybook, exports, build, copy-styles) → **Checkpoint US2**
3. Phase 5 (a11y проверка) → **Checkpoint US3**
4. Phase 6 (build, quickstart, Figma) → готово

---

## Notes

- [P] — задача может выполняться параллельно с другими в той же фазе при отсутствии зависимостей
- Метка [USn] связывает задачу с user story для трассировки
- Каждая user story должна быть независимо тестируема по Independent Test из spec.md
- Пути к файлам указаны явно для однозначности при выполнении задач
