'use client';

import RevealOnScroll from "./animations/RevealOnScroll";

const expertises = [
  'ui design, ux design',
  'interaction',
  'research',
  'creative direction',
  'branding',
  'visuals',
  'motion',
  'futuristic'
];

export default function ExpertiseSection() {

  return (
    <section className="relative w-full mt-[10vw] mb-[14vw]">
      <div className="relative min-h-screen w-full flex flex-row p-8 pt-24">
        <div className="relative basis-1/2 flex flex-col justify-start items-center">
          <RevealOnScroll className="sticky top-24 text-2xl -tracking-wider">
            <p>let's work together</p>
            <p><a
              className="underline hover:opacity-50"
              href="mailto:sansoen16@gmail.com"
            >
              sansoen16@gmail.com
            </a></p>
            
          </RevealOnScroll>
        </div>
        <div className="basis-1/2">
          <h3 className="text-4xl font-medium -tracking-wider opacity-50 mb-12">expertise</h3>
          <RevealOnScroll type="reveal-up">
            {expertises.map((text, index) => (
              <p key={index} className="text-8xl -tracking-wider leading-[115%]">
              {text}
            </p>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
