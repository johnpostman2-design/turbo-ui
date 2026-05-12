# Contract: Tabs (public API)

Версия: draft (014-tabs).

## Экспорт

```ts
import {
  Tabs,
  TabsList,
  Tab,
  TabsPanel,
} from 'turbo-ui';
```

Подпуть `turbo-ui/tabs` по-прежнему доступен для tree-shaking.

## Tabs

Корневая обёртка группы. Пропсы:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled: текущее значение. |
| `defaultValue` | `string` | — | Uncontrolled: начальное значение. |
| `onValueChange` | `(value: string) => void` | — | Вызывается при выборе вкладки. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Размер всех `Tab` в группе. |
| `className` | `string` | — | На корневой элемент. |
| `children` | `ReactNode` | — | Обычно `TabsList` + один или несколько `TabsPanel`. |

## TabsList

Контейнер вкладок. Пропсы: нативные атрибуты `HTMLAttributes<HTMLDivElement>` кроме `role` (всегда `tablist`). `className` — дополнительные классы.

## Tab

Триггер вкладки.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | (required) | Идентификатор вкладки. |
| `disabled` | `boolean` | `false` | Блокирует выбор. |
| `className` | `string` | — | Доп. класс на `<button>`. |
| `children` | `ReactNode` | — | Подпись. |
| `id` | `string` | — | Опционально; иначе генерируется из `useId`. |

Проброс: остальные валидные атрибуты `<button type="button">` (кроме `type`, `role`, `aria-selected`, `aria-controls`, `tabIndex` — выставляются компонентом; `disabled` маппится нативно).

`ref` → `HTMLButtonElement`.

## TabsPanel

Панель контента.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | (required) | Привязка к `Tab` с тем же `value`. |
| `className` | `string` | — | |
| `children` | `ReactNode` | — | |

Скрытие: атрибут `hidden` когда значение панели не активно. `role="tabpanel"`, `aria-labelledby` — id соответствующего Tab.

`ref` → `HTMLDivElement`.

## Семантика

- `TabsList`: `role="tablist"`.
- `Tab`: `role="tab"`, `aria-selected`, `aria-controls={panelId}`, `tabIndex` по roving focus.
- `TabsPanel`: `role="tabpanel"`, `id={panelId}`, `aria-labelledby={tabId}`.

## Визуал (токены)

- Текст активной / не disabled: `var(--content-primary)`.
- Текст disabled: `var(--content-disabled)`.
- Линия: см. `research.md` R1.
