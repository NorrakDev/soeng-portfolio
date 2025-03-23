import React from 'react';
import { motion, useAnimation, Variants, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedContainerProps extends React.PropsWithChildren {
  className?: string;
  delay?: number;
  childVariants?: Variants;
  parentVariants?: Variants;
}

const defaultParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,  // Control stagger delay to make it slower
      delayChildren: 0.1,     // Small initial delay for all children
    },
  },
};

const defaultChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,  // Start below the element's original position
  },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,  // Slide up to its natural position
    transition: {
      type: 'spring',
      damping: 30,      // Slower spring damping for a smoother effect
      stiffness: 100,   // Lower stiffness for more relaxed motion
      delay: customDelay, // Dynamic delay for each child
      ease: 'easeOut',  // Create a "fast to slow" effect
    },
  }),
};

export const AnimatedContainer = ({
  children,
  className,
  delay = 0,
  childVariants = defaultChildVariants,
  parentVariants = defaultParentVariants,
}: AnimatedContainerProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger only once when in view

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000); // Apply delay before animation starts

      return () => clearTimeout(timer);
    }
  }, [controls, delay, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={parentVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        // Create a delay for each child based on its index
        // Slower delay to make the effect more noticeable
        const customDelay = Math.pow(index * 0.25, 2) * 0.2; // Exponential delay, adjustable for slow stagger
        return (
          <motion.div
            key={index}
            variants={childVariants}
            custom={customDelay} // Pass customDelay to the variant for each child
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
