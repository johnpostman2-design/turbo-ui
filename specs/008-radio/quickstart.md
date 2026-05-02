# Quickstart: Radio

## Установка

Пакет `turbo-ui` подключён в проекте. Стили темы — как для остальных компонентов (`turbo-ui/styles/theme`).

## Импорт

```ts
import { Radio } from 'turbo-ui/radio';
// или:
import { Radio } from 'turbo-ui';
```

## Один вариант (controlled-группа)

```tsx
const [plan, setPlan] = React.useState('pro');

<Radio name="plan" value="free" checked={plan === 'free'} onChange={() => setPlan('free')} label="Free" />
<Radio name="plan" value="pro" checked={plan === 'pro'} onChange={() => setPlan('pro')} label="Pro" />
```

## Размер

```tsx
<Radio name="size-demo" value="a" size="large" label="Large" />
<Radio name="size-demo" value="b" size="medium" defaultChecked label="Medium" />
<Radio name="size-demo" value="c" size="small" label="Small" />
```

## Ошибка и disabled

```tsx
<Radio name="x" value="1" error label="Invalid option" />
<Radio name="x" value="2" disabled label="Disabled" />
```

## Подпись снаружи (без встроенного `label`)

```tsx
<label htmlFor="opt-a">
  <Radio id="opt-a" name="grp" value="a" />
  Вариант A
</label>
```

---

Дальше: [plan.md](./plan.md), [contracts/radio.md](./contracts/radio.md).
