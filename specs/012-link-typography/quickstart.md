# Quickstart: Link

Минимальные примеры использования компонента `Link` — текстовой ссылки/inline-действия как части typography проекта.

## Подключение

```ts
import 'turbo-ui/styles/theme';
import { Link } from 'turbo-ui';
// или точечно для tree-shaking:
// import { Link } from 'turbo-ui/link';
```

---

## Ссылка внутри абзаца

```tsx
<p>
  Подробнее в <Link href="/docs">нашей документации</Link>.
</p>
```

`Link` наследует `font-family`, `font-size`, `line-height` от `<p>` — встаёт «в строку» с остальным текстом.

---

## Внутри заголовка

```tsx
<h2>
  Узнайте больше о <Link href="/about">Turbo UI</Link>
</h2>
```

`Link` наследует размер `<h2>` — не задаёт собственный.

---

## Навигация на внешний адрес

```tsx
<Link href="https://example.com" target="_blank">
  Внешняя ссылка
</Link>
```

Компонент автоматически добавляет `rel="noopener noreferrer"`. Явный `rel` переопределяет это:

```tsx
<Link href="https://example.com" target="_blank" rel="external">
  Кастомный rel
</Link>
```

---

## Inline-действие без `href`

```tsx
<p>
  Нажмите <Link onClick={openModal}>здесь</Link>, чтобы открыть форму.
</p>
```

Без `href` корневой DOM-тег — `<button type="button">`; визуально не отличается от `<a>`.

---

## Цветовые варианты

```tsx
<Link href="/x">Default</Link>
<Link href="/x" variant="secondary">Secondary</Link>
<Link href="/x" variant="danger">Удалить</Link>
```

| `variant` | Цвет |
|-----------|------|
| `default` | бренд (`--content-brand`) |
| `secondary` | основной (`--content-primary`) |
| `danger` | ошибка (`--content-error`) |

---

## С иконками

```tsx
import { Icon } from 'turbo-ui';

<Link
  href="https://example.com"
  target="_blank"
  endIcon={<Icon name="external-link" size="100%" />}
>
  Открыть
</Link>

<Link
  href="/files/report.pdf"
  startIcon={<Icon name="download" size="100%" />}
>
  Скачать PDF
</Link>
```

Иконки занимают `1em` × `1em` и наследуют цвет текста через `currentColor` — в т. ч. в `disabled`.

---

## Disabled

```tsx
<Link href="/page" disabled>
  Сейчас недоступно
</Link>

<Link onClick={fn} disabled>
  Действие выключено
</Link>
```

Поведение:

- `<a>` теряет `href` в DOM, получает `aria-disabled="true"` и `tabIndex={-1}`.
- `<button>` получает нативный `disabled`.
- В обоих случаях клик не выполняет ни навигации, ни `onClick`.

---

## Ref

```tsx
const anchorRef = React.useRef<HTMLAnchorElement>(null);

<Link ref={anchorRef} href="/x">…</Link>;
// anchorRef.current → <a>

const buttonRef = React.useRef<HTMLButtonElement>(null);

<Link ref={buttonRef} onClick={fn}>…</Link>;
// buttonRef.current → <button>
```

---

## Композиция с другими компонентами проекта

Внутри `TurboUIProvider` (или контейнера с классом `turbo-ui-scope`) шрифт уже `ONY One` через токены. `Link` использует наследование — никакой дополнительной настройки не требуется.

```tsx
<TurboUIProvider>
  <p>
    Подробнее в <Link href="/docs">документации</Link> или{' '}
    <Link onClick={openContacts} variant="secondary">
      свяжитесь с нами
    </Link>.
  </p>
</TurboUIProvider>
```

---

## Что НЕ предусмотрено

- **Полиморфный `as`/`asChild`** — отсутствует. Для интеграции с роутерами (Next.js Link, React Router) оборачивайте `Link` снаружи:

  ```tsx
  // Next.js (App Router)
  <NextLink href="/page" passHref legacyBehavior>
    <Link>Перейти</Link>
  </NextLink>

  // React Router (через onClick + navigate)
  const navigate = useNavigate();
  <Link onClick={(e) => { e.preventDefault(); navigate('/page'); }} href="/page">
    Перейти
  </Link>
  ```

- **Проп `size`** — отсутствует; размер всегда наследуется. Для уменьшения/увеличения — оборачивайте в `<small>` или элемент с нужным `font-size`:

  ```tsx
  <small>
    <Link href="/x">Маленькая ссылка</Link>
  </small>
  ```

- **Hover-цвет варианта** — отсутствует; в `hover` ссылка теряет подчёркивание (классический паттерн).
