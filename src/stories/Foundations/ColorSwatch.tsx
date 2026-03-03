import React from 'react';
import tokensData from '../../tokens/tokens.json';

function getVar(name: string): string {
  return `var(--${name.replace(/-/g, '-')})`;
}

const hexToRgb = (hex: string): string => {
  const clean = hex.replace('#', '');
  if (clean.length === 8) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const a = Math.round((parseInt(clean.slice(6, 8), 16) / 255) * 1000) / 1000;
    return `${r}, ${g}, ${b}, ${a}`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `${r}, ${g}, ${b}, 1`;
  }
  return hex;
};

const toHexa = (hex: string): string => {
  const clean = hex.replace('#', '');
  if (clean.length === 6) return `#${clean.toUpperCase()}FF`;
  return `#${clean.toUpperCase()}`;
};

interface ColorRowProps {
  tokenName: string;
  colorValue: string;
}

const ColorRow: React.FC<ColorRowProps> = ({ tokenName, colorValue }) => (
  <div
    className="colors-table-row"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: getVar('spacing-20'),
      padding: `${getVar('spacing-12')} 0`,
      borderBottom: `1px solid ${getVar('border-disabled')}`,
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        flexShrink: 0,
        borderRadius: getVar('round-m'),
        border: `1px solid ${getVar('content-disabled')}`,
        backgroundColor: colorValue,
      }}
    />
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: getVar('spacing-20'),
        fontFamily: getVar('family-brand'),
        fontSize: getVar('typescale-lable-small-size'),
        lineHeight: getVar('typescale-lable-small-height'),
        fontWeight: getVar('weight-regular'),
        color: getVar('content-primary'),
      }}
    >
      <span className="colors-table-row-cell">{tokenName}</span>
      <span className="colors-table-row-cell">{hexToRgb(colorValue)}</span>
      <span className="colors-table-row-cell">{toHexa(colorValue)}</span>
    </div>
  </div>
);

const TableHeader: React.FC = () => (
  <div
    className="colors-table-header"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: getVar('spacing-20'),
      marginTop: getVar('spacing-32'),
      marginBottom: 0,
      paddingBottom: 0,
      fontFamily: getVar('family-brand'),
      fontSize: getVar('typescale-lable-small-size'),
      lineHeight: getVar('typescale-lable-small-height'),
      fontWeight: getVar('weight-regular'),
      color: getVar('content-tertiary'),
    }}
  >
    <div style={{ width: '40px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      <span className="colors-table-header-cell">Название</span>
    </div>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: getVar('spacing-20'),
      }}
    >
      <span />
      <span className="colors-table-header-cell">RGB</span>
      <span className="colors-table-header-cell">HEXA</span>
    </div>
  </div>
);

interface ColorSubgroupProps {
  title: string;
  tokens: Array<{ name: string; value: string }>;
}

const ColorSubgroup: React.FC<ColorSubgroupProps> = ({ title, tokens }) => {
  if (tokens.length === 0) return null;
  return (
    <section style={{ marginBottom: getVar('spacing-32'), marginTop: getVar('spacing-64') }}>
      <h3
        style={{
          fontFamily: getVar('family-brand'),
          fontSize: getVar('typescale-title-large-size'),
          lineHeight: getVar('typescale-title-large-height'),
          fontWeight: getVar('weight-regular'),
          color: getVar('content-primary'),
          marginBottom: getVar('spacing-24'),
          marginTop: 0,
        }}
      >
        {title}
      </h3>
      <TableHeader />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tokens.map((t) => (
          <ColorRow key={t.name} tokenName={t.name} colorValue={t.value} />
        ))}
      </div>
    </section>
  );
};

function getColorTokensFromData(data: Record<string, string>) {
  const surface: Array<{ name: string; value: string }> = [];
  const content: Array<{ name: string; value: string }> = [];
  const border: Array<{ name: string; value: string }> = [];
  Object.entries(data).forEach(([key, value]) => {
    const name = key;
    if (key.startsWith('surface-')) surface.push({ name, value });
    else if (key.startsWith('content-')) content.push({ name, value });
    else if (key.startsWith('border-')) border.push({ name, value });
  });
  const sort = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
  return { surface: surface.sort(sort), content: content.sort(sort), border: border.sort(sort) };
}

export const ColorsDisplay: React.FC = () => {
  const tokens = (tokensData?.tokens ?? {}) as Record<string, string>;
  const tokensByType = getColorTokensFromData(tokens);

  return (
    <div id="colors-docs-root" style={{ padding: `0 ${getVar('spacing-80')}` }}>
      <h1
        style={{
          fontFamily: getVar('family-brand'),
          fontSize: getVar('typescale-display-large-size'),
          lineHeight: getVar('typescale-display-large-height'),
          fontWeight: getVar('weight-regular'),
          color: getVar('content-primary'),
          marginBottom: getVar('spacing-32'),
          marginTop: 0,
        }}
      >
        Colors
      </h1>
      <h2
        style={{
          fontFamily: getVar('family-brand'),
          fontSize: getVar('typescale-title-large-size'),
          lineHeight: getVar('typescale-title-large-height'),
          fontWeight: getVar('weight-regular'),
          color: getVar('content-primary'),
          marginBottom: getVar('spacing-24'),
          marginTop: getVar('spacing-32'),
        }}
      >
        Tokens
      </h2>
      <ColorSubgroup title="Surface" tokens={tokensByType.surface} />
      <ColorSubgroup title="Content" tokens={tokensByType.content} />
      <ColorSubgroup title="Border" tokens={tokensByType.border} />
    </div>
  );
};

export const ColorSwatch: React.FC<{ tokenName: string; colorValue: string }> = (props) => (
  <ColorRow {...props} />
);
export const ColorGroup: React.FC<{ title: string; tokens: Array<{ name: string; value: string }> }> = (props) => (
  <ColorSubgroup {...props} />
);
export const getColorTokens = () => getColorTokensFromData((tokensData?.tokens ?? {}) as Record<string, string>);
