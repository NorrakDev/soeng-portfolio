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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current!;
    const scrubWrap = scrubRef.current!;
    const bgText = textRef.current!;
    const vh = window.innerHeight;
    const scrollH = scrubWrap.scrollHeight;
    const distance = scrollH - vh + vh * 0.2;

    // 1) give the container the right height
    container.style.height = `${vh + distance}px`;

    // 2) pin & scrub the images
    gsap.fromTo(
      scrubWrap,
      { y: vh },
      {
        y: vh - scrollH,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${distance}`,
          scrub: true,
          pin: scrubWrap,
          pinSpacing: false,
        },
      }
    );

    // 3) pin the background text in the exact same window‐scroll span
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${distance}`,
      pin: bgText,
      pinSpacing: false,
    });

    // 4) skew effect (unchanged)
    gsap.utils.toArray<HTMLImageElement>('.image').forEach((img) => {
      ScrollTrigger.create({
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate({ getVelocity }) {
          gsap.fromTo(
            img,
            { skewY: `${getVelocity() / 200}deg` },
            { skewY: 0 }
          );
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-white overflow-hidden"
    >
      {/* 1. Background text now has a ref */}
      <div
        ref={textRef}
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-0 pointer-events-none"
      >
        <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
          with a bit of design that look like
        </p>
      </div>

      {/* 2. Images wrapper (scrub‐pinned) */}
      <div
        ref={scrubRef}
        className="relative top-0 w-full flex flex-col gap-10 px-6 py-20 items-center z-10"
      >
        {imageUrls.map((url, i) => (
          <div
            key={i}
            className={`w-3/4 flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
          >
            <div className="max-w-[600px] w-full">
              <Image
                src={url}
                alt={`image-${i}`}
                width={600}
                height={450}
                className="image rounded-lg object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
