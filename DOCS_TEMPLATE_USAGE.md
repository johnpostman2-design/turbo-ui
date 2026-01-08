# Использование шаблона документации DocsTemplate

## Пример использования

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocsTemplate } from '../components/DocsTemplate';
import { YourComponent } from '../app/components/YourComponent';

const YourComponentDocsPage = () => {
  return (
    <DocsTemplate
      componentName="YourComponent"
      description="Описание вашего компонента из дизайн-системы."
      importCode="import { YourComponent } from 'turbo-ui';"
      exampleCode={`<YourComponent prop1="value1" prop2="value2">Content</YourComponent>`}
      exampleComponent={<YourComponent prop1="value1" prop2="value2">Content</YourComponent>}
      props={[
        {
          name: 'prop1',
          type: 'string',
          description: 'Описание первого пропса.',
          default: '"defaultValue"'
        },
        {
          name: 'prop2',
          type: 'boolean',
          description: 'Описание второго пропса.',
          default: 'false'
        }
      ]}
      menuItems={[
        { id: 'import', title: 'Импорт', level: 2 },
        { id: 'example', title: 'Пример', level: 2 },
        { id: 'all-props', title: 'Все пропсы', level: 2 },
        // Добавьте дополнительные пункты меню при необходимости
      ]}
    />
  );
};

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: YourComponentDocsPage,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories (опционально)
export const Default: Story = {
  args: {
    prop1: 'value1',
    prop2: true,
  },
};
```

## Параметры DocsTemplate

- `componentName` (string) - Название компонента (заголовок)
- `description` (string) - Описание компонента
- `importCode` (string) - Код импорта для блока "Импорт"
- `exampleCode` (string) - Код примера для ExampleBlock
- `exampleComponent` (ReactNode) - React компонент для примера
- `props` (Prop[]) - Массив пропсов компонента
- `menuItems` (Array, опционально) - Кастомные пункты меню (по умолчанию: Импорт, Пример, Все пропсы)

## Структура Prop

```typescript
interface Prop {
  name: string;        // Имя пропса
  type: string;        // Тип пропса (например: "string | number")
  description: string; // Описание пропса
  default: string;     // Значение по умолчанию
}
```

## Минимальный состав шаблона

Шаблон включает:
1. ✅ Якорное меню (справа, фиксированное при скролле, ширина 240px)
2. ✅ Заголовок компонента
3. ✅ Блок импорта
4. ✅ Блок с примером компонента
5. ✅ Все пропсы (сворачиваемый список)

## Структура макета

Документация использует flexbox-структуру с двумя колонками:

```tsx
<div style={{
  display: 'flex',
  gap: '80px',
  maxWidth: '1400px',
  margin: '0 auto',
  paddingLeft: '2rem',
  paddingRight: 'calc(240px + 80px + 20px)', // место для меню (240px) + зазор (80px) + отступ (20px)
  boxSizing: 'border-box'
}}>
  {/* Контентная зона */}
  <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
    {/* Контент документации */}
  </div>
</div>

{/* Меню навигации - фиксированное */}
<nav style={{
  position: 'fixed',
  top: '80px',
  right: '20px',
  width: '240px',
  // ... остальные стили
}}>
  {/* Меню */}
</nav>
```

### Параметры макета:
- **Контентная зона**: `flex: 1` - занимает оставшееся пространство
- **Меню**: `width: 240px`, `position: fixed` - фиксированная ширина, фиксируется при скролле
- **Зазор между колонками**: `gap: 80px`
- **Отступ меню от правого края**: `right: 20px`
- **Максимальная ширина контейнера**: `maxWidth: 1400px`

## Дополнительные секции (на примере Button)

### Буллитированный список для описания стилей

Для описания вариантов стилей используйте буллитированный список:

```tsx
<ul style={{ 
  marginBottom: '1.5rem',
  marginTop: 0,
  paddingLeft: '1.5rem',
  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
  fontSize: 'var(--text-base, 15px)',
  lineHeight: '1.5',
  color: '#000000',
  listStyleType: 'disc'
}}>
  <li style={{ 
    marginBottom: '0.5rem',
    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
    fontSize: 'var(--text-base, 15px)',
    lineHeight: '1.5',
    color: '#000000'
  }}>Primary — кнопка основного действия (черный фон)</li>
  <li style={{ 
    marginBottom: '0.5rem',
    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
    fontSize: 'var(--text-base, 15px)',
    lineHeight: '1.5',
    color: '#000000'
  }}>Secondary — кнопка второстепенного действия (белый фон с обводкой)</li>
