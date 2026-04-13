# Tasks: InputField (label-out-primary)

**Input**: Design documents from `specs/004-input-label-out-primary/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/input-field.md, quickstart.md

**Organization**: Tasks grouped by user story for independent implementation and testing.

**Компонент**: публичное имя **InputField**, entry **`turbo-ui/input-field`**, визуальный вариант **label-out-primary** (Figma node `696:412`).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[USn]**: User story (US1 = подключение в проекте, US2 = визуал и токены, US3 = Storybook и сборка)
- В описании задачи — точные пути к файлам

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Токены и проверка примитива `Input` перед модулем `input-field`

- [x] T001 Проверить наличие секции `input` в `src/tokens/tokens.json` и переменной `--spacing-8` в `src/styles/theme-vars.css` для вертикальных отступов InputField
- [x] T002 [P] Просмотреть `src/ui/input/Input.tsx` и `src/ui/input/input.module.css` на предмет композиции внутри `InputField` и доработки состояний focus/filled

**Checkpoint**: Токены input и spacing доступны; понятна точка композиции с примитивом `Input`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Каркас модуля `input-field` без полной визуальной полировки — блокирует все user stories

- [x] T003 Создать каталог `src/ui/input-field/` и файлы-заготовки `InputField.tsx`, `input-field.module.css`, `index.ts` с типом `InputFieldProps` (extends `InputProps` из `src/ui/input` + `label?`, `helperText?`, `errorText?`) и `forwardRef` до нативного `input` через `Input`
- [x] T004 В `src/ui/input-field/input-field.module.css` задать корневую колонку (`flex-direction: column`), вертикальный отступ между блоками через `var(--spacing-8)`, базовые классы для label (typography label/small из токенов) и для строки helper/error (caption из токенов)

**Checkpoint**: Модуль собирается; можно наполнять логикой US1

---

## Phase 3: User Story 1 — Разработчик подключает InputField в проекте (P1) — MVP

**Goal**: Импорт `InputField` из `turbo-ui/input-field`, label/helper/error, controlled/uncontrolled, disabled, ошибка, связь label–поле и a11y.

**Independent Test**: Локально или в Storybook: рендер с `label`, `helperText`, с `errorText` и `error`, `disabled`; ввод в controlled/uncontrolled; клик по label фокусирует input; `aria-describedby` / `aria-invalid` присутствуют.

- [x] T005 [US1] Реализовать в `src/ui/input-field/InputField.tsx` разметку: опциональный `<label htmlFor={inputId}>`, `Input` с `id={inputId}`, блок под полем для helper или error с уникальными `id`; `inputId` через `React.useId()` если `id` не передан в пропах
- [x] T006 [US1] Реализовать в `src/ui/input-field/InputField.tsx` приоритет `errorText` над `helperText`, проброс `error` и `errorText` на поведение и `aria-invalid` согласованно с `src/ui/input/Input.tsx`
- [x] T007 [US1] Установить на `input` атрибут `aria-describedby` на id активной строки (ошибка или helper) при наличии текста
- [x] T008 [P] [US1] Зарезервировать под полем место под одну строку текста (helper/error) в `src/ui/input-field/input-field.module.css`, чтобы layout не прыгал при появлении текста (как в спеке 003-input)

**Checkpoint**: InputField функционально пригоден для форм и доступности

---

## Phase 4: User Story 2 — Визуальное соответствие макету и токенам (P1)

**Goal**: Состояния default, hover, focus, filled, filled-hover, disabled, invalid и размеры large/medium/small согласованы с Figma и токенами.

**Independent Test**: Сравнение Storybook (или статичных состояний) со скриншотом макета по сетке размеров и состояний; без hardcoded hex/spacing вне токенов.

- [x] T009 [US2] Добавить в `src/ui/input/input.module.css` стили `:focus-within` для `.fieldWrap` и визуал filled / filled-hover через селекторы с `input` (`:placeholder-shown` и т.д.) по [research.md](./research.md)
- [x] T010 [US2] Довести типографику и цвета label/helper/error в `src/ui/input-field/input-field.module.css` (disabled, error) только через `var(--*)` из темы
- [x] T011 [US2] Пройтись по чек-листу визуального соответствия Figma node `696:412` для всех размеров и состояний; при расхождениях править только токены или CSS Modules

**Checkpoint**: Визуал label-out-primary воспроизводим с макетом

---

## Phase 5: User Story 3 — Документация в Storybook и сборка (P2)

**Goal**: Storybook с матрицей примеров; сборка lib и типы; импорт `import { InputField } from 'turbo-ui/input-field'`.

**Independent Test**: `npm run storybook` — страница InputField; `npm run build:lib` — артефакты `dist` для `input-field`; типы доступны.

- [x] T012 [P] [US3] Добавить `src/ui/input-field/InputField.stories.tsx` по образцу `src/ui/button/` или `src/ui/input/Input.stories.tsx`: варианты с label, helper, error, иконками, размеры small/medium/large
- [x] T013 [US3] Добавить в `package.json` поле `exports` для `"./input-field"` (types, import, default) по аналогии с `"./input"`
- [x] T014 [US3] Добавить в `vite.config.lib.js` entry `ui/input-field` на `src/ui/input-field/index.ts` и пути в `dts.include` при наличии
- [x] T015 [US3] Реэкспортировать `InputField` и типы из `src/index.ts`
- [x] T016 [US3] При необходимости обновить `scripts/copy-styles.cjs` для генерации `dist/ui/input-field.d.ts` (по аналогии с `ui/input`)

**Checkpoint**: Документация и поставка пакета готовы

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Контракт, quickstart, финальная проверка

- [x] T017 [P] Привести `specs/004-input-label-out-primary/contracts/input-field.md` в соответствие с финальным кодом (`InputFieldProps`, экспорт)
- [x] T018 Проверить сценарии из `specs/004-input-label-out-primary/quickstart.md` в Storybook или тестовом рендере
- [x] T019 [P] Обновить `specs/003-input/contracts/input.md` краткой отсылкой на `InputField` для полей с внешним label (если уместно одной строкой), без дублирования полного API

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3 (US1)** → **Phase 4 (US2)** → **Phase 5 (US3)** → **Phase 6**
- US2 визуально зависит от рабочей разметки US1 (минимум T005–T007)
- US3 (Storybook) логично после того, как визуал US2 стабилен (можно начать черновик stories параллельно после T006)

### User Story Dependencies

- **US1**: после Phase 2; не зависит от US2/US3 для логики
- **US2**: лучше после базовой реализации US1 (T005–T008)
- **US3**: после US1; желательно после US2 для финальных скринов

### Parallel Opportunities

- T001 и T002 [P] — параллельно
- T008 [P] и доработки в `Input.tsx` (если разделить по файлам осторожно) — частично параллельно
- T012 [P] и обновление `package.json` можно планировать после готовности компонента
- T017, T019 [P] — параллельно в конце

---

## Parallel Example: User Story 1

```text
# После T006: параллельно не ломая общий input.module.css — один разработчик T008 (input-field.module.css), второй T009 начало (focus-within в input.module.css) после согласования классов
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 + Phase 2  
2. Phase 3 (T005–T008) — остановка и проверка импорта и форм  
3. Затем US2 и US3

### Suggested MVP Scope

- Задачи **T001–T008** дают рабочий **InputField** для продуктовой интеграции; без полной визуальной полировки Figma и без отдельного Storybook entry (временно можно показать через локальный импорт).

### Task counts

| Группа | Количество задач |
|--------|------------------|
| Phase 1 | 2 |
| Phase 2 | 2 |
| US1 (Phase 3) | 4 |
| US2 (Phase 4) | 3 |
| US3 (Phase 5) | 5 |
| Polish (Phase 6) | 3 |
| **Всего** | **19** |

---

## Notes

- Именование в коде: **InputField**, путь модуля **`input-field`**, импорт **`turbo-ui/input-field`**.
- Ветка фичи в git: `004-input-label-out-primary` (папка specs не переименовывалась).
