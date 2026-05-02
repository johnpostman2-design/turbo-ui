/**
 * Генерирует src/styles/theme-vars.css из src/tokens/tokens.json.
 * Single Source of Truth: значения только из tokens.json.
 * Запуск: node scripts/gen-theme-css.cjs (или npm run gen:theme)
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const tokensPath = path.join(repoRoot, 'src/tokens/tokens.json');
const outPath = path.join(repoRoot, 'src/styles/theme-vars.css');

const data = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
const lines = ['/* Auto-generated from tokens.json. Do not edit. */', '', ':root {'];

function toCssValue(v) {
  if (typeof v === 'number') return `${v}px`;
  if (typeof v === 'string' && /^\d+$/.test(v)) return `${v}px`;
  return String(v);
}

// tokens (flat key-value)
if (data.tokens) {
  lines.push('  /* tokens */');
  for (const [k, v] of Object.entries(data.tokens)) {
    const varName = '--' + k.replace(/-/g, '-');
    lines.push(`  ${varName}: ${v};`);
  }
  lines.push('');
}

// spaces
if (data.spaces) {
  lines.push('  /* spaces */');
  for (const [k, v] of Object.entries(data.spaces)) {
    lines.push(`  --spacing-${k}: ${v};`);
  }
  lines.push('');
}

// rounds
if (data.rounds) {
  lines.push('  /* rounds */');
  for (const [k, v] of Object.entries(data.rounds)) {
    lines.push(`  --round-${k}: ${v};`);
  }
  lines.push('');
}

// typography (flatten; numbers get px; weight "regular" -> 400 for CSS)
if (data.typography) {
  lines.push('  /* typography */');
  for (const [k, v] of Object.entries(data.typography)) {
    const varName = '--' + k.replace(/-/g, '-');
    let cssVal;
    if (typeof v === 'number') cssVal = `${v}px`;
    else if (typeof v === 'string' && /^\d+$/.test(v)) cssVal = `${v}px`;
    else if (v === 'regular' && k.includes('weight')) cssVal = '400';
    else if (
      typeof v === 'string' &&
      (k === 'family-brand' || k.endsWith('-font'))
    ) {
      // Имена шрифтов с пробелами MUST быть в кавычках, иначе браузер игнорирует (падает в sans-serif)
      cssVal = `'${String(v).replace(/'/g, "\\'")}'`;
    } else cssVal = String(v);
    lines.push(`  ${varName}: ${cssVal};`);
  }
  lines.push('');
}

// button (borderRadius, gap, gapEmpty, transition; sizes — отдельные переменные при необходимости)
if (data.button) {
  lines.push('  /* button */');
  const b = data.button;
  if (b.borderRadius) lines.push(`  --button-border-radius: ${b.borderRadius};`);
  if (b.gap) lines.push(`  --button-gap: ${b.gap};`);
  if (b.gapEmpty) lines.push(`  --button-gap-empty: ${b.gapEmpty};`);
  if (b.transition) lines.push(`  --button-transition: ${b.transition};`);
  if (b.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(b.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = prop === 'iconSize' ? (typeof val === 'number' ? `${val}px` : val) : val;
        lines.push(`  --button-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

// iconButton (круглая кнопка-иконка по макету Figma 614-203)
if (data.iconButton) {
  lines.push('  /* iconButton */');
  const ib = data.iconButton;
  if (ib.transition) lines.push(`  --icon-button-transition: ${ib.transition};`);
  if (ib.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(ib.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = typeof val === 'number' ? `${val}px` : val;
        lines.push(`  --icon-button-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

// input (поле ввода по образцу Button)
if (data.input) {
  lines.push('  /* input */');
  const inp = data.input;
  if (inp.borderRadius) lines.push(`  --input-border-radius: ${inp.borderRadius};`);
  if (inp.transition) lines.push(`  --input-transition: ${inp.transition};`);
  if (inp.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(inp.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = typeof val === 'number' ? `${val}px` : val;
        lines.push(`  --input-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

// textarea (многострочное поле; min-height и радиус по макету 726:146)
if (data.textarea) {
  lines.push('  /* textarea */');
  const ta = data.textarea;
  if (ta.borderRadius) lines.push(`  --textarea-border-radius: ${ta.borderRadius};`);
  if (ta.transition) lines.push(`  --textarea-transition: ${ta.transition};`);
  if (ta.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(ta.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = typeof val === 'number' ? `${val}px` : val;
        lines.push(`  --textarea-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

// checkbox (флажок; размеры по макету 761:112)
if (data.checkbox) {
  lines.push('  /* checkbox */');
  const cb = data.checkbox;
  if (cb.borderRadius) lines.push(`  --checkbox-border-radius: ${cb.borderRadius};`);
  if (cb.transition) lines.push(`  --checkbox-transition: ${cb.transition};`);
  if (cb.focusBorderWidth != null) {
    const v = cb.focusBorderWidth;
    lines.push(`  --checkbox-focus-border-width: ${typeof v === 'number' ? `${v}px` : v};`);
  }
  if (cb.labelTransition) lines.push(`  --checkbox-label-transition: ${cb.labelTransition};`);
  if (cb.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(cb.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = typeof val === 'number' ? `${val}px` : val;
        lines.push(`  --checkbox-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

// radio (радиокнопка; размеры по макету 794:352)
if (data.radio) {
  lines.push('  /* radio */');
  const rd = data.radio;
  if (rd.transition) lines.push(`  --radio-transition: ${rd.transition};`);
  if (rd.focusBorderWidth != null) {
    const v = rd.focusBorderWidth;
    lines.push(`  --radio-focus-border-width: ${typeof v === 'number' ? `${v}px` : v};`);
  }
  if (rd.invalidRingWidth != null) {
    const v = rd.invalidRingWidth;
    lines.push(`  --radio-invalid-ring-width: ${typeof v === 'number' ? `${v}px` : v};`);
  }
  if (rd.labelTransition) lines.push(`  --radio-label-transition: ${rd.labelTransition};`);
  if (rd.sizes) {
    for (const [sizeName, sizeVal] of Object.entries(rd.sizes)) {
      for (const [prop, val] of Object.entries(sizeVal)) {
        const css = typeof val === 'number' ? `${val}px` : val;
        lines.push(`  --radio-${sizeName}-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${css};`);
      }
    }
  }
}

lines.push('}');
lines.push('');

fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log('Generated', outPath);
