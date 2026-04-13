# Research: Input — label-out-primary (004)

**Purpose**: Зафиксировать технические решения для плана реализации варианта label-out-primary.  
**Date**: 2026-04-09

## 1. Публичное имя и модуль: **InputField** (`input-field`)

**Decision**: Вынести вариант label-out-primary в отдельный компонент **`InputField`** в каталоге `src/ui/input-field/` с entry **`turbo-ui/input-field`**. Реализация — **композиция**: `InputField` рендерит колонку label → `Input` (примитив из `src/ui/input`) → зона helper/error; типы пропсов — `InputFieldProps` = возможности `Input` + `label?`, `helperText?`, `errorText?`. Примитив `Input` не обязан получать проп `variant`; публичный API для формы — **только `InputField`**.

**Rationale**: Имя `InputField` отражает состав поля формы; отдельный модуль упрощает импорт и документацию; один источник логики ввода остаётся в `Input`.

**Alternatives considered**:
- `variant` на `Input`: смешивает «голое поле» и форму в одном типе — хуже для минималистичного API (конституция VI).
- Имя `InputLabelOutPrimary`: длиннее и менее устойчиво в публичном API.

---

## 2. Состояния filled и filled-hover в коде

**Decision**: **Filled** — визуал «значение введено»: CSS на обёртке поля через селектор `input:not(:placeholder-shown)` (и при необходимости учёт `value` для controlled без placeholder). **Filled-hover** — комбинация `:hover` на интерактивной обёртке при `not(:placeholder-shown)` и отсутствии `disabled`/`error`. Текст значения — `content-primary`, placeholder — `content-tertiary` (как в макете MCP).

**Rationale**: Соответствует интерактивным состояниям без лишнего React state «filled».

**Alternatives considered**:
- Хранить `isFilled` в state: дублирует источник истины и расходится с controlled-значением извне.

---

## 3. Focus и обводка поля (макет vs. текущий CSS)

**Decision**: Добавить стили **`:focus-within`** на `.fieldWrap` для усиленной обводки (токены `border-secondary` / семантика фокуса из темы) в соответствии с макетом. Не полагаться на дефолтный outline браузера на `input` без обёртки — обводка контейнера поля, как в Figma.

**Rationale**: Текущий `input.module.css` не задаёт отдельный focus-border на контейнере; макет явно различает default / hover / focus.

**Alternatives considered**:
- Только `outline` на input: визуально не совпадает с карточным полем в макете.

---

## 4. Invalid: label в макете

**Decision**: В состоянии **invalid** в макете Figma (MCP) для части сцен **не показывается** отдельный label над полем (рендер только поля + красный helper). Для **доступности и спеки FR-1** сохранять label в разметке, если он передан пропом; визуально label остаётся с `content-primary`, ошибка — в тексте под полем и рамке поля (`border-error`), как в макете нижней строки. При необходимости уточнить у дизайна расхождение «label скрыт в invalid» vs. always-on; до уточнения — **label не скрывать**, чтобы не ломать формы.

**Rationale**: Скрытие label только в error ухудшает UX и противоречит типичным формам; макет может быть сокращённой сеткой.

**Alternatives considered**:
- Скрывать label при `error`: отложено до явного требования дизайна.

---

## 5. Токены для вертикальных отступов (8px между блоками)

**Decision**: Использовать существующий spacing из `tokens.json` (например `--spacing-8` или ближайший семантический шаг), не литерал `8px` в CSS Module.

**Rationale**: Конституция II.

**Alternatives considered**:
- Новый токен `input.labelOut.gap`: только если `--spacing-8` отсутствует в сгенерированной теме (проверить `theme-vars.css`).
