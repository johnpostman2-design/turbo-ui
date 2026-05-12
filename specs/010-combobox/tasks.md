# Tasks: ComboBox

**Input**: Design documents из `specs/010-combobox/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/combobox.md`, `quickstart.md`

**Organization**: Фазы по user story из `specs/010-combobox/spec.md`. **MVP (минимально ценный продукт)**: Phase 3–4 — **US1 + US2** (открыть полный список и выбрать + фильтрация и подсветка).

**Компонент**: **ComboBox**, entry `turbo-ui/combobox`. Переиспользование: `src/ui/input/Input.tsx`, `src/ui/textarea/TextArea.tsx`, `src/ui/listbox/Listbox.tsx`, позиционирование как у `src/ui/select/Select.tsx` / `src/ui/select/selectPlacement.ts`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно распараллелить (разные файлы, нет зависимости от незавершённой задачи)
- **[USn]**: номер истории как в **spec.md** (US1…US8)
- Пути от корня репозитория: `src/...`, `specs/010-combobox/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Зафиксировать контекст спеки и ветку перед кодом

- [x] T001 Прочитать `specs/010-combobox/plan.md`, `specs/010-combobox/spec.md`, `specs/010-combobox/contracts/combobox.md`, `specs/010-combobox/research.md`, `specs/010-combobox/data-model.md` и убедиться, что рабочая ветка — `010-combobox`

**Checkpoint**: Понятны MVP (US1+US2), границы scope, API из контракта и решения из `research.md` (маска без внешних зависимостей, пустой `options` → панель не открывается, очистка → переоткрытие полного списка).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Токены темы и переиспользование позиционирования Select — до любой user story в коде

**⚠️ CRITICAL**: User story в коде не начинать, пока не завершены T002–T004

- [x] T002 Добавить секцию **`combobox`** в `src/tokens/tokens.json` (borderless, подсветка `<mark>`, при необходимости размеры/отступы, не дублируя семантические цвета вне темы) по `specs/010-combobox/plan.md` и `specs/010-combobox/research.md` §15
- [x] T003 Расширить `scripts/gen-theme-css.cjs` генерацией **`--combobox-*`**, выполнить `npm run gen:theme` в корне репозитория и проверить, что `src/styles/theme-vars.css` содержит новые переменные
- [x] T004 Рефакторинг для переиспользования: вынести или расширить логику Floating UI / портала из `src/ui/select/Select.tsx` совместно с `src/ui/select/selectPlacement.ts` так, чтобы `src/ui/combobox/ComboBox.tsx` мог подключать позиционирование без копипасты (новый общий модуль допускается, например рядом с `selectPlacement.ts`, без нового публичного entry)

**Checkpoint**: Тема содержит переменные для combobox; есть ясный импортируемый способ позиционировать панель как Select

---

## Phase 3: User Story 1 — Открыть полный список и выбрать (Priority: P1) 🎯 MVP

**Goal**: Клик/фокус на поле до ввода открывает панель со всеми `options`; выбор подсказки подставляет значение в поле и закрывает панель; при пустом `options` панель не открывается (`specs/010-combobox/research.md` §2).

**Independent Test**: Storybook: непустой `options`, пустое значение → клик по полю → полный список; выбор пункта → значение в поле, панель закрыта, фокус в поле.

### Implementation for User Story 1

- [x] T005 [US1] Создать `src/ui/combobox/index.ts` и `src/ui/combobox/ComboBox.tsx`: типы `ComboBoxOption`, `ComboBoxProps` по `specs/010-combobox/contracts/combobox.md`; композиция поля через `src/ui/input/Input.tsx`, панели через `src/ui/listbox/Listbox.tsx` внутри `FloatingPortal`; для Listbox задать политику галочки справа согласованно со справочником (например `showSelectedCheck={false}`, если в ComboBox не требуется индикатор как у Select)
- [x] T006 [US1] В `src/ui/combobox/ComboBox.tsx`: controlled/uncontrolled `value` / `defaultValue` / `onChange`; открытие при фокусе/клике на поле при `options.length > 0` и не `disabled`; закрытие по Escape и pointer вне поля и панели; выбор опции вызывает `onChange` со строкой значения опции и `onSelect` при наличии
- [x] T007 [US1] В `src/ui/combobox/ComboBox.tsx`: роли и связи по APG combobox — `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, связь поля с `id` панели Listbox; базовая клавиатура (стрелки, Enter, Escape) и `aria-activedescendant` при поддержке в Listbox
- [x] T008 [P] [US1] Добавить `src/ui/combobox/combobox.module.css`: корень, модификаторы состояний поля только через `var(--combobox-*)` / `var(--input-*)` / тему; без hardcoded цветов и отступов
- [x] T009 [P] [US1] Добавить `src/ui/combobox/ComboBox.stories.tsx`: сценарии Default и Disabled (панель не открывается)

