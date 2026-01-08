// Скопируйте этот файл в .storybook/components/ExampleBlock.tsx
// Этот компонент создает красивое отображение примеров как в Turbo UI

import React, { useState } from 'react';
import { Copy, ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Принудительно применяем стили темы
const customOneLight = {
  ...oneLight,
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    color: '#383a42',
    background: '#fafafa',
  },
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    color: '#383a42',
    background: '#fafafa',
  },
};

interface ExampleBlockProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export const ExampleBlock: React.FC<ExampleBlockProps> = ({ 
  children, 
  code,
  title 
}) => {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <h4 style={{ 
          marginBottom: '1rem',
          fontFamily: 'var(--font-base, "ONY One", sans-serif)',
          fontSize: 'var(--text-h4)',
          fontWeight: 'var(--font-weight-normal)'
        }}>
          {title}
        </h4>
      )}
      
      {/* Контейнер с примером */}
      <div style={{
        border: '1px solid var(--border-tertiary, rgba(0, 0, 0, 0.10))',
        borderRadius: 'calc(var(--radius, 4px) + 2px)',
        overflow: 'hidden'
      }}>
        {/* Превью компонента */}
        <div style={{
          paddingTop: '60px',
          paddingBottom: '60px',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background, white)'
        }}>
          {children}
        </div>
        
        {/* Панель управления кодом */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          background: 'rgba(0, 0, 0, 0.02)',
          borderTop: '1px solid var(--border-tertiary, rgba(0, 0, 0, 0.10))'
        }}>
          <button
            onClick={() => setIsCodeOpen(!isCodeOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <ChevronDown 
              size={16}
              style={{
                transform: isCodeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            />
          </button>
          
          <button
            onClick={handleCopy}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Copy size={16} />
            {copied && (
              <span style={{
                position: 'absolute',
                top: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--foreground, black)',
                color: 'var(--background, white)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius, 4px)',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap'
              }}>
                Скопировано
              </span>
            )}
          </button>
        </div>
        
        {/* Секция с кодом */}
        {isCodeOpen && (
          <div style={{
            borderTop: '1px solid var(--border-tertiary, rgba(0, 0, 0, 0.10))'
          }}>
            <div 
              style={{ position: 'relative' }}
              className="syntax-highlighter-wrapper"
            >
              <SyntaxHighlighter
                language="tsx"
                style={customOneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  borderRadius: 0,
                  background: '#fafafa'
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'monospace',
                    color: '#383a42'
                  }
                }}
                PreTag="div"
                useInlineStyles={true}
                wrapLines={false}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
