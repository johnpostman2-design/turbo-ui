import React, { useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { autoUpdate, FloatingPortal, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { clsx } from 'clsx';
import { Icon } from '../../components/icons/Icon';
import { Listbox, type ListboxOption, type ListboxSize } from '../listbox/Listbox';
import styles from './select.module.css';
import { createMenuFloatingMiddleware } from './menuFloatingMiddleware';
import { toPlacementList, type SelectPosition } from './selectPlacement';
import tokensJson from '../../tokens/tokens.json';

export type SelectSize = ListboxSize;

const SPACES = (tokensJson as { spaces: Record<string, string> }).spaces;
/** Отступ между триггером и панелью — из `tokens.json` → `spaces[4]` (конституция: без magic numbers). */
const SELECT_MENU_MAIN_GAP_PX = Number.parseInt(SPACES['4'], 10) || 4;
/** Padding для `shift` у панели — `spaces[8]`. */
const SELECT_FLOAT_SHIFT_PADDING_PX = Number.parseInt(SPACES['8'], 10) || 8;

/** Собственные поля Select; `className` / `style` / `id` — корневая обёртка (портал снаружи). */
export interface SelectBaseProps {
  options: ListboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  positions?: SelectPosition | SelectPosition[];
  /** Положительное — сдвиг панели влево; отрицательное — вправо (спека FR-7). */
  menuOffset?: number;
  menuWidth?: string;
  menuMaxWidth?: string;
  menuMaxHeight?: string;
  search?: boolean;
  /** Placeholder поля поиска при `search` (проброс в Listbox). */
  searchPlaceholder?: string;
  /** Если не передан при `search`, используется подстрока по строковому `label` (регистронезависимо). */
  filterItem?: (query: string, option: ListboxOption) => boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showItemStartIcon?: boolean;
  size?: SelectSize;
  /** Фиксированная ширина триггера (CSS, можно `var(--spacing-*)` и т.п.). */
  triggerWidth?: string;
  /** Максимальная ширина триггера (CSS). */
  triggerMaxWidth?: string;
  /** Опциональная иконка слева в триггере (например `<Icon name="chart" size="100%" />` в слоте размера). */
  startIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  /**
   * id для самого `<button>`-триггера. Нужен для нативной связи `<label htmlFor>` с триггером
   * (например, в обёртке `SelectField`). Не влияет на корневой `id`, который ставится на обёртку.
   */
  triggerId?: string;
}

/** Нативная кнопка-триггер: `name`, `aria-label`, `form`, `data-*` и др. Исключены поля, занятые API Select и корнем. */
type SelectTriggerNativeProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'type' | 'children' | 'value' | 'defaultValue' | 'onChange' | 'className' | 'style' | 'id'
>;

export type SelectProps = SelectBaseProps & SelectTriggerNativeProps;

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
  const {
    options,
    value: valueProp,
    defaultValue,
    onChange,
    placeholder = 'Выберите',
    disabled = false,
    error = false,
    positions,
    menuOffset = 0,
    menuWidth,
    menuMaxWidth,
    menuMaxHeight,
    search = false,
    searchPlaceholder,
    filterItem,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    showItemStartIcon = true,
    size = 'medium',
    triggerWidth,
    triggerMaxWidth,
    startIcon,
    className,
    style,
    id,
    triggerId,
    ...buttonRest
  } = props;
  const reactId = useId().replace(/:/g, '');
  const listboxId = `turbo-select-listbox-${reactId}`;
  const listboxRef = useRef<HTMLDivElement>(null);

  const isValueControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const value = isValueControlled ? (valueProp ?? '') : internalValue;

  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(() => defaultOpen ?? false);
  const isOpen = isOpenControlled ? Boolean(openProp) : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange]
  );

  const placementList = useMemo(() => toPlacementList(positions), [positions]);
  const primaryPlacement = placementList[0] ?? 'bottom-start';
  const fallbackPlacements = placementList.slice(1);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen && !disabled,
    onOpenChange: (o) => {
      if (disabled) return;
      setOpen(o);
    },
    placement: primaryPlacement,
    middleware: createMenuFloatingMiddleware({
      mainGapPx: SELECT_MENU_MAIN_GAP_PX,
      shiftPaddingPx: SELECT_FLOAT_SHIFT_PADDING_PX,
      menuOffset,
      fallbackPlacements,
      menuWidth,
    }),
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const selected = options.find((o) => o.value === value);
  const triggerLabel = selected ? selected.label : null;
  const showPlaceholder = !selected;

  const mergedTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      refs.setReference(node);
      assignRef(ref, node);
    },
    [refs, ref]
  );

  useLayoutEffect(() => {
    if (!isOpen || disabled || search) return undefined;
    const t = requestAnimationFrame(() => listboxRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [isOpen, disabled, search]);

  const handleListboxChange = useCallback(
    (v: string) => {
      if (!isValueControlled) setInternalValue(v);
      onChange?.(v);
      setOpen(false);
    },
    [isValueControlled, onChange, setOpen]
  );

  const triggerSizeClass: Record<SelectSize, string> = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  };

  const menuInnerStyle = useMemo(() => {
    const s: React.CSSProperties = {};
    if (menuWidth) s.width = menuWidth;
    if (menuMaxWidth) s.maxWidth = menuMaxWidth;
    if (menuWidth && menuMaxWidth) {
      s.width = menuWidth;
      s.maxWidth = menuMaxWidth;
    }
    return s;
  }, [menuWidth, menuMaxWidth]);

  const listMax = menuMaxHeight ?? 'var(--listbox-default-menu-max-height)';

  const wrapStyle = useMemo(
    () => ({
      ...style,
      ...(triggerWidth ? { width: triggerWidth } : {}),
      ...(triggerMaxWidth ? { maxWidth: triggerMaxWidth } : {}),
    }),
    [style, triggerWidth, triggerMaxWidth]
  );

  return (
    <div id={id} className={clsx(styles.wrap, className)} style={wrapStyle}>
      <button
        type="button"
        ref={mergedTriggerRef}
        id={triggerId}
        className={clsx(
          styles.trigger,
          triggerSizeClass[size],
          isOpen && styles.triggerOpen,
          disabled && styles.triggerDisabled,
          error && styles.triggerError
        )}
        disabled={disabled}
        {...buttonRest}
        {...getReferenceProps()}
        aria-haspopup="listbox"
        aria-expanded={isOpen && !disabled}
        aria-controls={listboxId}
        aria-invalid={error ? true : undefined}
      >
        {startIcon ? (
          <span className={styles.startIcon} aria-hidden>
            {startIcon}
          </span>
        ) : null}
        <span className={clsx(styles.label, showPlaceholder && styles.placeholder)}>
          {showPlaceholder ? placeholder : triggerLabel}
        </span>
        <span className={clsx(styles.chevronWrap, isOpen && styles.chevronWrapOpen)} aria-hidden>
          <Icon name="carrot-down" size="100%" />
        </span>
      </button>
      {isOpen && !disabled ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={styles.menu}
            style={{
              ...floatingStyles,
              zIndex: 'var(--select-menu-z-index)',
            }}
            {...getFloatingProps()}
          >
            <div className={styles.menuInner} style={menuInnerStyle}>
              <Listbox
                ref={listboxRef}
                id={listboxId}
                options={options}
                value={value}
                onChange={handleListboxChange}
                showSelectedCheck
                showItemStartIcon={showItemStartIcon}
                size={size}
                maxHeight={listMax}
                search={search}
                searchPlaceholder={searchPlaceholder}
                filterItem={filterItem}
                focusSearchOnMount={search}
              />
            </div>
          </div>
        </FloatingPortal>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
