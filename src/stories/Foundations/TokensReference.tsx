import React, { useMemo } from 'react';
import themeVarsCss from '../../styles/theme-vars.css?raw';

const p = {
  fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)',
  fontSize: 'var(--text-base, 15px)',
  lineHeight: 1.5,
  color: '#000000',
  marginBottom: '1rem',
} as const;

const codeStyle = { background: '#f0f0f0', padding: '0.125rem 0.35rem', borderRadius: 4 } as const;

function C({ children }: { children: React.ReactNode }) {
  return <code style={codeStyle}>{children}</code>;
}

function parseCssVariables(css: string): { name: string; value: string }[] {
  const rows: { name: string; value: string }[] = [];
  for (const line of css.split('\n')) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);?\s*$/);
    if (m) rows.push({ name: m[1], value: m[2].trim() });
  }
  return rows;
}

export function TokensReference() {
  const variables = useMemo(() => parseCssVariables(themeVarsCss), []);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--family-brand)', marginTop: 0 }}>Токены темы</h1>
      <p style={{ ...p, marginBottom: '0.75rem' }}>
        Настройки темы лежат в <C>src/tokens/tokens.json</C>. Команда <C>npm run gen:theme</C> превращает их в CSS-файл{' '}
        <C>src/styles/theme-vars.css</C>.
      </p>
      <p style={{ ...p, marginBottom: '0.75rem' }}>
        В приложении один раз подключите <C>turbo-ui/styles/theme</C> или только <C>turbo-ui/styles/theme-vars</C>. Нужно
        подправить пару переменных — оберните кусок экрана в <C>TurboUIProvider</C> и передайте проп <C>theme</C>.
      </p>
      <p style={{ ...p, marginBottom: '1.5rem' }}>
        Таблица ниже — это ваш текущий <C>theme-vars.css</C>. Поменяли json — снова <C>npm run gen:theme</C> и перезапустите Storybook, иначе здесь будет старое.
      </p>
      <div
        style={{
          border: '1px solid var(--border-tertiary, #e0e0e0)',
          borderRadius: 8,
          overflow: 'auto',
          maxHeight: '70vh',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', position: 'sticky', top: 0, zIndex: 1 }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '0.65rem 1rem',
                  fontFamily: 'var(--family-brand)',
                  fontWeight: 600,
                }}
              >
                Переменная
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '0.65rem 1rem',
                  fontFamily: 'var(--family-brand)',
                  fontWeight: 600,
                }}
              >
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {variables.map((row) => (
              <tr key={row.name} style={{ borderTop: '1px solid #eee' }}>
                <td
                  style={{
                    padding: '0.45rem 1rem',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'top',
                  }}
                >
                  {row.name}
                </td>
                <td
                  style={{
                    padding: '0.45rem 1rem',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                    wordBreak: 'break-word',
                    verticalAlign: 'top',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
