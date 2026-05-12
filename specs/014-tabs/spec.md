# Feature Specification: Tabs (навигация по вкладкам)

**Feature Branch**: `014-tabs`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: «Новый компонент библиотеки — Tabs. Табы группируют контент и помогают в навигации. По конституции, стилям проекта, документация как у остальных. Размеры: large, medium, small. Состояния: default, hover, active, disabled. Макет Figma node 946:19.»

**Figma (reference)**: [Turbo-UI — Tabs](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=946-19)

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Выбор вкладки и смена контента (Priority: P1) 🎯 MVP

Пользователь видит ряд вкладок с подписями; одна вкладка визуально выделена как активная (нижняя линия акцента). Клик по другой вкладке делает её активной и показывает соответствующий блок контента; предыдущий блок скрывается.

**Why this priority**: без этого Tabs не выполняют основную функцию навигации по сгруппированному контенту.

**Independent Test**: в Storybook/тесте смонтировать три вкладки и три панели. По умолчанию активна первая. Клик по второй вкладке меняет `aria-selected`, видимость панелей (`hidden` / отображение) и вызывает `onValueChange('second')` при контролируемом или неконтролируемом режиме по правилам ниже.

**Acceptance Scenarios**:

1. **Given** `<Tabs defaultValue="a">` с тремя `Tab` (`value` a/b/c) и тремя `TabsPanel`, **When** пользователь кликает по вкладке `b`, **Then** активной становится `b`, панель `b` видна, остальные панели скрыты.
2. **Given** controlled `<Tabs value={v} onValueChange={setV}>`, **When** клик по вкладке, **Then** вызывается `onValueChange` с новым значением; DOM не меняется без обновления `value` снаружи.
3. **Given** сфокусированная вкладка, **When** стрелки влево/вправо (или Home/End), **Then** фокус переходит к соседней вкладке в пределах списка (roving focus), без неожиданного выхода фокуса за пределы `tablist`.

---

### User Story 2 — Размеры large / medium / small (Priority: P1)

Дизайнер задаёт единый размер для всех вкладок в группе (`size` на корне `Tabs`). Типографика подписи и внутренние отступы соответствуют макету: `small` — label/small, `medium` — label/medium, `large` — label/large (токены проекта).

**Why this priority**: размеры — обязательная ось API компонентов DS (как у `Button`, `Toggle`).

**Independent Test**: три экземпляра `Tabs` с `size="small"`, `medium`, `large` — визуально и через вычисленные стили совпадают с матрицей Figma 946:19 по токенам (без произвольных hex для семантики).

**Acceptance Scenarios**:

1. **Given** `size="large"`, **Then** используются токены `--typescale-lable-large-*` и горизонтальные отступы вкладки `var(--spacing-12)`.
2. **Given** `size="medium"`, **Then** используются `--typescale-lable-medium-*` и те же отступы.
3. **Given** `size="small"`, **Then** используются `--typescale-lable-small-*` и те же отступы.
4. **Given** проп `size` не передан, **Then** по умолчанию `medium`.

---

### User Story 3 — Визуальные состояния default, hover, active, disabled (Priority: P1)

Неактивная вкладка: нижняя линия 1px, цвет `border-tertiary`. При наведении (не disabled, не активна): линия `border-secondary`. Активная: линия 2px `border-primary`, текст `content-primary`. Disabled: текст и линия через токены disabled (`content-disabled`, `border-disabled`), клик и фокус клавиатуры не меняют выбор.

**Why this priority**: визуальный контракт с Figma и предсказуемость для пользователя.

**Independent Test**: Storybook-матрица 3×4 (размер × состояние) или скриншотные тесты; для `disabled` — `getByRole('tab', { name: '…' })` имеет `aria-disabled`/`disabled` и не реагирует на клик.

**Acceptance Scenarios**:

1. **Given** вкладка не выбрана и не disabled, **When** hover, **Then** нижняя линия соответствует состоянию hover из макета (`border-secondary`).
2. **Given** вкладка выбрана, **Then** нижняя линия 2px `border-primary` (без «ломания» вёрстки — допускается псевдоэлемент или компенсация отступов).
3. **Given** `disabled` на `Tab`, **Then** вкладка не участвует в смене значения; стили disabled по токенам.

---

### User Story 4 — Доступность и семантика (Priority: P2)

Группа вкладок экспонирует паттерн WAI-ARIA Tabs: `role="tablist"` на контейнере списка, `role="tab"` на триггерах, `role="tabpanel"` на панелях, согласованные `id` / `aria-controls` / `aria-labelledby` / `aria-selected`.

**Why this priority**: без базовой семантики компонент непригоден для клавиатуры и AT; после визуального MVP.

**Independent Test**: axe / ручная проверка: один выбранный таб с `aria-selected="true"`, панели связаны с табами.

---

### User Story 5 — Storybook и документация (Priority: P3)

