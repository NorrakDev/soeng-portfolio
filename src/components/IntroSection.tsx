"use client";
import * as React from 'react';
import { AnimatedContainer } from './animations/AnimatedContainer';
import FlipLink from './animations/FlipLink';

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
            <div
              className="flex flex-col font-medium tracking-[-0.04em] text-[7vw] leading-[80%]"
            >
              <span>senior digital</span>
              <span>designer helping</span>
              <span>brands communicate</span>
              <span>with their audience in</span>
              <span>a meaningful way</span>
            </div>

            <AnimatedContainer>
                <FlipLink href="/about" hasBg className="font-medium tracking-[-0.03em] text-[2.5vw] leading-[.9] flex">
                    about me
                </FlipLink>
            </AnimatedContainer>
            

            <AnimatedContainer
              delay={0.2}
              className="flex flex-col font-medium tracking-[-0.03em] text-[2.5vw] leading-[1]"
            >
              <span>specialising in:</span>
              <span>digital design</span>
              <span>branding</span>
              <span>web experiences</span>
              <span>webflow development</span>
              <span>typography</span>
              <span>art direction</span>
            </AnimatedContainer>
          </div>
        </div>
      </section>
  );
}
