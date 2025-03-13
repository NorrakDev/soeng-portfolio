"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useLenis } from 'lenis/react'
import BrandLogo from "../BrandLogo";
import FlipLink from "../FlipLink";
import FlipButton from "../FlipButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const lenis = useLenis();

  useEffect(() => {
    const mainElement = document.querySelector(".content");

    // Toggle the 'menu-open' class on the element with class 'content'
    if (mainElement) {
      if (isMenuOpen) {
        mainElement.classList.add("menu-open");
      } else {
        mainElement.classList.remove("menu-open");
      }
    }

    return () => {
      if (mainElement) {
        mainElement.classList.remove("menu-open");
      }
    };
  }, [isMenuOpen]);

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     lenis?.stop(); // Pause Lenis scrolling
  //   } else {
  //     lenis?.start(); // Resume Lenis scrolling
  //   }
  //   return () => {
  //     lenis?.start();
  //   };
  // }, [isMenuOpen, lenis]);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 left-0 w-full flex justify-between items-center my-4 px-8 text-xl font-medium z-[8000] mix-blend-exclusion text-white">
        <BrandLogo />
        <FlipLink href="/archive">+ archive</FlipLink>

        <FlipButton onClick={() => setIsMenuOpen(!isMenuOpen)}>menu</FlipButton>
      </nav>

      {/* Sidebar Menu (Slides in from Right) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-transparent z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 h-full w-1/5 bg-white z-50 flex flex-col justify-between pt-24 px-8 pb-8"
            >
              <nav className="flex flex-col items-end text-4xl font-bold">
                {["home", "work", "about", "cv", "playlist", "course"].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hoveredLink && hoveredLink !== item ? 0.5 : 1 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <FlipLink href={`/${item}`}>{item}</FlipLink>
                  </motion.div>
                ))}
              </nav>

              <div className="grid grid-flow-col grid-rows-3 gap-4 text-lg font-medium">
                <nav className="row-span-2 flex flex-col items-end">
                {["linkedin", "telegram", "instagram", "cosmos"].map((social) => (
                  <FlipLink key={social} href={`/${social}`}>{social}</FlipLink>
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

