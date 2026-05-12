# turbo-ui

Библиотека UI-компонентов (Turbo UI). Компоненты стилизуются через design tokens (CSS-переменные), тема переопределяется без смены кода.

## Установка

```bash
npm i turbo-ui
```

## Быстрый старт

1. Подключите стили один раз (см. раздел [«Подключение»](#подключение) ниже, п. 1 про стили).
2. Оберните приложение (или кусок экрана) в `TurboUIProvider`, если нужны переопределения токенов.
3. Импортируйте компоненты **по подпутям** — так дружелюбнее к tree-shaking.

Полный перечень пропов, примеры и состояния — в **Storybook**: `npm run storybook` (локально) или собранная статика `npm run build-storybook`.

### Подпути экспорта (`package.json` → `exports`)

| Подпуть | Компоненты / назначение |
|---------|-------------------------|
| `turbo-ui` | Корневой реэкспорт всех публичных компонентов и типов |
| `turbo-ui/provider` | `TurboUIProvider`, типы темы |
| `turbo-ui/styles/theme` | Полная тема (CSS) |
| `turbo-ui/styles/theme-vars` | Только переменные из токенов |
| `turbo-ui/styles/fonts` | `@font-face` для ONY ONE (opt-in) |
| `turbo-ui/icons` | `Icon`, `iconNames`, `getIconContent` |
| `turbo-ui/button` | `Button` |
| `turbo-ui/icon-button` | `IconButton` |
| `turbo-ui/link` | `Link` |
| `turbo-ui/input` | `Input` |
| `turbo-ui/input-field` | `InputField` |
| `turbo-ui/floating-input-field` | `FloatingInputField` |
| `turbo-ui/textarea` | `TextArea` |
| `turbo-ui/textarea-field` | `TextAreaField` |
| `turbo-ui/checkbox` | `Checkbox` |
| `turbo-ui/radio` | `Radio` |
| `turbo-ui/toggle` | `Toggle` |
| `turbo-ui/tabs` | `Tabs`, `TabsList`, `Tab`, `TabsPanel` |
| `turbo-ui/listbox` | `Listbox` |
| `turbo-ui/select` | `Select` |
| `turbo-ui/select-field` | `SelectField` |
| `turbo-ui/combobox` | `ComboBox` |
| `turbo-ui/combobox-field` | `ComboBoxField` |

## Версии и миграции

Версия пакета следует [SemVer](https://semver.org/). Пока **major = 0**, допускаются обратно несовместимые изменения в minor — смотрите [CHANGELOG.md](CHANGELOG.md) перед обновлением.

## Подключение

### 1. Стили (один раз в приложении, например в `main.tsx`)

Импорты из пакета:

| Импорт | Назначение |
|--------|------------|
| `turbo-ui/styles/theme` | Полная тема (переменные + алиасы в `:root`) |
| `turbo-ui/styles/theme-vars` | Только CSS-переменные из tokens — достаточно для Button |
| `turbo-ui/styles/fonts` | Объявление @font-face для ONY ONE (opt-in) |

```js
// Рекомендуемый вариант — полная тема
import 'turbo-ui/styles/theme';

// Опционально: шрифты (см. раздел «Шрифты» ниже)
import 'turbo-ui/styles/fonts';
```

**Шрифты:** Файлы шрифтов (woff2) в npm-пакет не входят. Варианты: (1) не импортировать `turbo-ui/styles/fonts` и задать свой шрифт через тему: `theme={{ '--family-brand': '"Your Font", sans-serif' }}`; (2) использовать ONY ONE — скопировать файл шрифта в свой проект и подключить своим `@font-face`, либо положить в `public/fonts/` при сборке библиотеки (тогда в dist попадёт `dist/fonts/` и путь из fonts.css сработает).

Минимальный вариант (только переменные, без глобальных сбросов Turbo UI):

```js
import 'turbo-ui/styles/theme-vars';
```

### 2. Провайдер и компоненты

```jsx
import { TurboUIProvider } from 'turbo-ui/provider';
import { Button } from 'turbo-ui/button';

function App() {
  return (
    <TurboUIProvider theme={{ '--content-primary': '#333' }}>
      <Button variant="primary">Основная</Button>
      <Button variant="secondary">Вторичная</Button>
    </TurboUIProvider>
  );
}
```

Импортируйте по подпутям для tree-shaking: `turbo-ui/button`, `turbo-ui/provider`.

### 3. Иконки

```jsx
import { Icon, iconNames } from 'turbo-ui/icons';

<Icon name="plus" size={24} color="var(--content-primary)" />
```

Имя иконки совпадает с именем файла в наборе SVG библиотеки (kebab-case). Список имён — `iconNames` или Storybook → **Components → Icons → AllFromRegistry**.

### 4. Button: варианты и deprecated prop

Визуальный вариант задаётся пропом **`variant`**:

- `primary` | `secondary` | `text` | `backless` | `success` | `danger` | `caution`

Проп **`type`** для визуального варианта **deprecated** — используйте `variant`. Нативный HTML-атрибут `type` (button | submit | reset) поддерживается и пробрасывается на `<button>`.

## Минимальный CSS для Button

- `import 'turbo-ui/styles/theme'` — полная тема.
- `import 'turbo-ui/styles/theme-vars'` — только переменные (подходит при своих нормалайз/ресет).

Перечень CSS-переменных Button: [contracts/button.md](specs/001-turbo-ui-root-spec/contracts/button.md) (раздел «CSS variables used»).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск playground (Vite) |
| `npm run build:lib` | Сборка библиотеки в `dist/` |
| `npm run typecheck` | Проверка типов |
| `npm run test` | Запуск тестов (Vitest) |
| `npm run storybook` | Запуск Storybook |
| `npm run build-storybook` | Сборка Storybook |
