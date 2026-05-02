# Contract: Radio (Turbo UI)

Публичный API компонента **Radio**. Стили: design tokens (`--radio-*`, семантические `--border-*`, `--content-*`, …) + CSS Modules.

## Компонент

Один пункт **взаимоисключающего** выбора. Размеры **`large`** | **`medium`** | **`small`**. Состояния: default, hover (кроме disabled), focus, disabled, invalid. Значение визуала: **выбран** | **не выбран**.

## Props (планируемые)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'large' \| 'medium' \| 'small'` | `'medium'` | Размер индикатора и типографики подписи по макету; геометрия из токенов `radio.sizes` |
| `disabled` | `boolean` | `false` | Блокировка выбора; hover не меняет внешний вид |
| `error` | `boolean` | `false` | Визуал ошибки (invalid) и `aria-invalid` |
| `checked` | `boolean` | — | Controlled: вариант выбран |
| `defaultChecked` | `boolean` | — | Uncontrolled: начальный выбор этого варианта |
| `name` | `string` | — | Имя группы (одинаковое для всех радио группы) |
| `value` | `string` | — | Значение варианта (для формы и `onChange`) |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Смена выбора |
| `id` | `string` | — | id нативного input |
| `label` | `React.ReactNode` | — | Подпись рядом с индикатором |
| `children` | `React.ReactNode` | — | Альтернатива `label` для содержимого рядом с контролом |
| `className` | `string` | — | Доп. класс на корневой элемент обёртки |
| `demoFocusRing` | `boolean` | `false` | Как у Checkbox: только для демо фокуса в Docs/Storybook |

Остальные подходящие атрибуты **`input[type=radio]`** (в т.ч. `aria-*`, `data-*`) — проброс на нативный input; **`ref`** — `forwardRef<HTMLInputElement>` на элемент input.

## Поведение

- Клик по визуальной области выбирает этот вариант (если не `disabled`); снятие выбора с другого варианта в группе обеспечивается браузером/родителем через общий `name` и controlled state.
- **Disabled**: не меняет групповое значение; визуал без hover-изменений.
- **Invalid**: визуал по макету; текст ошибки — снаружи.

## Accessibility

- Фокус видимый (`:focus-visible`), согласованный с Checkbox/Input.
- `aria-invalid` при `error`.
- Нативный `input[type=radio]` в DOM. Для группы в приложении рекомендуется `fieldset`/`legend` или `role="radiogroup"` (см. research / Storybook).

## CSS variables

Из `tokens.json` (секция `radio`), генерируются в `theme-vars.css`: `--radio-transition`, `--radio-{size}-*`, …

## Версионирование

- Breaking changes — MAJOR. Новые опциональные props — MINOR.
