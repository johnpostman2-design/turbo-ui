# Quickstart: Checkbox

## Установка

Пакет `turbo-ui` подключён в проекте. Стили темы — как для остальных компонентов (`turbo-ui/styles/theme`).

## Импорт

```ts
import { Checkbox } from 'turbo-ui/checkbox';
// или:
import { Checkbox } from 'turbo-ui';
```

## Базовый пример

```tsx
<Checkbox defaultChecked name="agree" />
```

## Размер

```tsx
<Checkbox size="large" name="a" />
<Checkbox size="medium" name="b" />
<Checkbox size="small" name="c" />
```

## Неопределённость (частичный выбор)

```tsx
<Checkbox indeterminate name="select-all" />
```

## Ошибка и disabled

```tsx
<Checkbox error id="terms" name="terms" />
<Checkbox disabled name="locked" />
```

## Связка с подписью снаружи

```tsx
<label htmlFor="terms">
  <Checkbox id="terms" name="terms" />
  Принимаю условия
</label>
```

---

Дальше: [plan.md](./plan.md), [contracts/checkbox.md](./contracts/checkbox.md).