В Storybook есть раздел `Components → Tabs` с stories: базовый пример с панелями, размеры, disabled-вкладка, controlled-пример. Docs-страница по шаблону проекта (как `Button` / `Toggle`): Figma/GitHub, краткое описание, Подключение, Пропсы, Размеры, Состояния, состав API (`Tabs`, `TabsList`, `Tab`, `TabsPanel`). Разделов «Доступность» и «Адаптивность» в доке — нет (как у Toggle).

**Why this priority**: документация обязательна для DS, но не блокирует использование в коде.

**Independent Test**: запуск Storybook — пункт навигации и страница Docs с якорным меню и примерами.

---

### Edge Cases

- **Один ребёнок-вкладка** — допустимо; навигация стрелками вырождается в одну вкладку.
- **Несовпадение `value` с любым `Tab`** — контролируемый режим: ни одна вкладка не считается выбранной визуально до исправления `value` потребителем (или документируется явное правило «fallback на первую» в плане — по умолчанию без молчаливого fallback).
- **Длинный текст вкладки** — однострочный текст с `ellipsis`, вкладка не ломает строку списка без явного `wrap` от потребителя.
- **Дублирующийся `value` у двух Tab** — недопустимо по контракту; поведение не гарантируется (в dev допустимо предупреждение).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Система MUST предоставлять составной API: `Tabs` (контекст значения и размера), `TabsList`, `Tab`, `TabsPanel` — для навигации и смены видимого контента.
- **FR-002**: `Tabs` MUST поддерживать `value` + `onValueChange` (controlled) и `defaultValue` (uncontrolled). При uncontrolled без `defaultValue` после монтирования первой вкладки активным считается первый зарегистрированный `value` (порядок в DOM внутри `TabsList`).
- **FR-003**: `Tabs` MUST поддерживать `size: 'small' | 'medium' | 'large'` с умолчанием `medium`; размер наследуют все `Tab` внутри этой группы.
- **FR-004**: Визуальные состояния MUST соответствовать Figma 946:19 через токены: линия default — `border-tertiary` (1px); hover — `border-secondary` (1px); active — `border-primary` (2px); disabled — `border-disabled` + текст `content-disabled`.
- **FR-005**: Типографика подписи вкладки MUST опираться на `--typescale-lable-{small|medium|large}-*` в зависимости от `size`; без hex-цветов для контента/границ.
- **FR-006**: Горизонтальные внутренние отступы «кликабельной» области вкладки MUST быть `var(--spacing-12)` (как в макете).
- **FR-007**: `Tab` MUST принимать `value: string`, `disabled?: boolean`, `children` (подпись); клик по не disabled вкладке активирует её значение.
- **FR-008**: `TabsPanel` MUST принимать `value: string` и показывать содержимое только при совпадении с текущим значением группы; иначе панель скрыта от пользователя (`hidden` и/или `aria-hidden` по согласованию с планом).
- **FR-009**: Клавиатура: стрелки влево/вправо и Home/End MUST перемещать фокус между вкладками внутри одного `tablist` (roving `tabIndex`).
- **FR-010**: Фокус с клавиатуры (`:focus-visible`) MUST иметь видимое кольцо (как у других интерактивных компонентов библиотеки — outline на токенах/currentColor).
- **FR-011**: Экспорт: `import { Tabs, TabsList, Tab, TabsPanel } from 'turbo-ui'` и подпуть `turbo-ui/tabs`; типы пропсов экспортируются.
- **FR-012**: Storybook: пункт `Tabs` в порядке сортировки после `Toggle` (или согласованное место в `storySort.order` в плане); ≥ 4 stories; Docs по шаблону Button/Toggle без разделов «Доступность» и «Адаптивность».

### Key Entities

- **Tabs (группа)**: хранит активное значение (`string`), размер, колбэк смены; связывает список и панели.
- **Tab (триггер)**: отображаемая подпись, значение, disabled; визуальное состояние от выбора + hover + disabled.
- **TabsPanel**: фрагмент контента, привязанный к значению вкладки.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Пользователь переключает активную вкладку одним кликом; соответствующая панель становится видимой, остальные — скрыты (проверка в автотесте или Storybook).
- **SC-002**: Все визуальные роли границ и текста для трёх размеров и четырёх состояний воспроизводимы только токенами из `tokens.json` / CSS variables темы.
- **SC-003**: Документация в Storybook позволяет разработчику подключить компонент и скопировать пример кода без обращения к исходникам за пределами спеки/контракта.

## Assumptions

- Реализация на нативных `<button type="button">` для вкладок — без сторонних headless-библиотек.
- Макет Figma — эталон визуала; перенос в код — через CSS Modules и токены, не через Tailwind в библиотеке.
- Версия пакета после релиза фичи — MINOR (новый публичный API), с запись в CHANGELOG на этапе реализации по правилам репозитория.
