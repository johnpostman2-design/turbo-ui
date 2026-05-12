# Quickstart: Select и Listbox

## Установка

Пакет `turbo-ui` подключён; стили темы — как для остальных компонентов.

## Импорт

```ts
import { Select } from 'turbo-ui/select';
import { Listbox } from 'turbo-ui/listbox';
// или из корня:
import { Select, Listbox } from 'turbo-ui';
```

## Select: минимальный пример

```tsx
const options = [
  { value: 'a', label: 'Первый' },
  { value: 'b', label: 'Второй' },
];

<Select
  options={options}
  placeholder="Выберите"
  value={value}
  onChange={setValue}
  positions="bottom left"
/>
```

## Select: поиск и фильтр

```tsx
<Select
  options={options}
  search
  filterItem={(q, opt) =>
    String(opt.label).toLowerCase().includes(q.trim().toLowerCase())
  }
  placeholder="Найти…"
/>
```

## Listbox без Select (кастомный триггер)

```tsx
const [v, setV] = useState('');

<>
  <button type="button" aria-haspopup="listbox" aria-controls={listboxId}>
    {v || 'Открыть'}
  </button>
  <Listbox
    id={listboxId}
    options={options}
    value={v}
    onChange={setV}
    selectionIndicator="check"
    showItemStartIcon
  />
</>
```

*В реальном UI Listbox обычно в портале рядом с триггером — см. Storybook после реализации.*

---

Дальше: [plan.md](./plan.md), [contracts/select.md](./contracts/select.md), [contracts/listbox.md](./contracts/listbox.md).
