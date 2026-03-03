# Research: Turbo UI Stabilization

**Feature**: 001-turbo-ui-root-spec  
**Date**: 2025-03-03

## Scope Decision

**Decision**: Стабилизация существующего кода без добавления новых компонентов.  
**Rationale**: Spec Kit подключён после начала разработки; приоритет — приведение к constitution и production-стандарту, а не расширение функциональности.  
**Alternatives considered**: Параллельно добавлять новые компоненты — отклонено, чтобы не размывать фокус аудита и Token Enforcement.

## Token Single Source of Truth

**Decision**: Единственный источник дизайн-решений — `tokens.json`. CSS-переменные в theme.css должны получать значения из tokens (скрипт генерации или импорт при сборке), а не дублироваться вручную.  
**Rationale**: Constitution I и II требуют отсутствия дублирования и hardcoded значений.  
**Alternatives considered**: Оставить theme.css как есть — отклонено из-за нарушения Single Source of Truth.

## Inline Styles in Button

**Decision**: Убрать inline styles из Button; стили перенести в CSS-классы с использованием CSS-переменных, порождённых от tokens.  
**Rationale**: Constitution и spec запрещают inline styles для дизайн-решений в компонентах Turbo UI.  
**Alternatives considered**: Оставить inline для «динамики» — отклонено; динамика (например, размеры) может задаваться через CSS-переменные, устанавливаемые на контейнер, или через ограниченный набор классов.

## Button API Simplification

**Decision**: Нормализовать props: рассмотреть iconStart/iconEnd (ReactNode) вместо пар iconL/iconR и iconL2/iconR2; явные default для опциональных props; убрать избыточные булевы флаги, если они дублируют смысл.  
**Rationale**: Constitution VI (минималистичный API).  
**Alternatives considered**: Оставить текущий API для обратной совместимости — принять только если изменение ломает потребителей; иначе упростить в рамках стабилизации.

## Versioning

**Decision**: Использовать semantic versioning; начальная версия после стабилизации — 0.1.0 или 1.0.0 в зависимости от готовности к публичному использованию.  
**Rationale**: Constitution X.  
**Alternatives considered**: Не трогать версию — отклонено; стабилизация должна быть отражена в версии и при необходимости в changelog.

---

## Architecture Audit: Дублирование токенов (T003)

**Источник истины**: `src/tokens/tokens.json`.

**Дубли в `src/styles/theme.css`** (hardcoded hex/rgba/px — нарушение Single Source of Truth):

| Переменная | theme.css (текущее) | tokens.json (ключ) |
|------------|---------------------|---------------------|
| --content-invert | #ffffff | tokens["content-invert"] |
| --content-primary | #000000 | tokens["content-primary"] |
| --content-disabled | #00000014 | tokens["content-disabled"] |
| --surface-primary-invert-main | #000000 | tokens["surface-primary-invert-main"] |
| --surface-primary-invert-hover | #00000099 | tokens["surface-primary-invert-hover"] |
| --surface-primary-invert-disabled | #0000000a | tokens["surface-primary-invert-disabled"] |
| --surface-primary-main | #ffffff | tokens["surface-primary-main"] |
| --surface-primary-hover | #00000014 | tokens["surface-primary-hover"] |
| --surface-primary-disabled | #0000000a | tokens["surface-primary-disabled"] |
| --surface-secondary-disabled | #0000000a | tokens["surface-secondary-disabled"] |
| --border-secondary | #00000052 | tokens["border-secondary"] |
| --border-disabled | #0000000a | tokens["border-disabled"] |
| --spacing-8, --spacing-12, --spacing-16 | 8px, 12px, 16px | spaces["8"], ["12"], ["16"] |
| --font-size-p2, --font-line-height-p2 | 17px, 24px | typography (label large) |
| --radius | 4px | rounds["s"] / button.borderRadius |
| --muted-foreground | rgba(0,0,0,0.60) | content-secondary или аналог |

**Решение**: Генерировать CSS-переменные из tokens.json скриптом при сборке; theme.css не содержит ручных hex/rgba/px для дизайн-решений.

---

## Architecture Audit: Итог (T004, T005)

- **Мёртвый код**: В src/ не обнаружены console.log/debug; неиспользуемые импорты проверяются линтером. Папка src/app/ — пример приложения; оставлена в scope. Явно мёртвых файлов не выявлено.
- **Принятые решения**: (1) Дубли токенов устраняются скриптом генерации theme из tokens.json. (2) Структура папок не меняется; разделение src/ui/ (публичный API) vs src/components/ (внутреннее) зафиксировано в quickstart.
