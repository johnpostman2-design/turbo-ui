/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ImportMeta {
  glob: <T = unknown>(pattern: string, options?: { eager?: boolean; import?: string; query?: string }) => Record<string, T>;
}
