import React from 'react';
import { motion } from 'framer-motion';
import type { Theme } from './themes/mindfulnessThemes';

interface ThemeCardProps {
  theme: Theme;
  onClick: () => void;
}

export function ThemeCard({ theme, onClick }: ThemeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Image */}
      <img
        src={theme.image}
        alt={theme.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-60 
        group-hover:opacity-70 transition-opacity`} />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-2xl font-light mb-2">{theme.title}</h3>
        <p className="text-sm text-white/90">{theme.description}</p>
      </div>
    </motion.button>
  );
}