# Feature Specification: IconButton

**Feature**: 002-icon-button-spec  
**Design**: [Figma 602-3021](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=602-3021)

## Purpose

Компонент IconButton — кнопка только с иконкой (без текста). Два визуальных варианта: primary и secondary. Используется там, где нужна компактная кнопка-иконка (действия в тулбарах, карточках и т.д.). Документация и экспорт по образцу Button для корректного подключения в другие проекты.

## Scope

- Один новый компонент: IconButton.
- Варианты: primary, secondary (по макету Figma).
- Состояния: default, hover, disabled (при необходимости loading — по решению).
- Размер: по макету (один размер или small/medium по дизайну).
- Стили через токены и CSS Modules; без hardcoded значений.

## User Story 1 — Разработчик использует IconButton в проекте (P1)

Разработчик подключает Turbo UI, импортирует IconButton по подпути, передаёт иконку и вариант. Компонент отображается согласно Figma и не ломает стили проекта.

**Independent Test**: Установка пакета в тестовом проекте, импорт `import { IconButton } from 'turbo-ui/icon-button'`, рендер primary и secondary с иконкой; стили из темы.

**Acceptance**:
- IconButton рендерит `<button>` с иконкой внутри.
- Варианты primary и secondary соответствуют макету (цвета, фон, границы из токенов).
- Поддержка ref, aria-label, data-*, type (button/submit/reset), disabled.

## User Story 2 — Документация и сборка как у Button (P1)

Описание API в контракте, Storybook с примерами и кодом, экспорт из библиотеки (package.json, vite lib, types).

**Independent Test**: В Storybook есть страница IconButton с вариантами и кодом; `npm run build:lib` включает dist/ui/icon-button.js и типы; в другом проекте `import { IconButton } from 'turbo-ui/icon-button'` работает.

**Acceptance**:
- Файл contracts/icon-button.md по образцу contracts/button.md (props, CSS variables, a11y).
- Storybook: блоки по примеру Button (варианты, размер при наличии, подключение в проекте).
- package.json exports содержит "./icon-button"; vite.config.lib.js — entry для ui/icon-button; src/index.ts реэкспортирует IconButton.

## Requirements

- **FR-1**: IconButton имеет варианты primary и secondary, стили из tokens/theme.
- **FR-2**: Компонент принимает иконку (icon: ReactNode или name для встроенной иконки — по решению по макету).
- **FR-3**: Обязательный aria-label (или aria-labelledby) при использовании только иконки (a11y).
- **FR-4**: Экспорт turbo-ui/icon-button, сборка в dist, типы .d.ts.
- **FR-5**: Документация: контракт + Storybook по образцу Button.

## Success Criteria

- В Storybook отображаются primary и secondary по макету Figma 602-3021.
- Контракт icon-button.md заполнен; сборка и экспорт работают.
- В потребительском проекте можно импортировать IconButton и переопределять тему через TurboUIProvider.
