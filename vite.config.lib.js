import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Сборка Turbo UI как библиотеки (ESM). Подключение по частям: turbo-ui/button, turbo-ui/provider. */
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: path.resolve(dirname, 'tsconfig.build.json'),
      outDir: 'dist',
      include: ['src/index.ts', 'src/ui/button/**/*.ts', 'src/ui/button/**/*.tsx', 'src/ui/icon-button/**/*.ts', 'src/ui/icon-button/**/*.tsx', 'src/ui/link/**/*.ts', 'src/ui/link/**/*.tsx', 'src/ui/input/**/*.ts', 'src/ui/input/**/*.tsx', 'src/ui/input-field/**/*.ts', 'src/ui/input-field/**/*.tsx', 'src/ui/floating-input-field/**/*.ts', 'src/ui/floating-input-field/**/*.tsx', 'src/ui/textarea/**/*.ts', 'src/ui/textarea/**/*.tsx', 'src/ui/textarea-field/**/*.ts', 'src/ui/textarea-field/**/*.tsx', 'src/ui/checkbox/**/*.ts', 'src/ui/checkbox/**/*.tsx', 'src/ui/radio/**/*.ts', 'src/ui/radio/**/*.tsx', 'src/ui/toggle/**/*.ts', 'src/ui/toggle/**/*.tsx', 'src/ui/tabs/**/*.ts', 'src/ui/tabs/**/*.tsx', 'src/ui/listbox/**/*.ts', 'src/ui/listbox/**/*.tsx', 'src/ui/select/**/*.ts', 'src/ui/select/**/*.tsx', 'src/ui/select-field/**/*.ts', 'src/ui/select-field/**/*.tsx', 'src/ui/combobox/**/*.ts', 'src/ui/combobox/**/*.tsx', 'src/ui/combobox-field/**/*.ts', 'src/ui/combobox-field/**/*.tsx', 'src/provider/**/*.tsx', 'src/tokens/**/*.ts'],
      exclude: ['**/*.test.*', '**/*.stories.*', '**/*.docs.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(dirname, 'src/index.ts'),
        'ui/button': path.resolve(dirname, 'src/ui/button/index.ts'),
        'ui/icon-button': path.resolve(dirname, 'src/ui/icon-button/index.ts'),
        'ui/link': path.resolve(dirname, 'src/ui/link/index.ts'),
        'ui/input': path.resolve(dirname, 'src/ui/input/index.ts'),
        'ui/input-field': path.resolve(dirname, 'src/ui/input-field/index.ts'),
        'ui/floating-input-field': path.resolve(dirname, 'src/ui/floating-input-field/index.ts'),
        'ui/textarea': path.resolve(dirname, 'src/ui/textarea/index.ts'),
        'ui/checkbox': path.resolve(dirname, 'src/ui/checkbox/index.ts'),
        'ui/radio': path.resolve(dirname, 'src/ui/radio/index.ts'),
        'ui/toggle': path.resolve(dirname, 'src/ui/toggle/index.ts'),
        'ui/tabs': path.resolve(dirname, 'src/ui/tabs/index.ts'),
        'ui/listbox': path.resolve(dirname, 'src/ui/listbox/index.ts'),
        'ui/select': path.resolve(dirname, 'src/ui/select/index.ts'),
        'ui/select-field': path.resolve(dirname, 'src/ui/select-field/index.ts'),
        'ui/combobox': path.resolve(dirname, 'src/ui/combobox/index.ts'),
        'ui/combobox-field': path.resolve(dirname, 'src/ui/combobox-field/index.ts'),
        'ui/textarea-field': path.resolve(dirname, 'src/ui/textarea-field/index.ts'),
        provider: path.resolve(dirname, 'src/provider/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
