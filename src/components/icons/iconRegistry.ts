/**
 * Регистр иконок из папки icons (корень проекта).
 * Ленивая загрузка: в bundle попадают только иконки, запрошенные по имени через getIconContent.
 * Имя иконки = имя файла без расширения (kebab-case), например: play, loading, check-done.
 */

export type IconContent = { viewBox: string; content: string };

const DEFAULT_VIEWBOX = '0 0 24 24';

function parseSvg(raw: string): IconContent {
  const viewBoxMatch = raw.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : DEFAULT_VIEWBOX;
  const open = raw.indexOf('>', raw.indexOf('<svg'));
  const close = raw.lastIndexOf('</svg>');
  let content = (open !== -1 && close !== -1)
    ? raw.slice(open + 1, close).trim()
    : '';
  content = content.replace(/\bfill=["']black["']/gi, 'fill="currentColor"');
  return { viewBox, content };
}

function fileNameToName(filePath: string): string {
  const base = filePath.split(/[/\\]/).pop() || '';
  return base.replace(/\.svg$/i, '');
}

const modules = import.meta.glob<string>('../../../icons/*.svg', {
  query: '?raw',
  import: 'default',
});

const nameToPath: Record<string, string> = {};
for (const path of Object.keys(modules)) {
  const name = fileNameToName(path);
  if (!nameToPath[name]) nameToPath[name] = path;
}

export const iconNames = Object.keys(nameToPath).sort();

export async function getIconContent(name: string): Promise<IconContent | null> {
  const path = nameToPath[name] ?? nameToPath[name.toLowerCase()];
  if (!path) return null;
  const loader = modules[path];
  if (typeof loader !== 'function') return null;
  const raw = await loader();
  if (typeof raw !== 'string') return null;
  return parseSvg(raw);
}
