
import React from 'react';
import { motion } from 'framer-motion';
import type { Wallpaper } from '../types';
import { DownloadIcon, LockIcon } from './icons';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onSelect: (wallpaper: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => onSelect(wallpaper)}
      whileHover={{ y: -8, scale: 1.02,
        boxShadow: wallpaper.isPremium 
          ? '0 0 20px rgba(212, 175, 55, 0.4)' 
          : '0 0 20px rgba(185, 28, 28, 0.4)'
      }}
      className="group relative mb-4 block cursor-pointer overflow-hidden rounded-lg shadow-lg break-inside-avoid transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img
        src={wallpaper.imageUrl}
        alt={wallpaper.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ filter: 'brightness(0.8)' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30 opacity-100 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/50"></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {wallpaper.tags.map(tag => (
              <span key={tag} className="rounded-full bg-black/50 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm">{tag}</span>
            ))}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/80 backdrop-blur-sm">
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
