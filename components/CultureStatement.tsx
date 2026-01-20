
import React from 'react';
import { motion } from 'framer-motion';

const statements = [
  { text: "From gullies to global", animation: { x: -100 } },
  { text: "Bars over everything", animation: { x: 100 } },
  { text: "Hustle never sleeps", animation: { y: 50 } },
];

const Statement: React.FC<{ text: string; animation: object }> = ({ text, animation }) => {
  return (
    <motion.div
      initial={{ ...animation, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.05 }}
      className="my-8"
    >
      <h2 className="font-heading text-5xl tracking-wide text-gray-300 md:text-7xl">
        {text}
      </h2>
    </motion.div>
  );
};

const CultureStatement: React.FC = () => {
  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center justify-center py-20 text-center">
      {statements.map((s, i) => (
        <Statement key={i} text={s.text} animation={s.animation} />
      ))}
    </section>
  );
};

export default CultureStatement;
