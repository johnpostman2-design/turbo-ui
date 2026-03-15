# Data Model: Input (003-input)

**Purpose**: Описание сущностей и состояний компонента Input для реализации.  
**Date**: 2026-03-14

## Entities

### InputProps (публичный API)

- **label** (optional): строка; подпись над полем, связь через htmlFor и id input.
- **helperText** (optional): строка; подсказка под полем; при наличии errorText не показывается.
- **errorText** (optional): строка; текст ошибки под полем; приоритет над helperText; при наличии выставляется aria-invalid.
- **leftIcon** (optional): ReactNode; иконка слева внутри поля (например, Icon из библиотеки).
- **endAdornment** (optional): ReactNode; только IconButton из библиотеки; кликабелен; tabIndex=-1.
- **size**: 'small' | 'medium' | 'large'; размер поля; значения из токенов.
- **disabled**: boolean; отключение поля и endAdornment.
- **error**: boolean (optional); явное состояние ошибки; альтернатива или дополнение к наличию errorText.
- **value**, **defaultValue**, **onChange**, **onBlur**, **onFocus**, **placeholder**, **type**, **name**, **id**, **aria-***, **data-***, и все остальные нативные атрибуты `<input>` — пробрасываются через ...rest. **ref** — через forwardRef на DOM input.

Типы input по спеце: text, number, tel, search, time, date, email.

### Внутреннее состояние (uncontrolled)

- **internalValue**: строка (или значение по type); используется когда value не передан (uncontrolled). Обновляется при onChange.

### Идентификаторы для a11y

- **id**: передан извне или сгенерированный уникальный id для input (для связи с label htmlFor).
- **helperId**, **errorId**: уникальные id для контейнеров helperText и errorText; input получает aria-describedby="helperId" или "errorId" в зависимости от приоритета (error > helper).

### Состояния визуала

- **default**: нет ошибки, не disabled, пустое или заполненное.
- **hover**: визуал через :hover в CSS.
- **focus** / **focus-visible**: визуал через :focus / :focus-visible в CSS.
- **filled**: значение не пустое; при необходимости класс или data-атрибут для стилей.
- **error**: error === true или errorText задан; стили и aria-invalid.
- **disabled**: disabled === true; стили и атрибут disabled на input; endAdornment неактивен.

## Validation rules (из спеки)

- При одновременных helperText и errorText показывается только errorText; aria-describedby ссылается на элемент с ошибкой.
- Layout: область под полем (одна строка) всегда зарезервирована, чтобы высота не менялась при появлении/исчезновении текста.

## State transitions

- Controlled: value полностью управляется извне; internalValue не используется.
- Uncontrolled: при отсутствии value используется internalValue; при onChange обновляется internalValue.
- Error: выставляется при error === true или при наличии errorText; сбрасывается при снятии обоих.
- Disabled: при disabled === true input и endAdornment неактивны.
