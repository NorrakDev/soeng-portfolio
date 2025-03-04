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
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const defaultChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
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
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);

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
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
