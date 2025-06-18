"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["Digital", "Systems", "Typography", "Motion", "Experience"];

export default function ScrollEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !leftTextRef.current) return;

      // Pin left text centered vertically
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () =>
          leftTextRef.current!.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight / 2,
        end: () =>
          containerRef.current!.getBoundingClientRect().bottom +
          window.scrollY -
          window.innerHeight / 2,
        pin: leftTextRef.current,
        pinSpacing: false,
      });

      // Initialize all words blurred with low opacity
      wordRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, {
            opacity: 0.2,
            filter: "blur(4px)",
          });
        }
      });

      // For each word, create ScrollTrigger with progress-based animation
      wordRefs.current.forEach((el) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "center 55%",
          end: "center 45%",
          onUpdate: (self) => {
            // self.progress goes 0 → 1 as you scroll through the range,
            // we want opacity and blur to ease from blurred → clear → blurred

            // Calculate eased opacity and blur based on progress
            // progress 0 → 0.5 → 1 means fade in then fade out
            let progress = self.progress;

            // Map progress 0→1 to a "fade in" and "fade out" effect:
            // fade in for first half (0 to 0.5), fade out for second half (0.5 to 1)
            let opacityVal: number;
            let blurVal: number;

            if (progress <= 0.5) {
              // fade in from 0.2 → 1
              const t = progress / 0.5;
              opacityVal = gsap.utils.interpolate(0.2, 1, t);
              blurVal = gsap.utils.interpolate(4, 0, t);
            } else {
              // fade out from 1 → 0.2
              const t = (progress - 0.5) / 0.5;
              opacityVal = gsap.utils.interpolate(1, 0.2, t);
              blurVal = gsap.utils.interpolate(0, 4, t);
            }

            // Apply styles directly
            el.style.opacity = opacityVal.toString();
            el.style.filter = `blur(${blurVal}px)`;

            // Blur all other words instantly when this word is animating
            wordRefs.current.forEach((other) => {
              if (other && other !== el) {
                other.style.opacity = "0.2";
                other.style.filter = "blur(4px)";
              }
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex max-w-7xl mx-auto px-16 gap-20">
      {/* Left sticky text */}
      <div ref={leftTextRef} className="w-1/4 flex justify-center items-start">
        <div className="text-lg font-semibold text-gray-800 mt-0">Design</div>
      </div>

      {/* Right vertical words */}
      <div className="w-3/4 flex flex-col justify-center">
        {words.map((word, i) => (
          <div
            key={i}
            ref={(el) => {(wordRefs.current[i] = el)}}
            className="text-9xl font-bold text-gray-900"
            style={{ filter: "blur(4px)", opacity: 0.2 }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
