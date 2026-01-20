
import React from 'react';
import { motion } from 'framer-motion';

const aboutLines = [
  "This isn’t a website.",
  "This is a gallery of moods.",
  "For the ones who listen at midnight.",
  "For the culture.",
  "By the culture."
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const About: React.FC = () => {
  return (
    <section 
        className="relative flex min-h-screen items-center justify-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/aboutbg/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-brand-black/80"></div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 text-center"
      >
        {aboutLines.map((line, index) => (
          <motion.p
            key={index}
            variants={lineVariants}
            className="my-4 font-mono text-xl text-gray-300 md:my-6 md:text-3xl"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
