
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HomeIcon, GridIcon, ZapIcon, InfoIcon } from './icons';

interface NavItem {
    id: string;
    label: string;
    icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'categories', label: 'Explore', icon: GridIcon },
    { id: 'premium', label: 'Premium', icon: ZapIcon },
    { id: 'about', label: 'About', icon: InfoIcon },
];

interface CapsuleNavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const CapsuleNavbar: React.FC<CapsuleNavbarProps> = ({ activeTab, setActiveTab }) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 100);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // Animation variants for split effect
    const containerVariants = {
        collapsed: {
            gap: '0px',
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
        expanded: {
            gap: '8px',
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
    };

    const pillVariants = {
        collapsed: {
            scale: 1,
            opacity: 1,
        },
        expanded: {
            scale: 1,
            opacity: 1,
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] hidden md:flex"
        >
            <motion.div
                variants={containerVariants}
                animate={isScrolled ? 'expanded' : 'collapsed'}
                className="flex items-center"
            >
                {/* Logo Pill */}
                <motion.div
                    layout
                    className={`flex items-center gap-2 rounded-full px-5 py-3 backdrop-blur-xl border transition-all duration-500 ${isScrolled
                            ? 'bg-brand-black/70 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                            : 'bg-brand-black/50 border-white/5'
                        }`}
                >
                    <div className="h-7 w-7 bg-brand-red rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(185,28,28,0.5)]">
                        <span className="font-heading text-sm text-white">S</span>
                    </div>
                    <AnimatePresence>
                        {!isScrolled && (
                            <motion.span
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 'auto', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="font-heading text-sm tracking-tighter text-white overflow-hidden whitespace-nowrap"
                            >
                                STRAIGHT OUTTA <span className="text-brand-red">DHH</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Navigation Pills */}
                <motion.div
                    layout
                    className={`flex items-center gap-1 rounded-full px-2 py-2 backdrop-blur-xl border transition-all duration-500 ${isScrolled
                            ? 'bg-brand-black/70 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                            : 'bg-brand-black/50 border-white/5'
                        }`}
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                variants={pillVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(185,28,28,0.5)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <AnimatePresence>
                                    {(!isScrolled || isActive) && (
                                        <motion.span
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 'auto', opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.nav>
    );
};

export default CapsuleNavbar;
