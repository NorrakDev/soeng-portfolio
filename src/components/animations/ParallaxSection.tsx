
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
}

const ParallaxSection = ({
  backgroundImage,
  backgroundColor,
  children,
  className = "",
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getRatio = (el: HTMLElement) => window.innerHeight / (window.innerHeight + el.offsetHeight);

    gsap.fromTo(
      section.querySelector(".parallax-bg") as HTMLElement,
      {
        backgroundPosition: `50% ${-window.innerHeight * getRatio(section)}px`,
      },
      {
        backgroundPosition: `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: "auto", position: "relative" }}
    >
      <div
        className="parallax-bg absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundColor: backgroundColor,
        }}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;
