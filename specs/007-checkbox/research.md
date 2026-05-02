# Research: Checkbox (007-checkbox)

## 1. Разметка и доступность

**Decision**: Один корневой **`<label>`** (или обёртка с `htmlFor` + скрытый текст для a11y при отсутствии видимой подписи в MVP) с внутренним **`<input type="checkbox">`** и визуальным блоком (квадрат + галочка / indeterminate-линия). Инпут стилизовать **visually hidden** (clip/position), фокус показывать **на обёртке** через `:focus-within` или `focus-visible` по макету — согласовать с паттерном фокуса в Input/TextArea.

**Rationale**: Нативный чекбокс даёт корректную семантику, клавиатуру и screen readers; кастом только визуал.

**Alternatives considered**: Полностью кастомный `div[role=checkbox]` — отклонено: больше кода на a11y без выигрыша для библиотеки.

---

## 2. Состояние indeterminate

**Decision**: В DOM **`indeterminate`** — свойство элемента, не атрибут. Синхронизировать через **`useEffect`/`useLayoutEffect`** или ref-callback: при изменении пропа `indeterminate` выставлять `inputRef.current.indeterminate = bool`. При **controlled** `checked` — не смешивать: если спека/макет требуют «клик из indeterminate → checked», реализовать в `onChange` на стороне потребителя или документировать дефолт (первый клик снимает indeterminate и выставляет checked — стандартное поведение браузера после сброса indeterminate в false перед кликом).

**Rationale**: Соответствие спеке FR-1, FR-4 и нативной семантике.

**Alternatives considered**: Только uncontrolled indeterminate — отклонено: нужен контроль из «выбрать всех».

---

## 3. Invalid и доступность

**Decision**: Проп **`error`** или **`invalid`** (выбрать одно имя в контракте, паритет с `Input`: там `error`) — визуал invalid по макету; на input **`aria-invalid={true}`** при активном invalid; опционально **`aria-describedby`** — только если в API появится связь с текстом ошибки снаружи (в MVP достаточно визуала + `aria-invalid`, как минимум для согласованности с полями).

**Rationale**: FR-3, FR-7, edge case «invalid без текста» — визуал на контроле, текст формы — композиция.

---

## 4. Токены: секция `checkbox` в `tokens.json`

**Decision**: Объект **`checkbox`** с **`sizes.large`**, **`sizes.medium`**, **`sizes.small`**: минимум — размеры бокса (`boxSize` или `width`/`height`), при необходимости `borderRadius`, `borderWidth`, размер SVG-галочки; плюс **`transition`** на уровне секции. Значения снять с макета Figma 761:112 (после замера), без hex в компоненте.

**Rationale**: Конституция I–II; три размера в спеке.

**Alternatives considered**: Переиспользовать только `--input-*` — отклонено: геометрия чекбокса иная.

---

## 5. Генерация CSS-переменных

**Decision**: Расширить **`scripts/gen-theme-css.cjs`** по образцу блока `textarea`: вывод `--checkbox-transition`, `--checkbox-{size}-{...}`.

**Rationale**: Единый поток `tokens.json` → `theme-vars.css`.

---

## 6. Визуал checked / unchecked / indeterminate

**Decision**: **Unchecked** — пустой квадрат с бордером из токенов; **checked** — заливка/бордер по макету + иконка «галочка» (inline SVG с `stroke`/`fill` от `currentColor` или переменных контента); **indeterminate** — отдельная графика (линия/минус) по макету, визуально отличима от unchecked.

**Rationale**: FR-4; без импорта тяжёлых icon-пакетов.

---

## 7. Состояния hover / disabled

**Decision**: **`:hover`** на интерактивной обёртке при не `disabled`; **`disabled`** — `pointer-events`/`opacity`/цвета по макету и токенам; клик не меняет значение.

**Rationale**: Спека и единообразие с другими контролами.

---

## 8. Сборка и экспорт

**Decision**: Entry **`ui/checkbox`** в **`vite.config.lib.js`**, **`dts` include** для `src/ui/checkbox/**/*.ts(x)`, **`package.json` `exports`** — `"./checkbox"`, реэкспорт в **`src/index.ts`**.

**Rationale**: Паритет с `./textarea`.

---

## 9. Storybook и документация

**Decision**: **`Checkbox.docs.tsx`** — lazy-страница по образцу **TextArea** (`ExampleBlock`, якорное меню, Figma/GitHub); тексты короткие, по делу. В **`preview.js`** добавить селектор **`.checkbox-docs-menu`** к тем же правилам, что **`.textarea-docs-menu`** (типографика Label/small для меню).

**Rationale**: FR-9, спека; единый UX документации.

---

## 10. Тестирование

**Decision**: Vitest: рендер, **`checked`/`aria-checked`** (если используется), **`disabled`**, вызов **`indeterminate`** на DOM после рендера, **`aria-invalid`** при error. Storybook: матрица размеров × состояний × трёх значений.

**Rationale**: Критические пути API без хрупкой привязки к пикселям.

---

## 11. Открытые моменты на реализацию

- Точные числа размеров и толщин бордера — финализировать по Figma при первом проходе вёрстки; только через `tokens.json`.
- Видимая **подпись справа** от чекбокса в доках — композиция с типографикой темы, без обязательного пропа `label` в MVP (спека).
