# Contract: ComboBox

Публичный API компонента **ComboBox** (`turbo-ui/combobox`). Детали поведения — см. [data-model.md](../data-model.md) и [research.md](../research.md).

## Импорт

```ts
import { ComboBox, type ComboBoxProps, type ComboBoxOption } from 'turbo-ui/combobox';
// или из корня:
import { ComboBox } from 'turbo-ui';
```

## Типы

```ts
export type ComboBoxSize = 'small' | 'medium' | 'large';
export type ComboBoxTextAlign = 'start' | 'center' | 'end';

// Совпадает с ListboxOption; реэкспортируется как ComboBoxOption.
export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  id?: string;
}

// Контракт positions — общий с Select; реэкспорт из turbo-ui/select.
export type ComboBoxPosition = SelectPosition;

export interface ComboBoxRenderContext {
  query: string;
  selected: boolean;
  highlighted: boolean;
  highlightMatch: (label: string, query: string) => React.ReactNode;
}
```

## Пропы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `options` | `ComboBoxOption[]` | `[]` | Набор подсказок. При пустом массиве панель не открывается. |
| `value` | `string` | — | Текущее значение поля (controlled). |
| `defaultValue` | `string` | `''` | Начальное значение (uncontrolled). |
| `onChange` | `(next: string) => void` | — | Вызывается при вводе, выборе подсказки, очистке. |
| `onSelect` | `(option: ComboBoxOption) => void` | — | Дополнительный колбэк при выборе из списка (после `onChange`). |
| `placeholder` | `string` | — | Плейсхолдер. |
| `disabled` | `boolean` | `false` | Блокировка поля. |
| `error` | `boolean` | `false` | Визуал ошибки + `aria-invalid="true"` на input. |
| `size` | `ComboBoxSize` | `'medium'` | Размер поля и панели. |
| `width` | `CSSProperties['width']` | — | Фиксированная ширина поля. |
| `maxWidth` | `CSSProperties['maxWidth']` | — | Максимальная ширина поля. |
| `multiline` | `boolean` | `false` | Многострочный режим (TextArea). |
| `borderless` | `boolean` | `false` | Поле без обводки. |
| `startIcon` | `ReactNode` | — | Иконка слева в поле. |
| `textAlign` | `ComboBoxTextAlign` | `'start'` | Выравнивание текста в поле. |
| `maxLength` | `number` | — | Максимум символов в `value`. |
| `mask` | `string` | — | Маска ввода (см. research §7). |
| `clearable` | `boolean` | `true` | Показывать кнопку очистки при непустом `value`. |
| `clearIcon` | `ReactNode` | стандартная | Замена содержимого иконки очистки. |
| `onClear` | `() => void` | — | Колбэк очистки (до `onChange('')`). |
| `positions` | `ComboBoxPosition \| ComboBoxPosition[]` | `'bottom left'` | Расположение и выравнивание панели; массив = приоритет. |
| `menuOffset` | `number` | `0` | Горизонтальный сдвиг панели в px. |
| `menuWidth` | `CSSProperties['width']` | — | Фиксированная ширина панели. |
| `menuMaxWidth` | `CSSProperties['maxWidth']` | токен | Максимальная ширина панели. |
| `menuMaxHeight` | `CSSProperties['maxHeight']` | токен | Максимальная высота списка подсказок. |
| `filterItem` | `(query: string, option: ComboBoxOption) => boolean` | подстрока, без регистра | Правило фильтрации. |
| `highlightMatch` | `boolean` | `false` | Включает встроенную подсветку совпадающей части в `label`. |
| `renderOption` | `(option, ctx: ComboBoxRenderContext) => ReactNode` | — | Кастомный рендер подсказки. При заданном `renderOption` `highlightMatch` не применяется автоматически — используйте `ctx.highlightMatch`. |
| `emptyState` | `ReactNode` | — | Содержимое панели при пустом результате. |
| `open` | `boolean` | — | Раскрытие (controlled). |
| `defaultOpen` | `boolean` | `false` | Раскрытие (uncontrolled). |
| `onOpenChange` | `(next: boolean) => void` | — | Колбэк раскрытия. |
| `name` / `form` / `required` / `autoComplete` / `inputMode` | нативные | — | Прокидываются в `<input>`/`<textarea>`. |
| `id` | `string` | сгенерированный | Идентификатор поля. |
| `className` | `string` | — | Класс корня. |
| `style` | `CSSProperties` | — | Стили корня (правила splitStyle как в TextArea). |

