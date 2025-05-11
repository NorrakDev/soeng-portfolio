// components/FadeInOnScroll.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  triggerOffset?: string;
  duration?: number;
  stagger?: number;
}

export default function FadeInOnScroll({
  children,
  className,
  triggerOffset = "90%",
  duration = 1.2,
  stagger = 0.12,
}: FadeInOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = Array.from(containerRef.current.children) as HTMLElement[];

    gsap.set(targets, { y: 30, opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top ${triggerOffset}`,
        toggleActions: "restart none none none",
      },
    }).to(targets, {
      y: 0,
      opacity: 1,
      duration,
      ease: "power4.out",
      stagger,
    });
  }, [triggerOffset, duration, stagger]);

  return (
    <div ref={containerRef} className={`[&>*]:block ${className}`}>
      {children}
    </div>
  );
}
