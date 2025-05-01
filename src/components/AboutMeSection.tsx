'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const texts = [
  'I design products that help you ',
  '① stand apart,<br />② be aesthetically pleasing, ',
  '③ understanding<br />the user perspective with deep research,<br />',
  '④ boost your revenues',
];

export default function AboutMeSection() {
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scrollingDivRef = useRef<HTMLDivElement>(null);
  const scrollingDivRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = aboutContainerRef.current;
    const scrollDiv1 = scrollingDivRef.current;
    const scrollDiv2 = scrollingDivRef2.current;
    if (!container || !scrollDiv1 || !scrollDiv2) return;

    // Initially position scrolling divs offscreen bottom
    gsap.set(scrollDiv1, { yPercent: 100 });
    gsap.set(scrollDiv2, { yPercent: 100 });

    // Define total scroll phases: one per text + phase for first scrollDiv + phase for second scrollDiv
    const totalPhases = texts.length + 2;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalPhases * 100}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Fade texts sequentially
    texts.forEach((_, i) => {
      tl.to(textRefs.current[i], { opacity: 1, color: 'black' }, i);
      if (i > 0) tl.to(textRefs.current[i - 1], { opacity: 0.2 }, i);
    });
    tl.to(textRefs.current, { opacity: 1 }, texts.length);

    // Move first scrolling div up
    tl.to(scrollDiv1, { yPercent: 0, ease: 'none', duration: 1 });
    tl.to({}, { duration: 0.3 });
    // Move second scrolling div up after first is pinned
    tl.to(scrollDiv2, { yPercent: 0, ease: 'none', duration: 1 });

    tl.to({}, { duration: 0.7 });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#d0d0d0]">
      <div
        ref={aboutContainerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Text layers */}
        <div className="absolute inset-0 flex items-start justify-start px-8 pt-24">
          <div className="relative font-medium -tracking-wider text-[5vw] leading-[110%]">
            {texts.map((text, index) => (
              <span
                key={index}
                ref={(el) => { textRefs.current[index] = el; }}
                style={{ opacity: index === 0 ? 1 : 0.2 }}
                dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
              />
            ))}
          </div>
        </div>

        {/* Scrolling DIV overlays texts */}
        <div
          ref={scrollingDivRef}
          className="absolute bottom-0 left-0 w-1/2 h-full bg-[#c0bfba]"
        >
          <div className="flex h-full flex-col justify-end p-8 gap-y-24">
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex flex-col gap-y-6">
                <div className="flex gap-x-1 items-end">
                  <h2 className="text-[8.5vw] font-medium leading-[75%]">5</h2>
                  <span className='text-[4.5vw] leading-[75%]'>+</span>
                </div>
                <p className="text-3xl font-medium -tracking-wider">years experience</p>
              </div>

              <div className="flex flex-col gap-y-6">
                <div className="flex gap-x-1 items-end">
                  <h2 className="text-[8.5vw] font-medium leading-[75%]">40</h2>
                  <span className='text-[4.5vw] leading-[75%]'>+</span>
                </div>
                <p className="text-3xl font-medium -tracking-wider">projects done</p>
              </div>
            </div>

            <h2 className="text-6xl font-medium -tracking-wider">
              I’m an award-winning designer creating convenient and immersive experiences in the digital world.
              <br /><br />
              I have collaborated with numerous agencies, startups, companies and individuals across the globe, on projects that span tech, finance, culture, and e-commerce.
            </h2>
          </div>
        </div>

        <div
          ref={scrollingDivRef2}
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center"
        >
          <div className="relative w-full max-w-lg">
            <div className="bg-[#9a9ca0] p-8 overflow-hidden
                      [mask-image:radial-gradient(circle_at_top_center,transparent_24px,black_25px)]">

              {/* Content */}
              <h2 className="text-3xl font-medium -tracking-wider leading-[110%] pt-20 pb-12 text-center">
                My approach is rooted in a set of guiding principles that ensure the best outcome for every project:
              </h2>

              <div className="space-y-4 text-3xl font-medium">
                <div className="grid grid-cols-2 border-t-2 border-black pt-2">
                  <span>1.</span> <span>Honesty</span>
                </div>
                <div className="grid grid-cols-2 border-t-2 border-black pt-2">
                  <span>2.</span> <span>Transparency</span>
                </div>
                <div className="grid grid-cols-2 border-t-2 border-black pt-2">
                  <span>3.</span> <span>High Devotion</span>
                </div>
                <div className="grid grid-cols-2 border-t-2 border-black pt-2">
                  <span>4.</span> <span>Consistency</span>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
