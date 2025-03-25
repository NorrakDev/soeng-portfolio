import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface FlipLinkProps extends Omit<HTMLMotionProps<"a">, "ref"> {
  href: string;
  children: string; // Ensure children is always a string
  hasBg?: boolean;
  hasUnderline?: boolean;
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, className, hasBg = false, hasUnderline = false, ...props }) => {
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
          "group transform transition-transform relative inline-block", // Ensure the link is inline-block to position the underline correctly
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

          {/* Conditionally render the underline */}
          {hasUnderline && (
            <div
              className="absolute bottom-0 right-0 w-full h-[2px] bg-current group-hover:w-0 transition-all duration-300 ease-in-out"
            />
          )}
        </div>
      </motion.a>
    </Link>
  );
};

export default FlipLink;
