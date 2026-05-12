# Quickstart: ComboBox

## Установка

Пакет `turbo-ui` подключён; стили темы — как для остальных компонентов (см. квикстарты `Select`/`Input`).

## Импорт

```ts
import { ComboBox } from 'turbo-ui/combobox';
// или из корня:
import { ComboBox } from 'turbo-ui';
```

## Минимальный пример: справочник + свободный ввод

```tsx
const cities = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
];

const [city, setCity] = useState('');

<ComboBox
  options={cities}
  value={city}
  onChange={setCity}
  placeholder="Город"
/>;
```

При клике/фокусе панель открывается со всеми подсказками; при вводе — фильтруются.

## Размеры

```tsx
<ComboBox size="small"  options={cities} />
<ComboBox size="medium" options={cities} />
<ComboBox size="large"  options={cities} />
```

## Многострочное поле

```tsx
<ComboBox
  multiline
  options={cities}
  placeholder="Адрес"
  width={420}
/>
```

Enter с открытой панелью и активным пунктом выбирает подсказку. Shift+Enter — всегда перенос строки.

## Поле без обводки + выравнивание текста

```tsx
<ComboBox
  borderless
  textAlign="center"
  options={cities}
  placeholder="Город"
/>
```

## Иконка слева

```tsx
import { Icon } from 'turbo-ui';

<ComboBox
  startIcon={<Icon name="search" />}
  options={cities}
  placeholder="Найти город"
/>
```

## Очистка поля

```tsx
<ComboBox
  options={cities}
  value={city}
  onChange={setCity}
  clearable
/>;
// Замена иконки:
<ComboBox options={cities} clearIcon={<Icon name="close" />} />
```

## Маска и максимальная длина

```tsx
<ComboBox
  options={phones}
  mask="+7 (999) 999-99-99"
  maxLength={18}
  placeholder="Телефон"
/>
```

## Высота и расположение панели

```tsx
<ComboBox
  options={cities}
  menuMaxHeight={240}
  positions={['bottom left', 'top left']}
  menuOffset={4}
/>
```

При невозможности уложить ни одну позицию — применяется **первая** из массива (как в Select).

## Подсветка совпадений

```tsx
<ComboBox
  options={cities}
  highlightMatch
/>;
```

С кастомным рендером:

```tsx
<ComboBox
  options={cities}
  renderOption={(option, ctx) => (
    <span>
      {ctx.highlightMatch(option.label, ctx.query)}
      {option.disabled ? <em> (недоступно)</em> : null}
    </span>
  )}
/>;
```

## Состояния

```tsx
<ComboBox options={cities} disabled />
<ComboBox options={cities} error />
```

## Контролируемое раскрытие

```tsx
const [open, setOpen] = useState(false);

<ComboBox
  options={cities}
  open={open}
  onOpenChange={setOpen}
  value={city}
  onChange={setCity}
/>;
```

---

Дальше: [plan.md](./plan.md), [contracts/combobox.md](./contracts/combobox.md), [data-model.md](./data-model.md), [research.md](./research.md).
