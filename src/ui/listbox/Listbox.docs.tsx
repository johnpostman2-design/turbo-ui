import React, { useState } from 'react';
import { Listbox } from './Listbox';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { Icon } from '../../components/icons/Icon';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=829-1094';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/listbox';

const primaryExampleCode = `import { Listbox } from 'turbo-ui/listbox';

<Listbox
  options={options}
  value={value}
  onChange={setValue}
/>`;

const setupCode = `import 'turbo-ui/styles/theme';
import { Listbox } from 'turbo-ui/listbox';`;

const searchCode = `<Listbox
  search
  searchPlaceholder="Найти в списке…"
  options={manyOptions}
  value={v}
  onChange={setV}
/>`;

const maxHeightCode = `<Listbox
  options={options}
  value={v}
  onChange={setV}
  maxHeight="200px"
/>`;

const outerShell: React.CSSProperties = {
  display: 'flex',
  gap: '80px',
  maxWidth: '1400px',
  margin: '0 auto',
  paddingLeft: '2rem',
  paddingRight: 'calc(240px + 80px + 20px)',
  boxSizing: 'border-box',
};

const mainColumn: React.CSSProperties = {
  flex: '1',
  minWidth: 0,
  maxWidth: '100%',
};

const navLinkStyle: React.CSSProperties = {
  color: '#000000',
  textDecoration: 'none',
  display: 'block',
  transition: 'color 0.2s ease',
  cursor: 'pointer',
};

const h2: React.CSSProperties = { marginTop: 0, marginBottom: '0.75rem' };
const sectionGap: React.CSSProperties = { marginBottom: '2.5rem' };
const hint: React.CSSProperties = {
  fontSize: 'var(--text-base)',
  lineHeight: 1.55,
  margin: '0 0 1rem',
};

