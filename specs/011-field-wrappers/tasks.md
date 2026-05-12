---
description: "Task list — SelectField, ComboBoxField, TextAreaField"
---

# Tasks: SelectField, ComboBoxField, TextAreaField

**Input**: Design documents from `/specs/011-field-wrappers/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/*.md`, `quickstart.md`

**Tests**: Включены. Спецификация (SC-005) явно требует unit-тесты по образцу `InputField.test.tsx` (≥ 8 тестов на каждый `*Field`).

**Organization**: задачи сгруппированы по user-стори (US1..US5) спецификации.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно выполнять параллельно (разные файлы, нет блокирующих зависимостей)
- **[Story]**: к какой user-стори относится задача (US1..US5). Для Setup/Foundational/Polish — метка не ставится.
- Файловые пути указаны полностью.

## Path Conventions

- Корень проекта: `src/`
- Новые каталоги: `src/ui/select-field/`, `src/ui/combobox-field/`, `src/ui/textarea-field/`
- Модификации базовых компонентов: `src/ui/select/Select.tsx`, `src/ui/textarea/`
- Сборка/экспорты: `package.json`, `vite.config.lib.js`, `scripts/copy-styles.cjs`, `src/index.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: подготовить новые публичные entry-подпути, каталоги и сборку.

- [X] T001 [P] Создать пустые каталоги-заглушки: `src/ui/select-field/`, `src/ui/combobox-field/`, `src/ui/textarea-field/` (на момент Setup внутри — только пустые `index.ts` с комментарием `// to be implemented`).
- [X] T002 [P] В `package.json` добавить три новых exports-подпути по образцу `./input-field`: `"./select-field": { "import": "./dist/select-field.js", "types": "./dist/select-field.d.ts" }`, аналогично для `./combobox-field` и `./textarea-field`. Не трогать существующие entry.
- [X] T003 [P] В `vite.config.lib.js` добавить в библиотечные `entry` три новых ключа: `'select-field': 'src/ui/select-field/index.ts'`, `'combobox-field': 'src/ui/combobox-field/index.ts'`, `'textarea-field': 'src/ui/textarea-field/index.ts'`; убедиться, что `dts`-плагин подхватывает их (включить пути в `include`, если используется явный allow-list).
- [X] T004 [P] В `scripts/copy-styles.cjs` (или эквивалентный шаг сборки) добавить генерацию shim-d.ts для трёх новых entry, если для существующих `select`/`combobox`/`textarea` это делается явно. Если генерация автоматическая — пропустить.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: расширение `Select` (аддитивно) и breaking-удаление helper из `TextArea`. Без этих изменений `*Field`-обёртки не смогут корректно работать.

**⚠️ CRITICAL**: ни одна задача из Phase 3+ не может начаться, пока не выполнен Phase 2.

### Аддитивное расширение `Select` (для SelectField)

- [X] T005 В `src/ui/select/Select.tsx` добавить аддитивный проп `triggerId?: string` в `SelectBaseProps`; если задан — поставить как атрибут `id` на `<button>`-триггер (внутри `getReferenceProps`/`<button id={triggerId}>`). Не менять поведение существующего корневого `id` пропа.
- [X] T006 [P] Обновить экспортируемые типы `SelectProps` (в `src/ui/select/index.ts` и `src/index.ts` ничего менять не нужно, тип уже реэкспортится через `SelectProps`).

### Breaking-удаление helper из `TextArea`

