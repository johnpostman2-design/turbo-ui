# Research: SelectField, ComboBoxField, TextAreaField

Решения и компромиссы по обёрткам трёх существующих компонентов в стиле `InputField` (label сверху + helper/error снизу).

---

## A. Связь label↔триггер в `SelectField`

**Decision**: добавить в `Select` аддитивный проп **`triggerId?: string`**. Когда задан — ставится на сам `<button>`-триггер. По умолчанию `<button>` не получает id, поведение не меняется.

**Rationale**:

- `<label htmlFor>` обязан указывать на id фокусируемого элемента (input/button/select/textarea). Сейчас `Select` ставит пользовательский `id` на корневой `<div>`-обёртку (рядом с порталом панели), а не на `<button>`. Это удобно для тестов/CSS, но не подходит для нативной подписи.
- Альтернатива через `aria-labelledby` без `htmlFor` теряет нативное переключение фокуса по клику на label. Для пользователей без скринридера это регресс.
- Аддитивный `triggerId` сохраняет существующий `id` на корне и одновременно позволяет адресовать кнопку. Это обратносовместимо и не требует менять SO стори/тесты Select.

**Alternatives considered**:

1. Перенаправить `id` Select целиком на `<button>`. Отклонено — breaking change для пользователей, которые ловят корень обёртки по id.
2. Обернуть `Select` в `<label>` без `htmlFor`, кликом по label программно фокусировать триггер через ref. Отклонено — хрупкое поведение (label с вложенным button не имеет нативной семантики), и теряется явная пара id↔htmlFor для тестов/a11y-аудитов.

**Применение в SelectField**:

```tsx
<label htmlFor={triggerId}>{label}</label>
<Select triggerId={triggerId} aria-describedby={ariaDescribedBy} ... />
```

---

## B. Единый принцип helper-блока во всех `*Field`-обёртках — удаляем встроенный helper у `TextArea`

**Decision**: удалить из `TextArea` пропы **`helperText`**, **`errorText`** и встроенный **`helperSlot`** (включая «невидимый» резерв высоты). После этого все три обёртки `*Field` строят helper одинаково — собственной разметкой по образцу `InputField`. У базового `TextArea` остаются только пропы поля (`size`, `rows`, `leftIcon`, `endAdornment`, `borderless`, `width`, `maxWidth`, `disabled`, `error`, `maxLength`, …).

**Rationale**:

- Текущий `TextArea` всегда рендерит helper-слот с `min-height: var(--typescale-caption-medium-height)` — даже когда `helperText`/`errorText` не заданы (для стабильного layout). Это второй источник helper-разметки в библиотеке, помимо `InputField`.
- При появлении `TextAreaField` источников становится три. Единственный способ получить **единый принцип** «базовый компонент = голое поле, helper строит только обёртка» — убрать встроенный helper из `TextArea`.
- Это снижает API-поверхность `TextArea`, упрощает документацию и устраняет «двойной слот» в обёртке без CSS-хаков.
- В репозитории нет ни одного внешнего использования `TextArea` с `helperText`/`errorText`: только собственные stories/docs/tests, которые правятся в этой же фиче.

**Alternatives considered**:

1. Аддитивный `noHelperSlot?: boolean` в `TextArea`. Отклонено — оставляет два способа делать helper (внутри TextArea и снаружи в обёртке), увеличивает API без выгоды; разработчик должен помнить, какой проп когда включать.
2. Скрывать встроенный helper через CSS из обёртки. Отклонено — хрупкая зависимость от внутренних селекторов CSS Modules; ломается при ребрендинге классов.
3. Обёртка «съедает» `helperText`/`errorText` и не передаёт в `TextArea`, но не отключает невидимый слот. Отклонено — невидимый слот всё равно занимает высоту → двойной отступ под полем.

**Применение в TextAreaField**:

```tsx
<TextArea id={inputId} error={showError} aria-describedby={ariaDescribedBy} ... />
{/* helper-разметку рисует TextAreaField — идентично InputField */}
```

**Migration note**: внешние потребители библиотеки, передающие `helperText`/`errorText` в `TextArea`, должны перейти на `TextAreaField` с теми же именами пропов. CHANGELOG/release notes фиксируют это как breaking change.

---

## C. Связь label↔поле в `ComboBoxField` и `TextAreaField`

**Decision**: использовать стандартный `<label htmlFor={id}>` + передавать тот же `id` пропом в базовый компонент.

**Rationale**:

- `ComboBox` ставит `id` пропа на нативный `<input>` (через `Input` → `inputProps.id`). `<label htmlFor>` работает «из коробки».
- `TextArea` ставит `id` пропа на `<textarea>`. То же.
- Никаких расширений API этих компонентов не требуется.

---

## D. `aria-describedby` и идентификаторы helper/error

**Decision**: реализация 1:1 с `InputField`:

- `inputId = id ?? "turbo-<entity>-field-<reactId>"` — стабильный auto-id через `React.useId`, очистка `:` для CSS-валидности.
- `helperId = ${inputId}-helper`, `errorId = ${inputId}-error`.
- `activeDescId = hasErrorText ? errorId : helperText ? helperId : undefined`.
- Пользовательский `aria-describedby` объединяется через пробел: `[activeDescId, ariaDescribedByUser].filter(Boolean).join(' ') || undefined`.
- `aria-invalid` ставится на сам контрол базового компонента (через его `error`-проп, который уже выставляет `aria-invalid`).

