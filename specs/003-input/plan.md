# Implementation Plan: Input

**Branch**: `003-input` | **Date**: 2026-03-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/003-input/spec.md` — компонент Input по аналогии с Button/IconButton.

## Summary

Добавить в Turbo UI единый компонент Input: опциональный label, поле ввода, опциональный helper/error текст, опциональная иконка слева, опциональный IconButton справа. Размеры small/medium/large, состояния default, hover, focus, filled, error, disabled. Controlled/uncontrolled, доступность (label htmlFor, aria-invalid, aria-describedby, Tab не уходит на IconButton). Стили только CSS Modules и токены; экспорт tree-shakeable по образцу Button/IconButton.

## Technical Context

**Language/Version**: TypeScript/ESM, React 18  
**Primary Dependencies**: React, существующие tokens, CSS Modules, Icon и IconButton из Turbo UI  
**Storage**: N/A (UI-компонент)  
**Testing**: Vitest (unit для Input), Storybook (визуальные варианты)  
**Target Platform**: браузер, потребление из библиотеки в сторонних проектах  
**Project Type**: component library (Turbo UI)  
**Constraints**: только CSS Modules и CSS-переменные из токенов; без глобального reset; layout не прыгает при появлении helper/error  
**Scale/Scope**: один новый компонент в `src/ui/input/`; экспорт через `turbo-ui/input`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|--------|
| I. Single Source of Truth (tokens.json) | PASS | Размеры, отступы, цвета состояний — из tokens; при необходимости добавить секцию `input` в tokens.json |
| II. Запрет hardcoded | PASS | Стили только через `var(--*)` из темы |
| III. Component-first | PASS | Input — компонент библиотеки; справа только IconButton из библиотеки |
| IV. Только существующие компоненты | PASS | Используем IconButton и Icon из Turbo UI |
| V. Figma как reference | PASS | При наличии макета — ориентир; реализация на токенах |
| VI. Минималистичный API | PASS | Расширяем InputHTMLAttributes, forwardRef, ...rest; опциональные label, helperText, errorText, leftIcon, endAdornment |
| VII. Чистота production | PASS | Без отладочного кода |
| VIII. Контроль производительности | PASS | Один компонент, без тяжёлых зависимостей |
| IX. Расширение системы | PASS | Документация, контракт, Storybook по образцу Button |
| X. Versioning | PASS | MINOR при добавлении Input |

**Result**: All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/003-input/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── input.md
├── checklists/
│   └── requirements.md
└── tasks.md             # создаётся /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   ├── button/           # существующий
│   ├── icon-button/       # существующий
│   └── input/             # новый
│       ├── Input.tsx
│       ├── input.module.css
│       ├── index.ts
│       └── Input.stories.tsx
├── tokens/
│   └── tokens.json       # при необходимости добавить input.sizes / input.states
└── index.ts               # реэкспорт Input

# Сборка: vite.config.lib.js — entry ui/input; package.json exports "./input"
```

**Structure Decision**: Один компонент Input в `src/ui/input/` по образцу Button и IconButton. Контракт в `specs/003-input/contracts/input.md`. Токены для размеров/состояний при необходимости расширяются в `tokens.json` и прокидываются в theme (gen-theme-css).

## Phase 0: Research (решения)

См. [research.md](./research.md): выбор способа «layout не прыгает» (резерв высоты под hint/error), паттерн Tab + endAdornment (tabIndex=-1 на IconButton), приоритет error над helperText.

## Phase 1: Design & Contracts

- **data-model.md** — сущности: InputProps, состояние (value, error, disabled), идентификаторы для a11y (id, aria-describedby).
- **contracts/input.md** — публичный API: пропсы, типы input (text, number, tel, search, time, date, email), CSS-переменные, a11y.
- **quickstart.md** — минимальный пример подключения Input в проекте.

## Complexity Tracking

Не применимо — нарушений конституции нет.
