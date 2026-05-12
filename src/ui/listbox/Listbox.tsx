import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../../components/icons/Icon';
import { Input } from '../input/Input';
import { tokens } from '../../tokens/tokens';
import styles from './listbox.module.css';

export type ListboxSize = 'small' | 'medium' | 'large';

export interface ListboxOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  /** Слот слева (например иконка); при `showItemStartIcon` колонка только если значение непустое. */
  icon?: React.ReactNode;
  id?: string;
}

export interface ListboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  options: ListboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /**
   * Галочка справа у выбранной строки — только в выпадающем **Select** (задаётся внутри Select).
   * У автономного Listbox не используется.
   */
  showSelectedCheck?: boolean;
  /** Разрешить `option.icon` слева; пустой слот не создаётся — текст без отступа. */
  showItemStartIcon?: boolean;
  /** CSS max-height панели (например `240px` или `var(--listbox-default-menu-max-height)`) */
  maxHeight?: string;
  size?: ListboxSize;
  /** Поле поиска над списком (компонент Input). */
  search?: boolean;
  /** Placeholder у поля поиска (при `search`). */
  searchPlaceholder?: string;
  /** Фильтр видимых опций при `search`; без пропа — подстрока в строковом `label` (без регистра). */
  filterItem?: (query: string, option: ListboxOption) => boolean;
  /** Сфокусировать поле поиска при монтировании (например выпадающий Select с `search`). */
  focusSearchOnMount?: boolean;
  /**
   * Навигация клавиатурой: `external` — стрелки обрабатывает родитель (ComboBox); активная строка задаётся пропами.
   */
  listNavigation?: 'internal' | 'external';
  /** При `listNavigation="external"` — индекс активной опции в отфильтрованном списке */
  externalActiveIndex?: number;
  onExternalActiveIndexChange?: (index: number) => void;
  /**
   * Сообщение, которое показывается внутри `role="listbox"`, когда нет видимых опций
   * (например, при `search` без совпадений или у пустого `options`).
   * Если не передан — пустое состояние не отображается.
   */
  emptyState?: React.ReactNode;
}

const sizeClass: Record<ListboxSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
}

function defaultFilterItem(query: string, opt: ListboxOption): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  if (typeof opt.label !== 'string') return false;
  return opt.label.toLowerCase().includes(q);
}

/** Слот слева рендерим только если есть содержимое — без пустой колонки и сдвига текста. */
function hasSlotContent(node: React.ReactNode): boolean {
  if (node == null || node === false || node === true) return false;
  if (typeof node === 'string') return node.trim().length > 0;
  if (Array.isArray(node)) return node.some((n) => hasSlotContent(n));
  return true;
}

function findEnabledIndex(opts: ListboxOption[], from: number, dir: 1 | -1): number {
  const n = opts.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step += 1) {
    i = (i + dir + n) % n;
    if (!opts[i]?.disabled) return i;
  }
  return -1;
}

