# Data Model: Tabs

## Entity: TabGroup (логическая группа `Tabs`)

| Field | Type | Rules |
|-------|------|--------|
| `activeValue` | `string` | Совпадает с `value` одного из зарегистрированных Tab или пустая строка при несовпадении в controlled. |
| `size` | `'small' \| 'medium' \| 'large'` | Задаётся на `Tabs`; по умолчанию `medium`. |
| `tabOrder` | `string[]` | Порядок значений вкладок по мере `registerTab` (монтирование в DOM). |
| `mode` | `'controlled' \| 'uncontrolled'` | Controlled если передан `value`. |

## Entity: TabItem (одна вкладка)

| Field | Type | Rules |
|-------|------|--------|
| `value` | `string` | Обязателен; уникален в группе. |
| `disabled` | `boolean` | По умолчанию `false`; не меняет `activeValue` по клику. |
| `label` | `ReactNode` | `children` Tab. |

## Entity: TabPanelBinding

| Field | Type | Rules |
|-------|------|--------|
| `panelValue` | `string` | Должен совпадать с `value` Tab для показа. |
| `visible` | `boolean` | `panelValue === activeValue`. |

## State transitions

- Клик по enabled Tab: `activeValue` → `Tab.value` (uncontrolled: внутреннее состояние; controlled: только `onValueChange`).
- Клавиши ArrowLeft/ArrowRight: смена фокуса между Tab; опционально активация — в MVP только фокус (активация по Space/Enter не требуется если клик уже меняет; для a11y часто Enter активирует — spec FR-009 says arrows move focus. Click still selects. Good.)

Actually WAI-ARIA: activating tab with Space when focused - buttons activate on Space by default in browser. Good.

## Validation

- Дубликаты `value`: вне контракта; реализация может dedupe в dev warning.
