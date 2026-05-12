import React, { useState } from 'react';
import { Icon, iconNames } from './index';
import { Button } from '../../ui/button/Button';
import { ExampleBlock } from '../ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=558-1439';
const githubUrl =
  'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/components/icons';
/** Сторис со всеми иконками: тот же хост, путь от корня Storybook. */
const storybookAllFromRegistryHref = '/?path=/story/components-icons--all-from-registry';

const codeBadge = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: '4px',
} as const;

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    {
      name: 'name',
      type: 'string',
      description:
        'Файл в папке icons без .svg: plus, check-done. Нет в реестре — пустой SVG, сверяйтесь с iconNames.',
      default: '—',
    },
    {
      name: 'size',
      type: 'number | "100%"',
      description: 'Сторона в px или 100% — растянуть по контейнеру.',
      default: '24',
    },
    {
      name: 'color',
      type: 'string',
      description: 'Попадает в SVG как currentColor; удобнее токены вроде var(--content-primary).',
      default: 'currentColor',
    },
    {
      name: 'state',
      type: '"default" | "disabled"',
      description: 'Только вид: disabled не отключает клики сам по себе.',
      default: '"default"',
    },
    {
      name: 'viewBox',
      type: 'string',
      description: 'Нужен, если рисуете через children без name.',
      default: '"0 0 24 24"',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Свой SVG внутри тега, если без name.',
      default: '—',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Текст для скринридера; тогда на корне role="img".',
      default: '—',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Ещё класс на обёртку span.',
      default: '—',
    },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          background: '#f5f5f5',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '0.875rem',
          color: 'var(--foreground)',
          marginBottom: isExpanded ? '1rem' : '0',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronDown
          size={16}
          style={{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform 0.2s ease',
          }}
        />
        <span>
          {isExpanded ? 'Скрыть список пропсов' : 'Показать список пропсов'}
        </span>
      </button>
      {isExpanded && (
        <div style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
            <thead>
              <tr style={{ background: '#ffffff' }}>
                <th
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--family-brand)',
                    fontSize: '0.875rem',
                    color: '#999',
                    border: 'none',
                  }}
                >
                  Имя
                </th>
                <th
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--family-brand)',
                    fontSize: '0.875rem',
                    color: '#999',
                    border: 'none',
                  }}
                >
                  Описание
                </th>
                <th
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--family-brand)',
                    fontSize: '0.875rem',
                    color: '#999',
                    width: '22.5%',
                    border: 'none',
                  }}
                >
                  По умолчанию
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr
                  key={prop.name}
                  style={{
                    background: '#ffffff',
                    borderBottom:
                      index < props.length - 1 ? '1px solid #b0b0b0' : 'none',
                  }}
                >
                  <td
                    style={{
                      padding: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: 'var(--foreground)',
                      verticalAlign: 'top',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  >
                    {prop.name}
                  </td>
                  <td
                    style={{
                      padding: '1rem',
                      verticalAlign: 'top',
                      fontFamily: 'var(--family-brand)',
                      fontSize: '0.875rem',
                      color: '#000000',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  >
                    {prop.description}
                  </td>
                  <td
                    style={{
                      padding: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: 'var(--muted-foreground)',
                      verticalAlign: 'top',
                      width: '22.5%',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  >
                    {prop.default}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export function IconsDocsPage() {
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const pIntro = {
    marginBottom: '2rem',
    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
    fontSize: 'var(--text-base, 15px)',
    lineHeight: '1.5',
    color: '#000000',
  } as const;

  const pSection = {
    marginBottom: '1rem',
    marginTop: 0,
    fontFamily: 'var(--family-brand)',
    fontSize: 'var(--text-base, 15px)',
    lineHeight: '1.5',
    color: '#000000',
  } as const;

  return (
    <>
      <style>
        {`
          .icons-docs-inline-link {
            color: inherit;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
            text-decoration: underline;
            text-underline-offset: 0.12em;
          }
          .icons-docs-inline-link:hover {
            text-decoration: none;
          }
          .icons-docs-inline-link:visited {
            color: inherit;
          }
        `}
      </style>
      <div
        style={{
          display: 'flex',
          gap: '80px',
          maxWidth: '1400px',
          margin: '0 auto',
          paddingLeft: '2rem',
          paddingRight: 'calc(240px + 80px + 20px)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
          <h1 id="icons-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Icons
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              alignItems: 'center',
            }}
          >
            <Button
              variant="backless"
              startIcon={null}
              endIcon={null}
              onClick={() => window.open(figmaUrl, '_blank', 'noopener,noreferrer')}
            >
              Figma
            </Button>
            <Button
              variant="backless"
              startIcon={null}
              endIcon={null}
              onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
            >
              GitHub
            </Button>
          </div>

          <p style={pIntro}>
            Передаёте <code style={codeBadge}>name</code> — на экране SVG из папки{' '}
            <code style={codeBadge}>icons/</code>. Расширение в коде не пишете. Цвет задаёте в{' '}
            <code style={codeBadge}>color</code>: обычно токен темы, он идёт в{' '}
            <code style={codeBadge}>currentColor</code> внутри иконки. Файл подтягивается асинхронно: на первый кадр
            место под иконку может быть пустым.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="setup"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Подключение
            </h2>
            <p style={pSection}>
              <code style={codeBadge}>Icon</code> в собранный npm-пакет не входит: берите импорт из{' '}
              <code style={codeBadge}>src/components/icons</code> внутри репозитория. Путь в импорте поправьте под свой файл.
            </p>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem',
              }}
            >
              <SyntaxHighlighter
                language="tsx"
                style={oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  borderRadius: 0,
                  background: '#f5f5f5',
                }}
                codeTagProps={{ style: { fontFamily: 'monospace' } }}
                PreTag="div"
                useInlineStyles={true}
              >
                {`import { Icon, iconNames } from '../components/icons';

<Icon name="plus" size={24} color="var(--content-primary)" />`}
              </SyntaxHighlighter>
            </div>
            <p style={{ ...pSection, marginBottom: '1rem' }}>
              Все имена лежат в <code style={codeBadge}>iconNames</code>, по алфавиту — удобно для автодополнения.
            </p>
            <ExampleBlock code={`<Icon name="check-done" size={32} color="var(--content-success)" />`}>
              <div
                data-no-sbdocs-typography=""
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                <Icon name="check-done" size={32} color="var(--content-success)" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="all-props"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Пропсы
            </h2>
            <p style={pSection}>
              На корневой <code style={codeBadge}>span</code> лишние HTML-атрибуты не пробрасываем. Есть таблица
              ниже и <code style={codeBadge}>className</code>.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="registry"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Реестр
            </h2>
            <p style={{ ...pSection, marginBottom: '1rem' }}>
              Положили новый <code style={codeBadge}>.svg</code> в <code style={codeBadge}>icons/</code>, пути с{' '}
              <code style={codeBadge}>currentColor</code> — перезапустите dev. Имя файла без расширения появится в{' '}
              <code style={codeBadge}>iconNames</code>. Опечатка в <code style={codeBadge}>name</code> или имя не из
              реестра — на экране пустой квадрат: сверьтесь с <code style={codeBadge}>iconNames</code> или вкладкой
              AllFromRegistry.
            </p>
            <p style={{ ...pSection, marginBottom: '1rem' }}>
              В реестре сейчас <code style={codeBadge}>{iconNames.length}</code> имён. Все плиткой — во вкладке{' '}
              <a
                className="icons-docs-inline-link"
                href={storybookAllFromRegistryHref}
                target="_top"
                rel="noopener noreferrer"
              >
                AllFromRegistry
              </a>
              .
            </p>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '1rem',
              }}
            >
              <SyntaxHighlighter
                language="tsx"
                style={oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  borderRadius: 0,
                  background: '#f5f5f5',
                }}
                codeTagProps={{ style: { fontFamily: 'monospace' } }}
                PreTag="div"
                useInlineStyles={true}
              >
                {`import { iconNames } from '../components/icons';
// ${iconNames.length} иконок: ${iconNames.slice(0, 5).join(', ')}…`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="visuals"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Размер, цвет, состояние
            </h2>
            <p style={{ ...pSection, marginBottom: '1rem' }}>
              <code style={codeBadge}>size</code> — сторона квадрата в пикселях. <code style={codeBadge}>color</code> —
              любой валидный CSS. <code style={codeBadge}>state=&quot;disabled&quot;</code> только бледнее рисует;
              клик отключайте у родителя, например у <code style={codeBadge}>button disabled</code>.
            </p>
            <ExampleBlock
              code={`<Icon name="plus" size={16} color="var(--content-primary)" />
<Icon name="plus" size={32} state="disabled" />`}
            >
              <div
                data-no-sbdocs-typography=""
                style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
              >
                <Icon name="plus" size={16} color="var(--content-primary)" />
                <Icon name="plus" size={32} color="var(--content-primary)" />
                <Icon name="plus" size={32} state="disabled" color="var(--content-primary)" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="icons-docs-menu"
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '240px',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          lineHeight: '1.5',
          color: '#000000',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {(
            [
              ['setup', 'Подключение'],
              ['all-props', 'Пропсы'],
              ['registry', 'Реестр'],
              ['visuals', 'Размер, цвет, состояние'],
            ] as const
          ).map(([id, label]) => (
            <li key={id} style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleMenuClick(e, id)}
                style={{
                  color: '#000000',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
