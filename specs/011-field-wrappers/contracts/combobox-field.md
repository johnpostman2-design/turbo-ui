# Contract: `ComboBoxField`

Обёртка над `ComboBox` с подписью сверху и блоком helper/error снизу. API наследует `ComboBoxProps` и добавляет три собственных пропа.

## Module

```ts
import { ComboBoxField, type ComboBoxFieldProps } from 'turbo-ui/combobox-field';
// или
import { ComboBoxField, type ComboBoxFieldProps } from 'turbo-ui';
```

## TypeScript

```ts
import type { ComboBoxProps } from 'turbo-ui/combobox';

export interface ComboBoxFieldProps extends ComboBoxProps {
  /** Подпись над полем. Если пусто/undefined — не рендерится. */
  label?: string;
  /** Подсказка под полем. Скрывается при наличии errorText. */
  helperText?: string;
  /** Текст ошибки под полем. Приоритет над helperText. */
  errorText?: string;
}

export const ComboBoxField: React.ForwardRefExoticComponent<
  ComboBoxFieldProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>
>;
```

## Props (новые)

| Prop | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `label` | `string` | — | Подпись над полем |
| `helperText` | `string` | — | Подсказка под полем; нейтральный стиль |
| `errorText` | `string` | — | Ошибка под полем; приоритет над `helperText`, активирует `aria-invalid` |

Все остальные пропы — из `ComboBoxProps` (`options`, `value`, `defaultValue`, `onChange`, `onSelect`, `placeholder`, `disabled`, `error`, `size`, `width`, `multiline`, `borderless`, `startIcon`, `maxLength`, `mask`, `clearable`, `highlightMatch`, `renderOption`, `emptyState`, `positions`, `menuOffset`, `menuMaxHeight`, `menuMaxWidth`, `menuWidth`, `open`, `defaultOpen`, `onOpenChange`, `filterItem`, `searchPlaceholder`, `className`, `style`, `id`, нативные атрибуты `<input>`/`<textarea>`).

`className` ставится на **корневой контейнер обёртки** (а не на корень `ComboBox`).

## Поведение

- Если `label` непустой — рендерится `<label htmlFor={inputId}>` над полем; клик переводит фокус во ввод.
- `inputId` производный: `id ?? "turbo-combobox-field-{useId}"`. Передаётся в `ComboBox` как `id` (там попадает на `<input>` или `<textarea>` внутри `Input`).
- При `errorText`: `<p role="alert">errorText</p>`, на поле `aria-invalid="true"` (через `ComboBox.error`).
- При `helperText` без `errorText`: `<p>helperText</p>`. `aria-describedby` указывает на id helper.
- Пустые `helperText` и `errorText` → `helperInvisible` плейсхолдер (стабильная высота).
- `disabled=true` подавляет `aria-invalid`; label/helper в цвете `--content-disabled`. `ComboBox` блокируется.
- Пользовательский `aria-describedby` объединяется с auto-id helper/error через пробел.
- Все возможности `ComboBox` сохранены: фильтрация, выбор, очистка (`clearable`), `multiline` (автогрост поля), `borderless`, `mask`, `highlightMatch`, кастомный `renderOption`, `emptyState` для `Listbox`.
- `ref` пробрасывается на нативный элемент поля: `<input>` (одиночный режим) или `<textarea>` (`multiline`).

## Accessibility

- Подпись связана через `<label htmlFor>`.
- При `errorText` элемент имеет `role="alert"`.
- `aria-invalid` на поле при error и без `disabled`.
- `aria-describedby` — объединение пользовательского значения и id helper/error.
- ARIA-роли combobox/listbox реализуются внутри `ComboBox` (без изменений).

## CSS-classes (CSS Module — внутренние)

Аналогично `SelectField` (отдельный модуль `combobox-field.module.css` с идентичной структурой; data-атрибуты — `data-turbo-combobox-field-helper`).

## Examples

```tsx
<ComboBoxField
  label="Аэропорт"
  options={airports}
  value={code}
  onChange={setCode}
  helperText="Начните вводить название города"
/>

<ComboBoxField
  label="IATA код"
  options={airports}
  errorText="Введите трёхбуквенный код"
/>

<ComboBoxField
  label="Подробный адрес"
  options={addresses}
  multiline
  helperText="Поле растёт по выбранному значению"
/>

<ComboBoxField
  label="Телефон"
  options={contacts}
  mask="+7 (XXX) XXX-XX-XX"
/>
```

## Дополнительных изменений в `ComboBox` НЕ требуется

`ComboBox.id` уже ставится на нативный `<input>`/`<textarea>`; `error`/`disabled`/`aria-describedby` — поддерживаются.
