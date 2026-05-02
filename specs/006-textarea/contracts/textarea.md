# Contract: TextArea (Turbo UI)

Публичный API компонента **TextArea**. Стили: design tokens (`--textarea-*`, семантические `--border-*`, `--content-*`, …) + CSS Modules.

Для полей с **внешней подписью** над областью используйте композицию: `<label>` + `TextArea` (или будущий `TextAreaField`, если появится отдельная спека).

## Компонент

Многострочное поле ввода; опциональный **helper** или **error** под полем. Размеры **`small`** | **`medium`**. Состояния визуала: default, hover, focus, filled, disabled, invalid. Поддержка controlled/uncontrolled.

## Props (планируемые)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium'` | `'medium'` | Размер по макету; отступы и min-height из токенов `textarea.sizes` |
| `disabled` | `boolean` | `false` | Отключение поля |
| `error` | `boolean` | `false` | Визуал ошибки и `aria-invalid` |
| `errorText` | `string` | — | Текст ошибки под полем; приоритет над `helperText` |
| `helperText` | `string` | — | Подсказка под полем; не показывается при непустом `errorText` |
| `className` | `string` | — | Доп. класс на корневой контейнер |
| `value` | `string` | — | Controlled |
| `defaultValue` | `string` | — | Uncontrolled начальное значение |
| `onChange` | `React.ChangeEventHandler<HTMLTextAreaElement>` | — | Изменение значения |
| `placeholder` | `string` | — | Placeholder |
| `rows` | `number` | — | Число видимых строк; при большем объёме текста — вертикальный скролл. Если не задано, минимальная высота — по токенам `size` |
| `width` | `CSS width` | — | Ширина блока с рамкой (корень): число (px), `'50%'`, `'12rem'` и т.д.; удобная альтернатива `style.width` |
| `maxWidth` | `CSS max-width` | — | Максимальная ширина блока с рамкой (корень) |

Остальные нативные атрибуты **`textarea`** (кроме конфликтующих с React/DOM, включая исключение коллизии с `size` если применимо) пробрасываются; **`ref`** — `forwardRef<HTMLTextAreaElement>`.

## Поведение

- **`rows`**: при передаче положительного числа высота определяется нативным атрибутом `rows` (видимые строки); при превышении по высоте включается прокрутка (`overflow: auto` на поле). Без `rows` сохраняется минимальная высота из токенов размера.
- **`width` / `maxWidth`**: задают ширину **корневого** контейнера (с рамкой), в том числе в **пикселях** и **процентах**; то же можно выразить через `style` (см. реализацию: часть стилей уходит на корень).
- Controlled / uncontrolled — как у стандартного textarea.
- При одновременных `helperText` и `errorText` для отображения под полем используется **errorText**.
- Зона под полем: фиксированная минимальная высота под одну строку helper/error — без скачков (как InputField).
- **Resize**: по умолчанию ограниченный режим (см. plan/research); при необходимости расширение через проп `resize` или `style` — уточнение в реализации без нарушения токенов.

## Accessibility

- При ошибке: `aria-invalid="true"` на textarea при наличии ошибки.
- `aria-describedby` на id блока helper или error.
- Текст ошибки с `role="alert"` или эквивалентная связь — согласовать с `InputField` для единообразия.

## CSS variables

Из `tokens.json` (секция `textarea`), генерируются в `theme-vars.css`: `--textarea-border-radius`, `--textarea-transition`, `--textarea-small-min-height`, `--textarea-small-padding-x`, … (аналогично medium).

## Версионирование

- Breaking changes — MAJOR. Новые опциональные props — MINOR. Внутренние правки — PATCH.
