// app/works/page.tsx
"use client";

import HoverSwapTextLink from "@/components/animations/HoverSwapTextLink";
import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "KB Prasac Merchant",
    details: "ui/ui design, interaction research",
    image: "/images/kb-prasac.png",
  },
  {
    id: 2,
    name: "Chip Mong Bank",
    details: "Introducing the super app for the merchant",
    image: "/images/chipmong.png",
  },
  {
    id: 3,
    name: "AEON Mall Plus",
    details: "Introducing the super app for the merchant",
    image: "/images/aeon-mall.png",
  },
  {
    id: 4,
    name: "SAN SOENG Portfolio",
    details: "Creative Direction, Live Action, Animation",
    image: "/images/portfolio.png",
  },
];

export default function WorksPage() {
  return (
    <>
      <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] p-8">works</h1>
      <div className="flex justify-center items-center">
      </div>
      {projects.map((project) => (
        <div key={project.id} className="relative w-screen aspect-[2/1]">
          <div
            className="relative w-full h-full"
          >
            <Image className="w-full h-full object-cover" fill src={project.image} alt={project.name} />
            <div className="absolute inset-0 bg-foreground opacity-30 h-full flex flex-col"></div>
            <div className="absolute inset-0 h-full flex justify-center items-center">
              <HoverSwapTextLink 
                text={project.name} 
                hoverText="view the project" 
                href="/works/chipmong-bank"
                transitionType="spring"
                textColor="white"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

