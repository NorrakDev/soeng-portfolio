"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["Digital", "Systems", "Typography", "Motion", "Experience"];

export default function DesignScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !leftTextRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => {
          // Start pin when left text top hits center viewport
          const leftTop = leftTextRef.current!.getBoundingClientRect().top + window.scrollY;
          return leftTop - window.innerHeight / 2;
        },
        end: () => {
          // End pin when container bottom hits center viewport
          const containerBottom = containerRef.current!.getBoundingClientRect().bottom + window.scrollY;
          return containerBottom - window.innerHeight / 2;
        },
        pin: leftTextRef.current,
        pinSpacing: false,
      });

      // Animate words: only one clear at a time
      wordRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0.2, filter: "blur(4px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "center center",
              end: "center center",
              scrub: true,
              onUpdate: (self) => {
                if (self.isActive) {
                  wordRefs.current.forEach((other, j) => {
                    if (j !== i && other) {
                      gsap.to(other, {
                        opacity: 0.2,
                        filter: "blur(4px)",
                        duration: 0.2,
                        overwrite: "auto",
                      });
                    }
                  });
                }
              },
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex max-w-7xl mx-auto px-16 gap-20"
    >
      {/* Left text starts naturally at top, pins center viewport */}
      <div
        ref={leftTextRef}
        className="w-1/4 flex justify-center items-start"
      >
        <div className="text-lg font-semibold text-gray-800 mt-0">Design</div>
      </div>

      {/* Right words stacked tight */}
      <div className="w-3/4 flex flex-col justify-center">
        {words.map((word, i) => (
          <div
            key={i}
            ref={(el) => {(wordRefs.current[i] = el)}}
            className="text-9xl font-bold text-gray-900 opacity-20 blur-sm transition duration-300"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
