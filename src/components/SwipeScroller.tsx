"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';
import { projects } from '../app/data/projects';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function SwipeScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(projects[0]);
  const allowScroll = useRef(true);
  const scrollTimeout = useRef(gsap.delayedCall(1, () => { allowScroll.current = true; }).pause());

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let restoreScroll: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const swipePanels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

      const intentObserver = Observer.create({
        type: 'wheel,touch',
        tolerance: 10,
        preventDefault: true,
        onUp: () => allowScroll.current && gotoPanel(currentIndex - 1, false),
        onDown: () => allowScroll.current && gotoPanel(currentIndex + 1, true),
        onEnable(self) {
          allowScroll.current = false;
          scrollTimeout.current.restart(true);
          const saved = self.scrollY();
          restoreScroll = () => self.scrollY(saved);
          document.addEventListener('scroll', restoreScroll, { passive: false });
        },
        onDisable(self) {
          if (restoreScroll) {
            document.removeEventListener('scroll', restoreScroll);
            restoreScroll = null;
          }
        }
      });
      intentObserver.disable();

      function gotoPanel(index: number, down: boolean) {
        if (index < 0 || index >= swipePanels.length) {
          intentObserver.disable();
          return;
        }

        allowScroll.current = false;
        scrollTimeout.current.restart(true);

        const currentPanel = swipePanels[currentIndex];
        const nextPanel = swipePanels[index];

        // Animate text fade out
        gsap.to(textWrapperRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => setDisplayText(projects[index])
        });

        if (down) {
          gsap.set(nextPanel, { yPercent: 100 });
          gsap.to([currentPanel, nextPanel], {
            yPercent: (i) => (i === 0 ? -100 : 0),
            duration: 0.75,
            onComplete: () => setCurrentIndex(index)
          });
        } else {
          gsap.set(nextPanel, { yPercent: -100 });
          gsap.to([currentPanel, nextPanel], {
            yPercent: (i) => (i === 0 ? 100 : 0),
            duration: 0.75,
            onComplete: () => setCurrentIndex(index)
          });
        }
      }

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        anticipatePin: 1,
        start: 'top top',
        end: '+=200',
        onEnter(self) {
          if (intentObserver.isEnabled) return;
          self.scroll(self.start + 1);
          intentObserver.enable();
        },
        onEnterBack(self) {
          if (intentObserver.isEnabled) return;
          self.scroll(self.end - 1);
          intentObserver.enable();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  // Animate text fade in when displayText changes
  useEffect(() => {
    gsap.to(textWrapperRef.current, {
      opacity: 1,
      duration: 0.3
    });
  }, [displayText]);

  return (
    <div>
      <div ref={containerRef} className="swipe-section relative h-screen w-full overflow-hidden">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { panelsRef.current[idx] = el; }}
            className="panel absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.featureImage})` }}
          />
        ))}
        
        {/* Fixed overlay */}
        <div 
          ref={overlayRef}
          className="absolute bottom-0 z-10 left-0 w-full h-[30vh] bg-background p-8 text-black pointer-events-none"
        >
          <div ref={textWrapperRef} className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold">{displayText.name}</h2>
            <p className="mt-2 text-lg">{displayText.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}