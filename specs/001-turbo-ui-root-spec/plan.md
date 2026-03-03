# Implementation Plan: Turbo UI Stabilization

**Branch**: `001-turbo-ui-root-spec` | **Date**: 2025-03-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Stabilization plan для существующего проекта Turbo UI. Без новых фич — приведение к production-стандарту и соответствию constitution.

## Summary

Привести текущее состояние Turbo UI (Button, tokens.json, Storybook, базовая структура) в соответствие с root spec и constitution: формализовать архитектуру, устранить технический мусор, обеспечить Token Enforcement и минималистичный API, подготовить versioning. Новые компоненты не добавляются; фокус только на стабилизации.

## Technical Context

**Language/Version**: TypeScript/ESM, React 18  
**Primary Dependencies**: React, Vite, Tailwind, Storybook, Vitest  
**Storage**: N/A (UI library)  
**Testing**: Vitest, Storybook (addon-vitest), при необходимости Playwright для визуальных тестов  
**Target Platform**: Browser (современные браузеры)  
**Project Type**: library (Design System / Component Library)  
**Performance Goals**: минимальный bundle impact, отсутствие лишних re-render в компонентах  
**Constraints**: стили только через tokens; без inline styles в компонентах Turbo UI; без hardcoded цветов/spacing  
**Scale/Scope**: один репозиторий, текущий набор компонентов (Button + иконки, foundations stories)

## Constitution Check

*GATE: Must pass before Phase 0. Re-check after stabilization.*

| Principle | Status | Stabilization Action |
|-----------|--------|----------------------|
| I. Single Source of Truth (tokens.json) | ⚠️ | theme.css дублирует значения; привести к генерации/импорту из tokens.json |
| II. Запрет hardcoded | ⚠️ | theme.css содержит hex/rgba; Button использует токены из tokens.ts — проверить все файлы на hardcoded |
| III. Component-first | ✅ | UI через компоненты |
| IV. Только существующие components | ✅ | В рамках библиотеки соблюдается |
| V. Figma как reference | ✅ | Токены выровнены с Figma |
| VI. Минималистичный API | ⚠️ | Button: нормализовать props (iconL/iconR/iconL2/iconR2, text по умолчанию) |
| VII. Чистота production-кода | ⚠️ | Аудит: dead code, debug, комментарии-заглушки |
| VIII. Контроль performance | ⚠️ | Проверить re-render и размер бандла |
| IX. Versioning (semantic versioning) | ⚠️ | Настроить дисциплину релизов и changelog |

## Project Structure

### Documentation (this feature)

```text
specs/001-turbo-ui-root-spec/
├── plan.md              # Этот файл
├── research.md          # Phase 0: решения по стабилизации
├── quickstart.md        # Краткий гайд по стабилизации и проверкам
├── contracts/           # Публичный API компонентов (Button)
└── tasks.md             # Phase 2: /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── ui/button/           # Button component
│   ├── Button.tsx
│   ├── button.css
│   └── Button.stories.tsx
├── tokens/
│   ├── tokens.json      # Single Source of Truth
│   ├── tokens.ts        # Runtime API для токенов
│   └── index.ts
├── styles/
│   ├── theme.css        # CSS variables — привести к tokens
│   ├── global.css
│   └── fonts.css
├── components/          # Вспомогательные (icons, DocsTemplate, ExampleBlock)
│   ├── icons/
│   └── ...
├── stories/             # Storybook: Foundations, Icons, Button
├── app/                 # Пример приложения (если используется)
└── imports/             # SVG/ассеты
```

**Structure Decision**: Текущая структура сохраняется. Компоненты библиотеки — под `src/ui/`. Общие компоненты (иконки, обёртки для Storybook) — под `src/components/`. Стабилизация не меняет дерево папок, только содержимое и правила.

---

## 1. Architecture Audit

**Цель**: Формализовать текущую архитектуру и устранить дублирование.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Зафиксировать текущую структуру папок в документации (например, в quickstart.md или README) | P1 | Описание актуального дерева и назначения директорий |
| Проверить разделение: библиотечные компоненты (`src/ui/`) vs вспомогательные (`src/components/`) | P1 | Чёткое правило: что входит в публичный API библиотеки, что — внутреннее |
| Выявить дублирование: токены в tokens.json vs theme.css vs константы в коде | P1 | Список дублей с путями; план устранения в п. 2 |
| Убедиться, что нет мёртвых веток кода и неиспользуемых файлов | P2 | Удалён dead code; при необходимости — список исключений |

**Выход**: Краткий отчёт (в research.md или в плане) с перечнем найденных несоответствий и решений.

---

## 2. Token Enforcement

