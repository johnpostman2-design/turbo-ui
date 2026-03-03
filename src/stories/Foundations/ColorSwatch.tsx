import React from 'react';
import tokensData from '../../tokens/tokens.json';

// Функция для конвертации hex в RGB
const hexToRgb = (hex: string): string => {
  // Убираем # если есть
  const cleanHex = hex.replace('#', '');
  
  // Обрабатываем hex с альфа-каналом (8 символов) или без (6 символов)
  let r: number, g: number, b: number;
  
  if (cleanHex.length === 8) {
    // RGBA формат: #RRGGBBAA
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
    const a = parseInt(cleanHex.substring(6, 8), 16) / 255;
    return `${r}, ${g}, ${b}, ${a.toFixed(3)}`;
  } else if (cleanHex.length === 6) {
    // RGB формат: #RRGGBB
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  } else if (cleanHex.length === 4) {
    // Короткий формат с альфа: #RGBA
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    const a = parseInt(cleanHex[3] + cleanHex[3], 16) / 255;
    return `${r}, ${g}, ${b}, ${a.toFixed(3)}`;
  } else {
    // Короткий формат: #RGB
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `${r}, ${g}, ${b}`;
  }
};

interface ColorSwatchProps {
  tokenName: string;
  colorValue: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ tokenName, colorValue }) => {
  const rgb = hexToRgb(colorValue);
  const hexa = colorValue.toUpperCase();
  
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
      {/* Цветной блок */}
      <div
        style={{
          width: '53.33px',
          height: '53.33px',
          backgroundColor: colorValue,
          border: '1px solid #E6E6E6',
          flexShrink: 0,
        }}
      />
      
      {/* Информация в три столбца */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
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
        
        {/* RGB */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{rgb}</div>
        
        {/* HEXA */}
        <div style={{
          fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 'var(--weight-regular, 400)',
          color: 'var(--content-primary, #000000)',
          margin: 0,
          padding: 0,
        }}>{hexa}</div>
      </div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  tokens: Array<{ name: string; value: string }>;
}

export const ColorGroup: React.FC<ColorGroupProps> = ({ title, tokens }) => {
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
          <div style={{ width: '53.33px', flexShrink: 0 }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
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
            >RGB</div>
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
            >HEXA</div>
          </div>
        </div>
        
        {/* Список цветов */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {tokens.map((token) => (
            <ColorSwatch key={token.name} tokenName={token.name} colorValue={token.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Функция для группировки токенов
export const getColorTokens = () => {
  const tokens = tokensData.tokens;
  
  const surfaceTokens: Array<{ name: string; value: string }> = [];
  const contentTokens: Array<{ name: string; value: string }> = [];
  const borderTokens: Array<{ name: string; value: string }> = [];
  
  Object.entries(tokens).forEach(([key, value]) => {
    // Преобразуем имя токена: content-primary -> content.primary
    // surface-primary-main -> surface.primary.main
    // border-primary -> border.primary
    let tokenName = key;
    
    if (key.startsWith('content-')) {
      tokenName = key.replace('content-', 'content.').replace(/-/g, '.');
      contentTokens.push({ name: tokenName, value: value as string });
    } else if (key.startsWith('surface-')) {
      tokenName = key.replace('surface-', 'surface.').replace(/-/g, '.');
      surfaceTokens.push({ name: tokenName, value: value as string });
    } else if (key.startsWith('border-')) {
      tokenName = key.replace('border-', 'border.').replace(/-/g, '.');
      borderTokens.push({ name: tokenName, value: value as string });
    }
  });
  
  // Сортируем токены по имени
  const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
  
  return {
    surface: surfaceTokens.sort(sortByName),
    content: contentTokens.sort(sortByName),
    border: borderTokens.sort(sortByName),
  };
};

// Компонент для отображения всех групп цветов
export const ColorsDisplay: React.FC = () => {
  const colorGroups = getColorTokens();
  
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
        Colors
      </h2>
      <ColorGroup title="Surface" tokens={colorGroups.surface} />
      <ColorGroup title="Content" tokens={colorGroups.content} />
      <ColorGroup title="Border" tokens={colorGroups.border} />
    </div>
  );
};
