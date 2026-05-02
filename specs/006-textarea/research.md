# Research: TextArea (006-textarea)

## 1. Структура модуля и API

**Decision**: Один компонент **`TextArea`** в `src/ui/textarea/`, публичный API по духу **`Input` + слот ошибки как у `InputField`**: `error`, `errorText`, опционально `helperText` для согласованности форм; **без** обязательного `label` в MVP (спека: внешний label — на стороне потребителя или отдельная фича).

**Rationale**: Спека требует invalid с текстом под полем (FR-4); паттерн helper/error уже отлажен в `InputField`. Проп `helperText` не обязателен для приёмки, но упрощает формы рядом с InputField.

**Alternatives considered**: Только примитив без `errorText` (как сырой `Input`) — отклонено: пришлось бы всегда композировать снаружи, дублируя разметку ошибки из макета.

---

## 2. Токены: секция `textarea` в `tokens.json`

**Decision**: Добавить объект **`textarea`** с **`sizes.small`** и **`sizes.medium`**: `minHeight` (64px и 100px по макету Figma node 726:146), `paddingX`, `paddingY`, `fontSize`, `lineHeight` — согласовать с типографикой label small/medium внутри поля; **`borderRadius`** и **`transition`** — отдельно от `input`, если радиус макета (≈4px) отличается от `--input-border-radius` (8px).

**Rationale**: Конституция запрещает magic numbers в CSS; многострочное поле не может переиспользовать `input.sizes.*.height` как однострочную высоту.

**Alternatives considered**: Переиспользовать только `--input-*` — отклонено: высота и возможно радиус в макете отличаются от однострочного Input.

---

## 3. Генерация CSS-переменных

**Decision**: Расширить **`scripts/gen-theme-css.cjs`** по образцу блока `input`: вывод `--textarea-border-radius`, `--textarea-transition`, `--textarea-{size}-{...}`.

**Rationale**: Единый поток `tokens.json` → `theme-vars.css`, как у Button/Input.

---

## 4. Состояния и стили

**Decision**: Обёртка поля с **`focus-within`** для focus, **`:hover`** на не disabled для hover, классы **`error`/`disabled`** согласно пропам; визуал **filled** — через `:placeholder-shown` / наличие значения (как в существующих полях): placeholder — `content-tertiary`, введённый текст — `content-primary`.

**Rationale**: Соответствие спеке и существующим паттернам Input без лишнего пропа `visualState` для статичных Storybook-кадров.

**Alternatives considered**: Отдельный проп для каждого состояния (только для Storybook) — отклонено: усложняет API; для демо достаточно args и при необходимости обёртки с принудительным классом только в stories.

---

## 5. Resize и индикатор угла

**Decision**: По умолчанию **`resize: vertical`** (или значение из токена/пропа `resize`), чтобы не ломать вёрстку форм; **горизонтальный resize** — опционально через нативный проп-проброс `style` / `className` на корень или явный проп `resize` с ограниченным union (`'none' | 'vertical' | 'both'`). Визуал «ручки» в углу — через **CSS** (например, `background` с паттерном из текущих цветовых токенов границы) или псевдоэлемент, **без** инлайновых hex из Figma MCP.

**Rationale**: FR-10 спеки; доступность и предсказуемость вёрстки.

**Alternatives considered**: `resize: none` + только фиксированная высота — хуже для UX длинного текста.

---

## 6. Сборка и экспорт

**Decision**: Добавить entry **`ui/textarea`** в **`vite.config.lib.js`**, включить `src/ui/textarea/**/*.ts(x)` в **`dts` include**, **`package.json` `exports`** — `"./textarea"`, реэкспорт в **`src/index.ts`**.

**Rationale**: Паритет с `./input`, `./input-field`.

---

## 7. Тестирование

**Decision**: Vitest: рендер, **`aria-invalid`** при ошибке, связь **`aria-describedby`** с текстом ошибки, smoke на disabled. Storybook: матрица small/medium × состояния + длинный текст.

**Rationale**: Согласовано с `Input.test.tsx` и спекой SC-3.

---

## 8. Открытые моменты на реализацию (не блокируют план)

- Точное значение **border-radius** (4px в MCP vs 8px у Input) — финализировать при визуальной приёмке; при необходимости только через `tokens.json`.
- Добавление **large** — вне MVP, если появится макет.
