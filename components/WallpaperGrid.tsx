
import React from 'react';
import { motion } from 'framer-motion';
import type { Wallpaper } from '../types';
import { DownloadIcon, LockIcon } from './icons';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onSelect: (wallpaper: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(wallpaper)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: wallpaper.isPremium
          ? '0 0 30px rgba(255, 215, 0, 0.3)'
          : '0 0 30px rgba(255, 0, 0, 0.3)'
      }}
      className="group relative mb-6 block cursor-pointer overflow-hidden rounded-xl bg-gunmetal/20 shadow-xl break-inside-avoid transform-gpu"
    >
      <img
        src={wallpaper.imageUrl}
        alt={wallpaper.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
        style={{ filter: 'brightness(0.7)' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-z-10 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
        <h4 className="mb-2 font-heading text-lg tracking-wider text-white group-hover:animate-glitch">{wallpaper.title}</h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {wallpaper.tags.slice(0, 2).map(tag => (
              <span key={tag} className="rounded border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-tighter text-gray-300 backdrop-blur-md">#{tag}</span>
            ))}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-transform hover:scale-110">
            <DownloadIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {wallpaper.isPremium && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-brand-gold/80 px-2 py-1 text-xs font-bold text-black backdrop-blur-sm">
          <LockIcon className="h-3 w-3" />
          <span>PREMIUM</span>
        </div>
      )}
    </motion.div>
  );
};

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  onSelectWallpaper: (wallpaper: Wallpaper) => void;
  title: string;
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({ wallpapers, onSelectWallpaper, title }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center font-heading text-4xl tracking-wider md:text-5xl"
      >
        {title}
      </motion.h2>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            onSelect={onSelectWallpaper}
          />
        ))}
      </div>
    </section>
  );
};

export default WallpaperGrid;
