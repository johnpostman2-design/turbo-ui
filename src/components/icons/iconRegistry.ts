/**
 * Регистр иконок из папки icons (корень проекта).
 * Имя иконки — первая часть имени файла до запятой или точка: plus, chart, check, kebab и т.д.
 */

function getViewBox(svg: string): string {
  const m = svg.match(/viewBox=["']([^"']+)["']/);
  return m ? m[1] : '0 0 24 24';
}

function getInnerContent(svg: string): string {
  const open = svg.indexOf('>', svg.indexOf('<svg'));
  const close = svg.lastIndexOf('</svg>');
  if (open === -1 || close === -1) return '';
  let inner = svg.slice(open + 1, close).trim();
  inner = inner.replace(/\bfill="black"/gi, 'fill="currentColor"');
  inner = inner.replace(/\bfill='black'/gi, "fill='currentColor'");
  return inner;
}

function fileNameToName(filePath: string): string {
  const base = filePath.split(/[/\\]/).pop() || '';
  const noExt = base.replace(/\.svg$/i, '');
  const first = noExt.split(',')[0].trim();
  return first || noExt || 'icon';
}

type IconContent = { viewBox: string; content: string };

const cache: Record<string, IconContent> = {};

const modules = import.meta.glob<string>('../../../icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

for (const [path, raw] of Object.entries(modules)) {
  const name = fileNameToName(path);
  if (typeof raw === 'string') {
    cache[name] = {
      viewBox: getViewBox(raw),
      content: getInnerContent(raw),
    };
  }
}

export const iconNames = Object.keys(cache).sort();

export function getIconContent(name: string): IconContent | null {
  const key = name.toLowerCase();
  return cache[key] ?? cache[name] ?? null;
}
