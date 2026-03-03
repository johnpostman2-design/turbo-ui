import React from 'react';
import tokensData from '../../tokens/tokens.json';

const parsed =
  typeof tokensData === 'string'
    ? (() => {
        try {
          return JSON.parse(tokensData) as Record<string, unknown>;
        } catch {
          return {};
        }
      })()
    : (tokensData as Record<string, unknown>);
const data = parsed?.typography
  ? parsed
  : (parsed as { default?: Record<string, unknown> })?.default;
const rawTypography = (data?.typography ?? {}) as Record<string, unknown>;
const typography = (rawTypography?.['mode-1'] ?? rawTypography ?? {}) as Record<string, number | string>;

function getVar(name: string): string {
  return `var(--${name.replace(/-/g, '-')})`;
}

interface StyleBlockProps {
  styleKey: string;
  displayName: string;
  sampleText: string;
}

const StyleBlock: React.FC<StyleBlockProps> = ({ styleKey, displayName, sampleText }) => {
  const size = typography[`typescale-${styleKey}-size`] as number | undefined;
  const height = typography[`typescale-${styleKey}-height`] as number | undefined;
  const tracking = (typography[`typescale-${styleKey}-tracking`] as number) ?? 0;
  const font = (typography[`typescale-${styleKey}-font`] as string) || (typography['family-brand'] as string) || 'ONY ONE';
  const weight = typography[`typescale-${styleKey}-weight`] as string | undefined;
  const weightNum = weight === 'regular' ? 400 : weight;

  if (size == null || height == null) return null;

  return (
    <div
      style={{
        backgroundColor: getVar('surface-secondary-main'),
        borderRadius: getVar('round-l'),
        padding: getVar('spacing-24'),
        display: 'flex',
        flexDirection: 'column',
        gap: getVar('spacing-12'),
      }}
    >
      <div
        style={{
          fontFamily: getVar('family-brand'),
          fontSize: getVar('typescale-lable-small-size'),
          lineHeight: getVar('typescale-lable-small-height'),
          fontWeight: getVar('weight-regular'),
          color: getVar('content-primary'),
        }}
      >
        {displayName}
      </div>
      <div
        className="typography-sample-text"
        style={{
          fontFamily: `"${font}", sans-serif`,
          fontSize: `${size}px`,
          lineHeight: `${height}px`,
          letterSpacing: `${tracking}px`,
          fontWeight: weightNum,
          color: getVar('content-primary'),
        }}
      >
        {sampleText}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: getVar('spacing-8') }}>
        <span
          className="typography-pill"
          style={{
            border: `1px solid ${getVar('border-tertiary')}`,
            borderRadius: getVar('round-x-l'),
            padding: `${getVar('spacing-8')} ${getVar('spacing-8')}`,
            fontFamily: getVar('family-brand'),
            fontSize: getVar('typescale-caption-medium-size'),
            lineHeight: getVar('typescale-caption-medium-height'),
            color: getVar('content-tertiary'),
          }}
        >
          Font: {font}
        </span>
        <span
          className="typography-pill"
          style={{
            border: `1px solid ${getVar('border-tertiary')}`,
            borderRadius: getVar('round-x-l'),
            padding: `${getVar('spacing-8')} ${getVar('spacing-8')}`,
            fontFamily: getVar('family-brand'),
            fontSize: getVar('typescale-caption-medium-size'),
            lineHeight: getVar('typescale-caption-medium-height'),
            color: getVar('content-tertiary'),
          }}
        >
          Weight: Regular
        </span>
        <span
          className="typography-pill"
          style={{
            border: `1px solid ${getVar('border-tertiary')}`,
            borderRadius: getVar('round-x-l'),
            padding: `${getVar('spacing-8')} ${getVar('spacing-8')}`,
            fontFamily: getVar('family-brand'),
            fontSize: getVar('typescale-caption-medium-size'),
            lineHeight: getVar('typescale-caption-medium-height'),
            color: getVar('content-tertiary'),
          }}
        >
          Size: {size}px
        </span>
        <span
          className="typography-pill"
          style={{
            border: `1px solid ${getVar('border-tertiary')}`,
            borderRadius: getVar('round-x-l'),
            padding: `${getVar('spacing-8')} ${getVar('spacing-8')}`,
            fontFamily: getVar('family-brand'),
            fontSize: getVar('typescale-caption-medium-size'),
            lineHeight: getVar('typescale-caption-medium-height'),
            color: getVar('content-tertiary'),
          }}
        >
          Line height: {height}px
        </span>
        <span
          className="typography-pill"
          style={{
            border: `1px solid ${getVar('border-tertiary')}`,
            borderRadius: getVar('round-x-l'),
            padding: `${getVar('spacing-8')} ${getVar('spacing-8')}`,
            fontFamily: getVar('family-brand'),
            fontSize: getVar('typescale-caption-medium-size'),
            lineHeight: getVar('typescale-caption-medium-height'),
            color: getVar('content-tertiary'),
          }}
        >
          Tracking: {tracking}px
        </span>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  items: Array<{ styleKey: string; displayName: string; sampleText: string }>;
}

