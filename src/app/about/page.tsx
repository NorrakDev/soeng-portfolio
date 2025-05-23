'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import Footer from '../../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imageLayout = [
  { src: "https://picsum.photos/400/300?random=1", colStart: 1, colSpan: 3, rowStart: 1, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=2", colStart: 10, colSpan: 2, rowStart: 1, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=3", colStart: 5, colSpan: 4, rowStart: 3, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=4", colStart: 2, colSpan: 5, rowStart: 5, rowSpan: 3 },
  { src: "https://picsum.photos/400/300?random=5", colStart: 9, colSpan: 3, rowStart: 6, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=6", colStart: 2, colSpan: 3, rowStart: 1, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=7", colStart: 8, colSpan: 4, rowStart: 2, rowSpan: 3 },
  { src: "https://picsum.photos/400/300?random=8", colStart: 1, colSpan: 6, rowStart: 3, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=9", colStart: 7, colSpan: 3, rowStart: 6, rowSpan: 2 },
  { src: "https://picsum.photos/400/300?random=10", colStart: 5, colSpan: 5, rowStart: 7, rowSpan: 1 },
];
export default function Page() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollContentRef.current) return;

    const scrollDistance = scrollContentRef.current.offsetHeight - window.innerHeight;

    gsap.to(scrollContentRef.current, {
      y: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <div>

      <div className="h-[80vh] flex items-end">
        <h1 className="text-[25vw] font-medium -tracking-widest leading-[100%] p-8">
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
            <RevealOnScroll type='slide' triggerOffset='70%' className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                hello
              </h1>
            </RevealOnScroll>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
                i’m San Soeng from Cambodia <br />and i’ve been
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll type='flip' className="flex flex-col text-[12vw] font-normal -tracking-widest leading-[95%] text-center">
                <span>creating</span>
                <span>standout digital</span>
                <span>design since</span>
                <span>2018</span>
              </RevealOnScroll>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll className="flex flex-col w-[45vw] text-[2vw] font-normal -tracking-wider leading-tight text-center">
                <span>with six years of experience in software development</span>
                <span>companies and creative studio, I’ve created exceptional</span> 
                <span>user experiences that truly stand out. My career has</span>
                <span>spanned in-house roles, agency projects, and freelance</span>
                <span>opportunities, collaborating across diverse industries</span>
                <span>such as finance, banking, e-commerce, entertainment,</span> 
                <span>education, fintech, and more...</span>
              </RevealOnScroll>
            </div>
            <div className="min-h-screen flex flex-col justify-end items-center gap-y-60 py-[20vh]">
              <div className="flex flex-col items-center gap-y-2">
              <RevealOnScroll type='flip'>
                <h3 className="text-[8.5vw] font-normal -tracking-wider leading-[75%]">40<span className="align-top">+</span></h3>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-5xl -tracking-widest">projects done</p>
              </RevealOnScroll>
              </div>

              <div className="flex flex-col items-center gap-y-2">
              <RevealOnScroll type='flip'>
                <h3 className="text-[8.5vw] font-normal -tracking-wider leading-[75%]">5<span className="align-top">+</span></h3>
              </RevealOnScroll>
              <RevealOnScroll>
                <p className="text-5xl -tracking-widest">year of experience</p>
              </RevealOnScroll>
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
            <RevealOnScroll type='slide' triggerOffset='70%' className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                also
              </h1>
            </RevealOnScroll>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
                i’m a designer<br />that crafting
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll type='flip' className="flex flex-col text-[12vw] font-normal -tracking-widest leading-[95%] text-center">
              <span>compelling</span>
              <span>visual narratives</span>
              <span>that captivate</span>
              </RevealOnScroll>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll className="w-[45vw]">
                {[
                  "by combining keen attention to detail with strong",
                  "collaborative skills. With experience leading design ",
                  "teams, I excel at solving complex design challenges and ",
                  "transforming them into clear, engaging, and impactful",
                  "visual solutions."
                ].map((text, index) => (
                  <span key={index} className="block text-[2vw] font-normal -tracking-wider leading-tight text-center">{text}</span>
                ))}
              </RevealOnScroll>
            </div>
            <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
              {/* Centered Heading */}
              <h1 className="absolute inset-0 flex items-center justify-center text-[2.5vw] font-normal pointer-events-none">
                with a bit of design that look like this
              </h1>

              {/* Scrollable content */}
              <div ref={scrollContentRef} className="relative w-full">
                {/* Spacer to ensure heading is the only thing initially visible */}
                <div className="h-screen" />

                {/* First Grid */}
                <div className="w-full h-auto grid grid-cols-12 grid-rows-8 gap-2 px-4 py-4">
                  {imageLayout.slice(0, 5).map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      className="object-contain w-full h-auto"
                      style={{
                        gridColumnStart: img.colStart,
                        gridColumnEnd: `span ${img.colSpan}`,
                        gridRowStart: img.rowStart,
                        gridRowEnd: `span ${img.rowSpan}`,
                      }}
                    />
                  ))}
                </div>

                {/* Second Grid */}
                <div className="w-full h-auto grid grid-cols-12 grid-rows-8 gap-2 px-4 py-4">
                  {imageLayout.slice(5).map((img, i) => (
                    <img
                      key={i + 5}
                      src={img.src}
                      className="object-contain w-full h-auto"
                      style={{
                        gridColumnStart: img.colStart,
                        gridColumnEnd: `span ${img.colSpan}`,
                        gridRowStart: img.rowStart,
                        gridRowEnd: `span ${img.rowSpan}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
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
            <RevealOnScroll type='slide' triggerOffset='70%' className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <h1 className="text-[30vw] font-medium -tracking-widest leading-none">
                finally
              </h1>
            </RevealOnScroll>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-normal -tracking-wider leading-tight text-center">
              I&apos;m varied in my approach<br />of creating
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
             <RevealOnScroll className="w-[45vw]">
                {[
                  "I conduct thorough research to understand project goals,",
                  "then move to design exploration, developing concepts",
                  "and user goals, and finally, create engaging, interactive",
                  "products that combine aesthetics user interface and",
                  "seamlessly user experience."
                ].map((text, index) => (
                  <span key={index} className="block text-[2vw] font-normal -tracking-wider leading-tight text-center">{text}</span>
                ))}
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