**Checkpoint**: US1 выполним и проверяем в Storybook без фильтрации и без расширенных пропов панели

---

## Phase 4: User Story 2 — Динамическая фильтрация при вводе (Priority: P1) 🎯 MVP

**Goal**: Ввод сужает список по `filterItem` (дефолт — подстрока в `label` без регистра); пустой результат без ошибок; опционально подсветка совпадений (`specs/010-combobox/spec.md` US2).

**Independent Test**: Набор символов в поле сокращает список; очистка запроса возвращает полный список; при `highlightMatch` видна подсветка в подписи опции.

### Implementation for User Story 2

- [x] T010 [US2] В `src/ui/combobox/ComboBox.tsx`: синхронизация текста поля с фильтром (query); проп `filterItem` с дефолтом из `specs/010-combobox/data-model.md`; передача в Listbox только отфильтрованных опций; проп `emptyState` для пустого результата фильтрации
- [x] T011 [US2] Добавить `src/ui/combobox/highlightMatch.tsx`: функция разбиения строки на сегменты и безопасная подсветка через `<mark className={...}>` из токенов; экспорт утилиты для `renderOption` в `ComboBoxRenderContext` по `specs/010-combobox/contracts/combobox.md`
- [x] T012 [US2] В `src/ui/combobox/ComboBox.tsx`: пропы `highlightMatch` и `renderOption`; если задан `renderOption`, автоматическая подсветка не применяется — передать в контекст `highlightMatch` из `highlightMatch.tsx`
- [x] T013 [P] [US2] Расширить `src/ui/combobox/ComboBox.stories.tsx`: WithFilter, WithHighlightMatch

**Checkpoint**: MVP (US1+US2) готов для демо и приёмки SC-6 по фильтрации

---

## Phase 5: User Story 3 — Свободный ввод вне справочника (Priority: P2)

**Goal**: Значение может не совпадать ни с одной опцией; Esc и клик вне сохраняют введённый текст; после выбора из списка дальнейшее редактирование снова фильтрует список.

**Independent Test**: Ввести строку, которой нет в `options`, закрыть панель — текст сохранён; после выбора опции изменить текст — фильтр применяется к новому запросу.

### Implementation for User Story 3

- [x] T014 [US3] В `src/ui/combobox/ComboBox.tsx`: гарантировать отсутствие принудительного «сброса» на ближайшую опцию при закрытии; согласовать подстановку значения при выборе опции с произвольным редактированием (без потери фокуса и без лишних `onChange`)

**Checkpoint**: Поведение отличается от Select — допускается произвольная строка в `value`

---

## Phase 6: User Story 4 — Конфигурация поля (Priority: P2)

**Goal**: `size` small/medium/large, ширина поля, `multiline`, `borderless`, `startIcon`, `textAlign` — через пропы и токены (`specs/010-combobox/spec.md` US4).

**Independent Test**: Матрица в Storybook: три размера, многострочный режим, borderless, иконка слева, выравнивание текста.

### Implementation for User Story 4

- [x] T015 [US4] Расширить `src/ui/textarea/TextArea.tsx` и `src/ui/textarea/textarea.module.css` аддитивно: `size` включает **`large`**, при необходимости слоты **`startIcon`** и **`endAdornment`** по образцу `src/ui/input/Input.tsx` (без breaking changes для существующих импортёров)
- [x] T016 [US4] В `src/ui/combobox/ComboBox.tsx`: ветвление `multiline` → `TextArea`, иначе `Input`; прокинуть `size`, `width`, `maxWidth`, `borderless`, `startIcon`, `textAlign`, `placeholder`, нативные атрибуты формы из контракта
- [x] T017 [US4] В `src/ui/combobox/combobox.module.css` и при необходимости в `src/tokens/tokens.json`: модификаторы `borderless` и `textAlign`; повторно выполнить генерацию темы после правок токенов
- [x] T018 [P] [US4] Расширить `src/ui/combobox/ComboBox.stories.tsx`: Sizes (рядом), Borderless, Multiline, TextAlign

**Checkpoint**: Поле визуально настраивается без локальных стилей снаружи компонента

---

## Phase 7: User Story 5 — Очистка значения (Priority: P2)

