// components/common/PageTransition.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useLoadingContext } from '../common/LoadingContext';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { setLoaded } = useLoadingContext();
  const pathname = usePathname();

  // EXIT animation: runs when this component is about to unmount
  useEffect(() => {
    return () => {
      // show the overlay
      setLoaded(false);
      // fade out page-content
      gsap.to('.page-content', {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    };
  }, [pathname, setLoaded]);

  // ENTER animation: runs on mount (i.e. new page)
  useEffect(() => {
    // first make sure overlay is up, then once smoother sets loaded=true it’ll hide
    // and we animate in
    gsap.fromTo(
      '.page-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => {
          // we’ll rely on your SmoothScroll’s setLoaded(true) to hide the overlay
        },
      }
    );
  }, [pathname]);

  return <div className="page-content">{children}</div>;
}