- [X] T007 В `src/ui/textarea/TextArea.tsx` удалить из `TextAreaProps` пропы `helperText?: string` и `errorText?: string`; удалить из реализации производные `helperId`, `errorId`, `hasErrorText`, `activeDescId` и склейку `ariaDescribedBy`; удалить блок `<div class="helperSlot">…</div>` и оставить только корень `<div class="root">` с `fieldWrap`. `aria-describedby` передаётся в `<textarea>` напрямую из пропа без модификации.
- [X] T008 [P] В `src/ui/textarea/textarea.module.css` удалить правила `.helperSlot`, `.helper`, `.helperError`, `.helperInvisible`, `.helperSlot > p { margin: 0 }` и зависимые override для `.rootDisabled .helper*`. Сохранить всё остальное (включая `.fieldWrap`, sizes, borderless и т. д.).
- [X] T009 [P] В `src/ui/textarea/TextArea.test.tsx` удалить тесты, проверяющие `helperText`, `errorText`, наличие невидимого helper-слота и связку `aria-describedby` с `helperId`/`errorId`. Сохранить smoke-тесты на `error`, `disabled`, `ref`, `leftIcon`/`endAdornment`, `borderless`, `size`.
- [X] T010 [P] В `src/ui/textarea/TextArea.stories.tsx` удалить stories `WithHelperText`, `WithErrorText` (и подобные), оставить stories: Default, Disabled, Error (визуал рамки), Sizes, BorderLess, LeftIcon, EndAdornment, Rows.
- [X] T011 [P] В `src/ui/textarea/TextArea.docs.tsx` удалить раздел документации о `helperText`/`errorText`; в introductory-параграфе явно указать, что для форм с label/helper используется `TextAreaField`.

**Checkpoint**: библиотека собирается, `npm test && npm run lint && npm run build:lib` зелёные. Базовые компоненты готовы для обёрток.

---

## Phase 3: User Story 1 — SelectField (Priority: P1) 🎯 MVP

**Goal**: публичный `SelectField`, оборачивающий `Select`, с пропами `label`/`helperText`/`errorText` — поведение и визуал helper/error 1:1 с `InputField`.

**Independent Test**: рендер `<SelectField label="..." options={...} helperText="..." />` и `<SelectField errorText="..." />` — клик по label фокусирует триггер, helper/error отображаются по правилам `InputField`, `aria-invalid` и `aria-describedby` корректны.

### Implementation for User Story 1

- [X] T012 [P] [US1] Создать CSS-модуль `src/ui/select-field/select-field.module.css` по образцу `src/ui/input-field/input-field.module.css`: классы `.root`, `.rootDisabled`, `.label`, `.inputWrap`, `.helperSlot`, `.helper`, `.helperError`, `.helperInvisible`. Только токены (`--typescale-lable-small-*`, `--typescale-caption-medium-*`, `--content-primary`, `--content-tertiary`, `--content-error`, `--content-disabled`, `--spacing-8`).
- [X] T013 [US1] Создать `src/ui/select-field/SelectField.tsx`. Интерфейс `SelectFieldProps extends SelectProps` + `label?: string`, `helperText?: string`, `errorText?: string`. Реализовать: производный `triggerId = id ?? "turbo-select-field-{useId.replace(':','')}"`; передать `triggerId` в `Select` (аддитивный проп из T005); подпись `<label htmlFor={triggerId}>`; helper-блок с фиксированной высотой и слиянием `aria-describedby` — точно по образцу `InputField`. `forwardRef<HTMLButtonElement>` на `<button>` `Select`.
- [X] T014 [P] [US1] Создать `src/ui/select-field/index.ts` — реэкспорт `SelectField`, `SelectFieldProps`.
- [X] T015 [US1] В `src/index.ts` добавить реэкспорт `SelectField` и типа `SelectFieldProps`.

### Tests for User Story 1

- [X] T016 [P] [US1] Создать `src/ui/select-field/SelectField.test.tsx` по образцу `InputField.test.tsx`. Минимум 8 тестов:
  1. `label` рендерится и `htmlFor` совпадает с id `<button>` триггера.
  2. Клик по label фокусирует `<button>`-триггер.
  3. `helperText` отображается; `aria-describedby` указывает на helper id.
  4. `errorText` отображается с `role="alert"`, приоритет над `helperText`; `aria-invalid="true"` на триггере.
  5. `disabled` подавляет `aria-invalid` и затемняет label/helper; триггер недоступен.
  6. Пользовательский `aria-describedby` объединяется с auto-id helper/error через пробел.
  7. `ref` указывает на `<button>`-триггер.
  8. Пробрасывание пропов `Select` (`options`/`value`/`onChange`/`size`/`disabled`) — smoke.