**Rationale**: единая модель для всех `*Field` упрощает изучение API и тестирование.

---

## E. Приоритет `disabled` над `error`

**Decision**: совпадает с `InputField`:

- При `disabled === true` корневая обёртка получает класс `rootDisabled`; label и helper окрашиваются в `--content-disabled`.
- При `disabled === true` базовый компонент получает `disabled={true}` (что само по себе подавляет hover/focus и `aria-invalid`).
- `errorText` показывается с цветом `--content-disabled` при `disabled === true` (текст остаётся читаемым, но визуально потушен — как в `InputField`).
- Если задан только `error: true` без `errorText`, помечается только сам контрол; в helper-слоте отрисовывается невидимый резерв высоты.

---

## F. Размеры и ширина

**Decision**: корневая обёртка — `display: flex; flex-direction: column; gap: var(--spacing-8); width: 100%; min-width: 120px; max-width: 100%; box-sizing: border-box;`. Идентично `InputField`.

Размер поля задаётся пропом `size` базового компонента (`small | medium | large`). Размер label/helper текста — фиксированный (label-small, caption-medium) согласно текущей реализации `InputField`. Это сознательное упрощение — иначе под каждый `size` пришлось бы вводить варианты caption.

---

## G. Дублирование CSS

**Decision**: каждый `*Field` имеет собственный `*.module.css`, повторяющий разметку из `input-field.module.css`. Не выносить в общий файл.

**Rationale**:

- CSS Modules локальны — общий импорт «помог бы» только при наличии 5+ полей; сейчас их три, файлы по ~40 строк.
- Изоляция облегчает чтение и независимую эволюцию (если для `TextAreaField` понадобится расширить helper до многострочного — он меняется самостоятельно).
- Когда появится 5-й `*Field` — выделение в общую утилиту станет очевидным и сделается отдельной задачей.

**Alternatives considered**:

1. Общий `src/ui/_field-wrapper.module.css` импортируется во всех трёх. Отклонено сейчас — преждевременная абстракция.
2. Компонент-обёртка `FieldShell` (рендерит label + slot + helper). Отклонено — добавляет уровень абстракции ради 3 использований; усложняет тестирование `*Field` компонентов.

---

## H. Breaking-зона удаления helper из `TextArea`

**Decision**: удаление выполняется в этой же фиче.

- Внешних использований `TextArea` с `helperText`/`errorText` в репозитории нет (проверено по `grep`: только собственные stories/docs/tests, переписываются вместе с компонентом).
- Внешние потребители библиотеки получают breaking change: `TextAreaField` принимает те же пропы (`helperText`, `errorText`) с тем же поведением; миграция — переименование импорта.
- Релиз фиксируется как MAJOR (или MINOR в pre-1.0 ветке semver). Запись в CHANGELOG/release notes — обязательна.

Зафиксировано в `spec.md` (Assumptions) и `plan.md` (Complexity Tracking).

---

## I. Тестирование

**Decision**: vitest по образцу `InputField.test.tsx`. На каждый `*Field` минимум:

1. `label` рендерится и связан с контролом (label-htmlFor совпадает с id или, в случае Select, с triggerId).
2. `helperText` показывается и `aria-describedby` указывает на helper id.
3. `errorText` приоритизирует над `helperText`, появляется `role="alert"`, `aria-invalid="true"` на контроле, `aria-describedby` указывает на error id.
4. Пользовательский `aria-describedby` объединяется с auto id helper/error.
5. `disabled` подавляет `aria-invalid`, окрашивает label/helper в disabled, контрол становится недоступен.
6. `ref` пробрасывается на нативный элемент базового компонента.
7. Все остальные пропы базового компонента пробрасываются без изменений (smoke-тест).

Дополнительно для `TextAreaField`: вместе с обновлением самого `TextArea` — переписать `TextArea.test.tsx` (убрать тесты на `helperText`/`errorText`/невидимый слот), а у обёртки проверить, что под полем ровно один helper-блок (querySelectorAll `[data-turbo-textarea-field-helper]` → 1; `[data-turbo-textarea-helper]` → 0).

---

## J. Storybook

**Decision**: docs+stories по шаблону `InputField`. На каждом `*Field`:

- Default, WithLabel, WithHelperText, WithErrorText, Disabled, Sizes (small/medium/large), AriaDescribedBy.
- `*Field.docs.tsx` использует `ExampleBlock` и общий стиль документации проекта.

---

## K. Публичные экспорты

**Decision**: три новых entry в `package.json` (`./select-field`, `./combobox-field`, `./textarea-field`), плюс реэкспорт из корня (`turbo-ui`). В `vite.config.lib.js` — три новых entry для `dts` и code-splitting.

**Rationale**: повторяет паттерн `input-field`, `select`, `combobox`, `textarea`. Пользователи могут импортить «точечно» (треshaking) или из корня.

---

## L. Версионирование

**Decision**: MAJOR (или MINOR в pre-1.0). Аддитивные изменения — `Select.triggerId` и три новых компонента. Breaking change — удаление `helperText`/`errorText` и встроенного helper-слота из `TextArea`. CHANGELOG обязан содержать секцию `BREAKING CHANGES` с инструкцией миграции на `TextAreaField`.
