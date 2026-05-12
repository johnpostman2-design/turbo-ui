# Implementation Plan: Tabs

**Branch**: `014-tabs` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)

## Summary

Добавить составной компонент **Tabs** (Tabs, TabsList, Tab, TabsPanel) для горизонтальной навигации и переключения контента. Визуал и типографика — по Figma node `946:19`, только через design tokens и CSS Modules. Документация и Storybook — по шаблону Button/Toggle.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18  
**Primary Dependencies**: `clsx`, существующие токены (`tokens.json` → CSS variables), CSS Modules, Vitest + Testing Library  
**Storage**: N/A  
**Testing**: Vitest (`npm test`), Storybook ручная проверка  
**Target Platform**: ESM-библиотека для браузера  
**Project Type**: React component library (Turbo UI)  
**Performance Goals**: без новых тяжёлых зависимостей; минимальный контекст React  
**Constraints**: конституция — нет hardcoded цветов/spacing для дизайна; Figma как reference  
**Scale/Scope**: один семейный модуль `src/ui/tabs/`, экспорт в `package.json` и `vite.config.lib.js`

## Constitution Check

*GATE: passed.*

- Токены: цвета границ и текста — `--border-*`, `--content-*`; отступы — `--spacing-12`; типографика — `--typescale-lable-*`.
- Без Tailwind в публичном UI-коде библиотеки.
- Минимальный публичный API: составные части без дублирования.
- Документация и stories обязательны.

## Project Structure

### Documentation (this feature)

```text
specs/014-tabs/
├── plan.md
├── spec.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/tabs.md
├── checklists/requirements.md
└── tasks.md
```

### Source Code

```text
src/ui/tabs/
├── Tabs.tsx
├── tabs.module.css
├── index.ts
├── Tabs.stories.tsx
├── Tabs.docs.tsx
└── Tabs.test.tsx
```

**Structure Decision**: один каталог `tabs` с составным экспортом; стили изолированы в `tabs.module.css`.

## Complexity Tracking

Нет нарушений конституции, таблица не заполняется.

## Phase 2 (implementation outline)

1. Реализовать контекст и регистрацию вкладок.  
2. Стили и псевдоэлемент подчёркивания.  
3. Клавиатура (стрелки, Home/End).  
4. Тесты, Storybook, Docs, `preview.js`, `index.ts`, `package.json`, `vite.config.lib.js`, `copy-styles.cjs` (dts shim при необходимости).
