import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';

interface AgeRangeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgeRangeMenu({ isOpen, onClose }: AgeRangeMenuProps) {
  const [age, setAge] = useState(35);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value));
    setShowMessage(true);
  };

  const getJourneyMessage = (age: number) => {
    if (age < 25) return "Embracing Your Youthful Glow";
    if (age < 35) return "Radiating Confidence & Energy";
    if (age < 45) return "Celebrating Your Prime";
    if (age < 55) return "Embracing Timeless Beauty";
    return "Exuding Elegant Grace";
  };

  const getProgressColor = (percentage: number) => {
    const hue = Math.round(200 - (percentage * 120));
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          <motion.div
            className="absolute left-64 bottom-0 p-6 w-[400px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-[#5C616C] rounded-2xl p-6 text-white">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">Youthful Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Timeless Wisdom</span>
                  <Crown className="w-5 h-5 text-yellow-300" />
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-20" />
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={age}
                  onChange={handleSliderChange}
                  className="w-full h-2 appearance-none bg-transparent rounded-full relative z-10"
                  style={{
                    background: `linear-gradient(to right, 
                      ${getProgressColor(0)} 0%, 
                      ${getProgressColor(0.5)} 50%, 
                      ${getProgressColor(1)} 100%
                    )`
                  }}
                />
                <div 
                  className="absolute top-full mt-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </div>

              <div className="text-center">
                <motion.div
                  key={age}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-light mb-2"
                >
                  Age {age}
                </motion.div>
                <AnimatePresence mode="wait">
                  {showMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-sm text-white/80"
                    >
                      {getJourneyMessage(age)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}