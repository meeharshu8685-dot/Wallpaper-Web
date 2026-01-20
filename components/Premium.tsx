
import React from 'react';
import { motion } from 'framer-motion';
import { LockIcon } from './icons';

const PremiumCard: React.FC<{ title: string; price: string; features: string[] }> = ({ title, price, features }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)' }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-gray-900/30 p-8 backdrop-blur-lg"
  >
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
    <h3 className="font-heading text-3xl tracking-wider text-brand-gold">{title}</h3>
    <p className="mt-2 text-4xl font-bold text-white">{price} <span className="text-base font-normal text-gray-400">/ lifetime</span></p>
    <ul className="mt-6 space-y-2 text-gray-300">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2">
          <span>✅</span> {feature}
        </li>
      ))}
    </ul>
    <button className="mt-8 w-full rounded-lg bg-brand-gold py-3 font-bold text-black transition-transform hover:scale-105">
      Get Access
    </button>
  </motion.div>
);

const Premium: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-5xl tracking-wider md:text-6xl text-white"
        >
            Support The Culture
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-400"
        >
            Get exclusive access to premium wallpapers and support the DHH movement. This isn't just a purchase; it's a contribution.
        </motion.p>
        <div className="mt-16 grid max-w-4xl mx-auto gap-8 md:grid-cols-1 lg:max-w-none">
          <PremiumCard
            title="DHH Universe Pass"
            price="$10"
            features={[
              'Access all premium wallpapers',
              '4K & AMOLED resolutions',
              'Early access to new drops',
              'Directly support DHH creators',
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Premium;
