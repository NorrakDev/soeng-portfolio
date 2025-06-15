"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { projects } from '../app/data/projects';
import FlipLink from './animations/FlipLink';
import Link from 'next/link';
import RevealOnScroll from './animations/RevealOnScroll';

gsap.registerPlugin(ScrollTrigger, Observer);

export default function SwipeScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(projects[0]);

  const allowScroll = useRef(true);
  const scrollTimeout = useRef(
    gsap.delayedCall(1, () => { allowScroll.current = true; }).pause()
  );

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let restoreScroll: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const swipePanels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

      const intentObserver = Observer.create({
        type: 'wheel,touch',
        tolerance: 100,
        preventDefault: false,
        onUp: () => allowScroll.current && gotoPanel(currentIndex - 1, false),
        onDown: () => allowScroll.current && gotoPanel(currentIndex + 1, true),
        onEnable(self) {
          allowScroll.current = false;
          scrollTimeout.current.restart(true);
          const saved = self.scrollY();
          restoreScroll = () => self.scrollY(saved);
          document.addEventListener('scroll', restoreScroll, { passive: false });
        },
        onDisable() {
          if (restoreScroll) {
            document.removeEventListener('scroll', restoreScroll);
            restoreScroll = null;
          }
        }
      });
      intentObserver.disable();

      function animateTextTransition(index: number) {
        const tl = gsap.timeline();

        // fade out name, slide out description down
        tl.to(nameRef.current, { opacity: 0, duration: 0.3, skewX: 5 }, 0);
        tl.to(descRef.current, { yPercent: 100, opacity: 0, duration: 0.3, ease: "slow(0.7,0.7,false)"}, 0);

        // update content when out animation completes
        tl.add(() => setDisplayText(projects[index]));

        // prepare new elements: name invisible, desc positioned below
        tl.set(nameRef.current, { opacity: 0, skewX: 5  });
        tl.set(descRef.current, { yPercent: 100, opacity: 0, ease: "slow(0.7,0.7,false)" });

        // fade in name, slide in description from bottom
        tl.to(nameRef.current, { opacity: 1, duration: 0.3, skewX: 0 });
        tl.to(descRef.current, { yPercent: 0, opacity: 1, duration: 0.3, ease: "slow(0.7,0.7,false)"});

        return tl;
      }

      function gotoPanel(index: number, down: boolean) {
        if (index < 0 || index >= swipePanels.length) {
          intentObserver.disable();
          return;
        }

        allowScroll.current = false;
        scrollTimeout.current.restart(true);

        const currentPanel = swipePanels[currentIndex];
        const nextPanel = swipePanels[index];

        // animate overlay text
        animateTextTransition(index);

        /// panel swipe with scale/parallax
        if (down) {
          // start next panel below and slightly scaled down
          gsap.set(nextPanel, { yPercent: 100, scale: 1.5 });
          gsap.to(currentPanel, { yPercent: -100, scale: 1, duration: 0.6 });
          gsap.to(nextPanel, {
            yPercent: 0,
            scale: 1,
            duration: 0.6,
            onComplete: () => setCurrentIndex(index)
          });
        } else {
          // start next panel above and slightly scaled down
          gsap.set(nextPanel, { yPercent: -100, scale: 1.5 });
          gsap.to(currentPanel, { yPercent: 100, scale: 1, duration: 0.6 });
          gsap.to(nextPanel, {
            yPercent: 0,
            scale: 1,
            duration: 0.6,
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
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <div>
      <RevealOnScroll className="w-full text-center pb-10">
        <h1 className="text-[25vw] font-medium -tracking-widest leading-[100%]">works</h1>
      </RevealOnScroll>
      
      <div ref={containerRef} className="swipe-section relative min-h-screen w-full overflow-hidden">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { panelsRef.current[idx] = el; }}
            className="panel absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.featureImage})` }}
          />
        ))}
        
        {/* Fixed overlay */}
        <div className="absolute bottom-0 z-10 left-0 w-full h-[30vh] bg-background p-8 text-black">
        
          <div className="h-full container mx-auto px-8 flex flex-col justify-between">
            <h2 ref={nameRef} className="text-8xl font-medium">
              <Link scroll href={`/work/${displayText.slug}`} className='transition duration-300 hover:underline'>{displayText.name}</Link>
            </h2>
            <div className="mt-4 grid grid-cols-3 items-center text-center">
              <p ref={descRef} className="col-span-1 text-xl text-[#a8a8a8]">{displayText.shortDescription}</p>
              <div>
              <FlipLink href={`/work/${displayText.slug}`} hasUnderline className='text-lg font-medium text-foreground'>View Project</FlipLink>
              </div>
              <div className="col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
