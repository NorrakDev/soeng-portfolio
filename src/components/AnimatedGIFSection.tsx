import { motion } from "framer-motion";

const AnimatedGIFSection = () => {
  return (
    <motion.section
      className="mt-8 px-8"
      initial={{ paddingLeft: '2rem', paddingRight: '2rem' }} // Initial padding
      whileInView={{  
        paddingLeft: '0',   // Remove padding gradually when in center of the viewport
        paddingRight: '0',
      }}  
      viewport={{ once: false, amount: 0.2 }}  // Trigger when 20% of section is in view
      transition={{
        ease: "easeInOut",
        duration: 1.5,  // Adjusted duration for smooth animation
        type: "spring", // Smooth spring animation
        stiffness: 80,  // Adjust stiffness for a subtle effect
      }}
    >
      <div className="w-full mt-8">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZkYmR2cHRlNnlwa3lsdXJpMDJrbnA2NGt2aDU3aWZvc3ptaGZvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
          alt="GIF"
          className="w-full h-auto object-contain"
        />
      </div>
    </motion.section>
  );
};

export default AnimatedGIFSection;
