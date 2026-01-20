
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(position.x, springConfig);
  const smoothY = useSpring(position.y, springConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
      }}
      className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="absolute inset-0 rounded-full bg-white/80 blur-md"></div>
      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
    </motion.div>
  );
};

export default CustomCursor;
