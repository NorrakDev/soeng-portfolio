'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { useLoadingContext } from '../common/LoadingContext';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { setLoaded } = useLoadingContext();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  // Handle scroll reset on route changes
  useEffect(() => {
    if (smootherRef.current) {
      // Immediate scroll to top
      smootherRef.current.scrollTop(0);
      // Refresh the ScrollSmoother instance
      smootherRef.current.refresh();
    }
  }, [pathname]);

  useGSAP(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Kill existing instance if exists
    if (smootherRef.current) {
      smootherRef.current.kill();
    }

    // Create new smoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    setLoaded(true);

    // Cleanup on unmount
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, { scope: wrapperRef });

  return (
    <div id='smooth-wrapper' ref={wrapperRef}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}