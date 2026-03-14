# Tasks: Publish-ready Turbo UI Refactor

**Input**: [plan.md](./plan.md), [spec.md](./spec.md), пользовательский запрос на полный refactor до publish-ready React UI library.

**Ограничения**: Не менять визуальное поведение компонентов без крайней необходимости; не переписывать архитектуру с нуля; улучшать только инженерную часть (package, build, API, styles isolation, DX).

**Organization**: Задачи упорядочены по зависимостям. Формат: `- [ ] [ID] [P?] [S?] Описание с путём к файлу`.

- **[P]**: можно выполнять параллельно (другие файлы, нет зависимостей от незавершённых задач)
- **[S1]–[S10]**: метка секции рефактора (1=package, 2=build, 3=Button API, … 10=tests)

---

## Phase 1: Package.json и публикация (S1)

**Purpose**: Библиотека готова к публикации в npm: корректные exports, peerDependencies, files, sideEffects.

**Independent Test**: `npm pack` создаёт tarball; в нём есть package.json с полными exports, main, module, types, files; react/react-dom в peerDependencies и devDependencies.

- [x] T001 [S1] Убрать `"private": true` и перенести react/react-dom в peerDependencies в `package.json`, оставив их в devDependencies
- [x] T002 [P] [S1] Добавить в `package.json` поля types, main, module (уже есть), убедиться что exports покрывают: ".", "./button", "./provider", "./styles/theme", "./styles/theme-vars", "./styles/fonts.css" с путями в dist
- [x] T003 [S1] Добавить поле `files` в `package.json` (dist, при необходимости README) и настроить `sideEffects` так, чтобы CSS не tree-shakался (например `["**/*.css"]`) в `package.json`

---

## Phase 2: Build library mode (S2)

**Purpose**: Сборка библиотеки через Vite library mode с генерацией .d.ts, попаданием в dist JS, types, CSS theme, шрифты.

**Independent Test**: После `npm run build:lib` в dist есть .js entrypoints, .d.ts (или types в package.json указывает на них), theme.css, theme-vars.css, fonts; библиотека успешно импортируется из другого проекта (`import { Button } from 'turbo-ui/button'`).

- [x] T004 [S2] Настроить генерацию .d.ts: добавить vite-plugin-dts (или tsc emitDeclarationOnly) в `vite.config.lib.js` и скрипт сборки так, чтобы в dist попадали типы для index, ui/button, provider
- [x] T005 [S2] Обеспечить попадание в dist CSS theme-файлов и шрифтов: проверить/дополнить `scripts/copy-styles.cjs` и при необходимости конфиг Vite в `vite.config.lib.js` (assetFileNames, copyPublicDir или аналог) в корне проекта
- [x] T006 [S2] Добавить экспорт `./styles/fonts.css` в `package.json` exports и убедиться, что файл копируется в dist при сборке (скрипт или Vite)

---

## Phase 3: Button API fix (S3)

**Purpose**: Визуальный prop только variant; нативный HTML type (button|submit|reset) поддерживается; backward compatibility для type как deprecated alias variant; ButtonProps расширяет React.ButtonHTMLAttributes, forwardRef, полная поддержка aria/data/id/tabIndex/style/name/value/form.

**Independent Test**: Button принимает type="submit", ref, data-testid, aria-label; при передаче type="primary" ведёт себя как variant="primary"; TypeScript типы корректны для onClick и rest.

- [x] T007 [S3] В `src/ui/button/Button.tsx`: поддержать нативный HTML prop `type` (button | submit | reset) — убрать из Omit в ButtonProps и передавать ...rest на `<button>`; в деструктуризации извлечь визуальный alias: если передан deprecated prop `type` со значением из ButtonVariant, трактовать как variant (с приоритетом variant над type)
- [x] T008 [S3] Убедиться что ButtonProps в `src/ui/button/Button.tsx` расширяет React.ButtonHTMLAttributes<HTMLButtonElement> без лишнего Omit (кроме при необходимости конфликтующих кастомных полей); ref через forwardRef уже есть; проверить типизацию onClick и rest
- [x] T009 [P] [S3] Обновить контракт и документацию: в `specs/001-turbo-ui-root-spec/contracts/button.md` описать поддержку нативного type, deprecated type→variant, перечень поддерживаемых нативных атрибутов (aria, data, id, tabIndex, style, name, value, form)

---

## Phase 4: Loading / state logic (S4)

**Purpose**: loading не ломает layout; loading + icons стабильны; loading + disabled не конфликтуют; убрать demo-only hover state из production API; использовать CSS hover/focus вместо JS state где возможно.

**Independent Test**: В Storybook кнопка в состоянии loading сохраняет размер/раскладку; комбинации loading+disabled и loading+иконки работают; hover визуально через CSS, не через контролируемый state в production.

