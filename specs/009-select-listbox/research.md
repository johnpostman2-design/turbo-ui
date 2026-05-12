# Research: Select и Listbox (009-select-listbox)

## 1. Позиционирование выпадающей панели

**Decision**: Использовать **`@floating-ui/react`** (или `@floating-ui/dom` + минимальная обёртка) для anchor-позиционирования: маппинг 12 значений **`positions`** из спеки на `placement` Floating UI + **`flip`**, **`shift`**, **`offset`** для `menuOffset` (горизонтальный сдвиг после основного placement). Viewport: если после `flip`/`shift` панель всё ещё не удовлетворяет выбранному критерию «укладки», перебирать **prioritized placements** в порядке массива `positions`; если ни один вариант не проходит проверку — зафиксировать **первый** элемент массива `positions` как итоговый placement (как в FR-6).

**Rationale**: Самописный перебор 12 сторон + коллизии с viewport без библиотеки — высокий риск багов и расхождения со спекой; Floating UI — стандарт де-факто, небольшой размер относительно пользы.

**Alternatives considered**: Только `position: absolute` + ручной `getBoundingClientRect` — отклонено для MVP из-за объёма и дублирования well-known логики. Полный отказ от внешних зависимостей — возможен только при явном решении команды и увеличении срока задачи.

---

## 2. Рендер панели: portal и z-index

**Decision**: Панель списка рендерить через **`createPortal`** в `document.body` (или в контейнер из опционального пропа, если понадобится для тестов/модалок). `z-index` — из **токена** слоя «поверх контента» (добавить семантический токен уровня overlay/popover при отсутствии).

**Rationale**: Избежать обрезания родителями с `overflow: hidden`; единый стек с будущими попапами.

**Alternatives considered**: Рендер рядом с триггером в DOM — отклонено как основной режим из-за типичных обрезаний.

---

## 3. Семантика и клавиатура (a11y)

**Decision**: Триггер Select — **`button type="button"`** с **`aria-haspopup="listbox"`**, **`aria-expanded`**, связь с списком через **`aria-controls`** / **`id`**. Открытый список — контейнер с **`role="listbox"`**, пункты — **`role="option"`** + **`aria-selected`**. Фокус: roving tabindex на опциях или делегирование с клавишами Arrow/Home/End/Enter/Escape — детализировать в реализации по [APG Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) и паттерну combobox при **`search`** (поле ввода с **`aria-autocomplete="list"`** по мере реализации).

**Rationale**: Соответствие ожиданиям вспомогательных технологий и клавиатуры.

**Alternatives considered**: Только визуал без ролей — отклонено.

---

## 4. Композиция Listbox и Select

**Decision**: **Listbox** — самодостаточный компонент: принимает массив опций (или `children` с `ListboxItem`), управление подсветкой/focus на уровне Listbox или controlled снаружи. **Select** импортирует **Listbox** (или общий подкомпонент опций) внутри портала; для сценария Select передаёт флаги **`showCheckOnSelected`** и политику левой иконки (**`itemStartIcon`** / данные опции).

**Rationale**: FR-2 / FR-3: один визуал айтемов; Select не дублирует CSS опций.

**Alternatives considered**: Только Select без публичного Listbox — противоречит спеке.

---

## 5. Ширина триггера и панели

**Decision**: **`menuWidth`** (фиксированная ширина панели) и **`menuMaxWidth`** — строки длины CSS, но **по умолчанию** задавать через классы, привязанные к **токенам** (`max-width: var(--select-menu-max-width)` и т.д.). Если переданы оба: **`width` доминирует**, **`max-width`** ограничивает только если она меньше (итог = `min(width, max-width)` при обоих заданных — зафиксировать в контракте как «узкий из двух верхних границ»).

**Rationale**: Снять неоднозначность из edge cases спеки.

**Alternatives considered**: Только числа в px — отклонено (конституция II).

---

## 6. Высота списка и скролл

**Decision**: Проп **`menuMaxHeight`** (или `listMaxHeight`) — значение через CSS variable из токена (например привязка к `--spacing-*` стэку или отдельный токен `--select-menu-max-height`); область опций — **`overflow-y: auto`**.

**Rationale**: FR-5, длинные списки.

---

## 7. Поиск и filterItem

**Decision**: При `search={true}` над списком рендерится **`Input`** из `turbo-ui/input` с контролируемым или внутренним состоянием строки запроса. **`filterItem`**: `(query: string, item: SelectOption) => boolean`; при отсутствии пропа и `search` — показывать все опции (или дефолт «подстрока в label без регистра» — указать в контракте как default для удобства).

**Rationale**: FR-9; явный контракт для тестов SC-3.

---

## 8. Иконки в айтемах

**Decision**: Левая иконка — опциональное поле в **данных опции** (`icon?: ReactNode`) или глобальный флаг **`showItemStartIcon`** (скрывать слот, если false). Правая **check** у выбранного — включается пропом Listbox **`selectionIndicator="check"`** / Select по умолчанию включает для выбранного value.

**Rationale**: Макет 830:683 и сценарий Select.

---

## 9. Закрытие по клику вне и Scroll/resize

**Decision**: `mousedown`/`pointerdown` вне триггера и панели — закрытие (с опцией предотвращения при необходимости в будущем). Подписка на **`resize`** и **`scroll`** (capture на window или floating-ui `autoUpdate`) для пересчёта позиции.

**Rationale**: Ожидаемое UX выпадающих списков.

---

## 10. Токены и генерация темы

**Decision**: Расширить **`tokens.json`** секциями **`listbox`** и **`select`** (размеры триггера small/medium/large по макету 830:590, высоты айтема, паддинги панели, тени, invalid/disabled); **`scripts/gen-theme-css.cjs`** — зеркало паттерна `checkbox`/`radio`.

**Rationale**: Конституция I.

---

## 11. Экспорт и сборка

**Decision**: Entries **`./listbox`** и **`./select`** в `package.json` и `vite.config.lib.js`; **`scripts/copy-styles.cjs`** — включить новые CSS Modules; **`src/index.ts`** — реэкспорт типов и компонентов.

**Rationale**: Паритет с `./radio`.
