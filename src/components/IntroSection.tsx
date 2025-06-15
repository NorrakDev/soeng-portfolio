"use client";
import * as React from 'react';
import FlipLink from './animations/FlipLink';
import RevealOnScroll from './animations/RevealOnScroll';

export default function IntroSection() {

  return (
    <section className="w-full min-h-screen px-8 my-64">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1">
            <img
              src="/images/profile_img.jpg"
              alt="About"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="col-span-1 flex flex-col justify-between items-start">
            <RevealOnScroll
              type='flip'
              className="flex flex-col font-medium -tracking-wider text-8xl leading-[100%]"
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
          </div>
        </div>
      </section>
  );
}
