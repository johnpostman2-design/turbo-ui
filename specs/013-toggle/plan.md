# Implementation Plan: Toggle (switch)

**Branch**: `013-toggle` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-toggle/spec.md`

## Summary

`Toggle` — компонент-переключатель вкл/выкл. Реализация — нативный `<input type="checkbox" role="switch">` внутри `<label>`, по образцу `Checkbox`. Три размера (`small` / `medium` / `large`), два визуальных состояния (Off/On) и одно поведенческое (Disabled). Без отдельного hover-стиля у трека/knob (только `:focus-visible`). Опциональные подписи слева/справа (`startText` / `endText`). Все цвета — токены `--content-*` / `--surface-*`; шрифт — `ONY One` через `--family-brand`. Размеры трека/knob — фиксированные px по макету (CSS-механика компонента, не «дизайн-значения»). Релиз — MINOR (новый компонент, новый entry, новая запись в `storySort.order`, breaking changes нет).

## Technical Context

**Language/Version**: TypeScript 5.x / ESM, React 18  
**Primary Dependencies**: `clsx` (обязательная зависимость, уже в проекте), CSS Modules; токены — `src/tokens/tokens.json` + `src/styles/theme-vars.css`; шрифт — `ONY One` через `--family-brand`  
**Storage**: N/A — UI-компонент без хранения  
**Testing**: Vitest + `@testing-library/react`; Storybook 8 stories для визуальной валидации  
**Target Platform**: Browser (современные Chrome/Firefox/Safari/Edge), Node 18+ (для сборки)  
**Project Type**: Component library (`turbo-ui`) — публикуется как npm-пакет, потребляется React-приложениями  
**Performance Goals**:
- Bundle `dist/ui/toggle.js` (gzip) — ≤ 2 KB (см. SC-005).
- Анимация — CSS `transition` ~150 ms на `background-color` и `transform`; без JS-анимации, 60 fps.
**Constraints**:
- Только токены из `tokens.json` + шрифт `ONY One`. Никаких hex/rgb в `.tsx`/`.css`.
- Без блоков «Доступность» / «Адаптивность» в spec/docs (см. требование пользователя). Минимум семантики — нативный `<input role="switch">`.
- Без отдельной hover-индикации (см. FR-008).
**Scale/Scope**:
- Один новый компонент `Toggle` + CSS Module + index/тесты/stories/docs.
- 1 новая запись `exports` в `package.json`, 1 новый entry в `vite.config.lib.js`, 1 shim в `scripts/copy-styles.cjs`, 1 пункт `'Toggle'` в `storySort.order`, 1 запись в `CHANGELOG.md`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Принцип | Проверка | Статус |
|---------|----------|--------|
| I. Single Source of Truth (tokens.json) | Все цвета берутся через CSS-переменные, источник — `tokens.json` → `theme-vars.css`. Новые токены при необходимости добавляются в `tokens.json`, не в код. | ✅ |
| II. Запрет hardcoded значений | Цвета — только токены. Размеры трека/knob (24×16, 40×24, 44×28, padding 2 px) — CSS-механика (геометрия компонента), не «дизайн-значения» уровня цвета/типографики; зафиксировано в research.md и в Assumptions спеки. | ✅ |
| III. Component-first архитектура | Toggle — отдельный компонент в `src/ui/toggle/`. Не «div со стилями». | ✅ |
| IV. Только существующие компоненты | Изнутри Toggle использует только токены/CSS Modules; никаких сторонних UI-компонентов. | ✅ |
| V. Figma как reference, не источник кода | Реализация на токенах, не Tailwind/inline-стилях из Figma-плагина. | ✅ |
| VI. Минималистичная API-архитектура | Пропы: `size`, `checked`, `defaultChecked`, `onChange`, `disabled`, `startText`, `endText`, `className`, `ref` + native input attrs. Минимум, без дублирующих способов одного результата. | ✅ |
| VII. Чистота production-кода | Никаких отладочных блоков; ARIA — только то, что нужно (`role="switch"`, ничего лишнего). | ✅ |
| VIII. Контроль производительности | Bundle ≤ 2 KB (gzip). Анимация — CSS transition, без JS-анимаций. Нет тяжёлых зависимостей. | ✅ |
| IX. Расширение системы | Документация в Storybook (по проектному шаблону), запись в CHANGELOG, типы экспортируются. | ✅ |
| X. Versioning | MINOR-релиз: компонент новый, breaking changes нет; запись `0.3.0` (или текущий MINOR Unreleased). | ✅ |

**Initial gate**: PASS. Никаких отклонений от конституции, Complexity Tracking не требуется.

## Project Structure

### Documentation (this feature)

```text
specs/013-toggle/
├── plan.md              # этот файл
├── research.md          # технические решения
├── data-model.md        # entity Toggle, состояния, поля
├── quickstart.md        # минимальные примеры использования
├── contracts/
│   └── toggle.md        # публичный API (props, behavior, edge cases)
├── checklists/
│   └── requirements.md  # quality-чеклист (создан /speckit.specify)
└── tasks.md             # будет создан /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   └── toggle/                     # новый каталог
│       ├── Toggle.tsx              # компонент (forwardRef, native <input role="switch">)
│       ├── toggle.module.css       # CSS Module: трек, knob, состояния, размеры
│       ├── index.ts                # реэкспорты
│       ├── Toggle.test.tsx         # vitest + RTL (≥ 8 тестов)
│       ├── Toggle.stories.tsx      # Storybook stories (≥ 6 stories)
│       └── Toggle.docs.tsx         # Docs-страница по проектному шаблону
├── styles/
│   └── theme-vars.css              # если потребуются новые токены — расширяется здесь
└── tokens/
    └── tokens.json                 # если потребуются новые токены — добавляются сюда