### Documentation/Stories for User Story 1

- [X] T017 [P] [US1] Создать `src/ui/select-field/SelectField.stories.tsx` по образцу `InputField.stories.tsx`. Stories: Default, WithLabel, WithHelperText, WithErrorText, Disabled, Sizes (small/medium/large), AriaDescribedBy. Все примеры — на токенах, без hardcoded.
- [X] T018 [P] [US1] Создать `src/ui/select-field/SelectField.docs.tsx` по проектному шаблону (`InputField.docs.tsx`): заглавие, описание, кнопка Figma (если есть нода), `ExampleBlock`-секции на каждый prop, якорное меню без левого бордера, сокращённый `setupCode` («вставил — работает»).

**Checkpoint**: SelectField готов; `npm test`, `npm run lint`, `npm run typecheck` зелёные; Storybook рендерит страницу.

---

## Phase 4: User Story 2 — ComboBoxField (Priority: P1)

**Goal**: публичный `ComboBoxField`, оборачивающий `ComboBox`, с пропами `label`/`helperText`/`errorText`. Все возможности `ComboBox` (`multiline`, `mask`, `clearable`, `highlightMatch`, `borderless`) сохраняются.

**Independent Test**: рендер `<ComboBoxField label="..." options={...} helperText="..." />`, `<ComboBoxField errorText="..." />`, `<ComboBoxField multiline />` — клик по label фокусирует input/textarea, helper/error по правилам `InputField`.

### Implementation for User Story 2

- [X] T019 [P] [US2] Создать CSS-модуль `src/ui/combobox-field/combobox-field.module.css` по образцу `select-field.module.css` (классы и токены идентичны; data-атрибут — `data-turbo-combobox-field-helper`).
- [X] T020 [US2] Создать `src/ui/combobox-field/ComboBoxField.tsx`. Интерфейс `ComboBoxFieldProps extends ComboBoxProps` + `label?: string`, `helperText?: string`, `errorText?: string`. Реализовать: производный `inputId = id ?? "turbo-combobox-field-{useId.replace(':','')}"`; передать `id={inputId}` в `ComboBox` (попадает на `<input>`/`<textarea>`); `<label htmlFor={inputId}>`; helper-блок с фиксированной высотой и слиянием `aria-describedby`. `forwardRef<HTMLInputElement | HTMLTextAreaElement>` на нативное поле.
- [X] T021 [P] [US2] Создать `src/ui/combobox-field/index.ts` — реэкспорт `ComboBoxField`, `ComboBoxFieldProps`.
- [X] T022 [US2] В `src/index.ts` добавить реэкспорт `ComboBoxField` и типа `ComboBoxFieldProps`.

### Tests for User Story 2

- [X] T023 [P] [US2] Создать `src/ui/combobox-field/ComboBoxField.test.tsx`. Минимум 8 тестов: связь label↔поле (htmlFor=id input), клик по label фокусирует поле, helper/error по приоритету, `aria-invalid`, disabled, склейка пользовательского `aria-describedby`, `ref` на `<input>`, `ref` на `<textarea>` при `multiline=true`, пробрасывание `mask`/`clearable`/`options` — smoke.

### Documentation/Stories for User Story 2

- [X] T024 [P] [US2] Создать `src/ui/combobox-field/ComboBoxField.stories.tsx`. Stories: Default, WithLabel, WithHelperText, WithErrorText, Disabled, Sizes, Multiline, Mask, Clearable, HighlightMatch.
- [X] T025 [P] [US2] Создать `src/ui/combobox-field/ComboBoxField.docs.tsx` по проектному шаблону (`ExampleBlock`-секции на каждый prop, без иконок у Figma/GitHub-кнопок, якорное меню без левого бордера, сокращённый `setupCode`).

**Checkpoint**: ComboBoxField готов; тесты и сборка зелёные.

