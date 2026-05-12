# Implementation Plan: ComboBox

**Branch**: `010-combobox` | **Date**: 2026-05-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/010-combobox/spec.md`

## Summary

Добавить публичный компонент **ComboBox** — поле ввода с выпадающим списком подсказок. ComboBox строится поверх существующих **Input** (однострочное поле), **TextArea** (многострочный режим), **Listbox** (панель подсказок) и общего механизма позиционирования из **Select** (`positions`/`menuOffset`/`flip`/`shift` через `@floating-ui/react`). Без локальных надстроек поверх готовых компонентов и без дублирующих API. Стили — только токены `tokens.json` и шрифт **ONY One**; новая секция токенов **`combobox`** (где требуются собственные размеры/состояния), генерация в **`scripts/gen-theme-css.cjs`**, экспорт **`turbo-ui/combobox`**, документация в Storybook по шаблону Button. Решения и компромиссы — [research.md](./research.md); модель данных — [data-model.md](./data-model.md); публичный API — [contracts/combobox.md](./contracts/combobox.md); минимальные примеры — [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18
**Primary Dependencies**: React, `clsx`, существующие компоненты `Input`, `TextArea`, `Listbox`, общий механизм позиционирования из `Select` (`@floating-ui/react`); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules
**Storage**: N/A
**Testing**: Vitest (паттерн `Select.test.tsx` / `Listbox.test.tsx`), Storybook (матрицы состояний, размеры, позиции, ошибки, очистка, маска)
**Target Platform**: браузер; потребление `turbo-ui`
**Project Type**: component library (Turbo UI)
**Performance Goals**: на длинном `options` (≥ 200) ввод запроса фильтрует список без видимых задержек; виртуализация — вне MVP; ленивый рендер панели — при первом открытии
**Constraints**: только токены и переменные темы; шрифт **ONY One** во всех состояниях; панель — в `FloatingPortal` (`document.body`); никаких hardcoded цветов/отступов/размеров
**Scale/Scope**: один публичный компонент; единичный выбор из подсказок + свободный ввод; без обвязки лейбл/хелпер на уровне компонента (как у Select/Input)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Single Source of Truth (tokens.json) | PASS | Секция `combobox` (там, где нужно) + переиспользование `--input-*`, `--listbox-*`, `--select-*` |
| II. Запрет hardcoded | PASS | Все размеры/цвета/радиусы/тени/типографика — из токенов; шрифт ONY One — через `--family-brand` / `--typescale-*` |
| III. Component-first | PASS | Один публичный компонент с минимальным API |
| IV. Только существующие компоненты | PASS | Поле — `Input`/`TextArea`; список — `Listbox`; иконка очистки — `IconButton` через `endAdornment` |
| V. Figma как reference | PASS | Визуал триггера и панели согласуется с Select/Input/Listbox; отдельные расхождения по ComboBox идут через токены |
| VI. Минималистичный API | PASS | Один способ для каждой возможности; `positions` единый; нет «top + align» отдельными пропами |
| VII. Чистота production | PASS | Без debug/комментариев-заглушек |
| VIII. Контроль производительности | PASS | Без новых зависимостей; маска — без тяжёлых пакетов (см. research §7); `autoUpdate` Floating UI уже используется в Select |
| IX. Расширение системы | PASS | Новый entry, Docs, контракты |
| X. Versioning | PASS | Новая функциональность — MINOR |

**Result**: PASS. Изменения в TextArea (добавление размера `large` и/или `startIcon`/`endAdornment`) и в Input/Listbox держим аддитивными — без breaking changes.

## Project Structure

### Documentation (this feature)

```text
specs/010-combobox/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── combobox.md
├── checklists/
│   └── requirements.md
└── tasks.md            # /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── combobox/
│       ├── ComboBox.tsx
│       ├── combobox.module.css
│       ├── ComboBox.stories.tsx
│       ├── ComboBox.docs.tsx
│       ├── ComboBox.test.tsx
│       ├── highlightMatch.tsx        # утилита подсветки совпадений (внутреннее)
│       ├── mask.ts                   # внутренняя реализация маски (см. research §7)
│       └── index.ts
├── tokens/
│   └── tokens.json                   # секция combobox (если потребуется)
├── styles/
│   └── theme-vars.css                # генерируется
scripts/
├── gen-theme-css.cjs                 # блок combobox
└── copy-styles.cjs                   # копирование стилей в dist
src/index.ts                          # реэкспорт ComboBox + типов
package.json                          # exports: "./combobox"
vite.config.lib.js                    # entry combobox + dts include
.storybook/preview.js                 # .combobox-docs-menu
```

**Structure Decision**: один каталог `src/ui/combobox/` по аналогии с `select`/`listbox`. Логика позиционирования и клика-вне переиспользуется из `select` (внутренний хук/утилита, без публичного экспорта). Мульти-стрингия — через **TextArea** (`multiline`); в случае отсутствующего у TextArea размера/слотов — расширяем TextArea аддитивно (см. research §3).

## Phase 0: Research

См. [research.md](./research.md): композиция Input/TextArea/Listbox; позиционирование (переиспользование из Select); перенос фокуса при выборе/очистке; правило фильтрации по умолчанию; подсветка совпадений (xss-безопасный рендер); маска ввода без внешних зависимостей; ширина панели и высота; поведение при пустом результате; a11y (combobox pattern по APG, `aria-autocomplete="list"`, `aria-activedescendant`); токены и заглушки для отсутствующих размеров TextArea.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — сущности ComboBox, Option, Query, состояния и переходы.
- [contracts/combobox.md](./contracts/combobox.md) — публичный API: пропсы, типы, поведение, accessibility.
- [quickstart.md](./quickstart.md) — импорт и минимальные примеры (включая multiline, mask, clearable, highlightMatch).

После записи: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Не применимо — отдельных исключений из конституции нет. Все «расширения» базовых компонентов (TextArea: `large` / `startIcon` / `endAdornment`) аддитивны и реализуются в рамках этой фичи как минорные дополнения; обоснование — необходимость единого `size` и слотов у поля ComboBox.

## Constitution Check (post Phase 1)

После фиксации контрактов: принципы I–X — **PASS** при условии, что добавление `large` в TextArea и/или слотов реализовано аддитивно, без breaking changes; шрифт во всех состояниях — **ONY One** через токены; токены `combobox-*` добавлены до использования.
