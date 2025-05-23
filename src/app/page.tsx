"use client";

import AboutMeSection from "@/components/AboutMeSection";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import HoverSwapTextLink from "@/components/animations/HoverSwapTextLink";
import SwipeScroller from "../components/SwipeScroller";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Hero Section with Scroll-based Animations */}
      <HeroSection></HeroSection>

      {/* Section for GIF with a smooth animation */}
      <div className="px-8 mt-8">
        <div className="w-full">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Intro Section */}
      <IntroSection></IntroSection>

      <SwipeScroller></SwipeScroller>

      {/* <FeaturedProjects></FeaturedProjects> */}

      <AboutMeSection></AboutMeSection>

      <ExpertiseSection></ExpertiseSection>

      <div className="px-8 mt-8">
        <div className="w-full">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <section className="flex flex-col justify-center items-center h-[50vh]">
        <HoverSwapTextLink href="/about" text="Get to know me" hoverText="about me"></HoverSwapTextLink>
      </section>

      <Footer />
    </>
  );
}
