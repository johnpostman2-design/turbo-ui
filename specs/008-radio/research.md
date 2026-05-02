# Research: Radio (008-radio)

## 1. Разметка и доступность

**Decision**: Корневая обёртка (желательно **`label`** при наличии текста подписи внутри компонента, иначе связка `htmlFor` + скрытый текст — как договорено в реализации) с **`<input type="radio">`** visually hidden и видимым круговым индикатором + опциональным **`label` prop** / `children` для текста справа (паритет с Checkbox, соответствие макету «круг + Text»).

**Rationale**: Нативный radio даёт семантику, клавиатуру (Space), отправку формы и согласованное поведение группы по атрибуту **`name`**.

**Alternatives considered**: `div[role=radio]` + ручной roving tabindex — отклонено: избыточно для библиотеки при наличие нативного элемента.

---

## 2. Группа «одно из нескольких»

**Decision**: В MVP **не** вводить обязательный компонент `RadioGroup`. Документировать и показать в Storybook: несколько **`Radio`** с одинаковым **`name`**, у каждого свой **`value`**, состояние выбора — **`checked={current === value}`** + **`onChange`** на родителе (controlled) или нативный uncontrolled с общим `name`. Опциональный **`RadioGroup`** (контекст + `aria-labelledby`) — отдельная фича, если появится запрос на единый API без boilerplate.

**Rationale**: Спека ограничивает scope одной радиокнопкой; группа — композиция.

**Alternatives considered**: Сразу поставлять `RadioGroup` — отложено для минимального API (принцип VI).

---

## 3. Hover при disabled

**Decision**: В CSS не полагаться на «голый» `:hover` у disabled-инпута как на изменение визуала обёртки: использовать селекторы вида **`.root:not([data-disabled]):hover`** (или `:has(input:not(:disabled)):hover`) так, чтобы **disabled** визуал оставался постоянным при наведении, как в спеке и на макете.

**Rationale**: FR-3 / пользовательское требование «hover во всех вариантах, кроме disabled».

---

## 4. Invalid и доступность

**Decision**: Проп **`error`** (паритет с Checkbox / Input) — визуал invalid по макету; на input **`aria-invalid={true}`** при `error`. Связь с текстом ошибки формы — снаружи (`aria-describedby` при необходимости задаёт потребитель).

**Rationale**: FR-7, единообразие с другими контролами.

---

## 5. Токены: секция `radio` в `tokens.json`

**Decision**: Объект **`radio`** с **`sizes.large`**, **`sizes.medium`**, **`sizes.small`**: диаметр/размер индикатора, зазор до подписи (`gap`), при необходимости толщины обводок/«кольца» выбранного состояния, **`transition`**. Значения снять с макета Figma 794:352; семантические цвета — существующие переменные темы (`--border-*`, `--content-*`, `--surface-*`), новые токены только там, где без них не выразить геометрию.

**Rationale**: Конституция I–II; три размера в спеке.

**Alternatives considered**: Только переиспользовать `--checkbox-*` — отклонено: радиокруг и отступы по макету могут отличаться.

---

## 6. Генерация CSS-переменных

**Decision**: Расширить **`scripts/gen-theme-css.cjs`** по образцу блока `checkbox`: вывод `--radio-transition`, `--radio-{size}-*`.

**Rationale**: Единый поток `tokens.json` → `theme-vars.css`.

---

## 7. Визуал выбран / не выбран

**Decision**: **Не выбран** — кольцо с бордером по макету; **выбран** — заполнение/внутренний «dot» по макету (реализация через CSS `box-shadow` / псевдоэлемент / вложенный span — на усмотрение реализации при условии токенов и без hardcoded цветов).

**Rationale**: FR-4; без тяжёлых SVG при возможности чистого CSS.

---

## 8. Focus

**Decision**: Кольцо фокуса как на макете (в т.ч. для не выбранного): **`:focus-visible`** на зоне контрола (или `focus-within` на label), согласовать с Checkbox; опциональный **`demoFocusRing`** для Storybook/Docs — по аналогии с Checkbox.

**Rationale**: Видимый фокус и демо-матрица состояний.

---

## 9. Сборка и экспорт

**Decision**: Entry **`ui/radio`** в **`vite.config.lib.js`**, **`dts` include** для `src/ui/radio/**/*.ts(x)`, **`package.json` `exports`** — `"./radio"`, реэкспорт в **`src/index.ts`**.

**Rationale**: Паритет с `./checkbox`.

---

## 10. Storybook и документация

**Decision**: **`Radio.docs.tsx`** — lazy-страница по образцу Checkbox (`ExampleBlock`, якорное меню, Figma); **`preview.js`** — **`.radio-docs-menu`**. Stories: матрица размеров; строки default / hover (через args или pseudo-демо) / focus / disabled / invalid; пример **группы из трёх** с controlled state.

**Rationale**: FR-9, спека.

---

## 11. Клавиатура в группе

**Decision**: В плане реализации: в Storybook для группы рекомендовать **`fieldset` + `legend`** или контейнер с **`role="radiogroup"`** и подписью для screen readers; стрелки между пунктами — нативно не везде одинаковы; при необходимости улучшения roving tabindex — отдельный тикет после MVP.

**Rationale**: Спека откладывает детали a11y группы без расширения scope.
