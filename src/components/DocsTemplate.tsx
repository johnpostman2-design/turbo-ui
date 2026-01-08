import React, { useState } from 'react';
import { ExampleBlock } from './ExampleBlock';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Prop {
  name: string;
  type: string;
  description: string;
  default: string;
}

interface DocsTemplateProps {
  componentName: string;
  description: string;
  importCode: string;
  exampleCode: string;
  exampleComponent: React.ReactNode;
  props: Prop[];
  menuItems?: Array<{ id: string; title: string; level: number }>;
}

// Компонент для сворачиваемого списка пропсов
const CollapsiblePropsList: React.FC<{ props: Prop[] }> = ({ props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          background: '#f5f5f5',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}
      >
        <span>{isExpanded ? 'Скрыть' : 'Показать'} все пропсы</span>
        <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div style={{ marginTop: '1rem' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: 0
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid #d1d1d1',
                    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                    fontSize: 'var(--text-base, 15px)',
                    fontWeight: 'normal',
                    color: '#999',
                    background: 'white'
                  }}
                >
                  Имя
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid #d1d1d1',
                    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                    fontSize: 'var(--text-base, 15px)',
                    fontWeight: 'normal',
                    color: '#999',
                    background: 'white'
                  }}
                >
                  Описание
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid #d1d1d1',
                    fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                    fontSize: 'var(--text-base, 15px)',
                    fontWeight: 'normal',
                    color: '#999',
                    background: 'white',
                    width: '1.5fr'
                  }}
                >
                  По умолчанию
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={index} style={{ background: 'white' }}>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid #d1d1d1',
                      borderLeft: '1px solid #d1d1d1',
                      fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                      fontSize: 'var(--text-base, 15px)',
                      color: '#333',
                      fontWeight: 'bold'
                    }}
                  >
                    {prop.name}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid #d1d1d1',
                      fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
                      fontSize: 'var(--text-base, 15px)',
                      color: '#000000'
                    }}
                  >
                    {prop.description}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid #d1d1d1',
                      borderRight: '1px solid #d1d1d1',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: '#000000'
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

export const DocsTemplate: React.FC<DocsTemplateProps> = ({
  componentName,
  description,
  importCode,
  exampleCode,
  exampleComponent,
  props,
  menuItems
}) => {
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Генерируем меню, если не передано
  const defaultMenuItems = menuItems || [
    { id: 'import', title: 'Импорт', level: 2 },
    { id: 'example', title: 'Пример', level: 2 },
    { id: 'all-props', title: 'Все пропсы', level: 2 },
  ];

  return (
    <div style={{ 
      display: 'flex',
      gap: '3rem',
      position: 'relative',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 0 0 2rem'
    }}>
      {/* Основной контент */}
      <div style={{ flex: '1', minWidth: 0 }}>
        <h1 id={`${componentName.toLowerCase()}-title`} style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          color: '#000000'
        }}>
          {componentName}
        </h1>
        
        <p style={{ 
          marginBottom: '2rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}>
          {description}
        </p>

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
            }}>
            Импорт
          </h2>
          <div 
            className="syntax-highlighter-wrapper"
            style={{ 
              borderRadius: '8px',
              overflow: 'hidden',
              width: '100%',
              boxSizing: 'border-box'
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
                background: '#f5f5f5'
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'monospace'
                }
              }}
              PreTag="div"
              useInlineStyles={true}
            >
              {importCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Секция Пример компонента */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 
            id="example"
            style={{ 
              marginBottom: '0.25rem',
              textDecoration: 'none',
              borderBottom: 'none',
              fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
              color: '#000000'
            }}>
            Пример
          </h2>
          <ExampleBlock code={exampleCode}>
            <div style={{ 
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              {exampleComponent}
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
            }}>
            Все пропсы
          </h2>
          <CollapsiblePropsList props={props} />
        </div>
      </div>

      {/* Меню навигации */}
      <nav
        className="button-docs-menu"
        style={{
          flex: '0 0 25%',
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
          {defaultMenuItems.map((item) => (
            <li key={item.id} style={{ marginBottom: '0.25rem', paddingLeft: item.level > 1 ? '1rem' : '0' }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleMenuClick(e, item.id)}
                style={{
                  color: '#000000',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};


