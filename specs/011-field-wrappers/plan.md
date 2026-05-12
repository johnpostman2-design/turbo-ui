# Implementation Plan: SelectField, ComboBoxField, TextAreaField

**Branch**: `011-field-wrappers` | **Date**: 2026-05-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/011-field-wrappers/spec.md`

## Summary

Добавить три публичных компонента-обёртки: **`SelectField`**, **`ComboBoxField`**, **`TextAreaField`** — над существующими `Select`, `ComboBox`, `TextArea`. Все три повторяют контракт `InputField` (label сверху + helper/error снизу): пропы `label`, `helperText`, `errorText` с тем же приоритетом, фиксированная высота helper-слота (одна строка caption), доступная связь подпись↔поле, объединение пользовательского `aria-describedby` с id helper/error. Принцип у обёрток единый: базовый компонент — это «голое» поле, а helper-блок строит только обёртка. Поэтому в рамках этой фичи **`TextArea` теряет встроенные `helperText`/`errorText` и helper-слот** (breaking change для TextArea), а `Select` получает аддитивный проп `triggerId` для связи label↔`<button>`. Стили — только токены `tokens.json` и шрифт **ONY One**; новых токенов не добавляем. Публичные экспорты — root + три новых entry-подпути (`turbo-ui/select-field`, `turbo-ui/combobox-field`, `turbo-ui/textarea-field`). Storybook — три новые страницы по шаблону Button. Тесты — vitest, по паттерну `InputField.test.tsx`. Решения и компромиссы — [research.md](./research.md); сущности — [data-model.md](./data-model.md); публичные API — [contracts/](./contracts/); минимальные примеры — [quickstart.md](./quickstart.md).

## Technical Context

**Language/Version**: TypeScript / ESM, React 18
**Primary Dependencies**: React, `clsx`, существующие компоненты `Select`, `ComboBox`, `TextArea`, `InputField` (как референс); design tokens (`tokens.json` → `theme-vars.css`); CSS Modules
**Storage**: N/A
**Testing**: Vitest (паттерн `InputField.test.tsx`), Storybook (матрицы состояний по образцу InputField)
**Target Platform**: браузер; потребление через `turbo-ui` (root) и подпути `turbo-ui/select-field`, `turbo-ui/combobox-field`, `turbo-ui/textarea-field`
**Project Type**: component library (Turbo UI)
**Performance Goals**: чистые функциональные компоненты, без новых runtime-зависимостей; нулевая регрессия по bundle (новый код добавляется в отдельные entry, не влияет на размер существующих чанков `select`/`combobox`/`textarea`)
**Constraints**: только токены и переменные темы; шрифт **ONY One** во всех состояниях; никаких hardcoded цветов/отступов/размеров; API базовых компонентов не меняется breaking-образом (только аддитивно — см. research)
**Scale/Scope**: три новых публичных компонента; имена пропов и поведение helper/error — 1:1 с `InputField`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Принцип | Статус | Notes |
|---------|--------|-------|
| I. Single Source of Truth (tokens.json) | PASS | Используются уже существующие токены (`--typescale-lable-small-*`, `--typescale-caption-medium-*`, `--content-*`, `--spacing-8`). Новых токенов нет |
| II. Запрет hardcoded | PASS | Только токены и переменные темы; шрифт ONY One через `--family-brand`/`--typescale-*` |
| III. Component-first | PASS | Каждая обёртка — отдельный компонент; внутри только композиция готовых |
| IV. Только существующие компоненты | PASS | Внутри — `Select` / `ComboBox` / `TextArea`; `<label>` и helper-разметка идентичны `InputField` |
| V. Figma как reference | PASS | Визуал label/helper уже зафиксирован в `InputField` — повторяем 1:1 для остальных полей |
| VI. Минималистичный API | PASS | Только `label` / `helperText` / `errorText`, остальное — проброс пропов базового компонента; новых способов нет |
| VII. Чистота production | PASS | Без debug/комментариев-заглушек |
| VIII. Контроль производительности | PASS | Нет новых рантайм-зависимостей; код функциональный, без эффектов вне `useId` |
| IX. Расширение системы | PASS | Документация в Storybook (docs+stories) и публичные entry в `package.json`/`vite.config.lib.js` |
| X. Versioning | PASS | Три новых компонента и `Select.triggerId` — аддитивные. Удаление `TextArea.helperText`/`errorText` — breaking change для `TextArea`; релиз — MAJOR (или MINOR в pre-1.0). Внешних использований этих пропов в репозитории нет |

**Result**: PASS. Аддитивные расширения (`Select.triggerId`, три новых компонента) не ломают существующий API. Удаление встроенного helper из `TextArea` оформляется как сознательный breaking change, чтобы у всех `*Field`-обёрток был единый принцип построения helper-блока.

## Project Structure

### Documentation (this feature)

```text
specs/011-field-wrappers/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── select-field.md
│   ├── combobox-field.md
│   └── textarea-field.md
├── checklists/
│   └── requirements.md
└── tasks.md            # /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/
│   ├── select-field/
│   │   ├── SelectField.tsx
│   │   ├── select-field.module.css            # переиспользуем стили InputField через общий CSS Module-файл по образцу
│   │   ├── SelectField.stories.tsx
│   │   ├── SelectField.docs.tsx
│   │   ├── SelectField.test.tsx
│   │   └── index.ts
│   ├── combobox-field/
│   │   ├── ComboBoxField.tsx
│   │   ├── combobox-field.module.css
│   │   ├── ComboBoxField.stories.tsx
│   │   ├── ComboBoxField.docs.tsx
│   │   ├── ComboBoxField.test.tsx
│   │   └── index.ts
│   ├── textarea-field/
│   │   ├── TextAreaField.tsx
│   │   ├── textarea-field.module.css
│   │   ├── TextAreaField.stories.tsx
│   │   ├── TextAreaField.docs.tsx
│   │   ├── TextAreaField.test.tsx
│   │   └── index.ts
│   ├── select/
│   │   └── Select.tsx                         # +аддитивный triggerId?: string (см. research §A)
│   └── textarea/
│       ├── TextArea.tsx                       # − helperText / errorText / встроенный helperSlot (см. research §B)
│       ├── textarea.module.css                # − классы .helperSlot/.helper/.helperError/.helperInvisible
│       ├── TextArea.stories.tsx               # − stories с helperText/errorText
│       ├── TextArea.docs.tsx                  # − блок документации helper-слота
│       └── TextArea.test.tsx                  # − тесты helperText/errorText
src/index.ts                                   # реэкспорт *Field + типов
package.json                                   # exports: "./select-field", "./combobox-field", "./textarea-field"
vite.config.lib.js                             # entry select-field/combobox-field/textarea-field + dts include
scripts/copy-styles.cjs                        # shim-d.ts для подпутей
.storybook/preview.js                          # .select-field-docs-menu, .combobox-field-docs-menu, .textarea-field-docs-menu (если потребуется)
```

**Structure Decision**: один каталог на компонент в `src/ui/`, по образцу `input-field/`. Внутри каждого `*Field`:

- Корень-обёртка `<div>` с label (опционально) и `<div>` helper-слот фиксированной высоты.
- Внутри обёртки рендерится соответствующий базовый компонент (`Select`/`ComboBox`/`TextArea`) с проброшенными пропами, плюс `aria-describedby` (склейкой пользовательского значения и id helper/error).

Стили helper-разметки идентичны `InputField` — отдельные CSS Module-файлы со ссылками на одни и те же токены. Дублирующий CSS — оправдан изоляцией (`*.module.css` локальные), а не разделение CSS на общий файл (отдельная утилитарная зависимость избыточна для трёх блоков по 30–40 строк CSS).

## Phase 0: Research

См. [research.md](./research.md):

- **A.** Связь label↔триггер в `SelectField`: триггер `Select` — `<button>`. Стандартный паттерн `<label htmlFor>` требует `id` именно на кнопке. Решение — аддитивный проп `Select.triggerId?: string`; если задан, ставится на `<button>` (дополнительно к корневому `id` — на корень-обёртку). По умолчанию ничего не меняется.
- **B.** Единый принцип helper-блока у всех `*Field`-обёрток. Сейчас `TextArea` рендерит собственный helper-слот фиксированной высоты, даже без `helperText`/`errorText`. Это нарушает принцип «базовый компонент — голое поле, helper строит только обёртка». Решение — удалить из `TextArea` пропы `helperText`, `errorText` и встроенный helper-слот (включая невидимый резерв высоты). После этого все три обёртки строят helper одинаково — собственной разметкой по образцу `InputField`.
- **C.** Связь label↔поле в `ComboBoxField` и `TextAreaField`: и `ComboBox`, и `TextArea` уже ставят `id` на сам `<input>`/`<textarea>` — стандартный `htmlFor` работает.
- **D.** `aria-describedby`: реализация совпадает с `InputField` — пользовательский `aria-describedby` и id helper/error объединяются через пробел.
- **E.** Приоритет `disabled` над `error`: `disabled` отключает `aria-invalid` (включая `errorText`), визуально поле/подпись/helper в стиле disabled. Совпадает с `InputField`.
- **F.** Размеры и ширина: корневая обёртка имеет `width: 100%`, `min-width: 120px`, `box-sizing: border-box` (как `InputField`). Базовые компоненты получают свои размеры через `size`.
- **G.** Дублирование CSS: новые модули CSS повторяют ~40 строк из `input-field.module.css`. Решено дублировать (изоляция модулей, читаемость), а не вводить общий файл/util. Если в будущем появится 5-й `*Field`, можно вынести в общий util — отдельная задача.
- **H.** Breaking-зона удаления helper из `TextArea`: в репозитории нет внешних использований `helperText`/`errorText` у `TextArea` (только собственные stories/docs/tests, которые правятся в этой же фиче). Внешние пользователи библиотеки должны мигрировать на `TextAreaField`.

## Phase 1: Design & Contracts

- [data-model.md](./data-model.md) — сущности `FieldWrapper` (общая структура), `Label`, `HelperSlot`, отображение состояний и связей.
- [contracts/select-field.md](./contracts/select-field.md), [contracts/combobox-field.md](./contracts/combobox-field.md), [contracts/textarea-field.md](./contracts/textarea-field.md) — публичные API: пропы, типы, поведение, accessibility.
- [quickstart.md](./quickstart.md) — импорт и минимальные примеры (default, helperText, errorText, disabled, size).

После записи: `.specify/scripts/bash/update-agent-context.sh copilot`.

## Complexity Tracking

Удаление встроенного helper из `TextArea` — единственный breaking change. Обоснование — единый принцип построения helper у всех `*Field`-обёрток (без него `TextAreaField` пришлось бы либо мириться с двойным helper-слотом, либо обходить внутреннюю разметку TextArea CSS-перекрытиями). См. research §B и §H.

| Изменение | Обоснование | Простая альтернатива и почему отклонена |
|-----------|-------------|-----------------------------------------|
| Удаление `helperText`/`errorText`/helper-слота из `TextArea` | Единый принцип helper у всех `*Field`; снижение API-поверхности | (a) Аддитивный `noHelperSlot` — оставляет два способа делать helper, увеличивает API. (b) Скрывать встроенный helper CSS — хрупкая зависимость от внутренних селекторов |

## Constitution Check (post Phase 1)

После фиксации контрактов и data-model: принципы I–X — **PASS**.

- Все новые визуальные значения ссылаются на существующие токены (label — `--typescale-lable-small-*` + `--content-primary`/`--content-disabled`; helper/error — `--typescale-caption-medium-*` + `--content-tertiary`/`--content-error`/`--content-disabled`; gap между label/полем/helper — `--spacing-8`).
- `Select.triggerId` — аддитивный, обратносовместимый.
- Удаление `helperText`/`errorText`/helper-слота из `TextArea` — breaking change, оформлено явно (см. Complexity Tracking) и фиксируется как MAJOR-релиз.
- Новые публичные сущности (3 компонента + 3 entry-подпути + типы) задокументированы в Storybook (docs + stories) и в `contracts/`.
