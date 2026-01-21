
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { HomeIcon, GridIcon, ZapIcon, InfoIcon } from './icons';

interface NavItem {
    path: string;
    label: string;
    icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/explore', label: 'Explore', icon: GridIcon },
    { path: '/premium', label: 'Premium', icon: ZapIcon },
    { path: '/about', label: 'About', icon: InfoIcon },
];

const CapsuleNavbar: React.FC = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 100);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] hidden md:flex"
        >
            <motion.div
                animate={{ gap: isScrolled ? '8px' : '0px' }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center"
            >
                {/* Logo Pill */}
                <NavLink to="/">
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
                </NavLink>

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
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                            >
                                <motion.div
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
                                </motion.div>
                            </NavLink>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.nav>
    );
};

export default CapsuleNavbar;