> **Дублирование запрещено**: пропов `top`/`align` нет — используется единый `positions` (общий контракт с Select).

## Поведение

### Открытие/закрытие

- `focus`/`mousedown` на поле → `open = true`, если `!disabled && options.length > 0`.
- Ввод любого символа → `open = true`.
- Стрелка вниз/вверх → `open = true`, перемещение highlighted в Listbox.
- `Escape`/клик вне/`Tab` → `open = false`. `value` сохраняется.
- Выбор подсказки → `onChange(option.value)` → `onSelect?.(option)` → `open = false` → фокус в поле.
- Очистка → `onClear?.()` → `onChange('')` → `open = true` (с полным `options`) → фокус в поле.

### Фильтрация

- При `query === ''` (пустое поле) — отображаются **все** `options`.
- Иначе — `options.filter(opt => filterItem(query, opt))`.
- Если результат пуст — рендерится `emptyState` (или ничего, если не задан).

### Ввод и маска

- `maxLength` соблюдается на нативном input + повторно после применения маски.
- `mask` обрабатывает каждое изменение `value` (включая paste, программную подстановку из списка).
- Несовпадающие с маской символы отбрасываются без ошибок.

### Подсветка совпадений

- `highlightMatch={true}` — встроенная подсветка через `<mark>` и токены.
- `renderOption={fn}` — пользователь сам решает; `ctx.highlightMatch(label, query)` — публичная утилита.

### Accessibility

- Корень: `role="combobox"`, `aria-expanded`, `aria-controls={listboxId}`, `aria-autocomplete="list"`, `aria-haspopup="listbox"`.
- Поле: `aria-activedescendant` указывает на текущий highlighted option.
- Listbox: `role="listbox"`, опции — `role="option"` + `aria-selected`.
- `error` → `aria-invalid="true"` на поле.
- `disabled` → `aria-disabled="true"` на поле; панель не открывается.

### Позиционирование

- Тот же контракт, что у Select: `positions` — значение или массив; при невозможности уложить ни одну позицию используется **первая** из массива.
- `menuOffset` — сдвиг в px после основного placement.
- При смене размера окна / прокрутке — `autoUpdate` Floating UI пересчитывает позицию.

## Контракты совместимости

- ComboBox не вводит **breaking changes** в публичные API `Input`, `TextArea`, `Listbox`, `Select`.
- Изменения в `TextArea` для поддержки `size: 'large'` и (при необходимости) `startIcon`/`endAdornment` — **аддитивные**.
- Тип `ComboBoxOption` структурно совместим с `ListboxOption` — допускается передача одного и того же массива.

## Тестируемость

Минимальный набор unit-кейсов (Vitest):

1. **Открытие**: фокус/клик/стрелка вниз → `open = true` (и не открывает при `disabled`).
2. **Фильтрация по умолчанию**: ввод `Иван` → остаются опции, у которых `label.toLowerCase().includes('иван')`.
3. **Кастомный `filterItem`**: при заданном `filterItem` стандартное правило не применяется.
4. **Выбор пункта**: клик/Enter → `onChange(option.value)` → `open = false`, фокус в поле.
5. **Свободный ввод**: значение, отсутствующее в `options`, сохраняется после Esc/клик вне.
6. **Очистка**: `clearable` + непустое `value` → клик по иконке → `onChange('')`, панель переоткрывается с полным набором.
7. **Скрытие иконки очистки**: при `disabled` или пустом `value` — иконка отсутствует в DOM.
8. **maxLength**: ввод сверх лимита не увеличивает `value`.
9. **mask**: символы, не подходящие маске, отбрасываются; литералы маски подставляются автоматически.
10. **highlightMatch**: при включённом флаге в DOM появляется `<mark>` вокруг совпадения.
11. **multiline**: рендер на базе `<textarea>`; Enter с открытой панелью и активным пунктом — выбор; без активного — перенос строки; Shift+Enter — всегда перенос строки.
12. **disabled**: ввод и клик не открывают панель; на input — `aria-disabled`.
13. **error**: на input — `aria-invalid="true"`.
14. **positions**: одиночное значение применяется напрямую; массив — приоритет; при недоступности всех — первая из массива.