**Goal**: `clearable`, `clearIcon`, `onClear`; очистка вызывает `onChange('')`, фокус остаётся в поле; после очистки панель снова показывает полный список (`specs/010-combobox/research.md` §9).

**Independent Test**: Непустое значение → иконка очистки → пустое поле и полный список при открытии; при `disabled` иконки нет.

### Implementation for User Story 5

- [x] T019 [US5] В `src/ui/combobox/ComboBox.tsx`: кнопка очистки через `endAdornment` у `Input` / `TextArea` (например `IconButton` из библиотеки иконок проекта); пропы `clearable`, `clearIcon`, `onClear`; скрытие при пустом значении или `disabled`
- [x] T020 [P] [US5] Добавить в `src/ui/combobox/ComboBox.stories.tsx` сценарий Clearable и при необходимости CustomClearIcon

**Checkpoint**: Очистка соответствует FR-14 и AC из US5

---

## Phase 8: User Story 6 — Маска ввода и ограничение длины (Priority: P3)

**Goal**: `mask` и `maxLength` по `specs/010-combobox/research.md` §7–8; подстановка из списка проходит маску.

**Independent Test**: Маска телефона отбрасывает лишние символы; при достижении `maxLength` ввод не растёт; выбор опции не ломает поле при несовместимой маске (без падения).

### Implementation for User Story 6

- [x] T021 [US6] Реализовать `src/ui/combobox/mask.ts`: метасимволы `9`, `A`, `*`, литералы; функции применения к вставке и к программной подстановке значения
- [x] T022 [US6] В `src/ui/combobox/ComboBox.tsx`: интеграция `mask` и `maxLength` с потоком `onChange`; при выборе опции прогон значения через маску перед записью в поле
- [x] T023 [P] [US6] Добавить в `src/ui/combobox/ComboBox.stories.tsx` сценарии Mask и MaxLength

**Checkpoint**: FR-13 и US6 AC выполняются без новых npm-зависимостей

---

## Phase 9: User Story 7 — Позиционирование панели (Priority: P3)

**Goal**: `positions`, `menuOffset`, `menuWidth`, `menuMaxWidth`, `menuMaxHeight` — как у Select; fallback на первую позицию из массива (`specs/010-combobox/spec.md` US7).

**Independent Test**: Смена `positions` и узкий вьюпорт в Storybook; панель не «отрывается» от поля при изменении высоты поля (multiline).

### Implementation for User Story 7

- [x] T024 [US7] В `src/ui/combobox/ComboBox.tsx`: полная связка пропов панели с Floating UI (`flip`, `shift`, `offset`, `size` для ограничения высоты/ширины) по правилам из `specs/010-combobox/research.md` §1 и §4–5; минимальная ширина панели не меньше ширины поля
- [x] T025 [P] [US7] Добавить в `src/ui/combobox/ComboBox.stories.tsx` сценарии Positions и MenuMaxHeight

**Checkpoint**: Панель ведёт себя предсказуемо у краёв экрана и при длинном списке

---

## Phase 10: User Story 8 — Состояния блокировки и ошибки (Priority: P3)

**Goal**: `disabled` — нет ввода и открытия; `error` — визуал ошибки и `aria-invalid` на поле; приоритет визуала `disabled` над `error` (`specs/010-combobox/spec.md` Edge Cases).

**Independent Test**: Переключатели в Storybook; при `disabled` клик не открывает панель.

### Implementation for User Story 8

- [x] T026 [US8] В `src/ui/combobox/ComboBox.tsx`: проброс `disabled` и `error` в `Input`/`TextArea`; `aria-invalid` при `error`; блокировка открытия и очистки при `disabled`; согласовать классы в `src/ui/combobox/combobox.module.css` с токенами
- [x] T027 [P] [US8] Добавить в `src/ui/combobox/ComboBox.stories.tsx` сценарии Error и DisabledOverlay

**Checkpoint**: Состояния согласованы с Input/Select

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Тесты, документация по шаблону, экспорт пакета, сборка

