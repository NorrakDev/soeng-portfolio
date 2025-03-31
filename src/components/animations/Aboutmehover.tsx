import { motion } from "framer-motion";
import { useState } from "react";

export default function HoverTextEffect() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="text-3xl font-semibold cursor-pointer relative w-[200px] text-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: isHovered ? -20 : 0, opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          get to know me
        </motion.span>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          about me
        </motion.span>
      </motion.div>
    </div>
  );
}
