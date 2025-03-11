import { useEffect, useRef } from "react";
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
    name: "# Larger Than Life",
    details: "Creative Direction, Design",
    image: "https://picsum.photos/id/1018/1200/800",
  },
  {
    id: 2,
    name: "# LOEHR",
    details: "Creative Direction, Design, Animation, Exhibition",
    image: "https://picsum.photos/id/1027/1200/800",
  },
  {
    id: 3,
    name: "# WMF",
    details: "Creative Direction, Design, Animation",
    image: "https://picsum.photos/id/1043/1200/800",
  },
  {
    id: 4,
    name: "# lool Stereotomic Series",
    details: "Creative Direction, Live Action, Animation",
    image: "https://picsum.photos/id/1062/1200/800",
  },
];

export default function FeaturedProjects() {
  // The inner container that will be pinned during the swipe.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let allowScroll = true;
    let currentIndex = -1;
    let savedScrollValue: number;
  
    const swipePanels = gsap.utils.toArray<HTMLElement>(".swipe-section .panel");
  
    gsap.set(swipePanels, { zIndex: (i: number) => swipePanels.length - i });
  
    const intentObserver = ScrollTrigger.observe({
      target: containerRef.current,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true)
    });
    intentObserver.disable();

    const preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: "wheel,scroll",
      allowClicks: true,
      onEnable: self => savedScrollValue = self.scrollY(), // save the scroll position
      onChangeY: self => self.scrollY(savedScrollValue)    // refuse to scroll
    });
    preventScroll.disable();
  
    function gotoPanel(index: number, isScrollingDown: boolean) {
      allowScroll = false;
      
      if (
        (index === swipePanels.length && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.disable();
        preventScroll.disable();
        allowScroll = true;
        // now make it go 1px beyond in the correct direction so that it doesn't trigger onEnter/onEnterBack.
        preventScroll.scrollY(preventScroll.scrollY() + (index === swipePanels.length ? 1 : -1));
        return;
      }
  
      let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
      gsap.to(target, {
        yPercent: isScrollingDown ? -100 : 0,
        duration: 0.75,
        onComplete: () => {
          allowScroll = true; // Ensures next swipe is allowed
        },
      });
      currentIndex = index;
    }
  
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      anticipatePin: 1,
      start: "top top",
      end: `+=50%`,
      onEnter: (self) => {
        if (preventScroll.isEnabled === false) {
          self.scroll(self.start);
          preventScroll.enable();
          intentObserver.enable();
          gotoPanel(currentIndex + 1, true);
        }
      },
      onEnterBack: (self) => {
        if (preventScroll.isEnabled === false) {
          self.scroll(self.start);
          preventScroll.enable();
          intentObserver.enable();
          gotoPanel(currentIndex - 1, false);
        }
      }
    });
  
    return () => {
      trigger.kill();
      intentObserver.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="swipe-section relative h-screen w-full overflow-hidden">
      {projects.map((project) => (
        <div key={project.id} className="panel w-full h-full absolute flex flex-col">
          <div className="h-[60%] relative">
            <Image
              src={project.image}
              alt={project.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-[40%] bg-white px-6 py-3 flex flex-col justify-start">
            <h2 className="text-[8vh] font-bold">{project.name}</h2>
            <p className="text-lg">{project.details}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
