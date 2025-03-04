import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface FlipButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: string;
}

const FlipButton: React.FC<FlipButtonProps> = ({ children, className, ...props }) => {
  const duration = 0.2;
  const stagger = 0.03;
  const text = String(children);

  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      className={clsx("relative block overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      {/* Top Layer */}
      <div>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ duration, ease: "easeInOut", delay: stagger * index }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Bottom Layer */}
      <div className="absolute inset-0">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ duration, ease: "easeInOut", delay: stagger * index }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
};

export default FlipButton