# Конфигурация и реэкспорты
src/index.ts                        # + export { Toggle } from './ui/toggle'
package.json                        # + exports './toggle'
vite.config.lib.js                  # + entry 'ui/toggle' + dts.include
scripts/copy-styles.cjs             # + shim dist/ui/toggle.d.ts
.storybook/preview.js               # + 'Toggle' в storySort.order (между 'Link' и 'Input')
CHANGELOG.md                        # + запись в Unreleased > Added
```

**Structure Decision**: Component library — стандартная структура `src/ui/<component>/` с парой `Component.tsx` + `component.module.css` + `index.ts` + тесты + Storybook. По образцу `Checkbox`, `Link` и других компонентов проекта.

## Phase 0: Research → `research.md`

Краткие тезисы (полные обоснования см. `research.md`):

1. **Корневая разметка** — `<label>` с вложенным `<input type="checkbox" role="switch">`. Альтернативы (отдельный `<button role="switch">`, кастомная разметка с ручным `onKeyDown`) отклонены: нативный input даёт Space/click/form-submit/`name`/`value` без ручной обработки и упрощает интеграцию с формами.
2. **Сетка размеров** — фиксированные px по макету:
   - small: track 24×16, knob 12×12, padding 2 px, gap 8 px между текстом и треком, шрифт `label/small`.
   - medium: track 40×24, knob 20×20, padding 2 px, gap 8 px, шрифт `label/medium`.
   - large: track 44×28, knob 24×24, padding 2 px, gap 12 px, шрифт `label/large`.
   - Все числа — CSS-механика (геометрия), не «дизайн-значения» (которые подлежат токенам). Это согласовано с конституцией принципом II.
3. **Цвета и токены**:
   - Off track → `var(--content-tertiary)` (~rgba 0.32).
   - On track → `var(--content-primary)` (#000).
   - Knob (off/on) → `var(--surface-primary-main)` (#fff).
   - Disabled (track, knob, текст) → `var(--content-disabled)` (~rgba 0.08).
   - Текст подписи → `var(--content-primary)`; в disabled — `var(--content-disabled)`.
   - Все 4 токена уже существуют в `tokens.json`. **Новые токены не вводятся**.
4. **Тень knob** (из Figma: `rgba(0,0,0,0.08) 0 4px 12px`) — на MVP **не применяется**. Причина: в `tokens.json` нет токена `--shadow-*` для этого случая; ввод нового токена без согласованного дизайн-решения нарушает принцип «минимальный набор токенов». Решение зафиксировано — добавление тени возможно отдельной задачей после согласования.
5. **Анимация** — CSS `transition: background-color 0.15s ease, transform 0.15s ease`. Без введения нового токена `--motion-*` на MVP — фиксированное значение `0.15s ease` (CSS-механика, не дизайн-значение цвета/типографики). Если в проекте появятся motion-токены — заменяем.
6. **Focus ring** — `:focus-visible` от нативного input, отрисовываем рамку на трек: `outline: 2px solid var(--content-primary); outline-offset: 2px;`. По образцу `Checkbox` (`field:has(.native:focus-visible)`). НЕ ховер: фокус-ринг видим только при клавиатурной навигации.
7. **`disabled`** — нативный атрибут `disabled` на `<input>`. CSS: трек/knob/подпись — `var(--content-disabled)`, `cursor: not-allowed`. Браузер сам исключает из Tab, не вызывает `change`.
8. **Подписи `startText` / `endText`** — типографика по `size` через `--typescale-lable-{small,medium,large}-*`. Цвет — `var(--content-primary)` / `var(--content-disabled)`. Клик по подписи переключает значение (нативная семантика `<label>` с вложенным input).
9. **Storybook расположение** — `Components → Toggle` ровно между `Link` и `Input` в `storySort.order`. Образно — рядом с `Checkbox`/`Radio` (по природе формы), но по правилам существующего порядка ближе к `Link`/`Input`.
10. **Тестирование** — vitest + `@testing-library/react`. ≥ 8 тестов по SC-006.
11. **Версионирование** — MINOR; запись в `CHANGELOG.md` в `Unreleased > Added`.

## Phase 1: Design & Contracts

### Entities → `data-model.md`

`Toggle` (компонент) с полями `size`, `checked`/`defaultChecked`, `disabled`, `startText`, `endText`, `onChange`, `name`, `value`, `id`, `className`, `style`, `ref`. Производные:

- `isControlled = checked !== undefined`
- `currentChecked = isControlled ? checked : uncontrolledState`
- `Track-color = (disabled) ? --content-disabled : (currentChecked ? --content-primary : --content-tertiary)`
- `Knob-color = (disabled) ? --content-disabled : --surface-primary-main`
- `Knob-position = padding + (currentChecked ? track.width - knob.width - 2*padding : 0)`

State diagram (mermaid) — см. data-model.md.

### Contracts → `contracts/toggle.md`

Публичный API:

```ts
export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  size?: ToggleSize;          // 'medium' по умолчанию
  disabled?: boolean;         // false
  checked?: boolean;          // controlled
  defaultChecked?: boolean;   // uncontrolled
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startText?: React.ReactNode;
  endText?: React.ReactNode;
  className?: string;
}

