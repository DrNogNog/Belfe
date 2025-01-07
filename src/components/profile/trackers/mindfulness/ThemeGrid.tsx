import React from 'react';
import { motion } from 'framer-motion';
import { ThemeCard } from './ThemeCard';
import { mindfulnessThemes } from './themes/mindfulnessThemes';

interface ThemeGridProps {
  onThemeSelect: (themeId: string) => void;
}

export function ThemeGrid({ onThemeSelect }: ThemeGridProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {mindfulnessThemes.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          onClick={() => onThemeSelect(theme.id)}
        />
      ))}
    </motion.div>
  );
}