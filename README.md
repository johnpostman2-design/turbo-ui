# turbo-ui

Библиотека UI-компонентов (Turbo UI). Компоненты стилизуются через design tokens (CSS-переменные), тема переопределяется без смены кода.

## Установка

```bash
npm i turbo-ui
```

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

### 3. Button: варианты и deprecated prop

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
