# Implementation Plan: Input — label-out-primary

**Branch**: `004-input-label-out-primary` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/004-input-label-out-primary/spec.md`

## Summary

Реализовать компонент **InputField** (вариант визуала **label-out-primary**): колонка «подпись над полем → поле ввода → helper/error под полем», визуал и отступы по макету Figma (node `696:412`), только токены; внутри — примитив `Input` из `src/ui/input/`. Состояния default, hover, focus, filled, filled-hover, disabled, invalid; размеры `small` | `medium` | `large`. Документация в Storybook; публичный экспорт **`turbo-ui/input-field`** (MINOR). Технический подход: модуль `src/ui/input-field/` + CSS Modules для обёртки и при необходимости доработка `input.module.css` для соответствия макету; детали — см. [research.md](./research.md) и [contracts/input-field.md](./contracts/input-field.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18  
**Primary Dependencies**: React, `clsx`, существующие design tokens (`tokens.json` → CSS variables), CSS Modules, компоненты `Input`, `IconButton`, иконки из Turbo UI  
**Storage**: N/A (UI-компонент)  
**Testing**: Vitest (при наличии тестов на Input / smoke для нового экспорта), Storybook (матрица размеров × состояний)  
**Target Platform**: браузер; потребление пакета `turbo-ui` в сторонних проектах  
**Project Type**: component library (Turbo UI)  
**Performance Goals**: без новых тяжёлых зависимостей; один дополнительный entry или реэкспорт — в пределах существующего bundle-профиля  
**Constraints**: только токены и переменные темы; Figma — reference; без копирования Tailwind/hex из MCP в обход `tokens.json`  
**Scale/Scope**: один вариант компонента в `src/ui/input/` (или тонкий экспорт-обёртка), контракт и stories в specs; при необходимости доработка `tokens.json` (spacing/typography для label/helper), если в теме ещё нет нужных семантических переменных

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Отступы между label / field / helper — через `--spacing-*` и существующие typography tokens; при пробеле — добавить токены, не константы в JSX |
| II. Запрет hardcoded | PASS | Цвета/радиусы/шрифты только `var(--*)` из темы |
| III. Component-first | PASS | Поле — через `Input`; справа только `IconButton` из библиотеки |
| IV. Только существующие компоненты | PASS | Расширение/композиция Turbo UI, не сторонний input |
| V. Figma как reference | PASS | [Макет Turbo UI 696:412](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=696-412) — проверка 1:1 после стилизации токенами |
| VI. Минималистичный API | PASS | Один публичный компонент формы — `InputField`; примитив `Input` без label остаётся отдельным entry |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | PASS | Нет лишних подписок; опционально мемоизация при усложнении |
| IX. Расширение системы | PASS | Storybook + контракт + при необходимости обновление `003-input` contract cross-ref |
| X. Versioning | PASS | Новая функциональность — MINOR; breaking не планируется |

**Result**: All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/004-input-label-out-primary/
├── plan.md                 # этот файл
├── research.md             # Phase 0
├── data-model.md           # Phase 1
├── quickstart.md           # Phase 1
├── contracts/
│   └── input-field.md
└── tasks.md                # создаётся /speckit.tasks (не этим шагом)
```

### Source Code (repository root)

```text
src/
├── ui/
│   ├── input/
│   │   ├── Input.tsx                    # примитив поля; доработка focus/filled при необходимости
│   │   ├── input.module.css
│   │   ├── Input.stories.tsx
│   │   └── index.ts
│   └── input-field/                     # новый модуль
│       ├── InputField.tsx               # label + Input + helper/error
│       ├── input-field.module.css
│       ├── InputField.stories.tsx
│       └── index.ts
├── tokens/
│   └── tokens.json
└── index.ts                             # реэкспорт InputField

package.json → exports: добавить "./input-field" (по аналогии с "./input")
```

**Structure Decision**: Новый каталог `src/ui/input-field/` для **InputField**; общие токены и примитив `Input` в `src/ui/input/`.

## Phase 0: Research

См. [research.md](./research.md): компонент **InputField** в `src/ui/input-field/`; filled / filled-hover через `:placeholder-shown` и `:hover`; `focus-within` для обводки поля; размеры IconButton по `size` поля.

## Phase 1: Design & Contracts

- **data-model.md** — `InputFieldProps`, связь с DOM и a11y (id, aria-describedby, aria-invalid).
- **contracts/input-field.md** — публичный API **InputField**.
- **quickstart.md** — пример импорта и использования в приложении.

## Complexity Tracking

Не применимо — нарушений конституции нет.

## Constitution Check (post Phase 1)

После фиксации контрактов и research: все принципы I–X остаются **PASS**; новые токены только при доказанном отсутствии существующего spacing/typography в теме.
