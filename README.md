# turbo-ui

Библиотека UI-компонентов (Turbo UI). Компоненты стилизуются через design tokens (CSS-переменные), тема переопределяется без смены кода.

## Подключение

1. Установите пакет: `npm i turbo-ui` (или подключите локально по пути).

2. Подключите стили **один раз** в приложении (например, в корневом JS/TS или в `main.tsx`):

   - **Рекомендуемый вариант** — полная тема (переменные + legacy-алиасы и типографика):
     ```js
     import 'turbo-ui/styles/theme';
     ```
     Либо после сборки библиотеки: импортируйте `dist/styles/theme.css` (файл подключает `theme-vars.css` и задаёт алиасы).

   - **Только переменные** (если у проекта свои нормалайз/ресет и не нужны глобальные стили Turbo UI):
     ```js
     import 'turbo-ui/styles/theme-vars';
     ```
     Подключится только `theme-vars.css` (переменные из tokens.json). Этого достаточно для Button.

   Файлы стилей экспортируются из пакета: `turbo-ui/styles/theme`, `turbo-ui/styles/theme-vars` (см. `package.json` → `exports`).

3. Оберните приложение (или блок с Turbo UI) в провайдер темы при необходимости переопределить токены:
   ```jsx
   import { TurboUIProvider } from 'turbo-ui/provider';
   import { Button } from 'turbo-ui/button';

   <TurboUIProvider theme={{ '--content-primary': '#333' }}>
     <Button>Текст</Button>
   </TurboUIProvider>
   ```

4. Импортируйте компоненты по подпутям для tree-shaking:
   ```js
   import { Button } from 'turbo-ui/button';
   ```

## Минимальный CSS для Button

Для работы кнопки достаточно переменных темы. Подключите один из вариантов:

- `import 'turbo-ui/styles/theme'` — полная тема (переменные + алиасы в `:root`).
- `import 'turbo-ui/styles/theme-vars'` — только переменные из tokens; подходит, если в проекте свои глобальные сбросы и не нужен `global.css` Turbo UI.

Перечень переменных, используемых Button, см. в [contracts/button.md](specs/001-turbo-ui-root-spec/contracts/button.md) (раздел «CSS variables used»).
