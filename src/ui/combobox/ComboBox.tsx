import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { autoUpdate, FloatingPortal, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { clsx } from 'clsx';
import { Icon } from '../../components/icons/Icon';
import { IconButton } from '../icon-button/IconButton';
import { Input } from '../input/Input';
import { Listbox, type ListboxOption } from '../listbox/Listbox';
import { createMenuFloatingMiddleware } from '../select/menuFloatingMiddleware';
import { toPlacementList, type SelectPosition } from '../select/selectPlacement';
import tokensJson from '../../tokens/tokens.json';
import styles from './combobox.module.css';
import { highlightMatchParts } from './highlightMatch';
import { clampLength, formatWithMask } from './mask';

const SPACES = (tokensJson as { spaces: Record<string, string> }).spaces;
const MENU_GAP_PX = Number.parseInt(SPACES['4'], 10) || 4;
const SHIFT_PAD_PX = Number.parseInt(SPACES['8'], 10) || 8;

export type ComboBoxSize = 'small' | 'medium' | 'large';

export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  id?: string;
}

export type ComboBoxPosition = SelectPosition;

export interface ComboBoxRenderContext {
  query: string;
  selected: boolean;
  highlighted: boolean;
  highlightMatch: (label: string, query: string) => React.ReactNode;
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
}

function defaultFilterItem(query: string, opt: ComboBoxOption): boolean {
  if (!query.trim()) return true;
  return opt.label.toLowerCase().includes(query.trim().toLowerCase());
}

function findEnabledIndex(opts: ComboBoxOption[], from: number, dir: 1 | -1): number {
  const n = opts.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step += 1) {
    i = (i + dir + n) % n;
    if (!opts[i]?.disabled) return i;
  }
  return -1;
}

