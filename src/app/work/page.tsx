'use client';

import { useRef } from 'react';
import HoverSwapTextLink from '@/components/animations/HoverSwapTextLink';
import { projects } from '@/app/data/projects';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let getRatio = (el: HTMLElement) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    gsap.utils.toArray<HTMLElement>('.project-item').forEach((project, i) => {
      const bg = project.querySelector('.bg') as HTMLElement;
      const overlay = project.querySelector('.overlay') as HTMLElement;
      if (!bg) return;

      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            i === 0 ? '50% 0px' : `50% ${-window.innerHeight * getRatio(project)}px`,
        },
        {
          backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(project))}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: i === 0 ? 'top top' : 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      if (overlay) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(overlay, { opacity: 0.5 }, { opacity: 0.1, ease: 'none' })
          .to(overlay, { opacity: 0.5, ease: 'none' });
      }
    });
  }, []);

  return (
    <div ref={containerRef}>
      <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] p-8 text-center">
        works
      </h1>

      {projects.map((project) => (
        <div
          key={project.id}
          className="project-item relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            className="bg absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${project.featureImage})` }}
          ></div>

          <div className="overlay absolute top-0 left-0 w-full h-full bg-foreground z-[1]" />

          <div className="z-10">
            <HoverSwapTextLink
              text={project.name}
              hoverText="view the project"
              href={`/work/${project.slug}`}
              transitionType="spring"
              textColor="white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
