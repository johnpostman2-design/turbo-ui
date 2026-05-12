# Research: Toggle (switch)

Решения и компромиссы по компоненту `Toggle`.

---

## A. Корневая разметка: `<input type="checkbox" role="switch">` внутри `<label>`

**Decision**: используем `<label class="root"><input type="checkbox" role="switch">[трек][knob][подпись]</label>`. Нативный input скрыт визуально (`opacity: 0; position: absolute; inset: 0;`), но получает фокус и клавиатуру.

**Rationale**:

- Нативная семантика чекбокса даёт «бесплатно»: Space → change, click → change, нативную интеграцию с `<form>` (`name`, `value`, FormData), `disabled` исключает из Tab, `:focus-visible` подсвечивается только при клавиатуре.
- `role="switch"` сообщает ассистивным технологиям, что это переключатель, а не обычный чекбокс. Это единственная ARIA, нужная для нашего компонента; никаких ручных хендлеров клавиатуры/AT-сообщений.
- В Turbo UI это уже образцовый паттерн — `Checkbox.tsx` так и сделан. Меньше дублирующих идиом → меньше тестов на ручную клавиатурную логику.

**Alternatives considered**:

1. `<button role="switch" aria-checked>` — ручной `onKeyDown` (Space/Enter), ручное состояние, не интегрируется с form submit без скрытого `<input>`. Отклонено.
2. `<div role="switch">` с tabIndex + onClick + onKeyDown — больше всего ручного кода, никакой нативной семантики. Отклонено.
3. `Switch` Headless UI / Radix — внешняя зависимость; project policy — собственные компоненты, см. конституцию принцип IV.

---

## B. Сетка размеров: track / knob / gap / typography

**Decision**: фиксированные пиксельные значения по макету Figma (929:141), задаются в CSS Module компонента, не в `tokens.json`.

| `size` | Track (W × H) | Knob (W × H) | Padding (внутри трека) | Gap (текст ↔ трек) | Подпись (typescale) |
|--------|---------------|--------------|------------------------|--------------------|-----------------------|
| `small` | 24 × 16 | 12 × 12 | 2 px | `var(--spacing-8)` (8 px) | `label-small` |
| `medium` | 40 × 24 | 20 × 20 | 2 px | `var(--spacing-8)` (8 px) | `label-medium` |
| `large` | 44 × 28 | 24 × 24 | 2 px | `var(--spacing-12)` (12 px) | `label-large` |

Формулы: `knob.height = track.height − 2 × padding`, `knob.width = knob.height` (круг), `track.border-radius = track.height / 2`, `knob.border-radius = 50%`.

**Rationale**:

- Цифры взяты прямо из макета (через MCP-плагин `get_design_context`).
- Это **геометрия компонента**, а не цветовое/типографическое «дизайн-значение». Конституция запрещает hardcoded цвета/шрифты/spacing для дизайн-семантики; геометрия конкретного компонента (как и спиннер 16×16, или indicator radio) — допустима как CSS-механика. Аналогичный паттерн уже принят в `Checkbox` (`--checkbox-{size}-box-size` — токен, но значения внутри — фиксированные px), `Button` (`getButtonSizeConfig` в `src/tokens/tokens.ts`).
- `gap` между текстом и треком — берётся через токены `--spacing-8` и `--spacing-12` (уже существуют), потому что это spacing-значение проекта.
- Типографика подписи — токены `--typescale-lable-{small,medium,large}-*`, ровно как в `Checkbox.labelSmall/Medium/Large`.

**Alternatives considered**:

1. Ввести `--toggle-small-track-width` и т. д. в `tokens.json`. Отклонено — раздувает токены ради одного компонента; конституция «минимальный набор токенов» (принцип I).
2. Внутренний `src/tokens/tokens.ts` модуль (как `getButtonSizeConfig`). Отклонено для Toggle — Checkbox это делает потому что значения передаются в `<Icon size>`. Для Toggle всё рисуется CSS-ом без передачи числа в JS, поэтому хватит CSS Module-классов `.sizeSmall/.sizeMedium/.sizeLarge`.

---

## C. Цветовая палитра — только существующие токены

**Decision**: маппинг состояний на токены без введения новых.

| State | Track | Knob | Text |
|-------|-------|------|------|
| Off, default | `var(--content-tertiary)` | `var(--surface-primary-main)` | `var(--content-primary)` |
| On, default | `var(--content-primary)` | `var(--surface-primary-main)` | `var(--content-primary)` |
| Off, disabled | `var(--content-disabled)` | `var(--content-disabled)` | `var(--content-disabled)` |
| On, disabled | `var(--content-disabled)` | `var(--content-disabled)` | `var(--content-disabled)` |

