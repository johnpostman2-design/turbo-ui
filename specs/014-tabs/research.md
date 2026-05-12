# Research: Tabs

**Feature**: 014-tabs | **Date**: 2026-05-12

## R1: Подчёркивание active 2px vs default 1px без скачка вёрстки

- **Decision**: нижняя линия реализуется псевдоэлементом `::after` у кнопки вкладки: абсолютное позиционирование `left: 0; right: 0; bottom: 0`; высота 1px (default/hover/disabled) или 2px (active); цвет из токенов `--border-tertiary`, `--border-secondary`, `--border-primary`, `--border-disabled`.
- **Rationale**: контент вкладки не смещается при смене active ↔ inactive в отличие от смены `border-width` у самого блока с `border-box`.
- **Alternatives considered**: разница `border-bottom-width` с компенсацией `padding-bottom` — больше магических чисел; только `box-shadow` — эквивалентно, оставлен `::after` для явной семантики «линия».

## R2: Несовпадение controlled `value` с Tab

- **Decision**: если `value` не совпадает ни с одним `Tab`, ни одна вкладка не получает `aria-selected={true}`; панели все скрыты (`hidden`), пока потребитель не поправит `value`.
- **Rationale**: предсказуемость controlled-режима без скрытого fallback.
- **Alternatives considered**: автоматический сброс на первую вкладку — скрытое изменение состояния, отклонено.

## R3: Порядок вкладок для клавиатуры

- **Decision**: порядок обхода стрелками = порядок регистрации вкладок при монтировании (совпадает с порядком детей в `TabsList` при статической разметке).
- **Rationale**: достаточно для типичного использования без коллекции как в Radix.
- **Alternatives considered**: обход DOM `querySelectorAll` при каждом keydown — дублирование источника правды; оставлен массив `tabValues` в контексте с `registerTab`/`unregisterTab`.

## R4: Storybook sort order

- **Decision**: в `.storybook/preview.js` вставить `'Tabs'` сразу после `'Toggle'` в массиве `storySort.order`.
- **Rationale**: новый компонент навигации логично следует за Toggle в алфавите/текущем списке компонентов.
