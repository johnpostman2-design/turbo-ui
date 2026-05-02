# Implementation Plan: TextArea

**Branch**: `006-textarea` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/006-textarea/spec.md`

## Summary

Добавить компонент **TextArea** — многострочное поле ввода с размерами **small** и **medium**, состояниями default / hover / focus / filled / disabled / invalid, текстом ошибки под полем (как в макете Figma [726:146](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=726-146)), индикатором resize и стилями **только из токенов**. Реализация: новый модуль `src/ui/textarea/` (React + CSS Modules + `clsx`), расширение **`tokens.json`** и **`scripts/gen-theme-css.cjs`** для переменных `--textarea-*`, публичный экспорт **`turbo-ui/textarea`** (и реэкспорт из корня `turbo-ui`), Storybook и unit-тесты по образцу `Input`. Детали решений — [research.md](./research.md), публичный контракт — [contracts/textarea.md](./contracts/textarea.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18  
**Primary Dependencies**: React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules  
**Storage**: N/A (UI-компонент)  
**Testing**: Vitest (`Input.test.tsx` как образец), Storybook (матрица размеров × состояний)  
**Target Platform**: браузер; потребление пакета `turbo-ui` в сторонних проектах  
**Project Type**: component library (Turbo UI)  
**Performance Goals**: без новых тяжёлых зависимостей; один дополнительный entry в `vite.config.lib.js` и строки в `dts` `include`  
**Constraints**: только токены и CSS-переменные темы; Figma — reference; hex из экспорта MCP не копировать в код  
**Scale/Scope**: один компонент `TextArea`, опционально **large** не входит в MVP (в спеке — только при выравнивании с Input, вне текущего макета)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Размеры/отступы/min-height TextArea — новые ключи в `tokens.json` → генерация в `theme-vars.css`; не дублировать в JSX |
| II. Запрет hardcoded | PASS | Цвета/обводки через существующие семантические переменные (`--border-*`, `--content-*`, `--surface-*`) и новые `--textarea-*` из токенов |
| III. Component-first | PASS | Один публичный компонент TextArea; не обходиться «голым» `<textarea>` с локальными стилями в продуктах |
| IV. Только существующие компоненты | PASS | Композиция в духе Input/InputField (обёртка + слот ошибки); без стороннего UI-kit |
| V. Figma как reference | PASS | Сверка 1:1 по скриншоту макета после стилизации токенами |
| VI. Минималистичный API | PASS | Один компонент с `error`/`errorText` по аналогии с Input/InputField; без дублирующих пропсов |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | PASS | Лёгкий компонент; resize нативный, без лишних подписок |
| IX. Расширение системы | PASS | Storybook + контракт + при необходимости ссылка из `003-input` contract |
| X. Versioning | PASS | Новая функциональность — MINOR; breaking не планируется |

**Result**: All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/006-textarea/
├── plan.md                 # этот файл
├── research.md             # Phase 0
├── data-model.md           # Phase 1
├── quickstart.md           # Phase 1
├── contracts/
│   └── textarea.md
└── tasks.md                # /speckit.tasks (не создаётся этим шагом)
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── textarea/
│       ├── TextArea.tsx
│       ├── textarea.module.css
│       ├── TextArea.stories.tsx
│       ├── TextArea.test.tsx
│       └── index.ts
├── tokens/
│   └── tokens.json                    # секция textarea (sizes, borderRadius, …)
├── styles/
│   └── theme-vars.css                 # генерируется; не править руками
scripts/
└── gen-theme-css.cjs                  # генерация --textarea-*-*
src/index.ts                           # export TextArea
package.json                           # exports: "./textarea"
vite.config.lib.js                     # entry ui/textarea + dts include
```

**Structure Decision**: Каталог `src/ui/textarea/` по аналогии с `src/ui/input/`; токены — отдельная секция `textarea`, т.к. высоты многострочного поля (64px / 100px в макете) не совпадают с однострочным `input.sizes.*.height`.

## Phase 0: Research

См. [research.md](./research.md): токены `textarea`, политика `resize`, выравнивание радиуса с макетом (4px) vs `--input-border-radius` (8px), индикатор resize через CSS/фон без хардкода цветов вне токенов.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — пропсы, слот ошибки, связь id / `aria-*`.
- [contracts/textarea.md](./contracts/textarea.md) — публичный API **TextArea**.
- [quickstart.md](./quickstart.md) — импорт `turbo-ui/textarea` и примеры.

## Complexity Tracking

Не применимо — нарушений конституции нет.

## Constitution Check (post Phase 1)

После фиксации контрактов и research: принципы I–X остаются **PASS**; любые новые визуальные числа — только через `tokens.json` и генерацию темы.
