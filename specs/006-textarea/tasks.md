# Tasks: TextArea

**Input**: Design documents from `specs/006-textarea/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/textarea.md, quickstart.md

**Organization**: Задачи сгруппированы по user story из `spec.md` для независимой проверки.

**Компонент**: публичное имя **TextArea**, entry **`turbo-ui/textarea`**; макет Figma node `726:146`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно распараллелить (разные файлы, нет зависимости от незавершённой задачи)
- **[USn]**: user story из `specs/006-textarea/spec.md` (US1 — подключение в продукте P1, US2 — визуал и токены P1, US3 — Storybook P2)
- В описании — абсолютные пути от корня репозитория или пути вида `src/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Зафиксировать контекст фичи и артефакты перед кодом

- [x] T001 Прочитать `specs/006-textarea/plan.md`, `specs/006-textarea/spec.md`, `specs/006-textarea/contracts/textarea.md` и убедиться, что ветка репозитория `006-textarea` соответствует спеке

**Checkpoint**: Понятны границы MVP (medium/small, без large) и контракт API

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Токены и генерация темы — обязательны до любой user story с UI

- [x] T002 Добавить секцию `textarea` в `src/tokens/tokens.json`: для `sizes.small` и `sizes.medium` поля `minHeight`, `paddingX`, `paddingY`, `fontSize`, `lineHeight`; на уровне `textarea` — `borderRadius`, `transition` (значения по `specs/006-textarea/research.md` и макету 64px/100px высоты)
- [x] T003 Расширить `scripts/gen-theme-css.cjs` генерацией CSS-переменных `--textarea-*` по образцу блока `input` (обход `data.textarea.sizes` и общих полей)
- [x] T004 Выполнить `npm run gen:theme` в корне репозитория и проверить, что `src/styles/theme-vars.css` содержит новые переменные `--textarea-`

**Checkpoint**: Тема содержит `--textarea-*`; пользовательские стили компонента не опираются на «сырые» числа вне токенов

---

## Phase 3: User Story 1 — Разработчик подключает TextArea в продукте (Priority: P1) — логика и a11y

**Goal**: Импорт компонента, многострочный ввод, `error` / `errorText`, `helperText`, `disabled`, связь ошибки с полем для ассистивных технологий.

**Independent Test**: Временный рендер или Storybook (после появления сторис): placeholder, ввод нескольких строк, `error` + `errorText`, `disabled`; в DOM — `aria-invalid`, `aria-describedby` на блок ошибки/helper.

- [x] T005 [US1] Создать `src/ui/textarea/TextArea.tsx` и `src/ui/textarea/index.ts`: тип `TextAreaProps` (на базе `React.TextareaHTMLAttributes<HTMLTextAreaElement>` с исключением коллизий, плюс `size?: 'small' | 'medium'`, `error?`, `errorText?`, `helperText?`), `React.forwardRef<HTMLTextAreaElement>`; разметка обёртки поля + слот под полем для helper/error по логике `src/ui/input-field/InputField.tsx` (приоритет `errorText` над `helperText`, зарезервированная высота слота)
- [x] T006 [US1] В `src/ui/textarea/TextArea.tsx` задать стабильные `id` через `React.useId()`, связать `textarea` с `aria-describedby` для helper или error, выставить `aria-invalid` при ошибке, для текста ошибки использовать `role="alert"` согласованно с `src/ui/input-field/InputField.tsx`

**Checkpoint**: Компонент можно импортировать из `src/ui/textarea/index.ts` и получить корректную семантику формы (визуал дорабатывается в US2)

---

## Phase 4: User Story 2 — Визуальное соответствие макету и конституции (Priority: P1)

**Goal**: Состояния default, hover, focus, filled, disabled, invalid и размеры small/medium через токены; индикатор resize; без hardcoded hex вне темы.

**Independent Test**: Сравнение визуала со скриншотом Figma node `726:146` по сетке; grep по `src/ui/textarea/` на недопустимые литералы цветов вне `var(` (кроме допустимых исключений проекта)

- [x] T007 [US2] Реализовать `src/ui/textarea/textarea.module.css`: обёртка поля с `focus-within`, `:hover` (не disabled), модификаторы ошибки и disabled; типографика и цвета placeholder/значения через `var(--content-*)`; границы и фон через семантические переменные темы и `--textarea-*`
- [x] T008 [US2] Задать политику `resize` и оформление индикатора угла в `src/ui/textarea/textarea.module.css` по `specs/006-textarea/research.md` (без копирования hex из экспорта Figma MCP)
- [x] T009 [US2] Синхронизировать высоту слота helper/error в `src/ui/textarea/textarea.module.css` с подходом `src/ui/input-field/input-field.module.css`, чтобы отсутствие текста не меняло вертикальный ритм формы

