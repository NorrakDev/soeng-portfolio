import { motion } from "framer-motion";

const AnimatedHeading: React.FC = () => {
  return (
    <motion.h1
      className="text-4xl font-bold text-center text-blue-600"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Welcome to My Portfolio
    </motion.h1>
  );
};

export default AnimatedHeading;