const CollapsiblePropsList = () => {
  const [open, setOpen] = useState(false);
  const props = [
    { name: 'options', type: 'ListboxOption[]', description: 'value, label, disabled?, icon?, id?', default: '[]' },
    { name: 'value', type: 'string', description: 'Controlled: выбранное значение.', default: '—' },
    { name: 'defaultValue', type: 'string', description: 'Uncontrolled: начальное значение.', default: '—' },
    { name: 'onChange', type: '(value: string) => void', description: 'Клик по доступной опции.', default: '—' },
    {
      name: 'showSelectedCheck',
      type: 'boolean',
      description:
        'Галочка справа у выбранной строки. В продукте включается только из Select; автономный Listbox обычно без этого пропа.',
      default: 'false',
    },
    {
      name: 'showItemStartIcon',
      type: 'boolean',
      description: 'Разрешить option.icon слева; слот только при непустой иконке у опции.',
      default: 'true',
    },
    {
      name: 'maxHeight',
      type: 'string',
      description:
        'CSS max-height области опций со скроллом. Ширину панели Listbox не задаёт — её задаёт только Select (menuWidth / menuMaxWidth).',
      default: 'токен',
    },
    { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Размер строк и типографики.', default: "'medium'" },
    { name: 'search', type: 'boolean', description: 'Поле поиска (Input) над списком.', default: 'false' },
    {
      name: 'searchPlaceholder',
      type: 'string',
      description: 'Placeholder у поля поиска при search.',
      default: '«Найти в списке…»',
    },
    {
      name: 'filterItem',
      type: '(query: string, option: ListboxOption) => boolean',
      description: 'Фильтр при search; иначе подстрока в string label.',
      default: '—',
    },
    {
      name: 'focusSearchOnMount',
      type: 'boolean',
      description: 'Сфокусировать поле поиска при монтировании (например в выпадающем Select с search).',
      default: 'false',
    },
  ];
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
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
          marginBottom: open ? '1rem' : 0,
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronDown
          size={16}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}
        />
        <span>{open ? 'Скрыть список пропсов' : 'Показать список пропсов'}</span>
      </button>
      {open && (
        <div style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
            <thead>
              <tr style={{ background: '#ffffff', borderTop: 'none' }}>
                <th
                  style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'var(--family-brand)',
                    fontSize: '0.875rem',
                    fontWeight: 'var(--weight-regular)',
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
                    fontWeight: 'var(--weight-regular)',
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
                    fontWeight: 'var(--weight-regular)',
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
                      fontWeight: 'var(--weight-regular)',
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

const baseOpts = [
  { value: 'a', label: 'Альфа' },
  { value: 'b', label: 'Бета' },
];

const manyForSearch = Array.from({ length: 20 }, (_, i) => ({
  value: `k${i}`,
  label: `Пункт ${i + 1}`,
}));

function PrimaryDemo() {
  const [v, setV] = useState('a');
  return <Listbox options={baseOpts} value={v} onChange={setV} />;
}

function SizesDemo() {
  const [a, setA] = useState('a');
  const [b, setB] = useState('a');
  const [c, setC] = useState('a');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'var(--spacing-16)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ width: 200, minWidth: 0, flex: '0 0 auto' }}>
        <Listbox size="small" options={baseOpts} value={a} onChange={setA} />
      </div>
      <div style={{ width: 200, minWidth: 0, flex: '0 0 auto' }}>
        <Listbox size="medium" options={baseOpts} value={b} onChange={setB} />
      </div>
      <div style={{ width: 220, minWidth: 0, flex: '0 0 auto' }}>
        <Listbox size="large" options={baseOpts} value={c} onChange={setC} />
      </div>
    </div>
  );
}

function SearchDemo() {
  const [v, setV] = useState('');
  return (
    <Listbox
      search
      searchPlaceholder="Найти в списке…"
      options={manyForSearch}
      value={v}
      onChange={setV}
      maxHeight="220px"
    />
  );
}

function MaxHeightDemo() {
  const [v, setV] = useState('v0');
  const many = Array.from({ length: 24 }, (_, i) => ({ value: `v${i}`, label: `Строка ${i + 1}` }));
  return <Listbox options={many} value={v} onChange={setV} maxHeight="200px" />;
}

const optsWithStartIcons = [
  { value: 'a', label: 'Альфа', icon: <Icon name="chart" size="100%" /> },
  { value: 'b', label: 'Бета', icon: <Icon name="chart" size="100%" /> },
];

function WithStartIconDemo() {
  const [v, setV] = useState('a');
  return <Listbox options={optsWithStartIcons} value={v} onChange={setV} />;
}

function NoStartIconDemo() {
  const [v, setV] = useState('a');
  return (
    <Listbox options={baseOpts} value={v} onChange={setV} showItemStartIcon={false} />
  );
}

function DisabledDemo() {
  const [v, setV] = useState('a');
  const opts = [
    { value: 'a', label: 'Первый' },
    { value: 'b', label: 'Второй' },
    { value: 'c', label: 'Disabled', disabled: true },
  ];
  return <Listbox options={opts} value={v} onChange={setV} />;
}

export function ListboxDocsPage() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="turbo-ui-scope" style={outerShell}>
        <div style={mainColumn}>
          <h1 id="listbox-title" style={{ marginTop: 0 }}>
            Listbox
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(figmaUrl, '_blank')}>
              Figma
            </Button>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(githubUrl, '_blank')}>
              GitHub
            </Button>
          </div>

          <p style={{ ...hint, marginBottom: '2rem' }}>
            Панель со списком опций для выбора значения.
          </p>

          <div id="example-main" style={sectionGap}>
            <ExampleBlock code={primaryExampleCode}>
              <PrimaryDemo />
            </ExampleBlock>
          </div>

          <h2 id="props" style={{ ...h2, marginTop: '0.5rem' }}>
            Пропсы
          </h2>
          <div style={{ ...sectionGap, marginTop: 0 }}>
            <CollapsiblePropsList />
          </div>

          <h2 id="setup" style={h2}>
            Подключение
          </h2>
          <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: '2.5rem' }}>
            <SyntaxHighlighter
              language="tsx"
              style={oneLight}
              customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
              PreTag="div"
            >
              {setupCode}
            </SyntaxHighlighter>
          </div>

          <section id="size" style={sectionGap}>
            <h2 style={h2}>Размер</h2>
            <ul style={{ marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', fontFamily: 'var(--family-brand)', fontSize: 'var(--text-base, 15px)', lineHeight: '1.5', color: '#000000', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>small</code> — компактные строки, минимальная высота 36px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>size</code> — базовый размер по умолчанию, минимальная высота строки 44px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>large</code> — крупные строки, минимальная высота 52px</li>
            </ul>
            <ExampleBlock code={`size="small" | "medium" | "large"`}>
              <SizesDemo />
            </ExampleBlock>
          </section>

          <section id="search" style={sectionGap}>
            <h2 style={h2}>Поиск</h2>
            <p style={hint}>
              Проп <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>search</code> включает над
              списком поле ввода на компоненте Input.{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>searchPlaceholder</code> задаёт
              placeholder; <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>filterItem</code> — свой
              фильтр опций, без него совпадение по подстроке в строковом{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>label</code> (без учёта регистра).
            </p>
            <ExampleBlock code={searchCode}>
              <SearchDemo />
            </ExampleBlock>
          </section>

          <section id="max-height" style={sectionGap}>
            <h2 style={h2}>Высота и скролл</h2>
            <p style={hint}>
              Проп <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>maxHeight</code> — ограничение
              высоты области опций (CSS), внутри включается вертикальный скролл.
            </p>
            <ExampleBlock code={maxHeightCode}>
              <MaxHeightDemo />
            </ExampleBlock>
          </section>

          <section id="selection" style={sectionGap}>
            <h2 style={h2}>Галочка справа</h2>
            <p style={hint}>
              Справа в строке может быть только индикатор выбранного значения — иконка check. Она
              показывается только когда Listbox встроен в Select (внутри Select включается слот
              галочки). У автономного Listbox правой колонки под индикатор нет; другие иконки справа не предусмотрены —
              отдельное меню или действие рядом с пунктом лучше оформлять отдельным компонентом, не через Listbox.
            </p>
          </section>

          <section id="start-icon" style={sectionGap}>
            <h2 style={h2}>Иконка слева в строке</h2>
            <p style={hint}>
              Проп <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>showItemStartIcon</code> (по умолчанию{' '}
              true) разрешает иконку слева; слот рендерится только если у опции задан непустой{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>option.icon</code> — без иконки текст без
              отступа под колонку. При false иконки слева нет ни у одной строки.
            </p>
            <ExampleBlock code={`<Listbox options={[{ ..., icon: <Icon name="chart" size="100%" /> }]} />`}>
              <WithStartIconDemo />
            </ExampleBlock>
            <ExampleBlock code="showItemStartIcon={false}">
              <NoStartIconDemo />
            </ExampleBlock>
          </section>

          <section id="disabled-items" style={sectionGap}>
            <h2 style={h2}>Disabled у опции</h2>
            <p style={hint}>
              В <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>options</code> поле{' '}
              <code style={{ background: '#f0f0f0', padding: '0.125rem 0.35rem' }}>disabled: true</code> отключает выбор
              строки; клик и клавиатура не меняют значение на этой опции.
            </p>
            <ExampleBlock code="{ value: 'c', label: '…', disabled: true }">
              <DisabledDemo />
            </ExampleBlock>
          </section>
        </div>
      </div>

      <nav
        className="listbox-docs-menu"
        style={{
          position: 'fixed',
          top: 80,
          right: 20,
          width: 240,
          fontFamily: 'var(--typescale-lable-small-font), var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--typescale-lable-small-size)',
          lineHeight: 'var(--typescale-lable-small-height)',
          letterSpacing: 'var(--typescale-lable-small-tracking)',
          color: '#000000',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {(
            [
              ['listbox-title', 'Listbox'],
              ['example-main', 'Пример'],
              ['props', 'Пропсы'],
              ['setup', 'Подключение'],
              ['size', 'Размер'],
              ['search', 'Поиск'],
              ['max-height', 'Высота'],
              ['selection', 'Галочка (Select)'],
              ['start-icon', 'Иконка слева'],
              ['disabled-items', 'Disabled'],
            ] as const
          ).map(([id, label]) => (
            <li key={id} style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
              <a href={`#${id}`} style={navLinkStyle} onClick={(e) => handleNav(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