**Checkpoint**: Визуальные состояния воспроизводят макет при использовании сгенерированной темы

---

## Phase 5: User Story 3 — Документация в Storybook и сборка (Priority: P2)

**Goal**: История с матрицей размеров × состояний; сборка `dist`; импорт `import { TextArea } from 'turbo-ui/textarea'`.

**Independent Test**: `npm run storybook` — страница TextArea; `npm run build:lib` — артефакты для `textarea`; типы доступны из `package.json` exports.

- [x] T010 [P] [US3] Добавить `src/ui/textarea/TextArea.stories.tsx` по шаблону документации существующих компонентов (см. `.cursor/rules/component-docs-template.mdc` и `src/ui/input/Input.stories.tsx`): матрица small/medium, состояния, примеры из `specs/006-textarea/quickstart.md`
- [x] T011 [US3] Добавить в `package.json` поле `exports` путь `"./textarea"` (types, import, default) по аналогии с `"./input"`
- [x] T012 [US3] Добавить в `vite.config.lib.js` entry `ui/textarea` → `src/ui/textarea/index.ts` и включить `src/ui/textarea/**/*.ts` и `src/ui/textarea/**/*.tsx` в `dts` plugin `include`
- [x] T013 [US3] Реэкспортировать `TextArea` и публичные типы из `src/index.ts`
- [x] T014 [US3] Добавить в `scripts/copy-styles.cjs` генерацию шима `dist/ui/textarea.d.ts` по образцу блоков для `input` / `input-field` (реэкспорт из `./textarea/index`)

**Checkpoint**: Потребитель может установить пакет и импортировать `turbo-ui/textarea`; Storybook демонстрирует компонент

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Тесты, перекрёстные ссылки документации, проверка CI

- [x] T015 [P] Добавить `src/ui/textarea/TextArea.test.tsx` (Vitest + Testing Library): кейсы для `aria-invalid`, `aria-describedby` при `errorText`, `disabled`, по образцу `src/ui/input/Input.test.tsx`
- [x] T016 [P] В `specs/003-input/contracts/input.md` добавить краткую отсылку к многострочному вводу: `specs/006-textarea/contracts/textarea.md` и импорт `turbo-ui/textarea`
- [x] T017 В корне репозитория выполнить `npm test && npm run lint` и `npm run build:lib`; устранить ошибки

**Checkpoint**: Линтер, тесты и сборка библиотеки зелёные

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** → **Phase 2** → **Phase 3–5** (US1 → US2 → US3 в порядке приоритета спеки) → **Phase 6**
- **US2** зависит от наличия разметки и классов из **US1** (`TextArea.tsx` + модуль CSS с классами, подключёнными в TSX)
- **US3** зависит от завершения **US2** (стабильный визуал для сторис)

### User Story Dependencies

| Story | Зависит от | Независимый инкремент |
|-------|------------|------------------------|
| US1 | Phase 2 | Логика и a11y без финальной полировки визуала |
| US2 | US1 | Визуал по токенам |
| US3 | US2 | Экспорт и Storybook |

### Parallel Opportunities

- После **T009**: **T010** [P] (сторис) и подготовка **T011–T014** последовательно по зависимости от `package.json` / vite
- **T015** [P] и **T016** [P] в Phase 6 — параллельно, если разные авторы
- **T010** [P] можно начинать сразу после **T009**, параллельно с ранним прогоном **T017** нельзя до завершения экспорта

### Parallel Example: Phase 6

```bash
# Одновременно: тесты и правка контракта input
Task T015: src/ui/textarea/TextArea.test.tsx
Task T016: specs/003-input/contracts/input.md
```

---

## Implementation Strategy

### MVP (минимум ценности)

1. Phase 1–2 (T001–T004): токены и тема  
2. Phase 3–4 (T005–T009): рабочий и визуально верный TextArea  
3. Остановка и ручная проверка сценариев US1–US2  

### Полная поставка

4. Phase 5 (T010–T014): Storybook и публичный entry  
5. Phase 6 (T015–T017): тесты, документация, CI  

### Метрики

| Метрика | Значение |
|---------|----------|
| Всего задач | **17** (T001–T017) |
| Phase 1 (Setup) | 1 |
| Phase 2 (Foundational) | 3 |
| US1 | 2 |
| US2 | 3 |
| US3 | 5 |
| Polish | 3 |

---

## Notes

- Задачи **T005–T006** предполагают, что классы из `textarea.module.css` подключены в TSX; при необходимости минимальный набор классов добавляется в **T007** сразу после **T006** без отдельной задачи — исполнитель может выполнить T007 сразу после T006 в одной сессии.
- Тесты (**T015**) не помечены как обязательные до реализации — они в Polish; при TDD перенести написание тестов раньше по согласованию с командой.
