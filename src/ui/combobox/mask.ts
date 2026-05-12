/**
 * Маска ввода: `9` — цифра, `A` — буква (Unicode letters), `*` — любой символ, остальное — литералы.
 */

function takeNext(rawInput: string, start: number, ok: (c: string) => boolean): { ch: string; next: number } | null {
  let i = start;
  while (i < rawInput.length) {
    const c = rawInput[i];
    i += 1;
    if (ok(c)) return { ch: c, next: i };
  }
  return null;
}

/** Форматирует строку по маске, потребляя символы из rawInput слева направо. */
export function formatWithMask(mask: string, rawInput: string): string {
  let out = '';
  let qi = 0;
  for (let mi = 0; mi < mask.length; mi += 1) {
    const mc = mask[mi];
    if (mc === '9') {
      const t = takeNext(rawInput, qi, (c) => /\d/.test(c));
      if (!t) break;
      out += t.ch;
      qi = t.next;
    } else if (mc === 'A') {
      const t = takeNext(rawInput, qi, (c) => /\p{L}/u.test(c));
      if (!t) break;
      out += t.ch;
      qi = t.next;
    } else if (mc === '*') {
      const t = takeNext(rawInput, qi, () => true);
      if (!t) break;
      out += t.ch;
      qi = t.next;
    } else {
      out += mc;
      if (rawInput[qi] === mc) qi += 1;
    }
  }
  return out;
}

/** Применить ограничение длины после маски */
export function clampLength(value: string, maxLength?: number): string {
  if (maxLength == null || maxLength < 0) return value;
  return value.slice(0, maxLength);
}
