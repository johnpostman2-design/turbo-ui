# Research: ComboBox (010-combobox)

## 1. Композиция: Input + TextArea + Listbox

**Decision**: Поле ComboBox строится как тонкая обёртка вокруг **Input** (одиночная строка) или **TextArea** (`multiline`). Панель подсказок — **Listbox** в `FloatingPortal`. Логика «открытие/закрытие/позиционирование/клик-вне» переиспользуется из текущей реализации `Select` (`@floating-ui/react`: `useFloating`, `offset`, `flip`, `shift`, `size`, `autoUpdate`); внутренний хук `useComboBoxFloating` или прямое использование `select/selectPlacement.ts` через выделенный модуль.

**Rationale**: Конституция IV (только существующие компоненты), минимизация дублирования. Поведение «открыть до ввода» совпадает с Select, поэтому нужен один механизм позиционирования.

**Alternatives considered**:
- Полностью самостоятельная реализация поля и панели. Отклонено: нарушает IV/VI и расходится с Select/Listbox.
- Расширение Select до режима «свободный ввод». Отклонено: ломает контракт Select (выбор только из множества).

---

## 2. Открытие, закрытие, фокус

**Decision**:
- **Open** при `focus`/`mousedown` на поле, при наборе любого символа, по `ArrowDown`/`ArrowUp`/`Alt+ArrowDown`.
- **Close** при выборе пункта, `Escape`, `Tab` (с переносом фокуса), клике вне (`pointerdown`/`mousedown` capture).
- При выборе пункта — **фокус возвращается в поле** (а не на триггер, как в Select), чтобы пользователь продолжал редактирование/поиск.
- При очистке — фокус остаётся в поле; список **переоткрывается с полным набором** (фиксируем единственным вариантом, как просит спека).
- При пустом `options` — панель **не открывается** (фиксируем единственным вариантом, как просит спека).

**Rationale**: Стандартное UX комбобокса; снимает неоднозначности из Edge Cases спеки.

---

## 3. Размер `large` для multiline (TextArea)

**Decision**: TextArea сейчас поддерживает только `small`/`medium`. Для согласованного `size: 'small' | 'medium' | 'large'` в ComboBox **аддитивно** добавляем поддержку `large` в TextArea (новый класс размера + токены). Изменение чисто аддитивное (не ломает существующие кейсы), оформляется в рамках задачи ComboBox.

**Альтернатива**: запретить `large` при `multiline` (уменьшает API, но создаёт несогласованную матрицу размеров). Отклонено в пользу аддитивного расширения TextArea.

**Rationale**: Конституция I и V — единая матрица размеров между Input/TextArea/ComboBox.

---

## 4. Ширина поля и ширины панели

**Decision**:
- Поле — `width` / `maxWidth` (как у TextArea/InputField — задаются на корне).
- Панель — `menuWidth` / `menuMaxWidth` (как у Select). При отсутствии явной ширины — Floating UI `size` middleware устанавливает **минимум — ширину поля** (`Math.max(referenceWidth, naturalWidth)`); максимум — `menuMaxWidth` или токен по умолчанию.
- Совпадение «width vs maxWidth» — то же правило, что в Select (узкая граница из двух).

**Rationale**: Снять дублирование между ComboBox и Listbox/Select; FR-6.

---

## 5. Высота панели и скролл

**Decision**: Проп `menuMaxHeight` (CSS-значение), пробрасывается в `Listbox.maxHeight`. Скролл — внутри Listbox; Floating UI `size` middleware дополнительно ограничивает высоту по доступному пространству вьюпорта.

**Rationale**: FR-8.

---

## 6. Фильтрация и подсветка совпадений

**Decision**:
- **filterItem** по умолчанию: `(query, option) => String(option.label).toLowerCase().includes(query.trim().toLowerCase())`.
- **highlightMatch**:
  - Флаг `highlightMatch?: boolean` включает встроенную подсветку.
  - Утилита `highlightMatch(label, query): ReactNode[]` разбивает строку на сегменты и оборачивает совпадающие в `<mark className={styles.match}>` (стилизация через токены).
  - При подсветке экранирование автоматическое (text-only sub-strings, не `dangerouslySetInnerHTML`); query escaping для regexp — `query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`.
  - Через `renderOption?: (option, ctx) => ReactNode` пользователь может задать собственный рендер (тогда highlightMatch не применяется автоматически — это проброшенная утилита).

**Rationale**: FR-3, FR-16; XSS-безопасный рендер; даёт и flag-on-the-shelf, и точку расширения.

**Alternatives considered**: Только `renderOption` (без флага). Отклонено: 80% случаев — встроенная подсветка, не требующая писать рендер.

---

## 7. Маска ввода (mask) без внешних зависимостей

**Decision**: Реализовать **минимальную внутреннюю маску** (`src/ui/combobox/mask.ts`) с поддержкой текстовых шаблонов:

| Метасимвол | Значение |
|------------|----------|
| `9` | любая цифра |
| `A` | буква (Unicode `\p{L}`) |
| `*` | любой символ |
| прочие символы | литералы (вставляются автоматически) |

Применение:
- При вводе/вставке система отбрасывает символы, не подходящие текущей позиции маски, и подставляет литералы автоматически.
- Управление кареткой через `setSelectionRange` после `onChange`.
- Подача снаружи — строкой: `mask="+7 (999) 999-99-99"`.

