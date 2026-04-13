/**
 * Копирует src/styles в dist/styles после сборки библиотеки.
 * Запуск: после vite build -c vite.config.lib.js
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcStyles = path.join(repoRoot, 'src/styles');
const distStyles = path.join(repoRoot, 'dist/styles');

if (!fs.existsSync(srcStyles)) {
  console.warn('src/styles not found, skip copy');
  process.exit(0);
}

if (!fs.existsSync(path.join(repoRoot, 'dist'))) {
  fs.mkdirSync(path.join(repoRoot, 'dist'), { recursive: true });
}
if (!fs.existsSync(distStyles)) {
  fs.mkdirSync(distStyles, { recursive: true });
}

const files = fs.readdirSync(srcStyles);
for (const name of files) {
  const srcFile = path.join(srcStyles, name);
  if (fs.statSync(srcFile).isFile()) {
    fs.copyFileSync(srcFile, path.join(distStyles, name));
  }
}
console.log('Copied src/styles to dist/styles');

const publicFonts = path.join(repoRoot, 'public', 'fonts');
const distFonts = path.join(repoRoot, 'dist', 'fonts');
if (fs.existsSync(publicFonts)) {
  if (!fs.existsSync(distFonts)) fs.mkdirSync(distFonts, { recursive: true });
  for (const name of fs.readdirSync(publicFonts)) {
    const srcF = path.join(publicFonts, name);
    if (fs.statSync(srcF).isFile()) {
      fs.copyFileSync(srcF, path.join(distFonts, name));
    }
  }
  console.log('Copied public/fonts to dist/fonts');
}

// Declaration shims for package.json exports (entry points)
const dist = path.join(repoRoot, 'dist');
const providerDts = path.join(dist, 'provider.d.ts');
const buttonDts = path.join(dist, 'ui', 'button.d.ts');
if (fs.existsSync(path.join(dist, 'provider', 'TurboUIProvider.d.ts'))) {
  fs.writeFileSync(providerDts, "export { TurboUIProvider } from './provider/TurboUIProvider';\nexport type { TurboUIProviderProps, ThemeOverrides } from './provider/TurboUIProvider';\n");
  console.log('Written dist/provider.d.ts');
}
if (fs.existsSync(path.join(dist, 'ui', 'button', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(buttonDts, "export { Button } from './button/index';\nexport type { ButtonProps, ButtonVariant } from './button/index';\n");
  console.log('Written dist/ui/button.d.ts');
}
const iconButtonDts = path.join(dist, 'ui', 'icon-button.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'icon-button', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(iconButtonDts, "export { IconButton } from './icon-button/index';\nexport type { IconButtonProps, IconButtonVariant } from './icon-button/index';\n");
  console.log('Written dist/ui/icon-button.d.ts');
}
const inputDts = path.join(dist, 'ui', 'input.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'input', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(inputDts, "export { Input } from './input/index';\nexport type { InputProps, InputSize, InputType } from './input/index';\n");
  console.log('Written dist/ui/input.d.ts');
}
const inputFieldDts = path.join(dist, 'ui', 'input-field.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'input-field', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    inputFieldDts,
    "export { InputField } from './input-field/index';\nexport type { InputFieldProps } from './input-field/index';\n"
  );
  console.log('Written dist/ui/input-field.d.ts');
}
const floatingInputFieldDts = path.join(dist, 'ui', 'floating-input-field.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'floating-input-field', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    floatingInputFieldDts,
    "export { FloatingInputField } from './floating-input-field/index';\nexport type { FloatingInputFieldProps } from './floating-input-field/index';\n"
  );
  console.log('Written dist/ui/floating-input-field.d.ts');
}
