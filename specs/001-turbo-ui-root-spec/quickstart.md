# Quickstart: Stabilization

**Feature**: 001-turbo-ui-root-spec

## Структура проекта (src/)

```text
src/
├── ui/                    # Компоненты библиотеки Turbo UI (публичный API)
│   └── button/            # Button component
│       ├── Button.tsx
│       ├── button.module.css   # CSS Modules — изоляция от проекта
│       ├── index.ts            # Экспорт для turbo-ui/button
│       └── Button.stories.tsx
├── provider/              # Провайдер темы (переопределение токенов)
│   ├── TurboUIProvider.tsx
│   └── index.ts
├── tokens/                # Design tokens — Single Source of Truth
│   ├── tokens.json
│   ├── tokens.ts
│   └── index.ts
├── styles/                # Глобальные стили и CSS-переменные из токенов
│   ├── theme.css
│   ├── global.css
│   └── fonts.css
├── components/            # Вспомогательные (иконки, обёртки для Storybook) — не публичный API библиотеки
│   ├── icons/
│   ├── ExampleBlock.tsx
│   └── DocsTemplate.tsx
├── stories/               # Storybook: Foundations, Icons, UI stories
├── app/                   # Пример приложения (если используется)
└── imports/               # SVG и прочие ассеты
```

**Правило разделения**: В публичный API Turbo UI входят только компоненты из `src/ui/`. Директория `src/components/` — внутренние вспомогательные компоненты (иконки, декораторы для Storybook); их не экспортируют как часть библиотеки.

**Стили (изоляция классов)**: Стили компонентов в `src/ui/` — только CSS Modules (`*.module.css`). Классы не попадают в глобальную область; при подключении библиотеки конфликтов имён с проектом нет.

**Переопределение темы**: Оберните приложение (или часть дерева) в `<TurboUIProvider theme={{ '--content-primary': '#333', '--surface-primary-main': '#f5f5f5' }}>…</TurboUIProvider>`. Значения из `theme` применяются поверх дефолтных из tokens.json. Импорт: `import { TurboUIProvider } from 'turbo-ui/provider'` (или из `src/provider` до публикации пакета).

**Подключение по частям и tree-shaking**: Используйте подпути при импорте (`import { Button } from 'turbo-ui/button'`, `import { TurboUIProvider } from 'turbo-ui/provider'`), чтобы в бандл потребителя не попадали неиспользуемые компоненты. В `package.json` заданы `exports` и `sideEffects: false`.

## Цель

Привести Turbo UI к production-стандарту и полному соответствию [spec](./spec.md) и [constitution](/.specify/memory/constitution.md) без добавления новых компонентов.

## Порядок работ (по плану)

1. **Architecture Audit** — зафиксировать структуру, выявить дубли и мёртвый код.
2. **Token Enforcement** — theme.css и компоненты только из tokens.json; убрать inline styles в Button.
3. **Component Hardening (Button)** — нормализация props, a11y, контракт в `contracts/button.md`.
4. **Storybook Alignment** — документация props, все варианты, использование токенов.
5. **Performance & Clean Code** — удаление dead code и debug.
6. **Versioning Setup** — версия в package.json, дисциплина релизов, при необходимости CHANGELOG.

## Проверки перед мержем

- В компонентах Turbo UI нет hardcoded цветов/spacing/типографики/radius.
- В компонентах Turbo UI нет inline styles для дизайн-решений.
- theme.css не дублирует tokens вручную (значения из tokens.json).
- Button соответствует контракту в `contracts/button.md`.
- Storybook собирается; все варианты Button задокументированы.

## Дисциплина релизов (Versioning)

- **Версионирование**: semantic versioning (MAJOR.MINOR.PATCH). Версия задаётся в `package.json`.
- **MAJOR**: несовместимые изменения публичного API (удаление/переименование props, смена поведения по умолчанию).
- **MINOR**: новая функциональность без ломающих изменений (новые опциональные props, новые варианты type/size).
- **PATCH**: исправления багов, обратно совместимые улучшения.
- **Теги в git**: при релизе создавать тег вида `v0.1.0`, соответствующий версии в package.json. Решение о номере версии принимает ответственный за релиз (например, ведущий разработчик или по согласованию в команде).

## Артефакты

- [plan.md](./plan.md) — план стабилизации.
- [research.md](./research.md) — решения по объёму и подходу.
- [contracts/button.md](./contracts/button.md) — публичный API Button.
- tasks.md — создаётся через `/speckit.tasks`.

## Библиотечная архитектура: список изменений

Цель: чистая библиотечная сборка, изоляция классов, подключение по частям, tree-shaking, только используемые иконки.

1. Стили компонентов — CSS Modules (`button.module.css`); классы изолированы.  
2. Соглашение об изоляции — в quickstart.  
3. Добавлен `src/provider/` (TurboUIProvider) для переопределения theme/tokens.  
4. В `src/ui/` только токены, hardcoded не найдены.  
5. Модульные exports: `package.json` (exports, main, module, sideEffects), `vite.config.lib.js`, точки входа `src/index.ts`, `src/ui/button/index.ts`, `src/provider/index.ts`.  
6. Tree-shaking: подпути `turbo-ui/button`, `turbo-ui/provider`.  
7–8. Иконки: ленивая загрузка по имени в `iconRegistry.ts`, асинхронный контент в `Icon.tsx`.  
9. Button на новой архитектуре (CSS Modules, токены, ленивые иконки); визуал без изменений.  
10. Итоговая структура и список — в quickstart и tasks.md.
