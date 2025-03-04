import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  name: string;
  details: string;
  image: string;
}

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

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");
    
    // Set up horizontal scrolling effect
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (containerRef.current?.offsetWidth || 0),
      },
    });
  }, []);

  return (
    <section className="mt-[14vw]">
      <h2 className="tracking-[-0.07em] not-italic text-[22vw] font-medium leading-none text-center select-none pb-[10vw]">works</h2>
      <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">
        <div className="flex h-full">
          {projects.map((project) => (
            <div key={project.id} className="panel relative min-w-full h-full">
              {/* Next.js Image with full cover */}
              <Image
                src={project.image}
                layout="fill"
                objectFit="cover"
                alt={project.name}
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-black bg-opacity-40">
                <h2 className="text-white text-4xl font-bold">{project.name}</h2>
                <p className="text-gray-300 mt-2 text-lg">{project.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default FeaturedProjects;
