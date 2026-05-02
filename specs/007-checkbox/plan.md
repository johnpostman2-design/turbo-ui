# Implementation Plan: Checkbox

**Branch**: `007-checkbox` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/007-checkbox/spec.md`

## Summary

Добавить компонент **Checkbox** — нативный флажок с кастомным визуалом по макету Figma [761:112](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=761-112): размеры **large / medium / small**, состояния default / hover / focus / disabled / invalid, значения **checked / unchecked / indeterminate**. Реализация: модуль `src/ui/checkbox/` (React + CSS Modules + `clsx`), секция **`checkbox`** в **`tokens.json`** и блок генерации в **`scripts/gen-theme-css.cjs`** для переменных `--checkbox-*`, экспорт **`turbo-ui/checkbox`**, Storybook Docs по шаблону Button/TextArea (в т.ч. `.storybook/preview.js` — класс меню `checkbox-docs-menu` рядом с существующими), unit-тесты (Vitest). Решения и обоснования — [research.md](./research.md); публичный API — [contracts/checkbox.md](./contracts/checkbox.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18  
**Primary Dependencies**: React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules  
**Storage**: N/A (UI-компонент)  
**Testing**: Vitest (`Input.test.tsx` / `TextArea.test.tsx` как образец), Storybook (матрица размер × состояние × значение)  
**Target Platform**: браузер; потребление пакета `turbo-ui`  
**Project Type**: component library (Turbo UI)  
**Performance Goals**: без новых тяжёлых зависимостей; один entry в `vite.config.lib.js` + правка `dts` include  
**Constraints**: только токены и CSS-переменные темы; Figma — reference; не копировать сырые hex из экспорта в код  
**Scale/Scope**: один компонент `Checkbox`; составной `CheckboxField` с лейблом — вне MVP (спека: композиция снаружи)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Размеры квадрата, обводки, радиусы, transition — секция `checkbox` в `tokens.json` → `--checkbox-*` в `theme-vars.css` |
| II. Запрет hardcoded | PASS | Цвета через `--border-*`, `--content-*`, `--surface-*` и новые `--checkbox-*`; без magic numbers в CSS |
| III. Component-first | PASS | Один публичный `Checkbox`; в продуктах не обходиться «голым» input без системного визуала |
| IV. Только существующие компоненты | PASS | Без стороннего UI-kit; иконка галочки — SVG/маркер из токенов размера или inline SVG с `currentColor` |
| V. Figma как reference | PASS | Приёмка по скриншоту макета после стилизации токенами |
| VI. Минималистичный API | PASS | Пропы по духу нативного input + `size`, `error`/`invalid`; indeterminate через явный проп и синхронизацию с DOM (см. research) |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | PASS | Лёгкий компонент, без лишних глобальных подписок |
| IX. Расширение системы | PASS | Storybook + контракт + экспорт entry |
| X. Versioning | PASS | Новая функциональность — MINOR |

**Result**: All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/007-checkbox/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── checkbox.md
└── tasks.md                # /speckit.tasks (не создаётся этим шагом)
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── checkbox/
│       ├── Checkbox.tsx
│       ├── checkbox.module.css
│       ├── Checkbox.stories.tsx
│       ├── Checkbox.docs.tsx
│       ├── Checkbox.test.tsx
│       └── index.ts
├── tokens/
│   └── tokens.json                    # секция checkbox.sizes.{large,medium,small}
├── styles/
│   └── theme-vars.css                 # генерируется
scripts/
└── gen-theme-css.cjs                  # блок checkbox → --checkbox-*
src/index.ts                           # export Checkbox
package.json                           # exports: "./checkbox"
vite.config.lib.js                     # entry ui/checkbox + dts include
.storybook/preview.js                  # стили Docs: .checkbox-docs-menu (как .textarea-docs-menu)
```

**Structure Decision**: Каталог `src/ui/checkbox/` по аналогии с `input` / `textarea`; токены — отдельная секция `checkbox`, т.к. геометрия чекбокса не совпадает с высотой Input.

## Phase 0: Research

См. [research.md](./research.md): нативный `input[type=checkbox]` + визуальная оболочка; установка **`element.indeterminate`**; политика клика из indeterminate; проп **`error`** или **`invalid`** для invalid и `aria-invalid`; матрица токенов по трём размерам.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — пропсы, состояния, indeterminate, связь с формой.
- [contracts/checkbox.md](./contracts/checkbox.md) — публичный API **Checkbox**.
- [quickstart.md](./quickstart.md) — импорт `turbo-ui/checkbox` и примеры.

После записи артефактов: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Не применимо — нарушений конституции нет.

## Constitution Check (post Phase 1)

После фиксации контрактов и токенов: принципы I–X остаются **PASS**; любые новые визуальные числа — только через `tokens.json` и генерацию темы.
