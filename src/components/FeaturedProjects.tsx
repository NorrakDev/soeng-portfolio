import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mediaItems = gsap.utils.toArray<HTMLElement>(".media-item");
    const titleItems = gsap.utils.toArray<HTMLElement>(".title-item");

    let allowScroll = true;
    let currentIndex = 0;
    let savedScrollValue: number;

    const intentObserver = ScrollTrigger.observe({
      target: containerRef.current,
      type: "wheel,touch,pointer",
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

    gsap.set(mediaItems, { opacity: 0, scale: 0.9 });
    gsap.set(titleItems, { opacity: 0, y: 20 });


    function gotoPanel(index: number, isScrollingDown: boolean) {
      allowScroll = false;

      if ((index === projects.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable();
        preventScroll.disable();
        allowScroll = true;
        preventScroll.scrollY(preventScroll.scrollY() + (index === projects.length ? 1 : -1));
        return;
      }

      currentIndex = index;

      // This is how you might animate the transitions between the panels
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "expo.inOut" } , 
        onComplete: () => {
          allowScroll = true;
        }
      });

      // Clear any previous animations
      tl.clear();

      // Start by fading out all the title items and media items
      gsap.to(titleItems, { opacity: 0 });
      gsap.to(mediaItems, { opacity: 0, scale: 0.9 });

      // Add animations to the timeline for both media and titles (parallel animations)
      tl.to(mediaItems[currentIndex], { opacity: 0, scale: 0.9, duration: 0.3 })
        .to(mediaItems[index], { opacity: 1, scale: 1, duration: 0.3 })
        .fromTo(titleItems[currentIndex], { opacity: 0 }, { opacity: 1 });
    
    }

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      anticipatePin: 1,
      start: "top top",
      end: `+=50%`,
      onEnter: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          preventScroll.enable();
          intentObserver.enable();
          gotoPanel(currentIndex + 1, true);
        }
      },
      onEnterBack: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          preventScroll.enable();
          intentObserver.enable();
          gotoPanel(currentIndex - 1, false);
        }
      },
    });

    return () => {
      trigger.kill();
      intentObserver.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="swipe-section relative h-screen w-full overflow-hidden">
      <div ref={mediaContainerRef} className="media-container flex flex-col h-auto justify-start left-0 absolute top-0 w-full z-0">
        {projects.map((project) => (
          <div key={project.id} className="media-item absolute w-full h-screen left-0 top-0 overflow-hidden">
            <Image
              fill
              src={project.image}
              alt={project.name}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        ))}
      </div>
      <div ref={titleContainerRef} className="title-container relative bg-background min-h-[33vh] z-[1]">
        {projects.map((project) => (
          <div key={project.id} className="title-item left-0 top-0 absolute">
            <h2 className="text-8xl font-bold">{project.name}</h2>
            <p className="text-lg">{project.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
