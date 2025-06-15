"use client";

import AboutMeSection from "@/components/AboutMeSection";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import HoverSwapTextLink from "@/components/animations/HoverSwapTextLink";
import Footer from "../components/layout/Footer";
import { PinnedProjectsSection } from "../components/PinnedProjectsSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section with Scroll-based Animations */}
      <HeroSection></HeroSection>

      {/* Section for GIF with a smooth animation */}
      <div className="px-8 mt-8">
        <div className="w-full relative">
          <Image
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW9pOHh3MTQ2MXlneWZtaDFwa2Mza3Q4a3BoeWx1aXRpajN0YnpuOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPwb2u5HsBJ3o8rmbS/giphy.gif"
            alt="GIF"
            width={100}
            height={100}
            unoptimized
            className="w-full h-screen object-cover"
          />
        </div>
      </div>

      <IntroSection></IntroSection>

      <PinnedProjectsSection></PinnedProjectsSection>

      <div className="h-screen" /> {/* Optional spacer */}

      <AboutMeSection></AboutMeSection>

      <ExpertiseSection></ExpertiseSection>

      <div className="px-8 mt-8">
        <div className="w-full">
          <Image
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="GIF"
            width={100}
            height={100}
            unoptimized
            className="w-full h-auto object-cover"
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