- [x] T010 [S4] В `src/ui/button/Button.tsx`: упростить логику loading — убрать фиксацию ширины через widthWhenDefaultRef если она ломает layout; обеспечить что loading + disabled обрабатываются согласованно (кнопка disabled, визуал loading)
- [x] T011 [S4] В `src/ui/button/Button.tsx`: убрать контролируемый JS hover state из production API (isHovered/handleMouseEnter/handleMouseLeave) и перевести визуал hover на CSS (:hover в `src/ui/button/button.module.css`); оставить опциональный prop state только для disabled/loading если нужен для документации/Storybook
- [x] T012 [S4] Проверить в `src/ui/button/Button.tsx` и `button.module.css`: loading + startIcon/endIcon не ломают раскладку; при необходимости поправить стили (min-width или фиксированные отступы через токены)

---

## Phase 5: Theme scoping (S5)

**Purpose**: TurboUIProvider принимает scopeClassName; CSS-переменные применяются только внутри scope; библиотека не меняет :root глобально при использовании scope.

**Independent Test**: В тестовом приложении обёртка с scopeClassName применяет тему только внутри контейнера; глобальные :root хост-приложения не перезаписываются при использовании scoped провайдера.

- [x] T013 [S5] В `src/provider/TurboUIProvider.tsx`: при наличии scopeClassName всегда рендерить обёртку (div с классом и style theme), а не fragment; при отсутствии theme но наличии scopeClassName всё равно рендерить div с scopeClassName для консистентности scope в `src/provider/TurboUIProvider.tsx`
- [x] T014 [S5] Обеспечить что дефолтные токены не инжектятся в :root из библиотеки: проверить `src/styles/theme.css` и сборку — при использовании scoped темы переменные должны применяться только к элементу с scopeClassName; при необходимости документировать в README что глобальная тема подключается явно через импорт theme.css, а scoped — через TurboUIProvider + свой класс в `README.md` или `specs/001-turbo-ui-root-spec/quickstart.md`

---

## Phase 6: Styles и fonts (S6)

**Purpose**: Убрать глобальный `* { font-family }`; ограничить шрифт только scope контейнера; безопасная доставка шрифтов (относительные пути, ассеты в dist); opt-in подключение fonts.

**Independent Test**: После подключения библиотеки глобальные стили хост-приложения не переопределяются селектором *; шрифты загружаются только при явном импорте fonts.css; пути к font-files относительные и работают из dist.

- [x] T015 [S6] Убрать глобальное правило `* { font-family }` (или эквивалент) в `src/styles/global.css` или `src/styles/theme.css`; ограничить применение font-family только контейнером темы (например .turbo-ui-root или класс из TurboUIProvider) в соответствующих CSS-файлах
- [x] T016 [S6] В `src/styles/fonts.css`: перевести пути к шрифтам на относительные (от расположения CSS в dist), чтобы при установке пакета из npm ассеты резолвились корректно; убедиться что fonts копируются в dist при build:lib (скрипт или Vite) в `scripts/copy-styles.cjs` или `vite.config.lib.js`
- [x] T017 [P] [S6] Документировать opt-in подключение шрифтов: в README и при необходимости в `specs/001-turbo-ui-root-spec/quickstart.md` указать что `turbo-ui/styles/fonts` подключается по желанию; без него приложение может использовать свои шрифты при переопределении токена --family-brand

---

## Phase 7: README и документация (S7)

**Purpose**: README с реальными импортами, примером theme, TurboUIProvider, Button variant; пометить deprecated type.

**Independent Test**: По README можно установить пакет, подключить стили и провайдер, отрендерить Button с variant; deprecated type упомянут.

- [x] T018 [S7] Обновить раздел подключения в `README.md`: реальные импорты (turbo-ui/button, turbo-ui/provider, turbo-ui/styles/theme, turbo-ui/styles/theme-vars, turbo-ui/styles/fonts); пример одного подключения theme и TurboUIProvider с children
- [x] T019 [P] [S7] Добавить в `README.md` пример Button с variant (primary, secondary) и кратко пометить что prop type для визуального варианта deprecated — использовать variant

---

## Phase 8: Storybook consistency (S8)

**Purpose**: Stories синхронизированы с реальным API; убрать несуществующие фичи; оставить полезные integration examples.

**Independent Test**: В Storybook все контролы соответствуют ButtonProps; нет пропсов/фич которых нет в коде; есть примеры интеграции (ref, data-*, variant).

- [x] T020 [S8] В `src/ui/button/Button.stories.tsx`: синхронизировать argTypes и все stories с актуальным API (variant, нативный type, ref, aria/data); убрать упоминания несуществующих фич
- [x] T021 [P] [S8] Оставить в Storybook только полезные integration examples (ref forwarding, native props, variant), убрать избыточные или сломанные демо в `src/ui/button/Button.stories.tsx` и при необходимости в `src/stories/`

---

## Phase 9: Dev experience (S9)

**Purpose**: Минимальный demo shell для vite dev или убрать мёртвые entrypoints; консистентные скрипты dev, build, typecheck, storybook, build-storybook.

