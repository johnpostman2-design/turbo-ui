import React, { lazy, Suspense, type ComponentType } from 'react';

const loadingFallback = <div style={{ padding: '1.5rem' }}>Загрузка…</div>;

/**
 * Lazy-страница Docs для `meta.parameters.docs.page`: один вызов на файл сторис.
 */
export function docsPageFromModule<M extends Record<string, ComponentType<unknown>>>(
  importFn: () => Promise<M>,
  exportName: keyof M & string
): () => React.ReactElement {
  const LazyPage = lazy(() =>
    importFn().then((mod) => ({ default: mod[exportName] as ComponentType<unknown> }))
  );
  return function StorybookDocsPage() {
    return (
      <Suspense fallback={loadingFallback}>
        <LazyPage />
      </Suspense>
    );
  };
}
