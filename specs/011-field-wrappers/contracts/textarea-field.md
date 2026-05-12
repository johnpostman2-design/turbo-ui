# Contract: `TextAreaField`

Обёртка над `TextArea` с подписью сверху и блоком helper/error снизу. API наследует `TextAreaProps` (минус устаревшие в обёртке встроенные helper/error) и добавляет три собственных пропа.

## Module

```ts
import { TextAreaField, type TextAreaFieldProps } from 'turbo-ui/textarea-field';
// или
import { TextAreaField, type TextAreaFieldProps } from 'turbo-ui';
```

## TypeScript

```ts
import type { TextAreaProps } from 'turbo-ui/textarea';

// `TextArea` в этой фиче лишается helperText/errorText/встроенного
// helper-слота, поэтому `TextAreaProps` уже не содержит их — Omit не нужен.
export interface TextAreaFieldProps extends TextAreaProps {
  /** Подпись над полем. Если пусто/undefined — не рендерится. */
  label?: string;
  /** Подсказка под полем. Скрывается при наличии errorText. */
  helperText?: string;
  /** Текст ошибки под полем. Приоритет над helperText. */
  errorText?: string;
}

export const TextAreaField: React.ForwardRefExoticComponent<
  TextAreaFieldProps & React.RefAttributes<HTMLTextAreaElement>
>;
```

## Props (новые)

| Prop | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `label` | `string` | — | Подпись над полем |
| `helperText` | `string` | — | Подсказка под полем; нейтральный стиль |
| `errorText` | `string` | — | Ошибка под полем; приоритет над `helperText`, активирует `aria-invalid` |

Все остальные пропы — из `TextAreaProps` (`size`, `rows`, `leftIcon`, `endAdornment`, `borderless`, `width`, `maxWidth`, `disabled`, `error`, `maxLength`, нативные атрибуты `<textarea>`).

`className` ставится на **корневой контейнер обёртки** (а не на корень `TextArea`).

## Поведение

- Если `label` непустой — рендерится `<label htmlFor={inputId}>` над полем; клик ставит фокус в `<textarea>`.
- `inputId` производный: `id ?? "turbo-textarea-field-{useId}"`. Передаётся в `TextArea` как `id` (попадает на `<textarea>`).
- При `errorText`: `<p role="alert">errorText</p>`, `aria-invalid="true"` на `<textarea>` (через `TextArea.error`).
- При `helperText` без `errorText`: `<p>helperText</p>`. `aria-describedby` указывает на id helper.
- Пустые `helperText` и `errorText` → `helperInvisible` плейсхолдер.
- `disabled=true` подавляет `aria-invalid`; label/helper в `--content-disabled`. `<textarea>` блокируется.
- Пользовательский `aria-describedby` объединяется с auto-id helper/error через пробел.
- **`TextArea` в этой фиче перестаёт рендерить собственный helper-слот** — пропы `helperText`/`errorText` и встроенный слот удалены (см. research §B). Источник истины для helper/error в формах — `TextAreaField`.
- Все возможности «голого» `TextArea` сохранены: `size`, `rows`, `leftIcon`, `endAdornment`, `borderless`, `width`, `maxWidth`, `disabled`, `error`, `maxLength` и пр.
- `ref` пробрасывается на нативный `<textarea>`.

## Accessibility

- Подпись связана через `<label htmlFor>`.
- При `errorText` элемент имеет `role="alert"`.
- `aria-invalid` на `<textarea>` при error и без `disabled`.
- `aria-describedby` — объединение пользовательского значения и id helper/error.

## CSS-classes (CSS Module — внутренние)

Аналогично `SelectField` (отдельный модуль `textarea-field.module.css` с идентичной структурой; data-атрибуты — `data-turbo-textarea-field-helper`).

## Examples

```tsx
<TextAreaField
  label="Комментарий"
  helperText="До 240 символов"
  maxLength={240}
  rows={4}
/>

<TextAreaField
  label="Описание задачи"
  errorText="Поле обязательно"
  size="large"
/>

<TextAreaField
  label="Заметки"
  disabled
  defaultValue="Доступ к полю заблокирован"
/>
```

## Required breaking change to `TextArea`

В рамках этой фичи у `TextArea` удаляются:

```ts
// УДАЛЯЕТСЯ:
//   helperText?: string;
//   errorText?: string;
```

И встроенный helper-блок:

```jsx
// УДАЛЯЕТСЯ:
//   <div class="helperSlot">
//     {hasErrorText ? <p role="alert">…</p> : helperText ? <p>…</p> : <p aria-hidden>…</p>}
//   </div>
```

Что остаётся:

- `id` на `<textarea>`.
- `error?: boolean` — визуал рамки + `aria-invalid` на `<textarea>`.
- `aria-describedby` пользователя передаётся как есть (без склейки с внутренними id).
- Все остальные пропы — без изменений.

Migration для внешних пользователей: использовать `TextAreaField` с теми же `helperText`/`errorText`.
