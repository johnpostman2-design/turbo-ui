import React, { useState } from 'react';
import { ComboBox } from './ComboBox';
import { Button } from '../button/Button';
import { ExampleBlock } from '../../components/ExampleBlock';
import { Icon } from '../../components/icons/Icon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const figmaUrl =
  'https://www.figma.com/design/pj5aiXE1X40rEoVbtyVQ2F/Turbo-UI?node-id=829-499';
const githubUrl = 'https://github.com/johnpostman2-design/turbo-ui/tree/main/src/ui/combobox';

const docOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'lemon', label: 'Lemon' },
];

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `i${i}`,
  label: `Опция ${i + 1}`,
}));

const phoneOptions = [
  { value: '+7 (999) 123-45-67', label: '+7 (999) 123-45-67' },
  { value: '+7 (912) 345-67-89', label: '+7 (912) 345-67-89' },
];

const setupCode = `import 'turbo-ui/styles/theme';
import { ComboBox } from 'turbo-ui/combobox';`;

const simplestExampleCode = `const [v, setV] = useState('');

<ComboBox
  options={options}
  value={v}
  onChange={setV}
  placeholder="Начните ввод"
/>`;

const sizeCode = `const [vs, setVs] = useState('');
const [vm, setVm] = useState('');
const [vl, setVl] = useState('');

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
  <ComboBox size="small" options={options} value={vs} onChange={setVs} placeholder="Small" />
  <ComboBox size="medium" options={options} value={vm} onChange={setVm} placeholder="Medium" />
  <ComboBox size="large" options={options} value={vl} onChange={setVl} placeholder="Large" />
</div>`;

const widthCode = `const [v, setV] = useState('');

<ComboBox
  options={options}
  value={v}
  onChange={setV}
  placeholder="Фиксированная ширина"
  width="280px"
/>`;

const multilineCode = `const [v, setV] = useState('');

<ComboBox
  multiline
  options={options}
  value={v}
  onChange={setV}
  placeholder="Многострочное поле"
/>`;

const menuHeightCode = `const [v, setV] = useState('');

<ComboBox
  options={manyOptions}
  value={v}
  onChange={setV}
  placeholder="Высота списка"
  menuMaxHeight="160px"
/>`;

const positionsCode = `const [v, setV] = useState('');

<ComboBox
  options={options}
  value={v}
  onChange={setV}
  placeholder="Панель сверху"
  positions="top center"
/>`;

const borderlessCode = `const [v, setV] = useState('');

<ComboBox
  borderless
  options={options}
  value={v}
  onChange={setV}
  placeholder="Без обводки"
/>`;

const startIconCode = `import { Icon } from 'turbo-ui/…';

const [v, setV] = useState('');

<ComboBox
  startIcon={<Icon name="chart" size={20} />}
  options={options}
  value={v}
  onChange={setV}
  placeholder="С иконкой слева"
/>`;

const maxLengthCode = `const [v, setV] = useState('');

<ComboBox
  options={options}
  value={v}
  onChange={setV}
  placeholder="Не более 10 символов"
  maxLength={10}
/>`;

const maskCode = `const [v, setV] = useState('');

<ComboBox
  options={phones}
  value={v}
  onChange={setV}
  placeholder="+7 (___) ___-__-__"
  mask="+7 (999) 999-99-99"
/>`;

const clearableCode = `const [v, setV] = useState('apple');

<ComboBox
  clearable
  options={options}
  value={v}
  onChange={setV}
  onClear={() => console.log('cleared')}
  placeholder="Поле с очисткой"
/>`;

const disabledCode = `<ComboBox
  options={options}
  defaultValue="apple"
  disabled
  placeholder="Недоступно"
/>`;

const errorCode = `const [v, setV] = useState('');

<ComboBox
  options={options}
  value={v}
  onChange={setV}
  error
  placeholder="Обязательное поле"
/>`;

const highlightCode = `const [v, setV] = useState('');

<ComboBox
  highlightMatch
  options={options}
  value={v}
  onChange={setV}
  placeholder="Введите часть слова"
/>`;

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
  return <ComboBox options={docOptions} value={v} onChange={setV} placeholder="Начните ввод" />;
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
      <ComboBox size="small" options={docOptions} value={vs} onChange={setVs} placeholder="Small" />
      <ComboBox size="medium" options={docOptions} value={vm} onChange={setVm} placeholder="Medium" />
      <ComboBox size="large" options={docOptions} value={vl} onChange={setVl} placeholder="Large" />
    </div>
  );
}

function WidthDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Фиксированная ширина"
      width="280px"
    />
  );
}

function MultilineDemo() {
  const longLabel =
    'Длинное значение, которое не помещается в одну строку и растягивает поле на несколько строк по содержимому';
  const opts = [
    { value: 'short', label: 'Короткое значение' },
    { value: 'long', label: longLabel },
    ...docOptions,
  ];
  const [v, setV] = useState('');
  return (
    <ComboBox
      multiline
      options={opts}
      value={v}
      onChange={setV}
      placeholder="Многострочное поле"
      width="320px"
    />
  );
}

function MenuHeightDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={manyOptions}
      value={v}
      onChange={setV}
      placeholder="Высота списка"
      menuMaxHeight="160px"
    />
  );
}

function PositionsDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Панель сверху"
      positions="top center"
    />
  );
}

function BorderlessDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      borderless
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Без обводки"
    />
  );
}

function StartIconDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      startIcon={<Icon name="chart" size={20} />}
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="С иконкой слева"
    />
  );
}

function MaxLengthDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Не более 10 символов"
      maxLength={10}
    />
  );
}

function MaskDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={phoneOptions}
      value={v}
      onChange={setV}
      placeholder="+7 (___) ___-__-__"
      mask="+7 (999) 999-99-99"
    />
  );
}

function ClearableDemo() {
  const [v, setV] = useState('apple');
  return (
    <ComboBox
      clearable
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Поле с очисткой"
    />
  );
}

function ErrorDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      options={docOptions}
      value={v}
      onChange={setV}
      error
      placeholder="Обязательное поле"
    />
  );
}

function HighlightDemo() {
  const [v, setV] = useState('');
  return (
    <ComboBox
      highlightMatch
      options={docOptions}
      value={v}
      onChange={setV}
      placeholder="Введите часть слова"
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

export function ComboBoxDocsPage() {
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
          <h1 id="combobox-title" style={{ marginTop: 0, marginBottom: 'var(--spacing-32)' }}>
            ComboBox
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <Button
              variant="backless"
              startIcon={null}
              endIcon={null}
              type="button"
              onClick={() => window.open(figmaUrl, '_blank', 'noopener')}
            >
              Figma
            </Button>
            <Button
              variant="backless"
              startIcon={null}
              endIcon={null}
              type="button"
              onClick={() => window.open(githubUrl, '_blank', 'noopener')}
            >
              GitHub
            </Button>
          </div>

          <p style={{ ...bodyStyle, margin: '0 0 2rem' }}>
            Поле ввода с выпадающим списком подсказок для выбора значения.
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <ExampleBlock code={simplestExampleCode} previewOverflow="visible">
              <SimplestDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="setup" style={{ ...h2, marginTop: 0 }}>
              Подключение
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
              Импорт entry <code style={codeInline}>turbo-ui/combobox</code>, тема подключена один раз.
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
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>small</code> — компактное поле, высота 32px, строки списка 36px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>size</code> — базовый размер по умолчанию, поле 40px, строки 44px</li>
              <li style={{ marginBottom: '0.5rem' }}><code style={codeInline}>large</code> — крупное поле, высота 48px, строки списка 52px</li>
            </ul>
            <ExampleBlock code={sizeCode} previewOverflow="visible">
              <SizeDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="width" style={{ ...h2, marginTop: 0 }}>
              Ширина комбобокса
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Пропы <code style={codeInline}>width</code> и <code style={codeInline}>maxWidth</code> применяются к
              корневому контейнеру и определяют ширину поля.
            </p>
            <ExampleBlock code={widthCode} previewOverflow="visible">
              <WidthDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="multiline" style={{ ...h2, marginTop: 0 }}>
              Многострочное поле
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>multiline</code> позволяет вводить и отображать значение в несколько строк.
              По умолчанию высота поля совпадает с обычным однострочным; при выборе или вводе длинного значения высота
              автоматически растёт под фактическое количество строк. <code style={codeInline}>Enter</code> выбирает
              активный пункт, <code style={codeInline}>Shift+Enter</code> — перенос строки.
            </p>
            <ExampleBlock code={multilineCode} previewOverflow="visible">
              <MultilineDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="menu-height" style={{ ...h2, marginTop: 0 }}>
              Высота выпадающего списка
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>menuMaxHeight</code> ограничивает высоту области с опциями; при переполнении
              появляется вертикальный скролл. Значение пробрасывается во внутренний{' '}
              <code style={codeInline}>Listbox</code> как его <code style={codeInline}>maxHeight</code> — отдельно
              задавать высоту у Listbox при использовании внутри ComboBox не нужно. У автономного{' '}
              <code style={codeInline}>Listbox</code> используется собственный <code style={codeInline}>maxHeight</code>;
              у ComboBox высоту панели контролирует только этот проп.
            </p>
            <ExampleBlock code={menuHeightCode} previewOverflow="visible">
              <MenuHeightDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="positions" style={{ ...h2, marginTop: 0 }}>
              Расположение и выравнивание панели
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>positions</code> работает так же, как в <code style={codeInline}>Select</code>:
              сторона (<code style={codeInline}>top/bottom/left/right</code>) и выравнивание (
              <code style={codeInline}>left/center/right</code> или <code style={codeInline}>top/middle/bottom</code>).{' '}
              <code style={codeInline}>menuOffset</code> сдвигает панель по горизонтали.
            </p>
            <ExampleBlock code={positionsCode} previewOverflow="visible">
              <PositionsDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="borderless" style={{ ...h2, marginTop: 0 }}>
              Поле без обводки
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>borderless</code> скрывает обводку по умолчанию; рамка и фон возвращаются
              только при фокусе в поле или в состоянии <code style={codeInline}>error</code>. Иконка справа по тем же
              правилам: пустое поле — <code style={codeInline}>carrot-down</code>, поле со значением — кнопка очистки.
            </p>
            <ExampleBlock code={borderlessCode} previewOverflow="visible">
              <BorderlessDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="start-icon" style={{ ...h2, marginTop: 0 }}>
              Иконка слева
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              Проп <code style={codeInline}>startIcon</code> добавляет иконку слева от текста. Размер слота
              согласован с размером поля и пунктами списка.
            </p>
            <ExampleBlock code={startIconCode} previewOverflow="visible">
              <StartIconDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="max-length" style={{ ...h2, marginTop: 0 }}>
              Максимальная длина значения
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>maxLength</code> ограничивает количество символов в поле. При наличии{' '}
              <code style={codeInline}>mask</code> ограничение применяется поверх форматирования.
            </p>
            <ExampleBlock code={maxLengthCode} previewOverflow="visible">
              <MaxLengthDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="mask" style={{ ...h2, marginTop: 0 }}>
              Маска ввода
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>mask</code> форматирует ввод по шаблону: <code style={codeInline}>9</code> — цифра,{' '}
              <code style={codeInline}>A</code> — буква, <code style={codeInline}>*</code> — любой символ. Прочие
              символы — литералы.
            </p>
            <ExampleBlock code={maskCode} previewOverflow="visible">
              <MaskDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="clearable" style={{ ...h2, marginTop: 0 }}>
              Очистка поля
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              При <code style={codeInline}>clearable</code> и непустом значении вместо иконки{' '}
              <code style={codeInline}>carrot-down</code> справа отображается{' '}
              <code style={codeInline}>IconButton</code> варианта <code style={codeInline}>primary</code> —
              кнопка очистки. После очистки иконка <code style={codeInline}>carrot-down</code> возвращается. Колбэк{' '}
              <code style={codeInline}>onClear</code> вызывается перед очисткой значения.
            </p>
            <ExampleBlock code={clearableCode} previewOverflow="visible">
              <ClearableDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="disabled" style={{ ...h2, marginTop: 0 }}>
              Состояние блокировки
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>disabled</code> — поле визуально неактивно, ввод и открытие панели недоступны.
            </p>
            <ExampleBlock code={disabledCode} previewOverflow="visible">
              <ComboBox options={docOptions} defaultValue="apple" disabled placeholder="Недоступно" />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="error" style={{ ...h2, marginTop: 0 }}>
              Состояние ошибки
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>error</code> подсвечивает поле как ошибочное и выставляет{' '}
              <code style={codeInline}>aria-invalid</code>. Текст ошибки под полем в компонент не входит.
            </p>
            <ExampleBlock code={errorCode} previewOverflow="visible">
              <ErrorDemo />
            </ExampleBlock>
          </div>

          <div style={sectionGap}>
            <h2 id="highlight" style={{ ...h2, marginTop: 0 }}>
              Подсветка совпадений
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
              <code style={codeInline}>highlightMatch</code> подсвечивает в результатах часть, совпавшую с запросом:
              совпадение — цветом <code style={codeInline}>--content-primary</code>, остальные символы —
              <code style={codeInline}>--content-secondary</code>. Для полностью своей разметки пункта используйте
              <code style={codeInline}>renderOption</code>.
            </p>
            <ExampleBlock code={highlightCode} previewOverflow="visible">
              <HighlightDemo />
            </ExampleBlock>
          </div>
        </div>
      </div>

      <nav
        className="combobox-docs-menu"
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
            <a href="#combobox-title" style={navLinkStyle} onClick={(e) => handleNav(e, 'combobox-title')}>
              ComboBox
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
            <a href="#width" style={navLinkStyle} onClick={(e) => handleNav(e, 'width')}>
              Ширина
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#multiline" style={navLinkStyle} onClick={(e) => handleNav(e, 'multiline')}>
              Многострочное
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#menu-height" style={navLinkStyle} onClick={(e) => handleNav(e, 'menu-height')}>
              Высота списка
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#positions" style={navLinkStyle} onClick={(e) => handleNav(e, 'positions')}>
              Положение панели
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#borderless" style={navLinkStyle} onClick={(e) => handleNav(e, 'borderless')}>
              Без обводки
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#start-icon" style={navLinkStyle} onClick={(e) => handleNav(e, 'start-icon')}>
              Иконка слева
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#max-length" style={navLinkStyle} onClick={(e) => handleNav(e, 'max-length')}>
              maxLength
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#mask" style={navLinkStyle} onClick={(e) => handleNav(e, 'mask')}>
              Маска
            </a>
          </li>
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#clearable" style={navLinkStyle} onClick={(e) => handleNav(e, 'clearable')}>
              Очистка
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
          <li style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}>
            <a href="#highlight" style={navLinkStyle} onClick={(e) => handleNav(e, 'highlight')}>
              Подсветка
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
