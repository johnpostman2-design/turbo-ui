# Анализ структуры переменных Figma

## Обзор
Файл: Turbo - UI Demo
URL: https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo--UI-Demo

## Структура переменных по категориям

### 1. Цветовые переменные (Color Variables)

#### Content (Контент/Текст)
- `content/invert` - `#ffffff` (белый текст для темного фона)
- `content/primary` - `#000000` (черный текст для светлого фона)
- `content/disabled` - `#00000014` (серый текст для disabled состояния)

#### Surface (Поверхности)
**Primary Inverse (Темные поверхности):**
- `surface/primary-invert/main` - `#000000` (основной темный фон)
- `surface/primary-invert/hover` - `#00000099` (темный фон при наведении)
- `surface/primary-invert/disabled` - `#0000000a` (темный фон disabled)

**Primary (Светлые поверхности):**
- `surface/primary/main` - `#ffffff` (основной светлый фон)
- `surface/primary/hover` - `#00000014` (светлый фон при наведении)
- `surface/primary/disabled` - `#0000000a` (светлый фон disabled)

#### Border (Границы)
- `border/secondary` - `#00000033` (вторичная граница)
- `border/disabled` - `#0000000a` (граница disabled)

### 2. Типографические переменные (Typography Variables)

#### Базовые переменные
- `family/brand` - `"ONY ONE"` (шрифт бренда)
- `weight/regular` - `"regular"` (обычное начертание)
- `font/size/p2` - `17` (размер шрифта)
- `font/line-height/p2` - `24` (высота строки)
- `typescale/lable large/tracking` - `0` (межбуквенное расстояние)

#### Составная переменная (Composite Variable)
- `Label/large` - Font комплексная переменная:
  ```
  Font(
    family: "family/brand",
    style: weight/regular,
    size: font/size/p2,
    weight: 400,
    lineHeight: font/line-height/p2,
    letterSpacing: typescale/lable large/tracking
  )
  ```

### 3. Пространственные переменные (Spacing Variables)
- `Spaces/16` - `16` (базовая единица отступа)
- `8` - `8` (малая единица отступа)
- `12` - `12` (средняя единица отступа)

## Точки связи между коллекциями переменных

### Связи в типографике:
```
Label/large
  ├── family/brand
  ├── weight/regular
  ├── font/size/p2
  ├── font/line-height/p2
  └── typescale/lable large/tracking
```

### Связи в компонентах кнопок:

#### Primary Button States:
1. **Default (type=primary, state=default)**
   - Content: `content/invert` (#ffffff)
   - Surface: `surface/primary-invert/main` (#000000)
   - Typography: `Label/large`

2. **Hover (type=primary, state=hover)**
   - Content: `content/invert` (#ffffff)
   - Surface: `surface/primary-invert/hover` (#00000099)
   - Typography: `Label/large`

3. **Disabled (type=primary, state=disabled)**
   - Content: `content/disabled` (#00000014)
   - Surface: `surface/primary-invert/disabled` (#0000000a)
   - Typography: `Label/large`

#### Secondary Button States:
1. **Default (type=secondary, state=default)**
   - Content: `content/primary` (#000000)
   - Surface: `surface/primary/main` (#ffffff)
   - Border: `border/secondary` (#00000033)
   - Typography: `Label/large`

2. **Hover (type=secondary, state=hover)**
   - Content: `content/primary` (#000000)
   - Surface: `surface/primary/hover` (#00000014)
   - Border: `border/secondary` (#00000033)
   - Typography: `Label/large`

3. **Disabled (type=secondary, state=disabled)**
   - Content: `content/disabled` (#00000014)
   - Surface: `surface/primary/disabled` (#0000000a)
   - Border: `border/disabled` (#0000000a)
   - Typography: `Label/large`

## Паттерны использования переменных

### 1. Иерархия переменных
- **Базовые переменные**: цветовые значения, размеры, веса
- **Семантические переменные**: content/*, surface/*, border/*
- **Составные переменные**: Label/large (собирает несколько базовых)

### 2. Принцип именования
- Используется `/` для группировки (namespace)
- Формат: `категория/контекст/состояние`
- Примеры:
  - `surface/primary-invert/hover` - поверхность/тип/состояние
  - `content/disabled` - контент/состояние

### 3. Связи через состояния
- Одинаковые состояния используют одинаковые переменные:
  - Все `disabled` состояния используют `content/disabled`
  - Все `hover` состояния используют соответствующие `hover` переменные
  - Все `default` состояния используют `main` переменные

## Рекомендации для реализации в React

1. **Создать структуру токенов** по категориям:
   - `tokens.colors.content.*`
   - `tokens.colors.surface.*`
   - `tokens.colors.border.*`
   - `tokens.typography.*`
   - `tokens.spacing.*`

2. **Использовать составные токены** для типографики:
   - `tokens.typography.label.large` должна ссылаться на базовые переменные

3. **Создать theme провайдер** для управления состояниями кнопок через переменные

4. **Реализовать компоненты** с пропсами, соответствующими переменным:
   - `type`: "primary" | "secondary"
   - `state`: "default" | "hover" | "disabled"


