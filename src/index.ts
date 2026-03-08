/**
 * Turbo UI — точка входа библиотеки.
 * Для tree-shaking предпочтительно импортировать по подпути: turbo-ui/button, turbo-ui/provider.
 */
export { Button } from './ui/button';
export type { ButtonProps } from './ui/button';
export { TurboUIProvider } from './provider';
export type { TurboUIProviderProps, ThemeOverrides } from './provider';
