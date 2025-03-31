'use client';

import { useRef } from 'react';
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
        <div className="relative font-medium text-gray-800 -tracking-wider text-[5vw] leading-[110%] pt-24 px-8">
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
        >
          <div className="flex justify-start items-end h-full p-8">
            <div className="w-full flex flex-col gap-y-24">
              <div className="grid grid-cols-2 grid-rows-1">
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-row gap-x-1">
                    <h2 className="text-[8.5vw] font-medium leading-[75%]">5</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" version="1.1" viewBox="0 0 45.402 45.402" className="size-8">
                      <g>
                        <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-3xl font-medium -tracking-wider">years experience
                  </p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-row gap-x-1">
                    <h2 className="text-[8.5vw] font-medium leading-[75%]">150</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" version="1.1" viewBox="0 0 45.402 45.402" className="size-8">
                      <g>
                        <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-3xl font-medium -tracking-wider">projects done
                  </p>
                </div>
              </div>
              <h2 className="text-6xl font-medium -tracking-wider">
                I’m an award-winning designer creating convenient and immersive experiences in digital world.
                <br />
                <br />
                I have collaborated with numerous agencies, startups, companies and individuals across the globe, on projects that span from tech and finance to culture and e-commerce.

              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
