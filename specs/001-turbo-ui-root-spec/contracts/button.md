# Contract: Button (Turbo UI)

Публичный API компонента Button. После стабилизации: стили в CSS на токенах, без inline styles для дизайна; a11y-атрибуты добавлены.

## Компонент

`Button` — кнопка с вариантами типа (primary, secondary, text, backless, success, danger, caution), состоянием (default, hover, disabled, loading) и размером (small, medium, large). Поддерживает иконки слева/справа и текст. Стили — только через классы и CSS-переменные из tokens.

## Props (актуально после стабилизации)

| Prop      | Type                    | Default     | Description |
|-----------|-------------------------|-------------|-------------|
| type      | `'button' \| 'submit' \| 'reset'` или *(deprecated)* вариант кнопки | `'button'`  | Нативный HTML type. **Deprecated:** если передано значение варианта (primary, secondary, …), трактуется как визуальный вариант — используйте `variant`. |
| variant   | `'primary' \| 'secondary' \| 'text' \| 'backless' \| 'success' \| 'danger' \| 'caution'` | `'primary'` | Визуальный вариант кнопки |
| state     | `'default' \| 'hover' \| 'disabled' \| 'loading'`   | `'default'` | Состояние |
| size      | `'small' \| 'medium' \| 'large'`                    | `'medium'`  | Размер |
| startIcon | ReactNode \| null        | —           | Слот слева: undefined = иконка play, null = скрыть, ReactNode = своя иконка |
| endIcon   | ReactNode \| null        | —           | Слот справа: undefined = иконка play, null = скрыть, ReactNode = своя иконка |
| text      | boolean                 | `true`      | Показывать текст (children) |
| children  | ReactNode               | `'Button'`  | Текст кнопки |
| onClick   | React.MouseEventHandler<HTMLButtonElement> | — | Обработчик клика |
| className | string                  | —           | Дополнительные CSS-классы |

Все остальные нативные атрибуты `<button>` поддерживаются и пробрасываются на DOM-элемент: `id`, `data-*` (в т.ч. `data-testid`), `aria-label`, `aria-describedby`, `autoFocus`, `tabIndex`, `form`, `name`, `value`, `title`, `style` и т.д. — их можно передавать в `<Button ... />`, они попадут на внутренний `<button>`. Компонент также поддерживает `ref` через `forwardRef` для доступа к DOM-элементу (фокус, измерение, тесты).

## Поведение

- Состояние `disabled` и `loading` отключают кнопку (disabled + визуал).
- Hover выводится из состояния по умолчанию, если не передан контролируемый `state`.
- Все визуальные значения (цвета, отступы, размеры шрифтов, radius) берутся из design tokens (tokens.json / tokens.ts). После стабилизации — без inline styles; стили в CSS на основе токенов.

## Accessibility

- Фокус по Tab (нативный button).
- При disabled/loading: атрибут disabled, aria-disabled, визуальное отключение.
- При state="loading": aria-busy="true".
- При только иконке (без текста) рекомендуется передавать aria-label.

## CSS variables used (Button)

Кнопка использует только CSS-переменные из темы. Чтобы переопределить внешний вид в своей обёртке (например, `.turbo-ui-scope`), задайте эти переменные:

**Размеры и отступы:**  
`--button-border-radius`, `--button-transition`, `--button-gap`, `--button-gap-empty`,  
`--button-small-height`, `--button-small-padding-x`, `--button-small-padding-y`, `--button-small-font-size`, `--button-small-line-height`,  
`--button-medium-height`, `--button-medium-padding-x`, `--button-medium-padding-y`, `--button-medium-font-size`, `--button-medium-line-height`,  
`--button-large-height`, `--button-large-padding-x`, `--button-large-padding-y`, `--button-large-font-size`, `--button-large-line-height`.

**Типографика:**  
`--family-brand`, `--weight-regular`, `--typescale-lable-large-tracking`.

**Типы кнопок (цвета и границы):**  
`--surface-primary-invert-main`, `--surface-primary-invert-hover`, `--surface-primary-invert-disabled`,  
`--surface-primary-main`, `--surface-primary-hover`, `--surface-secondary-disabled`, `--surface-primary-disabled`,  
`--surface-success-main`, `--surface-success-hover`, `--surface-error-main`, `--surface-error-hover`,  
`--surface-caution-main`, `--surface-caution-hover`,  
`--content-invert`, `--content-primary`, `--content-disabled`, `--content-success`, `--content-error`, `--content-caution`,  
`--border-secondary`, `--border-disabled`.

## Иконки

По умолчанию кнопка показывает встроенные иконки Turbo UI (play, loading). Чтобы использовать свои иконки и не зависеть от дизайн-системы библиотеки:

- Передайте кастомные узлы в `startIcon` и/или `endIcon`.
- Чтобы скрыть слот: `startIcon={null}` или `endIcon={null}`.

Пример: `<Button startIcon={<MyIcon />} endIcon={null}>Текст</Button>` — слева своя иконка, справа ничего.

## Версионирование

- Изменения, ломающие существующие пропсы или поведение по умолчанию — MAJOR.
- Новые опциональные props или варианты type/size — MINOR.
- Исправления и внутренние улучшения без смены API — PATCH.
