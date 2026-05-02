# Implementation Plan: Radio

**Branch**: `008-radio` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/008-radio/spec.md`

## Summary

Добавить компонент **Radio** — нативная радиокнопка с кастомным визуалом по макету Figma [794:352](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=794-352): размеры **large / medium / small**, состояния **default / hover / focus / disabled / invalid**, значения **выбран / не выбран**; **hover не меняет вид у disabled**. Реализация: модуль `src/ui/radio/` (React + CSS Modules + `clsx`), секция **`radio`** в **`tokens.json`** и блок генерации в **`scripts/gen-theme-css.cjs`** для переменных `--radio-*`, экспорт **`turbo-ui/radio`**, Storybook Docs по шаблону Checkbox/TextArea (в т.ч. `.storybook/preview.js` — класс меню `radio-docs-menu` рядом с существующими), unit-тесты (Vitest). Группа «одно из нескольких» в MVP — **композиция** (несколько `Radio` с общим `name` и контролируемым/неконтролируемым значением); опциональный **`RadioGroup`** вынести в отдельную итерацию только при явной потребности. Решения — [research.md](./research.md); публичный API — [contracts/radio.md](./contracts/radio.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18  
**Primary Dependencies**: React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules  
**Storage**: N/A (UI-компонент)  
**Testing**: Vitest (`Checkbox.test.tsx` как образец), Storybook (матрица размер × состояние × выбран/не выбран)  
**Target Platform**: браузер; потребление пакета `turbo-ui`  
**Project Type**: component library (Turbo UI)  
**Performance Goals**: без новых тяжёлых зависимостей; один entry в `vite.config.lib.js` + правка `dts` include  
**Constraints**: только токены и CSS-переменные темы; Figma — reference; не копировать сырые hex из экспорта в код  
**Scale/Scope**: один компонент `Radio` в MVP; без полноформатной библиотеки форм

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Секция `radio` в `tokens.json` → `--radio-*` в `theme-vars.css` (размеры круга, зазоры, transition; цвета — семантические `--border-*`, `--content-*`, `--surface-*` где уже есть) |
| II. Запрет hardcoded | PASS | Геометрия и переходы из `--radio-*`; цвета из темы |
| III. Component-first | PASS | Публичный `Radio`; в продуктах не обходиться «голым» input без системного визуала |
| IV. Только существующие компоненты | PASS | Без стороннего UI-kit; внутренний «dot» — CSS или минимальная разметка с токенами |
| V. Figma как reference | PASS | Приёмка по скриншоту макета после стилизации токенами |
| VI. Минималистичный API | PASS | Пропы по духу `input[type=radio]` + `size`, `error`, опционально `label` (паритет с Checkbox) |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | PASS | Лёгкий компонент |
| IX. Расширение системы | PASS | Storybook + контракт + экспорт entry |
| X. Versioning | PASS | Новая функциональность — MINOR |

**Result**: All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/008-radio/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── radio.md
└── tasks.md                # /speckit.tasks (не создаётся этим шагом)
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── radio/
│       ├── Radio.tsx
│       ├── radio.module.css
│       ├── Radio.stories.tsx
│       ├── Radio.docs.tsx
│       ├── Radio.test.tsx
│       └── index.ts
├── tokens/
│   └── tokens.json                    # секция radio.sizes.{large,medium,small}
├── styles/
│   └── theme-vars.css                 # генерируется
scripts/
└── gen-theme-css.cjs                  # блок radio → --radio-*
src/index.ts                           # export Radio
package.json                           # exports: "./radio"
vite.config.lib.js                     # entry ui/radio + dts include
.storybook/preview.js                  # стили Docs: .radio-docs-menu
```

**Structure Decision**: Каталог `src/ui/radio/` по аналогии с `checkbox`; токены — отдельная секция `radio` (геометрия круга и зазор до подписи по макету).

## Phase 0: Research

См. [research.md](./research.md): нативный `input[type=radio]` + визуальная оболочка; группировка через `name` и `checked`/`onChange`; **disabled без `:hover` стилей** (`:hover` применять только при отсутствии disabled, например через селектор обёртки `.root:not([data-disabled]):hover` или `:not(:disabled)` на input); invalid + `aria-invalid`; опциональный `label` как у Checkbox; a11y: примеры с `fieldset`/`legend` или `role="radiogroup"` в Storybook.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — пропсы, состояния, группа, связь с формой.
- [contracts/radio.md](./contracts/radio.md) — публичный API **Radio**.
- [quickstart.md](./quickstart.md) — импорт `turbo-ui/radio` и примеры группы.

После записи артефактов: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Не применимо — нарушений конституции нет.

## Constitution Check (post Phase 1)

После фиксации контрактов и токенов: принципы I–X остаются **PASS**; любые новые визуальные числа — только через `tokens.json` и генерацию темы.
