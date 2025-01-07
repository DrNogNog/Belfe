import React from 'react';
import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-white/80">Initializing face tracking...</p>
      </div>
    </motion.div>
  );
}