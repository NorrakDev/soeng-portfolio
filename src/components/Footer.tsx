import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const bgEl = backgroundRef.current;

    if (!footerEl || !bgEl) return;

    // Animate the background for a parallax effect.
    gsap.to(bgEl, {
      y: -50, // Adjust this value for desired parallax intensity.
      ease: 'none',
      scrollTrigger: {
        trigger: footerEl,
        start: 'top bottom',  // When the footer top hits the bottom of the viewport.
        end: 'bottom top',    // When the footer bottom hits the top of the viewport.
        scrub: true,          // Sync the animation with scroll.
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-gray-900 text-white">
      {/* Background element for parallax effect */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center"
      ></div>

      {/* Content container */}
      <div className="relative z-10 py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Your Footer Heading
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg"
        >
          Some footer content goes here. You can include links, social icons, or any additional information.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
