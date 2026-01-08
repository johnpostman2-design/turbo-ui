import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Компонент для сворачиваемого списка пропсов
const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const props = [
    {
      name: 'type',
      type: '"primary" | "secondary" | "text" | "backless"',
      description: 'Тип стиля кнопки. Primary — основное действие (черный фон), Secondary — второстепенное действие (белый фон с обводкой), Text — текстовая кнопка (белый фон без обводки), Backless — кнопка без фона (только обводка).',
      default: '"primary"'
    },
    {
      name: 'state',
      type: '"default" | "hover" | "disabled" | "loading"',
      description: 'Состояние кнопки. Default — обычное, Hover — при наведении, Disabled — заблокирована, Loading — загрузка.',
      default: '"default"'
    },
    {
      name: 'size',
      type: '"small" | "medium" | "large"',
      description: 'Размер кнопки. Small — 32px высота, Medium — 40px высота, Large — 56px высота.',
      default: '"medium"'
    },
    {
      name: 'iconL',
      type: 'boolean',
      description: 'Показывать ли иконку слева от текста.',
      default: 'true'
    },
    {
      name: 'iconR',
      type: 'boolean',
      description: 'Показывать ли иконку справа от текста.',
      default: 'true'
    },
    {
      name: 'text',
      type: 'boolean',
      description: 'Показывать ли текст в кнопке.',
      default: 'true'
    },
    {
      name: 'iconL2',
      type: 'React.ReactNode | null',
      description: 'Кастомная иконка слева. Если не указана, используется иконка по умолчанию.',
      default: 'null'
    },
    {
      name: 'iconR2',
      type: 'React.ReactNode | null',
      description: 'Кастомная иконка справа. Если не указана, используется иконка по умолчанию.',
      default: 'null'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Текст или содержимое кнопки.',
      default: '"Button"'
    },
    {
      name: 'onClick',
      type: '() => void',
      description: 'Обработчик клика по кнопке.',
      default: 'undefined'
    },
    {
      name: 'className',
      type: 'string',
      description: 'Дополнительные CSS классы для кнопки.',
      default: 'undefined'
    }
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
          transition: 'all 0.2s ease'
        }}
      >
        <ChevronDown
          size={16}
          style={{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform 0.2s ease'
          }}
        />
        <span>{isExpanded ? 'Скрыть список пропсов и методов' : 'Показать список пропсов и методов'}</span>
      </button>

      {isExpanded && (
        <div style={{
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '0'
          }}>
            <thead>
              <tr style={{
                background: '#ffffff',
                borderTop: 'none'
              }}>
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

// Компонент для документации Button
const ButtonDocsPage = () => {
  // Интерактивная кнопка для состояния загрузки
  const InteractiveLoadingButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Button 
        type="primary" 
        state={isLoading ? "loading" : "default"}
        onClick={handleClick}
      >
        Нажми меня
      </Button>
    );
  };

  // Интерактивные кнопки для размеров
  const InteractiveSizesButtons = () => {
    const [isLoadingSmall, setIsLoadingSmall] = useState(false);
    const [isLoadingMedium, setIsLoadingMedium] = useState(false);
    const [isLoadingLarge, setIsLoadingLarge] = useState(false);

    return (
      <div style={{ 
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <Button 
          type="primary" 
          size="small"
          state={isLoadingSmall ? "loading" : "default"}
          onClick={() => {
            setIsLoadingSmall(true);
            setTimeout(() => setIsLoadingSmall(false), 2000);
          }}
        >
          Small
        </Button>
        <Button 
          type="primary" 
          size="medium"
          state={isLoadingMedium ? "loading" : "default"}
          onClick={() => {
            setIsLoadingMedium(true);
            setTimeout(() => setIsLoadingMedium(false), 2000);
          }}
        >
          Medium
        </Button>
        <Button 
          type="primary" 
          size="large"
          state={isLoadingLarge ? "loading" : "default"}
          onClick={() => {
            setIsLoadingLarge(true);
            setTimeout(() => setIsLoadingLarge(false), 2000);
          }}
        >
          Large
        </Button>
      </div>
    );
  };

  // Интерактивные кнопки для состояния загрузки
  const InteractiveLoadingButtons = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <Button 
          type="primary" 
          state={isLoading ? "loading" : "default"}
          iconL={true}
          text={false} 
          iconR={false}
          onClick={handleButtonClick}
        >
          Удалить
        </Button>
        <Button 
          type="primary" 
          state={isLoading ? "loading" : "default"}
          iconR={false}
          onClick={handleButtonClick}
        >
          Удалить
        </Button>
        <Button 
          type="primary" 
          state={isLoading ? "loading" : "default"}
          iconL={false}
          onClick={handleButtonClick}
        >
          Удалить
        </Button>
        <Button 
          type="primary" 
          state={isLoading ? "loading" : "default"}
          onClick={handleButtonClick}
        >
          Удалить
        </Button>
      </div>
    );
  };

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
      <div style={{ 
        flex: '1',
        minWidth: 0,
        maxWidth: '100%'
      }}>
        <h1 id="button-title">Button</h1>
      
      {/* Кнопки Figma и GitHub */}
      <div style={{ 
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        alignItems: 'center'
      }}>
        <Button 
          type="backless" 
          iconL={false}
          iconR={false}
          onClick={() => window.open('https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo--UI-Demo?node-id=1-8&t=qY6qqTxdmKFUKcCU-11', '_blank', 'noopener,noreferrer')}
        >
          Figma
        </Button>
        <Button 
          type="backless" 
          iconL={false}
          iconR={false}
          onClick={() => window.open('https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/button', '_blank', 'noopener,noreferrer')}
        >
          GitHub
        </Button>
      </div>
      
      <p style={{ 
        marginBottom: '2rem',
        fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
        fontSize: 'var(--text-base, 15px)',
        color: '#000000'
      }}>
        Компонент кнопки из дизайн-системы с иконками графиков и четырьмя вариантами стилизации: Primary, Secondary, Text, Backless.
      </p>

      {/* Секция Импорт */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="import"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
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
            {`import { Button } from 'src/ui/button/Button';`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Секция Пример Primary кнопки */}
      <div style={{ marginBottom: '3rem' }}>
        <ExampleBlock
          code={`import { Button } from 'src/ui/button/Button';

<Button type="primary">Button</Button>`}
        >
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Button type="primary">Button</Button>
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Все пропсы */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="all-props"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
          Все пропсы
        </h2>
        <CollapsiblePropsList />
      </div>

      {/* Секция Варианты стилей */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="style-variants"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
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
          <li style={{ 
            marginBottom: '0.5rem',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            fontSize: 'var(--text-base, 15px)',
            lineHeight: '1.5',
            color: '#000000'
          }}>Primary — кнопка основного действия (черный фон)</li>
          <li style={{ 
            marginBottom: '0.5rem',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            fontSize: 'var(--text-base, 15px)',
            lineHeight: '1.5',
            color: '#000000'
          }}>Secondary — кнопка второстепенного действия (белый фон с обводкой)</li>
          <li style={{ 
            marginBottom: '0.5rem',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            fontSize: 'var(--text-base, 15px)',
            lineHeight: '1.5',
            color: '#000000'
          }}>Text — текстовая кнопка (белый фон без обводки)</li>
          <li style={{ 
            marginBottom: '0.5rem',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            fontSize: 'var(--text-base, 15px)',
            lineHeight: '1.5',
            color: '#000000'
          }}>Backless — кнопка без фона (только обводка)</li>
        </ul>
        <ExampleBlock
          code={`import { Button } from 'src/ui/button/Button';

<Button type="primary">Primary</Button>
<Button type="secondary">Secondary</Button>
<Button type="text">Text</Button>
<Button type="backless">Backless</Button>`}
        >
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="text">Text</Button>
            <Button type="backless">Backless</Button>
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Размеры */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="sizes"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
          Размеры
        </h2>
        <p style={{ 
          marginBottom: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}>
          Кнопки доступны в трех размерах: Small (32px), Medium (40px), Large (56px). Нажмите на кнопку, чтобы увидеть состояние загрузки.
        </p>
        <ExampleBlock
          code={`import { useState } from 'react';
import { Button } from 'src/ui/button/Button';

const [isLoadingSmall, setIsLoadingSmall] = useState(false);
const [isLoadingMedium, setIsLoadingMedium] = useState(false);
const [isLoadingLarge, setIsLoadingLarge] = useState(false);

<Button 
  type="primary" 
  size="small"
  state={isLoadingSmall ? "loading" : "default"}
  onClick={() => {
    setIsLoadingSmall(true);
    setTimeout(() => setIsLoadingSmall(false), 2000);
  }}
>
  Small
</Button>
<Button 
  type="primary" 
  size="medium"
  state={isLoadingMedium ? "loading" : "default"}
  onClick={() => {
    setIsLoadingMedium(true);
    setTimeout(() => setIsLoadingMedium(false), 2000);
  }}
>
  Medium
</Button>
<Button 
  type="primary" 
  size="large"
  state={isLoadingLarge ? "loading" : "default"}
  onClick={() => {
    setIsLoadingLarge(true);
    setTimeout(() => setIsLoadingLarge(false), 2000);
  }}
>
  Large
</Button>`}
        >
          <InteractiveSizesButtons />
        </ExampleBlock>
      </div>

      {/* Секция Иконки в кнопке */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="icons"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
          Иконки в кнопке
        </h2>
        <p style={{ 
          marginBottom: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}>
          Primary кнопка поддерживает различные комбинации иконок
        </p>
        <ExampleBlock
          code={`import { Button } from 'src/ui/button/Button';

<Button type="primary">С обеими</Button>
<Button type="primary" iconR={false}>Только левая</Button>
<Button type="primary" iconL={false}>Только правая</Button>
<Button type="primary" iconL={false} iconR={false}>Без иконок</Button>`}
        >
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Button type="primary">С обеими</Button>
            <Button type="primary" iconR={false}>Только левая</Button>
            <Button type="primary" iconL={false}>Только правая</Button>
            <Button type="primary" iconL={false} iconR={false}>Без иконок</Button>
          </div>
        </ExampleBlock>
      </div>

      {/* Секция Состояние загрузки */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="loading"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
          Состояние загрузки
        </h2>
        <p style={{ 
          marginBottom: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}>
          При нажатии на любую кнопку все кнопки переходят в состояние loading с анимацией вращающейся иконки. Поддерживаются различные варианты: только иконка, иконка слева + текст, текст + иконка справа, иконка + текст + иконка.
        </p>
        <ExampleBlock
          code={`import { useState } from 'react';
import { Button } from 'src/ui/button/Button';

const [isLoading, setIsLoading] = useState(false);

const handleButtonClick = () => {
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
};

<Button 
  type="primary" 
  state={isLoading ? "loading" : "default"}
  iconL={true}
  text={false} 
  iconR={false}
  onClick={handleButtonClick}
>
  Удалить
</Button>
<Button 
  type="primary" 
  state={isLoading ? "loading" : "default"}
  iconR={false}
  onClick={handleButtonClick}
>
  Удалить
</Button>
<Button 
  type="primary" 
  state={isLoading ? "loading" : "default"}
  iconL={false}
  onClick={handleButtonClick}
>
  Удалить
</Button>
<Button 
  type="primary" 
  state={isLoading ? "loading" : "default"}
  onClick={handleButtonClick}
>
  Удалить
</Button>`}
        >
          <InteractiveLoadingButtons />
        </ExampleBlock>
      </div>

      {/* Секция Состояние блокировки */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 
          id="disabled"
          style={{ 
            marginBottom: '0.25rem', /* 4px вместо 10px */
            textDecoration: 'none',
            borderBottom: 'none',
            fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
            color: '#000000'
          }}>
          Состояние блокировки
        </h2>
        <p style={{ 
          marginBottom: '1.5rem',
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--text-base, 15px)',
          color: '#000000'
        }}>
          Кнопки с атрибутом disabled теряют 50% непрозрачности и не реагируют на клики
        </p>
        <ExampleBlock
          code={`import { Button } from 'src/ui/button/Button';

<Button type="primary" state="disabled">Primary</Button>
<Button type="secondary" state="disabled">Secondary</Button>
<Button type="text" state="disabled">Text</Button>
<Button type="backless" state="disabled">Backless</Button>`}
        >
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Button type="primary" state="disabled">Primary</Button>
            <Button type="secondary" state="disabled">Secondary</Button>
            <Button type="text" state="disabled">Text</Button>
            <Button type="backless" state="disabled">Backless</Button>
          </div>
        </ExampleBlock>
      </div>
      </div>
    </div>

      {/* Меню навигации */}
      <nav
        className="button-docs-menu"
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
              href="#icons"
              onClick={(e) => handleMenuClick(e, 'icons')}
              style={{
                color: '#000000',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Иконки в кнопке
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
                cursor: 'pointer'
              }}
            >
              Состояние загрузки
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

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: ButtonDocsPage,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary Button',
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    children: 'Text Button',
  },
};

export const Backless: Story = {
  args: {
    type: 'backless',
    children: 'Backless Button',
  },
};

export const Loading: Story = {
  args: {
    type: 'primary',
    state: 'loading',
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    state: 'disabled',
    children: 'Disabled Button',
  },
};
