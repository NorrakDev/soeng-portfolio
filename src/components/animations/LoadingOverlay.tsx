'use client';

import { useLoadingContext } from '@/components/common/LoadingContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

export default function LoadingOverlay() {
  const { isLoaded } = useLoadingContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isLoaded && overlayRef.current) {
      // Set loaded state after GSAP initialization
      document.documentElement.classList.remove('is-loading');

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [isLoaded]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
    >
      <p className="text-lg font-medium">{'[transition in progress...]'}</p>
    </div>
  );
}