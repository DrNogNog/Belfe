import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, CheckCircle2 } from 'lucide-react';

interface PriceRangeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_PRICE = 200;

export function PriceRangeMenu({ isOpen, onClose }: PriceRangeMenuProps) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [itemCount, setItemCount] = useState(320);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMinSlider = e.target.name === 'min';
    
    if (isMinSlider) {
      if (value < maxPrice) {
        setMinPrice(value);
      }
    } else {
      if (value > minPrice) {
        setMaxPrice(value);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const isMinInput = e.target.name === 'minInput';
    
    if (isMinInput) {
      if (value >= 0 && value < maxPrice) {
        setMinPrice(value);
      }
    } else {
      if (value <= MAX_PRICE && value > minPrice) {
        setMaxPrice(value);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
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
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="relative h-2">
                    <div
                      className="absolute w-full h-full bg-white/20 rounded-full"
                    />
                    <div
                      className="absolute h-full bg-white/80 rounded-full"
                      style={{
                        left: `${(minPrice / MAX_PRICE) * 100}%`,
                        right: `${100 - (maxPrice / MAX_PRICE) * 100}%`
                      }}
                    />
                    <input
                      type="range"
                      name="min"
                      min={0}
                      max={MAX_PRICE}
                      value={minPrice}
                      onChange={handleSliderChange}
                      className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                      style={{
                        zIndex: 3,
                        '--range-color': 'transparent',
                        '--thumb-color': 'white'
                      } as React.CSSProperties}
                    />
                    <input
                      type="range"
                      name="max"
                      min={0}
                      max={MAX_PRICE}
                      value={maxPrice}
                      onChange={handleSliderChange}
                      className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                      style={{
                        zIndex: 4,
                        '--range-color': 'transparent',
                        '--thumb-color': 'white'
                      } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-2">Minimum Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                      <input
                        type="number"
                        name="minInput"
                        value={minPrice}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 rounded-lg py-2 pl-10 pr-3 text-white"
                        min="0"
                        max={maxPrice - 1}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm mb-2">Maximum Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                      <input
                        type="number"
                        name="maxInput"
                        value={maxPrice}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 rounded-lg py-2 pl-10 pr-3 text-white"
                        min={minPrice + 1}
                        max={MAX_PRICE}
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-2 text-sm text-white/90 mb-4"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Perfect choice! These products are a great fit for your budget.</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-sm text-white/90 mb-4"
                    >
                      We have {itemCount} items within your budget!
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-2 text-white font-medium"
                >
                  Apply Price Range
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}