export const Toggle: React.ForwardRefExoticComponent<
  ToggleProps & React.RefAttributes<HTMLInputElement>
>;
```

Импорты:

```ts
import { Toggle, type ToggleProps, type ToggleSize } from 'turbo-ui/toggle';
// или
import { Toggle, type ToggleProps, type ToggleSize } from 'turbo-ui';
```

Полный контракт (props, behavior, edge cases, state matrix) — см. `contracts/toggle.md`.

### Quickstart → `quickstart.md`

Минимальные примеры:

```tsx
<Toggle defaultChecked startText="Уведомления" />
<Toggle checked={value} onChange={(e) => setValue(e.target.checked)} />
<Toggle size="small" endText="Тёмная тема" />
<Toggle disabled defaultChecked startText="Двухфакторная аутентификация" />
```

Полный quickstart — см. `quickstart.md`.

### Agent context update

После записи plan.md запустим `.specify/scripts/bash/update-agent-context.sh copilot` для обновления `.github/agents/copilot-instructions.md`.

## Re-check Constitution after Phase 1

| Принцип | После дизайна | Статус |
|---------|---------------|--------|
| I. SSoT (tokens) | Никаких новых токенов не вводится; используются только существующие `--content-*`/`--surface-*`/`--typescale-*`. | ✅ |
| II. Hardcoded | Геометрия трека/knob (24×16 / 40×24 / 44×28 / padding 2 / gap 8/12) и анимация (`0.15s ease`) — CSS-механика; фиксированные дизайн-значения отсутствуют. | ✅ |
| III. Component-first | Один компонент, один CSS Module, один index. | ✅ |
| IV. Existing only | Никаких новых внешних UI-компонентов. | ✅ |
| V. Figma reference | Реализация — на токенах; Tailwind-классы из Figma-плагина не попадают в код. | ✅ |
| VI. Minimal API | 8 пропов + native input attrs. Не дублируются способы достижения одного результата. | ✅ |
| VII. Clean code | Никаких debug-блоков. | ✅ |
| VIII. Performance | Bundle ≤ 2 KB gzip; CSS-only анимация. | ✅ |
| IX. Расширение | Storybook + Docs + CHANGELOG. | ✅ |
| X. Versioning | MINOR. | ✅ |

**Post-design gate**: PASS. Complexity Tracking не требуется.

## Complexity Tracking

Не требуется — все Constitution Check gates пройдены без отклонений.

## Implementation strategy

Один компонент, четыре фазы (см. tasks.md, который будет создан `/speckit.tasks`):

1. **Setup** — каталог `src/ui/toggle/`, exports, entry, shim, `storySort.order`.
2. **US1 (MVP)** — базовый Toggle (off/on, `medium`, controlled+uncontrolled, click+keyboard, ref).
3. **US2** — размеры small/medium/large + типографика подписи.
4. **US3** — `startText` / `endText`.
5. **US4** — `disabled`.
6. **US5** — Storybook stories + Docs page (без блоков «Доступность»/«Адаптивность»).
7. **Polish** — CHANGELOG, build, типы, аудит на hardcoded.

## Cross-references

- spec.md — what & why
- research.md — decisions & rationale
- data-model.md — entity, state machine, derived fields
- contracts/toggle.md — public API
- quickstart.md — practical examples
- tasks.md — actionable implementation plan (создаётся `/speckit.tasks`)