**Цель**: Single Source of Truth в tokens.json; удаление hardcoded значений и inline styles в компонентах Turbo UI.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Удалить/переписать hardcoded значения в theme.css: цвета, spacing, типографика — только из tokens.json (генерация CSS-переменных из tokens или единый импорт) | P1 | theme.css не содержит hex/rgba/px для дизайн-решений; значения из одного источника |
| Проверить все компоненты Turbo UI (Button и др.): использование только tokens (tokens.ts / tokens.json), без магических чисел и цветов в коде | P1 | В коде компонентов нет hardcoded цветов, отступов, размеров шрифтов, radius |
| Устранить inline styles в Button: перенести стили в CSS (классы + CSS-переменные из токенов) | P1 | Нет `style={...}` для дизайн-решений; только className и CSS |
| Проверить stories и foundations: использование токенов для демо и swatch | P2 | Stories не вводят свои hardcoded значения для демо |

**Выход**: Все компоненты Turbo UI соответствуют Constitution II (запрет hardcoded) и запрету inline styles.

---

## 3. Component Hardening (Button)

**Цель**: Нормализация API, упрощение логики, accessibility, согласованность вариантов.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Нормализовать props Button: явные, минимально необходимые; рассмотреть объединение iconL/iconR и iconL2/iconR2 в один проп (например, iconStart/iconEnd с типом ReactNode) | P1 | Публичный API описан в contracts/; избыточные/дублирующие props убраны |
| Удалить лишнюю логику: упростить ветвления по state/type, вынести константы в токены где возможно | P2 | Меньше условной логики в компоненте при том же поведении |
| Проверка accessibility: focus, keyboard, aria-атрибуты, контраст (в т.ч. через токены) | P1 | Button доступен с клавиатуры; aria где нужно; при необходимости — a11y addon в Storybook |
| Variant consistency: все комбинации type × state × size документированы и покрыты в Storybook | P2 | В Storybook есть все варианты; нет «забытых» состояний |

**Выход**: Button соответствует constitution (минимальный API, токены, без inline styles); контракт в contracts/button.md.

---

## 4. Storybook Alignment

**Цель**: Документация и выравнивание с токенами.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Документировать все props Button в Storybook (описание, типы, default) | P1 | Docs содержат полное описание API |
| Добавить в Storybook все варианты Button (type, state, size, с иконками/без) | P1 | Нет пропущенных вариантов |
| Проверить, что в stories используются только токены (без подстановки своих цветов/spacing) | P1 | Foundations и компонентные stories ссылаются на tokens |
| При необходимости — единый DocsTemplate/декор для консистентности | P2 | По решению команды |

**Выход**: Storybook — надёжный источник правды по API и вариантам; демо на токенах.

---

## 5. Performance & Clean Code

**Цель**: Чистота кода и контроль регрессий.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Удалить dead code и неиспользуемые импорты/файлы | P1 | Линтер/скрипт не находит мёртвый код в scope стабилизации |
| Удалить debug-логи и закомментированные блоки «на потом» | P1 | Production-код без отладочного мусора |
| Проверить лишние re-render в Button (например, из-за создания объектов в render); при необходимости — useMemo/стабильные ссылки | P2 | Нет очевидных лишних ре-рендеров |
| Упростить API-логику компонентов (без изменения визуального поведения) | P2 | Упрощение без новых фич |

**Выход**: Код готов к долгой поддержке; регрессии по производительности не внесены.

---

## 6. Versioning Setup

**Цель**: Готовность к semantic versioning и релизам.

| Задача | Приоритет | Критерий готовности |
|--------|-----------|---------------------|
| Установить текущую версию в package.json по semantic versioning (например, 0.1.0 или 1.0.0 после стабилизации) | P1 | Версия осознанно выбрана и записана |
| Определить дисциплину релизов: кто решает MAJOR.MINOR.PATCH, как тегировать в git | P1 | Кратко описано в quickstart.md или CONTRIBUTING |
| Подготовить CHANGELOG (формат Keep a Changelog или аналог); первый entry — стабилизация | P2 | Файл создан; breaking changes в будущем будут отражаться в changelog |

**Выход**: Релизы и версии предсказуемы; changelog ведётся.

---

## Priorities Summary

- **P1 (обязательно до завершения стабилизации)**: Architecture Audit (формализация и дубли), Token Enforcement (tokens.json единственный источник, нет hardcoded/inline в Turbo UI), Component Hardening Button (API + a11y), Storybook Alignment (документация и варианты), Performance & Clean Code (удаление мусора и debug), Versioning Setup (версия и дисциплина).
- **P2 (желательно в рамках стабилизации)**: Детальная очистка логики Button, полное покрытие вариантов в Storybook, CHANGELOG.

## Complexity Tracking

Текущий план не вводит обоснованных нарушений конституции; цель — устранить существующие отклонения. Если в ходе работ потребуется временное отступление (например, этап миграции theme.css), оно документируется в research.md с указанием срока приведения в соответствие.
