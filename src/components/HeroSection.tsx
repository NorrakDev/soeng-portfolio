"use client";
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { AnimatedContainer } from './animations/AnimatedContainer';
import FlipLink from './animations/FlipLink';

export default function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="flex flex-col text-center px-8">
      <div
        ref={ref}
        className="flex flex-col text-center justify-center items-center min-h-[60vh] py-[10vh]">
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0.5 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="w-[95%]"
        >
          <img className="w-full" src="/images/sansoengsvg-black.svg" alt="san soeng" />
        </motion.div>
        <div className="self-center mt-[2vw] block text-center">
          <motion.span
            initial={{ filter: 'blur(20px)', opacity: 0.5 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="z-20 tracking-[-0.01em] text-[1.5vw] leading-none relative text-center"
          >
            © 2025 portfolio
          </motion.span>
        </div>
      </div>

      <div className="w-full flex justify-between items-end">
        <AnimatedContainer
          className="flex flex-col items-start font-light tracking-[-0.03em] text-[2.5vw] leading-[1]"
        >
          <span>ui/ux designer transforming your</span>
          <span>ideas into digital reality, crafting</span>
          <span>beautiful experiences.</span>
        </AnimatedContainer>
        <AnimatedContainer className="flex flex-col items-end text-2xl font-medium">
            <FlipLink href='#'>linkedin</FlipLink>
            <FlipLink href='#'>telegram</FlipLink>
        </AnimatedContainer>
      </div>
    </section>
  );
}