---

## Phase 5: User Story 3 — TextAreaField (Priority: P1)

**Goal**: публичный `TextAreaField`, оборачивающий «голый» `TextArea`, с пропами `label`/`helperText`/`errorText`. Под полем строго один helper-блок.

**Independent Test**: рендер `<TextAreaField label="..." helperText="..." />`, `<TextAreaField errorText="..." rows={5} />`, `<TextAreaField maxLength={140} />` — связь label↔textarea, helper/error по правилам `InputField`, в DOM нет двух caption-слотов.

### Implementation for User Story 3

- [X] T026 [P] [US3] Создать CSS-модуль `src/ui/textarea-field/textarea-field.module.css` по образцу `select-field.module.css` (data-атрибут — `data-turbo-textarea-field-helper`).
- [X] T027 [US3] Создать `src/ui/textarea-field/TextAreaField.tsx`. Интерфейс `TextAreaFieldProps extends TextAreaProps` (после T007 `TextAreaProps` уже не содержит helper-пропы) + `label?: string`, `helperText?: string`, `errorText?: string`. Производный `inputId = id ?? "turbo-textarea-field-{useId.replace(':','')}"`; передать `id={inputId}` и `aria-describedby` в `TextArea`; `<label htmlFor={inputId}>`; helper-блок 1:1 с `InputField`. `forwardRef<HTMLTextAreaElement>`.
- [X] T028 [P] [US3] Создать `src/ui/textarea-field/index.ts` — реэкспорт `TextAreaField`, `TextAreaFieldProps`.
- [X] T029 [US3] В `src/index.ts` добавить реэкспорт `TextAreaField` и типа `TextAreaFieldProps`.

### Tests for User Story 3

- [X] T030 [P] [US3] Создать `src/ui/textarea-field/TextAreaField.test.tsx`. Минимум 8 тестов: label↔textarea (htmlFor=id), клик по label фокусирует textarea, helper/error и приоритет, `aria-invalid`, disabled, склейка `aria-describedby`, `ref` на `<textarea>`, **ровно один** helper-блок в DOM (querySelectorAll `[data-turbo-textarea-field-helper]` → 1; `[data-turbo-textarea-helper]` → 0), пробрасывание `rows`/`maxLength`/`size` — smoke.

### Documentation/Stories for User Story 3

- [X] T031 [P] [US3] Создать `src/ui/textarea-field/TextAreaField.stories.tsx`. Stories: Default, WithLabel, WithHelperText, WithErrorText, Disabled, Sizes, Rows, MaxLength, BorderLess, LeftIcon/EndAdornment.
- [X] T032 [P] [US3] Создать `src/ui/textarea-field/TextAreaField.docs.tsx` по проектному шаблону.

**Checkpoint**: TextAreaField готов; тесты и сборка зелёные.

---

## Phase 6: User Story 4 — Ref + атрибуты формы (Priority: P2)

**Goal**: подтвердить, что `ref` и нативные атрибуты формы (`name`, `form`, `required`, `onChange`) корректно работают на каждом `*Field`.

**Independent Test**: каждый `ref` указывает на нужный нативный элемент; `name`/`form`/`required` доходят до DOM.

- [X] T033 [P] [US4] Дополнить `src/ui/select-field/SelectField.test.tsx`: тест проброса `name` и `form` на `<button>`-триггер; тест что `onChange` `Select` срабатывает при программном выборе значения.
- [X] T034 [P] [US4] Дополнить `src/ui/combobox-field/ComboBoxField.test.tsx`: тест проброса `name`/`required` на `<input>` (одиночный режим) и `<textarea>` (`multiline`); тест что `onChange` вызывается при изменении значения и при выборе из списка.
- [X] T035 [P] [US4] Дополнить `src/ui/textarea-field/TextAreaField.test.tsx`: тест проброса `name`/`required`/`form` на `<textarea>`; тест `onChange` при изменении значения.

**Checkpoint**: интеграция с формами подтверждена тестами.

---

