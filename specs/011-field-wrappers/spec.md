# Feature Specification: SelectField, ComboBoxField, TextAreaField

**Feature Branch**: `011-field-wrappers`
**Created**: 2026-05-11
**Status**: Draft
**Input**: User description: "нужно сделать 3 новых компонента: SelectField, ComboBoxField, TextAreaField. Все 3 компонента делаются уже на основе готовых Select, ComboBox и TextArea. Они должны быть обернуты так же как InputField — у них должен быть Label и Helper Text."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — `SelectField` с label и helper/error (Priority: P1)

Разработчик встраивает в форму одиночный выбор из набора значений с подписью сверху и подсказкой/текстом ошибки снизу — единообразно по форме целиком (Input, Select, ComboBox, TextArea выглядят как члены одного семейства полей).

**Why this priority**: единый паттерн «поле с подписью и helper» — базовое требование форм. Без него `Select` нельзя встроить рядом с `InputField` без рассинхрона визуала и доступности.

**Independent Test**: рендер `<SelectField label="Город" options={...} helperText="Подсказка" />` и `<SelectField label="Город" options={...} errorText="Обязательное" />`. Подпись над полем кликом фокусирует триггер, текст под полем не вызывает прыжков layout, ошибка приоритетнее подсказки.

**Acceptance Scenarios**:

1. **Given** есть `SelectField` с `label="Город"`, **When** пользователь кликает по подписи, **Then** фокус ставится на триггер `Select`, и подпись связана с полем (label/for, доступная подпись для AT).
2. **Given** есть `SelectField` без значения и без `errorText`, **When** задан `helperText="Подсказка"`, **Then** под полем виден текст подсказки в нейтральном стиле и поле не подсвечено как ошибочное.
3. **Given** есть `SelectField` с `errorText="Обязательное"`, **When** компонент отрендерен, **Then** под полем виден текст ошибки (роль alert), поле визуально в состоянии ошибки и `aria-invalid` выставлен.
4. **Given** есть `SelectField` с одновременно заданными `helperText` и `errorText`, **When** компонент отрендерен, **Then** показывается только `errorText`, `helperText` скрыт.
5. **Given** есть `SelectField` без `helperText` и без `errorText`, **When** компонент отрендерен, **Then** под полем зарезервирована высота одной строки caption, layout не «прыгает» при появлении ошибки/подсказки.
6. **Given** есть `SelectField` с `disabled`, **When** компонент отрендерен, **Then** триггер и подпись/helper выглядят как заблокированные, выбор недоступен.

---

### User Story 2 — `ComboBoxField` с label и helper/error (Priority: P1)

Разработчик встраивает в форму поле с автодополнением (свободный ввод + выпадающий список) с подписью и текстом подсказки/ошибки — для сценариев «начни ввод и выбери из подсказок» внутри стандартных форм.

**Why this priority**: `ComboBox` без обёртки требует ручной разметки `<label>`, ARIA-связей и helper-блока на каждом использовании. `ComboBoxField` решает это единообразно.

**Independent Test**: рендер `<ComboBoxField label="Аэропорт" options={...} helperText="..." />` и `<ComboBoxField label="..." errorText="..." />`. Поведение `ComboBox` (открытие, фильтрация, выбор, очистка, multiline, mask) полностью сохраняется.

**Acceptance Scenarios**:

1. **Given** есть `ComboBoxField` с `label`, **When** компонент отрендерен, **Then** подпись связана с полем ввода, клик по подписи переводит фокус в поле и список не открывается до ввода, если поле не сфокусировано.
2. **Given** есть `ComboBoxField` со значением «Москва», **When** пользователь кликает по подписи, **Then** фокус переходит в поле ввода без сброса значения.
3. **Given** есть `ComboBoxField` с `errorText`, **When** компонент отрендерен, **Then** поле в состоянии ошибки (`aria-invalid`), текст ошибки виден под полем с ролью alert.
4. **Given** есть `ComboBoxField`, **When** проп `helperText` пуст и `errorText` пуст, **Then** под полем зарезервирована высота одной строки caption.
5. **Given** есть `ComboBoxField` с `multiline`, **When** пользователь выбирает длинное значение, **Then** поле растёт по высоте, helper/error остаются под ним без наложения.
6. **Given** есть `ComboBoxField` с `disabled`, **When** компонент отрендерен, **Then** ввод и открытие списка недоступны; подпись и helper — в стиле disabled.

---

### User Story 3 — `TextAreaField` с label и helper/error (Priority: P1)

Разработчик встраивает многострочное поле с подписью и подсказкой/ошибкой в форму, в которой остальные поля используют `InputField` / `SelectField` / `ComboBoxField` — единый внешний вид и поведение helper/error.

