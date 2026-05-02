import React, { useState } from 'react';
import { TextArea } from './TextArea';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl = 'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=559-3795';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/textarea';

const ROWS_SCROLL_DEMO = Array.from({ length: 16 }, (_, i) => `Строка ${i + 1}`).join('\n');

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'size', type: '"small" | "medium"', description: 'Минимальная высота и типографика.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокирует ввод и resize.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка: рамка + aria-invalid.', default: 'false' },
    { name: 'errorText', type: 'string', description: 'Текст под полем; приоритет над helperText.', default: '—' },
    { name: 'helperText', type: 'string', description: 'Подсказка под полем.', default: '—' },
    { name: 'value', type: 'string', description: 'Controlled.', default: '—' },
    { name: 'defaultValue', type: 'string', description: 'Uncontrolled, начальное.', default: '—' },
    { name: 'onChange', type: 'ChangeEventHandler<HTMLTextAreaElement>', description: 'Смена значения.', default: '—' },
    { name: 'className', type: 'string', description: 'Класс на корневой обёртке.', default: '—' },
    { name: 'rows', type: 'number', description: 'Сколько строк видно. Лишний текст — скролл. Без rows — высота от size.', default: '—' },
    { name: 'width', type: "number | string", description: 'Ширина рамки: число = px, строка = % или rem.', default: '—' },
    { name: 'maxWidth', type: "number | string", description: 'Потолок ширины рамки.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLTextAreaElement>', description: 'На DOM <textarea>.', default: '—' },
    { name: '…rest', type: 'HTML textarea attrs', description: 'Остальное — на <textarea>.', default: '—' },
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

export function TextAreaDocsPage() {
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
    const ref = React.useRef<HTMLTextAreaElement>(null);
    return (
      <div
        style={{
          display: 'flex',
          columnGap: '1rem',
          rowGap: '0.125rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexShrink: 0,
        }}
      >
        <TextArea ref={ref} placeholder="Фокус по кнопке" data-testid="textarea-ref" style={{ maxWidth: '280px' }} />
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
          <h1 id="textarea-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>TextArea</h1>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(figmaUrl, '_blank', 'noopener,noreferrer')}>
              Figma
            </Button>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}>
              GitHub
            </Button>
          </div>

          <p style={{ marginBottom: '2rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
            Многострочное поле: рамка, placeholder, small и medium, ошибка и подсказка снизу. Подпись сверху — отдельный <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;label&gt;</code>.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="setup" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Подключение в проекте
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>turbo-ui/textarea</code>, тема подключается один раз.
            </p>
            <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box', marginBottom: '1rem' }}>
              <SyntaxHighlighter language="tsx" style={oneLight} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }} codeTagProps={{ style: { fontFamily: 'monospace' } }} PreTag="div" useInlineStyles={true}>
                {`import 'turbo-ui/styles/theme';
import { TextArea } from 'turbo-ui/textarea';

<TextArea placeholder="Описание" />
<TextArea error errorText="Обязательное поле" />`}
              </SyntaxHighlighter>
            </div>
            <p style={{ fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Контракт: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>specs/006-textarea/contracts/textarea.md</code>.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="import" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Импорт
            </h2>
            <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
              <SyntaxHighlighter language="tsx" style={oneLight} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }} codeTagProps={{ style: { fontFamily: 'monospace' } }} PreTag="div" useInlineStyles={true}>
                {`import { TextArea } from 'turbo-ui/textarea';
import { TextArea } from 'src/ui/textarea';`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock code={`<TextArea placeholder="Placeholder" size="medium" />`}>
              <div style={{ flex: '0 0 320px', width: '320px', maxWidth: '100%', display: 'flex', gap: '1rem', alignItems: 'stretch', boxSizing: 'border-box' }}>
                <TextArea placeholder="Placeholder" size="medium" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="all-props" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Все пропсы
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>ref</code> смотрит на нативный <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;textarea&gt;</code>.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="integration" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Интеграция: ref и нативные атрибуты
            </h2>
            <ExampleBlock code={`const ref = useRef<HTMLTextAreaElement>(null);
<TextArea ref={ref} placeholder="Поле" data-testid="textarea-ref" />
<Button onClick={() => ref.current?.focus()}>Фокус в поле</Button>`}>
              <RefExample />
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="theme-scope" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Тема и изоляция
            </h2>
            <p style={{ marginBottom: 0, fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Тема: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>TurboUIProvider</code>. Подробности —{' '}
              <a href="https://github.com/johnpostman2-design/turbo-ui#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--content-brand)' }}>
                README
              </a>
              .
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="style-variants" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Варианты
            </h2>
            <ExampleBlock code={`<TextArea placeholder="Placeholder" />
<TextArea error errorText="Error name" defaultValue="Value" />
<TextArea helperText="Подсказка" />
<TextArea disabled defaultValue="Value" />`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <TextArea placeholder="Placeholder" />
                <TextArea error errorText="Error name" defaultValue="Value" />
                <TextArea helperText="Подсказка" />
                <TextArea disabled defaultValue="Value" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="size-variants" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Размеры
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <strong>small</strong> — минимум 64px по высоте. <strong>medium</strong> — 100px, стоит по умолчанию.
            </p>
            <ExampleBlock code={`<TextArea size="small" placeholder="Small" />
<TextArea size="medium" placeholder="Medium" />`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <TextArea size="small" placeholder="Small" />
                <TextArea size="medium" placeholder="Medium" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="field-height" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Высота поля
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>rows</code> — сколько строк видно без прокрутки. Текста больше — скролл внутри поля. Без <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>rows</code> минимальная высота от <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>size</code>.
            </p>
            <ExampleBlock
              code={`const text = 'Строка 1\\nСтрока 2\\n…'; // длинный текст — скролл

<TextArea rows={4} defaultValue={text} />`}
            >
              <div style={{ width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <TextArea rows={4} placeholder="Четыре строки видны" defaultValue={ROWS_SCROLL_DEMO} size="medium" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="field-width" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Ширина
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>width</code> и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>maxWidth</code> вешаются на блок с рамкой: число — пиксели, строка — проценты или rem. Тот же эффект даст <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>style</code> с этими полями (они уходят на корень).
            </p>
            <ExampleBlock
              code={`<TextArea width="50%" placeholder="Половина контейнера" />
<TextArea width={280} placeholder="280px" size="small" />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <TextArea width="50%" placeholder="Половина контейнера (50%)" size="medium" />
                <TextArea width={280} placeholder="280px" size="small" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="textarea-docs-menu"
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
              Варианты
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#size-variants" onClick={(e) => handleMenuClick(e, 'size-variants')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Размеры
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#field-height" onClick={(e) => handleMenuClick(e, 'field-height')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Высота поля
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#field-width" onClick={(e) => handleMenuClick(e, 'field-width')} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
              Ширина
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
