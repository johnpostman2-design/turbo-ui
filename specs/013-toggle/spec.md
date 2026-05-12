# Feature Specification: Toggle (switch)

**Feature Branch**: `013-toggle`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: «Новый компонент — toggle. Переключает значения на вкл/выкл. Делаем согласно конституции, токенам и принципам проекта. По макету Figma (929:141). Три размера: large, medium, small. Нет ховера. Состояния: вкл/выкл/disabled. Варианты: голый, StartText, EndText.»

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Базовое переключение вкл/выкл (Priority: P1) 🎯 MVP

Пользователь видит переключатель и одним кликом переводит его из выключенного состояния во включённое и обратно. Состояние сразу видно визуально: «выключено» — светлый трек, knob слева; «включено» — тёмный трек, knob справа.

**Why this priority**: ядро функциональности — без него компонент не имеет смысла. Это MVP-срез, на котором уже можно собирать формы и настройки.

**Independent Test**: рендер `<Toggle defaultChecked={false} onChange={fn} />` в Storybook/тесте. Клик по переключателю вызывает `onChange(true, event)`; повторный клик — `onChange(false, event)`. Визуально knob уезжает вправо при включении и влево при выключении. В формах нативный submit отправляет значение чекбокса.

**Acceptance Scenarios**:

1. **Given** `<Toggle defaultChecked={false} />`, **When** пользователь кликает по переключателю, **Then** компонент переходит в состояние «включено» и вызывает `onChange(true, …)`.
2. **Given** `<Toggle defaultChecked={true} />`, **When** пользователь кликает, **Then** компонент переходит в состояние «выключено» и вызывает `onChange(false, …)`.
3. **Given** `<Toggle checked={value} onChange={setValue} />` (controlled), **When** пользователь кликает, **Then** компонент сам не меняет внутреннее состояние, а пробрасывает событие — отрисовка опирается только на проп `checked`.
4. **Given** переключатель сфокусирован с клавиатуры, **When** пользователь нажимает Space, **Then** значение переключается и `onChange` вызывается.

---

### User Story 2 — Размер переключателя (Priority: P1)

Дизайнер задаёт один из трёх размеров (`small` / `medium` / `large`) — переключатель и подпись рядом меняют габариты и типографику строго по макету.

**Why this priority**: размеры — обязательная часть API компонентов проекта (см. `Button`, `Checkbox`, `Radio`); без них компонент не подходит для разных контекстов (плотные таблицы, формы, заголовочные блоки).

**Independent Test**: рендер трёх Toggle с `size="small"`, `size="medium"`, `size="large"` рядом. Габариты трека — 24×16, 40×24, 44×28 (px), типографика подписи — `label/small`, `label/medium`, `label/large` из токенов. Все значения берутся через CSS-переменные проекта.

**Acceptance Scenarios**:

1. **Given** `<Toggle size="large" startText="Уведомления" />`, **Then** размеры трека/knob и типографика подписи соответствуют размеру `large` из Figma (929:141 / 929:55).
2. **Given** `<Toggle size="medium" />`, **Then** размеры и типографика — `medium`.
3. **Given** `<Toggle size="small" />`, **Then** размеры и типографика — `small`.
4. **Given** проп `size` не передан, **Then** компонент использует значение по умолчанию `medium`.

---

### User Story 3 — Подпись слева или справа (Priority: P1)

Дизайнер размещает текст рядом с переключателем — слева (`startText`) или справа (`endText`). Клик по подписи также переключает значение, как у нативного `<label>`. Подпись наследует размер от пропа `size`.

**Why this priority**: в реальных интерфейсах переключатель почти всегда сопровождается подписью; без поддержки подписи каждый потребитель собирал бы её сам и нарушал DS.

**Independent Test**: рендер `<Toggle startText="Текст" />` и `<Toggle endText="Текст" />`. Клик по тексту переключает значение. Если оба текстовых пропа пусты — компонент рендерится как «голый» переключатель.

**Acceptance Scenarios**:

1. **Given** `<Toggle startText="Уведомления" />`, **Then** подпись отображается слева от переключателя; клик по ней переключает значение.
2. **Given** `<Toggle endText="Уведомления" />`, **Then** подпись отображается справа от переключателя; клик по ней переключает значение.
3. **Given** ни `startText`, ни `endText` не заданы, **Then** компонент рендерит только переключатель, без зарезервированного места под подпись.
4. **Given** `<Toggle disabled startText="Текст" />`, **Then** подпись окрашена токеном `--content-disabled` и клик по ней не переключает значение.

