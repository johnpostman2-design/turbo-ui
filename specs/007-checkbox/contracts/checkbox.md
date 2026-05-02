# Contract: Checkbox (Turbo UI)

Публичный API компонента **Checkbox**. Стили: design tokens (`--checkbox-*`, семантические `--border-*`, `--content-*`, …) + CSS Modules.

## Компонент

Флажок с тремя визуальными режимами значения: **включён**, **выключен**, **неопределён (indeterminate)**. Размеры **`large`** | **`medium`** | **`small`**. Состояния: default, hover, focus, disabled, invalid.

## Props (планируемые)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'large' \| 'medium' \| 'small'` | `'medium'` | Размер квадрата и графики по макету; геометрия из токенов `checkbox.sizes` |
| `disabled` | `boolean` | `false` | Блокировка переключения |
| `error` | `boolean` | `false` | Визуал ошибки (invalid) и `aria-invalid` |
| `checked` | `boolean` | — | Controlled: включён |
| `defaultChecked` | `boolean` | — | Uncontrolled: начальное включение |
| `indeterminate` | `boolean` | `false` | Неопределённость (частичный выбор); синхронизация с DOM `indeterminate` |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Смена значения |
| `id` | `string` | — | id нативного input |
| `name` | `string` | — | Имя для формы |
| `value` | `string` | — | Значение при отправке формы |
| `className` | `string` | — | Доп. класс на корневой элемент обёртки |

Остальные подходящие атрибуты **`input[type=checkbox]`** (в т.ч. `aria-*`, `data-*`) — проброс на нативный input; **`ref`** — `forwardRef<HTMLInputElement>` на элемент input.

Имена пропов (`error` vs `invalid`) финализировать в реализации; предпочтительно **`error`** для паритета с Input/TextArea.

## Поведение

- Клик по визуальной области переключает значение, если не `disabled`.
- **`indeterminate`**: при первом пользовательском действии браузер обычно снимает indeterminate; точное поведение при controlled-режиме — документировать в Storybook (пример «выбрать всех»).
- **Invalid**: визуал по макету; связь с текстом ошибки формы — снаружи компонента.

## Accessibility

- Фокус видимый по макету/токенам.
- `aria-invalid` при `error`.
- Нативный input остаётся в DOM для вспомогательных технологий.

## CSS variables

Из `tokens.json` (секция `checkbox`), генерируются в `theme-vars.css`: `--checkbox-transition`, `--checkbox-{size}-*`, …

## Версионирование

- Breaking changes — MAJOR. Новые опциональные props — MINOR.
