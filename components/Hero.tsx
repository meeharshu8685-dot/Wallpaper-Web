import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './icons';
import DHHScene from './DHHScene';
import LottieAnimation from './LottieAnimation';

const SLOGANS = [
  { text1: "DHH IS NOT A GENRE.", text2: "IT'S A MOVEMENT." },
  { text1: "DHH HITS DIFFERENT", text2: "AT MIDNIGHT" },
  { text1: "STRAIGHT FROM", text2: "THE GULLIES" },
  { text1: "BARS OVER", text2: "EVERYTHING" },
  { text1: "BUILT FROM", text2: "HUSTLE" },
  { text1: "WHERE SILENCE", text2: "MEETS BASS" },
  { text1: "WE DON’T SCREAM.", text2: "WE SURVIVE IN VERSES." },
  { text1: "THE STREETS", text2: "TAUGHT US RHYTHM." },
  { text1: "THIS ISN’T MUSIC.", text2: "IT’S PRESSURE." }
];

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.1], [0, -500]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(10px)',
      transition: { duration: 0.3 }
    }
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
        className="text-center w-full"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-heading text-5xl tracking-widest text-gray-100 md:text-8xl lg:text-9xl animate-bass-scale px-4 leading-none"
          >
            <motion.div variants={lineVariants} className="hover:animate-glitch select-none cursor-default mb-4 break-words">
              {SLOGANS[currentIndex].text1}
            </motion.div>
            <motion.div variants={lineVariants} className="text-brand-red animate-text-pulse select-none cursor-default break-words">
              {SLOGANS[currentIndex].text2}
            </motion.div>
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-10 z-20 flex flex-col items-center justify-center space-y-2 text-gray-400">
        <span className="text-sm font-mono opacity-50">SCROLL TO DISCOVER</span>
        <LottieAnimation
          url="https://lottie.host/7936a56e-8121-477a-8533-33923c88e99a/6M9RzC0zRj.json"
          className="h-12 w-12 opacity-60"
        />
      </div>
      <DHHScene />
    </section>
  );
};

export default Hero;