"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimationType = 'fade' | 'flip' | 'slide' | 'reveal-up' | 'reveal-down';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  triggerOffset?: string;
  duration?: number;
  stagger?: number;
  type?: AnimationType;
}

export default function RevealOnScroll({
  children,
  className,
  triggerOffset = "90%",
  duration = 1.2,
  stagger = 0.15,
  type = 'slide',
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets =
      type === 'reveal-up' || type === 'reveal-down'
        ? Array.from(container.querySelectorAll('.reveal-line')) as HTMLElement[]
        : Array.from(container.children) as HTMLElement[];

    switch (type) {
      case 'flip':
        gsap.set(targets, {
          opacity: 0,
          rotationX: -100,
          skewX: 2,
          transformPerspective: 1200,
          transformOrigin: "top center",
        });
        break;
      case 'slide':
        gsap.set(targets, { y: 30, opacity: 0, skewX: 10 });
        break;
      case 'reveal-up':
        gsap.set(targets, { y: '100%' });
        break;
      case 'reveal-down':
          gsap.set(targets, { y: '-100%' });
          break;
      case 'fade':
      default:
        gsap.set(targets, { opacity: 0, skewX: 5 });
        break;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top ${triggerOffset}`,
        toggleActions: "play none none none",
      },
    });

    switch (type) {
      case 'flip':
        timeline.to(targets, {
          opacity: 1,
          rotationX: 0,
          skewX: 0,
          duration,
          ease: "power3.out",
        });
        break;
      case 'slide':
        timeline.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          skewX: 0,
          ease: "power4.out",
          stagger,
        });
        break;
      case 'reveal-up':
      case 'reveal-down':
        timeline.to(targets, {
          y: '0%',
          duration,
          ease: 'power4.out',
          stagger,
        });
        break;
      case 'fade':
      default:
        timeline.to(targets, {
          opacity: 1,
          duration,
          skewX: 0,
          ease: "power2.out",
          stagger,
        });
        break;
    }
  }, {
    scope: containerRef,
    dependencies: [triggerOffset, duration, stagger, type],
  });

  // Wrap each child for reveal-up
  const wrappedChildren =
    type === 'reveal-up' || type === 'reveal-down'
      ? React.Children.map(children, (child, index) => (
          <div key={index} className="overflow-hidden">
            <div className="reveal-line translate-y-full block">{child}</div>
          </div>
        ))
      : children;

  return (
    <div ref={containerRef} className={className}>
      {wrappedChildren}
    </div>
  );
}
