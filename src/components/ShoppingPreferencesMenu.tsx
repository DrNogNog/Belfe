import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Leaf, Award, ShoppingBag, Star, Diamond } from 'lucide-react';

interface ShoppingPreference {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

const preferences: ShoppingPreference[] = [
  { id: '1', name: 'Luxury Makeup', count: 46, icon: <Crown className="w-4 h-4" /> },
  { id: '2', name: 'Black-Owned Brands', count: 17, icon: <Star className="w-4 h-4" /> },
  { id: '3', name: 'Best of Allure', count: 6, icon: <Award className="w-4 h-4" /> },
  { id: '4', name: 'Only at Sephora', count: 42, icon: <ShoppingBag className="w-4 h-4" /> },
  { id: '5', name: 'Planet Aware', count: 1, icon: <Leaf className="w-4 h-4" /> },
  { id: '6', name: 'Luxury Skincare', count: 1, icon: <Diamond className="w-4 h-4" /> }
];

interface ShoppingPreferencesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingPreferencesMenu({ isOpen, onClose }: ShoppingPreferencesMenuProps) {
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

          {/* Preferences Grid */}
          <motion.div
            className="absolute left-64 bottom-0 p-4 w-[400px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {preferences.map((pref, index) => (
                <motion.button
                  key={pref.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20,
                    transition: { delay: (preferences.length - 1 - index) * 0.05 }
                  }}
                  className="bg-[#5C616C] rounded-lg p-3 text-white hover:bg-opacity-90 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {pref.icon}
                    <div className="text-left">
                      <div className="text-sm font-medium">{pref.name}</div>
                      <div className="text-xs text-white/70">({pref.count})</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}