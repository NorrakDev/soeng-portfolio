'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const COLUMN_COUNT = 6;

export default function TransitionCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!curtainRef.current) return;

    const columns = curtainRef.current.querySelectorAll<HTMLDivElement>('.curtain-column');
    const message = messageRef.current;

    if (!columns.length || !message) return;

    const tl = gsap.timeline();

    tl.to(columns, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
      stagger: 0.1,
    }, 0) // start immediately
    .to(message, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, 0.4); // fade out while curtain is opening
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="transition-curtain fixed inset-0 z-[99999] pointer-events-none flex"
      style={{ overflow: 'hidden' }}
    >
      {/* Message is visible by default */}
      <div
        ref={messageRef}
        className="transition-message absolute inset-0 flex items-center justify-center text-white text-lg font-semibold pointer-events-none"
        style={{
          opacity: 1, // ✅ show immediately
          zIndex: 1,
        }}
      >
        [transition in progress]
      </div>

      {[...Array(COLUMN_COUNT)].map((_, i) => (
        <div
          key={i}
          className="curtain-column bg-black"
          style={{
            flex: 1,
            height: '100vh',
            transform: 'translateY(0%)', // ✅ visible immediately
          }}
        />
      ))}
    </div>
  );
}
