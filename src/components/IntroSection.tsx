"use client";
import * as React from 'react';
import FlipLink from './animations/FlipLink';
import RevealOnScroll from './animations/RevealOnScroll';

const specialisingTexts = [
  'specialising in:',
  'digital design',
  'branding',
  'web experiences',
  'webflow development',
  'typography',
  'art direction'
];

export default function IntroSection() {

  return (
    <section className="px-8 mt-[14vw] mb-[14vw]">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <img
              src="https://cdn.prod.website-files.com/666066030b1447405865fff8/674ef4bbe8fcbec7ae18ca8b_Filip%20Felbar%20-%20Intro%20Image-p-1600.webp"
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-center items-start w-full gap-x-[18vw] gap-y-[18vw]">
            <RevealOnScroll
              type='flip'
              className="flex flex-col font-medium -tracking-wider text-[7vw] leading-[80%]"
            >
              <span>senior digital</span>
              <span>designer helping</span>
              <span>brands communicate</span>
              <span>with their audience in</span>
              <span>a meaningful way</span>
            </RevealOnScroll>

            <div>
                <FlipLink href="/about" hasBg className="font-medium -tracking-wider text-[2.5vw] leading-[.9] flex">
                    about me
                </FlipLink>
            </div>
            

            <RevealOnScroll triggerOffset='90%'>
               {specialisingTexts.map((text, index) => (
                <span key={index} className="block font-medium tracking-[-0.03em] text-[2.5vw] leading-none">{text}</span>
               ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>
  );
}
