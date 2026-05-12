# Tasks: Select и Listbox

**Input**: Design documents from `specs/009-select-listbox/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/listbox.md`, `contracts/select.md`, `quickstart.md`

**Organization**: Фазы по user story из `specs/009-select-listbox/spec.md`. **Порядок реализации среди P1**: сначала **US2 (Listbox)**, затем **US1 (Select)** — Select переиспользует Listbox (`plan.md`).

**Компоненты**: **Listbox**, entry `turbo-ui/listbox`; **Select**, entry `turbo-ui/select`. Figma nodes: `830:857`, `830:683`, `830:590`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: можно распараллелить (разные файлы, нет зависимости от незавершённой задачи)
- **[USn]**: номер истории как в **spec.md** (US1 — Select, US2 — Listbox, US3 — позиции, US4 — поиск, US5 — Docs)
- Пути от корня репозитория: `src/...`, `specs/009-select-listbox/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Зафиксировать контекст и ветку перед кодом

- [x] T001 Прочитать `specs/009-select-listbox/plan.md`, `specs/009-select-listbox/spec.md`, `specs/009-select-listbox/contracts/listbox.md`, `specs/009-select-listbox/contracts/select.md`, `specs/009-select-listbox/research.md` и убедиться, что рабочая ветка — `009-select-listbox`

**Checkpoint**: Понятны границы MVP (одиночный выбор, без Field-обвязки), API из контрактов и решение по Floating UI из `research.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Зависимость позиционирования и токены темы — до UI-историй

- [x] T002 Добавить зависимость **`@floating-ui/react`** (версия зафиксирована в `package.json`) с краткой оценкой размера бандла в коммите/PR по `specs/009-select-listbox/research.md` §1
- [x] T003 Добавить секции **`listbox`** и **`select`** в `src/tokens/tokens.json` (размеры триггера, панель, айтем, transition, при необходимости z-index слоя попапа) по макетам Figma `830:857`, `830:683`, `830:590` без дублирования семантических цветов вне темы
- [x] T004 Расширить `scripts/gen-theme-css.cjs` генерацией **`--listbox-*`** и **`--select-*`** по образцу блока `checkbox` / `radio`
- [x] T005 Выполнить `npm run gen:theme` в корне репозитория и проверить, что `src/styles/theme-vars.css` содержит новые переменные

**Checkpoint**: Тема содержит переменные для listbox/select; Floating UI доступен импортом

---

## Phase 3: User Story 2 — Listbox как строительный блок (Priority: P1)

**Goal**: Публичный **Listbox**: опции, `selectionIndicator` check/none, `showItemStartIcon`, скролл по `maxHeight`, роли **listbox** / **option**, клавиатура по APG.

**Independent Test**: Storybook (после Phase 7) или временный рендер: длинный список со скроллом; пункты с/без левой иконки; выбранный с check при `selectionIndicator="check"`.

- [x] T006 [US2] Создать `src/ui/listbox/index.ts` и `src/ui/listbox/Listbox.tsx`: типы опций по `specs/009-select-listbox/contracts/listbox.md` (`ListboxOption`, props `options`, `value`/`defaultValue`, `onChange`, `selectionIndicator`, `showItemStartIcon`, `maxHeight`, `id`, `className`); `role="listbox"`; рендер опций с `role="option"`, `aria-selected`, `aria-disabled`
- [x] T007 [US2] Реализовать разметку пункта (текст, слот левой иконки, слот check справа) и клавиатурную навигацию (стрелки, Home/End, Enter) в `src/ui/listbox/Listbox.tsx` или вынести во внутренний модуль `src/ui/listbox/ListboxItem.tsx` при необходимости
- [x] T008 [US2] Добавить `src/ui/listbox/listbox.module.css`: состояния default/hover/focus/disabled/selected только через `var(--listbox-*)` и семантические переменные темы по макету `830:683`
- [x] T009 [P] [US2] Добавить `src/ui/listbox/Listbox.stories.tsx`: длинный список; вариант с `showItemStartIcon`; вариант с `selectionIndicator="check"` и выбранным значением

**Checkpoint**: Listbox импортируется из `src/ui/listbox/index.ts` и визуально соответствует макету айтемов при подключённой теме

---

## Phase 4: User Story 1 — Select: выбрать одно значение (Priority: P1)

**Goal**: **Select**: кнопка-триггер, портал с **Listbox** внутри, `placeholder`, `value`/`onChange`, `disabled`, `error` + `aria-invalid`, закрытие по выбору / Escape / клику вне.

