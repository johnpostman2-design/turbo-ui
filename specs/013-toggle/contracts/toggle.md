# Contract: `Toggle`

Переключатель «вкл/выкл» в виде нативного чекбокса со стилем switch. Часть форм; не Button.

## Module

```ts
import { Toggle, type ToggleProps, type ToggleSize } from 'turbo-ui/toggle';
// или
import { Toggle, type ToggleProps, type ToggleSize } from 'turbo-ui';
```

## TypeScript

```ts
import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

export type ToggleSize = 'small' | 'medium' | 'large';

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** Размер трека и типографики подписи. */
  size?: ToggleSize;
  /** Блокирует переключение. */
  disabled?: boolean;
  /** Controlled-значение. */
  checked?: boolean;
  /** Uncontrolled-начальное значение. */
  defaultChecked?: boolean;
  /** Хендлер смены значения (нативное событие input). */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Подпись слева от переключателя. */
  startText?: ReactNode;
  /** Подпись справа от переключателя. */
  endText?: ReactNode;
  /** Класс на корневой <label>. */
  className?: string;
}

export const Toggle: React.ForwardRefExoticComponent<
  ToggleProps & React.RefAttributes<HTMLInputElement>
>;
```

> `ref` указывает на нативный `<input type="checkbox" role="switch">`, не на корневой `<label>`. Это согласовано с `Checkbox` и удобно для программного `.focus()`, `.click()`, чтения `.checked`.

## Props

| Prop | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Размер трека и типографика подписи. |
| `checked` | `boolean` | — | Если задан — controlled-режим. Должен идти в паре с `onChange`. |
| `defaultChecked` | `boolean` | — | Uncontrolled-режим, начальное значение. |
| `disabled` | `boolean` | `false` | Блокирует переключение. Native `disabled` на `<input>`. |
| `onChange` | `(event) => void` | — | Хендлер смены значения. Вызывается с нативным `React.ChangeEvent<HTMLInputElement>`. |
| `startText` | `ReactNode` | — | Подпись слева от переключателя. Клик по подписи переключает значение. |
| `endText` | `ReactNode` | — | Подпись справа от переключателя. Клик по подписи переключает значение. |
| `name` | `string` | — | Native input attr (форма). |
| `value` | `string` | `'on'` | Native input attr — значение в FormData при `checked=true`. |
| `id` | `string` | — | Native input attr. |
| `className` | `string` | — | Класс на корневой `<label>`. |
| `style` | `CSSProperties` | — | Inline-стили на корневой `<label>`. |
| `ref` | `Ref<HTMLInputElement>` | — | Forward ref на нативный `<input>`. |
| остальные `rest` | — | — | Любые `InputHTMLAttributes<HTMLInputElement>`: `aria-*`, `data-*`, `autoFocus`, `tabIndex`, `form`, `required` и т. д. — на `<input>`. |

## Поведение

### Управление состоянием

- **Uncontrolled** (по умолчанию): компонент хранит состояние внутри (`useState`). Опциональный `defaultChecked` задаёт начальное значение. `onChange` опционален.
- **Controlled**: если задан `checked` (не `undefined`) — компонент использует его как источник правды. `onChange` обязателен для интерактивности; без него компонент работает как read-only (зеркалирует поведение React `<input>`).
- Детект — `isControlled = checked !== undefined`. Переключение режима в рантайме (`checked` появляется/исчезает) допустимо, но даёт React-warning, как у нативного `<input>`.

### Интерактивность

- Клик мышью по любому из: трек, knob, подпись (`startText` / `endText`) — переключает значение (если не `disabled`). Срабатывает через нативную семантику `<label>` с вложенным `<input>`.
- Нажатие Space на сфокусированном переключателе — переключает значение (нативное поведение `<input type="checkbox">`).
- Tab — фокусирует переключатель (если не `disabled`).

### `disabled`

- Native `disabled` на `<input>` — браузер сам блокирует клик и Space, исключает из Tab.
- CSS: трек, knob, подпись — цвет `var(--content-disabled)`. `cursor: not-allowed` на корне.
- При `disabled` `onChange` не вызывается.

### Анимация

- Перемещение knob слева↔справа — CSS `transition: transform 0.15s ease`.
- Изменение цвета трека — CSS `transition: background-color 0.15s ease`.

### Никакого hover

- У компонента **нет** отдельных hover-стилей трека или knob. Курсор — `pointer` (или `not-allowed` в `disabled`). Дизайн-решение продиктовано макетом 929:141.

