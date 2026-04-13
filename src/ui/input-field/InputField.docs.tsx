import React, { useState } from 'react';
import { InputField } from './InputField';
import { Button } from '../button/Button';
import { IconButton } from '../icon-button/IconButton';
import { Icon } from '../../components/icons/Icon';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl = 'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=696-412';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/input-field';

const iconForEnd = <Icon name="delete-cross-circle" size="100%" />;
const endAdornment = <IconButton icon={iconForEnd} aria-label="Очистить" size="small" />;
const leftIcon = <Icon name="chart" size={20} />;

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'label', type: 'string', description: 'Текст над полем; связь с полем по id/htmlFor.', default: '—' },
    { name: 'helperText', type: 'string', description: 'Строка под полем; скрывается, если задан errorText.', default: '—' },
    { name: 'errorText', type: 'string', description: 'Ошибка под полем; важнее helperText.', default: '—' },
    { name: 'leftIcon', type: 'ReactNode', description: 'Иконка слева в рамке.', default: '—' },
    { name: 'endAdornment', type: 'ReactNode', description: 'Справа только IconButton; tabIndex −1.', default: '—' },
    { name: 'size', type: '"small" | "medium" | "large"', description: 'Высота 32 / 40 / 48 px.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокирует поле и endAdornment.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка: рамка + aria-invalid.', default: 'false' },
    { name: 'type', type: 'text | number | tel | search | time | date | email | password', description: 'Нативный type.', default: '"text"' },
    { name: 'value', type: 'string', description: 'Controlled.', default: '—' },
    { name: 'defaultValue', type: 'string', description: 'Uncontrolled, начальное.', default: '—' },
    { name: 'onChange', type: 'ChangeEventHandler<HTMLInputElement>', description: 'Смена значения.', default: '—' },
    { name: 'className', type: 'string', description: 'Класс на корне (label + поле + helper).', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLInputElement>', description: 'На DOM <input>.', default: '—' },
    { name: '…rest', type: 'HTML input attrs', description: 'Остальное — на <input> (placeholder, aria-*, data-* …).', default: '—' },
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
        <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
        <span>{isExpanded ? 'Скрыть список пропсов' : 'Показать список пропсов'}</span>
      </button>
      {isExpanded && (
        <div style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0' }}>
            <thead>
              <tr style={{ background: '#ffffff', borderTop: 'none' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'bold', color: '#999', border: 'none' }}>Имя</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'bold', color: '#999', border: 'none' }}>Описание</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'bold', color: '#999', width: '22.5%', border: 'none' }}>По умолчанию</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={prop.name} style={{ background: '#ffffff', borderBottom: index < props.length - 1 ? '1px solid #b0b0b0' : 'none' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--foreground)', verticalAlign: 'top', fontWeight: 'bold', borderLeft: 'none', borderRight: 'none' }}>{prop.name}</td>
                  <td style={{ padding: '1rem', verticalAlign: 'top', borderLeft: 'none', borderRight: 'none' }}>
                    <p style={{ marginBottom: '0.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base)', lineHeight: '1.5', color: 'var(--foreground)' }}>{prop.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {prop.type.split(' | ').map((t, i) => (
                        <div key={i} style={{ display: 'inline-block', padding: '0.125rem 0.5rem', background: '#f0f0f0', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--foreground)' }}>{t}</div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--muted-foreground)', verticalAlign: 'top', width: '22.5%', borderLeft: 'none', borderRight: 'none' }}>{prop.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export function InputFieldDocsPage() {
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
    const ref = React.useRef<HTMLInputElement>(null);
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
        <div style={{ flex: '1', minWidth: '200px', maxWidth: '320px' }}>
          <InputField ref={ref} label="Поле" helperText="Подсказка" placeholder="Фокус по кнопке" data-testid="input-field-ref" />
        </div>
        <Button variant="backless" startIcon={null} endIcon={null} onClick={() => ref.current?.focus()}>
          Фокус в поле
        </Button>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '80px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: 'calc(240px + 80px + 20px)', boxSizing: 'border-box' }}>
        <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
          <h1 id="input-field-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            InputField
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(figmaUrl, '_blank', 'noopener,noreferrer')}>
              Figma
            </Button>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}>
              GitHub
            </Button>
          </div>

          <p style={{ marginBottom: '2rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
            Макет <strong>label-out-primary</strong>: подпись над рамкой, поле, под полем — helper или ошибка (caption). Внутри — <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>Input</code>. Плавающий label внутри рамки — <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>FloatingInputField</code>.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="setup" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Подключение в проекте
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>turbo-ui/input-field</code>, тема один раз. Только инпут без подписи — <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>turbo-ui/input</code>.
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
                {`import 'turbo-ui/styles/theme';
import { InputField } from 'turbo-ui/input-field';

<InputField label="Email" helperText="Подсказка" placeholder="you@example.com" type="email" />`}
              </SyntaxHighlighter>
            </div>
            <p style={{ fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Контракт: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>specs/004-input-label-out-primary/contracts/input-field.md</code>.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="import" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Импорт
            </h2>
            <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
              <SyntaxHighlighter
                language="tsx"
                style={oneLight}
                customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }}
                codeTagProps={{ style: { fontFamily: 'monospace' } }}
                PreTag="div"
                useInlineStyles={true}
              >
                {`import { InputField } from 'turbo-ui/input-field';
import { InputField } from 'src/ui/input-field';`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock
              code={`<InputField label="Label" helperText="Helper text" placeholder="Placeholder" />`}
            >
              <div style={{ flex: '0 0 320px', width: '320px', maxWidth: '100%', display: 'flex', gap: '1rem', alignItems: 'stretch', boxSizing: 'border-box' }}>
                <InputField label="Label" helperText="Helper text" placeholder="Placeholder" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="all-props" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Все пропсы
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              ref на <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;input&gt;</code>. Слоты: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>label</code>, <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>helperText</code>, <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>errorText</code>.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="integration" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Интеграция: ref и нативные атрибуты
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>ref</code> — на <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;input&gt;</code>. Helper и ошибка цепляются через <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-describedby</code>.
            </p>
            <ExampleBlock
              code={`const ref = useRef<HTMLInputElement>(null);
<InputField ref={ref} label="Поле" helperText="Подсказка" data-testid="input-field-ref" />
<Button onClick={() => ref.current?.focus()}>Фокус в поле</Button>`}
            >
              <RefExample />
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="theme-scope" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Тема и изоляция
            </h2>
            <p style={{ marginBottom: 0, fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Тема: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>TurboUIProvider</code>. Изоляция: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>scopeClassName</code>.{' '}
              <a href="https://github.com/johnpostman2-design/turbo-ui#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--content-brand)' }}>
                README
              </a>
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="style-variants" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Вариант label-out-primary
            </h2>
            <ul style={{ marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}>Label над рамкой — label/small по токенам.</li>
              <li style={{ marginBottom: '0.5rem' }}>
                Под полем: helper или error; <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>errorText</code> перекрывает helper.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>Отступы между блоками — spacing из темы.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="size-variants" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Размеры
            </h2>
            <ul style={{ marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>small</strong> — высота поля 32px
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>medium</strong> — 40px (по умолчанию)
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>large</strong> — 48px
              </li>
            </ul>
            <ExampleBlock
              code={`<InputField size="small" label="Small" helperText="…" placeholder="…" />
<InputField size="medium" label="Medium" helperText="…" placeholder="…" />
<InputField size="large" label="Large" helperText="…" placeholder="…" />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <InputField size="small" label="Small" helperText="Helper" placeholder="32px" />
                <InputField size="medium" label="Medium" helperText="Helper" placeholder="40px" />
                <InputField size="large" label="Large" helperText="Helper" placeholder="48px" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="error-helper" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Ошибка и подсказка
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Ошибка важнее подсказки; при ошибке — красная рамка и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-invalid</code>.
            </p>
            <ExampleBlock
              code={`<InputField label="Email" helperText="Подсказка" placeholder="you@example.com" />
<InputField label="Email" errorText="Некорректный адрес" error defaultValue="bad" />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <InputField label="Email" helperText="Подсказка" placeholder="you@example.com" />
                <InputField label="Email" errorText="Некорректный адрес" error defaultValue="bad" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="with-icons" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Иконки
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Те же <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>leftIcon</code> и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>endAdornment</code>, что у <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>Input</code>.
            </p>
            <ExampleBlock
              code={`<InputField label="Поиск" helperText="Подсказка" leftIcon={leftIcon} endAdornment={endAdornment} placeholder="Запрос" />`}
            >
              <div style={{ width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <InputField label="Поиск" helperText="Подсказка" leftIcon={leftIcon} endAdornment={endAdornment} placeholder="Запрос" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="disabled" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Состояние блокировки
            </h2>
            <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>disabled</code>: поле, кнопка справа, подпись и helper — в состоянии «выкл.».
            </p>
            <ExampleBlock
              code={`<InputField disabled label="Label" helperText="Helper" placeholder="Недоступно" />`}
            >
              <div style={{ width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <InputField disabled label="Label" helperText="Helper" placeholder="Недоступно" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="input-field-docs-menu"
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
            <a href="#import" onClick={(e) => handleMenuClick(e, 'import')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Импорт
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#setup" onClick={(e) => handleMenuClick(e, 'setup')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Подключение в проекте
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#all-props" onClick={(e) => handleMenuClick(e, 'all-props')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Все пропсы
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#integration" onClick={(e) => handleMenuClick(e, 'integration')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Интеграция
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#theme-scope" onClick={(e) => handleMenuClick(e, 'theme-scope')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Тема и изоляция
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#style-variants" onClick={(e) => handleMenuClick(e, 'style-variants')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Вариант label-out-primary
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#size-variants" onClick={(e) => handleMenuClick(e, 'size-variants')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Размеры
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#error-helper" onClick={(e) => handleMenuClick(e, 'error-helper')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Ошибка и подсказка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#with-icons" onClick={(e) => handleMenuClick(e, 'with-icons')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Иконки
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#disabled" onClick={(e) => handleMenuClick(e, 'disabled')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Состояние блокировки
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
