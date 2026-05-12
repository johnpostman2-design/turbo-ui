import React, { useState } from 'react';
import { Tabs, TabsList, Tab, TabsPanel } from './Tabs';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=946-19';
const githubUrl =
  'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/tabs';

const codeBadge = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: '4px',
} as const;

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    {
      name: 'Tabs value',
      type: 'string',
      description: 'Controlled: строка активной вкладки (совпадает с Tab.value).',
      default: '—',
    },
    {
      name: 'Tabs defaultValue',
      type: 'string',
      description: 'Uncontrolled: стартовая вкладка; без пропа — первая в DOM.',
      default: '—',
    },
    {
      name: 'Tabs onValueChange',
      type: '(v: string) => void',
      description: 'Смена вкладки (клик по enabled Tab).',
      default: '—',
    },
    {
      name: 'Tabs size',
      type: '"small" | … | "large"',
      description:
        'Только типографика подписи вкладки (токены typescale); отступы вкладки не меняются.',
      default: 'средняя градация',
    },
    {
      name: 'Tab value',
      type: 'string',
      description: 'Ключ вкладки; уникален внутри одной группы Tabs.',
      default: '—',
    },
    {
      name: 'Tab disabled',
      type: 'boolean',
      description: 'Не выбирается, не в фокус-цепочке стрелок.',
      default: 'false',
    },
    {
      name: 'TabsPanel value',
      type: 'string',
      description: 'Тот же ключ, что у Tab; панель видна только при совпадении.',
      default: '—',
    },
    {
      name: 'className, ref, …',
      type: '—',
      description: 'На корень каждого куска; служебные ARIA/role Tab выставляет сам.',
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

export function TabsDocsPage() {
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
          <h1 id="tabs-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Tabs
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
            Табы группируют контент и помогают в навигации.
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
              Из корня пакета; для tree-shaking можно <code style={codeBadge}>turbo-ui/tabs</code>.
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
import { Tabs, TabsList, Tab, TabsPanel } from 'turbo-ui';

<Tabs defaultValue="a">
  <TabsList>
    <Tab value="a">Раздел A</Tab>
    <Tab value="b">Раздел B</Tab>
  </TabsList>
  <TabsPanel value="a">Контент A</TabsPanel>
  <TabsPanel value="b">Контент B</TabsPanel>
</Tabs>`}
              </SyntaxHighlighter>
            </div>
            <p style={{ ...pSection, marginBottom: 0 }}>
              Полный контракт: <code style={codeBadge}>specs/014-tabs/contracts/tabs.md</code>.
            </p>
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
              Лишнее на <code style={codeBadge}>Tab</code> / <code style={codeBadge}>TabsPanel</code> уходит
              на нативный DOM; роли и <code style={codeBadge}>aria-*</code> для вкладок не переопределяйте.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="composition"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Состав
            </h2>
            <p style={{ ...pSection, marginBottom: '1rem' }}>
              Один <code style={codeBadge}>Tabs</code>: внутри сначала <code style={codeBadge}>TabsList</code> с{' '}
              <code style={codeBadge}>Tab</code>, затем <code style={codeBadge}>TabsPanel</code> в любом
              порядке; пары <code style={codeBadge}>value</code> должны совпадать.
            </p>
            <ExampleBlock
              code={`<Tabs defaultValue="1">
  <TabsList>
    <Tab value="1">Вкладка 1</Tab>
    <Tab value="2">Вкладка 2</Tab>
  </TabsList>
  <TabsPanel value="1">Контент в первой вкладке</TabsPanel>
  <TabsPanel value="2">Контент во второй вкладке</TabsPanel>
</Tabs>`}
            >
              <Tabs defaultValue="1">
                <TabsList>
                  <Tab value="1">Вкладка 1</Tab>
                  <Tab value="2">Вкладка 2</Tab>
                </TabsList>
                <TabsPanel value="1">Контент в первой вкладке</TabsPanel>
                <TabsPanel value="2">Контент во второй вкладке</TabsPanel>
              </Tabs>
            </ExampleBlock>
          </div>

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
            <p style={{ ...pSection, marginBottom: '1.5rem' }}>
              Проп <code style={codeBadge}>size</code> задаёт размер табов в группе.
            </p>
            <ExampleBlock
              code={`// small | large | без size (базовая градация)
<Tabs size="small" defaultValue="s1">…</Tabs>`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Tabs size="small" defaultValue="s1">
                  <TabsList>
                    <Tab value="s1">Small 1</Tab>
                    <Tab value="s2">Small 2</Tab>
                  </TabsList>
                  <TabsPanel value="s1">Контент в первой вкладке</TabsPanel>
                  <TabsPanel value="s2">Контент во второй вкладке</TabsPanel>
                </Tabs>
                <Tabs defaultValue="d1">
                  <TabsList>
                    <Tab value="d1">Базовый 1</Tab>
                    <Tab value="d2">Базовый 2</Tab>
                  </TabsList>
                  <TabsPanel value="d1">Контент в первой вкладке</TabsPanel>
                  <TabsPanel value="d2">Контент во второй вкладке</TabsPanel>
                </Tabs>
                <Tabs size="large" defaultValue="l1">
                  <TabsList>
                    <Tab value="l1">Large 1</Tab>
                    <Tab value="l2">Large 2</Tab>
                  </TabsList>
                  <TabsPanel value="l1">Контент в первой вкладке</TabsPanel>
                  <TabsPanel value="l2">Контент во второй вкладке</TabsPanel>
                </Tabs>
              </div>
            </ExampleBlock>
          </div>

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
              <li>Default — таб не выбран.</li>
              <li>Hover — состояние таба при наведении курсора.</li>
              <li>Active — таб выбран.</li>
              <li>
                Disabled — проп <code style={codeBadge}>disabled</code> блокирует таб, делая его
                недоступным для нажатия.
              </li>
            </ul>
            <ExampleBlock code={`<Tab value="t3" disabled>Таб 3</Tab>`}>
              <Tabs defaultValue="t1">
                <TabsList>
                  <Tab value="t1">Таб 1</Tab>
                  <Tab value="t2">Таб 2</Tab>
                  <Tab value="t3" disabled>
                    Таб 3
                  </Tab>
                </TabsList>
                <TabsPanel value="t1">Контент в первой вкладке</TabsPanel>
                <TabsPanel value="t2">Контент во второй вкладке</TabsPanel>
                <TabsPanel value="t3">Контент в третьей вкладке</TabsPanel>
              </Tabs>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="tabs-docs-menu"
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
              ['composition', 'Состав'],
              ['sizes', 'Размеры'],
              ['states', 'Состояния'],
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
