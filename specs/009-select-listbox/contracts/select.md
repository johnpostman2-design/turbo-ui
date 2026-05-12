# Contract: Select (Turbo UI)

Публичный API компонента **Select** — выбор одного значения из выпадающего списка (без лейбла и хелпера в этой фиче). Стили: tokens (`--select-*`, `--listbox-*`) + CSS Modules. Макет триггера и состояний: [830:590](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-590).

## Тип опции

Тот же контракт, что у Listbox: **`SelectOption`** = `ListboxOption` (экспорт типа может быть общим из `listbox`).

## Placement

```ts
type SelectPosition =
  | 'top left' | 'top center' | 'top right'
  | 'right top' | 'right middle' | 'right bottom'
  | 'bottom left' | 'bottom center' | 'bottom right'
  | 'left top' | 'left middle' | 'left bottom';
```

## Props (планируемые)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Опции списка |
| `value` | `string` | — | Controlled |
| `defaultValue` | `string` | — | Uncontrolled |
| `onChange` | `(value: string) => void` | — | После выбора список закрывается |
| `placeholder` | `React.ReactNode` | — | Содержимое триггера при отсутствии `value` |
| `disabled` | `boolean` | `false` | Не открывать список; визуал disabled |
| `error` | `boolean` | `false` | Визуал invalid по макету + `aria-invalid` на триггере (имя как у Radio/Checkbox) |
| `positions` | `SelectPosition \| SelectPosition[]` | разумный default | Приоритет перебора; если ни одна позиция не удовлетворяет правилу укладки — итог **первая** в массиве (спека FR-6) |
| `menuOffset` | `number` | `0` | Горизонтальный сдвиг панели: `0` — нет; **>0** — влево; **<0** — вправо |
| `menuWidth` | `string` | — | Фиксированная ширина панели (CSS, предпочтительно через токен/класс) |
| `menuMaxWidth` | `string` | — | Верхняя граница ширины панели |
| `menuMaxHeight` | `string` | токен | Высота области опций со скроллом |
| `search` | `boolean` | `false` | Показать **Input** над списком |
| `filterItem` | `(query: string, option: SelectOption) => boolean` | default substring | Фильтр видимых опций; при `search` без пропа — дефолт в docs |
| `open` | `boolean` | — | Controlled открытие |
| `defaultOpen` | `boolean` | `false` | Uncontrolled |
| `onOpenChange` | `(open: boolean) => void` | — | Изменение открытия |
| `showItemStartIcon` | `boolean` | `true` | Проброс в Listbox: левая иконка у айтемов |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Размер триггера (и согласованно списка — по макету) |
| `triggerWidth` | `string` | — | Фиксированная ширина обёртки триггера (CSS) |
| `triggerMaxWidth` | `string` | — | Максимальная ширина обёртки триггера (CSS) |
| `startIcon` | `ReactNode` | — | Опциональная иконка слева в триггере; размер слота согласован с `size` (как у иконок пунктов Listbox) |
| `style` | `CSSProperties` | — | Доп. стили на корень-обёртку (совместно с `triggerWidth` / `triggerMaxWidth`) |
| `className` | `string` | — | Корень обёртки (портал снаружи) |
| `id` | `string` | — | `id` корневой обёртки |

**`ref`**: на элемент триггера (`HTMLButtonElement`) — для форм и фокуса.

Проброс на **`<button>`-триггер**: нативные атрибуты из `React.ComponentPropsWithoutRef<'button'>`, кроме `type`, `children`, `value`, `defaultValue`, `onChange`, `className`, `style`, `id` (эти три последних — на корневую обёртку). Примеры: `name`, `form`, `aria-label`, `data-*`, `title`. `ref` — на кнопку.

## Поведение

- Открытие по клику/Space/Enter на триггере (если не `disabled`); закрытие по выбору, Escape, клику вне.
- В сценарии Select у выбранной опции в панели отображается **check справа** (через `selectionIndicator="check"` у внутреннего Listbox).
- Позиционирование: см. [research.md](../research.md) (Floating UI + правила FR-6/FR-7).

## Accessibility

- Триггер: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` → id панели.
- `aria-invalid` при `error`.
- Список в portal сохраняет семантику listbox/option.

## CSS variables

Секции `select` и задействованные `listbox` в `tokens.json` → `theme-vars.css`.

## Версионирование

Новые опциональные props — MINOR. Смена значений `positions` enum — MAJOR при переименовании.
