import React, { useState } from 'react';
import { Select } from './Select';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { Icon } from '../../components/icons/Icon';
import { ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=829-499';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/select';

const docOptionsBasic = [
  { value: 'a', label: 'Первый' },
  { value: 'b', label: 'Второй' },
];

const manyMenuOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `i${i}`,
  label: `Пункт списка ${i + 1}`,
}));

const setupCode = `import 'turbo-ui/styles/theme';
import { Select } from 'turbo-ui/select';`;

const simplestExampleCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Выберите"
/>`;

const sizeCode = `const [vs, setVs] = useState('');
const [vm, setVm] = useState('');
const [vl, setVl] = useState('');

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
  <Select size="small" options={options} value={vs} onChange={setVs} placeholder="Small" />
  <Select size="medium" options={options} value={vm} onChange={setVm} placeholder="Medium" />
  <Select size="large" options={options} value={vl} onChange={setVl} placeholder="Large" />
</div>`;

const startIconCode = `import { Icon } from 'turbo-ui/…'; // или из components/icons

const icon = <Icon name="chart" size="100%" />;

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
  <Select size="small" startIcon={icon} options={options} value={vs} onChange={setVs} placeholder="Small" />
  <Select size="medium" startIcon={icon} options={options} value={vm} onChange={setVm} placeholder="Medium" />
  <Select size="large" startIcon={icon} options={options} value={vl} onChange={setVl} placeholder="Large" />
</div>`;

const fixedTriggerMenuCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Выберите"
  triggerWidth="200px"
  menuWidth="280px"
/>`;

const maxTriggerWidthCode = `const [v, setV] = useState('short');

const options = [
  { value: 'short', label: 'Коротко' },
  {
    value: 'long',
    label: 'Очень длинная подпись выбранного значения — обрежется по ширине',
  },
];

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Выберите"
  triggerMaxWidth="220px"
/>`;

const menuHeightCode = `const [v, setV] = useState('');

<Select
  options={manyOptions}
  value={v}
  onChange={setV}
  placeholder="Много пунктов"
  menuMaxHeight="140px"
/>`;

const menuFixedWidthCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Ширина панели"
  menuWidth="320px"
/>`;

const menuPlacementCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Панель сверху"
  positions="top center"
/>`;

const menuAlignCode = `const [vl, setVl] = useState('');
const [vc, setVc] = useState('');
const [vr, setVr] = useState('');

<div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
  <Select positions="bottom left" options={options} value={vl} onChange={setVl} placeholder="Слева" />
  <Select positions="bottom center" options={options} value={vc} onChange={setVc} placeholder="По центру" />
  <Select positions="bottom right" options={options} value={vr} onChange={setVr} placeholder="Справа" />
</div>`;

const menuOffsetCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Сдвиг панели"
  menuOffset={20}
/>`;

const placeholderCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  placeholder="Ничего не выбрано — виден плейсхолдер"
/>`;

const searchCode = `const [v, setV] = useState('');

<Select
  search
  searchPlaceholder="Найти в списке…"
  options={manyOptions}
  value={v}
  onChange={setV}
  placeholder="Выберите"
/>`;

const disabledCode = `<Select
  options={options}
  defaultValue="a"
  disabled
  placeholder="Недоступно"
/>`;

const errorCode = `const [v, setV] = useState('');

<Select
  options={options}
  value={v}
  onChange={setV}
  error
  placeholder="Обязательное поле"
/>`;

