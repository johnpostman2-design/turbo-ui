# Contract: Listbox (Turbo UI)

Публичный API компонента **Listbox** — панель списка опций. Стили: design tokens (`--listbox-*`, семантические переменные темы) + CSS Modules. Макеты: [830:857](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-857), айтемы [830:683](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=830-683).

## Тип опции

```ts
type ListboxOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode; // слот слева; видимость зависит от showItemStartIcon
  id?: string;
};
```

## Props (планируемые)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ListboxOption[]` | `[]` | Данные опций |
| `value` | `string` | — | Controlled: выбранное значение |
| `defaultValue` | `string` | — | Uncontrolled: начальное значение |
| `onChange` | `(value: string) => void` | — | Выбор пункта (если не `disabled`) |
| `selectionIndicator` | `'check' \| 'none'` | `'none'` | Правая отметка у выбранного (`check` — для сценария как в Select) |
| `showItemStartIcon` | `boolean` | `true` | Показывать колонку левой иконки; при `false` слот не занимает место |
| `maxHeight` | `string` | токен по умолчанию | `max-height` области прокрутки (CSS, через переменную темы) |
| `className` | `string` | — | Корень списка |
| `id` | `string` | — | `id` контейнера `listbox` для `aria-controls` снаружи |

Проброс: разумный подмножество для контейнера (`role="listbox"`) — `aria-*`, `data-*`. **`ref`** — на корневой элемент списка.

## Поведение

- Клик по опции задаёт значение (если не `disabled`); вызов `onChange`.
- Клавиатура: стрелки, Home/End, Enter — по APG Listbox (детали в реализации).
- Скролл: контент выше `maxHeight` прокручивается внутри панели.

## Accessibility

- `role="listbox"` на контейнере, `role="option"` на пунктах, `aria-selected`, `aria-disabled` где уместно.
- Связь с внешним триггером — зона ответственности родителя (`aria-controls` / `aria-labelledby`).

## CSS variables

Из `tokens.json` (секция `listbox`), генерация в `theme-vars.css`: паддинги панели, высота/отступы айтема, типографика, состояния hover/focus/disabled/selected.

## Версионирование

Новые опциональные props — MINOR. Изменение семантики выбора — MAJOR.
