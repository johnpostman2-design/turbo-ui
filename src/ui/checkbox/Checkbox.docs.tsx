import React, { useRef, useState } from 'react';
import { Checkbox } from './Checkbox';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=761-112';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/checkbox';

/** focusVisible в FocusOptions есть в браузерах; в старых lib.dom тип может отсутствовать. */
function focusInputVisible(el: HTMLInputElement | null) {
  if (!el) return;
  (el.focus as (options?: { preventScroll?: boolean; focusVisible?: boolean }) => void)({ focusVisible: true });
}

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'size', type: '"small" | "medium" | "large"', description: 'Размер квадрата.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокирует переключение.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка: рамка + aria-invalid.', default: 'false' },
    { name: 'indeterminate', type: 'boolean', description: 'Частичный выбор (линия вместо галочки).', default: 'false' },
    { name: 'label', type: 'ReactNode', description: 'Текст рядом с контролом (типографика Label по размеру).', default: '—' },
    { name: 'children', type: 'ReactNode', description: 'То же, что label, если label не задан.', default: '—' },
    { name: 'checked', type: 'boolean', description: 'Controlled.', default: '—' },
    { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled.', default: '—' },
    { name: 'onChange', type: 'ChangeEventHandler', description: 'Смена значения.', default: '—' },
    { name: 'className', type: 'string', description: 'Класс на корневой label.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLInputElement>', description: 'На нативный input.', default: '—' },
    { name: '…rest', type: 'input checkbox attrs', description: 'aria-label, name, value, data-* — на input.', default: '—' },
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
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0' }}>
            <thead>
              <tr style={{ background: '#ffffff', borderTop: 'none' }}>
                <th
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--family-brand)',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold',
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
                    borderBottom: index < props.length - 1 ? '1px solid #b0b0b0' : 'none',
                  }}
                >
                  <td
                    style={{
                      padding: '1rem',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: 'var(--foreground)',
                      verticalAlign: 'top',
                      fontWeight: 'bold',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
                  >
                    {prop.name}
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top', borderLeft: 'none', borderRight: 'none' }}>
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

function CheckboxFocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [demoFocusRing, setDemoFocusRing] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Checkbox
        ref={inputRef}
        demoFocusRing={demoFocusRing}
        label="Пример чекбокса с программным фокусом"
        onBlur={() => setDemoFocusRing(false)}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          type="button"
          variant="secondary"
          size="small"
          startIcon={null}
          endIcon={null}
          onClick={() => {
            setDemoFocusRing(true);
            focusInputVisible(inputRef.current);
          }}
        >
          Дать фокус
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          startIcon={null}
          endIcon={null}
          onClick={() => {
            inputRef.current?.blur();
            setDemoFocusRing(false);
          }}
        >
          Забрать фокус
        </Button>
      </div>
    </div>
  );
}

export function CheckboxDocsPage() {
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
          <h1 id="checkbox-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Checkbox
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
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
            Флажок да/нет и режим «частично выбрано». Три размера, состояния hover, focus, disabled, error. Без
            текста рядом передайте <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-label</code>.
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
import { Checkbox } from 'turbo-ui/checkbox';

<Checkbox label="Согласие" />`}
              </SyntaxHighlighter>
            </div>
            <p style={{ fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Контракт: <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>specs/007-checkbox/contracts/checkbox.md</code>.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock code={`<Checkbox size="medium" defaultChecked label="Пример" />`}>
              <Checkbox size="medium" defaultChecked label="Пример" />
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
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>ref</code> ведёт на{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;input type="checkbox"&gt;</code>.
            </p>
            <CollapsiblePropsList />
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
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <strong>small</strong>, <strong>medium</strong> (по умолчанию), <strong>large</strong> — стороны квадрата из токенов.
            </p>
            <ExampleBlock
              code={`<Checkbox size="small" label="Small" defaultChecked />
<Checkbox size="medium" label="Medium" defaultChecked />
<Checkbox size="large" label="Large" defaultChecked />`}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Checkbox size="small" label="Small" defaultChecked />
                <Checkbox size="medium" label="Medium" defaultChecked />
                <Checkbox size="large" label="Large" defaultChecked />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="focus"
              style={{
                marginBottom: '0.25rem',
                textDecoration: 'none',
                borderBottom: 'none',
                fontFamily: 'var(--family-brand)',
                color: '#000000',
              }}
            >
              Focus
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Фокус с клавиатуры — Tab на чекбокс. Кнопки показывают и снимают фокус на нативном input (
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                {'focus({ focusVisible: true })'}
              </code>
              {' / '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px', fontFamily: 'monospace' }}>blur()</code>
              ). В компоненте рамка только при <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>:focus-visible</code> на
              input (Tab). Для кнопок в примере — состояние <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>demoFocusRing</code>{' '}
              (только доки/Storybook). Рамка <strong>2px</strong>:{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>--border-primary</code> /{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>--border-error</code>.
            </p>
            <ExampleBlock
              code={`const inputRef = useRef<HTMLInputElement>(null);
const [demoFocusRing, setDemoFocusRing] = useState(false);

<Checkbox
  ref={inputRef}
  demoFocusRing={demoFocusRing}
  onBlur={() => setDemoFocusRing(false)}
  label="…"
/>
<Button
  type="button"
  onClick={() => {
    setDemoFocusRing(true);
    focusInputVisible(inputRef.current);
  }}
>
  Дать фокус
</Button>
<Button
  type="button"
  onClick={() => {
    inputRef.current?.blur();
    setDemoFocusRing(false);
  }}
>
  Забрать фокус
</Button>`}
            >
              <CheckboxFocusDemo />
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
              Состояния и значение
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>error</code> — рамка ошибки.{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>indeterminate</code> — линия (частичный выбор); после клика снимается в браузере — обновляйте проп в родителе.{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>disabled</code> — оба значения: выключен и включён.
            </p>
            <ExampleBlock
              code={`<Checkbox error label="Ошибка" />
<Checkbox indeterminate label="Частично" />
<Checkbox disabled label="Отключено (false)" />
<Checkbox disabled checked label="Отключено (true)" />`}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Checkbox error label="Ошибка" />
                <Checkbox indeterminate label="Частично" />
                <Checkbox disabled label="Отключено (false)" />
                <Checkbox disabled checked label="Отключено (true)" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="checkbox-docs-menu"
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
              style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}
            >
              Подключение
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#all-props"
              onClick={(e) => handleMenuClick(e, 'all-props')}
              style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}
            >
              Пропсы
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#sizes"
              onClick={(e) => handleMenuClick(e, 'sizes')}
              style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}
            >
              Размеры
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#focus"
              onClick={(e) => handleMenuClick(e, 'focus')}
              style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}
            >
              Focus
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a
              href="#states"
              onClick={(e) => handleMenuClick(e, 'states')}
              style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}
            >
              Состояния и значение
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
