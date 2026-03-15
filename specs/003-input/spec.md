# Feature Specification: Input

**Feature Branch**: `003-input`  
**Created**: 2026-03-14  
**Status**: Draft  
**Input**: Добавить новый компонент Input по аналогии с Button. Компонент подключается из библиотеки Turbo UI в сторонний проект.

## Purpose

Компонент Input — единое поле ввода с опциональными подписью, подсказкой/ошибкой, иконкой слева и IconButton справа. Используется для форм и поиска в продуктах, построенных на Turbo UI. Реализация и экспорт по образцу Button/IconButton: один компонент, подключаемый из библиотеки в любой проект.

## Scope

- Один компонент Input (не пять отдельных). В состав входят: опциональный label, поле input, опциональный helper/error текст, опциональная иконка слева, опциональный IconButton из библиотеки справа. Правая часть — только IconButton, не произвольная иконка.
- Размеры: large, medium, small (через проп, значения из токенов).
- Состояния: default, hover, focus, filled, error, disabled. Визуал состояний через CSS-переменные темы.
- Стили: только CSS Modules и CSS-переменные из токенов; без глобального reset; размеры и отступы из токенов.
- Компонент tree-shakeable экспортируется из библиотеки; типы генерируются; существующая тема не ломается.
- Поддерживаемые типы поля: text, number, tel, search, time, date, email.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Разработчик использует Input в проекте (P1)

Разработчик подключает Turbo UI, импортирует Input по подпути, передаёт нужные пропсы (label, hint, error, leftIcon, endAdornment как IconButton, size, state). Поле отображается по дизайн-системе, поддерживает controlled/uncontrolled режим, disabled, focus-visible и error. Layout не прыгает при появлении helper/error текста.

**Why this priority**: Без возможности подключить и использовать Input в проекте фича не имеет ценности.

**Independent Test**: Установка пакета в тестовом проекте, импорт Input, рендер вариантов с label, с ошибкой, с IconButton справа; ввод текста в controlled и uncontrolled режимах; проверка, что при показе error/hint высота блока не меняется (зарезервировано место).

**Acceptance Scenarios**:

1. **Given** проект с подключённым Turbo UI, **When** разработчик импортирует Input и рендерит с label и placeholder, **Then** отображается поле с подписью и плейсхолдером, ввод работает.
2. **Given** Input с переданным errorText или state error, **When** пользователь видит поле, **Then** отображается состояние ошибки, доступен aria-invalid и связь с текстом через aria-describedby.
3. **Given** Input с переданным endAdornment (IconButton), **When** пользователь фокусирует поле и нажимает Tab, **Then** фокус остаётся на input; IconButton кликабелен по клику мыши.
4. **Given** Input с helperText или errorText, **When** текст появляется или исчезает, **Then** общая высота контейнера не меняется (layout не прыгает).

---

### User Story 2 — Документация и сборка как у Button (P1)

Описание API в контракте, Storybook с примерами по видам (default, error, disabled, с иконкой слева, с IconButton справа, с обеими сторонами, с label, с helper text) и размерам; экспорт из библиотеки и сборка в dist с типами.

**Why this priority**: Без контракта и экспорта компонент нельзя корректно подключать в проекты.

**Independent Test**: В Storybook отображаются все заявленные виды и размеры; `npm run build:lib` включает dist для input; в другом проекте `import { Input } from 'turbo-ui/input'` работает и типы доступны.

**Acceptance Scenarios**:

1. **Given** репозиторий Turbo UI, **When** выполняется сборка библиотеки, **Then** в dist присутствует артефакт для input и типы; экспорт из корня библиотеки (index) включает Input.
2. **Given** Storybook, **When** открыта страница Input, **Then** есть примеры: default, error, disabled, с иконкой слева, с IconButton справа, с иконкой слева и IconButton справа, с label, с helper text; размеры small, medium, large.

---

### User Story 3 — Доступность и семантика (P2)

Label связан с полем через htmlFor/id; при ошибке выставляется aria-invalid; подсказка и текст ошибки связаны через aria-describedby; порядок фокуса по Tab корректен; IconButton не перехватывает фокус с input при навигации с клавиатуры.

