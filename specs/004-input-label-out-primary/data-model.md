# Data Model: InputField (004, label-out-primary)

**Purpose**: Сущности и состояния для компонента **InputField**.  
**Date**: 2026-04-09

## Entities

### InputFieldProps (публичный API)

Расширяет базовый `InputProps` (см. `src/ui/input/Input.tsx` и `specs/003-input/contracts/input.md`) без удаления нативных атрибутов `input`.

Дополнительно:

| Поле | Тип | Описание |
|------|-----|----------|
| label | `string` (optional) | Текст над полем; связь с `input` через `htmlFor` / `id`. |
| helperText | `string` (optional) | Нейтральная подсказка под полем; при наличии `errorText` не показывается. |
| errorText | `string` (optional) | Текст ошибки под полем; приоритет над `helperText`; влияет на `aria-invalid`. |

Опционально: `className` на корневой обёртке `InputField` (если добавлено в реализации).

### Состояние ввода

- **value / defaultValue / onChange**: как у нативного input; наследуется от `InputProps`.
- **error (boolean)**: визуал ошибки на поле + `aria-invalid`; сочетается с `errorText`.
- **disabled**: поле и endAdornment неактивны; label/helper визуально disabled по токенам.

### Визуальные состояния (не отдельные props)

- **hover, focus, filled, filled-hover**: из CSS (`:hover`, `:focus-within`, `:placeholder-shown`), как в [research.md](./research.md).

### Идентификаторы a11y

- **id**: на `<input>` — переданный или сгенерированный (например `useId`).
- **label**: `<label htmlFor={id}>`.
- **helperId / errorId**: для `aria-describedby` на input — один активный id (error приоритетнее helper).

## Relationships

- Один экземпляр компонента = один `<input>` + опционально label + одна зона под полем (helper **или** error).
- `leftIcon` / `endAdornment`: как у базового Input; размер IconButton согласован с `size` поля.
