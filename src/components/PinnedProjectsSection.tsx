'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../app/data/projects';
import FlipLink from './animations/FlipLink';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function PinnedProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.panel');

    panels.forEach((panel) => {
      const bg = panel.querySelector('.background') as HTMLDivElement | null;

      // ✅ Animate panel scale from 0.95 to 1
      gsap.to(
        panel,
        {
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top 90%',
            end: 'bottom 35%',
            scrub: true,
          },
        }
      );

      // ✅ Animate backgroundPositionY for vertical parallax
      if (bg) {
        gsap.fromTo(
          bg,
          { backgroundPosition: 'center center' }, // aligns with panel start
          {
            backgroundPosition: 'center 80%', // moves downward
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 100%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      }

      // ✅ Pin panel (optional)
      ScrollTrigger.create({
        trigger: panel,
        start: panel.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative">
      <div className="w-full text-center pb-10">
        <h1 className="text-[25vw] font-medium -tracking-widest leading-[100%]">works</h1>
      </div>

      {projects.map((project) => (
        <section
          key={project.id}
          className="panel w-full h-screen relative overflow-hidden"
        >
          {/* ✅ Background image with parallax */}
          <div
            className="background absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${project.featureImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              willChange: 'background-position',
            }}
          />

          {/* ✅ Overlay */}
          <div className="absolute inset-0 z-10 bg-foreground opacity-40" />

          {/* ✅ Text content */}
          <div className="relative z-20 h-full flex flex-col justify-center items-start text-left px-8 gap-y-24">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-4xl md:text-9xl font-medium -tracking-wider text-white">
                {project.name}
              </h2>
              <p className="text-xl md:text-3xl text-white">
                {project.shortDescription}
              </p>
            </div>

            <FlipLink
              href={`/work/${project.slug}`}
              hasBg
              className="font-medium -tracking-wider text-3xl md:text-5xl leading-[1.2] flex"
            >
              view project
            </FlipLink>
          </div>
        </section>
      ))}
    </div>
  );
}