const Section: React.FC<SectionProps> = ({ title, items }) => (
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: getVar('spacing-24') }}>
      {items.map((item) => (
        <StyleBlock
          key={item.styleKey}
          styleKey={item.styleKey}
          displayName={item.displayName}
          sampleText={item.sampleText}
        />
      ))}
    </div>
  </section>
);

const SECTIONS: Array<{
  title: string;
  items: Array<{ styleKey: string; displayName: string; sampleText: string }>;
}> = [
  {
    title: 'Display',
    items: [
      { styleKey: 'display-large', displayName: 'Display/large', sampleText: 'Great Design Only' },
    ],
  },
  {
    title: 'Headline',
    items: [
      { styleKey: 'headline-large', displayName: 'Headline/large', sampleText: 'Great Design Only' },
    ],
  },
  {
    title: 'Title',
    items: [
      { styleKey: 'title-large', displayName: 'Title/large', sampleText: 'The quick brown fox jumps over the lazy dog' },
    ],
  },
  {
    title: 'Body',
    items: [
      { styleKey: 'body-large', displayName: 'Body/large', sampleText: 'The quick brown fox jumps over the lazy dog' },
    ],
  },
  {
    title: 'Label',
    items: [
      { styleKey: 'lable-large', displayName: 'Label/large', sampleText: 'The quick brown fox jumps over the lazy dog' },
      { styleKey: 'lable-medium', displayName: 'Label/medium', sampleText: 'The quick brown fox jumps over the lazy dog' },
      { styleKey: 'lable-small', displayName: 'Label/small', sampleText: 'The quick brown fox jumps over the lazy dog' },
    ],
  },
  {
    title: 'Caption',
    items: [
      { styleKey: 'caption-large', displayName: 'Caption/large', sampleText: 'The quick brown fox jumps over the lazy dog' },
      { styleKey: 'caption-medium', displayName: 'Caption/medium', sampleText: 'The quick brown fox jumps over the lazy dog' },
    ],
  },
];

export const TypographyDisplay: React.FC = () => (
  <div style={{ padding: `0 ${getVar('spacing-80')}` }}>
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
      Text Styles
    </h1>
    {SECTIONS.map((sec) => (
      <Section key={sec.title} title={sec.title} items={sec.items} />
    ))}
  </div>
);

// Legacy exports for compatibility
export const TypographySwatch: React.FC<{
  tokenName: string;
  size: number;
  lineHeight: number;
  tracking: number;
  font: string;
  weight: string;
}> = () => null;

export const TypographyGroup: React.FC<{ title: string; tokens: unknown[] }> = () => null;

export const getTypographyTokens = () => {
  const typescales = [
    'display-large', 'headline-large', 'title-large', 'body-large',
    'lable-large', 'lable-medium', 'lable-small', 'caption-large', 'caption-medium',
  ];
  return typescales
    .filter((t) => typography[`typescale-${t}-size`] && typography[`typescale-${t}-height`])
    .map((typescale) => ({
      name: typescale.replace(/-/g, '.'),
      size: typography[`typescale-${typescale}-size`] as number,
      lineHeight: typography[`typescale-${typescale}-height`] as number,
      tracking: (typography[`typescale-${typescale}-tracking`] as number) ?? 0,
      font: (typography[`typescale-${typescale}-font`] as string) || 'ONY ONE',
      weight: (typography[`typescale-${typescale}-weight`] as string) || 'regular',
    }));
};
