# Data Model: Checkbox

## Сущность: Checkbox (компонент)

Представляет **бинарный выбор** (вкл/выкл) и режим **неопределённости** для иерархий списков.

### Поля (логическая модель / пропсы)

| Поле | Описание | Правила |
|------|----------|---------|
| `checked` / `defaultChecked` | Включён ли флажок | Controlled vs uncontrolled — как у нативного `input[type=checkbox]` |
| `indeterminate` | Логическое «частично выбрано» | Синхронизация с `HTMLInputElement.indeterminate`; не путать с `checked` в DOM |
| `disabled` | Блокировка переключения | Не реагирует на клик/клавиатуру; визуал disabled |
| `error` (или согласованное имя в контракте) | Режим ошибки (invalid) | Визуал invalid + `aria-invalid` |
| `size` | Размер контрола | `large` \| `medium` \| `small` |
| `id` | id инпута | Для связи с внешним `<label>` |
| `name`, `value` | Отправка формы | Проброс на нативный input |
| `onChange` | Смена значения | `ChangeEvent<HTMLInputElement>` |
| `className` | Доп. класс на корень | Не ломает обязательные модификаторы состояний |

### Проброс нативных атрибутов

- Разумный подмножество **`React.InputHTMLAttributes<HTMLInputElement>`** для `type="checkbox"`: `aria-*`, `data-*`, `required`, и т.д., с явным **`type`** фиксированным как `checkbox` и исключением дублирующих конфликтов с обёрткой.

### Состояния отображения

| Состояние | Условие |
|-----------|---------|
| default | Не disabled, не error, без hover/focus |
| hover | `:hover`, не disabled |
| focus | `:focus-within` / `focus-visible` на зоне контрола |
| disabled | `disabled === true` |
| invalid | `error` (или эквивалент) === true |

### Значения визуала (внутри квадрата)

| Значение | Условие |
|----------|---------|
| unchecked | Не checked, не indeterminate |
| checked | `checked === true`, не indeterminate |
| indeterminate | `indeterminate === true` (DOM-свойство выставлено) |

### Связи

- Текст ошибки формы рядом с чекбоксом — **вне** компонента в MVP (композиция).
- Группа чекбоксов и «общая ошибка» — композиция или fieldset на стороне продукта.
