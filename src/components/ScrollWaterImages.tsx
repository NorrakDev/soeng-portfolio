'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const imageUrls = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/600/450?random=${i + 1}`
);

export default function ScrollWaterImages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const imagesWrapper = imagesWrapperRef.current!;
    const vh = window.innerHeight;
    const imagesHeight = imagesWrapper.scrollHeight;

    const pinDuration = imagesHeight - vh + vh * 0.2;

    gsap.fromTo(
      imagesWrapper,
      { y: vh },
      {
        y: vh - imagesHeight,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${pinDuration}`,
          scrub: true,
          pin: true,
        },
      }
    );

    // Apply skew effect to each image
    gsap.utils.toArray('.image').forEach((image) => {
      ScrollTrigger.create({
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate({ getVelocity }) {
          gsap.fromTo(
            image,
            { skewY: `${getVelocity() / 200}deg` },
            { skewY: 0 }
          );
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden"
    >
      {/* Text behind images */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
          with a bit of design that look like
        </p>
      </div>

      {/* Images on top */}
      <div
        ref={imagesWrapperRef}
        className="absolute top-0 left-0 w-full flex flex-col gap-10 px-6 py-20 z-10 items-center"
      >
        {imageUrls.map((url, i) => (
          <div
            key={i}
            className={`w-3/4 flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className="max-w-[600px] w-full">
              <Image
                src={url}
                alt={`image-${i}`}
                width={600}
                height={450}
                className="image rounded-lg object-cover shadow-lg"
                priority={true}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
