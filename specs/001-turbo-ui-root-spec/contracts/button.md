# Contract: Button (Turbo UI)

Публичный API компонента Button. После стабилизации: стили в CSS на токенах, без inline styles для дизайна; a11y-атрибуты добавлены.

## Компонент

`Button` — кнопка с вариантами типа (primary, secondary, text, backless, success, danger, caution), состоянием (default, hover, disabled, loading) и размером (small, medium, large). Поддерживает иконки слева/справа и текст. Стили — только через классы и CSS-переменные из tokens.

## Props (актуально после стабилизации)

| Prop      | Type                    | Default     | Description |
|-----------|-------------------------|-------------|-------------|
| type      | `'primary' \| 'secondary' \| 'text' \| 'backless' \| 'success' \| 'danger' \| 'caution'` | `'primary'` | Визуальный вариант кнопки (success/danger/caution — семантические по Figma) |
| state     | `'default' \| 'hover' \| 'disabled' \| 'loading'`   | `'default'` | Контролируемое состояние (hover обычно выводится из UX) |
| size      | `'small' \| 'medium' \| 'large'`                    | `'medium'`  | Размер (высота, padding, типографика из tokens) |
| iconL     | boolean                 | `true`      | Показывать иконку слева |
| iconR     | boolean                 | `true`      | Показывать иконку справа |
| text      | boolean                 | `true`      | Показывать текст (children) |
| iconL2    | ReactNode \| null        | `null`      | Кастомная иконка слева (переопределяет дефолтную) |
| iconR2    | ReactNode \| null        | `null`      | Кастомная иконка справа |
| children  | ReactNode               | `'Button'`  | Текст кнопки |
| onClick   | () => void              | —           | Обработчик клика |
| className | string                  | —           | Дополнительные CSS-классы |

## Поведение

- Состояние `disabled` и `loading` отключают кнопку (disabled + визуал).
- Hover выводится из состояния по умолчанию, если не передан контролируемый `state`.
- Все визуальные значения (цвета, отступы, размеры шрифтов, radius) берутся из design tokens (tokens.json / tokens.ts). После стабилизации — без inline styles; стили в CSS на основе токенов.

## Accessibility

- Фокус по Tab (нативный button).
- При disabled/loading: атрибут disabled, aria-disabled, визуальное отключение.
- При state="loading": aria-busy="true".
- При только иконке (без текста) рекомендуется передавать aria-label.

## Версионирование

- Изменения, ломающие существующие пропсы или поведение по умолчанию — MAJOR.
- Новые опциональные props или варианты type/size — MINOR.
- Исправления и внутренние улучшения без смены API — PATCH.