**Rationale**: Конституция VIII — никаких новых тяжёлых зависимостей. Минимальной реализации достаточно для типовых кейсов (телефон, индекс, артикул) и MVP.

**Alternatives considered**: `imask`, `react-imask`, `cleave.js` — добавляют 10–30 КБ. Отклонено как избыточное для MVP.

---

## 8. `maxLength`

**Decision**: Прокидывается в `<input>`/`<textarea>` как нативный `maxLength` (а также применяется при программном `setValue` после маски — обрезка до `maxLength`).

---

## 9. Очистка поля

**Decision**:
- `clearable` (по умолчанию `true`): при непустом `value` и без `disabled` — справа в поле через `endAdornment` Input (или аналог в TextArea, см. §3) рендерится `IconButton` с иконкой `cross-rounded` (или эквивалент из текущих ассетов; конкретный токен иконки уточняется в реализации).
- `clearIcon?: ReactNode` — заменяет содержимое стандартного `IconButton` (контейнер и кликовую логику оставляем системе).
- Клик: `onChange('')`, `onClear?.()`, фокус → в поле, панель **переоткрывается с полным набором** (см. §2).
- В режиме `disabled` или при пустом `value` — иконка не рендерится.

**Rationale**: Конституция IV; FR-14.

---

## 10. `borderless` и `error`/`disabled`

**Decision**:
- `borderless`: добавляется отдельный модификатор класса `field--borderless`; токены — `--combobox-borderless-bg-*`, `--combobox-borderless-underline-*` (для focus/error можно использовать тонкую линию-подчёркивание или акцент по фону, согласовано с дизайн-системой; точные токены подтверждаются по reference Figma).
- Приоритет состояний: `disabled` > `error` > `focus` > `hover` > `default` (тот же порядок, что у Input).

---

## 11. `startIcon`

**Decision**: Прокидывается в `Input.leftIcon` (для multiline — добавляем тот же слот в TextArea, аддитивно). Иконка масштабируется по токенам size (small/medium/large).

---

## 12. `textAlign`

**Decision**: Проп ограниченного множества: `'start' | 'center' | 'end'`. Реализация — через CSS-модификатор класса (`text-align: var(--combobox-text-align)` или прямые классы). Совместимо с RTL (используем `start`/`end`, а не `left`/`right`).

---

## 13. ARIA / клавиатура

**Decision**: Реализовать паттерн **combobox** по [APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/):
- Контейнер: `role="combobox"`, `aria-expanded`, `aria-controls={listboxId}`, `aria-autocomplete="list"`, `aria-haspopup="listbox"`.
- Поле — `<input>` (или `<textarea>` при multiline) с `aria-activedescendant` на текущий highlighted option из Listbox.
- `Listbox` — `role="listbox"`, `id={listboxId}`.
- Клавиатура: ArrowDown/Up — переключение highlight, Home/End, Enter — выбор highlighted, Escape — закрытие, Tab — закрытие + перенос фокуса.
- При `multiline` Enter в поле — **выбор подсказки**, если панель открыта и есть highlighted; иначе **перенос строки**. Shift+Enter — всегда перенос строки (так же, как в стандартных combobox-multiline UI).

**Rationale**: Соответствие WAI-ARIA Combobox.

---

## 14. Контролируемость

**Decision**: Поддержать оба режима для каждой контролируемой части:
- `value` / `defaultValue` / `onChange(next)`.
- `open` / `defaultOpen` / `onOpenChange(next)`.
- `query` (внутренний по умолчанию = `value`); поддержка отдельного `query`/`onQueryChange` — **вне MVP**, при необходимости добавляется аддитивно.

---

## 15. Токены

**Decision**: Добавить секцию **`combobox`** в `tokens.json` только там, где собственные значения нужны (например, `borderless` фон/линия, специфичные паддинги при `startIcon` + многострочности, цвет `mark` подсветки совпадений, `clear-icon` color/size). Большую часть размеров и состояний берём из `--input-*` / `--textarea-*` / `--listbox-*` / `--select-*` через `composes`/`var()` — без дублирования.

**Rationale**: Конституция I, III, IX.

---

## 16. Экспорт и сборка

**Decision**:
- Entry `./combobox` в `package.json` и `vite.config.lib.js` (по образцу `./select`).
- `scripts/copy-styles.cjs` — добавить `combobox/combobox.module.css`.
- `scripts/gen-theme-css.cjs` — блок `combobox` (если будут свои токены).
- `src/index.ts` — реэкспорт `ComboBox`, `ComboBoxProps`, типов опций (если отличаются от `ListboxOption`).
- `.storybook/preview.js` — селектор `.combobox-docs-menu` по образцу остальных компонентов.

---

## 17. Тестирование

**Decision**: Vitest unit-тесты по образцу `Select.test.tsx`/`Listbox.test.tsx`:
- открытие по фокусу/клику/стрелке;
- фильтрация по запросу (включая пустой результат);
- выбор подсказки → подстановка + закрытие + фокус в поле;
- свободный ввод (значение, отсутствующее в options, сохраняется);
- очистка (clearable, clearIcon, скрытие при disabled/empty);
- mask (отбрасывание неподходящих символов, литералы);
- maxLength;
- disabled (нет открытия, нет редактирования);
- error (`aria-invalid`);
- highlightMatch (наличие `<mark>` в DOM);
- positions (одна и массив, fallback на первую);
- multiline (TextArea, Enter поведение).
