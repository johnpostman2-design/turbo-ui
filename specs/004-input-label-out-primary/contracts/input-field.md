# Contract: InputField (Turbo UI)

Публичный API компонента **InputField** — поле формы с внешней подписью и вариантом **label-out-primary** по макету Figma (Turbo UI, node `696:412`). Стили: design tokens + CSS Modules. Внутри используется примитив [Input](../../003-input/contracts/input.md) для области ввода.

## Экспорт

| Символ | Описание |
|--------|----------|
| `InputField` | Основной компонент; layout: label → поле (`Input`) → helper/error. |
| `InputFieldProps` | Тип пропсов (extends возможностей `Input` + текстовые слоты). |

Путь импорта для потребителей: `turbo-ui/input-field` (см. `package.json` exports).

## Props

Наследуются все пропсы **`Input`** из `src/ui/input/Input.tsx` (`leftIcon`, `endAdornment`, `size`, `error`, `type`, нативные атрибуты `input`, …), **кроме** случаев, явно переопределённых ниже.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Доп. классы на **корневой** контейнер InputField (колонка label + поле + helper). |
| label | `string` | — | Подпись над полем; связь с `input` через `htmlFor` / `id`. |
| helperText | `string` | — | Подсказка под полем; при наличии `errorText` не показывается. |
| errorText | `string` | — | Ошибка под полем; приоритет над `helperText`; влияет на `aria-invalid` при необходимости. |

## Поведение

- При пустых `label`, `helperText`, `errorText` соответствующие узлы не добавляют лишней высоты; под полем — зарезервированная зона одной строки при необходимости (как в спеке базового Input), без «прыжков» layout.
- `error`, `errorText` и `aria-invalid` согласованы с контрактом Input.
- `endAdornment` (IconButton): `tabIndex={-1}` как у Input.

## CSS / тема

- Используются `--input-*`, `--spacing-*`, `--content-*`, `--border-*`, типографика для label (label/small) и подписи под полем (caption/helper).
- Состояния focus, filled, hover на рамке поля — в стилях, согласованных с макетом и токенами.

## Версионирование

- Первый релиз **InputField** — **MINOR**.
- Изменения несовместимые с `InputFieldProps` или сигнатурой `Input` — по правилам semantic versioning.
