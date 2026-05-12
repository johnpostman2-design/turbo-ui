# Data Model: Link (typography)

`Link` — inline-typography компонент с двумя возможными корневыми DOM-тегами (`<a>` / `<button>`), тремя цветовыми вариантами и пятью визуальными состояниями. Все значения — токены проекта или CSS-keyword’ы; никаких чисел/цветов из дизайна напрямую в коде.

---

## Сущность: `Link`

Корневой DOM-узел рендерится по правилу:

```text
href !== undefined    → <a href={href} target rel onClick ...>
href === undefined    → <button type="button" onClick ...>
```

Внутри корня — три потомка по горизонтали (опционально):

```text
<root class="root variant[default|secondary|danger] [disabled]">
  [<span class="iconStart" aria-hidden>{startIcon}</span>]
  <span class="text">{children}</span>
  [<span class="iconEnd" aria-hidden>{endIcon}</span>]
</root>
```

### Поля сущности

| Поле | Тип | По умолч. | Описание |
|------|-----|-----------|----------|
| `href` | `string?` | — | Целевой адрес. При наличии — корневой тег `<a>`. |
| `target` | `string?` | — | Только для `<a>`. При `"_blank"` автозаполнение `rel`. |
| `rel` | `string?` | — | Только для `<a>`. Если задан явно — используется без модификаций. |
| `onClick` | `(event) => void` | — | Хендлер клика для обоих корневых тегов. |
| `variant` | `"default" \| "secondary" \| "danger"` | `"default"` | Цветовая роль ссылки. |
| `disabled` | `boolean` | `false` | Блокирует клик и навигацию, перекрашивает в `--content-disabled`. |
| `startIcon` | `ReactNode?` | — | Иконка слева. Рендерится в `<span aria-hidden>`. |
| `endIcon` | `ReactNode?` | — | Иконка справа. Рендерится в `<span aria-hidden>`. |
| `children` | `ReactNode` | — | Текстовое содержимое ссылки. |
| `className` | `string?` | — | Класс на корневой DOM-узел. |
| `style` | `CSSProperties?` | — | Inline-стили на корневой DOM-узел. |
| `ref` | `Ref<HTMLAnchorElement \| HTMLButtonElement>` | — | На корневой DOM-узел. |
| (остальные пропы) | — | — | Прозрачно пробрасываются на корневой DOM-узел соответствующего тега. |

### Производные

| Поле | Формула |
|------|---------|
| `Component` | `href !== undefined ? 'a' : 'button'` |
| `computedRel` | `target === '_blank' && rel === undefined ? 'noopener noreferrer' : rel` |
| `hrefAttr` | `disabled ? undefined : href` |
| `tabIndexAttr` | `disabled && Component === 'a' ? -1 : undefined` |
| `ariaDisabledAttr` | `disabled && Component === 'a' ? true : undefined` |
| `nativeDisabledAttr` | `disabled && Component === 'button' ? true : undefined` |
| `typeAttr` | `Component === 'button' ? 'button' : undefined` |
| `onClickGuarded` | если `disabled` — `(e) => { e.preventDefault(); return; }`; иначе — `onClick` |

### Состояния

```mermaid
stateDiagram-v2
  [*] --> Default
  Default --> Hover: mouseover
  Hover --> Default: mouseleave
  Default --> Active: pointerdown
  Active --> Default: pointerup
  Default --> Focus: focus-visible (keyboard)
  Focus --> Default: blur / pointerdown
  Default --> Disabled: disabled=true
  Hover --> Disabled: disabled=true
  Focus --> Disabled: disabled=true
  Active --> Disabled: disabled=true
  Disabled --> Default: disabled=false
```

**Инварианты**:

1. В `Disabled` ни `onClick`, ни навигация не выполняются.
2. Цвет иконок (`startIcon`/`endIcon`) совпадает с цветом текста во всех состояниях через `currentColor`.
3. `font-family`, `font-size`, `line-height`, `letter-spacing` корня — **наследуются** от родителя (`font: inherit`).
4. Подчёркивание присутствует во всех состояниях, кроме `Hover` и `Disabled` (см. таблицу в §E research).

---

## Сущность: `Variant`

Цветовая роль `Link`. Определяет один цвет — он же `currentColor` для иконок.

| `variant` | CSS-class | `color` (default-state) |
|-----------|-----------|--------------------------|
| `default` | `.variantDefault` | `var(--content-brand)` |
| `secondary` | `.variantSecondary` | `var(--content-primary)` |
| `danger` | `.variantDanger` | `var(--content-error)` |

В состоянии `Disabled` цвет всех вариантов одинаков: `var(--content-disabled)`.

---

## Сущность: `State`

Визуальное состояние `Link`. Реализуется через CSS-псевдоклассы (`:hover`, `:active`, `:focus-visible`, `:disabled` / `[aria-disabled]`).

