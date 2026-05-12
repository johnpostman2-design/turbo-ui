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
const linkDts = path.join(dist, 'ui', 'link.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'link', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    linkDts,
    "export { Link } from './link/index';\nexport type { LinkProps, LinkVariant } from './link/index';\n"
  );
  console.log('Written dist/ui/link.d.ts');
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
const textareaDts = path.join(dist, 'ui', 'textarea.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'textarea', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    textareaDts,
    "export { TextArea } from './textarea/index';\nexport type { TextAreaProps, TextAreaSize } from './textarea/index';\n"
  );
  console.log('Written dist/ui/textarea.d.ts');
}
const checkboxDts = path.join(dist, 'ui', 'checkbox.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'checkbox', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    checkboxDts,
    "export { Checkbox } from './checkbox/index';\nexport type { CheckboxProps, CheckboxSize } from './checkbox/index';\n"
  );
  console.log('Written dist/ui/checkbox.d.ts');
}
const radioDts = path.join(dist, 'ui', 'radio.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'radio', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    radioDts,
    "export { Radio } from './radio/index';\nexport type { RadioProps, RadioSize } from './radio/index';\n"
  );
  console.log('Written dist/ui/radio.d.ts');
}
const toggleDts = path.join(dist, 'ui', 'toggle.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'toggle', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    toggleDts,
    "export { Toggle } from './toggle/index';\nexport type { ToggleProps, ToggleSize } from './toggle/index';\n"
  );
  console.log('Written dist/ui/toggle.d.ts');
}
const tabsDts = path.join(dist, 'ui', 'tabs.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'tabs', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    tabsDts,
    "export { Tabs, TabsList, Tab, TabsPanel } from './tabs/index';\nexport type { TabsProps, TabsSize, TabsListProps, TabProps, TabsPanelProps } from './tabs/index';\n"
  );
  console.log('Written dist/ui/tabs.d.ts');
}
const listboxDts = path.join(dist, 'ui', 'listbox.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'listbox', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    listboxDts,
    "export { Listbox } from './listbox/index';\nexport type { ListboxOption, ListboxProps, ListboxSize } from './listbox/index';\n"
  );
  console.log('Written dist/ui/listbox.d.ts');
}
const selectDts = path.join(dist, 'ui', 'select.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'select', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    selectDts,
    "export { Select } from './select/index';\nexport type { SelectProps, SelectSize, SelectPosition } from './select/index';\n"
  );
  console.log('Written dist/ui/select.d.ts');
}
const comboboxDts = path.join(dist, 'ui', 'combobox.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'combobox', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    comboboxDts,
    "export { ComboBox } from './combobox/index';\nexport type { ComboBoxProps, ComboBoxOption, ComboBoxSize, ComboBoxPosition, ComboBoxRenderContext } from './combobox/index';\n"
  );
  console.log('Written dist/ui/combobox.d.ts');
}
const selectFieldDts = path.join(dist, 'ui', 'select-field.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'select-field', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    selectFieldDts,
    "export { SelectField } from './select-field/index';\nexport type { SelectFieldProps } from './select-field/index';\n"
  );
  console.log('Written dist/ui/select-field.d.ts');
}
const comboboxFieldDts = path.join(dist, 'ui', 'combobox-field.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'combobox-field', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    comboboxFieldDts,
    "export { ComboBoxField } from './combobox-field/index';\nexport type { ComboBoxFieldProps } from './combobox-field/index';\n"
  );
  console.log('Written dist/ui/combobox-field.d.ts');
}
const textareaFieldDts = path.join(dist, 'ui', 'textarea-field.d.ts');
if (fs.existsSync(path.join(dist, 'ui', 'textarea-field', 'index.d.ts'))) {
  fs.mkdirSync(path.join(dist, 'ui'), { recursive: true });
  fs.writeFileSync(
    textareaFieldDts,
    "export { TextAreaField } from './textarea-field/index';\nexport type { TextAreaFieldProps } from './textarea-field/index';\n"
  );
  console.log('Written dist/ui/textarea-field.d.ts');
}
const iconsRootDts = path.join(dist, 'icons.d.ts');
const iconsNestedIndex = path.join(dist, 'components', 'icons', 'index.d.ts');
if (fs.existsSync(iconsNestedIndex)) {
  fs.writeFileSync(
    iconsRootDts,
    "export { Icon, iconNames, getIconContent } from './components/icons/index';\nexport type { IconProps, IconState } from './components/icons/Icon';\nexport type { IconContent } from './components/icons/iconRegistry';\n"
  );
  console.log('Written dist/icons.d.ts');
}