const CollapsiblePropsList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const props: { name: string; type: string; description: string; default: string }[] = [
    { name: 'options', type: 'ListboxOption[]', description: 'Опции: value, label, disabled?, icon?.', default: '[]' },
    { name: 'value', type: 'string', description: 'Controlled: выбранное значение.', default: '—' },
    { name: 'defaultValue', type: 'string', description: 'Uncontrolled: начальное значение.', default: '—' },
    { name: 'onChange', type: '(v: string) => void', description: 'После выбора список закрывается.', default: '—' },
    { name: 'placeholder', type: 'ReactNode', description: 'Текст при пустом value.', default: '«Выберите»' },
    { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Размер триггера и строк списка (токены --select-*, --listbox-*).', default: "'medium'" },
    { name: 'triggerWidth', type: 'string', description: 'Фиксированная ширина обёртки триггера (CSS).', default: '—' },
    { name: 'triggerMaxWidth', type: 'string', description: 'Макс. ширина триггера; длинный label — ellipsis.', default: '—' },
    {
      name: 'startIcon',
      type: 'ReactNode',
      description: 'Опциональная иконка слева в триггере; слот по размеру как у пунктов Listbox.',
      default: '—',
    },
    { name: 'style', type: 'CSSProperties', description: 'Стили корня; можно комбинировать с triggerWidth.', default: '—' },
    { name: 'className', type: 'string', description: 'Класс на корень-обёртку.', default: '—' },
    { name: 'id', type: 'string', description: 'id корневой обёртки.', default: '—' },
    { name: 'menuWidth', type: 'string', description: 'Ширина выпадающей панели (обёртка вокруг Listbox). У автономного Listbox своего пропа ширины нет.', default: '—' },
    { name: 'menuMaxWidth', type: 'string', description: 'Макс. ширина панели.', default: '—' },
    {
      name: 'menuMaxHeight',
      type: 'string',
      description: 'Высота области опций со скроллом; пробрасывается во внутренний Listbox как maxHeight.',
      default: 'токен listbox',
    },
    { name: 'positions', type: 'SelectPosition | []', description: 'Одна позиция или массив (порядок = приоритет для flip).', default: 'bottom left' },
    { name: 'menuOffset', type: 'number', description: 'Горизонтальный сдвиг панели: >0 влево, <0 вправо, 0 без сдвига.', default: '0' },
    { name: 'search', type: 'boolean', description: 'Поле поиска над списком (проброс в Listbox).', default: 'false' },
    {
      name: 'searchPlaceholder',
      type: 'string',
      description: 'Placeholder поля поиска при search (проброс в Listbox).',
      default: 'как у Listbox',
    },
    {
      name: 'filterItem',
      type: '(q, opt) => boolean',
      description: 'Фильтр опций при search; без пропа — подстрока в string label (без регистра).',
      default: '—',
    },
    { name: 'disabled', type: 'boolean', description: 'Список не открывается; визуал disabled.', default: 'false' },
    { name: 'error', type: 'boolean', description: 'Invalid на триггере + aria-invalid.', default: 'false' },
    { name: 'open', type: 'boolean', description: 'Controlled: открыт ли список.', default: '—' },
    { name: 'defaultOpen', type: 'boolean', description: 'Uncontrolled: начально открыт.', default: 'false' },
    { name: 'onOpenChange', type: '(open) => void', description: 'Смена открытия.', default: '—' },
    { name: 'showItemStartIcon', type: 'boolean', description: 'Проброс в Listbox: слот иконки слева у пункта.', default: 'true' },
    {
      name: '…button',
      type: 'нативные атрибуты',
      description:
        'На `<button>`-триггер: `name`, `form`, `aria-label`, `data-*`, `title` и др. (тип — `SelectProps` без полей Select). Исключены: `type`, `children`, `value`, `defaultValue`, `onChange`, `className`, `style`, `id` (последние три — корень). `aria-expanded` / `aria-invalid` задаёт Select.',
      default: '—',
    },
    { name: 'ref', type: 'Ref<HTMLButtonElement>', description: 'На кнопку-триггер.', default: '—' },
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

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--typescale-lable-medium-font, var(--family-brand, "ONY ONE", sans-serif))',
  fontSize: 'var(--typescale-lable-medium-size, var(--text-base, 15px))',
  lineHeight: 'var(--typescale-lable-medium-height, 1.55)',
  letterSpacing: 'var(--typescale-lable-medium-tracking, normal)',
  color: '#000000',
};

const codeInline: React.CSSProperties = {
  background: '#f0f0f0',
  padding: '0.125rem 0.25rem',
  borderRadius: 4,
};

const h2: React.CSSProperties = {
  marginBottom: '0.25rem',
  textDecoration: 'none',
  borderBottom: 'none',
  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
  color: '#000000',
};

function SimplestDemo() {
  const [v, setV] = useState('');
  return <Select options={docOptionsBasic} value={v} onChange={setV} placeholder="Выберите" />;
}

