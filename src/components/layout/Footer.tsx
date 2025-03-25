"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const overlayLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const bgLayer = bgLayerRef.current;
    const overlayLayer = overlayLayerRef.current;
    if (!footer || !bgLayer || !overlayLayer) return;

    // Animate background image layer (faster parallax)
    gsap.to(bgLayer, {
      y: -100, // Adjust for desired intensity
      ease: 'none',
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Animate overlay layer (slower parallax)
    gsap.to(overlayLayer, {
      y: -50, // Different speed for depth effect
      ease: 'none',
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-gray-900 text-white">
      {/* Background image layer */}
      <div ref={bgLayerRef} className="absolute inset-0">
        {/* <img
          src="/footer-bg.jpg"
          alt="Footer Background"
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Overlay gradient layer */}
      <div
        ref={overlayLayerRef}
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"
      ></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Let's Connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg mb-8 max-w-xl"
        >
          Whether you're looking for collaboration or simply a friendly chat, feel free to reach out.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex space-x-6"
        >
          {/* Replace with your own social icons/links */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            LinkedIn
          </a>
          <a href="mailto:hello@example.com" className="hover:text-blue-400">
            Email
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
