import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Concern {
  name: string;
  count: number;
}

const concerns: Concern[] = [
  { name: 'Dryness', count: 25 },
  { name: 'Fine lines / Wrinkles', count: 10 },
  { name: 'Dullness', count: 9 },
  { name: 'Loss of firmness / Elasticity', count: 3 },
  { name: 'Uneven texture', count: 7 },
  { name: 'Shine', count: 2 },
  { name: 'Heat Protection', count: 2 },
  { name: 'Frizz', count: 2 },
  { name: 'Dark spots', count: 1 }
];

interface ConcernsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConcernsMenu({ isOpen, onClose }: ConcernsMenuProps) {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const toggleConcern = (concernName: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concernName) 
        ? prev.filter(name => name !== concernName)
        : [...prev, concernName]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Concerns List */}
          <motion.div
            className="absolute left-64 bottom-0 p-4 w-[280px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex flex-col gap-2">
              {concerns.map((concern, index) => (
                <motion.button
                  key={concern.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -20,
                    transition: { delay: (concerns.length - 1 - index) * 0.05 }
                  }}
                  onClick={() => toggleConcern(concern.name)}
                  className={`
                    p-3 rounded-[35px] text-left
                    bg-[#5C616C] text-white
                    transition-colors duration-200
                    ${selectedConcerns.includes(concern.name) ? 'bg-opacity-100' : 'bg-opacity-80'}
                  `}
                >
                  <span>
                    {concern.name} ({concern.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}