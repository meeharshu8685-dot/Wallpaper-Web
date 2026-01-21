
import React from 'react';
import { motion } from 'framer-motion';
import Premium from '../components/Premium';

const PremiumPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 md:pt-32"
        >
            <section className="container mx-auto px-4 py-8 text-center">
                <h1 className="font-heading text-4xl md:text-6xl mb-4 tracking-widest">
                    GO <span className="text-brand-gold">PREMIUM</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    Unlock exclusive wallpapers, AMOLED blacks, and 4K resolutions. Support the DHH culture.
                </p>
            </section>

            <Premium />

            {/* Pricing Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                        <h3 className="font-heading text-2xl mb-4">FREE</h3>
                        <p className="text-4xl font-bold mb-6">₹0<span className="text-sm text-gray-400">/forever</span></p>
                        <ul className="space-y-3 text-gray-300 mb-8">
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> HD Wallpapers</li>
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> Basic Categories</li>
                            <li className="flex items-center gap-2 text-gray-500"><span>✗</span> 4K Resolution</li>
                            <li className="flex items-center gap-2 text-gray-500"><span>✗</span> AMOLED Blacks</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold">Current Plan</button>
                    </div>

                    {/* Premium Tier */}
                    <div className="bg-gradient-to-br from-brand-gold/20 to-brand-red/20 border border-brand-gold/30 rounded-2xl p-8 backdrop-blur-lg relative overflow-hidden">
                        <div className="absolute top-4 right-4 bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                        <h3 className="font-heading text-2xl mb-4 text-brand-gold">PREMIUM</h3>
                        <p className="text-4xl font-bold mb-6">₹99<span className="text-sm text-gray-400">/month</span></p>
                        <ul className="space-y-3 text-gray-300 mb-8">
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> Everything in Free</li>
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> 4K Ultra HD</li>
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> AMOLED Blacks</li>
                            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span> Exclusive Collections</li>
                        </ul>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3 rounded-xl bg-brand-gold text-black font-bold shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                        >
                            Upgrade Now
                        </motion.button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default PremiumPage;
