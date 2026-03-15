import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Button } from '../button/Button';
import { Icon } from '../../components/icons/Icon';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* В IconButton иконка заполняет контейнер — передаём size="100%", без !important в CSS */
const iconForButton = <Icon name="delete-cross-circle" size="100%" />;
const iconSmall = iconForButton;
const iconMedium = iconForButton;
const iconLarge = iconForButton;

const pStyle = {
  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
  fontSize: 'var(--text-base, 15px)',
  lineHeight: '1.5' as const,
  color: '#000000',
};
const codeStyle = { background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' };

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'variant', type: '"primary" | "secondary"', description: 'Визуальный вариант.', default: '"primary"' },
    { name: 'icon', type: 'ReactNode', description: 'Иконка (обязательно). Для Icon — size="100%", чтобы заполнить контейнер.', default: '—' },
    { name: 'size', type: '"small" | "medium" | "large"', description: '16 / 24 / 32 px.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокировка кнопки.', default: 'false' },
    { name: 'type', type: '"button" | "submit" | "reset"', description: 'HTML type.', default: '"button"' },
    { name: 'aria-label', type: 'string', description: 'Нужен для a11y (нет текста).', default: '—' },
    { name: 'className', type: 'string', description: 'Доп. классы.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLButtonElement>', description: 'forwardRef на <button>.', default: '—' },
    { name: '…rest', type: 'HTML button attrs', description: 'Проброс на <button>.', default: '—' },
  ];

  return (
    <div>
      <button
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
        <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
        <span>{isExpanded ? 'Скрыть список пропсов' : 'Показать список пропсов'}</span>
      </button>
      {isExpanded && (
        <div style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0' }}>
            <thead>
              <tr style={{ background: '#ffffff', borderTop: 'none' }}>
                <th style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#999',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none'
                }}>
                  Имя
                </th>
                <th style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#999',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none'
                }}>
                  Описание
                </th>
                <th style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#999',
                  width: '22.5%',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none'
                }}>
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
                    borderBottom: index < props.length - 1 ? '1px solid #b0b0b0' : 'none'
                  }}
                >
                  <td style={{
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: 'var(--foreground)',
                    verticalAlign: 'top',
                    fontWeight: 'bold',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
                    {prop.name}
                  </td>
                  <td style={{
                    padding: '1rem',
                    verticalAlign: 'top',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
                    <p style={{
                      marginBottom: '0.5rem',
                      fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-normal)',
                      lineHeight: '1.5',
                      color: 'var(--foreground)'
                    }}>
                      {prop.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem'
                    }}>
                      {prop.type.split(' | ').map((type, typeIndex) => (
                        <div
                          key={typeIndex}
                          style={{
                            display: 'inline-block',
                            padding: '0.125rem 0.5rem',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            color: 'var(--foreground)'
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: 'var(--muted-foreground)',
                    verticalAlign: 'top',
                    width: '22.5%',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
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

const IconButtonDocsPage = () => {
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const RefExample = () => {
    const ref = React.useRef<HTMLButtonElement>(null);
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <IconButton
          ref={ref}
          variant="primary"
          icon={iconMedium}
          aria-label="Закрыть"
          data-testid="icon-btn-close"
          onClick={() => ref.current?.focus()}
        />
      </div>
    );
  };

  const figmaUrl = 'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=602-3016';
  const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/icon-button';

  return (
    <>
    <div style={{
      display: 'flex',
      gap: '80px',
      maxWidth: '1400px',
      margin: '0 auto',
      paddingLeft: '2rem',
      paddingRight: 'calc(240px + 80px + 20px)',
      boxSizing: 'border-box'
    }}>
      {/* Основной контент */}
      <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
        <h1 id="iconbutton-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>IconButton</h1>

      {/* Кнопки Figma и GitHub */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        alignItems: 'center'
      }}>
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

      <p style={{
        marginBottom: '2rem',
        fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
        fontSize: 'var(--text-base, 15px)',
        lineHeight: '1.5',
        color: '#000000'
      }}>
        Кнопка только с иконкой. Размер 16 | 24 | 32 px. Для <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>Icon</code> передавайте <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>size="100%"</code> — иконка заполнит контейнер. И <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-label</code>.
      </p>

      {/* Секция Подключение в проекте */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="setup"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Подключение в проекте
        </h2>
        <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
          Импорт по подпути. Обязательны <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>icon</code> и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-label</code>.
        </p>
        <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box', marginBottom: '1rem' }}>
          <SyntaxHighlighter
            language="tsx"
            style={oneLight}
            customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }}
            codeTagProps={{ style: { fontFamily: 'monospace' } }}
            PreTag="div"
            useInlineStyles={true}
          >
            {`// 1) Подключите стили один раз
import 'turbo-ui/styles/theme';

// 2) Импорт компонента
import { IconButton } from 'turbo-ui/icon-button';

// 3) Использование
import { Icon } from 'turbo-ui/components/icons';
<IconButton variant="primary" icon={<Icon name="delete-cross-circle" size="100%" />} aria-label="Удалить" />`}
          </SyntaxHighlighter>
        </div>
        <p style={{ fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
          Контракт: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>specs/002-icon-button-spec/contracts/icon-button.md</code>.
        </p>
      </div>

      {/* Секция Импорт */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="import"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Импорт
        </h2>
        <div
          className="syntax-highlighter-wrapper"
          style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}
        >
          <SyntaxHighlighter
            language="tsx"
            style={oneLight}
            customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }}
            codeTagProps={{ style: { fontFamily: 'monospace' } }}
            PreTag="div"
            useInlineStyles={true}
          >
            {`// Потребитель пакета (рекомендуется)
import { IconButton } from 'turbo-ui/icon-button';

// Локальная разработка внутри репозитория Turbo UI
import { IconButton } from 'src/ui/icon-button';`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Секция Пример */}
      <div style={{ marginBottom: '3rem' }}>
        <ExampleBlock code={`import { IconButton } from 'turbo-ui/icon-button';

<IconButton variant="primary" icon={icon} aria-label="Удалить" />`}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <IconButton variant="primary" icon={iconMedium} aria-label="Удалить" />
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Все пропсы */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="all-props"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Все пропсы
        </h2>
        <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
          <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>forwardRef</code>, все атрибуты <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;button&gt;</code> пробрасываются.
        </p>
        <CollapsiblePropsList />
      </div>

      {/* Секция Интеграция: ref и нативные атрибуты */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="integration"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Интеграция: ref и нативные атрибуты
        </h2>
        <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
          <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>ref</code> и атрибуты <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;button&gt;</code> пробрасываются — для тестов и a11y.
        </p>
        <ExampleBlock
          code={`const ref = useRef<HTMLButtonElement>(null);

<IconButton
  ref={ref}
  variant="primary"
  icon={icon}
  aria-label="Закрыть"
  data-testid="icon-btn-close"
  onClick={() => ref.current?.focus()}
/>`}
        >
          <RefExample />
        </ExampleBlock>
      </div>

      {/* Секция Тема и изоляция */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="theme-scope"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Тема и изоляция
        </h2>
        <p style={{ marginBottom: 0, fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
          <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>TurboUIProvider</code> + <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>theme</code>. <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>scopeClassName</code> — изоляция токенов. <a href="https://github.com/johnpostman2-design/turbo-ui#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--content-brand, #228be7)' }}>README</a>.
        </p>
      </div>

      {/* Секция Варианты стилей */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="style-variants"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Варианты стилей
        </h2>
        <ul style={{
          marginBottom: '1.5rem',
          marginTop: 0,
          paddingLeft: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          lineHeight: '1.5',
          color: '#000000',
          listStyleType: 'disc'
        }}>
          <li style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}><strong>primary</strong> — иконка без фона контейнера</li>
          <li style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}><strong>secondary</strong> — при hover лёгкий круглый фон</li>
        </ul>
        <ExampleBlock
          code={`<IconButton variant="primary" icon={icon} aria-label="Удалить" />
<IconButton variant="secondary" icon={icon} aria-label="Удалить" />`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton variant="primary" icon={iconMedium} aria-label="Удалить" />
            <IconButton variant="secondary" icon={iconMedium} aria-label="Удалить" />
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Размеры */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="sizes"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Размеры
        </h2>
        <ul style={{
          marginBottom: '1.5rem',
          marginTop: 0,
          paddingLeft: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          lineHeight: '1.5',
          color: '#000000',
          listStyleType: 'disc'
        }}>
          <li style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}><strong>small</strong> — 16 px</li>
          <li style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}><strong>medium</strong> — 24 px</li>
          <li style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}><strong>large</strong> — 32 px</li>
        </ul>
        <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', color: '#000000', marginTop: 0 }}>
          SVG внутри масштабируется на всю область контейнера.
        </p>
        <ExampleBlock
          code={`<IconButton variant="primary" size="small" icon={iconSmall} aria-label="Удалить" />
<IconButton variant="primary" size="medium" icon={iconMedium} aria-label="Удалить" />
<IconButton variant="primary" size="large" icon={iconLarge} aria-label="Удалить" />`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <IconButton variant="primary" size="small" icon={iconSmall} aria-label="Удалить" />
            <IconButton variant="primary" size="medium" icon={iconMedium} aria-label="Удалить" />
            <IconButton variant="primary" size="large" icon={iconLarge} aria-label="Удалить" />
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Состояние блокировки */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          id="disabled"
          style={{
            marginBottom: '0.25rem',
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}
        >
          Состояние блокировки
        </h2>
        <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', color: '#000000' }}>
          <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>disabled</code> — блокировка клика и визуал из токенов.
        </p>
        <ExampleBlock
          code={`<IconButton variant="primary" icon={icon} aria-label="Удалить" disabled />
<IconButton variant="secondary" icon={icon} aria-label="Удалить" disabled />`}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton variant="primary" icon={iconMedium} aria-label="Удалить" disabled />
            <IconButton variant="secondary" icon={iconMedium} aria-label="Удалить" disabled />
          </div>
        </ExampleBlock>
      </div>
      </div>
    </div>

      {/* Меню навигации */}
      <nav
        className="icon-button-docs-menu"
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '240px',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          lineHeight: '1.5',
          color: '#000000'
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#import"
              onClick={(e) => handleMenuClick(e, 'import')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Импорт
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#setup"
              onClick={(e) => handleMenuClick(e, 'setup')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
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
                cursor: 'pointer'
              }}
            >
              Все пропсы
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#integration"
              onClick={(e) => handleMenuClick(e, 'integration')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Интеграция
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#theme-scope"
              onClick={(e) => handleMenuClick(e, 'theme-scope')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Тема и изоляция
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#style-variants"
              onClick={(e) => handleMenuClick(e, 'style-variants')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Варианты стилей
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
                cursor: 'pointer'
              }}
            >
              Размеры
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#disabled"
              onClick={(e) => handleMenuClick(e, 'disabled')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Состояние блокировки
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: IconButtonDocsPage,
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'], description: 'Визуальный вариант' },
    size: { control: 'radio', options: ['small', 'medium', 'large'], description: '16/24/32 px' },
    disabled: { control: 'boolean', description: 'Отключена' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', icon: iconMedium, size: 'medium', 'aria-label': 'Удалить' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', icon: iconMedium, size: 'medium', 'aria-label': 'Удалить' },
};

export const Disabled: Story = {
  args: { variant: 'primary', icon: iconMedium, disabled: true, 'aria-label': 'Удалить' },
};