| State | Селектор | `text-decoration` | `cursor` | Доп. |
|-------|----------|-------------------|----------|------|
| `Default` | `.root` | `underline; text-decoration-color: currentColor; text-decoration-thickness: from-font; text-underline-offset: from-font` | `pointer` | — |
| `Hover` | `.root:hover:not(.disabled)` | `none` | `pointer` | — |
| `Active` | `.root:active:not(.disabled)` | `underline; text-decoration-thickness: 0.1em` | `pointer` | — |
| `Focus` | `.root:focus-visible:not(.disabled)` | как `Default` | `pointer` | `outline: 2px solid currentColor; outline-offset: 2px; border-radius: var(--rounds-s)` |
| `Disabled` | `.root.disabled, .root:disabled` | `none` | `not-allowed` | `pointer-events: none` |

`Disabled` важнее остальных состояний (никаких hover/focus-эффектов в этом состоянии).

---

## Сущность: `IconSlot`

Контейнер для иконки слева/справа от текста.

| Поле | Значение |
|------|---------|
| Тип элемента | `<span aria-hidden="true">` |
| Класс | `.iconStart` / `.iconEnd` |
| `display` | `inline-flex` |
| `align-items` | `center` |
| `width` | `1em` |
| `height` | `1em` |
| `color` | `currentColor` |
| `flex-shrink` | `0` |
| `margin` (iconStart) | `0 0.25em 0 0` |
| `margin` (iconEnd) | `0 0 0 0.25em` |
| `> svg` / `> *` | `width: 100%; height: 100%; fill: currentColor` |

Слот рендерится только если соответствующий проп (`startIcon`/`endIcon`) задан. Если пуст — DOM-элемент не создаётся, межслотовый отступ не «зависает».

---

## Сущность: корневой DOM-узел

### Когда `href` задан (`Component = 'a'`)

| Атрибут | Источник |
|---------|----------|
| `href` | `hrefAttr` (или undefined при `disabled`) |
| `target` | пользовательский `target` |
| `rel` | `computedRel` |
| `aria-disabled` | `ariaDisabledAttr` |
| `tabIndex` | `tabIndexAttr` (`-1` при `disabled`) |
| `onClick` | `onClickGuarded` |
| `class` | `clsx(styles.root, styles[`variant${X}`], disabled && styles.disabled, className)` |
| `ref` | forwardRef на `HTMLAnchorElement` |
| остальные `rest` | как есть (`download`, `id`, `aria-*`, `data-*` и т. п.) |

### Когда `href` не задан (`Component = 'button'`)

| Атрибут | Источник |
|---------|----------|
| `type` | `'button'` |
| `disabled` | `nativeDisabledAttr` |
| `onClick` | `onClickGuarded` |
| `class` | как у `<a>` |
| `ref` | forwardRef на `HTMLButtonElement` |
| остальные `rest` | как есть |

Не пробрасываются на `<button>`: `href`, `target`, `rel`, `download` (TypeScript отфильтрует через `Omit` на уровне типа props).

---

## Validation rules (требования спецификации → код)

| Требование | Реализация |
|-----------|------------|
| FR-001 (inline + наследование typography) | `.root { display: inline-flex; align-items: baseline; font: inherit; vertical-align: baseline }` |
| FR-002 (рендер `<a>`/`<button>` по `href`) | `Component = href !== undefined ? 'a' : 'button'` |
| FR-003 (`onClick` для обоих, поддержка `preventDefault`) | `onClickGuarded` пробрасывается; внутри проверяется `disabled` |
| FR-004 (`target`+`rel` авто `noopener noreferrer`) | `computedRel = target === '_blank' && rel === undefined ? 'noopener noreferrer' : rel` |
| FR-005 (варианты по цвету) | `styles.variantDefault | variantSecondary | variantDanger` |
| FR-006 (состояния через токены) | CSS-псевдоклассы; цвета — токены, подчёркивание — CSS-keyword |
| FR-007 (`disabled` блокирует клик/навигацию) | `hrefAttr = undefined`, `aria-disabled`, `tabIndex=-1`, `onClickGuarded` + CSS `pointer-events: none` |
| FR-008 (`startIcon`/`endIcon` 1em + currentColor) | `IconSlot` спецификация выше |
| FR-009 (подчёркивание по умолчанию) | `.root { text-decoration: underline … }` |
| FR-010 (только токены и `ONY One`) | Все color/spacing — токены; `font: inherit` тянет `ONY One` из `turbo-ui-scope` |
| FR-011 (`className`/`style` на корне) | `clsx(styles.root, …, className)` + `style` спред |
| FR-012 (`ref` на корневой DOM) | `forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>` |
| FR-013 (rest props на корень) | `...rest` пробрасывается, типы — пересечение `HTMLAnchorAttributes` и `HTMLButtonAttributes` через discriminated union или дженерик |
| FR-014 (`turbo-ui` + `turbo-ui/link`) | `src/index.ts` + `package.json` exports + `vite.config.lib.js` entry |
| FR-015 (Storybook ≥ 8 stories) | `Link.stories.tsx` |
| FR-016 (docs по шаблону) | `Link.docs.tsx`: Figma/GitHub buttons + базовое описание + Подключение + Пропсы + Варианты + Состояния + Иконки |
| FR-017 (`storySort.order`) | `.storybook/preview.js`: `'Link'` после `'IconButton'` |
