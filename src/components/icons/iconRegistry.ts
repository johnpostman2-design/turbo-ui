/**
 * Регистр иконок из папки icons (корень проекта).
 * Ленивая загрузка: в bundle попадают только запрошенные по имени иконки.
 * Имя иконки — первая часть имени файла до запятой: plus, chart, check, kebab и т.д.
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

export type IconContent = { viewBox: string; content: string };

const modules = import.meta.glob<string>('../../../icons/*.svg', {
  query: '?raw',
  import: 'default',
});

const nameToPath: Record<string, string> = {};
for (const path of Object.keys(modules)) {
  const name = fileNameToName(path).toLowerCase();
  if (!nameToPath[name]) nameToPath[name] = path;
}
export const iconNames = Object.keys(nameToPath).sort();

export async function getIconContent(name: string): Promise<IconContent | null> {
  const key = name.toLowerCase();
  const path = nameToPath[key] ?? nameToPath[name];
  if (!path) return null;
  const loader = modules[path];
  if (typeof loader !== 'function') return null;
  const raw = await loader();
  if (typeof raw !== 'string') return null;
  return {
    viewBox: getViewBox(raw),
    content: getInnerContent(raw),
  };
}
