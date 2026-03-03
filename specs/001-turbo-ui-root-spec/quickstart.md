# Quickstart: Stabilization

**Feature**: 001-turbo-ui-root-spec

## Структура проекта (src/)

```text
src/
├── ui/                    # Компоненты библиотеки Turbo UI (публичный API)
│   └── button/            # Button component
│       ├── Button.tsx
│       ├── button.css
│       └── Button.stories.tsx
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
