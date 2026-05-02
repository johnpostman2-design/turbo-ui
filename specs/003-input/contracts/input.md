# Contract: Input (Turbo UI)

Публичный API компонента Input. Стили: design tokens + CSS Modules. По образцу Button/IconButton.

Для поля формы с **внешней подписью** над областью ввода, helper/error под полем и вариантом label-out-primary используйте **`InputField`** (`import { InputField } from 'turbo-ui/input-field'`), см. спеку `specs/004-input-label-out-primary` и `contracts/input-field.md`.

Для **многострочного** ввода используйте **`TextArea`** (`import { TextArea } from 'turbo-ui/textarea'`), см. `specs/006-textarea` и `specs/006-textarea/contracts/textarea.md`.

## Компонент

Один компонент: опциональные label, поле ввода, helper/error текст, иконка слева, IconButton справа (только IconButton из библиотеки). Размеры small / medium / large. Состояния: default, hover, focus, filled, error, disabled. Controlled и uncontrolled; layout не прыгает при появлении helper/error.

## Props (актуально)

| Prop           | Type                                              | Default     | Description |
|----------------|---------------------------------------------------|-------------|-------------|
| label          | string                                            | —           | Подпись над полем; связь с input через htmlFor/id. |
| helperText     | string                                            | —           | Подсказка под полем; при наличии errorText не показывается. |
| errorText      | string                                            | —           | Текст ошибки под полем; приоритет над helperText; aria-invalid. |
| leftIcon       | ReactNode                                         | —           | Иконка слева внутри поля (напр. Icon). |
| endAdornment   | ReactNode                                         | —           | Только IconButton из Turbo UI; кликабелен; tabIndex=-1 (не в таб-порядке). |
| size           | `'small' \| 'medium' \| 'large'`                   | `'medium'`  | Размер поля; значения из токенов. |
| disabled       | boolean                                           | `false`     | Отключение поля и endAdornment. |
| error          | boolean                                           | `false`     | Визуал и aria-invalid; можно вместо или вместе с errorText. |
| type           | `'text' \| 'number' \| 'tel' \| 'search' \| 'time' \| 'date' \| 'email'` | `'text'` | Нативный type input. |
| value          | string (или по type)                              | —           | Controlled значение. |
| defaultValue   | string (или по type)                              | —           | Uncontrolled начальное значение. |
| onChange       | React.ChangeEventHandler<HTMLInputElement>        | —           | Обработчик изменения. |
| className      | string                                            | —           | Доп. классы на корневой контейнер. |

Все остальные нативные атрибуты `<input>` пробрасываются (id, name, placeholder, aria-*, data-*, ref через forwardRef и т.д.).

## Поведение

- Controlled: при переданном `value` компонент управляется извне. Uncontrolled: при отсутствии `value` используется внутреннее состояние и `defaultValue`.
- При одновременных helperText и errorText отображается только errorText; aria-describedby указывает на элемент с ошибкой.
- Область под полем (одна строка) всегда зарезервирована — высота не меняется при появлении/исчезновении helper/error.
- endAdornment рендерится с tabIndex={-1}, чтобы Tab с input вёл на следующий элемент страницы; клик по IconButton работает.

## Accessibility

- label связан с input через htmlFor и id (переданный или сгенерированный).
- При error или errorText: aria-invalid="true".
- Подсказка/ошибка: aria-describedby на id контейнера helper/error.
- Tab: фокус с input уходит на следующий элемент; IconButton не перехватывает фокус (tabIndex=-1).

## CSS variables (Input)

Из tokens.json (секция `input`), генерируются в theme-vars.css: `--input-border-radius`, `--input-transition`, `--input-small-height`, `--input-small-padding-x`, `--input-small-padding-y`, `--input-small-font-size`, `--input-small-line-height`, `--input-small-left-icon-size` (аналогично medium, large). Состояния: default, hover, focus, error, disabled — через переменные темы (`--border-primary`, `--border-error`, `--content-primary`, `--content-disabled`, `--surface-primary-main` и т.д.).

## Версионирование

- Breaking changes API — MAJOR. Новые опциональные props — MINOR. Внутренние правки — PATCH.