**Independent Test**: `npm run dev` открывает рабочий playground или явно документировано что dev — только Storybook; все скрипты из списка (dev, build, typecheck, storybook, build-storybook) есть и работают.

- [x] T022 [S9] Решить по текущему состоянию: либо оставить минимальный demo shell (`src/main.jsx` + index.html) для `npm run dev`, либо удалить мёртвые entrypoints и документировать что для разработки используется только Storybook; в `package.json` скрипты dev/build/typecheck/storybook/build-storybook должны быть консистентны и перечислены в README
- [x] T023 [S9] Добавить скрипт typecheck в `package.json` (например `"typecheck": "tsc --noEmit"` или через vitest) и при необходимости настроить tsc для библиотеки (tsconfig.json) в корне проекта

---

## Phase 10: Tests — минимум (S10)

**Purpose**: typecheck script; smoke-тесты Button (variant rendering, disabled, loading, native props, ref forwarding) через Vitest.

**Independent Test**: `npm run typecheck` и `npm run test` проходят; есть хотя бы один smoke-тест на рендер Button по вариантам и на ref.

- [x] T024 [S10] Добавить/настроить Vitest для библиотеки: конфиг в `vite.config.js` или отдельный vitest.config; скрипт `"test": "vitest run"` в `package.json`
- [x] T025 [P] [S10] Написать smoke-тесты Button в `src/ui/button/Button.test.tsx` (или `src/ui/button/__tests__/Button.test.tsx`): рендер по variant (primary, secondary); disabled; loading; передача нативных props (data-testid, type="submit"); ref forwarding (ref получает DOM-элемент)
- [x] T026 [S10] Убедиться что тесты и typecheck запускаются в CI или по инструкции в README/quickstart в `specs/001-turbo-ui-root-spec/quickstart.md`

---

## Phase 11: Финал — сборка и отчёт

**Purpose**: После refactor запустить build, typecheck, tests; вывести краткий summary (изменённые файлы, breaking changes, deprecated props, как проверить локально).

**Independent Test**: Все команды выполняются без ошибок; в репозитории или в quickstart есть concise summary.

- [x] T027 Запустить `npm run build:lib`, `npm run typecheck`, `npm run test` и исправить ошибки если появятся после предыдущих фаз
- [x] T028 Обновить `specs/001-turbo-ui-root-spec/quickstart.md` (или отдельный REFACTOR_SUMMARY.md): список изменённых файлов; breaking changes (если есть); перечень deprecated props (type → variant); как проверить библиотеку локально (npm link / npm pack + install в другом проекте)

---

## Dependencies & Execution Order

### Phase order

- **Phase 1 (S1)**: Package.json — без зависимостей, можно начинать первым.
- **Phase 2 (S2)**: Build — зависит от S1 (exports/files в package.json).
- **Phase 3 (S3)**: Button API — после S2 (сборка уже есть).
- **Phase 4 (S4)**: Loading/state — после S3 (логика Button).
- **Phase 5 (S5)**: Theme scoping — после S2 (провайдер в сборке).
- **Phase 6 (S6)**: Styles/fonts — после S2, S5 (theme и scope).
- **Phase 7 (S7)**: README — после S1–S6 (документирует итог).
- **Phase 8 (S8)**: Storybook — после S3, S4 (стабильный API).
- **Phase 9 (S9)**: Dev experience — после S2 (скрипты и entrypoints).
- **Phase 10 (S10)**: Tests — после S3, S4 (тесты Button).
- **Phase 11**: Финал — после всех фаз.

### Recommended sequence

1. T001 → T002 → T003 (package)
2. T004 → T005 → T006 (build)
3. T007 → T008 → T009 (Button API)
4. T010 → T011 → T012 (loading/state)
5. T013 → T014 (theme scoping)
6. T015 → T016 → T017 (styles/fonts)
7. T018 → T019 (README)
8. T020 → T021 (Storybook)
9. T022 → T023 (dev experience)
10. T024 → T025 → T026 (tests)
11. T027 → T028 (финал и summary)

### Parallel opportunities

- T002 и T003 можно выполнять параллельно после T001.
- T009, T017, T019, T021, T025 — помечены [P] в своих фазах.

---

## Implementation Strategy

### MVP (минимальный publish-ready)

1. Phase 1 + Phase 2 (package + build)
2. Phase 3 (Button API fix)
3. Phase 5 (theme scoping)
4. Phase 7 (README)
5. Phase 11 (финал)

Остановиться и проверить: `npm pack` и установка в другой проект, typecheck, один smoke-тест.

### Полный объём

Выполнить все фазы T001–T028 по порядку; затем финальный прогон build, typecheck, test и запись summary в quickstart/REFACTOR_SUMMARY.

---

## Notes

- Не менять визуальное поведение компонентов без крайней необходимости.
- Deprecated: визуальный prop `type` → использовать `variant`; обратная совместимость: type="primary" трактуется как variant="primary".
- После каждой фазы рекомендуется коммит и проверка сборки/Storybook.
