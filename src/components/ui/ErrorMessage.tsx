import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onBack: () => void;
}

export function ErrorMessage({ message, onBack }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="text-center p-4">
        <p className="text-white/80 mb-4">{message}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  );
}