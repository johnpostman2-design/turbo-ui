# Implementation Plan: IconButton

**Feature**: 002-icon-button-spec | **Spec**: [spec.md](./spec.md)  
**Input**: Новый компонент IconButton с вариантами primary и secondary. Дизайн: [Figma node 602-3021](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=602-3021).

## Summary

Добавить в Turbo UI компонент IconButton (кнопка только с иконкой). Два варианта: primary, secondary. Документация и сборка по образцу Button — контракт, Storybook, экспорт из библиотеки для подключения в другие проекты.

## Technical Context

**Language/Version**: TypeScript/ESM, React 18  
**Dependencies**: те же, что у Button (React, tokens, Icon, CSS Modules)  
**Design reference**: Figma Turbo UI, node-id=602-3021. Размеры 16/24/32 брать из Figma MCP: `get_metadata` или `get_design_context` для node 602:3021 → Size=small 16×16, Size=medium 24×24, Size=large 32×32.  
**Project structure**: `src/ui/icon-button/` по аналогии с `src/ui/button/`

## Project Structure (дополнение)

```text
src/ui/
├── button/           # существующий
└── icon-button/     # новый
    ├── IconButton.tsx
    ├── icon-button.module.css
    ├── index.ts
    └── IconButton.stories.tsx

specs/002-icon-button-spec/
├── plan.md
├── spec.md
├── contracts/
│   └── icon-button.md
└── tasks.md
```

## Principles (из root spec)

- Стили только через design tokens (tokens.json / theme).
- Без inline styles для дизайна; без hardcoded цветов/spacing.
- Минимальный API; forwardRef, нативные атрибуты button.
- Компонент собирается в dist и экспортируется как turbo-ui/icon-button.
