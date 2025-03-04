"use client";
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export default function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="flex flex-col text-center px-8">
      <div
        ref={ref}
        className="flex flex-col text-center justify-center items-center min-h-[50vh] pb-[10vw]">
        <motion.h1
          initial={{ filter: 'blur(20px)', opacity: 0.5 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="tracking-[-0.07em] not-italic text-[22vw] font-medium leading-none self-center select-none"
        >
          san soeng
        </motion.h1>
        <div className="self-center mt-[-2vw] block text-center">
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

      <motion.div
        className="w-full flex justify-between mt-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1, delay: 0.5 }}
      >
        <p className="text-left text-3xl md:text-4xl">
          ui/ux designer transforming your <br />
          ideas into digital reality, crafting <br />
          beautiful experiences.
        </p>
      </motion.div>
    </section>
  );
}
