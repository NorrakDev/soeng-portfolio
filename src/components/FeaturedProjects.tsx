import { useEffect, useLayoutEffect, useRef } from "react";
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
  // The inner container that will be pinned during the swipe.
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
      // onPress: self => {
      //   // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
      //   ScrollTrigger.isTouch && self.event.preventDefault()
      // }
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
  
      // let target = swipePanels[index];
      // let prevTarget = swipePanels[currentIndex];
      
      // let tl = gsap.timeline({
      //   onComplete: () => {
      //     allowScroll = true
      //   },
      // });
      
      // if (prevTarget) {
      //   tl.to(prevTarget.querySelector(".image-wrapper img"), { yPercent: 20, opacity: 0, duration: 0.75 }, 0)
      //     .to(prevTarget.querySelector(".text-content"), { opacity: 0, y: -20, duration: 0.5 }, 0);
      // }

      // tl.fromTo(
      //   target.querySelector(".image-wrapper img"),
      //   { yPercent: -20, opacity: 0 },
      //   { yPercent: 0, opacity: 1, duration: 0.75 },
      //   0
      // )
      // .fromTo(
      //   target.querySelector(".text-content"),
      //   { opacity: 0, y: 20 },
      //   { opacity: 1, y: 0, duration: 0.5 },
      //   0.3
      // );

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
        <div key={project.id} className="panel w-full h-full absolute flex flex-col left-0 top-0">
          <div className="image-wrapper h-[70%] relative">
            <Image
              fill
              src={project.image}
              alt={project.name}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="text-content bg-background h-[30%] px-6 py-3 flex flex-col justify-start">
            <h2 className="text-8xl font-bold">{project.name}</h2>
            <p className="text-lg">{project.details}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
