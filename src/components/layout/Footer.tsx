"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlipLink from '../animations/FlipLink';

const Footer: React.FC = () => {

  return (
    <footer className="relative w-full overflow-hidden bg-gray-900 text-white px-8 py-10">
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <h3 className="text-2xl -tracking-wider">currently i'm available for <br /> freelance projects</h3>
        <div className="col-span-2 flex flex-col text-5xl -tracking-wider">
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
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <nav className="flex flex-col items-start">
          {["home", "work", "about", "cv"].map((social) => (
            <FlipLink key={social} href={`/${social}`}>{social}</FlipLink>
          ))}
        </nav>
        <div className="flex flex-col items-start">
          {["linkedin", "telegram", "instagram", "cosmos"].map((social) => (
            <FlipLink hasUnderline key={social} href={`/${social}`}>{social}</FlipLink>
          ))}
        </div>
      </div>
      <hr className="w-full h-[1px] bg-[#cdcdcd] opacity-40 my-8" />
      <div className="w-full">
        <img className="w-full" src="/images/sansoengsvg.svg" alt="san soeng" />
      </div>
    </footer>
  );
};

export default Footer;
