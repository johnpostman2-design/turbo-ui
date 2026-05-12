import React, { useState } from 'react';
import { SelectField } from './SelectField';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl = 'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=829-499';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/select-field';

const setupCode = `import 'turbo-ui/styles/theme';
import { SelectField } from 'turbo-ui/select-field';`;

const importCode = `import { SelectField } from 'turbo-ui/select-field';
import { SelectField } from 'src/ui/select-field';`;

const cities = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
];

const codeStyle: React.CSSProperties = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: '4px',
};

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'label', type: 'string', description: 'Подпись над триггером; связь по id/htmlFor.', default: '—' },
    { name: 'helperText', type: 'string', description: 'Подсказка под полем; скрывается при errorText.', default: '—' },
    { name: 'errorText', type: 'string', description: 'Ошибка под полем (role="alert"), приоритет над helperText.', default: '—' },
    { name: 'options', type: 'ListboxOption[]', description: 'Опции выпадающего списка.', default: '—' },
    { name: 'value', type: 'string', description: 'Controlled значение.', default: '—' },
    { name: 'defaultValue', type: 'string', description: 'Uncontrolled начальное значение.', default: '—' },
    { name: 'onChange', type: '(value: string) => void', description: 'Смена значения.', default: '—' },
    { name: 'size', type: '"small" | "medium" | "large"', description: 'Высота триггера.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокирует триггер и helper-блок. Подавляет aria-invalid.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка-визуал без текста.', default: 'false' },
    { name: 'placeholder', type: 'ReactNode', description: 'Текст пустого триггера.', default: '"Выберите"' },
    { name: 'positions', type: 'SelectPosition | SelectPosition[]', description: 'Размещение панели.', default: '—' },
    { name: 'menuMaxHeight', type: 'string', description: 'Максимальная высота панели.', default: '—' },
    { name: 'search', type: 'boolean', description: 'Поиск внутри Listbox.', default: 'false' },
    { name: 'className', type: 'string', description: 'Класс на корне обёртки.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLButtonElement>', description: 'На <button>-триггер.', default: '—' },
    { name: '…rest', type: 'SelectProps', description: 'Остальные пропсы Select пробрасываются без изменений.', default: '—' },
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
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'var(--weight-regular)', color: '#999', border: 'none' }}>Имя</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'var(--weight-regular)', color: '#999', border: 'none' }}>Описание</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: 'var(--family-brand)', fontSize: '0.875rem', fontWeight: 'var(--weight-regular)', color: '#999', width: '22.5%', border: 'none' }}>По умолчанию</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={prop.name} style={{ background: '#ffffff', borderBottom: index < props.length - 1 ? '1px solid #b0b0b0' : 'none' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--foreground)', verticalAlign: 'top', fontWeight: 'var(--weight-regular)', borderLeft: 'none', borderRight: 'none' }}>{prop.name}</td>
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

export function SelectFieldDocsPage() {
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
        <div style={{ flex: '1', minWidth: '200px', maxWidth: '320px' }}>
          <SelectField ref={ref} label="Город" options={cities} placeholder="Фокус по кнопке" />
        </div>
        <Button variant="backless" startIcon={null} endIcon={null} onClick={() => ref.current?.focus()}>
          Фокус в поле
        </Button>
      </div>
    );
  };

  const ControlledDemo = () => {
    const [v, setV] = useState('');
    return <SelectField label="Город" options={cities} value={v} onChange={setV} placeholder="Выберите" helperText="Helper text" />;
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '80px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: 'calc(240px + 80px + 20px)', boxSizing: 'border-box' }}>
        <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
          <h1 id="select-field-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            SelectField
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
            Выпадающий список с подписью сверху и подсказкой снизу.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="setup" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Подключение в проекте
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>turbo-ui/select-field</code>, тема один раз. Только триггер без подписи — <code style={codeStyle}>turbo-ui/select</code>.
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
                {setupCode}
              </SyntaxHighlighter>
            </div>
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
                {importCode}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock
              code={`<SelectField label="Город" options={cities} value={v} onChange={setV} placeholder="Выберите" helperText="Helper text" />`}
            >
              <div style={{ flex: '0 0 320px', width: '320px', maxWidth: '100%', display: 'flex', gap: '1rem', alignItems: 'stretch', boxSizing: 'border-box' }}>
                <ControlledDemo />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="all-props" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Все пропсы
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>ref</code> — на <code style={codeStyle}>&lt;button&gt;</code>-триггер. Слоты: <code style={codeStyle}>label</code>, <code style={codeStyle}>helperText</code>, <code style={codeStyle}>errorText</code>. Ширина триггера — те же <code style={codeStyle}>triggerWidth</code> / <code style={codeStyle}>triggerMaxWidth</code> / <code style={codeStyle}>style</code>, что у <code style={codeStyle}>Select</code>; <code style={codeStyle}>className</code> на обёртке — только корень (лейбл + поле + хелпер).
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="integration" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Интеграция: ref и нативные атрибуты
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>ref</code> смотрит на <code style={codeStyle}>&lt;button&gt;</code>-триггер. Helper и ошибка цепляются через <code style={codeStyle}>aria-describedby</code>.
            </p>
            <ExampleBlock
              code={`const ref = useRef<HTMLButtonElement>(null);
<SelectField ref={ref} label="Город" options={cities} />
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
              Тема: <code style={codeStyle}>TurboUIProvider</code>. Изоляция: <code style={codeStyle}>scopeClassName</code>.{' '}
              <a href="https://github.com/johnpostman2-design/turbo-ui#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--content-brand)' }}>
                README
              </a>
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="size-variants" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Размеры
            </h2>
            <ul style={{ marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>small</code> — компактный триггер, высота 32px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>size</code> — базовый размер по умолчанию, высота 40px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>large</code> — крупный триггер, высота 48px</li>
            </ul>
            <ExampleBlock
              code={`<SelectField size="small"  label="Small"  options={cities} />
<SelectField size="medium" label="Medium" options={cities} />
<SelectField size="large"  label="Large"  options={cities} />`}
            >
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ flex: '1 1 160px', minWidth: '160px' }}>
                  <SelectField size="small" label="Small" options={cities} placeholder="32px" />
                </div>
                <div style={{ flex: '1 1 160px', minWidth: '160px' }}>
                  <SelectField size="medium" label="Medium" options={cities} placeholder="40px" />
                </div>
                <div style={{ flex: '1 1 160px', minWidth: '160px' }}>
                  <SelectField size="large" label="Large" options={cities} placeholder="48px" />
                </div>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="error-helper" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Ошибка и подсказка
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Ошибка важнее подсказки; при ошибке — красная рамка и <code style={codeStyle}>aria-invalid</code>.
            </p>
            <ExampleBlock
              code={`<SelectField label="Город" options={cities} helperText="Можно выбрать только один" />
<SelectField label="Страна" options={cities} errorText="Поле обязательно" />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <SelectField label="Город" options={cities} helperText="Можно выбрать только один" />
                <SelectField label="Страна" options={cities} errorText="Поле обязательно" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="disabled" style={{ marginBottom: '0.25rem', textDecoration: 'none', borderBottom: 'none', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Состояние блокировки
            </h2>
            <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', color: '#000000' }}>
              <code style={codeStyle}>disabled</code>: триггер, подпись и helper — в состоянии «выкл.». <code style={codeStyle}>aria-invalid</code> подавляется.
            </p>
            <ExampleBlock
              code={`<SelectField disabled label="Сортировка" options={sizes} helperText="Helper" defaultValue="asc" />`}
            >
              <div style={{ width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <SelectField disabled label="Сортировка" options={cities} helperText="Недоступно" defaultValue="msk" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="select-field-docs-menu"
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
          {[
            ['import', 'Импорт'],
            ['setup', 'Подключение в проекте'],
            ['all-props', 'Все пропсы'],
            ['integration', 'Интеграция'],
            ['theme-scope', 'Тема и изоляция'],
            ['size-variants', 'Размеры'],
            ['error-helper', 'Ошибка и подсказка'],
            ['disabled', 'Состояние блокировки'],
          ].map(([id, title]) => (
            <li key={id} style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
              <a href={`#${id}`} onClick={(e) => handleMenuClick(e, id)} style={{ color: '#000000', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease', cursor: 'pointer' }}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
