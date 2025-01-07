import React from 'react';
import { motion } from 'framer-motion';

interface PhotoGridItemProps {
  photo: string;
  isLong?: boolean;
}

export function PhotoGridItem({ photo, isLong = false }: PhotoGridItemProps) {
  return (
    <motion.div 
      className={`bg-gray-200 rounded-md overflow-hidden ${
        isLong ? 'aspect-[3/5]' : 'aspect-square'
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={photo}
        alt="Profile photo"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}