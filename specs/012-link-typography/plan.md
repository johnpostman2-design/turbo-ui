# Implementation Plan: Link (typography)

**Branch**: `012-link-typography` | **Date**: 2026-05-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/012-link-typography/spec.md`

## Summary

Добавить публичный компонент **`Link`** как часть **typography** проекта (не Button). Компонент рендерится как inline-элемент, наследует `font-family`/`font-size`/`line-height`/`letter-spacing` от родителя и поддерживает два корневых тега: `<a>` при наличии `href` (навигация) и `<button type="button">` без `href` (типографическое действие в тексте). API минимальный: `variant: 'default' | 'secondary' | 'danger'`, `disabled`, `startIcon`/`endIcon`, нативные атрибуты соответствующего тега через rest props, `ref` на корневой DOM-элемент. Состояния (`default`/`hover`/`active`/`focus-visible`/`disabled`) задаются строго токенами проекта; шрифт — `ONY One` (через токены или наследованием из контекста `turbo-ui-scope`/`TurboUIProvider`). Hover-индикация — через `text-decoration` (классический паттерн ссылки), без фоновых заливок: это «текст-в-тексте», а не кнопка. Иконки масштабируются под текущий `font-size` и наследуют цвет через `currentColor`. Документация по шаблону проекта: страница `Components → Link` в Storybook с базовым описанием (1–2 фразы), разделами `Подключение`, `Пропсы`, `Варианты`, `Состояния`, `Иконки` — **без блоков «Доступность» и «Адаптивность»** по требованию. Детальные решения и компромиссы — [research.md](./research.md); сущности — [data-model.md](./data-model.md); публичный API — [contracts/link.md](./contracts/link.md); примеры — [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18
**Primary Dependencies**: React, `clsx`; компонент `Icon` (опционально, для `startIcon`/`endIcon`); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules
**Storage**: N/A
**Testing**: Vitest (паттерн `Button.test.tsx`/`InputField.test.tsx`); Storybook (страница `Components → Link` с матрицей вариантов и состояний)
**Target Platform**: браузер; потребление через `turbo-ui` (root) и подпуть `turbo-ui/link`
**Project Type**: component library (Turbo UI)
**Performance Goals**: чистый функциональный компонент, без новых runtime-зависимостей; нулевая регрессия по существующим chunk’ам; новый entry — небольшая CSS-Module-секция + ~1KB JS gz
**Constraints**: только токены и переменные темы; шрифт `ONY One` (через `--family-brand` или наследованием); никаких hardcoded цветов/толщин/смещений подчёркивания/размеров шрифта; никаких блоков «Доступность» и «Адаптивность» в spec/docs
**Scale/Scope**: один новый публичный компонент; ≥ 3 цветовых варианта; ≥ 8 stories и unit-тестов

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Принцип | Статус | Notes |
|---------|--------|-------|
| I. Single Source of Truth (tokens.json) | PASS | Используются существующие токены: `--content-brand` (default), `--content-primary` (secondary), `--content-error` (danger), `--content-disabled` (disabled), `--family-brand`. Новых токенов нет. |
| II. Запрет hardcoded | PASS | Цвета, шрифт, спейсинг под иконки — токенами; толщина/смещение подчёркивания — CSS-keyword’ами (`from-font`), не числами. |
| III. Component-first | PASS | Отдельный компонент `Link` в `src/ui/link/`. |
| IV. Только существующие компоненты | PASS | Внутри — иконки через существующий `Icon`; собственных «миникнопок»/SVG’шек нет. |
| V. Figma как reference | PASS | Финальная палитра/состояния — токены проекта. Внешний reference (Kontur) — только источник идеи (use=default/success/danger). |
| VI. Минималистичный API | PASS | `href` / `onClick` / `target` / `rel` / `variant` / `disabled` / `startIcon` / `endIcon` + rest. Без `as`/`asChild`/`size`/`weight`. |
| VII. Чистота production | PASS | Без debug/комментариев-заглушек; стили — один модуль. |
| VIII. Контроль производительности | PASS | Один файл `.tsx` (~1KB gz), один `.module.css` (~1KB). Без новых runtime-зависимостей. |
| IX. Расширение системы | PASS | Storybook docs+stories по шаблону; entry в `package.json`/`vite.config.lib.js`; реэкспорт из `src/index.ts`. |
| X. Versioning | PASS | Только аддитивно (новый компонент, новый entry, новая запись в `storySort.order`). MINOR-релиз. |

**Result**: PASS. Никаких breaking changes; никаких новых токенов; API минимален и однозначен.

## Project Structure

### Documentation (this feature)

```text
specs/012-link-typography/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── link.md
├── checklists/
│   └── requirements.md
└── tasks.md            # /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── link/
│       ├── Link.tsx
│       ├── link.module.css
│       ├── Link.stories.tsx
│       ├── Link.docs.tsx
│       ├── Link.test.tsx
│       └── index.ts
├── index.ts                            # реэкспорт Link + типов
package.json                            # exports: "./link"
vite.config.lib.js                      # entry link
scripts/copy-styles.cjs                 # shim-d.ts для подпути ./link
.storybook/preview.js                   # добавить 'Link' в storySort.order
```

**Structure Decision**: один каталог `src/ui/link/` по образцу остальных компонентов (`button/`, `icon-button/`, `input/`). Файловый набор — стандартный (`Component.tsx`, `component.module.css`, `Component.stories.tsx`, `Component.docs.tsx`, `Component.test.tsx`, `index.ts`).

`Link.tsx` рендерит один из двух корневых тегов в зависимости от `href` — без полиморфизма через `as`/`asChild` (упрощение API, см. research §B). Внутри — слоты `startIcon`/`endIcon` (`<span aria-hidden>` с CSS `width: 1em; height: 1em; color: currentColor`).

`link.module.css` содержит:

- `.root` — базовые правила inline-typography (`display: inline-flex`, `align-items: baseline`, наследование шрифта, базовое подчёркивание `text-decoration: underline; text-decoration-color: currentColor; text-decoration-thickness: from-font; text-underline-offset: from-font;`, focus-visible через `outline`).
- `.variantDefault` / `.variantSecondary` / `.variantDanger` — назначение `color` по соответствующим токенам.
- `.disabled` — переопределяет цвет на `--content-disabled`, убирает подчёркивание, ставит `cursor: not-allowed`, `pointer-events: none`.
- `.iconStart` / `.iconEnd` — слоты иконок c шириной/высотой `1em`.

`Link.stories.tsx` содержит:

- `Default`, `Secondary`, `Danger`, `InParagraph`, `InHeading`, `WithStartIcon`, `WithEndIcon`, `Disabled`, `AsButton` (без `href`).

`Link.docs.tsx` собирает страницу по шаблону остальных компонентов: кнопки `Figma`/`GitHub`, короткое описание (1–2 фразы — главная функция), разделы `Подключение в проекте`, `Пропсы` (`CollapsiblePropsList`), `Варианты`, `Состояния`, `Иконки`. Разделов «Доступность» и «Адаптивность» нет.

## Phase 0: Research

См. [research.md](./research.md):

- **A.** Корневой элемент: `<a>` при `href`, `<button type="button">` без `href`.
- **B.** Отказ от `as`/`asChild` API.
- **C.** Шрифт и размер: наследование через `font: inherit` (без явного `font-family`/`font-size` в `.root`).
- **D.** Цвета вариантов: `--content-brand` / `--content-primary` / `--content-error`. Hover-токенов для контента в проекте нет — индикация через `text-decoration`.
- **E.** Подчёркивание и индикация состояний: `default`/`focus-visible` — подчёркнут; `hover` — без подчёркивания; `active` — подчёркивание с увеличенной `text-decoration-thickness`; `disabled` — без подчёркивания.
- **F.** Focus ring: `outline: 2px solid currentColor; outline-offset: 2px; border-radius: var(--rounds-s)` через `box-shadow` (или `outline`). Без новых токенов.
- **G.** Disabled на `<a>`: рендерим `<a>` без `href` + `aria-disabled="true"` + `tabIndex={-1}`. На `<button>` — нативный `disabled`.
- **H.** Иконки: `width: 1em; height: 1em; color: currentColor`. Иконка передаётся как `ReactNode`; пользователь подаёт `<Icon name=… size="100%" />` или произвольный SVG. Внутри `Link` рендерим `<span class="iconStart|iconEnd">{icon}</span>`.
- **I.** Безопасный `rel` при `target="_blank"`: автодобавление `noopener noreferrer`, если пользователь не задал `rel`.
- **J.** Размер `Link` — НЕ проп; всегда наследование из контекста. Если потребитель хочет «увеличить ссылку» — оборачивает в `<span style={{ fontSize: … }}>` или ставит на `Typography`-блок с нужным размером. Это сознательное упрощение API.
- **K.** Расположение в Storybook: `Components → Link` после `IconButton`. В `storySort.order` — позиция между `IconButton` и `Input`.
- **L.** Версионирование: MINOR (только аддитивные изменения).

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — сущности `Link`, `Variant`, `State`, `IconSlot`; формальные значения цветов/подчёркивания/курсора по состояниям; связь корневого тега с пропами.
- [contracts/link.md](./contracts/link.md) — публичный API (`LinkProps`, `LinkVariant`), типы, поведение, edge cases.
- [quickstart.md](./quickstart.md) — минимальные примеры: внутри `<p>`, внутри `<h2>`, как кнопка-ссылка без `href`, с иконками, в трёх вариантах, `disabled`.

После записи: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Никаких отступлений от конституции и спецификации; таблица не заполняется.

| Изменение | Обоснование | Простая альтернатива и почему отклонена |
|-----------|-------------|-----------------------------------------|
| (не требуется) | — | — |

## Constitution Check (post Phase 1)

После фиксации контрактов и data-model: принципы I–X — **PASS**.

- Все визуальные значения берутся из существующих токенов; новых токенов не добавлено.
- API минимален: `href`, `onClick`, `target`, `rel`, `variant`, `disabled`, `startIcon`, `endIcon` (+ нативные атрибуты соответствующего тега через rest).
- Нет breaking changes у других компонентов.
- Документация по шаблону проекта, без разделов «Доступность» и «Адаптивность» по требованию пользователя.
- Один новый публичный entry (`turbo-ui/link`), реэкспорт из root.
