"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import AboutMeSection from "@/components/AboutMeSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import ScrollSection from "@/components/AnimatedGIFSection";
// import WorkHeading from "@/components/WorkHeading";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  useEffect( () => {
    (
      async () => {
          // const LocomotiveScroll = (await import('locomotive-scroll')).default
          // const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <>
      {/* Hero Section with Scroll-based Animations */}
      <HeroSection></HeroSection>

      {/* Section for GIF with a smooth animation */}
      <AnimatedContainer className="px-8 mt-8">
        <div className="w-full">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            className="w-full h-auto object-contain"
          />
        </div>
      </AnimatedContainer>

      {/* <WorkHeading></WorkHeading> */}

      {/* Intro Section */}
      <IntroSection></IntroSection>

      {/* <WorkHeading></WorkHeading> */}

      <FeaturedProjects></FeaturedProjects>

      <AboutMeSection></AboutMeSection>

      <AnimatedContainer className="px-8 mt-8">
        <div className="w-full">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            className="w-full h-auto object-contain"
          />
        </div>
      </AnimatedContainer>
    </>
  );
}
