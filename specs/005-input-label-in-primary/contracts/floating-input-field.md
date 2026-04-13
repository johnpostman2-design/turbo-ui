# Contract: FloatingInputField (Turbo UI)

Публичный API компонента **FloatingInputField** — поле формы с вариантом **label-in-primary** по макету Figma (Turbo UI, node `696:412`, компонент `input-label_in-primary`): текст `label` в пустом неактивном поле показывается **оверлеем** внутри поля (как placeholder: цвет `content-tertiary`, **размер шрифта по макету поля** — токены `--input-{small|medium|large}-font-size`, как у вводимого текста в `Input`); при фокусе или при наличии значения тот же текст **анимируется** к плавающему лейблу на верхней границе (**Caption/medium**, `--typescale-caption-medium-*`). Нативный `placeholder` у `<input>` пустой. Внутри используется примитив [Input](../../003-input/contracts/input.md).

Для **внешней** подписи над полем используйте **[InputField](../../004-input-label-out-primary/contracts/input-field.md)** (label-out-primary).

## Экспорт

| Символ | Описание |
|--------|----------|
| `FloatingInputField` | Компонент; layout: плавающий лейбл + поле (`Input`) + helper/error. |
| `FloatingInputFieldProps` | Тип пропсов (extends `Input` без `placeholder` + обязательный `label`). |

Путь импорта: `turbo-ui/floating-input-field` (см. `package.json` exports).

## Props

Наследуются пропсы **`Input`**, кроме **`placeholder`** (визуальный «placeholder» — отдельный слой с лейблом; нативный атрибут не используется для текста).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **label** | `string` | — | **Обязательно**, непустая строка после `trim()`. Без неё компонент **не рендерится** (в dev — сообщение в консоль). В пустом поле без фокуса — визуально как placeholder; при фокусе или при непустом значении — плавающий лейбл на границе. На `<input>` задаётся `aria-label`. |
| helperText | `string` | — | Подсказка под полем; при `errorText` не показывается. |
| errorText | `string` | — | Ошибка под полем; приоритет над `helperText`. |
| className | `string` | — | Доп. классы на **корневой** контейнер (колонка поле + helper). |
| Остальное | как у `Input` | — | `leftIcon`, `endAdornment`, `size`, `error`, `disabled`, `type`, `value`, `defaultValue`, `onChange`, `id`, нативные атрибуты `input`, `ref` через `forwardRef`. |

`placeholder` в API **нет**: на `<input>` передаётся пустой placeholder; подпись до фокуса — только оверлей.

## Поведение

- **Плавающее состояние** (`floated`): `true`, если поле в фокусе **или** значение непустое (controlled/uncontrolled). Пока `floated === false`, лейбл остаётся в позиции «внутри поля»; при переходе в `floated` тот же элемент плавно перемещается на границу (переход по `top`/`transform` и типографике, ~200ms, easing как у Material; при `prefers-reduced-motion` длительность минимальна).
- `error`, `errorText`, `aria-invalid`, `aria-describedby` — как у [InputField](../../004-input-label-out-primary/contracts/input-field.md).
- `endAdornment` (IconButton): `tabIndex={-1}` наследуется от `Input`.

## CSS / тема

- Плавающий лейбл: `--typescale-caption-medium-*`, `--surface-primary-main` (фон «выреза»), `--content-primary` / `--content-disabled`.
- Поле и helper/error: те же переменные, что у `Input` и блока helper в `InputField` (`--input-*`, в т.ч. `--input-{size}-line-height` и `--input-{size}-left-icon-size` для текста и выравнивания оверлея при `leftIcon`, `--spacing-*`, `--content-*`, `--border-*`).

## Версионирование

- Новый компонент — **MINOR**.
- Breaking changes в `FloatingInputFieldProps` или контракте с `Input` — по semantic versioning.
