# Quickstart: Input (Turbo UI)

Минимальный пример подключения компонента Input в стороннем проекте.

## Установка и стили

```bash
npm install turbo-ui
```

В корне приложения один раз подключите стили темы:

```ts
import 'turbo-ui/styles/theme';
```

## Импорт

```ts
import { Input } from 'turbo-ui/input';
```

## Базовое использование

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  name="email"
  aria-label="Email"
/>
```

С подсказкой и ошибкой:

```tsx
<Input
  label="Пароль"
  type="password"
  helperText="Минимум 8 символов"
  errorText={error ? 'Неверный пароль' : undefined}
  error={!!error}
/>
```

С IconButton справа (например, очистка):

```tsx
import { Input } from 'turbo-ui/input';
import { IconButton } from 'turbo-ui/icon-button';
import { Icon } from 'turbo-ui/components/icons';

<Input
  label="Поиск"
  type="search"
  endAdornment={<IconButton icon={<Icon name="delete-cross-circle" size="100%" />} aria-label="Очистить" size="small" />}
/>
```

## Controlled / Uncontrolled

- **Controlled**: передайте `value` и `onChange`.
- **Uncontrolled**: передайте `defaultValue` (или ни того ни другого) и при необходимости обрабатывайте `onChange`.

## Размеры

Проп `size`: `'small'` | `'medium'` | `'large'`. По умолчанию `'medium'`.

## Тема

Переопределение токенов через `TurboUIProvider` с пропом `theme`; при необходимости изоляция через `scopeClassName` — по аналогии с другими компонентами Turbo UI (см. README библиотеки).
