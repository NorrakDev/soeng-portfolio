'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import Footer from '../../components/layout/Footer';
import Image from 'next/image';
import ScrollPinnedWords from '../../components/ScrollPinnedWords';
import ScrollWaterImages from '../../components/ScrollWaterImages';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {

  useGSAP(() => {
    const sections = document.querySelectorAll<HTMLElement>('.pinned-section');

    sections.forEach((section) => {
      const header = section.querySelector<HTMLElement>('.about-section-header');
      if (!header) return;

      ScrollTrigger.create({
        trigger: header,
        start: 'center center',
        end: () => `+=${section.offsetHeight - header.offsetHeight}`,
        pin: header,
        pinSpacing: false,
      });
    });
  });

  return (
    <div>

      <div className="h-[80vh] flex items-end">
        <h1 className="text-[25vw] font-medium -tracking-widest leading-[100%] px-8">
          about
        </h1>
      </div>

      <div className="w-full h-screen relative px-8">
        <div className="w-full h-full relative">
          <Image
            src="/images/about-me.jpg"
            fill
            alt="GIF"
            className="object-cover"
          />
        </div>
      </div>

      {/* 01 INTRODUCING SECTION */}
      <section className="pinned-section flex flex-col w-full px-8">
        <div className="about-section-header w-full z-30 flex justify-between text-lg font-medium">
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
              <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
                i’m San Soeng from Cambodia <br />and i’ve been
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll type='flip' className="flex flex-col text-[12vw] font-medium -tracking-widest leading-[95%] text-center">
                <span>creating</span>
                <span>standout digital</span>
                <span>design since</span>
                <span>2018</span>
              </RevealOnScroll>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll className="flex flex-col w-[45vw] text-[2vw] font-medium -tracking-wider leading-tight text-center">
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
                  <h3 className="text-[8.5vw] font-medium -tracking-wider leading-[75%]">40<span className="align-top">+</span></h3>
                </RevealOnScroll>
                <RevealOnScroll>
                  <p className="text-5xl -tracking-widest">projects done</p>
                </RevealOnScroll>
              </div>

              <div className="flex flex-col items-center gap-y-2">
                <RevealOnScroll type='flip'>
                  <h3 className="text-[8.5vw] font-medium -tracking-wider leading-[75%]">5<span className="align-top">+</span></h3>
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
      <section className="pinned-section flex flex-col w-full px-8 bg-black text-white">
        <div className="about-section-header w-full z-30 flex justify-between text-lg font-medium">
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
              <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
                i’m a designer<br />that crafting
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll type='flip' className="flex flex-col text-[12vw] font-medium -tracking-widest leading-[95%] text-center">
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
                  <span key={index} className="block text-[2vw] font-medium -tracking-wider leading-tight text-center">{text}</span>
                ))}
              </RevealOnScroll>
            </div>

            <ScrollWaterImages></ScrollWaterImages>
          </div>
        </div>
      </section>

      {/* 03 SERVICE/APPROACH SECTION */}
      <section className="pinned-section flex flex-col w-full px-8">
        <div className="about-section-header w-full z-30 flex justify-between text-lg font-medium">
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
              <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
                I&apos;m varied in my approach<br />of creating
              </p>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <RevealOnScroll className="w-[50vw]">
                {[
                  "I conduct thorough research to understand project goals,",
                  "then move to design exploration, developing concepts",
                  "and user goals, and finally, create engaging, interactive",
                  "products that combine aesthetics user interface and",
                  "seamlessly user experience."
                ].map((text, index) => (
                  <span key={index} className="block text-[2vw] font-medium -tracking-wider leading-tight text-center">{text}</span>
                ))}
              </RevealOnScroll>
            </div>
            <div className="min-h-screen flex flex-col justify-center items-center my-[20vh]">
              <p className="text-[2.5vw] font-medium -tracking-wider leading-tight text-center">
                Let&apos;s take a look at i<br />expertise in
              </p>
            </div>
            <div className="flex flex-col gap-y-28">
              <ScrollPinnedWords
                leftText="Design"
                words={["Digital", "Systems", "Typography", "Graphic", "Visual"]}
              />
              <ScrollPinnedWords
                leftText="Web Dev"
                words={["Webflow", "GSAP", "Interactions", "Motion", "HTML+CSS"]}
              />
              <ScrollPinnedWords
                leftText="Direction"
                words={["Art", "Branding", "Narrative", "Concepts", "Strategy"]}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