export const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(function Listbox(
  {
    options,
    value: valueProp,
    defaultValue,
    onChange,
    showSelectedCheck = false,
    showItemStartIcon = true,
    maxHeight,
    size = 'medium',
    search = false,
    searchPlaceholder = 'Найти в списке…',
    filterItem,
    focusSearchOnMount = false,
    listNavigation = 'internal',
    externalActiveIndex = 0,
    onExternalActiveIndexChange,
    emptyState,
    className,
    id: idProp,
    onKeyDown,
    style,
    ...rest
  },
  ref
) {
  const reactId = useId();
  const baseId = idProp ?? `turbo-listbox-${reactId.replace(/:/g, '')}`;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      assignRef(ref, node);
    },
    [ref]
  );

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const value = isControlled ? (valueProp ?? '') : internalValue;

  const [searchQuery, setSearchQuery] = useState('');
  const filterFn = filterItem ?? defaultFilterItem;
  const visibleOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => filterFn(searchQuery, o));
  }, [options, search, searchQuery, filterFn]);

  const selectedIndex = useMemo(() => visibleOptions.findIndex((o) => o.value === value), [visibleOptions, value]);

  const isExternalNav = listNavigation === 'external';

  const [internalActiveIndex, setInternalActiveIndex] = useState(() => {
    const si = visibleOptions.findIndex((o) => o.value === value);
    return si >= 0 ? si : findEnabledIndex(visibleOptions, -1, 1);
  });

  const activeIndex = useMemo(() => {
    if (!isExternalNav) return internalActiveIndex;
    const n = visibleOptions.length;
    if (n === 0) return -1;
    return Math.min(Math.max(externalActiveIndex, 0), n - 1);
  }, [isExternalNav, internalActiveIndex, externalActiveIndex, visibleOptions]);

  useLayoutEffect(() => {
    if (!search || !focusSearchOnMount) return undefined;
    const id = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [search, focusSearchOnMount]);

  useEffect(() => {
    if (isExternalNav) return;
    if (selectedIndex >= 0) setInternalActiveIndex(selectedIndex);
    else setInternalActiveIndex(findEnabledIndex(visibleOptions, -1, 1));
  }, [selectedIndex, visibleOptions, isExternalNav]);

  useEffect(() => {
    if (isExternalNav) return;
    if (internalActiveIndex >= visibleOptions.length) {
      setInternalActiveIndex(findEnabledIndex(visibleOptions, -1, 1));
    }
  }, [visibleOptions, internalActiveIndex, isExternalNav]);

  const listboxSizes = (tokens as { listbox: { sizes: Record<ListboxSize, { iconSize: number; checkIconSize: number }> } })
    .listbox.sizes;

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const selectOption = useCallback(
    (opt: ListboxOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (isExternalNav) return;

    const n = visibleOptions.length;
    if (n === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setInternalActiveIndex((i) => findEnabledIndex(visibleOptions, i < 0 ? -1 : i, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setInternalActiveIndex((i) => findEnabledIndex(visibleOptions, i < 0 ? n : i, -1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setInternalActiveIndex(findEnabledIndex(visibleOptions, -1, 1));
    } else if (e.key === 'End') {
      e.preventDefault();
      setInternalActiveIndex(findEnabledIndex(visibleOptions, n, -1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const ai = activeIndexRef.current;
      const idx = ai >= 0 ? ai : findEnabledIndex(visibleOptions, -1, 1);
      const opt = visibleOptions[idx];
      if (opt) selectOption(opt);
    }
  };

  const activeOpt = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined;
  const activeDescendant =
    activeOpt && !activeOpt.disabled ? activeOpt.id ?? `${baseId}-opt-${activeOpt.value}` : undefined;

  const listRegionStyle = useMemo(() => {
    if (!maxHeight) return undefined;
    return Object.assign({}, { maxHeight }, { '--listbox-max-height': maxHeight } as React.CSSProperties);
  }, [maxHeight]);

  const inputSize: 'small' | 'medium' | 'large' = size === 'large' ? 'medium' : size;

  return (
    <div
      {...rest}
      className={clsx(styles.panel, sizeClass[size], className)}
      style={style}
      data-no-sbdocs-typography=""
    >
      {search ? (
        <div className={styles.searchRow}>
          <Input
            ref={searchInputRef}
            size={inputSize}
            type="search"
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Поиск в списке"
          />
        </div>
      ) : null}
      <div
        ref={mergedRef}
        id={baseId}
        role="listbox"
        tabIndex={isExternalNav ? -1 : 0}
        aria-activedescendant={activeDescendant}
        className={clsx(styles.listRegion, search && styles.listRegionWithSearch)}
        style={listRegionStyle}
        onKeyDown={handleKeyDown}
      >
        {visibleOptions.length === 0 && emptyState != null ? (
          <div className={styles.empty} role="presentation">
            {emptyState}
          </div>
        ) : null}
        {visibleOptions.map((opt, index) => {
          const oid = opt.id ?? `${baseId}-opt-${opt.value}`;
          const selected = opt.value === value;
          const active = index === activeIndex;
          const checkSize = listboxSizes[size].checkIconSize as number;
          const iconColor = opt.disabled ? 'var(--content-disabled)' : 'var(--content-primary)';

          return (
            <div
              key={opt.value}
              id={oid}
              role="option"
              aria-selected={selected}
              aria-disabled={opt.disabled ? true : undefined}
              className={clsx(
                styles.option,
                selected && styles.optionSelected,
                active && styles.optionActive,
                opt.disabled && styles.optionDisabled
              )}
              data-active={active ? '' : undefined}
              onMouseEnter={() => {
                if (opt.disabled) return;
                if (isExternalNav) onExternalActiveIndexChange?.(index);
                else setInternalActiveIndex(index);
              }}
              onMouseDown={(ev) => {
                if (!opt.disabled) ev.preventDefault();
              }}
              onClick={() => selectOption(opt)}
            >
              {showItemStartIcon && hasSlotContent(opt.icon) ? (
                <span className={styles.startSlot} aria-hidden>
                  {opt.icon}
                </span>
              ) : null}
              <span className={styles.label}>{opt.label}</span>
              {showSelectedCheck ? (
                <span className={styles.endSlot} aria-hidden>
                  {selected ? (
                    <span className={styles.selectionMark}>
                      <Icon name="check-done" size={checkSize} color={iconColor} />
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
});

Listbox.displayName = 'Listbox';
