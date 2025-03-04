import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface FlipLinkProps extends Omit<HTMLMotionProps<"a">, "ref"> {
  href: string;
  children: string; // Ensure children is always a string
  hasBg?: boolean;
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, className, hasBg = false, ...props }) => {
  const duration = 0.2;
  const stagger = 0.02;
  const text = String(children); // Ensures children is treated as a string

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        initial="initial"
        whileHover="hovered"
        className={clsx(
          hasBg && "bg-white p-[.5vw] hover:bg-[#f0e9e4] hover:scale-110 hover:origin-left", // Only apply scale and origin-left when hasBg is true
          "transform transition-transform", // Ensure transitions are applied for transform
          className
        )}

        {...(props as HTMLMotionProps<"a">)}
      >
        <div className="relative block overflow-hidden whitespace-nowrap">
          {/* Top Layer */}
          <div>
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" },
                }}
                transition={{
                  duration,
                  ease: "easeInOut",
                  delay: stagger * index,
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter} {/* Non-breaking space for better spacing */}
              </motion.span>
            ))}
          </div>

          {/* Bottom Layer */}
          <div className="absolute inset-0">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration,
                  ease: "easeInOut",
                  delay: stagger * index,
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter} {/* Non-breaking space for better spacing */}
              </motion.span>
            ))}
          </div>
        </div>

      </motion.a>
    </Link>
  );
};

export default FlipLink;
