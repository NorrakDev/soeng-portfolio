"use client";

import { motion } from "framer-motion";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import clsx from "clsx";
import TransitionLink from "../common/AnimatedLink";

const CUBIC_EASING = [0.34, 1.56, 0.64, 1]; // bounce ease
// const CUBIC_EASING = [0.05, 0.9, 0.1, 1]; // sassy swoosh
// const CUBIC_EASING = [0.2, 1, 0.3, 1]; // snappy soft
const CUBIC_TRANSITION = { duration: 0.7, ease: CUBIC_EASING };

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 550,
  damping: 18,
  mass: 0.6,
};

const containerVariant = {
  hover: { transition: { staggerChildren: 0.015 } },
  unhover: { transition: { staggerChildren: 0.015 } },
};

const splitText = (text: string) =>
  text.split("").map((char, i) => ({ char, key: i }));

type HoverSwapTextLinkProps = {
  text: string;
  hoverText: string;
  href: string;
  transitionType?: "cubic" | "spring";
  textColor?: string;
};

export default function HoverSwapTextLink({
  text,
  hoverText,
  href,
  transitionType = "cubic",
  textColor = "black"
}: HoverSwapTextLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const baseTextLayerRef = useRef<HTMLDivElement>(null);
  const hoverTextLayerRef = useRef<HTMLDivElement>(null);

  const baseTextArray = splitText(text);
  const hoverTextArray = splitText(hoverText);

  const TRANSITION = transitionType === "spring" ? SPRING_TRANSITION : CUBIC_TRANSITION;
  const baseLetterVariant = {
    initial: { y: "0%" },
    hover: { y: "-100%", transition: TRANSITION },
    unhover: { y: "0%", transition: TRANSITION },
  };
  const hoverLetterVariant = {
    initial: { y: "100%" },
    hover: { y: "0%", transition: TRANSITION },
    unhover: { y: "100%", transition: TRANSITION },
  };

  useLayoutEffect(() => {
    const measureWidth = () => {
      const baseWidth = baseTextLayerRef.current?.offsetWidth || 0;
      const hoverWidth = hoverTextLayerRef.current?.offsetWidth || 0;
      const maxWidth = Math.max(baseWidth, hoverWidth);

      setMaxTextWidth(maxWidth);
      setUnderlineWidth(isHovered ? hoverWidth : baseWidth);
      };
    measureWidth();
  }, [isHovered, text, hoverText]);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = baseTextLayerRef.current?.offsetWidth || 0;
      const hoverWidth = hoverTextLayerRef.current?.offsetWidth || 0;
      const maxWidth = Math.max(baseWidth, hoverWidth);

      setMaxTextWidth(maxWidth);
      setUnderlineWidth(isHovered ? hoverWidth : baseWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHovered, text, hoverText]);

  return (
    <TransitionLink href={href} scroll={true} className="inline-block">
      <div
        className="inline-flex flex-col items-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative inline-block overflow-hidden leading-none" style={{ width: maxTextWidth }}>
          {/* Base Text Layer */}
          <motion.div
            className={clsx(
              "flex justify-center whitespace-pre text-4xl sm:text-5xl md:text-6xl font-medium -tracking-wider leading-normal sm:leading-normal md:leading-normal",
              textColor && `text-${textColor}`
            )}
            variants={containerVariant}
            initial="initial"
            animate={isHovered ? "hover" : "unhover"}
          >
            {baseTextArray.map(({ char, key }) => (
              <motion.span key={key} variants={baseLetterVariant} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          {/* Hover Text Layer */}
          <motion.div
            className={clsx(
              "flex justify-center whitespace-pre absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl font-medium -tracking-wider leading-normal sm:leading-normal md:leading-normal",
              textColor && `text-${textColor}`
            )}
            variants={containerVariant}
            initial="initial"
            animate={isHovered ? "hover" : "unhover"}
          >
            {hoverTextArray.map(({ char, key }) => (
              <motion.span key={key} variants={hoverLetterVariant} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <div className="absolute opacity-0 pointer-events-none z-[-1]">
            <div ref={baseTextLayerRef} className="inline-block whitespace-pre text-4xl sm:text-5xl md:text-6xl font-medium -tracking-wider px-1">
              {text}
            </div>
            <div ref={hoverTextLayerRef} className="inline-block whitespace-pre text-4xl sm:text-5xl md:text-6xl font-medium -tracking-wider px-1">
              {hoverText}
            </div>
          </div>
        </div>
        {/* Underline */}
        <motion.div
          className={clsx(
            "h-[2px]",
            `bg-${textColor}`
          )}
          style={{ width: underlineWidth, originX: 0.5 }}
          animate={{ width: underlineWidth }}
          transition={TRANSITION}
        />
      </div>
    </TransitionLink>
  );
}
