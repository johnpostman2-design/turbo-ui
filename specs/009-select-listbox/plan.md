# Implementation Plan: Select и Listbox

**Branch**: `009-select-listbox` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/009-select-listbox/spec.md`

## Summary

Добавить два связанных компонента: **Listbox** — панель списка опций (макеты [830:857](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-857), айтемы [830:683](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-683)); **Select** — триггер + выпадающий список, выбор одного значения ([830:590](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-590)), без лейбла/хелпера. Select переиспользует Listbox (или общий внутренний слой опций) для единого визуала; позиционирование панели — `positions` + `menuOffset` + fallback по спеке; поиск — **Input** из библиотеки; иконки у айтемов — опционально слева, check справа у выбранного в сценарии Select. Реализация: `src/ui/listbox/`, `src/ui/select/`, CSS Modules + `clsx`, секции **`listbox`** и **`select`** в **`tokens.json`**, генерация в **`scripts/gen-theme-css.cjs`**, экспорты **`turbo-ui/listbox`** и **`turbo-ui/select`**, Storybook Docs (`.storybook/preview.js` — классы меню по образцу radio/checkbox), Vitest. Решения и компромиссы — [research.md](./research.md); модель данных — [data-model.md](./data-model.md); публичные API — [contracts/listbox.md](./contracts/listbox.md), [contracts/select.md](./contracts/select.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18  
**Primary Dependencies**: React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules; для позиционирования выпадающей панели — см. [research.md](./research.md) (рекомендация: **Floating UI** или эквивалент с обоснованием по размеру бандла)  
**Storage**: N/A  
**Testing**: Vitest (паттерн `Checkbox.test.tsx` / `Radio.test.tsx`), Storybook (матрицы состояний, позиции, поиск)  
**Target Platform**: браузер; потребление `turbo-ui`  
**Project Type**: component library (Turbo UI)  
**Performance Goals**: без лишних тяжёлых зависимостей; ленивый рендер панели при первом открытии — по возможности; виртуализация списка — вне MVP  
**Constraints**: только токены и переменные темы для визуала; Figma — reference; панель в **portal** (`document.body`), чтобы не обрезалась `overflow: hidden` у предков  
**Scale/Scope**: два публичных компонента; одиночный выбор; без Field-обвязки

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Секции `listbox`, `select` (размеры триггера, панель, айтем, focus, invalid, disabled) → `--listbox-*`, `--select-*` |
| II. Запрет hardcoded | PASS | Цвета/радиусы/отступы из темы; геометрия из токенов; без копирования hex из Figma в код |
| III. Component-first | PASS | Публичные `Listbox`, `Select`; поиск — существующий `Input` |
| IV. Только существующие компоненты | PASS | Input для search; иконки — существующие паттерны иконок проекта (check-done и т.д.) |
| V. Figma как reference | PASS | Приёмка по трём node-id из спеки |
| VI. Минималистичный API | PASS | Один способ позиционирования — `positions` (+ `menuOffset`); без дублирующих пропов «top + align» |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | GATE | Новая зависимость для positioning — только с кратким обоснованием в research и замером/оценкой размера |
| IX. Расширение системы | PASS | Два entry, Docs, контракты |
| X. Versioning | PASS | Новая функциональность — MINOR |

**Result**: PASS при соблюдении пункта VIII в реализации (зафиксировано в research).

## Project Structure

### Documentation (this feature)

```text
specs/009-select-listbox/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── listbox.md
│   └── select.md
└── tasks.md                # /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   ├── listbox/
│   │   ├── Listbox.tsx
│   │   ├── ListboxItem.tsx          # или внутренний модуль — на усмотрение реализации
│   │   ├── listbox.module.css
│   │   ├── Listbox.stories.tsx
│   │   ├── Listbox.docs.tsx
│   │   ├── Listbox.test.tsx
│   │   └── index.ts
│   └── select/
│       ├── Select.tsx
│       ├── select.module.css
│       ├── Select.stories.tsx
│       ├── Select.docs.tsx
│       ├── Select.test.tsx
│       └── index.ts
├── tokens/
│   └── tokens.json                  # секции listbox, select
├── styles/
│   └── theme-vars.css               # генерируется
scripts/
├── gen-theme-css.cjs                # блоки listbox, select
└── copy-styles.cjs                  # копирование стилей в dist (по образцу)
src/index.ts                         # реэкспорт
package.json                         # exports: "./listbox", "./select"
vite.config.lib.js                   # entries + dts include
.storybook/preview.js                # .listbox-docs-menu, .select-docs-menu
```

**Structure Decision**: Два каталога по аналогии с `checkbox` / `radio`; общая логика позиционирования и клика вне — внутри `select` или вынесена в `src/ui/select/` как хук/утилита без публичного экспорта до необходимости.

## Phase 0: Research

См. [research.md](./research.md): portal + фокус-ловушка; **Floating UI** vs самописный layout; правило viewport и «первая позиция из списка»; семантика **listbox** / **combobox** (ARIA); `width` vs `maxWidth` меню; пустой список после фильтра; `menuOffset` в пикселях или в токенах spacing.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — опции, состояния Select/Listbox, позиции, фильтрация.
- [contracts/listbox.md](./contracts/listbox.md), [contracts/select.md](./contracts/select.md) — публичные пропы и поведение.
- [quickstart.md](./quickstart.md) — импорты и минимальные примеры.

После записи: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Не применимо — отдельных исключений из конституции нет. Зависимость для позиционирования (Floating UI) обоснована в [research.md](./research.md) §1 и отмечена в Constitution Check (VIII).

## Constitution Check (post Phase 1)

После фиксации контрактов: принципы I–VII, IX–X — **PASS**; VIII — **PASS**, если зависимость для позиционирования задокументирована и bundle-регрессия приемлема.
