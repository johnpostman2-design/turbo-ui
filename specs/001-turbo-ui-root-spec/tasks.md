# Tasks: Turbo UI Stabilization

**Input**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)  
**Prerequisites**: plan.md, spec.md

**Organization**: Задачи сгруппированы по блокам плана стабилизации (SA1–SA6). Порядок выполнения учитывает зависимости: Audit → Tokens → Button → Storybook; Clean Code и Versioning могут идти параллельно или после.

## Format: `[ID] [P?] [SA?] Description`

- **[P]**: Можно выполнять параллельно (другие файлы, нет зависимостей от незавершённых задач)
- **[SA]**: Блок стабилизации (SA1 Architecture Audit, SA2 Token Enforcement, SA3 Button, SA4 Storybook, SA5 Clean Code, SA6 Versioning)
- В описании указаны конкретные пути к файлам

---

## Phase 1: Setup

**Purpose**: Фиксация структуры и точки входа для стабилизации

- [x] T001 [SA1] Зафиксировать текущую структуру папок в specs/001-turbo-ui-root-spec/quickstart.md или в корневом README.md (дерево src/, назначение директорий)
- [x] T002 [P] [SA1] Задокументировать правило разделения: библиотечные компоненты (src/ui/) vs вспомогательные (src/components/) в specs/001-turbo-ui-root-spec/quickstart.md или README.md

---

## Phase 2: Architecture Audit [SA1]

**Goal**: Формализовать архитектуру, выявить дубли и мёртвый код.  
**Independent Test**: Документ с перечнем дублей и решений; список файлов/папок для удаления или правок.

- [x] T003 [SA1] Выявить дублирование токенов: составить список (tokens.json vs src/styles/theme.css vs константы в коде) с путями и записать в specs/001-turbo-ui-root-spec/research.md или plan.md
- [x] T004 [SA1] Проверить src/ui/, src/components/, src/stories/, src/styles/ на мёртвые ветки кода и неиспользуемые файлы; зафиксировать результат и удалить dead code в соответствующих файлах
- [x] T005 [SA1] Дополнить отчёт по аудиту в research.md или quickstart.md (несоответствия и принятые решения)

---

## Phase 3: Token Enforcement [SA2]

**Goal**: Single Source of Truth — tokens.json; нет hardcoded и inline styles в компонентах Turbo UI.  
**Independent Test**: theme.css не содержит hex/rgba для дизайн-решений; Button без style={...} для дизайна; линт/ручная проверка не находит нарушений.

