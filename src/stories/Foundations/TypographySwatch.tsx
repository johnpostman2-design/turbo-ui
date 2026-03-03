import React from 'react';
import tokensData from '../../tokens/tokens.json';

interface TypographySwatchProps {
  tokenName: string;
  size: number;
  lineHeight: number;
  tracking: number;
  font: string;
  weight: string;
}

export const TypographySwatch: React.FC<TypographySwatchProps> = ({ 
  tokenName, 
  size, 
  lineHeight, 
  tracking, 
  font, 
  weight 
}) => {
  const exampleText = 'The quick brown fox jumps over the lazy dog';
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E6E6E6',
        padding: '16px',
        gap: '16px',
      }}
    >
      {/* Пример текста */}
      <div
        style={{
          width: '300px',
          flexShrink: 0,
          fontFamily: `"${font}", sans-serif`,
          fontSize: `${size}px`,
          lineHeight: `${lineHeight}px`,
          letterSpacing: `${tracking}px`,
          fontWeight: weight === 'regular' ? 400 : weight,
          color: 'var(--content-primary, #000000)',
        }}
      >
        {exampleText}
      </div>
      
      {/* Информация в колонках */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          gap: '24px',
          flex: 1,
        }}
      >
        {/* NAME */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{tokenName}</div>
        
        {/* SIZE */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{size}px</div>
        
        {/* LINE HEIGHT */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{lineHeight}px</div>
        
        {/* TRACKING */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{tracking}px</div>
        
        {/* FONT */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{font}</div>
        
        {/* WEIGHT */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{weight}</div>
      </div>
    </div>
  );
};

interface TypographyGroupProps {
  title: string;
  tokens: Array<{ 
    name: string; 
    size: number; 
    lineHeight: number; 
    tracking: number; 
    font: string; 
    weight: string;
  }>;
}

export const TypographyGroup: React.FC<TypographyGroupProps> = ({ title, tokens }) => {
  if (tokens.length === 0) {
    return null;
  }
  
  return (
    <div style={{ marginBottom: '72px' }}>
      <h3
        style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '35px',
          lineHeight: '40px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          marginBottom: '24px',
          marginTop: '32px',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Шапка таблицы */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            gap: '16px',
            borderBottom: '1px solid #E6E6E6',
            backgroundColor: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ width: '300px', flexShrink: 0 }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              gap: '24px',
              flex: 1,
            }}
          >
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >NAME</div>
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >SIZE</div>
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >LINE HEIGHT</div>
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >TRACKING</div>
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >FONT</div>
            <div 
              className="color-swatch-label"
              style={{ 
                fontFamily: '"ONY ONE", sans-serif',
                fontSize: '12px', 
                fontWeight: 700, 
                color: '#9F9F9F',
                lineHeight: '16px',
                margin: 0,
                padding: 0,
              }}
            >WEIGHT</div>
          </div>
        </div>
        
        {/* Список типографики */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {tokens.map((token) => (
            <TypographySwatch 
              key={token.name} 
              tokenName={token.name}
              size={token.size}
              lineHeight={token.lineHeight}
              tracking={token.tracking}
              font={token.font}
              weight={token.weight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Функция для группировки токенов типографики
export const getTypographyTokens = () => {
  const typography = tokensData.typography;
  
  const tokens: Array<{ 
    name: string; 
    size: number; 
    lineHeight: number; 
    tracking: number; 
    font: string; 
    weight: string;
  }> = [];
  
  // Собираем все typescale токены
  const typescales = [
    'display-large',
    'headline-large',
    'title-large',
    'body-large',
    'lable-medium',
    'caption-large',
    'lable-small',
    'lable-large',
  ];
  
  typescales.forEach((typescale) => {
    const sizeKey = `typescale-${typescale}-size`;
    const heightKey = `typescale-${typescale}-height`;
    const trackingKey = `typescale-${typescale}-tracking`;
    const fontKey = `typescale-${typescale}-font`;
    const weightKey = `typescale-${typescale}-weight`;
    
    if (typography[sizeKey] && typography[heightKey]) {
      tokens.push({
        name: typescale.replace(/-/g, '.'),
        size: typography[sizeKey] as number,
        lineHeight: typography[heightKey] as number,
        tracking: typography[trackingKey] as number || 0,
        font: typography[fontKey] as string || typography['family-brand'] as string,
        weight: typography[weightKey] as string || 'regular',
      });
    }
  });
  
  // Сортируем токены по размеру (от большего к меньшему)
  tokens.sort((a, b) => b.size - a.size);
  
  return tokens;
};

// Компонент для отображения всех групп типографики
export const TypographyDisplay: React.FC = () => {
  const typographyTokens = getTypographyTokens();
  
  return (
    <div style={{ padding: '0 80px' }}>
      <h2
        style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '52px',
          lineHeight: '52px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          marginBottom: '32px',
        }}
      >
        Typography
      </h2>
      <TypographyGroup title="Typescale" tokens={typographyTokens} />
    </div>
  );
};
