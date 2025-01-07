import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, Palette, Building2, Heart, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { RatingSystem } from '../RatingSystem';
import { ConcernsMenu } from '../ConcernsMenu';
import { ShoppingPreferencesMenu } from '../ShoppingPreferencesMenu';
import { PriceRangeMenu } from '../PriceRangeMenu';
import { AgeRangeMenu } from '../AgeRangeMenu';
import LipstickColorPicker from '../lips/LipsColorPicker';
import { LipstickColor } from '../../types/makeup';

interface MakeupOptionsMenuProps {
  title: string;
  colors: LipstickColor[];
  onBack: () => void;
  onColorSelect: (color: string) => void;
}

type View = 'main' | 'colorFamily';

export function MakeupOptionsMenu({ 
  title, 
  colors,
  onBack, 
  onColorSelect 
}: MakeupOptionsMenuProps) {
  const [currentView, setCurrentView] = useState<View>('main');
  const [showRating, setShowRating] = useState(false);
  const [showConcerns, setShowConcerns] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showAgeRange, setShowAgeRange] = useState(false);

  const handleBack = () => {
    if (currentView !== 'main') {
      setCurrentView('main');
    } else {
      onBack();
    }
  };

  const closeAllMenus = () => {
    setShowRating(false);
    setShowConcerns(false);
    setShowPreferences(false);
    setShowPriceRange(false);
    setShowAgeRange(false);
  };

  if (currentView === 'colorFamily') {
    return (
      <LipstickColorPicker 
        title={title}
        colors={colors}
        onColorSelect={onColorSelect}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-0 left-0 w-64 bg-gradient-to-b from-gray-400/80 via-gray-500/80 to-black/80"
    >
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="flex items-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-2xl font-light ml-4">{title}</span>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              closeAllMenus();
              setCurrentView('colorFamily');
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5" />
              <span>Color Family</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <button
            onClick={() => {
              closeAllMenus();
              setShowRating(!showRating);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5" />
              <span>Rating</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <button className="w-full flex items-center justify-between text-lg">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <span>Brand</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>
          

          <button
            onClick={() => {
              closeAllMenus();
              setShowConcerns(!showConcerns);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              <span>Concerns</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <button
            onClick={() => {
              closeAllMenus();
              setShowPreferences(!showPreferences);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span>Shopping Preferences</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <button
            onClick={() => {
              closeAllMenus();
              setShowPriceRange(!showPriceRange);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5" />
              <span>Price Range</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <button
            onClick={() => {
              closeAllMenus();
              setShowAgeRange(!showAgeRange);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>Age Range</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>
        </div>
      </div>

      {showRating && <RatingSystem onRatingChange={() => setShowRating(false)} />}
      <ConcernsMenu isOpen={showConcerns} onClose={() => setShowConcerns(false)} />
      <ShoppingPreferencesMenu isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
      <PriceRangeMenu isOpen={showPriceRange} onClose={() => setShowPriceRange(false)} />
      <AgeRangeMenu isOpen={showAgeRange} onClose={() => setShowAgeRange(false)} />
    </motion.div>
  );
}