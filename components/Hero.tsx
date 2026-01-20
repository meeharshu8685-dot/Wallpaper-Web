
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDownIcon } from './icons';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.1], [0, -500]);

  const text1 = "DHH IS NOT A GENRE.";
  const text2 = "IT'S A MOVEMENT.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 50 },
    },
  };

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-40 grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flashing-white-lights-on-black-background-31620-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
        <div className="scanline" />
      </div>

      <motion.div
        style={{ scale, opacity, translateZ: z, transformStyle: 'preserve-3d' }}
        className="text-center"
      >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-5xl tracking-widest text-gray-100 md:text-8xl lg:text-9xl animate-bass-scale"
        >
          <motion.div variants={lineVariants} className="whitespace-nowrap hover:animate-glitch select-none cursor-default">
            {text1}
          </motion.div>
          <motion.div variants={lineVariants} className="whitespace-nowrap text-brand-red animate-text-pulse select-none cursor-default">
            {text2}
          </motion.div>
        </motion.h1>
      </motion.div>

      <div className="absolute bottom-10 z-20 flex flex-col items-center justify-center space-y-2 text-gray-400">
        <span className="text-sm font-mono">ENTER THE UNIVERSE</span>
        <ChevronDownIcon className="h-6 w-6 animate-pulse-slow" />
      </div>
    </section>
  );
};

export default Hero;