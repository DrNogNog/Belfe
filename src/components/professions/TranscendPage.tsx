import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { RotatingReels } from './RotatingReels';
import { Slideshow } from './Slideshow';
import { Fireworks } from './Fireworks';

interface TranscendPageProps {
  onBack: () => void;
}

export function TranscendPage({ onBack }: TranscendPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onBack} />

      {/* Content */}
      <div className="relative w-[900px] h-[900px]">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 text-white/80 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Rotating Reels */}
        <RotatingReels />

        {/* Central Box */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[400px] h-[300px] bg-gradient-to-b from-gray-400/80 via-gray-500/80 to-black/80 
          rounded-lg overflow-hidden"
        >
          {/* Fireworks Animation */}
          <Fireworks />

          {/* Slideshow */}
          <div className="absolute inset-0">
            <Slideshow />
          </div>
        </div>
      </div>
    </motion.div>
  );
}