---

### User Story 4 — Состояние disabled (Priority: P2)

Когда переключатель заблокирован, пользователь видит, что он недоступен (приглушённые цвета), не может изменить значение мышью или клавиатурой, формы при submit получают то же значение, что и до блокировки.

**Why this priority**: распространённое требование форм (блокировка зависимых полей). Однако без US1 не имеет смысла, поэтому P2.

**Independent Test**: рендер `<Toggle disabled defaultChecked />` и `<Toggle disabled />`. Клик не вызывает `onChange`. Цвета трека/knob/подписи — `--content-disabled`. Нативный input получает атрибут `disabled`.

**Acceptance Scenarios**:

1. **Given** `<Toggle disabled defaultChecked />`, **Then** переключатель показывает состояние «включено» приглушёнными цветами; клик/Space не меняют значение.
2. **Given** `<Toggle disabled />`, **Then** переключатель показывает «выключено» приглушёнными цветами.
3. **Given** `<Toggle disabled />` внутри `<form>`, **When** форма отправляется, **Then** значение отправляется наравне с другими `disabled`-полями по правилам браузера (по умолчанию — не отправляется).
4. **Given** `<Toggle disabled />`, **Then** компонент не получает фокус по Tab.

---

### User Story 5 — Storybook stories и страница документации (Priority: P3)

Разработчик заходит в Storybook → `Components → Toggle` и видит:

- ≥ 6 stories: Off, On, Small/Medium/Large, WithStartText, WithEndText, Disabled.
- Docs-страница по проектному шаблону: кнопки Figma/GitHub, краткое описание (1–2 фразы), Подключение, Пропсы, Размеры, Состояния, Подпись (Start/End). Разделов «Доступность» и «Адаптивность» — НЕТ.

**Why this priority**: документация — обязательная часть DS, но это не блокирующая функциональность для использования компонента в коде.

**Independent Test**: открыть Storybook, увидеть страницу `Components → Toggle` строго между `Link` и `Input` (по образцу `storySort.order`). Проверить, что все примеры рендерятся, пропсы в таблице соответствуют API.

**Acceptance Scenarios**:

1. **Given** запущен Storybook, **Then** в навигации `Components` есть пункт `Toggle` ровно между `Link` и `Input`.
2. **Given** страница Docs открыта, **Then** есть кнопки Figma/GitHub, короткое описание, разделы «Подключение», «Пропсы», «Размеры», «Состояния», «Подпись».
3. **Given** страница Docs открыта, **Then** разделов «Доступность» и «Адаптивность» нет.

---

### Edge Cases

- **Длинная подпись `startText`/`endText`** — подпись обрезается с эллипсисом (`text-overflow: ellipsis`); общая ширина Toggle не превышает ширину родителя.
- **Одновременно `startText` и `endText`** — допускается, рендерится `[start] [knob] [end]`. Используется, например, для «Выкл — переключатель — Вкл».
- **Controlled `checked` без `onChange`** — компонент рендерится в указанном состоянии, но не реагирует на пользовательские взаимодействия (как и нативный React-`<input>`). В dev-режиме допустим warning.
- **`autoFocus`** — поддерживается через `<input autoFocus>`. Используется редко, но не запрещено.
- **`ref` указывает на нативный `<input type="checkbox">`** — потребитель может вызывать `.focus()`, `.click()`, читать `.checked`.
- **Глобальные стили хоста на `input` / `label`** — компонент применяет собственные CSS Module-классы; стиль не перетекает от хоста (изоляция через `turbo-ui-scope` + специфичность модулей).
- **Длина строки `startText`/`endText` = 0** — текстовый слот не рендерится (как если бы проп не был передан).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Toggle MUST рендерить нативный `<input type="checkbox" role="switch">` под капотом, обёрнутый в `<label>` — это обеспечивает работу клавиатуры (Space), `name`/`value` в формах, корректную семантику для ассистивных технологий без дополнительной ручной обработки.
- **FR-002**: Toggle MUST поддерживать `checked` (controlled) и `defaultChecked` (uncontrolled) по правилам React-`<input>`. При наличии `checked` без `onChange` компонент работает как read-only — `onChange` не вызывается и состояние не меняется (зеркалирует поведение React).
- **FR-003**: Toggle MUST поддерживать проп `size: 'small' | 'medium' | 'large'` со значением по умолчанию `medium`. Размеры трека: `small` — 24×16 px, `medium` — 40×24 px, `large` — 44×28 px. Knob — `width = height = track.height − 2 × padding`, где `padding = 2 px`.
- **FR-004**: Toggle MUST использовать токены типографики для подписи:
  - `size="small"` → `--typescale-lable-small-*` (label/small).
  - `size="medium"` → `--typescale-lable-medium-*` (label/medium).
  - `size="large"` → `--typescale-lable-large-*` (label/large).
