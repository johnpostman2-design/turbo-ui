import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import styles from './tabs.module.css';

export type TabsSize = 'small' | 'medium' | 'large';

type TabsContextValue = {
  size: TabsSize;
  baseId: string;
  activeValue: string;
  selectTab: (v: string) => void;
  registerTab: (v: string) => void;
  unregisterTab: (v: string) => void;
  tabValues: string[];
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}

function escapeAttrSelector(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Сегмент для id (value может содержать пробелы/unicode). */
function safeIdSegment(s: string): string {
  return encodeURIComponent(s).replace(/%/g, '_');
}

const sizeClass: Record<TabsSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled: текущее значение активной вкладки. */
  value?: string;
  /** Uncontrolled: начальное значение. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: TabsSize;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  size = 'medium',
  className,
  children,
  ...rest
}: TabsProps) {
  const reactId = useId().replace(/:/g, '');
  const baseId = `turbo-tabs-${reactId}`;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(() => defaultValue ?? '');
  const [tabValues, setTabValues] = useState<string[]>([]);

  const activeValue = isControlled ? String(value ?? '') : internal;

  const registerTab = useCallback((v: string) => {
    setTabValues((prev) => (prev.includes(v) ? prev : [...prev, v]));
  }, []);

  const unregisterTab = useCallback((v: string) => {
    setTabValues((prev) => prev.filter((x) => x !== v));
  }, []);

  const selectTab = useCallback(
    (v: string) => {
      if (isControlled) {
        onValueChange?.(v);
      } else {
        setInternal(v);
        onValueChange?.(v);
      }
    },
    [isControlled, onValueChange]
  );

  useEffect(() => {
    if (isControlled || defaultValue !== undefined) return;
    setInternal((prev) => {
      if (prev !== '') return prev;
      return tabValues[0] ?? '';
    });
  }, [isControlled, defaultValue, tabValues]);

  const ctx = useMemo(
    () => ({
      size,
      baseId,
      activeValue,
      selectTab,
      registerTab,
      unregisterTab,
      tabValues,
    }),
    [size, baseId, activeValue, selectTab, registerTab, unregisterTab, tabValues]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={clsx(styles.root, className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ className, children, onKeyDown, ...rest }, ref) {
    const { tabValues, activeValue } = useTabsContext('TabsList');
    const innerRef = useRef<HTMLDivElement>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const getTabButton = (v: string): HTMLButtonElement | null => {
      return (
        innerRef.current?.querySelector<HTMLButtonElement>(
          `[data-turbo-ui-tab="${escapeAttrSelector(v)}"]`
        ) ?? null
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const order = tabValues.filter((v) => {
        const btn = getTabButton(v);
        return btn && !btn.disabled;
      });
      if (order.length === 0) return;

      const activeEl = document.activeElement;
      let idx = order.findIndex((v) => getTabButton(v) === activeEl);
      if (idx < 0) {
        idx = order.indexOf(activeValue);
      }
      if (idx < 0) idx = 0;

      let nextIdx = idx;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIdx = (idx + 1) % order.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIdx = (idx - 1 + order.length) % order.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = order.length - 1;
      } else {
        return;
      }

      const nextVal = order[nextIdx];
      const btn = getTabButton(nextVal);
      btn?.focus();
    };

    return (
      <div
        ref={setRefs}
        role="tablist"
        className={clsx(styles.list, className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export interface TabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'role'> {
  value: string;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, className, children, id: idProp, onClick, ...rest },
  ref
) {
  const { size, baseId, activeValue, selectTab, registerTab, unregisterTab } =
    useTabsContext('Tab');

  useEffect(() => {
    registerTab(value);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);

  const selected = activeValue === value;
  const idSeg = safeIdSegment(value);
  const tabId = idProp ?? `${baseId}-tab-${idSeg}`;
  const panelId = `${baseId}-panel-${idSeg}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId}
      data-turbo-ui-tab={value}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={clsx(
        styles.tab,
        sizeClass[size],
        selected && styles.tabSelected,
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        if (disabled || e.defaultPrevented) return;
        selectTab(value);
      }}
      {...rest}
    >
      <span className={styles.tabLabel}>{children}</span>
    </button>
  );
});

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  function TabsPanel({ value, className, children, ...rest }, ref) {
    const { baseId, activeValue } = useTabsContext('TabsPanel');
    const idSeg = safeIdSegment(value);
    const tabId = `${baseId}-tab-${idSeg}`;
    const panelId = `${baseId}-panel-${idSeg}`;
    const hidden = activeValue !== value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        hidden={hidden}
        className={clsx(styles.panel, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
