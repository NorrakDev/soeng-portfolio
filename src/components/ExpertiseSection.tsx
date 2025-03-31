'use client';

import { motion } from 'framer-motion';

const texts = [
  'ui design, ux design',
  'interaction',
  'research',
  'creative direction',
  'branding',
  'visuals',
  'motion',
  'futuristic'
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } },
};

export default function ExpertiseSection() {
  return (
    <section className="relative w-full mt-[10vw] mb-[14vw]">
      <div className="relative min-h-screen w-full flex flex-row p-8 pt-24">
        <div className="relative basis-1/2 flex flex-col justify-start items-center">
          <div className="sticky top-24 text-2xl -tracking-wider">
            <p>let's work together</p>
            <a
              className="underline transition-opacity hover:opacity-50"
              href="mailto:sansoen16@gmail.com"
            >
              sansoen16@gmail.com
            </a>
          </div>
        </div>
        <div className="basis-1/2">
          <h3 className="text-4xl font-medium -tracking-wider opacity-50 mb-12">expertise</h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="list-none m-0 p-0"
          >
            {texts.map((text, index) => (
              <li key={index} className="overflow-hidden">
                <motion.span
                  className="text-8xl -tracking-wider leading-[115%] block"
                  variants={textVariants}
                >
                  {text}
                </motion.span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
