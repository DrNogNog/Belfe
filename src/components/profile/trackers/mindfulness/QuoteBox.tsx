import React from 'react';
import { motion } from 'framer-motion';

interface QuoteBoxProps {
  quote: string;
}

export function QuoteBox({ quote }: QuoteBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center max-w-2xl mx-auto"
    >
      <p className="text-2xl text-white leading-relaxed font-light">
        {quote}
      </p>
    </motion.div>
  );
}