import React, { useState } from 'react';
import { ComboBoxField } from './ComboBoxField';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl = 'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=829-499';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/combobox-field';

const setupCode = `import 'turbo-ui/styles/theme';
import { ComboBoxField } from 'turbo-ui/combobox-field';`;

const importCode = `import { ComboBoxField } from 'turbo-ui/combobox-field';
import { ComboBoxField } from 'src/ui/combobox-field';`;

const airports = [
  { value: 'SVO', label: 'Москва (SVO)' },
  { value: 'LED', label: 'Санкт-Петербург (LED)' },
  { value: 'OVB', label: 'Новосибирск (OVB)' },
  { value: 'KZN', label: 'Казань (KZN)' },
];

const codeStyle: React.CSSProperties = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: '4px',
};

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props = [
    { name: 'label', type: 'string', description: 'Подпись над полем.', default: '—' },
    { name: 'helperText', type: 'string', description: 'Подсказка под полем; скрывается при errorText.', default: '—' },
    { name: 'errorText', type: 'string', description: 'Ошибка под полем; приоритет над helperText.', default: '—' },
    { name: 'options', type: 'ComboBoxOption[]', description: 'Список подсказок.', default: '—' },
    { name: 'value', type: 'string', description: 'Controlled значение.', default: '—' },
    { name: 'onChange', type: '(next: string) => void', description: 'Смена значения.', default: '—' },
    { name: 'multiline', type: 'boolean', description: 'Многострочное поле (textarea).', default: 'false' },
    { name: 'mask', type: 'string', description: 'Маска ввода (символы X — цифры).', default: '—' },
    { name: 'clearable', type: 'boolean', description: 'Кнопка очистки справа.', default: 'true' },
    { name: 'highlightMatch', type: 'boolean', description: 'Подсветка совпадающих символов.', default: 'false' },
    { name: 'borderless', type: 'boolean', description: 'Поле без обводки.', default: 'false' },
    { name: 'startIcon', type: 'ReactNode', description: 'Иконка слева.', default: '—' },
    { name: 'size', type: '"small" | "medium" | "large"', description: 'Высота поля.', default: '"medium"' },
    { name: 'disabled', type: 'boolean', description: 'Блокирует поле. Подавляет aria-invalid.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Ошибка-визуал без текста.', default: 'false' },
    { name: 'className', type: 'string', description: 'Класс на корне обёртки.', default: '—' },
    { name: 'ref', type: 'RefObject<HTMLInputElement | HTMLTextAreaElement>', description: 'На <input> или <textarea> в зависимости от multiline.', default: '—' },
    { name: '…rest', type: 'ComboBoxProps', description: 'Остальные пропсы ComboBox пробрасываются без изменений.', default: '—' },
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

export function ComboBoxFieldDocsPage() {
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
    const ref = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
        <div style={{ flex: '1', minWidth: '200px', maxWidth: '320px' }}>
          <ComboBoxField ref={ref} label="Аэропорт" options={airports} placeholder="Фокус по кнопке" />
        </div>
        <Button variant="backless" startIcon={null} endIcon={null} onClick={() => ref.current?.focus()}>
          Фокус в поле
        </Button>
      </div>
    );
  };

  const ControlledDemo = () => {
    const [v, setV] = useState('');
    return (
      <ComboBoxField
        label="Аэропорт"
        options={airports}
        value={v}
        onChange={setV}
        placeholder="Поиск аэропорта"
        helperText="Helper text"
      />
    );
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '80px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: 'calc(240px + 80px + 20px)', boxSizing: 'border-box' }}>
        <div style={{ flex: '1', minWidth: 0, maxWidth: '100%' }}>
          <h1 id="combobox-field-title" style={{ marginBottom: 'var(--spacing-32)', marginTop: 0 }}>
            ComboBoxField
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
            Поле ввода с выпадающими подсказками, подписью сверху и подсказкой снизу.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="setup" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Подключение в проекте
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>turbo-ui/combobox-field</code>, тема один раз. Только поле без подписи — <code style={codeStyle}>turbo-ui/combobox</code>.
            </p>
            <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box', marginBottom: '1rem' }}>
              <SyntaxHighlighter language="tsx" style={oneLight} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }} codeTagProps={{ style: { fontFamily: 'monospace' } }} PreTag="div" useInlineStyles>
                {setupCode}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="import" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Импорт
            </h2>
            <div style={{ borderRadius: '8px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
              <SyntaxHighlighter language="tsx" style={oneLight} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: 0, background: '#f5f5f5' }} codeTagProps={{ style: { fontFamily: 'monospace' } }} PreTag="div" useInlineStyles>
                {importCode}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock
              code={`<ComboBoxField label="Аэропорт" options={airports} value={v} onChange={setV} helperText="Helper text" />`}
            >
              <div style={{ flex: '0 0 320px', width: '320px', maxWidth: '100%', display: 'flex', gap: '1rem', alignItems: 'stretch', boxSizing: 'border-box' }}>
                <ControlledDemo />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="all-props" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Все пропсы
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>ref</code> — на <code style={codeStyle}>&lt;input&gt;</code> или <code style={codeStyle}>&lt;textarea&gt;</code> (multiline). Слоты: <code style={codeStyle}>label</code>, <code style={codeStyle}>helperText</code>, <code style={codeStyle}>errorText</code>. <code style={codeStyle}>width</code> / <code style={codeStyle}>maxWidth</code> / <code style={codeStyle}>style</code> — как у <code style={codeStyle}>ComboBox</code>; отдельных пропов ширины у обёртки нет.
            </p>
            <CollapsiblePropsList />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="integration" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Интеграция: ref и нативные атрибуты
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>ref</code> смотрит на нативный <code style={codeStyle}>&lt;input&gt;</code> (или <code style={codeStyle}>&lt;textarea&gt;</code> при <code style={codeStyle}>multiline</code>). Helper и ошибка цепляются через <code style={codeStyle}>aria-describedby</code>.
            </p>
            <ExampleBlock
              code={`const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
<ComboBoxField ref={ref} label="Аэропорт" options={airports} />
<Button onClick={() => ref.current?.focus()}>Фокус в поле</Button>`}
            >
              <RefExample />
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="theme-scope" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
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
            <h2 id="size-variants" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Размеры
            </h2>
            <ul style={{ marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>small</code> — компактное поле, высота 32px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>size</code> — базовый размер по умолчанию, высота 40px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>large</code> — крупное поле, высота 48px</li>
            </ul>
            <ExampleBlock
              code={`<ComboBoxField size="small"  label="Small"  options={airports} />
<ComboBoxField size="medium" label="Medium" options={airports} />
<ComboBoxField size="large"  label="Large"  options={airports} />`}
            >
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ flex: '1 1 180px', minWidth: '180px' }}>
                  <ComboBoxField size="small" label="Small" options={airports} placeholder="32px" />
                </div>
                <div style={{ flex: '1 1 180px', minWidth: '180px' }}>
                  <ComboBoxField size="medium" label="Medium" options={airports} placeholder="40px" />
                </div>
                <div style={{ flex: '1 1 180px', minWidth: '180px' }}>
                  <ComboBoxField size="large" label="Large" options={airports} placeholder="48px" />
                </div>
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="error-helper" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Ошибка и подсказка
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              Ошибка важнее подсказки; при ошибке — красная рамка и <code style={codeStyle}>aria-invalid</code>.
            </p>
            <ExampleBlock
              code={`<ComboBoxField label="Аэропорт" options={airports} helperText="Можно выбрать из списка" />
<ComboBoxField label="IATA код" options={airports} errorText="Введите трёхбуквенный код" />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <ComboBoxField label="Аэропорт" options={airports} helperText="Можно выбрать из списка" placeholder="Поиск" />
                <ComboBoxField label="IATA код" options={airports} errorText="Введите трёхбуквенный код" placeholder="___" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="multiline" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Многострочное и подсветка
            </h2>
            <p style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000' }}>
              <code style={codeStyle}>multiline</code> — поле растёт по выбранному значению. <code style={codeStyle}>highlightMatch</code> подсвечивает совпадения.
            </p>
            <ExampleBlock
              code={`<ComboBoxField multiline label="Подробный адрес" options={airports} />
<ComboBoxField highlightMatch label="Аэропорт" options={airports} />`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '320px', maxWidth: '100%', flexShrink: 0, alignItems: 'stretch', boxSizing: 'border-box' }}>
                <ComboBoxField multiline label="Подробный адрес" options={airports} helperText="Растёт по содержимому" placeholder="Введите адрес" />
                <ComboBoxField highlightMatch label="Аэропорт" options={airports} helperText="Совпадения подсвечиваются" placeholder="Введите запрос" />
              </div>
            </ExampleBlock>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 id="disabled" style={{ marginBottom: '0.25rem', fontFamily: 'var(--family-brand)', color: '#000000' }}>
              Состояние блокировки
            </h2>
            <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', color: '#000000' }}>
              <code style={codeStyle}>disabled</code>: поле, кнопка очистки, подпись и helper — в состоянии «выкл.». <code style={codeStyle}>aria-invalid</code> подавляется.
            </p>
            <ExampleBlock
              code={`<ComboBoxField disabled label="Аэропорт" options={airports} helperText="Недоступно" defaultValue="Москва (SVO)" />`}
            >
              <div style={{ width: '320px', maxWidth: '100%', boxSizing: 'border-box' }}>
                <ComboBoxField disabled label="Аэропорт" options={airports} helperText="Недоступно" defaultValue="Москва (SVO)" />
              </div>
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="combobox-field-docs-menu"
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
            ['multiline', 'Многострочное и подсветка'],
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