- [x] T006 [SA2] Реализовать получение CSS-переменных из tokens.json для theme.css (скрипт генерации или импорт при сборке) и переписать src/styles/theme.css так, чтобы цвета, spacing, типографика брались только из tokens
- [x] T007 [SA2] Удалить все hardcoded hex/rgba/px для дизайн-решений из src/styles/theme.css; оставить только ссылки на токены или сгенерированные переменные
- [x] T008 [SA2] Проверить src/ui/button/Button.tsx и остальные компоненты в src/ui/ на hardcoded цвета, отступы, размеры шрифтов, radius; заменить на токены (tokens.ts / tokens.json) в соответствующих файлах
- [x] T009 [SA2] Устранить inline styles в src/ui/button/Button.tsx: перенести стили в src/ui/button/button.css с классами и CSS-переменными из токенов; убрать вызовы getContainerStyle()/getTextStyle() и атрибут style для дизайн-решений
- [x] T010 [P] [SA2] Проверить src/stories/ и foundations на использование только токенов (без своих hardcoded цветов/spacing); исправить при необходимости в src/stories/Foundations/*.tsx и компонентных stories

---

## Phase 4: Component Hardening — Button [SA3]

**Goal**: Нормализованный API Button, a11y, контракт в contracts/; без inline styles.  
**Independent Test**: Button соответствует contracts/button.md; доступен с клавиатуры; в Storybook все варианты отображаются.

- [x] T011 [SA3] Нормализовать props в src/ui/button/Button.tsx: рассмотреть iconStart/iconEnd (ReactNode) вместо iconL/iconR/iconL2/iconR2; явные default; обновить specs/001-turbo-ui-root-spec/contracts/button.md
- [x] T012 [SA3] Добавить accessibility в src/ui/button/Button.tsx: focus, keyboard, aria-disabled/aria-busy/aria-label где нужно
- [x] T013 [P] [SA3] Упростить ветвления и логику в src/ui/button/Button.tsx (state/type); вынести константы в токены где возможно
- [x] T014 [SA3] Убедиться, что все комбинации type × state × size покрыты в src/ui/button/Button.stories.tsx и документированы в contracts/button.md

---

## Phase 5: Storybook Alignment [SA4]

**Goal**: Полная документация API и все варианты Button; демо только на токенах.  
**Independent Test**: Storybook собирается; в Docs описание всех props; все варианты кнопки есть в stories.

- [x] T015 [SA4] Документировать все props Button в src/ui/button/Button.stories.tsx и/или README.mdx (описание, типы, default)
- [x] T016 [SA4] Добавить в src/ui/button/Button.stories.tsx все варианты Button (type, state, size, с иконками/без текста)
- [x] T017 [P] [SA4] Проверить src/stories/Foundations/Colors.stories.tsx и Typography.stories.tsx на использование токенов; при необходимости привести к ссылкам на tokens

---

## Phase 6: Performance & Clean Code [SA5]

**Goal**: Нет dead code, debug-логов, закомментированных блоков; при необходимости — снижение re-render.  
**Independent Test**: Линтер не находит мёртвый код; в production-коде нет console.* и заглушек.

- [x] T018 [P] [SA5] Удалить dead code и неиспользуемые импорты в src/ui/button/Button.tsx, src/tokens/, src/components/, src/stories/ (в scope стабилизации)
- [x] T019 [P] [SA5] Удалить debug-логи (console.*) и закомментированные блоки «на потом» в src/
- [x] T020 [SA5] Проверить src/ui/button/Button.tsx на лишние re-render (объекты в render); при необходимости применить useMemo/стабильные ссылки
- [x] T021 [SA5] Упростить API-логику в src/ui/button/Button.tsx без изменения визуального поведения (по результатам T013)

---

## Phase 7: Versioning Setup [SA6]

**Goal**: Версия в package.json, дисциплина релизов, при необходимости CHANGELOG.  
**Independent Test**: package.json содержит осмысленную версию; в quickstart или CONTRIBUTING описано, как решать MAJOR.MINOR.PATCH.

- [x] T022 [SA6] Установить текущую версию в package.json по semantic versioning (0.1.0 или 1.0.0 после стабилизации)
- [x] T023 [SA6] Описать дисциплину релизов (кто решает MAJOR.MINOR.PATCH, теги в git) в specs/001-turbo-ui-root-spec/quickstart.md или CONTRIBUTING.md в корне
- [x] T024 [P] [SA6] Создать CHANGELOG.md в корне; первый entry — стабилизация (формат Keep a Changelog или аналог)

---

## Phase 8: Polish & Validation

**Purpose**: Финальные проверки и кросс-блоковые правки

- [x] T025 Запустить сборку (npm run build) и Storybook (npm run build-storybook); убедиться, что ошибок нет
- [x] T026 Пройти чеклист из specs/001-turbo-ui-root-spec/quickstart.md (проверки перед мержем); зафиксировать результат
- [x] T027 Обновить specs/001-turbo-ui-root-spec/checklists/requirements.md при необходимости после стабилизации

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Можно начинать сразу
- **Phase 2 (Architecture Audit)**: После Phase 1; блокирует осмысленное выполнение Phase 3 (нужен список дублей)
- **Phase 3 (Token Enforcement)**: После Phase 2; блокирует Phase 4 (Button без inline styles зависит от theme.css и button.css на токенах)
- **Phase 4 (Button Hardening)**: После Phase 3 (стили уже в CSS)
- **Phase 5 (Storybook)**: После Phase 4 (стабильный API Button)
- **Phase 6 (Clean Code)**: Можно частично параллельно с Phase 4–5 (другие файлы)
- **Phase 7 (Versioning)**: Можно параллельно с Phase 5–6 или в конце
- **Phase 8 (Polish)**: После завершения нужных фаз стабилизации

### Recommended Order

1. T001–T002 → T003–T005 (Audit)  
2. T006–T010 (Token Enforcement)  
3. T011–T014 (Button)  
4. T015–T017 (Storybook)  
5. T018–T021 (Clean Code) параллельно или после 4  
6. T022–T024 (Versioning)  
7. T025–T027 (Polish)

### Parallel Opportunities

- T002 можно выполнять параллельно с T001  
- T010, T013, T017, T018, T019, T024 помечены [P] — при отсутствии зависимостей по файлам можно выполнять параллельно с другими задачами своей фазы

---

## Implementation Strategy

### MVP (минимальная стабилизация)

1. Phase 1 + Phase 2 (Setup + Audit)  
2. Phase 3 (Token Enforcement) — обязательно theme.css и Button без inline styles  
3. Phase 4 (Button: API + a11y)  
4. Phase 7 (Versioning: версия в package.json)  
5. Phase 8 (сборка + quickstart checklist)  

Остановиться и проверить: сборка и Storybook работают; конституция соблюдена по токенам и Button.

### Полная стабилизация

Выполнить все фазы по порядку; Phase 6 и 7 можно частично совмещать с Phase 4–5. В конце — Phase 8 и проход quickstart.md.

---

## Notes

- Задачи с [P] — разные файлы, без конфликтов по зависимостям
- [SA] привязывает задачу к блоку плана для трассировки
- После каждой фазы можно делать коммит и проверять сборку
- Не добавлять новые компоненты; только стабилизация текущей системы