- [x] T028 Добавить `src/ui/combobox/ComboBox.test.tsx` (Vitest + Testing Library): сценарии из раздела «Тестируемость» в `specs/010-combobox/contracts/combobox.md` (открытие, фильтр, выбор, свободный ввод, очистка, маска, maxLength, highlight, multiline Enter, disabled, error, positions)
- [x] T029 Добавить `src/ui/combobox/ComboBox.docs.tsx` по шаблону `src/ui/radio/Radio.docs.tsx` и `.cursor/rules/component-docs-template.mdc`: все **16** секций из `specs/010-combobox/spec.md` (Размер, ширина, multiline, высота списка, расположение/выравнивание панели, borderless, иконка слева, textAlign, maxLength, mask, clearable, clearIcon, disabled, error, подсветка); корень обёртки с классом `turbo-ui-scope` как у других Docs
- [x] T030 В `src/ui/combobox/ComboBox.stories.tsx` подключить docs page через `docsPageFromModule` как в `src/ui/select/Select.stories.tsx`; обновить `parameters.docs.page`
- [x] T031 [P] Добавить в `package.json` поле `exports` для `"./combobox"`; добавить entry в `vite.config.lib.js`; реэкспорт типов и компонента из `src/index.ts`; расширить `scripts/copy-styles.cjs` shim для `dist/ui/combobox.d.ts`
- [x] T032 [P] Добавить в `.storybook/preview.js` класс `.combobox-docs-menu` по аналогии с `.select-docs-menu`
- [x] T033 В корне репозитория выполнить `npm test`, `npm run typecheck`, `npm run build:lib`; исправить ошибки

**Checkpoint**: SC-1–SC-6 из `specs/010-combobox/spec.md` достижимы; quickstart и контракт не расходятся с кодом

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: без зависимостей
- **Phase 2 (Foundational)**: после Phase 1 — **блокирует все user stories**
- **Phase 3–10 (US1–US8)**: после Phase 2; рекомендуемый порядок **US1 → US2 → … → US8** (номера совпадают с приоритетом P1→P3 внутри групп)
- **Phase 11 (Polish)**: после завершения нужного набора user stories (для полной приёмки — после US1–US8)

### User Story Dependencies

| Story | Зависит от | Заметки |
|-------|------------|---------|
| US1 | Foundational | База ComboBox |
| US2 | US1 | Фильтрация поверх открытой панели |
| US3 | US1, US2 | Свободный текст при уже работающем вводе и фильтре |
| US4 | US1 | Конфигурация поля и TextArea |
| US5 | US1 (US4 желательно для end-слота в TextArea) | Очистка в однострочном режиме возможна раньше multiline |
| US6 | US1 | Маска независима от UX панели |
| US7 | US1 | Углубление позиционирования (частично может пересекаться с T004–T006) |
| US8 | US1 | Явная полировка disabled/error |

### Parallel Opportunities

- После Phase 2: **US6** (маска) и **US7** (размеры панели) можно параллелить с **US4** на разных ветках осторожно — риск конфликтов в `ComboBox.tsx`; безопаснее параллелить **тесты T028** и **документацию T029** после стабилизации API
- Задачи с **[P]**: разные файлы — см. номера T008, T009, T013, T018, T020, T023, T025, T027, T031, T032

---

## Parallel Example: User Story 2

```text
# После T010–T012 можно параллельно:
Задача T013 — расширить только src/ui/combobox/ComboBox.stories.tsx
Задача T011 — добавить только src/ui/combobox/highlightMatch.tsx (если T010 уже задаёт контракт контекста)
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Phase 1–2: Setup + Foundational  
2. Phase 3–4: US1 + US2  
3. **STOP**: Storybook + ручная проверка AC для P1  
4. При необходимости — демо / промежуточный релиз документации позже (Phase 11)

### Incremental Delivery

1. US1 → открытие и выбор  
2. US2 → фильтр и подсветка (MVP для пользователя справочника)  
3. US3–US8 → свободный ввод, поле, очистка, маска, позиции, ошибки  
4. Phase 11 → тесты, Docs, экспорт

### Suggested MVP Scope

- **Обязательно для MVP**: Phase 1–2, Phase 3 (US1), Phase 4 (US2) — задачи **T001–T013**  
- **Расширение продукта**: Phase 5–10  
- **Production-ready библиотека**: Phase 11  

---

## Summary

| Метрика | Значение |
|---------|----------|
| **Всего задач** | 33 (T001–T033) |
| **Phase 1** | 1 |
| **Phase 2** | 3 |
| **US1** | 5 (T005–T009) |
| **US2** | 4 (T010–T013) |
| **US3** | 1 (T014) |
| **US4** | 4 (T015–T018) |
| **US5** | 2 (T019–T020) |
| **US6** | 3 (T021–T023) |
| **US7** | 2 (T024–T025) |
| **US8** | 2 (T026–T027) |
| **Polish** | 6 (T028–T033) |

**Формат**: все задачи — чеклист `- [ ]`, ID `Tnnn`, для фаз user story — метка `[USn]`, в описании указан целевой путь файла.
