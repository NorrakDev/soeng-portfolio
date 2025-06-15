"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import React from "react";

interface FlipButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  /** Text content */
  children: string;
  /** Add background highlight effect */
  hasBg?: boolean;
  /** Add underline effect on hover */
  hasUnderline?: boolean;
}

const FlipButton: React.FC<FlipButtonProps> = ({
  children,
  className,
  hasBg = false,
  hasUnderline = false,
  ...props
}) => {
  const duration = 0.2;
  const stagger = 0.02;
  const text = String(children);

  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      className={clsx(
        hasBg &&
          "bg-background p-[.5vw] hover:bg-[#f0e9e4] hover:scale-110 hover:origin-left",
        "group transform transition-transform relative inline-block cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="relative block overflow-hidden whitespace-nowrap">
        {/* Top Layer */}
        <div>
          {text.split("").map((letter, index) => (
            <motion.span
              key={`top-${index}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration,
                ease: "easeInOut",
                delay: stagger * index,
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Bottom Layer */}
        <div className="absolute inset-0">
          {text.split("").map((letter, index) => (
            <motion.span
              key={`bottom-${index}`}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration,
                ease: "easeInOut",
                delay: stagger * index,
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Underline */}
        {hasUnderline && (
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-current group-hover:w-0 transition-all duration-300 ease-in-out" />
        )}
      </div>
    </motion.button>
  );
};

export default FlipButton;