**Independent Test**: Открыть/закрыть, выбрать опцию, placeholder без значения, disabled не открывает, error виден на триггере по макету `830:590`.

- [x] T010 [US1] Создать `src/ui/select/index.ts` и `src/ui/select/Select.tsx`: триггер `button type="button"` с `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`; рендер панели через `createPortal` в `document.body`; внутри панели использовать **Listbox** с `selectionIndicator="check"`; пропы по `specs/009-select-listbox/contracts/select.md` (минимум: `options`, `value`/`defaultValue`, `onChange`, `placeholder`, `disabled`, `error`, `size`, `showItemStartIcon`)
- [x] T011 [US1] В `src/ui/select/Select.tsx`: обработка `onOpenChange`, закрытие по выбору, `pointerdown` вне триггера и панели, фокус после закрытия; синхронизация `aria-invalid` с `error`
- [x] T012 [US1] Добавить `src/ui/select/select.module.css`: визуал триггера (размеры `small`/`medium`/`large`), disabled, invalid — только токены `--select-*` и тема

**Checkpoint**: Select работает без настройки `positions` (достаточно дефолтного placement из следующей фазы или временного `bottom left` в коде до T013)

---

## Phase 5: User Story 3 — Позиция и границы экрана (Priority: P2)

**Goal**: Проп **`positions`** (одно или массив из 12 значений), **`menuOffset`**, перебор приоритетов и fallback **первая позиция** при невозможности укладки по правилу из `specs/009-select-listbox/spec.md` FR-6; **`menuWidth`**, **`menuMaxWidth`**, **`menuMaxHeight`** на панели.

**Independent Test**: Storybook: смена `positions` и `menuOffset`; узкий контейнер / искусственный viewport — проверка fallback.

- [x] T013 [US3] В `src/ui/select/Select.tsx` (или `src/ui/select/useSelectPosition.ts`): интеграция `@floating-ui/react` — маппинг `SelectPosition` → `placement`, middleware `flip`/`shift`/`offset`; передача `menuOffset` как горизонтальный сдвиг (положительный — влево, отрицательный — вправо по спеке); реализация порядка `positions` и fallback на первый элемент массива по `specs/009-select-listbox/research.md` §1
- [x] T014 [US3] Применить `menuWidth`, `menuMaxWidth`, `menuMaxHeight` к портальной панели (правило пересечения ширины — по `specs/009-select-listbox/research.md` §5) через классы/CSS variables из токенов в `src/ui/select/select.module.css` или инлайн-стиль только из вычисленных `var(--*)`

**Checkpoint**: Панель не обрезается типичным `overflow: hidden` у родителя; позиции воспроизводимы в Storybook

---

## Phase 6: User Story 4 — Поиск и фильтрация (Priority: P2)

**Goal**: Проп **`search`**: поле на базе **`Input`** из `src/ui/input/`; **`filterItem`**: видимый поднабор опций; пустой результат фильтра не ломает Escape/фокус.

**Independent Test**: Включить `search`, ввести запрос — список сокращается согласно `filterItem`.

- [x] T015 [US4] В `src/ui/select/Select.tsx`: при `search` рендер `Input` из `turbo-ui/input` над Listbox; состояние строки поиска; фильтрация `options` перед передачей в Listbox; дефолтный `filterItem` (подстрока `label`) при отсутствии пропа — зафиксировать в коде/комментарии как в контракте

**Checkpoint**: Сценарий поиска работает без кастомных обёрток снаружи

---

## Phase 7: User Story 5 — Документация Storybook (Priority: P2)

**Goal**: **Listbox.docs**, **Select.docs**, сторис, меню в **`.storybook/preview.js`**, экспорты пакета.

**Independent Test**: `npm run storybook` — разделы Components/Listbox и Components/Select, страницы Docs со ссылками Figma; `npm run build:lib` — entries `listbox` и `select`.

