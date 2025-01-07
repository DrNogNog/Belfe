import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ThemeGrid } from './ThemeGrid';
import { MindfulnessExperience } from './MindfulnessExperience';

interface MindfulnessMenuProps {
  onClose: () => void;
}

export function MindfulnessMenu({ onClose }: MindfulnessMenuProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // This would come from your quotes data file
  const quotes = [
    "Let the peace of nature fill your mind with tranquility.",
    "Each breath brings you closer to your inner calm.",
    "Feel the strength of the mountains ground you in this moment.",
    // Add more quotes as needed
  ];

  return (
    <AnimatePresence>
      {selectedTheme ? (
        <MindfulnessExperience
          themeId={selectedTheme}
          quotes={quotes}
          onClose={() => setSelectedTheme(null)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex flex-col z-50 bg-black"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <h2 className="text-2xl font-light text-white">Mindfulness Themes</h2>
          </div>

          {/* Theme Grid */}
          <div className="flex-1 overflow-auto">
            <ThemeGrid onThemeSelect={setSelectedTheme} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}