Knob в disabled — заливается тем же `var(--content-disabled)` (≈ rgba 0/0/0/0.08), визуально knob становится бледнее трека. Это совпадает с макетом 929:339 и 929:370.

**Rationale**:

- Все 4 токена (`--content-primary`, `--content-tertiary`, `--content-disabled`, `--surface-primary-main`) уже определены в `tokens.json` и `theme-vars.css`.
- Не требуется новых токенов уровня цвета — соблюдается «минимальный набор токенов» (принцип I).

**Alternatives considered**:

1. Knob в disabled `var(--surface-primary-disabled)` (`#0000000a`) — почти неотличим от трека `var(--content-disabled)` (`#00000014`). Отклонено — на макете видна разница; используем `var(--content-disabled)` (тот же, что у трека) и полагаемся на контурное отличие knob от трека через позицию/тень браузера. Если на ревью дизайн потребует более явного контраста disabled — заведём токен `--toggle-knob-disabled` отдельной задачей.

---

## D. Тень knob (drop-shadow)

**Decision**: на MVP **не применяем**.

**Rationale**:

- В Figma макете для knob указана тень `rgba(0,0,0,0.08) 0 4px 12px`. В `tokens.json` нет соответствующего токена `--shadow-*`. Введение единичного hardcoded `box-shadow` нарушает «запрет hardcoded» (принцип II). Введение нового токена без согласованного дизайн-решения о палитре теней — преждевременно.
- Тень knob не влияет на функциональность; визуально knob белый на чёрном (On) и белый на сером (Off) — контраст достаточен.

**Alternatives considered**:

1. Добавить `--shadow-knob` в `tokens.json` с этим конкретным значением. Отклонено — единичный токен ради одного компонента; либо вводим полноценную систему теней (`--shadow-1/2/3`), либо ждём.
2. Inline `box-shadow: 0 4px 12px rgba(0,0,0,0.08)` в `.knob`. Отклонено — hardcoded.

**Будущее**: при появлении системы shadow-токенов в проекте — заменим простым `box-shadow: var(--shadow-1)` без breaking changes (визуальный refinement).

---

## E. Анимация перехода

**Decision**: CSS-`transition` с фиксированным значением:

```css
.track {
  transition: background-color 0.15s ease;
}
.knob {
  transition: transform 0.15s ease;
}
```

Knob двигается через `transform: translateX(...)`, не через `left` (производительнее, не вызывает reflow).

**Rationale**:

- `0.15s` — стандартное значение для микро-перемещений (Material, Apple HIG); не «дизайн-значение цвета/типографики», а CSS-механика.
- В проекте уже есть локальные `transition` (например, `--checkbox-transition`) — заведены как переменные внутри своих компонентов. Для Toggle вводить отдельный `--toggle-transition` не имеет смысла на MVP (одно значение, одно использование). Если проект решит унифицировать motion — заведём `--motion-fast`.

**Alternatives considered**:

1. Без анимации (`transition: none`). Отклонено — UX-стандарт для toggle требует плавности перехода.
2. JS-анимация (`requestAnimationFrame`). Отклонено — лишний код, лишний JS в бандле, тяжелее для производительности.

---

## F. Focus ring

**Decision**: при `:focus-visible` нативного input рисуем кольцо вокруг трека:

```css
.root:has(.native:focus-visible):not(.disabled) .track {
  outline: 2px solid var(--content-primary);
  outline-offset: 2px;
}
```

(или альтернативно `box-shadow: 0 0 0 2px var(--content-primary)` если `:has` будет проблематичен).

**Rationale**:

- Фокус нужен для клавиатурной навигации — это **не hover**, это обязательный фокус-ринг (FR-009 спеки).
- `var(--content-primary)` (черный) — гарантирует видимый контраст на любом фоне дизайн-системы.
- `:focus-visible` от нативного input предотвращает показ кольца при клике мышью — ровно то поведение, к которому привыкли пользователи.

**Alternatives considered**:

1. Кольцо `var(--border-primary)`. Эквивалент — оба указывают на `#000000`. Используем `--content-primary` ради семантической ясности («цвет содержимого, не граница»).
2. Цветное кольцо в On-состоянии — лишняя сложность; одна палитра для фокуса проще и предсказуемее.

---

