'use client';

import {  useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const texts = [
  'I design products that help you ',
  '① stand apart,<br />② be aesthetically pleasing, ',
  '③ understanding<br />the user perspectivewith deep research,<br />',
  '④ boost your revenues',
];

export default function AboutMeSection() {
  const aboutContainerRef = useRef(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scrollingDivRef = useRef(null);

  useGSAP(() => {
    if (!aboutContainerRef.current || !scrollingDivRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutContainerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    texts.forEach((_, index) => {
      tl.to(textRefs.current[index], { opacity: 1, color: 'black' }, index);
      if (index > 0) {
        tl.to(textRefs.current[index - 1], { opacity: 0.2 }, index);
      }
    });

    tl.to(textRefs.current, { opacity: 1 }, texts.length);
    tl.to(scrollingDivRef.current, { opacity: 1, y: '0%' }, texts.length + 0.5);
    tl.to(scrollingDivRef.current, { y: '-30%', ease: 'power1.inOut' }, texts.length + 1);
    tl.to(scrollingDivRef.current, { y: '-60%', ease: 'power1.inOut' }, texts.length + 2);
    tl.to(scrollingDivRef.current, { y: '-85%', ease: 'power1.inOut' }, texts.length + 3);
    tl.to(scrollingDivRef.current, { y: '-100%', ease: 'power1.inOut' }, texts.length + 4);
    tl.to({}, { duration: 3 }, texts.length + 4);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div ref={aboutContainerRef} className="relative h-screen w-full flex items-start justify-start">
        <div className="relative font-medium text-gray-800 tracking-[-0.04em] text-[4.2vw] leading-[110%] pt-24 px-8">
          {texts.map((text, index) => (
            <span
              key={index}
              ref={(el) => { textRefs.current[index] = el; }}
              style={{ opacity: index === 0 ? 1 : 0.2 }}
              dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
            />
          ))}
        </div>

        <div 
          ref={scrollingDivRef}
          className="absolute bottom-[-100%] left-0 w-1/2 h-full bg-[#c0bfba] opacity-0"
        ></div>
      </div>
    </section>
  );
}
