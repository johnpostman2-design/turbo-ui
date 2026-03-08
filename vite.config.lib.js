import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Сборка Turbo UI как библиотеки (ESM). Подключение по частям: turbo-ui/button, turbo-ui/provider. */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: path.resolve(dirname, 'src/index.ts'),
        'ui/button': path.resolve(dirname, 'src/ui/button/index.ts'),
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
