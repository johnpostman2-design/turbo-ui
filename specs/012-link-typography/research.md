# Research: Link (typography)

Решения и компромиссы по компоненту `Link` — текстовой ссылке/типографическому действию, рендерящемуся inline в наборном тексте.

---

## A. Корневой DOM-элемент: `<a>` vs `<button>`

**Decision**: рендерим `<a>` если задан `href`, иначе `<button type="button">`. Без `href` атрибуты `target`/`rel`/`download` игнорируются (с `console.warn` в dev — опционально, на этапе реализации).

**Rationale**:

- Семантика: ссылка с навигацией — `<a>`; «кликабельное действие в тексте» без перехода — `<button>` (с минимальным набором CSS, чтобы не выглядеть как нативная кнопка: `background: transparent; border: none; padding: 0; font: inherit; color: inherit; cursor: pointer`).
- Доступность и поведение клавиатуры: пользователь получает нативные жесты Enter/Space для соответствующего элемента, без ручного `onKeyDown`.
- Простая модель: чтение `href` — единственный switch; нет полиморфизма (см. §B).

**Alternatives considered**:

1. Всегда `<a>` (даже без `href`): не валидно для action-сценариев (`<a>` без `href` — это не focusable «text»; пришлось бы вручную ставить `role="button"`/`tabIndex=0`/`onKeyDown`).
2. Всегда `<button>` с псевдо-навигацией через `onClick` + `location.href`: ломает `Cmd/Ctrl+Click`, контекстное меню `Открыть в новой вкладке`, превью URL — потеря базовых браузерных возможностей.

---

## B. Полиморфизм через `as` / `asChild`

**Decision**: НЕТ. Только встроенный switch `<a>`/`<button>` по `href`.

**Rationale**:

- Минимальный публичный API (Constitution VI). Полиморфные пропы требуют generic-типизации и усложняют контракт.
- Сценарий «обернуть `Link` в `NextLink`/`react-router` `<Link>`» решается стандартно: оборачивает потребитель библиотеки сам (`<NextLink href="..." passHref legacyBehavior><Link>...</Link></NextLink>` или их `asChild`-аналоги). Это вне области компонента Design System.
- Если в будущем понадобится — добавляется через `legacy`/MAJOR. Сейчас — преждевременная абстракция.

**Alternatives considered**:

1. `as` пропа (как у Chakra/RadixUI). Отклонено по причинам выше + теряет проверку допустимых атрибутов нативного элемента.
2. `asChild` (Radix-стиль). Отклонено: требует `Slot`-абстракции/`cloneElement` и `mergeProps` — лишняя зависимость и сложность.

---

## C. Шрифт и размер

**Decision**: `Link` НЕ задаёт `font-family`/`font-size`/`line-height`/`letter-spacing` явно. В CSS используется `font: inherit;` и (для `<button>`) сброс UA-стилей (`background: none; border: 0; padding: 0; margin: 0; color: inherit; cursor: pointer`). Шрифт `ONY One` подтягивается:

1. От ближайшего родителя, у которого выставлены `--family-brand` или `font-family`. Внутри `turbo-ui-scope`/`TurboUIProvider` шрифт — уже `ONY One` через глобальные стили проекта (`.turbo-ui-scope { font-family: var(--family-brand) }`).
2. Если потребитель использует компонент вне `turbo-ui-scope` — шрифт наследуется от его собственной типографики. Это **сознательное поведение**: Link встаёт «в строку» с окружающим текстом.

**Rationale**:

- Конституция требует использовать только шрифт проекта (`ONY One`) и токены. Внутри `turbo-ui-scope` это выполняется автоматически.
- Явное `font-family: var(--family-brand)` сломало бы наследование в случаях, когда `Link` стоит внутри заголовка с другим typescale (например, `--typescale-headline-large-font` совпадает с `--family-brand`, но размер другой — мы хотим унаследовать размер).
- Тест: проверяем, что внутри `<p>` `Link` имеет `font-size` родительского `<p>`, и внутри `<h2>` — `font-size` `<h2>`.

