# Contract: IconButton (Turbo UI)

Публичный API. Стили: design tokens + CSS Modules. Макет: [Figma 602-3021](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=602-3021).

## Компонент

Кнопка только с иконкой. **variant**: primary | secondary. **size**: 16 | 24 | 32 px (контейнер и масштаб иконки). Обязательны `icon` (ReactNode) и `aria-label`. SVG внутри wrap масштабируется на 100% области.

## Props (актуально)

| Prop       | Type                                    | Default      | Description |
|------------|-----------------------------------------|--------------|-------------|
| variant    | `'primary' \| 'secondary'`              | `'primary'`  | Визуальный вариант |
| icon       | ReactNode                              | —            | Иконка (обязательно). SVG масштабируется под контейнер (см. getIconButtonSizeConfig). |
| size       | `'small' \| 'medium' \| 'large'`        | `'medium'`   | 16 / 24 / 32 px. |
| disabled   | boolean                                | `false`      | Блокировка кнопки. |
| type       | `'button' \| 'submit' \| 'reset'`       | `'button'`   | HTML type. |
| aria-label | string                                 | —            | Рекомендуется для a11y. |
| className  | string                                 | —            | Доп. классы. |
| onClick    | React.MouseEventHandler<HTMLButtonElement> | —         | Обработчик клика |

Все остальные нативные атрибуты `<button>` пробрасываются (id, data-*, tabIndex, ref через forwardRef и т.д.).

## Поведение

- SVG внутри .iconWrap масштабируется на 100% контейнера (width/height 100%, object-fit contain). Hover/disabled — CSS и токены.

## Accessibility

- Tab-фокус. Обязателен aria-label (или aria-labelledby). При disabled — атрибут disabled.

## CSS variables (IconButton)

**Размеры:** `--icon-button-*-size` (16/24/32 px). Контейнер: border-radius 50%. SVG в .iconWrap — 100% области.

**Цвета:** primary — `--content-primary`, hover, disabled. Secondary — `--content-secondary`, hover фон `--surface-primary-hover`.

## Версионирование

- Breaking changes API — MAJOR. Новые опциональные props — MINOR. Внутренние правки — PATCH.