- **FR-005**: Toggle MUST поддерживать пропы `startText: ReactNode` и `endText: ReactNode`. Оба пропа независимы (можно задать оба, один из, ни одного). Если оба пусты — переключатель рендерится без подписей, без зарезервированного места.
- **FR-006**: Клик/тап по подписи (`<label>` потомок) MUST переключать значение (за счёт нативной семантики `<label htmlFor>` или вложения `<input>` в `<label>`).
- **FR-007**: Toggle MUST поддерживать проп `disabled: boolean` (по умолчанию `false`). В состоянии `disabled`:
  - нативный input получает атрибут `disabled`;
  - цвет трека, knob и подписи — токен `--content-disabled`;
  - клик и клавиатура не меняют значение;
  - элемент не получает фокус по Tab (нативное поведение `disabled`).
- **FR-008**: Toggle MUST поддерживать визуально две роли состояний и НЕ иметь отдельной hover-индикации:
  - `Off` (`checked=false`, не disabled): трек — токен `--content-tertiary`, knob — токен `--surface-secondary` (белый из проекта).
  - `On` (`checked=true`, не disabled): трек — токен `--content-primary`, knob — токен `--surface-secondary`.
  - `Off + disabled`, `On + disabled`: трек и knob — токен `--content-disabled` (приглушённый). Knob остаётся видимым (контурная разница).
  - Отдельного `hover`-стиля у трека и knob НЕТ.
- **FR-009**: Toggle MUST иметь `:focus-visible` стиль для клавиатурного фокуса (`outline: 2px solid currentColor; outline-offset: 2px`) — для обеспечения видимого фокуса при навигации Tab’ом. Это не «hover», это фокус-ринг (нужен по умолчанию).
- **FR-010**: Toggle MUST использовать только токены проекта (`--content-*`, `--surface-*`, `--spacing-*`, `--rounds-*`, `--typescale-*`) и шрифт `ONY One` (через `--family-brand`). Никаких hex-цветов, raw px-значений из дизайна — кроме CSS-механики (например, размеры трека/knob — фиксированные px из макета, см. FR-003; они являются константами компонента, а не «дизайн-значениями» уровня цвета/типографики).
- **FR-011**: Toggle MUST поддерживать `name`, `value`, `id`, `data-*`, `aria-*` и другие нативные атрибуты `<input type="checkbox">` — через прозрачный проброс на нативный input.
- **FR-012**: Toggle MUST поддерживать `ref` через `React.forwardRef` — `ref` указывает на нативный `<input type="checkbox">`, чтобы потребитель мог вызывать `.focus()`, `.click()`, читать `.checked`.
- **FR-013**: Toggle MUST поддерживать `className` (применяется к корневому `<label>`) и `style` (применяется к корневому `<label>`).
- **FR-014**: Анимация перехода knob слева↔справа и цвета трека MUST использовать CSS-`transition` длительностью `120–200 ms` с `ease`-кривой; конкретные значения берутся из существующих токенов проекта (например, `--motion-*` если есть, или фиксированные значения по согласованию с дизайном).
- **FR-015**: Toggle MUST экспортироваться как `import { Toggle } from 'turbo-ui'` и как подпуть `import { Toggle } from 'turbo-ui/toggle'` для tree-shaking; типы `ToggleProps`, `ToggleSize` тоже экспортируются.
- **FR-016**: Storybook MUST содержать ≥ 6 stories: `Default` (off), `On`, `Small`, `Medium`, `Large`, `WithStartText`, `WithEndText`, `Disabled`, `DisabledOn`. Docs-страница по проектному шаблону: кнопки Figma/GitHub, короткое описание, разделы «Подключение», «Пропсы», «Размеры», «Состояния», «Подпись», БЕЗ разделов «Доступность» и «Адаптивность».
- **FR-017**: В `.storybook/preview.js` `storySort.order` MUST содержать `'Toggle'` ровно между `'Link'` и `'Input'`.

### Key Entities

