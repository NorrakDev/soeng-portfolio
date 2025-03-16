import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  id: number;
  name: string;
  details: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "KB Prasac Merchant",
    details: "ui/ui design, interaction research",
    image: "/images/kb-prasac.png",
  },
  {
    id: 2,
    name: "Chip Mong Bank",
    details: "Introducing the super app for the merchant",
    image: "/images/chipmong.png",
  },
  {
    id: 3,
    name: "AEON Mall Plus",
    details: "Introducing the super app for the merchant",
    image: "/images/aeon-mall.png",
  },
  {
    id: 4,
    name: "SAN SOENG Portfolio",
    details: "Creative Direction, Live Action, Animation",
    image: "/images/portfolio.png",
  },
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

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
      target: containerRef.current,
      type: "wheel,touch,scroll",
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
      onChangeY: (self) => self.scrollY(savedScrollValue),
    });
    preventScroll.disable();

    function gotoPanel(index: number, isScrollingDown: boolean) {
      if ((index === projects.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable();
        preventScroll.disable();
        preventScroll.scrollY(preventScroll.scrollY() + (index === projects.length ? 1 : -1));
        allowScroll = true;
        return;
      }
      allowScroll = false;

      const tl = gsap.timeline({
        defaults: { duration: .9, ease: "expo.inOut" },
        onComplete: () => {
          // After animation is complete, allow scrolling again
          allowScroll = true;
          currentIndex = index; // Update index after animation to avoid overlapping
        }
      });

      const direction = isScrollingDown ? -1 : 1;

      // Scroll transitions
      tl.to(mediaItems[currentIndex], {yPercent: 100 * direction, scale: 1.4})
        .to(mediaItems[index], { yPercent: 0, scale: 1 }, "<")
        .fromTo(titleItems[currentIndex], { opacity: 1 }, { opacity: 0 }, "<")
        .fromTo(titleItems[index], { opacity: 0 }, { opacity: 1 }, "<")
        .to(detailItems[currentIndex], { opacity: 0, yPercent: 100, delay: .2 }, "<")
        .fromTo(detailItems[index], { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, delay: .4, ease: "slow(0.7,0.7,false)" }, "<");
    }

    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      start: "top top",
      end: `+=10%`,
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
      },
    });
  });

  return (
    <section ref={containerRef} className="swipe-section relative h-screen w-screen overflow-hidden">
      <div ref={containerRef} className="w-full h-full relative">
      <div ref={mediaContainerRef} className="media-container flex flex-col h-auto justify-start left-0 absolute top-0 w-full z-0">
        {projects.map((project) => (
          <div key={project.id} className="media-item absolute w-full h-screen left-0 top-0 overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              fill
              src={project.image}
              alt={project.name}
            />
          </div>
        ))}
      </div>
      <div ref={titleContainerRef} className="title-container absolute bottom-0 left-0 w-full bg-background min-h-[30vh] z-[1]">
        {projects.map((project) => (
          <div key={project.id} className="title-item left-0 top-0 absolute py-8 px-8">
            <div className="relative flex flex-col justify-start">
              <h2 className="text-8xl font-medium">{project.name}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full z-[2]">
        {projects.map((project) => (
          <p key={project.id} className="detail-item text-[#a8a8a8] left-0 bottom-0 absolute px-8 pb-4 text-xl">
            {project.details}
          </p>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full text-center z-[2] pb-4 text-xl">
        <span>View project</span>
      </div>
      </div>

    </section>
  );
}