**Why this priority**: `TextArea` сейчас содержит собственный helper-слот, но это дублирует контракт `*Field`-обёрток и мешает консистентности форм (две разные системы helper-разметки). `TextAreaField` фиксирует единый паттерн.

**Independent Test**: рендер `<TextAreaField label="Комментарий" helperText="..." />`, `<TextAreaField label="..." errorText="..." rows={5} />`, `<TextAreaField label="..." maxLength={140} />`. Подпись связана с textarea, helper/error работают по тем же правилам, что в `InputField`.

**Acceptance Scenarios**:

1. **Given** есть `TextAreaField` с `label`, **When** компонент отрендерен, **Then** подпись над полем связана с textarea (label/for), клик по подписи ставит фокус в textarea.
2. **Given** есть `TextAreaField` с `helperText`, **When** `errorText` не задан, **Then** под полем виден helper-текст нейтрального стиля.
3. **Given** есть `TextAreaField` с `errorText`, **When** компонент отрендерен, **Then** виден текст ошибки с ролью alert, textarea помечен как `aria-invalid`.
4. **Given** есть `TextAreaField`, **When** ни `helperText`, ни `errorText` не заданы, **Then** под полем зарезервирована высота одной строки caption (layout не прыгает).
5. **Given** есть `TextAreaField` с `disabled`, **When** компонент отрендерен, **Then** textarea, подпись и helper в состоянии disabled.
6. **Given** есть `TextAreaField` с `rows`/`maxLength`/`size`, **When** компонент отрендерен, **Then** эти атрибуты пробрасываются в `TextArea` и применяются.

---

### User Story 4 — Управление полем через `ref` и атрибуты формы (Priority: P2)

Разработчик использует `*Field`-обёртки в существующих формах с библиотеками валидации/контролируемого ввода: получает ref на нативный элемент поля (input/textarea/triger-button), пробрасывает `name`, `form`, `required`, `onChange`, и поле работает идентично соответствующему базовому компоненту.

**Why this priority**: без этого `*Field` нельзя плавно использовать в реальных формах. Не P1, потому что для базового рендера с label + helper достаточно forwardRef и пропов первого приоритета; интеграция с формами расширяет, но не блокирует MVP.

**Independent Test**: рендер каждого `*Field` с `ref`. Проверка: `ref.current` указывает на корректный нативный элемент (для `SelectField` — на кнопку-триггер `Select`, для `ComboBoxField` — на `<input>`/`<textarea>` в зависимости от `multiline`, для `TextAreaField` — на `<textarea>`). `name`, `form`, `required` доходят до DOM-элемента; `onChange` вызывается при изменении значения.

**Acceptance Scenarios**:

1. **Given** `<SelectField ref={r} name="city" />`, **When** компонент смонтирован, **Then** `r.current` — нативный `<button>`-триггер с атрибутом `name="city"`.
2. **Given** `<ComboBoxField ref={r} name="airport" multiline />`, **When** компонент смонтирован, **Then** `r.current` — `<textarea>` с `name="airport"`.
3. **Given** `<TextAreaField ref={r} name="comment" required />`, **When** компонент смонтирован, **Then** `r.current` — `<textarea>` с `required` и `name="comment"`.
4. **Given** `*Field` со своим `aria-describedby="extra"`, **When** есть `helperText`, **Then** в `aria-describedby` поля содержится и пользовательский id, и id helper-текста, через пробел.

---

### User Story 5 — Storybook-демо и страницы документации (Priority: P3)

Дизайнер и разработчик открывают Storybook → Components → SelectField/ComboBoxField/TextAreaField и видят живые примеры всех состояний (`default`, `disabled`, `error`, `helperText`, `errorText`, размеры) и страницу документации по проектному шаблону.

**Why this priority**: документация и stories помогают распространению компонентов и снижают порог входа. Не P1, потому что API можно использовать и без stories.

**Independent Test**: в Storybook появляются три новые страницы; stories корректно рендерятся и переключают состояния через controls; страница Docs построена по принятому шаблону компонентов проекта.

**Acceptance Scenarios**:

1. **Given** запущен Storybook, **When** разработчик открывает раздел `Components → SelectField`, **Then** видит живые примеры базового состояния, с подписью, с helper, с error, disabled и размеров.
2. **Given** запущен Storybook, **When** разработчик открывает раздел `Components → ComboBoxField`, **Then** видит примеры single/multiline, с filter/highlight, с helperText/errorText, размеров.
3. **Given** запущен Storybook, **When** разработчик открывает раздел `Components → TextAreaField`, **Then** видит примеры базового состояния, с подписью, helper/error, размеров.

---

### Edge Cases

