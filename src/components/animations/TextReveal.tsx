'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  triggerOffset?: string;
  delay?: number;
}

export default function TextReveal({ children, triggerOffset = "90%", delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = new SplitText(containerRef.current, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'overflow-hidden block will-change-transform',
      });

      gsap.from(splitRef.current.lines, {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.15,
        ease: 'back',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${triggerOffset}`,
          toggleActions: 'play none none none'
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
