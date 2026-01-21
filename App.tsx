
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Category, Wallpaper } from './types';
import { categories, wallpapers as allWallpapers } from './data';
import Hero from './components/Hero';
import CultureStatement from './components/CultureStatement';
import Categories from './components/Categories';
import WallpaperGrid from './components/WallpaperGrid';
import Premium from './components/Premium';
import About from './components/About';
import WallpaperDetail from './components/WallpaperDetail';
import LiveBackground from './components/LiveBackground';
import { MobileHeader, MobileNavbar } from './components/MobileNav';
import CapsuleNavbar from './components/CapsuleNavbar';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const wallpaperGridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
    setTimeout(() => {
      wallpaperGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      home: heroRef,
      categories: categoriesRef,
      premium: premiumRef,
      about: aboutRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredWallpapers = selectedCategory
    ? allWallpapers.filter((w) => w.categoryId === selectedCategory.id)
    : allWallpapers;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (selectedWallpaper) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedWallpaper]);

  return (
    <>
      <LiveBackground mousePosition={mousePosition} />
      <MobileHeader />
      <CapsuleNavbar activeTab={activeTab} setActiveTab={scrollToSection} />
      <div className="relative z-10 isolate min-h-screen w-full overflow-x-hidden pb-20 md:pb-0" style={{ perspective: '1000px' }}>
        <div ref={heroRef}><Hero /></div>
        <CultureStatement />
        <div ref={categoriesRef}>
          <Categories categories={categories} onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
        </div>
        <div ref={wallpaperGridRef} className="pt-12">
          <WallpaperGrid
            key={selectedCategory?.id || 'all'}
            wallpapers={filteredWallpapers}
            onSelectWallpaper={setSelectedWallpaper}
            title={selectedCategory ? selectedCategory.name : "All Wallpapers"}
          />
        </div>
        <div ref={premiumRef}><Premium /></div>
        <div ref={aboutRef}><About /></div>

        <AnimatePresence>
          {selectedWallpaper && (
            <WallpaperDetail
              wallpaper={selectedWallpaper}
              onClose={() => setSelectedWallpaper(null)}
            />
          )}
        </AnimatePresence>
      </div>
      <MobileNavbar activeTab={activeTab} setActiveTab={scrollToSection} />
    </>
  );
};

export default App;
