'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  // Drive Lenis manually via GSAP's ticker.
  useEffect(() => {
    function update(time: number) {
      // GSAP ticker gives time in seconds, convert to ms.
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  // Set up ScrollTrigger's scroller proxy.
  useEffect(() => {
    // ReactLenis adds a data attribute to its container.
    const container = document.querySelector('[data-lenis-container]') as HTMLElement;
    if (!container) return;

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value?: number) {
        if (arguments.length) {
          lenisRef.current?.lenis?.scrollTo(value, { duration: 0 });
        }
        // Return the current scroll position; adjust if needed.
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.addEventListener('refresh', () => {
      // Optionally update Lenis or perform recalculations here.
    });
    ScrollTrigger.refresh();
  }, []);

  // Refresh ScrollTrigger on route changes.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    // ReactLenis automatically creates a container with a data-lenis-container attribute.
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      {children}
    </ReactLenis>
  );
}
