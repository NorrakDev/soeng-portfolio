// app/components/layout/ScrollRestoration.tsx
'use client';

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable browser’s built-in scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top only on hard reload
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry?.type === 'reload') {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