- Что происходит, если `label` — пустая строка или `undefined`? — Подпись не рендерится, остаётся только поле и helper-слот; ничто не «прыгает».
- Что происходит, если у поля и `helperText`, и `errorText` пустые строки? — Под полем зарезервирована высота одной строки caption (visibility: hidden), layout стабилен.
- Что происходит, если разработчик передал `id`? — Используется этот `id`, помощник связывания (label/for + aria-describedby) опирается на него.
- Что происходит при одновременных `error={true}` и `errorText=""`? — Поле визуально в ошибке (рамка, `aria-invalid`), но в helper-слоте по-прежнему зарезервирован пустой caption.
- Что происходит при изменении `errorText` со значения на пусто? — Скрывается алерт, появляется (если есть) `helperText`; высота слота не меняется.
- Что происходит, если `ComboBoxField` находится внутри обёртки с фиксированной шириной? — Поле занимает 100% ширины обёртки; вёрстка helper остаётся под полем.
- Что происходит при `disabled` + `errorText`? — Приоритет — `disabled` (поле и helper в disabled-стиле), `aria-invalid` НЕ ставится; визуально не подсвечиваем ошибку поверх disabled.
- Что происходит, если разработчик уже использует `TextArea` со встроенными `helperText`/`errorText`? — Эти пропы и встроенный helper-слот удаляются из `TextArea` (breaking change). Для форм используется `TextAreaField`; «голый» `TextArea` остаётся доступен для случаев, когда helper не нужен или предоставляется внешней обёрткой. Это унифицирует подход обёрток: у всех трёх (`SelectField`/`ComboBoxField`/`TextAreaField`) единый источник истины для helper/error — сама обёртка.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Библиотека MUST предоставлять три новых компонента: `SelectField`, `ComboBoxField`, `TextAreaField`, как обёртки соответственно над `Select`, `ComboBox`, `TextArea`.
- **FR-002**: Каждый из трёх компонентов MUST принимать пропы `label?: string`, `helperText?: string`, `errorText?: string` с тем же поведением и приоритетом, что в `InputField` (`errorText` приоритетнее `helperText`).
- **FR-003**: Каждый компонент MUST пробрасывать все остальные пропы и поведение базового компонента без потерь (включая `value`/`defaultValue`, `onChange`, `placeholder`, `size`, `disabled`, `error`, ARIA-атрибуты и специфичные для базового компонента пропы — `options`, `positions`, `menuMaxHeight` и т. п. для Select/ComboBox; `rows`, `maxLength`, `minLength` и пр. для TextArea).
- **FR-004**: Подпись (`label`) MUST быть программно связана с полем (через `htmlFor`/`id`), чтобы клик по подписи фокусировал поле и инструменты доступности корректно объявляли имя поля.
- **FR-005**: При наличии `errorText` компонент MUST показать текст ошибки с ролью alert и установить `aria-invalid="true"` на поле; при наличии `helperText` без `errorText` — показать helper-текст и подключить его id в `aria-describedby` поля.
- **FR-006**: Если пользователь передал собственный `aria-describedby`, компонент MUST объединять его с id helper/error (через пробел), а не заменять.
- **FR-007**: Слот под полем (helper/error) MUST иметь фиксированную высоту, равную одной строке caption-типографики, чтобы исключить layout-прыжки при появлении/исчезновении подсказки или ошибки.
- **FR-008**: При `disabled=true` поле, подпись и helper-слот MUST переходить в состояние disabled (по стилю и доступности); при `disabled` атрибут `aria-invalid` НЕ выставляется, даже если задан `errorText` (приоритет блокировки).
- **FR-009**: Компоненты MUST использовать только design tokens (через CSS-переменные/токены проекта) и шрифт `ONY One`; никаких hardcoded значений (цветов, размеров, шрифтов) в новой реализации.
- **FR-010**: Подпись (label) MUST использовать типографику `Lable/small` (как в `InputField`), helper/error — `Caption/medium`.
- **FR-011**: Цвета: подпись — `--content-primary`, helper-текст — `--content-tertiary`, error-текст — `--content-error`, состояния disabled — `--content-disabled`.
- **FR-012**: Корневой контейнер каждого компонента MUST по умолчанию занимать 100% ширины родителя и иметь минимальную ширину, согласованную с базовым компонентом; пропы и стили базового компонента влиять на это не должны.
- **FR-013**: `ref` обёртки MUST указывать на тот же нативный элемент, на который указывает `ref` базового компонента (триггер-кнопка для `SelectField`, `<input>`/`<textarea>` для `ComboBoxField` в зависимости от `multiline`, `<textarea>` для `TextAreaField`).
- **FR-014**: Имена пропов helper/error и их семантика MUST совпадать с `InputField` (`helperText`, `errorText`), чтобы формы были консистентны.
- **FR-015**: Компоненты MUST экспортироваться публично через `turbo-ui` (root) и через подпути `turbo-ui/select-field`, `turbo-ui/combobox-field`, `turbo-ui/textarea-field` для tree-shaking; типы пропов экспортируются вместе.
- **FR-016**: В Storybook MUST появиться по странице на каждый компонент с docs-page по проектному шаблону и stories для всех состояний (default, label-only, helperText, errorText, disabled, размеры; для `ComboBoxField` — также multiline и highlight).
- **FR-017**: Базовые компоненты MUST использоваться как «голые» поля для своих обёрток. `Select` и `ComboBox` сохраняют существующий API (изменения только аддитивные, см. план). У `TextArea` MUST быть удалены пропы `helperText`/`errorText` и встроенный helper-слот, чтобы единый принцип помощника-снизу был только на уровне `*Field`-обёрток.

