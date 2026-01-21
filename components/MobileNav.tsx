
import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, GridIcon, ZapIcon, InfoIcon } from './icons';

export const MobileHeader: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-brand-black/80 px-6 backdrop-blur-xl border-b border-white/5 md:hidden">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-brand-red rounded flex items-center justify-center">
                    <span className="font-heading text-xl text-white">S</span>
                </div>
                <h1 className="font-heading text-xl tracking-tighter text-white">STRAIGHT OUTTA <span className="text-brand-red">DHH</span></h1>
            </div>
            <button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                <div className="flex flex-col gap-1">
                    <span className="h-0.5 w-5 bg-white"></span>
                    <span className="h-0.5 w-3 bg-brand-red self-end"></span>
                </div>
            </button>
        </header>
    );
};

interface MobileNavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'categories', icon: GridIcon, label: 'Explore' },
        { id: 'premium', icon: ZapIcon, label: 'Premium' },
        { id: 'about', icon: InfoIcon, label: 'About' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-brand-black/90 px-4 pb-2 backdrop-blur-2xl border-t border-white/10 md:hidden">
            <div className="flex h-full items-center justify-around">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex flex-col items-center justify-center gap-1 group"
                        >
                            <div className={`relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                                <Icon className="h-6 w-6" />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-brand-red rounded-2xl blur-md opacity-30 -z-10"
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
