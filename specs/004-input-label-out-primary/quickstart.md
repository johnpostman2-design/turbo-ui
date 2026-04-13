# Quickstart: InputField

**Spec**: [spec.md](./spec.md) · **Contract**: [contracts/input-field.md](./contracts/input-field.md)

## Установка

Пакет библиотеки уже подключён в проекте (как для остальных компонентов Turbo UI).

## Минимальный пример

```tsx
import { InputField } from 'turbo-ui/input-field';
import { IconButton } from 'turbo-ui/icon-button';

export function Example() {
  return (
    <InputField
      label="Label"
      helperText="Helper text"
      name="field"
      placeholder="Placeholder"
      size="medium"
      leftIcon={<YourIcon />}
      endAdornment={<IconButton size="medium" aria-label="Clear" />}
    />
  );
}
```

## С ошибкой

```tsx
<InputField
  label="Email"
  errorText="Invalid email"
  error
  defaultValue="bad"
/>
```

## Примечания

- Примитив `Input` остаётся доступен через `turbo-ui/input` для случаев без label/helper.
- `id` можно передать на input вручную; иначе `InputField` генерирует id для связи label и `aria-describedby`.
