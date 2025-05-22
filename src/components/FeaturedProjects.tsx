"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";
import RevealOnScroll from "./animations/RevealOnScroll";
import { projects } from "@/app/data/projects";
import Link from "next/link";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

export default function FeaturedProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mediaItems = gsap.utils.toArray<HTMLElement>(".media-item");
    const titleItems = gsap.utils.toArray<HTMLElement>(".title-item");
    const detailItems = gsap.utils.toArray<HTMLElement>(".detail-item");

    gsap.set(mediaItems, { yPercent: 100 });
    gsap.set(mediaItems[0], { yPercent: 0 });
    gsap.set(titleItems, { opacity: 0 });
    gsap.set(titleItems[0], { opacity: 1 });
    gsap.set(detailItems, { opacity: 0, yPercent: 100 });
    gsap.set(detailItems[0], { opacity: 1, yPercent: 0 });

    let allowScroll = true;
    let currentIndex = 0;
    let savedScrollValue: number;

    const intentObserver = ScrollTrigger.observe({
      target: wrapperRef.current,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    });
    intentObserver.disable();

    const preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: "wheel,scroll",
      allowClicks: true,
      onEnable: (self) => (savedScrollValue = self.scrollY()),
      onChangeY: (self) => {
        if (!allowScroll) {
          self.scrollY(savedScrollValue);
        }
      },
    });
    preventScroll.disable();

    function gotoPanel(index: number, isScrollingDown: boolean) {
      // Ensure transitions are smooth without abrupt jumps
      if ((index === projects.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable();
        preventScroll.disable();
        preventScroll.scrollY(preventScroll.scrollY() + (index === projects.length ? 1 : -1));
        allowScroll = true;
        return;
      }
      allowScroll = false;

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" }, // Increase duration for smoother animation
        onComplete: () => {
          // After animation is complete, allow scrolling again
          allowScroll = true;
          currentIndex = index; // Update index after animation to avoid overlapping
        }
      });

      const direction = isScrollingDown ? -1 : 1;

      // Scroll transitions
      tl.to(mediaItems[currentIndex], { yPercent: 100 * direction, scale: 1.4 })
        .to(mediaItems[index], { yPercent: 0, scale: 1 }, "<")
        .fromTo(titleItems[currentIndex], { opacity: 1 }, { opacity: 0 }, "<")
        .fromTo(titleItems[index], { opacity: 0 }, { opacity: 1 }, "<")
        .to(detailItems[currentIndex], { opacity: 0, yPercent: 100, delay: .3 }, "<") // Increase delay
        .fromTo(detailItems[index], { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, delay: .5, ease: "slow(0.7,0.7,false)" }, "<");
    }

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      pin: true,
      anticipatePin: 1,
      pinSpacing: false,
      pinType: wrapperRef.current?.style?.transform ? "transform" : "fixed",
      start: "top top",
      end: `bottom bottom`,
      onEnter: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          intentObserver.enable();
          preventScroll.enable();
          gotoPanel(currentIndex + 1, true);
        }
      },
      onEnterBack: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          intentObserver.enable();
          preventScroll.enable();
          gotoPanel(currentIndex - 1, false);
        }
      }
    });
  });

  return (
    <section className="relative w-full overflow-hidden">
      {/* 🔥 Heading (Stays Static) */}
      <RevealOnScroll type='reveal-up' className="w-full text-center py-10">
        <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%]">works</h1>
      </RevealOnScroll>

      {/* 🔥 Wrapper (This will be pinned when scrolled into view) */}
      <div ref={wrapperRef} className="relative h-screen w-full overflow-hidden">
        <div className="media-container flex flex-col justify-start absolute left-0 top-0 w-full h-full">
          {projects.map((project) => (
            <Link key={project.id} scroll href={`/work/${project.slug}`} className="media-item absolute w-full h-screen left-0 top-0 overflow-hidden">
              <Image className="w-full h-full object-cover" fill src={project.featureImage} alt={project.name} />
            </Link>
          ))}
        </div>

        <div className="title-container absolute bottom-0 left-0 w-full bg-background min-h-[30vh] z-1">
          {projects.map((project) => (
            <div key={project.id} className="title-item left-0 top-0 absolute py-8 px-8">
              <h2 className="text-8xl font-medium">{project.name}</h2>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full z-2">
          {projects.map((project) => (
            <div key={project.id}>
               <p className="detail-item text-[#a8a8a8] left-[5%] bottom-0 absolute px-8 pb-4 text-xl text-center">
              {project.shortDescription}
              </p>
              <Link scroll href={`/work/${project.slug}`}>View project</Link>
            </div>
           
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full text-center z-2 pb-4 text-xl">
          
        </div>
      </div>
    </section>
  );
}
