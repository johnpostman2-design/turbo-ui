# Tasks: Tabs

**Input**: `/specs/014-tabs/` (plan.md, spec.md, research.md, data-model.md, contracts/tabs.md, quickstart.md)  
**Prerequisites**: plan.md ✓, spec.md ✓

## Dependencies (story order)

US1 (выбор вкладки) → US2/US3 (стили размеров и состояний в том же модуле) → US4 (клавиатура/roving) → US5 (Storybook/Docs/экспорт).

## Phase 1: Setup

- [ ] T001 Создать каркас `src/ui/tabs/index.ts` с реэкспортами-заглушками (или пустой `Tabs.tsx` + экспорт типов) для последующей сборки.

## Phase 2: Foundational

- [ ] T002 Реализовать React Context в `src/ui/tabs/Tabs.tsx`: `value` / `defaultValue` / `onValueChange`, `size`, `baseId` (`useId`), `registerTab` / `unregisterTab`, массив порядка `tabValues`, вычисление `activeValue` и несовпадения controlled (см. research R2).

## Phase 3: User Story 1 — Выбор вкладки и панели (P1)

**Goal**: Клик по Tab меняет активное значение; `TabsPanel` показывает только совпадающий контент.  
**Independent Test**: рендер с тремя вкладками; клик меняет текст видимой панели и `aria-selected`.

- [ ] T003 [US1] Реализовать компоненты `Tabs`, `TabsList`, `Tab`, `TabsPanel` в `src/ui/tabs/Tabs.tsx` с семантикой `tablist` / `tab` / `tabpanel` и связкой `aria-controls` / `aria-labelledby`.
- [ ] T004 [US1] Добавить стили контейнера и кнопки в `src/ui/tabs/tabs.module.css` (без логики состояний линии — минимум для кликов).
- [ ] T005 [P] [US1] Написать тесты клика и controlled в `src/ui/tabs/Tabs.test.tsx`.

## Phase 4: User Story 2 — Размеры (P1)

**Goal**: `size` меняет типографику по токенам `--typescale-lable-*`.  
**Independent Test**: классы `sizeSmall` / `sizeMedium` / `sizeLarge` на Tab.

- [ ] T006 [US2] Добавить модификаторы размера в `src/ui/tabs/tabs.module.css` и привязку в `Tab` через `clsx`.

## Phase 5: User Story 3 — Состояния визуала (P1)

**Goal**: default / hover / active / disabled линии и текста по токенам; линия через `::after` (research R1).  
**Independent Test**: Storybook матрица или снимок классов `aria-selected`, `:disabled`.

- [ ] T007 [US3] Завершить стили линии и текста в `src/ui/tabs/tabs.module.css` (`:hover`, `.selected`, `.disabled`, `:focus-visible`).
- [ ] T008 [P] [US3] Тест: disabled Tab не вызывает `onValueChange` в `src/ui/tabs/Tabs.test.tsx`.

## Phase 6: User Story 4 — Клавиатура (P2)

**Goal**: стрелки и Home/End перемещают фокус между вкладками; roving `tabIndex`.  
**Independent Test**: `fireEvent.keyDown` на tablist, фокус на соседней кнопке.

- [ ] T009 [US4] Обработчик `onKeyDown` на `TabsList` в `src/ui/tabs/Tabs.tsx` с обходом `tabValues`.
- [ ] T010 [P] [US4] Тест клавиатуры в `src/ui/tabs/Tabs.test.tsx`.

## Phase 7: User Story 5 — Storybook и экспорт (P3)

**Goal**: Docs по шаблону; stories; экспорт пакета; сортировка в preview.

- [ ] T011 [US5] Добавить `src/ui/tabs/Tabs.stories.tsx` и `src/ui/tabs/Tabs.docs.tsx` (Figma 946-19, GitHub path, секции как у Toggle).
- [ ] T012 [US5] Вставить `'Tabs'` после `'Toggle'` в `.storybook/preview.js` в `storySort.order` и добавить селектор `.tabs-docs-menu` рядом с `.toggle-docs-menu`.
- [ ] T013 [US5] Экспорт: `src/ui/tabs/index.ts`, `src/index.ts`, `package.json` exports `./tabs`, `vite.config.lib.js` (entry + dts include), `scripts/copy-styles.cjs` shim `dist/ui/tabs.d.ts`.
- [ ] T014 [P] [US5] Обновить `CHANGELOG.md` (MINOR: компонент Tabs).

## Phase 8: Polish

- [ ] T015 Запустить `npm test && npm run lint` из корня репозитория и исправить замечания.

**MVP scope**: Phase 1–3 (T001–T005).
