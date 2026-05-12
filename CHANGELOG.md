# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Публичный подпуть **`turbo-ui/icons`**: `Icon`, `iconNames`, `getIconContent` в npm-сборке (рядом с остальными entry).
- Storybook **Foundations → Tokens**: таблица CSS-переменных из актуального `theme-vars.css` и краткий текст про `tokens.json` / `gen:theme` / `TurboUIProvider`.
- README: быстрый старт, таблица всех `exports`, раздел про иконки, блок **«Версии и миграции»** со ссылкой на CHANGELOG.
- Юнит-тесты: **`IconButton`**, **`TurboUIProvider`** (без обёртки / тема / `scopeClassName` / комбинация).
- `Tabs` — горизонтальные вкладки для навигации и группировки контента. Составной API: `Tabs`, `TabsList`, `Tab`, `TabsPanel`. Три размера (`small` / `medium` / `large`), визуальные состояния по макету Figma (946:19): default / hover / active / disabled через токены `--border-*` и `--typescale-lable-*`. Controlled (`value` + `onValueChange`) и uncontrolled (`defaultValue`). Клавиатура: стрелки и Home/End внутри `tablist`. Подпуть экспорта: `turbo-ui/tabs`.
- `Toggle` — переключатель «вкл/выкл» (switch) на базе нативного `<input type="checkbox" role="switch">` внутри `<label>`. Три размера (`small` 24×16, `medium` 40×24, `large` 44×28), состояние `disabled`, опциональные подписи `startText` / `endText`. Без отдельных hover-стилей; фокус-ринг только при клавиатурной навигации (`:focus-visible`). Анимация перехода — CSS `transition` `0.15s ease` (knob `translateX`, цвет трека). Цвета — только токены: трек off → `--content-tertiary`, on → `--content-primary`, knob → `--surface-primary-main`, disabled → `--content-disabled`. Поддержка controlled (`checked` + `onChange`) и uncontrolled (`defaultChecked`); `ref` ведёт на нативный `<input>`. Подпуть экспорта: `turbo-ui/toggle`.
- `Link` — typography-компонент: inline ссылка/inline-действие с тремя цветовыми вариантами (`default` → `--content-brand`, `secondary` → `--content-primary`, `danger` → `--content-error`), состояниями `hover`/`active`/`focus-visible`/`disabled`/`loading`, опциональными `startIcon`/`endIcon`. Корневой тег — `<a>` при наличии `href`, `<button type="button">` без него. Автоматический `rel="noopener noreferrer"` при любом внешнем URL (`http(s)://…`, `//host`); атрибут `target` компонент не модифицирует. Проп `loading` блокирует клик, ставит `aria-busy="true"` и заменяет `startIcon`/`endIcon` на вращающийся спиннер. Шрифт и размер наследуются из контекста (`font: inherit`). Подчёркивание — фиксированная толщина `1px`, `text-underline-offset: 2px`. Только токены проекта и шрифт ONY One.
- Подпуть экспорта: `turbo-ui/link` (tree-shaking).
- `SelectField`, `ComboBoxField`, `TextAreaField` — единые обёртки над `Select`/`ComboBox`/`TextArea` с подписью сверху и helper/error снизу (`label`, `helperText`, `errorText`).
- `Select.triggerId` — добавочный проп для нативной связи `<label htmlFor>` с `<button>`-триггером.
- Подпропы экспорта: `turbo-ui/select-field`, `turbo-ui/combobox-field`, `turbo-ui/textarea-field` (tree-shaking).

### Changed

- Документация **Icons** в Storybook: примеры импорта через `turbo-ui/icons`; ссылка на сторис **AllFromRegistry** строится от URL менеджера Storybook (корректнее при нестандартном `base`).
- `ComboBox` теперь корректно прокидывает `aria-describedby` пользователя на сам `<input>`/`<textarea>` (раньше уходило на корень).

### Removed (BREAKING)

- `TextAreaProps.helperText`, `TextAreaProps.errorText` и встроенный helper-слот удалены. Используйте `TextAreaField` — он рендерит подсказку и ошибку под полем по тем же правилам, что и `InputField`.

  Миграция:

  ```diff
  - <TextArea helperText="Подсказка" />
  + <TextAreaField helperText="Подсказка" />

  - <TextArea errorText="Ошибка" />
  + <TextAreaField errorText="Ошибка" />
  ```

  Пакет в pre-1.0, поэтому это релиз MINOR `0.2.0`.

## [0.1.0] - 2025-03-03

### Added

- Stabilization plan and Spec Kit integration (constitution, root spec, plan, tasks).
- Script `scripts/gen-theme-css.cjs`: generates `src/styles/theme-vars.css` from `tokens.json` (Single Source of Truth).
- `npm run gen:theme` and prebuild/prebuild-storybook hooks for theme generation.
- Button: styles moved to `button.css` with CSS variables from tokens; no inline styles for design.
- Button: `aria-disabled` and `aria-busy` for accessibility.
- Documentation: project structure and release discipline in `specs/001-turbo-ui-root-spec/quickstart.md`.

### Changed

- `src/styles/theme.css`: removed hardcoded hex/rgba/px; now imports `theme-vars.css` and uses variables only.
- Button component: refactored to use CSS classes instead of inline styles; optional `--btn-width` for loading layout stability only.

### Fixed

- Token duplication: design values no longer duplicated between `tokens.json` and `theme.css`.