### Key Entities

- **Field-обёртка**: контейнер вокруг базового компонента с подписью (label) и блоком под полем (helper/error). Атрибуты: `label`, `helperText`, `errorText`, плюс все пропы базового компонента. Связи: использует `Select`/`ComboBox`/`TextArea` как внутреннюю реализацию.
- **Label**: подпись над полем; связана с полем через `htmlFor`/`id` поля, рендерится в типографике `Lable/small`.
- **Helper-слот**: блок под полем; рендерит один из вариантов — пустую строку-плейсхолдер (для стабильной высоты), helper-текст или текст ошибки.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Разработчик может заменить связку «`label` + `Select` + ручной helper-блок» на `<SelectField label="..." options={...} helperText="..." />` без потери поведения и без дополнительных пропов сверх API базового `Select`.
- **SC-002**: Те же замены доступны для `ComboBox`→`ComboBoxField` и `TextArea`→`TextAreaField`; вся функциональность базовых компонентов сохранена (включая фильтрацию, выбор, очистку, multiline, mask у `ComboBox`; `rows`, `maxLength`, размеры и состояния у `TextArea`).
- **SC-003**: На странице формы с `InputField`, `SelectField`, `ComboBoxField`, `TextAreaField`, расположенными вертикально, расстояния между полями, размеры подписей и helper-слотов совпадают визуально 1:1 (одинаковые токены типографики и spacing).
- **SC-004**: Появление/исчезновение `helperText`/`errorText` не вызывает вертикального сдвига соседних полей (стабильная высота helper-слота).
- **SC-005**: Все три компонента покрыты unit-тестами, аналогичными `InputField.test.tsx`: связь label↔поле, отображение helperText, отображение errorText, приоритет error над helper, disabled, forwardRef, merging `aria-describedby`, `className` на корне, изменение значения (≥ 8 тестов на компонент).
- **SC-006**: В Storybook появилось 3 новые страницы (по одной на компонент) с минимум 6 stories на компонент и docs-страницей по шаблону проекта.
- **SC-007**: В проектных сборках (`typecheck`, `test`, `build:lib`) после добавления компонентов нет регрессий: тесты зелёные, типы валидны, билд содержит entry для трёх новых модулей.
- **SC-008**: Все используемые в новых компонентах визуальные значения (цвет, типографика, spacing, радиусы) ссылаются на существующие токены — 0 hardcoded значений в `.tsx`/`.module.css` новых компонентов.

## Assumptions

- **Source of truth для типографики и цветов** — токены, уже используемые в `InputField` (`--typescale-lable-small-*`, `--typescale-caption-medium-*`, `--content-primary`, `--content-tertiary`, `--content-error`, `--content-disabled`, `--spacing-8`). Новых токенов добавлять не планируется.
- **Helper-слот по умолчанию резервирует высоту** одной строки caption (как в `InputField`), даже когда нет helper/error — чтобы layout форм не дрожал.
- **Приоритет disabled над error** соответствует принятому в проекте поведению `InputField`.
- **Имена пропов** обёрток (`label`, `helperText`, `errorText`) совпадают с `InputField` для консистентности форм.
- **Подпути экспорта** именуются по образцу остальных компонентов: `turbo-ui/select-field`, `turbo-ui/combobox-field`, `turbo-ui/textarea-field`.
- **`TextArea` теряет встроенный helper-слот** в рамках этой фичи: пропы `helperText`/`errorText` и резерв высоты под полем удаляются. Это унифицирует обёртки: у `SelectField`/`ComboBoxField`/`TextAreaField` помощник снизу строится одним и тем же способом — самой обёрткой. Это breaking change для `TextArea` (внешних использований `helperText`/`errorText` в репозитории нет; внешние пользователи библиотеки должны мигрировать на `TextAreaField`).
- **ARIA-связи** реализуются через `htmlFor` подписи и `aria-describedby` поля (id helper/error), как в `InputField`.
- **Не рассматривается** добавление новых визуальных состояний (success, warning) или альтернативных позиций label (например, label слева). Только тот же паттерн «label сверху, helper снизу», что и `InputField`.

