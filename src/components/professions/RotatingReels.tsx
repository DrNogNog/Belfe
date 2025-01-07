import React from 'react';
import { motion } from 'framer-motion';

const REEL_ITEMS = [
  { id: 1, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&h=150&q=80", label: "Career" },
  { id: 2, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80", label: "Worker" },
  { id: 3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80", label: "Worker X" },
  { id: 4, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80", label: "Person 5" },
  { id: 5, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80", label: "Just Person" },
  { id: 6, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80", label: "In Industry" },
  { id: 7, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80", label: "X" }
];

export function RotatingReels() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      {REEL_ITEMS.map((item, index) => {
        const angle = (index * 360) / REEL_ITEMS.length;
        const radius = 250; // Adjust this value to change the circle size
        
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={item.id}
            className="absolute left-1/2 top-1/2"
            style={{
              x: x - 40, // Center the item (half of width)
              y: y - 40, // Center the item (half of height)
            }}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/20">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center text-white/80 text-sm">
              {item.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}