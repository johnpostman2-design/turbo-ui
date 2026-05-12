# Contract: `SelectField`

Обёртка над `Select` с подписью сверху и блоком helper/error снизу. API наследует `SelectProps` и добавляет три собственных пропа.

## Module

```ts
import { SelectField, type SelectFieldProps } from 'turbo-ui/select-field';
// или
import { SelectField, type SelectFieldProps } from 'turbo-ui';
```

## TypeScript

```ts
import type { SelectProps } from 'turbo-ui/select';

export interface SelectFieldProps extends SelectProps {
  /** Подпись над триггером. Если пусто/undefined — не рендерится. */
  label?: string;
  /** Подсказка под полем. Скрывается при наличии errorText. */
  helperText?: string;
  /** Текст ошибки под полем. Приоритет над helperText. */
  errorText?: string;
}

export const SelectField: React.ForwardRefExoticComponent<
  SelectFieldProps & React.RefAttributes<HTMLButtonElement>
>;
```

## Props (новые)

| Prop | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `label` | `string` | — | Подпись над триггером. Если пусто/`undefined` — `<label>` не рендерится |
| `helperText` | `string` | — | Подсказка под полем; нейтральный стиль |
| `errorText` | `string` | — | Ошибка под полем; приоритет над `helperText`, активирует `aria-invalid` |

Все остальные пропы — из `SelectProps` (`options`, `value`, `defaultValue`, `onChange`, `placeholder`, `disabled`, `error`, `positions`, `menuOffset`, `menuWidth`, `menuMaxWidth`, `menuMaxHeight`, `search`, `searchPlaceholder`, `filterItem`, `open`, `defaultOpen`, `onOpenChange`, `showItemStartIcon`, `size`, `triggerWidth`, `triggerMaxWidth`, `startIcon`, `className`, `style`, `id`, `triggerId`, нативные атрибуты `<button>`).

`className` ставится на **корневой контейнер обёртки** (а не на корень `Select`).

## Поведение

- Если `label` непустой — рендерится `<label htmlFor={triggerId}>` над полем; клик переводит фокус на `<button>`-триггер.
- `triggerId` производный: `id ?? "turbo-select-field-{useId}"`. Передаётся в `Select` через `triggerId` (см. контракт `Select.triggerId`).
- Если задан `errorText`: показывается `<p role="alert">errorText</p>`, на триггер ставится `aria-invalid="true"` (через `Select.error`).
- Если `errorText` не задан, но есть `helperText`: показывается `<p>helperText</p>`. На триггер `aria-describedby` указывает на id helper.
- Если ни `helperText`, ни `errorText` — `helperSlot` содержит невидимый плейсхолдер (`visibility: hidden`) для стабильной высоты.
- `disabled=true` подавляет `aria-invalid`; label/helper окрашиваются `--content-disabled`.
- Пользовательский `aria-describedby` объединяется с auto-id helper/error через пробел.
- `ref` пробрасывается на `<button>`-триггер `Select`.

## Accessibility

- Подпись связана через `<label htmlFor>`.
- При `errorText` элемент имеет `role="alert"`.
- `aria-invalid` на триггере при error и без `disabled`.
- `aria-describedby` — объединение пользовательского значения и id helper/error.

## CSS-classes (CSS Module — внутренние, не публичные)

| Класс | Что |
|-------|-----|
| `.root` | flex-колонка, `gap: var(--spacing-8)`, `width: 100%`, `min-width: 120px` |
| `.rootDisabled` | модификатор для `disabled` (цвет label/helper → `--content-disabled`) |
| `.label` | label-small, `--content-primary`, single-line ellipsis |
| `.inputWrap` | контейнер `Select` (`width: 100%`, `min-width: 0`) |
| `.helperSlot` | `min-height: --typescale-caption-medium-height` |
| `.helper` / `.helperError` | caption-medium, цвета `--content-tertiary` / `--content-error` |
| `.helperInvisible` | `visibility: hidden` для пустого слота |

## Атрибуты доступности на корне

| Атрибут | Когда |
|---------|-------|
| `data-helper-tone="error"` | у `<p>` ошибки |
| `data-helper-tone="tertiary"` | у `<p>` helper |
| `data-helper-tone="disabled"` | у `<p>` в состоянии disabled |
| `data-turbo-select-field-helper=""` | у любого `<p>` в helper-слоте |

## Examples

```tsx
<SelectField
  label="Город"
  options={cities}
  value={city}
  onChange={setCity}
  helperText="Выберите ваш город"
/>

<SelectField
  label="Страна"
  options={countries}
  errorText="Поле обязательно"
/>

<SelectField
  label="Сортировка"
  options={sortOptions}
  size="large"
  disabled
/>
```

## Required additive change to `Select`

```ts
// Аддитивный, обратносовместимый:
export interface SelectProps {
  /** id для `<button>`-триггера (нужен для `<label htmlFor>`). */
  triggerId?: string;
  // ... остальные пропы без изменений
}
```

Дефолт `triggerId === undefined` — поведение `Select` не меняется.
