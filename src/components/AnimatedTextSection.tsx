'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const texts = [
  'I design websites that help you',
  '① stand apart,',
  '② be aesthetically pleasing,',
  '③ articulate the important information with logical clarity,',
  '④ boost your earnings.',
];

export default function AnimatedTextSection() {
  const aboutContainerRef = useRef(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!aboutContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutContainerRef.current,
        start: 'top top',
        end: '+=00%',
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    texts.forEach((_, index) => {
      tl.to(
        textRefs.current[index],
        {
          opacity: 1,
          color: 'black',
        },
        index
      );
      if (index > 0) {
        tl.to(
          textRefs.current[index - 1],
          {
            opacity: 0.2,
          },
          index
        );
      }
    });

    tl.to(
      textRefs.current,
      {
        opacity: 1,
      },
      texts.length
    );

     // Make it stay longer when all text is fully visible
    tl.to({}, { duration: 2 });
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <div ref={aboutContainerRef} className='w-full h-full relative flex items-center justify-start'>
        <div className="relative font-semibold text-gray-800 tracking-[-0.01em] text-[4.2vw] leading-[110%]">
          {texts.map((text, index) => (
            <span
              key={index}
              ref={(el) => { (textRefs.current[index] = el) }}
              style={{ opacity: index === 0 ? 1 : 0.2 }}
            >
              {text}{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