## Phase 7: User Story 5 — Storybook документация (Priority: P3)

**Goal**: страницы Storybook по каждому `*Field` отображаются и проходят smoke-проверку.

**Independent Test**: при запуске `npm run storybook` в разделе Components появляются три новые страницы; stories переключаются, docs-страница рендерится без ошибок.

- [X] T036 [US5] Зарегистрировать stories новых `*Field` в `.storybook/main.js`/`main.ts`, если требуется явный allow-list (если используется автопаттерн `**/*.stories.tsx` — проверить, что путь подхватывается).
- [X] T037 [P] [US5] В `.storybook/preview.js` (если требуется) добавить локальные CSS-классы для якорного меню каждого `*Field` (`.select-field-docs-menu`, `.combobox-field-docs-menu`, `.textarea-field-docs-menu`) по образцу остальных компонентов; убедиться, что типографика `ONY One` применяется в docs-страницах новых компонентов (правило для `.turbo-ui-scope` уже глобально, ничего сверху не нужно — проверить визуально).
- [X] T038 [US5] Открыть Storybook локально, пройти по трём новым страницам, убедиться: размеры/типографика label и helper совпадают с `InputField`, нет двойного helper-слота у `TextAreaField`, клик по label фокусирует контрол.

**Checkpoint**: все user-стори выполнены и независимо проверяемы.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T039 [P] Запустить `npm run typecheck` — нет регрессий типов.
- [X] T040 [P] Запустить `npm test` — все тесты (включая `TextArea.test.tsx`, `Select.test.tsx`, `ComboBox.test.tsx`, новые `*Field.test.tsx`) зелёные.
- [X] T041 [P] Запустить `npm run lint` — нет ошибок и предупреждений.
- [X] T042 Запустить `npm run build:lib` — собирается без ошибок; в `dist/` присутствуют три новых entry-файла (`select-field.js`, `combobox-field.js`, `textarea-field.js`) и `*.d.ts`.
- [X] T043 [P] `grep -R "helperText" src/ui/textarea/` и `grep -R "errorText" src/ui/textarea/` — оба пустые (Foundational T007–T011 выполнены полностью).
- [X] T044 [P] Пройти `specs/011-field-wrappers/quickstart.md` — все примеры компилируются и работают (вставить в Storybook-story под `__SCRATCH__` или sandbox для ручной проверки).
- [X] T045 Обновить CHANGELOG/release notes: секция `BREAKING CHANGES` — удалены `TextArea.helperText`/`errorText` и встроенный helper-слот; рекомендованная миграция — `TextAreaField`. Секция `FEATURES` — `SelectField`, `ComboBoxField`, `TextAreaField`; аддитивный `Select.triggerId`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup, T001–T004)**: можно стартовать сразу.
- **Phase 2 (Foundational, T005–T011)**: зависит от Setup; **БЛОКИРУЕТ** все user stories.
- **Phase 3 (US1, SelectField)**: depends on T005, T006, плюс CSS-модуль (T012) до `SelectField.tsx` (T013).
- **Phase 4 (US2, ComboBoxField)**: depends on T007–T011 (TextArea — потому что у ComboBox есть `<textarea>`-ветка multiline; формально ComboBox не использует TextArea, но изменения T005 не блокируют). Минимально — после Phase 2.
- **Phase 5 (US3, TextAreaField)**: **строго** после T007–T011 (TextAreaField оборачивает «голый» TextArea без helper).
- **Phase 6 (US4)**: depends on US1, US2, US3 (расширяет их тесты).
- **Phase 7 (US5)**: depends on US1, US2, US3 (docs/stories уже созданы в US1–US3; Phase 7 — финальная проверка).
- **Phase 8 (Polish)**: после всех user-стори.

### User Story Dependencies

- **US1 (SelectField, P1)**: после Phase 2.
- **US2 (ComboBoxField, P1)**: после Phase 2; не зависит от US1.
- **US3 (TextAreaField, P1)**: после Phase 2; не зависит от US1/US2.
- **US4 (Ref, P2)**: после US1/US2/US3 (дополняет их тесты).
- **US5 (Storybook, P3)**: после US1/US2/US3 (использует созданные stories/docs).