**Alternatives considered**:

1. Явно `font-family: var(--family-brand)` в `.root`. Отклонено — теряется наследование размера и нарушается идея «Link — часть typography».
2. Дополнительный проп `size: 'small' | 'medium' | 'large'`. Отклонено — нарушает идею наследования и раздувает API.

---

## D. Цветовые варианты

**Decision**: три варианта, каждый — на один токен `--content-*`:

| `variant` | Цвет текста (default-state) |
|-----------|-----------------------------|
| `default` | `--content-brand` (#228be7) |
| `secondary` | `--content-primary` (#000000) |
| `danger` | `--content-error` (#ff0000) |

**Rationale**:

- Палитра `Kontur button-link` (`use=default | success | danger`) — близкий аналог. В Turbo UI отдельного `content-success` для текста ссылки не нашлось среди очевидных кейсов (success-action — обычно кнопка), и его легко добавить позже отдельной задачей. На MVP — три самых частых роли.
- Все три токена уже существуют в `tokens.json` (`--content-brand`, `--content-primary`, `--content-error`).

**Hover/active** меняют не цвет, а подчёркивание (см. §E). В проекте нет токенов `--content-*-hover` для текста — добавление новых только ради ссылки — преждевременно и нарушает «минимальный набор токенов» (Constitution I).

**Alternatives considered**:

1. Использовать `--surface-brand-hover` (полупрозрачный) как фон при hover. Отклонено — превращает ссылку в кнопку с заливкой; противоречит идее «Link — typography».
2. `color-mix(in srgb, var(--content-brand) 80%, transparent)` для hover. Отклонено — нестабильная поддержка в старых браузерах и неочевидный результат.
3. Добавить `--content-brand-hover`/`--content-error-hover` в токены. Отклонено сейчас (нет дизайн-решения по точной палитре hover-цветов для текста). Если дизайнеры зафиксируют — добавим в отдельной задаче и переиспользуем здесь.

---

## E. Подчёркивание и индикация состояний

**Decision**: используем `text-decoration` как основной индикатор:

| State | `text-decoration` | `color` | `cursor` | Дополнительно |
|-------|-------------------|---------|----------|---------------|
| `default` | `underline; text-decoration-color: currentColor; text-decoration-thickness: from-font; text-underline-offset: from-font` | токен варианта | `pointer` | — |
| `hover` | `none` | токен варианта | `pointer` | подчёркивание исчезает |
| `active` | `underline; text-decoration-thickness: 0.1em` | токен варианта | `pointer` | акцент: чуть жирнее подчёркивание |
| `focus-visible` | `underline` (как default) | токен варианта | `pointer` | дополнительно — focus-ring (см. §F) |
| `disabled` | `none` | `--content-disabled` | `not-allowed` | `pointer-events: none` |

**Rationale**:

- Классический паттерн web: «подчёркивание есть в покое, исчезает на hover, возвращается на active» — узнаваемо, не требует фона/рамок и не делает Link похожим на кнопку.
- Все значения, кроме `0.1em` для active, — CSS-keyword’ы (`from-font`, `currentColor`). `0.1em` — единственное численное значение и оно относительное (зависит от текущего `font-size`); это не «hardcoded цвет/размер из дизайна», а CSS-приём, поэтому допустимо (Constitution II — запрет на hardcoded визуальные решения, не на CSS-механику типографики).

**Edge cases**:

- Внутри родителя с `text-decoration: none !important` (host-стили): Link явно ставит `text-decoration` через CSS-модуль (специфичность модулей выше типовых host-CSS, плюс `turbo-ui-scope` гарантирует изоляцию).

**Alternatives considered**:

1. Подчёркивание всегда (default+hover+active). Отклонено — нет visual-affordance hover для пользователей с мышью.
2. Hover — изменение `text-decoration-color` на полупрозрачный. Отклонено — слабый сигнал, плохо различим.
3. Hover — фон/«пилюля». Отклонено — превращает Link в кнопку.

---

## F. Focus ring

**Decision**: `:focus-visible` — `outline: 2px solid currentColor; outline-offset: 2px; border-radius: var(--rounds-s)` через комбинацию `outline` + `border-radius`. Без новых токенов.

**Rationale**:

- `currentColor` гарантирует, что фокус-кольцо совпадает с цветом варианта (brand для `default`, error для `danger` и т. д.).
- `outline-offset: 2px` — минимальный отступ, чтобы не наезжал на подчёркивание. `2px` — фиксированное значение; альтернатива через токен (`var(--spacing-2)` — такого нет, есть `--spacing-4`). Используем `var(--spacing-4)` если будет сильно мешать; на ревью решим, оставлять ли 2px или взять `--spacing-4` (~4px). На MVP — `2px` как минимально достаточный.
- `border-radius` берётся из существующего токена скруглений (`--rounds-s` = 4px). Подходит для текстового размера.

**Alternatives considered**:

1. Box-shadow вместо outline. Отклонено — теряется работа со скруглением подчёркнутого текста (outline в большинстве браузеров уже корректно следует за `border-radius` корневого элемента).
2. Отсутствие focus-ring (только подчёркивание). Отклонено — нарушает базовое визуальное аффорданс для клавиатурной навигации.

---

## G. Disabled на `<a>` и `<button>`

**Decision**:

- На `<button>` — нативный `disabled`.
- На `<a>` — атрибут `href` НЕ применяется к DOM (рендерим `<a>` без `href`); дополнительно ставим `aria-disabled="true"` и `tabIndex={-1}`; в `onClick` — `event.preventDefault()` + ранний return.
- CSS: `pointer-events: none; cursor: not-allowed; color: var(--content-disabled); text-decoration: none`.

**Rationale**:

- HTML не имеет атрибута `disabled` для `<a>`. Минимальная защита от клика — удаление `href`. Дополнительно подавляем `onClick`. `aria-disabled="true"` сообщает AT, `tabIndex={-1}` исключает из таб-обхода.
- Для `<button>` нативный `disabled` решает всё.

**Alternatives considered**:

1. Рендерить `<span>` в disabled-режиме. Отклонено — меняет тег между состояниями, ломает CSS-перерасчёт и React reconciliation.
2. Только CSS-блокировка (`pointer-events: none`). Отклонено — не защищает от клавиатурной активации.

---

## H. Иконки `startIcon` / `endIcon`

**Decision**: оба пропа — `ReactNode?`. Внутри `Link` рендерятся в `<span class="iconStart|iconEnd" aria-hidden="true">{icon}</span>`. CSS слота:

```css
.iconStart, .iconEnd {
  display: inline-flex;
  align-items: center;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  color: currentColor;
}
.iconStart > *, .iconEnd > * {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
.iconStart { margin-right: 0.25em; }
.iconEnd { margin-left: 0.25em; }
```

**Rationale**:

- `1em` обеспечивает масштабирование под текущий `font-size` (наследуется от родителя).
- `currentColor` гарантирует синхронизацию цвета иконки с цветом текста ссылки, включая все состояния (`hover`/`active`/`focus-visible`/`disabled`).
- Отступы `0.25em` — относительные, не «hardcoded» (зависят от размера шрифта). Это типографический «emspace»-приём, допустимый в CSS-инфраструктуре компонента.
- Потребитель использует существующий `Icon` проекта: `<Link href="..." startIcon={<Icon name="external" size="100%" />}>…</Link>`. Размер `100%` отдаёт управление CSS-слота.

**Alternatives considered**:

1. Принимать `iconName: string` и рендерить `<Icon>` внутри. Отклонено — увеличивает API-поверхность и зависимость от конкретного `Icon`-компонента (а ReactNode позволяет любые SVG).
2. Размер иконок фиксированным числом (`16px`). Отклонено — нарушает наследование typography (внутри `<h2>` иконка должна расти вместе с текстом).

---

## I. `target="_blank"` и `rel`

**Decision**: при `target="_blank"` и неуказанном `rel` компонент автоматически проставляет `rel="noopener noreferrer"`. Если пользователь явно задал `rel`, его значение используется как есть (без модификации).

**Rationale**:

- `noopener` обязателен для безопасности (изоляция от `window.opener`).
- `noreferrer` — типичный апгрейд для приватности; не критичен, но является сложившейся практикой.
- Не перетираем пользовательский `rel` — оставляем контроль.

**Alternatives considered**:

1. Всегда форсировать `noopener noreferrer` (override пользователя). Отклонено — нарушает принцип «минимальные сюрпризы» для разработчика.
2. Не подставлять ничего автоматически. Отклонено — нарушение безопасности по умолчанию.

---

## J. Размер `Link` — нет пропа `size`

**Decision**: проп `size` не вводим. Link всегда наследует размер из контекста.

**Rationale**:

- Размер ссылки в макете определяется размером окружающего текста (абзаца, заголовка, ячейки таблицы). Дублирующий проп ломает наследование и плодит варианты, не существующие в дизайне.
- Если потребуется уменьшить/увеличить — обёртка вокруг (например, `<small>` или `Typography`-компонент с нужным размером).

---

## K. Расположение в Storybook

**Decision**: добавить `'Link'` в `storySort.order` в `.storybook/preview.js` между `IconButton` и `Input`:

```text
Icons
Button
IconButton
Link            ← NEW
Input
…
```

**Rationale**:

- Link — типографический примитив, концептуально ближе к `Button`/`IconButton`, чем к полям ввода. Удобно держать в кластере «инлайн-интерактивные элементы».
- Foundations → Typography остаётся блоком про токены типографики; компонент `Link` живёт в `Components`, как и остальные интерактивные элементы.

**Alternatives considered**:

1. `Foundations → Link` (после Typography). Отклонено — `Foundations` зарезервирован под токены/foundations-блоки, не под компоненты.
2. `Components → Link` в самом конце. Отклонено — теряется логика кластеризации.

---

## L. Тестирование

**Decision**: Vitest, ≥ 8 тестов в `Link.test.tsx` по образцу `Button.test.tsx`/`InputField.test.tsx`. Минимально:

1. `Link` с `href` рендерится как `<a>` с правильным `href`.
2. `Link` без `href` рендерится как `<button type="button">`.
3. `onClick` вызывается при клике (для обоих корневых тегов).
4. `disabled` подавляет `onClick` и не выполняет навигацию: тестируем оба тега.
5. `variant="danger"` применяет соответствующий класс (`.variantDanger`).
6. `target="_blank"` без `rel` → автоматический `rel="noopener noreferrer"`.
7. `target="_blank"` с явным `rel="custom"` → `rel="custom"` (не перетёрт).
8. `ref` указывает на корневой DOM-элемент (`<a>` или `<button>`).
9. `className` мержится с базовыми классами (через `clsx`).
10. `startIcon`/`endIcon` рендерятся в соответствующих слотах с `aria-hidden`.

---

## M. Storybook stories

Минимум 8 stories:

1. `Default` (variant=default, текст вне абзаца).
2. `Secondary` (variant=secondary).
3. `Danger` (variant=danger).
4. `InParagraph` — Link внутри `<p>` с типовой типографикой проекта.
5. `InHeading` — Link внутри `<h2>` (демонстрация наследования размера).
6. `WithStartIcon` — Link с `startIcon`.
7. `WithEndIcon` — Link с `endIcon` (стрелка/external).
8. `Disabled` — Link в `disabled` (оба тега: с href и без).
9. `AsButton` (опционально) — Link без `href` как inline-действие.

---

## N. Версионирование

**Decision**: MINOR-релиз. Все изменения аддитивные (новый компонент, новый entry, новая запись `storySort.order`). Breaking changes — нет.

CHANGELOG: запись `Added: Link (typography component) — inline link/inline action with default/secondary/danger variants`.
