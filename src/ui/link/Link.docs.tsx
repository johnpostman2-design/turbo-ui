import React, { useState } from 'react';
import { Link } from './Link';
import { Button } from '../button/Button';
import { Icon } from '../../components/icons';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=928-813';
const githubUrl =
  'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/link';

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    {
      name: 'href',
      type: 'string',
      description:
        'Целевой адрес. Если задан — корневой тег <a>. Если нет — корневой тег <button type="button">.',
      default: '—',
    },
    {
      name: 'variant',
      type: '"default" | "secondary" | "danger"',
      description:
        'Цветовая роль ссылки. default → --content-brand, secondary → --content-primary, danger → --content-error.',
      default: '"default"',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description:
        'Блокирует клик и навигацию. Цвет — --content-disabled, без подчёркивания, cursor: not-allowed.',
      default: 'false',
    },
    {
      name: 'loading',
      type: 'boolean',
      description:
        'Состояние загрузки: блокирует клик и навигацию, цвет --content-disabled, aria-busy="true". Если задан startIcon или endIcon — иконка заменяется на спиннер.',
      default: 'false',
    },
    {
      name: 'startIcon',
      type: 'ReactNode',
      description:
        'Иконка слева от текста. Размер 1em, цвет currentColor (наследуется от варианта).',
      default: '—',
    },
    {
      name: 'endIcon',
      type: 'ReactNode',
      description:
        'Иконка справа от текста. Размер 1em, цвет currentColor.',
      default: '—',
    },
    {
      name: 'target',
      type: 'string',
      description:
        'Только для <a>. Нативный атрибут. По умолчанию ссылка открывается в текущей вкладке; "_blank" — в новой. Компонент не меняет это значение.',
      default: '—',
    },
    {
      name: 'rel',
      type: 'string',
      description:
        'Только для <a>. Если href ведёт на внешний URL (http(s)://… или //…) и rel не задан явно — компонент автоматически проставит "noopener noreferrer". Явное значение используется как есть.',
      default: '—',
    },
    {
      name: 'onClick',
      type: '(event) => void',
      description:
        'Хендлер клика. Для <a> вызов event.preventDefault() отменяет навигацию.',
      default: '—',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Текст ссылки.',
      default: '—',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Класс на корневой DOM-узел.',
      default: '—',
    },
    {
      name: 'ref',
      type: 'Ref<HTMLAnchorElement | HTMLButtonElement>',
      description: 'На корневой DOM-узел соответствующего тега.',
      default: '—',
    },
    {
      name: '…rest',
      type: '<a> или <button> attrs',
      description:
        'id, data-*, aria-*, download, form и т. п. — пробрасываются на корень.',
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
        <span>{isExpanded ? 'Скрыть список пропсов' : 'Показать список пропсов'}</span>
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
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

export function LinkDocsPage() {
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
          <h1 id="link-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Link
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
            Текстовая ссылка как часть typography. Наследует шрифт и размер из контекста.
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
              Установите пакет, подключите стили один раз и импортируйте компонент по подпути для tree-shaking.
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
import { Link } from 'turbo-ui/link';

<p>Подробнее в <Link href="/docs">нашей документации</Link>.</p>`}
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
              Контракт:{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                specs/012-link-typography/contracts/link.md
              </code>
              .
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock
              code={`<p>Подробнее в <Link href="/docs">нашей документации</Link>.</p>`}
            >
              <p
                style={{
                  fontFamily: 'var(--family-brand)',
                  fontSize: 'var(--text-base, 15px)',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                Подробнее в <Link href="/docs">нашей документации</Link>.
              </p>
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
            <p
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                ref
              </code>{' '}
              ведёт на корневой тег:{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                &lt;a&gt;
              </code>{' '}
              при наличии{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                href
              </code>{' '}
              или{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                &lt;button type="button"&gt;
              </code>{' '}
              без него.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="variants"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Варианты
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
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  default
                </code>{' '}
                — основная навигация, цвет{' '}
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  --content-brand
                </code>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  secondary
                </code>{' '}
                — нейтральная ссылка в тексте, цвет{' '}
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  --content-primary
                </code>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  danger
                </code>{' '}
                — деструктивное действие, цвет{' '}
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  --content-error
                </code>
              </li>
            </ul>
            <ExampleBlock
              code={`<Link href="/x">Default</Link>
<Link href="/x" variant="secondary">Secondary</Link>
<Link href="/x" variant="danger">Удалить</Link>`}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Link href="/x">Default</Link>
                <Link href="/x" variant="secondary">
                  Secondary
                </Link>
                <Link href="/x" variant="danger">
                  Удалить
                </Link>
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
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  default
                </code>{' '}
                — подчёркивание из шрифта, цвет варианта
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  hover
                </code>{' '}
                — подчёркивание убирается
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  active
                </code>{' '}
                — подчёркивание утолщается
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  focus-visible
                </code>{' '}
                — outline 2px currentColor, скругление{' '}
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  --rounds-s
                </code>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  disabled
                </code>{' '}
                — цвет{' '}
                <code
                  style={{
                    background: '#f0f0f0',
                    padding: '0.125rem 0.25rem',
                    borderRadius: '4px',
                  }}
                >
                  --content-disabled
                </code>
                , без подчёркивания, cursor: not-allowed
              </li>
            </ul>
            <ExampleBlock
              code={`<Link href="/x">Активная ссылка</Link>
<Link href="/x" disabled>Сейчас недоступно</Link>
<Link disabled onClick={fn}>Действие выключено</Link>`}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Link href="/x">Активная ссылка</Link>
                <Link href="/x" disabled>
                  Сейчас недоступно
                </Link>
                <Link disabled onClick={() => {}}>
                  Действие выключено
                </Link>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="icons"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Иконки
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
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                startIcon
              </code>{' '}
              и{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                endIcon
              </code>{' '}
              — это{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                ReactNode
              </code>
              . Размер слотов — 1em, цвет — currentColor.
            </p>
            <ExampleBlock
              code={`import { Icon } from 'turbo-ui/icons';

<Link href="/file.pdf" startIcon={<Icon name="cloud" size="100%" />}>
  Скачать
</Link>
<Link
  href="https://example.com"
  target="_blank"
  endIcon={<Icon name="arrow-right" size="100%" />}
>
  Открыть в новой вкладке
</Link>`}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Link
                  href="/file.pdf"
                  startIcon={<Icon name="cloud" size="100%" />}
                >
                  Скачать
                </Link>
                <Link
                  href="https://example.com"
                  target="_blank"
                  endIcon={<Icon name="arrow-right" size="100%" />}
                >
                  Открыть в новой вкладке
                </Link>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="external"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Открытие ссылок на внешние ресурсы
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
              По умолчанию ссылка открывается в текущей вкладке. Переопределить
              это поведение можно нативным атрибутом{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                target="_blank"
              </code>{' '}
              — ссылка будет открываться в новой вкладке.
            </p>
            <p
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--family-brand)',
                fontSize: 'var(--text-base, 15px)',
                lineHeight: '1.5',
                color: '#000000',
              }}
            >
              Если ссылка ведёт на внешний URL (
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                http(s)://…
              </code>{' '}
              или{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                //host
              </code>
              ), компонент автоматически добавит{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                rel="noopener noreferrer"
              </code>{' '}
              — защита от tabnapping и утечки реферера. Атрибут{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                target
              </code>{' '}
              компонент не меняет и не добавляет. Если{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                rel
              </code>{' '}
              задан явно — он используется как есть, без модификаций.
            </p>
            <ExampleBlock
              code={`<Link href="https://example.com">Внешняя ссылка в текущей вкладке</Link>
<Link href="https://example.com" target="_blank">Внешняя в новой вкладке</Link>
<Link href="/docs">Внутренняя ссылка (без rel)</Link>`}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Link href="https://example.com">
                  Внешняя ссылка в текущей вкладке
                </Link>
                <Link href="https://example.com" target="_blank">
                  Внешняя в новой вкладке
                </Link>
                <Link href="/docs">Внутренняя ссылка (без rel)</Link>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="loading"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Состояние загрузки
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
              Проп{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                loading
              </code>{' '}
              переводит ссылку в состояние загрузки. При загрузке ссылка
              блокируется, становится серой (цвет{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                --content-disabled
              </code>
              ), получает{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                aria-busy="true"
              </code>
              . Если задан{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                startIcon
              </code>{' '}
              или{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                endIcon
              </code>{' '}
              — иконка заменяется на спиннер.
            </p>
            <ExampleBlock
              code={`<Link href="/file.pdf" loading startIcon={<Icon name="cloud" size="100%" />}>
  Скачать
</Link>
<Link href="https://example.com" loading endIcon={<Icon name="arrow-right" size="100%" />}>
  Открыть в новой вкладке
</Link>
<Link href="/docs" loading>Загрузка без иконки</Link>`}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--family-brand)',
                }}
              >
                <Link
                  href="/file.pdf"
                  loading
                  startIcon={<Icon name="cloud" size="100%" />}
                >
                  Скачать
                </Link>
                <Link
                  href="https://example.com"
                  loading
                  endIcon={<Icon name="arrow-right" size="100%" />}
                >
                  Открыть в новой вкладке
                </Link>
                <Link href="/docs" loading>
                  Загрузка без иконки
                </Link>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="in-typography"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Внутри типографики
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
              Link наследует шрифт и размер из контекста. Внутри{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                &lt;p&gt;
              </code>{' '}
              он — часть абзаца, внутри{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '4px',
                }}
              >
                &lt;h2&gt;
              </code>{' '}
              — часть заголовка.
            </p>
            <ExampleBlock
              code={`<p>Подробнее в <Link href="/docs">документации</Link>.</p>
<h2>Заголовок с <Link href="/x">ссылкой</Link></h2>`}
            >
              <div
                className="link-typo-demo"
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <p>
                  Подробнее в <Link href="/docs">документации</Link>.
                </p>
                <h2>
                  Заголовок с <Link href="/x">ссылкой</Link>
                </h2>
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="link-docs-menu"
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
              href="#variants"
              onClick={(e) => handleMenuClick(e, 'variants')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Варианты
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
              href="#icons"
              onClick={(e) => handleMenuClick(e, 'icons')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Иконки
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#external"
              onClick={(e) => handleMenuClick(e, 'external')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Внешние ссылки
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#loading"
              onClick={(e) => handleMenuClick(e, 'loading')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Состояние загрузки
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#in-typography"
              onClick={(e) => handleMenuClick(e, 'in-typography')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Внутри типографики
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
