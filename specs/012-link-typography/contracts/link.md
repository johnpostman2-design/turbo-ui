# Contract: `Link`

Текстовая ссылка/типографическое действие, рендерящееся inline в наборном тексте. Часть typography проекта, не Button.

## Module

```ts
import { Link, type LinkProps, type LinkVariant } from 'turbo-ui/link';
// или
import { Link, type LinkProps, type LinkVariant } from 'turbo-ui';
```

## TypeScript

```ts
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

export type LinkVariant = 'default' | 'secondary' | 'danger';

// Общие пропы (вне зависимости от корневого тега).
interface LinkCommonProps {
  /** Цветовая роль ссылки. */
  variant?: LinkVariant;
  /** Блокирует клик и навигацию; цвет — content-disabled, без подчёркивания. */
  disabled?: boolean;
  /** Иконка слева от текста (`1em`, currentColor). */
  startIcon?: ReactNode;
  /** Иконка справа от текста (`1em`, currentColor). */
  endIcon?: ReactNode;
  /** Текст ссылки. */
  children?: ReactNode;
  /** Класс на корневой DOM-узел. */
  className?: string;
}

// Пропы при наличии href → корень <a>.
interface LinkAnchorProps
  extends LinkCommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'> {
  href: string;
}

// Пропы без href → корень <button type="button">.
interface LinkButtonProps
  extends LinkCommonProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className' | 'type' | 'disabled'
    > {
  href?: undefined;
}

export type LinkProps = LinkAnchorProps | LinkButtonProps;

export const Link: React.ForwardRefExoticComponent<
  LinkProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>
>;
```

> Дискриминированный union по `href` даёт TypeScript-проверку: если `href` задан — допустимы `target`/`rel`/`download`; если нет — только `<button>`-атрибуты. `disabled` поднят в общую часть (применяется к обоим тегам).

## Props

| Prop | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `href` | `string` | — | Если задан — корневой тег `<a>` с этим адресом. Если нет — корневой тег `<button type="button">`. |
| `target` | `string` | — | Только для `<a>`. При `"_blank"` без `rel` компонент добавляет `rel="noopener noreferrer"`. |
| `rel` | `string` | — | Только для `<a>`. Если задан явно — используется как есть, без модификаций. |
| `onClick` | `(event) => void` | — | Хендлер клика. Если в нём вызван `event.preventDefault()` — навигация (для варианта с `href`) не выполняется. |
| `variant` | `'default' \| 'secondary' \| 'danger'` | `'default'` | Цветовая роль ссылки. Цвет также распространяется на иконки через `currentColor`. |
| `disabled` | `boolean` | `false` | Блокирует клик и навигацию; визуально — `--content-disabled`, без подчёркивания, `cursor: not-allowed`. |
| `startIcon` | `ReactNode` | — | Иконка слева. Размер `1em`, цвет `currentColor`. |
| `endIcon` | `ReactNode` | — | Иконка справа. Размер `1em`, цвет `currentColor`. |
| `children` | `ReactNode` | — | Текст ссылки. |
| `className` | `string` | — | Класс на корневой DOM-узел. |
| `ref` | `Ref<HTMLAnchorElement \| HTMLButtonElement>` | — | На корневой DOM-узел соответствующего тега. |
| остальные `rest` | — | — | Нативные атрибуты соответствующего тега (`<a>` или `<button>`): `id`, `data-*`, `aria-*`, `download`, `form`, и т. п. |

## Поведение

- Тег корня выбирается **строго** по наличию `href`: с `href` — `<a>`, без `href` — `<button type="button">`.
- При `target="_blank"` и неуказанном `rel` компонент автоматически проставляет `rel="noopener noreferrer"`. Явный `rel` НЕ перетирается.
- `onClick` вызывается для обоих корневых тегов. Для варианта с `href`: если в `onClick` вызван `event.preventDefault()` — навигация не выполняется.
- При `disabled`:
  - `<a>`: атрибут `href` НЕ выставляется в DOM, добавляются `aria-disabled="true"` и `tabIndex={-1}`; `onClick` подавляется (выполняется `event.preventDefault()` и ранний return).
  - `<button>`: ставится нативный `disabled`; `onClick` не вызывается браузером.
  - CSS: `pointer-events: none; cursor: not-allowed; color: var(--content-disabled); text-decoration: none`.
- `Link` НЕ задаёт собственный `font-family`/`font-size`/`line-height`/`letter-spacing` — наследует от родителя через `font: inherit`. Внутри `turbo-ui-scope`/`TurboUIProvider` это автоматически даёт `ONY One`.
- Иконки рендерятся в обёртках `<span aria-hidden="true">` с `width: 1em; height: 1em; color: currentColor`. Внутренние `<svg>`/любой ReactNode заполняют слот через `width: 100%; height: 100%; fill: currentColor`.

## Состояния и стилизация

