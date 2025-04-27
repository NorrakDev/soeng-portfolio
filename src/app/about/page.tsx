'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {

  useGSAP(() => {
    
  }, []);

  return (
    <div>
      <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] p-8">
        about
      </h1>

      <div className="w-full px-8">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*yoxeYaIM-2kjnZqUkO6ZNA.gif"
          alt="GIF"
          className="w-full h-auto object-contain"
        />
      </div>

      <section className="flex flex-col w-full px-8">
        <div className="about-section-header w-full z-3 flex justify-between sticky top-1/2 text-lg font-medium">
          <span>01</span>
          <span>Introduction</span>
        </div>
        <div className="about-section w-full mt-[5vw]">
          <div className="relative">
            <div className="about-large-title relative min-h-[60vw] flex flex-col justify-center items-center">
              <div className="text-[24vw] font-semibold -tracking-wider leading-none">
                hello
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