- [x] T016 [P] [US5] Добавить `src/ui/listbox/Listbox.docs.tsx` по шаблону `src/ui/radio/Radio.docs.tsx` и `.cursor/rules/component-docs-template.mdc`: ссылка Figma на `830:857` / `830:683`, краткие секции про опции, иконки, `selectionIndicator`
- [x] T017 [P] [US5] Добавить `src/ui/select/Select.docs.tsx`: ссылки Figma `830:590`; секции placeholder, disabled, error, positions, menuOffset, search, связь с Listbox
- [x] T018 [US5] Расширить `src/ui/listbox/Listbox.stories.tsx` и `src/ui/select/Select.stories.tsx`: матрицы состояний, позиции, поиск (после T015)
- [x] T019 [US5] Добавить в `package.json` поля `exports` для `"./listbox"` и `"./select"` по аналогии с `"./radio"`
- [x] T020 [US5] Добавить в `vite.config.lib.js` entries `ui/listbox` и `ui/select` и включить `src/ui/listbox/**/*.ts(x)`, `src/ui/select/**/*.ts(x)` в `dts` `include`
- [x] T021 [US5] Реэкспортировать компоненты и публичные типы из `src/index.ts`
- [x] T022 [US5] Расширить `scripts/copy-styles.cjs` шимами `dist/ui/listbox.d.ts` и `dist/ui/select.d.ts` по образцу `checkbox`
- [x] T023 [US5] Добавить в `.storybook/preview.js` классы `.listbox-docs-menu` и `.select-docs-menu` к тем же правилам типографики Docs, что `.radio-docs-menu`

**Checkpoint**: Импорты `turbo-ui/listbox` и `turbo-ui/select`; Docs читаемы без исходников

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Unit-тесты и зелёная сборка

- [x] T024 [P] Добавить `src/ui/listbox/Listbox.test.tsx` (Vitest + Testing Library): рендер опций; выбор меняет `value`; disabled-пункт не выбирается; базовая клавиша (например ArrowDown + Enter) по возможности без хрупкости к layout
- [x] T025 [P] Добавить `src/ui/select/Select.test.tsx`: disabled блокирует открытие; `aria-invalid` при `error`; выбор опции вызывает `onChange` и закрывает список (по `data-testid` или ролям)
- [x] T026 В корне репозитория выполнить `npm test`, `npm run typecheck`, `npm run build:lib`; устранить ошибки

**Checkpoint**: CI-эквивалент локально зелёный; критические пути Select/Listbox покрыты тестами

---

## Dependencies & Execution Order

### Phase Dependencies

**Phase 1** → **Phase 2** → **Phase 3 (US2)** → **Phase 4 (US1)** → **Phase 5 (US3)** → **Phase 6 (US4)** → **Phase 7 (US5)** → **Phase 8**

### User Story Dependencies

| Story | Зависит от | Примечание |
|-------|------------|------------|
| US2 | Phase 2 | Listbox — первый P1-блок кода |
| US1 | US2 + Phase 2 | Select встраивает Listbox |
| US3 | US1 | Позиционирование панели Select |
| US4 | US1 | Поиск внутри открытого Select |
| US5 | US4 (для сторис search), US3 | Полные сторис/Docs после поведения |

### Parallel Opportunities

- После **T008**: **T009** [P] — отдельный файл сторис
- После **T006**: **T024** [P] можно вести параллельно с **T007**–**T008**, если тесты не требуют финальных классов (иначе после **T008**)
- **T016** [P] и **T017** [P] — параллельно после стабильного UI (рекомендуется после **T015**)
- **T024** [P] и **T025** [P] — параллельно в Phase 8

### Parallel Example (Phase 7)

```text
# Одновременно: две страницы Docs
T016 Listbox.docs.tsx
T017 Select.docs.tsx
```

---

## Implementation Strategy

### MVP (минимально полезный инкремент)

1. Phase 1–2: зависимость + токены + тема  
2. Phase 3 (US2): Listbox  
3. Phase 4 (US1): Select без кастомных `positions` (дефолтный placement до Phase 5 допустим для промежуточного чекпойнта)  
4. Phase 5 (US3): полное позиционирование  
5. Далее US4 → US5 → Phase 8

### Подсчёт задач

| Фаза | Задач |
|------|--------|
| Phase 1 | 1 |
| Phase 2 | 4 |
| Phase 3 (US2) | 4 |
| Phase 4 (US1) | 3 |
| Phase 5 (US3) | 2 |
| Phase 6 (US4) | 1 |
| Phase 7 (US5) | 8 |
| Phase 8 | 3 |
| **Всего** | **26** |

### Задач на user story (implementation + tests в фазах)

| Story | Задачи (IDs) |
|-------|----------------|
| US2 | T006–T009 |
| US1 | T010–T012 |
| US3 | T013–T014 |
| US4 | T015 |
| US5 | T016–T023 |
| Polish | T024–T026 |

---

## Notes

- Частичные сторис в **T009** до полного Select — нормально; полная матрица Select — в **T018**
- Любой новый визуальный литерал — только через `src/tokens/tokens.json` и генерацию
