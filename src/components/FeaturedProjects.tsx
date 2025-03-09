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
    if (!containerRef.current) return;
  
    let allowScroll = true;
    let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause();
    let currentIndex = 0;
  
    const swipePanels = gsap.utils.toArray<HTMLElement>(
      containerRef.current.querySelectorAll(".panel")
    );
  
    gsap.set(swipePanels, { zIndex: (i: number) => swipePanels.length - i });
  
    const intentObserver = ScrollTrigger.observe({
      target: containerRef.current,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: () => {
        if (allowScroll) gotoPanel(currentIndex - 1, false);
      },
      onDown: () => {
        if (allowScroll) gotoPanel(currentIndex + 1, true);
      },
    });
    intentObserver.disable();
  
    function gotoPanel(index: number, isScrollingDown: boolean) {
      if (
        (index === swipePanels.length && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.disable();
        return;
      }
      allowScroll = false;
      scrollTimeout.restart(true);
  
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
      start: "top top",
      end: `+=100%`,
      onEnter: (self) => {
        if (!(intentObserver as any).isActive) {
          intentObserver.enable();
          gotoPanel(currentIndex, true); // Start from the first panel
        }
      },
      onEnterBack: (self) => {
        if (!(intentObserver as any).isActive) {
          intentObserver.enable();
          gotoPanel(currentIndex, false); // Start from the first panel if scrolling back up
        }
      },
      onLeave: () => {
        intentObserver.disable();
      },
      onLeaveBack: () => {
        // Disable intentObserver when section leaves back
        intentObserver.disable();
      },
    });
  
    // // **NEW: Ensure Swipe Works Immediately if Already in View**
    if (ScrollTrigger.isInViewport(containerRef.current as Element)) {
      intentObserver.enable();
    }
  
    return () => {
      trigger.kill();
      intentObserver.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="swipe-section relative h-screen w-full overflow-hidden">
        {projects.map((project) => (
          <div key={project.id} className="panel h-screen w-full absolute">
            <div className="inset-0">
              <Image
                src={project.image}
                alt={project.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="content absolute bottom-10 left-10 z-10 bg-black bg-opacity-50 text-white p-4 rounded-md">
              <h2 className="text-3xl font-bold">{project.name}</h2>
              <p className="text-lg">{project.details}</p>
            </div>
          </div>
        ))}
    </section>
  );
}
