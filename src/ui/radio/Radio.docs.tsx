import React, { useRef, useState } from 'react';
import { Radio } from './Radio';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=794-352';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/radio';

function focusInputVisible(el: HTMLInputElement | null) {
  if (!el) return;
  (el.focus as (options?: { preventScroll?: boolean; focusVisible?: boolean }) => void)({ focusVisible: true });
}

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'size', type: '"small" | "medium" | "large"', description: 'Индикатор и типографика подписи.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Нельзя выбрать; hover без смены вида.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка: обводка, aria-invalid.', default: 'false' },
    { name: 'label', type: 'ReactNode', description: 'Подпись справа.', default: '—' },
    { name: 'children', type: 'ReactNode', description: 'Вместо label.', default: '—' },
    { name: 'name', type: 'string', description: 'Одно имя на всю группу.', default: '—' },
    { name: 'value', type: 'string', description: 'Значение этого пункта.', default: '—' },
    { name: 'checked', type: 'boolean', description: 'Controlled: выбран ли пункт.', default: '—' },
    { name: 'defaultChecked', type: 'boolean', description: 'Начальный выбор (uncontrolled).', default: '—' },
    { name: 'onChange', type: 'ChangeEventHandler', description: 'Реакция на выбор.', default: '—' },
    { name: 'className', type: 'string', description: 'Класс на корневой label.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLInputElement>', description: 'На нативный input.', default: '—' },
    { name: '…rest', type: 'input radio attrs', description: 'aria-label, data-* — на input.', default: '—' },
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

function RadioFocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [demoFocusRing, setDemoFocusRing] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Radio
        ref={inputRef}
        demoFocusRing={demoFocusRing}
        name="docs-focus"
        value="x"
        label="Пример с программным фокусом"
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

const setupImport = `import 'turbo-ui/styles/theme';
import { Radio } from 'turbo-ui/radio';`;

const setupOneRadioCode = `${setupImport}

<Radio name="news" value="daily" label="Раз в день" />`;

const setupTwoRadioCode = `${setupImport}

<Radio name="align" value="left" label="Слева" />
<Radio name="align" value="right" defaultChecked label="Справа" />`;

const setupControlledCode = `import 'turbo-ui/styles/theme';
import { useState } from 'react';
import { Radio } from 'turbo-ui/radio';

function Field() {
  const [v, setV] = useState<'yes' | 'no'>('yes');
  return (
    <>
      <Radio name="paid" value="yes" checked={v === 'yes'} onChange={() => setV('yes')} label="Да" />
      <Radio name="paid" value="no" checked={v === 'no'} onChange={() => setV('no')} label="Нет" />
    </>
  );
}`;

function RadioOneDemo() {
  return <Radio name="docs-one" value="daily" label="Раз в день" />;
}

function RadioTwoUncontrolledDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <Radio name="docs-pair" value="left" label="Слева" />
      <Radio name="docs-pair" value="right" defaultChecked label="Справа" />
    </div>
  );
}

function RadioTwoControlledDemo() {
  const [value, setValue] = useState<'yes' | 'no'>('yes');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <Radio name="docs-ctl" value="yes" checked={value === 'yes'} onChange={() => setValue('yes')} label="Да" />
      <Radio name="docs-ctl" value="no" checked={value === 'no'} onChange={() => setValue('no')} label="Нет" />
    </div>
  );
}