## G. `disabled`

**Decision**: нативный атрибут `disabled` на `<input>`. CSS подкрашивает трек/knob/подпись в `var(--content-disabled)`, выставляет `cursor: not-allowed` на корень и трек. Браузер сам:

- исключает input из Tab,
- не вызывает `change` на клик/Space,
- не даёт `:focus`/`:focus-visible`.

В корневой `<label>` добавляется класс `.disabled` для CSS-таргетинга.

**Rationale**:

- Минимум ручного кода, нативная семантика. Аналогично `Checkbox`.
- Поведение «disabled-форма не submit-ит значение» — нативное и желательное в большинстве случаев.

---

## H. Controlled vs uncontrolled

**Decision**: поддерживаем оба паттерна, по образцу нативного React-`<input>`:

- `checked` присутствует → controlled, состояние из пропа, `onChange` обязателен для практического использования.
- `checked` отсутствует, `defaultChecked` опционально → uncontrolled, состояние хранится в `useState`, `onChange` опционален.

`isControlled = checked !== undefined` — детектируется в начале рендера.

**Rationale**:

- Совпадает с поведением React `<input type="checkbox">`.
- Подходит для двух типичных сценариев: «локальный переключатель» (uncontrolled) и «часть Redux/RHF/Zustand-формы» (controlled).

---

## I. Подписи `startText` / `endText`

**Decision**: два независимых пропа `startText: ReactNode`, `endText: ReactNode`. Оба опциональны и могут сосуществовать. Рендер-шаблон:

```text
<label>
  [<span class="text textStart">{startText}</span>]  -- если задан
  <input> + <span class="track"><span class="knob"/></span>
  [<span class="text textEnd">{endText}</span>]      -- если задан
</label>
```

Клик по `<span class="text">` переключает значение через нативную семантику `<label>` с вложенным input.

**Rationale**:

- Один проп ≠ один результат: `startText="Off"` + `endText="On"` — это «выбор из двух», частый паттерн. Объединять в один enum-проп `textPosition` менее гибко.
- Имена пропов согласуются с проектным паттерном `startIcon`/`endIcon` у Button/IconButton/Link.

**Alternatives considered**:

1. `label: ReactNode` + `labelPosition: 'left' | 'right'`. Отклонено — менее гибко (нельзя «Off — toggle — On»).
2. `children` для подписи. Отклонено — теряется явность; нужна возможность «голый» Toggle без подписи (`children` тогда непонятный default-кейс).

---

## J. Storybook navigation

**Decision**: в `.storybook/preview.js` `storySort.order` — `'Toggle'` ровно между `'Link'` и `'Input'`.

**Rationale**:

- Toggle — inline-control семейства typography/form, концептуально ближе к Link/Input, чем к Checkbox (который сидит в кластере полей выбора в существующем порядке).
- На этапе будущего рефакторинга можно перегруппировать (Toggle → рядом с Checkbox/Radio), но менять существующий порядок ради одного компонента — risky.

---

## K. Тестирование

**Decision**: Vitest + `@testing-library/react`, ≥ 8 тестов (SC-006):

1. Рендер: по умолчанию off; с `defaultChecked={true}` — on.
2. Uncontrolled: клик → `onChange(event)` + внутреннее состояние меняется + DOM-`<input>.checked` меняется.
3. Controlled: клик → `onChange(event)` вызван, но без `setState` потребителем DOM не меняется.
4. Клавиатура: Space на сфокусированном input → `onChange` вызван.
5. `disabled`: клик не вызывает `onChange`; нативный input имеет `disabled`.
6. `size="small|medium|large"`: применяется соответствующий CSS-класс (через атрибут `data-size` или `className` инспекцию).
7. `startText` / `endText`: текст рендерится в соответствующем слоте; клик по тексту переключает значение.
8. `ref`: указывает на `HTMLInputElement` (`ref.current.tagName === 'INPUT'`).
9. Native attrs: `name`, `value`, `id`, `data-*`, `aria-*` пробрасываются на `<input>`.
10. `className` мержится с базовыми классами.

**Rationale**: покрывает все user stories + edge cases из спеки.

---

## L. Версионирование

**Decision**: MINOR-релиз. Все изменения аддитивные (новый компонент, новый entry, новая запись `storySort.order`). Breaking changes нет.

CHANGELOG: запись `Added: Toggle (switch) — переключатель вкл/выкл с тремя размерами, опциональными подписями startText/endText, состоянием disabled. Только токены и шрифт ONY One.`