function SizeDemo() {
  const [vs, setVs] = useState('');
  const [vm, setVm] = useState('');
  const [vl, setVl] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'var(--spacing-16)',
        alignItems: 'flex-start',
      }}
    >
      <Select size="small" options={docOptionsBasic} value={vs} onChange={setVs} placeholder="Small" />
      <Select size="medium" options={docOptionsBasic} value={vm} onChange={setVm} placeholder="Medium" />
      <Select size="large" options={docOptionsBasic} value={vl} onChange={setVl} placeholder="Large" />
    </div>
  );
}

function StartIconSizesDemo() {
  const [vs, setVs] = useState('');
  const [vm, setVm] = useState('');
  const [vl, setVl] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'var(--spacing-16)',
        alignItems: 'flex-start',
      }}
    >
      <Select
        size="small"
        startIcon={<Icon name="chart" size="100%" />}
        options={docOptionsBasic}
        value={vs}
        onChange={setVs}
        placeholder="Small"
      />
      <Select
        size="medium"
        startIcon={<Icon name="chart" size="100%" />}
        options={docOptionsBasic}
        value={vm}
        onChange={setVm}
        placeholder="Medium"
      />
      <Select
        size="large"
        startIcon={<Icon name="chart" size="100%" />}
        options={docOptionsBasic}
        value={vl}
        onChange={setVl}
        placeholder="Large"
      />
    </div>
  );
}

function FixedTriggerMenuDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={docOptionsBasic}
      value={v}
      onChange={setV}
      placeholder="Выберите"
      triggerWidth="200px"
      menuWidth="280px"
    />
  );
}

function MaxTriggerWidthDemo() {
  const [v, setV] = useState('short');
  const opts = [
    { value: 'short', label: 'Коротко' },
    {
      value: 'long',
      label: 'Очень длинная подпись выбранного значения — обрежется по ширине',
    },
  ];
  return (
    <Select
      options={opts}
      value={v}
      onChange={setV}
      placeholder="Выберите"
      triggerMaxWidth="220px"
    />
  );
}

function MenuHeightDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={manyMenuOptions}
      value={v}
      onChange={setV}
      placeholder="Много пунктов"
      menuMaxHeight="140px"
    />
  );
}

function MenuFixedWidthDemo() {
  const [v, setV] = useState('');
  return (
    <Select options={docOptionsBasic} value={v} onChange={setV} placeholder="Ширина панели" menuWidth="320px" />
  );
}

function MenuPlacementDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={docOptionsBasic}
      value={v}
      onChange={setV}
      placeholder="Панель сверху"
      positions="top center"
    />
  );
}

function MenuAlignDemo() {
  const [vl, setVl] = useState('');
  const [vc, setVc] = useState('');
  const [vr, setVr] = useState('');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-24)', alignItems: 'flex-start' }}>
      <Select
        positions="bottom left"
        options={docOptionsBasic}
        value={vl}
        onChange={setVl}
        placeholder="Слева"
      />
      <Select
        positions="bottom center"
        options={docOptionsBasic}
        value={vc}
        onChange={setVc}
        placeholder="По центру"
      />
      <Select
        positions="bottom right"
        options={docOptionsBasic}
        value={vr}
        onChange={setVr}
        placeholder="Справа"
      />
    </div>
  );
}

function MenuOffsetDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={docOptionsBasic}
      value={v}
      onChange={setV}
      placeholder="Сдвиг панели"
      menuOffset={20}
    />
  );
}

function PlaceholderDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={docOptionsBasic}
      value={v}
      onChange={setV}
      placeholder="Ничего не выбрано — виден плейсхолдер"
    />
  );
}

function SearchDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      search
      searchPlaceholder="Найти в списке…"
      options={manyMenuOptions}
      value={v}
      onChange={setV}
      placeholder="Выберите"
    />
  );
}

function ErrorStateDemo() {
  const [v, setV] = useState('');
  return (
    <Select
      options={docOptionsBasic}
      value={v}
      onChange={setV}
      error
      placeholder="Обязательное поле"
    />
  );
}

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

const sectionGap = { marginBottom: '3rem' } as const;

