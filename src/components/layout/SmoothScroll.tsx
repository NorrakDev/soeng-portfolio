'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { useLoadingContext } from '../common/LoadingContext';
import { usePathname } from 'next/navigation';
import { useIsomorphicLayoutEffect } from '../../helpers/isomorphicEffect';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { setLoaded } = useLoadingContext();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Create new smoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    setLoaded(true);
  }, { dependencies: [pathname] });

  useIsomorphicLayoutEffect(() => {
    // Scroll to top on route change
    if (smootherRef.current) {
      smootherRef.current.scrollTo(0, false); // no animation
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' }); // Fallback
    }
  }, [pathname]);

  return (
    <div id='smooth-wrapper' ref={wrapperRef}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}