| State | Селектор | Что меняется |
|-------|----------|--------------|
| `Default` | `.root` | Цвет — токен `variant`; `text-decoration: underline; text-decoration-color: currentColor; text-decoration-thickness: from-font; text-underline-offset: from-font` |
| `Hover` | `.root:hover:not(.disabled)` | `text-decoration: none` |
| `Active` | `.root:active:not(.disabled)` | `text-decoration: underline; text-decoration-thickness: 0.1em` |
| `Focus` | `.root:focus-visible:not(.disabled)` | `outline: 2px solid currentColor; outline-offset: 2px; border-radius: var(--rounds-s)` |
| `Disabled` | `.root.disabled` или `.root:disabled` | `color: var(--content-disabled); text-decoration: none; cursor: not-allowed; pointer-events: none` |

| Variant | CSS-class | `color` (default-state) |
|---------|-----------|--------------------------|
| `default` | `.variantDefault` | `var(--content-brand)` |
| `secondary` | `.variantSecondary` | `var(--content-primary)` |
| `danger` | `.variantDanger` | `var(--content-error)` |

## Edge cases

- **Пустой `children` без иконок** — компонент рендерится как пустой корневой DOM-узел (никаких ошибок); рекомендация в docs — не использовать без содержимого.
- **`Link` внутри `<button>` / `Button`** — невалидно по HTML (вложенные интерактивные элементы). Документация предупреждает; runtime-валидации нет.
- **Глобальные стили хоста на `a { color: ... }`** — внутри `turbo-ui-scope` `Link` применяет собственные классы CSS Module, которые перебивают типовые host-CSS благодаря специфичности модулей.
- **`disabled` + `target="_blank"`** — атрибут `href` не выставляется → ни target, ни новая вкладка не открываются (`rel` остаётся как есть для CSS-инспекции, но без `href` значения не работают).
- **Длинная ссылка без пробелов (URL)** — переносится по `word-break: normal`. Для URL потребитель может добавить собственный CSS `overflow-wrap: anywhere`.

## Examples

### Внутри абзаца

```tsx
<p>
  Подробнее в <Link href="/docs">нашей документации</Link>.
</p>
```

### С `target="_blank"`

```tsx
<Link href="https://example.com" target="_blank">Внешняя ссылка</Link>
// rel автоматически: "noopener noreferrer"
```

### Без `href` (inline-действие в тексте)

```tsx
<p>
  Нажмите <Link onClick={openModal}>здесь</Link>, чтобы открыть.
</p>
```

### Варианты

```tsx
<Link href="/x">Default (brand)</Link>
<Link href="/x" variant="secondary">Secondary (primary)</Link>
<Link href="/x" variant="danger">Удалить</Link>
```

### С иконками

```tsx
<Link
  href="https://example.com"
  target="_blank"
  endIcon={<Icon name="external-link" size="100%" />}
>
  Открыть в новой вкладке
</Link>

<Link
  href="/file.pdf"
  startIcon={<Icon name="download" size="100%" />}
>
  Скачать PDF
</Link>
```

### Disabled

```tsx
<Link href="/page" disabled>Сейчас недоступно</Link>
<Link onClick={fn} disabled>Действие выключено</Link>
```

### С ref

```tsx
const ref = React.useRef<HTMLAnchorElement>(null);
<Link ref={ref} href="/x">…</Link>;
// ref.current → <a>

const btnRef = React.useRef<HTMLButtonElement>(null);
<Link ref={btnRef} onClick={fn}>…</Link>;
// btnRef.current → <button>
```

## Accessibility (минимально)

> В этой фиче отдельного блока «Доступность» в spec/docs не создаётся (по требованию). Минимально необходимая семантика обеспечивается корневым тегом и обработкой `disabled`:
>
> - `<a>` с `href` — нативная ссылка (Enter/Space, контекстное меню, `Cmd/Ctrl+Click`).
> - `<button type="button">` — нативная кнопка (Enter/Space).
> - `disabled` для `<a>` — `aria-disabled="true"` + `tabIndex={-1}` + удаление `href`.
> - Иконки помечены `aria-hidden="true"` (информативный текст — это `children`).

## What is NOT included

- Полиморфизм через `as`/`asChild` — отклонён (см. research §B). Сценарий «Link внутри Next/RR Link» решается обёрткой со стороны потребителя.
- Проп `size` — отклонён (см. research §J). Размер всегда наследуется.
- Блок «Адаптивность» в spec/docs — отсутствует по требованию (компонент inline, наследует typography; никаких own-breakpoint поведений не предусмотрено).
- Hover-цвет варианта (например, `--content-brand-hover`) — отсутствует, hover-индикация только через `text-decoration` (см. research §D, §E).
- Состояние `visited` (`:visited`) — не настраивается отдельно (наследует цвет варианта; браузерный default override для `:visited` подавляется через `color: inherit`-цепочку CSS Module).