export interface ComboBoxProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange' | 'children' | 'onSelect'
> {
  options: ComboBoxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (next: string) => void;
  onSelect?: (option: ComboBoxOption) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Визуал ошибки; при одновременном `disabled` приоритет у блокировки */
  error?: boolean;
  size?: ComboBoxSize;
  width?: React.CSSProperties['width'];
  maxWidth?: React.CSSProperties['maxWidth'];
  /** Многострочное поле: высота поля автоматически подстраивается под количество строк. */
  multiline?: boolean;
  /** Поле без обводки: рамка скрыта, остаётся только текст и chevron справа. */
  borderless?: boolean;
  startIcon?: React.ReactNode;
  maxLength?: number;
  mask?: string;
  clearable?: boolean;
  onClear?: () => void;
  positions?: ComboBoxPosition | ComboBoxPosition[];
  menuOffset?: number;
  menuWidth?: React.CSSProperties['width'];
  menuMaxWidth?: React.CSSProperties['maxWidth'];
  menuMaxHeight?: React.CSSProperties['maxHeight'];
  filterItem?: (query: string, option: ComboBoxOption) => boolean;
  highlightMatch?: boolean;
  renderOption?: (option: ComboBoxOption, ctx: ComboBoxRenderContext) => React.ReactNode;
  emptyState?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (next: boolean) => void;
  name?: string;
  form?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export const ComboBox = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, ComboBoxProps>(
  function ComboBox(props, ref) {
    const {
      options,
      value: valueProp,
      defaultValue = '',
      onChange,
      onSelect,
      placeholder,
      disabled = false,
      error = false,
      size = 'medium',
      width,
      maxWidth,
      multiline = false,
      borderless = false,
      startIcon,
      maxLength,
      mask,
      clearable = true,
      onClear,
      positions,
      menuOffset = 0,
      menuWidth,
      menuMaxWidth,
      menuMaxHeight,
      filterItem,
      highlightMatch: highlightMatchProp = false,
      renderOption,
      emptyState,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      form,
      required,
      autoComplete,
      inputMode,
      className,
      style,
      id: idProp,
      'aria-describedby': ariaDescribedBy,
      ...rest
    } = props;

    const reactId = useId().replace(/:/g, '');
    const listboxId = `turbo-combobox-listbox-${reactId}`;
    const rootId = idProp ?? `turbo-combobox-${reactId}`;

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const mergedFieldRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        assignRef(ref, node);
      },
      [ref]
    );

    const isValueControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = isValueControlled ? (valueProp ?? '') : internalValue;

    const isOpenControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isOpenControlled ? Boolean(openProp) : internalOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange]
    );

    const canOpen = !disabled && options.length > 0;

    const filterFn = filterItem ?? defaultFilterItem;
    const filteredOptions = useMemo(() => options.filter((o) => filterFn(value, o)), [options, value, filterFn]);

    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
      if (!canOpen && isOpen) setOpen(false);
    }, [canOpen, isOpen, setOpen]);

    useLayoutEffect(() => {
      const n = filteredOptions.length;
      if (n === 0) {
        setActiveIdx(-1);
        return;
      }
      const sel = filteredOptions.findIndex((o) => o.label === value);
      if (sel >= 0) setActiveIdx(sel);
      else setActiveIdx(findEnabledIndex(filteredOptions, -1, 1));
    }, [filteredOptions, value]);

    useEffect(() => {
      if (activeIdx >= filteredOptions.length) {
        setActiveIdx(findEnabledIndex(filteredOptions, -1, 1));
      }
    }, [filteredOptions, activeIdx]);

    const placementList = useMemo(() => toPlacementList(positions), [positions]);
    const primaryPlacement = placementList[0] ?? 'bottom-start';
    const fallbackPlacements = placementList.slice(1);

    const panelOpen = isOpen && canOpen;

    const { refs, floatingStyles, context } = useFloating({
      open: panelOpen,
      onOpenChange: (o) => {
        if (disabled) return;
        setOpen(o);
      },
      placement: primaryPlacement,
      middleware: createMenuFloatingMiddleware({
        mainGapPx: MENU_GAP_PX,
        shiftPaddingPx: SHIFT_PAD_PX,
        menuOffset,
        fallbackPlacements,
        menuWidth: menuWidth as string | undefined,
      }),
      whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);
    const { getFloatingProps } = useInteractions([dismiss]);

    const commitValue = useCallback(
      (nextRaw: string) => {
        let next = nextRaw;
        if (mask) next = formatWithMask(mask, next);
        next = clampLength(next, maxLength);
        if (!isValueControlled) setInternalValue(next);
        onChange?.(next);
      },
      [mask, maxLength, isValueControlled, onChange]
    );

    const pickOption = useCallback(
      (opt: ComboBoxOption) => {
        if (opt.disabled) return;
        let next = opt.label;
        if (mask) next = formatWithMask(mask, opt.label);
        next = clampLength(next, maxLength);
        if (!isValueControlled) setInternalValue(next);
        onChange?.(next);
        onSelect?.(opt);
        setOpen(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      },
      [mask, maxLength, isValueControlled, onChange, onSelect, setOpen]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        onClear?.();
        commitValue('');
        if (canOpen) setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      },
      [onClear, commitValue, canOpen, setOpen]
    );

    const mergedRefAnchor = useCallback(
      (node: HTMLDivElement | null) => {
        refs.setReference(node);
      },
      [refs]
    );

    const highlightFn = useCallback(
      (label: string, query: string) => highlightMatchParts(label, query, styles.mark, styles.dim),
      []
    );

    const listboxOptions: ListboxOption[] = useMemo(() => {
      return filteredOptions.map((opt, index) => {
        const ctx: ComboBoxRenderContext = {
          query: value,
          selected: opt.label === value,
          highlighted: index === activeIdx,
          highlightMatch: highlightFn,
        };
        let labelNode: React.ReactNode = opt.label;
        if (renderOption) {
          labelNode = renderOption(opt, ctx);
        } else if (highlightMatchProp) {
          labelNode = highlightMatchParts(opt.label, value, styles.mark, styles.dim);
        }
        return {
          value: opt.label,
          label: labelNode,
          disabled: opt.disabled,
          icon: opt.icon,
          id: opt.id ?? `${listboxId}-opt-${opt.value}`,
        };
      });
    }, [filteredOptions, value, activeIdx, renderOption, highlightMatchProp, highlightFn, listboxId]);

    const activeDescendantId =
      panelOpen && activeIdx >= 0 && filteredOptions[activeIdx] && !filteredOptions[activeIdx]?.disabled
        ? filteredOptions[activeIdx]?.id ?? `${listboxId}-opt-${filteredOptions[activeIdx]!.value}`
        : undefined;

    const showClear = Boolean(clearable && value !== '' && !disabled);

    const clearBtnSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';

    const startIconSizeClass =
      size === 'small'
        ? styles.startIconSlotSmall
        : size === 'large'
        ? styles.startIconSlotLarge
        : styles.startIconSlotMedium;

    const chevronSizeClass =
      size === 'small'
        ? styles.chevronSmall
        : size === 'large'
        ? styles.chevronLarge
        : styles.chevronMedium;

    const wrappedStartIcon = startIcon ? (
      <span className={clsx(styles.startIconSlot, startIconSizeClass)} aria-hidden>
        {startIcon}
      </span>
    ) : undefined;

    const toggleOpen = useCallback(() => {
      if (disabled) return;
      const next = !panelOpen;
      setOpen(next);
      requestAnimationFrame(() => inputRef.current?.focus());
    }, [disabled, panelOpen, setOpen]);

    const chevronNode = (
      <button
        type="button"
        tabIndex={-1}
        aria-label={panelOpen ? 'Скрыть список' : 'Показать список'}
        className={clsx(styles.chevron, chevronSizeClass, panelOpen && styles.chevronOpen)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggleOpen}
        disabled={disabled}
      >
        <Icon name="carrot-down" size="100%" />
      </button>
    );

    const endAdornmentNode = (
      <span className={styles.endSlot}>
        {showClear ? (
          <IconButton
            type="button"
            variant="primary"
            size={clearBtnSize}
            aria-label="Очистить поле"
            icon={<Icon name="cross-delete" size="100%" />}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            disabled={disabled}
          />
        ) : (
          chevronNode
        )}
      </span>
    );

    const inputCommon = {
      id: rootId,
      name,
      form,
      required,
      disabled,
      value,
      placeholder,
      autoComplete,
      inputMode,
      maxLength: mask ? undefined : maxLength,
      'aria-invalid': error && !disabled ? true : undefined,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': panelOpen,
      'aria-controls': listboxId,
      'aria-autocomplete': 'list' as const,
      'aria-activedescendant': activeDescendantId,
      role: 'combobox' as const,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const raw = e.target.value;
        commitValue(raw);
        if (canOpen) setOpen(true);
      },
      onFocus: () => {
        if (canOpen) setOpen(true);
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (disabled) return;
        if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!panelOpen && canOpen) setOpen(true);
          setActiveIdx((i) => findEnabledIndex(filteredOptions, i < 0 ? -1 : i, 1));
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!panelOpen && canOpen) setOpen(true);
          const n = filteredOptions.length;
          setActiveIdx((i) => findEnabledIndex(filteredOptions, i < 0 ? n : i, -1));
          return;
        }
        if (e.key === 'Enter') {
          if (multiline && e.shiftKey) return;
          if (panelOpen && activeIdx >= 0 && filteredOptions[activeIdx]) {
            e.preventDefault();
            pickOption(filteredOptions[activeIdx]!);
          }
          return;
        }
      },
    };

    const rootStyle = useMemo(() => {
      const s: React.CSSProperties = { ...style };
      if (width !== undefined) s.width = width;
      if (maxWidth !== undefined) s.maxWidth = maxWidth;
      return Object.keys(s).length ? s : undefined;
    }, [style, width, maxWidth]);

    const menuInnerStyle = useMemo(() => {
      const s: React.CSSProperties = {};
      if (menuWidth) s.width = menuWidth as string;
      if (menuMaxWidth) s.maxWidth = menuMaxWidth as string;
      return Object.keys(s).length ? s : undefined;
    }, [menuWidth, menuMaxWidth]);

    const listMax =
      menuMaxHeight ??
      ('var(--listbox-default-menu-max-height)' as React.CSSProperties['maxHeight']);

    const errorShown = Boolean(error && !disabled);

    const field = (
      <Input
        {...inputCommon}
        ref={mergedFieldRef}
        size={size}
        type="text"
        multiline={multiline}
        error={errorShown}
        borderless={borderless}
        leftIcon={wrappedStartIcon}
        endAdornment={endAdornmentNode}
        className={styles.field}
      />
    );

    return (
      <div {...rest} id={undefined} className={clsx(styles.root, className)} style={rootStyle}>
        <div ref={mergedRefAnchor} className={clsx(styles.anchor, styles.reference)}>
          {field}
        </div>
        {panelOpen ? (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              className={styles.menu}
              style={{
                ...floatingStyles,
                zIndex: 'var(--combobox-menu-z-index)',
              }}
              {...getFloatingProps()}
            >
              <div className={styles.menuInner} style={menuInnerStyle}>
                <Listbox
                  id={listboxId}
                  options={listboxOptions}
                  value={value}
                  onChange={(v) => {
                    const opt = filteredOptions.find((o) => o.label === v);
                    if (opt) pickOption(opt);
                  }}
                  showSelectedCheck={false}
                  showItemStartIcon
                  size={size}
                  maxHeight={listMax as string}
                  search={false}
                  listNavigation="external"
                  externalActiveIndex={Math.max(activeIdx, 0)}
                  onExternalActiveIndexChange={setActiveIdx}
                  emptyState={emptyState ?? 'Нет совпадений'}
                />
              </div>
            </div>
          </FloatingPortal>
        ) : null}
      </div>
    );
  }
);

ComboBox.displayName = 'ComboBox';