export function RadioDocsPage() {
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
          <h1 id="radio-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            Radio
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

          <div
            style={{
              marginBottom: '2rem',
              fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
              fontSize: 'var(--text-base, 15px)',
              lineHeight: '1.55',
              color: '#000000',
            }}
          >
            <p style={{ margin: '0 0 0.65rem' }}>
              Радио — выбор <strong>одного</strong> значения из набора. Правила как у HTML: общий <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>name</code>, свой <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>value</code> у каждого пункта.
            </p>
            <ul
              style={{
                margin: '0 0 0.65rem',
                paddingLeft: '1.25rem',
                listStyleType: 'disc',
              }}
            >
              <li style={{ marginBottom: '0.35rem' }}>
                <strong>Без стейта в React</strong> — не передаёте <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>checked</code>: кто выбран, переключает браузер (часто хватает <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>defaultChecked</code> у одного пункта).
              </li>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong>Controlled</strong> — значение в стейте родителя, на каждый пункт <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>checked</code> и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>onChange</code>.
              </li>
              <li style={{ marginBottom: 0 }}>
                Один <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>Radio</code> на экране — нормально (группа из одного варианта; позже рядом добавят остальные с тем же <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>name</code>).
              </li>
            </ul>
            <p style={{ margin: '0 0 0.65rem' }}>
              Внутри — нативный <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>input type=&quot;radio&quot;</code>: форма, фокус, скринридер — как у обычного поля.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Визуал:</strong> три размера, только токены темы. Hover меняет вид только у <strong>невыбранного</strong> пункта. <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>error</code> и <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>disabled</code> — по макету Figma. Подпись — <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>label</code>; без текста у пункта — <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>aria-label</code>.
            </p>
          </div>

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
            <p style={{ fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', marginBottom: '0.75rem' }}>
              Три примера снизу — по нарастанию: <strong>одна кнопка</strong>, <strong>две без useState</strong> (браузер ведёт выбор), <strong>controlled</strong> (стейт у вас). Копируйте тот блок, который совпадает с задачей.
            </p>

            <p style={{ fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 600, color: '#000000', marginBottom: '0.35rem' }}>
              Одна радиокнопка
            </p>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '0.75rem',
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
                {setupOneRadioCode}
              </SyntaxHighlighter>
            </div>
            <ExampleBlock code={setupOneRadioCode}>
              <RadioOneDemo />
            </ExampleBlock>

            <p style={{ fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 600, color: '#000000', marginBottom: '0.35rem', marginTop: '1.25rem' }}>
              Два пункта, без React-стейта
            </p>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '0.75rem',
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
                {setupTwoRadioCode}
              </SyntaxHighlighter>
            </div>
            <ExampleBlock code={setupTwoRadioCode}>
              <RadioTwoUncontrolledDemo />
            </ExampleBlock>

            <p style={{ fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 600, color: '#000000', marginBottom: '0.35rem', marginTop: '1.25rem' }}>
              Выбор из стейта (controlled)
            </p>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '0.75rem',
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
                {setupControlledCode}
              </SyntaxHighlighter>
            </div>
            <ExampleBlock code={setupControlledCode}>
              <RadioTwoControlledDemo />
            </ExampleBlock>

            <p style={{ fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', marginTop: '1rem', marginBottom: 0 }}>
              Контракт:{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>specs/008-radio/contracts/radio.md</code>.
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
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>&lt;input type=&quot;radio&quot;&gt;</code>.
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
              <strong>small</strong>, <strong>medium</strong> (по умолчанию), <strong>large</strong> — токены <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>radio.sizes</code>.
            </p>
            <ExampleBlock
              code={`<Radio size="small" name="s" value="1" defaultChecked label="Small" />
<Radio size="medium" name="m" value="1" defaultChecked label="Medium" />
<Radio size="large" name="l" value="1" defaultChecked label="Large" />`}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Radio size="small" name="docs-sz-s" value="1" defaultChecked label="Small" />
                <Radio size="medium" name="docs-sz-m" value="1" defaultChecked label="Medium" />
                <Radio size="large" name="docs-sz-l" value="1" defaultChecked label="Large" />
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
              Кольцо при <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>:focus-visible</code>. <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>demoFocusRing</code> — только для примера с кнопками ниже.
            </p>
            <ExampleBlock code="// см. исходник Radio.docs.tsx — RadioFocusDemo">
              <RadioFocusDemo />
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
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>error</code> — подсветка ошибки. <code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>disabled</code> — без смены вида по hover.
            </p>
            <ExampleBlock
              code={`<Radio name="x" value="1" error label="Ошибка" />
<Radio name="x2" value="1" disabled label="Disabled" />
<Radio name="x3" value="1" disabled checked label="Disabled выбран" />`}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Radio name="docs-st-1" value="1" error label="Ошибка" />
                <Radio name="docs-st-2" value="1" disabled label="Disabled" />
                <Radio name="docs-st-3" value="1" disabled checked label="Disabled выбран" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="radio-docs-menu"
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
              Состояния
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
