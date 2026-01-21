
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, Wallpaper } from '../types';
import { categories, wallpapers as allWallpapers } from '../data';
import Categories from '../components/Categories';
import WallpaperGrid from '../components/WallpaperGrid';
import WallpaperDetail from '../components/WallpaperDetail';

const ExplorePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
    const wallpaperGridRef = useRef<HTMLDivElement>(null);

    const handleSelectCategory = (category: Category | null) => {
        setSelectedCategory(category);
        setTimeout(() => {
            wallpaperGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const filteredWallpapers = selectedCategory
        ? allWallpapers.filter((w) => w.categoryId === selectedCategory.id)
        : allWallpapers;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 md:pt-32"
        >
            <section className="container mx-auto px-4 py-8">
                <h1 className="font-heading text-4xl md:text-6xl text-center mb-8 tracking-widest">
                    EXPLORE <span className="text-brand-red">WALLPAPERS</span>
                </h1>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
                    Dive into our curated collection of Desi Hip Hop wallpapers. Filter by category or browse them all.
                </p>
            </section>

            <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
                selectedCategory={selectedCategory}
            />

            <div ref={wallpaperGridRef} className="pt-8">
                <WallpaperGrid
                    key={selectedCategory?.id || 'all'}
                    wallpapers={filteredWallpapers}
                    onSelectWallpaper={setSelectedWallpaper}
                    title={selectedCategory ? selectedCategory.name : "All Wallpapers"}
                />
            </div>

            <AnimatePresence>
                {selectedWallpaper && (
                    <WallpaperDetail
                        wallpaper={selectedWallpaper}
                        onClose={() => setSelectedWallpaper(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ExplorePage;
