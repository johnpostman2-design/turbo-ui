import React from 'react';

/** Безопасная подсветка подстроки запроса в label (без HTML из query).
 * Совпадение оборачивается в `markClassName` (content-primary),
 * не-совпавшие части — в `dimClassName` (content-secondary).
 */
export function highlightMatchParts(
  label: string,
  query: string,
  markClassName: string,
  dimClassName?: string
): React.ReactNode {
  const q = query.trim();
  if (!q) return label;
  try {
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${esc})`, 'gi');
    const parts = label.split(re);
    return parts.map((part, i) => {
      if (part === '') return null;
      const isMatch = i % 2 === 1;
      const cls = isMatch ? markClassName : dimClassName;
      const key = `${i}-${part.slice(0, 8)}`;
      return cls ? (
        <span key={key} className={cls}>
          {part}
        </span>
      ) : (
        <React.Fragment key={key}>{part}</React.Fragment>
      );
    });
  } catch {
    return label;
  }
}
