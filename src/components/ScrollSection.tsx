// components/AboutMeSection.tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMeSection = () => {
  useEffect(() => {
    const textLines = gsap.utils.toArray('.about-text p') as HTMLElement[];

    // Set initial opacity for all text lines
    gsap.set(textLines, { opacity: 0.2 });

    const lineTimeline = gsap.timeline();


    // Create ScrollTrigger for sequential opacity transitions
    textLines.forEach((line, index) => {
      ScrollTrigger.create({
        trigger: ".about-me-section",
        start: "top top",
        end: "+=" + 100000,
        pin: true,
        scrub: true,
        animation: lineTimeline,
        toggleActions: "play reverse play reverse",
      });

      lineTimeline
    //.to(elem,{ duration: 0.25, fontSize: "40px", color: "orange"}, 0)  
    .to(line,{ duration: 0.25, color: "orange"}, 0) 
  ;
    });
  }, []);

  return (
    <div className="about-me-section h-screen flex items-center justify-center bg-gray-100">
      <div className="text-container text-center">
        <p className="about-text text-4xl font-bold leading-tight">
          I design websites that help you
        </p>
        <p className="about-text text-2xl mt-4">
          ① Stand apart
        </p>
        <p className="about-text text-2xl mt-4">
          ② Be aesthetically pleasing
        </p>
        <p className="about-text text-2xl mt-4">
          ③ Articulate important information with clarity
        </p>
        <p className="about-text text-2xl mt-4">
          ④ Boost your earnings
        </p>
      </div>
    </div>
  );
};

export default AboutMeSection;
