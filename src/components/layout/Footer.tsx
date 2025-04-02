"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FlipLink from '../animations/FlipLink';
import FlipButton from '../animations/FlipButton';

const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedTime = new Intl.DateTimeFormat("en-GB", options).format(now);

      const timeZoneOffset = -now.getTimezoneOffset() / 60; // Get timezone offset in hours
      const gmtOffset = `GMT${timeZoneOffset >= 0 ? "+" : ""}${timeZoneOffset}`;

      setTimeString(`${formattedTime} (${gmtOffset})`);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  return (
    <footer className="relative w-full overflow-hidden bg-foreground text-white px-8 py-10">
      <div className="grid grid-cols-2 grid-rows-1">
        <h3 className="text-2xl -tracking-wider">currently i'm available for <br /> freelance projects</h3>
        <div className="flex flex-col text-5xl -tracking-wider">
          <h2 >say hi,</h2>
          <a className="opacity-50 underline" href="mailto:sansoeng16@gmail.com">sansoeng16@gmail.com</a>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-4 my-8">
        {[...Array(9)].map((_, index) => (
          <hr
            key={index}
            className={`w-full h-[1px] bg-[#cdcdcd] opacity-40`} // Tailwind opacity scale
          />
        ))}
      </div>
      <div className="grid grid-cols-6 grid-rows-1 gap-4 text-xl">
        <nav className="col-span-3 flex flex-col items-start">
          {["home", "work", "about", "cv"].map((social) => (
            <FlipLink key={social} href={`/${social}`}>{social}</FlipLink>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
      </div>
      <hr className="w-full h-[1px] bg-[#cdcdcd] opacity-40 my-8" />
      <div className="grid grid-cols-6 grid-rows-1 gap-4 text-2xl -tracking-wider">
        <p className="col-span-3 flex flex-col justify-end opacity-50">
          © SAN SOENG 2025
        </p>
        <div className="col-span-2 flex flex-col items-start">
          <p className='opacity-50'>Phnom Penh, Cambodia</p>
          <p>{timeString}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className='opacity-50'>typography</p>
          <p>TT Hoves Pro</p>
        </div>
      </div>
      <div className="w-full mt-20">
        <img className="w-full" src="/images/sansoengsvg.svg" alt="san soeng" />
      </div>
    </footer>
  );
};

export default Footer;
