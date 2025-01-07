import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingSystemProps {
  onRatingChange: (rating: number) => void;
}

const ratingMessages = [
  { text: 'Room to Grow 1 & Up', count: 1 },
  { text: 'Fair Choice 2 & Up', count: 1 },
  { text: 'Solid Pick 3 & Up', count: 1 },
  { text: 'Great Value 4 & Up', count: 1 },
  { text: 'Top Choice 5 & Up', count: 1 }
];

export function RatingSystem({ onRatingChange }: RatingSystemProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#5C616C] rounded-[35px] p-4 mx-4 mt-2"
    >
      <div className="flex justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => handleRatingClick(rating)}
            className="transition-colors duration-200"
          >
            <Star
              className={`w-6 h-6 ${
                (hoveredRating !== null
                  ? rating <= hoveredRating
                  : rating <= (selectedRating || 0))
                  ? 'fill-[#F3ECD2] text-[#F3ECD2]'
                  : 'fill-black text-black'
              }`}
            />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {hoveredRating && (
          <motion.div
            key={hoveredRating}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm mt-2"
          >
            {ratingMessages[hoveredRating - 1].text} ({ratingMessages[hoveredRating - 1].count})
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}