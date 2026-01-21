
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CultureStatement from '../components/CultureStatement';
import Categories from '../components/Categories';
import { categories } from '../data';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSelectCategory = () => {
        navigate('/explore');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <CultureStatement />
            <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
                selectedCategory={null}
            />

            {/* CTA to Explore */}
            <section className="py-20 text-center">
                <motion.button
                    onClick={() => navigate('/explore')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-brand-red text-white font-heading text-xl rounded-full shadow-[0_0_30px_rgba(185,28,28,0.5)] hover:shadow-[0_0_50px_rgba(185,28,28,0.7)] transition-all"
                >
                    EXPLORE ALL WALLPAPERS
                </motion.button>
            </section>
        </motion.div>
    );
};

export default HomePage;
