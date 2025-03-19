"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define the clip paths for each vertical slice (4 columns)
const slices = [
  { clip: "polygon(0% 0%, 25% 0%, 25% 100%, 0% 100%)" },
  { clip: "polygon(25% 0%, 50% 0%, 50% 100%, 25% 100%)" },
  { clip: "polygon(50% 0%, 75% 0%, 75% 100%, 50% 100%)" },
  { clip: "polygon(75% 0%, 100% 0%, 100% 100%, 75% 100%)" },
];

export default function WorkHeading() {
  const containerRef = useRef<HTMLDivElement>(null);
  // We'll collect refs for our 4 slices
  const sliceRefs = useRef<HTMLDivElement[]>([]);
  sliceRefs.current = []; // reset on every render

  const addToSliceRefs = (el: HTMLDivElement) => {
    if (el && !sliceRefs.current.includes(el)) {
      sliceRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initially misalign each slice: add a slight randomized x/y offset and rotation.
    sliceRefs.current.forEach((slice, index) => {
      const initialX = (index % 2 === 0 ? -40 : 40) + gsap.utils.random(-10, 10);
      const initialY = gsap.utils.random(-10, 10);
      const initialRot = gsap.utils.random(-10, 10);
      gsap.set(slice, { x: initialX, y: initialY, rotation: initialRot, opacity: 0.7 });
    });

    // Animate slices into proper alignment as the container scrolls into view.
    gsap.to(sliceRefs.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",   // when container's top reaches the viewport center
        end: "bottom center",  // when container's bottom leaves center
        scrub: true,           // tie animation progress to scroll position
      },
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.05,
    });

    // Clean up ScrollTrigger instances on unmount.
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "250px", // adjust height to taste
        overflow: "hidden",
      }}
    >
      {slices.map((s, i) => (
        <div
          key={i}
          ref={addToSliceRefs}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath: s.clip,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10rem",
            fontWeight: "bold",
            color: "#000",
            lineHeight: "1",
          }}
        >
          WORK
        </div>
      ))}
    </div>
  );
}
