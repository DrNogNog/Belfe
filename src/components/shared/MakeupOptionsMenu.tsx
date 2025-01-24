import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, Palette, Building2, Heart, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { RatingSystem } from '../RatingSystem';
import { ConcernsMenu } from '../ConcernsMenu';
import { ShoppingPreferencesMenu } from '../ShoppingPreferencesMenu';
import { PriceRangeMenu } from '../PriceRangeMenu';
import { AgeRangeMenu } from '../AgeRangeMenu';
import { ColorPicker } from '../ColorPicker';
import { ProductList } from './ProductList';

const COLORS = [
  { id: '1', color: '#FF69B4', name: 'Pink', count: 88 },
  { id: '2', color: '#FFE4C4', name: 'Nude', count: 83 },
  { id: '3', color: '#FF0000', name: 'Red', count: 82 },
  { id: '4', color: '#800000', name: 'Berry', count: 54 },
  { id: '5', color: '#FF4500', name: 'Coral', count: 36 },
  { id: '6', color: '#FFA500', name: 'Orange', count: 9 },
  { id: '7', color: '#DEB887', name: 'Universal', count: 4 },
  { id: '8', color: '#800080', name: 'Purple', count: 4 },
  { id: '9', color: 'transparent', name: 'Clear', count: 1 }
];

interface MakeupOptionsMenuProps {
  title: string;
  onBack: () => void;
  products: any[];
}

type View = 'main' | 'colorFamily' | 'products';

export function MakeupOptionsMenu({ title, onBack, products }: MakeupOptionsMenuProps) {
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
  const handleRatingChange = (rating: number) => {
    console.log('Selected rating:', rating);
    setShowRating(false);
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
      <ColorPicker
        title = {title}
        colors = {COLORS}
        onBack={() => setCurrentView('main')}
        onColorSelect={() => setCurrentView('products')}
      />
    );
  }

  if (currentView === 'products') {
    return (
      <ProductList 
        title={title}
        products={products}
        onBack={() => setCurrentView('main')}
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

          <AnimatePresence>
            {showRating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <RatingSystem onRatingChange={handleRatingChange} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              closeAllMenus();
              setCurrentView('products');
            }}
            className="w-full flex items-center justify-between text-lg"
          >
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

      <ConcernsMenu isOpen={showConcerns} onClose={() => setShowConcerns(false)} />
      <ShoppingPreferencesMenu isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
      <PriceRangeMenu isOpen={showPriceRange} onClose={() => setShowPriceRange(false)} />
      <AgeRangeMenu isOpen={showAgeRange} onClose={() => setShowAgeRange(false)} />
    </motion.div>
  );
}