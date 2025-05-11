'use client';

import { gsap } from "gsap";
import { useEffect, useRef } from 'react';

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const texts = [
  'ui design, ux design',
  'interaction',
  'research',
  'creative direction',
  'branding',
  'visuals',
  'motion',
  'futuristic'
];

export default function ExpertiseSection() {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll("span");

    // Set initial state (start from off-screen)
    gsap.set(spans, { y: "100%" });

    // Create the GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Trigger when 80% of the <ul> is in the viewport
        toggleActions: "play none none none", // Restart the animation every time
        markers: true, // Optional, helps to see trigger points while testing
      },
    });

    tl.to(spans, {
      y: "0%",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <section className="relative w-full mt-[10vw] mb-[14vw]">
      <div className="relative min-h-screen w-full flex flex-row p-8 pt-24">
        <div className="relative basis-1/2 flex flex-col justify-start items-center">
          <div className="sticky top-24 text-2xl -tracking-wider">
            <p>let's work together</p>
            <a
              className="underline transition-opacity hover:opacity-50"
              href="mailto:sansoen16@gmail.com"
            >
              sansoen16@gmail.com
            </a>
          </div>
        </div>
        <div className="basis-1/2">
          <h3 className="text-4xl font-medium -tracking-wider opacity-50 mb-12">expertise</h3>
          <ul ref={containerRef}
            className="list-none m-0 p-0"
          >
            {texts.map((text, index) => (
              <li key={index} className="overflow-hidden">
                <span className="text-8xl -tracking-wider leading-[115%] block transform translate-y-full">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
