# Tasks: IconButton

**Input**: Design documents from `specs/002-icon-button-spec/`  
**Prerequisites**: plan.md, spec.md, contracts/icon-button.md  
**Design**: [Figma 602-3021](https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=602-3021)

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Можно выполнять параллельно (разные файлы, нет зависимостей)
- **[Story]**: Привязка к user story (US1, US2)
- В описаниях указаны точные пути к файлам

## Path Conventions

- Исходники: `src/ui/icon-button/`, `src/tokens/`
- Спеки: `specs/002-icon-button-spec/`
- Сборка: `package.json`, `vite.config.lib.js`, `scripts/copy-styles.cjs`

---

## Phase 1: Setup

**Purpose**: Подготовка артефактов фичи и дизайн-референса

- [x] T001 Убедиться, что в репозитории есть specs/002-icon-button-spec/ (plan.md, spec.md, contracts/icon-button.md)
- [x] T002 Получить get_design_context и get_screenshot для Figma node 602:3021 (fileKey pj5aiXE1X40rEoVbtyVQ2F) для референса размеров и стилей primary/secondary

---

## Phase 2: Foundational (Design & Tokens)

**Purpose**: Токены и дизайн-референс, без которых нельзя реализовать компонент по макету

- [x] T003 По результатам Figma (T002) добавить в tokens.json или theme CSS-переменные для IconButton (размер кнопки, padding, radius, цвета primary/secondary), если их ещё нет — по образцу Button
- [x] T004 [P] Создать директорию src/ui/icon-button/ и заготовку IconButton.tsx с типами props (variant: primary | secondary, icon: ReactNode, forwardRef, нативные атрибуты button) в src/ui/icon-button/IconButton.tsx

---

## Phase 3: User Story 1 — Разработчик использует IconButton (P1) — MVP

**Goal**: Компонент IconButton с вариантами primary и secondary, стили из токенов, можно импортировать и рендерить.

**Independent Test**: Импорт из `turbo-ui/icon-button`, рендер primary и secondary с иконкой; внешний вид по Figma.

- [x] T005 [P] [US1] Реализовать стили primary и secondary (default, hover, disabled) в src/ui/icon-button/icon-button.module.css на токенах темы
- [x] T006 [US1] Доработать IconButton.tsx: подключить CSS module, маппинг variant → классы, слот icon, aria-label в документации/типах, ref в src/ui/icon-button/IconButton.tsx
- [x] T007 [US1] Создать barrel-экспорт в src/ui/icon-button/index.ts (IconButton, IconButtonProps, при необходимости IconButtonVariant)

**Checkpoint**: Компонент можно импортировать из src и рендерить; стили по макету.

---

## Phase 4: User Story 2 — Документация и сборка как у Button (P1)

**Goal**: Контракт, Storybook, экспорт из пакета turbo-ui/icon-button, сборка в dist.

**Independent Test**: Storybook показывает IconButton; `npm run build:lib` создаёт dist/ui/icon-button.js и типы; в другом проекте `import { IconButton } from 'turbo-ui/icon-button'` работает.

- [x] T008 [P] [US2] Обновить контракт specs/002-icon-button-spec/contracts/icon-button.md: итоговые props, CSS variables, a11y (aria-label), по образцу contracts/button.md
- [x] T009 [P] [US2] Добавить Storybook-истории в src/ui/icon-button/IconButton.stories.tsx по образцу Button: варианты primary/secondary, пример кода подключения в проекте
- [x] T010 [US2] Добавить в package.json в exports поле "./icon-button" с types и import на dist/ui/icon-button.d.ts и dist/ui/icon-button.js
- [x] T011 [US2] Добавить в vite.config.lib.js в lib.entry запись ui/icon-button и в dts.include пути src/ui/icon-button/**/*
- [x] T012 [US2] Реэкспортировать IconButton и типы из src/index.ts
- [x] T013 [US2] В scripts/copy-styles.cjs добавить запись dist/ui/icon-button.d.ts (по аналогии с button), если сборка генерирует dist/ui/icon-button/

**Checkpoint**: Документация и сборка готовы; потребитель может подключать turbo-ui/icon-button.

---

## Phase 5: Polish & Cross-Cutting

**Purpose**: Проверка сборки, типов и визуала

- [x] T014 Запустить npm run typecheck и npm run build:lib, убедиться в отсутствии ошибок
- [ ] T015 Проверить в Storybook отображение IconButton primary и secondary 1:1 с макетом Figma 602-3021

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: Без зависимостей.
- **Phase 2**: Зависит от T001–T002; T003 может опираться на результат T002.
- **Phase 3 (US1)**: Зависит от Phase 2 (токены и дизайн известны).
- **Phase 4 (US2)**: Зависит от Phase 3 (компонент реализован).
- **Phase 5**: Зависит от Phase 4.

### Parallel Opportunities

- T004 и T005 можно выполнять параллельно после T003.
- T008 и T009 можно выполнять параллельно.
- T010, T011, T012 — по очереди (одни и те же конфиги/файлы).

---

## Implementation Strategy

### MVP First (US1)

1. Phase 1 → Phase 2 → Phase 3.  
2. Проверить: рендер IconButton из src, стили по Figma.  
3. После этого переходить к Phase 4 (документация и сборка).

### Incremental Delivery

1. Phase 1–2 → основа.  
2. Phase 3 → рабочий компонент в репозитории.  
3. Phase 4 → готовность к публикации и подключению в других проектах.  
4. Phase 5 → финальная валидация.

---

## Report

- **Путь к tasks.md**: `specs/002-icon-button-spec/tasks.md`
- **Всего задач**: 15 (T001–T015)
- **По фазам**: Setup 2, Foundational 2, US1 3, US2 6, Polish 2
- **Параллельно**: T004/T005, T008/T009
- **MVP**: Phase 1 + 2 + 3 (компонент в src, готов к экспорту)
- **Формат**: Все задачи в формате чеклиста с ID, путями и при необходимости [P]/[US1]/[US2]
