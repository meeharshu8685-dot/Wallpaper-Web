
import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';

const AboutPage: React.FC = () => {
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
                    ABOUT <span className="text-brand-red">US</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    We're not just a wallpaper site. We're a movement celebrating Desi Hip Hop culture.
                </p>
            </section>

            <About />

            {/* Story Section */}
            <section className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-lg">
                    <h2 className="font-heading text-3xl mb-6 text-center">OUR STORY</h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            Born from the streets and studios of India, <span className="text-brand-red font-bold">STRAIGHT OUTTA DHH</span> is a tribute to the artists who turned pain into poetry and struggle into anthems.
                        </p>
                        <p>
                            We believe your phone's wallpaper should hit as hard as your favorite bar. That's why we curate only the most raw, authentic, and visually stunning artwork inspired by Desi Hip Hop culture.
                        </p>
                        <p>
                            From the gritty lanes of Gully to the neon-lit festivals, every wallpaper tells a story. Every download is a statement. Every screen becomes a canvas for the culture.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="font-heading text-2xl mb-4">GOT QUESTIONS?</h2>
                <p className="text-gray-400 mb-6">Reach out to us anytime.</p>
                <a
                    href="mailto:hello@straightouttadhh.com"
                    className="inline-block px-8 py-3 bg-brand-red text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(185,28,28,0.5)] transition-all"
                >
                    Contact Us
                </a>
            </section>
        </motion.div>
    );
};

export default AboutPage;