</ul>
```

### Интерактивные примеры

Для демонстрации состояний компонентов используйте интерактивные примеры с `useState`:

```tsx
const InteractiveExample = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setClickedButtonIndex(index);
    setTimeout(() => {
      setClickedButtonIndex(null);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button 
        type="primary" 
        state={clickedButtonIndex !== null && clickedButtonIndex !== 1 ? "loading" : "default"}
        onClick={() => handleButtonClick(1)}
      >
        Button 1
      </Button>
      <Button 
        type="primary" 
        state={clickedButtonIndex !== null && clickedButtonIndex !== 2 ? "loading" : "default"}
        onClick={() => handleButtonClick(2)}
      >
        Button 2
      </Button>
    </div>
  );
};
```

**Особенность**: При клике на одну кнопку все остальные переходят в состояние loading.

### Пример структуры с дополнительными секциями

```tsx
const ButtonDocsPage = () => {
  return (
    <>
      <div style={{
        display: 'flex',
        gap: '80px',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: 'calc(240px + 80px + 20px)',
        boxSizing: 'border-box'
      }}>
        <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
          <h1>Button</h1>
          <p>Описание компонента</p>

          {/* Импорт */}
          <h2 id="import">Импорт</h2>
          {/* Блок импорта */}

          {/* Пример */}
          <ExampleBlock code="..." />

          {/* Все пропсы */}
          <h2 id="all-props">Все пропсы</h2>
          <CollapsiblePropsList />

          {/* Дополнительные секции */}
          <h2 id="style-variants">Варианты стилей</h2>
          {/* Буллитированный список */}
          <ExampleBlock code="..." />

          <h2 id="sizes">Размеры</h2>
          <InteractiveSizesButtons />

          <h2 id="icons">Иконки в кнопке</h2>
          <ExampleBlock code="..." />

          <h2 id="loading">Состояние загрузки</h2>
          <InteractiveLoadingButtons />

          <h2 id="disabled">Состояние блокировки</h2>
          <ExampleBlock code="..." />
        </div>
      </div>

      {/* Фиксированное меню */}
      <nav style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        width: '240px',
        // ...
      }}>
        {/* Пункты меню */}
      </nav>
    </>
  );
};
```

## Важные правила

### 1. Использование переменных и названий из Figma

**Обязательно**: При создании компонентов всегда используйте:
- **Названия пропсов** точно как в Figma (например, `type` вместо `variant`)
- **CSS переменные** из `FIGMA_VARIABLES_ANALYSIS.md` и `src/styles/theme.css`
- **Типы и значения** точно как указано в Figma

Пример:
```tsx
// ✅ Правильно (из Figma)
interface ButtonProps {
  type?: "primary" | "secondary" | "text" | "backless";
  state?: "default" | "hover" | "disabled" | "loading";
  size?: "small" | "medium" | "large";
}

// ❌ Неправильно
interface ButtonProps {
  variant?: "primary" | "secondary"; // не соответствует Figma
}
```

### 2. Стилизация текста

Все описательные тексты должны использовать глобальные стили:
- `fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)'`
- `fontSize: 'var(--text-base, 15px)'`
- `lineHeight: '1.5'`
- `color: '#000000'`

### 3. Структура заголовков

Заголовки секций (`h2`) должны иметь:
- `marginBottom: '0.25rem'` (4px)
- `id` для якорных ссылок
- Те же стили шрифта, что и описания

### 4. Якорное меню

Меню должно:
- Быть фиксированным при скролле (`position: fixed`)
- Иметь ширину `240px`
- Находиться на `right: 20px` от правого края
- Использовать плавную прокрутку при клике на пункты меню

```tsx
const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
```
