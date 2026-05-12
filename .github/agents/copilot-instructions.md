# Turbo UI Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-17

## Active Technologies
- N/A (UI-компонент) (007-checkbox)
- TypeScript / ESM, React 18 + React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules; для позиционирования выпадающей панели — см. [research.md](./research.md) (рекомендация: **Floating UI** или эквивалент с обоснованием по размеру бандла) (009-select-listbox)
- TypeScript / ESM, React 18 + React, `clsx`, существующие компоненты `Input`, `TextArea`, `Listbox`, общий механизм позиционирования из `Select` (`@floating-ui/react`); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules (010-combobox)
- TypeScript / ESM, React 18 + React, `clsx`, существующие компоненты `Select`, `ComboBox`, `TextArea`, `InputField` (как референс); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules (011-field-wrappers)
- TypeScript / ESM, React 18 + React, `clsx`; компонент `Icon` (опционально, для `startIcon`/`endIcon`); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules (012-link-typography)
- TypeScript 5.x / ESM, React 18 + `clsx` (обязательная зависимость, уже в проекте), CSS Modules; токены — `src/tokens/tokens.json` + `src/styles/theme-vars.css`; шрифт — `ONY One` через `--family-brand` (013-toggle)
- N/A — UI-компонент без хранения (013-toggle)
- TypeScript 5.x, React 18 + `clsx`, существующие токены (`tokens.json` → CSS variables), CSS Modules, Vitest + Testing Library (014-tabs)

- TypeScript / ESM, React 18 + React, `clsx`, design tokens (`tokens.json` → `theme-vars.css`), CSS Modules (006-textarea)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript / ESM, React 18: Follow standard conventions

## Recent Changes
- 014-tabs: Added TypeScript 5.x, React 18 + `clsx`, существующие токены (`tokens.json` → CSS variables), CSS Modules, Vitest + Testing Library
- 013-toggle: Added TypeScript 5.x / ESM, React 18 + `clsx` (обязательная зависимость, уже в проекте), CSS Modules; токены — `src/tokens/tokens.json` + `src/styles/theme-vars.css`; шрифт — `ONY One` через `--family-brand`
- 012-link-typography: Added TypeScript / ESM, React 18 + React, `clsx`; компонент `Icon` (опционально, для `startIcon`/`endIcon`); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
