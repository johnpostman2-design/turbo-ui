# Quickstart: Toggle (switch)

Минимальные практические примеры. Полные сценарии — в `contracts/toggle.md`.

## Подключение

```tsx
// один раз в приложении
import 'turbo-ui/styles/theme';

// импорт компонента
import { Toggle } from 'turbo-ui/toggle';
```

## Базовый uncontrolled

```tsx
<Toggle defaultChecked startText="Уведомления" />
```

## Controlled

```tsx
import { useState } from 'react';
import { Toggle } from 'turbo-ui/toggle';

function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  return (
    <Toggle
      checked={dark}
      onChange={(e) => setDark(e.target.checked)}
      endText="Тёмная тема"
    />
  );
}
```

## Размеры

```tsx
<Toggle size="small" startText="Small" />
<Toggle size="medium" startText="Medium" />
<Toggle size="large" startText="Large" />
```

## Без подписи («голый»)

```tsx
<Toggle aria-label="Уведомления" />
```

Если подпись не задана — рекомендуется задать `aria-label` для скринридеров (через `rest` props).

## Подпись слева и справа одновременно

```tsx
<Toggle startText="Off" endText="On" />
```

## Disabled

```tsx
<Toggle disabled startText="Двухфакторная аутентификация" />
<Toggle disabled defaultChecked startText="Включено системой" />
```

## В форме

```tsx
<form onSubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log(data.get('notifications')); // "yes" если включён, иначе null
}}>
  <Toggle name="notifications" value="yes" startText="Уведомления" />
  <button type="submit">Сохранить</button>
</form>
```

## Программный фокус через `ref`

```tsx
import { useRef } from 'react';
import { Toggle } from 'turbo-ui/toggle';

function Example() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Toggle ref={ref} startText="Уведомления" />
      <button onClick={() => ref.current?.focus()}>Дать фокус</button>
    </>
  );
}
```

## Что НЕ предоставляется

- Hover-стили — нет.
- Цветовые варианты (success/danger/…) — нет на MVP.
- Тень knob (drop-shadow) — нет на MVP.
- Полиморфизм (`as` / `asChild`) — нет.
- Отдельные блоки «Доступность» / «Адаптивность» в документации — нет по требованию пользователя.
