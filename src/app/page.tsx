"use client";


import AnimatedTextSection from "@/components/AnimatedTextSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FlipLink from "@/components/FlipLink";
import HeroSection from "@/components/HeroSection";
import ScrollSection from "@/components/ScrollSection";
import WorkHeading from "@/components/WorkHeading";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import { motion } from "framer-motion";
import { useEffect } from "react";
// import AnimatedTextSection from "@/components/AnimatedTextSection";

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
      <section className="px-8 mt-8">
        <motion.div
          className="w-full mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="px-8 mt-[14vw] mb-[14vw]">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <img
              src="https://cdn.prod.website-files.com/666066030b1447405865fff8/674ef4bbe8fcbec7ae18ca8b_Filip%20Felbar%20-%20Intro%20Image-p-1600.webp"
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-center items-start w-full gap-x-[18vw] gap-y-[18vw]">
            <AnimatedContainer
              className="flex flex-col font-medium tracking-[-0.04em] text-[7vw] leading-[80%]"
              delay={0.2}
            >
              <span>senior digital</span>
              <span>designer helping</span>
              <span>brands communicate</span>
              <span>with their audience in</span>
              <span>a meaningful way</span>
            </AnimatedContainer>

            <FlipLink href="/about" hasBg className="font-medium tracking-[-0.03em] text-[2.5vw] leading-[1]">
              About me
            </FlipLink>

            <AnimatedContainer
              className="flex flex-col font-medium tracking-[-0.03em] text-[2.5vw] leading-[1]"
            >
              <span>specialising in:</span>
              <span>digital design</span>
              <span>branding</span>
              <span>web experiences</span>
              <span>webflow development</span>
              <span>typography</span>
              <span>art direction</span>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <WorkHeading></WorkHeading>

      <FeaturedProjects></FeaturedProjects>

      <AnimatedTextSection></AnimatedTextSection>

      <section className="h-screen bg-white w-full"></section>
    </>
  );
}
