import React, { useState } from 'react';
import { Toggle } from './Toggle';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=928-882';
const githubUrl =
  'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/toggle';

const codeBadge = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: '4px',
} as const;

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    {
      name: 'size',
      type: '"small" | "medium" | "large"',
      description: 'Размер трека/knob и типографики подписи.',
      default: '"medium"',
    },
    {
      name: 'checked',
      type: 'boolean',
      description: 'Controlled-значение; в паре с onChange.',
      default: '—',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      description: 'Uncontrolled-начальное значение.',
      default: 'false',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Блокирует клик и Space; цвета приглушаются.',
      default: 'false',
    },
    {
      name: 'onChange',
      type: '(event) => void',
      description: 'Нативное событие input. Не вызывается в disabled.',
      default: '—',
    },
    {
      name: 'startText',
      type: 'ReactNode',
      description: 'Подпись слева. Клик по ней переключает значение.',
      default: '—',
    },
    {
      name: 'endText',
      type: 'ReactNode',
      description: 'Подпись справа. Клик по ней переключает значение.',
      default: '—',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Нативный атрибут input для form submit.',
      default: '—',
    },
    {
      name: 'value',
      type: 'string',
      description: 'Нативный атрибут input — значение в FormData при checked=true.',
      default: '"on"',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Класс на корневой <label>.',
      default: '—',
    },
    {
      name: 'ref',
      type: 'Ref<HTMLInputElement>',
      description: 'На нативный <input type="checkbox" role="switch">.',
      default: '—',
    },
    {
      name: '…rest',
      type: '<input> attrs',
      description: 'id, aria-*, data-*, autoFocus, tabIndex, form, required — на <input>.',
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
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  >
                    <p
                      style={{
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--family-brand)',
                        fontSize: 'var(--text-base)',
                        lineHeight: '1.5',
                        color: 'var(--foreground)',
                      }}
                    >
                      {prop.description}
                    </p>
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}
                    >
                      {prop.type.split(' | ').map((t, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'inline-block',
                            padding: '0.125rem 0.5rem',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            color: 'var(--foreground)',
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
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

export function ToggleDocsPage() {
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

  return (
    <>
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
          <h1 id="toggle-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Toggle
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

          <p
            style={{
              marginBottom: '2rem',
              fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
              fontSize: 'var(--text-base, 15px)',
              lineHeight: '1.5',
              color: '#000000',
            }}
          >
            Переключатель вкл/выкл. Поведение и события — нативного чекбокса.
          </p>

          {/* Подключение */}
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
              Подключение в проекте
            </h2>
            <p
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              Импорт по подпути — для tree-shaking.
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
{`import 'turbo-ui/styles/theme';
import { Toggle } from 'turbo-ui/toggle';

<Toggle defaultChecked startText="Уведомления" />`}
              </SyntaxHighlighter>
            </div>
            <p
              style={{
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              Контракт: <code style={codeBadge}>specs/013-toggle/contracts/toggle.md</code>.
            </p>
          </div>

          {/* Пропсы */}
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
            <p
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              <code style={codeBadge}>ref</code> — на нативный <code style={codeBadge}>&lt;input&gt;</code>. <code style={codeBadge}>name</code>, <code style={codeBadge}>value</code>, <code style={codeBadge}>aria-*</code>, <code style={codeBadge}>data-*</code> и прочие input-атрибуты пробрасываются.
            </p>
            <CollapsiblePropsList />
          </div>

          {/* Размеры */}
          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="sizes"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Размеры
            </h2>
            <ul
              style={{
                marginBottom: '1.5rem',
                marginTop: 0,
                paddingLeft: '1.5rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>small</code> — компактный
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>medium</code> — базовый по умолчанию
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>large</code> — крупный
              </li>
            </ul>
            <ExampleBlock
              code={`<Toggle size="small" startText="Small" />
<Toggle size="medium" startText="Medium" />
<Toggle size="large" startText="Large" />`}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Toggle size="small" startText="Small" />
                <Toggle size="medium" startText="Medium" />
                <Toggle size="large" startText="Large" />
              </div>
            </ExampleBlock>
          </div>

          {/* Состояния */}
          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="states"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Состояния
            </h2>
            <ul
              style={{
                marginBottom: '1.5rem',
                marginTop: 0,
                paddingLeft: '1.5rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>off</code> — серый трек, knob слева
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>on</code> — чёрный трек, knob справа
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>disabled</code> — трек и подпись приглушены, клики игнорируются; knob остаётся белым
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code style={codeBadge}>focus-visible</code> — рамка вокруг трека при Tab-навигации
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                Hover не используется
              </li>
            </ul>
            <ExampleBlock
              code={`<Toggle startText="Off" />
<Toggle defaultChecked startText="On" />
<Toggle disabled startText="Disabled off" />
<Toggle disabled defaultChecked startText="Disabled on" />`}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Toggle startText="Off" />
                <Toggle defaultChecked startText="On" />
                <Toggle disabled startText="Disabled off" />
                <Toggle disabled defaultChecked startText="Disabled on" />
              </div>
            </ExampleBlock>
          </div>

          {/* Подпись */}
          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="label"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Подпись
            </h2>
            <p
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              <code style={codeBadge}>startText</code> и <code style={codeBadge}>endText</code> независимы — задайте один, оба или ни одного. Клик по тексту переключает значение.
            </p>
            <ExampleBlock
              code={`<Toggle startText="Уведомления" />
<Toggle endText="Тёмная тема" />
<Toggle startText="Off" endText="On" />
<Toggle aria-label="Без подписи" />`}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Toggle startText="Уведомления" />
                <Toggle endText="Тёмная тема" />
                <Toggle startText="Off" endText="On" />
                <Toggle aria-label="Без подписи" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="toggle-docs-menu"
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
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#setup"
              onClick={(e) => handleMenuClick(e, 'setup')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Подключение в проекте
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#all-props"
              onClick={(e) => handleMenuClick(e, 'all-props')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Пропсы
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#sizes"
              onClick={(e) => handleMenuClick(e, 'sizes')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Размеры
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#states"
              onClick={(e) => handleMenuClick(e, 'states')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Состояния
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#label"
              onClick={(e) => handleMenuClick(e, 'label')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Подпись
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