- **Toggle (компонент)**: переключатель с двумя состояниями (`off` / `on`), тремя размерами (`small` / `medium` / `large`) и одним поведенческим состоянием блокировки (`disabled`). Имеет два опциональных текстовых слота (`startText`, `endText`). Все значения визуального оформления берутся из токенов проекта; шрифт — `ONY One`.
- **Track (трек)**: горизонтальный «жёлоб» внутри Toggle. Цвет фона зависит от `(checked, disabled)`. Геометрия зависит от `size`.
- **Knob (бегунок)**: круглый элемент внутри трека. Перемещается по горизонтали при изменении `checked`. Цвет — `--surface-secondary` (актив/выкл), `--content-disabled` (disabled).
- **Подпись (label-text)**: опциональный текст слева/справа от переключателя. Типографика зависит от `size`. Цвет — `--content-primary` (или `--content-disabled`). Клик по подписи переключает значение.

## Assumptions

- Реализация — нативный `<input type="checkbox" role="switch">` внутри `<label>`, по образцу `Checkbox` проекта (см. `src/ui/checkbox/Checkbox.tsx`). Это обеспечивает базовые семантики без блока «Доступность» в спецификации.
- Размеры трека (24×16, 40×24, 44×28) — фиксированные константы дизайна, прямо снятые с макета. Размер knob выводится формулой `track.height − 2 × padding`, где `padding = 2 px`. Эти значения являются CSS-механикой компонента, а не «дизайн-значениями» (которые подлежат токенам по конституции).
- Цвета: трек off → `--content-tertiary`, трек on → `--content-primary`, knob → `--surface-secondary`, disabled → `--content-disabled`. На этапе плана при отсутствии точного маппинга в `tokens.json` мы либо используем близкий существующий токен, либо добавляем недостающий и отражаем в `tokens.json` (по правилам конституции «при отсутствии токена — добавить и заменить значение»).
- Тень knob (drop-shadow из Figma, `rgba(0,0,0,0.08) 0 4px 12px`) на MVP опционально; если в `tokens.json` нет соответствующего токена тени — она опускается и решение фиксируется в research-документе.
- Анимация (`transition`) — длительность около `150 ms`, `ease`-функция. Конкретное значение уточняется на этапе `/speckit.plan`; на MVP допустимо использовать фиксированный `0.15s ease`.
- Storybook navigation: `Toggle` ставится в кластер «inline-control» — между `Link` и `Input`, по образцу позиционирования других компонентов формы.
- Версионирование: MINOR-релиз (новый компонент, новый entry в `package.json` `exports`, новая запись в `storySort.order`). Breaking changes — нет.
- Отсутствие блоков «Доступность» и «Адаптивность» в спеке и в итоговой docs-странице — по явному требованию пользователя. Минимально необходимая семантика обеспечивается нативным `<input type="checkbox" role="switch">` + `<label>`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Разработчик может за ≤ 5 минут добавить переключатель в форму, используя `<Toggle checked={value} onChange={setValue} startText="Уведомления" />`, без обращения к исходникам компонента.
- **SC-002**: При нажатии Space на сфокусированном переключателе состояние меняется в 100 % случаев (нативная семантика `<input type="checkbox">`).
- **SC-003**: В любом из трёх размеров габариты трека и типографика подписи соответствуют макету Figma (929:141) с точностью до 1 px.
- **SC-004**: Компонент использует исключительно токены `--content-*`, `--surface-*`, `--spacing-*`, `--rounds-*`, `--typescale-*` и шрифт `ONY One` — `grep` по `Toggle.tsx` и `toggle.module.css` на hex-цвета (`#…`), `rgb(…)`, `rgba(…)`, raw `font-family`/`font-size` возвращает пустой результат (за исключением CSS-механических значений размеров трека/knob, см. FR-003).
- **SC-005**: Минимальный размер сборки нового компонента в `dist/ui/toggle.js` (gzip) — ≤ 2 KB.
- **SC-006**: Покрытие unit-тестами Toggle (vitest, `Toggle.test.tsx`) — ≥ 8 тестов: рендер off/on, `onChange` controlled/uncontrolled, клавиатура (Space), `disabled` подавляет клик, размеры применяют классы, `startText`/`endText` рендерятся в правильных слотах, `ref` указывает на input, проброс `name`/`value`.
- **SC-007**: Все docs-секции компонента доступны на одной странице Storybook с фиксированным правым якорным меню; страница `Components → Toggle` найдена в навигации за ≤ 1 шаг (по образцу `Button`/`Checkbox`/`Link`).
- **SC-008**: При установке пакета `turbo-ui` и импорте `import { Toggle } from 'turbo-ui/toggle'` компонент собирается с публичными типами `ToggleProps`, `ToggleSize` без ошибок TypeScript у потребителя.