export function SelectDocsPage() {
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
          <h1 id="select-title" style={{ marginTop: 0, marginBottom: 'var(--spacing-32)' }}>
            Select
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(figmaUrl, '_blank')}>
              Figma
            </Button>
            <Button variant="backless" startIcon={null} endIcon={null} onClick={() => window.open(githubUrl, '_blank')}>
              GitHub
            </Button>
          </div>

          <p style={{ ...bodyStyle, margin: '0 0 2rem' }}>
            Выпадающий список для выбора одного значения из набора вариантов.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock code={simplestExampleCode}>
              <SimplestDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="props" style={{ ...h2, marginTop: 0 }}>
              Пропсы
            </h2>
            <CollapsiblePropsList />
          </div>

          <div style={sectionGap}>
            <h2 id="setup" style={{ ...h2, marginTop: 0 }}>
              Подключение
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
              Импорт entry <code style={codeInline}>turbo-ui/select</code>, тема подключена один раз.
            </p>
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <SyntaxHighlighter
                language="tsx"
                style={oneLight}
                customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
                PreTag="div"
              >
                {setupCode}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={sectionGap}>
            <h2 id="size" style={{ ...h2, marginTop: 0 }}>
              Размер
            </h2>
            <ul style={{ ...bodyStyle, marginBottom: '1.5rem', marginTop: 0, paddingLeft: '1.5rem', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>small</code> — компактный триггер, высота 32px, строки списка 36px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>size</code> — базовый размер по умолчанию, триггер 40px, строки 44px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>large</code> — крупный триггер, высота 48px, строки списка 52px</li>
            </ul>
            <ExampleBlock code={sizeCode} previewOverflow="visible">
              <SizeDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="trigger-start-icon" style={{ ...h2, marginTop: 0 }}>
              Иконка в начале триггера
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>startIcon</code> — необязательный слот слева от подписи. Размер области под
              иконку совпадает с <code style={codeInline}>--listbox-*-icon-size</code> для выбранного <code style={codeInline}>size</code>, чтобы визуально совпадать с пунктами списка.
            </p>
            <ExampleBlock code={startIconCode} previewOverflow="visible">
              <StartIconSizesDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="fixed-trigger-menu-width" style={{ ...h2, marginTop: 0 }}>
              Фиксированная ширина селекта и списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>triggerWidth</code> — ширина кнопки-триггера. <code style={codeInline}>menuWidth</code>{' '}
              — ширина выпадающей панели (может отличаться от триггера).
            </p>
            <ExampleBlock code={fixedTriggerMenuCode} previewOverflow="visible">
              <FixedTriggerMenuDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="max-trigger-width" style={{ ...h2, marginTop: 0 }}>
              Максимальная ширина селекта
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>triggerMaxWidth</code> ограничивает ширину триггера; длинный текст выбранного
              значения сокращается с многоточием.
            </p>
            <ExampleBlock code={maxTriggerWidthCode} previewOverflow="visible">
              <MaxTriggerWidthDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-height" style={{ ...h2, marginTop: 0 }}>
              Высота списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>menuMaxHeight</code> задаёт высоту области с опциями; при переполнении появляется
              вертикальный скролл.
            </p>
            <ExampleBlock code={menuHeightCode} previewOverflow="visible">
              <MenuHeightDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-fixed-width" style={{ ...h2, marginTop: 0 }}>
              Фиксированная ширина списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Только <code style={codeInline}>menuWidth</code>: фиксированная ширина панели без явной ширины триггера.
            </p>
            <ExampleBlock code={menuFixedWidthCode} previewOverflow="visible">
              <MenuFixedWidthDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-placement" style={{ ...h2, marginTop: 0 }}>
              Расположение списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              В значении <code style={codeInline}>positions</code> первая часть (<code style={codeInline}>top</code>,{' '}
              <code style={codeInline}>bottom</code>, <code style={codeInline}>left</code>, <code style={codeInline}>right</code>)
              задаёт, с какой стороны триггера открывается панель.
            </p>
            <ExampleBlock code={menuPlacementCode} previewOverflow="visible">
              <MenuPlacementDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-align" style={{ ...h2, marginTop: 0 }}>
              Выравнивание списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Вторая часть значения <code style={codeInline}>positions</code> — <code style={codeInline}>left</code>,{' '}
              <code style={codeInline}>center</code> или <code style={codeInline}>right</code> (для вертикальных сторон —{' '}
              <code style={codeInline}>top</code> / <code style={codeInline}>middle</code> / <code style={codeInline}>bottom</code>)
              — выравнивание панели вдоль края триггера.
            </p>
            <ExampleBlock code={menuAlignCode} previewOverflow="visible">
              <MenuAlignDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-offset" style={{ ...h2, marginTop: 0 }}>
              Смещение списка по горизонтали
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>menuOffset</code> сдвигает панель по горизонтали: положительное значение — влево,
              отрицательное — вправо, <code style={codeInline}>0</code> — без сдвига.
            </p>
            <ExampleBlock code={menuOffsetCode} previewOverflow="visible">
              <MenuOffsetDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="placeholder" style={{ ...h2, marginTop: 0 }}>
              Плейсхолдер
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>placeholder</code> показывается в триггере, пока значение не выбрано (поддерживается{' '}
              <code style={codeInline}>ReactNode</code>).
            </p>
            <ExampleBlock code={placeholderCode} previewOverflow="visible">
              <PlaceholderDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="search" style={{ ...h2, marginTop: 0 }}>
              Строка поиска
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>search</code> добавляет поле ввода над списком для фильтрации опций (по умолчанию
              по подстроке в строковом <code style={codeInline}>label</code>).
            </p>
            <ExampleBlock code={searchCode} previewOverflow="visible">
              <SearchDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="disabled" style={{ ...h2, marginTop: 0 }}>
              Состояние блокировки
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>disabled</code> — список не открывается, триггер визуально неактивен.
            </p>
            <ExampleBlock code={disabledCode} previewOverflow="visible">
              <Select options={docOptionsBasic} defaultValue="a" disabled placeholder="Недоступно" />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="error" style={{ ...h2, marginTop: 0 }}>
              Состояние ошибки
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>error</code> подсвечивает триггер как ошибочное поле и выставляет{' '}
              <code style={codeInline}>aria-invalid</code>. Текст ошибки под полем в компонент не входит.
            </p>
            <ExampleBlock code={errorCode} previewOverflow="visible">
              <ErrorStateDemo />
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="select-docs-menu"
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '240px',
          fontFamily: 'var(--typescale-lable-small-font), var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: 'var(--typescale-lable-small-size)',
          lineHeight: 'var(--typescale-lable-small-height)',
          letterSpacing: 'var(--typescale-lable-small-tracking)',
          color: '#000000',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#select-title" style={navLinkStyle} onClick={(e) => handleNav(e, 'select-title')}>
              Select
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#props" style={navLinkStyle} onClick={(e) => handleNav(e, 'props')}>
              Пропсы
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#setup" style={navLinkStyle} onClick={(e) => handleNav(e, 'setup')}>
              Подключение
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#size" style={navLinkStyle} onClick={(e) => handleNav(e, 'size')}>
              Размер
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#trigger-start-icon" style={navLinkStyle} onClick={(e) => handleNav(e, 'trigger-start-icon')}>
              Иконка в триггере
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#fixed-trigger-menu-width" style={navLinkStyle} onClick={(e) => handleNav(e, 'fixed-trigger-menu-width')}>
              Ширина селекта и списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#max-trigger-width" style={navLinkStyle} onClick={(e) => handleNav(e, 'max-trigger-width')}>
              Макс. ширина селекта
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-height" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-height')}>
              Высота списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-fixed-width" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-fixed-width')}>
              Ширина списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-placement" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-placement')}>
              Расположение списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-align" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-align')}>
              Выравнивание списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-offset" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-offset')}>
              Смещение списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#placeholder" style={navLinkStyle} onClick={(e) => handleNav(e, 'placeholder')}>
              Плейсхолдер
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#search" style={navLinkStyle} onClick={(e) => handleNav(e, 'search')}>
              Строка поиска
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#disabled" style={navLinkStyle} onClick={(e) => handleNav(e, 'disabled')}>
              Блокировка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#error" style={navLinkStyle} onClick={(e) => handleNav(e, 'error')}>
              Ошибка
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
