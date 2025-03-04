import { FC, ReactNode } from "react";
import { motion, Variants, HTMLMotionProps, useInView } from "framer-motion";
import { useRef } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: string;
  delay?: number;
  duration?: number;
}

const WavyText: FC<Props> = ({ children, delay = 0, duration = 0.05, ...props }: Props) => {
  const letters = Array.from(children);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const container: Variants = {
    hidden: {
      opacity: 0
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay }
    })
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      className="flex"
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WavyText;