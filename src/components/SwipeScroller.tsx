import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';
import { projects } from '../app/data/projects';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function SwipeScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const allowScroll = useRef(true);
  const scrollTimeout = useRef(
    gsap.delayedCall(1, () => {
      allowScroll.current = true;
    }).pause()
  );

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let restoreScroll: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];

      // Position all panels to the right, except current
      gsap.set(panels, { xPercent: 100 });
      gsap.set(panels[currentIndex], { xPercent: 0 });

      // Observer to detect wheel/touch
      const intentObserver = Observer.create({
        type: 'wheel,touch',
        tolerance: 10,
        preventDefault: true,
        onUp: () => allowScroll.current && gotoPanel(currentIndex - 1),
        onDown: () => allowScroll.current && gotoPanel(currentIndex + 1),
        onEnable(self) {
          allowScroll.current = false;
          scrollTimeout.current.restart(true);
          const savedY = self.scrollY();
          restoreScroll = () => self.scrollY(savedY);
          document.addEventListener('scroll', restoreScroll, { passive: false });
        },
        onDisable() {
          if (restoreScroll) {
            document.removeEventListener('scroll', restoreScroll);
            restoreScroll = null;
          }
        },
      });
      intentObserver.disable();

      // Slide function
      function gotoPanel(nextIndex: number) {
        if (nextIndex < 0 || nextIndex >= panels.length) {
          intentObserver.disable();
          return;
        }

        allowScroll.current = false;
        scrollTimeout.current.restart(true);

        const currentPanel = panels[currentIndex];
        const nextPanel = panels[nextIndex];
        const forward = nextIndex > currentIndex;

        // Prep next panel just off-screen
        gsap.set(nextPanel, { xPercent: forward ? 100 : -100 });

        // Timeline: slide current out, next in
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: 'power2.inOut' },
          onComplete: () => setCurrentIndex(nextIndex),
        });

        tl.to(currentPanel, { xPercent: forward ? -100 : 100 }, 0)
          .to(nextPanel, { xPercent: 0 }, 0);
      }

      // ScrollTrigger to pin section and enable observer
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        start: 'top top',
        end: '+=200',
        onEnter(self) {
          if (!intentObserver.isEnabled) {
            self.scroll(self.start + 1);
            intentObserver.enable();
          }
        },
        onEnterBack(self) {
          if (!intentObserver.isEnabled) {
            self.scroll(self.end - 1);
            intentObserver.enable();
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <div>
      {/* Swipe section */}
      <div
        ref={containerRef}
        className="swipe-section relative h-screen w-full overflow-hidden"
        style={{ whiteSpace: 'nowrap' }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => {
              panelsRef.current[idx] = el;
            }}
            className="panel inline-block h-full w-full align-top p-8 text-white text-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${project.featureImage})` }}
          >
            <h2 className="text-3xl font-bold">{project.name}</h2>
            <p className="mt-2 text-lg">{project.shortDescription}</p>
          </div>
        ))}
      </div>

      {/* Footer or final panel */}
      <footer className="description panel blue bg-blue-200 h-screen flex items-center justify-center">
        footer
      </footer>
    </div>
  );
}