### Within Each User Story

- CSS-модуль (`*.module.css`) → компонент (`*.tsx`) → `index.ts`/реэкспорт → тесты → stories/docs.
- Тесты и stories могут идти параллельно после готовности компонента и `index.ts`.

### Parallel Opportunities

- T001–T004 — все [P], независимые файлы.
- T008–T011 — все [P], разные файлы (но после T007, который удаляет пропы и блок из `TextArea.tsx`).
- T005 [Select.tsx] и T007 [TextArea.tsx] — разные файлы, можно параллельно (но T007 — это breaking, требует синхронной правки T008–T011).
- В каждом из US1/US2/US3 задачи CSS + index.ts + тесты + stories + docs параллельны после компонента.
- Сами US1, US2, US3 могут идти параллельно (разные каталоги, разные файлы).

---

## Parallel Example: Foundational (Phase 2)

```bash
# Сначала T005 (Select.triggerId) и T007 (удаление helper из TextArea.tsx) — разные файлы:
Task: "T005 — добавить triggerId в src/ui/select/Select.tsx"
Task: "T007 — удалить helperText/errorText/helperSlot из src/ui/textarea/TextArea.tsx"

# После T007 — параллельно почистить связанные артефакты:
Task: "T008 — почистить src/ui/textarea/textarea.module.css"
Task: "T009 — обновить src/ui/textarea/TextArea.test.tsx"
Task: "T010 — обновить src/ui/textarea/TextArea.stories.tsx"
Task: "T011 — обновить src/ui/textarea/TextArea.docs.tsx"
```

## Parallel Example: User Story 1 (после Phase 2)

```bash
Task: "T012 — CSS-модуль src/ui/select-field/select-field.module.css"
# затем последовательно:
Task: "T013 — SelectField.tsx"
# далее параллельно:
Task: "T014 — src/ui/select-field/index.ts"
Task: "T016 — SelectField.test.tsx"
Task: "T017 — SelectField.stories.tsx"
Task: "T018 — SelectField.docs.tsx"
# в конце:
Task: "T015 — реэкспорт в src/index.ts"
```

---

## Implementation Strategy

### MVP First (SelectField only)

1. Phase 1 (Setup) + Phase 2 (Foundational) — обязательно.
2. Phase 3 (US1 — SelectField) — реализация и тесты.
3. **STOP & VALIDATE**: SelectField работает в Storybook и форме рядом с `InputField`; helper/error 1:1.
4. Можно демонстрировать MVP.

### Incremental Delivery

1. Setup + Foundational → база готова, TextArea «голый», `Select.triggerId` доступен.
2. US1 (SelectField) → проверка независимо → демо.
3. US2 (ComboBoxField) → проверка независимо → демо.
4. US3 (TextAreaField) → проверка независимо → демо.
5. US4 (Ref) и US5 (Storybook) — финальные штрихи.
6. Polish (Phase 8) — typecheck/test/lint/build, CHANGELOG.

### Parallel Team Strategy

После Phase 2:

- Developer A: SelectField (Phase 3 целиком).
- Developer B: ComboBoxField (Phase 4 целиком).
- Developer C: TextAreaField (Phase 5 целиком).

Затем кто-то один собирает US4/US5/Polish.

---

## Notes

- [P] = разные файлы, нет блокирующих зависимостей.
- Все `*Field` строят helper-блок одинаково — единый принцип (см. research §B). Это снижает API-поверхность и убирает «двойной helper».
- Удаление helper из `TextArea` — единственный breaking change; зафиксирован в Complexity Tracking и Constitution Check.
- Не использовать hardcoded значения: только токены и переменные темы; шрифт ONY One через `--family-brand`/`--typescale-*`.
- Коммитить после каждой задачи или логической группы (Phase).
- Каждый user-стори testable independently; check-points обозначены явно.
