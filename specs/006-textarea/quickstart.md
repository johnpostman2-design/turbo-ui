# Quickstart: TextArea

## Установка

Пакет `turbo-ui` уже подключён в проекте-потребителе. Тема: импорт стилей темы Turbo UI (как для Button/Input).

## Импорт

```ts
import { TextArea } from 'turbo-ui/textarea';
// или из корня:
import { TextArea } from 'turbo-ui';
```

## Базовый пример

```tsx
<TextArea
  placeholder="Введите описание"
  size="medium"
  name="description"
/>
```

## Ошибка

```tsx
<TextArea
  error
  errorText="Обязательное поле"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## С подсказкой

```tsx
<TextArea helperText="Не больше 500 символов" size="small" />
```

## Связка с label снаружи

```tsx
<label htmlFor="desc">Описание</label>
<TextArea id="desc" name="description" />
```

---

Дальше: см. [plan.md](./plan.md) и [contracts/textarea.md](./contracts/textarea.md).
