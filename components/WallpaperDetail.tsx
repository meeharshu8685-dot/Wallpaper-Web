
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Wallpaper } from '../types';
import { CloseIcon, DownloadIcon, LockIcon, ShareIcon } from './icons';

interface WallpaperDetailProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

type Resolution = 'hd' | '4k' | 'amoled';

const WallpaperDetail: React.FC<WallpaperDetailProps> = ({ wallpaper, onClose }) => {
  const [resolution, setResolution] = useState<Resolution>('hd');

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = wallpaper.resolutions[resolution];
    link.download = `${wallpaper.title.replace(' ', '_')}_${resolution}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const glowStyle = (color: string) => ({
    boxShadow: `0 0 15px ${color}, 0 0 25px ${color}`,
  });

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="relative flex h-full w-full flex-col items-center justify-center p-4 md:h-auto md:w-auto md:flex-row md:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative aspect-[9/16] h-[70vh] max-h-[800px] overflow-hidden rounded-lg ${wallpaper.isPremium ? 'shadow-[0_0_35px_rgba(212,175,55,0.5)]' : ''}`}>
          <img
            src={wallpaper.resolutions[resolution]}
            alt={wallpaper.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4 flex w-full max-w-sm flex-col space-y-6 md:mt-0 md:w-80">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-4xl tracking-wider text-white">{wallpaper.title}</h2>
            <div className="mt-2 flex justify-center gap-2 md:justify-start">
              {wallpaper.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-mono text-sm text-gray-400">RESOLUTION</h3>
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-white/10 p-1">
              {(['hd', '4k', 'amoled'] as Resolution[]).map(res => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`rounded-md py-2 text-sm font-semibold transition-all duration-300 ${resolution === res ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(185,28,28,0.7)]' : 'hover:bg-white/20'}`}
                >
                  {res.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
             {wallpaper.isPremium ? (
              <motion.button 
                whileHover={{ scale: 1.05, ...glowStyle('rgba(212,175,55,0.7)') }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gold py-3 px-4 font-bold text-black animate-pulse-slow shadow-lg shadow-brand-gold/20 transition-shadow"
              >
                <LockIcon className="h-5 w-5" />
                UNLOCK PREMIUM
              </motion.button>
            ) : (
              <motion.button 
                onClick={handleDownload}
                whileHover={{ scale: 1.05, ...glowStyle('rgba(185,28,28,0.7)') }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-3 px-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-shadow"
              >
                <DownloadIcon className="h-5 w-5" />
                DOWNLOAD
              </motion.button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 px-4 font-bold text-white transition-shadow"
            >
              <ShareIcon className="h-5 w-5" />
              SHARE
            </motion.button>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white hover:scale-110">
          <CloseIcon className="h-8 w-8" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WallpaperDetail;