**Why this priority**: Соответствие a11y обязательно для форм в продуктах.

**Independent Test**: Проверка в браузере: label кликабелен и фокусирует input; при error есть aria-invalid; hint/error указаны в aria-describedby; Tab переводит фокус с input на следующий элемент, а не на IconButton внутри.

**Acceptance Scenarios**:

1. **Given** Input с label, **When** пользователь кликает по label, **Then** фокус переходит на input.
2. **Given** Input в состоянии error, **When** проверяется разметка, **Then** у input установлен aria-invalid="true" и при наличии errorText — aria-describedby на этот элемент.
3. **Given** Input с IconButton справа, **When** пользователь нажимает Tab из input, **Then** фокус уходит на следующий элемент страницы, а не на IconButton.

---

### Edge Cases

- Пустое значение при controlled: компонент отображает то, что передано в value; при uncontrolled — отражает внутреннее состояние.
- Одновременно helperText и errorText: приоритет у error (показывается только error, описание через aria-describedby — для ошибки).
- Disabled: и input, и IconButton справа неактивны (поведение IconButton через disabled или общий контейнер).
- Длинный label или длинный error/hint: текст переносится или обрезается по правилам дизайн-системы; зарезервированное место под одну строку hint/error не даёт прыгать layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-1**: Input MUST быть одним компонентом с опциональными частями: label, поле ввода, helper/error текст, иконка слева, IconButton справа (только IconButton из библиотеки).
- **FR-2**: Input MUST поддерживать размеры small, medium, large через проп; значения размеров и отступов из токенов.
- **FR-3**: Input MUST поддерживать состояния: default, hover, focus, filled, error, disabled; стили состояний через CSS-переменные темы.
- **FR-4**: Input MUST поддерживать controlled и uncontrolled режим; disabled; focus-visible; error через отдельный state или наличие errorText.
- **FR-5**: Если передан endAdornment (IconButton), он MUST быть кликабельным; фокус по Tab с input MUST уходить на следующий элемент страницы, а не на IconButton.
- **FR-6**: Layout MUST не прыгать при появлении или исчезновении helperText или errorText (зарезервировано место или минимальная высота блока).
- **FR-7**: Стили ONLY через CSS Modules и CSS-переменные из токенов; без глобального reset; типы поля: text, number, tel, search, time, date, email.
- **FR-8**: API MUST расширять нативные атрибуты input (React.InputHTMLAttributes<HTMLInputElement>), поддерживать forwardRef и проброс остальных пропсов (...rest).
- **FR-9**: Label MUST быть связан с input через htmlFor; при error — aria-invalid; для hint/error — aria-describedby.
- **FR-10**: Компонент MUST экспортироваться из библиотеки tree-shakeable; типы генерируются; экспорт через общий entry библиотеки; существующая тема не ломается.

### Assumptions

- Компонент размещается в стандартной структуре библиотеки (аналогично Button/IconButton). Конкретные пути к файлам (src/ui/input/...) задаются на этапе плана.
- IconButton берётся из текущей библиотеки Turbo UI; левая иконка — через проп (например, leftIcon: ReactNode) из той же системы иконок.
- «Filled» трактуется как состояние «поле заполнено» (есть значение), визуал при необходимости отличим через данные или класс от пустого default.
- Под «видом» понимаются комбинации: default, error, disabled, с leftIcon, с endAdornment (IconButton), с leftIcon + endAdornment, с label, с helper text — все в рамках одного компонента и одного контракта.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-1**: Разработчик может подключить Input из Turbo UI в сторонний проект и отобразить все заявленные виды (default, error, disabled, с иконкой слева, с IconButton справа, с label, с helper text) и размеры без изменения кода библиотеки.
- **SC-2**: В Storybook отображаются все перечисленные варианты и размеры; сборка библиотеки включает Input и типы; импорт из turbo-ui/input работает.
- **SC-3**: При появлении или исчезновении helper/error текста высота блока ввода не меняется (проверка визуально или по зарезервированному месту).
- **SC-4**: Соответствие доступности: связь label–input, aria-invalid при error, aria-describedby для hint/error, корректный порядок Tab без перехвата фокуса IconButton с input.
