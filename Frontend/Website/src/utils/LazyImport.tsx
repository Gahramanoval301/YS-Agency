// src/utils/lazyImport.tsx
import { lazy, Suspense } from "react";
import type { ComponentType } from "react"; 

export function lazyImport<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const Component = lazy(factory);

  return {
    Component: (props: React.ComponentProps<T>) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    ),
  };
}
