# Quickstart: SelectField, ComboBoxField, TextAreaField

Минимальный набор примеров, демонстрирующих API трёх новых обёрток. Подключение стилей и шрифтов — стандартное для Turbo UI.

## Подключение

```ts
import 'turbo-ui/styles/theme';
import { SelectField, ComboBoxField, TextAreaField } from 'turbo-ui';
// Или точечно для tree-shaking:
// import { SelectField } from 'turbo-ui/select-field';
// import { ComboBoxField } from 'turbo-ui/combobox-field';
// import { TextAreaField } from 'turbo-ui/textarea-field';
```

---

## SelectField

```tsx
import { SelectField } from 'turbo-ui';

const cities = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
];

function CityField() {
  const [city, setCity] = React.useState('');
  return (
    <SelectField
      label="Город"
      options={cities}
      value={city}
      onChange={setCity}
      helperText="Выберите ваш город"
    />
  );
}
```

С ошибкой:

```tsx
<SelectField label="Страна" options={countries} errorText="Поле обязательно" />
```

С размером и disabled:

```tsx
<SelectField label="Сортировка" options={sortOptions} size="large" disabled />
```

---

## ComboBoxField

```tsx
import { ComboBoxField } from 'turbo-ui';

const airports = [
  { value: 'SVO', label: 'Москва (SVO)' },
  { value: 'LED', label: 'Санкт-Петербург (LED)' },
  { value: 'OVB', label: 'Новосибирск (OVB)' },
];

function AirportField() {
  const [v, setV] = React.useState('');
  return (
    <ComboBoxField
      label="Аэропорт"
      options={airports}
      value={v}
      onChange={setV}
      helperText="Начните вводить название города"
    />
  );
}
```

Multiline + длинные подсказки:

```tsx
<ComboBoxField
  label="Подробный адрес"
  options={addresses}
  multiline
  helperText="Поле растёт по выбранному значению"
/>
```

С маской:

```tsx
<ComboBoxField
  label="Телефон"
  options={contacts}
  mask="+7 (XXX) XXX-XX-XX"
/>
```

С ошибкой:

```tsx
<ComboBoxField
  label="IATA код"
  options={airports}
  errorText="Введите трёхбуквенный код"
/>
```

---

## TextAreaField

```tsx
import { TextAreaField } from 'turbo-ui';

function CommentField() {
  const [v, setV] = React.useState('');
  return (
    <TextAreaField
      label="Комментарий"
      value={v}
      onChange={(e) => setV(e.target.value)}
      helperText="До 240 символов"
      maxLength={240}
      rows={4}
    />
  );
}
```

С ошибкой:

```tsx
<TextAreaField label="Описание задачи" errorText="Поле обязательно" size="large" />
```

Disabled:

```tsx
<TextAreaField label="Заметки" disabled defaultValue="Доступ к полю заблокирован" />
```

---

## Композиция формы

Все четыре `*Field` (`InputField`, `SelectField`, `ComboBoxField`, `TextAreaField`) ставятся друг под другом и визуально согласованы — одинаковые высоты подписи, фиксированный helper-слот, единая типографика:

```tsx
<form>
  <InputField label="Имя" placeholder="Иван" />
  <SelectField label="Город" options={cities} />
  <ComboBoxField label="Аэропорт" options={airports} />
  <TextAreaField label="Комментарий" rows={4} />
</form>
```

---

## Доступность

- `<label htmlFor={inputId}>` связывает подпись с полем; клик по подписи переводит фокус.
- При `errorText` — текст с `role="alert"`; на поле — `aria-invalid="true"`.
- При `helperText` без `errorText` — текст под полем; id попадает в `aria-describedby` поля.
- Пользовательский `aria-describedby` объединяется с auto-id через пробел.
- `disabled` имеет приоритет над `error`: `aria-invalid` НЕ ставится при заблокированном поле.

---

## Ref

```tsx
const triggerRef = React.useRef<HTMLButtonElement>(null);
<SelectField ref={triggerRef} label="..." options={...} />;
// triggerRef.current → <button> триггера Select

const inputRef = React.useRef<HTMLInputElement>(null);
<ComboBoxField ref={inputRef} label="..." options={...} />;
// inputRef.current → <input> внутри ComboBox

const taRef = React.useRef<HTMLTextAreaElement>(null);
<TextAreaField ref={taRef} label="..." />;
// taRef.current → <textarea>
```
