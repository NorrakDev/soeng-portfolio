"use client";

import { LinkProps } from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";
import TransitionLink from "../common/AnimatedLink";

interface FlipLinkProps extends LinkProps {
  /** Text or elements to display */
  children: React.ReactNode;
  /** Additional CSS classes for motion wrapper */
  className?: string;
  /** Enable background highlight on hover */
  hasBg?: boolean;
  /** Show an underline animation on hover */
  hasUnderline?: boolean;
}

const FlipLink: React.FC<FlipLinkProps> = ({
  children,
  className,
  hasBg = false,
  hasUnderline = false,
  ...linkProps
}) => {
  const duration = 0.2;
  const stagger = 0.02;
  const text = String(children);

  return (
    <TransitionLink {...linkProps}>
      <motion.div
        initial="initial"
        whileHover="hovered"
        className={clsx(
          hasBg &&
            "bg-background p-[.5vw] hover:bg-[#f0e9e4] hover:scale-110 hover:origin-left",
          "group transform transition-transform relative inline-block cursor-pointer",
          className
        )}
        role="link"
        tabIndex={0}
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
      </motion.div>
    </TransitionLink>
  );
};

export default FlipLink;