### Focus ring

- Только при `:focus-visible` от нативного input (т. е. при клавиатурной навигации, не при клике мышью). Кольцо: `outline: 2px solid var(--content-primary); outline-offset: 2px;` на трек.

## Состояния и стилизация

| State | Селектор | Track | Knob | Text |
|-------|----------|-------|------|------|
| Off, default | `.root` (без `data-checked`, без `.disabled`) | `var(--content-tertiary)` | `var(--surface-primary-main)` | `var(--content-primary)` |
| On, default | `.root[data-checked]:not(.disabled)` | `var(--content-primary)` | `var(--surface-primary-main)` | `var(--content-primary)` |
| Off, disabled | `.root.disabled` | `var(--content-disabled)` | `var(--content-disabled)` | `var(--content-disabled)` |
| On, disabled | `.root[data-checked].disabled` | `var(--content-disabled)` | `var(--content-disabled)` | `var(--content-disabled)` |
| Focus (любое) | `.root:has(.native:focus-visible):not(.disabled) .track` | `outline: 2px solid var(--content-primary); outline-offset: 2px;` | — | — |

## Размеры

| `size` | Track (W × H) | Knob | `gap` (текст ↔ трек) | Подпись |
|--------|---------------|------|---------------------|---------|
| `small` | 24 × 16 | 12 × 12 | `var(--spacing-8)` | `--typescale-lable-small-*` |
| `medium` | 40 × 24 | 20 × 20 | `var(--spacing-8)` | `--typescale-lable-medium-*` |
| `large` | 44 × 28 | 24 × 24 | `var(--spacing-12)` | `--typescale-lable-large-*` |

## Edge cases

- **`startText` и `endText` одновременно** — рендерятся оба; раскладка `[start] [knob] [end]`. Полезно для «Off — toggle — On».
- **Оба пропа подписи пусты** — рендерится «голый» переключатель, без зарезервированного места под подпись.
- **Очень длинный `startText` / `endText`** — обрезается `text-overflow: ellipsis`; общая ширина не превышает родителя.
- **`autoFocus`** — поддерживается через native input. На монтаже фокусируется (с фокус-рингом, как от Tab).
- **`disabled` внутри `<form>`** — нативное поведение: значение не отправляется при submit (поведение `disabled`-input).
- **Контролируемый `checked` без `onChange`** — read-only. Дефолтный React-warning может появиться; в проекте не подавляется.
- **Глобальные стили хоста на `input`/`label`** — компонент использует собственные CSS Module-классы; стиль не «протекает» от хоста.

## Examples

### Базовый uncontrolled

```tsx
<Toggle defaultChecked startText="Уведомления" />
```

### Controlled

```tsx
const [enabled, setEnabled] = React.useState(false);
<Toggle checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
```

### Размеры

```tsx
<Toggle size="small" startText="Тёмная тема" />
<Toggle size="medium" startText="Тёмная тема" />
<Toggle size="large" startText="Тёмная тема" />
```

### Подпись слева и справа

```tsx
<Toggle startText="Off" endText="On" />
```

### Disabled

```tsx
<Toggle disabled startText="Двухфакторная аутентификация" />
<Toggle disabled defaultChecked startText="Включено системой" />
```

### Native attrs (`name`, `value`)

```tsx
<form onSubmit={onSubmit}>
  <Toggle name="notifications" value="yes" startText="Уведомления" />
  <button type="submit">Сохранить</button>
</form>
```

### Программный фокус через `ref`

```tsx
const ref = React.useRef<HTMLInputElement>(null);
<Toggle ref={ref} startText="…" />;
// ref.current?.focus({ focusVisible: true } as never);
```

## What is NOT included

- Hover-стили трека/knob — отсутствуют по дизайн-решению (FR-008).
- Цветовые варианты (`variant`) — на MVP нет. Toggle всегда «нейтральный» (черный/серый). При появлении дизайн-задачи добавится позже.
- Раздел «Доступность» в spec/docs — отсутствует по требованию пользователя. Семантика обеспечивается нативным `<input role="switch">`.
- Раздел «Адаптивность» в spec/docs — отсутствует по требованию пользователя.
- Тень knob (drop-shadow из Figma) — на MVP не реализуется (см. research.md §D).
- Полиморфизм через `as`/`asChild` — не предусмотрено (минимальный API, конституция принцип VI).
