"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "../BrandLogo";
import FlipLink from "../animations/FlipLink";
import FlipButton from "../animations/FlipButton";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useIsomorphicLayoutEffect } from "../../helpers/isomorphicEffect";

const navigations = [
  { name: 'home', route: '/' },
  { name: 'work', route: '/work' },
  { name: 'about', route: '/about' },
  { name: 'cv', route: '/' },
  { name: 'playlist', route: '/' },
  { name: 'course', route: '/' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    const wrapper = document.querySelector("#smooth-wrapper");

    // Toggle the 'menu-open' class on the element with class 'content'
    if (wrapper) {
      if (isMenuOpen) {
        smoother?.paused(true);
        wrapper.classList.add("menu-open");
      } else {
        smoother?.paused(false);
        wrapper.classList.remove("menu-open");
      }
    }

    return () => {
      smoother?.paused(false);
      if (wrapper) {
        wrapper.classList.remove("menu-open");
      }
    };
  }, [isMenuOpen]);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full grid grid-cols-2 gap-8 my-4 px-8 text-2xl font-medium z-8000 mix-blend-exclusion text-white">
        <BrandLogo />
        <div className="flex justify-between">
          <FlipLink href="/archive">+ archive</FlipLink>

          <FlipButton onClick={() => setIsMenuOpen(!isMenuOpen)} >menu</FlipButton>
        </div>
      </nav>

      {/* Sidebar Menu (Slides in from Right) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-yellow-100/10 mix-blend-multiply pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 h-full w-1/5 bg-white z-50 flex flex-col justify-between pt-24 px-8 pb-8 shadow-2xl"
            >
              <nav className="flex flex-col items-end text-4xl font-bold">
                {navigations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hoveredLink && hoveredLink !== item.name ? 0.5 : 1 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredLink(item.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <FlipLink onClick={() => setIsMenuOpen(!isMenuOpen)} href={`${item.route}`}>{item.name}</FlipLink>
                  </motion.div>
                ))}
              </nav>

              <div className="grid grid-flow-col grid-rows-3 gap-4 text-lg font-medium">
                <nav className="row-span-2 flex flex-col items-end">
                {["linkedin", "telegram", "instagram", "cosmos"].map((social) => (
                  <FlipLink onClick={() => setIsMenuOpen(!isMenuOpen)} hasUnderline key={social} href={`/${social}`}>{social}</FlipLink>
                  ))}
                </nav>
                <p className="row-span-1 leading-5 text-end">Senior Digital Designer at Pornhub & Onlyfan</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

