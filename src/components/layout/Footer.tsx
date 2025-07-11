"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import FlipLink from "../animations/FlipLink";
import RevealOnScroll from "../animations/RevealOnScroll";
import Link from "next/link";

const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set('.footer-container', { yPercent: -50 });

    gsap.to('.footer-container', {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
  }, { scope: footerRef });

// Handle the time update logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', hour12: false } as Intl.DateTimeFormatOptions;
      const formattedTime = new Intl.DateTimeFormat('en-GB', options).format(now);
      const timeZoneOffset = -now.getTimezoneOffset() / 60;
      const gmtOffset = `GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;
      setTimeString(`${formattedTime} (${gmtOffset})`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer ref={footerRef} className="h-screen bg-[#222] text-white relative w-full overflow-hidden">
      <section className="footer-container p-8 flex flex-col justify-end items-center h-screen">
        <div className="grid grid-cols-2 grid-rows-1 w-full gap-8">
          <h3 className="text-2xl -tracking-wider">currently i&apos;m available for <br /> freelance projects</h3>
          <div className="flex flex-col text-5xl -tracking-wider">
            <h2>say hi,</h2>
            <Link className="opacity-50 underline" href="mailto:sansoeng16@gmail.com">sansoeng16@gmail.com</Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-4 my-8">
          {[...Array(4)].map((_, index) => (
            <hr key={index} className="w-full h-[1px] bg-[#cdcdcd] opacity-40" />
          ))}
        </div>

        <div className="grid grid-cols-6 grid-rows-1 gap-8 text-xl w-full">
          <nav className="col-span-3 flex flex-col items-start">
            {["home", "work", "about", "cv"].map((item) => (
              <FlipLink key={item} href={`/${item}`}>{item}</FlipLink>
            ))}
          </nav>
          <div className="col-span-2 flex flex-col items-start">
            {["linkedin", "telegram", "instagram", "cosmos"].map((social) => (
              <FlipLink hasUnderline key={social} href={`/${social}`}>{social}</FlipLink>
            ))}
          </div>
          <div className="flex justify-end items-start">
            <button className="inline-flex gap-x-1 items-center justify-start">
              <span>back to top</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <hr className="w-full h-[1px] bg-[#cdcdcd] opacity-40 my-8" />

        <div className="grid grid-cols-6 grid-rows-1 gap-8 text-2xl -tracking-wider w-full">
          <p className="col-span-3 flex flex-col justify-end opacity-50">© SAN SOENG 2025</p>
          <div className="col-span-2 flex flex-col items-start">
            <p className="opacity-50">Phnom Penh, Cambodia</p>
            <p>{timeString}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="opacity-50">typography</p>
            <p>TT Hoves Pro</p>
          </div>
        </div>

        <RevealOnScroll type="reveal-down" className="w-full mt-20">
          <img className="w-full" src="/images/sansoengsvg.svg" alt="san soeng" />
        </RevealOnScroll>
      </section>
    </footer>

  );
};

export default Footer;
