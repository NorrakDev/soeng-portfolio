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
      <div className="h-[60vh] flex items-end">
        <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] p-8">
          about
        </h1>
      </div>
      
      <div className="w-full px-8">
        <img
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*yoxeYaIM-2kjnZqUkO6ZNA.gif"
          alt="GIF"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 01 INTRODUCING SECTION */}
      <section className="flex flex-col w-full px-8">
        <div className="about-section-header w-full z-3 flex justify-between sticky top-1/2 text-lg font-medium">
          <span>01/03</span>
          <span>Introduction</span>
        </div>
        <div className="about-section w-full mt-[5vw]">
          <div className="relative">
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                hello
              </h1>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
                i’m San Soeng from Cambodia <br />and i’ve been
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h2 className="text-[12vw] font-normal -tracking-widest leading-[95%] text-center">
                creating<br />
                standout digital<br />
                design since<br />
                2018
              </h2>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h2 className="w-[45vw] text-[2vw] font-normal -tracking-wider leading-tight text-center">
                with six years of experience in software development 
                companies and creative studio, I’ve created exceptional 
                user experiences that truly stand out. My career has 
                spanned in-house roles, agency projects, and freelance 
                opportunities, collaborating across diverse industries 
                such as finance, banking, e-commerce, entertainment, 
                education, fintech, and more...
              </h2>
            </div>
            <div className="min-h-screen flex flex-col justify-end items-center gap-y-60 py-[20vh]">
              <div className="flex flex-col items-center gap-y-2">
                <h3 className="text-[8.5vw] font-normal -tracking-wider leading-[75%]">40<span className="align-top">+</span></h3>
                <p className="text-5xl -tracking-widest">projects done</p>
              </div>

              <div className="flex flex-col items-center gap-y-2">
                <h3 className="text-[8.5vw] font-normal -tracking-wider leading-[75%]">5<span className="align-top">+</span></h3>
                <p className="text-5xl -tracking-widest">year of experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 EXPERIENCE SECTION */} 
      <section className="flex flex-col w-full px-8 bg-black text-white">
        <div className="about-section-header w-full z-3 flex justify-between sticky top-1/2 text-lg font-medium">
          <span>02/03</span>
          <span>experience</span>
        </div>
        <div className="about-section w-full mt-[5vw]">
          <div className="relative">
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                also
              </h1>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
                i’m a designer<br />that crafting
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h2 className="text-[12vw] font-normal -tracking-widest leading-[95%] text-center">
              compelling<br />
              visual narratives<br />
              that captivate 
              </h2>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h2 className="w-[45vw] text-[2vw] font-normal -tracking-wider leading-tight text-center">
              by combining keen attention to detail with strong 
              collaborative skills. With experience leading design 
              teams, I excel at solving complex design challenges and 
              transforming them into clear, engaging, and impactful
              visual solutions.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 03 SERVICE/APPROACH SECTION */}
      <section className="flex flex-col w-full px-8">
        <div className="about-section-header w-full z-3 flex justify-between sticky top-1/2 text-lg font-medium">
          <span>03/03</span>
          <span>service/approach</span>
        </div>
        <div className="about-section w-full mt-[5vw]">
          <div className="relative">
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                finally
              </h1>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
              I'm varied in my approach<br />of creating
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h2 className="w-[45vw] text-[2vw] font-normal -tracking-wider leading-tight text-center">
              I conduct thorough research to understand project goals, 
              then move to design exploration, developing concepts 
              and user goals, and finally, create engaging, interactive
              products that combine aesthetics user interface and
              seamlessly user experience.
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
