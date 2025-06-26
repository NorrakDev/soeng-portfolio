"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollPinnedWordsProps {
  leftText: string;
  words: string[];
}

export default function ScrollPinnedWords({ leftText, words }: ScrollPinnedWordsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const container = containerRef.current!;
    const left = leftTextRef.current!;

    ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom 72%",
      pin: left,
      pinSpacing: false,
    });

    wordRefs.current.forEach((el) => {
      if (!el) return;

      gsap.set(el, { opacity: 0.2, filter: "blur(4px)", scale: 1 });

      ScrollTrigger.create({
        trigger: el,
        start: "top center+=200",
        end: "bottom center-=200",
        scrub: true,
        onUpdate: ({ progress }) => {
          const t = progress < 0.5 ? progress / 0.5 : (1 - progress) / 0.5;
          const eased = gsap.parseEase("power2.inOut")(t);
          el.style.opacity = `${gsap.utils.interpolate(0.2, 1, eased)}`;
          el.style.filter = `blur(${gsap.utils.interpolate(4, 0, eased)}px)`;
          el.style.transform = `scale(${gsap.utils.interpolate(1, 1.1, eased)})`;
        },
      });
    });
  }, { scope: containerRef, dependencies: [words] });

  return (
    <div ref={containerRef} className="flex gap-x-20 py-20 overflow-hidden">
      <div ref={leftTextRef} className="w-1/4 text-right">
        <div className="text-[2.5vw] font-medium -tracking-wider leading-tight">
          {leftText}
        </div>
      </div>

      <div className="w-3/4 flex flex-col justify-center">
        {words.map((word, i) => (
          <div
            key={i}
            ref={el => (wordRefs.current[i] = el, undefined)}
            className="text-[12vw] font-medium -tracking-widest leading-[95%]"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
