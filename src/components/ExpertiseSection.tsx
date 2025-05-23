'use client';

import { useRef } from "react";
import RevealOnScroll from "./animations/RevealOnScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const expertises = [
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
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stickyRef.current) return;

    ScrollTrigger.create({
      trigger: stickyRef.current,
      start: 'top top+=100',
      end: 'bottom top+=100',
      pin: stickyRef.current,
      pinSpacing: false,
      pinType: 'transform'
    });
  }, []); 

  return (
    <section className="relative w-full mt-[10vw] mb-[14vw]">
      <div className="relative min-h-screen w-full flex flex-row p-8 pt-24">
        <div ref={stickyRef} className="basis-1/2 flex flex-col justify-start items-center">
          <RevealOnScroll className="text-2xl -tracking-wider">
            <p>let&apos;s work together</p>
            <p><a
              className="underline hover:opacity-50"
              href="mailto:sansoen16@gmail.com"
            >
              sansoen16@gmail.com
            </a></p>
            
          </RevealOnScroll>
        </div>
        <div className="basis-1/2">
          <h3 className="text-4xl font-medium -tracking-wider opacity-50 mb-12">expertise</h3>
          <RevealOnScroll type="reveal-up">
            {expertises.map((text, index) => (
              <p key={index} className="text-8xl -tracking-wider leading-[115%]">
              {text}
            </p>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
