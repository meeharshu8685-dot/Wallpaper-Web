
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  isSelected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, isSelected }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12.5deg', '-12.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12.5deg', '12.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(category)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-xl bg-gunmetal/20 shadow-2xl transition-all duration-500
        ${category.gridSpan === 2 ? 'md:col-span-2' : ''}
        ${isSelected ? 'ring-2 ring-brand-red shadow-[0_0_30px_rgba(255,0,0,0.4)]' : 'ring-1 ring-white/10'}`}
      whileHover={{ scale: 1.02 }}
    >
      <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }} className="absolute inset-0">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
          style={{ filter: 'brightness(0.5)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <span className="mb-2 font-mono text-xs tracking-tighter text-brand-red uppercase">Universe // {category.id}</span>
          <h3 className="font-heading text-3xl tracking-tighter text-white md:text-5xl group-hover:animate-glitch">
            {category.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
}

const Categories: React.FC<CategoriesProps> = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center font-heading text-5xl tracking-wider md:text-6xl"
      >
        Explore The Universe
      </motion.h2>

      <div className="grid auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onSelect={() => onSelectCategory(cat)}
            isSelected={selectedCategory?.id === cat.id}
          />
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(185, 28, 28, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(null)}
            className="font-mono text-brand-red hover:text-white transition-colors duration-300 border border-brand-red px-6 py-2 rounded-lg"
          >
            Clear Filter
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default Categories;
